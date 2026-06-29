import type {
  StrategicRecommendation,
} from './strategicRecommendationEngineService';

export interface ExecutivePlanStep {
  order: number;
  recommendationId: string;
  title: string;
  priority: string;
  estimatedBenefit: string;
}

export interface ExecutiveExecutionPlan {
  steps: ExecutivePlanStep[];
  expectedExecutiveScore: number;
  expectedRiskLevel: string;
  expectedMaturity: string;
}

export function generateExecutiveExecutionPlan(
  recommendations: StrategicRecommendation[],
  executiveScore: number,
): ExecutiveExecutionPlan {

  const priorityOrder = {
    critical: 1,
    high: 2,
    medium: 3,
    low: 4,
  };

  const ordered = [...recommendations]
    .sort(
      (a, b) =>
        priorityOrder[a.priority] -
        priorityOrder[b.priority],
    );

  const steps: ExecutivePlanStep[] =
    ordered.map(
      (recommendation, index) => ({
        order: index + 1,

        recommendationId:
          recommendation.id,

        title:
          recommendation.title,

        priority:
          recommendation.priority,

        estimatedBenefit:
          recommendation.expectedImpact,
      }),
    );

  return {
    steps,

    expectedExecutiveScore:
      Math.min(
        executiveScore +
          recommendations.length * 8,
        100,
      ),

    expectedRiskLevel:
      recommendations.length >= 4
        ? 'MEDIO'
        : 'BAJO',

    expectedMaturity:
      recommendations.length >= 4
        ? 'En desarrollo'
        : 'Gestionado',
  };
}