import { calculateOperationalMaturity } from './operationalMaturityService';

export interface OperationalRoadmapAction {
  id: string;
  title: string;
  completed: boolean;
  inProgress: boolean;
  priority: 'Alta' | 'Media' | 'Baja';
}

export interface OperationalRoadmap {
  currentLevel: string;
  nextLevel: string;
  progress: number;
  completedActions: number;
  totalActions: number;
  actions: OperationalRoadmapAction[];
}

export function generateOperationalRoadmap(
  executiveScore: number,
  compliance: number,
  riskScore: number,
): OperationalRoadmap {
  const maturity =
    calculateOperationalMaturity(
      executiveScore,
      compliance,
      riskScore,
    );

  const actions: OperationalRoadmapAction[] = [];

  let nextLevel = '';

  if (maturity.level === 'initial') {
    nextLevel = 'En desarrollo';

    actions.push(
      {
        id: 'RD-001',
        title: 'Incrementar cumplimiento operativo al 60%',
        completed: compliance >= 60,
        inProgress: compliance > 40 && compliance < 60,
        priority: 'Alta',
      },
      {
        id: 'RD-002',
        title: 'Elevar Score Ejecutivo a 50',
        completed: executiveScore >= 50,
        inProgress: executiveScore > 30 && executiveScore < 50,
        priority: 'Alta',
      },
      {
        id: 'RD-003',
        title: 'Mantener riesgo operativo controlado',
        completed: riskScore <= 40,
        inProgress: riskScore > 40 && riskScore <= 60,
        priority: 'Media',
      },
    );
  } else if (maturity.level === 'developing') {
    nextLevel = 'Gestionado';

    actions.push(
      {
        id: 'RD-004',
        title: 'Cumplimiento superior al 75%',
        completed: compliance >= 75,
        inProgress: compliance >= 60 && compliance < 75,
        priority: 'Alta',
      },
      {
        id: 'RD-005',
        title: 'Score Ejecutivo superior a 70',
        completed: executiveScore >= 70,
        inProgress: executiveScore >= 50 && executiveScore < 70,
        priority: 'Alta',
      },
      {
        id: 'RD-006',
        title: 'Reducir riesgos críticos',
        completed: riskScore <= 25,
        inProgress: riskScore > 25 && riskScore <= 40,
        priority: 'Media',
      },
    );
  } else if (maturity.level === 'managed') {
    nextLevel = 'Optimizado';

    actions.push(
      {
        id: 'RD-007',
        title: 'Mantener indicadores estables',
        completed: executiveScore >= 80,
        inProgress: executiveScore >= 70 && executiveScore < 80,
        priority: 'Media',
      },
      {
        id: 'RD-008',
        title: 'Cumplimiento mayor al 90%',
        completed: compliance >= 90,
        inProgress: compliance >= 75 && compliance < 90,
        priority: 'Alta',
      },
    );
  } else if (maturity.level === 'optimized') {
    nextLevel = 'Excelente';

    actions.push({
      id: 'RD-009',
      title: 'Conservar excelencia operacional',
      completed: executiveScore >= 95,
      inProgress: executiveScore >= 80 && executiveScore < 95,
      priority: 'Baja',
    });
  } else {
    nextLevel = 'Máximo nivel';
  }

  const completedActions =
    actions.filter((action) => action.completed).length;

  const totalActions = actions.length;

  const progress =
    totalActions === 0
      ? 100
      : Math.round((completedActions / totalActions) * 100);

  return {
    currentLevel: maturity.title,
    nextLevel,
    progress,
    completedActions,
    totalActions,
    actions,
  };
}