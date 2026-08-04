import {
  assignMovementPicking,
  createMovement,
  type CreateMovementInput,
  type MovementItem,
  type UpdateMovementAssignmentInput,
} from './movementService';

import {
  changeInventoryPosition,
  changeInventoryStatus,
  createInventoryItem,
  getInventory,
} from './inventoryService';

import { getPallets } from './palletService';

import { registerOperationalMemory } from './operationalMemoryService';

type ExecuteMovementInput = CreateMovementInput;
type AssignPickingInput = UpdateMovementAssignmentInput;

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

  await registerOperationalMemory({
    memoryType: 'movement',
    entityId: createdMovement.id,
    entityType: 'movement',
    title: `Movimiento ${createdMovement.movement_type} ejecutado`,
    description: `Movimiento ${createdMovement.movement_type} registrado correctamente en CJWMS.`,
    score: createdMovement.decision_score ?? 75,
    metadata: {
      phase: '12.6',
      source: 'movementWorkflowService',
      warehouseId: createdMovement.warehouse_id,
      movementType: createdMovement.movement_type,
      palletId: createdMovement.pallet_id,
      productId: createdMovement.product_id,
      originPositionId: createdMovement.origin_position_id,
      destinationPositionId: createdMovement.destination_position_id,
      status: createdMovement.status,
      reason: createdMovement.reason,
    },
  });

  return createdMovement;
}

export async function assignPickingWorkflow(
  movementId: string,
  assignment: AssignPickingInput
): Promise<MovementItem> {
  const updatedMovement = await assignMovementPicking(
    movementId,
    assignment
  );

  await registerOperationalMemory({
    memoryType: 'movement',
    entityId: updatedMovement.id,
    entityType: 'movement',
    title: 'Asignación Operativa de Picking confirmada',
    description:
      'La solicitud de surtido fue asignada a un operador y quedó pendiente de inicio.',
    score: updatedMovement.decision_score ?? 80,
    metadata: {
      phase: '21.20',
      source: 'movementWorkflowService',
      movementId: updatedMovement.id,
      warehouseId: updatedMovement.warehouse_id,
      movementType: updatedMovement.movement_type,
      palletId: updatedMovement.pallet_id,
      productId: updatedMovement.product_id,
      originPositionId: updatedMovement.origin_position_id,
      operatorId: updatedMovement.operator_id,
      forkliftUnitId: updatedMovement.forklift_unit_id,
      status: updatedMovement.status,
      operationalState: 'picking_pending_start',
    },
  });

  return updatedMovement;
}
