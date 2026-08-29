import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationDefinition,
} from './operationalKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationDefinitionService';

/**
 * FASE 24.53
 *
 * Información externa explícita mínima necesaria para presentar
 * formalmente los participantes de un individuo relacional
 * structure-constituent previamente definido.
 *
 * structureId identifica exactamente qué Structure pretende ser
 * presentada explícitamente como participante de la relación.
 *
 * constituentId identifica exactamente qué Constituent pretende ser
 * presentado explícitamente como participante de la relación.
 *
 * IMPORTANTE:
 *
 * Estas identidades ya son recuperables genealógicamente, pero:
 *
 * genealogical context
 * !=
 * explicit relational participation.
 *
 * Por tanto, su presencia previa dentro de la genealogía NO constituye
 * automáticamente participación explícita en la relación.
 *
 * Este input constituye una declaración externa nueva y explícita de:
 *
 * - participación de la Structure;
 * - participación del Constituent.
 *
 * NO constituye:
 *
 * - realization;
 * - relation application;
 * - ConstituentMembership;
 * - membership;
 * - member-of;
 * - belongs-to;
 * - part-of;
 * - source;
 * - target;
 * - dirección;
 * - orientación;
 * - participant role;
 * - semantic interpretation;
 * - relation applicability;
 * - constituent definition;
 * - constituentSemanticRole;
 * - requirement;
 * - requirementId;
 * - requirementSemanticRole;
 * - slot;
 * - slotId;
 * - operand;
 * - operandId;
 * - operandRole;
 * - expectedSemanticRole;
 * - mapping;
 * - correspondence;
 * - satisfaction;
 * - operation applicability;
 * - operation execution.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationParticipantsInput =
  {
    structureId: string;
    constituentId: string;
  };

/**
 * FASE 24.53
 *
 * Materialización explícita del hecho:
 *
 * SemanticEvaluationOperationOperandRequirementsStructureConstituentRelationDefinition
 * +
 * explicit StructureConstituentRelationParticipantsInput
 * +
 * identidad exacta de structureId
 * +
 * identidad exacta de constituentId
 * +
 * invocación explícita
 * ->
 * SemanticEvaluationOperationOperandRequirementsStructureConstituentRelationParticipantsPresence
 *
 * StructureConstituentRelationDefinition constituye el único
 * fundamento interno inmediato.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - semanticEvaluationOperationOperandRequirementsStructureConstituentRelationDefinition
 * - structureConstituentRelationParticipantsInput
 *
 * y sólo añade presenceType.
 *
 * Su significado es exclusivamente:
 *
 * el individuo relacional R previamente presentado y definido posee
 * ahora una declaración explícita de que S y C participan en R.
 *
 * En particular:
 *
 * relation presence
 * !=
 * relation definition
 * !=
 * relation participants presence
 * !=
 * relation realization
 * !=
 * constituent membership.
 *
 * También:
 *
 * genealogical context
 * !=
 * explicit relational participation.
 *
 * La recuperación genealógica de structureId y constituentId se usa
 * exclusivamente para comprobar identidad de los individuos que el
 * input externo pretende presentar como participantes.
 *
 * NO constituye inferencia automática de participación.
 *
 * La semántica declarada de R permanece completamente opaca:
 *
 * structureConstituentRelationSemanticRole
 *
 * NO es interpretado, comparado, canonicalizado ni utilizado para
 * decidir la presencia de participantes.
 *
 * Incluso:
 *
 * Definition(R, membership-semantics)
 * +
 * ParticipantsPresence(R, S, C)
 *
 * sigue siendo distinto de:
 *
 * Membership(S, C).
 *
 * La rama permanece completamente independiente de
 * SemanticEvaluationOperandsPresence.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationParticipantsPresence =
  {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationDefinition:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationDefinition;

    structureConstituentRelationParticipantsInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationParticipantsInput;

    presenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-participants-presence';
  };

/**
 * FASE 24.53
 *
 * Presenta explícitamente los participantes de un individuo relacional
 * structure-constituent previamente definido.
 *
 * Las únicas comprobaciones realizadas son identidad exacta:
 *
 * genealogical structureId
 * ===
 * StructureConstituentRelationParticipantsInput.structureId
 *
 * y:
 *
 * genealogical constituentId
 * ===
 * StructureConstituentRelationParticipantsInput.constituentId
 *
 * Un mismatch en cualquiera de ambas identidades devuelve null.
 *
 * Estas comprobaciones constituyen exclusivamente identidad de los
 * individuos externamente presentados como participantes.
 *
 * NO constituyen:
 *
 * - semantic comparison;
 * - semantic interpretation;
 * - membership;
 * - relation realization;
 * - relation applicability;
 * - source/target determination;
 * - direction determination;
 * - constituent definition;
 * - requirement promotion;
 * - requirements/operands correspondence;
 * - satisfaction;
 * - operation applicability;
 * - execution.
 *
 * Deliberadamente NO se inspecciona ni interpreta:
 *
 * - structureConstituentRelationSemanticRole;
 * - structureSemanticRole;
 * - requirementsSemanticRole;
 * - operationSemanticRole;
 * - relationSemanticRole;
 * - referenceSemanticRole;
 * - axisSubject;
 * - referenceOperand;
 * - axisOperand;
 * - SemanticEvaluationOperandsPresence.
 *
 * Tampoco se normalizan:
 *
 * - structureId;
 * - constituentId.
 *
 * La comparación es estrictamente identidad exacta de string.
 */
export function presentProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationParticipants(
  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationDefinition:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationDefinition,
  structureConstituentRelationParticipantsInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationParticipantsInput
):
  | ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationParticipantsPresence
  | null {
  const semanticEvaluationOperationOperandRequirementsStructureConstituentRelationPresence =
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationDefinition
      .semanticEvaluationOperationOperandRequirementsStructureConstituentRelationPresence;

  const semanticEvaluationOperationOperandRequirementsStructureConstituentPresence =
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationPresence
      .semanticEvaluationOperationOperandRequirementsStructureConstituentPresence;

  const genealogicalConstituentId =
    semanticEvaluationOperationOperandRequirementsStructureConstituentPresence
      .structureConstituentPresenceInput
      .constituentId;

  const genealogicalStructureId =
    semanticEvaluationOperationOperandRequirementsStructureConstituentPresence
      .semanticEvaluationOperationOperandRequirementsStructureConstituentsPresence
      .semanticEvaluationOperationOperandRequirementsStructureDefinition
      .structureDefinitionInput
      .structureId;

  if (
    genealogicalStructureId !==
    structureConstituentRelationParticipantsInput.structureId
  ) {
    return null;
  }

  if (
    genealogicalConstituentId !==
    structureConstituentRelationParticipantsInput.constituentId
  ) {
    return null;
  }

  return {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationDefinition,
    structureConstituentRelationParticipantsInput,
    presenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-participants-presence',
  };
}