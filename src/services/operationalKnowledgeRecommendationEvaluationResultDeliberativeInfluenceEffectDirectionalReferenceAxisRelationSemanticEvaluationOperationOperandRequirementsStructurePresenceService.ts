import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsDefinition,
} from './operationalKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsDefinitionService';

/**
 * FASE 24.47
 *
 * Información externa explícita mínima necesaria para presentar
 * la existencia de una estructura declarativa asociada a una
 * especificación de requerimientos de operandos previamente definida.
 *
 * requirementsId identifica exactamente qué especificación de
 * requerimientos pretende recibir esta presentación estructural.
 *
 * structureId identifica exclusivamente la estructura declarativa
 * presentada.
 *
 * IMPORTANTE:
 *
 * structureId NO constituye:
 *
 * - contenido estructural;
 * - colección de requerimientos;
 * - requerimiento individual;
 * - aridad;
 * - firma computacional;
 * - firma semántica;
 * - dominio;
 * - codominio;
 * - tipos aceptados;
 * - roles esperados por operando;
 * - posición u orden de operandos;
 * - mapping;
 * - association con operandos concretos;
 * - correspondencia;
 * - satisfacción de requerimientos;
 * - validator;
 * - predicate;
 * - compatibility rule;
 * - applicability rule;
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
 * structureId
 *
 * Ninguno de ambos adquiere comportamiento computacional.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructurePresenceInput =
  {
    requirementsId: string;
    structureId: string;
  };

/**
 * FASE 24.47
 *
 * Materialización explícita del hecho:
 *
 * SemanticEvaluationOperationOperandRequirementsDefinition
 * +
 * explicit OperandRequirementsStructurePresenceInput
 * +
 * identidad exacta de requirementsId
 * +
 * invocación explícita
 * ->
 * SemanticEvaluationOperationOperandRequirementsStructurePresence
 *
 * SemanticEvaluationOperationOperandRequirementsDefinition constituye
 * el único fundamento interno inmediato.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - semanticEvaluationOperationOperandRequirementsDefinition
 * - structurePresenceInput
 *
 * y sólo añade presenceType.
 *
 * Su significado es exclusivamente:
 *
 * una especificación de requerimientos de operandos previamente
 * definida posee ahora una estructura declarativa explícitamente
 * presentada e identificada.
 *
 * En particular:
 *
 * operand requirements definition
 * !=
 * operand requirements structure presence
 * !=
 * operand requirements structure definition
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
 * La presencia de estructura permanece completamente independiente
 * de los operandos concretos previamente designados en
 * SemanticEvaluationOperandsPresence.
 *
 * No existe aquí ningún reencuentro entre:
 *
 * SemanticEvaluationOperandsPresence
 *
 * y
 *
 * SemanticEvaluationOperationOperandRequirementsStructurePresence.
 *
 * structureId
 * !=
 * structure definition
 * !=
 * arity
 * !=
 * semantic signature
 * !=
 * expected operand roles
 * !=
 * requirement collection
 * !=
 * validator
 * !=
 * predicate
 *
 * requirementsId permanece opaco y NO determina structureId.
 *
 * structureId tampoco determina requirementsId.
 *
 * requirementsSemanticRole tampoco determina structureId.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructurePresence =
  {
    semanticEvaluationOperationOperandRequirementsDefinition:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsDefinition;

    structurePresenceInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructurePresenceInput;

    presenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-presence';
  };

/**
 * FASE 24.47
 *
 * Presenta explícitamente la existencia de una estructura declarativa
 * para una especificación de requerimientos de operandos previamente
 * definida.
 *
 * La única comprobación realizada aquí es identidad:
 *
 * OperandRequirementsDefinition
 *   .definitionInput
 *   .requirementsId
 * ===
 * OperandRequirementsStructurePresenceInput.requirementsId
 *
 * Un mismatch devuelve null porque el input pretende presentar una
 * estructura para una especificación de requerimientos distinta de
 * aquella que fundamenta el nuevo nodo.
 *
 * Esta comprobación constituye exclusivamente identidad de la
 * especificación cuya estructura pretende presentarse.
 *
 * NO constituye:
 *
 * - definición de la estructura;
 * - validación de la estructura;
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
 * - requirementsSemanticRole;
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
 * - structureId.
 *
 * Esta función NO establece:
 *
 * - structure contents;
 * - requirement entries;
 * - individual operand requirements;
 * - arity;
 * - semantic signature;
 * - operand domain;
 * - operand codomain;
 * - accepted types;
 * - expected operand roles;
 * - operand positions;
 * - operand ordering;
 * - operand compatibility;
 * - requirements / operands mapping;
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
export function presentProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructure(
  semanticEvaluationOperationOperandRequirementsDefinition:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsDefinition,
  structurePresenceInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructurePresenceInput
):
  | ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructurePresence
  | null {
  if (
    semanticEvaluationOperationOperandRequirementsDefinition
      .definitionInput
      .requirementsId !==
    structurePresenceInput.requirementsId
  ) {
    return null;
  }

  return {
    semanticEvaluationOperationOperandRequirementsDefinition,
    structurePresenceInput,
    presenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-presence',
  };
}
