import type {
  ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityDisposition,
} from './operationalKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleDefinitionService';

import type {
  ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleApplication,
} from './operationalKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleApplicationService';

export type ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleDispositionInterpretation =
  {
    ruleApplication:
      ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleApplication;

    interpretedDisposition:
      ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityDisposition;

    interpretationType:
      'explicit-applied-criterion-scope-compatibility-rule-disposition-interpretation';
  };

export function interpretProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleDisposition(
  ruleApplication:
    ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleApplication
): ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleDispositionInterpretation {
  const declaredDisposition =
    ruleApplication
      .conditionSatisfaction
      .ruleComparisonCorrespondence
      .compatibilityRuleDefinition
      .definitionInput
      .declaredDisposition;

  return {
    ruleApplication,
    interpretedDisposition: declaredDisposition,
    interpretationType:
      'explicit-applied-criterion-scope-compatibility-rule-disposition-interpretation',
  };
}