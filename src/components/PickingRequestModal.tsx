import { useEffect, useState } from 'react';

import type { InventoryQueryItem } from '../services/inventoryService';

import { formatQuantityUnit } from '../utils/formatQuantityUnit';

type PickingRequestModalProps = {
  open: boolean;
  item: InventoryQueryItem | null;
  submitting: boolean;
  onClose: () => void;
  onConfirm: (item: InventoryQueryItem) => void;
};

function PickingRequestModal({
  open,
  item,
  submitting,
  onClose,
  onConfirm,
}: PickingRequestModalProps) {
  const [requestedQuantity, setRequestedQuantity] = useState('');

  useEffect(() => {
    if (open && item) {
      setRequestedQuantity('');
    }
  }, [open, item]);

  if (!open || !item) {
    return null;
  }

  const availableQuantity = Number(item.quantity);
  const numericRequestedQuantity = Number(requestedQuantity);

  const hasValidRequestedQuantity =
    requestedQuantity.trim() !== '' &&
    Number.isFinite(numericRequestedQuantity) &&
    numericRequestedQuantity > 0 &&
    numericRequestedQuantity <= availableQuantity;

  let quantityError = '';

  if (requestedQuantity.trim() !== '') {
    if (
      !Number.isFinite(numericRequestedQuantity) ||
      numericRequestedQuantity <= 0
    ) {
      quantityError =
        'La cantidad solicitada debe ser mayor que cero.';
    } else if (numericRequestedQuantity > availableQuantity) {
      quantityError =
        `La cantidad solicitada no puede superar las ${formatQuantityUnit(
          availableQuantity,
          item.unit
        )} disponibles.`;
    }
  }

  function handleConfirm() {
    if (!item || !hasValidRequestedQuantity) {
      return;
    }

    onConfirm({
      ...item,
      quantity: numericRequestedQuantity,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
              OP-008 — Surtido
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              Confirmar solicitud de surtido
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              Revisa la mercancía seleccionada e indica la cantidad
              que será solicitada.
            </p>
          </div>

          <button
            type="button"
            disabled={submitting}
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            Cerrar
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Ubicación
            </p>

            <p className="mt-1 font-semibold text-slate-900">
              {item.locationCode || 'Sin ubicación'}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Pallet
            </p>

            <p className="mt-1 font-semibold text-slate-900">
              {item.palletNumber || 'Sin código'}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              SKU
            </p>

            <p className="mt-1 font-semibold text-slate-900">
              {item.productSku || 'Sin SKU'}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Cantidad disponible
            </p>

            <p className="mt-1 font-semibold text-slate-900">
              {formatQuantityUnit(
                item.quantity,
                item.unit
              )}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-slate-200 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Producto
          </p>

          <p className="mt-1 font-semibold text-slate-900">
            {item.productDescription || 'Producto no identificado'}
          </p>
        </div>

        <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4">
          <label
            htmlFor="requested-picking-quantity"
            className="text-xs font-semibold uppercase tracking-wide text-slate-600"
          >
            Cantidad solicitada
          </label>

          <div className="mt-2 flex items-center gap-3">
            <input
              id="requested-picking-quantity"
              type="number"
              min="0"
              step="any"
              max={availableQuantity}
              value={requestedQuantity}
              disabled={submitting}
              onChange={(event) =>
                setRequestedQuantity(event.target.value)
              }
              placeholder="Ej. 20"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />

            <span className="min-w-fit font-semibold text-slate-700">
              {item.unit ? `${item.unit}(S)` : ''}
            </span>
          </div>

          {quantityError ? (
            <p className="mt-2 text-sm font-medium text-red-600">
              {quantityError}
            </p>
          ) : (
            <p className="mt-2 text-sm text-slate-600">
              Disponible:{' '}
              {formatQuantityUnit(
                availableQuantity,
                item.unit
              )}
            </p>
          )}
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            disabled={submitting}
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancelar
          </button>

          <button
            type="button"
            disabled={submitting || !hasValidRequestedQuantity}
            onClick={handleConfirm}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting
              ? 'Generando solicitud...'
              : 'Confirmar solicitud'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PickingRequestModal;