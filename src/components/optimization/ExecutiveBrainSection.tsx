import type {
  ExecutiveBrainDecision,
} from '../../services/executiveBrainService';

type ExecutiveBrainSectionProps = {
  decision: ExecutiveBrainDecision | null;
};

export function ExecutiveBrainSection({
  decision,
}: ExecutiveBrainSectionProps) {
  if (!decision) {
    return null;
  }

  const riskStyles =
    decision.risk === 'Crítico'
      ? 'border-red-200 bg-red-50 text-red-700'
      : decision.risk === 'Alto'
        ? 'border-orange-200 bg-orange-50 text-orange-700'
        : decision.risk === 'Medio'
          ? 'border-amber-200 bg-amber-50 text-amber-700'
          : 'border-emerald-200 bg-emerald-50 text-emerald-700';

  const confidenceStyles =
    decision.confidence >= 90
      ? 'text-emerald-600'
      : decision.confidence >= 75
        ? 'text-amber-600'
        : 'text-red-600';

  return (
    <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
            Executive Brain CJWMS
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            {decision.executiveStatus}
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Evaluación cognitiva integrada de la operación.
          </p>
        </div>

        <span
          className={`w-fit rounded-full border px-3 py-1 text-xs font-bold ${riskStyles}`}
        >
          Riesgo {decision.risk}
        </span>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_220px]">
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Prioridad ejecutiva
            </p>

            <p className="mt-2 text-lg font-semibold text-white">
              {decision.priority}
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Recomendación principal
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-200">
              {decision.recommendation}
            </p>
          </div>

          <div className="rounded-xl border-l-4 border-cyan-500 bg-slate-900 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-400">
              ¿Por qué tomó esta decisión?
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-300">
              {decision.reasoning}
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Confianza de la decisión
          </p>

          <p className={`mt-4 text-4xl font-bold ${confidenceStyles}`}>
            {decision.confidence}%
          </p>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-cyan-500"
              style={{
                width: `${decision.confidence}%`,
              }}
            />
          </div>

          <p className="mt-4 text-xs leading-5 text-slate-500">
            Nivel de certeza calculado a partir de los indicadores ejecutivos
            analizados.
          </p>
        </div>
      </div>
    </section>
  );
}