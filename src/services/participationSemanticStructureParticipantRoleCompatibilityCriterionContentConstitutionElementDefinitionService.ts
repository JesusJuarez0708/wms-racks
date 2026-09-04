import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementPresence,
} from './participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementPresenceService';

/**
 * FASE 24.78
 *
 * Definición semántica externa explícita mínima del
 * Constitution Element E previamente presentado dentro de la
 * ParticipantRoleCompatibilityCriterionContentConstitution.
 *
 * CriterionContentConstitutionElementPresence(K,J,E)
 * +
 * explicit CriterionContentConstitutionElementDefinitionInput(Z)
 * +
 * invocación explícita
 * ->
 * CriterionContentConstitutionElementDefinition(K,J,E,Z)
 *
 * y NO:
 *
 * CriterionContentConstitutionElementPresence(K,J,E)
 * ->
 * CriterionContentConstitutionElementDefinition(K,J,E,Z).
 *
 * ConstitutionElementPresence NO produce automáticamente
 * ConstitutionElementDefinition.
 *
 * participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementDefinition
 * aporta exclusivamente contenido semántico declarativo explícito Z
 * para el Constitution Element E ya presente.
 *
 * La identidad E continúa siendo exactamente la identidad
 * previamente introducida por CriterionContentConstitutionElementPresence.
 *
 * El input NO vuelve a declarar constitutionElementId.
 *
 * Z permanece completamente opaco.
 *
 * Incluso valores como:
 *
 * - "member";
 * - "compatible";
 * - "capacity";
 * - "operand";
 * - "requirement";
 * - "condition";
 * - "participant-role-comparison";
 * - "requires-available-role";
 *
 * constituyen exclusivamente contenido semántico declarativo.
 *
 * NO constituyen:
 *
 * - SemanticCharacterization;
 * - SemanticRolePresence;
 * - Membership;
 * - Compatibility;
 * - Capacity;
 * - Structure;
 * - ConstituentRelation;
 * - Operand;
 * - OperandRole;
 * - Requirement;
 * - Slot;
 * - Comparison;
 * - Rule;
 * - Condition;
 * - Evaluation;
 * - Assessment;
 * - Result.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementDefinitionInput =
  {
    participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementDefinition:
      string;
  };

/**
 * FASE 24.78
 *
 * Materialización explícita del hecho:
 *
 * CriterionContentConstitutionElementPresence(K,J,E)
 * +
 * explicit CriterionContentConstitutionElementDefinitionInput(Z)
 * +
 * invocación explícita
 * ->
 * CriterionContentConstitutionElementDefinition(K,J,E,Z)
 *
 * CriterionContentConstitutionElementPresence constituye el único
 * fundamento interno inmediato.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - ParticipantRoleCompatibilityCriterionContentConstitutionElementPresence;
 * - ParticipantRoleCompatibilityCriterionContentConstitutionElementDefinitionInput;
 *
 * y sólo añade:
 *
 * - participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementDefinitionType.
 *
 * Toda la genealogía anterior permanece encapsulada.
 *
 * No se duplican en el nivel superior:
 *
 * - participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementId;
 * - participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionId;
 * - participationSemanticStructureParticipantRoleCompatibilityCriterionContentId;
 * - participationSemanticStructureParticipantRoleCompatibilityCriterionId;
 * - participationSemanticStructureParticipantId;
 * - participationSemanticStructureId;
 * - semanticRoleId;
 * - roleId;
 * - scopeId;
 * - compatibilityId.
 *
 * IMPORTANTE:
 *
 * CriterionContentConstitutionElementPresence
 * != CriterionContentConstitutionElementDefinition
 * != CriterionContentConstitutionElementSemanticCharacterization
 * != CriterionContentConstitutionElementSemanticRolePresence
 * != Membership
 * != StructurePresence
 * != ConstituentRelation
 * != Operand
 * != OperandRole
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
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementDefinition =
  {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementPresence:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementPresence;

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementDefinitionInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementDefinitionInput;

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementDefinitionType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-constitution-element-definition';
  };

/**
 * FASE 24.78
 *
 * Define semánticamente de forma explícita el Constitution Element E
 * previamente presentado.
 *
 * Deliberadamente NO existe aquí ninguna comprobación adicional
 * de identidad porque CriterionContentConstitutionElementDefinitionInput
 * NO introduce una nueva identidad.
 *
 * CriterionContentConstitutionElementPresence ya determina
 * genealógicamente:
 *
 * - participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementId;
 * - participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionId;
 * - participationSemanticStructureParticipantRoleCompatibilityCriterionContentId;
 * - participationSemanticStructureParticipantRoleCompatibilityCriterionId;
 * - ParticipantRoleCompatibilityCriterionContentConstitutionDefinition;
 * - ParticipantRoleCompatibilityDeterminationScope;
 * - ParticipantRoleCorrespondence;
 * - toda la genealogía anterior.
 *
 * La nueva información introducida es exclusivamente:
 *
 * participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementDefinition.
 *
 * Z:
 *
 * - NO se normaliza;
 * - NO se canonicaliza;
 * - NO se transforma;
 * - NO se interpreta lexicalmente;
 * - NO se compara;
 * - NO se valida semánticamente;
 * - NO se convierte en SemanticCharacterization;
 * - NO se convierte en SemanticRolePresence;
 * - NO se convierte en Membership;
 * - NO se convierte en Compatibility;
 * - NO se convierte en Capacity;
 * - NO se convierte en Structure;
 * - NO se convierte en ConstituentRelation;
 * - NO se convierte en Operand;
 * - NO se convierte en OperandRole;
 * - NO se convierte en Requirement;
 * - NO se convierte en Comparison;
 * - NO se convierte en Rule ni Condition.
 *
 * El mismo CriterionContentConstitutionElementPresence puede recibir
 * múltiples definiciones explícitas mediante invocaciones independientes.
 *
 * Esto NO implica:
 *
 * - unicidad;
 * - canonical meaning;
 * - preferred meaning;
 * - equivalencia;
 * - conflicto;
 * - resolución;
 * - SemanticCharacterization;
 * - SemanticRole;
 * - Membership;
 * - estructura;
 * - colección;
 * - cardinalidad;
 * - aridad.
 *
 * Tampoco introduce:
 *
 * - CriterionContentConstitutionElementSemanticCharacterization;
 * - CriterionContentConstitutionElementSemanticRolePresence;
 * - CriterionContentConstitutionElementSemanticRoleDefinition;
 * - Membership;
 * - StructurePresence;
 * - ConstituentRelation;
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
 * - capacity;
 * - vacancy;
 * - availability status;
 * - ranking;
 * - preference;
 * - selection;
 * - decision.
 */
export function defineProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElement(
  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementPresence:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementPresence,
  participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementDefinitionInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementDefinitionInput
): ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementDefinition {
  return {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementPresence,
    participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementDefinitionInput,
    participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementDefinitionType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-constitution-element-definition',
  };
}
