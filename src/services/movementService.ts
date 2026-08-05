import {
  completeMovementPacking,
  completeMovementPicking,
  confirmMovementDeliveryArrival,
  confirmMovementOperationalVerification,
  fetchMovements,
  insertMovement,
  startMovementPacking,
  startMovementPicking,
  updateMovementAssignment,
  updateMovementPackingProgress,
  updateMovementPickingProgress,
} from '../repositories/movementRepository';

import type {
  CompleteMovementPackingRecord,
  CompleteMovementPickingRecord,
  ConfirmMovementDeliveryArrivalRecord,
  ConfirmMovementOperationalVerificationRecord,
  CreateMovementRecord,
  MovementRecord,
  StartMovementPackingRecord,
  StartMovementPickingRecord,
  UpdateMovementAssignmentRecord,
  UpdateMovementPackingProgressRecord,
  UpdateMovementPickingProgressRecord,
} from '../repositories/movementRepository';

export type MovementItem = MovementRecord;
export type CreateMovementInput = CreateMovementRecord;

export type UpdateMovementAssignmentInput = UpdateMovementAssignmentRecord;
export type StartMovementPickingInput = StartMovementPickingRecord;
export type UpdateMovementPickingProgressInput =
  UpdateMovementPickingProgressRecord;
export type CompleteMovementPickingInput =
  CompleteMovementPickingRecord;

export type ConfirmMovementDeliveryArrivalInput =
  ConfirmMovementDeliveryArrivalRecord;

export type ConfirmMovementOperationalVerificationInput =
  ConfirmMovementOperationalVerificationRecord;

export type StartMovementPackingInput = StartMovementPackingRecord;

export type UpdateMovementPackingProgressInput =
  UpdateMovementPackingProgressRecord;

export type CompleteMovementPackingInput =
  CompleteMovementPackingRecord;

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

export async function finishPickingMovement(
  movementId: string,
  completion: CompleteMovementPickingInput
): Promise<MovementItem> {
  return completeMovementPicking(movementId, completion);
}

export async function confirmDeliveryAreaArrival(
  movementId: string,
  arrival: ConfirmMovementDeliveryArrivalInput
): Promise<MovementItem> {
  return confirmMovementDeliveryArrival(movementId, arrival);
}

export async function confirmOperationalVerification(
  movementId: string,
  verification: ConfirmMovementOperationalVerificationInput
): Promise<MovementItem> {
  return confirmMovementOperationalVerification(
    movementId,
    verification
  );
}

export async function startPackingMovement(
  movementId: string,
  packing: StartMovementPackingInput
): Promise<MovementItem> {
  return startMovementPacking(movementId, packing);
}

export async function registerPackingProgress(
  movementId: string,
  progress: UpdateMovementPackingProgressInput
): Promise<MovementItem> {
  return updateMovementPackingProgress(movementId, progress);
}

export async function finishPackingMovement(
  movementId: string,
  completion: CompleteMovementPackingInput
): Promise<MovementItem> {
  return completeMovementPacking(movementId, completion);
}
