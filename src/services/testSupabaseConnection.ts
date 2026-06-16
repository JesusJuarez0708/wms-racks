import { createWarehouse, getWarehouses } from './warehouseService';

export async function testSupabaseConnection() {
  const warehouses = await getWarehouses();

  if (warehouses.length === 0) {
    await createWarehouse({
      code: 'CJWMS-01',
      name: 'Almacén Principal CJWMS',
    });
  }

  return getWarehouses();
}