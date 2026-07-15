import type { ExecutiveBrainDecision }
  from './executiveBrainService';

import type { ExecutiveCommandCenter }
  from './executiveCommandCenterService';

export type ExecutiveInsight = {
  headline: string;

  situation: string;

  primaryAction: string;

  urgency:
    | 'critical'
    | 'high'
    | 'medium'
    | 'low';

  confidence: number;
};

type GenerateExecutiveInsightParams = {
  executiveCommandCenter: ExecutiveCommandCenter;

  executiveBrain: ExecutiveBrainDecision | null;
};

export function generateExecutiveInsight({
  executiveCommandCenter,
  executiveBrain,
}: GenerateExecutiveInsightParams): ExecutiveInsight {

  if (!executiveBrain) {
    return {
      headline: 'Información insuficiente',

      situation:
        'El sistema aún no dispone de suficiente contexto para emitir una recomendación ejecutiva.',

      primaryAction:
        'Esperar la consolidación de los indicadores.',

      urgency: 'low',

      confidence: 0,
    };
  }

  return {
    headline: executiveBrain.executiveStatus,

    situation: executiveCommandCenter.summary,

    primaryAction: executiveBrain.priority,

    urgency:
      executiveCommandCenter.globalStatus === 'critical'
        ? 'critical'
        : executiveCommandCenter.globalStatus === 'attention'
          ? 'high'
          : executiveCommandCenter.globalStatus === 'good'
            ? 'medium'
            : 'low',

    confidence: executiveBrain.confidence,
  };
}