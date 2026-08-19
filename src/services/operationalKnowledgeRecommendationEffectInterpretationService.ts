import type {
  ProductiveKnowledgeRecommendationEffect,
} from './operationalKnowledgeRecommendationEffectService';

export type ProductiveKnowledgeRecommendationEffectInterpretationContext = {
  interpretableRecommendationId: string;
};

export type ProductiveKnowledgeRecommendationEffectInterpretation = {
  effect: ProductiveKnowledgeRecommendationEffect;
  interpretationType: 'knowledge-effect-interpreted';
};

export function interpretProductiveKnowledgeRecommendationEffect(
  effect: ProductiveKnowledgeRecommendationEffect,
  context: ProductiveKnowledgeRecommendationEffectInterpretationContext
): ProductiveKnowledgeRecommendationEffectInterpretation | null {
  if (
    effect.reach.recommendation.id !==
    context.interpretableRecommendationId
  ) {
    return null;
  }

  return {
    effect,
    interpretationType: 'knowledge-effect-interpreted',
  };
}
