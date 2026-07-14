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
    <div className="mt-6 rounded-xl border border-slate-700 bg-slate-900 p-4">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
        Análisis Ejecutivo CJWMS
      </div>

      <div className="space-y-2 text-sm text-slate-200">
        {narrative.summary.split('. ').map((line) => (
          <p key={line}>
            {line.trim().endsWith('.') ? line.trim() : `${line.trim()}.`}
          </p>
        ))}
      </div>
    </div>
  );
}

export default ExecutiveNarrativeSection;