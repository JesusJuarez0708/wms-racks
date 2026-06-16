import { getOperationalMemories } from './operationalMemoryService';

export type MemoryPattern = {
  id: string;
  title: string;
  description: string;
  score: number;
  occurrences: number;
};

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

  return patterns;
}