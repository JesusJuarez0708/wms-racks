import {
  fetchRackPositions,
  insertRackPosition,
} from '../repositories/rackPositionRepository';

import type {
  CreateRackPositionRecord,
  RackPositionRecord,
} from '../repositories/rackPositionRepository';

export type RackPosition = RackPositionRecord;
export type CreateRackPositionInput = CreateRackPositionRecord;

export async function getRackPositions(): Promise<RackPosition[]> {
  return fetchRackPositions();
}

export async function createRackPosition(
  position: CreateRackPositionInput
): Promise<RackPosition> {
  return insertRackPosition(position);
}