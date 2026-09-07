import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationPresence,
} from './participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationPresenceService';

/**
 * FASE 24.89
 *
 * ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationDefinition
 *
 * Define declarativamente la semántica del mismo individuo relacional R
 * cuya presencia fue establecida explícitamente en FASE 24.88.
 *
 * Fundamento interno inmediato:
 *
 * ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationPresence
 *
 * Contrato:
 *
 * CriterionContentStructureConstituentRelationPresence(K, S, D, C, U, R)
 * +
 * CriterionContentStructureConstituentRelationDefinitionInput(M)
 * +
 * invocación explícita
 * ->
 * CriterionContentStructureConstituentRelationDefinition(K, S, D, C, U, R, M)
 *
 * La identidad R ya está determinada genealógicamente por
 * CriterionContentStructureConstituentRelationPresence.
 *
 * Por ello, StructureConstituentRelationDefinitionInput NO repite
 * structureConstituentRelationId.
 *
 * participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticRole
 * introduce exclusivamente una semántica declarativa externa opaca M
 * para el mismo individuo relacional R.
 *
 * M permanece completamente opaco, literal y no interpretado.
 *
 * M NO constituye:
 *
 * - relation participants
 * - relation realization
 * - relation semantic interpretation
 * - constituent definition
 * - constituent membership
 * - member-of
 * - belongs-to
 * - part-of
 * - source
 * - target
 * - direction
 * - orientation
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
 * Incluso valores lexicalmente sugestivos como:
 *
 * - "membership"
 * - "member-of"
 * - "belongs-to"
 * - "source-target"
 * - "correspondence"
 * - "compatible"
 *
 * siguen siendo exclusivamente contenido semántico declarativo opaco.
 *
 * IMPORTANTE:
 *
 * StructureConstituentRelationPresence
 * !=
 * StructureConstituentRelationDefinition
 * !=
 * RelationParticipantsPresence
 * !=
 * RelationRealization
 * !=
 * RelationSemanticInterpretation
 * !=
 * ConstituentDefinition
 * !=
 * Membership.
 *
 * La genealogía previamente conservada representa exclusivamente
 * procedencia contextual.
 *
 * No establece ni materializa participantes formales de R.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationDefinitionInput =
  {
    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticRole:
      string;
  };

/**
 * FASE 24.89
 *
 * Materialización explícita del hecho:
 *
 * ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationPresence
 * +
 * explicit CriterionContentStructureConstituentRelationDefinitionInput
 * +
 * invocación explícita
 * ->
 * ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationDefinition
 *
 * CriterionContentStructureConstituentRelationPresence constituye
 * el único fundamento interno inmediato.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationPresence
 * - ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationDefinitionInput
 *
 * y sólo añade:
 *
 * - participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationDefinitionType
 *
 * Toda la genealogía anterior permanece encapsulada.
 *
 * No se duplican en el nivel superior:
 *
 * - structureConstituentRelationId
 * - constituentId
 * - constituentsId
 * - structureId
 * - criterionContentId
 * - criterionId
 * - participantId
 * - participationSemanticStructureId
 *
 * Definition(R, "membership")
 * !=
 * Membership(...).
 *
 * relation semantic definition
 * !=
 * realization of relation semantics.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationDefinition =
  {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationPresence:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationPresence;

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationDefinitionInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationDefinitionInput;

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationDefinitionType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-structure-constituent-relation-definition';
  };

/**
 * FASE 24.89
 *
 * Define declarativamente la semántica del mismo individuo relacional R
 * presentado en FASE 24.88.
 *
 * Deliberadamente NO existe comprobación adicional de identidad porque
 * StructureConstituentRelationDefinitionInput NO vuelve a introducir R.
 *
 * CriterionContentStructureConstituentRelationPresence ya determina
 * genealógicamente:
 *
 * - R
 * - U
 * - C
 * - StructureDefinition
 * - S
 * - CriterionContentDefinition
 * - toda la genealogía anterior
 *
 * La nueva información introducida es exclusivamente M.
 *
 * M:
 *
 * - NO se normaliza
 * - NO se canonicaliza
 * - NO se transforma
 * - NO se parsea
 * - NO se interpreta lexicalmente
 * - NO se compara
 * - NO se valida semánticamente
 *
 * La función NO establece:
 *
 * - relation participants
 * - relation realization
 * - relation semantic interpretation
 * - constituent definition
 * - membership
 * - member-of
 * - belongs-to
 * - part-of
 * - source
 * - target
 * - direction
 * - orientation
 * - requirement
 * - operand
 * - operand role
 * - slot
 * - position
 * - ordering
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
 * Tampoco materializa participantes formales de R a partir de la
 * genealogía contextual disponible.
 *
 * No existe identity guard ni null mismatch path.
 */
export function defineProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelation(
  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationPresence:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationPresence,
  participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationDefinitionInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationDefinitionInput
): ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationDefinition {
  return {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationPresence,
    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationDefinitionInput,
    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationDefinitionType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-structure-constituent-relation-definition',
  };
}
