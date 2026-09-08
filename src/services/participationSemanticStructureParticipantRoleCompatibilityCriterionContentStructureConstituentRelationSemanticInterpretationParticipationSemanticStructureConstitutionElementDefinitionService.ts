import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementPresence,
} from './participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementPresenceService';

/**
 * FASE 24.97
 *
 * Contenido declarativo explícito mínimo mediante el cual se define
 * un ParticipationSemanticStructureConstitutionElement previamente
 * presentado.
 *
 * Este valor permanece deliberadamente opaco.
 *
 * Su contenido NO constituye por sí mismo:
 *
 * - semantic characterization;
 * - semantic role;
 * - semantic role presence;
 * - semantic role definition;
 * - role availability;
 * - participant role;
 * - member role;
 * - container role;
 * - source role;
 * - target role;
 * - membership;
 * - ConstituentMembership;
 * - cardinality;
 * - collection;
 * - enumeration;
 * - ordering;
 * - position;
 * - arity;
 * - Requirement;
 * - Slot;
 * - OperandRole;
 * - Rule;
 * - Condition;
 * - Evaluation;
 * - SemanticEvaluationOperands;
 * - RelationRealization;
 * - MediationPresence;
 * - correspondence;
 * - compatibility;
 * - applicability;
 * - application;
 * - validation;
 * - correctness.
 *
 * Valores lexicales como:
 *
 * - "member";
 * - "container";
 * - "source";
 * - "target";
 * - "two operands";
 *
 * permanecen opacos y NO materializan ninguna de esas entidades
 * o relaciones.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementDefinitionInput =
  {
    participationSemanticStructureConstitutionElementDefinition: string;
  };

/**
 * FASE 24.97
 *
 * Materialización explícita del hecho:
 *
 * ParticipationSemanticStructureConstitutionElementPresence(C,E)
 * +
 * explicit ConstitutionElementDefinitionInput(D)
 * +
 * invocación explícita
 * ->
 * ParticipationSemanticStructureConstitutionElementDefinition(C,E,D)
 *
 * ConstitutionElementPresence constituye el único fundamento
 * interno inmediato.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - ConstitutionElementPresence;
 * - ConstitutionElementDefinitionInput;
 *
 * y sólo añade su discriminante DefinitionType.
 *
 * IMPORTANTE:
 *
 * ConstitutionElementPresence
 * != ConstitutionElementDefinition
 * != SemanticCharacterization
 * != SemanticRolePresence
 * != SemanticRoleDefinition
 * != RoleAvailability.
 *
 * La definición NO interpreta su contenido lexical y NO promueve
 * automáticamente el elemento a ninguna ontología posterior.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementDefinition =
  {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementPresence:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementPresence;

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementDefinitionInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementDefinitionInput;

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementDefinitionType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-constitution-element-definition';
  };

/**
 * FASE 24.97
 *
 * Define explícitamente un ConstitutionElement previamente
 * presentado.
 *
 * Deliberadamente NO existe aquí:
 *
 * - inferencia semántica;
 * - interpretación lexical;
 * - canonicalización;
 * - reconciliación de identidades;
 * - duplicación de constitutionId;
 * - duplicación de elementId;
 * - semantic characterization automática;
 * - semantic role automática;
 * - membership automática;
 * - cardinalidad;
 * - colección;
 * - enumeración;
 * - orden;
 * - posición;
 * - aridad;
 * - Requirement;
 * - Slot;
 * - OperandRole;
 * - Rule;
 * - Condition;
 * - Evaluation;
 * - SemanticEvaluationOperands;
 * - RelationRealization;
 * - MediationPresence.
 *
 * La identidad de C y E permanece determinada genealógicamente
 * por ConstitutionElementPresence.
 */
export function defineProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElement(
  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementPresence:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementPresence,

  participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementDefinitionInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementDefinitionInput
): ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementDefinition {
  return {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementPresence,

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementDefinitionInput,

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementDefinitionType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-constitution-element-definition',
  };
}
