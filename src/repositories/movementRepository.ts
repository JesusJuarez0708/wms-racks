import { supabase } from '../lib/supabase';

export type MovementRecord = {
  id: string;
  warehouse_id: string;
  movement_type:
    | 'entrada'
    | 'salida'
    | 'reubicacion'
    | 'ajuste'
    | 'bloqueo'
    | 'desbloqueo';
  pallet_id: string | null;
  product_id: string | null;
  origin_position_id: string | null;
  destination_position_id: string | null;
  operator_id: string | null;
  forklift_unit_id: string | null;
  quantity: number | null;
  unit: string | null;
  status: 'pending' | 'completed' | 'cancelled' | 'failed';
  reason: string | null;
  notes: string | null;
  decision_score: number | null;
  decision_explanation: string | null;
  recommendation_id: string | null;
  created_by: string | null;
  created_at?: string;
};

export type CreateMovementRecord = {
  warehouse_id: string;
  movement_type: MovementRecord['movement_type'];
  pallet_id?: string | null;
  product_id?: string | null;
  origin_position_id?: string | null;
  destination_position_id?: string | null;
  operator_id?: string | null;
  forklift_unit_id?: string | null;
  quantity?: number | null;
  unit?: string | null;
  status?: MovementRecord['status'];
  reason?: string | null;
  notes?: string | null;
  decision_score?: number | null;
  decision_explanation?: string | null;
  recommendation_id?: string | null;
  created_by?: string | null;
};

export type UpdateMovementAssignmentRecord = {
  operator_id?: string | null;
  forklift_unit_id?: string | null;
  notes?: string | null;
  decision_explanation?: string | null;
  created_by?: string | null;
};

export type StartMovementPickingRecord = {
  notes?: string | null;
  decision_explanation?: string | null;
  created_by?: string | null;
};

export type UpdateMovementPickingProgressRecord = {
  notes: string;
  decision_explanation?: string | null;
  created_by?: string | null;
};

export type CompleteMovementPickingRecord = {
  notes: string;
  decision_explanation?: string | null;
  created_by?: string | null;
};

export type ConfirmMovementDeliveryArrivalRecord = {
  notes: string;
  decision_explanation?: string;
  created_by?: string | null;
};

export type ConfirmMovementOperationalVerificationRecord = {
  requires_packing: boolean;
  notes: string;
  decision_explanation?: string;
  created_by?: string | null;
};

export type StartMovementPackingRecord = {
  notes: string;
  decision_explanation?: string;
  created_by?: string | null;
};

export type UpdateMovementPackingProgressRecord = {
  notes: string;
  decision_explanation?: string;
  created_by?: string | null;
};

export type CompleteMovementPackingRecord = {
  notes: string;
  decision_explanation?: string;
  created_by?: string | null;
};

export type StartMovementShippingRecord = {
  notes: string;
  decision_explanation?: string;
  created_by?: string | null;
};

export type UpdateMovementShippingProgressRecord = {
  notes: string;
  decision_explanation?: string;
  created_by?: string | null;
};

export type CompleteMovementShippingRecord = {
  notes: string;
  decision_explanation?: string;
  created_by?: string | null;
};

export type ConfirmMovementExitRecord = {
  notes: string;
  decision_explanation?: string;
  created_by?: string | null;
};

export async function fetchMovements(): Promise<MovementRecord[]> {
  const { data, error } = await supabase
    .from('movements')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Error al consultar movimientos: ${error.message}`);
  }

  return data ?? [];
}

export async function insertMovement(
  movement: CreateMovementRecord
): Promise<MovementRecord> {
  const { data, error } = await supabase
    .from('movements')
    .insert([
      {
        ...movement,
        status: movement.status ?? 'completed',
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(`Error al crear movimiento: ${error.message}`);
  }

  return data;
}

export async function updateMovementAssignment(
  movementId: string,
  assignment: UpdateMovementAssignmentRecord
): Promise<MovementRecord> {
  const { data, error } = await supabase
    .from('movements')
    .update({
      operator_id: assignment.operator_id ?? null,
      forklift_unit_id: assignment.forklift_unit_id ?? null,
      notes: assignment.notes ?? null,
      decision_explanation:
        assignment.decision_explanation ??
        'Asignación Operativa de Picking confirmada.',
      created_by: assignment.created_by ?? 'Usuario CJWMS',
    })
    .eq('id', movementId)
    .eq('movement_type', 'salida')
    .eq('status', 'pending')
    .select()
    .single();

  if (error) {
    throw new Error(
      `Error al asignar el movimiento de picking: ${error.message}`
    );
  }

  return data;
}

export async function startMovementPicking(
  movementId: string,
  picking: StartMovementPickingRecord
): Promise<MovementRecord> {
  const { data, error } = await supabase
    .from('movements')
    .update({
      notes: picking.notes ?? 'Ejecución física del picking iniciada.',
      decision_explanation:
        picking.decision_explanation ??
        'Inicio Operativo del Picking confirmado.',
      created_by: picking.created_by ?? 'Usuario CJWMS',
    })
    .eq('id', movementId)
    .eq('movement_type', 'salida')
    .eq('status', 'pending')
    .ilike('notes', '%Operador asignado:%')
    .select()
    .single();

  if (error) {
    throw new Error(
      `Error al iniciar el movimiento de picking: ${error.message}`
    );
  }

  return data;
}

export async function updateMovementPickingProgress(
  movementId: string,
  progress: UpdateMovementPickingProgressRecord
): Promise<MovementRecord> {
  const { data, error } = await supabase
    .from('movements')
    .update({
      notes: progress.notes,
      decision_explanation:
        progress.decision_explanation ??
        'Picking en Proceso: extracción parcial confirmada.',
      created_by: progress.created_by ?? 'Usuario CJWMS',
    })
    .eq('id', movementId)
    .eq('movement_type', 'salida')
    .eq('status', 'pending')
    .ilike('decision_explanation', '%Inicio Operativo del Picking confirmado%')
    .select()
    .single();

  if (error) {
    throw new Error(
      `Error al registrar el avance parcial del picking: ${error.message}`
    );
  }

  return data;
}

export async function completeMovementPicking(
  movementId: string,
  completion: CompleteMovementPickingRecord
): Promise<MovementRecord> {
  const { data, error } = await supabase
    .from('movements')
    .update({
      status: 'completed',
      notes: completion.notes,
      decision_explanation:
        completion.decision_explanation ??
        'Picking Finalizado: extracción total confirmada.',
      created_by: completion.created_by ?? 'Usuario CJWMS',
    })
    .eq('id', movementId)
    .eq('movement_type', 'salida')
    .eq('status', 'pending')
    .or(
      'decision_explanation.ilike.%Inicio Operativo del Picking confirmado%,decision_explanation.ilike.%Picking en Proceso%'
    )
    .select()
    .single();

  if (error) {
    throw new Error(
      `Error al finalizar el movimiento de picking: ${error.message}`
    );
  }

  return data;
}

export async function confirmMovementDeliveryArrival(
  movementId: string,
  arrival: ConfirmMovementDeliveryArrivalRecord
): Promise<MovementRecord> {
  const { data, error } = await supabase
    .from('movements')
    .update({
      notes: arrival.notes,
      decision_explanation:
        arrival.decision_explanation ??
        'Área de Entrega: mercancía recibida para verificación operativa.',
      created_by: arrival.created_by ?? 'Usuario CJWMS',
    })
    .eq('id', movementId)
    .eq('movement_type', 'salida')
    .eq('status', 'completed')
    .ilike(
      'decision_explanation',
      '%Picking Finalizado: extracción total confirmada%'
    )
    .select()
    .single();

  if (error) {
    throw new Error(
      `Error al confirmar la llegada al Área de Entrega: ${error.message}`
    );
  }

  return data;
}

export async function confirmMovementOperationalVerification(
  movementId: string,
  verification: ConfirmMovementOperationalVerificationRecord
): Promise<MovementRecord> {
  const { data, error } = await supabase
    .from('movements')
    .update({
      notes: verification.notes,
      decision_explanation:
        verification.decision_explanation ??
        (verification.requires_packing
          ? 'Verificación Operativa: requiere empaque.'
          : 'Verificación Operativa: liberado para embarque.'),
      created_by: verification.created_by ?? 'Usuario CJWMS',
    })
    .eq('id', movementId)
    .eq('movement_type', 'salida')
    .eq('status', 'completed')
    .ilike(
      'decision_explanation',
      '%Área de Entrega: mercancía recibida para verificación operativa%'
    )
    .select()
    .single();

  if (error) {
    throw new Error(
      `Error al confirmar la verificación operativa: ${error.message}`
    );
  }

  return data;
}

export async function startMovementPacking(
  movementId: string,
  packing: StartMovementPackingRecord
): Promise<MovementRecord> {
  const { data, error } = await supabase
    .from('movements')
    .update({
      notes: packing.notes,
      decision_explanation:
        packing.decision_explanation ??
        'Empaque Iniciado: preparación física de la mercancía confirmada.',
      created_by: packing.created_by ?? 'Usuario CJWMS',
    })
    .eq('id', movementId)
    .eq('movement_type', 'salida')
    .eq('status', 'completed')
    .ilike(
      'decision_explanation',
      '%Verificación Operativa: requiere empaque%'
    )
    .select()
    .single();

  if (error) {
    throw new Error(
      `Error al iniciar el proceso de empaque: ${error.message}`
    );
  }

  return data;
}

export async function updateMovementPackingProgress(
  movementId: string,
  progress: UpdateMovementPackingProgressRecord
): Promise<MovementRecord> {
  const { data, error } = await supabase
    .from('movements')
    .update({
      notes: progress.notes,
      decision_explanation:
        progress.decision_explanation ??
        'Empaque en Proceso: avance operativo confirmado.',
      created_by: progress.created_by ?? 'Usuario CJWMS',
    })
    .eq('id', movementId)
    .eq('movement_type', 'salida')
    .eq('status', 'completed')
    .ilike(
      'decision_explanation',
      '%Empaque Iniciado: preparación física de la mercancía confirmada%'
    )
    .select()
    .single();

  if (error) {
    throw new Error(
      `Error al registrar el avance del proceso de empaque: ${error.message}`
    );
  }

  return data;
}

export async function completeMovementPacking(
  movementId: string,
  completion: CompleteMovementPackingRecord
): Promise<MovementRecord> {
  const { data, error } = await supabase
    .from('movements')
    .update({
      notes: completion.notes,
      decision_explanation:
        completion.decision_explanation ??
        'Empaque Finalizado: mercancía liberada para embarque.',
      created_by: completion.created_by ?? 'Usuario CJWMS',
    })
    .eq('id', movementId)
    .eq('movement_type', 'salida')
    .eq('status', 'completed')
    .or(
      'decision_explanation.ilike.%Empaque Iniciado: preparación física de la mercancía confirmada%,decision_explanation.ilike.%Empaque en Proceso: avance operativo confirmado%'
    )
    .select()
    .single();

  if (error) {
    throw new Error(
      `Error al finalizar el proceso de empaque: ${error.message}`
    );
  }

  return data;
}

export async function startMovementShipping(
  movementId: string,
  shipping: StartMovementShippingRecord
): Promise<MovementRecord> {
  const { data, error } = await supabase
    .from('movements')
    .update({
      notes: shipping.notes,
      decision_explanation:
        shipping.decision_explanation ??
        'Embarque Iniciado: carga física de la mercancía confirmada.',
      created_by: shipping.created_by ?? 'Usuario CJWMS',
    })
    .eq('id', movementId)
    .eq('movement_type', 'salida')
    .eq('status', 'completed')
    .or(
      'decision_explanation.ilike.%Verificación Operativa: liberado para embarque%,decision_explanation.ilike.%Empaque Finalizado: mercancía liberada para embarque%'
    )
    .select()
    .single();

  if (error) {
    throw new Error(
      `Error al iniciar el proceso de embarque: ${error.message}`
    );
  }

  return data;
}

export async function updateMovementShippingProgress(
  movementId: string,
  progress: UpdateMovementShippingProgressRecord
): Promise<MovementRecord> {
  const { data, error } = await supabase
    .from('movements')
    .update({
      notes: progress.notes,
      decision_explanation:
        progress.decision_explanation ??
        'Embarque en Proceso: avance operativo de carga confirmado.',
      created_by: progress.created_by ?? 'Usuario CJWMS',
    })
    .eq('id', movementId)
    .eq('movement_type', 'salida')
    .eq('status', 'completed')
    .ilike(
      'decision_explanation',
      '%Embarque Iniciado: carga física de la mercancía confirmada%'
    )
    .select()
    .single();

  if (error) {
    throw new Error(
      `Error al registrar el avance del proceso de embarque: ${error.message}`
    );
  }

  return data;
}

export async function completeMovementShipping(
  movementId: string,
  completion: CompleteMovementShippingRecord
): Promise<MovementRecord> {
  const { data, error } = await supabase
    .from('movements')
    .update({
      notes: completion.notes,
      decision_explanation:
        completion.decision_explanation ??
        'Embarque Finalizado: carga física completada y pendiente de confirmación de salida.',
      created_by: completion.created_by ?? 'Usuario CJWMS',
    })
    .eq('id', movementId)
    .eq('movement_type', 'salida')
    .eq('status', 'completed')
    .or(
      'decision_explanation.ilike.%Embarque Iniciado: carga física de la mercancía confirmada%,decision_explanation.ilike.%Embarque en Proceso: avance operativo de carga confirmado%'
    )
    .select()
    .single();

  if (error) {
    throw new Error(
      `Error al finalizar el proceso de embarque: ${error.message}`
    );
  }

  return data;
}

export async function confirmMovementExit(
  movementId: string,
  confirmation: ConfirmMovementExitRecord
): Promise<MovementRecord> {
  const { data, error } = await supabase
    .from('movements')
    .update({
      notes: confirmation.notes,
      decision_explanation:
        confirmation.decision_explanation ??
        'Salida Confirmada: mercancía retirada físicamente del almacén y movimiento cerrado.',
      created_by:
        confirmation.created_by ?? 'Usuario CJWMS',
    })
    .eq('id', movementId)
    .eq('movement_type', 'salida')
    .eq('status', 'completed')
    .ilike(
      'decision_explanation',
      '%Embarque Finalizado: carga física completada y pendiente de confirmación de salida%'
    )
    .select()
    .single();

  if (error) {
    throw new Error(
      `Error al confirmar la salida de la mercancía: ${error.message}`
    );
  }

  return data;
}
