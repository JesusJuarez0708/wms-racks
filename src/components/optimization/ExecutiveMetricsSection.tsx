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
    <div className="mt-4 grid gap-4 md:grid-cols-4">
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="text-xs uppercase text-slate-500">
          Alertas activas
        </div>

        <div className="mt-2 text-3xl font-bold text-slate-900">
          {executiveMetrics.alerts}
        </div>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="text-xs uppercase text-slate-500">
          Alertas críticas
        </div>

        <div className="mt-2 text-3xl font-bold text-red-600">
          {executiveMetrics.criticalAlerts}
        </div>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="text-xs uppercase text-slate-500">
          Recomendaciones
        </div>

        <div className="mt-2 text-3xl font-bold text-blue-600">
          {executiveMetrics.recommendations}
        </div>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="text-xs uppercase text-slate-500">
          Oportunidades
        </div>

        <div className="mt-2 text-3xl font-bold text-emerald-600">
          {executiveMetrics.opportunities}
        </div>
      </div>
    </div>
  );
}

export default ExecutiveMetricsSection;