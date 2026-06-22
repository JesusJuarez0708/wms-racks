import { generateOperationalAlerts } from './operationalIntelligenceService';
import { generateOptimizationRecommendations } from './operationalOptimizationService';

export type OperationalNarrative = {
  summary: string;
  status: 'excellent' | 'good' | 'warning' | 'critical';
};

export async function generateOperationalNarrative(): Promise<OperationalNarrative> {
  const alerts = await generateOperationalAlerts();
  const recommendations = await generateOptimizationRecommendations();

  const recommendationCount = recommendations.length;

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
    const topRecommendation = recommendations[0];

    const actionText =
      topRecommendation.action ??
      'No se definió una acción específica.';

    const timingText =
      topRecommendation.level === 'critical'
        ? 'Se recomienda ejecutar esta acción antes de nuevas entradas de producto.'
        : topRecommendation.level === 'high'
          ? 'Se recomienda programar esta acción durante la siguiente ventana operativa.'
          : topRecommendation.level === 'medium'
            ? 'Se recomienda considerar esta acción dentro del plan operativo del día.'
            : 'Esta acción puede mantenerse en observación sin intervención inmediata.';

    const trendText =
    recommendationCount >= 10
      ? 'Se observa una presión operativa elevada que requiere seguimiento continuo.'
      : recommendationCount >= 5
        ? 'La operación presenta oportunidades moderadas de optimización.'
        : 'La operación mantiene un comportamiento estable con pocas oportunidades de mejora.';

    const priorityText =
    topRecommendation.score >= 90
      ? 'CRÍTICA'
      : topRecommendation.score >= 70
        ? 'ALTA'
        : topRecommendation.score >= 40
          ? 'MEDIA'
          : 'BAJA';

    return {
      status: 'good',
      summary:
        `La operación es estable. ` +
        `Se identificó una oportunidad de optimización con prioridad ${priorityText}: ${topRecommendation.title}. ` +
        `Impacto esperado: ${topRecommendation.expectedImpact} ` +
        `Acción recomendada: ${actionText} ` +
        `${timingText} ${trendText}`,
    };
  }

  return {
    status: 'excellent',
    summary:
      'La operación se encuentra en condiciones óptimas. No se detectan riesgos ni oportunidades críticas de mejora en este momento.',
  };
}