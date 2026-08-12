import type { MemoryPattern } from './memoryPatternService';

export type OperationalKnowledgeType =
  'recurrent-recommendation-deviation';

export type OperationalKnowledge = {
  id: string;
  type: OperationalKnowledgeType;
  title: string;
  description: string;
  sourcePatternId: string;
  context: {
    movementType: string;
    deviationReason: string;
  };
  evidence: {
    occurrences: number;
    memoryIds: string[];
    score: number;
  };
};

const createRecommendationDeviationKnowledge = (
  pattern: MemoryPattern,
): OperationalKnowledge | null => {
  if (pattern.kind !== 'recommendation-deviation-recurrence') {
    return null;
  }

  if (!pattern.context) {
    return null;
  }

  if (!pattern.evidence) {
    return null;
  }

  if (pattern.occurrences < 2) {
    return null;
  }

  if (pattern.evidence.memoryIds.length < 2) {
    return null;
  }

  const { movementType, deviationReason } = pattern.context;

  if (!movementType.trim() || !deviationReason.trim()) {
    return null;
  }

  const uniqueMemoryIds = Array.from(
    new Set(
      pattern.evidence.memoryIds
        .map((memoryId) => memoryId.trim())
        .filter(Boolean),
    ),
  );

  if (uniqueMemoryIds.length < 2) {
    return null;
  }

  return {
    id: `operational-knowledge-${pattern.id}`,
    type: 'recurrent-recommendation-deviation',
    title: 'Conocimiento operativo de desviación recurrente',
    description:
      `Existe evidencia operativa recurrente de desviación de recomendación ` +
      `por el motivo "${deviationReason}" en movimientos de tipo ` +
      `"${movementType}", sustentada por ${pattern.occurrences} ` +
      `${pattern.occurrences === 1 ? 'ocurrencia' : 'ocurrencias'} observadas.`,
    sourcePatternId: pattern.id,
    context: {
      movementType,
      deviationReason,
    },
    evidence: {
      occurrences: pattern.occurrences,
      memoryIds: uniqueMemoryIds,
      score: pattern.score,
    },
  };
};

export const generateOperationalKnowledge = (
  patterns: MemoryPattern[],
): OperationalKnowledge[] => {
  return patterns
    .map(createRecommendationDeviationKnowledge)
    .filter(
      (knowledge): knowledge is OperationalKnowledge =>
        knowledge !== null,
    );
};