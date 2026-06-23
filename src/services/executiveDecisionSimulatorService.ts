

export interface ExecutiveSimulationResult {
  scenario: string;
  currentValue: number;
  projectedValue: number;
  impact: string;
  recommendation: string;
}

export async function runExecutiveDecisionSimulation(): Promise<
  ExecutiveSimulationResult[]
> {
  const health = {
    score: 86,
  };

  const results: ExecutiveSimulationResult[] = [];

  results.push({
    scenario: 'Incrementar ocupación 20%',
    currentValue: health.score,
    projectedValue: Math.max(0, health.score - 12),
    impact: 'Mayor riesgo operativo',
    recommendation:
      'Preparar consolidaciones preventivas.',
  });

  results.push({
    scenario: 'Incrementar rotación alta',
    currentValue: health.score,
    projectedValue: Math.max(0, health.score - 8),
    impact: 'Mayor carga logística',
    recommendation:
      'Asignar recursos adicionales.',
  });

  results.push({
    scenario: 'Reducir capacidad disponible',
    currentValue: health.score,
    projectedValue: Math.max(0, health.score - 15),
    impact: 'Posibles bloqueos',
    recommendation:
      'Liberar posiciones estratégicas.',
  });

  results.push({
    scenario: 'Aumentar movimientos diarios',
    currentValue: health.score,
    projectedValue: Math.max(0, health.score - 10),
    impact: 'Incremento operativo',
    recommendation:
      'Monitorear productividad de montacargas.',
  });

  return results;
}