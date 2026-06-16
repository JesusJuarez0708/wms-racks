import type { MemoryPattern } from './memoryPatternService';

export type IntelligenceRecommendation = {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  score: number;
  sourcePatternId: string;
};

export function generateRecommendationsFromPatterns(
  patterns: MemoryPattern[]
): IntelligenceRecommendation[] {
  const recommendations: IntelligenceRecommendation[] = [];

  const movementPattern = patterns.find(
    (pattern) => pattern.id === 'movement-activity'
  );

  if (movementPattern && movementPattern.occurrences >= 1) {
    recommendations.push({
      id: 'review-movement-flow',
      title: 'Revisar flujo de movimientos',
      description:
        'El CJWMS detectó actividad operativa recurrente. Se recomienda revisar si los movimientos están generando reubicaciones innecesarias.',
      priority: movementPattern.occurrences >= 5 ? 'high' : 'medium',
      score: Math.min(100, movementPattern.score + 10),
      sourcePatternId: movementPattern.id,
    });
  }

  const highValuePattern = patterns.find(
    (pattern) => pattern.id === 'high-value-pattern'
  );

  if (highValuePattern && highValuePattern.occurrences >= 3) {
    recommendations.push({
      id: 'prioritize-high-score-actions',
      title: 'Priorizar acciones de alto valor',
      description:
        'Se detectaron múltiples memorias con score alto. Se recomienda revisar estas acciones como referencia para futuras decisiones operativas.',
      priority: 'high',
      score: 95,
      sourcePatternId: highValuePattern.id,
    });
  }

  const stabilityPattern = patterns.find(
    (pattern) => pattern.id === 'system-stability'
  );

  if (stabilityPattern && stabilityPattern.occurrences >= 5) {
    recommendations.push({
      id: 'maintain-memory-monitoring',
      title: 'Mantener monitoreo de memoria operativa',
      description:
        'El sistema muestra estabilidad en el registro de memorias. Se recomienda mantener el monitoreo activo para seguir acumulando experiencia operativa.',
      priority: 'low',
      score: 80,
      sourcePatternId: stabilityPattern.id,
    });
  }

  return recommendations;
}