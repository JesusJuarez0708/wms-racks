import { useEffect, useState } from 'react';
import { movements as initialMovements } from '../data/movements';
import { racks } from '../data/racks';
import type {
  Movement,
  MovementPriority,
  MovementStatus,
  MovementType,
} from '../types/movement';

type MovementForm = {
  type: MovementType;
  product: string;
  rack: string;
  location: string;
  operator: string;
  priority: MovementPriority;
  status: MovementStatus;
};

const emptyForm: MovementForm = {
  type: 'Entrada',
  product: '',
  rack: racks[0].name,
  location: racks[0].locations[0],
  operator: '',
  priority: 'Media',
  status: 'Pendiente',
};

function getStatusClass(status: string) {
  if (status === 'Completado') return 'bg-emerald-100 text-emerald-700';
  if (status === 'En proceso') return 'bg-blue-100 text-blue-700';
  return 'bg-amber-100 text-amber-700';
}

function getPriorityClass(priority: string) {
  if (priority === 'Alta') return 'bg-red-100 text-red-700';
  if (priority === 'Media') return 'bg-yellow-100 text-yellow-700';
  return 'bg-slate-100 text-slate-700';
}

function MovementsPage() {
  const [movements, setMovements] = useState<Movement[]>(() => {
    const savedMovements = localStorage.getItem('wms-movements');

    if (savedMovements) {
      return JSON.parse(savedMovements);
    }

    return initialMovements;
  });

  const [showForm, setShowForm] = useState(false);
  const [editingMovementId, setEditingMovementId] = useState<string | null>(null);
  const [form, setForm] = useState<MovementForm>(emptyForm);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [priorityFilter, setPriorityFilter] = useState('Todas');

  const selectedRack = racks.find((rack) => rack.name === form.rack);
  const availableLocations = selectedRack?.locations ?? [];

  const filteredMovements = movements.filter((movement) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      movement.product.toLowerCase().includes(search) ||
      movement.rack.toLowerCase().includes(search) ||
      movement.location.toLowerCase().includes(search) ||
      movement.operator.toLowerCase().includes(search) ||
      movement.id.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === 'Todos' || movement.status === statusFilter;

    const matchesPriority =
      priorityFilter === 'Todas' || movement.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  useEffect(() => {
    localStorage.setItem('wms-movements', JSON.stringify(movements));
  }, [movements]);

  function handleChange(field: keyof MovementForm, value: string) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingMovementId(null);
    setShowForm(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.product || !form.rack || !form.location || !form.operator) {
      alert('Por favor completa todos los campos.');
      return;
    }

    if (editingMovementId) {
      setMovements((currentMovements) =>
        currentMovements.map((movement) =>
          movement.id === editingMovementId
            ? {
                ...movement,
                ...form,
              }
            : movement
        )
      );

      resetForm();
      return;
    }

    const newMovement: Movement = {
      id: `MOV-${String(movements.length + 1).padStart(3, '0')}`,
      ...form,
      createdAt: new Date().toLocaleString('es-MX', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMovements((currentMovements) => [newMovement, ...currentMovements]);
    resetForm();
  }

  function handleEdit(movement: Movement) {
    setForm({
      type: movement.type,
      product: movement.product,
      rack: movement.rack,
      location: movement.location,
      operator: movement.operator,
      priority: movement.priority,
      status: movement.status,
    });

    setEditingMovementId(movement.id);
    setShowForm(true);
  }

  function handleDelete(movementId: string) {
    const confirmDelete = window.confirm(
      `¿Seguro que deseas eliminar el movimiento ${movementId}?`
    );

    if (!confirmDelete) return;

    setMovements((currentMovements) =>
      currentMovements.filter((movement) => movement.id !== movementId)
    );
  }

  function clearFilters() {
    setSearchTerm('');
    setStatusFilter('Todos');
    setPriorityFilter('Todas');
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
            onClick={() => {
              if (showForm) {
                resetForm();
                return;
              }

              setShowForm(true);
            }}
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            {showForm ? 'Cerrar formulario' : 'Nuevo movimiento'}
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
              placeholder="Buscar por producto, rack, operador, ubicación o ID"
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
              <option>En proceso</option>
              <option>Completado</option>
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

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-6 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 md:grid-cols-2 xl:grid-cols-4"
          >
            <div className="md:col-span-2 xl:col-span-4">
              <h3 className="text-base font-bold">
                {editingMovementId ? 'Editar movimiento' : 'Nuevo movimiento'}
              </h3>

              <p className="text-sm text-slate-500">
                {editingMovementId
                  ? `Modificando ${editingMovementId}`
                  : 'Captura los datos del nuevo movimiento.'}
              </p>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">Tipo</label>
              <select
                value={form.type}
                onChange={(event) => handleChange('type', event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
              >
                <option>Entrada</option>
                <option>Salida</option>
                <option>Reubicación</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">Producto</label>
              <input
                value={form.product}
                onChange={(event) => handleChange('product', event.target.value)}
                placeholder="Ej. Tarima, caja, pallet"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">Rack</label>
              <select
                value={form.rack}
                onChange={(event) => {
                  const rackName = event.target.value;
                  const rackData = racks.find((rack) => rack.name === rackName);

                  handleChange('rack', rackName);
                  handleChange('location', rackData?.locations[0] ?? '');
                }}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
              >
                {racks.map((rack) => (
                  <option key={rack.id}>{rack.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Ubicación
              </label>

              <select
                value={form.location}
                onChange={(event) => handleChange('location', event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
              >
                {availableLocations.map((location) => (
                  <option key={location}>{location}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">Operador</label>
              <input
                value={form.operator}
                onChange={(event) => handleChange('operator', event.target.value)}
                placeholder="Nombre del operador"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Prioridad
              </label>
              <select
                value={form.priority}
                onChange={(event) => handleChange('priority', event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
              >
                <option>Baja</option>
                <option>Media</option>
                <option>Alta</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">Estado</label>
              <select
                value={form.status}
                onChange={(event) => handleChange('status', event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
              >
                <option>Pendiente</option>
                <option>En proceso</option>
                <option>Completado</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
              >
                {editingMovementId ? 'Guardar cambios' : 'Guardar movimiento'}
              </button>
            </div>
          </form>
        )}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-left text-sm">
            <thead>
              <tr className="border-b text-slate-500">
                <th className="py-3">ID</th>
                <th>Tipo</th>
                <th>Producto</th>
                <th>Rack</th>
                <th>Ubicación</th>
                <th>Operador</th>
                <th>Prioridad</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {filteredMovements.map((movement) => (
                <tr key={movement.id} className="border-b last:border-0">
                  <td className="py-4 font-semibold">{movement.id}</td>
                  <td>{movement.type}</td>
                  <td className="font-medium">{movement.product}</td>
                  <td>{movement.rack}</td>
                  <td>{movement.location}</td>
                  <td>{movement.operator}</td>

                  <td>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getPriorityClass(
                        movement.priority
                      )}`}
                    >
                      {movement.priority}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                        movement.status
                      )}`}
                    >
                      {movement.status}
                    </span>
                  </td>

                  <td className="text-slate-500">{movement.createdAt}</td>

                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(movement)}
                        className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => handleDelete(movement.id)}
                        className="rounded-lg bg-red-100 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-200"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

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
      </section>
    </div>
  );
}

export default MovementsPage;