export interface StrategicRecommendation {
  id: string;
  title: string;
  description: string;
  expectedImpact: string;
  suggestedAction: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  category:
    | 'compliance'
    | 'risk'
    | 'execution'
    | 'capacity'
    | 'optimization';
}

export function generateStrategicRecommendations(
  executiveScore: number,
  compliance: number,
  activeAlerts: number,
  riskScore: number,
): StrategicRecommendation[] {
  const recommendations: StrategicRecommendation[] = [];

  if (compliance < 60) {
    recommendations.push({
      id: 'REC-001',
      title: 'Incrementar cumplimiento operativo',
      description:
        'Priorizar la ejecución de recomendaciones y acciones pendientes para elevar el cumplimiento mínimo al 60%.',
      expectedImpact:
        'Mejora directa del Índice de Madurez Operativa y reducción de desviaciones.',
      
      suggestedAction:
        'Asignar responsable y ejecutar acciones pendientes.',

      priority: 'critical',
      category: 'compliance',
    });
  }

  if (executiveScore < 50) {
    recommendations.push({
      id: 'REC-002',
      title: 'Elevar Score Ejecutivo',
      description:
        'Atender primero las acciones de mayor impacto ejecutivo para recuperar estabilidad operativa.',
      expectedImpact:
        'Incremento esperado del Score Ejecutivo hacia el umbral mínimo de 50/100.',
    
      suggestedAction:
        'Priorizar acciones con mayor impacto ejecutivo.',

      priority: 'high',
      category: 'execution',
    });
  }

  if (activeAlerts > 0) {
    recommendations.push({
      id: 'REC-003',
      title: 'Atender alertas activas',
      description:
        'Clasificar y resolver alertas activas por severidad para reducir presión operativa.',
      expectedImpact:
        'Disminución de alertas abiertas y mejora en la lectura ejecutiva del almacén.',

      suggestedAction:
        'Revisar alertas activas y resolver las críticas primero.',

      priority: activeAlerts >= 3 ? 'high' : 'medium',
      category: 'risk',
    });
  }

  if (riskScore > 40) {
    recommendations.push({
      id: 'REC-004',
      title: 'Reducir riesgo operativo',
      description:
        'Aplicar acciones preventivas para controlar riesgos antes de escalar la operación.',
      expectedImpact:
        'Mayor estabilidad del almacén y avance hacia el siguiente nivel de madurez.',

      suggestedAction:
        'Aplicar acciones preventivas antes de escalar la operación.',

      priority: riskScore >= 70 ? 'critical' : 'high',
      category: 'risk',
    });
  }

  if (
    compliance >= 60 &&
    executiveScore >= 50 &&
    activeAlerts === 0 &&
    riskScore <= 40
  ) {
    recommendations.push({
      id: 'REC-005',
      title: 'Optimizar capacidad operativa',
      description:
        'La operación tiene condiciones para iniciar mejoras de eficiencia y aprovechamiento de capacidad.',
      expectedImpact:
        'Mejora gradual de productividad y preparación para niveles superiores de madurez.',

      suggestedAction:
        'Iniciar iniciativas de optimización operativa.',

      priority: 'medium',
      category: 'optimization',
    });
  }

  return recommendations;
}