import { useEffect, useState } from 'react';

import type { EnrichedMovement } from '../utils/enrichMovement';

import { formatQuantityUnit } from '../utils/formatQuantityUnit';

export type PickingAssignmentData = {
  operatorId: string;
  forkliftUnitId: string;
  notes: string;
};

type PickingAssignmentModalProps = {
  open: boolean;
  movement: EnrichedMovement | null;
  submitting: boolean;
  onClose: () => void;
  onConfirm: (
    movement: EnrichedMovement,
    assignment: PickingAssignmentData
  ) => void;
};

function PickingAssignmentModal({
  open,
  movement,
  submitting,
  onClose,
  onConfirm,
}: PickingAssignmentModalProps) {
  const [operatorId, setOperatorId] = useState('');
  const [forkliftUnitId, setForkliftUnitId] = useState('');
  const [notes, setNotes] = useState('');
  const [validationMessage, setValidationMessage] = useState('');

  useEffect(() => {
    if (!open || !movement) {
      return;
    }

    setOperatorId(movement.operator_id ?? '');
    setForkliftUnitId(movement.forklift_unit_id ?? '');
    setNotes(movement.notes ?? '');
    setValidationMessage('');
  }, [open, movement]);

  if (!open || !movement) {
    return null;
  }

  const currentMovement = movement;

  function handleConfirm() {
    const normalizedOperator = operatorId.trim();

    if (!normalizedOperator) {
      setValidationMessage(
        'Captura el nombre del operador responsable del picking.'
      );
      return;
    }

    setValidationMessage('');

    onConfirm(currentMovement, {
    operatorId: normalizedOperator,
    forkliftUnitId: forkliftUnitId.trim(),
    notes: notes.trim(),
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-violet-600">
              OP-008 — Surtido
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              Asignación Operativa de Picking
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              Asigna un operador a la solicitud de surtido pendiente.
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
              Cantidad
            </p>

            <p className="mt-1 font-semibold text-slate-900">
              {formatQuantityUnit(
                movement.quantity ?? 0,
                movement.unit
              )}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="picking-operator"
              className="block text-sm font-semibold text-slate-700"
            >
              Operador asignado
            </label>

            <input
              id="picking-operator"
              type="text"
              value={operatorId}
              disabled={submitting}
              onChange={(event) => setOperatorId(event.target.value)}
              placeholder="Nombre del operador"
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 disabled:cursor-not-allowed disabled:bg-slate-100"
            />
          </div>

          <div>
            <label
              htmlFor="picking-forklift"
              className="block text-sm font-semibold text-slate-700"
            >
              Unidad de montacargas
            </label>

            <input
              id="picking-forklift"
              type="text"
              value={forkliftUnitId}
              disabled={submitting}
              onChange={(event) => setForkliftUnitId(event.target.value)}
              placeholder="Ej. MC-01"
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 disabled:cursor-not-allowed disabled:bg-slate-100"
            />
          </div>
        </div>

        <div className="mt-4">
          <label
            htmlFor="picking-notes"
            className="block text-sm font-semibold text-slate-700"
          >
            Observaciones
          </label>

          <textarea
            id="picking-notes"
            value={notes}
            disabled={submitting}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Indicaciones operativas para el picking..."
            rows={4}
            className="mt-2 w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 disabled:cursor-not-allowed disabled:bg-slate-100"
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
            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting
              ? 'Asignando picking...'
              : 'Confirmar asignación'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PickingAssignmentModal;