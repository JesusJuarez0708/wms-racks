import { useEffect, useState } from 'react';

import DockAssignmentModal from './DockAssignmentModal';

import {
  getAvailableDocks,
} from '../services/dockService';

import type {
  DockItem,
} from '../repositories/dockRepository';

type DockAssignmentDialogProps = {
  open: boolean;
  assigning: boolean;
  onClose: () => void;
  onAssign: (dockId: string) => void;
};

export default function DockAssignmentDialog({
  open,
  assigning,
  onClose,
  onAssign,
}: DockAssignmentDialogProps) {
  const [docks, setDocks] = useState<DockItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    loadAvailableDocks();
  }, [open]);

  async function loadAvailableDocks() {
    setLoading(true);
    setErrorMessage(null);

    try {
      const availableDocks = await getAvailableDocks();
      setDocks(availableDocks);
    } catch (error) {
      console.error(error);

      setDocks([]);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'No fue posible cargar los andenes disponibles.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <DockAssignmentModal
        open={open}
        loading={loading || assigning}
        docks={docks}
        onClose={onClose}
        onAssign={onAssign}
      />

      {open && errorMessage && (
        <div
          role="alert"
          className="fixed left-1/2 top-6 z-[60] w-full max-w-xl -translate-x-1/2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 shadow-lg"
        >
          {errorMessage}
        </div>
      )}
    </>
  );
}