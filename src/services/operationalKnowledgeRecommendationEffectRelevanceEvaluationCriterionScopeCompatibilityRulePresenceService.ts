import type {
  ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeSemanticComparison,
} from './operationalKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeSemanticComparisonService';

export type ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleInput = {
  compatibilityRuleId: string;
};

export type ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRulePresence =
  {
    semanticComparison:
      ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeSemanticComparison;

    compatibilityRuleInput:
      ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleInput;

    presenceType:
      'explicit-criterion-scope-compatibility-rule-present';
  };

export function establishProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRulePresence(
  semanticComparison:
    ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeSemanticComparison,
  compatibilityRuleInput:
    ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleInput
): ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRulePresence {
  return {
    semanticComparison,
    compatibilityRuleInput,
    presenceType:
      'explicit-criterion-scope-compatibility-rule-present',
  };
}