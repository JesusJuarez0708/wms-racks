import { useEffect, useMemo, useState } from 'react';

import {
  getInventoryQuery,
  type InventoryQueryItem,
} from '../services/inventoryService';

import PickingRequestModal from '../components/PickingRequestModal';

import { executeMovementWorkflow } from '../services/movementWorkflowService';

import { formatQuantityUnit } from '../utils/formatQuantityUnit';

function getInventoryStatusLabel(
  status: InventoryQueryItem['inventory']['status']
) {
  const labels = {
    available: 'Disponible',
    reserved: 'Reservado',
    blocked: 'Bloqueado',
  };

  return labels[status];
}

function InventoryQueryPage() {
  const [inventory, setInventory] = useState<InventoryQueryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<InventoryQueryItem | null>(null);
  const [submittingPicking, setSubmittingPicking] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    async function loadInventory() {
      try {
        setLoading(true);
        setErrorMessage('');

        const data = await getInventoryQuery();

        setInventory(data);
      } catch (error) {
        console.error('Error al cargar la consulta de inventario:', error);

        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'No fue posible consultar el inventario.'
        );
      } finally {
        setLoading(false);
      }
    }

    void loadInventory();
  }, []);

  const filteredInventory = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
        return inventory;
    }

    return inventory.filter((item) => {
        const searchableValues = [
        item.locationCode,
        item.palletNumber,
        item.productSku,
        item.productDescription,
        item.unit,
        ];

        return searchableValues.some((value) =>
        value.toLowerCase().includes(normalizedSearch)
        );
    });
  }, [inventory, searchTerm]);

  function handleRequestPicking(item: InventoryQueryItem) {
    setSelectedItem(item);
    }

  function handleClosePickingModal() {
    setSelectedItem(null);
    }

    async function handleConfirmPicking(item: InventoryQueryItem) {
    if (!item.inventory.warehouse_id) {
        setErrorMessage(
        'No fue posible identificar el almacén del inventario seleccionado.'
        );
        return;
    }

    if (!item.inventory.pallet_id) {
        setErrorMessage(
        'No fue posible identificar el pallet del inventario seleccionado.'
        );
        return;
    }

    if (!item.productId) {
        setErrorMessage(
        'No fue posible identificar el producto del pallet seleccionado.'
        );
        return;
    }

    try {
        setSubmittingPicking(true);
        setErrorMessage('');
        setSuccessMessage('');

        await executeMovementWorkflow({
        warehouse_id: item.inventory.warehouse_id,
        movement_type: 'salida',
        pallet_id: item.inventory.pallet_id,
        product_id: item.productId,
        origin_position_id: item.inventory.rack_position_id,
        destination_position_id: null,
        quantity: item.quantity,
        unit: item.unit || null,
        status: 'pending',
        reason: 'Surtido solicitado',
        notes: `Solicitud de surtido generada desde Consulta de Inventario para el pallet ${item.palletNumber}.`,
        decision_score: 80,
        decision_explanation:
            'Solicitud operativa de surtido confirmada desde la consulta de inventario.',
        created_by: 'Usuario CJWMS',
        });

        const updatedInventory = await getInventoryQuery();

        setInventory(updatedInventory);
        setSelectedItem(null);
        setSuccessMessage(
        `Solicitud de surtido generada correctamente para el pallet ${item.palletNumber}.`
        );
    } catch (error) {
        console.error('Error al generar la solicitud de surtido:', error);

        setErrorMessage(
        error instanceof Error
            ? error.message
            : 'No fue posible generar la solicitud de surtido.'
        );
    } finally {
        setSubmittingPicking(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Consulta de Inventario
        </h1>

        <p className="mt-2 text-slate-600">
          Consulta operativa del inventario almacenado en el sistema.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <label
            htmlFor="inventory-search"
            className="mb-2 block text-sm font-semibold text-slate-700"
        >
            Buscar inventario
        </label>

        <input
            id="inventory-search"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Buscar por ubicación, pallet, SKU o producto..."
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {successMessage && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="font-medium text-emerald-700">
            {successMessage}
            </p>
        </div>
      )}

      {loading && (
        <div className="rounded-xl border border-slate-200 bg-white p-8">
          <p className="text-slate-500">
            Cargando inventario desde Supabase...
          </p>
        </div>
      )}

      {!loading && errorMessage && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <p className="font-medium text-red-700">
            {errorMessage}
          </p>
        </div>
      )}

      {!loading && !errorMessage && filteredInventory.length === 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-8">
          <p className="text-slate-500">
            {searchTerm.trim()
              ? 'No se encontraron registros que coincidan con la búsqueda.'
              : 'No existen registros disponibles en el inventario.'}
          </p>
        </div>
      )}

      {!loading && !errorMessage && filteredInventory.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Ubicación
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Pallet
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                    SKU
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Producto
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Cantidad
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Estado
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Acción
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredInventory.map((item) => (
                  <tr
                    key={item.inventory.id}
                    className="hover:bg-slate-50"
                  >
                    <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-slate-900">
                      {item.locationCode || 'Sin ubicación'}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">
                      {item.palletNumber || 'Sin código'}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">
                      {item.productSku || 'Sin SKU'}
                    </td>

                    <td className="min-w-64 px-4 py-4 text-sm text-slate-700">
                      {item.productDescription || 'Producto no identificado'}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">
                      {formatQuantityUnit(
                        item.quantity,
                        item.unit
                      )}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4">
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                        {getInventoryStatusLabel(item.inventory.status)}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                        <button
                            type="button"
                            onClick={() => handleRequestPicking(item)}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                            Solicitar surtido
                        </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <PickingRequestModal
        open={selectedItem !== null}
        item={selectedItem}
        onClose={handleClosePickingModal}
        onConfirm={handleConfirmPicking}
        submitting={submittingPicking}
      />
    </div>
  );
}

export default InventoryQueryPage;