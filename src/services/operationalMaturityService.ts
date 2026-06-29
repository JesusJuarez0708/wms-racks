export interface OperationalMaturity {
  score: number;

  level:
    | 'initial'
    | 'developing'
    | 'managed'
    | 'optimized'
    | 'excellent';

  title: string;

  recommendation: string;
}

export function calculateOperationalMaturity(
  healthScore: number,
  complianceScore: number,
  riskScore: number,
): OperationalMaturity {
  const HEALTH_WEIGHT = 0.45;
  const COMPLIANCE_WEIGHT = 0.35;
  const RISK_WEIGHT = 0.20;

  const score = Math.round(
    healthScore * HEALTH_WEIGHT +
      complianceScore * COMPLIANCE_WEIGHT +
      (100 - riskScore) * RISK_WEIGHT,
  );

  if (score >= 90) {
    return {
      score,
      level: 'excellent',
      title: 'Excelente',
      recommendation:
        'Mantener la estrategia actual y continuar innovando.',
    };
  }

  if (score >= 80) {
    return {
      score,
      level: 'optimized',
      title: 'Optimizado',
      recommendation:
        'Consolidar la mejora continua y automatizar procesos.',
    };
  }

  if (score >= 60) {
    return {
      score,
      level: 'managed',
      title: 'Gestionado',
      recommendation:
        'Fortalecer indicadores para alcanzar un nivel optimizado.',
    };
  }

  if (score >= 40) {
    return {
      score,
      level: 'developing',
      title: 'En desarrollo',
      recommendation:
        'Priorizar cumplimiento y reducción de riesgos.',
    };
  }

  return {
    score,
    level: 'initial',
    title: 'Inicial',
    recommendation:
      'Implementar acciones correctivas antes de escalar la operación.',
  };
}