import type { ProductiveKnowledgeUtilization } from './operationalKnowledgeUtilizationService';

export type ProductiveKnowledgeInfluence = {
  utilization: ProductiveKnowledgeUtilization;
};

export function influenceProductiveKnowledge(
  utilization: ProductiveKnowledgeUtilization
): ProductiveKnowledgeInfluence {
  return {
    utilization,
  };
}