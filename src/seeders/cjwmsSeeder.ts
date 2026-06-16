import { rackLocations } from '../data/racks';

import { createWarehouse, getWarehouses } from '../services/warehouseService';
import { createProduct, getProducts } from '../services/productService';
import { createRack, getRacks } from '../services/rackService';
import { createPallet, getPallets } from '../services/palletService';
import { createMovement, getMovements } from '../services/movementService';

import {
  createRackPosition,
  getRackPositions,
} from '../services/rackPositionService';

import {
  createInventoryItem,
  getInventory,
} from '../services/inventoryService';

type ProductSeed = {
  sku: string;
  description: string;
  unit: string;
  rotation: 'alta' | 'media' | 'baja';
};

const productSeeds: ProductSeed[] = [
  {
    sku: 'CAFE-001',
    description: 'Café prueba CJWMS',
    unit: 'CAJA',
    rotation: 'alta',
  },
  {
    sku: 'TEQUILA-001',
    description: 'Tequila prueba CJWMS',
    unit: 'CAJA',
    rotation: 'baja',
  },
  {
    sku: 'BETA-001',
    description: 'Beta-Alanina prueba CJWMS',
    unit: 'TAMBOR',
    rotation: 'media',
  },
  {
    sku: 'PROTEINA-001',
    description: 'Proteína prueba CJWMS',
    unit: 'SACO',
    rotation: 'alta',
  },
];

const inventorySeeds = [
  {
    positionCode: 'D1-A-1-5',
    productSku: 'TEQUILA-001',
    palletCode: 'PALLET-CJWMS-0001',
    lot: 'LOTE-TEQ-001',
    quantity: 1,
  },
  {
    positionCode: 'D1-A-1-4',
    productSku: 'TEQUILA-001',
    palletCode: 'PALLET-CJWMS-0002',
    lot: 'LOTE-TEQ-001',
    quantity: 1,
  },
  {
    positionCode: 'D1-A-1-3',
    productSku: 'CAFE-001',
    palletCode: 'PALLET-CJWMS-0003',
    lot: 'LOTE-CAF-001',
    quantity: 1,
  },
  {
    positionCode: 'D1-A-1-2',
    productSku: 'CAFE-001',
    palletCode: 'PALLET-CJWMS-0004',
    lot: 'LOTE-CAF-001',
    quantity: 1,
  },
  {
    positionCode: 'D2-N-1-5',
    productSku: 'BETA-001',
    palletCode: 'PALLET-CJWMS-0005',
    lot: 'LOTE-BETA-001',
    quantity: 1,
  },
  {
    positionCode: 'D2-N-1-4',
    productSku: 'BETA-001',
    palletCode: 'PALLET-CJWMS-0006',
    lot: 'LOTE-BETA-001',
    quantity: 1,
  },
  {
    positionCode: 'A01A',
    productSku: 'PROTEINA-001',
    palletCode: 'PALLET-CJWMS-0007',
    lot: 'LOTE-PROT-001',
    quantity: 1,
  },
  {
    positionCode: 'B01A',
    productSku: 'PROTEINA-001',
    palletCode: 'PALLET-CJWMS-0008',
    lot: 'LOTE-PROT-001',
    quantity: 1,
  },
];

function getOfficialRackSeeds() {
  const rackCodes = Array.from(
    new Set(rackLocations.map((location) => location.rack))
  );

  return rackCodes.map((code) => {
    const sample = rackLocations.find((location) => location.rack === code);

    return {
      code,
      name:
        sample?.zone === 'Drive In'
          ? `Drive In ${code}`
          : `Rack Selectivo ${code}`,
      rack_type: sample?.zone === 'Drive In' ? 'drive_in' : 'selectivo',
    } as const;
  });
}

function getRackPositionPayload(locationId: string, rackId: string, warehouseId: string) {
  const location = rackLocations.find((item) => item.id === locationId);

  if (!location) return null;

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
  };
}

export async function seedCJWMSDemoData() {
  const warehouses = await getWarehouses();

  const warehouse =
    warehouses.find((item) => item.code === 'CJWMS-01') ??
    warehouses[0] ??
    (await createWarehouse({
      code: 'CJWMS-01',
      name: 'Almacén Principal CJWMS',
    }));

  let products = await getProducts();

  for (const seed of productSeeds) {
    const exists = products.some((item) => item.sku === seed.sku);

    if (!exists) {
      await createProduct(seed);
      products = await getProducts();
    }
  }

  let racks = await getRacks();
  const officialRackSeeds = getOfficialRackSeeds();

  for (const seed of officialRackSeeds) {
    const exists = racks.some((item) => item.code === seed.code);

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


  let positions = await getRackPositions();
  racks = await getRacks();

  const existingPositionCodes = new Set(
    positions.map((item) => item.code.trim().toUpperCase())
  );

  for (const location of rackLocations) {
    const locationCode = location.id.trim().toUpperCase();

    if (existingPositionCodes.has(locationCode)) continue;

    const rack = racks.find((item) => item.code === location.rack);

    if (!rack) continue;

    const payload = getRackPositionPayload(
      location.id,
      rack.id,
      warehouse.id
    );

    if (!payload) continue;

    try {
      await createRackPosition(payload);
      existingPositionCodes.add(locationCode);
    } catch (error) {
      console.warn('Posición ya existente o no insertada:', location.id, error);
      existingPositionCodes.add(locationCode);
    }
  }

  let pallets = await getPallets();
  let inventory = await getInventory();

  products = await getProducts();
  positions = await getRackPositions();

  for (const seed of inventorySeeds) {
    const position = positions.find((item) => item.code === seed.positionCode);
    const product = products.find((item) => item.sku === seed.productSku);

    if (!position || !product) continue;

    let pallet = pallets.find((item) => item.pallet_code === seed.palletCode);

    if (!pallet) {
      pallet = await createPallet({
        product_id: product.id,
        pallet_code: seed.palletCode,
        lot: seed.lot,
        quantity: seed.quantity,
        unit: product.unit ?? 'CAJA',
      });

      pallets = await getPallets();
    }

    const inventoryExists = inventory.some(
      (item) =>
        item.rack_position_id === position.id || item.pallet_id === pallet.id
    );

    if (!inventoryExists) {
      await createInventoryItem({
        warehouse_id: warehouse.id,
        rack_position_id: position.id,
        pallet_id: pallet.id,
        status: 'available',
      });

      inventory = await getInventory();
    }
  }

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
        destination_position_id: firstInventory.rack_position_id,
        quantity: 1,
        unit: firstProduct.unit ?? 'CAJA',
        status: 'completed',
        reason: 'Seeder oficial CJWMS',
        notes: 'Entrada demo generada desde Seeder Oficial CJWMS.',
        decision_score: 85,
        decision_explanation:
          'Movimiento demo para validar inventario vivo conectado a Supabase.',
        created_by: 'CJWMS Seeder',
      });
    }
  }

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