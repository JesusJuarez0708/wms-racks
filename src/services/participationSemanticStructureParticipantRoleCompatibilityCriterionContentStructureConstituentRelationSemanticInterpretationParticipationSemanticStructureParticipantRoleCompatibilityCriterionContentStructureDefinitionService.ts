import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructurePresence,
} from './participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructurePresenceService';

/**
 * FASE 25.23
 *
 * ParticipantRoleCompatibilityCriterionContentStructureDefinition
 *
 * Define explícitamente una Structure cuya presencia ya fue
 * establecida para un ParticipantRoleCompatibilityCriterionContent.
 *
 * Fundamento interno inmediato:
 *
 * ParticipantRoleCompatibilityCriterionContentStructurePresence
 * de FASE 25.22.
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
 * - FASE 25.21 SemanticRoleAvailabilityDefinition no fundamenta
 *   StructureDefinition.
 *
 * La identidad S de Structure ya está determinada genealógicamente
 * por CriterionContentStructurePresence de FASE 25.22.
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
 *
 * Constitution y Structure permanecen como ramas ontológicas
 * independientes del mismo CriterionContentDefinition de FASE 25.12.
 *
 * La genealogía permanece encapsulada en StructurePresence;
 * esta fase NO la aplana ni repite sus identificadores.
 */

export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureDefinitionInput =
  {
    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureDefinition:
      string;
  };

export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureDefinition =
  {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructurePresence:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructurePresence;

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureDefinitionInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureDefinitionInput;

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureDefinitionType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-structure-definition';
  };

export function defineProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructure(
  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructurePresence:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructurePresence,
  participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureDefinitionInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureDefinitionInput
): ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureDefinition {
  return {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructurePresence,
    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureDefinitionInput,
    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureDefinitionType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-structure-definition',
  };
}
