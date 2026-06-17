import {
  generateOperationalAlerts,
} from './operationalIntelligenceService';

import { fetchInventory } from '../repositories/inventoryRepository';
import { fetchRackPositions } from '../repositories/rackPositionRepository';
import { fetchPallets } from '../repositories/palletRepository';

import { fetchProducts } from '../repositories/productRepository';

export type OptimizationRecommendation = {
  id: string;
  priority: 'high' | 'medium' | 'low';
  score: number;
  level: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  expectedImpact: string;
  reasons: string[];
  action?: string;
};

function calculateLevel(
  score: number
): 'critical' | 'high' | 'medium' | 'low' {
  if (score >= 90) {
    return 'critical';
  }

  if (score >= 70) {
    return 'high';
  }

  if (score >= 50) {
    return 'medium';
  }

  return 'low';
}

export async function generateOptimizationRecommendations(): Promise<
  OptimizationRecommendation[]
> {
  const recommendations: OptimizationRecommendation[] = [];

  const inventory = await fetchInventory();
  const positions = await fetchRackPositions();
  const pallets = await fetchPallets();

  const products = await fetchProducts();

  const alerts = await generateOperationalAlerts();

  const subutilizedAlerts = alerts.filter(
    (alert) =>
      alert.title.includes('subutilizado')
  );

  if (subutilizedAlerts.length > 0) {
    const affectedLines = subutilizedAlerts
        .map((alert) => alert.title.replace(' subutilizado', ''))
        .join(', ');

    recommendations.push({
        id: crypto.randomUUID(),
        priority: 'medium',
        score: 70,
        level: calculateLevel(70),
        title: 'Consolidar líneas subutilizadas',
        description: `${subutilizedAlerts.length} líneas presentan baja ocupación: ${affectedLines}.`,
        expectedImpact:
            'Liberación potencial de espacio operativo y reducción de recorridos.',
        reasons: [
            `${subutilizedAlerts.length} líneas con baja ocupación detectadas`,
            'Oportunidad de consolidar inventario',
            'Posible reducción de recorridos internos',
        ],
    });
  }

  const saturationAlerts = alerts.filter(
    (alert) =>
      alert.title.includes('saturado') ||
      alert.title.includes('saturación')
  );

  if (saturationAlerts.length > 0) {
    recommendations.push({
      id: crypto.randomUUID(),
      priority: 'high',
      title: 'Redistribuir líneas saturadas',
      score: 90,
      level: calculateLevel(90),
      description: `${saturationAlerts.length} líneas requieren atención para evitar bloqueos operativos.`,
      expectedImpact:
        'Mayor disponibilidad operativa y reducción de riesgos.',
      reasons: [
        `${saturationAlerts.length} líneas con saturación detectada`,
        'Riesgo de bloqueo operativo',
        'Requiere redistribución preventiva',
      ],
    });
  }

  const PALLET_MAX_CAPACITY = 100;

  const inventoryByProduct = new Map<
    string,
    {
        palletCode: string;
        positionCode: string;
        quantity: number;
        unit: string;
    }[]
  >();

    inventory.forEach((inventoryItem) => {
    const pallet = pallets.find((p) => p.id === inventoryItem.pallet_id);
    const position = positions.find(
        (p) => p.id === inventoryItem.rack_position_id
    );

    if (!pallet || !position) {
        return;
    }

    const current = inventoryByProduct.get(pallet.product_id) ?? [];

    current.push({
        palletCode: pallet.pallet_code,
        positionCode: position.code,
        quantity: Number(pallet.quantity ?? 0),
        unit: pallet.unit ?? 'unidad',
    });

    inventoryByProduct.set(pallet.product_id, current);
    });

    function getRotationBonus(productId: string): number {
        const product = products.find((item) => item.id === productId);

        if (!product) {
            return 0;
        }

        if (product.rotation === 'alta') {
            return 20;
        }

        if (product.rotation === 'media') {
            return 10;
        }

        return 0;
        }

        inventoryByProduct.forEach((items, productId) => {
        if (items.length < 2) {
            return;
    }

    const totalQuantity = items.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const involvedPallets = items.map((item) => item.palletCode).join(', ');
    const involvedPositions = items
        .map((item) => item.positionCode)
        .join(', ');

    const unit = items[0]?.unit ?? 'unidad';

    const rotationBonus = getRotationBonus(productId);
    const product = products.find((item) => item.id === productId);
    const productRotation = product?.rotation ?? 'sin rotación definida';

    if (totalQuantity <= PALLET_MAX_CAPACITY) {
        recommendations.push({
        id: crypto.randomUUID(),
        priority: 'high',
        score: Math.min(
            100,
            40 + (items.length - 1) * 20 + rotationBonus
        ),
        level: calculateLevel(
            Math.min(
                100,
                40 + (items.length - 1) * 20 + rotationBonus
            )
        ),
        title: 'Consolidación viable por capacidad',
        description: `Se detectaron ${items.length} pallets del mismo producto con ${totalQuantity} ${unit} en total.`,
        expectedImpact: `Liberación potencial de hasta ${
            items.length - 1
        } posiciones de almacenamiento.`,
        reasons: [
            `${items.length} pallets candidatos a consolidación`,
            `Liberación potencial de ${items.length - 1} posiciones`,
            `Producto con rotación ${productRotation}`,
        ],
        action: `Consolidar pallets ${involvedPallets} ubicados en ${involvedPositions}. Capacidad máxima considerada: ${PALLET_MAX_CAPACITY} ${unit}.`,
        });
    } else {
        recommendations.push({
        id: crypto.randomUUID(),
        priority: 'medium',
        score: Math.min(
            60,
            20 + (items.length - 1) * 10 + rotationBonus
        ),
        level: calculateLevel(
            Math.min(
                60,
                20 + (items.length - 1) * 10 + rotationBonus
            )
        ),
        title: 'Consolidación parcial sugerida',
        description: `Se sdetectaron ${items.length} pallets del mismo producto, pero el total (${totalQuantity} ${unit}) supera la capacidad de ${PALLET_MAX_CAPACITY} ${unit}.`,
        expectedImpact:
            'Posible reducción parcial de posiciones, requiere validación operativa.',
        reasons: [
            `${items.length} pallets del mismo producto detectados`,
            'Capacidad insuficiente para consolidación total',
            `Producto con rotación ${productRotation}`,
        ],
        action: `Evaluar consolidación parcial de pallets ${involvedPallets} ubicados en ${involvedPositions}.`,
        });
    }
});

  return recommendations.sort((a, b) => b.score - a.score);
}