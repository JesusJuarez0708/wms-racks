import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresence,
} from './operationalKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresenceService';

/**
 * FASE 24.65
 *
 * Presencia externa explícita mínima de un Participant dentro de una
 * ParticipationSemanticStructure previamente presentada.
 *
 * participationSemanticStructureParticipantId
 * identifica exclusivamente un nuevo individuo participante P.
 *
 * IMPORTANTE:
 *
 * ParticipantPresence constituye una rama hermana de Constitution
 * bajo la misma ParticipationSemanticStructurePresence.
 *
 * Por tanto:
 *
 * ParticipationSemanticStructurePresence(S)
 * +
 * explicit ParticipantPresence(P)
 * ->
 * ParticipationSemanticStructureParticipantPresence(S,P)
 *
 * y NO:
 *
 * ElementSemanticRoleAvailabilityDefinition
 * ->
 * ParticipantPresence.
 *
 * El participante NO nace desde:
 *
 * - ConstitutionPresence;
 * - ConstitutionElementPresence;
 * - ElementSemanticCharacterization;
 * - ElementSemanticRolePresence;
 * - ElementSemanticRoleDefinition;
 * - ElementSemanticRoleAvailabilityPresence;
 * - ElementSemanticRoleAvailabilityDefinition.
 *
 * participantId constituye una identidad externa explícita propia.
 *
 * NO se introduce:
 *
 * - participantDefinition;
 * - participantSemanticCharacterization;
 * - participantSemanticRole;
 * - participantSemanticRoleDefinition;
 * - semanticRoleId;
 * - roleId;
 * - participantRoleId;
 * - memberRoleId;
 * - containerRoleId.
 *
 * El input NO duplica:
 *
 * - participationSemanticStructureId;
 * - participationSemanticStructureConstitutionId;
 * - participationSemanticStructureConstitutionElementId;
 * - structureConstituentRelationId;
 * - interpretedStructureConstituentRelationSemanticRole.
 *
 * La identidad S ya está determinada genealógicamente por
 * ParticipationSemanticStructurePresence.
 *
 * participationSemanticStructureParticipantId es completamente opaco.
 *
 * Su contenido NO constituye:
 *
 * - member;
 * - container;
 * - source;
 * - target;
 * - candidate;
 * - eligible participant;
 * - assigned participant;
 * - occupant.
 *
 * Incluso si participantId = "member" o participantId = "occupied",
 * dichos valores permanecen exclusivamente como identificadores
 * externos literales.
 *
 * ParticipantPresence NO constituye todavía:
 *
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
 * - cardinalidad;
 * - aridad;
 * - completitud;
 * - SemanticCorrespondence;
 * - SemanticCompatibility;
 * - SemanticApplicability;
 * - SemanticApplication;
 * - DomainFact.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantPresenceInput =
  {
    participationSemanticStructureParticipantId: string;
  };

/**
 * FASE 24.65
 *
 * Materialización explícita del hecho:
 *
 * ParticipationSemanticStructurePresence(S)
 * +
 * explicit ParticipantPresenceInput(P)
 * +
 * invocación explícita
 * ->
 * ParticipationSemanticStructureParticipantPresence(S,P)
 *
 * ParticipationSemanticStructurePresence constituye el único
 * fundamento interno inmediato.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresence;
 * - participationSemanticStructureParticipantPresenceInput;
 *
 * y sólo añade:
 *
 * - participationSemanticStructureParticipantPresenceType.
 *
 * Su significado exclusivo es:
 *
 * la ParticipationSemanticStructure S posee ahora un participante P
 * explícitamente presentado.
 *
 * IMPORTANTE:
 *
 * ParticipationSemanticStructurePresence
 * != ParticipationSemanticStructureParticipantPresence.
 *
 * También:
 *
 * ParticipantPresence
 * != ConstitutionPresence
 * != ConstitutionElementPresence
 * != ElementSemanticRolePresence
 * != ElementSemanticRoleDefinition
 * != ElementSemanticRoleAvailabilityPresence
 * != ElementSemanticRoleAvailabilityDefinition.
 *
 * Y:
 *
 * ParticipantPresence
 * != ParticipantRoleCorrespondence
 * != ParticipantRoleCompatibility
 * != ParticipantRoleEligibility
 * != ParticipantRoleAssignment
 * != RoleOccupation
 * != RoleFulfillment
 * != Membership.
 *
 * La presencia del participante NO significa:
 *
 * - que P corresponda con un SemanticRole;
 * - que P sea compatible con un SemanticRole;
 * - que P sea elegible para un SemanticRole;
 * - que P esté asignado a un SemanticRole;
 * - que P ocupe un SemanticRole;
 * - que P satisfaga un SemanticRole;
 * - que P sea miembro de una estructura o entidad.
 *
 * Tampoco introduce:
 *
 * - cardinalidad;
 * - aridad;
 * - colección;
 * - enumeración;
 * - orden;
 * - posición;
 * - Requirement;
 * - Slot;
 * - OperandRole;
 * - availability status;
 * - vacancy;
 * - capacity.
 *
 * Esta entidad pertenece exclusivamente a la rama Participant de
 * ParticipationSemanticStructure.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantPresence =
  {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresence:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresence;

    participationSemanticStructureParticipantPresenceInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantPresenceInput;

    participationSemanticStructureParticipantPresenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-presence';
  };

/**
 * FASE 24.65
 *
 * Establece explícitamente la presencia de un Participant P dentro de
 * una ParticipationSemanticStructure previamente presentada.
 *
 * Deliberadamente NO existe aquí ninguna comprobación adicional de:
 *
 * - identity match;
 * - identity mismatch;
 * - semantic match;
 * - semantic mismatch;
 * - correspondencia;
 * - compatibilidad;
 * - elegibilidad;
 * - asignación;
 * - membership;
 * - occupation;
 * - canonicalización;
 * - unicidad.
 *
 * ParticipationSemanticStructurePresence ya determina
 * genealógicamente:
 *
 * - participationSemanticStructureId;
 * - RelationSemanticInterpretation;
 * - toda la genealogía anterior.
 *
 * La nueva información introducida es exclusivamente:
 *
 * participationSemanticStructureParticipantId.
 *
 * El valor se conserva exactamente como fue aportado.
 *
 * Deliberadamente NO se:
 *
 * - deriva desde ConstitutionElement;
 * - deriva desde SemanticRole;
 * - deriva desde Availability;
 * - normaliza;
 * - canonicaliza;
 * - transforma;
 * - interpreta;
 * - compara;
 * - valida semánticamente;
 * - clasifica;
 * - convierte en member;
 * - convierte en occupant.
 *
 * En particular NO se inspecciona si:
 *
 * participantId = "member"
 *
 * ni si:
 *
 * participantId = "occupied".
 *
 * Todos esos valores permanecen opacos.
 *
 * La misma ParticipationSemanticStructurePresence puede recibir
 * múltiples ParticipantPresence mediante invocaciones independientes.
 *
 * Esto NO implica:
 *
 * - unicidad;
 * - canonical participant;
 * - preferred participant;
 * - participant ordering;
 * - cardinalidad;
 * - aridad;
 * - participant collection;
 * - participant role distribution.
 *
 * Asimismo, disponer de múltiples ParticipantPresence NO permite
 * inferir el número total de participantes de la estructura.
 *
 * Tampoco se inspeccionan ni promueven:
 *
 * - participationSemanticStructureConstitutionId;
 * - participationSemanticStructureConstitutionElementId;
 * - semanticRoleDefinition;
 * - availabilityPresenceId;
 * - availabilityDefinition;
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
export function establishProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantPresence(
  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresence:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresence,

  participationSemanticStructureParticipantPresenceInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantPresenceInput
): ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantPresence {
  return {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresence,

    participationSemanticStructureParticipantPresenceInput,

    participationSemanticStructureParticipantPresenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-presence',
  };
}