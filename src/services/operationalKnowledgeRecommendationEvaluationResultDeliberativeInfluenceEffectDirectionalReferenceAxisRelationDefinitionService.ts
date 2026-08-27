import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationPresence,
} from './operationalKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationPresenceService';

/**
 * FASE 24.41
 *
 * Rol semántico externo explícito asignado a una relación
 * reference / axis previamente presentada.
 *
 * Este rol describe exclusivamente qué significado semántico
 * se declara para la relación.
 *
 * IMPORTANTE:
 *
 * declarar semántica de correspondencia
 * !=
 * establecer Correspondence
 *
 * y:
 *
 * declarar semántica de membership
 * !=
 * establecer Membership
 *
 * Tampoco define:
 *
 * - semantic compatibility;
 * - correspondencia efectiva reference / axis;
 * - pertenencia efectiva reference / axis;
 * - posición de la referencia sobre el eje;
 * - endpoints;
 * - correspondencia axis / Effect;
 * - correspondencia reference / Effect;
 * - correspondencia relation / Effect;
 * - applicability;
 * - direction determination;
 * - direction;
 * - orientation;
 * - polarity;
 * - valence;
 * - positive / negative;
 * - support / opposition;
 * - strength / weight;
 * - importance / significance;
 * - impact;
 * - score / priority / confidence;
 * - comparability / comparison;
 * - preference;
 * - ranking;
 * - selection;
 * - decision;
 * - execution.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticRole =
  | 'reference-axis-correspondence-semantics'
  | 'reference-axis-membership-semantics';

/**
 * FASE 24.41
 *
 * Información externa explícita necesaria para definir
 * semánticamente una relación reference / axis ya presentada.
 *
 * relationId identifica qué RelationPresence previamente
 * materializada pretende ser definida.
 *
 * relationSemanticRole declara exclusivamente el significado
 * semántico externo de esa relación.
 *
 * No repite:
 *
 * - referenceId;
 * - axisId;
 * - referenceSemanticRole;
 * - axisSubject;
 *
 * porque esas identidades y semánticas pertenecen ya a la
 * genealogía preservada por DirectionalReferenceAxisRelationPresence.
 *
 * La mera coexistencia de:
 *
 * - DirectionalReferenceAxisRelationPresence
 * - DirectionalReferenceAxisRelationDefinitionInput
 *
 * NO materializa automáticamente una definición.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationDefinitionInput =
  {
    relationId: string;

    relationSemanticRole:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticRole;
  };

/**
 * FASE 24.41
 *
 * Materialización explícita del hecho:
 *
 * DirectionalReferenceAxisRelationPresence
 * +
 * DirectionalReferenceAxisRelationDefinitionInput
 * +
 * identidad exacta de relationId
 * +
 * invocación explícita
 * ->
 * DirectionalReferenceAxisRelationDefinition
 *
 * DirectionalReferenceAxisRelationPresence constituye el único
 * fundamento interno inmediato.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - directionalReferenceAxisRelationPresence
 * - definitionInput
 *
 * En particular:
 *
 * DirectionalReferenceAxisRelationPresence
 * !=
 * DirectionalReferenceAxisRelationDefinition
 * !=
 * DirectionalReferenceAxisCorrespondence
 * !=
 * SemanticCompatibility
 * !=
 * Membership
 * !=
 * PositionOnAxis
 * !=
 * AxisEffectCorrespondence
 * !=
 * ReferenceEffectCorrespondence
 * !=
 * RelationEffectCorrespondence
 * !=
 * Applicability
 * !=
 * DirectionDetermination
 * !=
 * Direction
 *
 * Además:
 *
 * Direction
 * !=
 * orientation
 * !=
 * polarity
 * !=
 * positive / negative
 * !=
 * support / opposition
 *
 * y:
 *
 * DirectionalReferenceAxisRelationDefinition
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
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationDefinition =
  {
    directionalReferenceAxisRelationPresence:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationPresence;

    definitionInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationDefinitionInput;

    definitionType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-definition';
  };

/**
 * Establece explícitamente una definición semántica para una
 * relación reference / axis previamente presentada.
 *
 * La única comprobación realizada aquí es identidad:
 *
 * DirectionalReferenceAxisRelationPresence.relationId
 * ===
 * DirectionalReferenceAxisRelationDefinitionInput.relationId
 *
 * Un mismatch devuelve null porque el input pretende definir una
 * relación distinta de la que fundamenta la operación.
 *
 * Deliberadamente NO se inspeccionan:
 *
 * - referenceSemanticRole;
 * - axisSubject;
 * - referenceId frente a axisId;
 * - ninguna condición semántica entre ambos operandos;
 * - ninguna propiedad del Effect.
 *
 * Por tanto esta validación NO constituye:
 *
 * - semantic comparison;
 * - semantic compatibility;
 * - correspondence assessment;
 * - membership assessment;
 * - position determination;
 * - Effect correspondence;
 * - applicability;
 * - direction determination.
 */
export function establishProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationDefinition(
  directionalReferenceAxisRelationPresence:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationPresence,
  definitionInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationDefinitionInput
):
  | ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationDefinition
  | null {
  if (
    directionalReferenceAxisRelationPresence
      .relationInput
      .relationId !==
    definitionInput.relationId
  ) {
    return null;
  }

  return {
    directionalReferenceAxisRelationPresence,
    definitionInput,
    definitionType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-definition',
  };
}
