import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRolePresence,
} from './participationSemanticStructureConstitutionElementSemanticRolePresenceService';

/**
 * FASE 24.62
 *
 * Definición semántica externa explícita mínima del SemanticRole
 * previamente presentado sobre un
 * ParticipationSemanticStructureConstitutionElement.
 *
 * participationSemanticStructureConstitutionElementSemanticRoleDefinition
 * aporta exclusivamente contenido semántico declarativo explícito
 * para el SemanticRole ya presente.
 *
 * IMPORTANTE:
 *
 * La identidad del SemanticRole continúa siendo exactamente la
 * identidad del mismo Element E previamente clasificado.
 *
 * NO se introduce:
 *
 * - semanticRoleId;
 * - roleId;
 * - participantRoleId;
 * - memberRoleId;
 * - containerRoleId.
 *
 * El input NO duplica:
 *
 * - participationSemanticStructureConstitutionElementId;
 * - participationSemanticStructureConstitutionId;
 * - participationSemanticStructureId.
 *
 * La identidad ya está determinada genealógicamente por
 * ElementSemanticRolePresence.
 *
 * Por tanto:
 *
 * ElementSemanticRolePresence(E)
 * +
 * explicit SemanticRoleDefinition(D)
 * ->
 * ElementSemanticRoleDefinition(E,D)
 *
 * y NO:
 *
 * ElementSemanticCharacterization(E,"member")
 * ->
 * MemberRoleDefinition(E).
 *
 * Incluso si D = "member", dicho valor procede exclusivamente de
 * una nueva entrada externa explícita.
 *
 * La definición NO constituye todavía:
 *
 * - MemberRole;
 * - ContainerRole;
 * - RoleAvailability;
 * - RoleRequirement;
 * - ParticipantRoleCorrespondence;
 * - ParticipantRoleCompatibility;
 * - ParticipantRoleEligibility;
 * - ParticipantRoleAssignment;
 * - ParticipantMembership;
 * - ConstituentMembership;
 * - SemanticCorrespondence;
 * - SemanticCompatibility;
 * - SemanticApplicability;
 * - SemanticApplication;
 * - DomainFact.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleDefinitionInput =
  {
    participationSemanticStructureConstitutionElementSemanticRoleDefinition:
      string;
  };

/**
 * FASE 24.62
 *
 * Materialización explícita del hecho:
 *
 * ElementSemanticRolePresence(E)
 * +
 * explicit SemanticRoleDefinitionInput(D)
 * +
 * invocación explícita
 * ->
 * ElementSemanticRoleDefinition(E,D)
 *
 * ElementSemanticRolePresence constituye el único fundamento
 * interno inmediato.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRolePresence;
 * - participationSemanticStructureConstitutionElementSemanticRoleDefinitionInput;
 *
 * y sólo añade:
 *
 * - participationSemanticStructureConstitutionElementSemanticRoleDefinitionType.
 *
 * Su significado exclusivo es:
 *
 * el mismo elemento E previamente clasificado explícitamente como
 * SemanticRole posee ahora una definición semántica externa explícita D.
 *
 * IMPORTANTE:
 *
 * ElementSemanticCharacterization
 * != ElementSemanticRolePresence
 * != ElementSemanticRoleDefinition
 * != RoleAvailability
 * != ParticipantRoleCorrespondence
 * != ParticipantRoleAssignment.
 *
 * La definición conserva D, pero deliberadamente NO lo interpreta.
 *
 * Por tanto:
 *
 * characterization(E) = "member"
 *
 * NO autoriza:
 *
 * definition(E) = "member"
 *
 * ni:
 *
 * definition(E) = "MemberRole".
 *
 * Sin embargo, una invocación explícita independiente puede aportar:
 *
 * definition(E) = "member"
 *
 * y esa coincidencia lexical sigue sin constituir inferencia desde
 * ElementSemanticCharacterization.
 *
 * Tampoco se introduce:
 *
 * - cardinalidad;
 * - aridad;
 * - completitud;
 * - Requirement;
 * - Slot;
 * - OperandRole;
 * - availability;
 * - correspondence;
 * - compatibility;
 * - applicability;
 * - assignment;
 * - occupation;
 * - fulfillment.
 *
 * Esta entidad continúa perteneciendo exclusivamente a la rama
 * intensional de la interpretación.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleDefinition =
  {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRolePresence:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRolePresence;

    participationSemanticStructureConstitutionElementSemanticRoleDefinitionInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleDefinitionInput;

    participationSemanticStructureConstitutionElementSemanticRoleDefinitionType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-constitution-element-semantic-role-definition';
  };

/**
 * FASE 24.62
 *
 * Define semánticamente de forma explícita el SemanticRole
 * previamente presentado sobre el mismo Element E.
 *
 * Deliberadamente NO existe aquí ninguna comprobación de identidad
 * adicional porque SemanticRoleDefinitionInput NO introduce una nueva
 * identidad.
 *
 * ElementSemanticRolePresence ya determina genealógicamente:
 *
 * - participationSemanticStructureConstitutionElementId;
 * - participationSemanticStructureConstitutionId;
 * - participationSemanticStructureId;
 * - toda la genealogía anterior.
 *
 * La nueva información introducida es exclusivamente:
 *
 * participationSemanticStructureConstitutionElementSemanticRoleDefinition.
 *
 * El valor se conserva exactamente como fue aportado.
 *
 * Deliberadamente NO se:
 *
 * - deriva desde ElementSemanticCharacterization;
 * - normaliza;
 * - canonicaliza;
 * - transforma;
 * - interpreta;
 * - compara;
 * - valida;
 * - clasifica nuevamente.
 *
 * En particular NO se inspecciona si la caracterización previa es:
 *
 * - "member";
 * - "container";
 * - "source";
 * - "target";
 * - cualquier otro valor.
 *
 * Por tanto:
 *
 * characterization content
 * != semantic role definition source.
 *
 * La misma SemanticRolePresence puede recibir múltiples definiciones
 * explícitas mediante invocaciones independientes.
 *
 * Esto NO implica:
 *
 * - unicidad;
 * - canonical meaning;
 * - preferred meaning;
 * - equivalencia;
 * - conflicto;
 * - resolución de múltiples definiciones.
 *
 * Tampoco se inspeccionan ni promueven:
 *
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
export function defineProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRole(
  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRolePresence:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRolePresence,
  participationSemanticStructureConstitutionElementSemanticRoleDefinitionInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleDefinitionInput
): ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRoleDefinition {
  return {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructureConstitutionElementSemanticRolePresence,
    participationSemanticStructureConstitutionElementSemanticRoleDefinitionInput,
    participationSemanticStructureConstitutionElementSemanticRoleDefinitionType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-constitution-element-semantic-role-definition',
  };
}