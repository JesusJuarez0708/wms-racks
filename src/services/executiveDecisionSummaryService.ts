import {
  getExecutiveKpiDashboard,
} from './executiveKpiService';

export interface ExecutiveDecisionSummary {
  title: string;
  summary: string;
  priority: 'high' | 'medium' | 'low';
}

export async function generateExecutiveDecisionSummary(): Promise<ExecutiveDecisionSummary> {
  const kpi =
    await getExecutiveKpiDashboard();

  let priority: 'high' | 'medium' | 'low' =
    'low';

  if (kpi.executiveScore < 50) {
    priority = 'high';
  } else if (kpi.executiveScore < 75) {
    priority = 'medium';
  }

  const summary =
    `La operación presenta un cumplimiento de ${kpi.complianceRate}% ` +
    `con ${kpi.activeAlerts} alertas activas. ` +
    `El score ejecutivo actual es ${kpi.executiveScore}/100. ` +
    `Se recomienda atender prioritariamente los riesgos identificados.`;

  return {
    title: 'Resumen Ejecutivo',
    summary,
    priority,
  };
}