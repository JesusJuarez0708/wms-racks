import { predictOperationalSaturation } from './operationalSaturationPredictorService';

export interface PredictiveWorkOrderSuggestion {
  id: string;
  title: string;
  type: 'preventive_consolidation';
  priority: 'low' | 'medium' | 'high' | 'critical';
  trigger: string;
  suggestedAction: string;
  expectedBenefit: string;
  status: 'suggested';
}

export async function generatePredictiveWorkOrderSuggestion(): Promise<
  PredictiveWorkOrderSuggestion | null
> {
  const saturation = await predictOperationalSaturation();

  if (saturation.projectedSaturation < 75) {
    return null;
  }

  return {
    id: 'OT-PRED-001',
    title: 'Consolidación preventiva por saturación proyectada',
    type: 'preventive_consolidation',
    priority: saturation.riskLevel,
    trigger: `Saturación proyectada de ${saturation.projectedSaturation}% en ${saturation.daysToRisk} días.`,
    suggestedAction:
      'Revisar posiciones con baja ocupación, consolidar pallets compatibles y liberar ubicaciones estratégicas.',
    expectedBenefit:
      'Reducir el riesgo de saturación operativa y mejorar la disponibilidad de posiciones antes de alcanzar el umbral crítico.',
    status: 'suggested',
  };
}