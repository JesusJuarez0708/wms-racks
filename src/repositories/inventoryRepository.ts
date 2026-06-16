import { supabase } from '../lib/supabase';

export type InventoryRecord = {
  id: string;
  warehouse_id: string;
  rack_position_id: string;
  pallet_id: string;
  status: 'available' | 'reserved' | 'blocked';
  stored_at?: string;
  updated_at?: string | null;
};

export type CreateInventoryRecord = {
  warehouse_id: string;
  rack_position_id: string;
  pallet_id: string;
  status?: 'available' | 'reserved' | 'blocked';
};

export async function fetchInventory(): Promise<InventoryRecord[]> {
  const { data, error } = await supabase
    .from('inventory')
    .select('*')
    .order('stored_at', { ascending: false });

  if (error) {
    throw new Error(`Error al consultar inventario: ${error.message}`);
  }

  return data ?? [];
}

export async function insertInventory(
  inventory: CreateInventoryRecord
): Promise<InventoryRecord> {
  const { data, error } = await supabase
    .from('inventory')
    .insert([
      {
        ...inventory,
        status: inventory.status ?? 'available',
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(`Error al crear inventario: ${error.message}`);
  }

  return data;
}

export async function updateInventoryStatus(
  id: string,
  status: InventoryRecord['status']
): Promise<InventoryRecord> {
  const { data, error } = await supabase
    .from('inventory')
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Error al actualizar inventario: ${error.message}`);
  }

  return data;
}

export async function updateInventoryPosition(
  id: string,
  rackPositionId: string
): Promise<InventoryRecord> {
  const { data, error } = await supabase
    .from('inventory')
    .update({
      rack_position_id: rackPositionId,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Error al actualizar ubicación de inventario: ${error.message}`);
  }

  return data;
}