import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalAxisPresence,
} from './operationalKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalAxisPresenceService';

/**
 * FASE 24.39
 *
 * Información semántica externa explícita necesaria para definir
 * un eje direccional previamente presentado.
 *
 * axisId identifica exactamente qué eje presentado pretende
 * ser definido.
 *
 * axisSubject declara exclusivamente qué dimensión conceptual
 * representa dicho eje.
 *
 * axisSubject NO declara:
 *
 * - endpoints;
 * - orientation;
 * - polarity / valence;
 * - positive / negative;
 * - support / opposition;
 * - pertenencia o correspondencia reference / axis;
 * - correspondencia axis / Effect;
 * - correspondencia reference / Effect;
 * - aplicabilidad;
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
 *
 * La mera coexistencia de:
 *
 * - DirectionalAxisPresence
 * - DirectionalAxisDefinitionInput
 *
 * NO materializa automáticamente una definición.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalAxisDefinitionInput =
  {
    axisId: string;
    axisSubject: string;
  };

/**
 * FASE 24.39
 *
 * Materialización explícita del hecho:
 *
 * DirectionalAxisPresence
 * +
 * DirectionalAxisDefinitionInput
 * +
 * identidad exacta de axisId
 * +
 * invocación explícita
 * ->
 * DirectionalAxisDefinition
 *
 * DirectionalAxisPresence constituye el único fundamento
 * interno inmediato.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - directionalAxisPresence
 * - definitionInput
 *
 * En particular:
 *
 * DirectionalAxisPresence exists
 * !=
 * DirectionalAxisDefinition exists
 * !=
 * DirectionalReferenceAxisCorrespondence
 * !=
 * reference belongs to axis
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
 * DirectionalAxisDefinition
 * !=
 * endpoints
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
 * DirectionalAxisDefinition
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
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalAxisDefinition =
  {
    directionalAxisPresence:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalAxisPresence;

    definitionInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalAxisDefinitionInput;

    definitionType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-axis-semantic-definition';
  };

/**
 * Establece explícitamente una definición semántica para un
 * eje direccional previamente presentado.
 *
 * La única comprobación realizada aquí es identidad:
 *
 * DirectionalAxisPresence.axisId
 * ===
 * DirectionalAxisDefinitionInput.axisId
 *
 * Un mismatch devuelve null porque el input pretende definir
 * un eje distinto del que fundamenta la operación.
 *
 * Esta validación NO constituye:
 *
 * - validación del significado declarado;
 * - compatibilidad semántica;
 * - correspondencia con una referencia;
 * - pertenencia de una referencia al eje;
 * - correspondencia con el Effect;
 * - aplicabilidad;
 * - definición de endpoints;
 * - definición de orientation;
 * - definición de polarity;
 * - determinación de dirección.
 *
 * axisSubject permanece deliberadamente opaco para este
 * servicio: se conserva, pero no se interpreta.
 */
export function establishProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalAxisDefinition(
  directionalAxisPresence:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalAxisPresence,
  definitionInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalAxisDefinitionInput
):
  | ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalAxisDefinition
  | null {
  if (
    directionalAxisPresence.directionalAxisInput.axisId !==
    definitionInput.axisId
  ) {
    return null;
  }

  return {
    directionalAxisPresence,
    definitionInput,
    definitionType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-axis-semantic-definition',
  };
}
