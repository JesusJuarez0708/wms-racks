import { useRef, useState } from 'react';
import { racks } from '../data/racks';

import type { Movement } from '../types/movement';

import {
  useWmsData,
  type UnidadMovimiento,
  type EstadoPallet,
  type OrdenTrabajo,
} from '../context/WmsDataContext';

type Rack = (typeof racks)[number];

function getProgressClass(percentage: number) {
  if (percentage >= 95) return 'bg-red-600';
  if (percentage >= 80) return 'bg-orange-500';
  if (percentage >= 60) return 'bg-amber-400';
  if (percentage > 0) return 'bg-blue-600';
  return 'bg-slate-300';
}

function getOperationalStatus(percentage: number) {
  if (percentage >= 95) return 'Lleno';
  if (percentage >= 80) return 'Crítico';
  if (percentage >= 60) return 'Alto uso';
  if (percentage > 0) return 'En uso';
  return 'Disponible';
}

function getOperationalStatusClass(percentage: number) {
  if (percentage >= 95) return 'bg-red-100 text-red-700';
  if (percentage >= 80) return 'bg-orange-100 text-orange-700';
  if (percentage >= 60) return 'bg-amber-100 text-amber-700';
  if (percentage > 0) return 'bg-blue-100 text-blue-700';
  return 'bg-emerald-100 text-emerald-700';
}

function RacksPage() {
  const zones = Array.from(new Set(racks.map((rack) => rack.zone)));
  const [activeZone, setActiveZone] = useState(zones[0]);
  const [selectedRack, setSelectedRack] = useState<Rack | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [showPositionModal, setShowPositionModal] = useState(false);
  const [locationSearch, setLocationSearch] = useState('');
  const [selectedCarril, setSelectedCarril] = useState<string | null>(null);

  const [mostrarCentroOptimizacion, setMostrarCentroOptimizacion] =
  useState(false);

  const {
    movimientos,
    setMovimientos,
    agregarMovimiento,
    ordenesTrabajo,
    setOrdenesTrabajo,
    avanzarEstadoOrdenTrabajo,
  } = useWmsData();

  function obtenerRotacionDemoSalubrite(descripcion: string) {
    const producto = descripcion.toUpperCase();

    if (
      producto.includes('TAURINA') ||
      producto.includes('PROTEINA') ||
      producto.includes('L-ACIDO GLUTAMICO')
    ) {
      return 'Alta';
    }

    if (
      producto.includes('GABA') ||
      producto.includes('L-CITRULINA') ||
      producto.includes('L-TIROSINA') ||
      producto.includes('L-GLUTAMINA')
    ) {
      return 'Media';
    }

    return 'Baja';
  }

  function cargarDemoHeatmap() {
    

  const inventarioSalubrite = [
    {
      posicion: 'D2-N-1-1',
      lote: '241005',
      presentacion: 'TAMBOR',
      descripcion: 'BETA-ALANINA',
      pallets: 2,
      piezas: 23,
    },
    {
      posicion: 'F29C',
      lote: '241005',
      presentacion: 'TAMBOR',
      descripcion: 'BETA-ALANINA',
      pallets: 1,
      piezas: 12,
    },
    {
      posicion: 'D2-J-3-1',
      lote: '241005',
      presentacion: 'TAMBOR',
      descripcion: 'BETA-ALANINA',
      pallets: 1,
      piezas: 15,
    },
    {
      posicion: 'D2-J-3-2',
      lote: '241005',
      presentacion: 'TAMBOR',
      descripcion: 'BETA-ALANINA',
      pallets: 1,
      piezas: 15,
    },
    {
      posicion: 'F18B',
      lote: 'A20250932C',
      presentacion: 'CAJA',
      descripcion: 'CREATINA',
      pallets: 1,
      piezas: 10,
    },
    {
      posicion: 'D2-J-3-3',
      lote: 'GA2025120101',
      presentacion: 'TAMBOR',
      descripcion: 'GABA',
      pallets: 1,
      piezas: 16,
    },
    {
      posicion: 'D2-M-1-2',
      lote: '1012311160200',
      presentacion: 'TAMBOR',
      descripcion: 'INOSITOL',
      pallets: 1,
      piezas: 12,
    },
    {
      posicion: 'D2-J-3-5',
      lote: '1012408270200',
      presentacion: 'TAMBOR',
      descripcion: 'INOSITOL',
      pallets: 1,
      piezas: 29,
    },
    {
      posicion: 'D2-J-3-4',
      lote: '1012408270200',
      presentacion: 'TAMBOR',
      descripcion: 'INOSITOL',
      pallets: 1,
      piezas: 28,
    },
    {
      posicion: 'H10A',
      lote: '2511008',
      presentacion: 'SACO',
      descripcion: 'L-ACIDO ASPARTICO',
      pallets: 1,
      piezas: 12,
    },
    {
      posicion: 'D2-L-1-4',
      lote: '20251219',
      presentacion: 'SACO',
      descripcion: 'L-ACIDO GLUTAMICO',
      pallets: 2,
      piezas: 56,
    },
    {
      posicion: 'D2-L-1-3',
      lote: '20251219',
      presentacion: 'SACO',
      descripcion: 'L-ACIDO GLUTAMICO',
      pallets: 2,
      piezas: 56,
    },
    {
      posicion: 'D2-J-1-5',
      lote: '20251219',
      presentacion: 'SACO',
      descripcion: 'L-ACIDO GLUTAMICO',
      pallets: 2,
      piezas: 56,
    },
    {
      posicion: 'D2-J-1-3',
      lote: '20251219',
      presentacion: 'SACO',
      descripcion: 'L-ACIDO GLUTAMICO',
      pallets: 2,
      piezas: 56,
    },
    {
      posicion: 'D2-J-1-2',
      lote: '20251219',
      presentacion: 'SACO',
      descripcion: 'L-ACIDO GLUTAMICO',
      pallets: 2,
      piezas: 60,
    },
    {
      posicion: 'D2-J-1-4',
      lote: '20251219',
      presentacion: 'SACO',
      descripcion: 'L-ACIDO GLUTAMICO',
      pallets: 2,
      piezas: 64,
    },
    {
      posicion: 'D2-L-1-5',
      lote: '20251219',
      presentacion: 'SACO',
      descripcion: 'L-ACIDO GLUTAMICO',
      pallets: 2,
      piezas: 64,
    },
    {
      posicion: 'D2-L-1-2',
      lote: '20251219',
      presentacion: 'SACO',
      descripcion: 'L-ACIDO GLUTAMICO',
      pallets: 1,
      piezas: 20,
    },
    {
      posicion: 'F14C',
      lote: '20251126',
      presentacion: 'SACO',
      descripcion: 'L-ALANINA',
      pallets: 1,
      piezas: 10,
    },
    {
      posicion: 'D2-N-1-2',
      lote: 'HK012410520',
      presentacion: 'TAMBOR',
      descripcion: 'L-CITRULINA BASE',
      pallets: 1,
      piezas: 6,
    },
    {
      posicion: 'E14D',
      lote: 'HK012410520',
      presentacion: 'TAMBOR',
      descripcion: 'L-CITRULINA BASE',
      pallets: 1,
      piezas: 16,
    },
    {
      posicion: 'F13C',
      lote: 'FTY0108251129-42',
      presentacion: 'CAJA',
      descripcion: 'LECITINA DE SOYA',
      pallets: 1,
      piezas: 23,
    },
    {
      posicion: 'D2-M-2-1',
      lote: '1025081401',
      presentacion: 'TAMBOR',
      descripcion: 'L-TIROSINA',
      pallets: 1,
      piezas: 24,
    },
    {
      posicion: 'E12B',
      lote: '202503004-02',
      presentacion: 'SACO',
      descripcion: 'PROTEINA DE ARROZ',
      pallets: 1,
      piezas: 25,
    },
    {
      posicion: 'F10C',
      lote: '3700D04019DB250590',
      presentacion: 'SACO',
      descripcion: 'PROTEINA DE CHICHARO',
      pallets: 1,
      piezas: 25,
    },
    {
      posicion: 'E08C',
      lote: '3700D04019DB250590',
      presentacion: 'SACO',
      descripcion: 'PROTEINA DE CHICHARO',
      pallets: 1,
      piezas: 10,
    },
    {
      posicion: 'D2-N-1-2',
      lote: '20250618',
      presentacion: 'TAMBOR',
      descripcion: 'RIBOSA',
      pallets: 1,
      piezas: 8,
    },
    {
      posicion: 'D2-M-1-1',
      lote: 'XK23093140',
      presentacion: 'CAJA',
      descripcion: 'TAURINA',
      pallets: 1,
      piezas: 31,
    },
    {
      posicion: 'D2-M-1-2',
      lote: 'GT202508006',
      presentacion: 'TAMBOR',
      descripcion: 'TE VERDE 50% EXT',
      pallets: 1,
      piezas: 4,
    },
    {
      posicion: 'D2-N-1-2',
      lote: 'GM2505020',
      presentacion: 'TAMBOR',
      descripcion: 'L-GLUTAMINA',
      pallets: 0,
      piezas: 8,
    },
  ];

  const posicionesAgrupadas = inventarioSalubrite.reduce(
    (acc, item) => {
      if (!acc[item.posicion]) {
        acc[item.posicion] = [];
      }

      acc[item.posicion].push(item);

      return acc;
    },
    {} as Record<string, typeof inventarioSalubrite>
  );

    Object.entries(posicionesAgrupadas).forEach(
      ([posicion, contenidosPosicion]) => {
        const totalPallets = contenidosPosicion.reduce(
          (sum, item) => sum + item.pallets,
          0
        );

        const totalPiezas = contenidosPosicion.reduce(
          (sum, item) => sum + item.piezas,
          0
        );

        let estadoPallet: EstadoPallet = 'completo';

        if (contenidosPosicion.length > 1) {
          estadoPallet = 'mixto';
        } else if (totalPallets === 0) {
          estadoPallet = 'parcial';
        }

        agregarMovimiento({
          id: crypto.randomUUID(),
          tipo: 'entrada',
          sku: contenidosPosicion[0].descripcion,
          descripcion:
            contenidosPosicion.length > 1
              ? `PALLET MIXTO (${contenidosPosicion.length} productos)`
              : `${contenidosPosicion[0].presentacion} ${contenidosPosicion[0].descripcion}`,
          lote: contenidosPosicion[0].lote,
          cantidad: totalPallets,
          unidad: contenidosPosicion[0].presentacion as UnidadMovimiento,
          piezasPorCaja: totalPiezas,
          totalPiezas,
          posicionDestino: posicion,
          operador: 'Carlos Torres',
          fecha: new Date().toISOString(),
          rotacion: obtenerRotacionDemoSalubrite(contenidosPosicion[0].descripcion),
          estadoPallet,
          contenidos: contenidosPosicion.map((item) => ({
            sku: item.descripcion,
            descripcion: item.descripcion,
            lote: item.lote,
            presentacion: item.presentacion as UnidadMovimiento,
            pallets: item.pallets,
            piezas: item.piezas,
          })),
        });
      }
    );
  }

  const limpiarDemoHeatmap = () => {
    console.log('ANTES', ordenesTrabajo);

    setMovimientos([]);
    setOrdenesTrabajo([]);

    console.log('LIMPIANDO...');
  };

  function obtenerMovimientoPorUbicacion(location: string) {
    const posicionesOcupadas = new Map<string, (typeof movimientos)[number]>();

    const movimientosOrdenados = [...movimientos].sort(
      (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
    );

    movimientosOrdenados.forEach((mov) => {
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
          posicionesOcupadas.set(mov.posicionDestino, mov);
        }
      }
    });

    return posicionesOcupadas.get(location);
  }

  function obtenerCarrilDriveIn(location: string) {
    const partes = location.split('-');

    if (partes.length < 4) return null;

    return partes[1];
  }

  function obtenerColorProducto(
    sku?: string | null,
    skusRack: string[] = []
  ) {
    if (!sku) {
      return {
        bg: 'bg-blue-600',
        border: 'border-blue-600',
        text: 'text-white',
      };
    }

    const colores = [
      { bg: 'bg-blue-600', border: 'border-blue-600', text: 'text-white' },
      { bg: 'bg-orange-500', border: 'border-orange-500', text: 'text-white' },
      { bg: 'bg-emerald-500', border: 'border-emerald-500', text: 'text-white' },
      { bg: 'bg-pink-500', border: 'border-pink-500', text: 'text-white' },
      { bg: 'bg-violet-500', border: 'border-violet-500', text: 'text-white' },
      { bg: 'bg-cyan-500', border: 'border-cyan-500', text: 'text-white' },
      { bg: 'bg-amber-500', border: 'border-amber-500', text: 'text-white' },
      { bg: 'bg-lime-600', border: 'border-lime-600', text: 'text-white' },
      { bg: 'bg-red-500', border: 'border-red-500', text: 'text-white' },
      { bg: 'bg-slate-700', border: 'border-slate-700', text: 'text-white' },
    ];

    const indexSku = skusRack.indexOf(sku);

    if (indexSku >= 0) {
      return colores[indexSku % colores.length];
    }

    return colores[0];
  }

  function obtenerResumenCarriles(rack: Rack) {
    const resumen = new Map<
      string,
      {
        total: number;
        ocupados: number;
      }
    >();

    rack.locations.forEach((location) => {
      const carril = obtenerCarrilDriveIn(location);

      if (!carril) return;

      const actual = resumen.get(carril) ?? {
        total: 0,
        ocupados: 0,
      };

      actual.total += 1;

      if (obtenerMovimientoPorUbicacion(location)) {
        actual.ocupados += 1;
      }

      resumen.set(carril, actual);
    });

    return Array.from(resumen.entries()).map(([carril, datos]) => ({
      carril,
      total: datos.total,
      ocupados: datos.ocupados,
      libres: datos.total - datos.ocupados,
      porcentaje: Math.round((datos.ocupados / datos.total) * 100),
    }));
  }

  function obtenerRecomendacionesCarriles(rack: Rack) {
    const carriles = obtenerResumenCarriles(rack);

    const llenos = carriles.filter((carril) => carril.porcentaje >= 95);
    const criticos = carriles.filter(
      (carril) => carril.porcentaje >= 80 && carril.porcentaje < 95
    );
    const disponibles = carriles
      .filter((carril) => carril.porcentaje < 60)
      .sort((a, b) => a.porcentaje - b.porcentaje);

    const recomendaciones: string[] = [];

    llenos.forEach((carril) => {
      recomendaciones.push(
        `Línea ${carril.carril} está llena. Evita nuevas entradas en esta línea.`
      );
    });

    criticos.forEach((carril) => {
      recomendaciones.push(
        `Línea ${carril.carril} está en capacidad crítica. Se recomienda usar otra línea.`
      );
    });

    if (disponibles.length > 0 && (llenos.length > 0 || criticos.length > 0)) {
      recomendaciones.push(
        `Sugerencia operativa: usar Línea ${disponibles[0].carril}, tiene mayor disponibilidad.`
      );
    }

    if (recomendaciones.length === 0) {
      recomendaciones.push(
        'La distribución actual se encuentra estable. No hay alertas operativas relevantes.'
      );
    }

    return recomendaciones;
  }

  function obtenerCarrilRecomendado(rack: Rack) {
    const carriles = obtenerResumenCarriles(rack);

    const disponibles = carriles
      .filter((carril) => carril.porcentaje < 60)
      .sort((a, b) => {
        if (a.porcentaje !== b.porcentaje) {
          return a.porcentaje - b.porcentaje;
        }

        return b.libres - a.libres;
      });

    return disponibles[0] ?? null;
  }

  function obtenerMetricasOperativas(
    rack: Rack,
    movimientos: any[]
  ) {
    const movimientosRack = movimientos.filter((movimiento) =>
      movimiento.posicionDestino?.startsWith(rack.name)
    );

    const totalMovimientos = movimientosRack.length;

    const operadores = new Map<string, number>();

    movimientosRack.forEach((movimiento) => {
      operadores.set(
        movimiento.operador,
        (operadores.get(movimiento.operador) || 0) + 1
      );
    });

    const operadorTop =
      [...operadores.entries()].sort((a, b) => b[1] - a[1])[0] || null;

    const movimientosEntrada = movimientosRack.filter(
      (movimiento) => movimiento.tipo === 'entrada'
    ).length;

    const movimientosSalida = movimientosRack.filter(
      (movimiento) => movimiento.tipo === 'salida'
    ).length;

    const movimientosReubicacion = movimientosRack.filter(
      (movimiento) => movimiento.tipo === 'reubicacion'
    ).length;

    return {
      totalMovimientos,
      movimientosEntrada,
      movimientosSalida,
      movimientosReubicacion,
      operadorTop,
    };
  }

  function convertirPosicion(posicion?: string) {
    if (!posicion) {
      return {
        rack: 'Rack',
        location: '',
      };
    }

    const rackEncontrado = racks.find((rack) =>
      rack.locations.includes(posicion)
    );

    return {
      rack: rackEncontrado?.name ?? 'Rack',
      location: posicion,
    };
  }

  const movements: Movement[] = (() => {
    const posicionesOcupadas = new Map<string, Movement>();

    const movimientosOrdenados = [...movimientos].sort(
      (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
    );

    movimientosOrdenados.forEach((mov) => {
      if (mov.tipo === 'entrada' && mov.posicionDestino) {
        const ubicacionDestino = convertirPosicion(mov.posicionDestino);
        const keyDestino = `${ubicacionDestino.rack}-${ubicacionDestino.location}`;

        posicionesOcupadas.set(keyDestino, {
          id: mov.id,
          rack: ubicacionDestino.rack,
          location: ubicacionDestino.location,
          product: mov.sku,
          operator: mov.operador,
          type: 'Entrada',
          status: 'Pendiente',
          priority: 'Media',
          createdAt: new Date(mov.fecha).toLocaleString(),
        });
      }

      if (mov.tipo === 'salida' && mov.posicionOrigen) {
        const ubicacionOrigen = convertirPosicion(mov.posicionOrigen);
        const keyOrigen = `${ubicacionOrigen.rack}-${ubicacionOrigen.location}`;

        posicionesOcupadas.delete(keyOrigen);
      }

      if (
        mov.tipo === 'reubicacion' &&
        mov.posicionOrigen &&
        mov.posicionDestino
      ) {
        const ubicacionOrigen = convertirPosicion(mov.posicionOrigen);
        const ubicacionDestino = convertirPosicion(mov.posicionDestino);

        const keyOrigen = `${ubicacionOrigen.rack}-${ubicacionOrigen.location}`;
        const keyDestino = `${ubicacionDestino.rack}-${ubicacionDestino.location}`;

        const productoOrigen = posicionesOcupadas.get(keyOrigen);

        posicionesOcupadas.delete(keyOrigen);

        posicionesOcupadas.set(keyDestino, {
          id: mov.id,
          rack: ubicacionDestino.rack,
          location: ubicacionDestino.location,
          product: productoOrigen?.product ?? mov.sku,
          operator: mov.operador,
          type: 'Reubicación',
          status: 'Pendiente',
          priority: 'Media',
          createdAt: new Date(mov.fecha).toLocaleString(),
        });
      }
    });

    return Array.from(posicionesOcupadas.values());
  })();

  const positionDetail =
    selectedRack && selectedPosition
      ? (() => {
        const movement = obtenerMovimientoPorUbicacion(selectedPosition);

          return {
            position: selectedPosition,
            occupied: !!movement,
            product: movement?.sku ?? null,
            description: movement?.descripcion ?? null,
            operator: movement?.operador ?? null,
            movementType: movement?.tipo ?? null,
            posicionOrigen: movement?.posicionOrigen ?? null,
            posicionDestino: movement?.posicionDestino ?? null,
            status: movement ? 'Ocupado' : null,
            createdAt: movement?.fecha
              ? new Date(movement.fecha).toLocaleString()
              : null,
            lote: movement?.lote ?? null,
            rotacion: movement?.rotacion ?? null,
            diasAlmacenado: movement?.fecha
              ? Math.max(
                  0,
                  Math.floor(
                    (new Date().getTime() - new Date(movement.fecha).getTime()) /
                      (1000 * 60 * 60 * 24)
                  )
                )
              : null,
            cantidad: movement?.cantidad ?? null,
            unidad: movement?.unidad ?? null,
            piezasPorCaja: movement?.piezasPorCaja ?? null,
            totalPiezas: movement?.totalPiezas ?? null,
            estadoPallet: movement?.estadoPallet ?? null,
            contenidos: movement?.contenidos ?? [],
          };
        })()
      : null;

  const detailRef = useRef<HTMLElement | null>(null);
  const positionDetailRef = useRef<HTMLDivElement | null>(null);

  const zoneRacks = racks.filter((rack) => rack.zone === activeZone);

  const ordenesTrabajoCompletadas = ordenesTrabajo.filter(
    (orden) => orden.estado === 'completada'
  );

  function getRackStats(rack: Rack) {
    const positions = Array.from(
      { length: rack.capacity },
      (_, index) => index + 1
    );

    const occupied = positions.filter((position) => {
      const locationName =
        rack.locations[position - 1] ?? `${rack.name} / Posición ${position}`;

      return movements.some(
        (mov) =>
          (mov.rack === rack.name || mov.rack === `Rack ${rack.name}`) &&
          mov.location === locationName
      );
    }).length;

    const available = rack.capacity - occupied;
    const percentage = Math.round((occupied / rack.capacity) * 100);

    return {
      occupied,
      available,
      percentage,
    };
  }

  function obtenerLeyendaProductos(
    rack: Rack,
    carrilSeleccionado?: string | null
  ) {
    const resumen = new Map<
      string,
      {
        sku: string;
        descripcion: string;
        cantidad: number;
        color: ReturnType<typeof obtenerColorProducto>;
      }
    >();

    const locationsParaLeyenda =
      rack.zone === 'Drive In' && carrilSeleccionado
        ? rack.locations.filter(
            (location) =>
              obtenerCarrilDriveIn(location) === carrilSeleccionado
          )
        : rack.locations;

    const skusRack = Array.from(
      new Set(
        locationsParaLeyenda
          .map((ubicacion) => obtenerMovimientoPorUbicacion(ubicacion)?.sku)
          .filter(Boolean)
      )
    ) as string[];

    locationsParaLeyenda.forEach((location) => {
      const movimiento = obtenerMovimientoPorUbicacion(location);

      if (!movimiento?.sku) return;

      const actual = resumen.get(movimiento.sku);

      if (actual) {
        actual.cantidad += 1;
        return;
      }

      resumen.set(movimiento.sku, {
        sku: movimiento.sku,
        descripcion: movimiento.descripcion || movimiento.sku,
        cantidad: 1,
        color: obtenerColorProducto(movimiento.sku, skusRack),
      });
    });

    return {
      productos: Array.from(resumen.values()),
      totalUbicaciones: locationsParaLeyenda.length,
      libres:
        locationsParaLeyenda.length -
        Array.from(resumen.values()).reduce(
          (total, item) => total + item.cantidad,
          0
        ),
    };
  }

  function obtenerOpinionUbicacion(positionDetail: any) {
    if (!positionDetail?.occupied) {
      return {
        titulo: 'Ubicación disponible',
        mensaje:
          'Esta posición está libre y puede utilizarse para nuevos ingresos según la recomendación del sistema.',
        clase: 'border-emerald-200 bg-emerald-50 text-emerald-800',
        icono: '✅',
      };
    }

    if (positionDetail.rotacion === 'Alta') {
      return {
        titulo: 'Ubicación prioritaria',
        mensaje:
          'Producto de alta rotación. Se recomienda mantenerlo en posiciones de fácil acceso para reducir tiempos de operación.',
        clase: 'border-red-200 bg-red-50 text-red-800',
        icono: '⚡',
      };
    }

    if (positionDetail.rotacion === 'Media') {
      return {
        titulo: 'Ubicación adecuada',
        mensaje:
          'Producto de rotación media. La ubicación actual es aceptable, pero puede ajustarse si se requiere optimizar espacio.',
        clase: 'border-amber-200 bg-amber-50 text-amber-800',
        icono: '🧠',
      };
    }

    if (positionDetail.rotacion === 'Baja') {
      return {
        titulo: 'Revisar profundidad',
        mensaje:
          'Producto de baja rotación. Se recomienda ubicarlo en posiciones más profundas para reservar el frente a productos de mayor movimiento.',
        clase: 'border-blue-200 bg-blue-50 text-blue-800',
        icono: '📦',
      };
    }

    return {
      titulo: 'Sin datos suficientes',
      mensaje:
        'No hay información suficiente de rotación para emitir una recomendación operativa.',
      clase: 'border-slate-200 bg-slate-50 text-slate-700',
      icono: 'ℹ️',
    };
  }

  function obtenerOportunidadesConsolidacion(rack: Rack) {
    const oportunidades: {
      ubicacion: string;
      tipo: string;
      totalPiezas: number;
      productos: {
        descripcion: string;
        lote: string;
        piezas: number;
        presentacion: string;
      }[];
    }[] = [];

    rack.locations.forEach((location) => {
      const movimiento = obtenerMovimientoPorUbicacion(location);

      if (!movimiento) return;

      const contenidos = movimiento.contenidos ?? [];

      const esMixto = contenidos.length > 1;
      const esParcial = contenidos.some((contenido) => contenido.pallets === 0);

      if (esMixto || esParcial) {
        oportunidades.push({
          ubicacion: location,
          tipo: esMixto ? 'Pallet mixto' : 'Pallet parcial',
          totalPiezas: contenidos.reduce(
            (total, contenido) => total + contenido.piezas,
            0
          ),
          productos: contenidos.map((contenido) => ({
            descripcion: contenido.descripcion,
            lote: contenido.lote,
            piezas: contenido.piezas,
            presentacion: contenido.presentacion,
          })),
        });
      }
    });

    return oportunidades;
  }

  function obtenerConsolidacionesRecomendadas(rack: Rack) {
    const grupos = new Map<
      string,
      {
        descripcion: string;
        lote: string;
        ubicaciones: {
          ubicacion: string;
          piezas: number;
        }[];
      }
    >();

    rack.locations.forEach((location) => {
      const movimiento = obtenerMovimientoPorUbicacion(location);

      if (!movimiento) return;

      const contenidos =
        movimiento.contenidos?.length
          ? movimiento.contenidos
          : [
              {
                descripcion: movimiento.descripcion ?? movimiento.sku,
                lote: movimiento.lote ?? '',
                piezas: movimiento.totalPiezas ?? 0,
              },
            ];

      contenidos.forEach((contenido) => {
        const key = `${contenido.descripcion}-${contenido.lote}`;

        if (!grupos.has(key)) {
          grupos.set(key, {
            descripcion: contenido.descripcion,
            lote: contenido.lote,
            ubicaciones: [],
          });
        }

        grupos.get(key)?.ubicaciones.push({
          ubicacion: location,
          piezas: contenido.piezas,
        });
      });
    });

    return Array.from(grupos.values())
      .filter((grupo) => grupo.ubicaciones.length > 1)
      .map((grupo) => {
        const ubicacionesOrdenadas = [...grupo.ubicaciones].sort(
          (a, b) => b.piezas - a.piezas
        );

        const destino = ubicacionesOrdenadas[0];
        const origenes = ubicacionesOrdenadas.slice(1);

        const espaciosLiberables = origenes.length;

        const prioridad =
          espaciosLiberables >= 4
            ? 'Alta'
            : espaciosLiberables >= 2
            ? 'Media'
            : 'Baja';

        const score = Math.min(
          100,
          40 + espaciosLiberables * 10 + grupo.ubicaciones.length * 5
        );

        const motivo = [
          `Mayor cantidad actual: ${destino.piezas} piezas en ${destino.ubicacion}.`,
          'Mismo producto y mismo lote.',
          `Oportunidad de liberar hasta ${espaciosLiberables} espacio(s).`,
        ];

        const reduccionFragmentacion = Math.round(
          (espaciosLiberables / grupo.ubicaciones.length) * 100
        );

        const impacto = [
          `Recuperación potencial: ${espaciosLiberables} ubicación(es).`,
          `Reducción de fragmentación: ${reduccionFragmentacion}%.`,
          `Prioridad operativa: ${prioridad}.`,
        ];

        return {
          ...grupo,
          destino,
          origenes,
          espaciosLiberables,
          prioridad,
          score,
          motivo,
          impacto,
        };
      });
  }

  function calcularScoreInteligente(
    grupo: any,
    ocupacionCarril: number,
  ) {
    let score = 0;

    const motivos: string[] = [];

    if (grupo.prioridad === 'Alta') {
      score += 25;
      motivos.push('Rotación alta (+25)');
    }

    if (grupo.prioridad === 'Media') {
      score += 15;
      motivos.push('Rotación media (+15)');
    }

    if (grupo.prioridad === 'Baja') {
      score += 5;
      motivos.push('Rotación baja (+5)');
    }

    if (grupo.origenes.length >= 2) {
      score += 25;
      motivos.push('Consolida múltiples posiciones (+25)');
    }

    if (ocupacionCarril >= 80) {
      score += 20;
      motivos.push('Carril con alta ocupación (+20)');
    }

    if (grupo.origenes.length === 1) {
      score += 10;
      motivos.push('Movimiento simple (+10)');
    }

    score = Math.min(score, 100);

    return {
      score,
      motivos,
    };
  }

  function crearOrdenTrabajo(
    grupo: ReturnType<typeof obtenerConsolidacionesRecomendadas>[number]
  ) {
    const yaExiste = ordenesTrabajo.some(
      (orden) =>
        orden.producto === grupo.descripcion &&
        orden.lote === grupo.lote &&
        orden.destino === grupo.destino.ubicacion
    );

    if (yaExiste) {
      alert('Ya existe una orden de trabajo para este producto, lote y destino.');
      return;
    }

    const resultadoScore =
      calcularScoreInteligente(
        grupo,
        grupo.porcentajeOcupacion ?? 0,
      );
    
    const nuevaOrden = {
      id: `OT-${String(ordenesTrabajo.length + 1).padStart(4, '0')}`,
      producto: grupo.descripcion,
      lote: grupo.lote,
      cantidad: grupo.origenes.length,
      unidad: 'PALLET',

      totalPiezas: grupo.origenes.reduce(
        (total, origen) => total + origen.piezas,
        0
      ),

      destino: grupo.destino.ubicacion,
      origenes: grupo.origenes.map((origen) => origen.ubicacion),
      prioridad: grupo.prioridad,
      score: resultadoScore.score,
      motivosScore: resultadoScore.motivos,
      fecha: new Date().toLocaleString(),
      estado: 'pendiente' as EstadoOrdenTrabajo,
      responsable: null,
      fechaAsignacion: null,
      fechaInicio: null,
      fechaCompletado: null,
    };

    setOrdenesTrabajo((prev) => [nuevaOrden, ...prev]);
  }

  function obtenerTextoEstadoOT(estado: EstadoOrdenTrabajo) {
    if (estado === 'pendiente') return 'Pendiente';
    if (estado === 'asignada') return 'Asignada';
    if (estado === 'en_proceso') return 'En proceso';
    return 'Completada';
  }

  function obtenerColorEstadoOT(estado: EstadoOrdenTrabajo) {
    if (estado === 'pendiente') return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    if (estado === 'asignada') return 'bg-blue-100 text-blue-700 border-blue-200';
    if (estado === 'en_proceso') return 'bg-purple-100 text-purple-700 border-purple-200';
    return 'bg-green-100 text-green-700 border-green-200';
  }

  function obtenerTextoBotonEstadoOT(estado: EstadoOrdenTrabajo) {
    if (estado === 'pendiente') return 'Asignar OT';
    if (estado === 'asignada') return 'Iniciar ejecución';
    if (estado === 'en_proceso') return 'Completar OT';
    return 'Completada';
  }
  
  return (
    <div className="space-y-6">
      <header className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Layout de almacén
        </p>

        <h1 className="mt-2 text-3xl font-bold">Racks y Drive In</h1>

        <p className="mt-2 text-slate-600">
          Visualización de capacidad, ocupación y estado operativo por zona.
        </p>

        <div className="mt-5 mb-5 flex flex-wrap gap-3">
          <button
            onClick={cargarDemoHeatmap}
            className="rounded-xl bg-purple-100 px-4 py-3 text-sm font-semibold text-purple-700 hover:bg-purple-200"
          >
            Cargar demo Salubrite
          </button>

          <button
            onClick={limpiarDemoHeatmap}
            className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200"
          >
            Limpiar demo
          </button>
        </div>

      </header>

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-wrap gap-3">
          {zones.map((zone) => (
            <button
              key={zone}
              onClick={() => {
                setActiveZone(zone);
                setSelectedRack(null);
              }}
              className={`rounded-xl px-5 py-3 text-sm font-semibold transition ${
                activeZone === zone
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {zone}
            </button>
          ))}
        </div>

        <div className="mb-5">
          <h2 className="text-xl font-bold">{activeZone}</h2>
          <p className="text-sm text-slate-500">
            {zoneRacks.length} ubicaciones registradas
          </p>
        </div>

        <div className="grid items-start gap-4 md:grid-cols-2 xl:grid-cols-4">
          {zoneRacks.map((rack) => {
            const { occupied, available, percentage } = getRackStats(rack);

            return (
              <button
                key={rack.id}
                onClick={() => {
                  setSelectedRack(rack);
                  setSelectedPosition(null);
                  setLocationSearch('');
                  setSelectedCarril(null);

                  setTimeout(() => {
                    detailRef.current?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                  }, 100);
                }}
                className={`rounded-2xl border bg-slate-50 p-5 text-left transition hover:-translate-y-1 hover:shadow-md ${
                  selectedRack?.id === rack.id
                    ? 'border-blue-500 ring-2 ring-blue-100'
                    : 'border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold">{rack.name}</h3>

                    <span
                      className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${getOperationalStatusClass(
                        percentage
                      )}`}
                    >
                      {getOperationalStatus(percentage)}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    Capacidad: {rack.capacity} ubicaciones
                  </p>
                </div>

                <div className="mt-5">
                  <div className="mb-2 flex justify-between text-sm text-slate-600">
                    <span>Ocupación</span>
                    <span>{percentage}%</span>
                  </div>

                  <div className="h-3 rounded-full bg-slate-200">
                    <div
                      className={`h-3 rounded-full ${getProgressClass(percentage)}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-white p-3">
                    <p className="text-slate-500">Ocupados</p>
                    <p className="text-xl font-bold">{occupied}</p>
                  </div>

                  <div className="rounded-xl bg-white p-3">
                    <p className="text-slate-500">Libres</p>
                    <p className="text-xl font-bold">{available}</p>
                  </div>
                </div>

              </button>
            );
          })}
        </div>
      </section>

      {selectedRack && (
        <section
          ref={detailRef}
          className="rounded-2xl bg-white p-6 shadow-sm"
        >
          {(() => {

          const metricasOperativas = obtenerMetricasOperativas(
            selectedRack,
            movimientos
          );

          const positions = Array.from(
            { length: selectedRack.capacity },
            (_, index) => index + 1
          );

          const realOccupied = positions.filter((position) => {
            const locationName =
              selectedRack.locations[position - 1] ??
              `${selectedRack.name} / Posición ${position}`;

            return movements.some(
              (mov) =>
                (mov.rack === selectedRack.name ||
                  mov.rack === `Rack ${selectedRack.name}`) &&
                mov.location === locationName
            );
          }).length;

          const realAvailable = selectedRack.capacity - realOccupied;

          const realPercentage = Math.round(
            (realOccupied / selectedRack.capacity) * 100
          );

          const filteredLocations = selectedRack.locations.filter((location) => {
            const matchesSearch = location
              .toLowerCase()
              .includes(locationSearch.toLowerCase());

            const matchesCarril =
              selectedRack.zone !== 'Drive In' ||
              !selectedCarril ||
              obtenerCarrilDriveIn(location) === selectedCarril;

            return matchesSearch && matchesCarril;
          });

          const leyenda = obtenerLeyendaProductos(
            selectedRack,
            selectedCarril
          );

            return (
              <div>
                <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                      Detalle visual
                    </p>

                    <h2 className="mt-1 text-2xl font-bold">
                      {selectedRack.zone} / {selectedRack.name}
                    </h2>

                    <p className="mt-1 text-slate-500">
                      Capacidad: {selectedRack.capacity} ubicaciones · Ocupación:{' '}
                      {realPercentage}%
                    </p>
                  </div>

                  <div className="mt-5 mb-5 flex flex-wrap gap-3">
                    <button
                      onClick={() => setSelectedRack(null)}
                      className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200"
                    >
                      Cerrar detalle
                    </button>
                  </div>
                </div>

                <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                      Movimientos
                    </p>

                    <p className="mt-2 text-3xl font-black text-slate-900">
                      {metricasOperativas?.totalMovimientos ?? 0}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                    <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">
                      Entradas
                    </p>

                    <p className="mt-2 text-3xl font-black text-emerald-900">
                      {metricasOperativas?.movimientosEntrada ?? 0}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
                    <p className="text-xs font-bold uppercase tracking-wide text-red-700">
                      Salidas
                    </p>

                    <p className="mt-2 text-3xl font-black text-red-900">
                      {metricasOperativas?.movimientosSalida ?? 0}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                    <p className="text-xs font-bold uppercase tracking-wide text-amber-700">
                      Reubicaciones
                    </p>

                    <p className="mt-2 text-3xl font-black text-amber-900">
                      {metricasOperativas?.movimientosReubicacion ?? 0}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
                    <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
                      Operador líder
                    </p>

                    <p className="mt-2 text-lg font-black text-blue-900">
                      {metricasOperativas?.operadorTop
                        ? metricasOperativas.operadorTop[0]
                        : 'Sin datos'}
                    </p>

                    {metricasOperativas?.operadorTop && (
                      <p className="mt-1 text-sm text-blue-700">
                        {metricasOperativas.operadorTop[1]} movimientos
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-6">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                    {selectedRack.zone === 'Drive In' && (
                      <div className="mb-6 grid gap-3">
                        {obtenerResumenCarriles(selectedRack)
                          .filter((carril) => carril.porcentaje >= 60)
                          .map((carril) => (
                            <div
                              key={carril.carril}
                              className={`rounded-2xl border p-4 text-sm font-semibold transition-all ${
                              carril.porcentaje >= 95
                                ? 'alert-critical border-red-400 bg-red-50 text-red-700'
                                : carril.porcentaje >= 80
                                ? 'alert-warning border-orange-400 bg-orange-50 text-orange-700'
                                : 'border-amber-300 bg-amber-50 text-amber-700'
                              }`}
                            >
                              ⚠️ Línea {carril.carril}:{' '}
                              {carril.porcentaje >= 95
                                ? 'Lleno'
                                : carril.porcentaje >= 80
                                ? 'Capacidad crítica'
                                : 'Alto uso'}{' '}
                              · {carril.ocupados} de {carril.total} ubicaciones ocupadas
                            </div>
                          ))}
                      </div>
                    )}

                    {selectedRack.zone === 'Drive In' && obtenerCarrilRecomendado(selectedRack) && (
                      <div className="mb-6 rounded-2xl border border-emerald-300 bg-emerald-50 p-5">
                        <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">
                          Línea recomendada
                        </p>

                        <p className="mt-2 text-3xl font-black text-emerald-900">
                          Línea {obtenerCarrilRecomendado(selectedRack)?.carril}
                        </p>

                        <p className="mt-1 text-sm font-semibold text-emerald-700">
                          Mejor opción disponible por baja ocupación y mayor capacidad libre.
                        </p>
                      </div>
                    )}

                    {selectedRack.zone === 'Drive In' && (
                      <div className="mb-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">
                        <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
                          Recomendaciones inteligentes
                        </p>

                        <div className="mt-3 space-y-2">
                          {obtenerRecomendacionesCarriles(selectedRack).map((recomendacion) => (
                            <p
                              key={recomendacion}
                              className="text-sm font-semibold text-blue-900"
                            >
                              🧠 {recomendacion}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}

                    {(obtenerOportunidadesConsolidacion(selectedRack).length > 0 ||
                      obtenerConsolidacionesRecomendadas(selectedRack).length > 0) && (
                      <div className="mb-6 rounded-2xl border border-violet-300 bg-violet-50 p-5">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                          <div>
                            <p className="text-sm font-bold uppercase tracking-wide text-violet-700">
                              🧠 Centro de Optimización Operativa
                            </p>

                            <h3 className="mt-1 text-2xl font-black text-violet-900">
                              Optimización de espacios
                            </h3>

                            <p className="mt-1 text-sm font-semibold text-violet-700">
                              Consolidaciones, recuperación de ubicaciones y planes sugeridos para montacargas.
                            </p>
                          </div>

                          <button
                            onClick={() =>
                              setMostrarCentroOptimizacion(!mostrarCentroOptimizacion)
                            }
                            className="rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold text-white hover:bg-violet-700"
                          >
                            {mostrarCentroOptimizacion ? 'Ocultar detalle' : 'Ver detalle'}
                          </button>
                        </div>

                        <div className="mt-5 grid gap-3 md:grid-cols-3">
                          <div className="rounded-xl bg-white p-4">
                            <p className="text-xs font-bold uppercase text-slate-400">
                              Pallets mixtos/parciales
                            </p>
                            <p className="mt-1 text-3xl font-black text-amber-600">
                              {obtenerOportunidadesConsolidacion(selectedRack).length}
                            </p>
                          </div>

                          <div className="rounded-xl bg-white p-4">
                            <p className="text-xs font-bold uppercase text-slate-400">
                              Consolidaciones
                            </p>
                            <p className="mt-1 text-3xl font-black text-green-700">
                              {obtenerConsolidacionesRecomendadas(selectedRack).length}
                            </p>
                          </div>

                          <div className="rounded-xl bg-white p-4">
                            <p className="text-xs font-bold uppercase text-slate-400">
                              Espacios recuperables
                            </p>
                            <p className="mt-1 text-3xl font-black text-blue-700">
                              {obtenerConsolidacionesRecomendadas(selectedRack).reduce(
                                (total, grupo) => total + grupo.espaciosLiberables,
                                0
                              )}
                            </p>
                          </div>
                        </div>

                        {mostrarCentroOptimizacion && (
                          <div className="mt-6 space-y-6">
                            {obtenerOportunidadesConsolidacion(selectedRack).length > 0 && (
                              <div className="mb-6 rounded-2xl border border-amber-300 bg-amber-50 p-5">
                                <p className="text-sm font-bold uppercase tracking-wide text-amber-700">
                                  Consolidación inteligente
                                </p>

                                <div className="mt-3 grid gap-3">
                                  {obtenerOportunidadesConsolidacion(selectedRack).map((oportunidad) => (
                                    <div
                                      key={oportunidad.ubicacion}
                                      className="rounded-xl border border-amber-200 bg-white p-4"
                                    >
                                      <p className="text-sm font-black text-amber-900">
                                        🧩 {oportunidad.ubicacion}: {oportunidad.tipo}
                                      </p>

                                      <p className="mt-1 text-xs font-semibold text-slate-500">
                                        {oportunidad.productos.length} productos · {oportunidad.totalPiezas} piezas totales
                                      </p>

                                      <div className="mt-3 grid gap-2 md:grid-cols-2">
                                        {oportunidad.productos.map((producto, index) => (
                                          <div
                                            key={`${oportunidad.ubicacion}-${producto.descripcion}-${producto.lote}-${index}`}
                                            className="rounded-lg bg-amber-50 px-3 py-2"
                                          >
                                            <p className="text-xs font-black text-slate-900">
                                              {producto.descripcion}
                                            </p>

                                            <p className="text-xs font-semibold text-slate-500">
                                              Lote: {producto.lote}
                                            </p>

                                            <p className="text-xs font-semibold text-amber-700">
                                              {producto.piezas} piezas · {producto.presentacion}
                                            </p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {obtenerConsolidacionesRecomendadas(selectedRack).length > 0 && (
                              <div className="mb-6 rounded-2xl border border-blue-300 bg-blue-50 p-5">
                                <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
                                  Planes de ejecución sugeridos
                                </p>

                                <div className="mt-4 space-y-3">
                                  {obtenerConsolidacionesRecomendadas(selectedRack).map((grupo) => {
                                    const keyPlan = `${grupo.descripcion}-${grupo.lote}`;
                                    const abierto = selectedPosition === keyPlan;

                                    return (
                                      <div
                                        key={`plan-${keyPlan}`}
                                        className="rounded-xl border border-blue-200 bg-white p-4"
                                      >
                                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                          <div>
                                            <p className="text-lg font-black text-blue-900">
                                              📋 {grupo.descripcion}
                                            </p>

                                            <p className="text-sm font-semibold text-slate-500">
                                              Lote: {grupo.lote}
                                            </p>
                                          </div>

                                          <div className="flex flex-wrap gap-2">
                                            <button
                                              onClick={() => setSelectedPosition(abierto ? null : keyPlan)}
                                              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700"
                                            >
                                              {abierto ? 'Ocultar plan' : 'Ver plan'}
                                            </button>

                                            <button
                                              onClick={() => crearOrdenTrabajo(grupo)}
                                              className="rounded-xl bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-700"
                                            >
                                              Crear orden de trabajo
                                            </button>
                                          </div>
                                        </div>

                                        <div className="mt-4 grid gap-3 md:grid-cols-4">
                                          <div className="rounded-xl bg-slate-50 p-3">
                                            <p className="text-xs font-bold uppercase text-slate-400">
                                              Espacios
                                            </p>
                                            <p className="text-lg font-black text-slate-900">
                                              {grupo.espaciosLiberables}
                                            </p>
                                          </div>

                                          <div className="rounded-xl bg-slate-50 p-3">
                                            <p className="text-xs font-bold uppercase text-slate-400">
                                              Tiempo
                                            </p>
                                            <p className="text-lg font-black text-slate-900">
                                              {grupo.espaciosLiberables * 2} min
                                            </p>
                                          </div>

                                          <div className="rounded-xl bg-slate-50 p-3">
                                            <p className="text-xs font-bold uppercase text-slate-400">
                                              Prioridad
                                            </p>
                                            <p className="text-lg font-black text-slate-900">
                                              {grupo.prioridad}
                                            </p>
                                          </div>

                                          <div className="rounded-xl bg-slate-50 p-3">
                                            <p className="text-xs font-bold uppercase text-slate-400">
                                              Score
                                            </p>
                                            <p className="text-lg font-black text-slate-900">
                                              {grupo.score}/100
                                            </p>
                                          </div>
                                        </div>

                                        {abierto && (
                                          <div className="mt-4 rounded-xl bg-blue-50 p-3">
                                            <p className="text-sm font-black text-blue-800">
                                              Destino sugerido: {grupo.destino.ubicacion}
                                            </p>

                                            <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm font-semibold text-slate-700">
                                              {grupo.origenes.map((origen) => (
                                                <li key={`${keyPlan}-${origen.ubicacion}`}>
                                                  Mover contenido de {origen.ubicacion} hacia {grupo.destino.ubicacion}
                                                </li>
                                              ))}
                                            </ol>

                                            <p className="mt-3 text-xs font-semibold text-slate-500">
                                              Este plan es sugerido. Antes de ejecutarlo, confirmar capacidad física del pallet.
                                            </p>
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>

                              </div>
                            )}

                          </div>
                        )}
                      </div>
                    )}

                    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <input
                        value={locationSearch}
                        onChange={(e) => setLocationSearch(e.target.value)}
                        placeholder="Buscar ubicación... Ej. A01A o D2-F"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500 lg:max-w-md"
                      />

                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-2xl bg-white px-6 py-4">
                          <p className="text-sm text-slate-500">Ocupados</p>
                          <p className="text-2xl font-black text-slate-900">{realOccupied}</p>
                        </div>

                        <div className="rounded-2xl bg-white px-6 py-4">
                          <p className="text-sm text-slate-500">Libres</p>
                          <p className="text-2xl font-black text-slate-900">{realAvailable}</p>
                        </div>
                      </div>
                    </div>

                    {selectedRack.zone === 'Drive In' && (
                      <div className="mb-6">
                        <h3 className="mb-3 text-lg font-bold">Capacidad por línea</h3>

                        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                          {obtenerResumenCarriles(selectedRack).map((carril) => (
                            <button
                              key={carril.carril}
                              onClick={() => setSelectedCarril(carril.carril)}
                              className={`rounded-2xl border p-4 text-left transition hover:-translate-y-1 hover:shadow-md ${
                                selectedCarril === carril.carril
                                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-100'
                                  : carril.porcentaje >= 95
                                  ? 'border-red-300 bg-red-50'
                                  : carril.porcentaje >= 80
                                  ? 'border-orange-300 bg-orange-50'
                                  : carril.porcentaje >= 60
                                  ? 'border-amber-300 bg-amber-50'
                                  : carril.porcentaje > 0
                                  ? 'border-blue-300 bg-blue-50'
                                  : 'border-slate-200 bg-white'
                              }`}
                            >
                              <p className="text-sm font-bold text-slate-900">
                                Línea {carril.carril}
                              </p>

                              <p className="mt-1 text-xs text-slate-500">
                                {carril.ocupados} ocupados / {carril.total} ubicaciones
                              </p>

                              <div className="mt-3 h-2 rounded-full bg-slate-200">
                                <div
                                  className={`h-2 rounded-full ${getProgressClass(carril.porcentaje)}`}
                                  style={{ width: `${carril.porcentaje}%` }}
                                />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-2xl font-black text-slate-900">
                        Mapa de ubicaciones
                      </h3>

                      {selectedCarril && (
                        <button
                          onClick={() => setSelectedCarril(null)}
                          className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                        >
                          Ver todos
                        </button>
                      )}
                    </div>                    

                    <p className="mt-1 text-sm text-slate-500">
                      Las ubicaciones ocupadas se muestran en azul y las libres en blanco.
                    </p>

                    <div className="mt-5 space-y-3">
                      {selectedRack.zone === 'Drive In'
                        ? (() => {
                            const grupos = new Map<string, string[]>();

                            filteredLocations.forEach((location) => {
                              const partes = location.split('-');

                              if (partes.length < 4) return;

                              const linea = partes[1];
                              const nivel = partes[2];

                              const key = `${linea}-${nivel}`;

                              if (!grupos.has(key)) {
                                grupos.set(key, []);
                              }

                              grupos.get(key)?.push(location);
                            });

                            return Array.from(grupos.entries()).map(([key, locations]) => {
                              const ordenadas = [...locations].sort((a, b) => {
                                const posA = Number(a.split('-')[3]);
                                const posB = Number(b.split('-')[3]);

                                return posB - posA;
                              });

                              return (
                                <div
                                  key={key}
                                  className="grid grid-cols-6 gap-3"
                                >
                                  {ordenadas.map((location) => {
                                    const movimiento = obtenerMovimientoPorUbicacion(location);

                                    const isOccupied = !!movimiento;

                                    const skusRack = leyenda.productos.map((producto) => producto.sku);

                                    const colorProducto = obtenerColorProducto(movimiento?.sku, skusRack);

                                    return (
                                      <button
                                        key={location}
                                        onClick={() => {
                                          setSelectedPosition(location);
                                          setShowPositionModal(true);
                                        }}
                                        className={`flex min-h-16 items-center justify-center rounded-xl border px-3 py-4 text-center text-sm font-bold transition hover:scale-105 ${
                                          selectedPosition === location
                                            ? 'ring-2 ring-blue-400'
                                            : ''
                                        } ${
                                          isOccupied
                                            ? `${colorProducto.border} ${colorProducto.bg} ${colorProducto.text}`
                                            : 'border-slate-200 bg-white text-slate-600'
                                        }`}
                                      >
                                        {location}
                                      </button>
                                    );
                                  })}

                                  {ordenadas.length === 5 && (
                                    <div className="min-h-16" />
                                  )}
                                </div>
                              );
                            });
                          })()
                        : (
                          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                            {filteredLocations.map((location) => {
                              const movimiento = obtenerMovimientoPorUbicacion(location);

                              const isOccupied = !!movimiento;

                              const skusRack = leyenda.productos.map((producto) => producto.sku);

                              const colorProducto = obtenerColorProducto(movimiento?.sku, skusRack);

                              return (
                                <button
                                  key={location}
                                  onClick={() => {
                                    setSelectedPosition(location);
                                    setShowPositionModal(true);
                                  }}
                                  className={`flex min-h-16 items-center justify-center rounded-xl border px-3 py-4 text-center text-sm font-bold transition hover:scale-105 ${
                                    selectedPosition === location
                                      ? 'ring-2 ring-blue-400'
                                      : ''
                                  } ${
                                    isOccupied
                                      ? `${colorProducto.border} ${colorProducto.bg} ${colorProducto.text}`
                                      : 'border-slate-200 bg-white text-slate-600'
                                  }`}
                                >
                                  {location}
                                </button>
                              );
                            })}
                          </div>
                        )}
                    </div>

                    {locationSearch.trim() && filteredLocations.length === 0 && (
                      <div className="mt-5 rounded-2xl border border-dashed border-amber-300 bg-amber-50 p-5 text-sm font-semibold text-amber-800">
                        No se encontró la ubicación "{locationSearch}" en {selectedRack.name}. Revisa si pertenece a otra zona como Drive In.
                      </div>
                    )}

                    <div className="mt-6">
                      <h4 className="mb-3 text-lg font-black text-slate-900">
                        Leyenda de productos
                      </h4>

                      <div className="flex flex-wrap gap-4 rounded-2xl border border-slate-200 bg-white p-4">
                        
                        {leyenda.productos.map((producto) => {
                          const porcentaje = Math.round(
                            (producto.cantidad / leyenda.totalUbicaciones) * 100
                          );

                          return (

                          <div
                            key={producto.sku}
                            className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3"
                          >
                            <span
                              className={`h-5 w-5 rounded-md ${producto.color.bg} ${producto.color.border}`}
                            />

                            <div>
                              <p className="text-sm font-bold text-slate-900">
                                {producto.descripcion}
                              </p>

                              <p className="text-xs font-semibold text-slate-500">
                                {producto.cantidad} pallets ({porcentaje}%)
                              </p>
                            </div>
                          </div>
                          );
                        })}

                        <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
                          <span className="h-5 w-5 rounded-md border border-slate-300 bg-white" />

                          <div>
                            <p className="text-sm font-bold text-slate-900">
                              Ubicación libre
                            </p>

                            <p className="text-xs font-semibold text-slate-500">
                              {leyenda.libres} espacios (
                              {Math.round(
                                (leyenda.libres / leyenda.totalUbicaciones) * 100
                              )}%)
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {positionDetail && showPositionModal && (
                      <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                        onClick={() => setShowPositionModal(false)}
                      >
                        <div
                          ref={positionDetailRef}
                          onClick={(e) => e.stopPropagation()}
                          className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                                Posición seleccionada
                              </p>

                              <div className="mt-2 flex items-center gap-4">
                                <h3 className="text-5xl font-black text-slate-900">
                                  {positionDetail.position}
                                </h3>

                                <span
                                  className={`rounded-full px-4 py-2 text-sm font-bold ${
                                    positionDetail.occupied
                                      ? 'bg-blue-100 text-blue-700'
                                      : 'bg-emerald-100 text-emerald-700'
                                  }`}
                                >
                                  {positionDetail.occupied ? 'Ocupado' : 'Libre'}
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={() => setShowPositionModal(false)}
                              className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-200"
                            >
                              ✕
                            </button>
                          </div>

                          {(() => {
                            const opinion = obtenerOpinionUbicacion(positionDetail);

                            return (
                              <div className={`mt-4 rounded-xl border px-5 py-4 ${opinion.clase}`}>
                                <p className="text-xs font-bold uppercase tracking-wider">
                                  {opinion.icono} Opinión del sistema
                                </p>

                                <p className="mt-2 text-xl font-bold">
                                  {opinion.titulo}
                                </p>

                                <p className="mt-2 text-sm leading-relaxed">
                                  {opinion.mensaje}
                                </p>
                              </div>
                            );
                          })()}

                          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 xl:col-span-2">
                              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                SKU / Producto
                              </p>

                              <p className="mt-2 text-2xl font-black text-slate-900">
                                {positionDetail.contenidos?.length > 1
                                  ? 'PALLET MIXTO'
                                  : positionDetail.product}
                              </p>

                              <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                                {positionDetail.contenidos?.length > 1
                                  ? `${positionDetail.contenidos.length} productos`
                                  : positionDetail.description ?? ''}
                              </p>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                Lote
                              </p>

                              <p className="break-all text-xl font-bold">
                                {positionDetail.contenidos?.length > 1
                                  ? 'Múltiples lotes'
                                  : positionDetail.lote ?? '--'}
                              </p>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                Rotación
                              </p>

                              <p
                                className={`mt-2 text-xl font-bold ${
                                  positionDetail.rotacion === 'Alta'
                                    ? 'text-green-600'
                                    : positionDetail.rotacion === 'Media'
                                    ? 'text-amber-600'
                                    : positionDetail.rotacion === 'Baja'
                                    ? 'text-blue-600'
                                    : 'text-slate-400'
                                }`}
                              >
                                {positionDetail.rotacion ?? '--'}
                              </p>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                Días almacenado
                              </p>

                              <p className="mt-2 text-xl font-bold text-slate-900">
                                {positionDetail.diasAlmacenado !== null
                                  ? `${positionDetail.diasAlmacenado} días`
                                  : '--'}
                              </p>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                Operador
                              </p>

                              <p className="mt-2 text-xl font-bold text-slate-900">
                                {positionDetail.operator}
                              </p>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                Movimiento
                              </p>

                              <p
                                className={`mt-2 text-xl font-bold ${
                                  positionDetail.movementType === 'entrada'
                                    ? 'text-blue-600'
                                    : positionDetail.movementType === 'salida'
                                    ? 'text-red-600'
                                    : positionDetail.movementType === 'reubicacion'
                                    ? 'text-amber-600'
                                    : 'text-slate-400'
                                }`}
                              >
                                {positionDetail.movementType === 'entrada'
                                  ? 'Entrada'
                                  : positionDetail.movementType === 'salida'
                                  ? 'Salida'
                                  : positionDetail.movementType === 'reubicacion'
                                  ? 'Reubicación'
                                  : '--'}
                              </p>

                              {positionDetail.movementType === 'reubicacion' && (
                                <div className="mt-3 space-y-1 text-sm font-bold text-slate-600">
                                  <p>Origen: {positionDetail.posicionOrigen ?? '--'}</p>
                                  <p>Destino: {positionDetail.posicionDestino ?? '--'}</p>
                                </div>
                              )}
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                Cantidad
                              </p>

                              <p className="mt-2 text-xl font-bold text-slate-900">
                                {positionDetail.contenidos?.length > 1 ? '—' : positionDetail.cantidad}
                              </p>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                Unidad
                              </p>

                              <p className="mt-2 text-xl font-bold text-slate-900">
                                {positionDetail.contenidos?.length > 1 ? 'MÚLTIPLE' : positionDetail.unidad}
                              </p>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                Piezas por unidad
                              </p>

                              <p className="mt-2 text-xl font-bold text-slate-900">
                                {positionDetail.contenidos?.length > 1 ? '—' : positionDetail.piezasPorCaja}
                              </p>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                Total piezas
                              </p>

                              <p className="mt-2 text-xl font-bold text-slate-900">
                                {positionDetail.totalPiezas}
                              </p>
                            </div>

                            {positionDetail.contenidos && positionDetail.contenidos.length > 1 && (
                              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 md:col-span-2 xl:col-span-4">
                                <p className="text-xs font-bold uppercase tracking-wide text-amber-700">
                                  Contenido del pallet mixto
                                </p>

                                <div className="mt-3 grid gap-3 md:grid-cols-2">
                                  {positionDetail.contenidos.map((contenido, index) => (
                                    <div
                                      key={`${contenido.sku}-${contenido.lote}-${index}`}
                                      className="rounded-xl border border-amber-200 bg-white p-4"
                                    >
                                      <p className="text-sm font-black text-slate-900">
                                        {contenido.descripcion}
                                      </p>

                                      <p className="mt-1 text-xs font-semibold text-slate-500">
                                        Lote: {contenido.lote}
                                      </p>

                                      <p className="mt-1 text-xs font-semibold text-slate-500">
                                        Presentación: {contenido.presentacion}
                                      </p>

                                      <p className="mt-2 text-lg font-black text-amber-700">
                                        {contenido.piezas} piezas
                                      </p>

                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 md:col-span-2">
                              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                Última actualización
                              </p>

                              <p className="mt-2 text-xl font-bold text-slate-900">
                                {positionDetail.createdAt ?? '--'}
                              </p>
                            </div>

                          </div>

                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            );
          })()}
        </section>
      )}
    </div>
  );
}

export default RacksPage;