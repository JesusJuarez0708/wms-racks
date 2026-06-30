import type {
  ExecutiveSimulationResult,
} from './executiveDecisionSimulatorService';

export interface PrioritizedExecutiveScenario {
  id: string;
  scenario: string;
  currentValue: number;
  projectedValue: number;
  impact: string;
  recommendation: string;
  priorityScore: number;
  priorityLevel: 'Crítica' | 'Alta' | 'Media' | 'Baja';
}

export function prioritizeExecutiveScenarios(
  scenarios: ExecutiveSimulationResult[],
): PrioritizedExecutiveScenario[] {
  return scenarios
    .map((scenario, index) => {
      const valueDrop =
        scenario.currentValue - scenario.projectedValue;

      let priorityScore =
        valueDrop * 5;

      if (scenario.impact.toLowerCase().includes('riesgo')) {
        priorityScore += 25;
      }

      if (scenario.impact.toLowerCase().includes('bloqueo')) {
        priorityScore += 30;
      }

      if (scenario.impact.toLowerCase().includes('logística')) {
        priorityScore += 20;
      }

      if (scenario.impact.toLowerCase().includes('operativo')) {
        priorityScore += 15;
      }

      let priorityLevel:
        | 'Crítica'
        | 'Alta'
        | 'Media'
        | 'Baja';

      if (priorityScore >= 90) {
        priorityLevel = 'Crítica';
      } else if (priorityScore >= 70) {
        priorityLevel = 'Alta';
      } else if (priorityScore >= 45) {
        priorityLevel = 'Media';
      } else {
        priorityLevel = 'Baja';
      }

      return {
        id: `prioritized-scenario-${index + 1}`,
        scenario: scenario.scenario,
        currentValue: scenario.currentValue,
        projectedValue: scenario.projectedValue,
        impact: scenario.impact,
        recommendation: scenario.recommendation,
        priorityScore,
        priorityLevel,
      };
    })
    .sort(
      (a, b) =>
        b.priorityScore - a.priorityScore,
    );
}