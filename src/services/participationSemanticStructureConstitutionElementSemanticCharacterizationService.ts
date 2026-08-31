import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementPresence,
} from './participationSemanticStructureConstitutionElementPresenceService';

/**
 * FASE 24.60
 *
 * Caracterización semántica externa explícita mínima de un elemento
 * previamente presentado dentro de una
 * ParticipationSemanticStructureConstitution.
 *
 * participationSemanticStructureConstitutionElementSemanticCharacterization
 * aporta exclusivamente contenido semántico declarativo explícito
 * asociado al elemento.
 *
 * IMPORTANTE:
 *
 * La caracterización semántica NO constituye todavía:
 *
 * - SemanticRolePresence;
 * - SemanticRoleDefinition;
 * - ParticipantSemanticRole;
 * - RoleAvailability;
 * - ParticipantRoleAssignment;
 * - InterpretedParticipantRole;
 * - member role;
 * - container role;
 * - source role;
 * - target role;
 * - Requirement;
 * - Slot;
 * - OperandRole;
 * - ConstituentMembership;
 * - SemanticCorrespondence;
 * - SemanticCompatibility;
 * - SemanticApplicability;
 * - SemanticApplication;
 * - semantic validation;
 * - semantic correctness;
 * - semantic confidence;
 * - InterpretedRelationRealization;
 * - InterpretedRelationalFact;
 * - DomainFact.
 *
 * Incluso valores como:
 *
 * - "member";
 * - "container";
 *
 * permanecen exclusivamente como caracterizaciones semánticas
 * declarativas explícitas.
 *
 * "member"
 * != formal MemberRole
 *
 * "container"
 * != formal ContainerRole
 *
 * El input NO duplica:
 *
 * - participationSemanticStructureConstitutionElementId;
 * - participationSemanticStructureConstitutionId;
 * - participationSemanticStructureId;
 * - structureConstituentRelationId;
 * - constituentId;
 * - participantsId;
 * - realizationId;
 * - mediationId.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticCharacterizationInput =
  {
    participationSemanticStructureConstitutionElementSemanticCharacterization:
      string;
  };

/**
 * FASE 24.60
 *
 * Materialización explícita del hecho:
 *
 * ParticipationSemanticStructureConstitutionElementPresence(E)
 * +
 * explicit ElementSemanticCharacterizationInput(M)
 * +
 * invocación explícita
 * ->
 * ParticipationSemanticStructureConstitutionElementSemanticCharacterization(E,M)
 *
 * ParticipationSemanticStructureConstitutionElementPresence constituye
 * el único fundamento interno inmediato.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementPresence;
 * - participationSemanticStructureConstitutionElementSemanticCharacterizationInput;
 *
 * y sólo añade:
 *
 * - participationSemanticStructureConstitutionElementSemanticCharacterizationType.
 *
 * Su significado exclusivo es:
 *
 * un elemento explícitamente presentado E posee una caracterización
 * semántica explícita M.
 *
 * La caracterización NO clasifica todavía E como SemanticRole.
 *
 * IMPORTANTE:
 *
 * ElementPresence
 * != ElementSemanticCharacterization
 * != SemanticRolePresence
 * != SemanticRoleDefinition
 * != RoleAvailability
 * != ParticipantRoleAssignment
 * != InterpretedParticipantRole.
 *
 * También:
 *
 * ElementSemanticCharacterization
 * != OperandRequirementsStructureConstituentDefinition
 * != Requirement
 * != Slot
 * != OperandRole.
 *
 * La presencia de múltiples caracterizaciones NO implica:
 *
 * - canonicalización;
 * - unicidad;
 * - preferencia;
 * - equivalencia;
 * - compatibilidad;
 * - conflicto;
 * - completitud semántica.
 *
 * Incluso si:
 *
 * E1 -> "member"
 * E2 -> "container"
 *
 * todavía NO se puede afirmar:
 *
 * - E1 es formalmente MemberRole;
 * - E2 es formalmente ContainerRole;
 * - la estructura posee exactamente dos roles;
 * - la estructura está completa;
 * - participant S ocupa E1;
 * - participant C ocupa E2;
 * - existe ConstituentMembership.
 *
 * Esta entidad continúa perteneciendo exclusivamente a la rama
 * intensional de la interpretación.
 *
 * NO depende de:
 *
 * - RelationRealization;
 * - MediationPresence;
 * - SemanticEvaluationOperandsPresence.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticCharacterization =
  {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementPresence:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementPresence;

    participationSemanticStructureConstitutionElementSemanticCharacterizationInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticCharacterizationInput;

    participationSemanticStructureConstitutionElementSemanticCharacterizationType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-constitution-element-semantic-characterization';
  };

/**
 * FASE 24.60
 *
 * Establece una caracterización semántica explícita para un
 * ParticipationSemanticStructureConstitutionElementPresence
 * previamente constituido.
 *
 * Deliberadamente NO existe ninguna comprobación de:
 *
 * - identity match;
 * - identity mismatch;
 * - semantic match;
 * - semantic mismatch;
 * - equivalencia;
 * - correspondencia;
 * - compatibilidad;
 * - applicability;
 * - validez;
 * - correctness;
 * - canonicalización;
 * - unicidad.
 *
 * ElementPresence ya determina genealógicamente:
 *
 * - participationSemanticStructureConstitutionElementId;
 * - participationSemanticStructureConstitutionId;
 * - participationSemanticStructureId;
 * - toda la genealogía anterior.
 *
 * El nuevo input NO posee una identidad independiente del elemento
 * que deba reconciliarse con el fundamento.
 *
 * La nueva información introducida es exclusivamente:
 *
 * participationSemanticStructureConstitutionElementSemanticCharacterization.
 *
 * El valor se conserva exactamente como fue aportado.
 *
 * Deliberadamente NO se:
 *
 * - normaliza;
 * - canonicaliza;
 * - transforma;
 * - interpreta;
 * - clasifica;
 * - compara.
 *
 * La misma ElementPresence puede recibir múltiples caracterizaciones
 * explícitas mediante invocaciones independientes.
 *
 * Por tanto:
 *
 * semantic characterization
 * != uniqueness
 * != canonical meaning
 * != preferred meaning.
 *
 * Tampoco se introduce exclusividad inversa.
 *
 * Deliberadamente NO se inspeccionan:
 *
 * - interpretedStructureConstituentRelationSemanticRole;
 * - structureConstituentRelationSemanticRole;
 * - participationSemanticStructureConstitutionElementId;
 * - participationSemanticStructureConstitutionId;
 * - participationSemanticStructureId;
 * - structureId;
 * - constituentsId;
 * - constituentId;
 * - participantsId;
 * - realizationId;
 * - mediationId;
 * - requirementsId;
 * - requirementsSemanticRole;
 * - operationId;
 * - operationSemanticRole;
 * - relationId;
 * - relationSemanticRole;
 * - referenceSemanticRole;
 * - axisSubject;
 * - SemanticEvaluationOperandsPresence.
 */
export function establishProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticCharacterization(
  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementPresence:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementPresence,
  participationSemanticStructureConstitutionElementSemanticCharacterizationInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticCharacterizationInput
): ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticCharacterization {
  return {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementPresence,
    participationSemanticStructureConstitutionElementSemanticCharacterizationInput,
    participationSemanticStructureConstitutionElementSemanticCharacterizationType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-constitution-element-semantic-characterization',
  };
}