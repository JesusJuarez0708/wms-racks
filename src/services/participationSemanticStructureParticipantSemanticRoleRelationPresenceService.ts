import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantPresence,
} from './participationSemanticStructureParticipantPresenceService';

import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleDefinition,
} from './participationSemanticStructureConstitutionElementSemanticRoleDefinitionService';

/**
 * FASE 24.66
 *
 * Presencia externa explícita mínima de una relación individual Q entre:
 *
 * - un Participant P previamente presente;
 * - un SemanticRole R previamente definido.
 *
 * Ambos relata deben pertenecer genealógicamente a la misma
 * ParticipationSemanticStructurePresence.
 *
 * La relación introduce exclusivamente una nueva identidad externa:
 *
 * participationSemanticStructureParticipantSemanticRoleRelationId
 *
 * Además, el input declara explícitamente las identidades de los dos
 * extremos que pretende relacionar:
 *
 * - participationSemanticStructureParticipantId;
 * - participationSemanticStructureConstitutionElementId.
 *
 * IMPORTANTE:
 *
 * participationSemanticStructureParticipantSemanticRoleRelationId
 * es completamente opaco.
 *
 * Su contenido NO constituye:
 *
 * - correspondence;
 * - compatibility;
 * - eligibility;
 * - assignment;
 * - occupation;
 * - fulfillment;
 * - membership.
 *
 * Incluso si relationId = "member", "assigned-role" o "compatible",
 * dichos valores permanecen exclusivamente como identificadores
 * externos literales.
 *
 * RelationPresence NO constituye todavía:
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
 * - capacity;
 * - vacancy;
 * - status operacional;
 * - evaluación operacional.
 *
 * Availability NO constituye fundamento inmediato de esta fase.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantSemanticRoleRelationPresenceInput =
  {
    participationSemanticStructureParticipantSemanticRoleRelationId: string;
    participationSemanticStructureParticipantId: string;
    participationSemanticStructureConstitutionElementId: string;
  };

/**
 * FASE 24.66
 *
 * Materialización explícita del hecho:
 *
 * ParticipantPresence(S,P)
 * +
 * ElementSemanticRoleDefinition(S,E,R)
 * +
 * explicit ParticipantSemanticRoleRelationPresenceInput(Q,P,E)
 * +
 * identity match de P
 * +
 * identity match de E
 * +
 * misma ParticipationSemanticStructurePresence S
 * +
 * invocación explícita
 * ->
 * ParticipantSemanticRoleRelationPresence(S,P,E,Q)
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - participantPresence;
 * - semanticRoleDefinition;
 * - relationPresenceInput;
 *
 * y sólo añade:
 *
 * - participationSemanticStructureParticipantSemanticRoleRelationPresenceType.
 *
 * La presencia relacional NO interpreta la naturaleza de Q.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantSemanticRoleRelationPresence =
  {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantPresence:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantPresence;

    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleDefinition:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleDefinition;

    participationSemanticStructureParticipantSemanticRoleRelationPresenceInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantSemanticRoleRelationPresenceInput;

    participationSemanticStructureParticipantSemanticRoleRelationPresenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-semantic-role-relation-presence';
  };

/**
 * FASE 24.66
 *
 * Establece explícitamente la presencia de una relación Q entre
 * Participant P y SemanticRole R/E.
 *
 * Se comprueba exclusivamente:
 *
 * 1. que P solicitado coincide con el ParticipantPresence recibido;
 * 2. que E solicitado coincide con el ConstitutionElement que porta
 *    el SemanticRoleDefinition recibido;
 * 3. que ambas ramas proceden exactamente de la misma
 *    ParticipationSemanticStructurePresence.
 *
 * Estas comprobaciones son exclusivamente genealógicas/de identidad.
 *
 * NO constituyen:
 *
 * - semantic correspondence;
 * - compatibility;
 * - eligibility;
 * - assignment;
 * - occupation;
 * - fulfillment;
 * - membership.
 */
export function presentProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantSemanticRoleRelation(
  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantPresence:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantPresence,

  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleDefinition:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleDefinition,

  participationSemanticStructureParticipantSemanticRoleRelationPresenceInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantSemanticRoleRelationPresenceInput
): ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantSemanticRoleRelationPresence | null {
  const participantId =
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantPresence
      .participationSemanticStructureParticipantPresenceInput
      .participationSemanticStructureParticipantId;

  const semanticRoleElementPresence =
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleDefinition
      .semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRolePresence
      .semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticCharacterization
      .semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementPresence;

  const semanticRoleElementId =
    semanticRoleElementPresence
      .participationSemanticStructureConstitutionElementPresenceInput
      .participationSemanticStructureConstitutionElementId;

  if (
    participantId !==
    participationSemanticStructureParticipantSemanticRoleRelationPresenceInput
      .participationSemanticStructureParticipantId
  ) {
    return null;
  }

  if (
    semanticRoleElementId !==
    participationSemanticStructureParticipantSemanticRoleRelationPresenceInput
      .participationSemanticStructureConstitutionElementId
  ) {
    return null;
  }

  const participantStructurePresence =
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantPresence
      .semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresence;

  const semanticRoleStructurePresence =
    semanticRoleElementPresence
      .semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionPresence
      .semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresence;

  if (participantStructurePresence !== semanticRoleStructurePresence) {
    return null;
  }

  return {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantPresence,

    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleDefinition,

    participationSemanticStructureParticipantSemanticRoleRelationPresenceInput,

    participationSemanticStructureParticipantSemanticRoleRelationPresenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-semantic-role-relation-presence',
  };
}
