import type {
  ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleDefinition,
} from './operationalKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleDefinitionService';

export type ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleComparisonCorrespondence =
  {
    compatibilityRuleDefinition:
      ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleDefinition;

    correspondenceType:
      'explicit-criterion-scope-compatibility-rule-comparison-correspondence';
  };

export function establishProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleComparisonCorrespondence(
  compatibilityRuleDefinition:
    ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleDefinition
): ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleComparisonCorrespondence {
  return {
    compatibilityRuleDefinition,
    correspondenceType:
      'explicit-criterion-scope-compatibility-rule-comparison-correspondence',
  };
}
