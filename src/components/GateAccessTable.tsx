import type { GateAccessItem } from '../services/gateAccessService';

import type {
  GateAccessStatus,
} from '../repositories/gateAccessRepository';

import {
  getGateAccessStatusClass,
  getGateAccessStatusLabel,
  getGateAccessTransitions,
    type GateAccessAction,
} from '../services/gateAccessStateMachine';

type GateAccessTableProps = {
  gateAccesses: GateAccessItem[];
  loading: boolean;
  updatingAccessId: string | null;
  onTransition: (
    id: string,
    currentStatus: GateAccessStatus,
    action: GateAccessAction
  ) => void;
};

function getOperationLabel(
  operationType: GateAccessItem['operation_type']
) {
  return operationType === 'inbound' ? 'Entrada' : 'Salida';
}

function getOperationClass(
  operationType: GateAccessItem['operation_type']
) {
  return operationType === 'inbound'
    ? 'bg-blue-100 text-blue-700'
    : 'bg-purple-100 text-purple-700';
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('es-MX', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date));
}

function getActionClass(action: GateAccessAction) {
  const classes: Record<GateAccessAction, string> = {
    request_documents:
      'bg-yellow-500 hover:bg-yellow-600',
    start_document_validation:
      'bg-orange-500 hover:bg-orange-600',
    request_authorization:
      'bg-amber-500 hover:bg-amber-600',
    authorize:
      'bg-emerald-600 hover:bg-emerald-700',
    reject:
      'bg-red-600 hover:bg-red-700',
    assign_dock:
      'bg-indigo-600 hover:bg-indigo-700',
    release_to_reception:
      'bg-cyan-600 hover:bg-cyan-700',
    start_reception:
      'bg-blue-600 hover:bg-blue-700',
    start_unloading:
      'bg-sky-600 hover:bg-sky-700',
    finish_unloading:
      'bg-teal-600 hover:bg-teal-700',
    start_initial_inspection:
      'bg-lime-600 hover:bg-lime-700',
    start_inspection:
      'bg-green-600 hover:bg-green-700',
    complete_inspection:
      'bg-emerald-600 hover:bg-emerald-700',
  };

  return classes[action];
}

export default function GateAccessTable({
  gateAccesses,
  loading,
  updatingAccessId,
  onTransition,
}: GateAccessTableProps) {
  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-10 text-center text-slate-500">
        Cargando registros de acceso...
      </div>
    );
  }

  if (gateAccesses.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center">
        <p className="font-semibold text-slate-700">
          No existen accesos registrados
        </p>

        <p className="mt-1 text-sm text-slate-500">
          Los nuevos registros aparecerán en esta sección.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Fecha y hora
            </th>

            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Placas
            </th>

            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Operador
            </th>

            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Transportista
            </th>

            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Operación
            </th>

            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Estado
            </th>

            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Observaciones
            </th>

            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Acciones
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 bg-white">
          {gateAccesses.map((gateAccess) => (
            <tr
              key={gateAccess.id}
              className="transition hover:bg-slate-50"
            >
              <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">
                {formatDate(gateAccess.occurred_at)}
              </td>

              <td className="whitespace-nowrap px-4 py-4">
                <span className="font-semibold text-slate-900">
                  {gateAccess.vehicle_plate}
                </span>
              </td>

              <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">
                {gateAccess.driver_name}
              </td>

              <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700">
                {gateAccess.carrier_company}
              </td>

              <td className="whitespace-nowrap px-4 py-4">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getOperationClass(
                    gateAccess.operation_type
                  )}`}
                >
                  {getOperationLabel(gateAccess.operation_type)}
                </span>
              </td>

              <td className="whitespace-nowrap px-4 py-4">
                <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getGateAccessStatusClass(
                    gateAccess.status
                    )}`}
                >
                    {getGateAccessStatusLabel(gateAccess.status)}
                </span>
              </td>

              <td className="min-w-64 px-4 py-4 text-sm text-slate-600">
                {gateAccess.notes || 'Sin observaciones'}
              </td>

              <td className="whitespace-nowrap px-4 py-4">
                {getGateAccessTransitions(gateAccess.status).length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                    {getGateAccessTransitions(gateAccess.status).map(
                        (transition) => (
                        <button
                            key={transition.action}
                            type="button"
                            onClick={() =>
                            onTransition(
                                gateAccess.id,
                                gateAccess.status,
                                transition.action
                            )
                            }
                            disabled={updatingAccessId === gateAccess.id}
                            className={`rounded-lg px-3 py-2 text-xs font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50 ${getActionClass(
                            transition.action
                            )}`}
                        >
                            {updatingAccessId === gateAccess.id
                            ? 'Actualizando...'
                            : transition.label}
                        </button>
                        )
                    )}
                    </div>
                ) : (
                    <span className="text-xs text-slate-400">
                    Sin acciones disponibles
                    </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}