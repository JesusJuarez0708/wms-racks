import type {
  ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityAssessment,
} from './operationalKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityAssessmentService';

export type ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityResultValue =
  | 'compatible'
  | 'incompatible';

export type ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityResult = {
  resultType:
    'explicit-criterion-scope-compatibility-result';

  compatibilityAssessment:
    ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityAssessment;

  compatibilityResult:
    ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityResultValue;
};

export function concludeProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibility(
  compatibilityAssessment:
    ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityAssessment
): ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityResult {
  return {
    resultType:
      'explicit-criterion-scope-compatibility-result',

    compatibilityAssessment,

    compatibilityResult:
      compatibilityAssessment
        .ruleDispositionInterpretation
        .interpretedDisposition,
  };
}