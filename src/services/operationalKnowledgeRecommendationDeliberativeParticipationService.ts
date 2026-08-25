import type {
  IntelligenceRecommendation,
} from './recommendationIntelligenceService';

/**
 * FASE 24.30
 *
 * Información externa mínima necesaria para establecer
 * explícitamente que una recomendación participa en una
 * deliberación identificada.
 *
 * La mera existencia de este input junto con una Recommendation
 * NO materializa participación deliberativa.
 */
export type ProductiveKnowledgeRecommendationDeliberativeParticipationInput = {
  deliberationId: string;
};

/**
 * FASE 24.30
 *
 * Materialización explícita del hecho:
 *
 * Recommendation
 * +
 * DeliberativeParticipationInput
 * +
 * invocación explícita
 * ->
 * DeliberativeParticipation
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - recommendation
 * - participationInput
 *
 * y NO introduce:
 *
 * - EvaluationResult;
 * - conclusión evaluativa;
 * - comparabilidad;
 * - comparación;
 * - preferencia;
 * - selección;
 * - aceptación;
 * - rechazo;
 * - decisión;
 * - ejecución;
 * - score;
 * - priority;
 * - confidence;
 * - weight;
 * - ranking.
 *
 * En particular:
 *
 * Recommendation exists
 * !=
 * DeliberativeParticipation exists
 *
 * same deliberationId
 * !=
 * comparability
 *
 * DeliberativeParticipation
 * !=
 * Preference
 */
export type ProductiveKnowledgeRecommendationDeliberativeParticipation = {
  recommendation: IntelligenceRecommendation;

  participationInput:
    ProductiveKnowledgeRecommendationDeliberativeParticipationInput;

  participationType:
    'explicit-recommendation-deliberative-participation';
};

/**
 * Establece explícitamente la participación deliberativa de una
 * Recommendation.
 *
 * La operación es total porque FASE 24.30 no introduce todavía
 * ninguna condición adicional de dominio capaz de rechazar la
 * materialización.
 *
 * No comprueba:
 *
 * - existencia de una segunda alternativa;
 * - comparabilidad;
 * - EvaluationResult;
 * - supported / not-supported;
 * - preferencias;
 * - selección;
 * - decisión.
 *
 * Tampoco genera deliberationId: éste debe ser suministrado
 * explícitamente desde fuera.
 */
export function establishProductiveKnowledgeRecommendationDeliberativeParticipation(
  recommendation: IntelligenceRecommendation,
  participationInput:
    ProductiveKnowledgeRecommendationDeliberativeParticipationInput
): ProductiveKnowledgeRecommendationDeliberativeParticipation {
  return {
    recommendation,
    participationInput,
    participationType:
      'explicit-recommendation-deliberative-participation',
  };
}
