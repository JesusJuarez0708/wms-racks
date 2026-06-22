import { generateOperationalAlerts } from './operationalIntelligenceService';
import { generateOptimizationRecommendations } from './operationalOptimizationService';

export type OperationalHealth = {
  score: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
};

export async function calculateOperationalHealth(): Promise<OperationalHealth> {
  const alerts = await generateOperationalAlerts();
  const recommendations = await generateOptimizationRecommendations();

  let score = 100;

  score -= alerts.filter((a) => a.priority === 'high').length * 15;
  score -= alerts.filter((a) => a.priority === 'medium').length * 8;
  score -= alerts.filter((a) => a.priority === 'low').length * 3;

  score -= recommendations.length * 2;

  score = Math.max(0, Math.min(100, score));

  if (score >= 90) {
    return {
      score,
      status: 'excellent',
    };
  }

  if (score >= 70) {
    return {
      score,
      status: 'good',
    };
  }

  if (score >= 40) {
    return {
      score,
      status: 'warning',
    };
  }

  return {
    score,
    status: 'critical',
  };
}