import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentsPresence,
} from './operationalKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentsPresenceService';

/**
 * FASE 24.50
 *
 * Información externa explícita mínima necesaria para presentar
 * la existencia de un constituyente individual dentro del contexto
 * de constitución interna previamente presentado.
 *
 * constituentsId identifica exactamente qué presentación de
 * constitución interna pretende recibir esta individualización
 * explícita.
 *
 * constituentId identifica exclusivamente un individuo constitutivo
 * explícitamente presentado.
 *
 * IMPORTANTE:
 *
 * constituentId NO constituye:
 *
 * - definición semántica del constituyente;
 * - membership formal;
 * - relación structure-constituent;
 * - requirement;
 * - requirementId;
 * - slot;
 * - slotId;
 * - operand;
 * - operandId;
 * - operand role;
 * - expectedSemanticRole;
 * - posición;
 * - orden;
 * - índice;
 * - ordinal;
 * - aridad;
 * - cardinalidad;
 * - colección;
 * - pluralidad conocida;
 * - firma computacional;
 * - firma semántica;
 * - dominio;
 * - codominio;
 * - tipos aceptados;
 * - mapping;
 * - correspondencia;
 * - satisfacción;
 * - applicability;
 * - execution;
 * - exact-match / exact-mismatch.
 *
 * Asimismo:
 *
 * constituentsId
 * !=
 * constituentId
 *
 * sin que esa expresión implique pertenencia al mismo dominio
 * semántico ni relación formal de membership.
 *
 * constituentId permanece exclusivamente como identificador opaco.
 *
 * La existencia de este individuo NO permite inferir:
 *
 * - que sea el único constituyente;
 * - que existan múltiples constituyentes;
 * - que ocupe una posición determinada;
 * - que exista colección enumerable;
 * - que exista cardinalidad conocida;
 * - que exista aridad;
 * - que exista orden.
 *
 * La asociación con StructureConstituentsPresence representa
 * exclusivamente procedencia contextual.
 *
 * NO constituye todavía:
 *
 * - member-of;
 * - belongs-to;
 * - part-of;
 * - constituent membership.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentPresenceInput =
  {
    constituentsId: string;
    constituentId: string;
  };

/**
 * FASE 24.50
 *
 * Materialización explícita del hecho:
 *
 * SemanticEvaluationOperationOperandRequirementsStructureConstituentsPresence
 * +
 * explicit OperandRequirementsStructureConstituentPresenceInput
 * +
 * identidad exacta de constituentsId
 * +
 * invocación explícita
 * ->
 * SemanticEvaluationOperationOperandRequirementsStructureConstituentPresence
 *
 * SemanticEvaluationOperationOperandRequirementsStructureConstituentsPresence
 * constituye el único fundamento interno inmediato.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - semanticEvaluationOperationOperandRequirementsStructureConstituentsPresence
 * - structureConstituentPresenceInput
 *
 * y sólo añade presenceType.
 *
 * Su significado es exclusivamente:
 *
 * dentro del contexto de constitución interna previamente presentado
 * existe ahora un individuo constitutivo explícitamente presentado e
 * identificable.
 *
 * En particular:
 *
 * structure constituents presence
 * !=
 * individual constituent presence
 * !=
 * constituent membership
 * !=
 * constituent definition
 * !=
 * requirement presence
 * !=
 * requirement definition
 * !=
 * slot presence
 * !=
 * operand role
 * !=
 * expectedSemanticRole
 * !=
 * concrete operands correspondence
 * !=
 * requirements satisfaction
 * !=
 * operation applicability
 * !=
 * operation execution
 *
 * La derivación desde StructureConstituentsPresence establece
 * exclusivamente procedencia contextual.
 *
 * NO establece una relación semántica formal:
 *
 * constituent member-of structure
 *
 * ni:
 *
 * constituent belongs-to constituents
 *
 * constituentsId
 * !=
 * constituentId
 * !=
 * requirementId
 * !=
 * slotId
 * !=
 * operandId
 *
 * La presencia individual tampoco determina cardinalidad,
 * pluralidad, colección, posición, orden ni aridad.
 *
 * La rama permanece completamente independiente de
 * SemanticEvaluationOperandsPresence.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentPresence =
  {
    semanticEvaluationOperationOperandRequirementsStructureConstituentsPresence:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentsPresence;

    structureConstituentPresenceInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentPresenceInput;

    presenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-presence';
  };

/**
 * FASE 24.50
 *
 * Presenta explícitamente un constituyente individual dentro del
 * contexto de constitución interna previamente presentado.
 *
 * La única comprobación realizada aquí es identidad:
 *
 * OperandRequirementsStructureConstituentsPresence
 *   .structureConstituentsPresenceInput
 *   .constituentsId
 * ===
 * OperandRequirementsStructureConstituentPresenceInput.constituentsId
 *
 * Un mismatch devuelve null porque el input pretende individualizar
 * un constituyente dentro de una presentación de constitución interna
 * distinta de aquella que fundamenta el nuevo nodo.
 *
 * Esta comprobación constituye exclusivamente identidad del contexto
 * constitutivo.
 *
 * NO constituye:
 *
 * - validación estructural;
 * - membership;
 * - member-of;
 * - belongs-to;
 * - part-of;
 * - definición semántica del constituyente;
 * - requirement;
 * - slot;
 * - operand role;
 * - expectedSemanticRole;
 * - correspondencia;
 * - satisfacción;
 * - applicability;
 * - execution.
 *
 * Deliberadamente NO se inspecciona ni interpreta:
 *
 * - structureId;
 * - structureSemanticRole;
 * - requirementsId;
 * - requirementsSemanticRole;
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
 * - constituentsId;
 * - constituentId.
 *
 * Esta función NO establece:
 *
 * - constituent definition;
 * - constituent semantic role;
 * - constituent membership;
 * - constituent collection;
 * - constituent count;
 * - constituent plurality;
 * - constituent ordering;
 * - requirement entries;
 * - requirement collection;
 * - slots;
 * - operand role designations;
 * - expected semantic roles;
 * - arity;
 * - cardinality;
 * - semantic signature;
 * - operand domain;
 * - operand codomain;
 * - accepted types;
 * - operand positions;
 * - operand ordering;
 * - requirements / operands mapping;
 * - operation / operands correspondence;
 * - requirements satisfaction;
 * - operation applicability;
 * - execution authorization;
 * - execution;
 * - algorithm;
 * - executable operator;
 * - predicate;
 * - evaluation;
 * - comparison;
 * - exact-match;
 * - exact-mismatch;
 * - semantic satisfaction;
 * - DirectionalReferenceAxisCorrespondence;
 * - Membership;
 * - PositionOnAxis;
 * - DirectionDetermination;
 * - Direction.
 */
export function presentProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituent(
  semanticEvaluationOperationOperandRequirementsStructureConstituentsPresence:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentsPresence,
  structureConstituentPresenceInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentPresenceInput
):
  | ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentPresence
  | null {
  if (
    semanticEvaluationOperationOperandRequirementsStructureConstituentsPresence
      .structureConstituentsPresenceInput
      .constituentsId !==
    structureConstituentPresenceInput.constituentsId
  ) {
    return null;
  }

  return {
    semanticEvaluationOperationOperandRequirementsStructureConstituentsPresence,
    structureConstituentPresenceInput,
    presenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-presence',
  };
}