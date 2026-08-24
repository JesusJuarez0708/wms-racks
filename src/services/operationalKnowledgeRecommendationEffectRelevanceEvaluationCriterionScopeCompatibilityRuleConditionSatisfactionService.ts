import type {
  ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleComparisonCorrespondence,
} from './operationalKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleComparisonCorrespondenceService';

export type ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleConditionSatisfactionResult =
  | 'satisfied'
  | 'not-satisfied';

export type ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleConditionSatisfaction =
  {
    ruleComparisonCorrespondence:
      ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleComparisonCorrespondence;

    satisfactionResult:
      ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleConditionSatisfactionResult;

    satisfactionType:
      'explicit-criterion-scope-compatibility-rule-condition-satisfaction';
  };

export function establishProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleConditionSatisfaction(
  ruleComparisonCorrespondence:
    ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleComparisonCorrespondence
): ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleConditionSatisfaction {
  const compatibilityRuleDefinition =
    ruleComparisonCorrespondence.compatibilityRuleDefinition;

  const definitionInput =
    compatibilityRuleDefinition.definitionInput;

  const semanticComparison =
    compatibilityRuleDefinition.compatibilityRulePresence.semanticComparison;

  let satisfactionResult:
    ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeCompatibilityRuleConditionSatisfactionResult;

  if (definitionInput.basis === 'semantic-comparison-result') {
    satisfactionResult =
      definitionInput.condition.comparisonResult ===
      semanticComparison.comparisonResult
        ? 'satisfied'
        : 'not-satisfied';
  } else {
    const actualCriterionSubject =
      semanticComparison.criterionDefinition.definitionInput.criterionSubject;

    const actualTargetType =
      semanticComparison.criterionDefinition.criterionPresence.evaluationScope
        .evaluationContext.targetType;

    const criterionSubjectSatisfied =
      definitionInput.condition.criterionSubject === actualCriterionSubject;

    const targetTypeSatisfied =
      definitionInput.condition.targetType === actualTargetType;

    satisfactionResult =
      criterionSubjectSatisfied && targetTypeSatisfied
        ? 'satisfied'
        : 'not-satisfied';
  }

  return {
    ruleComparisonCorrespondence,
    satisfactionResult,
    satisfactionType:
      'explicit-criterion-scope-compatibility-rule-condition-satisfaction',
  };
}