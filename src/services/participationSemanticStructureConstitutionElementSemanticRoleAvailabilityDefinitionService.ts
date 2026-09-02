import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresence,
} from './participationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresenceService';

/**
 * FASE 24.64
 *
 * Definición semántica externa explícita mínima de la Availability
 * previamente presentada para el SemanticRole definido sobre un
 * ParticipationSemanticStructureConstitutionElement.
 *
 * participationSemanticStructureConstitutionElementSemanticRoleAvailabilityDefinition
 * aporta exclusivamente contenido semántico declarativo explícito
 * para la Availability ya presente.
 *
 * IMPORTANTE:
 *
 * La identidad de la Availability continúa siendo exactamente la
 * identidad A previamente introducida por
 * ElementSemanticRoleAvailabilityPresence.
 *
 * NO se introduce:
 *
 * - availabilityDefinitionId;
 * - semanticRoleId;
 * - roleId;
 * - participantId;
 * - participantRoleId;
 * - memberRoleId;
 * - containerRoleId.
 *
 * El input NO duplica:
 *
 * - participationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresenceId;
 * - participationSemanticStructureConstitutionElementId;
 * - participationSemanticStructureConstitutionId;
 * - participationSemanticStructureId.
 *
 * La identidad ya está determinada genealógicamente por
 * ElementSemanticRoleAvailabilityPresence.
 *
 * Por tanto:
 *
 * ElementSemanticRoleAvailabilityPresence(E,A)
 * +
 * explicit AvailabilityDefinition(AD)
 * ->
 * ElementSemanticRoleAvailabilityDefinition(E,A,AD)
 *
 * y NO:
 *
 * ElementSemanticRoleAvailabilityPresence(E,A)
 * ->
 * ElementSemanticRoleAvailabilityDefinition(E,A).
 *
 * La definición requiere una nueva invocación externa explícita.
 *
 * Incluso si AD = "occupied", dicho valor constituye exclusivamente
 * contenido semántico declarativo explícito.
 *
 * NO constituye:
 *
 * - availability status;
 * - vacancy;
 * - occupation;
 * - capacity;
 * - ParticipantRoleCorrespondence;
 * - ParticipantRoleCompatibility;
 * - ParticipantRoleEligibility;
 * - ParticipantRoleAssignment;
 * - RoleOccupation;
 * - RoleFulfillment;
 * - ParticipantMembership;
 * - ConstituentMembership;
 * - Requirement;
 * - Slot;
 * - OperandRole;
 * - SemanticCorrespondence;
 * - SemanticCompatibility;
 * - SemanticApplicability;
 * - SemanticApplication;
 * - DomainFact.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityDefinitionInput =
  {
    participationSemanticStructureConstitutionElementSemanticRoleAvailabilityDefinition:
      string;
  };

/**
 * FASE 24.64
 *
 * Materialización explícita del hecho:
 *
 * ElementSemanticRoleAvailabilityPresence(E,A)
 * +
 * explicit AvailabilityDefinitionInput(AD)
 * +
 * invocación explícita
 * ->
 * ElementSemanticRoleAvailabilityDefinition(E,A,AD)
 *
 * ElementSemanticRoleAvailabilityPresence constituye el único
 * fundamento interno inmediato.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresence;
 * - participationSemanticStructureConstitutionElementSemanticRoleAvailabilityDefinitionInput;
 *
 * y sólo añade:
 *
 * - participationSemanticStructureConstitutionElementSemanticRoleAvailabilityDefinitionType.
 *
 * Su significado exclusivo es:
 *
 * la Availability A previamente presentada para el mismo SemanticRole
 * posee ahora una definición semántica externa explícita AD.
 *
 * IMPORTANTE:
 *
 * ElementSemanticCharacterization
 * != ElementSemanticRolePresence
 * != ElementSemanticRoleDefinition
 * != ElementSemanticRoleAvailabilityPresence
 * != ElementSemanticRoleAvailabilityDefinition
 * != ParticipantRoleCorrespondence
 * != ParticipantRoleCompatibility
 * != ParticipantRoleEligibility
 * != ParticipantRoleAssignment.
 *
 * La definición conserva AD, pero deliberadamente NO lo interpreta.
 *
 * Por tanto:
 *
 * availabilityDefinition = "occupied"
 *
 * NO autoriza:
 *
 * availabilityStatus = "occupied"
 *
 * ni:
 *
 * occupation = true.
 *
 * Tampoco introduce:
 *
 * - cardinalidad;
 * - aridad;
 * - completitud;
 * - Requirement;
 * - Slot;
 * - OperandRole;
 * - availability status;
 * - vacancy;
 * - occupation;
 * - capacity;
 * - correspondence;
 * - compatibility;
 * - applicability;
 * - assignment;
 * - fulfillment;
 * - membership.
 *
 * Esta entidad continúa perteneciendo exclusivamente a la rama
 * semántica de ParticipationSemanticStructure.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityDefinition =
  {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresence:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresence;

    participationSemanticStructureConstitutionElementSemanticRoleAvailabilityDefinitionInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityDefinitionInput;

    participationSemanticStructureConstitutionElementSemanticRoleAvailabilityDefinitionType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-constitution-element-semantic-role-availability-definition';
  };

/**
 * FASE 24.64
 *
 * Define semánticamente de forma explícita la Availability
 * previamente presentada para el SemanticRole definido sobre
 * el mismo Element E.
 *
 * Deliberadamente NO existe aquí ninguna comprobación de identidad
 * adicional porque AvailabilityDefinitionInput NO introduce una
 * nueva identidad.
 *
 * ElementSemanticRoleAvailabilityPresence ya determina
 * genealógicamente:
 *
 * - participationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresenceId;
 * - participationSemanticStructureConstitutionElementId;
 * - participationSemanticStructureConstitutionId;
 * - participationSemanticStructureId;
 * - toda la genealogía anterior.
 *
 * La nueva información introducida es exclusivamente:
 *
 * participationSemanticStructureConstitutionElementSemanticRoleAvailabilityDefinition.
 *
 * El valor se conserva exactamente como fue aportado.
 *
 * Deliberadamente NO se:
 *
 * - deriva desde ElementSemanticCharacterization;
 * - deriva desde ElementSemanticRoleDefinition;
 * - deriva desde AvailabilityPresenceId;
 * - normaliza;
 * - canonicaliza;
 * - transforma;
 * - interpreta;
 * - compara;
 * - valida semánticamente;
 * - convierte en estado booleano;
 * - convierte en disponibilidad operacional.
 *
 * En particular NO se inspecciona si:
 *
 * availabilityPresenceId = "available"
 *
 * ni si:
 *
 * availabilityPresenceId = "occupied"
 *
 * ni si:
 *
 * availabilityDefinition = "occupied".
 *
 * Todos esos valores permanecen semánticamente separados y
 * deliberadamente no producen hechos operacionales.
 *
 * La misma AvailabilityPresence puede recibir múltiples definiciones
 * explícitas mediante invocaciones independientes.
 *
 * Esto NO implica:
 *
 * - unicidad;
 * - canonical meaning;
 * - preferred meaning;
 * - availability status;
 * - vacancy;
 * - occupation;
 * - capacity;
 * - prioridad;
 * - preferencia;
 * - equivalencia;
 * - conflicto;
 * - resolución entre múltiples definiciones.
 *
 * Tampoco se inspeccionan ni promueven:
 *
 * - structureId;
 * - constituentsId;
 * - constituentId;
 * - participantsId;
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
export function defineProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleAvailability(
  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresence:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresence,

  participationSemanticStructureConstitutionElementSemanticRoleAvailabilityDefinitionInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityDefinitionInput
): ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityDefinition {
  return {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresence,

    participationSemanticStructureConstitutionElementSemanticRoleAvailabilityDefinitionInput,

    participationSemanticStructureConstitutionElementSemanticRoleAvailabilityDefinitionType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-constitution-element-semantic-role-availability-definition',
  };
}