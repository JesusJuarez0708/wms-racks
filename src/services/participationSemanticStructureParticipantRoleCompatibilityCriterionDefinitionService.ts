import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionPresence,
} from './participationSemanticStructureParticipantRoleCompatibilityCriterionPresenceService';

/**
 * FASE 24.72
 *
 * Definición semántica externa explícita mínima del Criterion C
 * previamente presentado dentro de un
 * ParticipantRoleCompatibilityDeterminationScope.
 *
 * participationSemanticStructureParticipantRoleCompatibilityCriterionDefinition
 * aporta exclusivamente contenido semántico declarativo explícito D
 * para el Criterion C ya presente.
 *
 * La identidad de C continúa siendo exactamente la identidad
 * previamente introducida por CriterionPresence.
 *
 * El input NO vuelve a declarar criterionId.
 *
 * Por tanto:
 *
 * ParticipantRoleCompatibilityCriterionPresence(C)
 * +
 * explicit CriterionDefinition(D)
 * ->
 * ParticipantRoleCompatibilityCriterionDefinition(C,D)
 *
 * y NO:
 *
 * ParticipantRoleCompatibilityCriterionPresence(C)
 * ->
 * ParticipantRoleCompatibilityCriterionDefinition(C,D).
 *
 * Definition requiere una nueva invocación externa explícita.
 *
 * D permanece completamente opaco.
 *
 * Incluso valores como:
 *
 * - "member";
 * - "compatible";
 * - "capacity";
 * - "eligibility";
 *
 * constituyen exclusivamente contenido semántico declarativo.
 *
 * NO constituyen:
 *
 * - Membership;
 * - Compatibility;
 * - Capacity;
 * - Eligibility;
 * - Requirement;
 * - Rule;
 * - Condition;
 * - Evaluation;
 * - Result.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionDefinitionInput =
  {
    participationSemanticStructureParticipantRoleCompatibilityCriterionDefinition:
      string;
  };

/**
 * FASE 24.72
 *
 * Materialización explícita del hecho:
 *
 * ParticipantRoleCompatibilityCriterionPresence(C)
 * +
 * explicit CriterionDefinitionInput(D)
 * +
 * invocación explícita
 * ->
 * ParticipantRoleCompatibilityCriterionDefinition(C,D)
 *
 * CriterionPresence constituye el único fundamento interno inmediato.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - ParticipantRoleCompatibilityCriterionPresence;
 * - ParticipantRoleCompatibilityCriterionDefinitionInput;
 *
 * y sólo añade:
 *
 * - participationSemanticStructureParticipantRoleCompatibilityCriterionDefinitionType.
 *
 * Toda la genealogía anterior permanece encapsulada.
 *
 * No se duplican en el nivel superior:
 *
 * - participationSemanticStructureParticipantRoleCompatibilityCriterionId;
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
 * != Compatibility
 * != CompatibilityEvaluation
 * != CompatibilityAssessment
 * != CompatibilityResult
 * != ParticipantRoleEligibility
 * != ParticipantRoleAssignment
 * != RoleOccupation
 * != RoleFulfillment
 * != Membership.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionDefinition =
  {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionPresence:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionPresence;

    participationSemanticStructureParticipantRoleCompatibilityCriterionDefinitionInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionDefinitionInput;

    participationSemanticStructureParticipantRoleCompatibilityCriterionDefinitionType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-definition';
  };

/**
 * FASE 24.72
 *
 * Define semánticamente de forma explícita el Criterion C
 * previamente presentado.
 *
 * Deliberadamente NO existe aquí ninguna comprobación adicional
 * de identidad porque CriterionDefinitionInput NO introduce una
 * nueva identidad.
 *
 * CriterionPresence ya determina genealógicamente:
 *
 * - participationSemanticStructureParticipantRoleCompatibilityCriterionId;
 * - ParticipantRoleCompatibilityDeterminationScope;
 * - ParticipantRoleCorrespondence;
 * - toda la genealogía anterior.
 *
 * La nueva información introducida es exclusivamente:
 *
 * participationSemanticStructureParticipantRoleCompatibilityCriterionDefinition.
 *
 * El valor D:
 *
 * - NO se normaliza;
 * - NO se canonicaliza;
 * - NO se transforma;
 * - NO se interpreta lexicalmente;
 * - NO se compara;
 * - NO se valida semánticamente;
 * - NO se convierte en Compatibility;
 * - NO se convierte en Requirement;
 * - NO se convierte en Rule ni Condition.
 *
 * La misma CriterionPresence puede recibir múltiples definiciones
 * explícitas mediante invocaciones independientes.
 *
 * Esto NO implica:
 *
 * - unicidad;
 * - canonical meaning;
 * - preferred meaning;
 * - equivalencia;
 * - conflicto;
 * - resolución entre definiciones.
 *
 * Tampoco introduce:
 *
 * - CompatibilityEvaluation;
 * - CompatibilityAssessment;
 * - CompatibilityResult;
 * - CriterionApplicability;
 * - CriterionUtilization;
 * - Requirement;
 * - Slot;
 * - OperandRole;
 * - Comparison;
 * - Satisfaction;
 * - Eligibility;
 * - Assignment;
 * - Occupation;
 * - Fulfillment;
 * - Membership;
 * - cardinalidad;
 * - aridad;
 * - capacity;
 * - vacancy;
 * - ranking;
 * - preference;
 * - selection;
 * - decision.
 */
export function defineProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterion(
  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionPresence:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionPresence,
  participationSemanticStructureParticipantRoleCompatibilityCriterionDefinitionInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionDefinitionInput
): ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionDefinition {
  return {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionPresence,
    participationSemanticStructureParticipantRoleCompatibilityCriterionDefinitionInput,
    participationSemanticStructureParticipantRoleCompatibilityCriterionDefinitionType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-definition',
  };
}
