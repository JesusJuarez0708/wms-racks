import { getRacks, createRack } from './rackService';
import { getWarehouses } from './warehouseService';

export async function testRackConnection() {
  const warehouses = await getWarehouses();

  if (warehouses.length === 0) {
    throw new Error('No existe ningún almacén para asociar racks.');
  }

  const warehouse = warehouses[0];
  const racks = await getRacks();

  if (racks.length === 0) {
    await createRack({
      warehouse_id: warehouse.id,
      code: 'D1',
      name: 'Drive In D1',
      rack_type: 'drive_in',
    });

    await createRack({
      warehouse_id: warehouse.id,
      code: 'A',
      name: 'Rack Selectivo A',
      rack_type: 'selectivo',
    });
  }

  return getRacks();
}