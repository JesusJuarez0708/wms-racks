import { getRackPositions } from './rackPositionService';
import { getPallets } from './palletService';
import { getProducts } from './productService';

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

export type InventoryQueryItem = {
  inventory: InventoryItem;
  productId: string;
  locationCode: string;
  palletNumber: string;
  productSku: string;
  productDescription: string;
  quantity: number;
  unit: string;
};

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

export async function getInventoryQuery(): Promise<InventoryQueryItem[]> {
  const [inventory, positions, pallets, products] = await Promise.all([
    getInventory(),
    getRackPositions(),
    getPallets(),
    getProducts(),
  ]);

  return inventory
    .filter((item) => item.status === 'available')
    .map((item) => {
      const position = positions.find(
        (position) => position.id === item.rack_position_id
      );

      const pallet = pallets.find(
        (pallet) => pallet.id === item.pallet_id
      );

      const product = products.find(
        (product) => product.id === pallet?.product_id
      );

      return {
        inventory: item,
        productId: pallet?.product_id ?? '',
        locationCode: position?.code ?? '',
        palletNumber: pallet?.pallet_code ?? '',
        productSku: product?.sku ?? '',
        productDescription: product?.description ?? '',
        quantity: pallet?.quantity ?? 0,
        unit: pallet?.unit ?? '',
      };
    });
}
