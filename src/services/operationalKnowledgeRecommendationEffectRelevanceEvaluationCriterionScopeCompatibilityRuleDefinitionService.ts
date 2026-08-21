import type {
  ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRulePresence,
} from './operationalKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRulePresenceService';

export type ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityDisposition =
  | 'compatible'
  | 'incompatible';

export type ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeComparisonResultBasedCompatibilityRuleDefinitionInput =
  {
    basis: 'semantic-comparison-result';

    condition: {
      comparisonResult:
        | 'exact-match'
        | 'exact-mismatch';
    };

    declaredDisposition:
      ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityDisposition;
  };

export type ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeOperandBasedCompatibilityRuleDefinitionInput =
  {
    basis: 'semantic-comparison-operands';

    condition: {
      criterionSubject: string;
      targetType: string;
    };

    declaredDisposition:
      ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityDisposition;
  };

export type ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleDefinitionInput =
  | ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeComparisonResultBasedCompatibilityRuleDefinitionInput
  | ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeOperandBasedCompatibilityRuleDefinitionInput;

export type ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleDefinition =
  {
    compatibilityRulePresence:
      ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRulePresence;

    definitionInput:
      ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleDefinitionInput;

    definitionType:
      'explicit-criterion-scope-compatibility-rule-semantic-definition';
  };

export function establishProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleDefinition(
  compatibilityRulePresence:
    ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRulePresence,
  definitionInput:
    ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleDefinitionInput
): ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleDefinition {
  return {
    compatibilityRulePresence,
    definitionInput,
    definitionType:
      'explicit-criterion-scope-compatibility-rule-semantic-definition',
  };
}