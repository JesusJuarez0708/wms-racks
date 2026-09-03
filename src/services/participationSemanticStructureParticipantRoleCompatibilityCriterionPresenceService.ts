import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityDeterminationScope,
} from './participationSemanticStructureParticipantRoleCompatibilityDeterminationScopeService';

/**
 * FASE 24.71
 *
 * Presencia externa explícita mínima de un Criterion C dentro de un
 * ParticipantRoleCompatibilityDeterminationScope previamente establecido.
 *
 * participationSemanticStructureParticipantRoleCompatibilityCriterionId
 * identifica exclusivamente un nuevo individuo Criterion C.
 *
 * IMPORTANTE:
 *
 * ParticipantRoleCompatibilityDeterminationScope(P,R)
 * +
 * explicit CompatibilityCriterionPresence(C)
 * ->
 * ParticipantRoleCompatibilityCriterionPresence(P,R,C)
 *
 * y NO:
 *
 * ParticipantRoleCompatibilityDeterminationScope(P,R)
 * ->
 * ParticipantRoleCompatibilityCriterionPresence(P,R,C).
 *
 * CriterionPresence requiere una nueva invocación externa explícita.
 *
 * criterionId es completamente opaco.
 *
 * Su contenido NO:
 *
 * - define el Criterion;
 * - interpreta el Criterion;
 * - determina Compatibility;
 * - representa compatible/incompatible;
 * - representa Requirement;
 * - representa Slot;
 * - representa OperandRole;
 * - representa Membership.
 *
 * Incluso valores literales como:
 *
 * - "member";
 * - "capacity";
 * - "compatible";
 * - "eligibility";
 *
 * permanecen exclusivamente como identificadores externos opacos.
 *
 * CriterionPresence NO constituye todavía:
 *
 * - ParticipantRoleCompatibilityCriterionDefinition;
 * - ParticipantRoleCompatibilityEvaluation;
 * - ParticipantRoleCompatibilityAssessment;
 * - ParticipantRoleCompatibilityResult;
 * - ParticipantRoleEligibility;
 * - ParticipantRoleAssignment;
 * - RoleOccupation;
 * - RoleFulfillment;
 * - Membership;
 * - Requirement;
 * - Slot;
 * - OperandRole.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionPresenceInput =
  {
    participationSemanticStructureParticipantRoleCompatibilityCriterionId:
      string;
  };

/**
 * FASE 24.71
 *
 * Materialización explícita del hecho:
 *
 * ParticipantRoleCompatibilityDeterminationScope(P,R)
 * +
 * explicit CompatibilityCriterionPresenceInput(C)
 * +
 * invocación explícita
 * ->
 * ParticipantRoleCompatibilityCriterionPresence(P,R,C)
 *
 * ParticipantRoleCompatibilityDeterminationScope constituye el único
 * fundamento interno inmediato.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - ParticipantRoleCompatibilityDeterminationScope;
 * - ParticipantRoleCompatibilityCriterionPresenceInput;
 *
 * y sólo añade:
 *
 * - participationSemanticStructureParticipantRoleCompatibilityCriterionPresenceType.
 *
 * No se duplican en el nivel superior:
 *
 * - participationSemanticStructureParticipantId;
 * - participationSemanticStructureConstitutionElementId;
 * - participationSemanticStructureId;
 * - semanticRoleId;
 * - roleId;
 * - scopeId;
 * - compatibilityId.
 *
 * Toda la genealogía P-R continúa encapsulada por
 * ParticipantRoleCompatibilityDeterminationScope.
 *
 * IMPORTANTE:
 *
 * CompatibilityDeterminationScope
 * != CompatibilityCriterionPresence
 * != CompatibilityCriterionDefinition
 * != CompatibilityEvaluation
 * != CompatibilityResult
 * != ParticipantRoleEligibility
 * != ParticipantRoleAssignment
 * != RoleOccupation
 * != RoleFulfillment
 * != Membership.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionPresence =
  {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityDeterminationScope:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityDeterminationScope;

    participationSemanticStructureParticipantRoleCompatibilityCriterionPresenceInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionPresenceInput;

    participationSemanticStructureParticipantRoleCompatibilityCriterionPresenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-presence';
  };

/**
 * FASE 24.71
 *
 * Presenta explícitamente un Criterion C dentro de un
 * ParticipantRoleCompatibilityDeterminationScope previamente establecido.
 *
 * Deliberadamente NO existe aquí ninguna comprobación adicional de:
 *
 * - participant identity;
 * - ConstitutionElement identity;
 * - SemanticRole identity;
 * - criterion identity match;
 * - semantic match;
 * - semantic compatibility;
 * - applicability.
 *
 * La razón es que:
 *
 * 1. ParticipantRoleCompatibilityDeterminationScope ya determina
 *    genealógicamente el par P-R;
 *
 * 2. CriterionPresenceInput NO vuelve a declarar P, E, R ni S;
 *
 * 3. criterionId constituye una identidad externa explícita nueva,
 *    introducida por primera vez en esta fase.
 *
 * El criterionId:
 *
 * - NO se normaliza;
 * - NO se canonicaliza;
 * - NO se transforma;
 * - NO se interpreta lexicalmente;
 * - NO se compara contra otro valor;
 * - NO se valida semánticamente.
 *
 * La función conserva exactamente por identidad:
 *
 * - el Scope recibido;
 * - el Input recibido.
 *
 * No devuelve null porque esta fase no posee una condición de
 * correspondencia o identidad previa legítima que pueda fallar.
 */
export function presentProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterion(
  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityDeterminationScope:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityDeterminationScope,
  participationSemanticStructureParticipantRoleCompatibilityCriterionPresenceInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionPresenceInput
): ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionPresence {
  return {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityDeterminationScope,
    participationSemanticStructureParticipantRoleCompatibilityCriterionPresenceInput,
    participationSemanticStructureParticipantRoleCompatibilityCriterionPresenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-presence',
  };
}
