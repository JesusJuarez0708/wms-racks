import {
  deleteMovementAllocationRecord,
  fetchMovementAllocations,
  fetchMovementAllocationsByMovementId,
  insertMovementAllocation,
  updateMovementAllocationExecution,
  updateMovementAllocationStatus,
} from '../repositories/movementAllocationRepository';

import type {
  CreateMovementAllocationRecord,
  MovementAllocationRecord,
  MovementAllocationStatus,
} from '../repositories/movementAllocationRepository';

import {
  changeInventoryStatus,
  getInventory,
  type InventoryItem,
} from './inventoryService';

export type MovementAllocation = MovementAllocationRecord;

export type CreateMovementAllocationInput = {
  movementId: string;
  palletId: string;
  inventoryId?: string | null;
  allocatedQuantity: number;
  unit: string;
  status?: MovementAllocationStatus;
};

export type CreateMovementAllocationsInput = {
  movementId: string;
  allocations: Array<{
    palletId: string;
    inventoryId?: string | null;
    allocatedQuantity: number;
    unit: string;
  }>;
  status?: MovementAllocationStatus;
};

export type ReserveMovementAllocationsResult = {
  movementId: string;
  allocations: MovementAllocation[];
  reservedInventoryItems: InventoryItem[];
  totalReservedQuantity: number;
};

export type ExecutePickingAllocationResult = {
  allocation: MovementAllocation;
};

export type ExecutePickingAllocationsResult = {
  movementId: string;
  allocations: MovementAllocation[];
  totalExecutedQuantity: number;
};

function normalizeUnit(unit: string): string {
  return unit.trim().toUpperCase();
}

function validatePositiveQuantity(
  quantity: number,
  fieldName: string
): number {
  const normalizedQuantity = Number(quantity);

  if (
    !Number.isFinite(normalizedQuantity) ||
    normalizedQuantity <= 0
  ) {
    throw new Error(
      `${fieldName} debe ser un número mayor que cero.`
    );
  }

  return normalizedQuantity;
}

export async function getMovementAllocations(): Promise<
  MovementAllocation[]
> {
  return fetchMovementAllocations();
}

export async function getMovementAllocationsByMovementId(
  movementId: string
): Promise<MovementAllocation[]> {
  const normalizedMovementId = movementId.trim();

  if (!normalizedMovementId) {
    throw new Error(
      'Debe indicarse el movimiento para consultar sus asignaciones.'
    );
  }

  return fetchMovementAllocationsByMovementId(
    normalizedMovementId
  );
}

export async function createMovementAllocation(
  input: CreateMovementAllocationInput
): Promise<MovementAllocation> {
  const movementId = input.movementId.trim();
  const palletId = input.palletId.trim();
  const unit = normalizeUnit(input.unit);
  const allocatedQuantity = validatePositiveQuantity(
    input.allocatedQuantity,
    'La cantidad asignada'
  );

  if (!movementId) {
    throw new Error(
      'Debe indicarse el movimiento de la asignación.'
    );
  }

  if (!palletId) {
    throw new Error(
      'Debe indicarse el pallet de la asignación.'
    );
  }

  if (!unit) {
    throw new Error(
      'Debe indicarse la unidad de medida de la asignación.'
    );
  }

  const allocation: CreateMovementAllocationRecord = {
    movement_id: movementId,
    pallet_id: palletId,
    inventory_id: input.inventoryId ?? null,
    allocated_quantity: allocatedQuantity,
    executed_quantity: 0,
    unit,
    status: input.status ?? 'planned',
  };

  return insertMovementAllocation(allocation);
}

export async function createMovementAllocations(
  input: CreateMovementAllocationsInput
): Promise<MovementAllocation[]> {
  const movementId = input.movementId.trim();

  if (!movementId) {
    throw new Error(
      'Debe indicarse el movimiento para crear sus asignaciones.'
    );
  }

  if (input.allocations.length === 0) {
    throw new Error(
      'El plan de surtido no contiene asignaciones.'
    );
  }

  const normalizedPalletIds = input.allocations.map(
    (allocation) => allocation.palletId.trim()
  );

  const duplicatedPalletIds = normalizedPalletIds.filter(
    (palletId, index, palletIds) =>
      palletIds.indexOf(palletId) !== index
  );

  if (duplicatedPalletIds.length > 0) {
    throw new Error(
      'El plan de surtido contiene pallets duplicados.'
    );
  }

  const createdAllocations: MovementAllocation[] = [];

  for (const allocation of input.allocations) {
    const createdAllocation = await createMovementAllocation({
      movementId,
      palletId: allocation.palletId,
      inventoryId: allocation.inventoryId ?? null,
      allocatedQuantity: allocation.allocatedQuantity,
      unit: allocation.unit,
      status: input.status ?? 'planned',
    });

    createdAllocations.push(createdAllocation);
  }

  return createdAllocations;
}

export async function reserveMovementAllocation(
  allocationId: string
): Promise<MovementAllocation> {
  const normalizedAllocationId = allocationId.trim();

  if (!normalizedAllocationId) {
    throw new Error(
      'Debe indicarse la asignación que será reservada.'
    );
  }

  return updateMovementAllocationStatus(
    normalizedAllocationId,
    {
      status: 'reserved',
    }
  );
}

export async function reserveMovementAllocationsByMovementId(
  movementId: string
): Promise<ReserveMovementAllocationsResult> {
  const normalizedMovementId = movementId.trim();

  if (!normalizedMovementId) {
    throw new Error(
      'Debe indicarse el movimiento cuyo plan será reservado.'
    );
  }

  const [allocations, inventory] = await Promise.all([
    fetchMovementAllocationsByMovementId(
      normalizedMovementId
    ),
    getInventory(),
  ]);

  if (allocations.length === 0) {
    throw new Error(
      'El movimiento no tiene asignaciones de surtido registradas.'
    );
  }

  const nonPlannedAllocation = allocations.find(
    (allocation) => allocation.status !== 'planned'
  );

  if (nonPlannedAllocation) {
    throw new Error(
      `No es posible reservar el plan porque la asignación ${nonPlannedAllocation.id} tiene estado ${nonPlannedAllocation.status}.`
    );
  }

  const inventoryById = new Map(
    inventory.map((item) => [item.id, item])
  );

  const inventoryItemsToReserve: InventoryItem[] = [];

  for (const allocation of allocations) {
    if (!allocation.inventory_id) {
      throw new Error(
        `La asignación del pallet ${allocation.pallet_id} no tiene inventario asociado.`
      );
    }

    const inventoryItem = inventoryById.get(
      allocation.inventory_id
    );

    if (!inventoryItem) {
      throw new Error(
        `No se encontró el inventario asociado a la asignación del pallet ${allocation.pallet_id}.`
      );
    }

    if (inventoryItem.pallet_id !== allocation.pallet_id) {
      throw new Error(
        `El inventario asociado no corresponde al pallet ${allocation.pallet_id}.`
      );
    }

    if (inventoryItem.status !== 'available') {
      throw new Error(
        `El pallet ${allocation.pallet_id} ya no está disponible. Estado de inventario: ${inventoryItem.status}.`
      );
    }

    inventoryItemsToReserve.push(inventoryItem);
  }

  const reservedInventoryItems: InventoryItem[] = [];
  const reservedAllocations: MovementAllocation[] = [];

  try {
    for (let index = 0; index < allocations.length; index += 1) {
      const allocation = allocations[index];
      const inventoryItem = inventoryItemsToReserve[index];

      const reservedInventoryItem =
        await changeInventoryStatus(
          inventoryItem.id,
          'reserved'
        );

      reservedInventoryItems.push(
        reservedInventoryItem
      );

      const reservedAllocation =
        await updateMovementAllocationStatus(
          allocation.id,
          {
            status: 'reserved',
          }
        );

      reservedAllocations.push(reservedAllocation);
    }
  } catch (error) {
    for (const inventoryItem of reservedInventoryItems) {
      try {
        await changeInventoryStatus(
          inventoryItem.id,
          'available'
        );
      } catch (rollbackError) {
        console.error(
          'No fue posible liberar inventario durante la compensación:',
          rollbackError
        );
      }
    }

    for (const allocation of reservedAllocations) {
      try {
        await updateMovementAllocationStatus(
          allocation.id,
          {
            status: 'planned',
          }
        );
      } catch (rollbackError) {
        console.error(
          'No fue posible restaurar una asignación durante la compensación:',
          rollbackError
        );
      }
    }

    throw error;
  }

  const totalReservedQuantity =
    reservedAllocations.reduce(
      (total, allocation) =>
        total + allocation.allocated_quantity,
      0
    );

  return {
    movementId: normalizedMovementId,
    allocations: reservedAllocations,
    reservedInventoryItems,
    totalReservedQuantity,
  };
}

export async function executeMovementAllocation(
  allocationId: string,
  executedQuantity: number
): Promise<MovementAllocation> {
  const normalizedAllocationId = allocationId.trim();
  const normalizedExecutedQuantity = validatePositiveQuantity(
    executedQuantity,
    'La cantidad ejecutada'
  );

  if (!normalizedAllocationId) {
    throw new Error(
      'Debe indicarse la asignación que será ejecutada.'
    );
  }

  const allocations = await fetchMovementAllocations();

  const allocation = allocations.find(
    (item) => item.id === normalizedAllocationId
  );

  if (!allocation) {
    throw new Error(
      'No se encontró la asignación que será ejecutada.'
    );
  }

  if (allocation.status !== 'reserved') {
    throw new Error(
      `La asignación no está reservada. Estado actual: ${allocation.status}.`
    );
  }

  if (
    normalizedExecutedQuantity >
    allocation.allocated_quantity
  ) {
    throw new Error(
      'La cantidad ejecutada no puede superar la cantidad asignada.'
    );
  }

  const isCompleted =
    normalizedExecutedQuantity ===
    allocation.allocated_quantity;

  return updateMovementAllocationExecution(
    normalizedAllocationId,
    {
      executed_quantity: normalizedExecutedQuantity,
      status: isCompleted ? 'executed' : 'reserved',
    }
  );
}

export async function executePickingAllocation(
  allocationId: string,
  executedQuantity: number
): Promise<ExecutePickingAllocationResult> {
  const normalizedAllocationId = allocationId.trim();
  const normalizedExecutedQuantity = validatePositiveQuantity(
    executedQuantity,
    'La cantidad ejecutada'
  );

  if (!normalizedAllocationId) {
    throw new Error(
      'Debe indicarse la asignación que será ejecutada.'
    );
  }

  const allocations = await fetchMovementAllocations();

  const allocation = allocations.find(
    (item) => item.id === normalizedAllocationId
  );

  if (!allocation) {
    throw new Error(
      'No se encontró la asignación que será ejecutada.'
    );
  }

  if (allocation.status !== 'reserved') {
    throw new Error(
      `La asignación no está reservada. Estado actual: ${allocation.status}.`
    );
  }

  if (!allocation.inventory_id) {
    throw new Error(
      'La asignación no tiene un inventario asociado.'
    );
  }

  if (
    normalizedExecutedQuantity >
    allocation.allocated_quantity
  ) {
    throw new Error(
      'La cantidad ejecutada no puede superar la cantidad asignada.'
    );
  }

  const executedAllocation =
    await executeMovementAllocation(
      normalizedAllocationId,
      normalizedExecutedQuantity
    );

  return {
    allocation: executedAllocation,
  };
}

export async function registerPickingProgressByMovementId(
  movementId: string,
  progressQuantity: number
): Promise<ExecutePickingAllocationsResult> {
  const normalizedMovementId = movementId.trim();
  const normalizedProgressQuantity = validatePositiveQuantity(
    progressQuantity,
    'La cantidad extraída en este avance'
  );

  if (!normalizedMovementId) {
    throw new Error(
      'Debe indicarse el movimiento cuyo avance será registrado.'
    );
  }

  const allocations =
    await fetchMovementAllocationsByMovementId(
      normalizedMovementId
    );

  if (allocations.length === 0) {
    throw new Error(
      'El movimiento no tiene asignaciones registradas.'
    );
  }

  const invalidAllocation = allocations.find(
    (allocation) =>
      allocation.status !== 'reserved' &&
      allocation.status !== 'executed'
  );

  if (invalidAllocation) {
    throw new Error(
      `La asignación ${invalidAllocation.id} no está disponible para registrar avance. Estado actual: ${invalidAllocation.status}.`
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

  const totalAllocatedQuantity = allocations.reduce(
    (total, allocation) =>
      total + allocation.allocated_quantity,
    0
  );

  const currentExecutedQuantity = allocations.reduce(
    (total, allocation) =>
      total + allocation.executed_quantity,
    0
  );

  const pendingQuantity =
    totalAllocatedQuantity - currentExecutedQuantity;

  if (pendingQuantity <= 0) {
    throw new Error(
      'La cantidad solicitada ya fue extraída completamente.'
    );
  }

  if (normalizedProgressQuantity > pendingQuantity) {
    throw new Error(
      `La cantidad extraída en este avance (${normalizedProgressQuantity}) no puede superar la cantidad pendiente (${pendingQuantity}).`
    );
  }

  let quantityToApply = normalizedProgressQuantity;

  const updatedAllocations: MovementAllocation[] = [];
  const previousAllocationStates = new Map<
    string,
    {
      executedQuantity: number;
      status: MovementAllocationStatus;
    }
  >();

  try {
    for (const allocation of allocations) {
      if (quantityToApply <= 0) {
        break;
      }

      if (allocation.status === 'executed') {
        continue;
      }

      const allocationPendingQuantity =
        allocation.allocated_quantity -
        allocation.executed_quantity;

      if (allocationPendingQuantity <= 0) {
        continue;
      }

      const quantityForAllocation = Math.min(
        quantityToApply,
        allocationPendingQuantity
      );

      const newExecutedQuantity =
        allocation.executed_quantity +
        quantityForAllocation;

      previousAllocationStates.set(allocation.id, {
        executedQuantity: allocation.executed_quantity,
        status: allocation.status,
      });

      const updatedAllocation =
        await updateMovementAllocationExecution(
          allocation.id,
          {
            executed_quantity: newExecutedQuantity,
            status:
              newExecutedQuantity ===
              allocation.allocated_quantity
                ? 'executed'
                : 'reserved',
          }
        );

      updatedAllocations.push(updatedAllocation);

      quantityToApply -= quantityForAllocation;
    }
  } catch (error) {
    for (const updatedAllocation of updatedAllocations) {
      const previousState =
        previousAllocationStates.get(
          updatedAllocation.id
        );

      if (!previousState) {
        continue;
      }

      try {
        await updateMovementAllocationExecution(
          updatedAllocation.id,
          {
            executed_quantity:
              previousState.executedQuantity,
            status: previousState.status,
          }
        );
      } catch (rollbackError) {
        console.error(
          'No fue posible restaurar una asignación durante la compensación del avance parcial:',
          rollbackError
        );
      }
    }

    throw error;
  }

  const refreshedAllocations =
    await fetchMovementAllocationsByMovementId(
      normalizedMovementId
    );

  const totalExecutedQuantity =
    refreshedAllocations.reduce(
      (total, allocation) =>
        total + allocation.executed_quantity,
      0
    );

  return {
    movementId: normalizedMovementId,
    allocations: refreshedAllocations,
    totalExecutedQuantity,
  };
}

export async function executePickingAllocationsByMovementId(
  movementId: string
): Promise<ExecutePickingAllocationsResult> {
  const normalizedMovementId = movementId.trim();

  if (!normalizedMovementId) {
    throw new Error(
      'Debe indicarse el movimiento cuyas asignaciones serán verificadas.'
    );
  }

  const allocations =
    await fetchMovementAllocationsByMovementId(
      normalizedMovementId
    );

  if (allocations.length === 0) {
    throw new Error(
      'El movimiento no tiene asignaciones registradas para ejecutar.'
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

  const incompleteAllocation = allocations.find(
    (allocation) =>
      allocation.status !== 'executed' ||
      allocation.executed_quantity !==
        allocation.allocated_quantity
  );

  if (incompleteAllocation) {
    const pendingQuantity =
      incompleteAllocation.allocated_quantity -
      incompleteAllocation.executed_quantity;

    throw new Error(
      `No es posible finalizar el picking. La asignación ${incompleteAllocation.id} todavía tiene ${pendingQuantity} ${incompleteAllocation.unit} pendientes por extraer.`
    );
  }

  const totalExecutedQuantity = allocations.reduce(
    (total, allocation) =>
      total + allocation.executed_quantity,
    0
  );

  return {
    movementId: normalizedMovementId,
    allocations,
    totalExecutedQuantity,
  };
}

export async function cancelMovementAllocation(
  allocationId: string
): Promise<MovementAllocation> {
  const normalizedAllocationId = allocationId.trim();

  if (!normalizedAllocationId) {
    throw new Error(
      'Debe indicarse la asignación que será cancelada.'
    );
  }

  return updateMovementAllocationStatus(
    normalizedAllocationId,
    {
      status: 'cancelled',
    }
  );
}

export async function failMovementAllocation(
  allocationId: string
): Promise<MovementAllocation> {
  const normalizedAllocationId = allocationId.trim();

  if (!normalizedAllocationId) {
    throw new Error(
      'Debe indicarse la asignación que será marcada como fallida.'
    );
  }

  return updateMovementAllocationStatus(
    normalizedAllocationId,
    {
      status: 'failed',
    }
  );
}

export async function deleteMovementAllocation(
  allocationId: string
): Promise<void> {
  const normalizedAllocationId = allocationId.trim();

  if (!normalizedAllocationId) {
    throw new Error(
      'Debe indicarse la asignación que será eliminada.'
    );
  }

  return deleteMovementAllocationRecord(
    normalizedAllocationId
  );
}
