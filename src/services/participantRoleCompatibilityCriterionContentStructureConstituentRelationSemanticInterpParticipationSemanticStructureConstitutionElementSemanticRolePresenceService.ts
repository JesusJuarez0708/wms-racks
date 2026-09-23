import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticCharacterization,
} from './participantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpParticipationSemanticStructureConstitutionElementSemanticCharacterizationService';

/**
 * FASE 25.37
 *
 * Clasificación ontológica externa explícita mínima mediante la cual
 * un ParticipationSemanticStructureConstitutionElement previamente
 * caracterizado semánticamente es presentado formalmente como
 * perteneciente a la categoría SemanticRole.
 *
 * Contrato:
 *
 * ConstitutionElementSemanticCharacterization(C,E,D,M)
 * +
 * explicit SemanticRolePresenceInput(R)
 * +
 * invocación explícita
 * ->
 * ConstitutionElementSemanticRolePresence(C,E,D,M,R)
 *
 * R.semanticRoleClassification = 'semantic-role'
 *
 * IMPORTANTE:
 *
 * ConstitutionElementSemanticCharacterization de FASE 25.36 constituye
 * el único fundamento interno inmediato.
 *
 * La clasificación SemanticRole:
 *
 * - es externa;
 * - es explícita;
 * - NO se deriva de Definition D;
 * - NO se deriva de SemanticCharacterization M;
 * - NO interpreta lexicalmente D ni M;
 * - NO crea un nuevo individuo role.
 *
 * El mismo ConstitutionElement continúa siendo el individuo
 * genealógicamente determinado por las capas anteriores.
 *
 * NO se introducen:
 *
 * - semanticRoleId;
 * - roleId;
 * - participantRoleId;
 * - SemanticRoleDefinition;
 * - SemanticRoleAvailabilityPresence;
 * - SemanticRoleAvailabilityDefinition;
 * - MemberRole;
 * - ContainerRole;
 * - SourceRole;
 * - TargetRole;
 * - OperandRole;
 * - Membership;
 * - Requirement;
 * - Slot;
 * - Compatibility;
 * - Eligibility;
 * - Assignment;
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

export type ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRolePresenceInput = {
  semanticRoleClassification: 'semantic-role';
};

/**
 * FASE 25.37
 *
 * Materialización explícita de SemanticRolePresence.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - ConstitutionElementSemanticCharacterization de FASE 25.36;
 * - ConstitutionElementSemanticRolePresenceInput;
 *
 * y sólo añade su discriminante SemanticRolePresenceType.
 *
 * La genealogía previa permanece completamente encapsulada.
 */
export type ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRolePresence = {
  participantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticCharacterization:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticCharacterization;

  participantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRolePresenceInput:
    ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRolePresenceInput;

  participantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRolePresenceType:
    'participant-role-compatibility-criterion-content-structure-constituent-relation-participation-semantic-structure-constitution-element-semantic-role-presence';
};

/**
 * FASE 25.37
 *
 * Presenta explícitamente como SemanticRole un ConstitutionElement
 * previamente caracterizado semánticamente.
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
 * - asigna;
 * - compara;
 * - evalúa.
 *
 * Tampoco se materializa automáticamente ninguna capa posterior.
 */
export function establishParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRolePresence(
  participantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticCharacterization:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticCharacterization,
  participantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRolePresenceInput:
    ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRolePresenceInput
): ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRolePresence {
  return {
    participantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticCharacterization,
    participantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRolePresenceInput,
    participantRoleCompatibilityCriterionContentStructureConstituentRelationParticipationSemanticStructureConstitutionElementSemanticRolePresenceType:
      'participant-role-compatibility-criterion-content-structure-constituent-relation-participation-semantic-structure-constitution-element-semantic-role-presence',
  };
}
