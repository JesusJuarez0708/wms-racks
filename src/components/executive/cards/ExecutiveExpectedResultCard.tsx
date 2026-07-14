import ExecutiveCard from '../ui/ExecutiveCard';

type ExecutiveExpectedResult = {
  expectedExecutiveScore: number;
  expectedRiskLevel: string;
  expectedMaturity: string;
};

type ExecutiveExpectedResultCardProps = {
  result: ExecutiveExpectedResult;
};

function getRiskClassName(riskLevel: string) {
  const normalizedRiskLevel = riskLevel.toLowerCase();

  if (
    normalizedRiskLevel === 'critical' ||
    normalizedRiskLevel === 'crítico' ||
    normalizedRiskLevel === 'critico' ||
    normalizedRiskLevel === 'high' ||
    normalizedRiskLevel === 'alto'
  ) {
    return 'text-red-600';
  }

  if (
    normalizedRiskLevel === 'medium' ||
    normalizedRiskLevel === 'medio'
  ) {
    return 'text-amber-600';
  }

  if (
    normalizedRiskLevel === 'low' ||
    normalizedRiskLevel === 'bajo'
  ) {
    return 'text-emerald-600';
  }

  return 'text-slate-900';
}

export function ExecutiveExpectedResultCard({
  result,
}: ExecutiveExpectedResultCardProps) {
  return (
    <ExecutiveCard
      variant="light"
      padding="default"
      className="p-5 hover:bg-white"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Resultado esperado
      </p>

      <div className="mt-4 space-y-4">
        <div>
          <p className="text-sm text-slate-500">
            Score Ejecutivo
          </p>

          <p className="text-3xl font-bold text-blue-600">
            {result.expectedExecutiveScore}/100
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Riesgo esperado
          </p>

          <p
            className={`text-xl font-bold ${getRiskClassName(
              result.expectedRiskLevel,
            )}`}
          >
            {result.expectedRiskLevel}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Madurez esperada
          </p>

          <p className="text-xl font-bold text-slate-900">
            {result.expectedMaturity}
          </p>
        </div>
      </div>
    </ExecutiveCard>
  );
}