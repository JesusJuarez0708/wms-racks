import type {
  ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityResult,
} from './operationalKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityResultService';

export type ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionApplicabilityResult =
  | 'applicable'
  | 'not-applicable';

export type ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionApplicability =
  {
    compatibilityResult:
      ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityResult;

    applicabilityType:
      'explicit-criterion-scope-applicability';

    applicabilityResult:
      ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionApplicabilityResult;
  };

export function establishProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionApplicability(
  compatibilityResult:
    ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityResult
): ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionApplicability {
  return {
    compatibilityResult,
    applicabilityType:
      'explicit-criterion-scope-applicability',
    applicabilityResult:
      compatibilityResult.compatibilityResult ===
      'compatible'
        ? 'applicable'
        : 'not-applicable',
  };
}
