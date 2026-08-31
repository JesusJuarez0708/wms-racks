import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionPresence,
} from './participationSemanticStructureConstitutionPresenceService';

/**
 * FASE 24.59
 *
 * Identidad externa explícita mínima de un individuo presentado como
 * elemento interno de una ParticipationSemanticStructureConstitution
 * previamente constituida.
 *
 * participationSemanticStructureConstitutionElementId identifica
 * exclusivamente dicho individuo interno.
 *
 * Su presencia NO define todavía qué clase de elemento es.
 *
 * En particular,
 * participationSemanticStructureConstitutionElementId NO constituye:
 *
 * - semantic role;
 * - semantic role definition;
 * - participant role;
 * - member role;
 * - container role;
 * - source role;
 * - target role;
 * - role availability;
 * - role assignment;
 * - interpreted participant role;
 * - OperandRequirementsStructureConstituent;
 * - Requirement;
 * - Slot;
 * - OperandRole;
 * - position;
 * - order;
 * - index;
 * - ordinal;
 * - arity;
 * - cardinality;
 * - collection;
 * - semantic correspondence;
 * - semantic compatibility;
 * - semantic applicability;
 * - semantic application;
 * - semantic validation;
 * - semantic correctness;
 * - RelationRealization;
 * - MediationPresence;
 * - InterpretedRelationRealization;
 * - InterpretedRelationalFact;
 * - ConstituentMembership;
 * - DomainFact.
 *
 * participationSemanticStructureConstitutionId NO se duplica
 * en este input.
 *
 * Su identidad permanece determinada genealógicamente por
 * ParticipationSemanticStructureConstitutionPresence.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementPresenceInput =
  {
    participationSemanticStructureConstitutionElementId: string;
  };

/**
 * FASE 24.59
 *
 * Materialización explícita del hecho:
 *
 * ParticipationSemanticStructureConstitutionPresence(C)
 * +
 * explicit ElementPresenceInput(E)
 * +
 * invocación explícita
 * ->
 * ParticipationSemanticStructureConstitutionElementPresence(C,E)
 *
 * ParticipationSemanticStructureConstitutionPresence constituye
 * el único fundamento interno inmediato.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionPresence;
 * - participationSemanticStructureConstitutionElementPresenceInput;
 *
 * y sólo añade:
 *
 * - participationSemanticStructureConstitutionElementPresenceType.
 *
 * Su significado exclusivo es:
 *
 * un individuo explícitamente identificado E ha sido presentado como
 * elemento interno de una constitución semántica de participación C.
 *
 * IMPORTANTE:
 *
 * ParticipationSemanticStructureConstitutionPresence
 * != ParticipationSemanticStructureConstitutionElementPresence.
 *
 * También:
 *
 * ElementPresence
 * != ElementDefinition
 * != SemanticRolePresence
 * != SemanticRoleDefinition
 * != RoleAvailability
 * != ParticipantRoleAssignment
 * != InterpretedParticipantRole.
 *
 * Y:
 *
 * Element
 * != OperandRequirementsStructureConstituent
 * != Requirement
 * != Slot
 * != OperandRole.
 *
 * La presencia de un solo elemento NO implica:
 *
 * - cardinalidad conocida;
 * - unicidad;
 * - pluralidad;
 * - colección;
 * - enumeración;
 * - orden;
 * - posición;
 * - aridad.
 *
 * Incluso si la genealogía conserva una interpretación
 * conceptualmente equivalente a membership,
 * esta entidad NO permite afirmar:
 *
 * - member;
 * - container;
 * - member role;
 * - container role;
 * - ConstituentMembership.
 *
 * Esta entidad continúa perteneciendo exclusivamente
 * a la rama intensional.
 *
 * NO depende de:
 *
 * - RelationRealization;
 * - MediationPresence;
 * - SemanticEvaluationOperandsPresence.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementPresence =
  {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionPresence:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionPresence;

    participationSemanticStructureConstitutionElementPresenceInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementPresenceInput;

    participationSemanticStructureConstitutionElementPresenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-constitution-element-presence';
  };

/**
 * FASE 24.59
 *
 * Establece explícitamente la presencia de un elemento interno
 * para una ParticipationSemanticStructureConstitutionPresence
 * previamente constituida.
 *
 * Deliberadamente NO existe aquí ninguna comprobación de:
 *
 * - identity match;
 * - identity mismatch;
 * - semantic match;
 * - semantic mismatch;
 * - equivalencia;
 * - correspondencia;
 * - compatibilidad;
 * - applicability;
 * - validez;
 * - correctness;
 * - canonicalización;
 * - unicidad.
 *
 * ParticipationSemanticStructureConstitutionPresence ya determina
 * genealógicamente participationSemanticStructureConstitutionId.
 *
 * El nuevo input NO posee una identidad de constitución independiente
 * que deba reconciliarse con el fundamento.
 *
 * La nueva información introducida es exclusivamente:
 *
 * participationSemanticStructureConstitutionElementId.
 *
 * La misma ConstitutionPresence puede recibir múltiples elementos
 * explícitamente identificados mediante invocaciones independientes.
 *
 * Por tanto:
 *
 * element presence
 * != uniqueness
 * != canonical element
 * != preferred element.
 *
 * Tampoco se introduce exclusividad inversa.
 *
 * Deliberadamente NO se inspeccionan:
 *
 * - participationSemanticStructureConstitutionId;
 * - participationSemanticStructureId;
 * - interpretedStructureConstituentRelationSemanticRole;
 * - structureConstituentRelationSemanticRole;
 * - structureId;
 * - constituentsId;
 * - constituentId;
 * - participantsId;
 * - participant roles;
 * - realizationId;
 * - mediationId;
 * - requirementsId;
 * - requirementsSemanticRole;
 * - operationId;
 * - operationSemanticRole;
 * - relationId;
 * - relationSemanticRole;
 * - referenceSemanticRole;
 * - axisSubject;
 * - SemanticEvaluationOperandsPresence.
 */
export function establishProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementPresence(
  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionPresence:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionPresence,
  participationSemanticStructureConstitutionElementPresenceInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementPresenceInput
): ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementPresence {
  return {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionPresence,
    participationSemanticStructureConstitutionElementPresenceInput,
    participationSemanticStructureConstitutionElementPresenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-constitution-element-presence',
  };
}