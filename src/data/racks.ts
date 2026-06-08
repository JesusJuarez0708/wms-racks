export type RackZone = 'Racks selectivos' | 'Drive In';

export type UnidadInventario = 'CAJA' | 'PIEZAS';

export type RackLocation = {
  id: string;
  zone: RackZone;
  rack: string;
  ocupado: boolean;
  cliente: string;
  descripcion: string;
  cantidad: number;
  unidad: UnidadInventario;
  piezasPorCaja: number;
  totalPiezas: number;
};

function generarSelectivos() {
  const configuracionSelectivos = [
    { modulo: 'A', bahias: 24 },
    { modulo: 'B', bahias: 22 },
    { modulo: 'C', bahias: 22 },
    { modulo: 'D', bahias: 28 },
    { modulo: 'E', bahias: 30 },
    { modulo: 'F', bahias: 30 },
    { modulo: 'G', bahias: 8 },
    { modulo: 'H', bahias: 14 },
    { modulo: 'I', bahias: 18 },
    { modulo: 'J', bahias: 14 },
    { modulo: 'K', bahias: 9 },
  ];

  const niveles = ['A', 'B', 'C', 'D'];
  const localidades: RackLocation[] = [];

  configuracionSelectivos.forEach(({ modulo, bahias }) => {
    for (let bahia = 1; bahia <= bahias; bahia += 1) {
      niveles.forEach((nivel) => {
        const bahiaTexto = String(bahia).padStart(2, '0');

        localidades.push({
          id: `${modulo}${bahiaTexto}${nivel}`,
          zone: 'Racks selectivos',
          rack: modulo,
          ocupado: false,
          cliente: '',
          descripcion: '',
          cantidad: 0,
          unidad: 'CAJA',
          piezasPorCaja: 0,
          totalPiezas: 0,
        });
      });
    }
  });

  return localidades;
}

function generarDriveIn() {
  const configuracion = [
    { rack: 'D1', carriles: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'] },
    { rack: 'D2', carriles: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'] },
    { rack: 'D3', carriles: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'] },
    { rack: 'D4', carriles: ['A', 'B', 'C', 'D', 'E', 'F'] },
  ];

  const localidades: RackLocation[] = [];

  configuracion.forEach(({ rack, carriles }) => {
    carriles.forEach((carril) => {
      for (let nivel = 1; nivel <= 3; nivel += 1) {
        const profundidadMaxima = nivel === 1 ? 5 : 6;

        for (
          let profundidad = 1;
          profundidad <= profundidadMaxima;
          profundidad += 1
        ) {

          localidades.push({
            id: `${rack}-${carril}-${nivel}-${profundidad}`,
            zone: 'Drive In',
            rack,
            ocupado: false,
            cliente: '',
            descripcion: '',
            cantidad: 0,
            unidad: 'CAJA',
            piezasPorCaja: 0,
            totalPiezas: 0,
          });
        }
      }
    });
  });

  return localidades;
}

export const rackLocations = [
  ...generarSelectivos(),
  ...generarDriveIn(),
];

export const posicionesValidas = rackLocations.map((location) => location.id);


export type TipoRack = 'selectivo' | 'drive_in';

export type PosicionRackInfo = {
  posicion: string;
  tipoRack: TipoRack;
  zona: string;
  alturaMaxima: number;
  profundidad?: number;
  nivel?: number;
  linea?: string;
};

export const posicionesRackInfo: PosicionRackInfo[] =
  rackLocations.map((location) => {
    const posicion = location.id;

    if (location.zone === 'Drive In') {
      const partes = posicion.split('-');

      return {
        posicion,
        tipoRack: 'drive_in',
        zona: partes[0],
        alturaMaxima: 1.80,
        linea: partes[1],
        nivel: Number(partes[2]),
        profundidad: Number(partes[3]),
      };
    }

    return {
      posicion,
      tipoRack: 'selectivo',
      zona: 'Selectivo',
      alturaMaxima: 1.50,
    };
  });

export const racks = [

  ...['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'].map(
    (rackLetter) => ({
      id: `SELECTIVO-${rackLetter}`,
      name: rackLetter,
      zone: 'Racks selectivos',
      capacity: rackLocations.filter(
        (location) =>
          location.zone === 'Racks selectivos' &&
          location.id.startsWith(rackLetter)
      ).length,
      occupied: 0,
      status: 'Disponible',
      locations: rackLocations
        .filter(
          (location) =>
            location.zone === 'Racks selectivos' &&
            location.id.startsWith(rackLetter)
        )
        .map((location) => location.id),
    })
  ),

  {
    id: 'DRIVE-IN-D1',
    name: 'D1',
    zone: 'Drive In',
    capacity: rackLocations.filter((location) => location.rack === 'D1').length,
    occupied: 0,
    status: 'Disponible',
    locations: rackLocations
      .filter((location) => location.rack === 'D1')
      .map((location) => location.id),
  },
  {
    id: 'DRIVE-IN-D2',
    name: 'D2',
    zone: 'Drive In',
    capacity: rackLocations.filter((location) => location.rack === 'D2').length,
    occupied: 0,
    status: 'Disponible',
    locations: rackLocations
      .filter((location) => location.rack === 'D2')
      .map((location) => location.id),
  },
  {
    id: 'DRIVE-IN-D3',
    name: 'D3',
    zone: 'Drive In',
    capacity: rackLocations.filter((location) => location.rack === 'D3').length,
    occupied: 0,
    status: 'Disponible',
    locations: rackLocations
      .filter((location) => location.rack === 'D3')
      .map((location) => location.id),
  },
  {
    id: 'DRIVE-IN-D4',
    name: 'D4',
    zone: 'Drive In',
    capacity: rackLocations.filter((location) => location.rack === 'D4').length,
    occupied: 0,
    status: 'Disponible',
    locations: rackLocations
      .filter((location) => location.rack === 'D4')
      .map((location) => location.id),
  },
];