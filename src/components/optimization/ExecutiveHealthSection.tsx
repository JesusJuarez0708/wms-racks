import type { OperationalHealth } from '../../services/operationalHealthService';
import type { OperationalTrend } from '../../services/operationalTrendService';

type Props = {
  health: OperationalHealth;
  trend: OperationalTrend | null;
  translateLevel: (level?: string) => string;
};

export function ExecutiveHealthSection({
  health,
  trend,
  translateLevel,
}: Props) {
  return (
    <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Índice Ejecutivo de Salud Operativa
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {health.score}/100
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            health.status === 'excellent'
              ? 'bg-emerald-100 text-emerald-700'
              : health.status === 'good'
                ? 'bg-blue-100 text-blue-700'
                : health.status === 'warning'
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-red-100 text-red-700'
          }`}
        >
          {translateLevel(health.status)}
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full ${
            health.status === 'excellent'
              ? 'bg-emerald-500'
              : health.status === 'good'
                ? 'bg-blue-500'
                : health.status === 'warning'
                  ? 'bg-amber-500'
                  : 'bg-red-500'
          }`}
          style={{ width: `${health.score}%` }}
        />
      </div>

      {trend && (
        <p className="mt-3 text-sm text-slate-600">
          Tendencia:{' '}
          {trend.trend === 'up'
            ? `↑ Mejorando (+${trend.delta})`
            : trend.trend === 'down'
              ? `↓ Deterioro (${trend.delta})`
              : '→ Estable'}
        </p>
      )}
    </section>
  );
}