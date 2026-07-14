import type { ReactNode } from 'react';

type ExecutiveBadgeVariant =
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger';

type ExecutiveBadgeSize =
  | 'sm'
  | 'md';

type ExecutiveBadgeProps = {
  children: ReactNode;
  variant?: ExecutiveBadgeVariant;
  size?: ExecutiveBadgeSize;
  className?: string;
};

const variantClasses: Record<
  ExecutiveBadgeVariant,
  string
> = {
  neutral:
    'border-slate-200 bg-slate-100 text-slate-600',

  info:
    'border-blue-200 bg-blue-50 text-blue-700',

  success:
    'border-emerald-200 bg-emerald-50 text-emerald-700',

  warning:
    'border-amber-200 bg-amber-50 text-amber-700',

  danger:
    'border-red-200 bg-red-50 text-red-700',
};

const sizeClasses: Record<
  ExecutiveBadgeSize,
  string
> = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-3 py-1 text-xs',
};

export function ExecutiveBadge({
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
}: ExecutiveBadgeProps) {
  return (
    <span
      className={[
        'inline-flex',
        'items-center',
        'justify-center',
        'rounded-full',
        'border',
        'font-semibold',
        'uppercase',
        'tracking-wide',
        'whitespace-nowrap',
        'transition-colors',
        'duration-200',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  );
}