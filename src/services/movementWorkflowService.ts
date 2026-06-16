import {
  createMovement,
  type CreateMovementInput,
  type MovementItem,
} from './movementService';

import {
  changeInventoryPosition,
  changeInventoryStatus,
  createInventoryItem,
  getInventory,
} from './inventoryService';

import { getPallets } from './palletService';

type ExecuteMovementInput = CreateMovementInput;

export async function executeMovementWorkflow(
  movement: ExecuteMovementInput
): Promise<MovementItem> {
  const inventory = await getInventory();

  let movementToCreate: ExecuteMovementInput = {
    ...movement,
  };

  const existingInventoryItem = movement.pallet_id
    ? inventory.find((item) => item.pallet_id === movement.pallet_id)
    : null;

  if (movement.movement_type === 'entrada') {
    if (
      movement.destination_position_id &&
      movement.pallet_id &&
      !existingInventoryItem
    ) {
      await createInventoryItem({
        warehouse_id: movement.warehouse_id,
        rack_position_id: movement.destination_position_id,
        pallet_id: movement.pallet_id,
        status: 'available',
      });
    }

    if (movement.destination_position_id && existingInventoryItem) {
      await changeInventoryPosition(
        existingInventoryItem.id,
        movement.destination_position_id
      );

      if (existingInventoryItem.status !== 'available') {
        await changeInventoryStatus(existingInventoryItem.id, 'available');
      }
    }
  }

  if (movement.movement_type === 'reubicacion') {
    const originInventoryItem = movement.origin_position_id
      ? inventory.find(
          (item) =>
            item.rack_position_id === movement.origin_position_id &&
            item.status === 'available'
        )
      : null;

    const inventoryItemToMove = originInventoryItem ?? existingInventoryItem;

    if (movement.destination_position_id && inventoryItemToMove) {
      await changeInventoryPosition(
        inventoryItemToMove.id,
        movement.destination_position_id
      );

      if (inventoryItemToMove.status !== 'available') {
        await changeInventoryStatus(inventoryItemToMove.id, 'available');
      }

      const pallets = await getPallets();
      const movedPallet = pallets.find(
        (pallet) => pallet.id === inventoryItemToMove.pallet_id
      );

      movementToCreate = {
        ...movementToCreate,
        pallet_id: inventoryItemToMove.pallet_id,
        product_id: movedPallet?.product_id ?? movementToCreate.product_id,
      };
    }
  }

  if (movement.movement_type === 'salida') {
    if (existingInventoryItem) {
      await changeInventoryStatus(existingInventoryItem.id, 'reserved');
    }
  }

  const createdMovement = await createMovement(movementToCreate);

  return createdMovement;
}