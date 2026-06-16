import { supabase } from '../lib/supabase';

export type WarehouseRecord = {
  id: string;
  code: string;
  name: string;
  is_active: boolean;
  created_at?: string;
};

export type CreateWarehouseRecord = {
  code: string;
  name: string;
  is_active?: boolean;
};

export async function fetchWarehouses(): Promise<WarehouseRecord[]> {
  const { data, error } = await supabase
    .from('warehouses')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    throw new Error(`Error al consultar almacenes: ${error.message}`);
  }

  return data ?? [];
}

export async function insertWarehouse(
  warehouse: CreateWarehouseRecord
): Promise<WarehouseRecord> {
  const { data, error } = await supabase
    .from('warehouses')
    .insert([
      {
        code: warehouse.code,
        name: warehouse.name,
        is_active: warehouse.is_active ?? true,
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(`Error al crear almacén: ${error.message}`);
  }

  return data;
}

export async function updateWarehouseRecord(
  id: string,
  warehouse: Partial<CreateWarehouseRecord>
): Promise<WarehouseRecord> {
  const { data, error } = await supabase
    .from('warehouses')
    .update(warehouse)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Error al actualizar almacén: ${error.message}`);
  }

  return data;
}

export async function deactivateWarehouseRecord(
  id: string
): Promise<WarehouseRecord> {
  const { data, error } = await supabase
    .from('warehouses')
    .update({ is_active: false })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Error al desactivar almacén: ${error.message}`);
  }

  return data;
}