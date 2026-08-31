import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticCharacterization,
} from './participationSemanticStructureConstitutionElementSemanticCharacterizationService';

/**
 * FASE 24.61
 *
 * Clasificación ontológica externa explícita mínima mediante la cual
 * un ParticipationSemanticStructureConstitutionElement previamente
 * caracterizado semánticamente es presentado formalmente como
 * perteneciente a la categoría SemanticRole.
 *
 * IMPORTANTE:
 *
 * La identidad del individuo clasificado continúa siendo exactamente
 * la identidad del Element previamente presentado.
 *
 * NO se introduce:
 *
 * - semanticRoleId;
 * - roleId;
 * - participantRoleId;
 * - memberRoleId;
 * - containerRoleId.
 *
 * semanticRoleClassification declara exclusivamente la categoría
 * ontológica bajo la cual el caller presenta explícitamente al mismo E.
 *
 * NO describe el significado particular del role.
 *
 * Por tanto:
 *
 * semanticRoleClassification = 'semantic-role'
 *
 * NO significa:
 *
 * - member;
 * - container;
 * - source;
 * - target;
 * - SemanticRoleDefinition;
 * - MemberRoleDefinition;
 * - ContainerRoleDefinition;
 * - RoleAvailability;
 * - ParticipantRoleCorrespondence;
 * - ParticipantRoleAssignment;
 * - ConstituentMembership;
 * - SemanticCorrespondence;
 * - SemanticCompatibility;
 * - SemanticApplicability;
 * - SemanticApplication;
 * - DomainFact.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRolePresenceInput =
  {
    semanticRoleClassification: 'semantic-role';
  };

/**
 * FASE 24.61
 *
 * Materialización explícita del hecho:
 *
 * ElementSemanticCharacterization(E,M)
 * +
 * explicit SemanticRole classification
 * +
 * invocación explícita
 * ->
 * ElementSemanticRolePresence(E)
 *
 * ElementSemanticCharacterization constituye el único fundamento
 * interno inmediato.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticCharacterization;
 * - participationSemanticStructureConstitutionElementSemanticRolePresenceInput;
 *
 * y sólo añade:
 *
 * - participationSemanticStructureConstitutionElementSemanticRolePresenceType.
 *
 * Su significado exclusivo es:
 *
 * el mismo elemento E previamente presentado y caracterizado
 * semánticamente es ahora explícitamente presentado como perteneciente
 * a la categoría ontológica SemanticRole.
 *
 * IMPORTANTE:
 *
 * ElementSemanticCharacterization
 * != ElementSemanticRolePresence.
 *
 * Y:
 *
 * ElementSemanticRolePresence
 * != SemanticRoleDefinition
 * != MemberRoleDefinition
 * != ContainerRoleDefinition
 * != RoleAvailability
 * != ParticipantRoleCorrespondence
 * != ParticipantRoleAssignment
 * != InterpretedParticipantRole.
 *
 * Incluso si la genealogía conserva:
 *
 * participationSemanticStructureConstitutionElementSemanticCharacterization
 * = "member"
 *
 * la nueva entidad sólo permite afirmar:
 *
 * - E pertenece explícitamente a la categoría SemanticRole;
 * - E conserva la caracterización declarativa "member".
 *
 * NO permite todavía afirmar:
 *
 * - E es formalmente MemberRole;
 * - E posee una definición formal de role "member";
 * - algún participante ocupa E;
 * - E está disponible para una RelationRealization;
 * - existe ConstituentMembership.
 *
 * La clasificación tampoco introduce:
 *
 * - cardinalidad;
 * - aridad;
 * - completitud;
 * - Requirement;
 * - Slot;
 * - OperandRole;
 * - correspondence;
 * - compatibility;
 * - applicability;
 * - application.
 *
 * Esta entidad continúa perteneciendo exclusivamente a la rama
 * intensional de la interpretación.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRolePresence =
  {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticCharacterization:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticCharacterization;

    participationSemanticStructureConstitutionElementSemanticRolePresenceInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRolePresenceInput;

    participationSemanticStructureConstitutionElementSemanticRolePresenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-constitution-element-semantic-role-presence';
  };

/**
 * FASE 24.61
 *
 * Establece explícitamente que un Element previamente caracterizado
 * semánticamente es presentado bajo la categoría ontológica SemanticRole.
 *
 * Deliberadamente NO existe aquí ninguna comprobación de:
 *
 * - semantic meaning;
 * - vocabulary membership;
 * - semantic match;
 * - semantic mismatch;
 * - equivalencia;
 * - canonicalización;
 * - compatibilidad;
 * - applicability;
 * - validez;
 * - correctness.
 *
 * La clasificación procede exclusivamente de la invocación explícita
 * con semanticRoleClassification = 'semantic-role'.
 *
 * Deliberadamente NO se inspecciona:
 *
 * - si la caracterización es "member";
 * - si la caracterización es "container";
 * - si la caracterización es "source";
 * - si la caracterización es "target";
 * - si la caracterización pertenece a algún vocabulario conocido.
 *
 * Por tanto:
 *
 * characterization content
 * != authorization for classification.
 *
 * La misma estructura funciona para cualquier caracterización externa
 * explícita previamente materializada.
 *
 * No se introduce un nuevo individuo role:
 *
 * Element E
 * +
 * explicit semantic-role classification
 * ->
 * same E classified as SemanticRole.
 *
 * Deliberadamente NO se crean:
 *
 * - semanticRoleId;
 * - roleId;
 * - roleDefinition;
 * - roleAvailability;
 * - participant correspondence;
 * - participant assignment.
 */
export function establishProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRolePresence(
  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticCharacterization:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticCharacterization,
  participationSemanticStructureConstitutionElementSemanticRolePresenceInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRolePresenceInput
): ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRolePresence {
  return {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticCharacterization,
    participationSemanticStructureConstitutionElementSemanticRolePresenceInput,
    participationSemanticStructureConstitutionElementSemanticRolePresenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-constitution-element-semantic-role-presence',
  };
}