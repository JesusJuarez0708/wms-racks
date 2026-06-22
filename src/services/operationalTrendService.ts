export type OperationalTrend = {
  currentScore: number;
  previousScore: number;
  delta: number;
  trend: 'up' | 'down' | 'stable';
};

const STORAGE_KEY = 'cjwms_operational_health_history';

export function saveOperationalHealthScore(
  score: number
) {
  const history = getOperationalHealthHistory();

  history.push({
    score,
    timestamp: new Date().toISOString(),
  });

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(history.slice(-20))
  );
}

export function getOperationalHealthHistory() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return [];
  }

  return JSON.parse(raw) as {
    score: number;
    timestamp: string;
  }[];
}

export function calculateOperationalTrend(): OperationalTrend {
  const history = getOperationalHealthHistory();

  if (history.length < 2) {
    return {
      currentScore: history[0]?.score ?? 0,
      previousScore: history[0]?.score ?? 0,
      delta: 0,
      trend: 'stable',
    };
  }

  const current = history[history.length - 1];
  const previous = history[history.length - 2];

  const delta = current.score - previous.score;

  return {
    currentScore: current.score,
    previousScore: previous.score,
    delta,
    trend:
      delta > 0
        ? 'up'
        : delta < 0
          ? 'down'
          : 'stable',
  };
}