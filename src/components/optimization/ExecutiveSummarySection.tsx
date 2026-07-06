type ExecutiveSummary = {
  priority: 'high' | 'medium' | 'low';
  title: string;
  summary: string;
};

type ExecutiveSummarySectionProps = {
  executiveSummary: ExecutiveSummary | null;
  translateLevel: (level: string) => string;
};

function ExecutiveSummarySection({
  executiveSummary,
  translateLevel,
}: ExecutiveSummarySectionProps) {
  if (!executiveSummary) {
    return null;
  }

  return (
    <div className="mt-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Resumen Ejecutivo de Decisiones
        </p>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            executiveSummary.priority === 'high'
              ? 'bg-red-100 text-red-700'
              : executiveSummary.priority === 'medium'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-emerald-100 text-emerald-700'
          }`}
        >
          {translateLevel(executiveSummary.priority)}
        </span>
      </div>

      <h3 className="mt-3 text-lg font-bold text-slate-900">
        {executiveSummary.title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-600">
        {executiveSummary.summary}
      </p>
    </div>
  );
}

export default ExecutiveSummarySection;