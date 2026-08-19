import type {
  ProductiveKnowledgeRecommendationEffectRelevance,
} from './operationalKnowledgeRecommendationEffectRelevanceService';

export type ProductiveKnowledgeRecommendationEffectRelevanceBoundaryContext = {
  boundedRecommendationId: string;
};

export type ProductiveKnowledgeRecommendationEffectRelevanceBoundary = {
  relevance: ProductiveKnowledgeRecommendationEffectRelevance;
  boundaryType: 'knowledge-relevance-without-evaluative-promotion';
};

export function establishProductiveKnowledgeRecommendationEffectRelevanceBoundary(
  relevance: ProductiveKnowledgeRecommendationEffectRelevance,
  context: ProductiveKnowledgeRecommendationEffectRelevanceBoundaryContext
): ProductiveKnowledgeRecommendationEffectRelevanceBoundary | null {
  if (
    relevance.interpretation.effect.reach.recommendation.id !==
    context.boundedRecommendationId
  ) {
    return null;
  }

  return {
    relevance,
    boundaryType: 'knowledge-relevance-without-evaluative-promotion',
  };
}