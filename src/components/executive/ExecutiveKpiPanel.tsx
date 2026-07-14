import { ExecutiveMetricCard } from './ui/ExecutiveMetricCard';

type ExecutiveKpiData = {
  complianceRate: number;
  executedRecommendations: number;
  activeAlerts: number;
  operationalRisks: number;
  executiveScore: number;
};

type ExecutiveKpiPanelProps = {
  executiveKpi: ExecutiveKpiData;
};

export function ExecutiveKpiPanel({
  executiveKpi,
}: ExecutiveKpiPanelProps) {
  const operationalRiskClassName =
    executiveKpi.operationalRisks === 0
      ? 'text-emerald-600'
      : executiveKpi.operationalRisks <= 3
        ? 'text-amber-600'
        : 'text-red-600';

  return (
    <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Panel Ejecutivo de Indicadores
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Visión consolidada del desempeño operativo
          </p>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          KPI
        </span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <ExecutiveMetricCard
          title="Cumplimiento"
          value={`${executiveKpi.complianceRate}%`}
        />

        <ExecutiveMetricCard
          title="Recomendaciones ejecutadas"
          value={executiveKpi.executedRecommendations}
          valueClassName="text-blue-600"
        />

        <ExecutiveMetricCard
          title="Alertas activas"
          value={executiveKpi.activeAlerts}
          valueClassName="text-amber-600"
        />

        <ExecutiveMetricCard
          title="Riesgos operativos"
          value={executiveKpi.operationalRisks}
          valueClassName={operationalRiskClassName}
        />

        <ExecutiveMetricCard
          title="Score ejecutivo"
          value={`${executiveKpi.executiveScore}/100`}
          valueClassName="text-emerald-600"
        />
      </div>
    </div>
  );
}