import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationPresence,
} from './operationalKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationPresenceService';

/**
 * FASE 24.44
 *
 * Semántica declarativa externa explícita de una operación evaluativa
 * previamente presentada frente a los operandos designados para una
 * futura evaluación semántica de la relación reference-axis.
 *
 * operationSemanticRole declara exclusivamente qué relación
 * descriptiva pretende observar la operación.
 *
 * No constituye:
 *
 * - algoritmo;
 * - operador ejecutable;
 * - predicado;
 * - estrategia computacional;
 * - interpretación concreta de los operandos;
 * - dominio / codominio;
 * - aplicabilidad;
 * - ejecución;
 * - comparación;
 * - resultado descriptivo;
 * - exact-match / exact-mismatch;
 * - semantic satisfaction;
 * - correspondence assessment;
 * - correspondence result;
 * - Correspondence;
 * - Membership;
 * - PositionOnAxis;
 * - correspondencia con el Effect;
 * - aplicabilidad al Effect;
 * - DirectionDetermination;
 * - Direction.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationDefinitionInput =
  {
    relationId: string;
    operationId: string;
    operationSemanticRole: string;
  };

/**
 * FASE 24.44
 *
 * Materialización explícita del hecho:
 *
 * SemanticEvaluationOperationPresence
 * +
 * explicit SemanticEvaluationOperationDefinitionInput
 * +
 * identidad exacta de relationId
 * +
 * identidad exacta de operationId
 * +
 * invocación explícita
 * ->
 * SemanticEvaluationOperationDefinition
 *
 * SemanticEvaluationOperationPresence constituye el único fundamento
 * interno inmediato.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - semanticEvaluationOperationPresence
 * - evaluationOperationDefinitionInput
 *
 * y sólo añade definitionType.
 *
 * Su significado es exclusivamente:
 *
 * una operación evaluativa previamente presentada posee ahora una
 * semántica declarativa externa explícita.
 *
 * En particular:
 *
 * operation present
 * !=
 * operation semantic definition
 * !=
 * operation applicability
 * !=
 * operation execution
 * !=
 * operands evaluated
 * !=
 * semantic comparison
 * !=
 * descriptive result
 * !=
 * semantic satisfaction
 * !=
 * correspondence assessment
 * !=
 * correspondence result
 * !=
 * Correspondence
 *
 * operationSemanticRole permanece declarativo.
 *
 * No selecciona automáticamente:
 *
 * - algoritmo;
 * - operador;
 * - implementación;
 * - estrategia;
 * - normalización;
 * - interpretación de operandos;
 * - forma del resultado.
 *
 * relationSemanticRole, referenceSemanticRole y axisSubject
 * continúan siendo opacos para este servicio.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationDefinition =
  {
    semanticEvaluationOperationPresence:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationPresence;

    evaluationOperationDefinitionInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationDefinitionInput;

    definitionType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-semantic-definition';
  };

/**
 * FASE 24.44
 *
 * Define explícitamente la semántica declarativa de una operación
 * evaluativa previamente presentada.
 *
 * Las únicas comprobaciones realizadas son identidad estructural:
 *
 * SemanticEvaluationOperationPresence.relationId
 * ===
 * SemanticEvaluationOperationDefinitionInput.relationId
 *
 * y:
 *
 * SemanticEvaluationOperationPresence.operationId
 * ===
 * SemanticEvaluationOperationDefinitionInput.operationId
 *
 * Un mismatch devuelve null porque el input pretende definir una
 * operación distinta o una operación perteneciente a una relación
 * distinta de aquella que fundamenta OperationPresence.
 *
 * Deliberadamente NO se leen ni interpretan:
 *
 * - referenceOperand;
 * - axisOperand;
 * - referenceSemanticRole;
 * - axisSubject;
 * - relationSemanticRole;
 * - operationSemanticRole.
 *
 * operationSemanticRole se conserva como semántica declarativa
 * externa y no se transforma en comportamiento ejecutable.
 *
 * Esta función NO establece:
 *
 * - applicability;
 * - compatibility;
 * - algorithm;
 * - executable operator;
 * - predicate;
 * - evaluation;
 * - comparison;
 * - descriptive comparison result;
 * - semantic satisfaction;
 * - correspondence condition;
 * - condition satisfaction;
 * - rule application;
 * - correspondence assessment;
 * - correspondence result;
 * - DirectionalReferenceAxisCorrespondence;
 * - Membership;
 * - PositionOnAxis;
 * - Effect correspondence;
 * - applicability to Effect;
 * - direction determination;
 * - Direction.
 */
export function defineProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperation(
  semanticEvaluationOperationPresence:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationPresence,
  evaluationOperationDefinitionInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationDefinitionInput
):
  | ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationDefinition
  | null {
  if (
    semanticEvaluationOperationPresence
      .semanticEvaluationOperandsPresence
      .evaluationOperandsInput
      .relationId !==
      evaluationOperationDefinitionInput.relationId
  ) {
    return null;
  }

  if (
    semanticEvaluationOperationPresence
      .evaluationOperationInput
      .operationId !==
      evaluationOperationDefinitionInput.operationId
  ) {
    return null;
  }

  return {
    semanticEvaluationOperationPresence,
    evaluationOperationDefinitionInput,
    definitionType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-semantic-definition',
  };
}
