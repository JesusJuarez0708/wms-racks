import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementSemanticRoleDefinition,
} from './participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementSemanticRoleDefinitionService';

/**
 * FASE 24.82
 *
 * Presencia externa explícita mínima de disponibilidad del
 * SemanticRole previamente definido sobre el mismo
 * ParticipantRoleCompatibilityCriterionContentConstitutionElement.
 *
 * participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementSemanticRoleAvailabilityPresenceId
 * identifica exclusivamente la nueva declaración explícita de
 * presencia de disponibilidad.
 *
 * IMPORTANTE:
 *
 * La identidad del SemanticRole continúa siendo exactamente la
 * identidad del mismo Element E previamente:
 *
 * - caracterizado semánticamente;
 * - presentado explícitamente como SemanticRole;
 * - definido semánticamente de forma explícita.
 *
 * NO se introduce:
 *
 * - semanticRoleId;
 * - roleId;
 * - participantId;
 * - participantRoleId;
 * - memberRoleId;
 * - containerRoleId.
 *
 * El input NO duplica identidades genealógicas anteriores.
 *
 * La identidad completa de E ya está determinada por
 * ElementSemanticRoleDefinition.
 *
 * Por tanto:
 *
 * ElementSemanticRoleDefinition(E,D)
 * +
 * explicit AvailabilityPresence(A)
 * +
 * invocación explícita
 * ->
 * ElementSemanticRoleAvailabilityPresence(E,A)
 *
 * y NO:
 *
 * ElementSemanticRoleDefinition(E,D)
 * ->
 * ElementSemanticRoleAvailabilityPresence(E).
 *
 * La disponibilidad requiere una nueva invocación externa explícita.
 *
 * AvailabilityPresenceId es completamente opaco.
 *
 * Su contenido NO:
 *
 * - define disponibilidad;
 * - interpreta disponibilidad;
 * - representa estado operacional;
 * - representa vacancia;
 * - representa ocupación;
 * - representa capacidad.
 *
 * La presencia de disponibilidad NO constituye todavía:
 *
 * - SemanticRoleAvailabilityDefinition;
 * - RoleAvailability;
 * - ParticipantRoleCorrespondence;
 * - ParticipantRoleCompatibility;
 * - ParticipantRoleEligibility;
 * - ParticipantRoleAssignment;
 * - RoleOccupation;
 * - RoleFulfillment;
 * - Membership;
 * - Requirement;
 * - Slot;
 * - OperandRole;
 * - Comparison;
 * - Rule;
 * - Condition;
 * - Satisfaction;
 * - Selection;
 * - Decision.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementSemanticRoleAvailabilityPresenceInput =
  {
    participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementSemanticRoleAvailabilityPresenceId:
      string;
  };

/**
 * FASE 24.82
 *
 * Materialización explícita del hecho:
 *
 * ElementSemanticRoleDefinition(E,D)
 * +
 * explicit AvailabilityPresenceInput(A)
 * +
 * invocación explícita
 * ->
 * ElementSemanticRoleAvailabilityPresence(E,A)
 *
 * ElementSemanticRoleDefinition constituye el único fundamento
 * interno inmediato.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementSemanticRoleDefinition;
 * - participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementSemanticRoleAvailabilityPresenceInput;
 *
 * y sólo añade:
 *
 * - participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementSemanticRoleAvailabilityPresenceType.
 *
 * ElementSemanticCharacterization
 * != ElementSemanticRolePresence
 * != ElementSemanticRoleDefinition
 * != ElementSemanticRoleAvailabilityPresence
 * != SemanticRoleAvailabilityDefinition
 * != ParticipantRoleCorrespondence
 * != ParticipantRoleCompatibility
 * != ParticipantRoleEligibility
 * != ParticipantRoleAssignment.
 *
 * AvailabilityPresence NO significa:
 *
 * - que exista un participante;
 * - que un participante pueda desempeñar el rol;
 * - que un participante sea compatible;
 * - que un participante sea elegible;
 * - que un participante haya sido asignado;
 * - que el rol esté vacante;
 * - que el rol esté ocupado;
 * - que exista capacidad disponible;
 * - que exista fulfillment.
 *
 * No introduce cardinalidad, aridad, slots, score, weight,
 * priority, confidence, ranking, preference, selection ni decision.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementSemanticRoleAvailabilityPresence =
  {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementSemanticRoleDefinition:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementSemanticRoleDefinition;

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementSemanticRoleAvailabilityPresenceInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementSemanticRoleAvailabilityPresenceInput;

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementSemanticRoleAvailabilityPresenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-constitution-element-semantic-role-availability-presence';
  };

/**
 * FASE 24.82
 *
 * Presenta explícitamente la disponibilidad del SemanticRole
 * previamente definido sobre el mismo Element E.
 *
 * Deliberadamente NO existe aquí ninguna comprobación adicional
 * de identidad porque AvailabilityPresenceInput NO introduce una
 * nueva identidad para:
 *
 * - Element;
 * - SemanticRole;
 * - ParticipantRoleCompatibilityCriterionContent;
 * - ParticipationSemanticStructure.
 *
 * ElementSemanticRoleDefinition ya determina genealógicamente
 * toda la identidad anterior.
 *
 * La nueva información introducida es exclusivamente:
 *
 * participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementSemanticRoleAvailabilityPresenceId.
 *
 * El valor se conserva exactamente como fue aportado.
 *
 * Deliberadamente NO se:
 *
 * - deriva desde ElementSemanticCharacterization;
 * - deriva desde ElementSemanticRoleDefinition;
 * - normaliza;
 * - canonicaliza;
 * - transforma;
 * - interpreta;
 * - compara;
 * - valida semánticamente;
 * - convierte en estado booleano;
 * - convierte en disponibilidad operacional.
 *
 * En particular NO se inspecciona si:
 *
 * semantic role definition = "member"
 *
 * ni si:
 *
 * availabilityPresenceId = "available"
 *
 * o:
 *
 * availabilityPresenceId = "occupied".
 *
 * Todos esos valores permanecen opacos.
 *
 * La misma SemanticRoleDefinition puede recibir múltiples
 * AvailabilityPresence mediante invocaciones independientes.
 *
 * Esto NO implica:
 *
 * - unicidad;
 * - availability canonical;
 * - availability status;
 * - vacancy;
 * - occupation;
 * - capacidad;
 * - prioridad;
 * - preferencia;
 * - conflicto;
 * - resolución entre múltiples presencias.
 */
export function presentProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementSemanticRoleAvailability(
  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementSemanticRoleDefinition:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementSemanticRoleDefinition,

  participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementSemanticRoleAvailabilityPresenceInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementSemanticRoleAvailabilityPresenceInput
): ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementSemanticRoleAvailabilityPresence {
  return {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementSemanticRoleDefinition,

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementSemanticRoleAvailabilityPresenceInput,

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentConstitutionElementSemanticRoleAvailabilityPresenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-constitution-element-semantic-role-availability-presence',
  };
}
