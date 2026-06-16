import { getMovements } from './movementService';

export async function testMovementConnection() {
  const movements = await getMovements();

  return movements;
}