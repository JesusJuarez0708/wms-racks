import type { ReactNode } from 'react';

type ExecutiveMetricsGridProps = {
  children: ReactNode;
  className?: string;
};

export function ExecutiveMetricsGrid({
  children,
  className = '',
}: ExecutiveMetricsGridProps) {
  return (
    <div
      className={[
        'grid gap-4',
        'md:grid-cols-2',
        'xl:grid-cols-4',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}