import { supabase } from '../lib/supabase';

export type GateAccessOperationType = 'inbound' | 'outbound';

export type GateAccessStatus =
  | 'registered'
  | 'documentation_pending'
  | 'documentation_in_validation'
  | 'pending_authorization'
  | 'authorized'
  | 'rejected'
  | 'cancelled'
  | 'dock_assigned'
  | 'released_to_reception'
  | 'reception_started'
  | 'reception_in_progress';

export type GateAccessRecord = {
  id: string;
  warehouse_id: string;
  dock_id: string | null;
  vehicle_plate: string;
  driver_name: string;
  carrier_company: string;
  operation_type: GateAccessOperationType;
  status: GateAccessStatus;
  occurred_at: string;
  notes: string | null;
  created_by: string | null;
  created_at?: string;
  updated_at?: string | null;
};

export type CreateGateAccessRecord = {
  warehouse_id: string;
  vehicle_plate: string;
  driver_name: string;
  carrier_company: string;
  operation_type: GateAccessOperationType;
  status?: GateAccessStatus;
  occurred_at?: string;
  notes?: string | null;
  created_by?: string | null;
};

export async function fetchGateAccesses(): Promise<GateAccessRecord[]> {
  const { data, error } = await supabase
    .from('gate_accesses')
    .select('*')
    .order('occurred_at', { ascending: false });

  if (error) {
    throw new Error(
      `Error al consultar registros de control de acceso: ${error.message}`
    );
  }

  return data ?? [];
}

export async function insertGateAccess(
  gateAccess: CreateGateAccessRecord
): Promise<GateAccessRecord> {
  const { data, error } = await supabase
    .from('gate_accesses')
    .insert([
      {
        ...gateAccess,
        status: gateAccess.status ?? 'registered',
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(
      `Error al crear registro de control de acceso: ${error.message}`
    );
  }

  return data;
}

export async function updateGateAccessStatus(
  id: string,
  status: GateAccessStatus
): Promise<GateAccessRecord> {
  const { data, error } = await supabase
    .from('gate_accesses')
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(
      `Error al actualizar estado de control de acceso: ${error.message}`
    );
  }

  return data;
}

export async function assignGateAccessDock(
  id: string,
  dockId: string
): Promise<GateAccessRecord> {
  const { data, error } = await supabase
    .from('gate_accesses')
    .update({
      dock_id: dockId,
      status: 'dock_assigned',
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(
      `Error al asignar andén al control de acceso: ${error.message}`
    );
  }

  return data;
}