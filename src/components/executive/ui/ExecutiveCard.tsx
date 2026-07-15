import type { ReactNode } from 'react';

type ExecutiveCardVariant =
  | 'hero'
  | 'panel'
  | 'surface';

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
  hero:
    'border-slate-800 bg-slate-950/90 shadow-lg shadow-slate-950/20 hover:-translate-y-0.5 hover:border-cyan-700/50 hover:shadow-xl hover:shadow-slate-950/30',

  panel:
    'border-slate-800/80 bg-slate-900/60 shadow-md shadow-slate-950/10 hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-900/80 hover:shadow-lg hover:shadow-slate-950/20',

  surface:
    'border-slate-200 bg-slate-50 shadow-sm shadow-slate-900/5 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:shadow-md hover:shadow-slate-900/10',
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
  variant = 'hero',
  padding = 'default',
}: ExecutiveCardProps) {
  return (
    <div
      className={[
        'rounded-2xl',
        'border',
        'backdrop-blur-sm',
        'will-change-transform',
        'transform-gpu',
        'transition-[transform,box-shadow,border-color,background-color]',
        'duration-300',
        'ease-out',
        'motion-reduce:transform-none',
        'motion-reduce:transition-none',
        variantClasses[variant],
        paddingClasses[padding],
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}