import type {
  ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleDefinition,
} from './participantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpParticipationSemanticStructureConstitutionElementSemanticRoleDefinitionService';

/**
 * FASE 25.39
 *
 * Presencia externa explícita mínima de disponibilidad del SemanticRole
 * previamente definido sobre el mismo
 * ParticipationSemanticStructureConstitutionElement de la genealogía activa.
 *
 * SemanticRoleDefinition de FASE 25.38 constituye el único fundamento
 * interno inmediato.
 *
 * La nueva declaración NO introduce una identidad para:
 *
 * - ConstitutionElement;
 * - SemanticRole;
 * - Constitution;
 * - ParticipationSemanticStructure;
 * - Structure;
 * - Constituent;
 * - ConstituentRelation.
 *
 * Toda esa identidad continúa encapsulada en SemanticRoleDefinition.
 *
 * Por tanto:
 *
 * ConstitutionElementSemanticRoleDefinition(C,E,D,M,R,X)
 * +
 * explicit SemanticRoleAvailabilityPresenceInput(A)
 * +
 * invocación explícita
 * ->
 * ConstitutionElementSemanticRoleAvailabilityPresence(C,E,D,M,R,X,A)
 *
 * y NO:
 *
 * ConstitutionElementSemanticRoleDefinition(C,E,D,M,R,X)
 * ->
 * ConstitutionElementSemanticRoleAvailabilityPresence(C,E,D,M,R,X).
 *
 * La disponibilidad requiere una nueva invocación externa explícita.
 *
 * AvailabilityPresenceInput permanece completamente opaco.
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
 * Esta fase NO introduce todavía:
 *
 * - SemanticRoleAvailabilityDefinition;
 * - availabilityStatus;
 * - vacancy;
 * - occupation;
 * - capacity;
 * - Correspondence;
 * - Compatibility;
 * - Eligibility;
 * - Assignment;
 * - Membership;
 * - Occupation;
 * - Fulfillment;
 * - score;
 * - weight;
 * - priority;
 * - confidence;
 * - ranking;
 * - preference;
 * - selection;
 * - decision.
 */
export type ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresenceInput = {
  participantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresenceId:
    string;
};

/**
 * FASE 25.39
 *
 * Materialización explícita del hecho:
 *
 * ConstitutionElementSemanticRoleDefinition(C,E,D,M,R,X)
 * +
 * explicit SemanticRoleAvailabilityPresenceInput(A)
 * +
 * invocación explícita
 * ->
 * ConstitutionElementSemanticRoleAvailabilityPresence(C,E,D,M,R,X,A)
 *
 * SemanticRoleDefinition constituye el único fundamento
 * interno inmediato.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - SemanticRoleDefinition de FASE 25.38;
 * - SemanticRoleAvailabilityPresenceInput.
 *
 * Y añade únicamente SemanticRoleAvailabilityPresenceType.
 *
 * SemanticRoleDefinition NO produce AvailabilityPresence automáticamente.
 */
export type ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresence = {
  participantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleDefinition:
    ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleDefinition;
  participantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresenceInput:
    ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresenceInput;
  participantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresenceType:
    'participant-role-compatibility-criterion-content-structure-constituent-relation-participation-semantic-structure-constitution-element-semantic-role-availability-presence';
};

/**
 * FASE 25.39
 *
 * Presenta explícitamente la disponibilidad del SemanticRole
 * previamente definido sobre el mismo ConstitutionElement.
 *
 * Deliberadamente NO existe ninguna comprobación adicional de identidad:
 * SemanticRoleDefinition ya determina genealógicamente toda la identidad
 * anterior y AvailabilityPresenceInput no introduce una nueva identidad
 * para ninguno de esos individuos.
 *
 * La nueva información introducida es exclusivamente:
 *
 * participantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresenceId.
 *
 * El valor se conserva exactamente como fue aportado.
 *
 * Deliberadamente NO se:
 *
 * - deriva desde SemanticCharacterization;
 * - deriva desde SemanticRoleDefinition;
 * - infiere;
 * - normaliza;
 * - hace trim;
 * - canonicaliza;
 * - transforma;
 * - interpreta;
 * - especializa;
 * - compara;
 * - evalúa;
 * - valida semánticamente;
 * - convierte en estado booleano;
 * - convierte en disponibilidad operacional.
 *
 * La misma SemanticRoleDefinition puede recibir múltiples
 * AvailabilityPresence mediante invocaciones explícitas independientes.
 *
 * Esto NO implica unicidad, canonicalidad, equivalencia, preferencia,
 * conflicto ni resolución.
 *
 * FASE 25.29 RelationRealization y FASE 25.31 MediationPresence
 * permanecen en rama paralela y no constituyen fundamento interno.
 */
export function presentParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleAvailability(
  participantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleDefinition:
    ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleDefinition,
  participantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresenceInput:
    ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresenceInput
): ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresence {
  return {
    participantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleDefinition,
    participantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresenceInput,
    participantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresenceType:
      'participant-role-compatibility-criterion-content-structure-constituent-relation-participation-semantic-structure-constitution-element-semantic-role-availability-presence',
  };
}
