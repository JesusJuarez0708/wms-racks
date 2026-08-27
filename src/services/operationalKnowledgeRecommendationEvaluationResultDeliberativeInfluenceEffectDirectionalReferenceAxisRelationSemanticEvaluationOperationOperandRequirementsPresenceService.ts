import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationDefinition,
} from './operationalKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationDefinitionService';

/**
 * FASE 24.45
 *
 * Presencia externa explícita de requerimientos semánticos de
 * operandos para una operación evaluativa cuya semántica declarativa
 * ya fue definida.
 *
 * requirementsId identifica exclusivamente una especificación externa
 * de requerimientos.
 *
 * No define todavía qué exigen esos requerimientos.
 *
 * En particular, requirementsId NO constituye:
 *
 * - definición semántica de requerimientos;
 * - aridad;
 * - firma semántica;
 * - dominio;
 * - codominio;
 * - tipos aceptados;
 * - roles esperados;
 * - interpretación de operandos;
 * - compatibilidad;
 * - correspondencia operation/operands;
 * - satisfacción de requerimientos;
 * - condición de aplicabilidad;
 * - regla de aplicabilidad;
 * - applicability;
 * - autorización de ejecución;
 * - ejecución;
 * - algoritmo;
 * - operador;
 * - predicado;
 * - comparación;
 * - resultado descriptivo;
 * - exact-match / exact-mismatch;
 * - semantic satisfaction;
 * - Correspondence;
 * - Membership;
 * - PositionOnAxis;
 * - DirectionDetermination;
 * - Direction.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsInput =
  {
    requirementsId: string;
  };

/**
 * FASE 24.45
 *
 * Materialización explícita del hecho:
 *
 * SemanticEvaluationOperationDefinition
 * +
 * explicit OperationOperandRequirementsInput
 * +
 * invocación explícita
 * ->
 * SemanticEvaluationOperationOperandRequirementsPresence
 *
 * SemanticEvaluationOperationDefinition constituye el único
 * fundamento interno inmediato.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - semanticEvaluationOperationDefinition
 * - evaluationOperationOperandRequirementsInput
 *
 * y sólo añade presenceType.
 *
 * Su significado es exclusivamente:
 *
 * existe ahora una especificación externa explícita de requerimientos
 * de operandos asociada estructuralmente con la operación evaluativa
 * definida.
 *
 * En particular:
 *
 * operation semantic definition
 * !=
 * operand requirements presence
 * !=
 * operand requirements definition
 * !=
 * operand requirements satisfaction
 * !=
 * operation applicability
 * !=
 * operation execution
 * !=
 * descriptive result
 * !=
 * semantic satisfaction
 * !=
 * Correspondence
 *
 * requirementsId permanece completamente opaco.
 *
 * operationSemanticRole permanece declarativo y NO determina:
 *
 * - requirementsId;
 * - contenido de los requerimientos;
 * - compatibilidad;
 * - satisfacción;
 * - aplicabilidad;
 * - ejecución.
 *
 * referenceSemanticRole, axisSubject y relationSemanticRole
 * permanecen igualmente opacos.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsPresence =
  {
    semanticEvaluationOperationDefinition:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationDefinition;

    evaluationOperationOperandRequirementsInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsInput;

    presenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-present';
  };

/**
 * FASE 24.45
 *
 * Presenta explícitamente una especificación externa de requerimientos
 * de operandos para una operación cuya semántica ya fue definida.
 *
 * Deliberadamente NO se inspecciona ni interpreta ninguna propiedad de
 * SemanticEvaluationOperationDefinition.
 *
 * En particular NO se leen:
 *
 * - relationId;
 * - operationId;
 * - operationSemanticRole;
 * - relationSemanticRole;
 * - referenceSemanticRole;
 * - axisSubject;
 * - referenceOperand;
 * - axisOperand.
 *
 * Tampoco se interpreta requirementsId.
 *
 * La asociación estructural con la operación queda expresada
 * exclusivamente por conservar SemanticEvaluationOperationDefinition
 * como fundamento inmediato del nuevo nodo.
 *
 * Esta función NO establece:
 *
 * - requirements definition;
 * - semantic signature;
 * - operand requirements;
 * - operand compatibility;
 * - requirements satisfaction;
 * - applicability;
 * - applicability rule;
 * - execution authorization;
 * - execution;
 * - algorithm;
 * - executable operator;
 * - predicate;
 * - evaluation;
 * - comparison;
 * - descriptive comparison result;
 * - exact-match;
 * - exact-mismatch;
 * - semantic satisfaction;
 * - correspondence assessment;
 * - correspondence result;
 * - DirectionalReferenceAxisCorrespondence;
 * - Membership;
 * - PositionOnAxis;
 * - DirectionDetermination;
 * - Direction.
 */
export function establishProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsPresence(
  semanticEvaluationOperationDefinition:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationDefinition,
  evaluationOperationOperandRequirementsInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsInput
):
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsPresence {
  return {
    semanticEvaluationOperationDefinition,
    evaluationOperationOperandRequirementsInput,
    presenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-present',
  };
}
