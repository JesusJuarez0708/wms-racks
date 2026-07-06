type ExecutiveForecast = {
  projectedHealth: number;
  riskLevel: 'low' | 'medium' | 'high';
  prediction: string;
  preventiveAction: string;
};

type ExecutiveForecastSectionProps = {
  forecast: ExecutiveForecast | null;
  translateLevel: (level: string) => string;
};

function ExecutiveForecastSection({
  forecast,
  translateLevel,
}: ExecutiveForecastSectionProps) {
  if (!forecast) {
    return null;
  }

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        Predicción Operativa
      </p>

      <div className="mt-3 flex items-center justify-between">
        <div>
          <div className="text-3xl font-bold text-slate-900">
            {forecast.projectedHealth}/100
          </div>
        </div>

        <div
          className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
            forecast.riskLevel === 'low'
              ? 'bg-emerald-100 text-emerald-700'
              : forecast.riskLevel === 'medium'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-red-100 text-red-700'
          }`}
        >
          {translateLevel(forecast.riskLevel)}
        </div>
      </div>

      <div className="space-y-2 text-sm text-slate-600">
        <p>{forecast.prediction}</p>

        <p>
          <span className="font-semibold text-slate-800">
            Acción preventiva:
          </span>{' '}
          {forecast.preventiveAction}
        </p>
      </div>
    </div>
  );
}

export default ExecutiveForecastSection;