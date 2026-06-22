import { generateOptimizationRecommendations } from './operationalOptimizationService';

export type ActionPlanItem = {
  priority: 'high' | 'medium' | 'low';
  title: string;
  impact: string;
};

export async function generateActionPlan(): Promise<ActionPlanItem[]> {
  const recommendations =
    await generateOptimizationRecommendations();

  const plans: ActionPlanItem[] = recommendations
    .slice(0, 5)
    .map((recommendation) => ({
        priority:
        recommendation.level === 'critical'
            ? 'high'
            : recommendation.level === 'high'
            ? 'medium'
            : 'low',

      title: recommendation.title,

      impact:
        recommendation.expectedImpact ??
        'Mejora operativa estimada',
    }));

  return plans;
}