import type {
  IntelligentWorkOrderExecution,
  IntelligentWorkOrderStatus,
} from '../../services/intelligentWorkOrderExecutionService';

type Props = {
  intelligentExecution: IntelligentWorkOrderExecution | null;
};

function translateStatus(status: IntelligentWorkOrderStatus) {
  switch (status) {
    case 'suggested':
      return 'Sugerida';

    case 'approved':
      return 'Aprobada';

    case 'executing':
      return 'En ejecución';

    case 'completed':
      return 'Completada';

    default:
      return status;
  }
}

export function ExecutiveExecutionCenterSection({
  intelligentExecution,
}: Props) {
  if (!intelligentExecution) {
    return null;
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800">
        Centro de Ejecución de Órdenes Inteligentes
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Seguimiento ejecutivo del estado actual de la orden inteligente.
      </p>

      <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-medium text-slate-800">
              {intelligentExecution.title}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Responsable: {intelligentExecution.owner}
            </p>

            <p className="text-sm text-slate-500">
              Impacto esperado: {intelligentExecution.estimatedImpact}
            </p>

            <p className="text-sm text-slate-500">
              Avance: {intelligentExecution.progress}%
            </p>
          </div>

          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
            {translateStatus(intelligentExecution.status)}
          </span>
        </div>
      </div>
    </section>
  );
}