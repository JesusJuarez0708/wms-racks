type ExecutiveMetricCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  badge?: string;
  valueClassName?: string;
  className?: string;
};

export function ExecutiveMetricCard({
  title,
  value,
  subtitle,
  badge,
  valueClassName = 'text-slate-900',
  className = '',
}: ExecutiveMetricCardProps) {
  return (
    <div
      className={`rounded-lg bg-slate-50 px-3 py-3 transition-all duration-200 hover:bg-slate-100 hover:shadow-sm ${className}`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs uppercase tracking-wide text-slate-500">
          {title}
        </p>

        {badge && (
          <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-semibold uppercase text-slate-600">
            {badge}
          </span>
        )}
      </div>

      <p className={`mt-2 text-xl font-bold ${valueClassName}`}>
        {value}
      </p>

      {subtitle && (
        <p className="mt-1 text-xs text-slate-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}