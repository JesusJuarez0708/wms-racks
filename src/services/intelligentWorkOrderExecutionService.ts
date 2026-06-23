export type IntelligentWorkOrderStatus =
  | 'suggested'
  | 'approved'
  | 'executing'
  | 'completed';

export interface IntelligentWorkOrderExecution {
  id: string;
  title: string;
  status: IntelligentWorkOrderStatus;
  progress: number;
  owner: string;
  estimatedImpact: string;
}

export async function getIntelligentWorkOrderExecution(): Promise<
  IntelligentWorkOrderExecution
> {
  return {
    id: 'OT-PRED-001',
    title: 'Consolidación preventiva por saturación proyectada',
    status: 'approved',
    progress: 35,
    owner: 'Centro Ejecutivo CJWMS',
    estimatedImpact: 'Liberación estimada de posiciones estratégicas',
  };
}