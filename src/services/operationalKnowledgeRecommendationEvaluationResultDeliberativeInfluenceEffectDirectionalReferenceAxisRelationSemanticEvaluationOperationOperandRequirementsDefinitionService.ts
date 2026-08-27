import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsPresence,
} from './operationalKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsPresenceService';

/**
 * FASE 24.46
 *
 * Información externa explícita mínima necesaria para atribuir
 * una definición semántica declarativa a una especificación de
 * requerimientos de operandos previamente presentada.
 *
 * requirementsId identifica exactamente qué especificación de
 * requerimientos pretende recibir esta definición.
 *
 * requirementsSemanticRole proporciona exclusivamente una
 * caracterización semántica declarativa y opaca de esos
 * requerimientos.
 *
 * IMPORTANTE:
 *
 * requirementsSemanticRole NO constituye:
 *
 * - aridad;
 * - firma computacional;
 * - firma semántica ejecutable;
 * - dominio;
 * - codominio;
 * - tipos aceptados;
 * - roles esperados por operando;
 * - posición u orden de operandos;
 * - interpretación de operandos concretos;
 * - algoritmo;
 * - operador;
 * - predicado;
 * - regla de compatibilidad;
 * - regla de aplicabilidad;
 * - comparación;
 * - correspondencia;
 * - satisfacción de requerimientos;
 * - applicability;
 * - autorización de ejecución;
 * - ejecución;
 * - resultado descriptivo;
 * - exact-match / exact-mismatch;
 * - semantic satisfaction;
 * - Correspondence;
 * - Membership;
 * - PositionOnAxis;
 * - DirectionDetermination;
 * - Direction.
 *
 * Asimismo:
 *
 * requirementsId
 * !=
 * requirementsSemanticRole
 *
 * Ninguno de ambos adquiere comportamiento computacional.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsDefinitionInput =
  {
    requirementsId: string;
    requirementsSemanticRole: string;
  };

/**
 * FASE 24.46
 *
 * Materialización explícita del hecho:
 *
 * SemanticEvaluationOperationOperandRequirementsPresence
 * +
 * explicit OperationOperandRequirementsDefinitionInput
 * +
 * identidad exacta de requirementsId
 * +
 * invocación explícita
 * ->
 * SemanticEvaluationOperationOperandRequirementsDefinition
 *
 * SemanticEvaluationOperationOperandRequirementsPresence constituye
 * el único fundamento interno inmediato.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - semanticEvaluationOperationOperandRequirementsPresence
 * - definitionInput
 *
 * y sólo añade definitionType.
 *
 * Su significado es exclusivamente:
 *
 * una especificación de requerimientos de operandos previamente
 * presentada posee ahora una caracterización semántica declarativa
 * externa y explícita.
 *
 * En particular:
 *
 * operand requirements presence
 * !=
 * operand requirements definition
 * !=
 * concrete operands correspondence
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
 * La definición permanece completamente independiente de los
 * operandos concretos previamente designados en
 * SemanticEvaluationOperandsPresence.
 *
 * No existe aquí ningún reencuentro entre:
 *
 * SemanticEvaluationOperandsPresence
 *
 * y
 *
 * SemanticEvaluationOperationOperandRequirementsDefinition.
 *
 * requirementsSemanticRole
 * !=
 * arity
 * !=
 * semantic signature
 * !=
 * expected operand roles
 * !=
 * validator
 * !=
 * predicate
 * !=
 * compatibility rule
 * !=
 * applicability rule
 *
 * requirementsId permanece opaco y NO determina
 * requirementsSemanticRole.
 *
 * operationSemanticRole tampoco determina
 * requirementsSemanticRole.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsDefinition =
  {
    semanticEvaluationOperationOperandRequirementsPresence:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsPresence;

    definitionInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsDefinitionInput;

    definitionType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-semantic-definition';
  };

/**
 * FASE 24.46
 *
 * Define declarativamente la semántica de una especificación externa
 * de requerimientos de operandos previamente presentada.
 *
 * La única comprobación realizada aquí es identidad:
 *
 * OperandRequirementsPresence
 *   .evaluationOperationOperandRequirementsInput
 *   .requirementsId
 * ===
 * OperandRequirementsDefinitionInput.requirementsId
 *
 * Un mismatch devuelve null porque el input pretende definir una
 * especificación de requerimientos distinta de aquella que fundamenta
 * el nuevo nodo.
 *
 * Esta comprobación constituye exclusivamente identidad del objeto
 * semánticamente definido.
 *
 * NO constituye:
 *
 * - correspondencia entre requerimientos y operandos;
 * - satisfacción de requerimientos;
 * - compatibilidad;
 * - aplicabilidad.
 *
 * Deliberadamente NO se inspecciona ni interpreta:
 *
 * - SemanticEvaluationOperationDefinition;
 * - operationId;
 * - operationSemanticRole;
 * - relationId;
 * - relationSemanticRole;
 * - referenceSemanticRole;
 * - axisSubject;
 * - referenceOperand;
 * - axisOperand;
 * - SemanticEvaluationOperandsPresence.
 *
 * Tampoco se interpreta computacionalmente:
 *
 * - requirementsId;
 * - requirementsSemanticRole.
 *
 * Esta función NO establece:
 *
 * - arity;
 * - semantic signature;
 * - operand domain;
 * - operand codomain;
 * - expected operand roles;
 * - operand compatibility;
 * - operation / operands correspondence;
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
export function defineProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirements(
  semanticEvaluationOperationOperandRequirementsPresence:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsPresence,
  definitionInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsDefinitionInput
):
  | ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsDefinition
  | null {
  if (
    semanticEvaluationOperationOperandRequirementsPresence
      .evaluationOperationOperandRequirementsInput
      .requirementsId !==
    definitionInput.requirementsId
  ) {
    return null;
  }

  return {
    semanticEvaluationOperationOperandRequirementsPresence,
    definitionInput,
    definitionType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-semantic-definition',
  };
}