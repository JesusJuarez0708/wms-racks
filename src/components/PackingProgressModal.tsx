import { useEffect, useState } from 'react';

import type { EnrichedMovement } from '../utils/enrichMovement';

export type PackingAction =
  | 'start'
  | 'progress'
  | 'complete';

export type PackingProgressData = {
  notes: string;
};

type PackingProgressModalProps = {
  open: boolean;
  movement: EnrichedMovement | null;
  action: PackingAction;
  submitting: boolean;
  onClose: () => void;
  onConfirm: (
    movement: EnrichedMovement,
    data: PackingProgressData
  ) => void;
};

const actionContent: Record<
  PackingAction,
  {
    title: string;
    description: string;
    notesLabel: string;
    notesPlaceholder: string;
    confirmLabel: string;
    submittingLabel: string;
  }
> = {
  start: {
    title: 'Inicio de Empaque',
    description:
      'Confirma el inicio formal del acondicionamiento físico de la mercancía.',
    notesLabel: 'Observaciones de inicio',
    notesPlaceholder:
      'Describe las condiciones iniciales, materiales requeridos o instrucciones de empaque...',
    confirmLabel: 'Iniciar Empaque',
    submittingLabel: 'Iniciando empaque...',
  },
  progress: {
    title: 'Empaque en Proceso',
    description:
      'Registra un avance operativo sin finalizar todavía el proceso de empaque.',
    notesLabel: 'Observaciones del avance',
    notesPlaceholder:
      'Describe el avance realizado, materiales utilizados, incidencias o actividades pendientes...',
    confirmLabel: 'Confirmar avance',
    submittingLabel: 'Registrando avance...',
  },
  complete: {
    title: 'Finalización de Empaque',
    description:
      'Confirma que el acondicionamiento terminó y que la mercancía puede liberarse para Embarque.',
    notesLabel: 'Observaciones de finalización',
    notesPlaceholder:
      'Describe las condiciones finales del empaque, sellado, etiquetado o cualquier observación relevante...',
    confirmLabel: 'Finalizar Empaque',
    submittingLabel: 'Finalizando empaque...',
  },
};

function PackingProgressModal({
  open,
  movement,
  action,
  submitting,
  onClose,
  onConfirm,
}: PackingProgressModalProps) {
  const [notes, setNotes] = useState('');
  const [validationMessage, setValidationMessage] =
    useState('');

  useEffect(() => {
    if (!open || !movement) {
      return;
    }

    setNotes('');
    setValidationMessage('');
  }, [open, movement, action]);

  if (!open || !movement) {
    return null;
  }

  const currentMovement = movement;
  const content = actionContent[action];

  function handleConfirm() {
    const normalizedNotes = notes.trim();

    if (!normalizedNotes) {
      setValidationMessage(
        'Captura una observación operativa para continuar.'
      );
      return;
    }

    setValidationMessage('');

    onConfirm(currentMovement, {
      notes: normalizedNotes,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-amber-600">
              OP-009 — Empaque
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              {content.title}
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              {content.description}
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
              {movement.quantity ?? 0} {movement.unit ?? ''}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <label
            htmlFor="packing-progress-notes"
            className="block text-sm font-semibold text-slate-700"
          >
            {content.notesLabel}
          </label>

          <textarea
            id="packing-progress-notes"
            value={notes}
            disabled={submitting}
            onChange={(event) =>
              setNotes(event.target.value)
            }
            placeholder={content.notesPlaceholder}
            rows={5}
            className="mt-2 w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100 disabled:cursor-not-allowed disabled:bg-slate-100"
          />

          <p className="mt-2 text-xs text-slate-500">
            La observación quedará integrada en la trazabilidad del movimiento.
          </p>
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
            className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting
              ? content.submittingLabel
              : content.confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PackingProgressModal;