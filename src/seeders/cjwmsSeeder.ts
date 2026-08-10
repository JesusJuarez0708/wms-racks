import { rackLocations } from '../data/racks';

import {
  createInventoryItem,
  deleteInventory,
  getInventory,
} from '../services/inventoryService';

import {
  createMovement,
  deleteMovement,
  getMovements,
} from '../services/movementService';

import {
  deleteMovementAllocation,
  getMovementAllocations,
} from '../services/movementAllocationService';

import {
  createPallet,
  deletePallet,
  getPallets,
} from '../services/palletService';

import {
  createProduct,
  deactivateProduct,
  getProducts,
} from '../services/productService';

import {
  createRackPosition,
  getRackPositions,
  updateRackPositionPhysical,
} from '../services/rackPositionService';

import {
  createRack,
  getRacks,
} from '../services/rackService';

import {
  createWarehouse,
  getWarehouses,
} from '../services/warehouseService';

// ============================================================
// Seeder Operativo CJWMS
// ============================================================
//
// 1. Tipos internos del Seeder
// 2. Definición del almacén
// 3. Catálogo de productos
// 4. Definición de pallets e inventario
// 5. Definición de racks
// 6. Definición de posiciones
// 7. Ejecución del Seeder
//
// La MOE constituye la especificación funcional del Laboratorio.
// El Seeder y su proceso de restablecimiento deberán mantenerse
// sincronizados con la documentación oficial.
// ============================================================

// ============================================================
// 1. Tipos internos del Seeder
// ============================================================

type ProductSeed = {
  sku: string;
  description: string;
  unit: string;
  rotation: 'alta' | 'media' | 'baja';
};

type PalletSeed = {
  productSku: string;
  palletCode: string;
  lot: string;
  quantity: number;
  maxQuantity?: number;
  currentWeightKg?: number;
  maxWeightKg?: number;
  widthM?: number;
  lengthM?: number;
  heightM?: number;
  palletStatus?: 'active' | 'out' | 'blocked' | 'damaged';
};

type PalletPhysicalProfile = {
  maxQuantity: number;
  unitWeightKg: number;
  palletTareKg: number;
  maxWeightKg: number;
  widthM: number;
  lengthM: number;
  heightM: number;
};

type InventorySeed = {
  palletCode: string;
  positionCode: string;
  inventoryStatus?: 'available' | 'reserved' | 'blocked';
};

// ============================================================
// 2. Definición del almacén
// ============================================================

const warehouseSeed = {
  code: 'CJWMS-01',
  name: 'Almacén Principal CJWMS',
} as const;

// ============================================================
// 2.1 Perfiles físicos reproducibles del Laboratorio
// ============================================================
//
// Los pesos unitarios son coeficientes operativos de simulación
// del Laboratorio CJWMS. No representan especificaciones
// comerciales oficiales de los productos.
//
// currentWeightKg se calcula posteriormente como:
//
//   tara del pallet + cantidad actual × peso unitario
//
// maxWeightKg representa la capacidad estructural del pallet.
// ============================================================

function getPalletPhysicalSeedData(seed: PalletSeed) {
  const profile = palletPhysicalProfiles[seed.productSku];

  if (!profile) {
    throw new Error(
      `No existe perfil físico para el producto ${seed.productSku}.`
    );
  }

  const maxQuantity =
    seed.maxQuantity ?? profile.maxQuantity;

  if (seed.quantity > maxQuantity) {
    throw new Error(
      `El pallet ${seed.palletCode} contiene ${seed.quantity} unidades y supera su capacidad máxima de ${maxQuantity}.`
    );
  }

  const calculatedCurrentWeightKg =
    profile.palletTareKg +
    seed.quantity * profile.unitWeightKg;

  const currentWeightKg =
    seed.currentWeightKg ??
    Number(calculatedCurrentWeightKg.toFixed(4));

  const maxWeightKg =
    seed.maxWeightKg ?? profile.maxWeightKg;

  if (currentWeightKg > maxWeightKg) {
    throw new Error(
      `El pallet ${seed.palletCode} pesa ${currentWeightKg} kg y supera su capacidad máxima de ${maxWeightKg} kg.`
    );
  }

  return {
    maxQuantity,
    currentWeightKg,
    tareWeightKg: profile.palletTareKg,
    maxWeightKg,
    widthM: seed.widthM ?? profile.widthM,
    lengthM: seed.lengthM ?? profile.lengthM,
    heightM: seed.heightM ?? profile.heightM,
  };
}

const palletPhysicalProfiles: Record<
  string,
  PalletPhysicalProfile
> = {
  'ALT-001': {
    maxQuantity: 50,
    unitWeightKg: 14.4,
    palletTareKg: 25,
    maxWeightKg: 1200,
    widthM: 1.02,
    lengthM: 1.2,
    heightM: 1.55,
  },
  'ALT-002': {
    maxQuantity: 60,
    unitWeightKg: 12,
    palletTareKg: 25,
    maxWeightKg: 1200,
    widthM: 1.02,
    lengthM: 1.2,
    heightM: 1.5,
  },
  'ALT-003': {
    maxQuantity: 100,
    unitWeightKg: 9,
    palletTareKg: 25,
    maxWeightKg: 1200,
    widthM: 1.02,
    lengthM: 1.2,
    heightM: 1.45,
  },
  'ALT-004': {
    maxQuantity: 40,
    unitWeightKg: 20,
    palletTareKg: 25,
    maxWeightKg: 1200,
    widthM: 1.02,
    lengthM: 1.2,
    heightM: 1.35,
  },

  'MED-001': {
    maxQuantity: 30,
    unitWeightKg: 20,
    palletTareKg: 25,
    maxWeightKg: 1200,
    widthM: 1.02,
    lengthM: 1.2,
    heightM: 1.3,
  },
  'MED-002': {
    maxQuantity: 50,
    unitWeightKg: 12,
    palletTareKg: 25,
    maxWeightKg: 1200,
    widthM: 1.02,
    lengthM: 1.2,
    heightM: 1.4,
  },
  'MED-003': {
    maxQuantity: 80,
    unitWeightKg: 4,
    palletTareKg: 25,
    maxWeightKg: 1200,
    widthM: 1.02,
    lengthM: 1.2,
    heightM: 1.6,
  },
  'MED-004': {
    maxQuantity: 25,
    unitWeightKg: 15,
    palletTareKg: 25,
    maxWeightKg: 1200,
    widthM: 1.02,
    lengthM: 1.2,
    heightM: 1.2,
  },

  'BAJ-001': {
    maxQuantity: 20,
    unitWeightKg: 40,
    palletTareKg: 25,
    maxWeightKg: 1200,
    widthM: 1.02,
    lengthM: 1.2,
    heightM: 1.5,
  },
  'BAJ-002': {
    maxQuantity: 40,
    unitWeightKg: 20,
    palletTareKg: 25,
    maxWeightKg: 1200,
    widthM: 1.02,
    lengthM: 1.2,
    heightM: 1.45,
  },
  'BAJ-003': {
    maxQuantity: 15,
    unitWeightKg: 8,
    palletTareKg: 25,
    maxWeightKg: 1200,
    widthM: 1.02,
    lengthM: 1.2,
    heightM: 1.1,
  },
  'BAJ-004': {
    maxQuantity: 24,
    unitWeightKg: 8,
    palletTareKg: 25,
    maxWeightKg: 1200,
    widthM: 1.02,
    lengthM: 1.2,
    heightM: 1.3,
  },
};

// ============================================================
// 3. Catálogo oficial de productos MOE
// ============================================================
//
// Los productos definidos en este bloque constituyen el catálogo
// oficial del Laboratorio Operativo CJWMS.
//
// La definición debe mantenerse sincronizada con:
//
// docs/laboratory/MOE-CJWMS.md
//
// El Seeder no deberá incorporar productos fuera de la MOE sin
// actualizar previamente la especificación del laboratorio.
// ============================================================

const productSeeds: ProductSeed[] = [
  {
    sku: 'ALT-001',
    description: 'Agua embotellada 600 ml',
    unit: 'CAJA',
    rotation: 'alta',
  },
  {
    sku: 'ALT-002',
    description: 'Refresco 2 L',
    unit: 'CAJA',
    rotation: 'alta',
  },
  {
    sku: 'ALT-003',
    description: 'Harina de trigo',
    unit: 'SACO',
    rotation: 'alta',
  },
  {
    sku: 'ALT-004',
    description: 'Aceite vegetal',
    unit: 'CAJA',
    rotation: 'alta',
  },
  {
    sku: 'MED-001',
    description: 'Pintura vinílica',
    unit: 'CUBETA',
    rotation: 'media',
  },
  {
    sku: 'MED-002',
    description: 'Detergente líquido',
    unit: 'CAJA',
    rotation: 'media',
  },
  {
    sku: 'MED-003',
    description: 'Papel higiénico institucional',
    unit: 'PAQUETE',
    rotation: 'media',
  },
  {
    sku: 'MED-004',
    description: 'Refacción automotriz',
    unit: 'PIEZA',
    rotation: 'media',
  },
  {
    sku: 'BAJ-001',
    description: 'Lubricante industrial',
    unit: 'TAMBOR',
    rotation: 'baja',
  },
  {
    sku: 'BAJ-002',
    description: 'Resina plástica',
    unit: 'SACO',
    rotation: 'baja',
  },
  {
    sku: 'BAJ-003',
    description: 'Interruptor industrial',
    unit: 'PIEZA',
    rotation: 'baja',
  },
  {
    sku: 'BAJ-004',
    description: 'Equipo de protección personal',
    unit: 'CAJA',
    rotation: 'baja',
  },
];

const legacyProductSkus = new Set([
  'CAFE-001',
  'TEQUILA-001',
  'BETA-001',
  'PROTEINA-001',
]);

const legacyPalletCodes = new Set([
  'PALLET-CJWMS-0001',
  'PALLET-CJWMS-0002',
  'PALLET-CJWMS-0003',
  'PALLET-CJWMS-0004',
  'PALLET-CJWMS-0005',
  'PALLET-CJWMS-0006',
  'PALLET-CJWMS-0007',
  'PALLET-CJWMS-0008',
]);

// ============================================================
// 4. Definición de pallets e inventario
// ============================================================

// ------------------------------------------------------------
// 4.1 Alta Rotación
// ------------------------------------------------------------

const altaRotationPalletSeeds: PalletSeed[] = [
  {
    productSku: 'ALT-001',
    palletCode: 'PLT-ALT001-01',
    lot: 'LOT-ALT001-01',
    quantity: 50,
    maxQuantity: 50,
    widthM: 1.02,
    lengthM: 1.20,
    palletStatus: 'active',
  },
  {
    productSku: 'ALT-001',
    palletCode: 'PLT-ALT001-02',
    lot: 'LOT-ALT001-01',
    quantity: 30,
    maxQuantity: 50,
    widthM: 1.02,
    lengthM: 1.20,
    palletStatus: 'active',
  },
  {
    productSku: 'ALT-001',
    palletCode: 'PLT-ALT001-03',
    lot: 'LOT-ALT001-01',
    quantity: 20,
    maxQuantity: 50,
    widthM: 1.02,
    lengthM: 1.20,
    palletStatus: 'active',
  },
  {
    productSku: 'ALT-001',
    palletCode: 'PLT-ALT001-04',
    lot: 'LOT-ALT001-02',
    quantity: 50,
    maxQuantity: 50,
    widthM: 1.02,
    lengthM: 1.20,
    palletStatus: 'active',
  },
  {
    productSku: 'ALT-002',
    palletCode: 'PLT-ALT002-01',
    lot: 'LOT-ALT002-01',
    quantity: 60,
    palletStatus: 'active',
  },
  {
    productSku: 'ALT-002',
    palletCode: 'PLT-ALT002-02',
    lot: 'LOT-ALT002-01',
    quantity: 60,
    palletStatus: 'active',
  },
  {
    productSku: 'ALT-002',
    palletCode: 'PLT-ALT002-03',
    lot: 'LOT-ALT002-01',
    quantity: 35,
    palletStatus: 'active',
  },
  {
    productSku: 'ALT-002',
    palletCode: 'PLT-ALT002-04',
    lot: 'LOT-ALT002-02',
    quantity: 60,
    palletStatus: 'active',
  },
  {
    productSku: 'ALT-003',
    palletCode: 'PLT-ALT003-01',
    lot: 'LOT-ALT003-01',
    quantity: 100,
    palletStatus: 'active',
  },
  {
    productSku: 'ALT-003',
    palletCode: 'PLT-ALT003-02',
    lot: 'LOT-ALT003-01',
    quantity: 100,
    palletStatus: 'active',
  },
  {
    productSku: 'ALT-003',
    palletCode: 'PLT-ALT003-03',
    lot: 'LOT-ALT003-01',
    quantity: 40,
    palletStatus: 'active',
  },
  {
    productSku: 'ALT-004',
    palletCode: 'PLT-ALT004-01',
    lot: 'LOT-ALT004-01',
    quantity: 40,
    palletStatus: 'active',
  },
  {
    productSku: 'ALT-004',
    palletCode: 'PLT-ALT004-02',
    lot: 'LOT-ALT004-01',
    quantity: 15,
    palletStatus: 'active',
  },
  {
    productSku: 'ALT-004',
    palletCode: 'PLT-ALT004-03',
    lot: 'LOT-ALT004-02',
    quantity: 40,
    palletStatus: 'active',
  },
];

const altaRotationInventorySeeds: InventorySeed[] = [
  {
    palletCode: 'PLT-ALT001-01',
    positionCode: 'A01A',
    inventoryStatus: 'available',
  },
  {
    palletCode: 'PLT-ALT001-02',
    positionCode: 'A02A',
    inventoryStatus: 'available',
  },
  {
    palletCode: 'PLT-ALT001-03',
    positionCode: 'C01A',
    inventoryStatus: 'available',
  },
  {
    palletCode: 'PLT-ALT001-04',
    positionCode: 'D3-A-1-5',
    inventoryStatus: 'available',
  },
  {
    palletCode: 'PLT-ALT002-01',
    positionCode: 'A03A',
    inventoryStatus: 'available',
  },
  {
    palletCode: 'PLT-ALT002-02',
    positionCode: 'B01A',
    inventoryStatus: 'reserved',
  },
  {
    palletCode: 'PLT-ALT002-03',
    positionCode: 'B02A',
    inventoryStatus: 'available',
  },
  {
    palletCode: 'PLT-ALT002-04',
    positionCode: 'D3-C-1-5',
    inventoryStatus: 'available',
  },
  {
    palletCode: 'PLT-ALT003-01',
    positionCode: 'D1-A-1-5',
    inventoryStatus: 'available',
  },
  {
    palletCode: 'PLT-ALT003-02',
    positionCode: 'D1-A-1-4',
    inventoryStatus: 'available',
  },
  {
    palletCode: 'PLT-ALT003-03',
    positionCode: 'D1-A-1-3',
    inventoryStatus: 'available',
  },
  {
    palletCode: 'PLT-ALT004-01',
    positionCode: 'A04A',
    inventoryStatus: 'available',
  },
  {
    palletCode: 'PLT-ALT004-02',
    positionCode: 'E01A',
    inventoryStatus: 'available',
  },
  {
    palletCode: 'PLT-ALT004-03',
    positionCode: 'D3-B-1-5',
    inventoryStatus: 'available',
  },
];

// ------------------------------------------------------------
// 4.2 Media Rotación
// ------------------------------------------------------------

const mediaRotationPalletSeeds: PalletSeed[] = [
  {
    productSku: 'MED-001',
    palletCode: 'PLT-MED001-01',
    lot: 'LOT-MED001-01',
    quantity: 30,
    palletStatus: 'active',
  },
  {
    productSku: 'MED-001',
    palletCode: 'PLT-MED001-02',
    lot: 'LOT-MED001-01',
    quantity: 18,
    palletStatus: 'active',
  },
  {
    productSku: 'MED-001',
    palletCode: 'PLT-MED001-03',
    lot: 'LOT-MED001-02',
    quantity: 30,
    palletStatus: 'active',
  },
  {
    productSku: 'MED-002',
    palletCode: 'PLT-MED002-01',
    lot: 'LOT-MED002-01',
    quantity: 20,
    palletStatus: 'active',
  },
  {
    productSku: 'MED-002',
    palletCode: 'PLT-MED002-02',
    lot: 'LOT-MED002-01',
    quantity: 25,
    palletStatus: 'active',
  },
  {
    productSku: 'MED-002',
    palletCode: 'PLT-MED002-03',
    lot: 'LOT-MED002-02',
    quantity: 50,
    palletStatus: 'active',
  },
  {
    productSku: 'MED-003',
    palletCode: 'PLT-MED003-01',
    lot: 'LOT-MED003-01',
    quantity: 80,
    palletStatus: 'active',
  },
  {
    productSku: 'MED-003',
    palletCode: 'PLT-MED003-02',
    lot: 'LOT-MED003-01',
    quantity: 35,
    palletStatus: 'active',
  },
  {
    productSku: 'MED-004',
    palletCode: 'PLT-MED004-01',
    lot: 'LOT-MED004-01',
    quantity: 25,
    palletStatus: 'active',
  },
  {
    productSku: 'MED-004',
    palletCode: 'PLT-MED004-02',
    lot: 'LOT-MED004-01',
    quantity: 8,
    palletStatus: 'active',
  },
];

const mediaRotationInventorySeeds: InventorySeed[] = [
  {
    palletCode: 'PLT-MED001-01',
    positionCode: 'F01A',
    inventoryStatus: 'available',
  },
  {
    palletCode: 'PLT-MED001-02',
    positionCode: 'F02A',
    inventoryStatus: 'blocked',
  },
  {
    palletCode: 'PLT-MED001-03',
    positionCode: 'D2-B-1-5',
    inventoryStatus: 'available',
  },
  {
    palletCode: 'PLT-MED002-01',
    positionCode: 'C02A',
    inventoryStatus: 'available',
  },
  {
    palletCode: 'PLT-MED002-02',
    positionCode: 'C03A',
    inventoryStatus: 'available',
  },
  {
    palletCode: 'PLT-MED002-03',
    positionCode: 'D2-C-1-5',
    inventoryStatus: 'available',
  },
  {
    palletCode: 'PLT-MED003-01',
    positionCode: 'G01A',
    inventoryStatus: 'available',
  },
  {
    palletCode: 'PLT-MED003-02',
    positionCode: 'G02A',
    inventoryStatus: 'available',
  },
  {
    palletCode: 'PLT-MED004-01',
    positionCode: 'H01A',
    inventoryStatus: 'available',
  },
  {
    palletCode: 'PLT-MED004-02',
    positionCode: 'H02A',
    inventoryStatus: 'available',
  },
];

// ------------------------------------------------------------
// 4.3 Baja Rotación
// ------------------------------------------------------------

const bajaRotationPalletSeeds: PalletSeed[] = [
  {
    productSku: 'BAJ-001',
    palletCode: 'PLT-BAJ001-01',
    lot: 'LOT-BAJ001-01',
    quantity: 20,
    palletStatus: 'active',
  },
  {
    productSku: 'BAJ-001',
    palletCode: 'PLT-BAJ001-02',
    lot: 'LOT-BAJ001-01',
    quantity: 8,
    palletStatus: 'active',
  },
  {
    productSku: 'BAJ-002',
    palletCode: 'PLT-BAJ002-01',
    lot: 'LOT-BAJ002-01',
    quantity: 40,
    palletStatus: 'active',
  },
  {
    productSku: 'BAJ-002',
    palletCode: 'PLT-BAJ002-02',
    lot: 'LOT-BAJ002-01',
    quantity: 28,
    palletStatus: 'active',
  },
  {
    productSku: 'BAJ-003',
    palletCode: 'PLT-BAJ003-01',
    lot: 'LOT-BAJ003-01',
    quantity: 15,
    palletStatus: 'active',
  },
  {
    productSku: 'BAJ-003',
    palletCode: 'PLT-BAJ003-02',
    lot: 'LOT-BAJ003-02',
    quantity: 15,
    palletStatus: 'active',
  },
  {
    productSku: 'BAJ-004',
    palletCode: 'PLT-BAJ004-01',
    lot: 'LOT-BAJ004-01',
    quantity: 24,
    palletStatus: 'blocked',
  },
  {
    productSku: 'BAJ-004',
    palletCode: 'PLT-BAJ004-02',
    lot: 'LOT-BAJ004-02',
    quantity: 24,
    palletStatus: 'active',
  },
];

const bajaRotationInventorySeeds: InventorySeed[] = [
  {
    palletCode: 'PLT-BAJ001-01',
    positionCode: 'D4-A-1-5',
    inventoryStatus: 'available',
  },
  {
    palletCode: 'PLT-BAJ001-02',
    positionCode: 'D4-A-1-4',
    inventoryStatus: 'available',
  },
  {
    palletCode: 'PLT-BAJ002-01',
    positionCode: 'D4-B-1-5',
    inventoryStatus: 'available',
  },
  {
    palletCode: 'PLT-BAJ002-02',
    positionCode: 'D4-B-1-4',
    inventoryStatus: 'available',
  },
  {
    palletCode: 'PLT-BAJ003-01',
    positionCode: 'J01A',
    inventoryStatus: 'reserved',
  },
  {
    palletCode: 'PLT-BAJ003-02',
    positionCode: 'J02A',
    inventoryStatus: 'available',
  },
  {
    palletCode: 'PLT-BAJ004-01',
    positionCode: 'K01A',
    inventoryStatus: 'blocked',
  },
  {
    palletCode: 'PLT-BAJ004-02',
    positionCode: 'K02A',
    inventoryStatus: 'available',
  },
];

// ------------------------------------------------------------
// 4.4 Escenario Base completo
// ------------------------------------------------------------

const palletSeeds: PalletSeed[] = [
  ...altaRotationPalletSeeds,
  ...mediaRotationPalletSeeds,
  ...bajaRotationPalletSeeds,
];

const inventorySeeds: InventorySeed[] = [
  ...altaRotationInventorySeeds,
  ...mediaRotationInventorySeeds,
  ...bajaRotationInventorySeeds,
];

// ============================================================
// 5. Definición de racks
// ============================================================

function getOfficialRackSeeds() {
  const rackCodes = Array.from(
    new Set(
      rackLocations.map((location) => location.rack)
    )
  );

  return rackCodes.map((code) => {
    const sample = rackLocations.find(
      (location) => location.rack === code
    );

    return {
      code,
      name:
        sample?.zone === 'Drive In'
          ? `Drive In ${code}`
          : `Rack Selectivo ${code}`,
      rack_type:
        sample?.zone === 'Drive In'
          ? 'drive_in'
          : 'selectivo',
    } as const;
  });
}

// ============================================================
// 6. Definición de posiciones
// ============================================================

function getRackPositionPayload(
  locationId: string,
  rackId: string,
  warehouseId: string
) {
  const location = rackLocations.find(
    (item) => item.id === locationId
  );

  if (!location) {
    return null;
  }

  if (location.zone === 'Drive In') {
    const parts = location.id.split('-');

    return {
      warehouse_id: warehouseId,
      rack_id: rackId,
      code: location.id,
      line: parts[1],
      level: parts[2],
      position_number: Number(parts[3]),
      depth: Number(parts[3]),
      rack_type: 'drive_in' as const,
      zone: parts[0],
      max_depth: parts[2] === '1' ? 5 : 6,
      max_height_m: 1.6,
      max_weight_kg: 1000,
    };
  }

  return {
    warehouse_id: warehouseId,
    rack_id: rackId,
    code: location.id,
    line: location.rack,
    level: location.id.slice(-1),
    position_number: Number(location.id.slice(1, 3)),
    rack_type: 'selectivo' as const,
    zone: location.rack,
    max_height_m: 1.8,
    max_weight_kg: 1200,
  };
}

// ============================================================
// 7. Restablecimiento controlado del Laboratorio
// ============================================================

async function getLaboratoryWarehouseId(): Promise<string | null> {
  const warehouses = await getWarehouses();

  const laboratoryWarehouse = warehouses.find(
    (warehouse) => warehouse.code === warehouseSeed.code
  );

  return laboratoryWarehouse?.id ?? null;
}

async function clearLaboratoryMovementAllocations(): Promise<void> {
  const warehouseId = await getLaboratoryWarehouseId();

  if (!warehouseId) {
    return;
  }

  const [movements, allocations] = await Promise.all([
    getMovements(),
    getMovementAllocations(),
  ]);

  const laboratoryMovementIds = new Set(
    movements
      .filter(
        (movement) => movement.warehouse_id === warehouseId
      )
      .map((movement) => movement.id)
  );

  const laboratoryAllocations = allocations.filter(
    (allocation) =>
      laboratoryMovementIds.has(allocation.movement_id)
  );

  for (const allocation of laboratoryAllocations) {
    await deleteMovementAllocation(allocation.id);
  }
}

async function clearLaboratoryMovements(): Promise<void> {
  const warehouseId = await getLaboratoryWarehouseId();

  if (!warehouseId) {
    return;
  }

  const movements = await getMovements();

  const laboratoryMovements = movements.filter(
    (movement) => movement.warehouse_id === warehouseId
  );

  for (const movement of laboratoryMovements) {
    await deleteMovement(movement.id);
  }
}

async function clearLaboratoryInventory(): Promise<string[]> {
  const warehouseId = await getLaboratoryWarehouseId();

  if (!warehouseId) {
    return [];
  }

  const inventory = await getInventory();

  const laboratoryInventory = inventory.filter(
    (item) => item.warehouse_id === warehouseId
  );

  const laboratoryPalletIds = Array.from(
    new Set(
      laboratoryInventory.map((item) => item.pallet_id)
    )
  );

  for (const item of laboratoryInventory) {
    await deleteInventory(item.id);
  }

  return laboratoryPalletIds;
}

async function clearLaboratoryPallets(
  laboratoryPalletIds: string[]
): Promise<string[]> {
  const pallets = await getPallets();

  const laboratoryPalletIdSet = new Set(
    laboratoryPalletIds
  );

  const officialLaboratoryPalletCodes = new Set(
    palletSeeds.map((seed) => seed.palletCode)
  );

  const laboratoryPallets = pallets.filter(
    (pallet) =>
      laboratoryPalletIdSet.has(pallet.id) ||
      officialLaboratoryPalletCodes.has(
        pallet.pallet_code
      ) ||
      legacyPalletCodes.has(
        pallet.pallet_code
      )
  );

  const laboratoryProductIds = Array.from(
    new Set(
      laboratoryPallets.map(
        (pallet) => pallet.product_id
      )
    )
  );

  for (const pallet of laboratoryPallets) {
    await deletePallet(pallet.id);
  }

  return laboratoryProductIds;
}

async function clearLaboratoryProducts(): Promise<void> {
  const [products, remainingPallets, remainingMovements] =
    await Promise.all([
      getProducts(),
      getPallets(),
      getMovements(),
    ]);

  const productIdsStillInPallets = new Set(
    remainingPallets.map((pallet) => pallet.product_id)
  );

  const productIdsStillInMovements = new Set(
    remainingMovements
      .map((movement) => movement.product_id)
      .filter(
        (productId): productId is string =>
          productId !== null
      )
  );

  const legacyProductsToDeactivate = products.filter(
    (product) =>
      legacyProductSkus.has(product.sku) &&
      product.is_active &&
      !productIdsStillInPallets.has(product.id) &&
      !productIdsStillInMovements.has(product.id)
  );

  for (const product of legacyProductsToDeactivate) {
    await deactivateProduct(product.id);
  }
}

export async function resetCJWMSDemoData(): Promise<void> {
  await clearLaboratoryMovementAllocations();
  await clearLaboratoryMovements();

  const laboratoryPalletIds =
    await clearLaboratoryInventory();

    await clearLaboratoryPallets(
      laboratoryPalletIds
    );

    await clearLaboratoryProducts();
}

// ============================================================
// 8. Ejecución del Seeder
// ============================================================

export async function seedCJWMSDemoData() {
  // ----------------------------------------------------------
  // 8.1 Almacén
  // ----------------------------------------------------------

  const warehouses = await getWarehouses();

  const warehouse =
    warehouses.find(
      (item) => item.code === warehouseSeed.code
    ) ??
    (await createWarehouse(warehouseSeed));

  // ----------------------------------------------------------
  // 8.2 Productos
  // ----------------------------------------------------------

  let products = await getProducts();

  for (const seed of productSeeds) {
    const exists = products.some(
      (item) => item.sku === seed.sku
    );

    if (!exists) {
      await createProduct(seed);
      products = await getProducts();
    }
  }

  // ----------------------------------------------------------
  // 8.3 Racks
  // ----------------------------------------------------------

  let racks = await getRacks();
  const officialRackSeeds = getOfficialRackSeeds();

  for (const seed of officialRackSeeds) {
    const exists = racks.some(
      (item) => item.code === seed.code
    );

    if (!exists) {
      await createRack({
        warehouse_id: warehouse.id,
        code: seed.code,
        name: seed.name,
        rack_type: seed.rack_type,
      });

      racks = await getRacks();
    }
  }

  // ----------------------------------------------------------
  // 8.4 Posiciones
  // ----------------------------------------------------------

  let positions = await getRackPositions();

  racks = await getRacks();

  const existingPositionCodes = new Set(
    positions.map((item) =>
      item.code.trim().toUpperCase()
    )
  );

  for (const location of rackLocations) {
    const locationCode = location.id
      .trim()
      .toUpperCase();

    const existingPosition = positions.find(
      (item) =>
        item.code.trim().toUpperCase() === locationCode
    );

    if (existingPosition) {
      const payload = getRackPositionPayload(
        location.id,
        existingPosition.rack_id,
        warehouse.id
      );

      if (!payload) {
        continue;
      }

      await updateRackPositionPhysical({
        positionId: existingPosition.id,
        maxHeightM: payload.max_height_m ?? null,
        maxWeightKg: payload.max_weight_kg ?? null,
      });

      continue;
    }

    const rack = racks.find(
      (item) => item.code === location.rack
    );

    if (!rack) {
      continue;
    }

    const payload = getRackPositionPayload(
      location.id,
      rack.id,
      warehouse.id
    );

    if (!payload) {
      continue;
    }

    try {
      await createRackPosition(payload);
      existingPositionCodes.add(locationCode);
    } catch (error) {
      console.warn(
        'Posición ya existente o no insertada:',
        location.id,
        error
      );

      existingPositionCodes.add(locationCode);
    }
  }

  // ----------------------------------------------------------
  // 8.5 Pallets
  // ----------------------------------------------------------

  let pallets = await getPallets();

  products = await getProducts();

  for (const seed of palletSeeds) {
    const product = products.find(
      (item) => item.sku === seed.productSku
    );

    if (!product) {
      continue;
    }

    const palletExists = pallets.some(
      (item) => item.pallet_code === seed.palletCode
    );

    if (palletExists) {
      continue;
    }

  const physicalData = getPalletPhysicalSeedData(seed);

  await createPallet({
    product_id: product.id,
    pallet_code: seed.palletCode,
    lot: seed.lot,
    quantity: seed.quantity,
    unit: product.unit ?? 'CAJA',
    max_quantity: physicalData.maxQuantity,
    current_weight_kg: physicalData.currentWeightKg,
    tare_weight_kg: physicalData.tareWeightKg,
    max_weight_kg: physicalData.maxWeightKg,
    width_m: physicalData.widthM,
    length_m: physicalData.lengthM,
    height_m: physicalData.heightM,
    status: seed.palletStatus ?? 'active',
  });

    pallets = await getPallets();
  }

  // ----------------------------------------------------------
  // 8.6 Inventario
  // ----------------------------------------------------------

  let inventory = await getInventory();

  positions = await getRackPositions();
  pallets = await getPallets();

  for (const seed of inventorySeeds) {
    const position = positions.find(
      (item) => item.code === seed.positionCode
    );

    const pallet = pallets.find(
      (item) => item.pallet_code === seed.palletCode
    );

    if (!position || !pallet) {
      continue;
    }

    const inventoryExists = inventory.some(
      (item) =>
        item.rack_position_id === position.id ||
        item.pallet_id === pallet.id
    );

    if (inventoryExists) {
      continue;
    }

    await createInventoryItem({
      warehouse_id: warehouse.id,
      rack_position_id: position.id,
      pallet_id: pallet.id,
      status: seed.inventoryStatus ?? 'available',
    });

    inventory = await getInventory();
  }

  // ----------------------------------------------------------
  // 8.7 Movimiento demostrativo
  // ----------------------------------------------------------

  const movements = await getMovements();

  if (movements.length === 0) {
    inventory = await getInventory();
    products = await getProducts();

    const firstInventory = inventory[0];
    const firstProduct = products[0];

    if (firstInventory && firstProduct) {
      await createMovement({
        warehouse_id: warehouse.id,
        movement_type: 'entrada',
        pallet_id: firstInventory.pallet_id,
        product_id: firstProduct.id,
        origin_position_id: null,
        destination_position_id:
          firstInventory.rack_position_id,
        quantity: 1,
        unit: firstProduct.unit ?? 'CAJA',
        status: 'completed',
        reason: 'Seeder oficial CJWMS',
        notes:
          'Entrada demo generada desde Seeder Oficial CJWMS.',
        decision_score: 85,
        decision_explanation:
          'Movimiento demo para validar inventario vivo conectado a Supabase.',
        created_by: 'CJWMS Seeder',
      });
    }
  }

  // ----------------------------------------------------------
  // 8.8 Resultado
  // ----------------------------------------------------------

  return {
    warehouse,
    products: await getProducts(),
    racks: await getRacks(),
    positions: await getRackPositions(),
    pallets: await getPallets(),
    inventory: await getInventory(),
    movements: await getMovements(),
  };
}