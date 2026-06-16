import { useEffect, useState } from 'react';

import {
  getMovements,
  type MovementItem,
} from '../services/movementService';

function getTypeClass(type: MovementItem['movement_type']) {
  switch (type) {
    case 'entrada':
      return 'bg-green-100 text-green-700';

    case 'salida':
      return 'bg-red-100 text-red-700';

    case 'reubicacion':
      return 'bg-blue-100 text-blue-700';

    default:
      return 'bg-gray-100 text-gray-700';
  }
}

function getMovementLabel(type: MovementItem['movement_type']) {
  switch (type) {
    case 'entrada':
      return 'Entrada';

    case 'salida':
      return 'Salida';

    case 'reubicacion':
      return 'Reubicación';

    case 'ajuste':
      return 'Ajuste';

    case 'bloqueo':
      return 'Bloqueo';

    case 'desbloqueo':
      return 'Desbloqueo';

    default:
      return 'Movimiento';
  }
}

function MovementsTable() {
  const [movements, setMovements] = useState<MovementItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargarMovimientos() {
      try {
        const data = await getMovements();
        setMovements(data.slice(0, 5));
      } catch (error) {
        console.error('Error cargando movimientos recientes:', error);
      } finally {
        setLoading(false);
      }
    }

    cargarMovimientos();
  }, []);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 xl:col-span-2">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Movimientos recientes
        </h2>

        <p className="mt-1 text-slate-500">
          Últimos movimientos registrados en Supabase.
        </p>
      </div>

      {loading && (
        <p className="text-sm text-slate-500">
          Cargando movimientos desde Supabase...
        </p>
      )}

      {!loading && movements.length === 0 && (
        <p className="text-sm text-slate-500">
          No hay movimientos registrados.
        </p>
      )}

      {!loading && movements.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-300 text-left text-slate-500">
                <th className="pb-3 pr-4 font-semibold">Tipo</th>
                <th className="pb-3 pr-4 font-semibold">Origen</th>
                <th className="pb-3 pr-4 font-semibold">Destino</th>
                <th className="pb-3 pr-4 font-semibold">Cantidad</th>
                <th className="pb-3 pr-4 font-semibold">Estado</th>
              </tr>
            </thead>

            <tbody>
              {movements.map((movement) => (
                <tr
                  key={movement.id}
                  className="border-b border-slate-200 text-slate-700"
                >
                  <td className="py-4 pr-4">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${getTypeClass(
                        movement.movement_type
                      )}`}
                    >
                      {getMovementLabel(movement.movement_type)}
                    </span>
                  </td>

                  <td className="py-4 pr-4">
                    {movement.origin_position_id ?? '-'}
                  </td>

                  <td className="py-4 pr-4">
                    {movement.destination_position_id ?? '-'}
                  </td>

                  <td className="py-4 pr-4">
                    {movement.quantity ?? '-'} {movement.unit ?? ''}
                  </td>

                  <td className="py-4 pr-4">
                    {movement.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MovementsTable;