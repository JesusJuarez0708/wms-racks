import type { ProductiveKnowledgeReception } from './operationalKnowledgeReceptionService';

export type ProductiveKnowledgeAvailability = {
  reception: ProductiveKnowledgeReception;
};

export function makeProductiveKnowledgeAvailable(
  reception: ProductiveKnowledgeReception
): ProductiveKnowledgeAvailability {
  return {
    reception,
  };
}