import { useEffect, useState } from 'react';

import DashboardHeader from '../components/DashboardHeader';
import KpiCard from '../components/KpiCard';
import MovementsTable from '../components/MovementsTable';
import RackStatusPanel from '../components/RackStatusPanel';

import {
  getSupabaseDashboardStats,
  type DashboardStats,
} from '../services/dashboardService';

function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPositions: 0,
    occupiedPositions: 0,
    freePositions: 0,
    activeRacks: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSupabaseDashboardStats()
      .then(setStats)
      .catch((error) => {
        console.error('Error al cargar Dashboard desde Supabase:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const kpis = [
    {
      label: 'Posiciones',
      value: loading ? '...' : String(stats.totalPositions),
      detail: 'Posiciones registradas en Supabase',
    },
    {
      label: 'Ocupadas',
      value: loading ? '...' : String(stats.occupiedPositions),
      detail: 'Posiciones con inventario',
    },
    {
      label: 'Libres',
      value: loading ? '...' : String(stats.freePositions),
      detail: 'Posiciones disponibles',
    },
    {
      label: 'Racks activos',
      value: loading ? '...' : String(stats.activeRacks),
      detail: 'Racks cargados desde Supabase',
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