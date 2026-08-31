import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretation,
} from './operationalKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationService';

/**
 * FASE 24.57
 *
 * Identidad externa explícita mínima de un individuo cuya presencia
 * representa la estructura semántica de participación perteneciente
 * a una interpretación semántica explícita de un individuo relacional R.
 *
 * participationSemanticStructureId identifica exclusivamente dicho
 * individuo estructural.
 *
 * Su existencia NO define todavía el contenido de la estructura.
 *
 * En particular, participationSemanticStructureId NO constituye:
 *
 * - participantId;
 * - participantsId;
 * - participant semantic role;
 * - participant semantic role definition;
 * - member role;
 * - container role;
 * - source role;
 * - target role;
 * - role assignment;
 * - interpreted participant role;
 * - arity;
 * - Slot;
 * - slotId;
 * - Requirement;
 * - requirementId;
 * - requirementSemanticRole;
 * - OperandRole;
 * - operandRole;
 * - expectedSemanticRole;
 * - semantic correspondence;
 * - semantic compatibility;
 * - semantic applicability;
 * - semantic application;
 * - semantic validation;
 * - semantic correctness;
 * - semantic confidence;
 * - RelationRealization;
 * - MediationPresence;
 * - InterpretedRelationRealization;
 * - InterpretedRelationalFact;
 * - ConstituentMembership;
 * - interpreted domain fact;
 * - domain fact.
 *
 * La identidad del individuo relacional R NO se duplica en este input.
 *
 * R permanece completamente determinado genealógicamente por
 * RelationSemanticInterpretation.
 *
 * Tampoco se duplica:
 *
 * - structureConstituentRelationId;
 * - structureConstituentRelationSemanticRole;
 * - interpretedStructureConstituentRelationSemanticRole;
 * - structureId;
 * - constituentsId;
 * - constituentId;
 * - interpretationId;
 * - realizationId;
 * - mediationId.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresenceInput =
  {
    participationSemanticStructureId: string;
  };

/**
 * FASE 24.57
 *
 * Materialización explícita del hecho:
 *
 * RelationSemanticInterpretation(I,R)
 * +
 * explicit ParticipationSemanticStructurePresenceInput(P)
 * +
 * invocación explícita
 * ->
 * RelationSemanticInterpretationParticipationSemanticStructurePresence
 *
 * RelationSemanticInterpretation constituye el único fundamento interno
 * inmediato.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretation;
 * - structureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresenceInput;
 *
 * y sólo añade:
 *
 * - participationSemanticStructurePresenceType.
 *
 * Su significado exclusivo es:
 *
 * una interpretación semántica explícita de un individuo relacional R
 * posee ahora explícitamente un individuo identificado cuya presencia
 * representa su estructura semántica de participación.
 *
 * La estructura continúa completamente opaca.
 *
 * IMPORTANTE:
 *
 * RelationSemanticInterpretation
 * != ParticipationSemanticStructurePresence.
 *
 * También:
 *
 * ParticipationSemanticStructurePresence
 * != ParticipationSemanticStructureDefinition
 * != ParticipantSemanticRolePresence
 * != ParticipantSemanticRoleDefinition
 * != RoleAvailability
 * != ParticipantRoleAssignment
 * != InterpretedParticipantRole.
 *
 * Y:
 *
 * ParticipationSemanticStructurePresence
 * != RelationRealization
 * != MediationPresence
 * != SemanticCorrespondence
 * != SemanticCompatibility
 * != SemanticApplicability
 * != SemanticApplication
 * != InterpretedRelationRealization
 * != InterpretedRelationalFact
 * != ConstituentMembership
 * != DomainFact.
 *
 * Incluso si:
 *
 * interpretedStructureConstituentRelationSemanticRole
 *
 * posee un valor conceptualmente equivalente a:
 *
 * membership
 *
 * esta entidad NO permite afirmar:
 *
 * - que exista un role "member";
 * - que exista un role "container";
 * - que la estructura contenga dichos roles;
 * - que un participante ocupe alguno de esos roles;
 * - que Structure sea container;
 * - que Constituent sea member;
 * - que exista ConstituentMembership.
 *
 * La semántica interpretada de R continúa sin determinar todavía
 * cómo participan semánticamente los participantes de una realización.
 *
 * Esta entidad pertenece exclusivamente a la rama intensional de
 * RelationSemanticInterpretation.
 *
 * NO depende de:
 *
 * - ParticipantsPresence;
 * - RelationRealization;
 * - MediationPresence;
 * - ConstituentDefinition;
 * - SemanticEvaluationOperandsPresence.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresence =
  {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretation:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretation;
    structureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresenceInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresenceInput;
    participationSemanticStructurePresenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-presence';
  };

/**
 * FASE 24.57
 *
 * Establece explícitamente la presencia de una estructura semántica
 * de participación para una RelationSemanticInterpretation previamente
 * constituida.
 *
 * Deliberadamente NO existe aquí ninguna comprobación de:
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
 * RelationSemanticInterpretation ya determina genealógicamente el
 * individuo relacional R y su interpretación semántica externa.
 *
 * El nuevo input NO posee una genealogía relacional independiente
 * que deba reconciliarse con R.
 *
 * Por tanto, NO existe aquí ninguna razón constitutiva para:
 *
 * - comparar structureConstituentRelationId;
 * - comparar interpretedStructureConstituentRelationSemanticRole;
 * - devolver null por mismatch.
 *
 * La nueva información introducida es exclusivamente:
 *
 * participationSemanticStructureId.
 *
 * La misma RelationSemanticInterpretation puede recibir múltiples
 * individuos de estructura semántica de participación mediante
 * invocaciones independientes con participationSemanticStructureId
 * distintos.
 *
 * Por tanto:
 *
 * participation semantic structure presence
 * != uniqueness
 * != canonical structure
 * != preferred structure.
 *
 * Asimismo, no se introduce todavía exclusividad inversa:
 *
 * el contrato no afirma que un participationSemanticStructureId
 * pertenezca necesariamente a una única RelationSemanticInterpretation.
 *
 * Deliberadamente NO se inspeccionan:
 *
 * - structureConstituentRelationSemanticRole;
 * - interpretedStructureConstituentRelationSemanticRole;
 * - structureId;
 * - constituentsId;
 * - constituentId;
 * - participantsId;
 * - participant roles;
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
 * - referenceOperand;
 * - axisOperand;
 * - SemanticEvaluationOperandsPresence.
 */
export function establishProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresence(
  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretation:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretation,
  structureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresenceInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresenceInput
): ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresence {
  return {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretation,
    structureConstituentRelationSemanticInterpretationParticipationSemanticStructurePresenceInput,
    participationSemanticStructurePresenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation-participation-semantic-structure-presence',
  };
}
