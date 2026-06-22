import { useEffect, useState } from 'react';
import {
  generateOperationalNarrative,
  type OperationalNarrative,
} from '../services/operationalNarrativeService';

import {
  calculateOperationalHealth,
  type OperationalHealth,
} from '../services/operationalHealthService';

import {
  calculateOperationalTrend,
  saveOperationalHealthScore,
  type OperationalTrend,
} from '../services/operationalTrendService';

import { generateOperationalAlerts } from '../services/operationalIntelligenceService';
import { generateOptimizationRecommendations } from '../services/operationalOptimizationService';

import {
  generateOperationalForecast,
  type OperationalForecast,
} from '../services/operationalForecastService';

import {
  generateActionPlan,
  type ActionPlanItem,
} from '../services/operationalActionPlanService';

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

  const [executiveMetrics, setExecutiveMetrics] = useState({
    alerts: 0,
    criticalAlerts: 0,
    recommendations: 0,
    opportunities: 0,
  });

  const [riskRadar, setRiskRadar] = useState({
    saturation: 0,
    fragmentation: 0,
    blockage: 0,
    rotation: 0,
  });

  useEffect(() => {
    async function loadNarrative() {
      const narrativeData = await generateOperationalNarrative();
      setNarrative(narrativeData);

      const healthData = await calculateOperationalHealth();
      setHealth(healthData);
      saveOperationalHealthScore(healthData.score);
      const trendData = calculateOperationalTrend();
      setTrend(trendData);

      const forecastData =
        await generateOperationalForecast();

      setForecast(forecastData);

      const planData =
        await generateActionPlan();

      setActionPlan(planData);

      const alerts = await generateOperationalAlerts();

      const recommendations =
        await generateOptimizationRecommendations();

      setExecutiveMetrics({
        alerts: alerts.length,
        criticalAlerts: alerts.filter(
          (alert) => alert.priority === 'high'
        ).length,
        recommendations: recommendations.length,
        opportunities:
          alerts.length + recommendations.length,
      });

      setRiskRadar({
        saturation: Math.min(100, alerts.length * 10),
        fragmentation: Math.min(100, recommendations.length * 12),
        blockage: Math.min(
          100,
          alerts.filter((alert) => alert.priority === 'high').length * 25
        ),
        rotation: Math.min(100, recommendations.length * 8),
      });
    }

    loadNarrative();
  }, []);

  return (
    <div className="space-y-6 p-6 text-slate-100">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Optimización de espacios
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Centro de Optimización Operativa CJWMS
        </p>

        {health && (
          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Índice Ejecutivo de Salud Operativa
                </p>
                <p className="mt-1 text-3xl font-bold text-slate-900">
                  {health.score}/100
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  health.status === 'excellent'
                    ? 'bg-emerald-100 text-emerald-700'
                    : health.status === 'good'
                      ? 'bg-blue-100 text-blue-700'
                      : health.status === 'warning'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-red-100 text-red-700'
                }`}
              >
                {health.status.toUpperCase()}
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-200">
              <div
                className={`h-full rounded-full ${
                  health.status === 'excellent'
                    ? 'bg-emerald-500'
                    : health.status === 'good'
                      ? 'bg-blue-500'
                      : health.status === 'warning'
                        ? 'bg-amber-500'
                        : 'bg-red-500'
                }`}
                style={{ width: `${health.score}%` }}
              />
            </div>

            {trend && (
              <p className="mt-3 text-sm text-slate-600">
                Tendencia:{' '}
                {trend.trend === 'up'
                  ? `↑ Mejorando (+${trend.delta})`
                  : trend.trend === 'down'
                    ? `↓ Deterioro (${trend.delta})`
                    : '→ Estable'}
              </p>
            )}

          </div>
        )}

        <div className="mt-4 grid gap-4 md:grid-cols-4">
          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="text-xs uppercase text-slate-500">
              Alertas activas
            </div>

            <div className="mt-2 text-3xl font-bold text-slate-900">
              {executiveMetrics.alerts}
            </div>
          </div>

          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="text-xs uppercase text-slate-500">
              Alertas críticas
            </div>

            <div className="mt-2 text-3xl font-bold text-red-600">
              {executiveMetrics.criticalAlerts}
            </div>
          </div>

          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="text-xs uppercase text-slate-500">
              Recomendaciones
            </div>

            <div className="mt-2 text-3xl font-bold text-blue-600">
              {executiveMetrics.recommendations}
            </div>
          </div>

          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="text-xs uppercase text-slate-500">
              Oportunidades
            </div>

            <div className="mt-2 text-3xl font-bold text-emerald-600">
              {executiveMetrics.opportunities}
            </div>
          </div>
        </div>
      </div>

      {forecast && (
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Predicción Operativa
          </p>

          <div className="mt-3 flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-slate-900">
                {forecast.projectedHealth}/100
              </div>

              <div
                className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                  forecast.riskLevel === 'low'
                    ? 'bg-emerald-100 text-emerald-700'
                    : forecast.riskLevel === 'medium'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {forecast.riskLevel.toUpperCase()}
              </div>
            </div>

            <div className="space-y-2 text-sm text-slate-600">
              <p>{forecast.prediction}</p>

              <p>
                <span className="font-semibold text-slate-800">
                  Acción preventiva:
                </span>{' '}
                {forecast.preventiveAction}
              </p>
            </div>
          </div>
        </div>
      )}

      {actionPlan.length > 0 && (
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Plan de Acción Inteligente
          </p>

          <div className="mt-4 space-y-3">
            {actionPlan.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="rounded-lg border border-slate-200 p-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900">
                    {index + 1}. {item.title}
                  </h3>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      item.priority === 'high'
                        ? 'bg-red-100 text-red-700'
                        : item.priority === 'medium'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {item.priority.toUpperCase()}
                  </span>
                </div>

                <p className="mt-2 text-sm text-slate-600">
                  Impacto esperado: {item.impact}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Radar de Riesgo Operativo
        </p>

        <div className="mt-4 space-y-4">
          {[
            ['Saturación', riskRadar.saturation],
            ['Fragmentación', riskRadar.fragmentation],
            ['Bloqueo', riskRadar.blockage],
            ['Rotación', riskRadar.rotation],
          ].map(([label, value]) => (
            <div key={label}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">{label}</span>
                <span className="font-semibold text-slate-900">{value}%</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full rounded-full ${
                    Number(value) >= 70
                      ? 'bg-red-500'
                      : Number(value) >= 40
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                  }`}
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {narrative && (
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
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
      )}
    </div>
  );
}