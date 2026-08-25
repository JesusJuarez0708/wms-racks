import type {
  ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionApplicability,
} from './operationalKnowledgeRecommendationEffectRelevanceEvaluationCriterionApplicabilityService';

import type {
  ProductiveKnowledgeRecommendationEffectRelevanceEvaluation,
} from './operationalKnowledgeRecommendationEffectRelevanceEvaluationService';

export type ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionUtilization =
  {
    criterionApplicability:
      ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionApplicability;

    evaluation:
      ProductiveKnowledgeRecommendationEffectRelevanceEvaluation;

    utilizationType:
      'explicit-applicable-criterion-utilized-by-evaluation';
  };

export function utilizeProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterion(
  criterionApplicability:
    ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionApplicability,
  evaluation:
    ProductiveKnowledgeRecommendationEffectRelevanceEvaluation
):
  | ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionUtilization
  | null {
  if (
    criterionApplicability.applicabilityResult !==
    'applicable'
  ) {
    return null;
  }

  const criterionEvaluationScope =
    criterionApplicability
      .compatibilityResult
      .compatibilityAssessment
      .ruleDispositionInterpretation
      .ruleApplication
      .conditionSatisfaction
      .ruleComparisonCorrespondence
      .compatibilityRuleDefinition
      .compatibilityRulePresence
      .semanticComparison
      .criterionDefinition
      .criterionPresence
      .evaluationScope;

  if (
    criterionEvaluationScope !==
    evaluation.evaluationScope
  ) {
    return null;
  }

  return {
    criterionApplicability,
    evaluation,
    utilizationType:
      'explicit-applicable-criterion-utilized-by-evaluation',
  };
}
