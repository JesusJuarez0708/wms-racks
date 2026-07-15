import type { ReactNode } from 'react';

type ExecutiveSectionSpacing =
  | 'compact'
  | 'default'
  | 'spacious';

type ExecutiveSectionGap =
  | 'none'
  | 'compact'
  | 'default'
  | 'spacious';

type ExecutiveSectionProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  spacing?: ExecutiveSectionSpacing;
  gap?: ExecutiveSectionGap;
};

const spacingClasses: Record<
  ExecutiveSectionSpacing,
  string
> = {
  compact: 'space-y-4',
  default: 'space-y-6',
  spacious: 'space-y-8',
};

const gapClasses: Record<
  ExecutiveSectionGap,
  string
> = {
  none: '',
  compact: 'mt-4',
  default: 'mt-6',
  spacious: 'mt-8',
};

export function ExecutiveSection({
  children,
  className = '',
  contentClassName = '',
  spacing = 'default',
  gap = 'none',
}: ExecutiveSectionProps) {
  return (
    <section
      className={[
        'w-full',
        'scroll-mt-24',
        gapClasses[gap],
        className,
      ].join(' ')}
    >
      <div
        className={[
          spacingClasses[spacing],
          contentClassName,
        ].join(' ')}
      >
        {children}
      </div>
    </section>
  );
}