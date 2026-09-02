import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleDefinition,
} from './participationSemanticStructureConstitutionElementSemanticRoleDefinitionService';

/**
 * FASE 24.63
 *
 * Presencia externa explícita mínima de disponibilidad del
 * SemanticRole previamente definido sobre un
 * ParticipationSemanticStructureConstitutionElement.
 *
 * participationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresenceId
 * identifica exclusivamente la nueva declaración explícita de
 * presencia de disponibilidad.
 *
 * IMPORTANTE:
 *
 * La identidad del SemanticRole continúa siendo exactamente la
 * identidad del mismo Element E previamente:
 *
 * - presentado como SemanticRole;
 * - definido semánticamente de forma explícita.
 *
 * NO se introduce:
 *
 * - semanticRoleId;
 * - roleId;
 * - participantId;
 * - participantRoleId;
 * - memberRoleId;
 * - containerRoleId.
 *
 * El input NO duplica:
 *
 * - participationSemanticStructureConstitutionElementId;
 * - participationSemanticStructureConstitutionId;
 * - participationSemanticStructureId.
 *
 * La identidad ya está determinada genealógicamente por
 * ElementSemanticRoleDefinition.
 *
 * Por tanto:
 *
 * ElementSemanticRoleDefinition(E,D)
 * +
 * explicit AvailabilityPresence(A)
 * ->
 * ElementSemanticRoleAvailabilityPresence(E,A)
 *
 * y NO:
 *
 * ElementSemanticRoleDefinition(E,D)
 * ->
 * ElementSemanticRoleAvailabilityPresence(E).
 *
 * La disponibilidad requiere una nueva invocación externa explícita.
 *
 * availabilityPresenceId es completamente opaco.
 *
 * Su contenido NO:
 *
 * - define disponibilidad;
 * - interpreta disponibilidad;
 * - representa estado operacional;
 * - representa vacancia;
 * - representa ocupación;
 * - representa capacidad.
 *
 * La presencia de disponibilidad NO constituye todavía:
 *
 * - RoleAvailabilityDefinition;
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
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresenceInput =
  {
    participationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresenceId:
      string;
  };

/**
 * FASE 24.63
 *
 * Materialización explícita del hecho:
 *
 * ElementSemanticRoleDefinition(E,D)
 * +
 * explicit AvailabilityPresenceInput(A)
 * +
 * invocación explícita
 * ->
 * ElementSemanticRoleAvailabilityPresence(E,A)
 *
 * ElementSemanticRoleDefinition constituye el único fundamento
 * interno inmediato.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleDefinition;
 * - participationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresenceInput;
 *
 * y sólo añade:
 *
 * - participationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresenceType.
 *
 * Su significado exclusivo es:
 *
 * el mismo elemento E previamente presentado y definido
 * explícitamente como SemanticRole posee ahora una declaración
 * explícita de presencia de disponibilidad A.
 *
 * IMPORTANTE:
 *
 * ElementSemanticCharacterization
 * != ElementSemanticRolePresence
 * != ElementSemanticRoleDefinition
 * != ElementSemanticRoleAvailabilityPresence
 * != ParticipantRoleCorrespondence
 * != ParticipantRoleCompatibility
 * != ParticipantRoleEligibility
 * != ParticipantRoleAssignment.
 *
 * AvailabilityPresence NO significa:
 *
 * - que exista un participante;
 * - que un participante pueda desempeñar el rol;
 * - que un participante sea compatible;
 * - que un participante sea elegible;
 * - que un participante haya sido asignado;
 * - que el rol esté vacante;
 * - que el rol esté ocupado;
 * - que el rol tenga capacidad disponible;
 * - que exista fulfillment.
 *
 * Tampoco introduce:
 *
 * - cardinalidad;
 * - aridad;
 * - completitud;
 * - Requirement;
 * - Slot;
 * - OperandRole;
 * - membership;
 * - correspondence;
 * - compatibility;
 * - applicability;
 * - assignment;
 * - occupation;
 * - fulfillment.
 *
 * Esta entidad continúa perteneciendo exclusivamente a la rama
 * semántica de ParticipationSemanticStructure.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresence =
  {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleDefinition:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleDefinition;

    participationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresenceInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresenceInput;

    participationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-constitution-element-semantic-role-availability-presence';
  };

/**
 * FASE 24.63
 *
 * Presenta explícitamente la disponibilidad del SemanticRole
 * previamente definido sobre el mismo Element E.
 *
 * Deliberadamente NO existe aquí ninguna comprobación adicional
 * de identidad porque AvailabilityPresenceInput NO introduce una
 * nueva identidad para:
 *
 * - Element;
 * - SemanticRole;
 * - ParticipationSemanticStructure;
 * - Constitution.
 *
 * ElementSemanticRoleDefinition ya determina genealógicamente:
 *
 * - participationSemanticStructureConstitutionElementId;
 * - participationSemanticStructureConstitutionId;
 * - participationSemanticStructureId;
 * - toda la genealogía anterior.
 *
 * La nueva información introducida es exclusivamente:
 *
 * participationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresenceId.
 *
 * El valor se conserva exactamente como fue aportado.
 *
 * Deliberadamente NO se:
 *
 * - deriva desde ElementSemanticCharacterization;
 * - deriva desde ElementSemanticRoleDefinition;
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
 * semantic role definition = "member"
 *
 * ni si:
 *
 * availabilityPresenceId = "available"
 *
 * o:
 *
 * availabilityPresenceId = "occupied".
 *
 * Todos esos valores permanecen opacos.
 *
 * La misma SemanticRoleDefinition puede recibir múltiples
 * AvailabilityPresence mediante invocaciones independientes.
 *
 * Esto NO implica:
 *
 * - unicidad;
 * - availability canonical;
 * - availability status;
 * - vacancy;
 * - occupation;
 * - capacidad;
 * - prioridad;
 * - preferencia;
 * - conflicto;
 * - resolución entre múltiples presencias.
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
export function presentProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleAvailability(
  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleDefinition:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleDefinition,
  participationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresenceInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresenceInput
): ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresence {
  return {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleDefinition,
    participationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresenceInput,
    participationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-constitution-element-semantic-role-availability-presence',
  };
}