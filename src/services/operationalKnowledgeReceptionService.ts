import type { ProductiveKnowledgeInput } from './operationalKnowledgeIntegrationService';

export type ProductiveKnowledgeReception = {
  input: ProductiveKnowledgeInput;
};

export function receiveProductiveKnowledge(
  input: ProductiveKnowledgeInput
): ProductiveKnowledgeReception {
  return {
    input,
  };
}