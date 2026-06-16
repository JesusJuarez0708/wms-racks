import { supabase } from '../lib/supabase';

export type OperationalMemoryRecord = {
  id: string;
  memory_type: string;
  entity_id?: string | null;
  entity_type?: string | null;
  title: string;
  description?: string | null;
  score?: number | null;
  metadata?: Record<string, unknown> | null;
  created_at?: string | null;
};

export type CreateOperationalMemory = {
  memory_type: string;
  entity_id?: string;
  entity_type?: string;
  title: string;
  description?: string;
  score?: number;
  metadata?: Record<string, unknown>;
};

export async function fetchOperationalMemories(): Promise<
  OperationalMemoryRecord[]
> {
  const { data, error } = await supabase
    .from('operational_memory')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error(
      '[operationalMemoryRepository] fetchOperationalMemories',
      error
    );

    return [];
  }

  return data ?? [];
}

export async function createOperationalMemory(
  payload: CreateOperationalMemory
): Promise<OperationalMemoryRecord | null> {
  const { data, error } = await supabase
    .from('operational_memory')
    .insert(payload)
    .select()
    .single();

  if (error) {
    console.error(
      '[operationalMemoryRepository] createOperationalMemory',
      error
    );

    return null;
  }

  return data;
}