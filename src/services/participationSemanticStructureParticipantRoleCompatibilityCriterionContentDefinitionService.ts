import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentPresence,
} from './participationSemanticStructureParticipantRoleCompatibilityCriterionContentPresenceService';

/**
 * FASE 24.74
 *
 * Definición semántica externa explícita mínima del Content K
 * previamente presentado para un ParticipantRoleCompatibilityCriterion.
 *
 * ParticipantRoleCompatibilityCriterionContentPresence(C,K)
 * +
 * explicit CriterionContentDefinitionInput(X)
 * +
 * invocación explícita
 * ->
 * ParticipantRoleCompatibilityCriterionContentDefinition(K,X)
 *
 * y NO:
 *
 * ParticipantRoleCompatibilityCriterionContentPresence(C,K)
 * ->
 * ParticipantRoleCompatibilityCriterionContentDefinition(K,X).
 *
 * ContentPresence NO produce automáticamente ContentDefinition.
 *
 * participationSemanticStructureParticipantRoleCompatibilityCriterionContentDefinition
 * aporta exclusivamente contenido semántico declarativo explícito X
 * para K.
 *
 * La identidad de K continúa siendo exactamente la identidad
 * previamente introducida por CriterionContentPresence.
 *
 * El input NO vuelve a declarar contentId.
 *
 * X permanece completamente opaco.
 *
 * Incluso valores como:
 *
 * - "member";
 * - "compatible";
 * - "capacity";
 * - "requirement";
 * - "compare-participant-role";
 *
 * constituyen exclusivamente contenido semántico declarativo.
 *
 * NO constituyen:
 *
 * - Membership;
 * - Compatibility;
 * - Capacity;
 * - Requirement;
 * - Comparison;
 * - Rule;
 * - Condition;
 * - Evaluation;
 * - Assessment;
 * - Result.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentDefinitionInput =
  {
    participationSemanticStructureParticipantRoleCompatibilityCriterionContentDefinition:
      string;
  };

/**
 * FASE 24.74
 *
 * Materialización explícita del hecho:
 *
 * ParticipantRoleCompatibilityCriterionContentPresence(C,K)
 * +
 * explicit CriterionContentDefinitionInput(X)
 * +
 * invocación explícita
 * ->
 * ParticipantRoleCompatibilityCriterionContentDefinition(K,X)
 *
 * CriterionContentPresence constituye el único fundamento interno inmediato.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - ParticipantRoleCompatibilityCriterionContentPresence;
 * - ParticipantRoleCompatibilityCriterionContentDefinitionInput;
 *
 * y sólo añade:
 *
 * - participationSemanticStructureParticipantRoleCompatibilityCriterionContentDefinitionType.
 *
 * Toda la genealogía anterior permanece encapsulada.
 *
 * No se duplican en el nivel superior:
 *
 * - participationSemanticStructureParticipantRoleCompatibilityCriterionContentId;
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
 * CriterionContentPresence
 * != CriterionContentDefinition
 * != CriterionContentInterpretation
 * != CriterionContentStructurePresence
 * != ContentElementPresence
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
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentDefinition =
  {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentPresence:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentPresence;

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentDefinitionInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentDefinitionInput;

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentDefinitionType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-definition';
  };

/**
 * FASE 24.74
 *
 * Define semánticamente de forma explícita el Content K
 * previamente presentado.
 *
 * Deliberadamente NO existe aquí ninguna comprobación adicional
 * de identidad porque CriterionContentDefinitionInput NO introduce
 * una nueva identidad.
 *
 * CriterionContentPresence ya determina genealógicamente:
 *
 * - participationSemanticStructureParticipantRoleCompatibilityCriterionContentId;
 * - participationSemanticStructureParticipantRoleCompatibilityCriterionId;
 * - ParticipantRoleCompatibilityCriterionDefinition;
 * - ParticipantRoleCompatibilityDeterminationScope;
 * - ParticipantRoleCorrespondence;
 * - toda la genealogía anterior.
 *
 * La nueva información introducida es exclusivamente:
 *
 * participationSemanticStructureParticipantRoleCompatibilityCriterionContentDefinition.
 *
 * X:
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
 * - NO se convierte en Comparison;
 * - NO se convierte en Rule ni Condition.
 *
 * La misma CriterionContentPresence puede recibir múltiples definiciones
 * explícitas mediante invocaciones independientes.
 *
 * Esto NO implica:
 *
 * - unicidad;
 * - canonical meaning;
 * - preferred meaning;
 * - equivalencia;
 * - conflicto;
 * - resolución;
 * - estructura;
 * - cardinalidad;
 * - aridad.
 *
 * Tampoco introduce:
 *
 * - CriterionContentInterpretation;
 * - CriterionContentStructurePresence;
 * - ContentElementPresence;
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
export function defineProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContent(
  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentPresence:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentPresence,

  participationSemanticStructureParticipantRoleCompatibilityCriterionContentDefinitionInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentDefinitionInput
): ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentDefinition {
  return {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentPresence,

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentDefinitionInput,

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentDefinitionType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-definition',
  };
}
