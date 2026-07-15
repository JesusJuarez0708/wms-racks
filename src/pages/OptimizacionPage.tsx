import { useEffect, useState } from 'react';

import {
  type OperationalNarrative,
} from '../services/operationalNarrativeService';

import {
  type OperationalHealth,
} from '../services/operationalHealthService';

import {
  type OperationalTrend,
} from '../services/operationalTrendService';

import {
  type OperationalForecast,
} from '../services/operationalForecastService';

import {
  type ActionPlanItem,
} from '../services/operationalActionPlanService';

import {
  type OperationalImpactSimulation,
} from '../services/operationalImpactSimulatorService';

import {
  type ExecutivePriority,
} from '../services/executivePriorityService';

import {
  type OperationalExecutionTracking,
} from '../services/operationalExecutionTrackingService';

import {
  type OperationalCompliance,
} from '../services/operationalComplianceService';

import {
  type ExecutiveKpiDashboard,
} from '../services/executiveKpiService';

import {
  type ExecutiveDecisionSummary,
} from '../services/executiveDecisionSummaryService';

import {
  type ExecutiveCommandCenter,
} from '../services/executiveCommandCenterService';

import {
  type ExecutiveRiskIntelligence,
} from '../services/executiveRiskIntelligenceService';

import {
  type ExecutiveForecast,
} from '../services/executiveForecastService';

import {
  type ExecutiveSimulationResult,
} from '../services/executiveDecisionSimulatorService';

import {
  type OperationalSaturationPrediction,
} from '../services/operationalSaturationPredictorService';

import {
  type PredictiveWorkOrderSuggestion,
} from '../services/predictiveWorkOrderService';

import {
  type IntelligentWorkOrderExecution,
} from '../services/intelligentWorkOrderExecutionService';

import {
  type StrategicAlert,
} from '../services/strategicAlertService';

import {
  type StrategicOpportunity,
} from '../services/strategicOpportunityService';

import {
  calculateOperationalMaturity,
} from '../services/operationalMaturityService';

import {
  generateOperationalRoadmap,
} from '../services/operationalRoadmapService';

import {
  generateStrategicRecommendations,
} from '../services/strategicRecommendationEngineService';

import {
  generateExecutiveExecutionPlan,
} from '../services/executivePlannerService';

import {
  simulateExecutiveImpact,
} from '../services/executiveSimulationImpactService';

import {
  type PrioritizedExecutiveScenario,
} from '../services/prioritizedScenarioService';

import ExecutiveSummarySection from '../components/optimization/ExecutiveSummarySection';
import ExecutiveForecastSection from '../components/optimization/ExecutiveForecastSection';
import ExecutiveImpactSimulationSection from '../components/optimization/ExecutiveImpactSimulationSection';
import ExecutiveComplianceSection from '../components/optimization/ExecutiveComplianceSection';
import ExecutiveExecutionTrackingSection from '../components/optimization/ExecutiveExecutionTrackingSection';
import { ExecutivePrioritiesSection } from '../components/optimization/ExecutivePrioritiesSection';
import ExecutiveActionPlanSection from '../components/optimization/ExecutiveActionPlanSection';
import ExecutiveRiskRadarSection from '../components/optimization/ExecutiveRiskRadarSection';
import ExecutiveNarrativeSection from '../components/optimization/ExecutiveNarrativeSection';
import { ExecutiveScenarioCenterSection } from '../components/optimization/ExecutiveScenarioCenterSection';
import { ExecutiveExecutionCenterSection } from '../components/optimization/ExecutiveExecutionCenterSection';
import { ExecutiveCommandCenterSection } from '../components/optimization/ExecutiveCommandCenterSection';
import { ExecutiveRiskIntelligenceSection } from '../components/optimization/ExecutiveRiskIntelligenceSection';
import { ExecutiveHealthSection } from '../components/optimization/ExecutiveHealthSection';
import { ExecutiveProjectionSection } from '../components/optimization/ExecutiveProjectionSection';
import { ExecutiveDecisionSimulatorSection } from '../components/optimization/ExecutiveDecisionSimulatorSection';
import { ExecutiveKpiPanel } from '../components/executive/ExecutiveKpiPanel';
import { ExecutiveExecutionStepCard } from '../components/executive/cards/ExecutiveExecutionStepCard';
import { ExecutiveExpectedResultCard } from '../components/executive/cards/ExecutiveExpectedResultCard';

import {
  loadExecutiveOrchestrationData,
} from '../services/executiveOrchestrationService';

import {
  runExecutiveBrain,
  type ExecutiveBrainDecision,
} from '../services/executiveBrainService';

import {
  ExecutiveBrainSection,
} from '../components/optimization/ExecutiveBrainSection';

import {
  generateExecutiveInsight,
  type ExecutiveInsight,
} from '../services/executiveInsightService';

import { ExecutiveInsightSection } from '../components/optimization/ExecutiveInsightSection';

export default function OptimizacionPage() {
  const [narrative, setNarrative] =
    useState<OperationalNarrative | null>(null);

  const [health, setHealth] =
    useState<OperationalHealth | null>(null);

  const [trend, setTrend] =
    useState<OperationalTrend | null>(null);

  const [forecast, setForecast] =
    useState<OperationalForecast | null>(null);

  const [actionPlan, setActionPlan] =
    useState<ActionPlanItem[]>([]);

  const [_impactSimulation, setImpactSimulation] =
    useState<OperationalImpactSimulation | null>(null);

  const [executivePriorities, setExecutivePriorities] =
    useState<ExecutivePriority[]>([]);

  const [executionTracking, setExecutionTracking] =
    useState<OperationalExecutionTracking | null>(null);

  const [compliance, setCompliance] =
    useState<OperationalCompliance | null>(null);

  const [riskRadar, setRiskRadar] = useState({
    saturation: 0,
    fragmentation: 0,
    blockage: 0,
    rotation: 0,
  });

  const [executiveKpi, setExecutiveKpi] =
    useState<ExecutiveKpiDashboard | null>(null);

  const [executiveSummary, setExecutiveSummary] =
    useState<ExecutiveDecisionSummary | null>(null);

  const [executiveCommandCenter, setExecutiveCommandCenter] =
    useState<ExecutiveCommandCenter | null>(null);

  const [executiveBrainDecision, setExecutiveBrainDecision] =
    useState<ExecutiveBrainDecision | null>(null);

  const [executiveInsight, setExecutiveInsight] =
    useState<ExecutiveInsight | null>(null);

  const [executiveRisk, setExecutiveRisk] =
    useState<ExecutiveRiskIntelligence | null>(null);

  const [executiveForecast, setExecutiveForecast] =
    useState<ExecutiveForecast | null>(null);

  const [simulationResults, setSimulationResults] =
    useState<ExecutiveSimulationResult[]>([]);

  const [
    prioritizedScenarios,
    setPrioritizedScenarios,
  ] = useState<PrioritizedExecutiveScenario[]>([]);

  const [saturationPrediction, setSaturationPrediction] =
    useState<OperationalSaturationPrediction | null>(null);

  const [predictiveWorkOrder, setPredictiveWorkOrder] =
    useState<PredictiveWorkOrderSuggestion | null>(null);

  const [intelligentExecution, setIntelligentExecution] =
    useState<IntelligentWorkOrderExecution | null>(null);

  const [loadingExecutiveCenter, setLoadingExecutiveCenter] =
    useState(true);

  const [loaderStep, setLoaderStep] = useState(0);

  const [strategicAlerts, setStrategicAlerts] =
    useState<StrategicAlert[]>([]);

  const [
    strategicOpportunities,
    setStrategicOpportunities,
  ] = useState<StrategicOpportunity[]>([]);

  type ExecutiveSection =
    | 'summary'
    | 'risks'
    | 'predictions'
    | 'strategies'
    | 'execution'
    | 'intelligence';

  const [activeExecutiveSection, setActiveExecutiveSection] =
    useState<ExecutiveSection>('summary');

  const executiveSections: {
    id: ExecutiveSection;
    label: string;
    icon: string;
  }[] = [
    {
      id: 'summary',
      label: 'Resumen Ejecutivo',
      icon: '📊',
    },
    {
      id: 'risks',
      label: 'Riesgos',
      icon: '⚠️',
    },
    {
      id: 'predictions',
      label: 'Predicciones',
      icon: '📈',
    },
    {
      id: 'strategies',
      label: 'Estrategias',
      icon: '🎯',
    },
    {
      id: 'execution',
      label: 'Ejecución',
      icon: '🚛',
    },
    {
      id: 'intelligence',
      label: 'Inteligencia',
      icon: '🧠',
    },
  ];

  const operationalMaturity =
    executiveKpi && executiveRisk && executiveCommandCenter
      ? calculateOperationalMaturity(
          executiveCommandCenter.executiveScore ?? 0,
          0,
          executiveRisk.riskScore ?? 100,
        )
      : null;

  const operationalRoadmap =
  executiveKpi && executiveRisk && executiveCommandCenter
    ? generateOperationalRoadmap(
        executiveCommandCenter.executiveScore ?? 0,
        0,
        executiveRisk.riskScore ?? 100,
      )
    : null;

  const strategicRecommendations =
  executiveKpi &&
  executiveRisk &&
  executiveCommandCenter
    ? generateStrategicRecommendations(
        executiveCommandCenter.executiveScore ?? 0,
        0,
        executiveKpi.activeAlerts ?? 0,
        executiveRisk.riskScore ?? 100,
      )
    : [];

  const executiveExecutionPlan =
    executiveCommandCenter
      ? generateExecutiveExecutionPlan(
          strategicRecommendations,
          executiveCommandCenter.executiveScore ?? 0,
        )
      : null;

  const executiveSimulationImpact =
    executiveKpi &&
    executiveRisk &&
    executiveCommandCenter
      ? simulateExecutiveImpact(
          executiveCommandCenter.executiveScore ?? 0,
          0,
          executiveKpi.activeAlerts ?? 0,
          executiveRisk.riskScore ?? 100,
        )
      : [];

  function translateLevel(level?: string) {
    switch (level?.toLowerCase()) {
      case 'critical':
        return 'CRÍTICO';
      case 'high':
        return 'ALTO';
      case 'medium':
        return 'MEDIO';
      case 'low':
        return 'BAJO';
      case 'good':
        return 'BUENO';
      case 'excellent':
        return 'EXCELENTE';
      case 'warning':
        return 'ATENCIÓN';
      case 'stable':
        return 'Estable';
      case 'up':
        return 'Mejorando';
      case 'down':
        return 'Deterioro';
      default:
        return level ?? '';
    }
  }

  useEffect(() => {
    async function loadNarrative() {
      setLoadingExecutiveCenter(true);
      setLoaderStep(0);

      const data = await loadExecutiveOrchestrationData(
        setLoaderStep,
      );

      setNarrative(data.narrative);
      setHealth(data.health);
      setTrend(data.trend);
      setForecast(data.forecast);
      setActionPlan(data.actionPlan);
      setImpactSimulation(data.impactSimulation);
      setExecutivePriorities(data.executivePriorities);
      setExecutionTracking(data.executionTracking);
      setCompliance(data.compliance);
      setRiskRadar(data.riskRadar);
      setExecutiveKpi(data.executiveKpi);
      setExecutiveSummary(data.executiveSummary);
      setExecutiveRisk(data.executiveRisk);
      setExecutiveForecast(data.executiveForecast);
      setSimulationResults(data.simulationResults);
      setStrategicOpportunities(data.strategicOpportunities);
      setPrioritizedScenarios(data.prioritizedScenarios);
      setSaturationPrediction(data.saturationPrediction);
      setPredictiveWorkOrder(data.predictiveWorkOrder);
      setIntelligentExecution(data.intelligentExecution);
      setExecutiveCommandCenter(data.executiveCommandCenter);
      setStrategicAlerts(data.strategicAlerts);

      const brainDecision =
        await runExecutiveBrain(data);

      setExecutiveBrainDecision(brainDecision);

      const insight = generateExecutiveInsight({
        executiveCommandCenter: data.executiveCommandCenter,
        executiveBrain: brainDecision,
      });

      setExecutiveInsight(insight);

      setTimeout(() => {
        setLoadingExecutiveCenter(false);
      }, 500);
    }

    loadNarrative();
  }, []);

  if (loadingExecutiveCenter) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
        <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-2xl">
            🧠
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            Inicializando Inteligencia Operativa CJWMS
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Analizando salud operativa, riesgos, cumplimiento,
            prioridades ejecutivas y proyecciones del almacén.
          </p>

          <div className="mt-6 space-y-3 text-left">
            {[
              'Salud Operativa',
              'Tendencias',
              'Riesgos Ejecutivos',
              'Prioridades Operativas',
              'Proyección Ejecutiva',
              'Centro de Comando',
            ].map((item, index) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-700"
              >
                <span className="flex h-6 w-6 items-center justify-center">
                  {loaderStep > index ? (
                    <span className="text-sm font-bold text-emerald-500">
                      ✓
                    </span>
                  ) : loaderStep === index ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-slate-300" />
                  )}
                </span>

                <span>{item}</span>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs uppercase tracking-wider text-slate-400">
            {loaderStep >= 6
              ? 'Construyendo vista ejecutiva...'
              : 'Preparando Centro Ejecutivo'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 text-slate-100">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Optimización de espacios
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Centro de Optimización Operativa CJWMS
        </p>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
          <div className="flex min-w-max gap-2">
            {executiveSections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveExecutiveSection(section.id)}
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  activeExecutiveSection === section.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="mr-2">{section.icon}</span>
                {section.label}
              </button>
            ))}
          </div>
        </div>

        {activeExecutiveSection === 'summary' && executiveCommandCenter && (
          <ExecutiveCommandCenterSection
            executiveCommandCenter={executiveCommandCenter}
            translateLevel={translateLevel}
          />
        )}

        {activeExecutiveSection === 'summary' && (
          <>
            <ExecutiveBrainSection
              decision={executiveBrainDecision}
            />

            <ExecutiveInsightSection
              insight={executiveInsight}
            />
          </>
        )}

        {activeExecutiveSection === 'risks' && executiveRisk && (
          <ExecutiveRiskIntelligenceSection
            executiveRisk={executiveRisk}
            translateLevel={translateLevel}
          />
        )}

        {activeExecutiveSection === 'summary' && health && (
          <ExecutiveHealthSection
            health={health}
            trend={trend}
            translateLevel={translateLevel}
          />
        )}

        {activeExecutiveSection === 'predictions' && executiveForecast && (
          <ExecutiveProjectionSection
            executiveForecast={executiveForecast}
            translateLevel={translateLevel}
          />
        )}

        {activeExecutiveSection === 'predictions' && (
          <ExecutiveDecisionSimulatorSection
            simulationResults={simulationResults}
            executiveSimulationImpact={executiveSimulationImpact}
          />
        )}

        {activeExecutiveSection === 'risks' && saturationPrediction && (
          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Motor Predictivo de Saturación Operativa
              </p>

              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  saturationPrediction.riskLevel === 'critical'
                    ? 'bg-red-100 text-red-700'
                    : saturationPrediction.riskLevel === 'high'
                      ? 'bg-orange-100 text-orange-700'
                      : saturationPrediction.riskLevel === 'medium'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                {translateLevel(saturationPrediction.riskLevel)}
              </span>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-xs uppercase text-slate-500">
                  Saturación actual
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {saturationPrediction.currentSaturation}%
                </p>
              </div>

              <div>
                <p className="text-xs uppercase text-slate-500">
                  Saturación proyectada
                </p>

                <p className="mt-2 text-3xl font-bold text-orange-600">
                  {saturationPrediction.projectedSaturation}%
                </p>
              </div>

              <div>
                <p className="text-xs uppercase text-slate-500">
                  Riesgo estimado
                </p>

                <p className="mt-2 text-3xl font-bold text-red-600">
                  {saturationPrediction.daysToRisk} días
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-lg bg-slate-50 p-4">
              <p className="text-sm text-slate-700">
                {saturationPrediction.explanation}
              </p>

              <p className="mt-3 text-sm font-semibold text-slate-900">
                Acción recomendada:
                {' '}
                {saturationPrediction.recommendedAction}
              </p>
            </div>
          </div>
        )}

        {activeExecutiveSection === 'execution' && predictiveWorkOrder && (
          <div className="mt-6 rounded-xl border border-blue-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Orden de Trabajo Preventiva Sugerida
              </p>

              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  predictiveWorkOrder.priority === 'critical'
                    ? 'bg-red-100 text-red-700'
                    : predictiveWorkOrder.priority === 'high'
                      ? 'bg-orange-100 text-orange-700'
                      : predictiveWorkOrder.priority === 'medium'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                {translateLevel(predictiveWorkOrder.priority)}
              </span>
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-900">
              {predictiveWorkOrder.title}
            </h3>

            <div className="mt-4 rounded-lg bg-slate-50 p-4">
              <p className="text-sm text-slate-700">
                <strong>Disparador:</strong>{' '}
                {predictiveWorkOrder.trigger}
              </p>

              <p className="mt-3 text-sm text-slate-700">
                <strong>Acción sugerida:</strong>{' '}
                {predictiveWorkOrder.suggestedAction}
              </p>

              <p className="mt-3 text-sm text-slate-700">
                <strong>Beneficio esperado:</strong>{' '}
                {predictiveWorkOrder.expectedBenefit}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                {predictiveWorkOrder.id}
              </span>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                Sugerida
              </span>
            </div>
          </div>
        )}

        {activeExecutiveSection === 'risks' && strategicAlerts && (
          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Centro de Alertas Estratégicas
            </p>

            <div className="mt-4 space-y-3">

              {strategicAlerts.length === 0 && (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                  <p className="font-semibold text-emerald-700">
                    Sin alertas estratégicas activas
                  </p>

                  <p className="mt-2 text-sm text-slate-700">
                    El sistema no detecta alertas estratégicas críticas en este momento.
                  </p>
                </div>
              )}

              {strategicAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`rounded-lg border p-4 ${
                    alert.severity === 'critical'
                      ? 'border-red-200 bg-red-50'
                      : alert.severity === 'high'
                        ? 'border-amber-200 bg-amber-50'
                        : 'border-blue-200 bg-blue-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-slate-900">
                      {alert.title}
                    </p>

                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${
                        alert.severity === 'critical'
                          ? 'bg-red-100 text-red-700'
                          : alert.severity === 'high'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {alert.severity.toUpperCase()}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-slate-700">
                    <strong>Impacto:</strong> {alert.impact}
                  </p>

                  <p className="mt-1 text-sm text-slate-700">
                    <strong>Acción:</strong> {alert.recommendation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeExecutiveSection === 'strategies' && (
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-900">
                Centro de Oportunidades Estratégicas
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Identifica oportunidades ejecutivas para mejorar productividad,
                capacidad y crecimiento operativo.
              </p>
            </div>

            {strategicOpportunities.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                      En monitoreo
                    </p>

                    <h3 className="mt-1 text-sm font-semibold text-slate-900">
                      Sin oportunidades estratégicas detectadas
                    </h3>
                  </div>

                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    Estable
                  </span>
                </div>

                <p className="text-sm text-slate-600">
                  La operación requiere estabilizar primero los indicadores antes de
                  generar nuevas oportunidades de crecimiento.
                </p>

                <div className="mt-4 space-y-2 text-sm">
                  <div>
                    <p className="font-medium text-slate-700">
                      Estado actual
                    </p>
                    <p className="text-slate-500">
                      No existen oportunidades estratégicas habilitadas con los
                      indicadores actuales.
                    </p>
                  </div>

                  <div>
                    <p className="font-medium text-slate-700">
                      Recomendación
                    </p>
                    <p className="text-slate-500">
                      Incrementar el cumplimiento operativo y mejorar el score ejecutivo
                      para habilitar recomendaciones estratégicas.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {strategicOpportunities.map((opportunity) => (
                  <div
                    key={opportunity.id}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          {opportunity.id}
                        </p>

                        <h3 className="mt-1 text-sm font-semibold text-slate-900">
                          {opportunity.title}
                        </h3>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          opportunity.priority === 'high'
                            ? 'bg-red-100 text-red-700'
                            : opportunity.priority === 'medium'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {opportunity.priority === 'high'
                          ? 'Alta'
                          : opportunity.priority === 'medium'
                            ? 'Media'
                            : 'Baja'}
                      </span>
                    </div>

                    <p className="text-sm text-slate-600">
                      {opportunity.description}
                    </p>

                    <div className="mt-4 space-y-2 text-sm">
                      <div>
                        <p className="font-medium text-slate-700">
                          Impacto
                        </p>
                        <p className="text-slate-500">
                          {opportunity.impact}
                        </p>
                      </div>

                      <div>
                        <p className="font-medium text-slate-700">
                          Beneficio estimado
                        </p>
                        <p className="text-slate-500">
                          {opportunity.estimatedBenefit}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {activeExecutiveSection === 'strategies' &&
          operationalMaturity && (
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Índice de Madurez Operativa
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Evalúa el nivel global de evolución operativa del almacén.
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  operationalMaturity.level === 'excellent'
                    ? 'bg-blue-100 text-blue-700'
                    : operationalMaturity.level === 'optimized'
                      ? 'bg-emerald-100 text-emerald-700'
                      : operationalMaturity.level === 'managed'
                        ? 'bg-amber-100 text-amber-700'
                        : operationalMaturity.level === 'developing'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-red-100 text-red-700'
                }`}
              >
                {operationalMaturity.title}
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-[220px_1fr]">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-center">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Score de madurez
                </p>

                <p className="mt-3 text-4xl font-bold text-slate-900">
                  {operationalMaturity.score}
                  <span className="text-xl text-slate-400">
                    /100
                  </span>
                </p>

                <p className="mt-2 text-sm font-medium text-slate-600">
                  {operationalMaturity.title}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-900">
                  Diagnóstico ejecutivo
                </p>

                <p className="mt-2 text-sm text-slate-600">
                  La operación se encuentra en un nivel de madurez{' '}
                  <span className="font-semibold">
                    {operationalMaturity.title}
                  </span>
                  .
                </p>

                <div className="mt-4">
                  <p className="text-sm font-semibold text-slate-900">
                    Recomendación
                  </p>

                  <p className="mt-1 text-sm text-slate-600">
                    {operationalMaturity.recommendation}
                  </p>
                </div>

                <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className={`h-full rounded-full ${
                      operationalMaturity.level === 'excellent'
                        ? 'bg-blue-500'
                        : operationalMaturity.level === 'optimized'
                          ? 'bg-emerald-500'
                          : operationalMaturity.level === 'managed'
                            ? 'bg-amber-500'
                            : operationalMaturity.level === 'developing'
                              ? 'bg-orange-500'
                              : 'bg-red-500'
                    }`}
                    style={{
                      width: `${operationalMaturity.score}%`,
                    }}
                  />
                </div>

                <div className="mt-2 flex justify-between text-xs text-slate-400">
                  <span>Inicial</span>
                  <span>En desarrollo</span>
                  <span>Gestionado</span>
                  <span>Optimizado</span>
                  <span>Excelente</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeExecutiveSection === 'strategies' &&
          operationalRoadmap && (
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-900">
                Roadmap Estratégico de Evolución
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Define las acciones necesarias para avanzar al siguiente nivel de madurez operativa.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-[260px_1fr]">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Nivel actual
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {operationalRoadmap.currentLevel}
                </p>

                <div className="my-4 h-px bg-slate-200" />

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Siguiente nivel
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {operationalRoadmap.nextLevel}
                </p>

                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Progreso
                  </p>

                  <p className="mt-2 text-3xl font-bold text-blue-600">
                    {operationalRoadmap.progress}%
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    {operationalRoadmap.completedActions} de{' '}
                    {operationalRoadmap.totalActions} acciones completadas
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-900">
                  Acciones para avanzar
                </p>

                <div className="mt-4 space-y-3">
                  {operationalRoadmap.actions.map((action) => (
                    <div
                      key={action.id}
                      className="flex items-start gap-4 rounded-lg border border-slate-200 bg-white p-3"
                    >
                      <span
                        className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                          action.completed
                            ? 'bg-emerald-100 text-emerald-700'
                            : action.inProgress
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        {action.completed
                          ? '✓'
                          : action.inProgress
                          ? '•'
                          : '○'}
                      </span>

                      <div>
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase ${
                            action.priority === 'Alta'
                              ? 'bg-red-100 text-red-700'
                              : action.priority === 'Media'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          {action.priority}
                        </span>

                        <p className="mt-2 text-sm font-medium text-slate-800">
                          {action.title}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {action.completed
                            ? 'Completado'
                            : 'Pendiente'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {activeExecutiveSection === 'strategies' &&
          strategicRecommendations.length > 0 && (
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-900">
                Motor Inteligente de Recomendaciones Estratégicas
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Prioriza acciones ejecutivas con impacto directo en cumplimiento,
                riesgo y madurez operativa.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {strategicRecommendations.map((recommendation) => (
                <div
                  key={recommendation.id}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${
                        recommendation.priority === 'critical'
                          ? 'bg-red-100 text-red-700'
                          : recommendation.priority === 'high'
                            ? 'bg-orange-100 text-orange-700'
                            : recommendation.priority === 'medium'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {recommendation.priority === 'critical'
                        ? 'Crítica'
                        : recommendation.priority === 'high'
                          ? 'Alta'
                          : recommendation.priority === 'medium'
                            ? 'Media'
                            : 'Baja'}
                    </span>

                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      {recommendation.id}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-slate-900">
                    {recommendation.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-600">
                    {recommendation.description}
                  </p>

                  <div className="mt-4 rounded-lg bg-white p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Impacto esperado
                    </p>

                    <p className="mt-1 text-sm text-slate-600">
                      {recommendation.expectedImpact}
                    </p>
                  </div>

                  <div
                    className={`mt-3 rounded-lg p-3 ${
                      recommendation.priority === 'critical'
                        ? 'bg-red-50'
                        : recommendation.priority === 'high'
                          ? 'bg-orange-50'
                          : recommendation.priority === 'medium'
                            ? 'bg-blue-50'
                            : 'bg-emerald-50'
                    }`}
                  >
                    <p
                      className={`text-xs font-semibold uppercase tracking-wide ${
                        recommendation.priority === 'critical'
                          ? 'text-red-700'
                          : recommendation.priority === 'high'
                            ? 'text-orange-700'
                            : recommendation.priority === 'medium'
                              ? 'text-blue-700'
                              : 'text-emerald-700'
                      }`}
                    >
                      → Siguiente acción
                    </p>

                    <p className="mt-1 text-sm text-slate-700">
                      {recommendation.suggestedAction}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeExecutiveSection === 'strategies' &&
          executiveExecutionPlan &&
          executiveExecutionPlan.steps.length > 0 && (
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-900">
                Planificador Ejecutivo Inteligente
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Ordena las recomendaciones estratégicas en una secuencia ejecutiva
                priorizada.
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
              <div className="space-y-3">
                {executiveExecutionPlan.steps.map((step) => (
                  <ExecutiveExecutionStepCard
                    key={step.recommendationId}
                    step={step}
                  />
                ))}
              </div>

              <ExecutiveExpectedResultCard result={executiveExecutionPlan} />
            </div>
          </section>
        )}

        {activeExecutiveSection === 'intelligence' && executiveKpi && (
          <ExecutiveKpiPanel executiveKpi={executiveKpi} />
        )}

        {activeExecutiveSection === 'intelligence' && (
          <ExecutiveSummarySection
            executiveSummary={executiveSummary}
            translateLevel={translateLevel}
          />
        )}
        {/*
        <ExecutiveMetricsSection executiveMetrics={executiveMetrics} />
        */}

        {activeExecutiveSection === 'predictions' && (
          <>
            <ExecutiveForecastSection
              forecast={forecast}
              translateLevel={translateLevel}
            />

            <ExecutiveImpactSimulationSection
              impactSimulation={_impactSimulation}
            />

            <ExecutiveScenarioCenterSection
              prioritizedScenarios={prioritizedScenarios}
            />
          </>
        )}

        {activeExecutiveSection === 'execution' && (
          <>
            <ExecutiveExecutionCenterSection
              intelligentExecution={intelligentExecution}
            />

            <ExecutiveExecutionTrackingSection
              executionTracking={executionTracking}
            />

            <ExecutiveComplianceSection compliance={compliance} />
          </>
        )}

        {activeExecutiveSection === 'execution' && (
          <>
            <ExecutivePrioritiesSection
              executivePriorities={executivePriorities}
              translateLevel={translateLevel}
            />

            <ExecutiveActionPlanSection
              actionPlan={actionPlan}
              translateLevel={translateLevel}
            />
          </>
        )}

        {activeExecutiveSection === 'risks' && (
          <ExecutiveRiskRadarSection riskRadar={riskRadar} />
        )}

        {activeExecutiveSection === 'intelligence' && (
          <ExecutiveNarrativeSection narrative={narrative} />
        )}
      </div>

    </div>
  );
}