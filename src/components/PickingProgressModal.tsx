import { useEffect, useState } from 'react';

import type { EnrichedMovement } from '../utils/enrichMovement';

import { formatQuantityUnit } from '../utils/formatQuantityUnit';

export type PickingProgressData = {
  extractedQuantity: number;
  notes: string;
};

type PickingProgressModalProps = {
  open: boolean;
  movement: EnrichedMovement | null;
  submitting: boolean;
  onClose: () => void;
  onConfirm: (
    movement: EnrichedMovement,
    progress: PickingProgressData
  ) => void;
};

function PickingProgressModal({
  open,
  movement,
  submitting,
  onClose,
  onConfirm,
}: PickingProgressModalProps) {
  const [extractedQuantity, setExtractedQuantity] = useState('');
  const [notes, setNotes] = useState('');
  const [validationMessage, setValidationMessage] = useState('');

  useEffect(() => {
    if (!open || !movement) {
      return;
    }

    setExtractedQuantity('');
    setNotes('');
    setValidationMessage('');
  }, [open, movement]);

  if (!open || !movement) {
    return null;
  }

  const currentMovement = movement;
  const requestedQuantity = movement.quantity ?? 0;

  function handleConfirm() {
    const normalizedQuantity = Number(extractedQuantity);

    if (
      !Number.isFinite(normalizedQuantity) ||
      normalizedQuantity <= 0
    ) {
      setValidationMessage(
        'Captura una cantidad extraída mayor que cero.'
      );
      return;
    }

    if (
      requestedQuantity > 0 &&
      normalizedQuantity >= requestedQuantity
    ) {
      setValidationMessage(
        'La cantidad parcial debe ser menor que la cantidad total solicitada.'
      );
      return;
    }

    setValidationMessage('');

    onConfirm(currentMovement, {
      extractedQuantity: normalizedQuantity,
      notes: notes.trim(),
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              OP-008 — Surtido
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              Confirmación Parcial de Extracción
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              Registra el avance del picking sin finalizar todavía el surtido.
            </p>
          </div>

          <button
            type="button"
            disabled={submitting}
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cerrar
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Producto
            </p>

            <p className="mt-1 font-semibold text-slate-900">
              {movement.productName}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Pallet
            </p>

            <p className="mt-1 font-semibold text-slate-900">
              {movement.palletName}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Ubicación de origen
            </p>

            <p className="mt-1 font-semibold text-slate-900">
              {movement.originName}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Cantidad solicitada
            </p>

            <p className="mt-1 font-semibold text-slate-900">
              {formatQuantityUnit(
                requestedQuantity,
                movement.unit
              )}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <label
            htmlFor="picking-extracted-quantity"
            className="block text-sm font-semibold text-slate-700"
          >
            Cantidad extraída en este avance
          </label>

          <input
            id="picking-extracted-quantity"
            type="number"
            min="0"
            step="any"
            value={extractedQuantity}
            disabled={submitting}
            onChange={(event) =>
              setExtractedQuantity(event.target.value)
            }
            placeholder="Ej. 10"
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
          />

          <p className="mt-2 text-xs text-slate-500">
            Debe ser mayor que cero y menor que la cantidad total solicitada.
          </p>
        </div>

        <div className="mt-4">
          <label
            htmlFor="picking-progress-notes"
            className="block text-sm font-semibold text-slate-700"
          >
            Observaciones del avance
          </label>

          <textarea
            id="picking-progress-notes"
            value={notes}
            disabled={submitting}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Describe el avance parcial, incidencias o condiciones operativas..."
            rows={4}
            className="mt-2 w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
          />
        </div>

        {validationMessage && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-700">
              {validationMessage}
            </p>
          </div>
        )}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            disabled={submitting}
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancelar
          </button>

          <button
            type="button"
            disabled={submitting}
            onClick={handleConfirm}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting
              ? 'Registrando avance...'
              : 'Confirmar avance parcial'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PickingProgressModal;