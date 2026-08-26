import type {
  ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffect,
} from './operationalKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectService';

/**
 * FASE 24.35
 *
 * Información externa mínima necesaria para delimitar explícitamente
 * que un efecto deliberativo observable concreto entra dentro del
 * ámbito de una futura determinación de dirección.
 *
 * Este input NO define:
 *
 * - direction;
 * - axis;
 * - reference;
 * - positive / negative;
 * - support / opposition;
 * - strength / weight;
 * - importance / significance;
 * - impact;
 * - score / priority / confidence;
 * - comparison;
 * - preference;
 * - ranking;
 * - selection;
 * - decision.
 *
 * La mera coexistencia de:
 *
 * - EvaluationResultDeliberativeInfluenceEffect
 * - DirectionDeterminationScopeInput
 *
 * NO materializa automáticamente ningún scope.
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionDeterminationScopeInput =
  {
    deliberationId: string;
  };

/**
 * FASE 24.35
 *
 * Materialización explícita del hecho:
 *
 * EvaluationResultDeliberativeInfluenceEffect
 * +
 * DirectionDeterminationScopeInput
 * +
 * invocación explícita
 * ->
 * EvaluationResultDeliberativeInfluenceEffectDirectionDeterminationScope
 *
 * Esta entidad conserva exactamente por identidad:
 *
 * - evaluationResultDeliberativeInfluenceEffect
 * - scopeInput
 *
 * El Effect constituye el único fundamento interno inmediato.
 *
 * Esta entidad NO afirma todavía que el efecto tenga dirección.
 *
 * En particular:
 *
 * Observable Effect exists
 * !=
 * DirectionDeterminationScope exists
 * !=
 * Direction exists
 *
 * Además:
 *
 * Direction
 * !=
 * positive / negative
 * !=
 * support / opposition
 *
 * y:
 *
 * DirectionDeterminationScope
 * !=
 * Comparison
 * !=
 * Preference
 * !=
 * Ranking
 * !=
 * Selection
 * !=
 * Decision
 */
export type ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionDeterminationScope =
  {
    evaluationResultDeliberativeInfluenceEffect:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffect;

    scopeInput:
      ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionDeterminationScopeInput;

    scopeType:
      'explicit-evaluation-result-deliberative-influence-effect-direction-determination-scope';
  };

/**
 * Establece explícitamente que un efecto deliberativo observable
 * concreto entra dentro del ámbito de una futura determinación
 * de dirección.
 *
 * Sólo materializa el scope cuando scopeInput.deliberationId
 * coincide exactamente con el deliberationId del Effect.
 *
 * La coincidencia únicamente delimita el ámbito deliberativo.
 * NO determina:
 *
 * - un eje direccional;
 * - una referencia direccional;
 * - una dirección;
 * - polaridad positiva o negativa;
 * - apoyo u oposición;
 * - intensidad;
 * - peso;
 * - importancia;
 * - significancia;
 * - impacto;
 * - comparabilidad;
 * - preferencia;
 * - ranking;
 * - selección;
 * - decisión.
 */
export function establishProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionDeterminationScope(
  evaluationResultDeliberativeInfluenceEffect:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffect,
  scopeInput:
    ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionDeterminationScopeInput
):
  | ProductiveKnowledgeRecommendationEvaluationResultDeliberativeInfluenceEffectDirectionDeterminationScope
  | null {
  if (
    evaluationResultDeliberativeInfluenceEffect.observationInput
      .deliberationId !== scopeInput.deliberationId
  ) {
    return null;
  }

  return {
    evaluationResultDeliberativeInfluenceEffect,
    scopeInput,
    scopeType:
      'explicit-evaluation-result-deliberative-influence-effect-direction-determination-scope',
  };
}