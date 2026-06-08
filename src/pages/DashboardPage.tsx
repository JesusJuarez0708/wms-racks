import { useMemo } from 'react';

import DashboardHeader from '../components/DashboardHeader';
import KpiCard from '../components/KpiCard';
import MovementsTable from '../components/MovementsTable';
import RackStatusPanel from '../components/RackStatusPanel';

import { movements as initialMovements } from '../data/movements';

import type { Movement } from '../types/movement';

import { getDashboardStats } from '../utils/dashboard';

function DashboardPage() {
  const movements: Movement[] = (() => {
    const savedMovements = localStorage.getItem('wms-movements');

    if (savedMovements) {
      return JSON.parse(savedMovements);
    }

    return initialMovements;
  })();

  const stats = useMemo(() => {
    return getDashboardStats(movements);
  }, [movements]);

  const kpis = [
    {
      label: 'Movimientos',
      value: String(stats.totalMovements),
      detail: 'Movimientos registrados',
    },
    {
      label: 'Pendientes',
      value: String(stats.pendingMovements),
      detail: 'Pendientes por ejecutar',
    },
    {
      label: 'En proceso',
      value: String(stats.inProgressMovements),
      detail: 'Movimientos activos',
    },
    {
      label: 'Completados',
      value: String(stats.completedMovements),
      detail: `${stats.activeRacks} racks activos`,
    },
  ];

  return (
    <>
      <DashboardHeader />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            detail={kpi.detail}
          />
        ))}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-3">
        <MovementsTable />
        <RackStatusPanel />
      </section>
    </>
  );
}

export default DashboardPage;