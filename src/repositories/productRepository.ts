import { supabase } from '../lib/supabase';

export type ProductRecord = {
  id: string;
  sku: string;
  description: string;
  unit: string | null;
  rotation: 'alta' | 'media' | 'baja' | null;
  is_active: boolean;
  created_at?: string;
  updated_at?: string | null;
};

export type CreateProductRecord = {
  sku: string;
  description: string;
  unit?: string | null;
  rotation?: 'alta' | 'media' | 'baja' | null;
  is_active?: boolean;
};

export async function fetchProducts(): Promise<ProductRecord[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('description', { ascending: true });

  if (error) {
    throw new Error(`Error al consultar productos: ${error.message}`);
  }

  return data ?? [];
}

export async function insertProduct(
  product: CreateProductRecord
): Promise<ProductRecord> {
  const { data, error } = await supabase
    .from('products')
    .insert([
      {
        sku: product.sku,
        description: product.description,
        unit: product.unit ?? null,
        rotation: product.rotation ?? null,
        is_active: product.is_active ?? true,
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(`Error al crear producto: ${error.message}`);
  }

  return data;
}

export async function updateProductRecord(
  id: string,
  product: Partial<CreateProductRecord>
): Promise<ProductRecord> {
  const { data, error } = await supabase
    .from('products')
    .update(product)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Error al actualizar producto: ${error.message}`);
  }

  return data;
}

export async function deactivateProductRecord(
  id: string
): Promise<ProductRecord> {
  const { data, error } = await supabase
    .from('products')
    .update({ is_active: false })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Error al desactivar producto: ${error.message}`);
  }

  return data;
}