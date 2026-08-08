import { useEffect, useState } from 'react';

import type { EnrichedMovement } from '../utils/enrichMovement';

import { formatQuantityUnit } from '../utils/formatQuantityUnit';

export type OperationalVerificationData = {
  requiresPacking: boolean;
  notes: string;
};

type OperationalVerificationModalProps = {
  open: boolean;
  movement: EnrichedMovement | null;
  submitting: boolean;
  onClose: () => void;
  onConfirm: (
    movement: EnrichedMovement,
    data: OperationalVerificationData
  ) => Promise<void>;
};

export default function OperationalVerificationModal({
  open,
  movement,
  submitting,
  onClose,
  onConfirm,
}: OperationalVerificationModalProps) {
  const [requiresPacking, setRequiresPacking] =
    useState(false);

  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (!open) {
      setRequiresPacking(false);
      setNotes('');
      return;
    }

    setRequiresPacking(false);

    setNotes(
      'Mercancía verificada físicamente por el supervisor.'
    );
  }, [open]);

  if (!open || !movement) {
    return null;
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

  if (!movement) {
    return;
    }

    const currentMovement = movement;

    await onConfirm(currentMovement, {
    requiresPacking,
    notes,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">

        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-xl font-bold">
            Verificación Operativa
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            El supervisor confirma la revisión física del pallet
            antes de autorizar el siguiente proceso.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6"
        >
          <div className="rounded-xl bg-slate-50 p-4">
            <div>
              <strong>Producto:</strong>{' '}
              {movement.productName}
            </div>

            <div className="mt-2">
              <strong>Pallet:</strong>{' '}
              {movement.palletName}
            </div>

            <div className="mt-2">
              <strong>Cantidad:</strong>{' '}
              {formatQuantityUnit(
                movement.quantity,
                movement.unit
              )}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 p-5">
            <p className="font-semibold">
              ¿La mercancía requiere pasar por Empaque?
            </p>

            <div className="mt-4 flex gap-8">

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={!requiresPacking}
                  onChange={() =>
                    setRequiresPacking(false)
                  }
                />

                No
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={requiresPacking}
                  onChange={() =>
                    setRequiresPacking(true)
                  }
                />

                Sí
              </label>

            </div>
          </div>

          <div>
            <label className="block font-semibold">
              Observaciones
            </label>

            <textarea
              rows={4}
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3">

            <button
              type="button"
              disabled={submitting}
              onClick={onClose}
              className="rounded-xl border border-slate-300 px-5 py-2 font-semibold hover:bg-slate-100"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-emerald-600 px-5 py-2 font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
            >
              {submitting
                ? 'Confirmando...'
                : 'Confirmar Verificación'}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}