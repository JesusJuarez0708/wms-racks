import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementDefinition,
} from './participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementDefinitionService';

/**
 * FASE 25.17
 *
 * Caracterización semántica externa explícita mínima de un
 * ParticipationSemanticStructureConstitutionElement previamente definido.
 *
 * participationSemanticStructureConstitutionElementSemanticCharacterization
 * aporta exclusivamente contenido semántico declarativo explícito y opaco.
 *
 * IMPORTANTE:
 *
 * La caracterización semántica NO constituye todavía:
 *
 * - SemanticRolePresence;
 * - SemanticRoleDefinition;
 * - RoleAvailability;
 * - ParticipantRole;
 * - MemberRole;
 * - ContainerRole;
 * - SourceRole;
 * - TargetRole;
 * - Membership;
 * - ConstituentMembership;
 * - cardinality;
 * - collection;
 * - Requirement;
 * - Slot;
 * - OperandRole;
 * - correspondence;
 * - compatibility;
 * - applicability;
 * - application;
 * - evaluation;
 * - validation;
 * - correctness;
 * - RelationRealization;
 * - MediationPresence.
 *
 * Valores lexicales como:
 *
 * - "member";
 * - "container";
 * - "source";
 * - "target";
 * - "semantic-role";
 *
 * permanecen exclusivamente como caracterizaciones declarativas
 * explícitas y opacas.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementSemanticCharacterizationInput =
  {
    participationSemanticStructureConstitutionElementSemanticCharacterization:
      string;
  };

/**
 * FASE 25.17
 *
 * Materialización explícita del hecho:
 *
 * ConstitutionElementDefinition(E,D)
 * +
 * explicit ElementSemanticCharacterizationInput(M)
 * +
 * invocación explícita
 * ->
 * ConstitutionElementSemanticCharacterization(E,D,M)
 *
 * ConstitutionElementDefinition de FASE 25.16 constituye el único
 * fundamento interno inmediato.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - ConstitutionElementDefinition;
 * - ConstitutionElementSemanticCharacterizationInput;
 *
 * y sólo añade su discriminante SemanticCharacterizationType.
 *
 * Definition D y SemanticCharacterization M permanecen
 * ontológicamente distintas e independientes.
 *
 * IMPORTANTE:
 *
 * ConstitutionElementDefinition
 * != ConstitutionElementSemanticCharacterization
 * != SemanticRolePresence
 * != SemanticRoleDefinition
 * != RoleAvailability.
 *
 * La igualdad o desigualdad lexical entre D y M NO implica:
 *
 * - equivalencia;
 * - consistencia;
 * - conflicto;
 * - resolución;
 * - canonicalización;
 * - preferencia.
 *
 * La misma ConstitutionElementDefinition puede recibir múltiples
 * caracterizaciones explícitas mediante invocaciones independientes.
 *
 * Esta entidad permanece en la rama intensional y NO depende de:
 *
 * - RelationRealization;
 * - MediationPresence;
 * - SemanticEvaluationOperands.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementSemanticCharacterization =
  {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementDefinition:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementDefinition;

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementSemanticCharacterizationInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementSemanticCharacterizationInput;

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementSemanticCharacterizationType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-constitution-element-semantic-characterization';
  };

/**
 * FASE 25.17
 *
 * Caracteriza semánticamente de manera explícita un ConstitutionElement
 * previamente definido.
 *
 * Deliberadamente NO se:
 *
 * - infiere;
 * - normaliza;
 * - hace trim;
 * - canonicaliza;
 * - transforma;
 * - interpreta;
 * - clasifica;
 * - compara;
 * - reconcilia identidad.
 *
 * Tampoco se materializa automáticamente ninguna capa posterior.
 *
 * La identidad del ConstitutionElement y toda su genealogía permanecen
 * determinadas exclusivamente por ConstitutionElementDefinition.
 */
export function characterizeProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElement(
  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementDefinition:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementDefinition,

  participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementSemanticCharacterizationInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementSemanticCharacterizationInput
): ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementSemanticCharacterization {
  return {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementDefinition,

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementSemanticCharacterizationInput,

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementSemanticCharacterizationType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-constitution-element-semantic-characterization',
  };
}
