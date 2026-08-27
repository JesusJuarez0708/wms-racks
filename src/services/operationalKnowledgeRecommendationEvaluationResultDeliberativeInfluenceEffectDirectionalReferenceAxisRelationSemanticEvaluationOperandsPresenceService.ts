import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationDefinition,
} from './operationalKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationDefinitionService';

/**
 * FASE 24.42
 *
 * Propiedad semántica de DirectionalReferenceDefinition seleccionada
 * explícitamente como operando para una futura evaluación semántica
 * de la relación reference / axis.
 *
 * La selección de esta propiedad NO constituye:
 *
 * - lectura evaluativa de su valor;
 * - comparación;
 * - compatibilidad;
 * - satisfacción;
 * - correspondencia.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationReferenceOperand =
  'directional-reference-definition.referenceSemanticRole';

/**
 * FASE 24.42
 *
 * Propiedad semántica de DirectionalAxisDefinition seleccionada
 * explícitamente como operando para una futura evaluación semántica
 * de la relación reference / axis.
 *
 * La selección de esta propiedad NO constituye:
 *
 * - lectura evaluativa de su valor;
 * - comparación;
 * - compatibilidad;
 * - satisfacción;
 * - correspondencia.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationAxisOperand =
  'directional-axis-definition.axisSubject';

/**
 * FASE 24.42
 *
 * Información externa explícita mínima necesaria para designar
 * qué propiedades semánticas participarán como operandos de una
 * futura evaluación de una DirectionalReferenceAxisRelationDefinition.
 *
 * relationId identifica exactamente qué relación semánticamente
 * definida pretende recibir esta designación.
 *
 * referenceOperand y axisOperand designan propiedades ya existentes
 * dentro de la genealogía preservada por RelationDefinition.
 *
 * IMPORTANTE:
 *
 * este input selecciona propiedades como operandos.
 *
 * NO proporciona:
 *
 * - un resultado de comparación;
 * - una regla;
 * - una condición;
 * - satisfacción de condición;
 * - semantic compatibility;
 * - Correspondence;
 * - Membership;
 * - PositionOnAxis.
 *
 * Tampoco convierte automáticamente los valores existentes de:
 *
 * - referenceSemanticRole;
 * - axisSubject;
 * - relationSemanticRole;
 *
 * en reglas implícitas.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperandsInput =
  {
    relationId: string;
    referenceOperand:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationReferenceOperand;
    axisOperand:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationAxisOperand;
  };

/**
 * FASE 24.42
 *
 * Materialización explícita del hecho:
 *
 * DirectionalReferenceAxisRelationDefinition
 * +
 * explicit DirectionalReferenceAxisRelationSemanticEvaluationOperandsInput
 * +
 * identidad exacta de relationId
 * +
 * invocación explícita
 * ->
 * DirectionalReferenceAxisRelationSemanticEvaluationOperandsPresence
 *
 * DirectionalReferenceAxisRelationDefinition constituye el único
 * fundamento interno inmediato.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - directionalReferenceAxisRelationDefinition
 * - evaluationOperandsInput
 *
 * y sólo añade presenceType.
 *
 * Su significado es exclusivamente:
 *
 * existen propiedades semánticas explícitamente designadas como
 * operandos para una evaluación posterior de esta relación.
 *
 * En particular:
 *
 * RelationDefinition
 * !=
 * SemanticEvaluationOperandsPresence
 * !=
 * SemanticEvaluation
 * !=
 * SemanticComparison
 * !=
 * SemanticCompatibility
 * !=
 * CorrespondenceCondition
 * !=
 * CorrespondenceConditionSatisfaction
 * !=
 * CorrespondenceAssessment
 * !=
 * CorrespondenceResult
 * !=
 * DirectionalReferenceAxisCorrespondence
 * !=
 * Membership
 * !=
 * PositionOnAxis
 * !=
 * DirectionDetermination
 * !=
 * Direction
 *
 * Asimismo NO establece:
 *
 * - orientation;
 * - polarity;
 * - valence;
 * - positive / negative;
 * - support / opposition;
 * - axis / Effect correspondence;
 * - reference / Effect correspondence;
 * - relation / Effect correspondence;
 * - applicability to Effect;
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
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperandsPresence =
  {
    directionalReferenceAxisRelationDefinition:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationDefinition;

    evaluationOperandsInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperandsInput;

    presenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operands-present';
  };

/**
 * FASE 24.42
 *
 * Presenta explícitamente los operandos designados para una futura
 * evaluación semántica de una relación reference / axis previamente
 * definida.
 *
 * La única comprobación realizada aquí es identidad:
 *
 * RelationDefinition.relationId
 * ===
 * SemanticEvaluationOperandsInput.relationId
 *
 * Un mismatch devuelve null porque el input pretende designar
 * operandos para una relación distinta de aquella que fundamenta
 * la operación.
 *
 * Deliberadamente NO se leen ni interpretan los valores de:
 *
 * - referenceSemanticRole;
 * - axisSubject;
 * - relationSemanticRole.
 *
 * Tampoco se ejecuta ninguna operación entre los operandos
 * seleccionados.
 *
 * Por tanto esta función NO constituye:
 *
 * - semantic evaluation;
 * - semantic comparison;
 * - semantic compatibility assessment;
 * - rule presence;
 * - rule definition;
 * - condition establishment;
 * - condition satisfaction;
 * - rule application;
 * - correspondence assessment;
 * - correspondence result;
 * - DirectionalReferenceAxisCorrespondence;
 * - Membership;
 * - PositionOnAxis;
 * - Effect correspondence;
 * - applicability;
 * - direction determination.
 */
export function establishProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperandsPresence(
  directionalReferenceAxisRelationDefinition:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationDefinition,
  evaluationOperandsInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperandsInput
):
  | ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperandsPresence
  | null {
  if (
    directionalReferenceAxisRelationDefinition
      .definitionInput
      .relationId !==
    evaluationOperandsInput.relationId
  ) {
    return null;
  }

  return {
    directionalReferenceAxisRelationDefinition,
    evaluationOperandsInput,
    presenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operands-present',
  };
}
