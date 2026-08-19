import type {
  ProductiveKnowledgeRecommendationEffectRelevanceEvaluationScope,
} from './operationalKnowledgeRecommendationEffectRelevanceEvaluationScopeService';

export type ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionInput = {
  criterionId: string;
};

export type ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionPresence = {
  evaluationScope: ProductiveKnowledgeRecommendationEffectRelevanceEvaluationScope;
  criterionInput: ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionInput;
  presenceType: 'explicit-evaluation-criterion-present';
};

export function establishProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionPresence(
  evaluationScope: ProductiveKnowledgeRecommendationEffectRelevanceEvaluationScope,
  criterionInput: ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionInput
): ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionPresence {
  return {
    evaluationScope,
    criterionInput,
    presenceType: 'explicit-evaluation-criterion-present',
  };
}