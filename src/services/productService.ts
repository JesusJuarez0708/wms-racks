import {
  deactivateProductRecord,
  fetchProducts,
  insertProduct,
  updateProductRecord,
} from '../repositories/productRepository';

import type {
  CreateProductRecord,
  ProductRecord,
} from '../repositories/productRepository';

export type Product = ProductRecord;
export type CreateProductInput = CreateProductRecord;

export async function getProducts(): Promise<Product[]> {
  return fetchProducts();
}

export async function createProduct(
  product: CreateProductInput
): Promise<Product> {
  return insertProduct(product);
}

export async function updateProduct(
  id: string,
  product: Partial<CreateProductInput>
): Promise<Product> {
  return updateProductRecord(id, product);
}

export async function deactivateProduct(id: string): Promise<Product> {
  return deactivateProductRecord(id);
}