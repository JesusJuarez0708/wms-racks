import ExecutiveCard from '../ui/ExecutiveCard';

type ExecutiveExecutionStep = {
  recommendationId: string;
  order: number;
  title: string;
  estimatedBenefit: string;
};

type ExecutiveExecutionStepCardProps = {
  step: ExecutiveExecutionStep;
};

export function ExecutiveExecutionStepCard({
  step,
}: ExecutiveExecutionStepCardProps) {
  return (
    <ExecutiveCard
      variant="light"
      padding="default"
      className="hover:bg-white"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        Paso {step.order} · {step.recommendationId}
      </p>

      <h3 className="mt-1 text-sm font-semibold text-slate-900">
        {step.title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {step.estimatedBenefit}
      </p>
    </ExecutiveCard>
  );
}