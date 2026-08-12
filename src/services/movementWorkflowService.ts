import {
  assignMovementPicking,
  confirmDeliveryAreaArrival,
  confirmOperationalVerification,
  confirmExitMovement,
  createMovement,
  finishPackingMovement,
  finishPickingMovement,
  finishShippingMovement,
  getMovements,
  registerPackingProgress,
  registerPickingProgress,
  registerShippingProgress,
  startPackingMovement,
  startPickingMovement,
  startShippingMovement,
  type CompleteMovementPackingInput,
  type CompleteMovementPickingInput,
  type CompleteMovementShippingInput,
  type ConfirmMovementDeliveryArrivalInput,
  type ConfirmMovementOperationalVerificationInput,
  type ConfirmMovementExitInput,
  type CreateMovementInput,
  type MovementItem,
  type StartMovementPackingInput,
  type StartMovementPickingInput,
  type StartMovementShippingInput,
  type UpdateMovementAssignmentInput,
  type UpdateMovementPackingProgressInput,
  type UpdateMovementPickingProgressInput,
  type UpdateMovementShippingProgressInput,
} from './movementService';

import {
  changeInventoryPosition,
  changeInventoryStatus,
  createInventoryItem,
  getInventory,
} from './inventoryService';

import { getPallets } from './palletService';

import {
  assertPalletPositionPhysicalCompatibility,
  getRackPositions,
} from './rackPositionService';

import {
  createOutboundExecutionPlan,
  persistOutboundExecutionPlan,
} from './outboundPlanningService';

import {
  executePickingAllocationsByMovementId,
  getMovementAllocationsByMovementId,
  registerPickingProgressByMovementId,
  reserveMovementAllocationsByMovementId,
} from './movementAllocationService';

import {
  applyOutboundInventory,
  finalizeOutboundInventory,
} from './inventoryExecutionService';

import { registerOperationalMemory } from './operationalMemoryService';

import {
  canCompletePacking,
  canCompleteShipping,
  canRegisterPackingProgress,
  canRegisterShippingProgress,
  canStartOperationalVerification,
  canStartPacking,
  canStartShipping,
  canConfirmExit,
  isPickingCompleted,
} from '../utils/movementOperationalState';

type ExecuteMovementInput = CreateMovementInput;

export type MovementRecommendationContext = {
  recommendedDestinationPositionId: string;
  recommendedDestinationPositionCode: string;
  recommendationDeviationReason?: string | null;
};

type AssignPickingInput = UpdateMovementAssignmentInput;
type StartPickingInput = StartMovementPickingInput;
type PickingProgressInput = UpdateMovementPickingProgressInput;
type CompletePickingInput = CompleteMovementPickingInput;
type ConfirmDeliveryArrivalInput = ConfirmMovementDeliveryArrivalInput;
type OperationalVerificationInput =
  ConfirmMovementOperationalVerificationInput;
type StartPackingInput = StartMovementPackingInput;
type PackingProgressInput = UpdateMovementPackingProgressInput;
type CompletePackingInput = CompleteMovementPackingInput;
type StartShippingInput = StartMovementShippingInput;
type ShippingProgressInput =
  UpdateMovementShippingProgressInput;
type CompleteShippingInput =
  CompleteMovementShippingInput;
type ConfirmExitInput =
  ConfirmMovementExitInput;

async function getExecutedOutboundAllocations(
  movementId: string
) {
  const allocations =
    await getMovementAllocationsByMovementId(movementId);

  if (allocations.length === 0) {
    throw new Error(
      'El movimiento no tiene asignaciones de surtido registradas.'
    );
  }

  const nonExecutedAllocation = allocations.find(
    (allocation) => allocation.status !== 'executed'
  );

  if (nonExecutedAllocation) {
    throw new Error(
      `La asignación ${nonExecutedAllocation.id} no está ejecutada. Estado actual: ${nonExecutedAllocation.status}.`
    );
  }

  const allocationWithoutInventory = allocations.find(
    (allocation) => !allocation.inventory_id
  );

  if (allocationWithoutInventory) {
    throw new Error(
      `La asignación ${allocationWithoutInventory.id} no tiene inventario asociado.`
    );
  }

  const allocationWithoutExecutedQuantity = allocations.find(
    (allocation) =>
      !Number.isFinite(allocation.executed_quantity) ||
      allocation.executed_quantity <= 0
  );

  if (allocationWithoutExecutedQuantity) {
    throw new Error(
      `La asignación ${allocationWithoutExecutedQuantity.id} no tiene una cantidad ejecutada válida.`
    );
  }

  return allocations;
}

async function applyOutboundExecutionByMovement(
  movementId: string
) {
  const allocations =
    await getExecutedOutboundAllocations(movementId);

  const results = [];

  for (const allocation of allocations) {
    const inventoryId = allocation.inventory_id;

    if (!inventoryId) {
      throw new Error(
        `La asignación ${allocation.id} no tiene inventario asociado.`
      );
    }

    const result = await applyOutboundInventory({
      inventoryId,
      palletId: allocation.pallet_id,
      requestedQuantity: allocation.executed_quantity,
      requestedUnit: allocation.unit,
    });

    results.push(result);
  }

  return results;
}

async function finalizeOutboundExecutionByMovement(
  movementId: string
) {
  const allocations =
    await getExecutedOutboundAllocations(movementId);

  const results = [];

  for (const allocation of allocations) {
    const inventoryId = allocation.inventory_id;

    if (!inventoryId) {
      throw new Error(
        `La asignación ${allocation.id} no tiene inventario asociado.`
      );
    }

    const result = await finalizeOutboundInventory({
      inventoryId,
      palletId: allocation.pallet_id,
    });

    results.push(result);
  }

  return results;
}

export async function executeMovementWorkflow(
  movement: ExecuteMovementInput,
  recommendationContext?: MovementRecommendationContext
): Promise<MovementItem> {
  const inventory = await getInventory();

  let movementToCreate: ExecuteMovementInput = {
    ...movement,
  };

  const existingInventoryItem = movement.pallet_id
    ? inventory.find((item) => item.pallet_id === movement.pallet_id)
    : null;


  async function assertPhysicalDestination(
    palletId: string,
    destinationPositionId: string
  ) {
    const [pallets, rackPositions] = await Promise.all([
      getPallets(),
      getRackPositions(),
    ]);

    const pallet = pallets.find(
      (item) => item.id === palletId
    );

    if (!pallet) {
      throw new Error(
        `No fue posible validar físicamente la ubicación porque no se encontró el pallet ${palletId}.`
      );
    }

    const destinationPosition = rackPositions.find(
      (position) => position.id === destinationPositionId
    );

    if (!destinationPosition) {
      throw new Error(
        `No fue posible validar físicamente la ubicación porque no se encontró la posición destino ${destinationPositionId}.`
      );
    }

    return assertPalletPositionPhysicalCompatibility(
      pallet,
      destinationPosition
    );
  }

  if (movement.movement_type === 'entrada') {
    if (
      movement.destination_position_id &&
      movement.pallet_id &&
      !existingInventoryItem
    ) {
      await assertPhysicalDestination(
        movement.pallet_id,
        movement.destination_position_id
      );

      await createInventoryItem({
        warehouse_id: movement.warehouse_id,
        rack_position_id: movement.destination_position_id,
        pallet_id: movement.pallet_id,
        status: 'available',
      });
    }

    if (movement.destination_position_id && existingInventoryItem) {
      await assertPhysicalDestination(
        existingInventoryItem.pallet_id,
        movement.destination_position_id
      );

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
      await assertPhysicalDestination(
        inventoryItemToMove.pallet_id,
        movement.destination_position_id
      );

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

  let outboundPlan = null;

  if (movement.movement_type === 'salida') {
    if (
      !movement.product_id ||
      movement.quantity === null ||
      movement.quantity === undefined ||
      !movement.unit
    ) {
      throw new Error(
        'La salida requiere producto, cantidad y unidad para generar el plan de surtido.'
      );
    }

    outboundPlan = await createOutboundExecutionPlan({
      productId: movement.product_id,
      requestedQuantity: movement.quantity,
      requestedUnit: movement.unit,
      preferredPalletId: movement.pallet_id,
    });
  }

  const createdMovement = await createMovement(movementToCreate);

  if (outboundPlan) {
    await persistOutboundExecutionPlan({
      movementId: createdMovement.id,
      plan: outboundPlan,
    });
  }

  await registerOperationalMemory({
    memoryType: 'movement',
    entityId: createdMovement.id,
    entityType: 'movement',
    title: `Movimiento ${createdMovement.movement_type} ejecutado`,
    description: `Movimiento ${createdMovement.movement_type} registrado correctamente en CJWMS.`,
    score: createdMovement.decision_score ?? 75,
    metadata: {
      phase: '23.8',
      source: 'movementWorkflowService',
      warehouseId: createdMovement.warehouse_id,
      movementType: createdMovement.movement_type,
      palletId: createdMovement.pallet_id,
      productId: createdMovement.product_id,
      originPositionId: createdMovement.origin_position_id,
      destinationPositionId: createdMovement.destination_position_id,
      status: createdMovement.status,
      reason: createdMovement.reason,
      decisionScore: createdMovement.decision_score,
      decisionExplanation: createdMovement.decision_explanation,
      recommendationId: createdMovement.recommendation_id,
      ...(recommendationContext
        ? {
            recommendedDestinationPositionId:
              recommendationContext.recommendedDestinationPositionId,
            recommendedDestinationPositionCode:
              recommendationContext.recommendedDestinationPositionCode,
            recommendationComplied:
              recommendationContext.recommendedDestinationPositionId ===
              createdMovement.destination_position_id,
            ...(recommendationContext.recommendationDeviationReason
              ? {
                  recommendationDeviationReason:
                    recommendationContext.recommendationDeviationReason,
                }
              : {}),
          }
        : {}),
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
  const allocationReservation =
    await reserveMovementAllocationsByMovementId(
      movementId
    );

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
      allocationCount:
        allocationReservation.allocations.length,
      allocationIds:
        allocationReservation.allocations.map(
          (allocation) => allocation.id
        ),
      totalReservedQuantity:
        allocationReservation.totalReservedQuantity,
      reservedInventoryIds:
        allocationReservation.reservedInventoryItems.map(
          (item) => item.id
        ),
      allocationStatus: 'reserved',
      operationalState: 'picking_in_progress',
    },
  });

  return updatedMovement;
}

export async function registerPickingProgressWorkflow(
  movementId: string,
  progress: PickingProgressInput
): Promise<MovementItem> {
  await registerPickingProgressByMovementId(
    movementId,
    progress.partial_quantity
  );

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

  const allocationExecution =
    await executePickingAllocationsByMovementId(
      movementId
    );

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
      allocationCount:
        allocationExecution.allocations.length,
      allocationIds:
        allocationExecution.allocations.map(
          (allocation) => allocation.id
        ),
      totalExecutedQuantity:
        allocationExecution.totalExecutedQuantity,
      allocationStatus: 'executed',
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

  if (!requiresPacking) {
    await applyOutboundExecutionByMovement(
      updatedMovement.id
    );
  }

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

export async function startPackingWorkflow(
  movementId: string,
  packing: StartPackingInput
): Promise<MovementItem> {
  const [movements, inventory] = await Promise.all([
    getMovements(),
    getInventory(),
  ]);

  const movementToStart = movements.find(
    (movement) =>
      movement.id === movementId &&
      canStartPacking(movement)
  );

  if (!movementToStart) {
    throw new Error(
      'No se encontró mercancía pendiente de iniciar el proceso de empaque.'
    );
  }

  if (!movementToStart.pallet_id) {
    throw new Error(
      'El movimiento no tiene un pallet asociado para iniciar el empaque.'
    );
  }

  const reservedInventoryItem = inventory.find(
    (item) =>
      item.pallet_id === movementToStart.pallet_id &&
      item.status === 'reserved'
  );

  if (!reservedInventoryItem) {
    throw new Error(
      'No se encontró inventario reservado para iniciar el proceso de empaque.'
    );
  }

  const updatedMovement = await startPackingMovement(
    movementId,
    packing
  );

  await registerOperationalMemory({
    memoryType: 'movement',
    entityId: updatedMovement.id,
    entityType: 'movement',
    title: 'Inicio de Empaque confirmado',
    description:
      'La mercancía inició formalmente su preparación física dentro del proceso de Empaque.',
    score: updatedMovement.decision_score ?? 97,
    metadata: {
      phase: '21.25A',
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
      operationalState: 'packing_started',
      logicalLocation: 'Área de Empaque',
      nextAction: 'register_packing_progress',
    },
  });

  return updatedMovement;
}

export async function registerPackingProgressWorkflow(
  movementId: string,
  progress: PackingProgressInput
): Promise<MovementItem> {
  const [movements, inventory] = await Promise.all([
    getMovements(),
    getInventory(),
  ]);

  const movementToUpdate = movements.find(
    (movement) =>
      movement.id === movementId &&
      canRegisterPackingProgress(movement)
  );

  if (!movementToUpdate) {
    throw new Error(
      'No se encontró un proceso de empaque iniciado para registrar su avance.'
    );
  }

  if (!movementToUpdate.pallet_id) {
    throw new Error(
      'El movimiento no tiene un pallet asociado para registrar el avance del empaque.'
    );
  }

  const reservedInventoryItem = inventory.find(
    (item) =>
      item.pallet_id === movementToUpdate.pallet_id &&
      item.status === 'reserved'
  );

  if (!reservedInventoryItem) {
    throw new Error(
      'No se encontró inventario reservado para registrar el avance del empaque.'
    );
  }

  const updatedMovement = await registerPackingProgress(
    movementId,
    progress
  );

  await registerOperationalMemory({
    memoryType: 'movement',
    entityId: updatedMovement.id,
    entityType: 'movement',
    title: 'Avance de Empaque confirmado',
    description:
      'Se registró un avance operativo del acondicionamiento físico de la mercancía.',
    score: updatedMovement.decision_score ?? 98,
    metadata: {
      phase: '21.25B',
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
      operationalState: 'packing_in_progress',
      logicalLocation: 'Área de Empaque',
      nextAction: 'complete_packing',
    },
  });

  return updatedMovement;
}

export async function completePackingWorkflow(
  movementId: string,
  completion: CompletePackingInput
): Promise<MovementItem> {
  const [movements, inventory] = await Promise.all([
    getMovements(),
    getInventory(),
  ]);

  const movementToComplete = movements.find(
    (movement) =>
      movement.id === movementId &&
      canCompletePacking(movement)
  );

  if (!movementToComplete) {
    throw new Error(
      'No se encontró un proceso de empaque activo para finalizar.'
    );
  }

  if (!movementToComplete.pallet_id) {
    throw new Error(
      'El movimiento no tiene un pallet asociado para finalizar el empaque.'
    );
  }

  const reservedInventoryItem = inventory.find(
    (item) =>
      item.pallet_id === movementToComplete.pallet_id &&
      item.status === 'reserved'
  );

  if (!reservedInventoryItem) {
    throw new Error(
      'No se encontró inventario reservado para finalizar el proceso de empaque.'
    );
  }

  const updatedMovement = await finishPackingMovement(
    movementId,
    completion
  );

  await applyOutboundExecutionByMovement(
    updatedMovement.id
  );

  await registerOperationalMemory({
    memoryType: 'movement',
    entityId: updatedMovement.id,
    entityType: 'movement',
    title: 'Empaque Finalizado confirmado',
    description:
      'El acondicionamiento físico de la mercancía fue finalizado y quedó liberada para continuar al proceso de Embarque.',
    score: updatedMovement.decision_score ?? 99,
    metadata: {
      phase: '21.25C',
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
      operationalState: 'packing_completed_ready_for_shipping',
      logicalLocation: 'Área de Empaque',
      nextProcess: 'OP-010 Embarque',
    },
  });

  return updatedMovement;
}

export async function startShippingWorkflow(
  movementId: string,
  shipping: StartShippingInput
): Promise<MovementItem> {
  const [movements, inventory] = await Promise.all([
    getMovements(),
    getInventory(),
  ]);

  const movementToStart = movements.find(
    (movement) =>
      movement.id === movementId &&
      canStartShipping(movement)
  );

  if (!movementToStart) {
    throw new Error(
      'No se encontró mercancía liberada para iniciar el proceso de embarque.'
    );
  }

  if (!movementToStart.pallet_id) {
    throw new Error(
      'El movimiento no tiene un pallet asociado para iniciar el embarque.'
    );
  }

  const reservedInventoryItem = inventory.find(
    (item) =>
      item.pallet_id === movementToStart.pallet_id &&
      item.status === 'reserved'
  );

  if (!reservedInventoryItem) {
    throw new Error(
      'No se encontró inventario reservado para iniciar el proceso de embarque.'
    );
  }

  const updatedMovement = await startShippingMovement(
    movementId,
    shipping
  );

  await registerOperationalMemory({
    memoryType: 'movement',
    entityId: updatedMovement.id,
    entityType: 'movement',
    title: 'Inicio de Embarque confirmado',
    description:
      'La carga física de la mercancía en la unidad de transporte fue iniciada formalmente.',
    score: updatedMovement.decision_score ?? 99,
    metadata: {
      phase: '21.26A',
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
      operationalState: 'shipping_started',
      logicalLocation: 'Área de Embarque',
      nextAction: 'register_shipping_progress',
    },
  });

  return updatedMovement;
}

export async function registerShippingProgressWorkflow(
  movementId: string,
  progress: ShippingProgressInput
): Promise<MovementItem> {
  const [movements, inventory] = await Promise.all([
    getMovements(),
    getInventory(),
  ]);

  const movementToUpdate = movements.find(
    (movement) =>
      movement.id === movementId &&
      canRegisterShippingProgress(movement)
  );

  if (!movementToUpdate) {
    throw new Error(
      'No se encontró un proceso de embarque iniciado para registrar su avance.'
    );
  }

  if (!movementToUpdate.pallet_id) {
    throw new Error(
      'El movimiento no tiene un pallet asociado para registrar el avance del embarque.'
    );
  }

  const reservedInventoryItem = inventory.find(
    (item) =>
      item.pallet_id === movementToUpdate.pallet_id &&
      item.status === 'reserved'
  );

  if (!reservedInventoryItem) {
    throw new Error(
      'No se encontró inventario reservado para registrar el avance del embarque.'
    );
  }

  const updatedMovement = await registerShippingProgress(
    movementId,
    progress
  );

  await registerOperationalMemory({
    memoryType: 'movement',
    entityId: updatedMovement.id,
    entityType: 'movement',
    title: 'Avance de Embarque confirmado',
    description:
      'Se registró un avance operativo de la carga física de la mercancía.',
    score: updatedMovement.decision_score ?? 99,
    metadata: {
      phase: '21.26B',
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
      operationalState: 'shipping_in_progress',
      logicalLocation: 'Área de Embarque',
      nextAction: 'complete_shipping',
    },
  });

  return updatedMovement;
}

export async function completeShippingWorkflow(
  movementId: string,
  completion: CompleteShippingInput
): Promise<MovementItem> {
  const [movements, inventory] = await Promise.all([
    getMovements(),
    getInventory(),
  ]);

  const movementToComplete = movements.find(
    (movement) =>
      movement.id === movementId &&
      canCompleteShipping(movement)
  );

  if (!movementToComplete) {
    throw new Error(
      'No se encontró un proceso de embarque activo para finalizar.'
    );
  }

  if (!movementToComplete.pallet_id) {
    throw new Error(
      'El movimiento no tiene un pallet asociado para finalizar el embarque.'
    );
  }

  const reservedInventoryItem = inventory.find(
    (item) =>
      item.pallet_id === movementToComplete.pallet_id &&
      item.status === 'reserved'
  );

  if (!reservedInventoryItem) {
    throw new Error(
      'No se encontró inventario reservado para finalizar el proceso de embarque.'
    );
  }

  const updatedMovement = await finishShippingMovement(
    movementId,
    completion
  );

  await registerOperationalMemory({
    memoryType: 'movement',
    entityId: updatedMovement.id,
    entityType: 'movement',
    title: 'Embarque Finalizado confirmado',
    description:
      'La carga física fue completada y la mercancía quedó pendiente de la Confirmación de Salida.',
    score: updatedMovement.decision_score ?? 100,
    metadata: {
      phase: '21.26C',
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
      operationalState:
        'shipping_completed_pending_exit_confirmation',
      logicalLocation: 'Unidad de Transporte',
      nextProcess: 'OP-011 Confirmación de Salida',
    },
  });

  return updatedMovement;
}

export async function confirmExitWorkflow(
  movementId: string,
  confirmation: ConfirmExitInput
): Promise<MovementItem> {
  const movements = await getMovements();

  const movementToConfirm = movements.find(
    (movement) =>
      movement.id === movementId &&
      canConfirmExit(movement)
  );

  if (!movementToConfirm) {
    throw new Error(
      'No se encontró un embarque finalizado pendiente de confirmación de salida.'
    );
  }

  const updatedMovement = await confirmExitMovement(
    movementId,
    confirmation
  );

  const inventoryFinalizationResults =
    await finalizeOutboundExecutionByMovement(
      updatedMovement.id
    );

  const deletedInventoryIds =
    inventoryFinalizationResults
      .filter(
        (result) =>
          result.inventoryAction === 'deleted'
      )
      .map((result) => result.inventoryItem.id);

  const releasedInventoryIds =
    inventoryFinalizationResults
      .filter(
        (result) =>
          result.inventoryAction === 'released'
      )
      .map((result) => result.inventoryItem.id);

  const palletResults =
    inventoryFinalizationResults.map((result) => ({
      palletId: result.pallet.id,
      remainingQuantity: result.remainingQuantity,
      unit: result.pallet.unit,
      palletStatus: result.pallet.status,
      inventoryAction: result.inventoryAction,
    }));

  await registerOperationalMemory({
    memoryType: 'movement',
    entityId: updatedMovement.id,
    entityType: 'movement',
    title: 'Confirmación de Salida completada',
    description:
      'La salida física fue confirmada. Los inventarios de pallets vacíos fueron dados de baja y los pallets con remanente quedaron nuevamente disponibles.',
    score: updatedMovement.decision_score ?? 100,
    metadata: {
      phase: '22.2',
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
      deletedInventoryIds,
      releasedInventoryIds,
      palletResults,
      operationalState: 'exit_confirmed',
      logicalLocation: 'Fuera del Almacén',
      processCompleted:
        'OP-011 Confirmación de Salida',
    },
  });

  return updatedMovement;
}
