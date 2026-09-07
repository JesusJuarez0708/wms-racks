import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructurePresence,
} from './participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructurePresenceService';

/**
 * FASE 24.85
 *
 * ParticipantRoleCompatibilityCriterionContentStructureDefinition
 *
 * Define explícitamente una Structure cuya presencia ya fue
 * establecida para un ParticipantRoleCompatibilityCriterionContent.
 *
 * Fundamento interno inmediato:
 *
 * ParticipantRoleCompatibilityCriterionContentStructurePresence
 *
 * Contrato:
 *
 * CriterionContentStructurePresence(S)
 * +
 * CriterionContentStructureDefinitionInput(D)
 * +
 * invocación explícita
 * ->
 * CriterionContentStructureDefinition(S, D)
 *
 * Fronteras ontológicas:
 *
 * - CriterionContentStructurePresence ≠ CriterionContentStructureDefinition.
 * - CriterionContentConstitutionPresence ≠ CriterionContentStructureDefinition.
 * - StructureDefinition ≠ ConstituentsPresence.
 * - StructureDefinition ≠ ConstituentPresence.
 *
 * La identidad S de Structure ya está determinada genealógicamente
 * por CriterionContentStructurePresence.
 *
 * Por ello, StructureDefinitionInput NO repite structureId.
 *
 * D es información declarativa externa, explícita y completamente
 * opaca.
 *
 * Esta fase NO interpreta lexicalmente D.
 * Esta fase NO normaliza, recorta, canonicaliza ni parsea D.
 *
 * Expresiones como:
 *
 * - "binary"
 * - "two-operands"
 * - "member"
 * - "capacity"
 *
 * permanecen declarativas y NO implican respectivamente:
 *
 * - arity = 2
 * - existencia de dos operands
 * - membership
 * - capacidad operacional
 *
 * StructureDefinition NO implica:
 *
 * - collection
 * - constituents presence
 * - constituent presence
 * - membership
 * - operand
 * - operand role
 * - slot
 * - position
 * - order
 * - cardinality
 * - arity
 * - correspondence
 * - comparison
 * - compatibility
 * - eligibility
 * - applicability
 * - rule
 * - condition
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
 *
 * Una misma StructurePresence puede recibir múltiples Definition
 * explícitas independientes.
 *
 * Esta fase NO introduce unicidad, canonicalidad, preferencia,
 * vigencia ni selección entre esas definiciones.
 */

export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureDefinitionInput =
  {
    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureDefinition:
      string;
  };

export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureDefinition =
  {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructurePresence:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructurePresence;

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureDefinitionInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureDefinitionInput;

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureDefinitionType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-structure-definition';
  };

export function defineProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructure(
  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructurePresence:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructurePresence,

  participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureDefinitionInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureDefinitionInput
): ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureDefinition {
  return {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructurePresence,

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureDefinitionInput,

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureDefinitionType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-structure-definition',
  };
}