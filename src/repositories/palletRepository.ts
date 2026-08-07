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
  status?: PalletStatus;
};

export type UpdatePalletQuantityRecord = {
  quantity: number;
  unit: string;
  status: PalletStatus;
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
