import type { ProductiveKnowledgeAvailability } from './operationalKnowledgeAvailabilityService';

export type ProductiveKnowledgeConsumerRef = {
  id: string;
};

export type ProductiveKnowledgeExposure = {
  availability: ProductiveKnowledgeAvailability;
  consumer: ProductiveKnowledgeConsumerRef;
};

export function exposeProductiveKnowledge(
  availability: ProductiveKnowledgeAvailability,
  consumer: ProductiveKnowledgeConsumerRef
): ProductiveKnowledgeExposure {
  return {
    availability,
    consumer,
  };
}