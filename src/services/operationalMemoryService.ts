import {
  createOperationalMemory,
  fetchOperationalMemories,
  type CreateOperationalMemory,
  type OperationalMemoryRecord,
} from '../repositories/operationalMemoryRepository';

export type OperationalMemoryType =
  | 'recommendation'
  | 'movement'
  | 'optimization'
  | 'inventory'
  | 'operator'
  | 'system';

export type RegisterOperationalMemoryPayload = {
  memoryType: OperationalMemoryType;
  entityId?: string;
  entityType?: string;
  title: string;
  description?: string;
  score?: number;
  metadata?: Record<string, unknown>;
};

export async function registerOperationalMemory(
  payload: RegisterOperationalMemoryPayload
): Promise<OperationalMemoryRecord | null> {
  const memoryPayload: CreateOperationalMemory = {
    memory_type: payload.memoryType,
    entity_id: payload.entityId,
    entity_type: payload.entityType,
    title: payload.title,
    description: payload.description,
    score: payload.score ?? 0,
    metadata: payload.metadata ?? {},
  };

  return createOperationalMemory(memoryPayload);
}

export async function getOperationalMemories(): Promise<
  OperationalMemoryRecord[]
> {
  return fetchOperationalMemories();
}