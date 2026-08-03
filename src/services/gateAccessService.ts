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

export async function finishGateAccessUnloading(
  gateAccessId: string
) {
  return updateGateAccessStatus(
    gateAccessId,
    'unloading_completed'
  );
}

export async function startGateAccessInitialInspection(
  gateAccessId: string
) {
  return updateGateAccessStatus(
    gateAccessId,
    'initial_inspection'
  );
}

export async function startGateAccessInspection(
  gateAccessId: string
) {
  return updateGateAccessStatus(
    gateAccessId,
    'inspection_in_progress'
  );
}

export async function completeGateAccessInspection(
  gateAccessId: string
) {
  return updateGateAccessStatus(
    gateAccessId,
    'inspection_completed'
  );
}
