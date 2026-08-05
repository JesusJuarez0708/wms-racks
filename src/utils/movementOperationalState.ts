import type { MovementItem } from '../services/movementService';

export const MOVEMENT_OPERATIONAL_EXPLANATIONS = {
  PICKING_ASSIGNED:
    'Solicitud de surtido asignada operativamente y pendiente de inicio.',

  PICKING_STARTED:
    'Inicio Operativo del Picking confirmado.',

  PICKING_PARTIAL_PROGRESS:
    'Picking en Proceso: extracción parcial confirmada.',

  PICKING_COMPLETED:
    'Picking Finalizado: extracción total confirmada.',

  DELIVERY_AREA_ARRIVAL:
    'Área de Entrega: mercancía recibida para verificación operativa.',

  VERIFICATION_REQUIRES_PACKING:
    'Verificación Operativa: requiere empaque.',

  VERIFICATION_READY_FOR_SHIPPING:
    'Verificación Operativa: liberado para embarque.',
} as const;

export type MovementOperationalState =
  | 'picking_unassigned'
  | 'picking_assigned'
  | 'picking_in_progress'
  | 'picking_partial_progress'
  | 'picking_completed'
  | 'delivery_area_pending_verification'
  | 'not_applicable'
  | 'unknown'
  | 'verification_completed_requires_packing'
  | 'verification_completed_ready_for_shipping';

function hasAssignedOperator(notes: string | null) {
  return notes
    ?.split('\n')
    .some((line) => line.startsWith('Operador asignado:')) ?? false;
}

export function getMovementOperationalState(
  movement: MovementItem
): MovementOperationalState {
  if (movement.movement_type !== 'salida') {
    return 'not_applicable';
  }

  if (
    movement.status === 'completed' &&
    movement.decision_explanation ===
        MOVEMENT_OPERATIONAL_EXPLANATIONS.VERIFICATION_REQUIRES_PACKING
    ) {
    return 'verification_completed_requires_packing';
    }

    if (
    movement.status === 'completed' &&
    movement.decision_explanation ===
        MOVEMENT_OPERATIONAL_EXPLANATIONS.VERIFICATION_READY_FOR_SHIPPING
    ) {
    return 'verification_completed_ready_for_shipping';
  }

  if (
    movement.status === 'completed' &&
    movement.decision_explanation ===
      MOVEMENT_OPERATIONAL_EXPLANATIONS.DELIVERY_AREA_ARRIVAL
  ) {
    return 'delivery_area_pending_verification';
  }

  if (
    movement.status === 'completed' &&
    movement.decision_explanation ===
      MOVEMENT_OPERATIONAL_EXPLANATIONS.PICKING_COMPLETED
  ) {
    return 'picking_completed';
  }

  if (
    movement.status === 'pending' &&
    movement.decision_explanation ===
      MOVEMENT_OPERATIONAL_EXPLANATIONS.PICKING_PARTIAL_PROGRESS
  ) {
    return 'picking_partial_progress';
  }

  if (
    movement.status === 'pending' &&
    movement.decision_explanation ===
      MOVEMENT_OPERATIONAL_EXPLANATIONS.PICKING_STARTED
  ) {
    return 'picking_in_progress';
  }

  if (
    movement.status === 'pending' &&
    hasAssignedOperator(movement.notes)
  ) {
    return 'picking_assigned';
  }

  if (movement.status === 'pending') {
    return 'picking_unassigned';
  }

  return 'unknown';
}

export function isPickingInProgress(
  movement: MovementItem
) {
  const operationalState =
    getMovementOperationalState(movement);

  return (
    operationalState === 'picking_in_progress' ||
    operationalState === 'picking_partial_progress'
  );
}

export function hasPickingPartialProgress(
  movement: MovementItem
) {
  return (
    getMovementOperationalState(movement) ===
    'picking_partial_progress'
  );
}

export function isPickingCompleted(
  movement: MovementItem
) {
  return (
    getMovementOperationalState(movement) ===
    'picking_completed'
  );
}

export function isInDeliveryArea(
  movement: MovementItem
) {
  return (
    getMovementOperationalState(movement) ===
    'delivery_area_pending_verification'
  );
}

export function canConfirmDeliveryAreaArrival(
  movement: MovementItem
) {
  return isPickingCompleted(movement);
}

export function canStartOperationalVerification(
  movement: MovementItem
) {
  return isInDeliveryArea(movement);
}

export function requiresPackingAfterVerification(
  movement: MovementItem
) {
  return (
    getMovementOperationalState(movement) ===
    'verification_completed_requires_packing'
  );
}

export function isReadyForShippingAfterVerification(
  movement: MovementItem
) {
  return (
    getMovementOperationalState(movement) ===
    'verification_completed_ready_for_shipping'
  );
}

export function isOperationalVerificationCompleted(
  movement: MovementItem
) {
  const operationalState =
    getMovementOperationalState(movement);

  return (
    operationalState ===
      'verification_completed_requires_packing' ||
    operationalState ===
      'verification_completed_ready_for_shipping'
  );
}
