import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationParticipantsPresence,
} from './operationalKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationParticipantsPresenceService';

/**
 * FASE 24.54
 *
 * Declaración externa explícita mínima de realización del individuo
 * relacional structure-constituent respecto de la configuración de
 * participantes previamente presentada.
 *
 * IMPORTANTE:
 *
 * La presencia previa de ParticipantsPresence NO constituye realización.
 *
 * participants presence
 * !=
 * explicit realization assertion
 * !=
 * relation realization.
 *
 * structureId y constituentId identifican exclusivamente la misma
 * configuración participante respecto de la cual se afirma externamente
 * que R obtiene.
 *
 * El individuo relacional R ya queda fijado por el fundamento interno
 * inmediato StructureConstituentRelationParticipantsPresence.
 *
 * Por tanto, este input deliberadamente NO duplica
 * structureConstituentRelationId.
 *
 * NO introduce:
 *
 * - realizationId;
 * - ConstituentMembership;
 * - membership;
 * - source;
 * - target;
 * - participant roles;
 * - direction;
 * - orientation;
 * - semantic interpretation;
 * - relation applicability;
 * - relation application;
 * - constituent definition;
 * - requirement;
 * - slot;
 * - operand role;
 * - requirements/operands correspondence;
 * - satisfaction;
 * - operation applicability;
 * - operation execution.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationRealizationInput =
  {
    structureId: string;
    constituentId: string;
  };

/**
 * FASE 24.54
 *
 * Materialización explícita del hecho:
 *
 * StructureConstituentRelationParticipantsPresence
 * +
 * explicit StructureConstituentRelationRealizationInput
 * +
 * identidad exacta de structureId
 * +
 * identidad exacta de constituentId
 * +
 * invocación explícita
 * ->
 * StructureConstituentRelationRealization
 *
 * StructureConstituentRelationParticipantsPresence constituye el único
 * fundamento interno inmediato.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - semanticEvaluationOperationOperandRequirementsStructureConstituentRelationParticipantsPresence
 * - structureConstituentRelationRealizationInput
 *
 * y sólo añade realizationType.
 *
 * Su significado exclusivo es:
 *
 * el individuo relacional R obtiene respecto de la configuración
 * explícita de participantes S y C previamente presentada.
 *
 * En particular:
 *
 * RelationPresence
 * !=
 * RelationDefinition
 * !=
 * RelationParticipantsPresence
 * !=
 * RelationRealization
 * !=
 * ConstituentMembership.
 *
 * También:
 *
 * participant identity
 * !=
 * realization assertion
 * !=
 * semantic interpretation
 * !=
 * interpreted domain fact.
 *
 * structureConstituentRelationSemanticRole permanece completamente
 * opaco.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationRealization =
  {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationParticipantsPresence:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationParticipantsPresence;

    structureConstituentRelationRealizationInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationRealizationInput;

    realizationType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-realization';
  };

/**
 * FASE 24.54
 *
 * Materializa explícitamente la realización del individuo relacional R
 * respecto de los participantes S y C previamente presentados.
 *
 * Las únicas comprobaciones son identidad exacta de los participantes
 * declarados por ParticipantsPresence contra el RealizationInput.
 *
 * El match de identidad NO causa la realización.
 *
 * La realización procede exclusivamente de la nueva declaración externa
 * explícita representada por StructureConstituentRelationRealizationInput.
 *
 * Cualquier mismatch devuelve null.
 *
 * No se interpreta ni consulta
 * structureConstituentRelationSemanticRole.
 */
export function realizeProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelation(
  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationParticipantsPresence:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationParticipantsPresence,
  structureConstituentRelationRealizationInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationRealizationInput
):
  | ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationRealization
  | null {
  const genealogicalStructureId =
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationParticipantsPresence
      .structureConstituentRelationParticipantsInput
      .structureId;

  const genealogicalConstituentId =
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationParticipantsPresence
      .structureConstituentRelationParticipantsInput
      .constituentId;

  if (
    genealogicalStructureId !==
    structureConstituentRelationRealizationInput.structureId
  ) {
    return null;
  }

  if (
    genealogicalConstituentId !==
    structureConstituentRelationRealizationInput.constituentId
  ) {
    return null;
  }

  return {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationParticipantsPresence,
    structureConstituentRelationRealizationInput,
    realizationType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-realization',
  };
}