import type {
  ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresence,
} from './participantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresenceService';

/**
 * FASE 25.40
 *
 * Definición semántica externa explícita mínima de la Availability
 * previamente presentada para el SemanticRole del mismo
 * ParticipationSemanticStructureConstitutionElement de la genealogía activa.
 *
 * SemanticRoleAvailabilityPresence de FASE 25.39 constituye el único
 * fundamento interno inmediato.
 *
 * La nueva información introducida es exclusivamente:
 *
 * participantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityDefinition
 *
 * aportada mediante input externo explícito.
 *
 * Por tanto:
 *
 * SemanticRoleAvailabilityPresence(C,E,D,M,R,X,A)
 * +
 * explicit AvailabilityDefinition(AD)
 * +
 * invocación explícita
 * ->
 * SemanticRoleAvailabilityDefinition(C,E,D,M,R,X,A,AD)
 *
 * y NO:
 *
 * SemanticRoleAvailabilityPresence(C,E,D,M,R,X,A)
 * ->
 * SemanticRoleAvailabilityDefinition(C,E,D,M,R,X,A).
 *
 * La definición requiere una nueva invocación externa explícita.
 *
 * El contenido de AvailabilityDefinition permanece completamente opaco.
 *
 * Deliberadamente NO se:
 *
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
 * - convierte en estado operacional;
 * - convierte en vacancy;
 * - convierte en occupation;
 * - convierte en capacity.
 *
 * Esta fase NO introduce:
 *
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
 * - Requirement;
 * - Slot;
 * - OperandRole;
 * - score;
 * - weight;
 * - priority;
 * - confidence;
 * - ranking;
 * - preference;
 * - selection;
 * - decision.
 */
export type ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityDefinitionInput = {
  participantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityDefinition:
    string;
};

/**
 * FASE 25.40
 *
 * Materialización explícita del hecho:
 *
 * SemanticRoleAvailabilityPresence(C,E,D,M,R,X,A)
 * +
 * explicit AvailabilityDefinitionInput(AD)
 * +
 * invocación explícita
 * ->
 * SemanticRoleAvailabilityDefinition(C,E,D,M,R,X,A,AD)
 *
 * Conserva exactamente por identidad:
 *
 * - SemanticRoleAvailabilityPresence de FASE 25.39;
 * - SemanticRoleAvailabilityDefinitionInput.
 *
 * Y añade únicamente SemanticRoleAvailabilityDefinitionType.
 *
 * No crea una identidad adicional para:
 *
 * - ConstitutionElement;
 * - SemanticRole;
 * - Constitution;
 * - ParticipationSemanticStructure;
 * - Structure;
 * - Constituent;
 * - ConstituentRelation;
 * - Availability.
 *
 * Toda esa identidad permanece determinada genealógicamente
 * por SemanticRoleAvailabilityPresence.
 *
 * AvailabilityPresence NO produce AvailabilityDefinition automáticamente.
 */
export type ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityDefinition = {
  participantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresence:
    ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresence;
  participantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityDefinitionInput:
    ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityDefinitionInput;
  participantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityDefinitionType:
    'participant-role-compatibility-criterion-content-structure-constituent-relation-participation-semantic-structure-constitution-element-semantic-role-availability-definition';
};

/**
 * FASE 25.40
 *
 * Define semánticamente de forma explícita la Availability previamente
 * presentada para el SemanticRole del mismo ConstitutionElement.
 *
 * AvailabilityDefinitionInput NO introduce una nueva identidad.
 *
 * El valor se conserva exactamente como fue aportado.
 *
 * La misma AvailabilityPresence puede recibir múltiples
 * AvailabilityDefinition mediante invocaciones explícitas independientes.
 *
 * Esto NO implica unicidad, canonicalidad, equivalencia, preferencia,
 * conflicto, selección ni resolución.
 *
 * FASE 25.29 RelationRealization y FASE 25.31 MediationPresence
 * permanecen en rama paralela y no constituyen fundamento interno.
 */
export function defineParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleAvailability(
  participantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresence:
    ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresence,
  participantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityDefinitionInput:
    ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityDefinitionInput
): ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityDefinition {
  return {
    participantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresence,
    participantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityDefinitionInput,
    participantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityDefinitionType:
      'participant-role-compatibility-criterion-content-structure-constituent-relation-participation-semantic-structure-constitution-element-semantic-role-availability-definition',
  };
}
