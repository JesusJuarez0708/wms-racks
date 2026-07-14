import type { ExecutiveForecast } from '../../services/executiveForecastService';

type Props = {
  executiveForecast: ExecutiveForecast;
  translateLevel: (level?: string) => string;
};

export function ExecutiveProjectionSection({
  executiveForecast,
  translateLevel,
}: Props) {
  return (
    <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Centro de Proyección Ejecutiva
        </h3>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            executiveForecast.forecastLevel === 'high'
              ? 'bg-red-100 text-red-600'
              : executiveForecast.forecastLevel === 'medium'
                ? 'bg-amber-100 text-amber-600'
                : 'bg-emerald-100 text-emerald-600'
          }`}
        >
          {translateLevel(executiveForecast.forecastLevel)}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <p className="text-xs uppercase text-slate-500">
            Score Actual
          </p>

          <p className="text-3xl font-bold text-slate-900">
            {executiveForecast.currentScore}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase text-slate-500">
            Score Proyectado
          </p>

          <p className="text-3xl font-bold text-blue-600">
            {executiveForecast.projectedScore}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase text-slate-500">
            Tendencia
          </p>

          <p className="text-xl font-bold text-slate-900">
            {translateLevel(executiveForecast.trend)}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-slate-50 p-4">
        <p className="text-sm text-slate-700">
          {executiveForecast.explanation}
        </p>

        <p className="mt-3 text-sm font-semibold text-slate-900">
          Acción recomendada:{' '}
          {executiveForecast.recommendedAction}
        </p>
      </div>
    </section>
  );
}