import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionDefinition,
} from './participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionDefinitionService';

/**
 * FASE 24.77
 *
 * Presencia externa explícita mínima de un elemento E
 * para la Constitution J previamente definida dentro del
 * ParticipantRoleCompatibilityCriterionContent.
 *
 * ParticipantRoleCompatibilityCriterionContentConstitutionDefinition(K,J,Y)
 * +
 * explicit CriterionContentConstitutionElementPresenceInput(E)
 * +
 * invocación explícita
 * ->
 * ParticipantRoleCompatibilityCriterionContentConstitutionElementPresence(K,J,E)
 *
 * y NO:
 *
 * ParticipantRoleCompatibilityCriterionContentConstitutionDefinition(K,J,Y)
 * ->
 * ParticipantRoleCompatibilityCriterionContentConstitutionElementPresence(K,J,E).
 *
 * ConstitutionDefinition NO produce automáticamente
 * ConstitutionElementPresence.
 *
 * participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementId
 * introduce exclusivamente una nueva identidad opaca E.
 *
 * La identidad de J continúa siendo exactamente la identidad
 * previamente determinada genealógicamente por
 * CriterionContentConstitutionDefinition.
 *
 * El input NO vuelve a declarar constitutionId.
 *
 * E permanece completamente opaco.
 *
 * Incluso valores como:
 *
 * - "member";
 * - "compatible";
 * - "capacity";
 * - "two-operands";
 * - "participant-role-comparison";
 * - "requires-available-role";
 * - "operand-1";
 *
 * permanecen exclusivamente como identificadores externos opacos.
 *
 * NO constituyen:
 *
 * - Membership;
 * - Compatibility;
 * - Capacity;
 * - aridad;
 * - cardinalidad;
 * - Operand;
 * - OperandRole;
 * - Requirement;
 * - Comparison;
 * - Rule;
 * - Condition;
 * - Evaluation;
 * - Assessment;
 * - Result.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementPresenceInput =
  {
    participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementId:
      string;
  };

/**
 * FASE 24.77
 *
 * Materialización explícita del hecho:
 *
 * ParticipantRoleCompatibilityCriterionContentConstitutionDefinition(K,J,Y)
 * +
 * explicit CriterionContentConstitutionElementPresenceInput(E)
 * +
 * invocación explícita
 * ->
 * ParticipantRoleCompatibilityCriterionContentConstitutionElementPresence(K,J,E)
 *
 * CriterionContentConstitutionDefinition constituye el único
 * fundamento interno inmediato.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - ParticipantRoleCompatibilityCriterionContentConstitutionDefinition;
 * - ParticipantRoleCompatibilityCriterionContentConstitutionElementPresenceInput;
 *
 * y sólo añade:
 *
 * - participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementPresenceType.
 *
 * Toda la genealogía anterior permanece encapsulada.
 *
 * No se duplican en el nivel superior:
 *
 * - participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionId;
 * - participationSemanticStructureParticipantRoleCompatibilityCriterionContentDefinition;
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
 * CriterionContentConstitutionDefinition
 * != CriterionContentConstitutionElementPresence
 * != CriterionContentConstitutionElementDefinition
 * != CriterionContentConstitutionElementSemanticCharacterization
 * != CriterionContentConstitutionElementSemanticRolePresence
 * != CriterionContentStructurePresence
 * != ConstitutionSemanticInterpretation
 * != Membership
 * != ConstituentRelation
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
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementPresence =
  {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionDefinition:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionDefinition;

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementPresenceInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementPresenceInput;

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementPresenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-constitution-element-presence';
  };

/**
 * FASE 24.77
 *
 * Establece explícitamente la presencia de un elemento E
 * para la Constitution J previamente definida.
 *
 * Deliberadamente NO existe aquí ninguna comprobación adicional
 * de identidad porque CriterionContentConstitutionElementPresenceInput
 * NO vuelve a introducir constitutionId.
 *
 * CriterionContentConstitutionDefinition ya determina
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
 * participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementId.
 *
 * E:
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
 * - NO se convierte en ConstituentRelation;
 * - NO se convierte en Operand;
 * - NO se convierte en OperandRole;
 * - NO se convierte en Requirement;
 * - NO se convierte en Comparison;
 * - NO se convierte en Rule ni Condition.
 *
 * La misma CriterionContentConstitutionDefinition puede recibir
 * múltiples ConstitutionElementPresence explícitas mediante
 * invocaciones independientes.
 *
 * Esto NO implica:
 *
 * - unicidad;
 * - colección de elementos;
 * - canonical element;
 * - preferred element;
 * - equivalencia;
 * - conflicto;
 * - resolución;
 * - membership;
 * - orden;
 * - posición;
 * - estructura;
 * - cardinalidad;
 * - aridad.
 *
 * Tampoco introduce:
 *
 * - CriterionContentConstitutionElementDefinition;
 * - CriterionContentConstitutionElementSemanticCharacterization;
 * - CriterionContentConstitutionElementSemanticRolePresence;
 * - CriterionContentStructurePresence;
 * - ConstitutionSemanticInterpretation;
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
 * - Membership;
 * - capacity;
 * - vacancy;
 * - availability status;
 * - ranking;
 * - preference;
 * - selection;
 * - decision.
 */
export function presentProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElement(
  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionDefinition:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionDefinition,
  participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementPresenceInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementPresenceInput
): ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementPresence {
  return {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionDefinition,
    participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementPresenceInput,
    participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementPresenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-constitution-element-presence',
  };
}
