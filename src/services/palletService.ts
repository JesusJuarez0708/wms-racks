import {
  fetchPallets,
  insertPallet,
  updatePalletQuantity,
} from '../repositories/palletRepository';

import type {
  CreatePalletRecord,
  PalletRecord,
} from '../repositories/palletRepository';

export type Pallet = PalletRecord;
export type CreatePalletInput = CreatePalletRecord;

export type ApplyPalletOutboundInput = {
  palletId: string;
  requestedQuantity: number;
  requestedUnit: string;
};

export type ApplyPalletOutboundResult = {
  pallet: Pallet;
  previousQuantity: number;
  requestedQuantity: number;
  remainingQuantity: number;
  isTotalOutbound: boolean;
};

export async function getPallets(): Promise<Pallet[]> {
  return fetchPallets();
}

export async function createPallet(
  pallet: CreatePalletInput
): Promise<Pallet> {
  return insertPallet(pallet);
}

export async function applyPalletOutbound(
  input: ApplyPalletOutboundInput
): Promise<ApplyPalletOutboundResult> {
  const requestedQuantity = Number(input.requestedQuantity);
  const requestedUnit = input.requestedUnit.trim();

  if (!input.palletId) {
    throw new Error('Debe indicarse el pallet que será surtido.');
  }

  if (!Number.isFinite(requestedQuantity) || requestedQuantity <= 0) {
    throw new Error(
      'La cantidad solicitada debe ser un número mayor que cero.'
    );
  }

  if (!requestedUnit) {
    throw new Error('Debe indicarse la unidad de la cantidad solicitada.');
  }

  const pallets = await fetchPallets();

  const pallet = pallets.find(
    (item) => item.id === input.palletId
  );

  if (!pallet) {
    throw new Error('No se encontró el pallet solicitado.');
  }

  if (pallet.status !== 'active') {
    throw new Error(
      `El pallet no está disponible para surtido. Estado actual: ${pallet.status}.`
    );
  }

  if (pallet.quantity === null) {
    throw new Error(
      'El pallet no tiene una cantidad disponible registrada.'
    );
  }

  if (pallet.unit === null || !pallet.unit.trim()) {
    throw new Error(
      'El pallet no tiene una unidad de medida registrada.'
    );
  }

  const palletUnit = pallet.unit.trim();

  if (palletUnit.toUpperCase() !== requestedUnit.toUpperCase()) {
    throw new Error(
      `La unidad solicitada (${requestedUnit}) no coincide con la unidad del pallet (${palletUnit}).`
    );
  }

  if (requestedQuantity > pallet.quantity) {
    throw new Error(
      `La cantidad solicitada (${requestedQuantity} ${palletUnit}) supera la cantidad disponible del pallet (${pallet.quantity} ${palletUnit}).`
    );
  }

  const remainingQuantity = pallet.quantity - requestedQuantity;
  const isTotalOutbound = remainingQuantity === 0;

  const updatedPallet = await updatePalletQuantity(
    pallet.id,
    {
      quantity: remainingQuantity,
      unit: palletUnit,
      status: isTotalOutbound ? 'out' : 'active',
    }
  );

  return {
    pallet: updatedPallet,
    previousQuantity: pallet.quantity,
    requestedQuantity,
    remainingQuantity,
    isTotalOutbound,
  };
}