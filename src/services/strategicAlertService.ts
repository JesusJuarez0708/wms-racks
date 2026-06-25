import {
  getExecutiveKpiDashboard,
} from './executiveKpiService';

import {
  calculateExecutiveRiskIntelligence,
} from './executiveRiskIntelligenceService';

import {
  predictOperationalSaturation,
} from './operationalSaturationPredictorService';

export interface StrategicAlert {
  id: string;

  title: string;

  severity: 'critical' | 'high' | 'medium';

  impact: string;

  recommendation: string;
}

export async function generateStrategicAlerts():
  Promise<StrategicAlert[]> {
  const alerts: StrategicAlert[] = [];

  const kpi =
    await getExecutiveKpiDashboard();

  const risk =
    calculateExecutiveRiskIntelligence();

  const saturation =
    predictOperationalSaturation();

  if (kpi.executiveScore < 40) {
    alerts.push({
      id: 'EXEC-001',
      title: 'Score ejecutivo crítico',
      severity: 'critical',
      impact:
        'La operación presenta deterioro ejecutivo significativo.',
      recommendation:
        'Atender prioridades críticas y acciones correctivas inmediatas.',
    });
  }

  if (kpi.complianceRate < 60) {
    alerts.push({
      id: 'COMP-001',
      title: 'Cumplimiento operativo bajo',
      severity: 'high',
      impact:
        'Incremento de desviaciones operativas y baja ejecución.',
      recommendation:
        'Ejecutar recomendaciones pendientes y reforzar seguimiento.',
    });
  }

  if (kpi.activeAlerts > 0) {
    alerts.push({
      id: 'ALERT-001',
      title: 'Alertas operativas activas',
      severity: 'medium',
      impact:
        'Existen condiciones operativas que requieren monitoreo.',
      recommendation:
        'Revisar alertas activas y priorizar las de mayor impacto.',
    });
  }

  if (risk.riskLevel === 'critical') {
    alerts.push({
      id: 'RISK-001',
      title: 'Riesgo operativo crítico',
      severity: 'critical',
      impact:
        'Posible afectación inmediata a la operación.',
      recommendation:
        'Ejecutar acciones correctivas prioritarias.',
    });
  }

  if (saturation.projectedOccupancy >= 90) {
    alerts.push({
      id: 'SAT-001',
      title: 'Saturación proyectada superior al 90%',
      severity: 'high',
      impact:
        'Reducción de capacidad disponible.',
      recommendation:
        'Liberar posiciones estratégicas.',
    });
  }

  return alerts;
}