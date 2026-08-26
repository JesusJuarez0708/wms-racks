import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeUtilization,
} from './operationalKnowledgeRecommendationEvaluationResultDeliberativeUtilizationService';

export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluence =
  {
    evaluationResultDeliberativeUtilization:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeUtilization;

    influenceType:
      'explicit-evaluation-result-deliberative-influence';
  };

export function establishProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluence(
  evaluationResultDeliberativeUtilization:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeUtilization
): ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluence {
  return {
    evaluationResultDeliberativeUtilization,
    influenceType:
      'explicit-evaluation-result-deliberative-influence',
  };
}
