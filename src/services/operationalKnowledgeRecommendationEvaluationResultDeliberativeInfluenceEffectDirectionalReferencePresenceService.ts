import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionDeterminationScope,
} from './operationalKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionDeterminationScopeService';

/**
 * FASE 24.36
 *
 * Información externa mínima necesaria para presentar explícitamente
 * una referencia direccional dentro de un ámbito previamente
 * establecido de futura determinación direccional.
 *
 * Este input únicamente identifica una referencia externa.
 *
 * NO define:
 *
 * - semántica de la referencia;
 * - directional axis;
 * - correspondencia reference / Effect;
 * - aplicabilidad;
 * - direction;
 * - orientation;
 * - positive / negative;
 * - polarity / valence;
 * - support / opposition;
 * - strength / weight;
 * - importance / significance;
 * - impact;
 * - score / priority / confidence;
 * - comparability / comparison;
 * - preference;
 * - ranking;
 * - selection;
 * - decision.
 *
 * La mera coexistencia de:
 *
 * - DirectionDeterminationScope
 * - DirectionalReferenceInput
 *
 * NO materializa automáticamente ninguna presencia.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceInput =
  {
    referenceId: string;
  };

/**
 * FASE 24.36
 *
 * Materialización explícita del hecho:
 *
 * DirectionDeterminationScope
 * +
 * DirectionalReferenceInput
 * +
 * invocación explícita
 * ->
 * DirectionalReferencePresence
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - directionDeterminationScope
 * - directionalReferenceInput
 *
 * DirectionDeterminationScope constituye el único fundamento
 * interno inmediato.
 *
 * DirectionalReferencePresence afirma exclusivamente que una
 * referencia direccional externa fue presentada explícitamente
 * dentro de un ámbito previamente establecido de futura
 * determinación direccional.
 *
 * En particular:
 *
 * DirectionDeterminationScope exists
 * !=
 * DirectionalReferencePresence exists
 * !=
 * DirectionalReferenceDefinition
 * !=
 * DirectionalAxis
 * !=
 * DirectionalReferenceEffectCorrespondence
 * !=
 * DirectionalReferenceApplicability
 * !=
 * Direction
 *
 * Además:
 *
 * Direction
 * !=
 * positive / negative
 * !=
 * support / opposition
 *
 * y:
 *
 * DirectionalReferencePresence
 * !=
 * Comparison
 * !=
 * Preference
 * !=
 * Ranking
 * !=
 * Selection
 * !=
 * Decision
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferencePresence =
  {
    directionDeterminationScope:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionDeterminationScope;

    directionalReferenceInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceInput;

    presenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-present';
  };

/**
 * Establece explícitamente la presencia de una referencia
 * direccional externa dentro de un DirectionDeterminationScope.
 *
 * Esta operación NO verifica todavía:
 *
 * - qué significa la referencia;
 * - si define o pertenece a un eje;
 * - si corresponde al Effect;
 * - si es aplicable al Effect;
 * - ninguna dirección.
 *
 * La presentación de la referencia constituye un hecho nuevo
 * exclusivamente mediante invocación explícita.
 */
export function establishProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferencePresence(
  directionDeterminationScope:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionDeterminationScope,
  directionalReferenceInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceInput
): ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferencePresence {
  return {
    directionDeterminationScope,
    directionalReferenceInput,
    presenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-present',
  };
}
