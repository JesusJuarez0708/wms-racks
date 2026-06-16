import {
  deactivateWarehouseRecord,
  fetchWarehouses,
  insertWarehouse,
  updateWarehouseRecord,
} from '../repositories/warehouseRepository';

import type {
  CreateWarehouseRecord,
  WarehouseRecord,
} from '../repositories/warehouseRepository';

export type Warehouse = WarehouseRecord;

export type CreateWarehouseInput = CreateWarehouseRecord;

export async function getWarehouses(): Promise<Warehouse[]> {
  return fetchWarehouses();
}

export async function createWarehouse(
  warehouse: CreateWarehouseInput
): Promise<Warehouse> {
  return insertWarehouse(warehouse);
}

export async function updateWarehouse(
  id: string,
  warehouse: Partial<CreateWarehouseInput>
): Promise<Warehouse> {
  return updateWarehouseRecord(id, warehouse);
}

export async function deactivateWarehouse(id: string): Promise<Warehouse> {
  return deactivateWarehouseRecord(id);
}