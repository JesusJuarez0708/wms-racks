import { trackOperationalExecution } from './operationalExecutionTrackingService';

export type OperationalCompliance = {
  complianceRate: number;
  status: 'not_started' | 'in_progress' | 'completed';
  statusLabel: string;
  summary: string;
};

export async function calculateOperationalCompliance(): Promise<OperationalCompliance> {
  const execution = await trackOperationalExecution();

  const complianceRate = execution.executionProgress;

  if (complianceRate >= 100) {
    return {
      complianceRate,
      status: 'completed',
      statusLabel: 'COMPLETADO',
      summary:
        'El plan operativo fue ejecutado en su totalidad.',
    };
  }

  if (complianceRate > 0) {
    return {
      complianceRate,
      status: 'in_progress',
      statusLabel: 'EN PROGRESO',
      summary:
        'El plan operativo se encuentra en ejecución parcial.',
    };
  }

  return {
    complianceRate,
    status: 'not_started',
    statusLabel: 'SIN INICIAR',
    summary:
      'El plan operativo aún no registra acciones ejecutadas.',
  };
}