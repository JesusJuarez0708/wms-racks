import type { ProductiveKnowledgeConsumption } from './operationalKnowledgeConsumptionService';

export type ProductiveKnowledgeUtilization = {
  consumption: ProductiveKnowledgeConsumption;
};

export function useProductiveKnowledge(
  consumption: ProductiveKnowledgeConsumption
): ProductiveKnowledgeUtilization {
  return {
    consumption,
  };
}