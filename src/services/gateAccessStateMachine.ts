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
  | 'release_to_reception';

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