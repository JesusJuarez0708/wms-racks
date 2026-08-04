import {
  fetchMovements,
  insertMovement,
  startMovementPicking,
  updateMovementAssignment,
  updateMovementPickingProgress,
} from '../repositories/movementRepository';

import type {
  CreateMovementRecord,
  MovementRecord,
  StartMovementPickingRecord,
  UpdateMovementAssignmentRecord,
  UpdateMovementPickingProgressRecord,
} from '../repositories/movementRepository';

export type MovementItem = MovementRecord;
export type CreateMovementInput = CreateMovementRecord;

export type UpdateMovementAssignmentInput = UpdateMovementAssignmentRecord;
export type StartMovementPickingInput = StartMovementPickingRecord;
export type UpdateMovementPickingProgressInput =
  UpdateMovementPickingProgressRecord;

export async function getMovements(): Promise<MovementItem[]> {
  return fetchMovements();
}

export async function createMovement(
  movement: CreateMovementInput
): Promise<MovementItem> {
  return insertMovement(movement);
}

export async function assignMovementPicking(
  movementId: string,
  assignment: UpdateMovementAssignmentInput
): Promise<MovementItem> {
  return updateMovementAssignment(movementId, assignment);
}

export async function startPickingMovement(
  movementId: string,
  picking: StartMovementPickingInput
): Promise<MovementItem> {
  return startMovementPicking(movementId, picking);
}

export async function registerPickingProgress(
  movementId: string,
  progress: UpdateMovementPickingProgressInput
): Promise<MovementItem> {
  return updateMovementPickingProgress(movementId, progress);
}