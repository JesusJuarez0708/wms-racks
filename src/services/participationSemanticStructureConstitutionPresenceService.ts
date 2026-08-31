import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresence,
} from './operationalKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresenceService';

/**
 * FASE 24.58
 *
 * Identidad externa explícita mínima de un individuo cuya presencia
 * representa la constitución interna de una estructura semántica
 * de participación previamente presentada.
 *
 * participationSemanticStructureConstitutionId identifica
 * exclusivamente dicho individuo constitutivo.
 *
 * Su existencia NO individualiza todavía elementos internos.
 *
 * En particular,
 * participationSemanticStructureConstitutionId NO constituye:
 *
 * - constituentId;
 * - participantId;
 * - participant semantic role;
 * - participant semantic role definition;
 * - roleId;
 * - member role;
 * - container role;
 * - source role;
 * - target role;
 * - role assignment;
 * - role availability;
 * - interpreted participant role;
 * - collection;
 * - enumeration;
 * - plurality;
 * - cardinality;
 * - count;
 * - order;
 * - index;
 * - ordinal;
 * - position;
 * - arity;
 * - Slot;
 * - slotId;
 * - Requirement;
 * - requirementId;
 * - requirementSemanticRole;
 * - OperandRole;
 * - operandRole;
 * - expectedSemanticRole;
 * - semantic correspondence;
 * - semantic compatibility;
 * - semantic applicability;
 * - semantic application;
 * - semantic validation;
 * - semantic correctness;
 * - semantic confidence;
 * - RelationRealization;
 * - MediationPresence;
 * - InterpretedRelationRealization;
 * - InterpretedRelationalFact;
 * - ConstituentMembership;
 * - interpreted domain fact;
 * - domain fact.
 *
 * participationSemanticStructureId NO se duplica en este input.
 *
 * Su identidad permanece determinada genealógicamente por
 * ParticipationSemanticStructurePresence.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionPresenceInput =
  {
    participationSemanticStructureConstitutionId: string;
  };

/**
 * FASE 24.58
 *
 * Materialización explícita del hecho:
 *
 * ParticipationSemanticStructurePresence(P)
 * +
 * explicit ParticipationSemanticStructureConstitutionPresenceInput(C)
 * +
 * invocación explícita
 * ->
 * ParticipationSemanticStructureConstitutionPresence(P,C)
 *
 * ParticipationSemanticStructurePresence constituye el único
 * fundamento interno inmediato.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresence;
 * - participationSemanticStructureConstitutionPresenceInput;
 *
 * y sólo añade:
 *
 * - participationSemanticStructureConstitutionPresenceType.
 *
 * Su significado exclusivo es:
 *
 * una estructura semántica de participación explícitamente presentada
 * posee ahora una constitución interna explícitamente identificada.
 *
 * La constitución permanece completamente opaca.
 *
 * IMPORTANTE:
 *
 * ParticipationSemanticStructurePresence
 * != ParticipationSemanticStructureConstitutionPresence.
 *
 * También:
 *
 * ParticipationSemanticStructureConstitutionPresence
 * != ParticipationSemanticStructureConstituentPresence
 * != ParticipantSemanticRolePresence
 * != ParticipantSemanticRoleDefinition
 * != RoleAvailability
 * != ParticipantRoleAssignment
 * != InterpretedParticipantRole.
 *
 * Y:
 *
 * ParticipationSemanticStructureConstitutionPresence
 * != collection
 * != enumeration
 * != cardinality
 * != plurality
 * != order
 * != position
 * != arity.
 *
 * Además:
 *
 * ParticipationSemanticStructureConstitutionPresence
 * != RelationRealization
 * != MediationPresence
 * != SemanticCorrespondence
 * != SemanticCompatibility
 * != SemanticApplicability
 * != SemanticApplication
 * != InterpretedRelationRealization
 * != InterpretedRelationalFact
 * != ConstituentMembership
 * != DomainFact.
 *
 * Incluso si la genealogía conserva una interpretación equivalente
 * conceptualmente a membership, esta entidad NO permite afirmar:
 *
 * - que exista un role "member";
 * - que exista un role "container";
 * - que C contenga dichos roles;
 * - que C contenga exactamente dos elementos;
 * - que Structure sea container;
 * - que Constituent sea member;
 * - que exista ConstituentMembership.
 *
 * Esta entidad continúa perteneciendo exclusivamente a la rama
 * intensional.
 *
 * NO depende de:
 *
 * - ParticipantsPresence;
 * - RelationRealization;
 * - MediationPresence;
 * - ConstituentDefinition;
 * - SemanticEvaluationOperandsPresence.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionPresence =
  {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresence:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresence;

    participationSemanticStructureConstitutionPresenceInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionPresenceInput;

    participationSemanticStructureConstitutionPresenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-constitution-presence';
  };

/**
 * FASE 24.58
 *
 * Establece explícitamente la presencia de una constitución interna
 * para una ParticipationSemanticStructurePresence previamente
 * constituida.
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
 * ParticipationSemanticStructurePresence ya determina
 * genealógicamente participationSemanticStructureId.
 *
 * El nuevo input NO posee una identidad de estructura independiente
 * que deba reconciliarse con el fundamento.
 *
 * Por tanto, NO existe aquí ninguna razón constitutiva para:
 *
 * - comparar participationSemanticStructureId;
 * - comparar interpretedStructureConstituentRelationSemanticRole;
 * - devolver null por mismatch.
 *
 * La nueva información introducida es exclusivamente:
 *
 * participationSemanticStructureConstitutionId.
 *
 * La misma ParticipationSemanticStructurePresence puede recibir
 * múltiples constituciones explícitamente identificadas mediante
 * invocaciones independientes.
 *
 * Por tanto:
 *
 * constitution presence
 * != uniqueness
 * != canonical constitution
 * != preferred constitution.
 *
 * Tampoco se introduce exclusividad inversa.
 *
 * Deliberadamente NO se inspeccionan:
 *
 * - participationSemanticStructureId;
 * - structureConstituentRelationSemanticRole;
 * - interpretedStructureConstituentRelationSemanticRole;
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
 * - referenceOperand;
 * - axisOperand;
 * - SemanticEvaluationOperandsPresence.
 */
export function establishProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionPresence(
  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresence:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresence,
  participationSemanticStructureConstitutionPresenceInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionPresenceInput
): ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionPresence {
  return {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresence,
    participationSemanticStructureConstitutionPresenceInput,
    participationSemanticStructureConstitutionPresenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-constitution-presence',
  };
}