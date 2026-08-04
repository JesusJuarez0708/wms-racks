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
