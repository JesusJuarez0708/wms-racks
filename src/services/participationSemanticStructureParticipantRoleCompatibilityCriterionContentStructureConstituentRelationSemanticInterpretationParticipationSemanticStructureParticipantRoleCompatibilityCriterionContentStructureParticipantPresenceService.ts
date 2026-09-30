import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresence,
} from './participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureParticipationSemanticStructurePresenceService';

/**
 * FASE 25.41
 *
 * ParticipantRoleCompatibilityCriterionContentStructureParticipantPresence
 *
 * Presencia externa explícita mínima de un Participant dentro de una
 * ParticipationSemanticStructurePresence previamente constituida
 * en FASE 25.32.
 *
 * ParticipationSemanticStructurePresence de FASE 25.32 constituye el
 * único fundamento interno inmediato.
 *
 * Contrato:
 *
 * ParticipationSemanticStructurePresence(S)
 * +
 * explicit ParticipantPresenceInput(P)
 * +
 * invocación explícita
 * ->
 * ParticipantPresence(S,P)
 *
 * ParticipantPresence constituye una rama hermana de la rama
 * ConstitutionElementSemanticRoleAvailability de FASE 25.39-25.40.
 *
 * La nueva información introducida es exclusivamente:
 *
 * participationSemanticStructureParticipantId.
 *
 * El valor se conserva exactamente como fue aportado.
 *
 * Deliberadamente NO se:
 *
 * - deriva desde Constitution;
 * - deriva desde ConstitutionElement;
 * - deriva desde SemanticRole;
 * - deriva desde Availability;
 * - normaliza;
 * - canonicaliza;
 * - transforma;
 * - interpreta;
 * - compara;
 * - valida semánticamente;
 * - clasifica;
 * - convierte en member;
 * - convierte en occupant.
 *
 * ParticipantPresence NO constituye todavía:
 *
 * - ParticipantSemanticRoleRelation;
 * - ParticipantRoleCorrespondence;
 * - ParticipantRoleCompatibility;
 * - ParticipantRoleEligibility;
 * - ParticipantRoleAssignment;
 * - RoleOccupation;
 * - RoleFulfillment;
 * - ParticipantMembership;
 * - ConstituentMembership;
 * - Requirement;
 * - Slot;
 * - OperandRole;
 * - cardinalidad;
 * - aridad;
 * - colección;
 * - enumeración;
 * - orden;
 * - posición;
 * - score;
 * - weight;
 * - priority;
 * - confidence;
 * - ranking;
 * - preference;
 * - selection;
 * - decision.
 *
 * La genealogía previa permanece encapsulada.
 *
 * FASE 25.39 SemanticRoleAvailabilityPresence y FASE 25.40
 * SemanticRoleAvailabilityDefinition permanecen en una rama hermana
 * y NO constituyen fundamento interno.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureParticipantPresenceInput =
  {
    participationSemanticStructureParticipantId: string;
  };

/**
 * FASE 25.41
 *
 * Materialización explícita del hecho:
 *
 * ParticipationSemanticStructurePresence(S)
 * +
 * explicit ParticipantPresenceInput(P)
 * +
 * invocación explícita
 * ->
 * ParticipantPresence(S,P)
 *
 * Conserva exactamente por identidad:
 *
 * - ParticipationSemanticStructurePresence de FASE 25.32;
 * - ParticipantPresenceInput.
 *
 * Y añade únicamente ParticipantPresenceType.
 *
 * La misma ParticipationSemanticStructurePresence puede recibir
 * múltiples ParticipantPresence mediante invocaciones independientes.
 *
 * Esto NO implica unicidad, canonicalidad, equivalencia, preferencia,
 * conflicto, selección ni resolución.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureParticipantPresence =
  {
    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresence:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresence;

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureParticipantPresenceInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureParticipantPresenceInput;

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureParticipantPresenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-structure-participant-presence';
  };

/**
 * FASE 25.41
 *
 * Establece explícitamente la presencia de un Participant P dentro de
 * una ParticipationSemanticStructurePresence previamente presentada.
 *
 * ParticipationSemanticStructurePresence constituye el único
 * fundamento interno inmediato.
 *
 * No existe aquí ninguna comprobación de:
 *
 * - identity match;
 * - identity mismatch;
 * - semantic match;
 * - semantic mismatch;
 * - equivalencia;
 * - correspondencia;
 * - compatibilidad;
 * - elegibilidad;
 * - asignación;
 * - membership;
 * - occupation;
 * - canonicalización;
 * - unicidad.
 */
export function establishProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureParticipantPresence(
  participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresence:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresence,

  participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureParticipantPresenceInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureParticipantPresenceInput
):
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureParticipantPresence {
  return {
    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresence,

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureParticipantPresenceInput:
      participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureParticipantPresenceInput,

    participationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureParticipantRoleCompatibilityCriterionContentStructureParticipantPresenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-participant-role-compatibility-criterion-content-structure-participant-presence',
  };
}
