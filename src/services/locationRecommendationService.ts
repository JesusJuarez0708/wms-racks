import type { InventoryItem } from './inventoryService';
import type { Pallet } from './palletService';
import type { Product } from './productService';

import {
  validatePalletPositionPhysicalCompatibility,
  type PalletPositionPhysicalCompatibility,
  type RackPosition,
} from './rackPositionService';

import {
  evaluateRelocationDecision,
  type RelocationDecision,
} from './decisionEngineService';

export type LocationRecommendationCandidate = {
  position: RackPosition;
  physicalCompatibility: PalletPositionPhysicalCompatibility;
  decision: RelocationDecision;
};

export type LocationRecommendationDiscardReason =
  | 'occupied'
  | 'origin_position'
  | 'physical_incompatible'
  | 'insufficient_physical_data';

export type LocationRecommendationDiscardedPosition = {
  position: RackPosition;
  reason: LocationRecommendationDiscardReason;
  message: string;
  physicalCompatibility:
    | PalletPositionPhysicalCompatibility
    | null;
};

export type RankPalletDestinationPositionsInput = {
  warehouseId: string;
  pallet: Pallet;
  product: Product;
  pallets: Pallet[];
  positions: RackPosition[];
  inventory: InventoryItem[];
  originPositionId?: string | null;
};

export type RankPalletDestinationPositionsResult = {
  totalWarehousePositions: number;
  eligiblePositions: number;
  discardedPositions: number;
  candidates: LocationRecommendationCandidate[];
  discarded: LocationRecommendationDiscardedPosition[];
};

function normalizeProductRotation(
  rotation: Product['rotation']
): 'alta' | 'media' | 'baja' | null {
  if (
    rotation === 'alta' ||
    rotation === 'media' ||
    rotation === 'baja'
  ) {
    return rotation;
  }

  return null;
}

function normalizeRackType(
  rackType: RackPosition['rack_type']
): string | null {
  if (!rackType) {
    return null;
  }

  if (rackType === 'drive_in') {
    return 'drive-in';
  }

  return rackType;
}

export function rankPalletDestinationPositions(
  input: RankPalletDestinationPositionsInput
): RankPalletDestinationPositionsResult {
  const warehousePositions = input.positions.filter(
    (position) =>
        position.warehouse_id === input.warehouseId &&
        position.is_active &&
        position.position_status === 'available'
  );

  const warehousePositionIds = new Set(
    warehousePositions.map((position) => position.id)
  );

  const occupiedPositionIds = new Set(
    input.inventory
      .filter((item) =>
        warehousePositionIds.has(item.rack_position_id)
      )
      .map((item) => item.rack_position_id)
  );

  const palletById = new Map(
    input.pallets.map((pallet) => [pallet.id, pallet])
  );

  const originPosition = input.originPositionId
    ? warehousePositions.find(
        (position) => position.id === input.originPositionId
      ) ?? null
    : null;

  const originIsOccupied = input.originPositionId
    ? occupiedPositionIds.has(input.originPositionId)
    : true;

  const candidates: LocationRecommendationCandidate[] = [];
  const discarded: LocationRecommendationDiscardedPosition[] = [];

  for (const position of warehousePositions) {
    if (
      input.originPositionId &&
      position.id === input.originPositionId
    ) {
      discarded.push({
        position,
        reason: 'origin_position',
        message:
          'La posición origen no puede recomendarse como destino del mismo pallet.',
        physicalCompatibility: null,
      });

      continue;
    }

    if (occupiedPositionIds.has(position.id)) {
      discarded.push({
        position,
        reason: 'occupied',
        message:
          'La posición está físicamente ocupada y no puede considerarse como destino.',
        physicalCompatibility: null,
      });

      continue;
    }

    const physicalCompatibility =
      validatePalletPositionPhysicalCompatibility(
        input.pallet,
        position
      );

    if (physicalCompatibility.status === 'incompatible') {
      discarded.push({
        position,
        reason: 'physical_incompatible',
        message:
          'La posición fue descartada porque no cumple las restricciones físicas del pallet.',
        physicalCompatibility,
      });

      continue;
    }

    if (
      physicalCompatibility.status === 'insufficient_data'
    ) {
      discarded.push({
        position,
        reason: 'insufficient_physical_data',
        message:
          'La posición fue descartada porque no existen datos físicos suficientes para garantizar una ubicación segura.',
        physicalCompatibility,
      });

      continue;
    }

    const linePositions = warehousePositions.filter(
      (linePosition) =>
        linePosition.line === position.line
    );

    const occupiedLinePositions = linePositions.filter(
      (linePosition) =>
        occupiedPositionIds.has(linePosition.id)
    );

    const destinationLineOccupancyPercentage =
      linePositions.length > 0
        ? (
            occupiedLinePositions.length /
            linePositions.length
          ) * 100
        : null;

    const sameSkuInDestinationLine =
      input.inventory.some((inventoryItem) => {
        const inventoryPosition = warehousePositions.find(
          (warehousePosition) =>
            warehousePosition.id ===
            inventoryItem.rack_position_id
        );

        if (
          !inventoryPosition ||
          inventoryPosition.line !== position.line
        ) {
          return false;
        }

        const inventoryPallet = palletById.get(
          inventoryItem.pallet_id
        );

        return (
          inventoryPallet?.product_id === input.product.id
        );
      });

    const decision = evaluateRelocationDecision({
      originLocationCode:
        originPosition?.code ?? 'Recepción',
      destinationLocationCode: position.code,
      originIsOccupied,
      destinationIsOccupied: false,
      productSku: input.product.sku ?? null,
      productRotation: normalizeProductRotation(
        input.product.rotation
      ),
      destinationRackType: normalizeRackType(
        position.rack_type
      ),
      destinationLineOccupancyPercentage,
      destinationDepth: position.depth ?? null,
      maxDepth: position.max_depth ?? null,
      sameSkuInDestinationLine,
    });

    candidates.push({
      position,
      physicalCompatibility,
      decision,
    });
  }

  candidates.sort((first, second) => {
    if (first.decision.score !== second.decision.score) {
      return second.decision.score - first.decision.score;
    }

    return first.position.code.localeCompare(
      second.position.code
    );
  });

  return {
    totalWarehousePositions: warehousePositions.length,
    eligiblePositions: candidates.length,
    discardedPositions: discarded.length,
    candidates,
    discarded,
  };
}
