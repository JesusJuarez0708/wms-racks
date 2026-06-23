import { getExecutiveKpiDashboard } from './executiveKpiService';

export interface ExecutiveIntelligenceCore {
  executiveScore: number;

  riskLevel:
    | 'low'
    | 'medium'
    | 'high'
    | 'critical';

  globalStatus:
    | 'excellent'
    | 'good'
    | 'attention'
    | 'critical';

  executiveNarrative: string;
}

export async function getExecutiveIntelligenceCore():
  Promise<ExecutiveIntelligenceCore> {
  const kpi = await getExecutiveKpiDashboard();

  const executiveScore = kpi.executiveScore;

  let riskLevel:
    | 'low'
    | 'medium'
    | 'high'
    | 'critical';

  let globalStatus:
    | 'excellent'
    | 'good'
    | 'attention'
    | 'critical';

  if (executiveScore >= 85) {
    riskLevel = 'low';
    globalStatus = 'excellent';
  } else if (executiveScore >= 70) {
    riskLevel = 'medium';
    globalStatus = 'good';
  } else if (executiveScore >= 50) {
    riskLevel = 'high';
    globalStatus = 'attention';
  } else {
    riskLevel = 'critical';
    globalStatus = 'critical';
  }

  const executiveNarrative =
    globalStatus === 'excellent'
      ? 'La operación mantiene un desempeño sobresaliente.'
      : globalStatus === 'good'
      ? 'La operación se mantiene estable con oportunidades menores de mejora.'
      : globalStatus === 'attention'
      ? 'La operación requiere seguimiento ejecutivo preventivo.'
      : 'La operación requiere atención ejecutiva inmediata.';

  return {
    executiveScore,
    riskLevel,
    globalStatus,
    executiveNarrative,
  };
}