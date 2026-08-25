import type {
  ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleDispositionInterpretation,
} from './operationalKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleDispositionInterpretationService';

export type ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityAssessment = {
  assessmentType:
    'explicit-criterion-scope-compatibility-assessment';

  ruleDispositionInterpretation:
    ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleDispositionInterpretation;
};

export function assessProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibility(
  ruleDispositionInterpretation:
    ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleDispositionInterpretation
): ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityAssessment {
  return {
    assessmentType:
      'explicit-criterion-scope-compatibility-assessment',

    ruleDispositionInterpretation,
  };
}
