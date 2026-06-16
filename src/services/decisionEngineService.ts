export type DecisionStatus = 'approved' | 'warning' | 'blocked';

export type DecisionReason = {
  type: 'positive' | 'warning' | 'negative';
  message: string;
};

export type RelocationDecisionInput = {
  originLocationCode: string;
  destinationLocationCode: string;
  originIsOccupied: boolean;
  destinationIsOccupied: boolean;
  productSku?: string | null;
  productRotation?: 'alta' | 'media' | 'baja' | null;
  destinationRackType?: 'selectivo' | 'drive-in' | string | null;
  destinationLineOccupancyPercentage?: number | null;
  destinationDepth?: number | null;
  maxDepth?: number | null;
  sameSkuInDestinationLine?: boolean;
};

export type LogisticsAdvisor = {
  role: string;
  icon: string;
  verdict: 'positive' | 'warning' | 'negative';
  message: string;
};

export type DecisionExplanation = {
  observed: string[];
  interpretation: string;
  recommendation: string;
  reasons: DecisionReason[];
  expectedBenefits: string[];
  confidence: number;
  advisors: LogisticsAdvisor[];
};

export type RelocationDecision = {
  status: DecisionStatus;
  score: number;
  recommendation: string;
  reasons: DecisionReason[];
  explanation: DecisionExplanation;
};

function clampScore(score: number) {
  return Math.max(0, Math.min(100, score));
}

export function evaluateRelocationDecision(
  input: RelocationDecisionInput
): RelocationDecision {
  let score = 70;

  const reasons: DecisionReason[] = [];

  if (!input.originIsOccupied) {
    return {
      status: 'blocked',
      score: 0,
      recommendation:
        'Movimiento bloqueado. La ubicación origen está vacía y no existe un pallet disponible para reubicar.',
      reasons: [
        {
          type: 'negative',
          message:
            'La ubicación origen no tiene inventario disponible para mover.',
        },
      ],

        explanation: {
        observed: [
            'La ubicación origen no contiene inventario disponible.',
        ],

        interpretation:
            'No existe un pallet que pueda ser reubicado desde la posición origen.',

        recommendation:
            'Verificar la ubicación seleccionada o elegir otra posición de origen.',

        reasons: [
            {
            type: 'negative',
            message:
                'La ubicación origen no tiene inventario disponible para mover.',
            },
        ],

        expectedBenefits: [
            'Evitar movimientos inválidos',
            'Mantener la integridad del inventario',
        ],

        confidence: 100,

            advisors: [
                {
                    role: 'Inventario',
                    icon: '📦',
                    verdict: 'negative',
                    message:
                    'No se encontró inventario disponible en la ubicación origen.',
                },
                {
                    role: 'Operación',
                    icon: '🚛',
                    verdict: 'negative',
                    message:
                    'No es posible ejecutar una reubicación sin un pallet origen válido.',
                },
                {
                    role: 'Conclusión CJWMS',
                    icon: '🤖',
                    verdict: 'negative',
                    message:
                    'La recomendación es bloquear el movimiento hasta seleccionar un origen con inventario.',
                },
            ],
        },

    };
  }

  if (input.destinationIsOccupied) {
    return {
      status: 'blocked',
      score: 0,
      recommendation:
        'Movimiento bloqueado. La ubicación destino ya está ocupada.',
      reasons: [
        {
          type: 'negative',
          message:
            'No se puede reubicar un pallet en una posición que ya tiene inventario.',
        },
      ],

        explanation: {
        observed: [
            'La ubicación destino ya contiene inventario disponible.',
        ],

        interpretation:
            'Ejecutar este movimiento generaría una colisión de inventario porque dos pallets ocuparían la misma posición.',

        recommendation:
            'Seleccionar una ubicación destino libre antes de continuar.',

        reasons: [
            {
            type: 'negative',
            message:
                'No se puede reubicar un pallet en una posición que ya tiene inventario.',
            },
        ],

        expectedBenefits: [
            'Evitar duplicidad de pallets en una misma ubicación',
            'Mantener el mapa de racks consistente',
        ],

        confidence: 100,

            advisors: [
                {
                    role: 'Inventario',
                    icon: '📦',
                    verdict: 'negative',
                    message:
                    'La ubicación destino ya tiene inventario disponible.',
                },
                {
                    role: 'Layout',
                    icon: '🏗️',
                    verdict: 'negative',
                    message:
                    'Asignar dos pallets a una misma posición rompería la consistencia del mapa de racks.',
                },
                {
                    role: 'Conclusión CJWMS',
                    icon: '🤖',
                    verdict: 'negative',
                    message:
                    'La recomendación es bloquear el movimiento y seleccionar una ubicación destino libre.',
                },
            ],

        },

    };
  }

  reasons.push({
    type: 'positive',
    message:
      'La ubicación origen tiene inventario y el destino se encuentra libre.',
  });

  if (input.sameSkuInDestinationLine) {
    score += 15;
    reasons.push({
      type: 'positive',
      message:
        'El destino mantiene agrupado el mismo SKU dentro de la línea, lo que mejora el control operativo.',
    });
  } else if (input.destinationRackType === 'drive-in') {
    score -= 10;
    reasons.push({
      type: 'warning',
      message:
        'No se detectó el mismo SKU en la línea destino. Puede generar mezcla operativa si se almacenan productos diferentes.',
    });
  }

  if (
    typeof input.destinationLineOccupancyPercentage === 'number' &&
    input.destinationLineOccupancyPercentage >= 90
  ) {
    score -= 25;
    reasons.push({
      type: 'negative',
      message:
        'La línea destino tiene una ocupación muy alta. Usarla puede aumentar el riesgo de saturación.',
    });
  } else if (
    typeof input.destinationLineOccupancyPercentage === 'number' &&
    input.destinationLineOccupancyPercentage >= 75
  ) {
    score -= 10;
    reasons.push({
      type: 'warning',
      message:
        'La línea destino ya tiene una ocupación elevada. Conviene revisar si existe una alternativa con más disponibilidad.',
    });
  } else if (
    typeof input.destinationLineOccupancyPercentage === 'number'
  ) {
    score += 10;
    reasons.push({
      type: 'positive',
      message:
        'La línea destino tiene disponibilidad suficiente para recibir el pallet.',
    });
  }

  if (
    input.destinationRackType === 'drive-in' &&
    typeof input.destinationDepth === 'number' &&
    typeof input.maxDepth === 'number'
  ) {
    const isFrontPosition = input.destinationDepth === 1;
    const isDeepPosition = input.destinationDepth === input.maxDepth;

    if (input.productRotation === 'alta' && isFrontPosition) {
      score += 15;
      reasons.push({
        type: 'positive',
        message:
          'El producto es de alta rotación y quedará en una posición frontal de fácil acceso.',
      });
    }

    if (input.productRotation === 'alta' && isDeepPosition) {
      score -= 20;
      reasons.push({
        type: 'negative',
        message:
          'El producto es de alta rotación y quedaría al fondo, lo que puede aumentar recorridos y maniobras.',
      });
    }

    if (input.productRotation === 'baja' && isDeepPosition) {
      score += 15;
      reasons.push({
        type: 'positive',
        message:
          'El producto es de baja rotación y quedará en una posición profunda, reservando el frente para productos de mayor movimiento.',
      });
    }

    if (input.productRotation === 'baja' && isFrontPosition) {
      score -= 15;
      reasons.push({
        type: 'warning',
        message:
          'El producto es de baja rotación y ocuparía una posición frontal que podría ser más útil para productos de mayor movimiento.',
      });
    }
  }

  const finalScore = clampScore(score);

  if (finalScore >= 80) {
    return {
      status: 'approved',
      score: finalScore,
      recommendation:
        'Movimiento recomendado. El destino es compatible con la operación y aporta una buena eficiencia logística.',
      reasons,

      explanation: {
        observed: [
          'La ubicación origen contiene inventario disponible.',
          'La ubicación destino se encuentra libre.',
          'Las condiciones operativas son favorables para la reubicación.',
        ],

        interpretation:
          'El movimiento es viable y aporta una buena eficiencia logística para la operación.',

        recommendation:
          'Continuar con la reubicación propuesta.',

        reasons,

        expectedBenefits: [
          'Mantener consistencia del inventario',
          'Mejorar la utilización de ubicaciones',
          'Reducir riesgo de reubicaciones innecesarias',
        ],

        confidence: finalScore,

        advisors: [
            {
                role: 'Inventario',
                icon: '📦',
                verdict: 'positive',
                message:
                'El origen tiene inventario disponible y el destino está libre.',
            },
            {
                role: 'Operación',
                icon: '🚛',
                verdict: 'positive',
                message:
                'La reubicación puede ejecutarse sin generar conflicto operativo.',
            },
            {
                role: 'Conclusión CJWMS',
                icon: '🤖',
                verdict: 'positive',
                message:
                'La recomendación es continuar con el movimiento propuesto.',
            },
        ],

      },
    };
  }

  if (finalScore >= 50) {
    return {
      status: 'warning',
      score: finalScore,
      recommendation:
        'Movimiento permitido con advertencias. El destino puede utilizarse, pero existe una alternativa potencialmente mejor.',
      reasons,

      explanation: {
        observed: [
          'La ubicación origen contiene inventario disponible.',
          'La ubicación destino se encuentra libre.',
          'Existen condiciones operativas que requieren revisión.',
        ],

        interpretation:
          'El movimiento es posible, pero no es necesariamente la mejor alternativa disponible.',

        recommendation:
          'Permitir la reubicación con advertencias y revisar si existe una ubicación más conveniente.',

        reasons,

        expectedBenefits: [
          'Mantener continuidad operativa',
          'Evitar bloqueos innecesarios',
          'Dar visibilidad al operador antes de ejecutar',
        ],

        confidence: finalScore,

        advisors: [
            {
                role: 'Inventario',
                icon: '📦',
                verdict: 'positive',
                message:
                'El origen tiene inventario disponible y el destino está libre.',
            },
            {
                role: 'Operación',
                icon: '🚛',
                verdict: 'warning',
                message:
                'El movimiento es posible, pero conviene revisar si existe una ubicación más eficiente.',
            },
            {
                role: 'Conclusión CJWMS',
                icon: '🤖',
                verdict: 'warning',
                message:
                'La recomendación es permitir el movimiento con advertencias.',
            },
        ],

      },
    };
  }

  return {
    status: 'warning',
    score: finalScore,
    recommendation:
      'Movimiento no recomendado. Aunque el destino está libre, las condiciones operativas no son las mejores.',
    reasons,

    explanation: {
        observed: [
        'La ubicación origen contiene inventario disponible.',
        'La ubicación destino se encuentra libre.',
        'Se detectaron condiciones operativas desfavorables.',
        ],

        interpretation:
        'El movimiento puede ejecutarse técnicamente, pero no es recomendable desde el punto de vista operativo.',

        recommendation:
        'Buscar una alternativa con mejor score antes de continuar.',

        reasons,

        expectedBenefits: [
        'Reducir riesgo de saturación',
        'Evitar movimientos poco eficientes',
        'Mejorar la calidad de las decisiones operativas',
        ],

        confidence: finalScore,

        advisors: [
            {
                role: 'Inventario',
                icon: '📦',
                verdict: 'positive',
                message:
                'El origen tiene inventario disponible y el destino está libre.',
            },
            {
                role: 'Operación',
                icon: '🚛',
                verdict: 'negative',
                message:
                'Las condiciones operativas no son favorables para este movimiento.',
            },
            {
                role: 'Conclusión CJWMS',
                icon: '🤖',
                verdict: 'warning',
                message:
                'La recomendación es buscar una alternativa con mejor score antes de continuar.',
            },
        ],

    },
  };
}