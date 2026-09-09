import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantSemanticRoleRelationPresence,
} from './participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantSemanticRoleRelationPresenceService';

/**
 * FASE 25.05
 *
 * Definición semántica declarativa externa explícita mínima del individuo
 * relacional Q cuya presencia fue previamente establecida mediante:
 *
 * ParticipantSemanticRoleRelationPresence.
 *
 * Esta fase introduce exclusivamente una semántica declarativa opaca
 * para Q:
 *
 * participationSemanticStructureParticipantSemanticRoleRelationSemanticRole
 *
 * IMPORTANTE:
 *
 * El SemanticRole declarado aquí pertenece al individuo relacional Q.
 *
 * NO es:
 *
 * - el SemanticRole R del ConstitutionElement;
 * - ParticipantRoleCorrespondence;
 * - ParticipantRoleCompatibility;
 * - ParticipantRoleEligibility;
 * - ParticipantRoleAssignment;
 * - RoleOccupation;
 * - RoleFulfillment;
 * - Membership.
 *
 * El contenido de
 *
 * participationSemanticStructureParticipantSemanticRoleRelationSemanticRole
 *
 * permanece completamente opaco, literal y no interpretado.
 *
 * Incluso valores lexicalmente sugestivos como:
 *
 * - "correspondence";
 * - "compatible";
 * - "eligible";
 * - "assigned";
 * - "member";
 *
 * NO producen ninguna de esas categorías ontológicas.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantSemanticRoleRelationDefinitionInput =
  {
    participationSemanticStructureParticipantSemanticRoleRelationId: string;
    participationSemanticStructureParticipantSemanticRoleRelationSemanticRole: string;
  };

/**
 * FASE 25.05
 *
 * Materialización explícita del hecho:
 *
 * ParticipantSemanticRoleRelationPresence(S,P,E,Q)
 * +
 * explicit ParticipantSemanticRoleRelationDefinitionInput(Q,M)
 * +
 * identity match de Q
 * +
 * invocación explícita
 * ->
 * ParticipantSemanticRoleRelationDefinition(S,P,E,Q,M)
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - ParticipantSemanticRoleRelationPresence;
 * - ParticipantSemanticRoleRelationDefinitionInput;
 *
 * y sólo añade:
 *
 * - participationSemanticStructureParticipantSemanticRoleRelationDefinitionType.
 *
 * La definición NO interpreta M ni promociona Q hacia ninguna
 * correspondence, compatibility, eligibility, assignment,
 * occupation, fulfillment o membership.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantSemanticRoleRelationDefinition =
  {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantSemanticRoleRelationPresence:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantSemanticRoleRelationPresence;

    participationSemanticStructureParticipantSemanticRoleRelationDefinitionInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantSemanticRoleRelationDefinitionInput;

    participationSemanticStructureParticipantSemanticRoleRelationDefinitionType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-semantic-role-relation-definition';
  };

/**
 * FASE 25.05
 *
 * Define declarativamente la semántica del mismo individuo relacional Q
 * cuya presencia fue establecida en FASE 25.04.
 *
 * Se comprueba exclusivamente:
 *
 * 1. que relationId solicitado coincide exactamente con el relationId
 *    del ParticipantSemanticRoleRelationPresence recibido.
 *
 * Esta comprobación es exclusivamente de identidad.
 *
 * NO constituye:
 *
 * - semantic interpretation;
 * - ParticipantRoleCorrespondence;
 * - compatibility;
 * - eligibility;
 * - assignment;
 * - occupation;
 * - fulfillment;
 * - membership.
 *
 * La genealogía Participant P, ConstitutionElement E y
 * ParticipationSemanticStructure S permanece completamente encapsulada
 * dentro de ParticipantSemanticRoleRelationPresence.
 */
export function defineProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantSemanticRoleRelation(
  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantSemanticRoleRelationPresence:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantSemanticRoleRelationPresence,

  participationSemanticStructureParticipantSemanticRoleRelationDefinitionInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantSemanticRoleRelationDefinitionInput
): ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantSemanticRoleRelationDefinition | null {
  const participationSemanticStructureParticipantSemanticRoleRelationId =
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantSemanticRoleRelationPresence
      .participationSemanticStructureParticipantSemanticRoleRelationPresenceInput
      .participationSemanticStructureParticipantSemanticRoleRelationId;

  if (
    participationSemanticStructureParticipantSemanticRoleRelationId !==
    participationSemanticStructureParticipantSemanticRoleRelationDefinitionInput
      .participationSemanticStructureParticipantSemanticRoleRelationId
  ) {
    return null;
  }

  return {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantSemanticRoleRelationPresence,

    participationSemanticStructureParticipantSemanticRoleRelationDefinitionInput,

    participationSemanticStructureParticipantSemanticRoleRelationDefinitionType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-semantic-role-relation-definition',
  };
}
