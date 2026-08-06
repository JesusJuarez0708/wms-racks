import { supabase } from '../lib/supabase';

export type MovementAllocationStatus =
  | 'planned'
  | 'reserved'
  | 'executed'
  | 'cancelled'
  | 'failed';

export type MovementAllocationRecord = {
  id: string;
  movement_id: string;
  pallet_id: string;
  inventory_id: string | null;

  allocated_quantity: number;
  executed_quantity: number;

  unit: string;

  status: MovementAllocationStatus;

  created_at?: string;
  updated_at?: string | null;
};

export type CreateMovementAllocationRecord = {
  movement_id: string;
  pallet_id: string;
  inventory_id?: string | null;

  allocated_quantity: number;
  executed_quantity?: number;

  unit: string;

  status?: MovementAllocationStatus;
};

export type UpdateMovementAllocationStatusRecord = {
  status: MovementAllocationStatus;
};

export type UpdateMovementAllocationExecutionRecord = {
  executed_quantity: number;
  status: MovementAllocationStatus;
};

export async function fetchMovementAllocations(): Promise<
  MovementAllocationRecord[]
> {
  const { data, error } = await supabase
    .from('movement_allocations')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    throw new Error(
      `Error al consultar asignaciones: ${error.message}`
    );
  }

  return data ?? [];
}

export async function fetchMovementAllocationsByMovementId(
  movementId: string
): Promise<MovementAllocationRecord[]> {
  const { data, error } = await supabase
    .from('movement_allocations')
    .select('*')
    .eq('movement_id', movementId)
    .order('created_at', { ascending: true });

  if (error) {
    throw new Error(
      `Error al consultar asignaciones del movimiento: ${error.message}`
    );
  }

  return data ?? [];
}

export async function insertMovementAllocation(
  allocation: CreateMovementAllocationRecord
): Promise<MovementAllocationRecord> {
  const { data, error } = await supabase
    .from('movement_allocations')
    .insert([
      {
        ...allocation,
        executed_quantity:
          allocation.executed_quantity ?? 0,
        status:
          allocation.status ?? 'planned',
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(
      `Error al crear asignación: ${error.message}`
    );
  }

  return data;
}

export async function updateMovementAllocationStatus(
  allocationId: string,
  update: UpdateMovementAllocationStatusRecord
): Promise<MovementAllocationRecord> {
  const { data, error } = await supabase
    .from('movement_allocations')
    .update({
      status: update.status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', allocationId)
    .select()
    .single();

  if (error) {
    throw new Error(
      `Error al actualizar estado de asignación: ${error.message}`
    );
  }

  return data;
}

export async function updateMovementAllocationExecution(
  allocationId: string,
  update: UpdateMovementAllocationExecutionRecord
): Promise<MovementAllocationRecord> {
  const { data, error } = await supabase
    .from('movement_allocations')
    .update({
      executed_quantity: update.executed_quantity,
      status: update.status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', allocationId)
    .select()
    .single();

  if (error) {
    throw new Error(
      `Error al actualizar ejecución de asignación: ${error.message}`
    );
  }

  return data;
}