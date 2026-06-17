import { fetchInventory } from '../repositories/inventoryRepository';
import { fetchRackPositions } from '../repositories/rackPositionRepository';
import { fetchProducts } from '../repositories/productRepository';

export type OperationalAlert = {
  id: string;
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
};

function getLineKey(positionCode: string): string {
  const parts = positionCode.split('-');

  if (parts.length >= 2) {
    return `${parts[0]}-${parts[1]}`;
  }

  return positionCode.charAt(0);
}

function getLineDisplayName(lineKey: string): string {
  if (lineKey.startsWith('D')) {
    return `Drive In ${lineKey}`;
  }

  return `Rack Selectivo ${lineKey}`;
}

export async function generateOperationalAlerts(): Promise<OperationalAlert[]> {
  const alerts: OperationalAlert[] = [];

  const inventory = await fetchInventory();
  const positions = await fetchRackPositions();
  const products = await fetchProducts();

  const occupancyRate =
    positions.length === 0 ? 0 : (inventory.length / positions.length) * 100;

  if (occupancyRate >= 90) {
    alerts.push({
      id: crypto.randomUUID(),
      priority: 'high',
      title: 'Almacén cercano a saturación',
      description: `Ocupación actual ${occupancyRate.toFixed(1)}%`,
    });
  }

  const occupiedPositionIds = new Set(
    inventory.map((item) => item.rack_position_id)
  );

  const lineStats = new Map<
    string,
    {
      total: number;
      occupied: number;
    }
  >();

  positions.forEach((position) => {
    const lineKey = getLineKey(position.code);
    const current = lineStats.get(lineKey) ?? {
      total: 0,
      occupied: 0,
    };

    current.total += 1;

    if (occupiedPositionIds.has(position.id)) {
      current.occupied += 1;
    }

    lineStats.set(lineKey, current);
  });

  lineStats.forEach((stats, lineKey) => {
    const lineOccupancy =
      stats.total === 0 ? 0 : (stats.occupied / stats.total) * 100;

    if (lineOccupancy >= 90) {
      alerts.push({
        id: crypto.randomUUID(),
        priority: 'high',
        title: `${getLineDisplayName(lineKey)} saturado`,
        description: `${stats.occupied} de ${stats.total} posiciones ocupadas (${lineOccupancy.toFixed(
          1
        )}%)`,
      });
    } else if (lineOccupancy >= 75) {
      alerts.push({
        id: crypto.randomUUID(),
        priority: 'medium',
        title: `${getLineDisplayName(lineKey)} cercano a saturación`,
        description: `${stats.occupied} de ${stats.total} posiciones ocupadas (${lineOccupancy.toFixed(
          1
        )}%)`,
      });
    }
    else if (
      lineOccupancy > 0 &&
      lineOccupancy <= 10
    ) {
      alerts.push({
        id: crypto.randomUUID(),
        priority: 'low',
        title: `${getLineDisplayName(lineKey)} subutilizado`,
        description: `${stats.occupied} de ${stats.total} posiciones ocupadas (${lineOccupancy.toFixed(
          1
        )}%)`,
      });
    }
  });

  const highRotationProducts = products.filter(
    (product) => product.rotation === 'alta'
  );

  if (highRotationProducts.length > 0) {
    alerts.push({
      id: crypto.randomUUID(),
      priority: 'medium',
      title: 'Productos de alta rotación detectados',
      description: `${highRotationProducts.length} productos requieren monitoreo preferente`,
    });
  }

  if (inventory.length > 50) {
    alerts.push({
      id: crypto.randomUUID(),
      priority: 'low',
      title: 'Inventario estable',
      description: `${inventory.length} pallets registrados`,
    });
  }

  return alerts.sort((a, b) => {
    const priorityOrder = {
      high: 1,
      medium: 2,
      low: 3,
    };

    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}