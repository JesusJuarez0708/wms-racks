import {
  loadExecutiveOrchestrationData,
  type ExecutiveOrchestrationData,
} from './executiveOrchestrationService';

export interface ExecutiveBrainDecision {
  executiveStatus: string;
  priority: string;
  risk: string;
  recommendation: string;
  reasoning: string;
  confidence: number;
}

export async function runExecutiveBrain(
  orchestrationData?: ExecutiveOrchestrationData,
): Promise<ExecutiveBrainDecision> {
  const data =
    orchestrationData ??
    await loadExecutiveOrchestrationData();

  const executiveScore =
    data.executiveCommandCenter.executiveScore ??
    data.executiveKpi.executiveScore ??
    0;

  const riskScore =
    data.executiveRisk.riskScore ?? 100;

  const complianceRate =
    data.executiveKpi.complianceRate ?? 0;

  const projectedSaturation =
    data.saturationPrediction.projectedSaturation ?? 0;

  const activeAlerts =
    data.executiveKpi.activeAlerts ?? 0;

  if (riskScore >= 75 || activeAlerts >= 5) {
    return {
      executiveStatus:
        'Operación en condición crítica',

      priority:
        'Reducir inmediatamente el riesgo operativo',

      risk:
        'Crítico',

      recommendation:
        'Atender las alertas de mayor impacto, contener los riesgos activos y ejecutar primero las acciones operativas críticas.',

      reasoning:
        'El motor detectó un nivel elevado de riesgo ejecutivo y múltiples alertas activas, por lo que la prioridad debe concentrarse en la mitigación inmediata.',

      confidence: 96,
    };
  }

  if (projectedSaturation >= 90) {
    return {
      executiveStatus:
        'Operación próxima a saturación',

      priority:
        'Liberar capacidad operativa',

      risk:
        'Alto',

      recommendation:
        'Ejecutar reubicaciones preventivas, consolidar posiciones parciales y preparar capacidad antes de alcanzar el límite proyectado.',

      reasoning:
        'La proyección indica una saturación cercana al límite operativo, por lo que es necesario liberar capacidad antes de afectar el servicio.',

      confidence: 94,
    };
  }

  if (complianceRate < 70) {
    return {
      executiveStatus:
        'Operación con bajo cumplimiento',

      priority:
        'Recuperar el cumplimiento operativo',

      risk:
        'Alto',

      recommendation:
        'Priorizar las tareas vencidas, reforzar el seguimiento de ejecución y corregir las causas que están afectando el cumplimiento.',

      reasoning:
        'El porcentaje de cumplimiento operativo se encuentra por debajo del objetivo esperado y requiere acciones correctivas inmediatas.',

      confidence: 92,
    };
  }

  if (executiveScore < 60) {
    return {
      executiveStatus:
        'Operación que requiere atención',

      priority:
        'Mejorar el desempeño ejecutivo',

      risk:
        'Medio',

      recommendation:
        'Ejecutar las prioridades de mayor impacto y revisar los indicadores que están reduciendo el score ejecutivo.',

      reasoning:
        'El score ejecutivo refleja oportunidades importantes de mejora en el desempeño general de la operación.',

      confidence: 89,
    };
  }

  return {
    executiveStatus:
      'Operación estable',

    priority:
      'Mantener la estabilidad y anticipar riesgos',

    risk:
      'Bajo',

    recommendation:
      'Mantener la estrategia operativa actual, vigilar las proyecciones y ejecutar acciones preventivas antes de que los indicadores se deterioren.',

    reasoning:
      'Los principales indicadores ejecutivos permanecen dentro de parámetros aceptables y no se detectan riesgos prioritarios en este momento.',

    confidence: 91,
  };
}