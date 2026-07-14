type ExecutiveExecutionTracking = {
  executedActions: number;
  totalActions: number;
  executionProgress: number;
  obtainedBenefit: number;
  pendingBenefit: number;
};

type ExecutiveExecutionTrackingSectionProps = {
  executionTracking: ExecutiveExecutionTracking | null;
};

function ExecutiveExecutionTrackingSection({
  executionTracking,
}: ExecutiveExecutionTrackingSectionProps) {
  if (!executionTracking) {
    return null;
  }

  return (
    <div className="mt-6 rounded-xl border bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        Seguimiento de Ejecución Inteligente
      </p>

      <div className="mt-4 grid gap-6 md:grid-cols-3">
        <div>
          <p className="text-sm text-slate-500">Acciones</p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {executionTracking.executedActions}
            <span className="text-slate-400">
              {' '} / {executionTracking.totalActions}
            </span>
          </p>

          <p className="mt-1 text-sm text-slate-500">Ejecutadas</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Avance</p>

          <p className="mt-2 text-3xl font-bold text-blue-600">
            {executionTracking.executionProgress}%
          </p>

          <div className="mt-3 h-3 rounded-full bg-slate-200">
            <div
              className="h-3 rounded-full bg-blue-500"
              style={{
                width: `${executionTracking.executionProgress}%`,
              }}
            />
          </div>
        </div>

        <div>
          <p className="text-sm text-slate-500">Beneficio obtenido</p>

          <p className="mt-2 text-3xl font-bold text-emerald-600">
            {executionTracking.obtainedBenefit}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Pendiente: {executionTracking.pendingBenefit}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ExecutiveExecutionTrackingSection;