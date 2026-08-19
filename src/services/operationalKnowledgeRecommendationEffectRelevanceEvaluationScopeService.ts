import type {
  ProductiveKnowledgeRecommendationEffectRelevanceBoundary,
} from './operationalKnowledgeRecommendationEffectRelevanceBoundaryService';

export type ProductiveKnowledgeRecommendationEffectRelevanceEvaluationContext = {
  targetType: 'knowledge-effect-relevance';
  evaluationRecommendationId: string;
};

export type ProductiveKnowledgeRecommendationEffectRelevanceEvaluationScope = {
  relevanceBoundary: ProductiveKnowledgeRecommendationEffectRelevanceBoundary;
  evaluationContext: ProductiveKnowledgeRecommendationEffectRelevanceEvaluationContext;
  scopeType: 'knowledge-effect-relevance-within-explicit-evaluation-scope';
};

export function establishProductiveKnowledgeRecommendationEffectRelevanceEvaluationScope(
  relevanceBoundary: ProductiveKnowledgeRecommendationEffectRelevanceBoundary,
  context: ProductiveKnowledgeRecommendationEffectRelevanceEvaluationContext
): ProductiveKnowledgeRecommendationEffectRelevanceEvaluationScope | null {
  if (context.targetType !== 'knowledge-effect-relevance') {
    return null;
  }

  if (
    relevanceBoundary.relevance.interpretation.effect.reach.recommendation.id !==
    context.evaluationRecommendationId
  ) {
    return null;
  }

  return {
    relevanceBoundary,
    evaluationContext: context,
    scopeType:
      'knowledge-effect-relevance-within-explicit-evaluation-scope',
  };
}
