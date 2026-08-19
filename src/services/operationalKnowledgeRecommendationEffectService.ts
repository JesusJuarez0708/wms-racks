import type {
  ProductiveKnowledgeRecommendationReach,
} from './operationalKnowledgeRecommendationReachService';

export type ProductiveKnowledgeRecommendationEffectContext = {
  observableRecommendationId: string;
};

export type ProductiveKnowledgeRecommendationEffect = {
  reach: ProductiveKnowledgeRecommendationReach;
  effectType: 'knowledge-influence-observed';
};

export function observeProductiveKnowledgeRecommendationEffect(
  reach: ProductiveKnowledgeRecommendationReach,
  context: ProductiveKnowledgeRecommendationEffectContext
): ProductiveKnowledgeRecommendationEffect | null {
  if (
    reach.recommendation.id !==
    context.observableRecommendationId
  ) {
    return null;
  }

  return {
    reach,
    effectType: 'knowledge-influence-observed',
  };
}