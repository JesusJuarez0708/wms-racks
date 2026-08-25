import type {
  ProductiveKnowledgeRecommendationEffectRelevanceEvaluationScope,
} from './operationalKnowledgeRecommendationEffectRelevanceEvaluationScopeService';

export type ProductiveKnowledgeRecommendationEffectRelevanceEvaluation = {
  evaluationType:
    'explicit-knowledge-effect-relevance-evaluation';
  evaluationScope:
    ProductiveKnowledgeRecommendationEffectRelevanceEvaluationScope;
};

export function establishProductiveKnowledgeRecommendationEffectRelevanceEvaluation(
  evaluationScope:
    ProductiveKnowledgeRecommendationEffectRelevanceEvaluationScope
): ProductiveKnowledgeRecommendationEffectRelevanceEvaluation {
  return {
    evaluationType:
      'explicit-knowledge-effect-relevance-evaluation',
    evaluationScope,
  };
}
