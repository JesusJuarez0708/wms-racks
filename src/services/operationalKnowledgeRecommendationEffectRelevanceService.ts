import type {
  ProductiveKnowledgeRecommendationEffectInterpretation,
} from './operationalKnowledgeRecommendationEffectInterpretationService';

export type ProductiveKnowledgeRecommendationEffectRelevanceContext = {
  relevantRecommendationId: string;
};

export type ProductiveKnowledgeRecommendationEffectRelevance = {
  interpretation: ProductiveKnowledgeRecommendationEffectInterpretation;
  relevanceType: 'knowledge-effect-contextually-relevant';
};

export function evaluateProductiveKnowledgeRecommendationEffectRelevance(
  interpretation: ProductiveKnowledgeRecommendationEffectInterpretation,
  context: ProductiveKnowledgeRecommendationEffectRelevanceContext
): ProductiveKnowledgeRecommendationEffectRelevance | null {
  if (
    interpretation.effect.reach.recommendation.id !==
    context.relevantRecommendationId
  ) {
    return null;
  }

  return {
    interpretation,
    relevanceType: 'knowledge-effect-contextually-relevant',
  };
}
