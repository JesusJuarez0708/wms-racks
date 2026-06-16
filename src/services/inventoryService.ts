import {
  fetchInventory,
  insertInventory,
  updateInventoryPosition,
  updateInventoryStatus,
} from '../repositories/inventoryRepository';

import type {
  CreateInventoryRecord,
  InventoryRecord,
} from '../repositories/inventoryRepository';

export type InventoryItem = InventoryRecord;
export type CreateInventoryInput = CreateInventoryRecord;

export async function getInventory(): Promise<InventoryItem[]> {
  return fetchInventory();
}

export async function createInventoryItem(
  inventory: CreateInventoryInput
): Promise<InventoryItem> {
  return insertInventory(inventory);
}

export async function changeInventoryStatus(
  id: string,
  status: InventoryItem['status']
): Promise<InventoryItem> {
  return updateInventoryStatus(id, status);
}

export async function changeInventoryPosition(
  id: string,
  rackPositionId: string
): Promise<InventoryItem> {
  return updateInventoryPosition(id, rackPositionId);
}