import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionPresence,
} from './participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionPresenceService';

/**
 * FASE 24.76
 *
 * Definición semántica externa explícita mínima de la
 * Constitution J previamente presentada para el Content K.
 *
 * ParticipantRoleCompatibilityCriterionContentConstitutionPresence(K,J)
 * +
 * explicit CriterionContentConstitutionDefinitionInput(Y)
 * +
 * invocación explícita
 * ->
 * ParticipantRoleCompatibilityCriterionContentConstitutionDefinition(K,J,Y)
 *
 * y NO:
 *
 * ParticipantRoleCompatibilityCriterionContentConstitutionPresence(K,J)
 * ->
 * ParticipantRoleCompatibilityCriterionContentConstitutionDefinition(K,J,Y).
 *
 * ConstitutionPresence NO produce automáticamente ConstitutionDefinition.
 *
 * participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionDefinition
 * aporta exclusivamente contenido semántico declarativo explícito Y
 * para la Constitution J ya presente.
 *
 * La identidad de J continúa siendo exactamente la identidad
 * previamente introducida por CriterionContentConstitutionPresence.
 *
 * El input NO vuelve a declarar constitutionId.
 *
 * Y permanece completamente opaco.
 *
 * Incluso valores como:
 *
 * - "member";
 * - "compatible";
 * - "capacity";
 * - "two-operands";
 * - "participant-role-comparison";
 * - "requires-available-role";
 *
 * constituyen exclusivamente contenido semántico declarativo.
 *
 * NO constituyen:
 *
 * - Membership;
 * - Compatibility;
 * - Capacity;
 * - aridad;
 * - cardinalidad;
 * - Operand;
 * - Requirement;
 * - Comparison;
 * - Rule;
 * - Condition;
 * - Evaluation;
 * - Assessment;
 * - Result.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionDefinitionInput =
  {
    participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionDefinition:
      string;
  };

/**
 * FASE 24.76
 *
 * Materialización explícita del hecho:
 *
 * ParticipantRoleCompatibilityCriterionContentConstitutionPresence(K,J)
 * +
 * explicit CriterionContentConstitutionDefinitionInput(Y)
 * +
 * invocación explícita
 * ->
 * ParticipantRoleCompatibilityCriterionContentConstitutionDefinition(K,J,Y)
 *
 * CriterionContentConstitutionPresence constituye el único
 * fundamento interno inmediato.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - ParticipantRoleCompatibilityCriterionContentConstitutionPresence;
 * - ParticipantRoleCompatibilityCriterionContentConstitutionDefinitionInput;
 *
 * y sólo añade:
 *
 * - participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionDefinitionType.
 *
 * Toda la genealogía anterior permanece encapsulada.
 *
 * No se duplican en el nivel superior:
 *
 * - participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionId;
 * - participationSemanticStructureParticipantRoleCompatibilityCriterionContentId;
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
 * CriterionContentConstitutionPresence
 * != CriterionContentConstitutionDefinition
 * != CriterionContentConstitutionElementPresence
 * != CriterionContentStructurePresence
 * != ConstitutionSemanticInterpretation
 * != Membership
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
 * != RoleFulfillment.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionDefinition =
  {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionPresence:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionPresence;

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionDefinitionInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionDefinitionInput;

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionDefinitionType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-constitution-definition';
  };

/**
 * FASE 24.76
 *
 * Define semánticamente de forma explícita la Constitution J
 * previamente presentada.
 *
 * Deliberadamente NO existe aquí ninguna comprobación adicional
 * de identidad porque CriterionContentConstitutionDefinitionInput
 * NO introduce una nueva identidad.
 *
 * CriterionContentConstitutionPresence ya determina
 * genealógicamente:
 *
 * - participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionId;
 * - participationSemanticStructureParticipantRoleCompatibilityCriterionContentId;
 * - participationSemanticStructureParticipantRoleCompatibilityCriterionId;
 * - ParticipantRoleCompatibilityCriterionContentDefinition;
 * - ParticipantRoleCompatibilityDeterminationScope;
 * - ParticipantRoleCorrespondence;
 * - toda la genealogía anterior.
 *
 * La nueva información introducida es exclusivamente:
 *
 * participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionDefinition.
 *
 * Y:
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
 * - NO se convierte en Structure;
 * - NO se convierte en Element;
 * - NO se convierte en Operand;
 * - NO se convierte en Requirement;
 * - NO se convierte en Comparison;
 * - NO se convierte en Rule ni Condition.
 *
 * La misma CriterionContentConstitutionPresence puede recibir
 * múltiples definiciones explícitas mediante invocaciones
 * independientes.
 *
 * Esto NO implica:
 *
 * - unicidad;
 * - canonical meaning;
 * - preferred meaning;
 * - equivalencia;
 * - conflicto;
 * - resolución;
 * - elementos;
 * - estructura;
 * - colección;
 * - cardinalidad;
 * - aridad.
 *
 * Tampoco introduce:
 *
 * - CriterionContentConstitutionElementPresence;
 * - CriterionContentStructurePresence;
 * - ConstitutionSemanticInterpretation;
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
export function defineProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitution(
  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionPresence:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionPresence,

  participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionDefinitionInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionDefinitionInput
): ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionDefinition {
  return {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionPresence,

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionDefinitionInput,

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionDefinitionType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-constitution-definition',
  };
}
