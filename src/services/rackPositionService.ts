import {
  fetchRackPositions,
  insertRackPosition,
  updateRackPositionPhysicalCapacity,
} from '../repositories/rackPositionRepository';

import type {
  CreateRackPositionRecord,
  RackPositionRecord,
} from '../repositories/rackPositionRepository';

import type {
  PalletRecord,
} from '../repositories/palletRepository';

export type RackPosition = RackPositionRecord;
export type CreateRackPositionInput = CreateRackPositionRecord;

export type PhysicalCompatibilityStatus =
  | 'compatible'
  | 'incompatible'
  | 'insufficient_data';

export type PhysicalCompatibilityReason = {
  field: 'height' | 'weight';
  status: PhysicalCompatibilityStatus;
  message: string;
};

export type PalletPositionPhysicalCompatibility = {
  status: PhysicalCompatibilityStatus;
  palletId: string;
  palletCode: string;
  positionId: string;
  positionCode: string;
  reasons: PhysicalCompatibilityReason[];
};

export async function getRackPositions(): Promise<RackPosition[]> {
  return fetchRackPositions();
}

export async function createRackPosition(
  position: CreateRackPositionInput
): Promise<RackPosition> {
  return insertRackPosition(position);
}

export type UpdateRackPositionPhysicalCapacityInput = {
  positionId: string;
  maxHeightM: number | null;
  maxWeightKg: number | null;
};

export async function updateRackPositionPhysical(
  input: UpdateRackPositionPhysicalCapacityInput
): Promise<RackPosition> {
  const positionId = input.positionId.trim();

  if (!positionId) {
    throw new Error(
      'Debe indicarse la posición que será actualizada.'
    );
  }

  if (
    input.maxHeightM !== null &&
    (
      !Number.isFinite(input.maxHeightM) ||
      input.maxHeightM <= 0
    )
  ) {
    throw new Error(
      'La altura máxima de la posición debe ser mayor que cero.'
    );
  }

  if (
    input.maxWeightKg !== null &&
    (
      !Number.isFinite(input.maxWeightKg) ||
      input.maxWeightKg <= 0
    )
  ) {
    throw new Error(
      'El peso máximo de la posición debe ser mayor que cero.'
    );
  }

  return updateRackPositionPhysicalCapacity(
    positionId,
    {
      max_height_m: input.maxHeightM,
      max_weight_kg: input.maxWeightKg,
    }
  );
}

export function validatePalletPositionPhysicalCompatibility(
  pallet: PalletRecord,
  position: RackPositionRecord
): PalletPositionPhysicalCompatibility {
  const reasons: PhysicalCompatibilityReason[] = [];

  if (
    pallet.height_m === null ||
    position.max_height_m === null
  ) {
    reasons.push({
      field: 'height',
      status: 'insufficient_data',
      message:
        'No existen datos suficientes para validar la altura física del pallet contra la posición.',
    });
  } else if (pallet.height_m > position.max_height_m) {
    reasons.push({
      field: 'height',
      status: 'incompatible',
      message:
        `La altura del pallet (${pallet.height_m} m) supera la altura máxima permitida en la posición (${position.max_height_m} m).`,
    });
  } else {
    reasons.push({
      field: 'height',
      status: 'compatible',
      message:
        `La altura del pallet (${pallet.height_m} m) es compatible con el máximo permitido en la posición (${position.max_height_m} m).`,
    });
  }

  if (
    pallet.current_weight_kg === null ||
    position.max_weight_kg === null
  ) {
    reasons.push({
      field: 'weight',
      status: 'insufficient_data',
      message:
        'No existen datos suficientes para validar el peso actual del pallet contra la capacidad de la posición.',
    });
  } else if (
    pallet.current_weight_kg > position.max_weight_kg
  ) {
    reasons.push({
      field: 'weight',
      status: 'incompatible',
      message:
        `El peso actual del pallet (${pallet.current_weight_kg} kg) supera la capacidad máxima de la posición (${position.max_weight_kg} kg).`,
    });
  } else {
    reasons.push({
      field: 'weight',
      status: 'compatible',
      message:
        `El peso actual del pallet (${pallet.current_weight_kg} kg) es compatible con la capacidad máxima de la posición (${position.max_weight_kg} kg).`,
    });
  }

  let status: PhysicalCompatibilityStatus = 'compatible';

  if (
    reasons.some(
      (reason) => reason.status === 'incompatible'
    )
  ) {
    status = 'incompatible';
  } else if (
    reasons.some(
      (reason) => reason.status === 'insufficient_data'
    )
  ) {
    status = 'insufficient_data';
  }

  return {
    status,
    palletId: pallet.id,
    palletCode: pallet.pallet_code,
    positionId: position.id,
    positionCode: position.code,
    reasons,
  };
}

export function assertPalletPositionPhysicalCompatibility(
  pallet: PalletRecord,
  position: RackPositionRecord
): PalletPositionPhysicalCompatibility {
  const compatibility =
    validatePalletPositionPhysicalCompatibility(
      pallet,
      position
    );

  if (compatibility.status === 'compatible') {
    return compatibility;
  }

  const blockingReasons = compatibility.reasons
    .filter(
      (reason) =>
        reason.status === 'incompatible' ||
        reason.status === 'insufficient_data'
    )
    .map((reason) => reason.message);

  throw new Error(
    [
      `La ubicación física del pallet ${compatibility.palletCode} en la posición ${compatibility.positionCode} fue rechazada.`,
      ...blockingReasons,
    ].join(' ')
  );
}
