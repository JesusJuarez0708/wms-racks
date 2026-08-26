import type {
  ProductiveKnowledgeRecommendationEffectRelevanceEvaluationResult,
} from './operationalKnowledgeRecommendationEffectRelevanceEvaluationResultService';

import type {
  ProductiveKnowledgeRecommendationDeliberativeParticipation,
} from './operationalKnowledgeRecommendationDeliberativeParticipationService';

export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeUtilization =
  {
    evaluationResult:
      ProductiveKnowledgeRecommendationEffectRelevanceEvaluationResult;

    deliberativeParticipation:
      ProductiveKnowledgeRecommendationDeliberativeParticipation;

    utilizationType:
      'explicit-evaluation-result-deliberative-utilization';
  };

export function useProductiveKnowledgeRecommendationEvaluationResultInDeliberation(
  evaluationResult:
    ProductiveKnowledgeRecommendationEffectRelevanceEvaluationResult,
  deliberativeParticipation:
    ProductiveKnowledgeRecommendationDeliberativeParticipation
):
  | ProductiveKnowledgeRecommendationEvaluationResultDeliberativeUtilization
  | null {
  const evaluatedRecommendation =
    evaluationResult
      .criterionUtilization
      .evaluation
      .evaluationScope
      .relevanceBoundary
      .relevance
      .interpretation
      .effect
      .reach
      .recommendation;

  if (
    evaluatedRecommendation !==
    deliberativeParticipation.recommendation
  ) {
    return null;
  }

  return {
    evaluationResult,
    deliberativeParticipation,
    utilizationType:
      'explicit-evaluation-result-deliberative-utilization',
  };
}
