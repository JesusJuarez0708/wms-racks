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

  PACKING_STARTED:
    'Empaque Iniciado: preparación física de la mercancía confirmada.',

  PACKING_IN_PROGRESS:
    'Empaque en Proceso: avance operativo confirmado.',

  PACKING_COMPLETED:
    'Empaque Finalizado: mercancía liberada para embarque.',

  SHIPPING_STARTED:
    'Embarque Iniciado: carga física de la mercancía confirmada.',

  SHIPPING_IN_PROGRESS:
    'Embarque en Proceso: avance operativo de carga confirmado.',

  SHIPPING_COMPLETED:
    'Embarque Finalizado: carga física completada y pendiente de confirmación de salida.',

  EXIT_CONFIRMED:
    'Salida Confirmada: mercancía retirada físicamente del almacén y movimiento cerrado.',
} as const;

export type MovementOperationalState =
  | 'picking_unassigned'
  | 'picking_assigned'
  | 'picking_in_progress'
  | 'picking_partial_progress'
  | 'picking_completed'
  | 'delivery_area_pending_verification'
  | 'verification_completed_requires_packing'
  | 'verification_completed_ready_for_shipping'
  | 'packing_started'
  | 'packing_in_progress'
  | 'packing_completed_ready_for_shipping'
  | 'shipping_started'
  | 'shipping_in_progress'
  | 'shipping_completed_pending_exit_confirmation'
  | 'exit_confirmed'
  | 'not_applicable'
  | 'unknown';

function hasAssignedOperator(notes: string | null) {
  return (
    notes
      ?.split('\n')
      .some((line) => line.startsWith('Operador asignado:')) ?? false
  );
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
      MOVEMENT_OPERATIONAL_EXPLANATIONS.EXIT_CONFIRMED
  ) {
    return 'exit_confirmed';
  }

  if (
    movement.status === 'completed' &&
    movement.decision_explanation ===
      MOVEMENT_OPERATIONAL_EXPLANATIONS.SHIPPING_COMPLETED
  ) {
    return 'shipping_completed_pending_exit_confirmation';
  }

  if (
    movement.status === 'completed' &&
    movement.decision_explanation ===
      MOVEMENT_OPERATIONAL_EXPLANATIONS.SHIPPING_IN_PROGRESS
  ) {
    return 'shipping_in_progress';
  }

  if (
    movement.status === 'completed' &&
    movement.decision_explanation ===
      MOVEMENT_OPERATIONAL_EXPLANATIONS.SHIPPING_STARTED
  ) {
    return 'shipping_started';
  }

  if (
    movement.status === 'completed' &&
    movement.decision_explanation ===
      MOVEMENT_OPERATIONAL_EXPLANATIONS.PACKING_COMPLETED
  ) {
    return 'packing_completed_ready_for_shipping';
  }

  if (
    movement.status === 'completed' &&
    movement.decision_explanation ===
      MOVEMENT_OPERATIONAL_EXPLANATIONS.PACKING_IN_PROGRESS
  ) {
    return 'packing_in_progress';
  }

  if (
    movement.status === 'completed' &&
    movement.decision_explanation ===
      MOVEMENT_OPERATIONAL_EXPLANATIONS.PACKING_STARTED
  ) {
    return 'packing_started';
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

export function canStartPacking(
  movement: MovementItem
) {
  return requiresPackingAfterVerification(movement);
}

export function isPackingStarted(
  movement: MovementItem
) {
  return (
    getMovementOperationalState(movement) ===
    'packing_started'
  );
}

export function isPackingInProgress(
  movement: MovementItem
) {
  return (
    getMovementOperationalState(movement) ===
    'packing_in_progress'
  );
}

export function canRegisterPackingProgress(
  movement: MovementItem
) {
  return isPackingStarted(movement);
}

export function canCompletePacking(
  movement: MovementItem
) {
  const operationalState =
    getMovementOperationalState(movement);

  return (
    operationalState === 'packing_started' ||
    operationalState === 'packing_in_progress'
  );
}

export function isPackingCompleted(
  movement: MovementItem
) {
  return (
    getMovementOperationalState(movement) ===
    'packing_completed_ready_for_shipping'
  );
}

export function isReadyForShipping(
  movement: MovementItem
) {
  const operationalState =
    getMovementOperationalState(movement);

  return (
    operationalState ===
      'verification_completed_ready_for_shipping' ||
    operationalState ===
      'packing_completed_ready_for_shipping'
  );
}

export function canStartShipping(
  movement: MovementItem
) {
  return isReadyForShipping(movement);
}

export function isShippingStarted(
  movement: MovementItem
) {
  return (
    getMovementOperationalState(movement) ===
    'shipping_started'
  );
}

export function isShippingInProgress(
  movement: MovementItem
) {
  return (
    getMovementOperationalState(movement) ===
    'shipping_in_progress'
  );
}

export function canRegisterShippingProgress(
  movement: MovementItem
) {
  return isShippingStarted(movement);
}

export function canCompleteShipping(
  movement: MovementItem
) {
  const operationalState =
    getMovementOperationalState(movement);

  return (
    operationalState === 'shipping_started' ||
    operationalState === 'shipping_in_progress'
  );
}

export function isShippingCompleted(
  movement: MovementItem
) {
  return (
    getMovementOperationalState(movement) ===
    'shipping_completed_pending_exit_confirmation'
  );
}

export function canConfirmExit(
  movement: MovementItem
) {
  return isShippingCompleted(movement);
}

export function isExitConfirmed(
  movement: MovementItem
) {
  return (
    getMovementOperationalState(movement) ===
    'exit_confirmed'
  );
}