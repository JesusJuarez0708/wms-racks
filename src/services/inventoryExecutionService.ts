import {
  applyPalletOutbound,
  getPallets,
  type Pallet,
} from './palletService';

import {
  changeInventoryStatus,
  deleteInventory,
  getInventory,
  type InventoryItem,
} from './inventoryService';

export type ApplyOutboundInventoryInput = {
  inventoryId: string;
  palletId: string;
  requestedQuantity: number;
  requestedUnit: string;
};

export type ApplyOutboundInventoryResult = {
  pallet: Pallet;
  inventoryItem: InventoryItem;
  previousQuantity: number;
  requestedQuantity: number;
  remainingQuantity: number;
  isTotalOutbound: boolean;
  inventoryAction: 'reserved';
};

export type FinalizeOutboundInventoryInput = {
  inventoryId: string;
  palletId: string;
};

export type FinalizeOutboundInventoryResult = {
  pallet: Pallet;
  inventoryItem: InventoryItem;
  remainingQuantity: number;
  isTotalOutbound: boolean;
  inventoryAction: 'released' | 'deleted';
};

export type ExecuteOutboundInventoryInput =
  ApplyOutboundInventoryInput;

export type ExecuteOutboundInventoryResult = {
  pallet: Pallet;
  inventoryItem: InventoryItem;
  previousQuantity: number;
  requestedQuantity: number;
  remainingQuantity: number;
  isTotalOutbound: boolean;
  inventoryAction: 'released' | 'deleted';
};

async function getReservedInventoryItem(
  inventoryId: string,
  palletId: string
): Promise<InventoryItem> {
  const normalizedInventoryId = inventoryId.trim();
  const normalizedPalletId = palletId.trim();

  if (!normalizedInventoryId) {
    throw new Error(
      'Debe indicarse el inventario que será ejecutado.'
    );
  }

  if (!normalizedPalletId) {
    throw new Error(
      'Debe indicarse el pallet para ejecutar la salida de inventario.'
    );
  }

  const inventory = await getInventory();

  const reservedInventoryItem = inventory.find(
    (item) => item.id === normalizedInventoryId
  );

  if (!reservedInventoryItem) {
    throw new Error(
      'No se encontró el inventario asociado a la asignación.'
    );
  }

  if (reservedInventoryItem.pallet_id !== normalizedPalletId) {
    throw new Error(
      'El inventario asociado no corresponde al pallet asignado.'
    );
  }

  if (reservedInventoryItem.status !== 'reserved') {
    throw new Error(
      `El inventario asignado no está reservado. Estado actual: ${reservedInventoryItem.status}.`
    );
  }

  return reservedInventoryItem;
}

export async function applyOutboundInventory(
  input: ApplyOutboundInventoryInput
): Promise<ApplyOutboundInventoryResult> {
  const normalizedPalletId = input.palletId.trim();

  const reservedInventoryItem =
    await getReservedInventoryItem(
      input.inventoryId,
      normalizedPalletId
    );

  const outboundResult = await applyPalletOutbound({
    palletId: normalizedPalletId,
    requestedQuantity: input.requestedQuantity,
    requestedUnit: input.requestedUnit,
  });

  return {
    pallet: outboundResult.pallet,
    inventoryItem: reservedInventoryItem,
    previousQuantity: outboundResult.previousQuantity,
    requestedQuantity: outboundResult.requestedQuantity,
    remainingQuantity: outboundResult.remainingQuantity,
    isTotalOutbound: outboundResult.isTotalOutbound,
    inventoryAction: 'reserved',
  };
}

export async function finalizeOutboundInventory(
  input: FinalizeOutboundInventoryInput
): Promise<FinalizeOutboundInventoryResult> {
  const normalizedPalletId = input.palletId.trim();

  const reservedInventoryItem =
    await getReservedInventoryItem(
      input.inventoryId,
      normalizedPalletId
    );

  const pallets = await getPallets();

  const pallet = pallets.find(
    (item) => item.id === normalizedPalletId
  );

  if (!pallet) {
    throw new Error(
      'No se encontró el pallet asociado a la salida.'
    );
  }

  if (pallet.quantity === null) {
    throw new Error(
      'El pallet no tiene una cantidad registrada para finalizar la salida.'
    );
  }

  const isTotalOutbound =
    pallet.quantity === 0 || pallet.status === 'out';

  if (isTotalOutbound) {
    await deleteInventory(reservedInventoryItem.id);

    return {
      pallet,
      inventoryItem: reservedInventoryItem,
      remainingQuantity: pallet.quantity,
      isTotalOutbound: true,
      inventoryAction: 'deleted',
    };
  }

  await changeInventoryStatus(
    reservedInventoryItem.id,
    'available'
  );

  return {
    pallet,
    inventoryItem: reservedInventoryItem,
    remainingQuantity: pallet.quantity,
    isTotalOutbound: false,
    inventoryAction: 'released',
  };
}

/**
 * Operación compuesta conservada por compatibilidad.
 *
 * Aplica el descuento cuantitativo del pallet y finaliza
 * inmediatamente el inventario reservado.
 *
 * Los workflows del CJWMS deberán utilizar por separado:
 *
 * - applyOutboundInventory al quedar Liberado para Embarque.
 * - finalizeOutboundInventory en OP-011 Confirmación de Salida.
 */
export async function executeOutboundInventory(
  input: ExecuteOutboundInventoryInput
): Promise<ExecuteOutboundInventoryResult> {
  const applicationResult = await applyOutboundInventory(input);

  const finalizationResult = await finalizeOutboundInventory({
    inventoryId: input.inventoryId,
    palletId: input.palletId,
  });

  return {
    pallet: finalizationResult.pallet,
    inventoryItem: finalizationResult.inventoryItem,
    previousQuantity: applicationResult.previousQuantity,
    requestedQuantity: applicationResult.requestedQuantity,
    remainingQuantity: finalizationResult.remainingQuantity,
    isTotalOutbound: finalizationResult.isTotalOutbound,
    inventoryAction: finalizationResult.inventoryAction,
  };
}