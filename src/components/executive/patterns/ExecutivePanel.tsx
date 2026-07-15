import type { ReactNode } from 'react';

import ExecutiveCard from '../ui/ExecutiveCard';
import { ExecutiveSectionHeader } from '../ui/ExecutiveSectionHeader';

type ExecutivePanelTone =
  | 'light'
  | 'dark';

type ExecutivePanelVariant =
  | 'hero'
  | 'panel'
  | 'surface';

type ExecutivePanelPadding =
  | 'compact'
  | 'default'
  | 'spacious';

type ExecutivePanelProps = {
  children: ReactNode;
  title: string;
  eyebrow?: string;
  description?: string;
  badge?: ReactNode;
  actions?: ReactNode;
  className?: string;
  contentClassName?: string;
  tone?: ExecutivePanelTone;
  variant?: ExecutivePanelVariant;
  padding?: ExecutivePanelPadding;
};

export function ExecutivePanel({
  children,
  title,
  eyebrow,
  description,
  badge,
  actions,
  className = '',
  contentClassName = '',
  tone = 'light',
  variant = 'surface',
  padding = 'default',
}: ExecutivePanelProps) {
  return (
    <ExecutiveCard
      variant={variant}
      padding={padding}
      className={className}
    >
      <ExecutiveSectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        badge={badge}
        actions={actions}
        tone={tone}
        size="compact"
      />

      <div
        className={[
          'mt-5',
          contentClassName,
        ].join(' ')}
      >
        {children}
      </div>
    </ExecutiveCard>
  );
}