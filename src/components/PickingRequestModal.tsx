import type { InventoryQueryItem } from '../services/inventoryService';

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
  if (!open || !item) {
    return null;
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
              Confirmar solicitud de surtido
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              Revisa la mercancía seleccionada antes de generar la solicitud.
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
              Cantidad
            </p>

            <p className="mt-1 font-semibold text-slate-900">
              {item.quantity} {item.unit}
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
            disabled={submitting}
            onClick={() => onConfirm(item)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
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