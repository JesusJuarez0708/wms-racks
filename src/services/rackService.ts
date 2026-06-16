import {
  fetchRacks,
  insertRack,
} from '../repositories/rackRepository';

import type {
  CreateRackRecord,
  RackRecord,
} from '../repositories/rackRepository';

export type Rack = RackRecord;
export type CreateRackInput = CreateRackRecord;

export async function getRacks(): Promise<Rack[]> {
  return fetchRacks();
}

export async function createRack(
  rack: CreateRackInput
): Promise<Rack> {
  return insertRack(rack);
}