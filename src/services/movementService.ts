import {
  fetchMovements,
  insertMovement,
} from '../repositories/movementRepository';

import type {
  CreateMovementRecord,
  MovementRecord,
} from '../repositories/movementRepository';

export type MovementItem = MovementRecord;
export type CreateMovementInput = CreateMovementRecord;

export async function getMovements(): Promise<MovementItem[]> {
  return fetchMovements();
}

export async function createMovement(
  movement: CreateMovementInput
): Promise<MovementItem> {
  return insertMovement(movement);
}