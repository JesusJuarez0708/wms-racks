import {
  assignMovementPicking,
  confirmDeliveryAreaArrival,
  confirmOperationalVerification,
  createMovement,
  finishPickingMovement,
  getMovements,
  registerPickingProgress,
  startPickingMovement,
  type CompleteMovementPickingInput,
  type ConfirmMovementDeliveryArrivalInput,
  type ConfirmMovementOperationalVerificationInput,
  type CreateMovementInput,
  type MovementItem,
  type StartMovementPickingInput,
  type UpdateMovementAssignmentInput,
  type UpdateMovementPickingProgressInput,
} from './movementService';

import {
  changeInventoryPosition,
  changeInventoryStatus,
  createInventoryItem,
  getInventory,
} from './inventoryService';

import { getPallets } from './palletService';

import { registerOperationalMemory } from './operationalMemoryService';

import {
  canStartOperationalVerification,
  isPickingCompleted,
} from '../utils/movementOperationalState';

type ExecuteMovementInput = CreateMovementInput;
type AssignPickingInput = UpdateMovementAssignmentInput;
type StartPickingInput = StartMovementPickingInput;
type PickingProgressInput = UpdateMovementPickingProgressInput;
type CompletePickingInput = CompleteMovementPickingInput;
type ConfirmDeliveryArrivalInput = ConfirmMovementDeliveryArrivalInput;
type OperationalVerificationInput = ConfirmMovementOperationalVerificationInput;

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

export async function startPickingWorkflow(
  movementId: string,
  picking: StartPickingInput
): Promise<MovementItem> {
  const updatedMovement = await startPickingMovement(
    movementId,
    picking
  );

  await registerOperationalMemory({
    memoryType: 'movement',
    entityId: updatedMovement.id,
    entityType: 'movement',
    title: 'Inicio Operativo del Picking confirmado',
    description:
      'El operador asignado inició formalmente la ejecución física del surtido.',
    score: updatedMovement.decision_score ?? 85,
    metadata: {
      phase: '21.21',
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
      operationalState: 'picking_in_progress',
    },
  });

  return updatedMovement;
}

export async function registerPickingProgressWorkflow(
  movementId: string,
  progress: PickingProgressInput
): Promise<MovementItem> {
  const updatedMovement = await registerPickingProgress(
    movementId,
    progress
  );

  await registerOperationalMemory({
    memoryType: 'movement',
    entityId: updatedMovement.id,
    entityType: 'movement',
    title: 'Avance parcial de picking confirmado',
    description:
      'El operador confirmó una extracción parcial del surtido sin finalizar todavía el movimiento.',
    score: updatedMovement.decision_score ?? 88,
    metadata: {
      phase: '21.22',
      source: 'movementWorkflowService',
      movementId: updatedMovement.id,
      warehouseId: updatedMovement.warehouse_id,
      movementType: updatedMovement.movement_type,
      palletId: updatedMovement.pallet_id,
      productId: updatedMovement.product_id,
      originPositionId: updatedMovement.origin_position_id,
      operatorId: updatedMovement.operator_id,
      forkliftUnitId: updatedMovement.forklift_unit_id,
      quantity: updatedMovement.quantity,
      unit: updatedMovement.unit,
      status: updatedMovement.status,
      operationalState: 'picking_partial_extraction_confirmed',
    },
  });

  return updatedMovement;
}

export async function completePickingWorkflow(
  movementId: string,
  completion: CompletePickingInput
): Promise<MovementItem> {
  const [movements, inventory] = await Promise.all([
    getMovements(),
    getInventory(),
  ]);

  const movementToComplete = movements.find(
    (movement) =>
      movement.id === movementId &&
      movement.movement_type === 'salida' &&
      movement.status === 'pending'
  );

  if (!movementToComplete) {
    throw new Error(
      'No se encontró un movimiento de picking pendiente para finalizar.'
    );
  }

  if (!movementToComplete.pallet_id) {
    throw new Error(
      'El movimiento de picking no tiene un pallet asociado.'
    );
  }

  const movementInventoryItem = inventory.find(
    (item) =>
      item.status === 'reserved' &&
      item.pallet_id === movementToComplete.pallet_id
  );

  if (!movementInventoryItem) {
    throw new Error(
      'No se encontró inventario reservado para confirmar la extracción total.'
    );
  }

  const updatedMovement = await finishPickingMovement(
    movementId,
    completion
  );

  await registerOperationalMemory({
    memoryType: 'movement',
    entityId: updatedMovement.id,
    entityType: 'movement',
    title: 'Picking Finalizado confirmado',
    description:
      'La extracción total del surtido fue confirmada y la mercancía quedó reservada en el Área de Entrega, pendiente de verificación del supervisor.',
    score: updatedMovement.decision_score ?? 92,
    metadata: {
      phase: '21.23',
      source: 'movementWorkflowService',
      movementId: updatedMovement.id,
      warehouseId: updatedMovement.warehouse_id,
      movementType: updatedMovement.movement_type,
      palletId: updatedMovement.pallet_id,
      productId: updatedMovement.product_id,
      originPositionId: updatedMovement.origin_position_id,
      operatorId: updatedMovement.operator_id,
      forkliftUnitId: updatedMovement.forklift_unit_id,
      quantity: updatedMovement.quantity,
      unit: updatedMovement.unit,
      status: updatedMovement.status,
      inventoryId: movementInventoryItem.id,
      inventoryStatus: movementInventoryItem.status,
      logicalDestination: 'Área de Entrega',
      operationalState: 'picking_total_extraction_confirmed',
      nextProcess: 'verification_and_loading',
    },
  });

  return updatedMovement;
}

export async function confirmDeliveryAreaArrivalWorkflow(
  movementId: string,
  arrival: ConfirmDeliveryArrivalInput
): Promise<MovementItem> {
  const [movements, inventory] = await Promise.all([
    getMovements(),
    getInventory(),
  ]);

  const movementToConfirm = movements.find(
    (movement) =>
      movement.id === movementId &&
      isPickingCompleted(movement)
  );

  if (!movementToConfirm) {
    throw new Error(
      'No se encontró un picking finalizado pendiente de llegada al Área de Entrega.'
    );
  }

  if (!movementToConfirm.pallet_id) {
    throw new Error(
      'El movimiento no tiene un pallet asociado para confirmar su llegada.'
    );
  }

  const reservedInventoryItem = inventory.find(
    (item) =>
      item.pallet_id === movementToConfirm.pallet_id &&
      item.status === 'reserved'
  );

  if (!reservedInventoryItem) {
    throw new Error(
      'No se encontró inventario reservado para confirmar la llegada al Área de Entrega.'
    );
  }

  const updatedMovement = await confirmDeliveryAreaArrival(
    movementId,
    arrival
  );

  await registerOperationalMemory({
    memoryType: 'movement',
    entityId: updatedMovement.id,
    entityType: 'movement',
    title: 'Llegada al Área de Entrega confirmada',
    description:
      'El pallet fue recibido físicamente en el Área de Entrega y quedó pendiente de verificación operativa por el supervisor.',
    score: updatedMovement.decision_score ?? 94,
    metadata: {
      phase: '21.24',
      source: 'movementWorkflowService',
      movementId: updatedMovement.id,
      warehouseId: updatedMovement.warehouse_id,
      movementType: updatedMovement.movement_type,
      palletId: updatedMovement.pallet_id,
      productId: updatedMovement.product_id,
      originPositionId: updatedMovement.origin_position_id,
      operatorId: updatedMovement.operator_id,
      forkliftUnitId: updatedMovement.forklift_unit_id,
      quantity: updatedMovement.quantity,
      unit: updatedMovement.unit,
      status: updatedMovement.status,
      inventoryId: reservedInventoryItem.id,
      inventoryStatus: reservedInventoryItem.status,
      operationalState: 'delivery_area_pending_verification',
      logicalLocation: 'Área de Entrega',
      nextAction: 'supervisor_verification',
    },
  });

  return updatedMovement;
}

export async function confirmOperationalVerificationWorkflow(
  movementId: string,
  verification: OperationalVerificationInput
): Promise<MovementItem> {
  const [movements, inventory] = await Promise.all([
    getMovements(),
    getInventory(),
  ]);

  const movementToVerify = movements.find(
    (movement) =>
      movement.id === movementId &&
      canStartOperationalVerification(movement)
  );

  if (!movementToVerify) {
    throw new Error(
      'No se encontró mercancía en el Área de Entrega pendiente de verificación operativa.'
    );
  }

  if (!movementToVerify.pallet_id) {
    throw new Error(
      'El movimiento no tiene un pallet asociado para realizar la verificación operativa.'
    );
  }

  const reservedInventoryItem = inventory.find(
    (item) =>
      item.pallet_id === movementToVerify.pallet_id &&
      item.status === 'reserved'
  );

  if (!reservedInventoryItem) {
    throw new Error(
      'No se encontró inventario reservado para completar la verificación operativa.'
    );
  }

  const updatedMovement =
    await confirmOperationalVerification(
      movementId,
      verification
    );

  const requiresPacking =
    verification.requires_packing;

  await registerOperationalMemory({
    memoryType: 'movement',
    entityId: updatedMovement.id,
    entityType: 'movement',
    title: requiresPacking
      ? 'Verificación Operativa: requiere empaque'
      : 'Verificación Operativa: liberado para embarque',
    description: requiresPacking
      ? 'El supervisor verificó físicamente la mercancía y determinó que debe pasar al proceso de Empaque.'
      : 'El supervisor verificó físicamente la mercancía y determinó que puede continuar directamente al proceso de Embarque.',
    score: updatedMovement.decision_score ?? 96,
    metadata: {
      phase: '21.24B',
      source: 'movementWorkflowService',
      movementId: updatedMovement.id,
      warehouseId: updatedMovement.warehouse_id,
      movementType: updatedMovement.movement_type,
      palletId: updatedMovement.pallet_id,
      productId: updatedMovement.product_id,
      originPositionId: updatedMovement.origin_position_id,
      operatorId: updatedMovement.operator_id,
      forkliftUnitId: updatedMovement.forklift_unit_id,
      quantity: updatedMovement.quantity,
      unit: updatedMovement.unit,
      status: updatedMovement.status,
      inventoryId: reservedInventoryItem.id,
      inventoryStatus: reservedInventoryItem.status,
      requiresPacking,
      operationalState: requiresPacking
        ? 'verification_completed_requires_packing'
        : 'verification_completed_ready_for_shipping',
      logicalLocation: 'Área de Entrega',
      nextProcess: requiresPacking
        ? 'OP-009 Empaque'
        : 'OP-010 Embarque',
    },
  });

  return updatedMovement;
}
