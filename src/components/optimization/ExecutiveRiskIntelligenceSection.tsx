import type { ExecutiveRiskIntelligence } from '../../services/executiveRiskIntelligenceService';

type Props = {
  executiveRisk: ExecutiveRiskIntelligence;
  translateLevel: (level?: string) => string;
};

export function ExecutiveRiskIntelligenceSection({
  executiveRisk,
  translateLevel,
}: Props) {
  return (
    <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Inteligencia de Riesgo Ejecutivo
        </p>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            executiveRisk.riskLevel === 'critical'
              ? 'bg-red-100 text-red-700'
              : executiveRisk.riskLevel === 'high'
                ? 'bg-orange-100 text-orange-700'
                : executiveRisk.riskLevel === 'medium'
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-emerald-100 text-emerald-700'
          }`}
        >
          {translateLevel(executiveRisk.riskLevel)}
        </span>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div>
          <p className="text-xs uppercase text-slate-500">
            Score de riesgo
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {executiveRisk.riskScore}/100
          </p>
        </div>

        <div className="md:col-span-2">
          <p className="text-xs uppercase text-slate-500">
            Explicación ejecutiva
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            {executiveRisk.explanation}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-slate-50 p-4">
        <p className="text-xs uppercase text-slate-500">
          Acción recomendada
        </p>

        <p className="mt-2 text-sm font-semibold text-slate-800">
          {executiveRisk.recommendedAction}
        </p>
      </div>
    </section>
  );
}