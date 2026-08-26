import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluence,
} from './operationalKnowledgeRecommendationEvaluationResultDeliberativeInfluenceService';

/**
 * FASE 24.33
 *
 * Información externa mínima necesaria para establecer
 * explícitamente que una influencia deliberativa alcanza una
 * deliberación identificada.
 *
 * La mera existencia de este input junto con una
 * EvaluationResultDeliberativeInfluence NO materializa alcance.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceReachInput =
  {
    deliberationId: string;
  };

/**
 * FASE 24.33
 *
 * Materialización explícita del hecho:
 *
 * EvaluationResultDeliberativeInfluence
 * +
 * DeliberativeInfluenceReachInput
 * +
 * invocación explícita
 * ->
 * EvaluationResultDeliberativeInfluenceReach
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - evaluationResultDeliberativeInfluence
 * - reachInput
 *
 * y NO introduce:
 *
 * - direction;
 * - positive;
 * - negative;
 * - support;
 * - opposition;
 * - strength;
 * - weight;
 * - importance;
 * - significance;
 * - impact;
 * - score;
 * - priority;
 * - confidence;
 * - comparison;
 * - preference;
 * - ranking;
 * - selection;
 * - decision.
 *
 * En particular:
 *
 * EvaluationResultDeliberativeInfluence exists
 * !=
 * EvaluationResultDeliberativeInfluenceReach exists
 *
 * Reach
 * !=
 * direction
 *
 * Reach
 * !=
 * significance / weight
 *
 * Reach
 * !=
 * Comparison
 * !=
 * Preference
 * !=
 * Selection
 * !=
 * Decision
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceReach =
  {
    evaluationResultDeliberativeInfluence:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluence;

    reachInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceReachInput;

    reachType:
      'explicit-evaluation-result-deliberative-influence-reach';
  };

/**
 * Establece explícitamente que una influencia deliberativa alcanza
 * la deliberación identificada por reachInput.
 *
 * La operación sólo materializa Reach cuando el deliberationId
 * suministrado coincide exactamente con el deliberationId de la
 * DeliberativeParticipation conservada genealógicamente por la
 * influencia.
 *
 * No interpreta:
 *
 * - EvaluationResult.conclusion;
 * - supported / not-supported;
 * - dirección;
 * - apoyo u oposición;
 * - intensidad;
 * - importancia;
 * - significancia;
 * - impacto;
 * - comparabilidad;
 * - preferencia;
 * - selección;
 * - decisión.
 */
export function establishProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceReach(
  evaluationResultDeliberativeInfluence:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluence,
  reachInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceReachInput
):
  | ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceReach
  | null {
  const deliberationId =
    evaluationResultDeliberativeInfluence
      .evaluationResultDeliberativeUtilization
      .deliberativeParticipation
      .participationInput
      .deliberationId;

  if (deliberationId !== reachInput.deliberationId) {
    return null;
  }

  return {
    evaluationResultDeliberativeInfluence,
    reachInput,
    reachType:
      'explicit-evaluation-result-deliberative-influence-reach',
  };
}
