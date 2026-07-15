import { ExecutivePanel } from '../executive/patterns/ExecutivePanel';

type ExecutiveNarrative = {
  summary: string;
};

type ExecutiveNarrativeSectionProps = {
  narrative: ExecutiveNarrative | null;
};

function ExecutiveNarrativeSection({
  narrative,
}: ExecutiveNarrativeSectionProps) {
  if (!narrative) {
    return null;
  }

  return (
    <ExecutivePanel
      title="Análisis Ejecutivo CJWMS"
      tone="dark"
      variant="panel"
      padding="compact"
      className="mt-6"
      contentClassName="mt-3"
    >
      <div className="space-y-2 text-sm text-slate-200">
        {narrative.summary.split('. ').map((line) => (
          <p key={line}>
            {line.trim().endsWith('.')
              ? line.trim()
              : `${line.trim()}.`}
          </p>
        ))}
      </div>
    </ExecutivePanel>
  );
}

export default ExecutiveNarrativeSection;