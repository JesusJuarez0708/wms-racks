import ExecutiveCard from './ExecutiveCard';
import { ExecutiveBadge } from './ExecutiveBadge';

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
    <ExecutiveCard
      variant="surface"
      padding="compact"
      className={className}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs uppercase tracking-wide text-slate-500">
          {title}
        </p>

        {badge && (
          <ExecutiveBadge size="sm">
            {badge}
          </ExecutiveBadge>
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
    </ExecutiveCard>
  );
}