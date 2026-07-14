type ExecutiveCompliance = {
  complianceRate: number;
  status: 'completed' | 'in_progress' | string;
  statusLabel: string;
  summary: string;
};

type ExecutiveComplianceSectionProps = {
  compliance: ExecutiveCompliance | null;
};

function ExecutiveComplianceSection({
  compliance,
}: ExecutiveComplianceSectionProps) {
  if (!compliance) {
    return null;
  }

  return (
    <div className="mt-6 rounded-xl border bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        Cumplimiento Operativo
      </p>

      <div className="mt-4 flex items-center justify-between gap-6">
        <div>
          <p className="text-3xl font-bold text-slate-900">
            {compliance.complianceRate}%
          </p>

          <span
            className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold ${
              compliance.status === 'completed'
                ? 'bg-emerald-100 text-emerald-700'
                : compliance.status === 'in_progress'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-slate-100 text-slate-700'
            }`}
          >
            {compliance.statusLabel}
          </span>
        </div>

        <div className="flex-1">
          <div className="h-3 rounded-full bg-slate-200">
            <div
              className="h-3 rounded-full bg-blue-500"
              style={{
                width: `${compliance.complianceRate}%`,
              }}
            />
          </div>

          <p className="mt-3 text-sm text-slate-600">
            {compliance.summary}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ExecutiveComplianceSection;