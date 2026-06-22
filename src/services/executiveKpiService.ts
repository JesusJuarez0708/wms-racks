import {
  calculateOperationalCompliance,
} from './operationalComplianceService';

import {
  generateOperationalAlerts,
} from './operationalIntelligenceService';

export interface ExecutiveKpiDashboard {
  complianceRate: number;
  executedRecommendations: number;
  activeAlerts: number;
  operationalRisks: number;
  executiveScore: number;
}

export async function getExecutiveKpiDashboard(): Promise<ExecutiveKpiDashboard> {
  const compliance = await calculateOperationalCompliance();

  const alerts = await generateOperationalAlerts();

  const activeAlerts = alerts;
  
  const operationalRisks = activeAlerts.filter(
    (alert) => alert.priority === 'high',
);

  const executiveScore = Math.max(
    0,
    Math.min(
      100,
      Math.round(
        compliance.complianceRate -
          activeAlerts.length * 3 -
          operationalRisks.length * 5,
      ),
    ),
  );

  return {
    complianceRate: compliance.complianceRate,
    executedRecommendations: compliance.complianceRate > 0 ? 1 : 0,
    activeAlerts: activeAlerts.length,
    operationalRisks: operationalRisks.length,
    executiveScore,
  };
}