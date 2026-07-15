import type { ReactNode } from 'react';

type ExecutiveSectionHeaderTone =
  | 'light'
  | 'dark';

type ExecutiveSectionHeaderSize =
  | 'compact'
  | 'default'
  | 'hero';

type ExecutiveSectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  badge?: ReactNode;
  actions?: ReactNode;
  className?: string;
  tone?: ExecutiveSectionHeaderTone;
  size?: ExecutiveSectionHeaderSize;
};

const toneClasses: Record<
  ExecutiveSectionHeaderTone,
  {
    eyebrow: string;
    title: string;
    description: string;
  }
> = {
  light: {
    eyebrow: 'text-cyan-600',
    title: 'text-slate-900',
    description: 'text-slate-500',
  },

  dark: {
    eyebrow: 'text-cyan-400',
    title: 'text-white',
    description: 'text-slate-300',
  },
};

const sizeClasses: Record<
  ExecutiveSectionHeaderSize,
  {
    title: string;
    description: string;
  }
> = {
  compact: {
    title: 'text-lg',
    description: 'text-xs leading-5',
  },

  default: {
    title: 'text-xl',
    description: 'text-sm leading-6',
  },

  hero: {
    title: 'text-3xl',
    description: 'text-base leading-7',
  },
};

export function ExecutiveSectionHeader({
  eyebrow,
  title,
  description,
  badge,
  actions,
  className = '',
  tone = 'light',
  size = 'default',
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
          <p
            className={[
              'text-xs',
              'font-semibold',
              'uppercase',
              'tracking-wider',
              toneClasses[tone].eyebrow,
            ].join(' ')}
          >
            {eyebrow}
          </p>
        )}

        <h2
          className={[
            eyebrow ? 'mt-2' : '',
            'font-bold',
            'tracking-tight',
            sizeClasses[size].title,
            toneClasses[tone].title,
          ].join(' ')}
        >
          {title}
        </h2>

        {description && (
          <p
            className={[
              'mt-2',
              'max-w-3xl',
              sizeClasses[size].description,
              toneClasses[tone].description,
            ].join(' ')}
          >
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