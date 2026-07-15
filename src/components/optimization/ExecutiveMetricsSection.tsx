import { ExecutiveMetricsGrid } from '../executive/patterns/ExecutiveMetricsGrid';
import { ExecutiveMetricCard } from '../executive/ui/ExecutiveMetricCard';

type ExecutiveMetrics = {
  alerts: number;
  criticalAlerts: number;
  recommendations: number;
  opportunities: number;
};

type ExecutiveMetricsSectionProps = {
  executiveMetrics: ExecutiveMetrics;
};

function ExecutiveMetricsSection({
  executiveMetrics,
}: ExecutiveMetricsSectionProps) {
  return (
    <ExecutiveMetricsGrid className="mt-4 md:grid-cols-4">
      <ExecutiveMetricCard
        title="Alertas activas"
        value={executiveMetrics.alerts}
        valueClassName="text-3xl text-slate-900"
      />

      <ExecutiveMetricCard
        title="Alertas críticas"
        value={executiveMetrics.criticalAlerts}
        valueClassName="text-3xl text-red-600"
      />

      <ExecutiveMetricCard
        title="Recomendaciones"
        value={executiveMetrics.recommendations}
        valueClassName="text-3xl text-blue-600"
      />

      <ExecutiveMetricCard
        title="Oportunidades"
        value={executiveMetrics.opportunities}
        valueClassName="text-3xl text-emerald-600"
      />
    </ExecutiveMetricsGrid>
  );
}

export default ExecutiveMetricsSection;