import { generateActionPlan } from './operationalActionPlanService';
import { simulateOperationalImpact } from './operationalImpactSimulatorService';

export type OperationalExecutionTracking = {
  totalActions: number;
  executedActions: number;
  pendingActions: number;
  executionProgress: number;
  obtainedBenefit: number;
  pendingBenefit: number;
};

export async function trackOperationalExecution(): Promise<OperationalExecutionTracking> {
  const actionPlan = await generateActionPlan();
  const impact = await simulateOperationalImpact();

  const totalActions = actionPlan.length;

  const executedActions = Math.floor(totalActions * 0.4);
  const pendingActions = totalActions - executedActions;

  const executionProgress =
    totalActions === 0
      ? 0
      : Math.round((executedActions / totalActions) * 100);

  const obtainedBenefit = Number(
    ((impact.estimatedPositionsReleased * executionProgress) / 100).toFixed(1)
  );

  const pendingBenefit = Number(
    (impact.estimatedPositionsReleased - obtainedBenefit).toFixed(1)
  );

  return {
    totalActions,
    executedActions,
    pendingActions,
    executionProgress,
    obtainedBenefit,
    pendingBenefit,
  };
}