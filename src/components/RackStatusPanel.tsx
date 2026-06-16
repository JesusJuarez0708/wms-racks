import { useEffect, useState } from 'react';

import { getRacks } from '../services/rackService';
import { getRackPositions } from '../services/rackPositionService';
import { getInventory } from '../services/inventoryService';

type RackStatus = {
  id: string;
  name: string;
  status: string;
  progress: number;
};

function RackStatusPanel() {
  const [racks, setRacks] = useState<RackStatus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargarEstadoRacks() {
      try {
        const [racksData, positions, inventory] = await Promise.all([
          getRacks(),
          getRackPositions(),
          getInventory(),
        ]);

        const rackStatus = racksData.map((rack) => {
          const rackPositions = positions.filter(
            (position) => position.rack_id === rack.id
          );

          const occupied = rackPositions.filter((position) =>
            inventory.some(
              (item) =>
                item.rack_position_id === position.id &&
                item.status === 'available'
            )
          ).length;

          const total = rackPositions.length;

          const progress =
            total > 0 ? Math.round((occupied / total) * 100) : 0;

          return {
            id: rack.id,
            name: rack.name ?? 'Rack sin nombre',
            status: rack.is_active ? 'Activo' : 'Inactivo',
            progress,
          };
        });

        setRacks(rackStatus);
      } catch (error) {
        console.error('Error cargando estado de racks:', error);
      } finally {
        setLoading(false);
      }
    }

    cargarEstadoRacks();
  }, []);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold">Estado de racks</h2>

      <div className="mt-5 space-y-4">
        {loading && (
          <p className="text-sm text-slate-500">
            Cargando racks desde Supabase...
          </p>
        )}

        {!loading && racks.length === 0 && (
          <p className="text-sm text-slate-500">
            No hay racks registrados.
          </p>
        )}

        {!loading &&
          racks.map((rack) => (
            <div
              key={rack.id}
              className="rounded-xl border border-slate-200 p-4"
            >
              <div className="flex items-center justify-between">
                <p className="font-semibold">{rack.name}</p>

                <span className="text-xs text-slate-500">
                  {rack.status} · {rack.progress}%
                </span>
              </div>

              <div className="mt-3 h-2 rounded-full bg-slate-100">
                <div
                  className="h-2 rounded-full bg-blue-600"
                  style={{ width: `${rack.progress}%` }}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default RackStatusPanel;