import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionDeterminationScope,
} from './operationalKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionDeterminationScopeService';

/**
 * FASE 24.38
 *
 * Información externa mínima necesaria para presentar explícitamente
 * un eje direccional dentro de un ámbito previamente establecido
 * de futura determinación direccional.
 *
 * Este input únicamente identifica un eje direccional externo.
 *
 * NO define:
 *
 * - semántica del eje;
 * - directional reference;
 * - pertenencia o correspondencia reference / axis;
 * - correspondencia axis / Effect;
 * - correspondencia reference / Effect;
 * - aplicabilidad;
 * - direction determination;
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
 * - DirectionalAxisInput
 *
 * NO materializa automáticamente ninguna presencia.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalAxisInput =
  {
    axisId: string;
  };

/**
 * FASE 24.38
 *
 * Materialización explícita del hecho:
 *
 * DirectionDeterminationScope
 * +
 * DirectionalAxisInput
 * +
 * invocación explícita
 * ->
 * DirectionalAxisPresence
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - directionDeterminationScope
 * - directionalAxisInput
 *
 * DirectionDeterminationScope constituye el único fundamento
 * interno inmediato.
 *
 * DirectionalAxisPresence afirma exclusivamente que un eje
 * direccional externo fue presentado explícitamente dentro de
 * un ámbito previamente establecido de futura determinación
 * direccional.
 *
 * En particular:
 *
 * DirectionDeterminationScope exists
 * !=
 * DirectionalAxisPresence exists
 * !=
 * DirectionalAxisDefinition
 * !=
 * DirectionalReferencePresence
 * !=
 * DirectionalReferenceDefinition
 * !=
 * DirectionalReferenceAxisCorrespondence
 * !=
 * DirectionalAxisEffectCorrespondence
 * !=
 * DirectionalReferenceEffectCorrespondence
 * !=
 * DirectionalApplicability
 * !=
 * DirectionDetermination
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
 * DirectionalAxisPresence
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
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalAxisPresence =
  {
    directionDeterminationScope:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionDeterminationScope;
    directionalAxisInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalAxisInput;
    presenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-axis-present';
  };

/**
 * Establece explícitamente la presencia de un eje direccional
 * externo dentro de un DirectionDeterminationScope.
 *
 * Esta operación NO verifica todavía:
 *
 * - qué significa el eje;
 * - si alguna referencia pertenece o corresponde al eje;
 * - si el eje corresponde al Effect;
 * - si alguna referencia corresponde al Effect;
 * - si el eje o una referencia son aplicables al Effect;
 * - ninguna determinación de dirección;
 * - ninguna dirección.
 *
 * La presentación del eje constituye un hecho nuevo
 * exclusivamente mediante invocación explícita.
 */
export function establishProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalAxisPresence(
  directionDeterminationScope:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionDeterminationScope,
  directionalAxisInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalAxisInput
): ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalAxisPresence {
  return {
    directionDeterminationScope,
    directionalAxisInput,
    presenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-axis-present',
  };
}
