import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationDefinition,
} from './participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationDefinitionService';

/**
 * FASE 25.30
 *
 * ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretation
 *
 * Materializa una interpretación semántica externa explícita mínima I
 * del mismo individuo relacional R cuya definición semántica declarativa M
 * fue establecida previamente.
 *
 * Fundamento interno inmediato único:
 *
 * ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationDefinition
 * de FASE 25.27.
 *
 * Contrato:
 *
 * RelationDefinition(R, M)
 * +
 * explicit RelationSemanticInterpretationInput(I)
 * +
 * invocación explícita
 * ->
 * RelationSemanticInterpretation(R, M, I)
 *
 * Esta fase introduce exclusivamente I mediante:
 *
 * interpretedParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticRole
 *
 * M e I permanecen ontológicamente distintos incluso cuando sus
 * representaciones lexicales sean iguales.
 *
 * M permanece completamente opaco.
 * I permanece completamente opaco.
 *
 * M e I NO se normalizan, canonicalizan, transforman, parsean,
 * interpretan lexicalmente, comparan ni validan semánticamente.
 *
 * Esta fase NO constituye ni infiere:
 *
 * - semantic validation
 * - semantic correctness
 * - semantic correspondence
 * - semantic compatibility
 * - semantic applicability
 * - semantic application
 * - relation participants
 * - relation participants presence
 * - relation realization
 * - constituent definition
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
 * - comparison
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
 *
 * Incluso valores lexicalmente sugestivos como "membership",
 * "member-of", "correspondence", "compatible" o "source-target"
 * permanecen exclusivamente como I y NO producen hechos de dominio.
 *
 * RelationDefinition
 * !=
 * RelationSemanticInterpretation
 * !=
 * RelationParticipantsPresence
 * !=
 * RelationRealization
 * !=
 * Membership.
 *
 * RelationParticipantsPresence de FASE 25.28 y RelationRealization
 * de FASE 25.29 pertenecen a una rama paralela y NO constituyen
 * fundamento interno de esta entidad.
 *
 * Toda la genealogía anterior permanece encapsulada.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationInput = {
  interpretedParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticRole:
    string;
};

/**
 * FASE 25.30
 *
 * Conserva exactamente por identidad:
 *
 * - ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationDefinition
 * - ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationInput
 *
 * y sólo añade:
 *
 * - participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationType
 *
 * Toda la genealogía previa de R permanece encapsulada dentro de
 * RelationDefinition.
 *
 * No se repiten ids ni participantes en el nivel superior.
 * M e I NO se comparan.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretation = {
  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationDefinition:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationDefinition;

  participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationInput;

  participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationType:
    'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-structure-constituent-relation-semantic-interpretation';
};

/**
 * FASE 25.30
 *
 * Interpreta explícitamente la semántica declarativa del individuo
 * relacional R previamente definido.
 *
 * RelationDefinition de FASE 25.27 constituye el único fundamento
 * interno inmediato.
 *
 * No se requieren ni se inspeccionan:
 *
 * - RelationParticipantsPresence de FASE 25.28
 * - RelationRealization de FASE 25.29
 *
 * No se reabre ni se repite R.
 *
 * La única información nueva es I.
 *
 * Una misma RelationDefinition puede recibir distintas interpretaciones
 * externas explícitas en invocaciones independientes.
 *
 * Distintas RelationDefinition pueden recibir el mismo I sin que ello
 * constituya identidad, equivalencia, correspondencia o compatibilidad.
 */
export function interpretProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelation(
  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationDefinition:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationDefinition,
  participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationInput
): ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretation {
  return {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationDefinition,
    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationInput,
    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-structure-constituent-relation-semantic-interpretation',
  };
}
