import ExecutiveCard from './ui/ExecutiveCard';
import { ExecutiveBadge } from './ui/ExecutiveBadge';
import { ExecutiveMetricCard } from './ui/ExecutiveMetricCard';
import { ExecutiveSectionHeader } from './ui/ExecutiveSectionHeader';
import { ExecutiveSection } from './ui/ExecutiveSection';

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
    <ExecutiveSection gap="compact">
      <ExecutiveCard
        variant="surface"
        padding="default"
      >
        <ExecutiveSection spacing="compact">
          <ExecutiveSectionHeader
            title="Panel Ejecutivo de Indicadores"
            description="Visión consolidada del desempeño operativo"
            badge={
              <ExecutiveBadge>
                KPI
              </ExecutiveBadge>
            }
          />

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
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
        </ExecutiveSection>
      </ExecutiveCard>
    </ExecutiveSection>
  );
}