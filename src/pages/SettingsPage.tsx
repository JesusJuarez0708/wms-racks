import { useEffect, useState } from 'react';
import { getProducts } from '../services/productService';
import type { Product } from '../services/productService';

import { getWarehouses } from '../services/warehouseService';
import type { Warehouse } from '../services/warehouseService';

function SettingsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [productsData, warehousesData] = await Promise.all([
          getProducts(),
          getWarehouses(),
        ]);

        setProducts(productsData);
        setWarehouses(warehousesData);
      } catch (err) {
        console.error(err);
        setError('No se pudieron cargar los datos desde Supabase.');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">
          Configuración
        </h1>

        <p className="mt-2 text-slate-600">
          Configuración general del sistema.
        </p>
      </div>

      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h2 className="text-xl font-bold">
          Almacenes
        </h2>

        <p className="mt-2 text-slate-600">
          Almacenes cargados desde Supabase.
        </p>

        {!loading && !error && (
          <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3">Código</th>
                  <th className="px-4 py-3">Nombre</th>
                  <th className="px-4 py-3">Estado</th>
                </tr>
              </thead>
              <tbody>
                {warehouses.map((warehouse) => (
                  <tr
                    key={warehouse.id}
                    className="border-t border-slate-200"
                  >
                    <td className="px-4 py-3 font-medium">
                      {warehouse.code}
                    </td>
                    <td className="px-4 py-3">
                      {warehouse.name}
                    </td>
                    <td className="px-4 py-3">
                      {warehouse.is_active ? 'Activo' : 'Inactivo'}
                    </td>
                  </tr>
                ))}

                {warehouses.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-6 text-center text-slate-500"
                    >
                      No hay almacenes registrados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h2 className="text-xl font-bold">
          Catálogo de productos
        </h2>

        <p className="mt-2 text-slate-600">
          Productos cargados desde Supabase.
        </p>

        {loading && (
          <p className="mt-4 text-slate-500">
            Cargando productos...
          </p>
        )}

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 p-3 text-red-700">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3">SKU</th>
                  <th className="px-4 py-3">Descripción</th>
                  <th className="px-4 py-3">Unidad</th>
                  <th className="px-4 py-3">Rotación</th>
                  <th className="px-4 py-3">Estado</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-t border-slate-200"
                  >
                    <td className="px-4 py-3 font-medium">
                      {product.sku}
                    </td>
                    <td className="px-4 py-3">
                      {product.description}
                    </td>
                    <td className="px-4 py-3">
                      {product.unit ?? '-'}
                    </td>
                    <td className="px-4 py-3">
                      {product.rotation ?? '-'}
                    </td>
                    <td className="px-4 py-3">
                      {product.is_active ? 'Activo' : 'Inactivo'}
                    </td>
                  </tr>
                ))}

                {products.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-6 text-center text-slate-500"
                    >
                      No hay productos registrados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default SettingsPage;