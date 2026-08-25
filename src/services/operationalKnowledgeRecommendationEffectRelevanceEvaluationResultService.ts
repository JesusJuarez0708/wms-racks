import type {
  ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionUtilization,
} from './operationalKnowledgeRecommendationEffectRelevanceEvaluationCriterionUtilizationService';

export type ProductiveKnowledgeRecommendationEffectRelevanceEvaluationConclusion =
  | 'evaluated-relevance-supported-by-criterion'
  | 'evaluated-relevance-not-supported-by-criterion';

export type ProductiveKnowledgeRecommendationEffectRelevanceEvaluationConclusionInput =
  {
    conclusion:
      ProductiveKnowledgeRecommendationEffectRelevanceEvaluationConclusion;
  };

export type ProductiveKnowledgeRecommendationEffectRelevanceEvaluationResult =
  {
    criterionUtilization:
      ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionUtilization;

    conclusionInput:
      ProductiveKnowledgeRecommendationEffectRelevanceEvaluationConclusionInput;

    resultType:
      'explicit-knowledge-effect-relevance-evaluation-result';
  };

export function establishProductiveKnowledgeRecommendationEffectRelevanceEvaluationResult(
  criterionUtilization:
    ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionUtilization,
  conclusionInput:
    ProductiveKnowledgeRecommendationEffectRelevanceEvaluationConclusionInput
): ProductiveKnowledgeRecommendationEffectRelevanceEvaluationResult {
  return {
    criterionUtilization,
    conclusionInput,
    resultType:
      'explicit-knowledge-effect-relevance-evaluation-result',
  };
}