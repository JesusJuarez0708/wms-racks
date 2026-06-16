import { supabase } from '../lib/supabase';

export type RackRecord = {
  id: string;
  warehouse_id: string;
  code: string;
  name: string | null;
  rack_type: 'selectivo' | 'drive_in';
  is_active: boolean;
  created_at?: string;
};

export type CreateRackRecord = {
  warehouse_id: string;
  code: string;
  name?: string | null;
  rack_type: 'selectivo' | 'drive_in';
  is_active?: boolean;
};

export async function fetchRacks(): Promise<RackRecord[]> {
  const { data, error } = await supabase
    .from('racks')
    .select('*')
    .order('code', { ascending: true });

  if (error) throw new Error(`Error al consultar racks: ${error.message}`);

  return data ?? [];
}

export async function insertRack(rack: CreateRackRecord): Promise<RackRecord> {
  const { data, error } = await supabase
    .from('racks')
    .insert([{ ...rack, is_active: rack.is_active ?? true }])
    .select()
    .single();

  if (error) throw new Error(`Error al crear rack: ${error.message}`);

  return data;
}