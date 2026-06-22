import { calculateOperationalHealth } from './operationalHealthService';
import { generateActionPlan } from './operationalActionPlanService';

export type OperationalImpactSimulation = {
  currentHealth: number;
  projectedHealth: number;
  healthDelta: number;
  estimatedPositionsReleased: number;
  currentFragmentationRisk: number;
  projectedFragmentationRisk: number;
  riskDelta: number;
};

export async function simulateOperationalImpact(): Promise<OperationalImpactSimulation> {
  const health = await calculateOperationalHealth();
  const actionPlan = await generateActionPlan();

  const highPriorityActions = actionPlan.filter(
    (action) => action.priority === 'high'
  ).length;

  const mediumPriorityActions = actionPlan.filter(
    (action) => action.priority === 'medium'
  ).length;

  const lowPriorityActions = actionPlan.filter(
    (action) => action.priority === 'low'
  ).length;

  const estimatedPositionsReleased =
    highPriorityActions * 2 +
    mediumPriorityActions * 1 +
    lowPriorityActions * 0.5;

  const healthDelta =
    highPriorityActions * 4 +
    mediumPriorityActions * 2 +
    lowPriorityActions * 1;

  const currentFragmentationRisk = Math.min(
    100,
    actionPlan.length * 12
  );

  const projectedFragmentationRisk = Math.max(
    0,
    currentFragmentationRisk - healthDelta * 3
  );

  const projectedHealth = Math.min(
    100,
    health.score + healthDelta
  );

  return {
    currentHealth: health.score,
    projectedHealth,
    healthDelta,
    estimatedPositionsReleased,
    currentFragmentationRisk,
    projectedFragmentationRisk,
    riskDelta:
      currentFragmentationRisk - projectedFragmentationRisk,
  };
}