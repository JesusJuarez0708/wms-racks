type ExecutiveImpactSimulation = {
  currentHealth: number;
  projectedHealth: number;
  healthDelta: number;
  estimatedPositionsReleased: number;
  currentFragmentationRisk: number;
  projectedFragmentationRisk: number;
  riskDelta: number;
};

type ExecutiveImpactSimulationSectionProps = {
  impactSimulation: ExecutiveImpactSimulation | null;
};

function ExecutiveImpactSimulationSection({
  impactSimulation,
}: ExecutiveImpactSimulationSectionProps) {
  if (!impactSimulation) {
    return null;
  }

  return (
    <div className="mt-6 rounded-xl border bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        Simulador de Impacto Operativo
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div>
          <p className="text-xs uppercase text-slate-500">
            Salud Operativa
          </p>

          <p className="mt-2 text-2xl font-bold text-emerald-600">
            {impactSimulation.currentHealth}
            {' → '}
            {impactSimulation.projectedHealth}
          </p>

          <p className="text-sm text-slate-500">
            Mejora estimada: +{impactSimulation.healthDelta}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase text-slate-500">
            Posiciones Liberadas
          </p>

          <p className="mt-2 text-2xl font-bold text-blue-600">
            {impactSimulation.estimatedPositionsReleased}
          </p>

          <p className="text-sm text-slate-500">
            Potencial de recuperación
          </p>
        </div>

        <div>
          <p className="text-xs uppercase text-slate-500">
            Riesgo de Fragmentación
          </p>

          <p className="mt-2 text-2xl font-bold text-amber-600">
            {impactSimulation.currentFragmentationRisk}
            {'% → '}
            {impactSimulation.projectedFragmentationRisk}%
          </p>

          <p className="text-sm text-slate-500">
            Reducción: {impactSimulation.riskDelta}%
          </p>
        </div>
      </div>
    </div>
  );
}

export default ExecutiveImpactSimulationSection;