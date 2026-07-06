type ExecutiveActionPlanItem = {
  title: string;
  priority: 'high' | 'medium' | 'low';
  impact: string;
};

type ExecutiveActionPlanSectionProps = {
  actionPlan: ExecutiveActionPlanItem[];
  translateLevel: (level: string) => string;
};

function ExecutiveActionPlanSection({
  actionPlan,
  translateLevel,
}: ExecutiveActionPlanSectionProps) {
  if (actionPlan.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        Plan de Acción Inteligente
      </p>

      <div className="mt-4 space-y-3">
        {actionPlan.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            className="rounded-lg border border-slate-200 p-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-900">
                {index + 1}. {item.title}
              </h3>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  item.priority === 'high'
                    ? 'bg-red-100 text-red-700'
                    : item.priority === 'medium'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                {translateLevel(item.priority)}
              </span>
            </div>

            <p className="mt-2 text-sm text-slate-600">
              Impacto esperado: {item.impact}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExecutiveActionPlanSection;