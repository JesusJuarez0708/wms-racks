import type { ProductiveKnowledgeExposure } from './operationalKnowledgeExposureService';

export type ProductiveKnowledgeAccess = {
  exposure: ProductiveKnowledgeExposure;
};

export function accessProductiveKnowledge(
  exposure: ProductiveKnowledgeExposure
): ProductiveKnowledgeAccess {
  return {
    exposure,
  };
}