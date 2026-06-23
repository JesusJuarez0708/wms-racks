import {
  getExecutiveKpiDashboard,
} from './executiveKpiService';

import {
  getExecutiveIntelligenceCore,
} from './executiveIntelligenceCoreService';

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

  const core =
  await getExecutiveIntelligenceCore();

  const priorities =
    await generateExecutivePriorities();

  return {
    globalStatus: core.globalStatus,
    executiveScore: kpi.executiveScore,
    riskLevel: core.riskLevel,
    topPriority:
      priorities[0]?.title ??
      'Sin prioridades críticas',

    summary: core.executiveNarrative,
  };
}