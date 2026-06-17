import { useEffect, useState } from 'react';

import DashboardHeader from '../components/DashboardHeader';
import KpiCard from '../components/KpiCard';
import MovementsTable from '../components/MovementsTable';
import RackStatusPanel from '../components/RackStatusPanel';

import {
  getSupabaseDashboardStats,
  type DashboardStats,
} from '../services/dashboardService';

import {
  generateOperationalAlerts,
  type OperationalAlert,
} from '../services/operationalIntelligenceService';

import {
  generateOptimizationRecommendations,
  type OptimizationRecommendation,
} from '../services/operationalOptimizationService';

function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPositions: 0,
    occupiedPositions: 0,
    freePositions: 0,
    activeRacks: 0,
  });

  const [operationalAlerts, setOperationalAlerts] = useState<
    OperationalAlert[]
  >([]);

  const [optimizationRecommendations, setOptimizationRecommendations] = useState<
    OptimizationRecommendation[]
  >([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getSupabaseDashboardStats(),
      generateOperationalAlerts(),
      generateOptimizationRecommendations(),
    ])
      .then(([dashboardStats, alerts, recommendations]) => {
        setStats(dashboardStats);
        setOperationalAlerts(alerts);
        setOptimizationRecommendations(recommendations);
      })
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

      <section className="mt-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Inteligencia Operativa
          </h2>

          <div className="mt-4 space-y-3">
            {operationalAlerts.length === 0 ? (
              <p className="text-sm text-slate-500">
                No hay alertas operativas por el momento.
              </p>
            ) : (
              operationalAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-900">
                      {alert.title}
                    </p>

                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium text-white ${
                        alert.priority === 'high'
                          ? 'bg-red-600'
                          : alert.priority === 'medium'
                            ? 'bg-yellow-500'
                            : 'bg-green-600'
                      }`}
                    >
                      {alert.priority === 'high'
                        ? 'Alta'
                        : alert.priority === 'medium'
                          ? 'Media'
                          : 'Baja'}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-slate-600">
                    {alert.description}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="mt-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Optimización Operativa
          </h2>

          <div className="mt-4 space-y-3">
            {optimizationRecommendations.length === 0 ? (
              <p className="text-sm text-slate-500">
                No hay recomendaciones disponibles.
              </p>
            ) : (
              optimizationRecommendations.map((recommendation) => (
                <div
                  key={recommendation.id}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-900">
                      {recommendation.title}
                    </p>

                    <span className="rounded-full bg-blue-600 px-2 py-1 text-xs font-medium text-white">
                      Optimización
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-slate-600">
                    {recommendation.description}
                  </p>

                  <p className="mt-2 text-xs font-medium text-blue-700">
                    Impacto esperado: {recommendation.expectedImpact}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-3">
        <MovementsTable />
        <RackStatusPanel />
      </section>

    </>
  );
}

export default DashboardPage;