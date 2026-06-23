export interface OperationalSaturationPrediction {
  currentSaturation: number;
  projectedSaturation: number;
  daysToRisk: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  trend: 'stable' | 'up' | 'down';
  explanation: string;
  recommendedAction: string;
}

export async function predictOperationalSaturation(): Promise<
  OperationalSaturationPrediction
> {
  const currentSaturation = 68;
  const projectedSaturation = 82;
  const daysToRisk = 7;

  let riskLevel: OperationalSaturationPrediction['riskLevel'] = 'low';

  if (projectedSaturation >= 95) {
    riskLevel = 'critical';
  } else if (projectedSaturation >= 85) {
    riskLevel = 'high';
  } else if (projectedSaturation >= 75) {
    riskLevel = 'medium';
  }

  return {
    currentSaturation,
    projectedSaturation,
    daysToRisk,
    riskLevel,
    trend: projectedSaturation > currentSaturation ? 'up' : 'stable',
    explanation:
      'La tendencia operativa indica un incremento gradual en la ocupación del almacén. Si el patrón continúa, podrían presentarse riesgos de saturación en el corto plazo.',
    recommendedAction:
      'Ejecutar consolidaciones preventivas y liberar posiciones estratégicas antes de alcanzar el umbral de riesgo.',
  };
}