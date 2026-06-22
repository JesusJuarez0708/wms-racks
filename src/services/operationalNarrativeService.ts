import { generateOperationalAlerts } from './operationalIntelligenceService';
import { generateOptimizationRecommendations } from './operationalOptimizationService';

export type OperationalNarrative = {
  summary: string;
  status: 'excellent' | 'good' | 'warning' | 'critical';
};

export async function generateOperationalNarrative(): Promise<OperationalNarrative> {
  const alerts = await generateOperationalAlerts();
  const recommendations = await generateOptimizationRecommendations();

  const criticalAlerts = alerts.filter(
    (alert) => alert.priority === 'high'
  );

  if (criticalAlerts.length >= 3) {
    return {
      status: 'critical',
      summary:
        'La operación presenta múltiples riesgos operativos que requieren atención inmediata. Se recomienda ejecutar las acciones correctivas prioritarias identificadas por el sistema.',
    };
  }

  if (criticalAlerts.length > 0) {
    return {
      status: 'warning',
      summary:
        'Se detectaron alertas operativas relevantes. El sistema recomienda revisar las oportunidades de optimización y reubicación sugeridas.',
    };
  }

  if (recommendations.length > 0) {
    return {
      status: 'good',
      summary:
        'La operación es estable. Existen oportunidades de mejora que pueden incrementar la eficiencia y el aprovechamiento del almacén.',
    };
  }

  return {
    status: 'excellent',
    summary:
      'La operación se encuentra en condiciones óptimas. No se detectan riesgos ni oportunidades críticas de mejora en este momento.',
  };
}