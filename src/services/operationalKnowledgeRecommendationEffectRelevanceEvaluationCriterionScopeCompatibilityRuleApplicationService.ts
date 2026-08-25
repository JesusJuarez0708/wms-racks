import type {
  ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleConditionSatisfaction,
} from './operationalKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleConditionSatisfactionService';

export type ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleApplication =
  {
    conditionSatisfaction:
      ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleConditionSatisfaction;

    applicationType:
      'explicit-criterion-scope-compatibility-rule-application';
  };

export function applyProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRule(
  conditionSatisfaction:
    ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleConditionSatisfaction
):
  | ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleApplication
  | null {
  if (
    conditionSatisfaction.satisfactionResult !==
    'satisfied'
  ) {
    return null;
  }

  return {
    conditionSatisfaction,
    applicationType:
      'explicit-criterion-scope-compatibility-rule-application',
  };
}