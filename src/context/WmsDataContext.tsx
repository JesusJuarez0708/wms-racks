import {
  posicionesValidas,
  posicionesRackInfo,
} from '../data/racks';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type UnidadMovimiento =
  | 'CAJA'
  | 'PIEZAS'
  | 'TAMBOR'
  | 'SACO'
  | 'CUÑETE';

export type EstadoPallet = 'completo' | 'parcial' | 'mixto';

export type EstadoOrdenTrabajo =
  | 'pendiente'
  | 'asignada'
  | 'en_proceso'
  | 'completada';

export type OrdenTrabajo = {
  id: string;
  producto: string;
  lote: string;

  cantidad: number;
  unidad: string;
  totalPiezas: number;

  destino: string;
  origenes: string[];

  prioridad: string;
  score: number;
  fecha: string;
  estado: EstadoOrdenTrabajo;

  responsable: string | null;
  fechaAsignacion: string | null;
  fechaInicio: string | null;
  fechaCompletado: string | null;

  motivosScore: string[];
};

export type ContenidoPallet = {
  sku: string;
  descripcion: string;
  lote: string;
  presentacion: UnidadMovimiento;
  pallets: number;
  piezas: number;
};

export type WmsMovement = {
  id: string;
  tipo: 'entrada' | 'salida' | 'reubicacion';
  sku: string;
  descripcion: string;
  lote: string;
  cantidad: number;
  unidad: UnidadMovimiento;
  piezasPorCaja: number;
  totalPiezas: number;
  rotacion?: 'Alta' | 'Media' | 'Baja';
  estadoPallet?: EstadoPallet;
  contenidos?: ContenidoPallet[];
  posicionOrigen?: string;
  posicionDestino?: string;
  operador: string;
  fecha: string;
};

type ResultadoValidacion = {
  valido: boolean;
  mensaje?: string;
};

type WmsDataContextType = {
  movimientos: WmsMovement[];
  setMovimientos: React.Dispatch<React.SetStateAction<WmsMovement[]>>;
  agregarMovimiento: (movimiento: WmsMovement) => void;
  validarMovimiento: (movimiento: WmsMovement) => ResultadoValidacion;
  ordenesTrabajo: OrdenTrabajo[];
  setOrdenesTrabajo: React.Dispatch<
    React.SetStateAction<OrdenTrabajo[]>
  >;

  avanzarEstadoOrdenTrabajo: (id: string) => void;
};

const STORAGE_KEY = 'wms_movimientos';

const WmsDataContext = createContext<WmsDataContextType | undefined>(
  undefined
);

function obtenerPosicionesOcupadas(movimientos: WmsMovement[]) {
  const posicionesOcupadas = new Map<string, WmsMovement>();

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

  return posicionesOcupadas;
}

export function WmsDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [movimientos, setMovimientos] = useState<WmsMovement[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) return [];

    try {
      return JSON.parse(stored) as WmsMovement[];
    } catch {
      return [];
    }
  });

  const [ordenesTrabajo, setOrdenesTrabajo] =
  useState<OrdenTrabajo[]>([]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movimientos));
  }, [movimientos]);

  function validarMovimiento(movimiento: WmsMovement): ResultadoValidacion {
    const posicionesOcupadas = obtenerPosicionesOcupadas(movimientos);

    const posicionDestinoInfo = posicionesRackInfo.find(
      (p) => p.posicion === movimiento.posicionDestino
    );

    const esDriveIn = (posicion?: string) => {
      return posicion?.startsWith('D');
    };

    const obtenerDatosDriveIn = (posicion: string) => {
      const partes = posicion.split('-');

      return {
        zona: partes[0],
        linea: partes[1],
        nivel: Number(partes[2]),
        profundidad: Number(partes[3]),
      };
    };

    const tieneHuecoFrontalDriveIn = (posicion: string) => {
      const datos = obtenerDatosDriveIn(posicion);

      if (!datos.zona || !datos.linea || !datos.profundidad || !datos.nivel) {
        return false;
      }

      const profundidadMaxima = datos.nivel === 1 ? 5 : 6;

      for (
        let profundidadPosterior = profundidadMaxima;
        profundidadPosterior > datos.profundidad;
        profundidadPosterior--
      ) {
        const posicionPosterior =
          `${datos.zona}-${datos.linea}-${datos.nivel}-${profundidadPosterior}`;

        if (!posicionesOcupadas.has(posicionPosterior)) {
          return true;
        }
      }

      return false;
    };

    if (
      movimiento.posicionOrigen &&
      !posicionesValidas.includes(movimiento.posicionOrigen)
    ) {
      return {
        valido: false,
        mensaje: `La posición origen ${movimiento.posicionOrigen} no existe.`,
      };
    }

    if (
      movimiento.posicionDestino &&
      !posicionesValidas.includes(movimiento.posicionDestino)
    ) {
      return {
        valido: false,
        mensaje: `La posición destino ${movimiento.posicionDestino} no existe.`,
      };
    }

    if (
      movimiento.tipo === 'entrada' &&
      movimiento.posicionDestino &&
      posicionesOcupadas.has(movimiento.posicionDestino)
    ) {
      return {
        valido: false,
        mensaje: `La posición ${movimiento.posicionDestino} ya está ocupada.`,
      };
    }

    if (
      movimiento.tipo === 'salida' &&
      movimiento.posicionOrigen &&
      !posicionesOcupadas.has(movimiento.posicionOrigen)
    ) {
      return {
        valido: false,
        mensaje: `La posición ${movimiento.posicionOrigen} está vacía. No se puede registrar salida.`,
      };
    }

    if (
      movimiento.tipo === 'reubicacion' &&
      movimiento.posicionOrigen &&
      movimiento.posicionDestino &&
      movimiento.posicionOrigen === movimiento.posicionDestino
    ) {
      return {
        valido: false,
        mensaje: `La posición origen y destino no pueden ser la misma: ${movimiento.posicionOrigen}.`,
      };
    }

    if (
      movimiento.tipo === 'reubicacion' &&
      movimiento.posicionOrigen &&
      !posicionesOcupadas.has(movimiento.posicionOrigen)
    ) {
      return {
        valido: false,
        mensaje: `La posición origen ${movimiento.posicionOrigen} está vacía.`,
      };
    }

    if (
      (movimiento.tipo === 'entrada' || movimiento.tipo === 'reubicacion') &&
      movimiento.posicionDestino &&
      esDriveIn(movimiento.posicionDestino) &&
      tieneHuecoFrontalDriveIn(movimiento.posicionDestino)
    ) {
      return {
        valido: false,
        mensaje: `No se puede colocar el pallet en ${movimiento.posicionDestino}. Primero deben ocuparse las ubicaciones del fondo en la misma línea Drive In.`,
      };
    }

    if (
      movimiento.tipo === 'reubicacion' &&
      movimiento.posicionDestino &&
      posicionesOcupadas.has(movimiento.posicionDestino)
    ) {
      return {
        valido: false,
        mensaje: `La posición destino ${movimiento.posicionDestino} ya está ocupada.`,
      };
    }

    if (
      posicionDestinoInfo?.tipoRack === 'drive_in' &&
      posicionDestinoInfo.linea &&
      movimiento.sku
    ) {
      const movimientosMismaLinea = movimientos.filter(
        (m) =>
          m.tipo === 'entrada' &&
          m.posicionDestino &&
          posicionesRackInfo.find(
            (p) =>
              p.posicion === m.posicionDestino &&
              p.tipoRack === 'drive_in' &&
              p.linea === posicionDestinoInfo.linea
          )
      );

      const skuExistente = movimientosMismaLinea.find(
        (m) =>
          m.sku &&
          m.sku.trim().toUpperCase() !==
            movimiento.sku.trim().toUpperCase()
      );

      if (skuExistente) {
        return {
          valido: false,
          mensaje: `La línea ${posicionDestinoInfo.linea} ya contiene el SKU ${skuExistente.sku}. No se permite mezcla de productos en la misma línea Drive In.`,
        };
      }
    }

    return {
      valido: true,
    };
  }

  function agregarMovimiento(movimiento: WmsMovement) {
    setMovimientos((prev) => [movimiento, ...prev]);
  }

  function avanzarEstadoOrdenTrabajo(id: string) {
    setOrdenesTrabajo((prev) =>
      prev.map((orden) => {
        if (orden.id !== id) return orden;

        const siguienteEstado =
          orden.estado === 'pendiente'
            ? 'asignada'
            : orden.estado === 'asignada'
            ? 'en_proceso'
            : orden.estado === 'en_proceso'
            ? 'completada'
            : 'completada';

        const ahora = new Date().toLocaleString();

        return {
          ...orden,
          estado: siguienteEstado,

          responsable:
            orden.estado === 'pendiente'
              ? 'Carlos Torres'
              : orden.responsable,

          fechaAsignacion:
            orden.estado === 'pendiente'
              ? ahora
              : orden.fechaAsignacion,

          fechaInicio:
            orden.estado === 'asignada'
              ? ahora
              : orden.fechaInicio,

          fechaCompletado:
            orden.estado === 'en_proceso'
              ? ahora
              : orden.fechaCompletado,
        };
      })
    );
  }

  const value = useMemo(
    () => ({
      movimientos,
      setMovimientos,
      agregarMovimiento,
      validarMovimiento,
      ordenesTrabajo,
      setOrdenesTrabajo,
      avanzarEstadoOrdenTrabajo,
    }),
    [
      movimientos,
      ordenesTrabajo,
    ]
  );

  return (
    <WmsDataContext.Provider value={value}>
      {children}
    </WmsDataContext.Provider>
  );
}

export function useWmsData() {
  const context = useContext(WmsDataContext);

  if (!context) {
    throw new Error(
      'useWmsData debe usarse dentro de WmsDataProvider'
    );
  }

  return context;
}