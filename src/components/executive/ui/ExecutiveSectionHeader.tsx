import type { ReactNode } from 'react';

type ExecutiveSectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  badge?: ReactNode;
  actions?: ReactNode;
  className?: string;
};

export function ExecutiveSectionHeader({
  eyebrow,
  title,
  description,
  badge,
  actions,
  className = '',
}: ExecutiveSectionHeaderProps) {
  return (
    <div
      className={[
        'flex',
        'flex-col',
        'gap-4',
        'sm:flex-row',
        'sm:items-start',
        'sm:justify-between',
        className,
      ].join(' ')}
    >
      <div className="min-w-0">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-wider text-cyan-600">
            {eyebrow}
          </p>
        )}

        <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900">
          {title}
        </h2>

        {description && (
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
            {description}
          </p>
        )}
      </div>

      {(badge || actions) && (
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {badge}
          {actions}
        </div>
      )}
    </div>
  );
}