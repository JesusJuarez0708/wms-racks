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