import { useEffect, useState } from 'react';

import type { EnrichedMovement } from '../utils/enrichMovement';

export type DeliveryAreaArrivalData = {
  notes: string;
};

type DeliveryAreaArrivalModalProps = {
  open: boolean;
  movement: EnrichedMovement | null;
  submitting: boolean;
  onClose: () => void;
  onConfirm: (
    movement: EnrichedMovement,
    data: DeliveryAreaArrivalData
  ) => Promise<void>;
};

export default function DeliveryAreaArrivalModal({
  open,
  movement,
  submitting,
  onClose,
  onConfirm,
}: DeliveryAreaArrivalModalProps) {
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (!open) {
      setNotes('');
      return;
    }

    setNotes(
      'Mercancía recibida físicamente en el Área de Entrega para verificación operativa.'
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
        notes,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl">

        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-xl font-bold">
            Confirmar llegada al Área de Entrega
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            El montacarguista confirma que el pallet fue colocado en el Área de
            Entrega y queda disponible para la verificación física del
            supervisor.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-sm">
              <strong>Producto:</strong> {movement.productName}
            </div>

            <div className="mt-2 text-sm">
              <strong>Pallet:</strong> {movement.palletName}
            </div>

            <div className="mt-2 text-sm">
              <strong>Cantidad:</strong>{' '}
              {movement.quantity} {movement.unit}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">
              Observaciones
            </label>

            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="rounded-xl border border-slate-300 px-5 py-2 font-semibold hover:bg-slate-100"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-indigo-600 px-5 py-2 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              {submitting
                ? 'Confirmando...'
                : 'Confirmar llegada'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}