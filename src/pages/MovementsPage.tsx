import { useEffect, useState } from 'react';
import MovementFormModal from '../components/MovementFormModal';

import {
  getMovements,
  type MovementItem,
} from '../services/movementService';

import { getProducts } from '../services/productService';
import { getPallets } from '../services/palletService';
import { getRackPositions } from '../services/rackPositionService';
import {
  enrichMovements,
  type EnrichedMovement,
} from '../utils/enrichMovement';

function getStatusClass(status: MovementItem['status']) {
  if (status === 'completed') return 'bg-emerald-100 text-emerald-700';
  if (status === 'pending') return 'bg-amber-100 text-amber-700';
  if (status === 'cancelled') return 'bg-slate-100 text-slate-700';
  return 'bg-red-100 text-red-700';
}

function formatMovementDate(date?: string) {
  if (!date) {
    return {
      fecha: '-',
      hora: '',
    };
  }

  const d = new Date(date);

  const fecha = d.toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const hora = d.toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return {
    fecha,
    hora,
  };
}

function getStatusLabel(status: MovementItem['status']) {
  if (status === 'completed') return 'Completado';
  if (status === 'pending') return 'Pendiente';
  if (status === 'cancelled') return 'Cancelado';
  if (status === 'failed') return 'Fallido';
  return status;
}

function getMovementTypeLabel(type: MovementItem['movement_type']) {
  if (type === 'entrada') return 'Entrada';
  if (type === 'salida') return 'Salida';
  if (type === 'reubicacion') return 'Reubicación';
  if (type === 'ajuste') return 'Ajuste';
  if (type === 'bloqueo') return 'Bloqueo';
  if (type === 'desbloqueo') return 'Desbloqueo';
  return type;
}

function getMovementTypeIcon(type: string) {
  if (type === 'entrada') return '📥';
  if (type === 'salida') return '📤';
  if (type === 'reubicacion') return '🔄';
  if (type === 'ajuste') return '⚙️';
  if (type === 'bloqueo') return '⛔';
  if (type === 'desbloqueo') return '✅';

  return '📦';
}

function getMovementTypeClass(type: string) {
  if (type === 'entrada') return 'bg-blue-100 text-blue-700';
  if (type === 'salida') return 'bg-red-100 text-red-700';
  if (type === 'reubicacion') return 'bg-indigo-100 text-indigo-700';
  if (type === 'ajuste') return 'bg-slate-100 text-slate-700';
  if (type === 'bloqueo') return 'bg-orange-100 text-orange-700';
  if (type === 'desbloqueo') return 'bg-emerald-100 text-emerald-700';

  return 'bg-slate-100 text-slate-700';
}

function getPriorityByScore(score: number | null) {
  if ((score ?? 0) >= 80) return 'Alta';
  if ((score ?? 0) >= 50) return 'Media';
  return 'Baja';
}

function getPriorityClass(priority: string) {
  if (priority === 'Alta') return 'bg-red-100 text-red-700';
  if (priority === 'Media') return 'bg-yellow-100 text-yellow-700';
  return 'bg-slate-100 text-slate-700';
}

function MovementsPage() {
  const [movements, setMovements] = useState<EnrichedMovement[]>([]);
  const [loading, setLoading] = useState(true);

  const [showMovementModal, setShowMovementModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [priorityFilter, setPriorityFilter] = useState('Todas');

  async function loadMovements() {
    try {
      setLoading(true);

      const [movementsData, productsData, palletsData, positionsData] =
        await Promise.all([
          getMovements(),
          getProducts(),
          getPallets(),
          getRackPositions(),
        ]);

      const enriched = enrichMovements(
        movementsData,
        productsData,
        palletsData,
        positionsData
      );

      setMovements(enriched);
    } catch (error) {
      console.error('Error al cargar movimientos desde Supabase:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMovements();
  }, []);

  const filteredMovements = movements.filter((movement) => {
    const search = searchTerm.toLowerCase();
    const priority = getPriorityByScore(movement.decision_score);

    const matchesSearch =
      movement.id.toLowerCase().includes(search) ||
      movement.movement_type.toLowerCase().includes(search) ||
      (movement.reason ?? '').toLowerCase().includes(search) ||
      (movement.notes ?? '').toLowerCase().includes(search) ||
      (movement.created_by ?? '').toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === 'Todos' ||
      getStatusLabel(movement.status) === statusFilter;

    const matchesPriority =
      priorityFilter === 'Todas' || priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  function clearFilters() {
    setSearchTerm('');
    setStatusFilter('Todos');
    setPriorityFilter('Todas');
  }

  function handleNewMovement() {
    setShowMovementModal(true);
  }

  function handleEdit() {
    alert('La edición de movimientos se migrará en D.7.3.');
  }

  function handleDelete() {
    alert('La eliminación de movimientos se migrará en D.7.4.');
  }

  return (
    <div className="space-y-6">
      <header className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Operación WMS
        </p>

        <h1 className="mt-2 text-3xl font-bold">Movimientos</h1>

        <p className="mt-2 text-slate-600">
          Control y seguimiento de entradas, salidas y reubicaciones en racks compactos.
        </p>
      </header>

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-bold">Lista de movimientos</h2>

            <p className="text-sm text-slate-500">
              Mostrando {filteredMovements.length} de {movements.length} movimientos
            </p>
          </div>

          <button
            onClick={handleNewMovement}
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Nuevo movimiento
          </button>
        </div>

        <div className="mb-5 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 md:grid-cols-4">
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-slate-600">
              Buscar
            </label>

            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Buscar por ID, tipo, notas, motivo o usuario"
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-600">
              Estado
            </label>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
            >
              <option>Todos</option>
              <option>Pendiente</option>
              <option>Completado</option>
              <option>Cancelado</option>
              <option>Fallido</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-600">
              Prioridad
            </label>

            <select
              value={priorityFilter}
              onChange={(event) => setPriorityFilter(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
            >
              <option>Todas</option>
              <option>Baja</option>
              <option>Media</option>
              <option>Alta</option>
            </select>
          </div>

          <div className="md:col-span-4">
            <button
              onClick={clearFilters}
              className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100"
            >
              Limpiar filtros
            </button>
          </div>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
            Cargando movimientos desde Supabase...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1180px] border-separate border-spacing-y-2 text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-4 py-3">Tipo</th>
                  <th className="px-4 py-3">Producto</th>
                  <th className="px-4 py-3">Pallet</th>
                  <th className="px-4 py-3">Origen</th>
                  <th className="px-4 py-3">Destino</th>
                  <th className="px-4 py-3">Prioridad</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3">Fecha</th>
                  <th className="px-4 py-3">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {filteredMovements.map((movement) => {
                  const priority = getPriorityByScore(movement.decision_score);

                  return (
                    <tr
                      key={movement.id}
                      className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-100"
                    >

                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${getMovementTypeClass(
                            movement.movement_type
                          )}`}
                        >
                          <span>{getMovementTypeIcon(movement.movement_type)}</span>
                          {getMovementTypeLabel(movement.movement_type)}
                        </span>
                      </td>

                      <td className="px-4 py-4 font-semibold text-slate-900">
                        {movement.productName}
                      </td>

                      <td className="px-4 py-4 text-slate-700 whitespace-nowrap">
                        {movement.palletName}
                      </td>

                      <td className="px-4 py-4 text-slate-700 whitespace-nowrap">
                        {movement.originName}
                      </td>

                      <td className="px-4 py-4 text-slate-700 whitespace-nowrap">
                        {movement.destinationName}
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getPriorityClass(
                            priority
                          )}`}
                        >
                          {priority}
                        </span>
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                            movement.status
                          )}`}
                        >
                          {getStatusLabel(movement.status)}
                        </span>
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap text-slate-700">
                        {(() => {
                          const fecha = formatMovementDate(movement.created_at);

                          return (
                            <div className="leading-tight">
                              <div className="font-medium">
                                {fecha.fecha}
                              </div>

                              <div className="text-xs text-slate-500">
                                {fecha.hora}
                              </div>
                            </div>
                          );
                        })()}
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button
                            onClick={handleEdit}
                            className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                          >
                            Editar
                          </button>

                          <button
                            onClick={handleDelete}
                            className="rounded-lg bg-red-100 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-200"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {filteredMovements.length === 0 && (
                  <tr>
                    <td
                      colSpan={10}
                      className="py-8 text-center text-sm text-slate-500"
                    >
                      No se encontraron movimientos con los filtros seleccionados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <MovementFormModal
        open={showMovementModal}
        onClose={() => {
          setShowMovementModal(false);
          loadMovements();
        }}
        onCreated={() => {
          loadMovements();

          window.dispatchEvent(
            new CustomEvent('cjwms-inventory-updated')
          );
        }}
      />

    </div>
  );
}

export default MovementsPage;