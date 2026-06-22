import { generateActionPlan } from './operationalActionPlanService';
import { simulateOperationalImpact } from './operationalImpactSimulatorService';

export type ExecutivePriority = {
  rank: number;
  title: string;
  priority: 'high' | 'medium' | 'low';
  reason: string;
  expectedBenefit: string;
};

export async function generateExecutivePriorities(): Promise<
  ExecutivePriority[]
> {
  const actionPlan = await generateActionPlan();
  const impact = await simulateOperationalImpact();

  return actionPlan.slice(0, 3).map((item, index) => ({
    rank: index + 1,
    title: item.title,
    priority: item.priority,
    reason:
      item.priority === 'high'
        ? 'Debe atenderse primero por su alto impacto operativo.'
        : item.priority === 'medium'
          ? 'Conviene programarla después de las acciones críticas.'
          : 'Puede ejecutarse como mejora complementaria.',
    expectedBenefit:
      index === 0
        ? `Mejora estimada de salud operativa: +${impact.healthDelta} puntos.`
        : item.impact,
  }));
}