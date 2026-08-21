import type {
  ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionDefinition,
} from './operationalKnowledgeRecommendationEffectRelevanceEvaluationCriterionDefinitionService';

export type ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeSemanticComparisonResult =
  | 'exact-match'
  | 'exact-mismatch';

export type ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeSemanticComparison = {
  criterionDefinition:
    ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionDefinition;

  comparisonResult:
    ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeSemanticComparisonResult;

  comparisonType:
    'explicit-criterion-scope-semantic-comparison';
};

export function establishProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeSemanticComparison(
  criterionDefinition:
    ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionDefinition
): ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionScopeSemanticComparison {
  const criterionSubject =
    criterionDefinition.definitionInput.criterionSubject;

  const targetType =
    criterionDefinition
      .criterionPresence
      .evaluationScope
      .evaluationContext
      .targetType;

  return {
    criterionDefinition,

    comparisonResult:
      criterionSubject === targetType
        ? 'exact-match'
        : 'exact-mismatch',

    comparisonType:
      'explicit-criterion-scope-semantic-comparison',
  };
}