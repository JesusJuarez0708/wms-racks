import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationDefinition,
} from './participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationDefinitionService';

/**
 * FASE 24.90
 *
 * ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipantsPresence
 *
 * Presenta explícitamente como participantes de un individuo relacional R
 * previamente definido:
 *
 * - la Structure S genealógicamente identificada;
 * - el Constituent U genealógicamente identificado.
 *
 * Fundamento interno inmediato:
 *
 * ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationDefinition
 *
 * Contrato:
 *
 * CriterionContentStructureConstituentRelationDefinition(K, S, D, C, U, R, M)
 * +
 * explicit CriterionContentStructureConstituentRelationParticipantsInput(S, U)
 * +
 * identidad exacta de S
 * +
 * identidad exacta de U
 * +
 * invocación explícita
 * ->
 * CriterionContentStructureConstituentRelationParticipantsPresence(
 *   K,
 *   S,
 *   D,
 *   C,
 *   U,
 *   R,
 *   M
 * )
 *
 * IMPORTANTE:
 *
 * La disponibilidad genealógica de S y U
 * NO constituye automáticamente participación formal en R.
 *
 * genealogical context
 * !=
 * explicit relational participation.
 *
 * La información externa nueva consiste exclusivamente en declarar
 * explícitamente qué S y qué U pretenden ser presentados como
 * participantes de R.
 *
 * Las identidades externas deben coincidir exactamente con las
 * identidades genealógicas.
 *
 * Esta fase NO normaliza, recorta, transforma, canonicaliza,
 * parsea ni interpreta ninguna identidad.
 *
 * La semántica declarativa M de R permanece completamente opaca.
 *
 * M NO interviene en la determinación de participantes.
 *
 * Incluso:
 *
 * Definition(R, "membership")
 * +
 * ParticipantsPresence(R, S, U)
 *
 * !=
 *
 * Membership(S, U).
 *
 * RelationPresence
 * !=
 * RelationDefinition
 * !=
 * RelationParticipantsPresence
 * !=
 * RelationRealization
 * !=
 * RelationSemanticInterpretation
 * !=
 * Membership.
 *
 * Esta fase NO constituye ni infiere:
 *
 * - relation realization
 * - relation semantic interpretation
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
 * - constituent definition
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
 */

export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipantsInput =
  {
    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureId:
      string;

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentId:
      string;
  };

/**
 * FASE 24.90
 *
 * Materialización explícita del hecho:
 *
 * ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationDefinition
 * +
 * explicit CriterionContentStructureConstituentRelationParticipantsInput
 * +
 * identity(S)
 * +
 * identity(U)
 * +
 * invocación explícita
 * ->
 * ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipantsPresence
 *
 * CriterionContentStructureConstituentRelationDefinition constituye
 * el único fundamento interno inmediato.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationDefinition
 * - ParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipantsInput
 *
 * y sólo añade:
 *
 * - participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipantsPresenceType
 *
 * Toda la genealogía anterior permanece encapsulada.
 *
 * No se duplican en el nivel superior:
 *
 * - structureId
 * - constituentId
 * - constituentsId
 * - structureConstituentRelationId
 * - structureConstituentRelationSemanticRole
 * - criterionContentId
 * - criterionId
 * - participantId
 * - participationSemanticStructureId
 */

export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipantsPresence =
  {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationDefinition:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationDefinition;

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipantsInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipantsInput;

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipantsPresenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-structure-constituent-relation-participants-presence';
  };

/**
 * FASE 24.90
 *
 * Presenta explícitamente S y U como participantes del individuo
 * relacional R previamente definido.
 *
 * Las únicas comprobaciones realizadas son:
 *
 * genealogical Structure S
 * ===
 * externally declared Structure S
 *
 * y:
 *
 * genealogical Constituent U
 * ===
 * externally declared Constituent U.
 *
 * Un mismatch en cualquiera de las dos identidades devuelve null.
 *
 * Estas comprobaciones representan exclusivamente identidad de
 * individuos externamente declarados.
 *
 * NO constituyen interpretación semántica, realization,
 * membership, correspondence ni evaluación de compatibilidad.
 *
 * Deliberadamente NO se inspecciona ni interpreta la semántica M
 * declarada para R.
 */

export function presentProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipants(
  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationDefinition:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationDefinition,

  participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipantsInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipantsInput
):
  | ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipantsPresence
  | null {
  const semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationPresence =
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationDefinition
      .semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationPresence;

  const semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentPresence =
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationPresence
      .semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentPresence;

  const genealogicalConstituentId =
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentPresence
      .participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentPresenceInput
      .participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentId;

  const semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentsPresence =
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentPresence
      .semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentsPresence;

  const semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureDefinition =
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentsPresence
      .semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureDefinition;

  const semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructurePresence =
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureDefinition
      .semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructurePresence;

  const genealogicalStructureId =
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructurePresence
      .participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructurePresenceInput
      .participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureId;

  if (
    genealogicalStructureId !==
    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipantsInput
      .participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureId
  ) {
    return null;
  }

  if (
    genealogicalConstituentId !==
    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipantsInput
      .participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentId
  ) {
    return null;
  }

  return {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationDefinition,

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipantsInput,

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationParticipantsPresenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-structure-constituent-relation-participants-presence',
  };
}
