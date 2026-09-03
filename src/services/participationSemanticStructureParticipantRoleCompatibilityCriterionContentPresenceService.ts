import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionDefinition,
} from './participationSemanticStructureParticipantRoleCompatibilityCriterionDefinitionService';

/**
 * FASE 24.73
 *
 * Presencia externa explícita mínima de contenido K asociado al
 * ParticipantRoleCompatibilityCriterion C previamente definido.
 *
 * ParticipantRoleCompatibilityCriterionDefinition(C,D)
 * +
 * explicit CriterionContentPresenceInput(K)
 * +
 * invocación explícita
 * ->
 * ParticipantRoleCompatibilityCriterionContentPresence(C,K)
 *
 * y NO:
 *
 * ParticipantRoleCompatibilityCriterionDefinition(C,D)
 * ->
 * ParticipantRoleCompatibilityCriterionContentPresence(C,K).
 *
 * CriterionDefinition NO produce automáticamente ContentPresence.
 *
 * participationSemanticStructureParticipantRoleCompatibilityCriterionContentId
 * introduce exclusivamente una nueva identidad opaca K.
 *
 * K NO se interpreta lexicalmente.
 *
 * Incluso valores como:
 *
 * - "member";
 * - "compatible";
 * - "capacity";
 *
 * permanecen exclusivamente como identificadores externos opacos.
 *
 * NO constituyen:
 *
 * - Membership;
 * - Compatibility;
 * - Capacity;
 * - Requirement;
 * - Operand;
 * - Comparison;
 * - Rule;
 * - Condition;
 * - Evaluation;
 * - Assessment;
 * - Result.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentPresenceInput =
  {
    participationSemanticStructureParticipantRoleCompatibilityCriterionContentId:
      string;
  };

/**
 * FASE 24.73
 *
 * Materialización explícita del hecho:
 *
 * ParticipantRoleCompatibilityCriterionDefinition(C,D)
 * +
 * explicit CriterionContentPresenceInput(K)
 * +
 * invocación explícita
 * ->
 * ParticipantRoleCompatibilityCriterionContentPresence(C,K)
 *
 * CriterionDefinition constituye el único fundamento interno inmediato.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - ParticipantRoleCompatibilityCriterionDefinition;
 * - ParticipantRoleCompatibilityCriterionContentPresenceInput;
 *
 * y sólo añade:
 *
 * - participationSemanticStructureParticipantRoleCompatibilityCriterionContentPresenceType.
 *
 * Toda la genealogía anterior permanece encapsulada.
 *
 * No se duplican en el nivel superior:
 *
 * - participationSemanticStructureParticipantRoleCompatibilityCriterionId;
 * - participationSemanticStructureParticipantRoleCompatibilityCriterionDefinition;
 * - participationSemanticStructureParticipantId;
 * - participationSemanticStructureConstitutionElementId;
 * - participationSemanticStructureId;
 * - semanticRoleId;
 * - roleId;
 * - scopeId;
 * - compatibilityId.
 *
 * IMPORTANTE:
 *
 * CriterionPresence
 * != CriterionDefinition
 * != CriterionContentPresence
 * != CriterionContentDefinition
 * != CriterionContentStructurePresence
 * != OperandPresence
 * != Requirement
 * != Comparison
 * != Rule
 * != Condition
 * != CriterionEvaluation
 * != CompatibilityEvaluation
 * != CompatibilityAssessment
 * != CompatibilityResult
 * != ParticipantRoleCompatibility
 * != ParticipantRoleEligibility
 * != ParticipantRoleAssignment
 * != RoleOccupation
 * != RoleFulfillment
 * != Membership.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentPresence =
  {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionDefinition:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionDefinition;

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentPresenceInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentPresenceInput;

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentPresenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-presence';
  };

/**
 * FASE 24.73
 *
 * Establece explícitamente la presencia de contenido K asociado al
 * ParticipantRoleCompatibilityCriterion C previamente definido.
 *
 * Deliberadamente NO existe aquí ninguna comprobación adicional
 * de identidad porque CriterionContentPresenceInput NO vuelve a
 * introducir criterionId.
 *
 * CriterionDefinition ya determina genealógicamente:
 *
 * - participationSemanticStructureParticipantRoleCompatibilityCriterionId;
 * - ParticipantRoleCompatibilityDeterminationScope;
 * - ParticipantRoleCorrespondence;
 * - toda la genealogía anterior.
 *
 * La nueva información introducida es exclusivamente:
 *
 * participationSemanticStructureParticipantRoleCompatibilityCriterionContentId.
 *
 * K:
 *
 * - NO se normaliza;
 * - NO se canonicaliza;
 * - NO se transforma;
 * - NO se interpreta lexicalmente;
 * - NO se compara;
 * - NO se valida semánticamente;
 * - NO se convierte en Membership;
 * - NO se convierte en Compatibility;
 * - NO se convierte en Capacity;
 * - NO se convierte en Requirement;
 * - NO se convierte en Operand;
 * - NO se convierte en Rule ni Condition.
 *
 * La misma CriterionDefinition puede recibir múltiples ContentPresence
 * explícitas mediante invocaciones independientes.
 *
 * Esto NO implica:
 *
 * - colección;
 * - estructura;
 * - cardinalidad;
 * - aridad;
 * - equivalencia;
 * - conflicto;
 * - preferred content;
 * - canonical content;
 * - resolution.
 *
 * Tampoco introduce:
 *
 * - CriterionContentDefinition;
 * - CriterionContentStructurePresence;
 * - ContentElement;
 * - Operand;
 * - OperandRole;
 * - Requirement;
 * - Slot;
 * - Comparison;
 * - Rule;
 * - Condition;
 * - Satisfaction;
 * - CriterionApplicability;
 * - CriterionUtilization;
 * - CriterionEvaluation;
 * - CompatibilityEvaluation;
 * - CompatibilityAssessment;
 * - CompatibilityResult;
 * - ParticipantRoleCompatibility;
 * - Eligibility;
 * - Assignment;
 * - Occupation;
 * - Fulfillment;
 * - Membership;
 * - capacity;
 * - vacancy;
 * - availability status;
 * - ranking;
 * - preference;
 * - selection;
 * - decision.
 */
export function presentProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContent(
  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionDefinition:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionDefinition,

  participationSemanticStructureParticipantRoleCompatibilityCriterionContentPresenceInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentPresenceInput
): ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentPresence {
  return {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionDefinition,

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentPresenceInput,

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentPresenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-presence',
  };
}
