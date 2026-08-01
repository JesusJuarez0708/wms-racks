import type { DockItem } from '../repositories/dockRepository';

import {
  fetchAvailableDocks,
  fetchDockById,
  fetchDocks,
  updateDockStatus,
} from '../repositories/dockRepository';

export async function getAllDocks() {
  return fetchDocks();
}

export async function getAvailableDocks() {
  return fetchAvailableDocks();
}

export async function getDock(dockId: string) {
  return fetchDockById(dockId);
}

export async function assignDock(dockId: string) {
  await updateDockStatus(dockId, 'occupied');
}

export async function releaseDock(dockId: string) {
  await updateDockStatus(dockId, 'available');
}

export function isDockAvailable(
  dock: DockItem | null
): boolean {
  return dock?.status === 'available';
}