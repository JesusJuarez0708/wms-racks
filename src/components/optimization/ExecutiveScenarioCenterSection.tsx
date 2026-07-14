type ExecutiveScenario = {
  id: string;
  scenario: string;
  priorityScore: number;
  priorityLevel: string;
  projectedValue: number;
  impact: string;
  recommendation: string;
};

type ExecutiveScenarioCenterSectionProps = {
  prioritizedScenarios: ExecutiveScenario[];
};

export function ExecutiveScenarioCenterSection({
  prioritizedScenarios,
}: ExecutiveScenarioCenterSectionProps) {

  if (prioritizedScenarios.length === 0) {
    return null;
  }

  return (
    <>
      <div className="mt-6 rounded-xl border border-slate-700 bg-slate-900 p-6">
        <h2 className="mb-4 text-xl font-bold text-cyan-300">
          Centro Ejecutivo de Escenarios Priorizados
        </h2>

        <div className="space-y-4">
          {prioritizedScenarios.map((scenario) => (
            <div
              key={scenario.id}
              className="rounded-lg border border-slate-700 bg-slate-800 p-4"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-semibold text-white">
                  {scenario.scenario}
                </h3>

                <span className="rounded bg-cyan-700 px-3 py-1 text-sm font-semibold text-white">
                  Score {scenario.priorityScore}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-400">Prioridad</p>
                  <p className="font-semibold text-cyan-300">
                    {scenario.priorityLevel}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400">Valor proyectado</p>
                  <p className="font-semibold text-green-400">
                    {scenario.projectedValue}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400">Impacto</p>
                  <p className="font-semibold text-orange-300">
                    {scenario.impact}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400">Recomendación</p>
                  <p className="font-semibold text-white">
                    {scenario.recommendation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}