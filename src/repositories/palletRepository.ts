import { supabase } from '../lib/supabase';

export type PalletRecord = {
  id: string;
  product_id: string;
  pallet_code: string;
  lot: string | null;
  quantity: number | null;
  unit: string | null;
  status: 'active' | 'out' | 'blocked' | 'damaged';
  created_at?: string;
  updated_at?: string | null;
};

export type CreatePalletRecord = {
  product_id: string;
  pallet_code: string;
  lot?: string | null;
  quantity?: number | null;
  unit?: string | null;
  status?: 'active' | 'out' | 'blocked' | 'damaged';
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