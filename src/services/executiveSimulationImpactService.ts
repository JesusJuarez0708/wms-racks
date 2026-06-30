export interface ExecutiveSimulationImpact {
  id: string;
  title: string;
  description: string;
  currentScore: number;
  projectedScore: number;
  currentCompliance: number;
  projectedCompliance: number;
  currentAlerts: number;
  projectedAlerts: number;
  currentRisk: number;
  projectedRisk: number;
  maturityImpact: string;
  recommendation: string;
}

export function simulateExecutiveImpact(
  executiveScore: number,
  compliance: number,
  activeAlerts: number,
  riskScore: number,
): ExecutiveSimulationImpact[] {
  return [
    {
      id: 'SIM-001',
      title: 'Ejecutar recomendaciones críticas',
      description:
        'Simula el impacto de atender primero las recomendaciones estratégicas de mayor prioridad.',
      currentScore: executiveScore,
      projectedScore: Math.min(executiveScore + 18, 100),
      currentCompliance: compliance,
      projectedCompliance: Math.min(compliance + 20, 100),
      currentAlerts: activeAlerts,
      projectedAlerts: Math.max(activeAlerts - 2, 0),
      currentRisk: riskScore,
      projectedRisk: Math.max(riskScore - 15, 0),
      maturityImpact: 'Posible avance hacia el siguiente nivel de madurez.',
      recommendation:
        'Priorizar recomendaciones críticas antes de iniciar mejoras de capacidad.',
    },
    {
      id: 'SIM-002',
      title: 'Reducir alertas activas',
      description:
        'Simula el efecto de resolver alertas operativas abiertas.',
      currentScore: executiveScore,
      projectedScore: Math.min(executiveScore + 10, 100),
      currentCompliance: compliance,
      projectedCompliance: Math.min(compliance + 8, 100),
      currentAlerts: activeAlerts,
      projectedAlerts: Math.max(activeAlerts - 3, 0),
      currentRisk: riskScore,
      projectedRisk: Math.max(riskScore - 20, 0),
      maturityImpact: 'Mejora la estabilidad ejecutiva del almacén.',
      recommendation:
        'Resolver primero las alertas críticas y de alto impacto.',
    },
    {
      id: 'SIM-003',
      title: 'Incrementar cumplimiento operativo',
      description:
        'Simula una mejora del cumplimiento mediante ejecución disciplinada del roadmap.',
      currentScore: executiveScore,
      projectedScore: Math.min(executiveScore + 14, 100),
      currentCompliance: compliance,
      projectedCompliance: Math.min(compliance + 25, 100),
      currentAlerts: activeAlerts,
      projectedAlerts: Math.max(activeAlerts - 1, 0),
      currentRisk: riskScore,
      projectedRisk: Math.max(riskScore - 10, 0),
      maturityImpact: 'Aumenta la probabilidad de pasar a En desarrollo.',
      recommendation:
        'Asignar responsables por acción y medir cumplimiento diario.',
    },
    {
      id: 'SIM-004',
      title: 'Ejecutar Plan Ejecutivo',
      description:
        'Simula el impacto de ejecutar la secuencia priorizada del planificador ejecutivo.',
      currentScore: executiveScore,
      projectedScore: Math.min(executiveScore + 24, 100),
      currentCompliance: compliance,
      projectedCompliance: Math.min(compliance + 30, 100),
      currentAlerts: activeAlerts,
      projectedAlerts: Math.max(activeAlerts - 4, 0),
      currentRisk: riskScore,
      projectedRisk: Math.max(riskScore - 25, 0),
      maturityImpact: 'Mayor impacto esperado sobre score, riesgo y madurez.',
      recommendation:
        'Ejecutar el plan en orden: primero crítico, después alto impacto.',
    },
  ];
}