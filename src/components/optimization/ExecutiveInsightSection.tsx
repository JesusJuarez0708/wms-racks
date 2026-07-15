import type { ExecutiveInsight } from '../../services/executiveInsightService';

import { ExecutiveBadge } from '../executive/ui/ExecutiveBadge';
import { ExecutiveInfoBlock } from '../executive/patterns/ExecutiveInfoBlock';
import { ExecutivePanel } from '../executive/patterns/ExecutivePanel';

type ExecutiveInsightSectionProps = {
  insight: ExecutiveInsight | null;
};

const urgencyLabels: Record<
  ExecutiveInsight['urgency'],
  string
> = {
  critical: 'Crítica',
  high: 'Alta',
  medium: 'Media',
  low: 'Baja',
};

const urgencyVariants: Record<
  ExecutiveInsight['urgency'],
  'danger' | 'warning' | 'info' | 'success'
> = {
  critical: 'danger',
  high: 'warning',
  medium: 'info',
  low: 'success',
};

export function ExecutiveInsightSection({
  insight,
}: ExecutiveInsightSectionProps) {
  if (!insight) {
    return null;
  }

  return (
    <ExecutivePanel
      eyebrow="Executive Intelligence Layer"
      title={insight.headline}
      description={insight.situation}
      tone="dark"
      variant="hero"
      className="mt-6"
      badge={
        <ExecutiveBadge variant={urgencyVariants[insight.urgency]}>
          Urgencia {urgencyLabels[insight.urgency]}
        </ExecutiveBadge>
      }
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
        <ExecutiveInfoBlock
          label="Acción ejecutiva principal"
          tone="dark"
          contentClassName="text-base font-semibold text-white"
        >
          {insight.primaryAction}
        </ExecutiveInfoBlock>

        <ExecutiveInfoBlock
          label="Confianza del insight"
          tone="dark"
          contentClassName="text-3xl font-bold text-cyan-400"
        >
          {insight.confidence}%
        </ExecutiveInfoBlock>
      </div>
    </ExecutivePanel>
  );
}