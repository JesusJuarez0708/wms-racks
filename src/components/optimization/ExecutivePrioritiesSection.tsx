type ExecutivePriority = {
  rank: number;
  title: string;
  reason: string;
  expectedBenefit: string;
  priority: 'high' | 'medium' | 'low';
};

type ExecutivePrioritiesSectionProps = {
  executivePriorities: ExecutivePriority[];
  translateLevel: (
    level: string
  ) => string;
};

export function ExecutivePrioritiesSection({
  executivePriorities,
  translateLevel,
}: ExecutivePrioritiesSectionProps) {
  if (executivePriorities.length === 0) {
    return null;
  }

  return (
    <>
      {executivePriorities.length > 0 && (
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Centro de Prioridades Ejecutivas
          </p>

          <div className="mt-4 space-y-4">
            {executivePriorities.map((item) => (
              <div
                key={item.rank}
                className="rounded-lg border border-slate-200 p-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-lg font-bold text-slate-900">
                      #{item.rank} {item.title}
                    </p>

                    <p className="mt-2 text-sm text-slate-600">
                      {item.reason}
                    </p>

                    <p className="mt-2 text-sm font-medium text-slate-700">
                      {item.expectedBenefit}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
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
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}