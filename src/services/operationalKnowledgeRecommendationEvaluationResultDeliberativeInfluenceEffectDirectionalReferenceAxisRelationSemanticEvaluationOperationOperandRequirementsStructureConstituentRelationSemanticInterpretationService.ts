import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationDefinition,
} from './operationalKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationDefinitionService';

/**
 * FASE 24.55
 *
 * Información semántica externa explícita mínima necesaria para
 * interpretar semánticamente la semántica declarada de un individuo
 * relacional structure-constituent previamente definido.
 *
 * interpretedStructureConstituentRelationSemanticRole declara
 * exclusivamente una caracterización semántica interpretada atribuida
 * externamente a la semántica previamente declarada de R.
 *
 * IMPORTANTE:
 *
 * RelationDefinition
 * !=
 * RelationSemanticInterpretation.
 *
 * También:
 *
 * declared relation semantics
 * !=
 * interpreted relation semantics
 * !=
 * canonical relation semantics
 * !=
 * validated relation semantics.
 *
 * interpretedStructureConstituentRelationSemanticRole NO constituye:
 *
 * - interpretación canónica;
 * - interpretación única;
 * - validación semántica;
 * - semantic correctness;
 * - semantic compatibility;
 * - semantic confidence;
 * - relation applicability;
 * - relation application;
 * - RelationRealization;
 * - realizationId;
 * - ConstituentMembership;
 * - membership materializado;
 * - membershipId;
 * - member-of;
 * - belongs-to;
 * - part-of;
 * - source;
 * - target;
 * - participant role;
 * - member role;
 * - container role;
 * - dirección relacional;
 * - orientación relacional;
 * - ConstituentDefinition;
 * - constituentSemanticRole;
 * - Requirement;
 * - requirementId;
 * - requirementSemanticRole;
 * - Slot;
 * - slotId;
 * - OperandRole;
 * - operandRole;
 * - expectedSemanticRole;
 * - mapping;
 * - correspondencia;
 * - satisfacción;
 * - OperationApplicability;
 * - OperationExecution;
 * - exact-match;
 * - exact-mismatch.
 *
 * Incluso un valor interpretado conceptualmente equivalente a:
 *
 * membership
 *
 * significa exclusivamente:
 *
 * "la semántica declarada de este individuo relacional ha recibido
 * externamente una caracterización interpretada equivalente a membership"
 *
 * y NO:
 *
 * "este Constituent pertenece formalmente a esta Structure".
 *
 * Tampoco determina todavía cómo participan Structure y Constituent
 * dentro de dicha semántica.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationInput =
  {
    interpretedStructureConstituentRelationSemanticRole: string;
  };

/**
 * FASE 24.55
 *
 * Materialización explícita del hecho:
 *
 * SemanticEvaluationOperationOperandRequirementsStructureConstituentRelationDefinition
 * +
 * explicit StructureConstituentRelationSemanticInterpretationInput
 * +
 * invocación explícita
 * ->
 * SemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretation
 *
 * StructureConstituentRelationDefinition constituye el único
 * fundamento interno inmediato.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - semanticEvaluationOperationOperandRequirementsStructureConstituentRelationDefinition
 * - structureConstituentRelationSemanticInterpretationInput
 *
 * y sólo añade interpretationType.
 *
 * Su significado es exclusivamente:
 *
 * la semántica declarada de un individuo relacional
 * structure-constituent previamente definido posee ahora una
 * caracterización semántica interpretada externa explícita.
 *
 * En particular:
 *
 * structure-constituent relation presence
 * !=
 * structure-constituent relation definition
 * !=
 * structure-constituent relation semantic interpretation
 * !=
 * semantic validation
 * !=
 * relation realization
 * !=
 * constituent membership
 * !=
 * interpreted domain fact.
 *
 * La interpretación NO requiere:
 *
 * - ParticipantsPresence;
 * - RelationRealization;
 * - participant roles;
 * - ConstituentDefinition.
 *
 * Y tampoco produce ninguno de ellos.
 *
 * La rama permanece completamente independiente de
 * SemanticEvaluationOperandsPresence.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretation =
  {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationDefinition:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationDefinition;

    structureConstituentRelationSemanticInterpretationInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationInput;

    interpretationType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation';
  };

/**
 * FASE 24.55
 *
 * Materializa explícitamente una interpretación semántica externa de
 * la semántica declarada de un individuo relacional
 * structure-constituent previamente definido.
 *
 * Deliberadamente NO existe aquí ninguna comprobación de:
 *
 * - identity match;
 * - semantic match;
 * - semantic mismatch;
 * - equivalencia;
 * - correspondencia;
 * - compatibilidad;
 * - validez;
 * - canonicalización.
 *
 * StructureConstituentRelationDefinition ya determina
 * inequívocamente:
 *
 * - structureConstituentRelationId;
 * - structureConstituentRelationSemanticRole.
 *
 * Por tanto, el input externo NO duplica ninguna de ambas propiedades.
 *
 * La nueva información introducida es exclusivamente:
 *
 * interpretedStructureConstituentRelationSemanticRole.
 *
 * La misma RelationDefinition puede recibir interpretaciones externas
 * distintas mediante invocaciones independientes.
 *
 * Definitions con semánticas declaradas distintas también pueden
 * recibir exactamente la misma interpretación externa.
 *
 * No se inspecciona computacionalmente
 * structureConstituentRelationSemanticRole para decidir qué
 * interpretación debe existir.
 *
 * Tampoco se leen ni interpretan:
 *
 * - structureId;
 * - constituentsId;
 * - constituentId;
 * - structureSemanticRole;
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
export function interpretProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelation(
  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationDefinition:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationDefinition,

  structureConstituentRelationSemanticInterpretationInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretationInput
): ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationSemanticInterpretation {
  return {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationDefinition,
    structureConstituentRelationSemanticInterpretationInput,
    interpretationType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-interpretation',
  };
}