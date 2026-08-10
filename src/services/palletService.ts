import {
  deletePalletRecord,
  fetchPallets,
  insertPallet,
  updatePalletPhysicalData,
  updatePalletQuantity,
} from '../repositories/palletRepository';

import type {
  CreatePalletRecord,
  PalletRecord,
  UpdatePalletPhysicalRecord,
} from '../repositories/palletRepository';

export type Pallet = PalletRecord;
export type CreatePalletInput = CreatePalletRecord;

export type UpdatePalletPhysicalInput = {
  palletId: string;
  currentWeightKg: number;
  tareWeightKg: number;
  maxWeightKg: number;
  widthM: number;
  lengthM: number;
  heightM: number;
};

export type UpdatePalletPhysicalResult = {
  pallet: Pallet;
};

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

export async function updatePalletPhysical(
  input: UpdatePalletPhysicalInput
): Promise<UpdatePalletPhysicalResult> {
  const palletId = input.palletId.trim();

  const currentWeightKg = Number(input.currentWeightKg);
  const tareWeightKg = Number(input.tareWeightKg);
  const maxWeightKg = Number(input.maxWeightKg);
  const widthM = Number(input.widthM);
  const lengthM = Number(input.lengthM);
  const heightM = Number(input.heightM);

  if (!palletId) {
    throw new Error(
      'Debe indicarse el pallet que será actualizado.'
    );
  }

  if (
    !Number.isFinite(currentWeightKg) ||
    currentWeightKg < 0
  ) {
    throw new Error(
      'El peso actual del pallet debe ser un número mayor o igual que cero.'
    );
  }

  if (
    !Number.isFinite(tareWeightKg) ||
    tareWeightKg < 0
  ) {
    throw new Error(
      'La tara del pallet debe ser un número mayor o igual que cero.'
    );
  }

  if (tareWeightKg > currentWeightKg) {
    throw new Error(
      `La tara del pallet (${tareWeightKg} kg) no puede superar su peso actual (${currentWeightKg} kg).`
    );
  }

  if (
    !Number.isFinite(maxWeightKg) ||
    maxWeightKg <= 0
  ) {
    throw new Error(
      'El peso máximo soportado por el pallet debe ser mayor que cero.'
    );
  }

  if (currentWeightKg > maxWeightKg) {
    throw new Error(
      `El peso actual del pallet (${currentWeightKg} kg) supera su peso máximo permitido (${maxWeightKg} kg).`
    );
  }

  if (!Number.isFinite(widthM) || widthM <= 0) {
    throw new Error(
      'El ancho del pallet debe ser mayor que cero.'
    );
  }

  if (!Number.isFinite(lengthM) || lengthM <= 0) {
    throw new Error(
      'El largo del pallet debe ser mayor que cero.'
    );
  }

  if (!Number.isFinite(heightM) || heightM <= 0) {
    throw new Error(
      'La altura del pallet debe ser mayor que cero.'
    );
  }

  const update: UpdatePalletPhysicalRecord = {
    current_weight_kg: currentWeightKg,
    tare_weight_kg: tareWeightKg,
    max_weight_kg: maxWeightKg,
    width_m: widthM,
    length_m: lengthM,
    height_m: heightM,
  };

  const pallet = await updatePalletPhysicalData(
    palletId,
    update
  );

  return {
    pallet,
  };
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

  const previousQuantity = pallet.quantity;
  const remainingQuantity =
    previousQuantity - requestedQuantity;
  const isTotalOutbound = remainingQuantity === 0;

  let updatedPallet = await updatePalletQuantity(
    pallet.id,
    {
      quantity: remainingQuantity,
      unit: palletUnit,
      status: isTotalOutbound ? 'out' : 'active',
    }
  );

  if (
    pallet.current_weight_kg !== null &&
    pallet.tare_weight_kg !== null
  ) {
    if (pallet.current_weight_kg < pallet.tare_weight_kg) {
      throw new Error(
        `El pallet ${pallet.pallet_code} presenta un peso actual inferior a su tara.`
      );
    }

    const productWeightKg =
      pallet.current_weight_kg - pallet.tare_weight_kg;

    const unitWeightKg =
      productWeightKg / previousQuantity;

    const nextCurrentWeightKg = Number(
      (
        pallet.tare_weight_kg +
        remainingQuantity * unitWeightKg
      ).toFixed(4)
    );

    updatedPallet = await updatePalletPhysicalData(
      pallet.id,
      {
        current_weight_kg: nextCurrentWeightKg,
        tare_weight_kg: pallet.tare_weight_kg,
        max_weight_kg: pallet.max_weight_kg,
        width_m: pallet.width_m,
        length_m: pallet.length_m,
        height_m: pallet.height_m,
      }
    );
  }

  return {
    pallet: updatedPallet,
    previousQuantity,
    requestedQuantity,
    remainingQuantity,
    isTotalOutbound,
  };
}

export async function deletePallet(
  palletId: string
): Promise<void> {
  const normalizedPalletId = palletId.trim();

  if (!normalizedPalletId) {
    throw new Error(
      'Debe indicarse el pallet que será eliminado.'
    );
  }

  return deletePalletRecord(normalizedPalletId);
}
