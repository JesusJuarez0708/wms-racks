import type { IntelligenceRecommendation } from './recommendationIntelligenceService';
import type { ProductiveKnowledgeInfluence } from './operationalKnowledgeInfluenceService';

export type ProductiveKnowledgeRecommendationReach = {
  influence: ProductiveKnowledgeInfluence;
  recommendation: IntelligenceRecommendation;
};

export function reachProductiveRecommendation(
  influence: ProductiveKnowledgeInfluence,
  recommendation: IntelligenceRecommendation
): ProductiveKnowledgeRecommendationReach {
  return {
    influence,
    recommendation,
  };
}