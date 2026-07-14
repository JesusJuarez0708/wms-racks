import type { ExecutiveCommandCenter } from '../../services/executiveCommandCenterService';

type Props = {
  executiveCommandCenter: ExecutiveCommandCenter;
  translateLevel: (level?: string) => string;
};

export function ExecutiveCommandCenterSection({
  executiveCommandCenter,
  translateLevel,
}: Props) {
  return (
    <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-6 shadow-sm">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
            Centro de Comando Ejecutivo
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white">
            {executiveCommandCenter.globalStatus === 'excellent'
              ? 'Operación Excelente'
              : executiveCommandCenter.globalStatus === 'good'
                ? 'Operación Buena'
                : executiveCommandCenter.globalStatus === 'attention'
                  ? 'Operación en Atención'
                  : 'Operación Crítica'}
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-300">
            {executiveCommandCenter.summary}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            executiveCommandCenter.globalStatus === 'excellent'
              ? 'bg-emerald-100 text-emerald-700'
              : executiveCommandCenter.globalStatus === 'good'
                ? 'bg-blue-100 text-blue-700'
                : executiveCommandCenter.globalStatus === 'attention'
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-red-100 text-red-700'
          }`}
        >
          {translateLevel(executiveCommandCenter.globalStatus)}
        </span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs uppercase text-slate-400">
            Score Ejecutivo
          </p>

          <p className="mt-2 text-3xl font-bold text-cyan-400">
            {executiveCommandCenter.executiveScore}/100
          </p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs uppercase text-slate-400">
            Nivel de Riesgo
          </p>

          <p
            className={`mt-2 text-3xl font-bold ${
              executiveCommandCenter.riskLevel === 'critical'
                ? 'text-red-400'
                : executiveCommandCenter.riskLevel === 'high'
                  ? 'text-orange-400'
                  : executiveCommandCenter.riskLevel === 'medium'
                    ? 'text-amber-400'
                    : 'text-emerald-400'
            }`}
          >
            {translateLevel(executiveCommandCenter.riskLevel)}
          </p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs uppercase text-slate-400">
            Prioridad Principal
          </p>

          <p className="mt-2 text-lg font-bold text-white">
            {executiveCommandCenter.topPriority}
          </p>
        </div>
      </div>
    </div>
  );
}