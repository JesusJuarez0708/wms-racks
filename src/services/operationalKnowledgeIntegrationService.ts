import type { MovementRecord } from '../repositories/movementRepository';
import type {
  OperationalKnowledge,
  OperationalKnowledgeConsideration,
} from './operationalKnowledgeService';

export type ProductiveKnowledgeContext = {
  movementType: MovementRecord['movement_type'];
};

export type ProductiveKnowledgeInput = {
  knowledgeId: string;
  sourcePatternId: string;
  knowledgeType: OperationalKnowledge['type'];
  context: {
    movementType: MovementRecord['movement_type'];
    deviationReason: string;
  };
};

export function presentOperationalKnowledge(
  knowledge: OperationalKnowledge,
  consideration: OperationalKnowledgeConsideration | null,
  context: ProductiveKnowledgeContext,
): ProductiveKnowledgeInput | null {
  if (!consideration) {
    return null;
  }

  if (consideration.knowledgeId !== knowledge.id) {
    return null;
  }

  if (consideration.sourcePatternId !== knowledge.sourcePatternId) {
    return null;
  }

  const knowledgeMovementType =
    knowledge.context.movementType.trim();

  if (knowledgeMovementType !== context.movementType) {
    return null;
  }

  return {
    knowledgeId: knowledge.id,
    sourcePatternId: knowledge.sourcePatternId,
    knowledgeType: knowledge.type,
    context: {
      movementType: context.movementType,
      deviationReason: knowledge.context.deviationReason,
    },
  };
}