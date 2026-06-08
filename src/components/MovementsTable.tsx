import { movements as initialMovements } from '../data/movements';

import type { Movement } from '../types/movement';

function getStatusClass(status: Movement['status']) {
  switch (status) {
    case 'Pendiente':
      return 'bg-yellow-100 text-yellow-700';

    case 'En proceso':
      return 'bg-blue-100 text-blue-700';

    case 'Completado':
      return 'bg-green-100 text-green-700';

    default:
      return 'bg-gray-100 text-gray-700';
  }
}

function MovementsTable() {
  const movements: Movement[] = (() => {
    const savedMovements = localStorage.getItem('wms-movements');

    if (savedMovements) {
      return JSON.parse(savedMovements);
    }

    return initialMovements;
  })();

  const recentMovements = [...movements].slice(0, 5);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 xl:col-span-2">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Movimientos recientes
        </h2>

        <p className="mt-1 text-slate-500">
          Últimos movimientos registrados en el sistema.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-300 text-left text-slate-500">
              <th className="pb-3 pr-4 font-semibold">ID</th>
              <th className="pb-3 pr-4 font-semibold">Rack</th>
              <th className="pb-3 pr-4 font-semibold">Ubicación</th>
              <th className="pb-3 pr-4 font-semibold">Producto</th>
              <th className="pb-3 pr-4 font-semibold">Estado</th>
            </tr>
          </thead>

          <tbody>
            {recentMovements.map((movement) => (
              <tr
                key={movement.id}
                className="border-b border-slate-200 text-slate-700"
              >
                <td className="py-4 pr-4 font-semibold">
                  {movement.id}
                </td>

                <td className="py-4 pr-4">
                  {movement.rack}
                </td>

                <td className="py-4 pr-4">
                  {movement.location}
                </td>

                <td className="py-4 pr-4">
                  {movement.product}
                </td>

                <td className="py-4 pr-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${getStatusClass(
                      movement.status
                    )}`}
                  >
                    {movement.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MovementsTable;