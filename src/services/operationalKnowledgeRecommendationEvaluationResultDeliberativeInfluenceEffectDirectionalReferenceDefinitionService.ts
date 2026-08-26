import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferencePresence,
} from './operationalKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferencePresenceService';

/**
 * FASE 24.37
 *
 * Rol semántico externo explícito asignado a una referencia
 * direccional previamente presentada.
 *
 * Este rol describe exclusivamente qué significado semántico
 * se declara para la referencia.
 *
 * NO define:
 *
 * - directional axis;
 * - pertenencia o correspondencia reference / axis;
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
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceSemanticRole =
  | 'deliberative-effect-direction-reference'
  | 'deliberative-effect-orientation-reference';

/**
 * FASE 24.37
 *
 * Información externa explícita necesaria para definir
 * semánticamente una referencia direccional ya presentada.
 *
 * referenceId identifica qué referencia previamente presentada
 * pretende ser definida.
 *
 * referenceSemanticRole declara únicamente su significado
 * semántico.
 *
 * La mera coexistencia de:
 *
 * - DirectionalReferencePresence
 * - DirectionalReferenceDefinitionInput
 *
 * NO materializa automáticamente una definición.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceDefinitionInput =
  {
    referenceId: string;
    referenceSemanticRole:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceSemanticRole;
  };

/**
 * FASE 24.37
 *
 * Materialización explícita del hecho:
 *
 * DirectionalReferencePresence
 * +
 * DirectionalReferenceDefinitionInput
 * +
 * identidad exacta de referenceId
 * +
 * invocación explícita
 * ->
 * DirectionalReferenceDefinition
 *
 * DirectionalReferencePresence constituye el único fundamento
 * interno inmediato.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - directionalReferencePresence
 * - definitionInput
 *
 * En particular:
 *
 * DirectionalReferencePresence exists
 * !=
 * DirectionalReferenceDefinition exists
 * !=
 * DirectionalAxisPresence
 * !=
 * DirectionalAxisDefinition
 * !=
 * DirectionalReferenceAxisCorrespondence
 * !=
 * DirectionalReferenceEffectCorrespondence
 * !=
 * DirectionalReferenceApplicability
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
 * DirectionalReferenceDefinition
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
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceDefinition =
  {
    directionalReferencePresence:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferencePresence;

    definitionInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceDefinitionInput;

    definitionType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-semantic-definition';
  };

/**
 * Establece explícitamente una definición semántica para una
 * referencia direccional previamente presentada.
 *
 * La única comprobación realizada aquí es identidad:
 *
 * DirectionalReferencePresence.referenceId
 * ===
 * DirectionalReferenceDefinitionInput.referenceId
 *
 * Un mismatch devuelve null porque el input pretende definir
 * una referencia distinta de la que fundamenta la operación.
 *
 * Esta validación NO constituye:
 *
 * - correspondencia semántica con un eje;
 * - correspondencia con el Effect;
 * - aplicabilidad;
 * - evaluación;
 * - determinación de dirección.
 */
export function establishProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceDefinition(
  directionalReferencePresence:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferencePresence,
  definitionInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceDefinitionInput
):
  | ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceDefinition
  | null {
  if (
    directionalReferencePresence.directionalReferenceInput.referenceId !==
    definitionInput.referenceId
  ) {
    return null;
  }

  return {
    directionalReferencePresence,
    definitionInput,
    definitionType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-semantic-definition',
  };
}