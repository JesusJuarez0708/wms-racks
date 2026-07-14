import type { ReactNode } from 'react';

type ExecutiveSectionSpacing =
  | 'compact'
  | 'default'
  | 'spacious';

type ExecutiveSectionProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  spacing?: ExecutiveSectionSpacing;
};

const spacingClasses: Record<
  ExecutiveSectionSpacing,
  string
> = {
  compact: 'space-y-4',
  default: 'space-y-6',
  spacious: 'space-y-8',
};

export function ExecutiveSection({
  children,
  className = '',
  contentClassName = '',
  spacing = 'default',
}: ExecutiveSectionProps) {
  return (
    <section
      className={[
        'w-full',
        'scroll-mt-24',
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