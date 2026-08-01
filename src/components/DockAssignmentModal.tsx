import { useEffect, useState } from 'react';
import type { DockItem } from '../repositories/dockRepository';

type DockAssignmentModalProps = {
  open: boolean;
  loading: boolean;
  docks: DockItem[];
  onClose: () => void;
  onAssign: (dockId: string) => void;
};

export default function DockAssignmentModal({
  open,
  loading,
  docks,
  onClose,
  onAssign,
}: DockAssignmentModalProps) {
  const [selectedDockId, setSelectedDockId] =
    useState<string>('');

  useEffect(() => {
    if (open) {
      setSelectedDockId('');
    }
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl">

        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-xl font-bold text-slate-900">
            Asignación de Andén
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Seleccione el andén que será asignado a la unidad.
          </p>
        </div>

        <div className="max-h-96 overflow-y-auto px-6 py-4">

          {loading ? (
            <p className="text-sm text-slate-500">
              Cargando andenes...
            </p>
          ) : docks.length === 0 ? (
            <p className="text-sm text-slate-500">
              No existen andenes disponibles.
            </p>
          ) : (
            <div className="space-y-3">
              {docks.map((dock) => (
                <label
                  key={dock.id}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
                >
                  <input
                    type="radio"
                    name="dock"
                    value={dock.id}
                    checked={selectedDockId === dock.id}
                    onChange={() =>
                      setSelectedDockId(dock.id)
                    }
                  />

                  <div>
                    <p className="font-semibold text-slate-900">
                      {dock.code}
                    </p>

                    <p className="text-sm text-slate-500">
                      {dock.name}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          )}

        </div>

        <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">

          <button
            onClick={onClose}
            className="rounded-xl border border-slate-300 px-5 py-2"
          >
            Cancelar
          </button>

          <button
            disabled={!selectedDockId}
            onClick={() => onAssign(selectedDockId)}
            className="rounded-xl bg-indigo-600 px-5 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Asignar andén
          </button>

        </div>

      </div>
    </div>
  );
}