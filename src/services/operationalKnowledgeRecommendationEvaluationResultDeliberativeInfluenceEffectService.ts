import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceReach,
} from './operationalKnowledgeRecommendationEvaluationResultDeliberativeInfluenceReachService';

/**
 * FASE 24.34
 *
 * Información externa mínima necesaria para observar explícitamente
 * un efecto deliberativo correspondiente a una influencia que ya
 * alcanzó una deliberación concreta.
 *
 * La mera coexistencia de:
 *
 * - EvaluationResultDeliberativeInfluenceReach
 * - EffectObservationInput
 *
 * NO materializa automáticamente ningún efecto.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectObservationInput =
  {
    deliberationId: string;
  };

/**
 * FASE 24.34
 *
 * Materialización explícita del hecho:
 *
 * EvaluationResultDeliberativeInfluenceReach
 * +
 * EffectObservationInput
 * +
 * invocación explícita
 * ->
 * EvaluationResultDeliberativeInfluenceEffect
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - evaluationResultDeliberativeInfluenceReach
 * - observationInput
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
 * Influence exists
 * !=
 * Reach exists
 * !=
 * Observable Effect exists
 *
 * Effect
 * !=
 * direction
 *
 * Effect
 * !=
 * significance / weight
 *
 * Effect
 * !=
 * Comparison
 * !=
 * Preference
 * !=
 * Selection
 * !=
 * Decision
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffect =
  {
    evaluationResultDeliberativeInfluenceReach:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceReach;

    observationInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectObservationInput;

    effectType:
      'explicit-evaluation-result-deliberative-influence-effect-observed';
  };

/**
 * Observa y materializa explícitamente un efecto deliberativo
 * correspondiente a una influencia que ya alcanzó una deliberación.
 *
 * La operación sólo materializa Effect cuando el deliberationId
 * suministrado coincide exactamente con el deliberationId del Reach.
 *
 * Reach sigue siendo el único fundamento interno inmediato.
 *
 * Esta operación NO interpreta:
 *
 * - EvaluationResult.conclusion;
 * - supported / not-supported;
 * - dirección;
 * - apoyo u oposición;
 * - intensidad;
 * - importancia;
 * - significancia;
 * - peso;
 * - impacto;
 * - comparabilidad;
 * - preferencia;
 * - ranking;
 * - selección;
 * - decisión.
 */
export function observeProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffect(
  evaluationResultDeliberativeInfluenceReach:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceReach,

  observationInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectObservationInput
):
  | ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffect
  | null {
  if (
    evaluationResultDeliberativeInfluenceReach.reachInput.deliberationId !==
    observationInput.deliberationId
  ) {
    return null;
  }

  return {
    evaluationResultDeliberativeInfluenceReach,
    observationInput,
    effectType:
      'explicit-evaluation-result-deliberative-influence-effect-observed',
  };
}