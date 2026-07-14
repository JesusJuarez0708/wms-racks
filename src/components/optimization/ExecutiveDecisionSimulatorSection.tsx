type SimulationResult = {
  scenario: string;
  impact: string;
  recommendation: string;
  currentValue: number;
  projectedValue: number;
};

type ExecutiveSimulationImpact = {
  currentScore: number;
  projectedScore: number;

  currentCompliance: number;
  projectedCompliance: number;

  currentAlerts: number;
  projectedAlerts: number;

  currentRisk: number;
  projectedRisk: number;

  recommendation: string;
};

type ExecutiveDecisionSimulatorSectionProps = {
  simulationResults: SimulationResult[];
  executiveSimulationImpact: ExecutiveSimulationImpact[];
};

export function ExecutiveDecisionSimulatorSection({
  simulationResults,
  executiveSimulationImpact,
}: ExecutiveDecisionSimulatorSectionProps) {
  if (simulationResults.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        Simulador Ejecutivo de Decisiones
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {simulationResults.map((item, index) => {
          const simulationImpact = executiveSimulationImpact[index];

          return (
            <div
              key={item.scenario}
              className="rounded-lg border border-slate-200 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {item.scenario}
                  </h3>

                  <p
                    className={`mt-2 text-sm font-medium ${
                      simulationImpact?.projectedScore >= 50
                        ? 'text-emerald-600'
                        : simulationImpact?.projectedScore >= 40
                          ? 'text-amber-600'
                          : 'text-red-600'
                    }`}
                  >
                    {item.impact}
                  </p>

                  <p className="mt-2 text-sm text-slate-600">
                    {item.recommendation}
                  </p>

                  {simulationImpact && (
                    <div className="mt-4 rounded-lg bg-slate-50 p-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Impacto ejecutivo
                      </p>

                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        <div>
                          <p className="text-xs font-semibold text-slate-500">
                            Score Ejecutivo
                          </p>

                          <p
                            className={`text-xl font-bold ${
                              simulationImpact.projectedScore >=
                              simulationImpact.currentScore
                                ? 'text-emerald-500'
                                : 'text-red-500'
                            }`}
                          >
                            {simulationImpact.currentScore} →{' '}
                            {simulationImpact.projectedScore}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-slate-400">
                            Cumplimiento
                          </p>

                          <p
                            className={`text-sm font-semibold ${
                              simulationImpact.projectedCompliance >=
                              simulationImpact.currentCompliance
                                ? 'text-emerald-600'
                                : 'text-red-600'
                            }`}
                          >
                            {simulationImpact.currentCompliance}% →{' '}
                            {simulationImpact.projectedCompliance}%
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-slate-400">
                            Alertas
                          </p>

                          <p
                            className={`text-sm font-semibold ${
                              simulationImpact.projectedAlerts <=
                              simulationImpact.currentAlerts
                                ? 'text-emerald-600'
                                : 'text-red-600'
                            }`}
                          >
                            {simulationImpact.currentAlerts} →{' '}
                            {simulationImpact.projectedAlerts}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-slate-400">
                            Riesgo
                          </p>

                          <p
                            className={`text-sm font-semibold ${
                              simulationImpact.projectedRisk <=
                              simulationImpact.currentRisk
                                ? 'text-emerald-600'
                                : 'text-red-600'
                            }`}
                          >
                            {simulationImpact.currentRisk} →{' '}
                            {simulationImpact.projectedRisk}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                          💡 Recomendación estratégica
                        </p>

                        <p className="mt-2 text-sm text-slate-700">
                          {simulationImpact.recommendation}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      simulationImpact?.projectedScore >= 50
                        ? 'bg-emerald-100 text-emerald-700'
                        : simulationImpact?.projectedScore >= 40
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {simulationImpact?.projectedScore >= 50
                      ? 'Muy recomendable'
                      : simulationImpact?.projectedScore >= 40
                        ? 'Evaluar'
                        : 'Alto riesgo'}
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                    {item.currentValue}% → {item.projectedValue}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}