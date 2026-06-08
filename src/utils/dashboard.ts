import type { Movement } from '../types/movement';

export function getDashboardStats(movements: Movement[]) {
  const totalMovements = movements.length;

  const pendingMovements = movements.filter(
    (movement) => movement.status === 'Pendiente'
  ).length;

  const inProgressMovements = movements.filter(
    (movement) => movement.status === 'En proceso'
  ).length;

  const completedMovements = movements.filter(
    (movement) => movement.status === 'Completado'
  ).length;

  const activeRacks = new Set(
    movements
      .filter((movement) => movement.status !== 'Completado')
      .map((movement) => movement.rack)
  ).size;

  return {
    totalMovements,
    pendingMovements,
    inProgressMovements,
    completedMovements,
    activeRacks,
  };
}