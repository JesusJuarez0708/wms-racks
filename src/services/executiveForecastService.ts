import { calculateOperationalHealth } from './operationalHealthService';
import { generateExecutivePriorities } from './executivePriorityService';
import { calculateExecutiveRiskIntelligence } from './executiveRiskIntelligenceService';

export type ExecutiveForecast = {
  currentScore: number;
  projectedScore: number;
  trend: 'improving' | 'stable' | 'declining';
  forecastLevel: 'low' | 'medium' | 'high';
  explanation: string;
  recommendedAction: string;
};

export async function generateExecutiveForecast():
  Promise<ExecutiveForecast> {
  const health = await calculateOperationalHealth();

  const priorities =
    await generateExecutivePriorities();

  const risk =
    await calculateExecutiveRiskIntelligence();

  let projectedScore = health.score;

  projectedScore += priorities.length * 2;

  projectedScore -= risk.riskScore * 0.1;

  projectedScore =
    Math.max(
      0,
      Math.min(
        100,
        Math.round(projectedScore),
      ),
    );

  let trend: ExecutiveForecast['trend'] =
    'stable';

  if (projectedScore > health.score + 3) {
    trend = 'improving';
  } else if (
    projectedScore <
    health.score - 3
  ) {
    trend = 'declining';
  }

  let forecastLevel:
    ExecutiveForecast['forecastLevel'] =
      'low';

  if (projectedScore < 40) {
    forecastLevel = 'high';
  } else if (projectedScore < 70) {
    forecastLevel = 'medium';
  }

  const explanation =
    trend === 'improving'
      ? 'La tendencia proyectada indica mejora operativa.'
      : trend === 'declining'
      ? 'La tendencia proyectada indica deterioro operativo.'
      : 'La operación se mantendrá relativamente estable.';

  const recommendedAction =
    trend === 'declining'
      ? 'Ejecutar inmediatamente las prioridades ejecutivas.'
      : trend === 'improving'
      ? 'Mantener el ritmo de ejecución actual.'
      : 'Continuar monitoreo preventivo.';

  return {
    currentScore: health.score,
    projectedScore,
    trend,
    forecastLevel,
    explanation,
    recommendedAction,
  };
}