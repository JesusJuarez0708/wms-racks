import {
  getExecutiveKpiDashboard,
} from './executiveKpiService';

import {
  generateExecutiveDecisionSummary,
} from './executiveDecisionSummaryService';

import {
  generateExecutivePriorities,
} from './executivePriorityService';

export interface ExecutiveCommandCenter {
  globalStatus: 'excellent' | 'good' | 'attention' | 'critical';

  executiveScore: number;

  riskLevel: 'low' | 'medium' | 'high' | 'critical';

  topPriority: string;

  summary: string;
}

export async function getExecutiveCommandCenter():
  Promise<ExecutiveCommandCenter> {
  const kpi = await getExecutiveKpiDashboard();

  const summaryData =
    await generateExecutiveDecisionSummary();

  const priorities =
    await generateExecutivePriorities();

  let globalStatus:
    | 'excellent'
    | 'good'
    | 'attention'
    | 'critical';

  if (kpi.executiveScore >= 85) {
    globalStatus = 'excellent';
  } else if (kpi.executiveScore >= 70) {
    globalStatus = 'good';
  } else if (kpi.executiveScore >= 50) {
    globalStatus = 'attention';
  } else {
    globalStatus = 'critical';
  }

  let riskLevel:
    | 'low'
    | 'medium'
    | 'high'
    | 'critical';

  if (kpi.operationalRisks >= 5) {
    riskLevel = 'critical';
  } else if (kpi.operationalRisks >= 3) {
    riskLevel = 'high';
  } else if (kpi.operationalRisks >= 1) {
    riskLevel = 'medium';
  } else {
    riskLevel = 'low';
  }

  return {
    globalStatus,
    executiveScore: kpi.executiveScore,
    riskLevel,
    topPriority:
      priorities[0]?.title ??
      'Sin prioridades críticas',

    summary: summaryData.summary,
  };
}