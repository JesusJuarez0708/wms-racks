import type {
  ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionPresence,
} from './operationalKnowledgeRecommendationEffectRelevanceEvaluationCriterionPresenceService';

export type ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionSubject =
  | 'knowledge-effect-relevance'
  | 'knowledge-effect-interpretation';

export type ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionDefinitionInput = {
  criterionId: string;
  criterionSubject:
    ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionSubject;
};

export type ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionDefinition = {
  criterionPresence:
    ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionPresence;
  definitionInput:
    ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionDefinitionInput;
  definitionType:
    'explicit-evaluation-criterion-semantic-definition';
};

export function establishProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionDefinition(
  criterionPresence:
    ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionPresence,
  definitionInput:
    ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionDefinitionInput
):
  | ProductiveKnowledgeRecommendationEffectRelevanceEvaluationCriterionDefinition
  | null {
  if (
    criterionPresence.criterionInput.criterionId !==
    definitionInput.criterionId
  ) {
    return null;
  }

  return {
    criterionPresence,
    definitionInput,
    definitionType:
      'explicit-evaluation-criterion-semantic-definition',
  };
}