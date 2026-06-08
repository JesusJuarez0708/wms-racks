import { useMemo, useState } from 'react';
import {
  useWmsData,
  type EstadoOrdenTrabajo,
} from '../context/WmsDataContext';
import {
  posicionesRackInfo,
  type PosicionRackInfo,
} from '../data/racks';

type TipoMovimiento = 'entrada' | 'salida' | 'reubicacion';

type MovimientoRack = {
  id: string;
  tipo: TipoMovimiento;
  sku: string;
  descripcion: string;
  lote: string;
  cantidad: number;
  unidad:
  | 'CAJA'
  | 'TAMBOR'
  | 'SACO'
  | 'CUÑETE'
  | 'PIEZAS';
  piezasPorCaja: number;
  totalPiezas: number;
  rotacion?: RotacionProducto;
  posicionOrigen?: string;
  posicionDestino?: string;
  operador: string;
  fecha: string;
};

type RotacionProducto = 'Alta' | 'Media' | 'Baja';



export default function MontacargasPage() {
  const [tipo, setTipo] = useState<TipoMovimiento>('entrada');
  const [sku, setSku] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [lote, setLote] = useState('');
  const [cantidad, setCantidad] = useState('');

  const [palletsAIngresar, setPalletsAIngresar] = useState('1');

  const [rotacion, setRotacion] = useState<RotacionProducto>('Media');

  const [alturaPallet, setAlturaPallet] = useState('');

  type UnidadMovimiento =
    | 'CAJA'
    | 'TAMBOR'
    | 'SACO'
    | 'CUÑETE'
    | 'PIEZAS';

  const [unidad, setUnidad] = useState<UnidadMovimiento>('CAJA');

  const [piezasPorCaja, setPiezasPorCaja] = useState('');

  const totalPiezasCalculadas =
    unidad === 'CAJA'
      ? Number(cantidad || 0) * Number(piezasPorCaja || 0)
      : Number(cantidad || 0);

  const [posicionOrigen, setPosicionOrigen] = useState('');
  const [posicionDestino, setPosicionDestino] = useState('');
  const [operador, setOperador] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [ordenTrabajoActivaId, setOrdenTrabajoActivaId] = useState<string | null>(null);

  const [recomendacionActiva, setRecomendacionActiva] = useState<{
    tipoRackRecomendado: string;
    cantidadPallets: number;
    posicionesRecomendadas: string[];
    grupos: {
      zona: string;
      linea?: string;
      posiciones: string[];
    }[];
  } | null>(null);

  const [tipoMensaje, setTipoMensaje] = useState<
    'success' | 'error'
  >('success');

  const {
    movimientos,
    agregarMovimiento,
    validarMovimiento,
    ordenesTrabajo,
    avanzarEstadoOrdenTrabajo,
  } = useWmsData();

  const tituloOperacion = useMemo(() => {
    if (tipo === 'entrada') return 'Registrar entrada';
    if (tipo === 'salida') return 'Registrar salida';
    return 'Registrar reubicación';
  }, [tipo]);

  const limpiarFormulario = () => {
    setSku('');
    setLote('');
    setCantidad('');
    setPosicionOrigen('');
    setPosicionDestino('');
    setOperador('');
    setDescripcion('');
    setRotacion('Media');
    setRecomendacionActiva(null);
    setOrdenTrabajoActivaId(null);
  };

  const ordenesMontacargas = ordenesTrabajo.filter(
    (orden) =>
      orden.estado === 'asignada' ||
      orden.estado === 'en_proceso'
  );

  function obtenerTextoEstadoOT(estado: EstadoOrdenTrabajo) {
    if (estado === 'pendiente') return 'Pendiente';
    if (estado === 'asignada') return 'Asignada';
    if (estado === 'en_proceso') return 'En proceso';
    return 'Completada';
  }

  function obtenerColorEstadoOT(estado: EstadoOrdenTrabajo) {
    if (estado === 'asignada') {
      return {
        background: '#DBEAFE',
        color: '#1D4ED8',
        border: '1px solid #BFDBFE',
      };
    }

    if (estado === 'en_proceso') {
      return {
        background: '#F3E8FF',
        color: '#7E22CE',
        border: '1px solid #E9D5FF',
      };
    }

    return {
      background: '#DCFCE7',
      color: '#15803D',
      border: '1px solid #BBF7D0',
    };
  }

  function obtenerTextoBotonOT(estado: EstadoOrdenTrabajo) {
    if (estado === 'asignada') return 'Iniciar desde montacargas';
    if (estado === 'en_proceso') return 'Completar desde montacargas';
    return 'Completada';
  }

    const obtenerRecomendacionEntrada = (
      cantidadPallets: number,
      alturaPallet: number,
      rotacion: RotacionProducto
    ) => {
    const posicionesOcupadas = new Set<string>();
    const ocupacionPorPosicion = new Map<string, MovimientoRack>();

    [...movimientos]
      .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
      .forEach((mov) => {
        if (mov.tipo === 'entrada' && mov.posicionDestino) {
          posicionesOcupadas.add(mov.posicionDestino);
          ocupacionPorPosicion.set(mov.posicionDestino, mov);
        }

        if (mov.tipo === 'salida' && mov.posicionOrigen) {
          posicionesOcupadas.delete(mov.posicionOrigen);
          ocupacionPorPosicion.delete(mov.posicionOrigen);
        }

        if (
          mov.tipo === 'reubicacion' &&
          mov.posicionOrigen &&
          mov.posicionDestino
        ) {
          const palletOrigen = ocupacionPorPosicion.get(mov.posicionOrigen);

          posicionesOcupadas.delete(mov.posicionOrigen);
          ocupacionPorPosicion.delete(mov.posicionOrigen);

          if (palletOrigen) {
            posicionesOcupadas.add(mov.posicionDestino);
            ocupacionPorPosicion.set(mov.posicionDestino, {
              ...palletOrigen,
              ...mov,
              sku: palletOrigen.sku,
              descripcion: palletOrigen.descripcion,
              lote: palletOrigen.lote,
              cantidad: palletOrigen.cantidad,
              unidad: palletOrigen.unidad,
              piezasPorCaja: palletOrigen.piezasPorCaja,
              totalPiezas: palletOrigen.totalPiezas,
              rotacion: palletOrigen.rotacion,
            });
          }
        }
      });

    const tipoRackRecomendado =
      cantidadPallets > 5 ? 'drive_in' : 'selectivo';

    const posicionesLibres = posicionesRackInfo.filter(
      (posicion) =>
        posicion.tipoRack === tipoRackRecomendado &&
        posicion.alturaMaxima >= alturaPallet &&
        !posicionesOcupadas.has(posicion.posicion)
    );

    const posicionesDriveInOrdenadas = posicionesLibres
      .filter((p) => p.tipoRack === 'drive_in')
      .sort((a, b) => {
        if (a.zona !== b.zona) {
          return a.zona.localeCompare(b.zona);
        }

        if (a.linea !== b.linea) {
          return (a.linea || '').localeCompare(b.linea || '');
        }

        if (a.nivel !== b.nivel) {
          return (a.nivel || 0) - (b.nivel || 0);
        }

        if (rotacion === 'Baja') {
          return (b.profundidad || 0) - (a.profundidad || 0);
        }

        if (rotacion === 'Alta') {
          return (a.profundidad || 0) - (b.profundidad || 0);
        }

        return (b.profundidad || 0) - (a.profundidad || 0);
      });

    const obtenerDatosCarril = (posicion: PosicionRackInfo) => {
      if (!posicion.linea || !posicion.nivel) {
        return {
          ocupadoMismoSku: false,
          ocupadoOtroSku: false,
          carrilVacio: true,
          mezclaPermitida: true,
        };
      }

      const posicionesDelCarril = posicionesRackInfo.filter(
        (item) =>
          item.tipoRack === 'drive_in' &&
          item.zona === posicion.zona &&
          item.linea === posicion.linea &&
          item.nivel === posicion.nivel
      );

      const palletsOcupados = posicionesDelCarril
        .map((item) => ocupacionPorPosicion.get(item.posicion))
        .filter(Boolean) as MovimientoRack[];

      const carrilVacio = palletsOcupados.length === 0;

      const ocupadoMismoSku = palletsOcupados.some(
        (pallet) => pallet.sku === sku.trim()
      );

      const ocupadoOtroSku = palletsOcupados.some(
        (pallet) => pallet.sku !== sku.trim()
      );

      const hayAltaEnCarril = palletsOcupados.some(
        (pallet) => pallet.rotacion === 'Alta'
      );

      const hayMediaEnCarril = palletsOcupados.some(
        (pallet) => pallet.rotacion === 'Media'
      );

      let mezclaPermitida = true;

      if (rotacion === 'Baja' && (hayAltaEnCarril || hayMediaEnCarril)) {
        mezclaPermitida = false;
      }

      if (rotacion === 'Media' && hayAltaEnCarril) {
        mezclaPermitida = false;
      }

      return {
        ocupadoMismoSku,
        ocupadoOtroSku,
        carrilVacio,
        mezclaPermitida,
      };
    };

    if (posicionesLibres.length === 0) {
      return {
        tipo: 'sin_espacio',
          mensaje: `No hay posiciones disponibles en ${
            tipoRackRecomendado === 'drive_in'
              ? 'Drive In'
              : 'Rack Selectivo'
          } para pallets con altura de ${alturaPallet.toFixed(2)} m.`,
        posicionesRecomendadas: [],
        tipoRackRecomendado,
        zona: tipoRackRecomendado === 'drive_in' ? 'Drive In' : 'Selectivo',
      };
    }

    if (posicionesLibres.length < cantidadPallets) {
      return {
        tipo: 'espacio_insuficiente',
        mensaje: `Solo hay ${posicionesLibres.length} posición(es) libre(s) en ${
          tipoRackRecomendado === 'drive_in' ? 'Drive In' : 'Rack Selectivo'
        }. Faltan ${cantidadPallets - posicionesLibres.length} pallet(s) por ubicar.`,
        posicionesRecomendadas: posicionesLibres.map((item) => item.posicion),
        tipoRackRecomendado,
        zona: tipoRackRecomendado === 'drive_in' ? 'Drive In' : 'Selectivo',
      };
    }

    let posicionesBase = posicionesLibres;

    if (tipoRackRecomendado === 'drive_in') {
      const gruposPorZonaLineaNivel = new Map<
        string,
        typeof posicionesDriveInOrdenadas
      >();

      posicionesDriveInOrdenadas.forEach((posicion) => {
        const zonaReal = posicion.zona;
        const lineaReal = posicion.linea;
        const nivelReal = posicion.nivel;

        const key = `${zonaReal}-${lineaReal}-${nivelReal}`;

        const grupoActual = gruposPorZonaLineaNivel.get(key) ?? [];
        grupoActual.push(posicion);
        gruposPorZonaLineaNivel.set(key, grupoActual);
      });

      const gruposOrdenados = Array.from(gruposPorZonaLineaNivel.values()).sort(
        (a, b) => {
          const zonaA = a[0]?.zona ?? '';
          const zonaB = b[0]?.zona ?? '';

          const lineaA = a[0]?.linea ?? '';
          const lineaB = b[0]?.linea ?? '';

          const nivelA = a[0]?.nivel ?? 0;
          const nivelB = b[0]?.nivel ?? 0;

          if (zonaA !== zonaB) {
            return zonaA.localeCompare(zonaB);
          }

          if (lineaA !== lineaB) {
            return lineaA.localeCompare(lineaB);
          }

          return nivelA - nivelB;
        }
      );

      const gruposConPrioridad = gruposOrdenados
        .map((grupo, indice) => {
          const datosCarril = obtenerDatosCarril(grupo[0]);

          let prioridad = 5;

          if (datosCarril.ocupadoMismoSku) {
            prioridad = 1;
          } else if (
            datosCarril.ocupadoOtroSku &&
            datosCarril.mezclaPermitida
          ) {
            prioridad = 2;
          } else if (datosCarril.carrilVacio) {
            prioridad = 3;
          }

          return {
            grupo,
            prioridad,
            indice,
          };
        })
        .filter((item) => item.prioridad < 4)
        .sort((a, b) => {
          if (a.prioridad !== b.prioridad) {
            return a.prioridad - b.prioridad;
          }

          return a.indice - b.indice;
        });

        const posicionesOrdenadasPorGrupo = gruposConPrioridad.flatMap(
          (item) => item.grupo
        );

        posicionesBase = posicionesOrdenadasPorGrupo;
    }

    const posicionesRecomendadas = posicionesBase
      .slice(0, cantidadPallets)
      .map((item) => item.posicion);

    return {
      tipo: 'recomendacion_ok',
      mensaje: `Recomendación inteligente: ingresar ${cantidadPallets} pallet(s) en ${
        tipoRackRecomendado === 'drive_in' ? 'Drive In' : 'Rack Selectivo'
      }.`,
      posicionesRecomendadas,
      tipoRackRecomendado,
      zona: tipoRackRecomendado === 'drive_in' ? 'Drive In' : 'Selectivo',
    };
  };

  const agruparUbicacionesRecomendadas = (posiciones: string[]) => {
    return posiciones.reduce<
      {
        zona: string;
        linea?: string;
        posiciones: string[];
      }[]
    >((grupos, posicion) => {
      const partes = posicion.split('-');

      const esDriveIn = partes.length >= 4;
      const zona = esDriveIn ? partes[0] : posicion.charAt(0);
      const nivel = esDriveIn ? partes[2] : undefined;
      const linea = esDriveIn ? `${partes[1]} / Nivel ${nivel}` : undefined;

      const grupoExistente = grupos.find(
        (grupo) => grupo.zona === zona && grupo.linea === linea
      );

      if (grupoExistente) {
        grupoExistente.posiciones.push(posicion);
      } else {
        grupos.push({
          zona,
          linea,
          posiciones: [posicion],
        });
      }

      return grupos;
    }, []);
  };

  const obtenerMovimientoPorUbicacion = (ubicacion: string) => {
    const posicionesOcupadas = new Map<string, MovimientoRack>();

    [...movimientos]
      .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
      .forEach((mov) => {
        if (mov.tipo === 'entrada' && mov.posicionDestino) {
          posicionesOcupadas.set(mov.posicionDestino, mov);
        }

        if (mov.tipo === 'salida' && mov.posicionOrigen) {
          posicionesOcupadas.delete(mov.posicionOrigen);
        }

        if (
          mov.tipo === 'reubicacion' &&
          mov.posicionOrigen &&
          mov.posicionDestino
        ) {
          const palletOrigen = posicionesOcupadas.get(mov.posicionOrigen);

          posicionesOcupadas.delete(mov.posicionOrigen);

          if (palletOrigen) {
            posicionesOcupadas.set(mov.posicionDestino, {
              ...palletOrigen,
              ...mov,
              sku: palletOrigen.sku,
              descripcion: palletOrigen.descripcion,
              lote: palletOrigen.lote,
              cantidad: palletOrigen.cantidad,
              unidad: palletOrigen.unidad,
              piezasPorCaja: palletOrigen.piezasPorCaja,
              totalPiezas: palletOrigen.totalPiezas,
            });
          }
        }
      });

    return posicionesOcupadas.get(ubicacion);
  };

  const iniciarOrdenDesdeMontacargas = (
    ordenId: string,
    producto: string,
    loteOrden: string,
    origenes: string[],
    destino: string,
    responsable: string | null
  ) => {
    const primerOrigen = origenes[0] ?? '';

    setTipo('reubicacion');
    setSku(producto);
    setDescripcion(producto);
    setLote(loteOrden);
    setPosicionOrigen(primerOrigen);
    setPosicionDestino(destino);
    setOperador(responsable ?? 'Carlos Torres');
    setCantidad('1');
    setUnidad('CAJA');
    setPiezasPorCaja('');
    setRecomendacionActiva(null);
    setOrdenTrabajoActivaId(ordenId);

    avanzarEstadoOrdenTrabajo(ordenId);

    setTipoMensaje('success');
    setMensaje(`OT ${ordenId} cargada en formulario de reubicación.`);

    setTimeout(() => {
      setMensaje('');
    }, 3000);
  };

  const cargarDatosDesdeOrigen = (ubicacion: string) => {
    if (tipo !== 'reubicacion') return;

    const pallet = obtenerMovimientoPorUbicacion(ubicacion);

    if (!pallet) {
      setTipoMensaje('error');
      setMensaje(`La posición origen ${ubicacion} está vacía.`);
      return;
    }

    setSku(pallet.sku);
    setDescripcion(pallet.descripcion);
    setLote(pallet.lote);
    setCantidad(String(pallet.cantidad));
    setUnidad(pallet.unidad);
    setPiezasPorCaja(
      pallet.unidad === 'CAJA' ? String(pallet.piezasPorCaja) : ''
    );

    setTipoMensaje('success');
    setMensaje('Datos del pallet cargados correctamente.');

    setTimeout(() => {
      setMensaje('');
    }, 3000);
  };

  const consultarRecomendacion = () => {
    const cantidadPallets = Number(palletsAIngresar);

    if (!cantidadPallets || cantidadPallets <= 0) {
      setTipoMensaje('error');
      setMensaje('Captura una cantidad válida de pallets.');
      return;
    }

    const altura = Number(alturaPallet);

    if (!altura || altura <= 0) {
      setTipoMensaje('error');
      setMensaje('Captura una altura válida del pallet.');
      return;
    }

    const recomendacion = obtenerRecomendacionEntrada(
      cantidadPallets,
      altura,
      rotacion
    );

    if (
      recomendacion.tipo === 'sin_espacio' ||
      recomendacion.tipo === 'espacio_insuficiente'
    ) {
      setTipoMensaje('error');
      setMensaje(recomendacion.mensaje);
      setRecomendacionActiva(null);
      return;
    }

    setRecomendacionActiva({
      tipoRackRecomendado: recomendacion.tipoRackRecomendado,
      cantidadPallets,
      posicionesRecomendadas: recomendacion.posicionesRecomendadas,
      grupos: agruparUbicacionesRecomendadas(
        recomendacion.posicionesRecomendadas
      ),
    });

    setTipoMensaje('success');
    setMensaje('Recomendación generada correctamente.');

    setTimeout(() => {
      setMensaje('');
    }, 3000);
  };

  const guardarMovimiento = () => {
    setMensaje('');

    if (!sku.trim()) {
      setTipoMensaje('error');
      setMensaje('Captura el SKU o producto.');
        setTimeout(() => {
          setMensaje('');
        }, 3000);
      return;
    }

    if (!cantidad || Number(cantidad) <= 0) {
      setMensaje('Captura una cantidad válida.');
      return;
    }

    if (!operador.trim()) {
      setMensaje('Captura el nombre del operador.');
      return;
    }

    if (
      tipo === 'entrada' &&
      !posicionDestino.trim() &&
      !recomendacionActiva
    ) {
      setTipoMensaje('error');
      setMensaje(
        'Captura una posición destino o consulta una ubicación recomendada.'
      );
      return;
    }

    if (tipo === 'salida' && !posicionOrigen.trim()) {
      setMensaje('Captura la posición origen.');
      return;
    }

    if (tipo === 'reubicacion' && (!posicionOrigen.trim() || !posicionDestino.trim())) {
      setMensaje('Captura posición origen y destino.');
      return;
    }

    if (
      tipo === 'entrada' &&
      recomendacionActiva &&
      recomendacionActiva.posicionesRecomendadas.length > 0
    ) {
      const movimientosEntrada = recomendacionActiva.posicionesRecomendadas.map(
        (posicion) => ({
          id: crypto.randomUUID(),
          tipo,
          sku: sku.trim(),
          descripcion: descripcion.trim(),
          lote: lote.trim(),
          cantidad: Number(cantidad),
          posicionDestino: posicion,
          operador: operador.trim(),
          fecha: new Date().toISOString(),
          unidad,
          piezasPorCaja: Number(piezasPorCaja || 0),
          totalPiezas: totalPiezasCalculadas,
          rotacion,
        })
      );

      movimientosEntrada.forEach((movimiento) => {
        agregarMovimiento(movimiento);
      });

      limpiarFormulario();
      setRecomendacionActiva(null);
      setTipoMensaje('success');
      setMensaje(
        `${movimientosEntrada.length} pallet(s) registrados correctamente.`
      );

      setTimeout(() => {
        setMensaje('');
      }, 3000);

      return;
    }

    const nuevoMovimiento: MovimientoRack = {
      id: crypto.randomUUID(),
      tipo,
      sku: sku.trim(),
      descripcion: descripcion.trim(),
      lote: lote.trim(),
      cantidad: Number(cantidad),
      posicionOrigen: posicionOrigen.trim() || undefined,
      posicionDestino: posicionDestino.trim() || undefined,
      operador: operador.trim(),
      fecha: new Date().toISOString(),
      unidad,
      piezasPorCaja: Number(piezasPorCaja || 0),
      totalPiezas: totalPiezasCalculadas,
      rotacion,
    };
    
  const esMovimientoDeOrdenTrabajo = !!ordenTrabajoActivaId;

  const validacion = esMovimientoDeOrdenTrabajo
    ? { valido: true }
    : validarMovimiento(nuevoMovimiento);

  if (!validacion.valido) {
    setTipoMensaje('error');
    setMensaje(validacion.mensaje ?? 'Movimiento inválido.');
      setTimeout(() => {
        setMensaje('');
      }, 3000);
    return;
  }

  agregarMovimiento(nuevoMovimiento);

  if (ordenTrabajoActivaId && tipo === 'reubicacion') {
    avanzarEstadoOrdenTrabajo(ordenTrabajoActivaId);

    limpiarFormulario();
    setTipoMensaje('success');
    setMensaje(`Movimiento registrado y OT ${ordenTrabajoActivaId} completada correctamente.`);
  } else {
    limpiarFormulario();
    setTipoMensaje('success');
    setMensaje('Movimiento registrado correctamente.');
  }
    
    setTimeout(() => {
      setMensaje('');
    }, 3000);
  };

  return (

    <>
      {mensaje && (
        <div
          style={
            tipoMensaje === 'error'
              ? styles.toastError
              : styles.toastSuccess
          }
        >
          <div style={styles.toastContent}>
            <span style={styles.toastIcon}>
              {tipoMensaje === 'error' ? '⚠️' : '✅'}
            </span>

            <span>{mensaje}</span>
          </div>
        </div>
      )}

    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Montacargas</h1>
          <p style={styles.subtitle}>
            Captura rápida de entradas, salidas y reubicaciones.
          </p>
        </div>
      </div>

      {ordenesMontacargas.length > 0 && (
        <div style={styles.workOrdersCard}>
          <div style={styles.workOrdersHeader}>
            <div>
              <h2 style={styles.workOrdersTitle}>
                📋 Órdenes de trabajo asignadas
              </h2>

              <p style={styles.workOrdersSubtitle}>
                Tareas generadas desde el Centro de Optimización Operativa.
              </p>
            </div>

            <span style={styles.workOrdersCount}>
              {ordenesMontacargas.length} activa(s)
            </span>
          </div>

          <div style={styles.workOrdersList}>
            {ordenesMontacargas.map((orden) => (
              <div key={orden.id} style={styles.workOrderItem}>
                <div style={styles.workOrderTop}>
                  <div>
                    <p style={styles.workOrderId}>
                      {orden.id} · {orden.producto}
                    </p>

                    <p style={styles.workOrderText}>
                      Lote: {orden.lote}
                    </p>
                  </div>

                  <span
                    style={{
                      ...styles.workOrderStatus,
                      ...obtenerColorEstadoOT(orden.estado),
                    }}
                  >
                    {obtenerTextoEstadoOT(orden.estado)}
                  </span>
                </div>

                <div style={styles.workOrderGrid}>
                  <div>
                    <p style={styles.workOrderLabel}>Destino</p>
                    <p style={styles.workOrderValue}>{orden.destino}</p>
                  </div>

                  <div>
                    <p style={styles.workOrderLabel}>Orígenes</p>
                    <p style={styles.workOrderValue}>
                      {orden.origenes.join(', ')}
                    </p>
                  </div>

                  <div>
                    <p style={styles.workOrderLabel}>Prioridad</p>
                    <p style={styles.workOrderValue}>{orden.prioridad}</p>
                  </div>

                  <div>
                    <p style={styles.workOrderLabel}>Responsable</p>
                    <p style={styles.workOrderValue}>
                      {orden.responsable ?? 'Sin asignar'}
                    </p>
                  </div>
                </div>

                <button
                  style={styles.workOrderButton}
                  onClick={() => {
                    if (orden.estado === 'asignada') {
                      iniciarOrdenDesdeMontacargas(
                        orden.id,
                        orden.producto,
                        orden.lote,
                        orden.origenes,
                        orden.destino,
                        orden.responsable
                      );

                      return;
                    }

                    avanzarEstadoOrdenTrabajo(orden.id);
                  }}
                >
                  {obtenerTextoBotonOT(orden.estado)}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={styles.card}>
        <h2 style={styles.cardTitle}>{tituloOperacion}</h2>

        <div style={styles.operationGrid}>
          <button
            style={{
              ...styles.operationButton,
              ...(tipo === 'entrada' ? styles.operationButtonActive : {}),
            }}
            onClick={() => setTipo('entrada')}
          >
            Entrada
          </button>

          <button
            style={{
              ...styles.operationButton,
              ...(tipo === 'salida' ? styles.operationButtonActive : {}),
            }}
            onClick={() => setTipo('salida')}
          >
            Salida
          </button>

          <button
            style={{
              ...styles.operationButton,
              ...(tipo === 'reubicacion' ? styles.operationButtonActive : {}),
            }}
            onClick={() => setTipo('reubicacion')}
          >
            Reubicación
          </button>
        </div>

        <div style={styles.formGrid}>
          {tipo === 'entrada' && (
            <div style={styles.field}>
              <label style={styles.label}>Cantidad de pallets a ingresar</label>
              <input
                style={styles.input}
                type="number"
                min="1"
                value={palletsAIngresar}
                onChange={(e) => setPalletsAIngresar(e.target.value)}
                placeholder="Ej. 3"
              />
            </div>
          )}

          {tipo === 'entrada' && (
            <div style={styles.field}>
              <label style={styles.label}>Altura del pallet (m)</label>
              <input
                style={styles.input}
                type="number"
                min="0"
                step="0.01"
                value={alturaPallet}
                onChange={(e) => setAlturaPallet(e.target.value)}
                placeholder="Ej. 1.60"
              />
            </div>
          )}

          {tipo === 'entrada' && (
            <div style={styles.field}>
              <label style={styles.label}>Rotación del producto</label>

                <select
                  style={styles.input}
                  value={rotacion}
                  onChange={(e) =>
                    setRotacion(e.target.value as RotacionProducto)
                  }
                >
                <option value="Alta">
                  Alta - frente del carril
                </option>

                <option value="Media">
                  Media - zona intermedia
                </option>

                <option value="Baja">
                  Baja - fondo del carril
                </option>
              </select>
            </div>
          )}

          <div style={styles.field}>
            <label style={styles.label}>SKU / Producto</label>
            <input
              style={styles.input}
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              placeholder="Ej. PROD-001"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Descripción
            </label>

            <input
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Ej. Tostador eléctrico color negro"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Lote</label>
            <input
              style={styles.input}
              value={lote}
              onChange={(e) => setLote(e.target.value)}
              placeholder="Ej. L-2026"
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Cantidad</label>
            <input
              style={styles.input}
              type="number"
              min="1"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              placeholder="Ej. 10"
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Unidad</label>
            <select
              style={styles.input}
              value={unidad}
              onChange={(e) => {
                const nuevaUnidad = e.target.value as 'CAJA' | 'PIEZAS';

                setUnidad(nuevaUnidad);

                if (nuevaUnidad === 'PIEZAS') {
                  setPiezasPorCaja('');
                }
              }}
            >
              <option value="CAJA">CAJA</option>
              <option value="TAMBOR">TAMBOR</option>
              <option value="SACO">SACO</option>
              <option value="CUÑETE">CUÑETE</option>
              <option value="PIEZAS">PIEZAS</option>
            </select>
          </div>

          {unidad === 'CAJA' && (
            <div style={styles.field}>
              <label style={styles.label}>Piezas por caja</label>

              <input
                style={styles.input}
                type="number"
                min="1"
                value={piezasPorCaja}
                onChange={(e) => setPiezasPorCaja(e.target.value)}
                placeholder="Ej. 12"
              />
            </div>
          )}

          <div style={styles.field}>
            <label style={styles.label}>Total piezas</label>

            <input
              style={{
                ...styles.input,
                background: '#F3F4F6',
                fontWeight: 700,
              }}
              value={totalPiezasCalculadas}
              disabled
            />
          </div>

          {(tipo === 'salida' || tipo === 'reubicacion') && (
            <div style={styles.field}>
              <label style={styles.label}>Posición origen</label>
              <input
                style={styles.input}
                value={posicionOrigen}
                onChange={(e) => {
                  const valor = e.target.value.toUpperCase();
                  setPosicionOrigen(valor);
                }}
                onBlur={() => {
                  if (tipo === 'reubicacion' && posicionOrigen.trim()) {
                    cargarDatosDesdeOrigen(posicionOrigen.trim());
                  }
                }}
                placeholder="Ej. A01A o D1-A-1-1"
              />
            </div>
          )}

          {(tipo === 'entrada' || tipo === 'reubicacion') && (
            <div style={styles.field}>
              <label style={styles.label}>Posición destino</label>
              <input
                style={styles.input}
                value={posicionDestino}
                onChange={(e) => setPosicionDestino(e.target.value.toUpperCase())}
                placeholder="Ej. A01B o D2-F-2-3"
              />
            </div>
          )}

          <div style={styles.field}>
            <label style={styles.label}>Operador</label>
            <input
              style={styles.input}
              value={operador}
              onChange={(e) => setOperador(e.target.value)}
              placeholder="Nombre del operador"
            />
          </div>
        </div>

        {recomendacionActiva && (
          <div style={styles.recommendationCard}>
            <h3 style={styles.recommendationTitle}>
              Recomendación inteligente
            </h3>

            <p style={styles.recommendationText}>
              • Ingresar {recomendacionActiva.cantidadPallets} pallet(s) en{' '}
              {recomendacionActiva.tipoRackRecomendado === 'drive_in'
                ? 'Drive In'
                : 'Rack Selectivo'}
              .
            </p>

            {recomendacionActiva.tipoRackRecomendado === 'drive_in' && (
              <p style={styles.recommendationNote}>
                Prioridad operativa: completar la primera línea recomendada antes de continuar con la siguiente.
              </p>
            )}

            {recomendacionActiva.grupos.map((grupo) => (
              <div
                key={`${grupo.zona}-${grupo.linea ?? 'selectivo'}`}
                style={styles.recommendationGroup}
              >
                <p style={styles.recommendationText}>
                  <strong>Zona:</strong> {grupo.zona}
                </p>

                {grupo.linea && (
                  <p style={styles.recommendationText}>
                    <strong>Línea:</strong> {grupo.linea} → {grupo.posiciones.length} pallet(s)
                  </p>
                )}

                <div style={styles.positionsGrid}>
                  {grupo.posiciones.map((posicion) => (
                    <span key={posicion} style={styles.positionBadge}>
                      {posicion} ·{' '}
                      {
                        posicionesRackInfo.find(
                          (item) => item.posicion === posicion
                        )?.alturaMaxima
                      } m
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {tipo === 'entrada' && (
          <button
            style={styles.recommendButton}
            onClick={consultarRecomendacion}
          >
            Consultar ubicación recomendada
          </button>
        )}

        <button style={styles.submitButton} onClick={guardarMovimiento}>
          Confirmar pallet colocado
        </button>
      </div>
    </div>
  </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#f4f7fb',
    padding: 20,
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    margin: 0,
    fontSize: 28,
    color: '#111827',
  },
  subtitle: {
    marginTop: 6,
    color: '#6b7280',
  },
  card: {
    background: '#ffffff',
    borderRadius: 18,
    padding: 20,
    boxShadow: '0 10px 25px rgba(15, 23, 42, 0.08)',
    maxWidth: 760,
  },
  cardTitle: {
    marginTop: 0,
    marginBottom: 16,
    fontSize: 22,
    color: '#111827',
  },
  operationGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 10,
    marginBottom: 20,
  },
  operationButton: {
    border: '1px solid #d1d5db',
    background: '#ffffff',
    borderRadius: 12,
    padding: '14px 10px',
    fontWeight: 700,
    cursor: 'pointer',
    color: '#374151',
  },
  operationButtonActive: {
    background: '#2563eb',
    color: '#ffffff',
    borderColor: '#2563eb',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 14,
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: 700,
    color: '#374151',
  },
  input: {
    border: '1px solid #d1d5db',
    borderRadius: 12,
    padding: '13px 12px',
    fontSize: 15,
    outline: 'none',
  },
  message: {
    marginTop: 16,
    padding: 12,
    borderRadius: 12,
    background: '#eff6ff',
    color: '#1d4ed8',
    fontWeight: 700,
  },
  submitButton: {
    width: '100%',
    marginTop: 18,
    border: 'none',
    borderRadius: 14,
    padding: '15px 16px',
    background: '#16a34a',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 800,
    cursor: 'pointer',
  },
  messageError: {
    marginTop: '16px',
    padding: '16px',
    borderRadius: '16px',
    backgroundColor: '#FEF2F2',
    border: '1px solid #FECACA',
    color: '#B91C1C',
    fontSize: '18px',
    fontWeight: 700,
  },
  messageSuccess: {
    marginTop: '16px',
    padding: '16px',
    borderRadius: '16px',
    backgroundColor: '#ECFDF5',
    border: '1px solid #A7F3D0',
    color: '#047857',
    fontSize: '18px',
    fontWeight: 700,
  },
  toastSuccess: {
    position: 'fixed',
    top: 24,
    right: 24,
    background: '#16A34A',
    color: '#ffffff',
    padding: '16px 22px',
    borderRadius: 16,
    fontWeight: 700,
    fontSize: 16,
    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
    zIndex: 9999,
    minWidth: 280,
  },
  toastError: {
    position: 'fixed',
    top: 24,
    right: 24,
    background: '#DC2626',
    color: '#ffffff',
    padding: '16px 22px',
    borderRadius: 16,
    fontWeight: 700,
    fontSize: 16,
    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
    zIndex: 9999,
    minWidth: 280,
  },
  toastContent: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  toastIcon: {
    fontSize: 20,
  },
  recommendButton: {
    width: '100%',
    marginTop: 18,
    border: 'none',
    borderRadius: 14,
    padding: '15px 16px',
    background: '#2563EB',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 800,
    cursor: 'pointer',
  },
  recommendationCard: {
    marginTop: 18,
    padding: 16,
    borderRadius: 16,
    background: '#ECFDF5',
    border: '1px solid #A7F3D0',
  },
  recommendationTitle: {
    margin: 0,
    marginBottom: 8,
    fontSize: 18,
    color: '#065F46',
  },
  recommendationText: {
    margin: '6px 0',
    color: '#065F46',
    fontWeight: 600,
  },
  positionsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  positionBadge: {
    background: '#16A34A',
    color: '#ffffff',
    padding: '8px 10px',
    borderRadius: 999,
    fontWeight: 800,
    fontSize: 13,
  },
  recommendationGroup: {
    marginTop: 16,
  },
  recommendationNote: {
    margin: '10px 0 0',
    padding: '10px 12px',
    borderRadius: 12,
    background: '#D1FAE5',
    color: '#047857',
    fontWeight: 700,
    fontSize: 14,
  },
  workOrdersCard: {
    background: '#EEF2FF',
    border: '1px solid #C7D2FE',
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    maxWidth: 960,
  },
  workOrdersHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 16,
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  workOrdersTitle: {
    margin: 0,
    fontSize: 22,
    color: '#312E81',
  },
  workOrdersSubtitle: {
    margin: '6px 0 0',
    color: '#4F46E5',
    fontWeight: 600,
  },
  workOrdersCount: {
    background: '#ffffff',
    color: '#4338CA',
    border: '1px solid #C7D2FE',
    borderRadius: 999,
    padding: '8px 12px',
    fontWeight: 800,
    whiteSpace: 'nowrap',
  },
  workOrdersList: {
    display: 'grid',
    gap: 12,
  },
  workOrderItem: {
    background: '#ffffff',
    border: '1px solid #C7D2FE',
    borderRadius: 16,
    padding: 16,
  },
  workOrderTop: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 12,
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  workOrderId: {
    margin: 0,
    fontSize: 18,
    fontWeight: 900,
    color: '#111827',
  },
  workOrderText: {
    margin: '4px 0 0',
    color: '#64748B',
    fontWeight: 700,
  },
  workOrderStatus: {
    borderRadius: 999,
    padding: '6px 12px',
    fontSize: 13,
    fontWeight: 900,
    whiteSpace: 'nowrap',
  },
  workOrderGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: 12,
    marginTop: 12,
  },
  workOrderLabel: {
    margin: 0,
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: 900,
    textTransform: 'uppercase',
  },
  workOrderValue: {
    margin: '4px 0 0',
    color: '#334155',
    fontWeight: 800,
  },
  workOrderButton: {
    marginTop: 16,
    border: 'none',
    borderRadius: 14,
    padding: '13px 16px',
    background: '#111827',
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 900,
    cursor: 'pointer',
  },
};