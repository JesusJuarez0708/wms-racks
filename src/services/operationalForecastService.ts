import { calculateOperationalHealth } from './operationalHealthService';
import { calculateOperationalTrend } from './operationalTrendService';

export type OperationalForecast = {
  riskLevel: 'low' | 'medium' | 'high';
  prediction: string;
  projectedHealth: number;
  preventiveAction: string;
};

export async function generateOperationalForecast(): Promise<OperationalForecast> {
  const health = await calculateOperationalHealth();
  const trend = calculateOperationalTrend();

  let projectedHealth = health.score;

  if (trend.trend === 'up') {
    projectedHealth += trend.delta;
  }

  if (trend.trend === 'down') {
    projectedHealth -= trend.delta;
  }

  projectedHealth = Math.max(
    0,
    Math.min(100, projectedHealth)
  );

  if (projectedHealth >= 80) {
    return {
      riskLevel: 'low',
      projectedHealth,
      prediction:
        'La operación mantiene una tendencia saludable y estable.',
      preventiveAction:
        'Mantener monitoreo regular y conservar las condiciones operativas actuales.',
    };
  }

  if (projectedHealth >= 60) {
    return {
      riskLevel: 'medium',
      projectedHealth,
      prediction:
        'Se recomienda monitoreo preventivo para evitar deterioro operativo.',
      preventiveAction:
        'Priorizar consolidaciones recomendadas y revisar oportunidades de fragmentación.',
    };
  }

  return {
    riskLevel: 'high',
    projectedHealth,
    prediction:
      'Existe riesgo de deterioro operativo si no se ejecutan acciones correctivas.',
    preventiveAction:
        'Ejecutar acciones correctivas inmediatas y revisar zonas con mayor riesgo operativo.',
  };
}