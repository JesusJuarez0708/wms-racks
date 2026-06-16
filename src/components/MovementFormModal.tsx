import { useEffect, useState } from 'react';

import { executeMovementWorkflow } from '../services/movementWorkflowService';
import { getPallets, type Pallet } from '../services/palletService';
import { getProducts, type Product } from '../services/productService';
import {
  getRackPositions,
  type RackPosition,
} from '../services/rackPositionService';
import { getWarehouses } from '../services/warehouseService';
import {
  getInventory,
  type InventoryItem,
} from '../services/inventoryService';

import {
  evaluateRelocationDecision,
  type RelocationDecision,
} from '../services/decisionEngineService';

type MovementFormModalProps = {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
};

type MovementType =
  | 'entrada'
  | 'salida'
  | 'reubicacion'
  | 'ajuste'
  | 'bloqueo'
  | 'desbloqueo';

function MovementFormModal({
  open,
  onClose,
  onCreated,
}: MovementFormModalProps) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [warehouseId, setWarehouseId] = useState('');
  const [movementType, setMovementType] = useState<MovementType>('entrada');
  const [productId, setProductId] = useState('');
  const [palletId, setPalletId] = useState('');
  const [originPositionId, setOriginPositionId] = useState('');
  const [destinationPositionId, setDestinationPositionId] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [unit, setUnit] = useState('CAJA');
  const [notes, setNotes] = useState('');

  const [products, setProducts] = useState<Product[]>([]);
  const [pallets, setPallets] = useState<Pallet[]>([]);
  const [positions, setPositions] = useState<RackPosition[]>([]);
  
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [relocationDecision, setRelocationDecision] =
    useState<RelocationDecision | null>(null);

  useEffect(() => {
    if (!open) return;

    async function loadOptions() {
      try {
        setLoading(true);

        const [warehouses, productsData, palletsData, positionsData, inventoryData] =
          await Promise.all([
            getWarehouses(),
            getProducts(),
            getPallets(),
            getRackPositions(),
            getInventory(),
          ]);

        setWarehouseId(warehouses[0]?.id ?? '');
        setProducts(productsData);
        setPallets(palletsData);
        setPositions(positionsData);
        setInventory(inventoryData);

        setProductId(productsData[0]?.id ?? '');
        setPalletId(palletsData[0]?.id ?? '');
        setDestinationPositionId(positionsData[0]?.id ?? '');
      } catch (error) {
        console.error('Error cargando opciones de movimiento:', error);
      } finally {
        setLoading(false);
      }
    }

    loadOptions();
  }, [open]);

  useEffect(() => {
    if (movementType !== 'reubicacion') {
      setRelocationDecision(null);
      return;
    }

    if (!originPositionId || !destinationPositionId) {
      setRelocationDecision(null);
      return;
    }

    const originInventory = inventory.find(
      (item) =>
        item.rack_position_id === originPositionId &&
        item.status === 'available'
    );

    const destinationInventory = inventory.find(
      (item) =>
        item.rack_position_id === destinationPositionId &&
        item.status === 'available'
    );

    const destinationPosition = positions.find(
      (position) => position.id === destinationPositionId
    );

    const selectedProduct = products.find(
      (product) => product.id === productId
    );

    const decision = evaluateRelocationDecision({
      originLocationCode:
        positions.find((position) => position.id === originPositionId)?.code ??
        'Sin origen',
      destinationLocationCode: destinationPosition?.code ?? 'Sin destino',
      originIsOccupied: Boolean(originInventory),
      destinationIsOccupied: Boolean(destinationInventory),
      productSku: selectedProduct?.sku ?? null,
      productRotation: selectedProduct?.rotation ?? null,
      destinationRackType: destinationPosition?.rack_type ?? null,
      destinationLineOccupancyPercentage: null,
      destinationDepth: destinationPosition?.depth ?? null,
      maxDepth: destinationPosition?.max_depth ?? null,
      sameSkuInDestinationLine: false,
    });

    setRelocationDecision(decision);
  }, [
    movementType,
    originPositionId,
    destinationPositionId,
    productId,
    inventory,
    positions,
    products,
  ]);

  if (!open) return null;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!warehouseId) {
      alert('No hay almacén disponible.');
      return;
    }

    try {
      setSaving(true);

      await executeMovementWorkflow({
        warehouse_id: warehouseId,
        movement_type: movementType,
        product_id: productId || null,
        pallet_id: palletId || null,
        origin_position_id: originPositionId || null,
        destination_position_id: destinationPositionId || null,
        quantity: Number(quantity) || null,
        unit: unit || null,
        status: 'completed',
        reason: 'Movimiento manual',
        notes: notes || null,
        decision_score: 60,
        decision_explanation:
          'Movimiento capturado manualmente desde pantalla de Movimientos.',
        created_by: 'Usuario CJWMS',
      });

      alert('Movimiento creado e inventario actualizado correctamente.');

      onCreated();
      onClose();
    } catch (error) {
      console.error('Error creando movimiento:', error);
      alert('No se pudo crear el movimiento.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="w-full max-w-4xl rounded-3xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              CJWMS
            </p>

            <h2 className="text-2xl font-bold text-slate-900">
              Nuevo movimiento
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Captura un movimiento real y guárdalo en Supabase.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
          >
            Cerrar
          </button>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
            Cargando opciones desde Supabase...
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid gap-4 md:grid-cols-2"
          >
            <div>
              <label className="text-sm font-semibold text-slate-600">
                Tipo de movimiento
              </label>

              <select
                value={movementType}
                onChange={(event) =>
                  setMovementType(event.target.value as MovementType)
                }
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
              >
                <option value="entrada">Entrada</option>
                <option value="salida">Salida</option>
                <option value="reubicacion">Reubicación</option>
                <option value="ajuste">Ajuste</option>
                <option value="bloqueo">Bloqueo</option>
                <option value="desbloqueo">Desbloqueo</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Producto
              </label>

              <select
                value={productId}
                onChange={(event) => setProductId(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
              >
                <option value="">Sin producto</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.sku} - {product.description}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Pallet
              </label>

              <select
                value={palletId}
                onChange={(event) => setPalletId(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
              >
                <option value="">Sin pallet</option>
                {pallets.map((pallet) => (
                  <option key={pallet.id} value={pallet.id}>
                    {pallet.pallet_code} · {pallet.lot ?? 'Sin lote'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Cantidad
              </label>

              <input
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                type="number"
                min="0"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Origen
              </label>

              <select
                value={originPositionId}
                onChange={(event) => setOriginPositionId(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
              >
                <option value="">Sin origen</option>
                {positions.map((position) => (
                  <option key={position.id} value={position.id}>
                    {position.code}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Destino
              </label>

              <select
                value={destinationPositionId}
                onChange={(event) =>
                  setDestinationPositionId(event.target.value)
                }
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
              >
                <option value="">Sin destino</option>
                {positions.map((position) => (
                  <option key={position.id} value={position.id}>
                    {position.code}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Unidad
              </label>

              <input
                value={unit}
                onChange={(event) => setUnit(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Notas
              </label>

              <input
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Notas del movimiento"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            {relocationDecision && (
              <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 md:col-span-2">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
                      🧠 Análisis CJWMS
                    </p>

                    <h3 className="mt-2 text-xl font-black text-blue-950">
                      {relocationDecision.explanation.recommendation}
                    </h3>

                    <p className="mt-2 text-sm font-semibold text-blue-900">
                      {relocationDecision.explanation.interpretation}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white px-4 py-3 text-center shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                      Confianza
                    </p>

                    <p className="text-2xl font-black text-blue-700">
                      {relocationDecision.explanation.confidence}/100
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl bg-white p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                      Observé
                    </p>

                    <div className="mt-3 space-y-2">
                      {relocationDecision.explanation.observed.map((item) => (
                        <p key={item} className="text-sm font-semibold text-slate-700">
                          👀 {item}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                      Porque
                    </p>

                    <div className="mt-3 space-y-2">
                      {relocationDecision.explanation.reasons.map((reason) => (
                        <p
                          key={reason.message}
                          className={`rounded-xl px-3 py-2 text-sm font-semibold ${
                            reason.type === 'positive'
                              ? 'bg-emerald-50 text-emerald-700'
                              : reason.type === 'warning'
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-red-50 text-red-700'
                          }`}
                        >
                          {reason.type === 'positive'
                            ? '✅'
                            : reason.type === 'warning'
                            ? '⚠️'
                            : '❌'}{' '}
                          {reason.message}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white p-4 md:col-span-2">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                      Beneficio esperado
                    </p>

                    <div className="mt-3 grid gap-2 md:grid-cols-3">
                      {relocationDecision.explanation.expectedBenefits.map((benefit) => (
                        <p
                          key={benefit}
                          className="rounded-xl bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700"
                        >
                          📈 {benefit}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-sm font-semibold text-blue-900">
                  La decisión final siempre será del operador.
                </p>
              </div>
            )}

            <div className="flex justify-end gap-3 md:col-span-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
              >
                {saving ? 'Guardando...' : 'Guardar movimiento'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default MovementFormModal;