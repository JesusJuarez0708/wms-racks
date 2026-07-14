import {
  generateOperationalNarrative,
  type OperationalNarrative,
} from './operationalNarrativeService';

import {
  calculateOperationalHealth,
  type OperationalHealth,
} from './operationalHealthService';

import {
  calculateOperationalTrend,
  saveOperationalHealthScore,
  type OperationalTrend,
} from './operationalTrendService';

import { generateOperationalAlerts } from './operationalIntelligenceService';

import {
  generateOptimizationRecommendations,
} from './operationalOptimizationService';

import {
  generateOperationalForecast,
  type OperationalForecast,
} from './operationalForecastService';

import {
  generateActionPlan,
  type ActionPlanItem,
} from './operationalActionPlanService';

import {
  simulateOperationalImpact,
  type OperationalImpactSimulation,
} from './operationalImpactSimulatorService';

import {
  generateExecutivePriorities,
  type ExecutivePriority,
} from './executivePriorityService';

import {
  trackOperationalExecution,
  type OperationalExecutionTracking,
} from './operationalExecutionTrackingService';

import {
  calculateOperationalCompliance,
  type OperationalCompliance,
} from './operationalComplianceService';

import {
  getExecutiveKpiDashboard,
  type ExecutiveKpiDashboard,
} from './executiveKpiService';

import {
  generateExecutiveDecisionSummary,
  type ExecutiveDecisionSummary,
} from './executiveDecisionSummaryService';

import {
  getExecutiveCommandCenter,
  type ExecutiveCommandCenter,
} from './executiveCommandCenterService';

import {
  calculateExecutiveRiskIntelligence,
  type ExecutiveRiskIntelligence,
} from './executiveRiskIntelligenceService';

import {
  generateExecutiveForecast,
  type ExecutiveForecast,
} from './executiveForecastService';

import {
  runExecutiveDecisionSimulation,
  type ExecutiveSimulationResult,
} from './executiveDecisionSimulatorService';

import {
  predictOperationalSaturation,
  type OperationalSaturationPrediction,
} from './operationalSaturationPredictorService';

import {
  generatePredictiveWorkOrderSuggestion,
  type PredictiveWorkOrderSuggestion,
} from './predictiveWorkOrderService';

import {
  getIntelligentWorkOrderExecution,
  type IntelligentWorkOrderExecution,
} from './intelligentWorkOrderExecutionService';

import {
  generateStrategicAlerts,
  type StrategicAlert,
} from './strategicAlertService';

import {
  generateStrategicOpportunities,
  type StrategicOpportunity,
} from './strategicOpportunityService';

import {
  prioritizeExecutiveScenarios,
  type PrioritizedExecutiveScenario,
} from './prioritizedScenarioService';

export type ExecutiveRiskRadar = {
  saturation: number;
  fragmentation: number;
  blockage: number;
  rotation: number;
};

export type ExecutiveOrchestrationData = {
  narrative: OperationalNarrative;
  health: OperationalHealth;
  trend: OperationalTrend;
  forecast: OperationalForecast;
  actionPlan: ActionPlanItem[];
  impactSimulation: OperationalImpactSimulation;
  executivePriorities: ExecutivePriority[];
  executionTracking: OperationalExecutionTracking;
  compliance: OperationalCompliance;
  riskRadar: ExecutiveRiskRadar;
  executiveKpi: ExecutiveKpiDashboard;
  executiveSummary: ExecutiveDecisionSummary;
  executiveRisk: ExecutiveRiskIntelligence;
  executiveForecast: ExecutiveForecast;
  simulationResults: ExecutiveSimulationResult[];
  strategicOpportunities: StrategicOpportunity[];
  prioritizedScenarios: PrioritizedExecutiveScenario[];
  saturationPrediction: OperationalSaturationPrediction;
  predictiveWorkOrder:
    PredictiveWorkOrderSuggestion | null;
  intelligentExecution: IntelligentWorkOrderExecution;
  executiveCommandCenter: ExecutiveCommandCenter;
  strategicAlerts: StrategicAlert[];
};

type LoaderStepCallback = (step: number) => void;

export async function loadExecutiveOrchestrationData(
  onLoaderStep?: LoaderStepCallback,
): Promise<ExecutiveOrchestrationData> {
  onLoaderStep?.(0);

  const narrative = await generateOperationalNarrative();

  const health = await calculateOperationalHealth();
  onLoaderStep?.(1);

  saveOperationalHealthScore(health.score);

  const trend = calculateOperationalTrend();
  onLoaderStep?.(2);

  const forecast = await generateOperationalForecast();

  const actionPlan = await generateActionPlan();

  const impactSimulation = await simulateOperationalImpact();

  const executivePriorities = await generateExecutivePriorities();
  onLoaderStep?.(4);

  const executionTracking = await trackOperationalExecution();

  const compliance = await calculateOperationalCompliance();

  const alerts = await generateOperationalAlerts();

  const recommendations =
    await generateOptimizationRecommendations();

  const riskRadar: ExecutiveRiskRadar = {
    saturation: Math.min(100, alerts.length * 10),

    fragmentation: Math.min(
      100,
      recommendations.length * 12,
    ),

    blockage: Math.min(
      100,
      alerts.filter(
        (alert) => alert.priority === 'high',
      ).length * 25,
    ),

    rotation: Math.min(
      100,
      recommendations.length * 8,
    ),
  };

  const executiveKpi = await getExecutiveKpiDashboard();

  const executiveSummary =
    await generateExecutiveDecisionSummary();

  const executiveRisk =
    await calculateExecutiveRiskIntelligence();

  onLoaderStep?.(3);
  onLoaderStep?.(4);
  onLoaderStep?.(5);

  const executiveForecast =
    await generateExecutiveForecast();

  const simulationResults =
    await runExecutiveDecisionSimulation();

  const strategicOpportunities =
    await generateStrategicOpportunities();

  const prioritizedScenarios =
    prioritizeExecutiveScenarios(simulationResults);

  const saturationPrediction =
    await predictOperationalSaturation();

  const predictiveWorkOrder =
    await generatePredictiveWorkOrderSuggestion();

  const intelligentExecution =
    await getIntelligentWorkOrderExecution();

  onLoaderStep?.(6);

  const executiveCommandCenter =
    await getExecutiveCommandCenter();

  const strategicAlerts =
    await generateStrategicAlerts();

  return {
    narrative,
    health,
    trend,
    forecast,
    actionPlan,
    impactSimulation,
    executivePriorities,
    executionTracking,
    compliance,
    riskRadar,
    executiveKpi,
    executiveSummary,
    executiveRisk,
    executiveForecast,
    simulationResults,
    strategicOpportunities,
    prioritizedScenarios,
    saturationPrediction,
    predictiveWorkOrder,
    intelligentExecution,
    executiveCommandCenter,
    strategicAlerts,
  };
}