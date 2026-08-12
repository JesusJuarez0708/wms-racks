import { useEffect, useMemo, useState } from 'react';

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

import { formatQuantityUnit } from '../utils/formatQuantityUnit';

import {
  rankPalletDestinationPositions,
} from '../services/locationRecommendationService';

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

function normalizeUnit(unit: string | null | undefined): string {
  return unit?.trim().toUpperCase() ?? '';
}

function MovementFormModal({
  open,
  onClose,
  onCreated,
}: MovementFormModalProps) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [warehouseId, setWarehouseId] = useState('');
  const [movementType, setMovementType] =
    useState<MovementType>('entrada');

  const [productId, setProductId] = useState('');
  const [palletId, setPalletId] = useState('');
  const [originPositionId, setOriginPositionId] = useState('');
  const [destinationPositionId, setDestinationPositionId] =
    useState('');

  const [quantity, setQuantity] = useState('1');
  const [unit, setUnit] = useState('CAJA');
  const [notes, setNotes] = useState('');
  const [
    recommendationDeviationReason,
    setRecommendationDeviationReason,
  ] = useState('');
  const [formError, setFormError] = useState('');

  const [products, setProducts] = useState<Product[]>([]);
  const [pallets, setPallets] = useState<Pallet[]>([]);
  const [positions, setPositions] = useState<RackPosition[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  const [relocationDecision, setRelocationDecision] =
    useState<RelocationDecision | null>(null);

  const selectedPallet = useMemo(
    () => pallets.find((pallet) => pallet.id === palletId) ?? null,
    [pallets, palletId]
  );

  const selectedInventoryItem = useMemo(
    () =>
      inventory.find((item) => item.pallet_id === palletId) ?? null,
    [inventory, palletId]
  );

  const selectedOriginPosition = useMemo(
    () =>
      positions.find(
        (position) =>
          position.id === selectedInventoryItem?.rack_position_id
      ) ?? null,
    [positions, selectedInventoryItem]
  );

  const selectedProduct = useMemo(
    () =>
      products.find(
        (product) =>
          product.id === selectedPallet?.product_id
      ) ?? null,
    [products, selectedPallet]
  );

  const relocationRecommendation = useMemo(() => {
    if (
      movementType !== 'reubicacion' ||
      !warehouseId ||
      !selectedPallet ||
      !selectedProduct ||
      !selectedOriginPosition
    ) {
      return null;
    }

    return rankPalletDestinationPositions({
      warehouseId,
      pallet: selectedPallet,
      product: selectedProduct,
      pallets,
      positions,
      inventory,
      originPositionId: selectedOriginPosition.id,
    });
  }, [
    movementType,
    warehouseId,
    selectedPallet,
    selectedProduct,
    selectedOriginPosition,
    pallets,
    positions,
    inventory,
  ]);

  const destinationPositions = useMemo(() => {
    if (
      movementType === 'reubicacion' &&
      relocationRecommendation
    ) {
      return relocationRecommendation.candidates.map(
        (candidate) => candidate.position
      );
    }

    return positions;
  }, [
    movementType,
    relocationRecommendation,
    positions,
  ]);

  const primaryRecommendationCandidate =
  movementType === 'reubicacion'
    ? relocationRecommendation?.candidates[0] ?? null
    : null;

  const recommendationDeviationDetected =
    Boolean(primaryRecommendationCandidate) &&
    Boolean(destinationPositionId) &&
    primaryRecommendationCandidate?.position.id !==
      destinationPositionId;

  useEffect(() => {
    if (
      movementType !== 'reubicacion' ||
      !relocationRecommendation
    ) {
      return;
    }

    const destinationIsStillValid =
      relocationRecommendation.candidates.some(
        (candidate) =>
          candidate.position.id === destinationPositionId
      );

    if (destinationIsStillValid) {
      return;
    }

    setDestinationPositionId(
      relocationRecommendation.candidates[0]?.position.id ?? ''
    );
  }, [
    movementType,
    relocationRecommendation,
    destinationPositionId,
  ]);

  useEffect(() => {
    if (!recommendationDeviationDetected) {
      setRecommendationDeviationReason('');
    }
  }, [recommendationDeviationDetected]);

  const operationalPallets = useMemo(() => {
    if (movementType === 'entrada') {
      return pallets;
    }

    const validStatuses: InventoryItem['status'][] =
      movementType === 'desbloqueo'
        ? ['blocked']
        : movementType === 'ajuste'
          ? ['available', 'reserved', 'blocked']
          : ['available'];

    const operationalPalletIds = new Set(
      inventory
        .filter((item) => validStatuses.includes(item.status))
        .map((item) => item.pallet_id)
    );

    return pallets.filter((pallet) => {
      if (!operationalPalletIds.has(pallet.id)) {
        return false;
      }

      if (movementType === 'salida') {
        return (
          pallet.status === 'active' &&
          pallet.quantity !== null &&
          pallet.quantity > 0
        );
      }

      return true;
    });
  }, [movementType, pallets, inventory]);

  const productFilteredPallets = useMemo(() => {
    if (movementType !== 'salida' || !productId) {
      return operationalPallets;
    }

    return operationalPallets
      .filter((pallet) => pallet.product_id === productId)
      .sort((first, second) => {
        const firstQuantity = first.quantity ?? 0;
        const secondQuantity = second.quantity ?? 0;

        if (firstQuantity !== secondQuantity) {
          return firstQuantity - secondQuantity;
        }

        return first.pallet_code.localeCompare(second.pallet_code);
      });
  }, [movementType, operationalPallets, productId]);

  const availableQuantityForProduct = useMemo(() => {
    if (movementType !== 'salida') {
      return 0;
    }

    const normalizedSelectedUnit = normalizeUnit(unit);

    return productFilteredPallets.reduce((total, pallet) => {
      if (
        normalizeUnit(pallet.unit) !== normalizedSelectedUnit ||
        pallet.quantity === null
      ) {
        return total;
      }

      return total + pallet.quantity;
    }, 0);
  }, [movementType, productFilteredPallets, unit]);

  const selectedPalletQuantity =
    selectedPallet?.quantity ?? null;

  const movementRequiresOperationalPallet =
    movementType === 'salida' ||
    movementType === 'reubicacion' ||
    movementType === 'bloqueo' ||
    movementType === 'desbloqueo';

  const validationMessage = useMemo(() => {
    if (loading) {
      return '';
    }

    if (!warehouseId) {
      return 'No existe un almacén disponible.';
    }

    if (
      movementType === 'salida' &&
      !productId
    ) {
      return 'Selecciona el producto que será surtido.';
    }

    if (
      movementType === 'salida' &&
      productFilteredPallets.length === 0
    ) {
      return 'No existen pallets disponibles para el producto seleccionado.';
    }

    if (
      movementRequiresOperationalPallet &&
      !palletId
    ) {
      return 'No existe un pallet operativo disponible para esta operación.';
    }

    if (
      palletId &&
      !operationalPallets.some(
        (pallet) => pallet.id === palletId
      )
    ) {
      return 'El pallet seleccionado ya no está disponible para esta operación.';
    }

    if (
      movementType !== 'entrada' &&
      palletId &&
      !selectedInventoryItem
    ) {
      return 'El pallet seleccionado no tiene inventario operativo asociado.';
    }

    if (
      movementType === 'salida' &&
      selectedPallet &&
      selectedPallet.product_id !== productId
    ) {
      return 'El pallet seleccionado no corresponde al producto solicitado.';
    }

    const numericQuantity = Number(quantity);

    if (
      !Number.isFinite(numericQuantity) ||
      numericQuantity <= 0
    ) {
      return 'La cantidad debe ser un número mayor que cero.';
    }

    if (
      movementType === 'salida' &&
      !normalizeUnit(unit)
    ) {
      return 'El pallet seleccionado no tiene una unidad válida.';
    }

    if (
      movementType === 'salida' &&
      availableQuantityForProduct < numericQuantity
    ) {
      return `El pallet seleccionado dispone únicamente de ${
        selectedPalletQuantity ?? 0
      } ${normalizeUnit(
        unit
      )}. La cantidad solicitada es ${numericQuantity}.`;
    }

    if (
      movementType === 'salida' &&
      !originPositionId
    ) {
      return 'No fue posible determinar el origen del pallet seleccionado.';
    }

    return '';
  }, [
    loading,
    warehouseId,
    movementType,
    productId,
    productFilteredPallets,
    movementRequiresOperationalPallet,
    palletId,
    operationalPallets,
    selectedInventoryItem,
    selectedPallet,
    quantity,
    unit,
    availableQuantityForProduct,
    originPositionId,
  ]);

  const canSubmit =
    !loading &&
    !saving &&
    !validationMessage;

  useEffect(() => {
    if (!open) return;

    async function loadOptions() {
      try {
        setLoading(true);
        setFormError('');

        const [
          warehouses,
          productsData,
          palletsData,
          positionsData,
          inventoryData,
        ] = await Promise.all([
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

        setMovementType('entrada');
        setProductId(productsData[0]?.id ?? '');
        setPalletId('');
        setOriginPositionId('');
        setDestinationPositionId(positionsData[0]?.id ?? '');
        setQuantity('1');
        setUnit('CAJA');
        setNotes('');
        setRecommendationDeviationReason('');
      } catch (error) {
        console.error(
          'Error cargando opciones de movimiento:',
          error
        );

        setFormError(
          error instanceof Error
            ? error.message
            : 'No fue posible cargar las opciones del movimiento.'
        );
      } finally {
        setLoading(false);
      }
    }

    loadOptions();
  }, [open]);

  useEffect(() => {
    if (!open || loading) return;

    setFormError('');

    if (movementType === 'entrada') {
      setOriginPositionId('');
      return;
    }

    const selectedPalletIsValid = operationalPallets.some(
      (pallet) => pallet.id === palletId
    );

    if (!selectedPalletIsValid) {
      setPalletId('');
    }
  }, [
    open,
    loading,
    movementType,
    operationalPallets,
    palletId,
  ]);

  useEffect(() => {
    if (
      !open ||
      loading ||
      movementType !== 'salida'
    ) {
      return;
    }

    const palletBelongsToSelectedProduct =
      productFilteredPallets.some(
        (pallet) => pallet.id === palletId
      );

    if (!palletBelongsToSelectedProduct) {
      setPalletId(productFilteredPallets[0]?.id ?? '');
    }
  }, [
    open,
    loading,
    movementType,
    productId,
    productFilteredPallets,
    palletId,
  ]);

  useEffect(() => {
    if (
      !open ||
      loading ||
      movementType === 'entrada' ||
      !selectedPallet
    ) {
      return;
    }

    setProductId(selectedPallet.product_id);
    setUnit(normalizeUnit(selectedPallet.unit));

    const palletInventory = inventory.find(
      (item) => item.pallet_id === selectedPallet.id
    );

    setOriginPositionId(
      palletInventory?.rack_position_id ?? ''
    );
  }, [
    open,
    loading,
    movementType,
    selectedPallet,
    inventory,
  ]);

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
        positions.find(
          (position) => position.id === originPositionId
        )?.code ?? 'Sin origen',
      destinationLocationCode:
        destinationPosition?.code ?? 'Sin destino',
      originIsOccupied: Boolean(originInventory),
      destinationIsOccupied: Boolean(destinationInventory),
      productSku: selectedProduct?.sku ?? null,
      productRotation: selectedProduct?.rotation ?? null,
      destinationRackType:
        destinationPosition?.rack_type ?? null,
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

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setFormError('');

    if (validationMessage) {
      setFormError(validationMessage);
      return;
    }

    if (
      recommendationDeviationDetected &&
      !recommendationDeviationReason.trim()
    ) {
      setFormError(
        'Debes indicar el motivo por el que no se seguirá la recomendación principal de CJWMS.'
      );
      return;
    }

    try {
      setSaving(true);

      const selectedRecommendationCandidate =
        movementType === 'reubicacion'
          ? relocationRecommendation?.candidates.find(
              (candidate) =>
                candidate.position.id === destinationPositionId
            ) ?? null
          : null;

      const movementDecisionScore =
        selectedRecommendationCandidate?.decision.score ?? 60;

      const movementDecisionExplanation =
        selectedRecommendationCandidate
          ? [
              `Reubicación evaluada por CJWMS para la posición ${selectedRecommendationCandidate.position.code}.`,
              `Recomendación: ${selectedRecommendationCandidate.decision.explanation.recommendation}`,
              `Interpretación: ${selectedRecommendationCandidate.decision.explanation.interpretation}`,
              `Confianza: ${selectedRecommendationCandidate.decision.explanation.confidence}/100.`,
            ].join(' ')
          : 'Movimiento capturado manualmente desde pantalla de Movimientos.';

      const movementRecommendationId =
        selectedRecommendationCandidate
          ? crypto.randomUUID()
          : null;

      await executeMovementWorkflow(
        {
          warehouse_id: warehouseId,
          movement_type: movementType,
          product_id: productId || null,
          pallet_id: palletId || null,
          origin_position_id: originPositionId || null,
          destination_position_id:
            destinationPositionId || null,
          quantity: Number(quantity),
          unit: normalizeUnit(unit) || null,
          status:
            movementType === 'salida'
              ? 'pending'
              : 'completed',
          reason: 'Movimiento manual',
          notes: notes || null,
          decision_score: movementDecisionScore,
          decision_explanation: movementDecisionExplanation,
          recommendation_id: movementRecommendationId,
          created_by: 'Usuario CJWMS',
        },
        primaryRecommendationCandidate
          ? {
              recommendedDestinationPositionId:
                primaryRecommendationCandidate.position.id,
              recommendedDestinationPositionCode:
                primaryRecommendationCandidate.position.code,
              recommendationDeviationReason:
                recommendationDeviationDetected
                  ? recommendationDeviationReason.trim()
                  : null,
            }
          : undefined
      );

      alert(
        'Movimiento creado e inventario actualizado correctamente.'
      );

      onCreated();
      onClose();
    } catch (error) {
      console.error('Error creando movimiento:', error);

      setFormError(
        error instanceof Error
          ? error.message
          : 'No se pudo crear el movimiento.'
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="max-h-[95vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white p-6 shadow-xl">
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
            type="button"
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
                onChange={(event) => {
                  const nextMovementType =
                    event.target.value as MovementType;

                  setMovementType(nextMovementType);
                  setPalletId('');
                  setOriginPositionId('');
                  setDestinationPositionId(
                    nextMovementType === 'salida'
                      ? ''
                      : positions[0]?.id ?? ''
                  );
                  setFormError('');
                }}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
              >
                <option value="entrada">Entrada</option>
                <option value="salida">Salida</option>
                <option value="reubicacion">
                  Reubicación
                </option>
                <option value="ajuste">Ajuste</option>
                <option value="bloqueo">Bloqueo</option>
                <option value="desbloqueo">
                  Desbloqueo
                </option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Producto
              </label>

              <select
                value={productId}
                onChange={(event) => {
                  setProductId(event.target.value);
                  setFormError('');
                }}
                disabled={
                  movementType !== 'entrada' &&
                  movementType !== 'salida'
                }
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-slate-100"
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
                onChange={(event) => {
                  setPalletId(event.target.value);
                  setFormError('');
                }}
                disabled={
                  movementType === 'salida'
                    ? !productId ||
                      productFilteredPallets.length === 0
                    : operationalPallets.length === 0
                }
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
              >
                <option value="">
                  {(movementType === 'salida'
                    ? productFilteredPallets
                    : operationalPallets
                  ).length === 0
                    ? 'Sin pallets operativos disponibles'
                    : 'Selecciona un pallet'}
                </option>

                {(movementType === 'salida'
                  ? productFilteredPallets
                  : operationalPallets
                ).map((pallet) => (
                  <option key={pallet.id} value={pallet.id}>
                    {pallet.pallet_code} ·{' '}
                    {pallet.lot ?? 'Sin lote'}
                    {pallet.quantity !== null
                      ? ` · ${pallet.quantity} ${
                          pallet.unit ?? ''
                        }`
                      : ''}
                  </option>
                ))}
              </select>

              {movementType === 'salida' &&
                productId &&
                productFilteredPallets.length === 0 && (
                  <p className="mt-2 text-xs font-semibold text-amber-700">
                    No hay pallets disponibles para el producto
                    seleccionado.
                  </p>
                )}
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Cantidad solicitada
              </label>

              <input
                value={quantity}
                onChange={(event) => {
                  setQuantity(event.target.value);
                  setFormError('');
                }}
                type="number"
                min="0.0001"
                step="0.0001"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
              />

              {movementType === 'salida' && productId && (
                <p className="mt-2 text-xs font-semibold text-slate-500">
                  Existencia total disponible:{' '}
                  {formatQuantityUnit(
                    availableQuantityForProduct,
                    unit
                  )}
                </p>
              )}

              {movementType === 'salida' &&
                selectedPalletQuantity !== null && (
                  <p className="mt-1 text-xs font-semibold text-blue-700">
                    Disponible en el pallet seleccionado:{' '}
                    {formatQuantityUnit(
                      selectedPalletQuantity,
                      selectedPallet?.unit
                    )}
                  </p>
                )}
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Origen
              </label>

              <select
                value={originPositionId}
                onChange={(event) =>
                  setOriginPositionId(event.target.value)
                }
                disabled={movementType !== 'entrada'}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-slate-100"
              >
                <option value="">
                  {movementType === 'entrada'
                    ? 'Sin origen'
                    : 'Origen determinado por el pallet'}
                </option>

                {positions.map((position) => (
                  <option key={position.id} value={position.id}>
                    {position.code}
                  </option>
                ))}
              </select>

              {movementType !== 'entrada' &&
                selectedOriginPosition && (
                  <p className="mt-2 text-xs font-semibold text-blue-700">
                    Ubicación actual: {selectedOriginPosition.code}
                  </p>
                )}
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
                disabled={
                  movementType === 'salida' ||
                  movementType === 'bloqueo' ||
                  movementType === 'desbloqueo'
                }
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-slate-100"
              >
                <option value="">Sin destino</option>

                {destinationPositions.map((position) => {
                  const recommendationCandidate =
                    relocationRecommendation?.candidates.find(
                      (candidate) =>
                        candidate.position.id === position.id
                    );

                  return (
                    <option key={position.id} value={position.id}>
                      {position.code}
                      {recommendationCandidate
                        ? ` — Score ${recommendationCandidate.decision.score}`
                        : ''}
                    </option>
                  );
                })}
              </select>

              {movementType === 'reubicacion' &&
                selectedPallet &&
                relocationRecommendation && (
                  <div className="mt-2 space-y-1">
                    <p className="text-xs font-semibold text-emerald-700">
                      {relocationRecommendation.eligiblePositions}{' '}
                      destinos físicamente válidos disponibles.
                    </p>

                    {relocationRecommendation.candidates[0] && (
                      <p className="text-xs font-semibold text-blue-700">
                        Recomendación CJWMS:{' '}
                        {
                          relocationRecommendation.candidates[0]
                            .position.code
                        }{' '}
                        — Score{' '}
                        {
                          relocationRecommendation.candidates[0]
                            .decision.score
                        }
                      </p>
                    )}

                    {relocationRecommendation.eligiblePositions === 0 && (
                      <p className="text-xs font-semibold text-red-700">
                        No existen destinos físicamente compatibles para
                        este pallet.
                      </p>
                    )}
                  </div>
                )}

                {recommendationDeviationDetected &&
                  primaryRecommendationCandidate && (
                    <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3">
                      <p className="text-xs font-bold uppercase tracking-wide text-amber-800">
                        Desviación de recomendación
                      </p>

                      <p className="mt-1 text-xs text-amber-800">
                        CJWMS recomienda{' '}
                        <span className="font-semibold">
                          {primaryRecommendationCandidate.position.code}
                        </span>
                        , pero se seleccionó un destino diferente.
                      </p>

                      <label className="mt-3 block text-xs font-semibold text-amber-900">
                        Motivo de la desviación
                      </label>

                      <input
                        value={recommendationDeviationReason}
                        onChange={(event) =>
                          setRecommendationDeviationReason(event.target.value)
                        }
                        placeholder="Ej. instrucción operativa, condición observada o prioridad del momento"
                        className="mt-2 w-full rounded-xl border border-amber-300 bg-white px-3 py-2 text-sm outline-none focus:border-amber-500"
                      />
                    </div>
                  )}

            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Unidad
              </label>

              <input
                value={unit}
                onChange={(event) => setUnit(event.target.value)}
                readOnly={movementType !== 'entrada'}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 read-only:cursor-not-allowed read-only:bg-slate-100"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Notas
              </label>

              <input
                value={notes}
                onChange={(event) =>
                  setNotes(event.target.value)
                }
                placeholder="Notas del movimiento"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            {(validationMessage || formError) && (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 md:col-span-2">
                <p className="text-sm font-semibold text-amber-800">
                  ⚠️ {formError || validationMessage}
                </p>
              </div>
            )}

            {movementType === 'salida' &&
              selectedPallet &&
              selectedInventoryItem && (
                <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 md:col-span-2">
                  <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
                    Resumen operativo
                  </p>

                  <div className="mt-3 grid gap-3 text-sm md:grid-cols-4">
                    <p className="font-semibold text-blue-950">
                      Pallet:
                      <br />
                      {selectedPallet.pallet_code}
                    </p>

                    <p className="font-semibold text-blue-950">
                      Origen:
                      <br />
                      {selectedOriginPosition?.code ??
                        'Sin ubicación'}
                    </p>

                    <p className="font-semibold text-blue-950">
                      Disponible:
                      <br />
                      {selectedPallet.quantity ?? 0}{' '}
                      {normalizeUnit(selectedPallet.unit)}
                    </p>

                    <p className="font-semibold text-blue-950">
                      Estado:
                      <br />
                      {selectedInventoryItem.status}
                    </p>
                  </div>
                </div>
              )}

            {relocationDecision && (
              <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 md:col-span-2">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
                      🧠 Análisis CJWMS
                    </p>

                    <h3 className="mt-2 text-xl font-black text-blue-950">
                      {
                        relocationDecision.explanation
                          .recommendation
                      }
                    </h3>

                    <p className="mt-2 text-sm font-semibold text-blue-900">
                      {
                        relocationDecision.explanation
                          .interpretation
                      }
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white px-4 py-3 text-center shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                      Confianza
                    </p>

                    <p className="text-2xl font-black text-blue-700">
                      {
                        relocationDecision.explanation
                          .confidence
                      }
                      /100
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl bg-white p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                      Observé
                    </p>

                    <div className="mt-3 space-y-2">
                      {relocationDecision.explanation.observed.map(
                        (item) => (
                          <p
                            key={item}
                            className="text-sm font-semibold text-slate-700"
                          >
                            👀 {item}
                          </p>
                        )
                      )}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                      Porque
                    </p>

                    <div className="mt-3 space-y-2">
                      {relocationDecision.explanation.reasons.map(
                        (reason) => (
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
                        )
                      )}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white p-4 md:col-span-2">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                      Beneficio esperado
                    </p>

                    <div className="mt-3 grid gap-2 md:grid-cols-3">
                      {relocationDecision.explanation.expectedBenefits.map(
                        (benefit) => (
                          <p
                            key={benefit}
                            className="rounded-xl bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700"
                          >
                            📈 {benefit}
                          </p>
                        )
                      )}
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
                disabled={!canSubmit}
                className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving
                  ? 'Guardando...'
                  : 'Guardar movimiento'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default MovementFormModal;