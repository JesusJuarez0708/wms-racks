import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentsPresence,
} from './participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentsPresenceService';

/**
 * FASE 24.87
 *
 * ParticipantRoleCompatibilityCriterionContentStructureConstituentPresence
 *
 * Presenta explícitamente un constituyente individual U
 * dentro del contexto de constitución interna C previamente
 * presentado para una Structure de un
 * ParticipantRoleCompatibilityCriterionContent.
 *
 * Fundamento interno inmediato:
 *
 * ParticipantRoleCompatibilityCriterionContentStructureConstituentsPresence
 *
 * Contrato:
 *
 * CriterionContentStructureConstituentsPresence(K, S, D, C)
 * +
 * CriterionContentStructureConstituentPresenceInput(U)
 * +
 * invocación explícita
 * ->
 * CriterionContentStructureConstituentPresence(K, S, D, C, U)
 *
 * y NO:
 *
 * CriterionContentStructureConstituentsPresence(K, S, D, C)
 * ->
 * CriterionContentStructureConstituentPresence(K, S, D, C, U)
 *
 * StructureConstituentsPresence NO produce automáticamente
 * StructureConstituentPresence.
 *
 * La identidad C del contexto de constitución interna ya está
 * determinada genealógicamente por
 * CriterionContentStructureConstituentsPresence.
 *
 * Por ello, StructureConstituentPresenceInput NO repite
 * constituentsId.
 *
 * participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentId
 * introduce exclusivamente una nueva identidad externa opaca U.
 *
 * U permanece completamente opaco.
 *
 * U NO constituye:
 *
 * - constituent definition
 * - constituent semantic characterization
 * - constituent semantic role
 * - constituent membership
 * - member-of
 * - belongs-to
 * - part-of
 * - requirement
 * - requirement entry
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
 * StructureConstituentsPresence
 * !=
 * StructureConstituentPresence
 *
 * y:
 *
 * CriterionContentStructureConstituentsId C
 * !=
 * CriterionContentStructureConstituentId U.
 *
 * Esta diferencia de identidad NO establece por sí sola
 * membership ni ninguna relación semántica formal.
 *
 * La derivación desde StructureConstituentsPresence representa
 * exclusivamente procedencia genealógica/contextual.
 *
 * En particular, NO establece:
 *
 * U member-of C
 *
 * ni:
 *
 * U belongs-to C
 *
 * ni:
 *
 * U part-of Structure.
 *
 * La presencia de U tampoco implica:
 *
 * - colección enumerable
 * - pluralidad conocida
 * - cantidad de constituyentes
 * - posición
 * - orden
 * - slots
 * - cardinalidad
 * - aridad
 *
 * CriterionContentConstitutionElementPresence
 * !=
 * CriterionContentStructureConstituentPresence.
 *
 * Ningún ConstitutionElement previamente existente se convierte
 * automáticamente en StructureConstituentPresence.
 *
 * Ningún StructureConstituentPresence se convierte
 * automáticamente en ConstitutionElementPresence.
 *
 * Una misma StructureConstituentsPresence puede recibir múltiples
 * StructureConstituentPresence explícitas independientes.
 *
 * Esta fase NO introduce unicidad, canonicalidad, equivalencia,
 * conflicto, deduplicación, vigencia, preferencia ni selección
 * entre constituyentes.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentPresenceInput =
  {
    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentId:
      string;
  };

/**
 * FASE 24.87
 *
 * Materialización explícita del hecho:
 *
 * ParticipantRoleCompatibilityCriterionContentStructureConstituentsPresence
 * +
 * explicit CriterionContentStructureConstituentPresenceInput
 * +
 * invocación explícita
 * ->
 * ParticipantRoleCompatibilityCriterionContentStructureConstituentPresence
 *
 * CriterionContentStructureConstituentsPresence constituye el único
 * fundamento interno inmediato.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - ParticipantRoleCompatibilityCriterionContentStructureConstituentsPresence
 * - ParticipantRoleCompatibilityCriterionContentStructureConstituentPresenceInput
 *
 * y sólo añade:
 *
 * - participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentPresenceType
 *
 * Toda la genealogía anterior permanece encapsulada.
 *
 * No se duplican en el nivel superior:
 *
 * - constituentsId
 * - structureId
 * - structureDefinition
 * - criterionContentId
 * - criterionId
 * - participantId
 * - participationSemanticStructureId
 *
 * StructureConstituentPresence
 * !=
 * ConstituentDefinition
 * !=
 * Membership
 * !=
 * Requirement
 * !=
 * Operand
 * !=
 * Slot.
 *
 * Esta fase sólo presenta explícitamente un individuo
 * constitutivo U dentro del contexto genealógico C previamente
 * materializado.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentPresence =
  {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentsPresence:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentsPresence;

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentPresenceInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentPresenceInput;

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentPresenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-structure-constituent-presence';
  };

/**
 * FASE 24.87
 *
 * Presenta explícitamente un constituyente individual U dentro
 * del contexto de constitución interna C previamente presentado.
 *
 * Deliberadamente NO existe comprobación adicional de identidad
 * porque StructureConstituentPresenceInput NO vuelve a introducir
 * constituentsId.
 *
 * CriterionContentStructureConstituentsPresence ya determina
 * genealógicamente:
 *
 * - C
 * - StructureDefinition
 * - S
 * - CriterionContentDefinition
 * - toda la genealogía anterior
 *
 * La nueva información introducida es exclusivamente U.
 *
 * U:
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
 * - constituent definition
 * - constituent semantic characterization
 * - constituent semantic role
 * - constituent membership
 * - member-of
 * - belongs-to
 * - part-of
 * - collection
 * - count
 * - plurality
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
 * Tampoco materializa ni relaciona automáticamente ningún
 * CriterionContentConstitutionElement.
 */
export function presentProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituent(
  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentsPresence:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentsPresence,
  participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentPresenceInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentPresenceInput
): ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentPresence {
  return {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentsPresence,
    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentPresenceInput,
    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentPresenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-structure-constituent-presence',
  };
}
