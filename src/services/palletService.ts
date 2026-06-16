import {
  fetchPallets,
  insertPallet,
} from '../repositories/palletRepository';

import type {
  CreatePalletRecord,
  PalletRecord,
} from '../repositories/palletRepository';

export type Pallet = PalletRecord;
export type CreatePalletInput = CreatePalletRecord;

export async function getPallets(): Promise<Pallet[]> {
  return fetchPallets();
}

export async function createPallet(
  pallet: CreatePalletInput
): Promise<Pallet> {
  return insertPallet(pallet);
}