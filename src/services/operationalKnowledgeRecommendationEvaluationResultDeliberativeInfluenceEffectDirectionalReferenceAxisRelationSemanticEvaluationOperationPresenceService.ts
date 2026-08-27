import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperandsPresence,
} from './operationalKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperandsPresenceService';

/**
 * FASE 24.43
 *
 * Información externa mínima necesaria para presentar explícitamente
 * una operación destinada a una futura evaluación semántica de los
 * operandos previamente designados para la relación reference-axis.
 *
 * operationId identifica exclusivamente una operación evaluativa
 * externa.
 *
 * Este input NO define:
 *
 * - qué significa la operación;
 * - qué algoritmo ejecuta;
 * - igualdad textual;
 * - desigualdad;
 * - exact-match / exact-mismatch;
 * - compatibilidad semántica;
 * - inclusión;
 * - membership;
 * - correspondence;
 * - equivalence;
 * - similarity;
 * - interpretación de los operandos;
 * - aplicación de la operación;
 * - evaluación;
 * - comparación;
 * - resultado descriptivo;
 * - satisfacción semántica;
 * - condición;
 * - satisfacción de condición;
 * - assessment;
 * - correspondence result;
 * - DirectionalReferenceAxisCorrespondence;
 * - correspondencia con el Effect;
 * - aplicabilidad al Effect;
 * - DirectionDetermination;
 * - Direction.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationInput =
  {
    relationId: string;
    operationId: string;
  };

/**
 * FASE 24.43
 *
 * Materialización explícita del hecho:
 *
 * SemanticEvaluationOperandsPresence
 * +
 * SemanticEvaluationOperationInput
 * +
 * identidad exacta de relationId
 * +
 * invocación explícita
 * ->
 * SemanticEvaluationOperationPresence
 *
 * SemanticEvaluationOperandsPresence constituye el único fundamento
 * interno inmediato.
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - semanticEvaluationOperandsPresence
 * - evaluationOperationInput
 *
 * y únicamente afirma que una operación evaluativa externa ha sido
 * presentada explícitamente para la futura evaluación de los
 * operandos ya designados.
 *
 * En particular:
 *
 * operands designated
 * !=
 * evaluation operation present
 * !=
 * evaluation operation defined
 * !=
 * operands evaluated
 * !=
 * semantic comparison
 * !=
 * descriptive result
 * !=
 * semantic satisfaction
 * !=
 * correspondence assessment
 * !=
 * correspondence result
 * !=
 * Correspondence
 *
 * relationSemanticRole, referenceSemanticRole y axisSubject
 * permanecen deliberadamente opacos para este servicio.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationPresence =
  {
    semanticEvaluationOperandsPresence:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperandsPresence;

    evaluationOperationInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationInput;

    presenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-present';
  };

/**
 * Presenta explícitamente una operación externa destinada a una
 * futura evaluación semántica de los operandos reference-axis.
 *
 * La única comprobación realizada es identidad estructural:
 *
 * SemanticEvaluationOperandsPresence.relationId
 * ===
 * SemanticEvaluationOperationInput.relationId
 *
 * Un mismatch devuelve null porque el input pretende presentar una
 * operación para una relación distinta de la que fundamenta los
 * operandos.
 *
 * Esta comprobación NO interpreta:
 *
 * - referenceOperand;
 * - axisOperand;
 * - referenceSemanticRole;
 * - axisSubject;
 * - relationSemanticRole;
 * - operationId.
 *
 * Tampoco ejecuta ninguna operación semántica.
 */
export function establishProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationPresence(
  semanticEvaluationOperandsPresence:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperandsPresence,
  evaluationOperationInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationInput
):
  | ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionalReferenceAxisRelationSemanticEvaluationOperationPresence
  | null {
  if (
    semanticEvaluationOperandsPresence.evaluationOperandsInput.relationId !==
    evaluationOperationInput.relationId
  ) {
    return null;
  }

  return {
    semanticEvaluationOperandsPresence,
    evaluationOperationInput,
    presenceType:
      'explicit-evaluation-result-deliberative-influence-effect-directional-reference-axis-relation-semantic-evaluation-operation-present',
  };
}
