import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretation,
} from './operationalKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationService';

import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationRealization,
} from './operationalKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationRealizationService';

/**
 * FASE 24.56
 *
 * Identidad externa explícita mínima del nuevo individuo de mediación
 * entre una interpretación semántica explícita de R y una realización
 * explícita de ese mismo individuo relacional R.
 *
 * mediationId identifica exclusivamente el individuo de mediación.
 *
 * NO constituye:
 *
 * - interpretationId;
 * - realizationId;
 * - semantic correspondence;
 * - semantic compatibility;
 * - semantic applicability;
 * - semantic application;
 * - semantic validation;
 * - interpreted relation realization;
 * - interpreted relational fact;
 * - participant semantic role;
 * - role assignment;
 * - ConstituentMembership;
 * - interpreted domain fact.
 *
 * La identidad del individuo relacional R NO se duplica en este input.
 * R permanece determinado genealógicamente por ambos fundamentos.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationRealizationMediationPresenceInput =
  {
    mediationId: string;
  };

/**
 * FASE 24.56
 *
 * Materialización explícita del hecho:
 *
 * RelationSemanticInterpretation(R)
 * +
 * RelationRealization(R)
 * +
 * explicit MediationPresenceInput
 * +
 * identidad genealógica exacta del mismo R
 * +
 * invocación explícita
 * ->
 * RelationSemanticInterpretationRealizationMediationPresence
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretation;
 * - semanticEvaluationOperationOperandRequirementsStructureConstituentRelationRealization;
 * - structureConstituentRelationSemanticInterpretationRealizationMediationPresenceInput;
 *
 * y sólo añade mediationPresenceType.
 *
 * Su significado exclusivo es:
 *
 * una interpretación semántica explícita de R y una realización explícita
 * del mismo R han sido puestas explícitamente dentro de un individuo
 * identificado de mediación semántica.
 *
 * IMPORTANTE:
 *
 * mediation presence
 * != semantic correspondence
 * != semantic compatibility
 * != semantic applicability
 * != semantic application
 * != interpreted realization
 * != interpreted relational fact
 * != ConstituentMembership
 * != domain fact.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationRealizationMediationPresence =
  {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretation:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretation;

    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationRealization:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationRealization;

    structureConstituentRelationSemanticInterpretationRealizationMediationPresenceInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationRealizationMediationPresenceInput;

    mediationPresenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-realization-mediation-presence';
  };

/**
 * FASE 24.56
 *
 * Establece explícitamente la presencia de mediación entre una
 * RelationSemanticInterpretation y una RelationRealization.
 *
 * La única comprobación realizada es identidad genealógica exacta:
 *
 * SemanticInterpretation
 *   .RelationDefinition
 *   .structureConstituentRelationDefinitionInput
 *   .structureConstituentRelationId
 *
 * ===
 *
 * RelationRealization
 *   .ParticipantsPresence
 *   .RelationDefinition
 *   .structureConstituentRelationDefinitionInput
 *   .structureConstituentRelationId
 *
 * Un mismatch devuelve null porque los dos fundamentos pertenecen a
 * individuos relacionales distintos y, por tanto, no pueden constituir
 * este tipo específico de mediación Interpretation-Realization.
 *
 * Esta comprobación constituye exclusivamente identidad genealógica
 * del individuo relacional R.
 *
 * NO constituye:
 *
 * - semantic match;
 * - semantic correspondence;
 * - semantic compatibility;
 * - semantic correctness;
 * - semantic validation;
 * - semantic applicability;
 * - semantic application.
 *
 * Deliberadamente NO se inspeccionan:
 *
 * - structureConstituentRelationSemanticRole;
 * - interpretedStructureConstituentRelationSemanticRole;
 * - structureId;
 * - constituentId;
 * - participant roles;
 * - SemanticEvaluationOperandsPresence.
 */
export function establishProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationRealizationMediationPresence(
  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretation:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretation,

  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationRealization:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationRealization,

  structureConstituentRelationSemanticInterpretationRealizationMediationPresenceInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationRealizationMediationPresenceInput
):
  | ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationRealizationMediationPresence
  | null {
  const semanticInterpretationStructureConstituentRelationId =
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretation
      .semanticEvaluationOperationOperandRequirementsStructureConstituentRelationDefinition
      .structureConstituentRelationDefinitionInput
      .structureConstituentRelationId;

  const relationRealizationStructureConstituentRelationId =
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationRealization
      .semanticEvaluationOperationOperandRequirementsStructureConstituentRelationParticipantsPresence
      .semanticEvaluationOperationOperandRequirementsStructureConstituentRelationDefinition
      .structureConstituentRelationDefinitionInput
      .structureConstituentRelationId;

  if (
    semanticInterpretationStructureConstituentRelationId !==
    relationRealizationStructureConstituentRelationId
  ) {
    return null;
  }

  return {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretation,
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationRealization,
    structureConstituentRelationSemanticInterpretationRealizationMediationPresenceInput,
    mediationPresenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-realization-mediation-presence',
  };
}
