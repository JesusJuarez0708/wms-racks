import {
  assignGateAccessDock,
  fetchGateAccesses,
  insertGateAccess,
  updateGateAccessStatus,
} from '../repositories/gateAccessRepository';

import type {
  CreateGateAccessRecord,
  GateAccessRecord,
  GateAccessStatus,
} from '../repositories/gateAccessRepository';

export type GateAccessItem = GateAccessRecord;

export type CreateGateAccessInput = CreateGateAccessRecord;

export async function getGateAccesses(): Promise<GateAccessItem[]> {
  return fetchGateAccesses();
}

export async function createGateAccess(
  gateAccess: CreateGateAccessInput
): Promise<GateAccessItem> {
  return insertGateAccess(gateAccess);
}

export async function changeGateAccessStatus(
  id: string,
  status: GateAccessStatus
): Promise<GateAccessItem> {
  return updateGateAccessStatus(id, status);
}

export async function assignDockToGateAccess(
  id: string,
  dockId: string
): Promise<GateAccessItem> {
  return assignGateAccessDock(id, dockId);
}

export async function releaseGateAccessToReception(
  gateAccessId: string
) {
  return updateGateAccessStatus(
    gateAccessId,
    'released_to_reception'
  );
}

export async function startGateAccessReception(
  gateAccessId: string
) {
  return updateGateAccessStatus(
    gateAccessId,
    'reception_started'
  );
}

export async function startGateAccessUnloading(
  gateAccessId: string
) {
  return updateGateAccessStatus(
    gateAccessId,
    'reception_in_progress'
  );
}
