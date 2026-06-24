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

  statusLabel: string;

  riskLabel: string;

  commandRecommendation: string;

  confidenceLevel: number;
}

function getStatusLabel(
  status: ExecutiveCommandCenter['globalStatus'],
): string {
  if (status === 'excellent') return 'Excelente';
  if (status === 'good') return 'Estable';
  if (status === 'attention') return 'Requiere atención';

  return 'Crítico';
}

function getRiskLabel(
  riskLevel: ExecutiveCommandCenter['riskLevel'],
): string {
  if (riskLevel === 'low') return 'Bajo';
  if (riskLevel === 'medium') return 'Medio';
  if (riskLevel === 'high') return 'Alto';

  return 'Crítico';
}

function getCommandRecommendation(
  status: ExecutiveCommandCenter['globalStatus'],
  topPriority: string,
): string {
  if (status === 'excellent') {
    return 'Mantener operación actual y monitorear indicadores clave.';
  }

  if (status === 'good') {
    return 'Ejecutar seguimiento preventivo sobre prioridades detectadas.';
  }

  if (status === 'attention') {
    return `Atender prioridad operativa: ${topPriority}.`;
  }

  return `Intervención inmediata requerida: ${topPriority}.`;
}

export async function getExecutiveCommandCenter():
  Promise<ExecutiveCommandCenter> {
  const kpi = await getExecutiveKpiDashboard();

  const core =
    await getExecutiveIntelligenceCore();

  const priorities =
    await generateExecutivePriorities();

  const topPriority =
    priorities[0]?.title ??
    'Sin prioridades críticas';

  return {
    globalStatus: core.globalStatus,
    executiveScore: kpi.executiveScore,
    riskLevel: core.riskLevel,
    topPriority,

    summary: core.executiveNarrative,

    statusLabel: getStatusLabel(core.globalStatus),
    riskLabel: getRiskLabel(core.riskLevel),

    commandRecommendation:
      getCommandRecommendation(
        core.globalStatus,
        topPriority,
      ),

    confidenceLevel: 94,
  };
}