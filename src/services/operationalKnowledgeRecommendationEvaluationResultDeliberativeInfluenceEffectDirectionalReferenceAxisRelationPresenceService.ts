import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceDefinition,
} from './operationalKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceDefinitionService';

import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalAxisDefinition,
} from './operationalKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalAxisDefinitionService';

/**
 * FASE 24.40
 *
 * Información externa mínima necesaria para presentar explícitamente
 * una relación entre una referencia direccional semánticamente definida
 * y un eje direccional semánticamente definido.
 *
 * relationId identifica exclusivamente la relación externa presentada.
 *
 * referenceId y axisId identifican exactamente qué referencia y qué eje
 * pretende relacionar dicho input.
 *
 * Este input NO define:
 *
 * - semántica de la relación;
 * - correspondencia reference / axis;
 * - compatibilidad reference / axis;
 * - pertenencia de reference al axis;
 * - posición de reference sobre axis;
 * - endpoints;
 * - orientation;
 * - polarity / valence;
 * - positive / negative;
 * - support / opposition;
 * - correspondencia axis / Effect;
 * - correspondencia reference / Effect;
 * - aplicabilidad al Effect;
 * - DirectionDetermination;
 * - Direction;
 * - strength / weight;
 * - importance / significance;
 * - impact;
 * - score / priority / confidence;
 * - Comparison;
 * - Preference;
 * - Ranking;
 * - Selection;
 * - Decision;
 * - Execution.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationInput =
  {
    relationId: string;
    referenceId: string;
    axisId: string;
  };

/**
 * FASE 24.40
 *
 * Materialización explícita del hecho:
 *
 * DirectionalReferenceDefinition
 * +
 * DirectionalAxisDefinition
 * +
 * DirectionalReferenceAxisRelationInput
 * +
 * identidad exacta de referenceId
 * +
 * identidad exacta de axisId
 * +
 * identidad exacta de DirectionDeterminationScope
 * +
 * invocación explícita
 * ->
 * DirectionalReferenceAxisRelationPresence
 *
 * DirectionalReferenceDefinition y DirectionalAxisDefinition
 * constituyen conjuntamente los dos fundamentos internos inmediatos.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - directionalReferenceDefinition
 * - directionalAxisDefinition
 * - relationInput
 *
 * En particular:
 *
 * DirectionalReferenceDefinition exists
 * +
 * DirectionalAxisDefinition exists
 * !=
 * DirectionalReferenceAxisRelationPresence exists
 *
 * y:
 *
 * DirectionalReferenceAxisRelationPresence
 * !=
 * DirectionalReferenceAxisRelationDefinition
 * !=
 * DirectionalReferenceAxisCorrespondence
 * !=
 * semantic compatibility
 * !=
 * reference belongs to axis
 * !=
 * reference position on axis
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
 * DirectionalReferenceAxisRelationPresence
 * !=
 * orientation
 * !=
 * polarity / valence
 * !=
 * positive / negative
 * !=
 * support / opposition
 *
 * y:
 *
 * DirectionalReferenceAxisRelationPresence
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
 * !=
 * Execution
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationPresence =
  {
    directionalReferenceDefinition:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceDefinition;

    directionalAxisDefinition:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalAxisDefinition;

    relationInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationInput;

    presenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-present';
  };

/**
 * Establece explícitamente la presencia de una relación entre una
 * referencia direccional definida y un eje direccional definido.
 *
 * La operación comprueba exclusivamente:
 *
 * 1. identidad de la referencia;
 * 2. identidad del eje;
 * 3. identidad del DirectionDeterminationScope que fundamenta
 *    ambas ramas.
 *
 * Un mismatch devuelve null porque los fundamentos suministrados
 * no corresponden exactamente a la relación que pretende
 * presentarse.
 *
 * La igualdad de DirectionDeterminationScope constituye únicamente
 * una precondición genealógica / estructural.
 *
 * NO constituye:
 *
 * - correspondencia semántica;
 * - compatibilidad semántica;
 * - pertenencia;
 * - posición sobre el eje;
 * - correspondencia con el Effect;
 * - aplicabilidad al Effect;
 * - determinación de dirección.
 *
 * referenceSemanticRole y axisSubject permanecen deliberadamente
 * opacos para este servicio: se conservan dentro de sus respectivas
 * definiciones, pero NO se comparan ni se interpretan.
 */
export function establishProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationPresence(
  directionalReferenceDefinition:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceDefinition,
  directionalAxisDefinition:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalAxisDefinition,
  relationInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationInput
):
  | ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationPresence
  | null {
  if (
    directionalReferenceDefinition.directionalReferencePresence
      .directionalReferenceInput.referenceId !== relationInput.referenceId
  ) {
    return null;
  }

  if (
    directionalAxisDefinition.directionalAxisPresence.directionalAxisInput
      .axisId !== relationInput.axisId
  ) {
    return null;
  }

  if (
    directionalReferenceDefinition.directionalReferencePresence
      .directionDeterminationScope !==
    directionalAxisDefinition.directionalAxisPresence
      .directionDeterminationScope
  ) {
    return null;
  }

  return {
    directionalReferenceDefinition,
    directionalAxisDefinition,
    relationInput,
    presenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-present',
  };
}