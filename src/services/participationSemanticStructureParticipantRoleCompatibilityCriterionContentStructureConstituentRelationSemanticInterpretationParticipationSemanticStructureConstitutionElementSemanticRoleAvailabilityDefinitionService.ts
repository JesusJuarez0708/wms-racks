import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresence,
} from './participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresenceService';

/**
 * FASE 25.02
 *
 * Definición semántica externa explícita mínima de la Availability
 * previamente presentada para el SemanticRole del mismo
 * ParticipationSemanticStructureConstitutionElement.
 *
 * La AvailabilityPresence de FASE 25.01 constituye el único
 * fundamento interno inmediato.
 *
 * La nueva información introducida es exclusivamente:
 *
 * participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityDefinition
 *
 * aportada mediante input externo explícito.
 *
 * Por tanto:
 *
 * SemanticRoleAvailabilityPresence(E,A)
 * +
 * explicit AvailabilityDefinition(AD)
 * +
 * invocación explícita
 * ->
 * SemanticRoleAvailabilityDefinition(E,A,AD)
 *
 * y NO:
 *
 * SemanticRoleAvailabilityPresence(E,A)
 * ->
 * SemanticRoleAvailabilityDefinition(E,A).
 *
 * La definición requiere una nueva invocación externa explícita.
 *
 * El contenido de AvailabilityDefinition es completamente opaco.
 *
 * NO se:
 *
 * - normaliza;
 * - canonicaliza;
 * - transforma;
 * - interpreta;
 * - compara;
 * - valida semánticamente;
 * - convierte en estado operacional;
 * - convierte en vacancy;
 * - convierte en occupation;
 * - convierte en capacity.
 *
 * Tampoco se introduce:
 *
 * - availability status;
 * - RoleOccupation;
 * - RoleFulfillment;
 * - ParticipantRoleCorrespondence;
 * - ParticipantRoleCompatibility;
 * - ParticipantRoleEligibility;
 * - ParticipantRoleAssignment;
 * - Membership;
 * - Requirement;
 * - Slot;
 * - OperandRole;
 * - Score;
 * - Weight;
 * - Priority;
 * - Confidence;
 * - Ranking;
 * - Preference;
 * - Selection;
 * - Decision.
 */

export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityDefinitionInput =
  {
    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityDefinition:
      string;
  };

/**
 * FASE 25.02
 *
 * Materialización explícita del hecho:
 *
 * SemanticRoleAvailabilityPresence(E,A)
 * +
 * explicit AvailabilityDefinitionInput(AD)
 * +
 * invocación explícita
 * ->
 * SemanticRoleAvailabilityDefinition(E,A,AD)
 *
 * La entidad conserva por identidad:
 *
 * - SemanticRoleAvailabilityPresence;
 * - AvailabilityDefinitionInput.
 *
 * y sólo añade:
 *
 * - AvailabilityDefinitionType.
 *
 * No crea una identidad adicional para:
 *
 * - Element;
 * - Constitution;
 * - ParticipationSemanticStructure;
 * - SemanticRole;
 * - Availability.
 *
 * Toda esa identidad permanece determinada genealógicamente
 * por SemanticRoleAvailabilityPresence.
 */

export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityDefinition =
  {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresence:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresence;

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityDefinitionInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityDefinitionInput;

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityDefinitionType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-constitution-element-semantic-role-availability-definition';
  };

/**
 * FASE 25.02
 *
 * Define semánticamente de forma explícita la Availability
 * previamente presentada para el SemanticRole del mismo Element.
 *
 * AvailabilityDefinitionInput NO introduce una nueva identidad.
 *
 * El valor se conserva exactamente como fue aportado.
 *
 * La misma AvailabilityPresence puede recibir múltiples
 * AvailabilityDefinition mediante invocaciones independientes.
 *
 * Esto NO implica:
 *
 * - unicidad;
 * - estado de disponibilidad;
 * - vacancy;
 * - occupation;
 * - capacity;
 * - conflicto;
 * - selección;
 * - resolución entre múltiples definiciones.
 */

export function defineProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleAvailability(
  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresence:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresence,

  participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityDefinitionInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityDefinitionInput

):
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityDefinition {

  return {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityPresence,

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityDefinitionInput,

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleAvailabilityDefinitionType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-constitution-element-semantic-role-availability-definition',
  };
}
