import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationPresence,
} from './operationalKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationPresenceService';

/**
 * FASE 24.52
 *
 * Información semántica externa explícita mínima necesaria para
 * definir semánticamente un individuo relacional structure-constituent
 * previamente presentado.
 *
 * structureConstituentRelationId identifica exactamente qué individuo
 * relacional previamente presentado pretende ser definido.
 *
 * structureConstituentRelationSemanticRole declara exclusivamente
 * el significado semántico atribuido explícitamente a dicho individuo.
 *
 * IMPORTANTE:
 *
 * structureConstituentRelationSemanticRole NO constituye:
 *
 * - ConstituentMembership;
 * - membership materializado;
 * - member-of;
 * - belongs-to;
 * - part-of;
 * - source;
 * - target;
 * - dirección relacional;
 * - orientación relacional;
 * - participante estructural explícito;
 * - participante constituyente explícito;
 * - definición semántica del constituyente;
 * - constituentSemanticRole;
 * - requirement;
 * - requirementId;
 * - requirementSemanticRole;
 * - slot;
 * - slotId;
 * - operand;
 * - operandId;
 * - operandRole;
 * - expectedSemanticRole;
 * - mapping;
 * - correspondencia;
 * - satisfacción;
 * - applicability;
 * - execution;
 * - exact-match;
 * - exact-mismatch.
 *
 * Incluso un valor semántico conceptualmente equivalente a:
 *
 * structure-constituent-membership-semantics
 *
 * significa exclusivamente:
 *
 * "este individuo relacional ha sido definido declarativamente
 * con semántica de membership"
 *
 * y NO:
 *
 * "este constituyente es formalmente miembro de esta estructura".
 *
 * La semántica declarada permanece deliberadamente opaca para
 * este servicio. Se conserva, pero no se interpreta.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationDefinitionInput =
  {
    structureConstituentRelationId: string;
    structureConstituentRelationSemanticRole: string;
  };

/**
 * FASE 24.52
 *
 * Materialización explícita del hecho:
 *
 * SemanticEvaluationOperationOperandRequirementsStructureConstituentRelationPresence
 * +
 * explicit StructureConstituentRelationDefinitionInput
 * +
 * identidad exacta de structureConstituentRelationId
 * +
 * invocación explícita
 * ->
 * SemanticEvaluationOperationOperandRequirementsStructureConstituentRelationDefinition
 *
 * StructureConstituentRelationPresence constituye el único
 * fundamento interno inmediato.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - semanticEvaluationOperationOperandRequirementsStructureConstituentRelationPresence
 * - structureConstituentRelationDefinitionInput
 *
 * y sólo añade definitionType.
 *
 * Su significado es exclusivamente:
 *
 * un individuo relacional structure-constituent previamente
 * presentado posee ahora una semántica explícitamente declarada.
 *
 * En particular:
 *
 * structure-constituent relation presence
 * !=
 * structure-constituent relation definition
 * !=
 * constituent membership
 * !=
 * constituent definition
 * !=
 * requirement presence
 * !=
 * requirement definition
 * !=
 * slot presence
 * !=
 * operand role
 * !=
 * expectedSemanticRole
 * !=
 * requirements / operands correspondence
 * !=
 * requirements satisfaction
 * !=
 * operation applicability
 * !=
 * operation execution
 *
 * Además:
 *
 * relation semantic definition
 * !=
 * realization of relation semantics.
 *
 * Por tanto:
 *
 * Definition(R, membership-semantics)
 * !=
 * Membership(S, C).
 *
 * La genealogía previamente conservada sigue siendo únicamente
 * genealogía contextual.
 *
 * NO se promueven structureId ni constituentId a participantes
 * relacionales explícitos.
 *
 * La rama permanece completamente independiente de
 * SemanticEvaluationOperandsPresence.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationDefinition =
  {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationPresence:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationPresence;

    structureConstituentRelationDefinitionInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationDefinitionInput;

    definitionType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-definition';
  };

/**
 * FASE 24.52
 *
 * Define semánticamente de forma explícita un individuo relacional
 * structure-constituent previamente presentado.
 *
 * La única comprobación realizada aquí es identidad:
 *
 * StructureConstituentRelationPresence
 *   .structureConstituentRelationPresenceInput
 *   .structureConstituentRelationId
 * ===
 * StructureConstituentRelationDefinitionInput
 *   .structureConstituentRelationId
 *
 * Un mismatch devuelve null porque el input pretende definir
 * un individuo relacional distinto del que fundamenta el nuevo nodo.
 *
 * Esta comprobación constituye exclusivamente identidad contextual
 * del individuo relacional definido.
 *
 * NO constituye:
 *
 * - validación del significado declarado;
 * - canonicalización semántica;
 * - unicidad de definición;
 * - resolución de definiciones múltiples;
 * - conflicto semántico;
 * - compatibilidad;
 * - ConstituentMembership;
 * - membership;
 * - member-of;
 * - belongs-to;
 * - part-of;
 * - definición semántica del constituyente;
 * - requirement;
 * - slot;
 * - operand role;
 * - expectedSemanticRole;
 * - correspondencia;
 * - satisfacción;
 * - applicability;
 * - execution.
 *
 * Deliberadamente NO se inspecciona ni interpreta:
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
 *
 * Tampoco se interpreta computacionalmente:
 *
 * - structureConstituentRelationSemanticRole.
 */
export function defineProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelation(
  semanticEvaluationOperationOperandRequirementsStructureConstituentRelationPresence:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationPresence,
  structureConstituentRelationDefinitionInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationDefinitionInput
):
  | ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationOperandRequirementsStructureConstituentRelationDefinition
  | null {
  if (
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationPresence
      .structureConstituentRelationPresenceInput
      .structureConstituentRelationId !==
    structureConstituentRelationDefinitionInput.structureConstituentRelationId
  ) {
    return null;
  }

  return {
    semanticEvaluationOperationOperandRequirementsStructureConstituentRelationPresence,
    structureConstituentRelationDefinitionInput,
    definitionType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-operand-requirements-structure-constituent-relation-semantic-definition',
  };
}