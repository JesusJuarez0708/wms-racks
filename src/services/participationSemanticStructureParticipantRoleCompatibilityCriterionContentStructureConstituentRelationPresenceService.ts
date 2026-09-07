import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentPresence,
} from './participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentPresenceService';

/**
 * FASE 24.88
 *
 * ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationPresence
 *
 * Presenta explícitamente un individuo relacional R
 * a partir de un StructureConstituentPresence U previamente existente.
 *
 * Fundamento interno inmediato:
 *
 * ParticipantRoleCompatibilityCriterionContentStructureConstituentPresence
 *
 * Contrato:
 *
 * CriterionContentStructureConstituentPresence(K, S, D, C, U)
 * +
 * CriterionContentStructureConstituentRelationPresenceInput(R)
 * +
 * invocación explícita
 * ->
 * CriterionContentStructureConstituentRelationPresence(K, S, D, C, U, R)
 *
 * y NO:
 *
 * CriterionContentStructureConstituentPresence(K, S, D, C, U)
 * ->
 * CriterionContentStructureConstituentRelationPresence(K, S, D, C, U, R)
 *
 * StructureConstituentPresence NO produce automáticamente
 * StructureConstituentRelationPresence.
 *
 * La identidad U ya está determinada genealógicamente por
 * CriterionContentStructureConstituentPresence.
 *
 * Por ello, StructureConstituentRelationPresenceInput NO repite
 * constituentId.
 *
 * participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationId
 * introduce exclusivamente una nueva identidad externa opaca R.
 *
 * R permanece completamente opaco.
 *
 * R NO constituye:
 *
 * - relation definition
 * - relation semantic role
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
 * - ranking
 * - preference
 * - selection
 * - decision
 *
 * IMPORTANTE:
 *
 * StructureConstituentPresence
 * !=
 * StructureConstituentRelationPresence
 *
 * y:
 *
 * CriterionContentStructureConstituentId U
 * !=
 * CriterionContentStructureConstituentRelationId R.
 *
 * La derivación desde StructureConstituentPresence representa
 * exclusivamente procedencia genealógica/contextual.
 *
 * No establece participantes formales de R.
 *
 * En particular, NO establece:
 *
 * R(source=S, target=U)
 *
 * ni:
 *
 * U member-of S
 *
 * ni:
 *
 * U belongs-to C
 *
 * ni:
 *
 * U part-of S.
 *
 * Una misma StructureConstituentPresence puede recibir múltiples
 * StructureConstituentRelationPresence explícitas independientes.
 *
 * Esta fase NO introduce unicidad, canonicalidad, equivalencia,
 * conflicto, deduplicación, vigencia, preferencia ni selección
 * entre relaciones.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationPresenceInput =
  {
    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationId:
      string;
  };

/**
 * FASE 24.88
 *
 * Materialización explícita del hecho:
 *
 * ParticipantRoleCompatibilityCriterionContentStructureConstituentPresence
 * +
 * explicit CriterionContentStructureConstituentRelationPresenceInput
 * +
 * invocación explícita
 * ->
 * ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationPresence
 *
 * CriterionContentStructureConstituentPresence constituye el único
 * fundamento interno inmediato.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - ParticipantRoleCompatibilityCriterionContentStructureConstituentPresence
 * - ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationPresenceInput
 *
 * y sólo añade:
 *
 * - participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationPresenceType
 *
 * Toda la genealogía anterior permanece encapsulada.
 *
 * No se duplican en el nivel superior:
 *
 * - constituentId
 * - constituentsId
 * - structureId
 * - criterionContentId
 * - criterionId
 * - participantId
 * - participationSemanticStructureId
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
 * Esta fase sólo presenta explícitamente un individuo relacional R
 * dentro de la genealogía de U.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationPresence =
  {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentPresence:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentPresence;

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationPresenceInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationPresenceInput;

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationPresenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-structure-constituent-relation-presence';
  };

/**
 * FASE 24.88
 *
 * Presenta explícitamente un individuo relacional R a partir
 * de un StructureConstituentPresence U previamente existente.
 *
 * Deliberadamente NO existe comprobación adicional de identidad
 * porque StructureConstituentRelationPresenceInput NO vuelve a
 * introducir constituentId.
 *
 * CriterionContentStructureConstituentPresence ya determina
 * genealógicamente:
 *
 * - U
 * - C
 * - StructureDefinition
 * - S
 * - CriterionContentDefinition
 * - toda la genealogía anterior
 *
 * La nueva información introducida es exclusivamente R.
 *
 * R:
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
 * - relation definition
 * - relation semantic role
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
 * Tampoco materializa participantes formales de R a partir
 * de la genealogía contextual ya disponible.
 */
export function presentProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelation(
  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentPresence:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentPresence,
  participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationPresenceInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationPresenceInput
): ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationPresence {
  return {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentPresence,
    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationPresenceInput,
    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationPresenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-structure-constituent-relation-presence',
  };
}
