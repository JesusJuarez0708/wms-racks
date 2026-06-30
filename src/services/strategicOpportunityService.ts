import {
  calculateOperationalHealth,
} from './operationalHealthService';

import {
  calculateOperationalCompliance,
} from './operationalComplianceService';

import {
  predictOperationalSaturation,
} from './operationalSaturationPredictorService';

import {
  calculateExecutiveRiskIntelligence,
} from './executiveRiskIntelligenceService';

export interface StrategicOpportunity {
  id: string;

  title: string;

  description: string;

  impact: string;

  estimatedBenefit: string;

  priority: 'high' | 'medium' | 'low';
}

export async function generateStrategicOpportunities(): Promise<StrategicOpportunity[]> {

  const opportunities: StrategicOpportunity[] = [];

  const health =
    await calculateOperationalHealth();

  const compliance =
    await calculateOperationalCompliance();

  const saturation =
    await predictOperationalSaturation();

  const risk =
    await calculateExecutiveRiskIntelligence();

  if (health.score >= 90) {
    opportunities.push({
      id: 'OP-001',
      title: 'Optimizar rutas de montacargas',
      description:
        'La operación muestra una salud excelente para optimizar recorridos.',
      impact:
        'Reducción de tiempos operativos.',
      estimatedBenefit:
        '5% - 12% menos recorridos.',
      priority: 'high',
    });
  }

  if (compliance.complianceRate >= 95) {
    opportunities.push({
      id: 'OP-002',
      title: 'Automatizar procesos repetitivos',
      description:
        'El alto cumplimiento permite incrementar la automatización.',
      impact:
        'Mayor productividad.',
      estimatedBenefit:
        'Incremento de eficiencia operativa.',
      priority: 'medium',
    });
  }

  if (saturation.projectedSaturation < 70) {
    opportunities.push({
      id: 'OP-003',
      title: 'Incrementar capacidad comercial',
      description:
        'Existe disponibilidad para captar nuevos clientes.',
      impact:
        'Mayor utilización del almacén.',
      estimatedBenefit:
        'Incremento de ingresos.',
      priority: 'high',
    });
  }

  if (risk.riskLevel === 'low') {
    opportunities.push({
      id: 'OP-004',
      title: 'Expandir operaciones',
      description:
        'El nivel de riesgo permite crecer de forma controlada.',
      impact:
        'Mayor capacidad logística.',
      estimatedBenefit:
        'Expansión segura.',
      priority: 'medium',
    });
  }

  return opportunities;
}