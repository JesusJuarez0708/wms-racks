import type { ReactNode } from 'react';

type ExecutiveCardVariant =
  | 'default'
  | 'subtle'
  | 'light';

type ExecutiveCardPadding =
  | 'none'
  | 'compact'
  | 'default'
  | 'spacious';

type ExecutiveCardProps = {
  children: ReactNode;
  className?: string;
  variant?: ExecutiveCardVariant;
  padding?: ExecutiveCardPadding;
};

const variantClasses: Record<
  ExecutiveCardVariant,
  string
> = {
  default:
    'border-slate-800 bg-slate-950/80 shadow-sm hover:border-cyan-700/40 hover:shadow-lg',

  subtle:
    'border-slate-800/80 bg-slate-900/60 shadow-sm hover:border-slate-700 hover:bg-slate-900/80',

  light:
    'border-slate-200 bg-slate-50 shadow-none hover:border-slate-300 hover:bg-slate-100 hover:shadow-sm',
};

const paddingClasses: Record<
  ExecutiveCardPadding,
  string
> = {
  none: '',
  compact: 'px-3 py-3',
  default: 'p-6',
  spacious: 'p-8',
};

export default function ExecutiveCard({
  children,
  className = '',
  variant = 'default',
  padding = 'default',
}: ExecutiveCardProps) {
  return (
    <div
      className={[
        'rounded-2xl',
        'border',
        'backdrop-blur-sm',
        'transition-all',
        'duration-300',
        variantClasses[variant],
        paddingClasses[padding],
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}