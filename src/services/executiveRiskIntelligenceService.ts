import {
  generateOperationalAlerts,
} from './operationalIntelligenceService';

import {
  generateOptimizationRecommendations,
} from './operationalOptimizationService';

export interface ExecutiveRiskIntelligence {
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  explanation: string;
  recommendedAction: string;
}

export async function calculateExecutiveRiskIntelligence():
  Promise<ExecutiveRiskIntelligence> {
  const alerts = await generateOperationalAlerts();

  const recommendations =
    await generateOptimizationRecommendations();

  const highPriorityAlerts = alerts.filter(
    (alert) => alert.priority === 'high',
  );

  const riskScore = Math.min(
    100,
    alerts.length * 10 +
      highPriorityAlerts.length * 20 +
      recommendations.length * 5,
  );

  let riskLevel: 'low' | 'medium' | 'high' | 'critical' =
    'low';

  if (riskScore >= 80) {
    riskLevel = 'critical';
  } else if (riskScore >= 60) {
    riskLevel = 'high';
  } else if (riskScore >= 35) {
    riskLevel = 'medium';
  }

  const explanation =
    `El sistema detecta ${alerts.length} alertas activas, ` +
    `${highPriorityAlerts.length} de alta prioridad y ` +
    `${recommendations.length} recomendaciones operativas pendientes. ` +
    `El riesgo consolidado actual es ${riskScore}/100.`;

  const recommendedAction =
    riskLevel === 'critical'
      ? 'Ejecutar acciones correctivas inmediatas y detener nuevas entradas no prioritarias.'
      : riskLevel === 'high'
        ? 'Atender primero las alertas de alta prioridad y ejecutar consolidaciones recomendadas.'
        : riskLevel === 'medium'
          ? 'Programar acciones preventivas durante la operación del día.'
          : 'Mantener monitoreo operativo preventivo.';

  return {
    riskScore,
    riskLevel,
    explanation,
    recommendedAction,
  };
}