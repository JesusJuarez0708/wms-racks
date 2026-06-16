import { createProduct, getProducts } from './productService';

export async function testProductConnection() {
  const products = await getProducts();

  if (products.length === 0) {
    await createProduct({
      sku: 'CAFE-001',
      description: 'Café prueba CJWMS',
      unit: 'CAJA',
      rotation: 'alta',
    });
  }

  return getProducts();
}