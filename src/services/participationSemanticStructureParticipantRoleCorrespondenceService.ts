import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantSemanticRoleRelationSemanticInterpretation,
} from './participationSemanticStructureParticipantSemanticRoleRelationSemanticInterpretationService';

/**
 * FASE 24.69
 *
 * Afirmación semántica explícita mínima de Correspondence entre:
 *
 * - Participant P;
 * - SemanticRole R, todavía identificado genealógicamente mediante
 *   ConstitutionElement E.
 *
 * El único fundamento interno inmediato es:
 *
 * ParticipantSemanticRoleRelationSemanticInterpretation.
 *
 * Correspondence NO se infiere de la interpretación semántica de Q.
 *
 * Incluso si:
 *
 * interpretedParticipationSemanticStructureParticipantSemanticRoleRelationSemanticRole
 * = "correspondence"
 *
 * esto NO produce automáticamente ParticipantRoleCorrespondence.
 *
 * La Correspondence requiere una nueva invocación externa explícita.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCorrespondenceInput =
  {
    participationSemanticStructureParticipantId: string;
    participationSemanticStructureConstitutionElementId: string;
  };

/**
 * FASE 24.69
 *
 * Materialización explícita del hecho:
 *
 * ParticipantSemanticRoleRelationSemanticInterpretation(Q,I)
 * +
 * explicit ParticipantRoleCorrespondenceInput(P,E)
 * +
 * exact participant identity match
 * +
 * exact ConstitutionElement identity match
 * +
 * invocación explícita
 * ->
 * ParticipantRoleCorrespondence(P,R)
 *
 * La entidad conserva exactamente por identidad:
 *
 * - ParticipantSemanticRoleRelationSemanticInterpretation;
 * - ParticipantRoleCorrespondenceInput;
 *
 * y sólo añade:
 *
 * - participationSemanticStructureParticipantRoleCorrespondenceType.
 *
 * Correspondence NO constituye:
 *
 * - ParticipantRoleCompatibility;
 * - ParticipantRoleEligibility;
 * - ParticipantRoleAssignment;
 * - RoleOccupation;
 * - RoleFulfillment;
 * - Membership;
 * - ParticipantMembership;
 * - ConstituentMembership.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCorrespondence =
  {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantSemanticRoleRelationSemanticInterpretation:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantSemanticRoleRelationSemanticInterpretation;

    participationSemanticStructureParticipantRoleCorrespondenceInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCorrespondenceInput;

    participationSemanticStructureParticipantRoleCorrespondenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-correspondence';
  };

/**
 * FASE 24.69
 *
 * Establece explícitamente Correspondence entre Participant P
 * y el SemanticRole R portado por ConstitutionElement E.
 *
 * Se comprueba exclusivamente:
 *
 * 1. participantId exacto contra ParticipantPresence;
 * 2. ConstitutionElementId exacto contra el mismo elemento que porta
 *    ElementSemanticRoleDefinition.
 *
 * NO se vuelve a comprobar la ParticipationSemanticStructurePresence S,
 * porque esa convergencia genealógica ya fue establecida por
 * ParticipantSemanticRoleRelationPresence y permanece encapsulada.
 *
 * Tampoco se inspecciona ni se interpreta lexicalmente I.
 */
export function establishProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCorrespondence(
  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantSemanticRoleRelationSemanticInterpretation:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantSemanticRoleRelationSemanticInterpretation,

  participationSemanticStructureParticipantRoleCorrespondenceInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCorrespondenceInput
): ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCorrespondence | null {
  const relationDefinition =
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantSemanticRoleRelationSemanticInterpretation
      .semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantSemanticRoleRelationDefinition;

  const relationPresence =
    relationDefinition
      .semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantSemanticRoleRelationPresence;

  const participantId =
    relationPresence
      .semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantPresence
      .participationSemanticStructureParticipantPresenceInput
      .participationSemanticStructureParticipantId;

  const semanticRoleElementPresence =
    relationPresence
      .semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleDefinition
      .semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRolePresence
      .semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticCharacterization
      .semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementPresence;

  const semanticRoleElementId =
    semanticRoleElementPresence
      .participationSemanticStructureConstitutionElementPresenceInput
      .participationSemanticStructureConstitutionElementId;

  if (
    participantId !==
    participationSemanticStructureParticipantRoleCorrespondenceInput
      .participationSemanticStructureParticipantId
  ) {
    return null;
  }

  if (
    semanticRoleElementId !==
    participationSemanticStructureParticipantRoleCorrespondenceInput
      .participationSemanticStructureConstitutionElementId
  ) {
    return null;
  }

  return {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantSemanticRoleRelationSemanticInterpretation,

    participationSemanticStructureParticipantRoleCorrespondenceInput,

    participationSemanticStructureParticipantRoleCorrespondenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-correspondence',
  };
}
