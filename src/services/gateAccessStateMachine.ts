import type {
  GateAccessStatus,
} from '../repositories/gateAccessRepository';

export type GateAccessAction =
  | 'request_documents'
  | 'start_document_validation'
  | 'request_authorization'
  | 'authorize'
  | 'reject'
  | 'assign_dock'
  | 'release_to_reception'
  | 'start_reception'
  | 'start_unloading'
  | 'finish_unloading'
  | 'start_initial_inspection'
  | 'start_inspection'
  | 'complete_inspection'
  | 'accept_reception'
  | 'assign_location'
  | 'start_storage';

type GateAccessTransition = {
  action: GateAccessAction;
  from: GateAccessStatus;
  to: GateAccessStatus;
  label: string;
};

const statusLabels: Record<GateAccessStatus, string> = {
  registered: 'Registrado',
  documentation_pending: 'Documentación pendiente',
  documentation_in_validation: 'Documentación en validación',
  pending_authorization: 'Pendiente de autorización',
  authorized: 'Autorizado',
  rejected: 'Rechazado',
  cancelled: 'Cancelado',
  dock_assigned: 'Andén asignado',
  released_to_reception: 'Liberado a recepción',
  reception_started: 'Recepción iniciada',
  reception_in_progress: 'Recepción en proceso',
  unloading_completed: 'Descarga finalizada',
  initial_inspection: 'Inspección inicial',
  inspection_in_progress: 'Inspección en proceso',
  inspection_completed: 'Inspección finalizada',
  reception_accepted: 'Recepción aceptada',
  location_assigned: 'Ubicación asignada',
  storage_started: 'Almacenamiento iniciado',
};

const statusClasses: Record<GateAccessStatus, string> = {
  registered: 'bg-slate-100 text-slate-700',
  documentation_pending: 'bg-yellow-100 text-yellow-700',
  documentation_in_validation: 'bg-orange-100 text-orange-700',
  pending_authorization: 'bg-amber-100 text-amber-700',
  authorized: 'bg-emerald-100 text-emerald-700',
  rejected: 'bg-red-100 text-red-700',
  cancelled: 'bg-gray-100 text-gray-600',
  dock_assigned: 'bg-indigo-100 text-indigo-700',
  released_to_reception: 'bg-cyan-100 text-cyan-700',
  reception_started: 'bg-blue-100 text-blue-700',
  reception_in_progress: 'bg-sky-100 text-sky-700',
  unloading_completed: 'bg-teal-100 text-teal-700',
  initial_inspection: 'bg-lime-100 text-lime-700',
  inspection_in_progress: 'bg-green-100 text-green-700',
  inspection_completed: 'bg-emerald-100 text-emerald-700',
  reception_accepted: 'bg-violet-100 text-violet-700',
  location_assigned: 'bg-purple-100 text-purple-700',
  storage_started: 'bg-fuchsia-100 text-fuchsia-700',
};

const transitions: GateAccessTransition[] = [
  {
    action: 'request_documents',
    from: 'registered',
    to: 'documentation_pending',
    label: 'Solicitar documentos',
  },
  {
    action: 'start_document_validation',
    from: 'documentation_pending',
    to: 'documentation_in_validation',
    label: 'Iniciar validación',
  },
  {
    action: 'request_authorization',
    from: 'documentation_in_validation',
    to: 'pending_authorization',
    label: 'Solicitar autorización',
  },
  {
    action: 'authorize',
    from: 'pending_authorization',
    to: 'authorized',
    label: 'Autorizar',
  },
  {
    action: 'reject',
    from: 'pending_authorization',
    to: 'rejected',
    label: 'Rechazar',
  },
  {
    action: 'assign_dock',
    from: 'authorized',
    to: 'dock_assigned',
    label: 'Asignar andén',
  },
  {
    action: 'release_to_reception',
    from: 'dock_assigned',
    to: 'released_to_reception',
    label: 'Liberar a recepción',
  },
  {
    action: 'start_reception',
    from: 'released_to_reception',
    to: 'reception_started',
    label: 'Iniciar recepción',
  },
  {
    action: 'start_unloading',
    from: 'reception_started',
    to: 'reception_in_progress',
    label: 'Iniciar descarga',
  },
  {
    action: 'finish_unloading',
    from: 'reception_in_progress',
    to: 'unloading_completed',
    label: 'Finalizar descarga',
  },
  {
    action: 'start_initial_inspection',
    from: 'unloading_completed',
    to: 'initial_inspection',
    label: 'Iniciar inspección',
  },
  {
    action: 'start_inspection',
    from: 'initial_inspection',
    to: 'inspection_in_progress',
    label: 'Iniciar inspección física',
  },
  {
    action: 'complete_inspection',
    from: 'inspection_in_progress',
    to: 'inspection_completed',
    label: 'Finalizar inspección',
  },
  {
    action: 'accept_reception',
    from: 'inspection_completed',
    to: 'reception_accepted',
    label: 'Aceptar recepción',
  },
  {
    action: 'assign_location',
    from: 'reception_accepted',
    to: 'location_assigned',
    label: 'Asignar ubicación',
  },
  {
    action: 'start_storage',
    from: 'location_assigned',
    to: 'storage_started',
    label: 'Iniciar almacenamiento',
  },
];

export function getGateAccessStatusLabel(
  status: GateAccessStatus
): string {
  return statusLabels[status];
}

export function getGateAccessStatusClass(
  status: GateAccessStatus
): string {
  return statusClasses[status];
}

export function getGateAccessTransitions(
  status: GateAccessStatus
): GateAccessTransition[] {
  return transitions.filter(
    (transition) => transition.from === status
  );
}

export function getGateAccessTransition(
  status: GateAccessStatus,
  action: GateAccessAction
): GateAccessTransition | null {
  return (
    transitions.find(
      (transition) =>
        transition.from === status &&
        transition.action === action
    ) ?? null
  );
}

export function canTransitionGateAccess(
  status: GateAccessStatus,
  action: GateAccessAction
): boolean {
  return Boolean(
    getGateAccessTransition(status, action)
  );
}