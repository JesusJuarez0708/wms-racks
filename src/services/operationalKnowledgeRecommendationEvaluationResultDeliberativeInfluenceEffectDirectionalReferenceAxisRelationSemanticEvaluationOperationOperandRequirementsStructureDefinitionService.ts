import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructurePresence,
} from './operationalKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructurePresenceService';

/**
 * FASE 24.48
 *
 * Información externa explícita mínima necesaria para definir
 * semánticamente una estructura declarativa de requerimientos de
 * operandos cuya presencia ya fue establecida.
 *
 * structureId identifica exactamente qué estructura declarativa
 * previamente presentada pretende recibir esta definición.
 *
 * structureSemanticRole caracteriza exclusivamente el significado
 * semántico declarativo de dicha estructura.
 *
 * IMPORTANTE:
 *
 * structureSemanticRole NO constituye:
 *
 * - contenido estructural;
 * - colección de requerimientos;
 * - constituyente estructural;
 * - requerimiento individual;
 * - aridad;
 * - firma computacional;
 * - firma semántica;
 * - dominio;
 * - codominio;
 * - tipos aceptados;
 * - roles esperados por operando;
 * - expectedSemanticRole;
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
 * structureId
 * !=
 * structureSemanticRole
 *
 * y:
 *
 * requirementsSemanticRole
 * !=
 * structureSemanticRole
 *
 * sin que esas expresiones impliquen pertenencia al mismo
 * dominio semántico.
 *
 * Ninguno de estos elementos adquiere comportamiento computacional.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureDefinitionInput =
  {
    structureId: string;
    structureSemanticRole: string;
  };

/**
 * FASE 24.48
 *
 * Materialización explícita del hecho:
 *
 * SemanticEvaluationOperationOperandRequirementsStructurePresence
 * +
 * explicit OperandRequirementsStructureDefinitionInput
 * +
 * identidad exacta de structureId
 * +
 * invocación explícita
 * ->
 * SemanticEvaluationOperationOperandRequirementsStructureDefinition
 *
 * SemanticEvaluationOperationOperandRequirementsStructurePresence
 * constituye el único fundamento interno inmediato.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - semanticEvaluationOperationOperandRequirementsStructurePresence
 * - structureDefinitionInput
 *
 * y sólo añade definitionType.
 *
 * Su significado es exclusivamente:
 *
 * una estructura declarativa de requerimientos de operandos
 * previamente presentada posee ahora una caracterización semántica
 * declarativa explícita.
 *
 * En particular:
 *
 * operand requirements structure presence
 * !=
 * operand requirements structure definition
 * !=
 * operand requirements structure constituents presence
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
 * La definición de estructura permanece completamente independiente
 * de los operandos concretos previamente designados en
 * SemanticEvaluationOperandsPresence.
 *
 * No existe aquí ningún reencuentro entre:
 *
 * SemanticEvaluationOperandsPresence
 *
 * y
 *
 * SemanticEvaluationOperationOperandRequirementsStructureDefinition.
 *
 * structureSemanticRole
 * !=
 * structure constituents
 * !=
 * constituent collection
 * !=
 * arity
 * !=
 * semantic signature
 * !=
 * operand role designation
 * !=
 * expectedSemanticRole
 * !=
 * validator
 * !=
 * predicate
 *
 * structureId permanece opaco y NO determina structureSemanticRole.
 *
 * structureSemanticRole tampoco determina structureId.
 *
 * requirementsSemanticRole tampoco determina structureSemanticRole.
 *
 * La definición semántica de la estructura NO implica que sus
 * constituyentes internos hayan sido presentados o definidos.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureDefinition =
  {
    semanticEvaluationOperationOperandRequirementsStructurePresence:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructurePresence;

    structureDefinitionInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureDefinitionInput;

    definitionType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-definition';
  };

/**
 * FASE 24.48
 *
 * Define explícitamente el significado semántico declarativo de una
 * estructura de requerimientos de operandos cuya presencia ya fue
 * establecida.
 *
 * La única comprobación realizada aquí es identidad:
 *
 * OperandRequirementsStructurePresence
 *   .structurePresenceInput
 *   .structureId
 * ===
 * OperandRequirementsStructureDefinitionInput.structureId
 *
 * Un mismatch devuelve null porque el input pretende definir una
 * estructura distinta de aquella cuya presencia fundamenta el
 * nuevo nodo.
 *
 * Esta comprobación constituye exclusivamente identidad de la
 * estructura declarativa cuya semántica pretende definirse.
 *
 * NO constituye:
 *
 * - validación de la estructura;
 * - inspección de contenido estructural;
 * - presentación de constituyentes;
 * - definición de constituyentes;
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
 * - requirementsId;
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
 * - structureId;
 * - structureSemanticRole.
 *
 * Esta función NO establece:
 *
 * - structure contents;
 * - structure constituents;
 * - requirement entries;
 * - individual operand requirements;
 * - constituent identities;
 * - operand role designations;
 * - expected semantic roles;
 * - arity;
 * - semantic signature;
 * - operand domain;
 * - operand codomain;
 * - accepted types;
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
export function defineProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructure(
  semanticEvaluationOperationOperandRequirementsStructurePresence:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructurePresence,
  structureDefinitionInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureDefinitionInput
):
  | ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureDefinition
  | null {
  if (
    semanticEvaluationOperationOperandRequirementsStructurePresence
      .structurePresenceInput
      .structureId !==
    structureDefinitionInput.structureId
  ) {
    return null;
  }

  return {
    semanticEvaluationOperationOperandRequirementsStructurePresence,
    structureDefinitionInput,
    definitionType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-definition',
  };
}
