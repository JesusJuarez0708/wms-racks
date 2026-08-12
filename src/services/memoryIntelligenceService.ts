import type { OperationalMemoryRecord } from '../repositories/operationalMemoryRepository';

export type MemoryInsight = {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  score: number;
};

export function analyzeOperationalMemories(
  memories: OperationalMemoryRecord[]
): MemoryInsight[] {
  const insights: MemoryInsight[] = [];

  const movementMemories = memories.filter(
    (memory) => memory.memory_type === 'movement'
  );

  const systemMemories = memories.filter(
    (memory) => memory.memory_type === 'system'
  );

  if (movementMemories.length > 0) {
    insights.push({
      id: 'movement-activity',
      title: 'Actividad operativa detectada',
      description: `El CJWMS ha registrado ${movementMemories.length} memorias relacionadas con movimientos operativos.`,
      severity: movementMemories.length >= 5 ? 'high' : 'medium',
      score: Math.min(100, movementMemories.length * 20),
    });
  }

  if (systemMemories.length > 0) {
    insights.push({
      id: 'system-memory',
      title: 'Memoria del sistema activa',
      description: `Existen ${systemMemories.length} memorias internas del sistema registradas correctamente.`,
      severity: 'low',
      score: Math.min(100, systemMemories.length * 10),
    });
  }

  const highScoreMemories = memories.filter(
    (memory) => (memory.score ?? 0) >= 90
  );

  if (highScoreMemories.length > 0) {
    insights.push({
      id: 'high-score-memory',
      title: 'Memorias de alto valor',
      description: `Se detectaron ${highScoreMemories.length} memorias con score mayor o igual a 90.`,
      severity: 'high',
      score: 95,
    });
  }

  const recommendationMemories = movementMemories.filter(
    (memory) =>
      memory.metadata?.recommendationComplied === true ||
      memory.metadata?.recommendationComplied === false
  );

  if (recommendationMemories.length > 0) {
    const compliedRecommendations = recommendationMemories.filter(
      (memory) =>
        memory.metadata?.recommendationComplied === true
    );

    const deviatedRecommendations = recommendationMemories.filter(
      (memory) =>
        memory.metadata?.recommendationComplied === false
    );

    const complianceRate = Math.round(
      (compliedRecommendations.length /
        recommendationMemories.length) *
        100
    );

    insights.push({
      id: 'recommendation-compliance',
      title: 'Cumplimiento de recomendación inteligente',
      description:
        `CJWMS evaluó ${recommendationMemories.length} decisiones con recomendación: ` +
        `${compliedRecommendations.length} cumplidas y ${deviatedRecommendations.length} desviadas. ` +
        `Cumplimiento observado: ${complianceRate}%.`,
      severity:
        complianceRate >= 80
          ? 'low'
          : complianceRate >= 50
            ? 'medium'
            : 'high',
      score: complianceRate,
    });

    const deviationReasonOccurrences = new Map<string, number>();

    deviatedRecommendations.forEach((memory) => {
      const deviationReason =
        memory.metadata?.recommendationDeviationReason;

      if (
        typeof deviationReason !== 'string' ||
        deviationReason.trim().length === 0
      ) {
        return;
      }

      const normalizedReason = deviationReason.trim();

      deviationReasonOccurrences.set(
        normalizedReason,
        (deviationReasonOccurrences.get(normalizedReason) ?? 0) + 1
      );
    });

    if (deviationReasonOccurrences.size > 0) {
      const [mostFrequentReason, occurrences] = [
        ...deviationReasonOccurrences.entries(),
      ].sort((a, b) => b[1] - a[1])[0];

      insights.push({
        id: 'recommendation-deviation-reason',
        title: 'Motivo recurrente de desviación',
        description:
          `El motivo de desviación más frecuente fue "${mostFrequentReason}", ` +
          `registrado ${occurrences} ${
            occurrences === 1 ? 'vez' : 'veces'
          } entre ${deviatedRecommendations.length} ${
            deviatedRecommendations.length === 1
              ? 'desviación evaluada'
              : 'desviaciones evaluadas'
          }.`,
        severity: occurrences >= 3 ? 'high' : 'medium',
        score: Math.min(100, occurrences * 25),
      });
    }
  }

  if (memories.length === 0) {
    insights.push({
      id: 'no-memory',
      title: 'Sin memoria operativa',
      description:
        'El CJWMS aún no tiene suficientes recuerdos para generar inteligencia operativa.',
      severity: 'low',
      score: 0,
    });
  }

  return insights;
}
