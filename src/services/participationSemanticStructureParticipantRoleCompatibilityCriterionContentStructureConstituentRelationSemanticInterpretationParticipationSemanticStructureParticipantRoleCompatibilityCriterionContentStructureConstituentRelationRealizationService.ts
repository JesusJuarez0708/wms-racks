import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipantsPresence,
} from './participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipantsService';

/**
 * FASE 25.29
 *
 * ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationRealization
 *
 * Materializa explícitamente la realización del mismo individuo relacional R
 * respecto de la configuración participante S/U previamente presentada.
 *
 * Fundamento interno inmediato:
 *
 * ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipantsPresence
 *
 * Contrato:
 *
 * ParticipantsPresence(S, U, R, ...)
 * +
 * explicit RealizationInput(S, U)
 * +
 * identidad exacta de S
 * +
 * identidad exacta de U
 * +
 * invocación explícita
 * ->
 * RelationRealization
 *
 * La presencia previa de ParticipantsPresence NO constituye realización.
 *
 * El match de identidades NO constituye realización.
 *
 * La realización procede exclusivamente de la nueva declaración externa
 * explícita representada por RealizationInput.
 *
 * R ya está inequívocamente fijado por ParticipantsPresence.
 * Por tanto, el input NO repite structureConstituentRelationId.
 *
 * M permanece completamente opaco.
 *
 * Esta fase NO constituye ni infiere:
 *
 * - relation semantic interpretation
 * - constituent membership
 * - membership
 * - member-of
 * - belongs-to
 * - part-of
 * - source
 * - target
 * - direction
 * - orientation
 * - participant role
 * - constituent definition
 * - requirement
 * - operand
 * - operand role
 * - slot
 * - position
 * - order
 * - cardinality
 * - arity
 * - mapping
 * - correspondence
 * - compatibility
 * - eligibility
 * - applicability
 * - satisfaction
 * - evaluation
 * - assessment
 * - assignment
 * - score
 * - weight
 * - priority
 * - confidence
 * - ranking
 * - preference
 * - selection
 * - decision
 */

export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationRealizationInput =
  {
    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureId:
      string;
    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentId:
      string;
  };

/**
 * FASE 25.29
 *
 * Conserva exactamente por identidad:
 *
 * - ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipantsPresence
 * - ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationRealizationInput
 *
 * y sólo añade:
 *
 * - participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationRealizationType
 *
 * Toda la genealogía previa permanece encapsulada.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationRealization =
  {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipantsPresence:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipantsPresence;

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationRealizationInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationRealizationInput;

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationRealizationType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-structure-constituent-relation-realization';
  };

/**
 * FASE 25.29
 *
 * Materializa explícitamente que R obtiene respecto de la misma
 * configuración participante S/U previamente presentada.
 *
 * Las únicas comprobaciones son identidad exacta de:
 *
 * ParticipantsPresence.ParticipantsInput.S
 * ===
 * RealizationInput.S
 *
 * y:
 *
 * ParticipantsPresence.ParticipantsInput.U
 * ===
 * RealizationInput.U
 *
 * Cualquier mismatch devuelve null.
 *
 * Estas comprobaciones NO causan la realización.
 *
 * La realización procede exclusivamente de la declaración externa
 * explícita representada por RealizationInput.
 *
 * Deliberadamente NO se inspecciona ni interpreta M.
 */
export function realizeProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelation(
  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipantsPresence:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipantsPresence,
  participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationRealizationInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationRealizationInput
):
  | ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationRealization
  | null {
  const genealogicalStructureId =
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipantsPresence
      .participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipantsInput
      .participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureId;

  const genealogicalConstituentId =
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipantsPresence
      .participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipantsInput
      .participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentId;

  if (
    genealogicalStructureId !==
    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationRealizationInput
      .participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureId
  ) {
    return null;
  }

  if (
    genealogicalConstituentId !==
    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationRealizationInput
      .participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentId
  ) {
    return null;
  }

  return {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipantsPresence,
    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationRealizationInput,
    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationRealizationType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-structure-constituent-relation-realization',
  };
}
