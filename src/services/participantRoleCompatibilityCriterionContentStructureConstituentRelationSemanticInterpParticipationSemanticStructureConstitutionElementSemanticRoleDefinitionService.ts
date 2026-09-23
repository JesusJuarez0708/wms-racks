import type {
  ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRolePresence,
} from './participantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpParticipationSemanticStructureConstitutionElementSemanticRolePresenceService';

/**
 * FASE 25.38
 *
 * Define explícitamente el SemanticRole previamente presente sobre el mismo
 * ParticipationSemanticStructureConstitutionElement de la genealogía activa.
 *
 * El contenido de Definition permanece declarativo y completamente opaco.
 *
 * SemanticRolePresence de FASE 25.37 constituye el único fundamento
 * interno inmediato.
 *
 * No introduce:
 *
 * - semanticRoleId;
 * - roleId;
 * - participantRoleId;
 * - SemanticRoleAvailabilityPresence;
 * - SemanticRoleAvailabilityDefinition;
 * - Correspondence;
 * - Compatibility;
 * - Eligibility;
 * - Assignment;
 * - Membership;
 * - Occupation;
 * - Fulfillment;
 * - interpretación lexical;
 * - score;
 * - weight;
 * - priority;
 * - confidence;
 * - ranking;
 * - preference;
 * - selection;
 * - decision.
 */
export type ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleDefinitionInput = {
  participantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleDefinition:
    string;
};

/**
 * FASE 25.38
 *
 * ConstitutionElementSemanticRolePresence(C,E,D,M,R)
 * +
 * explicit SemanticRoleDefinitionInput(X)
 * +
 * invocación explícita
 * ->
 * ConstitutionElementSemanticRoleDefinition(C,E,D,M,R,X)
 *
 * Conserva exactamente por identidad:
 *
 * - ConstitutionElementSemanticRolePresence de FASE 25.37;
 * - ConstitutionElementSemanticRoleDefinitionInput.
 *
 * Y añade únicamente SemanticRoleDefinitionType.
 *
 * Presence NO produce Definition automáticamente.
 */
export type ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleDefinition = {
  participantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRolePresence:
    ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRolePresence;
  participantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleDefinitionInput:
    ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleDefinitionInput;
  participantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleDefinitionType:
    'participant-role-compatibility-criterion-content-structure-constituent-relation-participation-semantic-structure-constitution-element-semantic-role-definition';
};

/**
 * FASE 25.38
 *
 * D procede exclusivamente del input externo explícito.
 *
 * Deliberadamente NO se deriva desde SemanticCharacterization y NO se:
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
 * - valida lexicalmente;
 * - clasifica nuevamente.
 *
 * El valor se conserva exactamente como fue aportado.
 *
 * La misma SemanticRolePresence puede recibir múltiples definiciones
 * mediante invocaciones explícitas independientes. Esto no implica
 * unicidad, preferencia, equivalencia, conflicto ni resolución.
 *
 * Tampoco se materializa automáticamente ninguna capa posterior.
 */
export function defineParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRole(
  participantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRolePresence:
    ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRolePresence,
  participantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleDefinitionInput:
    ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleDefinitionInput
): ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleDefinition {
  return {
    participantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRolePresence,
    participantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleDefinitionInput,
    participantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRoleDefinitionType:
      'participant-role-compatibility-criterion-content-structure-constituent-relation-participation-semantic-structure-constitution-element-semantic-role-definition',
  };
}
