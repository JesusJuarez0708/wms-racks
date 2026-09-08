import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresence,
} from './participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresenceService';

/**
 * FASE 24.95
 *
 * ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionPresence
 *
 * Presencia explícita mínima de una constitución interna perteneciente
 * a una ParticipationSemanticStructurePresence previamente constituida
 * en FASE 24.94.
 *
 * Fundamento interno inmediato único:
 *
 * ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresence
 *
 * Contrato:
 *
 * ParticipationSemanticStructurePresence(P)
 * +
 * explicit ParticipationSemanticStructureConstitutionPresenceInput(C)
 * +
 * invocación explícita
 * ->
 * ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionPresence
 *
 * La única información externa nueva es:
 *
 * participationSemanticStructureConstitutionId
 *
 * participationSemanticStructureConstitutionId identifica exclusivamente
 * un individuo interno presentado como constitución de la estructura
 * semántica de participación P.
 *
 * Su presencia NO individualiza todavía ningún elemento interno.
 *
 * En particular, participationSemanticStructureConstitutionId NO constituye:
 *
 * - participationSemanticStructureConstitutionElementId
 * - constituentId
 * - participantId
 * - participant semantic role
 * - participant semantic role definition
 * - roleId
 * - member role
 * - container role
 * - source role
 * - target role
 * - role assignment
 * - role availability
 * - interpreted participant role
 * - collection
 * - enumeration
 * - plurality
 * - cardinality
 * - count
 * - order
 * - index
 * - ordinal
 * - position
 * - arity
 * - Slot
 * - Requirement
 * - OperandRole
 * - semantic correspondence
 * - semantic compatibility
 * - semantic applicability
 * - semantic application
 * - semantic validation
 * - semantic correctness
 * - RelationRealization
 * - MediationPresence
 * - InterpretedRelationRealization
 * - InterpretedRelationalFact
 * - ConstituentMembership
 * - DomainFact.
 *
 * participationSemanticStructureId NO se duplica en este input.
 *
 * Su identidad permanece determinada genealógicamente por
 * ParticipationSemanticStructurePresence de FASE 24.94.
 *
 * Esta entidad continúa perteneciendo exclusivamente a la rama
 * intensional de RelationSemanticInterpretation.
 *
 * NO depende de:
 *
 * - RelationParticipantsPresence
 * - RelationRealization
 * - RelationSemanticInterpretationRealizationMediationPresence
 * - MediationPresence
 * - ConstitutionElementPresence
 * - ConstituentMembership.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionPresenceInput =
  {
    participationSemanticStructureConstitutionId: string;
  };

/**
 * FASE 24.95
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
 * ParticipationSemanticStructurePresence de FASE 24.94 constituye
 * el único fundamento interno inmediato.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresence
 * - ParticipationSemanticStructureConstitutionPresenceInput
 *
 * y sólo añade:
 *
 * - participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionPresenceType
 *
 * Toda la genealogía previa permanece encapsulada dentro de
 * ParticipationSemanticStructurePresence.
 *
 * No se repiten IDs ni semánticas heredadas en el nivel superior.
 *
 * IMPORTANTE:
 *
 * ParticipationSemanticStructurePresence
 * != ParticipationSemanticStructureConstitutionPresence
 * != ParticipationSemanticStructureConstitutionElementPresence
 * != ParticipantSemanticRolePresence
 * != ParticipantSemanticRoleDefinition
 * != RoleAvailability
 * != ParticipantRoleAssignment
 * != RelationRealization
 * != MediationPresence
 * != SemanticCorrespondence
 * != SemanticCompatibility
 * != SemanticApplicability
 * != SemanticApplication
 * != SemanticValidation
 * != SemanticCorrectness
 * != InterpretedRelationRealization
 * != InterpretedRelationalFact
 * != ConstituentMembership
 * != DomainFact.
 *
 * La constitución permanece completamente opaca.
 *
 * Incluso una interpretación lexicalmente equivalente a "membership"
 * NO produce member/container roles ni ConstituentMembership.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionPresence =
  {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresence:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresence;

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionPresenceInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionPresenceInput;

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionPresenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-constitution-presence';
  };

/**
 * FASE 24.95
 *
 * Establece explícitamente la presencia de una constitución interna
 * para una ParticipationSemanticStructurePresence previamente
 * constituida.
 *
 * Deliberadamente NO existe aquí ninguna comprobación de:
 *
 * - identity match
 * - identity mismatch
 * - semantic match
 * - semantic mismatch
 * - equivalencia
 * - correspondencia
 * - compatibilidad
 * - applicability
 * - validez
 * - correctness
 * - canonicalización
 * - unicidad.
 *
 * ParticipationSemanticStructurePresence ya determina genealógicamente
 * participationSemanticStructureId.
 *
 * El nuevo input NO posee una identidad independiente de estructura
 * que deba reconciliarse con el fundamento.
 *
 * Por tanto, NO existe razón constitutiva para devolver null por mismatch.
 *
 * La nueva información introducida es exclusivamente:
 *
 * participationSemanticStructureConstitutionId.
 *
 * La misma ParticipationSemanticStructurePresence puede recibir múltiples
 * individuos de constitución mediante invocaciones independientes con
 * participationSemanticStructureConstitutionId distintos.
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
 * Deliberadamente NO se inspeccionan ni duplican:
 *
 * - participationSemanticStructureId
 * - relationId
 * - structureConstituentRelationId
 * - structureId
 * - constituentsId
 * - constituentId
 * - semanticRoleId
 * - roleId
 * - interpretationId
 * - realizationId
 * - mediationId
 * - participantId
 * - participantsId.
 */
export function establishProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionPresence(
  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresence:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresence,
  participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionPresenceInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionPresenceInput
): ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionPresence {
  return {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresence,
    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionPresenceInput,
    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionPresenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-constitution-presence',
  };
}
