import {
  getInventory,
  type InventoryItem,
} from './inventoryService';

import {
  createMovementAllocations,
  type MovementAllocation,
} from './movementAllocationService';

import {
  getPallets,
  type Pallet,
} from './palletService';

export type OutboundExecutionAllocation = {
  palletId: string;
  palletCode: string;
  inventoryId: string;
  quantity: number;
  availableQuantityBeforeExecution: number;
};

export type OutboundExecutionPlan = {
  productId: string;
  requestedQuantity: number;
  availableQuantity: number;
  unit: string;
  allocations: OutboundExecutionAllocation[];
  requiresMultiplePallets: boolean;
  strategy:
    | 'preferred_pallet_first'
    | 'smallest_available_quantity_first';
};

export type CreateOutboundExecutionPlanInput = {
  productId: string;
  requestedQuantity: number;
  requestedUnit: string;
  preferredPalletId?: string | null;
};

export type PersistOutboundExecutionPlanInput = {
  movementId: string;
  plan: OutboundExecutionPlan;
};

export type PersistedOutboundExecutionPlan = {
  plan: OutboundExecutionPlan;
  allocations: MovementAllocation[];
};

type EligibleOutboundPallet = {
  pallet: Pallet;
  inventoryItem: InventoryItem;
  availableQuantity: number;
};

function normalizeUnit(unit: string): string {
  return unit.trim().toUpperCase();
}

function compareEligiblePallets(
  first: EligibleOutboundPallet,
  second: EligibleOutboundPallet
): number {
  const quantityDifference =
    first.availableQuantity - second.availableQuantity;

  if (quantityDifference !== 0) {
    return quantityDifference;
  }

  return first.pallet.pallet_code.localeCompare(
    second.pallet.pallet_code
  );
}

export async function createOutboundExecutionPlan(
  input: CreateOutboundExecutionPlanInput
): Promise<OutboundExecutionPlan> {
  const productId = input.productId.trim();
  const requestedQuantity = Number(input.requestedQuantity);
  const requestedUnit = normalizeUnit(input.requestedUnit);

  const preferredPalletId = input.preferredPalletId?.trim() || null;

  if (!productId) {
    throw new Error(
      'Debe indicarse el producto para generar el plan de surtido.'
    );
  }

  if (
    !Number.isFinite(requestedQuantity) ||
    requestedQuantity <= 0
  ) {
    throw new Error(
      'La cantidad solicitada debe ser un número mayor que cero.'
    );
  }

  if (!requestedUnit) {
    throw new Error(
      'Debe indicarse la unidad de medida para generar el plan de surtido.'
    );
  }

  const [pallets, inventory] = await Promise.all([
    getPallets(),
    getInventory(),
  ]);

  const availableInventoryByPalletId = new Map<
    string,
    InventoryItem
  >();

  inventory
    .filter((item) => item.status === 'available')
    .forEach((item) => {
      availableInventoryByPalletId.set(
        item.pallet_id,
        item
      );
    });

  const eligiblePallets: EligibleOutboundPallet[] = pallets
    .filter((pallet) => {
      if (pallet.product_id !== productId) {
        return false;
      }

      if (pallet.status !== 'active') {
        return false;
      }

      if (
        pallet.quantity === null ||
        pallet.quantity <= 0
      ) {
        return false;
      }

      if (
        pallet.unit === null ||
        normalizeUnit(pallet.unit) !== requestedUnit
      ) {
        return false;
      }

      return availableInventoryByPalletId.has(pallet.id);
    })
    .map((pallet) => ({
      pallet,
      inventoryItem:
        availableInventoryByPalletId.get(pallet.id)!,
      availableQuantity: pallet.quantity!,
    }));

    eligiblePallets.sort((first, second) => {
      if (preferredPalletId) {
        const firstIsPreferred =
          first.pallet.id === preferredPalletId;
        const secondIsPreferred =
          second.pallet.id === preferredPalletId;

        if (firstIsPreferred && !secondIsPreferred) {
          return -1;
        }

        if (!firstIsPreferred && secondIsPreferred) {
          return 1;
        }
      }

      return compareEligiblePallets(first, second);
    });

  const availableQuantity = eligiblePallets.reduce(
    (total, item) => total + item.availableQuantity,
    0
  );

  if (eligiblePallets.length === 0) {
    throw new Error(
      `No existen pallets disponibles para el producto y la unidad solicitados (${requestedUnit}).`
    );
  }

  if (availableQuantity < requestedQuantity) {
    throw new Error(
      `La existencia disponible (${availableQuantity} ${requestedUnit}) no cubre la cantidad solicitada (${requestedQuantity} ${requestedUnit}).`
    );
  }

  let quantityPending = requestedQuantity;

  const allocations: OutboundExecutionAllocation[] = [];

  for (const eligiblePallet of eligiblePallets) {
    if (quantityPending <= 0) {
      break;
    }

    const allocatedQuantity = Math.min(
      eligiblePallet.availableQuantity,
      quantityPending
    );

    allocations.push({
      palletId: eligiblePallet.pallet.id,
      palletCode: eligiblePallet.pallet.pallet_code,
      inventoryId: eligiblePallet.inventoryItem.id,
      quantity: allocatedQuantity,
      availableQuantityBeforeExecution:
        eligiblePallet.availableQuantity,
    });

    quantityPending -= allocatedQuantity;
  }

  if (quantityPending > 0) {
    throw new Error(
      'No fue posible completar el plan de surtido con el inventario disponible.'
    );
  }

  return {
    productId,
    requestedQuantity,
    availableQuantity,
    unit: requestedUnit,
    allocations,
    requiresMultiplePallets: allocations.length > 1,
    strategy: preferredPalletId
      ? 'preferred_pallet_first'
      : 'smallest_available_quantity_first',
  };
}

export async function persistOutboundExecutionPlan(
  input: PersistOutboundExecutionPlanInput
): Promise<PersistedOutboundExecutionPlan> {
  const movementId = input.movementId.trim();

  if (!movementId) {
    throw new Error(
      'Debe indicarse el movimiento para persistir el plan de surtido.'
    );
  }

  if (input.plan.allocations.length === 0) {
    throw new Error(
      'El plan de surtido no contiene asignaciones para persistir.'
    );
  }

  const totalAllocatedQuantity =
    input.plan.allocations.reduce(
      (total, allocation) =>
        total + allocation.quantity,
      0
    );

  if (
    totalAllocatedQuantity !==
    input.plan.requestedQuantity
  ) {
    throw new Error(
      'La suma de las asignaciones no coincide con la cantidad solicitada.'
    );
  }

  const allocations = await createMovementAllocations({
    movementId,
    status: 'planned',
    allocations: input.plan.allocations.map(
      (allocation) => ({
        palletId: allocation.palletId,
        inventoryId: allocation.inventoryId,
        allocatedQuantity: allocation.quantity,
        unit: input.plan.unit,
      })
    ),
  });

  return {
    plan: input.plan,
    allocations,
  };
}