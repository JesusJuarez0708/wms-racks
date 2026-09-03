import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCorrespondence,
} from './participationSemanticStructureParticipantRoleCorrespondenceService';

/**
 * FASE 24.70
 *
 * Declaración explícita mínima del ámbito de futura determinación
 * de Compatibility para una ParticipantRoleCorrespondence(P,R)
 * previamente existente.
 *
 * El único fundamento interno inmediato es:
 *
 * ParticipantRoleCorrespondence.
 *
 * ParticipantRoleCorrespondence NO produce automáticamente
 * ParticipantRoleCompatibilityDeterminationScope.
 *
 * El Scope requiere una nueva invocación externa explícita.
 *
 * El Scope NO determina todavía:
 *
 * - compatible;
 * - incompatible;
 * - CompatibilityCriterion;
 * - CompatibilityEvaluation;
 * - CompatibilityResult.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityDeterminationScopeInput =
  {
    participationSemanticStructureParticipantId: string;
    participationSemanticStructureConstitutionElementId: string;
  };

/**
 * FASE 24.70
 *
 * Materialización explícita del hecho:
 *
 * ParticipantRoleCorrespondence(P,R)
 * +
 * explicit ParticipantRoleCompatibilityDeterminationScopeInput(P,E)
 * +
 * exact participant identity match
 * +
 * exact ConstitutionElement identity match
 * +
 * invocación explícita
 * ->
 * ParticipantRoleCompatibilityDeterminationScope(P,R)
 *
 * La entidad conserva exactamente por identidad:
 *
 * - ParticipantRoleCorrespondence;
 * - ParticipantRoleCompatibilityDeterminationScopeInput;
 *
 * y sólo añade:
 *
 * - participationSemanticStructureParticipantRoleCompatibilityDeterminationScopeType.
 *
 * El Scope NO constituye:
 *
 * - ParticipantRoleCompatibilityCriterion;
 * - ParticipantRoleCompatibilityEvaluation;
 * - ParticipantRoleCompatibilityResult;
 * - ParticipantRoleEligibility;
 * - ParticipantRoleAssignment;
 * - RoleOccupation;
 * - RoleFulfillment;
 * - Membership.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityDeterminationScope =
  {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCorrespondence:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCorrespondence;

    participationSemanticStructureParticipantRoleCompatibilityDeterminationScopeInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityDeterminationScopeInput;

    participationSemanticStructureParticipantRoleCompatibilityDeterminationScopeType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-determination-scope';
  };

/**
 * FASE 24.70
 *
 * Declara explícitamente que la ParticipantRoleCorrespondence(P,R)
 * queda situada como objeto de una futura determinación de Compatibility.
 *
 * Se comprueba exclusivamente:
 *
 * 1. participantId exacto contra el Participant P encapsulado
 *    genealógicamente por ParticipantRoleCorrespondence;
 *
 * 2. ConstitutionElementId exacto contra el mismo elemento E que porta
 *    el SemanticRole R encapsulado genealógicamente.
 *
 * NO se vuelve a comprobar ParticipationSemanticStructurePresence S.
 *
 * NO se inspecciona lexicalmente SemanticInterpretation.
 *
 * NO se consulta Availability.
 *
 * NO se determina compatible/incompatible.
 */
export function establishProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityDeterminationScope(
  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCorrespondence:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCorrespondence,
  participationSemanticStructureParticipantRoleCompatibilityDeterminationScopeInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityDeterminationScopeInput
): ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityDeterminationScope | null {
  const relationSemanticInterpretation =
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCorrespondence
      .semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantSemanticRoleRelationSemanticInterpretation;

  const relationDefinition =
    relationSemanticInterpretation
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
    participationSemanticStructureParticipantRoleCompatibilityDeterminationScopeInput
      .participationSemanticStructureParticipantId
  ) {
    return null;
  }

  if (
    semanticRoleElementId !==
    participationSemanticStructureParticipantRoleCompatibilityDeterminationScopeInput
      .participationSemanticStructureConstitutionElementId
  ) {
    return null;
  }

  return {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCorrespondence,
    participationSemanticStructureParticipantRoleCompatibilityDeterminationScopeInput,
    participationSemanticStructureParticipantRoleCompatibilityDeterminationScopeType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-determination-scope',
  };
}
