import { supabase } from '../lib/supabase';

export interface DockItem {
  id: string;
  warehouse_id: string;
  code: string;
  name: string;
  dock_type: 'receiving' | 'shipping' | 'mixed';
  status: 'available' | 'occupied' | 'maintenance' | 'inactive';
  notes: string | null;
  created_at: string;
  updated_at: string | null;
}

export async function fetchDocks(): Promise<DockItem[]> {
  const { data, error } = await supabase
    .from('docks')
    .select('*')
    .order('code');

  if (error) {
    throw error;
  }

  return data satisfies DockItem[];
}

export async function fetchAvailableDocks(): Promise<DockItem[]> {
  const { data, error } = await supabase
    .from('docks')
    .select('*')
    .eq('status', 'available')
    .order('code');

  if (error) {
    throw error;
  }

  return data satisfies DockItem[];
}

export async function fetchDockById(
  dockId: string
): Promise<DockItem | null> {
  const { data, error } = await supabase
    .from('docks')
    .select('*')
    .eq('id', dockId)
    .single();

  if (error) {
    throw error;
  }

  return data satisfies DockItem;
}

export async function updateDockStatus(
  dockId: string,
  status: DockItem['status']
): Promise<void> {
  const { error } = await supabase
    .from('docks')
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', dockId);

  if (error) {
    throw error;
  }
}