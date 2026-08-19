import type { ProductiveKnowledgeAccess } from './operationalKnowledgeAccessService';

export type ProductiveKnowledgeConsumption = {
  access: ProductiveKnowledgeAccess;
};

export function consumeProductiveKnowledge(
  access: ProductiveKnowledgeAccess
): ProductiveKnowledgeConsumption {
  return {
    access,
  };
}