import {
  generateStrategicOpportunities,
} from './strategicOpportunityService';

import {
  calculateOperationalCompliance,
} from './operationalComplianceService';

import {
  predictOperationalSaturation,
} from './operationalSaturationPredictorService';

export interface AdaptiveStrategy {
  id: string;
  title: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  strategyType:
    | 'risk_mitigation'
    | 'capacity_optimization'
    | 'execution_improvement'
    | 'opportunity_acceleration';
  summary: string;
  recommendedAction: string;
  expectedImpact: string;
}

export async function generateAdaptiveStrategies():
  Promise<AdaptiveStrategy[]> {
  const strategies: AdaptiveStrategy[] = [];

  const opportunities =
    await generateStrategicOpportunities();

  const compliance =
    await calculateOperationalCompliance();

  const saturation =
    await predictOperationalSaturation();

  if (saturation.riskLevel === 'critical') {
    strategies.push({
      id: 'STR-001',
      title: 'Estrategia de contención operativa inmediata',
      priority: 'critical',
      strategyType: 'risk_mitigation',
      summary:
        'La operación presenta señales de saturación crítica que pueden afectar la continuidad operativa.',
      recommendedAction:
        'Priorizar liberación de posiciones, ejecución de órdenes críticas y reducción de movimientos no esenciales.',
      expectedImpact:
        'Disminución del riesgo operativo y recuperación gradual de capacidad disponible.',
    });
  }

  if (compliance.complianceRate < 70) {
    strategies.push({
      id: 'STR-002',
      title: 'Estrategia de recuperación de cumplimiento',
      priority: 'high',
      strategyType: 'execution_improvement',
      summary:
        'El cumplimiento operativo se encuentra por debajo del nivel esperado.',
      recommendedAction:
        'Reforzar seguimiento de órdenes, responsables y tiempos de ejecución.',
      expectedImpact:
        'Mejora en disciplina operativa y reducción de desviaciones pendientes.',
    });
  }

  if (opportunities.length > 0) {
    strategies.push({
      id: 'STR-003',
      title: 'Estrategia de aprovechamiento de oportunidades',
      priority: 'medium',
      strategyType: 'opportunity_acceleration',
      summary:
        'Se detectaron oportunidades estratégicas que pueden mejorar el desempeño del almacén.',
      recommendedAction:
        'Evaluar las oportunidades con mayor impacto y convertirlas en acciones ejecutables.',
      expectedImpact:
        'Incremento en eficiencia operativa y mejor uso de recursos disponibles.',
    });
  }

  if (saturation.riskLevel === 'high') {
    strategies.push({
      id: 'STR-004',
      title: 'Estrategia preventiva de capacidad',
      priority: 'medium',
      strategyType: 'capacity_optimization',
      summary:
        'La operación muestra señales tempranas de presión sobre la capacidad disponible.',
      recommendedAction:
        'Anticipar reubicaciones, liberar posiciones críticas y evitar acumulación en zonas saturadas.',
      expectedImpact:
        'Reducción de probabilidad de saturación crítica y mejora en continuidad operativa.',
    });
  }

  if (strategies.length === 0) {
    strategies.push({
      id: 'STR-005',
      title: 'Estrategia de estabilidad operativa',
      priority: 'low',
      strategyType: 'execution_improvement',
      summary:
        'La operación se mantiene estable y sin señales críticas relevantes.',
      recommendedAction:
        'Mantener monitoreo preventivo y seguimiento ejecutivo periódico.',
      expectedImpact:
        'Conservación de estabilidad operativa y prevención de riesgos futuros.',
    });
  }

  return strategies;
}