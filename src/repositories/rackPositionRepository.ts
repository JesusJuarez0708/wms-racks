import { supabase } from '../lib/supabase';

export type RackPositionRecord = {
  id: string;
  warehouse_id: string | null;
  rack_id: string;
  code: string;
  line: string | null;
  level: string | null;
  position_number: number | null;
  depth: number | null;
  rack_type: string | null;
  zone: string | null;
  aisle: string | null;
  max_depth: number | null;
  position_status: string | null;
  is_active: boolean;
  created_at?: string;
  updated_at?: string | null;
};

export type CreateRackPositionRecord = {
  warehouse_id?: string | null;
  rack_id: string;
  code: string;
  line?: string | null;
  level?: string | null;
  position_number?: number | null;
  depth?: number | null;
  rack_type?: string | null;
  zone?: string | null;
  aisle?: string | null;
  max_depth?: number | null;
  position_status?: string | null;
  is_active?: boolean;
};

export async function fetchRackPositions(): Promise<RackPositionRecord[]> {
  const pageSize = 1000;
  let from = 0;
  let allPositions: RackPositionRecord[] = [];

  while (true) {
    const { data, error } = await supabase
      .from('rack_positions')
      .select('*')
      .order('code', { ascending: true })
      .range(from, from + pageSize - 1);

    if (error) {
      throw new Error(`Error al consultar posiciones: ${error.message}`);
    }

    const rows = data ?? [];

    allPositions = [...allPositions, ...rows];

    if (rows.length < pageSize) {
      break;
    }

    from += pageSize;
  }

  return allPositions;
}

export async function insertRackPosition(
  position: CreateRackPositionRecord
): Promise<RackPositionRecord> {
  const { data, error } = await supabase
    .from('rack_positions')
    .insert([
      {
        ...position,
        position_status: position.position_status ?? 'available',
        is_active: position.is_active ?? true,
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(`Error al crear posición: ${error.message}`);
  }

  return data;
}