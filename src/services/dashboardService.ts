import { getInventory } from './inventoryService';
import { getRacks } from './rackService';
import { getRackPositions } from './rackPositionService';

export type DashboardStats = {
  totalPositions: number;
  occupiedPositions: number;
  freePositions: number;
  activeRacks: number;
};

export async function getSupabaseDashboardStats(): Promise<DashboardStats> {
  const [inventory, racks, positions] = await Promise.all([
    getInventory(),
    getRacks(),
    getRackPositions(),
  ]);

  const occupiedPositions = inventory.filter(
    (item) => item.status === 'available'
  ).length;

  return {
    totalPositions: positions.length,
    occupiedPositions,
    freePositions: Math.max(positions.length - occupiedPositions, 0),
    activeRacks: racks.filter((rack) => rack.is_active).length,
  };
}