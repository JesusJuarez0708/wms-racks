import { getOperationalMemories } from './operationalMemoryService';

export type MemoryPattern = {
  id: string;
  title: string;
  description: string;
  score: number;
  occurrences: number;
};

type RecommendationDeviationPatternGroup = {
  movementType: string;
  deviationReason: string;
  occurrences: number;
};

const MIN_RECURRENT_DEVIATION_OCCURRENCES = 2;

function normalizePatternIdValue(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function detectRecommendationDeviationPatterns(
  memories: Awaited<ReturnType<typeof getOperationalMemories>>
): MemoryPattern[] {
  const groupedDeviations = new Map<
    string,
    RecommendationDeviationPatternGroup
  >();

  memories.forEach((memory) => {
    if (memory.memory_type !== 'movement') {
      return;
    }

    if (memory.metadata?.recommendationComplied !== false) {
      return;
    }

    const movementType = memory.metadata?.movementType;
    const deviationReason =
      memory.metadata?.recommendationDeviationReason;

    if (
      typeof movementType !== 'string' ||
      movementType.trim().length === 0 ||
      typeof deviationReason !== 'string' ||
      deviationReason.trim().length === 0
    ) {
      return;
    }

    const normalizedMovementType = movementType.trim();
    const normalizedDeviationReason = deviationReason.trim();

    const groupKey = JSON.stringify([
      normalizedMovementType,
      normalizedDeviationReason,
    ]);

    const currentGroup = groupedDeviations.get(groupKey);

    if (currentGroup) {
      currentGroup.occurrences += 1;
      return;
    }

    groupedDeviations.set(groupKey, {
      movementType: normalizedMovementType,
      deviationReason: normalizedDeviationReason,
      occurrences: 1,
    });
  });

  return [...groupedDeviations.values()]
    .filter(
      (group) =>
        group.occurrences >= MIN_RECURRENT_DEVIATION_OCCURRENCES
    )
    .sort((a, b) => b.occurrences - a.occurrences)
    .map((group) => ({
      id:
        'recommendation-deviation-pattern-' +
        `${normalizePatternIdValue(group.movementType)}-` +
        normalizePatternIdValue(group.deviationReason),
      title: 'Patrón recurrente de desviación de recomendación',
      description:
        `Se detectó que el motivo "${group.deviationReason}" ` +
        `se repitió ${group.occurrences} ${
          group.occurrences === 1 ? 'vez' : 'veces'
        } en movimientos de tipo "${group.movementType}".`,
      score: Math.min(100, group.occurrences * 25),
      occurrences: group.occurrences,
    }));
}

export async function detectMemoryPatterns(): Promise<MemoryPattern[]> {
  const memories = await getOperationalMemories();

  const patterns: MemoryPattern[] = [];

  const movementMemories = memories.filter(
    (memory) => memory.memory_type === 'movement'
  );

  if (movementMemories.length >= 1) {
    patterns.push({
      id: 'movement-activity',
      title: 'Actividad Operativa Recurrente',
      description: `Se detectaron ${movementMemories.length} memorias relacionadas con movimientos.`,
      score: Math.min(movementMemories.length * 20, 100),
      occurrences: movementMemories.length,
    });
  }

  const highValueMemories = memories.filter(
    (memory) => (memory.score ?? 0) >= 90
  );

  if (highValueMemories.length >= 3) {
    patterns.push({
      id: 'high-value-pattern',
      title: 'Memorias de Alto Valor',
      description: `Se detectaron ${highValueMemories.length} memorias con score alto.`,
      score: 95,
      occurrences: highValueMemories.length,
    });
  }

  const systemMemories = memories.filter(
    (memory) => memory.memory_type === 'system'
  );

  if (systemMemories.length >= 5) {
    patterns.push({
      id: 'system-stability',
      title: 'Estabilidad Operativa',
      description: `El sistema ha generado ${systemMemories.length} memorias internas correctamente.`,
      score: 90,
      occurrences: systemMemories.length,
    });
  }

  patterns.push(...detectRecommendationDeviationPatterns(memories));

  return patterns;
}