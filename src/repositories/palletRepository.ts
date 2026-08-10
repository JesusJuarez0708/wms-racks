import { supabase } from '../lib/supabase';

export type PalletStatus =
  | 'active'
  | 'out'
  | 'blocked'
  | 'damaged';

export type PalletRecord = {
  id: string;
  product_id: string;
  pallet_code: string;
  lot: string | null;
  quantity: number | null;
  unit: string | null;
  max_quantity: number | null;
  current_weight_kg: number | null;
  tare_weight_kg: number | null;
  max_weight_kg: number | null;
  width_m: number | null;
  length_m: number | null;
  height_m: number | null;
  status: PalletStatus;
  created_at?: string;
  updated_at?: string | null;
};

export type CreatePalletRecord = {
  product_id: string;
  pallet_code: string;
  lot?: string | null;
  quantity?: number | null;
  unit?: string | null;
  max_quantity?: number | null;
  current_weight_kg?: number | null;
  tare_weight_kg?: number | null;
  max_weight_kg?: number | null;
  width_m?: number | null;
  length_m?: number | null;
  height_m?: number | null;
  status?: PalletStatus;
};

export type UpdatePalletQuantityRecord = {
  quantity: number;
  unit: string;
  status: PalletStatus;
};

export type UpdatePalletPhysicalRecord = {
  current_weight_kg: number | null;
  tare_weight_kg: number | null;
  max_weight_kg: number | null;
  width_m: number | null;
  length_m: number | null;
  height_m: number | null;
};

export async function fetchPallets(): Promise<PalletRecord[]> {
  const { data, error } = await supabase
    .from('pallets')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Error al consultar pallets: ${error.message}`);
  }

  return data ?? [];
}

export async function insertPallet(
  pallet: CreatePalletRecord
): Promise<PalletRecord> {
  const { data, error } = await supabase
    .from('pallets')
    .insert([
      {
        ...pallet,
        status: pallet.status ?? 'active',
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(`Error al crear pallet: ${error.message}`);
  }

  return data;
}

export async function updatePalletQuantity(
  palletId: string,
  update: UpdatePalletQuantityRecord
): Promise<PalletRecord> {
  const { data, error } = await supabase
    .from('pallets')
    .update({
      quantity: update.quantity,
      unit: update.unit,
      status: update.status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', palletId)
    .select()
    .single();

  if (error) {
    throw new Error(
      `Error al actualizar cantidad del pallet: ${error.message}`
    );
  }

  return data;
}

export async function updatePalletPhysicalData(
  palletId: string,
  update: UpdatePalletPhysicalRecord
): Promise<PalletRecord> {
  const { data, error } = await supabase
    .from('pallets')
    .update({
      current_weight_kg: update.current_weight_kg,
      tare_weight_kg: update.tare_weight_kg,
      max_weight_kg: update.max_weight_kg,
      width_m: update.width_m,
      length_m: update.length_m,
      height_m: update.height_m,
      updated_at: new Date().toISOString(),
    })
    .eq('id', palletId)
    .select()
    .single();

  if (error) {
    throw new Error(
      `Error al actualizar datos físicos del pallet: ${error.message}`
    );
  }

  return data;
}

export async function deletePalletRecord(
  palletId: string
): Promise<void> {
  const { error } = await supabase
    .from('pallets')
    .delete()
    .eq('id', palletId);

  if (error) {
    throw new Error(
      `Error al eliminar pallet: ${error.message}`
    );
  }
}
