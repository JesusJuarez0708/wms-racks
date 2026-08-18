import { useEffect, useState } from 'react';

import {
  resetCJWMSDemoData,
  seedCJWMSDemoData,
} from '../seeders/cjwmsSeeder';

import { getWarehouses } from '../services/warehouseService';
import { getProducts } from '../services/productService';
import { getRacks } from '../services/rackService';

import {
  getRackPositions,
  updateRackPositionPhysical,
  validatePalletPositionPhysicalCompatibility,
} from '../services/rackPositionService';

import {
  changeInventoryPosition,
  getInventory,
} from '../services/inventoryService';

import { getMovements } from '../services/movementService';
import {
  getOperationalMemories,
  registerOperationalMemory,
} from '../services/operationalMemoryService';

import {
  detectMemoryPatterns,
  type MemoryPattern,
} from '../services/memoryPatternService';

import {
  considerOperationalKnowledge,
  evaluateOperationalKnowledgeEligibility,
  generateOperationalKnowledge,
} from '../services/operationalKnowledgeService';

import {
  generateRecommendationsFromPatterns,
  type IntelligenceRecommendation,
} from '../services/recommendationIntelligenceService';

import type { OperationalMemoryRecord } from '../repositories/operationalMemoryRepository';

import {
  analyzeOperationalMemories,
  type MemoryInsight,
} from '../services/memoryIntelligenceService';

import type { OperationalDecision } from '../services/decisionEngineService';
import { generateOperationalDecisions } from '../services/decisionEngineService';

import { executeMovementWorkflow } from '../services/movementWorkflowService';

import { testGateAccessConnection } from '../services/testGateAccessConnection';

import {
  getPallets,
  updatePalletPhysical,
} from '../services/palletService';

import {
  rankPalletDestinationPositions,
} from '../services/locationRecommendationService';

type LabStats = {
  warehouses: number;
  products: number;
  racks: number;
  positions: number;
  inventory: number;
  movements: number;
};

type SeederExecutionSummary = {
  warehouseCode: string;
  warehouseName: string;
  products: number;
  racks: number;
  positions: number;
  pallets: number;
  inventory: number;
  movements: number;
  confirmedAt: string;
};

type SeederResult = Awaited<
  ReturnType<typeof seedCJWMSDemoData>
>;

function validateSeederResult(result: SeederResult): string[] {
  const errors: string[] = [];

  const warehouseId = result.warehouse.id;

  const warehouseRacks = result.racks.filter(
    (rack) => rack.warehouse_id === warehouseId
  );

  const warehousePositions = result.positions.filter(
    (position) => position.warehouse_id === warehouseId
  );

  const warehouseInventory = result.inventory.filter(
    (item) => item.warehouse_id === warehouseId
  );

  const warehouseMovements = result.movements.filter(
    (movement) => movement.warehouse_id === warehouseId
  );

  if (result.warehouse.code !== 'CJWMS-01') {
    errors.push(
      'El almacén operativo CJWMS-01 no fue identificado correctamente.'
    );
  }

  if (result.products.length === 0) {
    errors.push('No existen productos disponibles después del Seeder.');
  }

  if (warehouseRacks.length === 0) {
    errors.push(
      'El almacén CJWMS-01 no contiene racks después del Seeder.'
    );
  }

  if (warehousePositions.length === 0) {
    errors.push(
      'El almacén CJWMS-01 no contiene posiciones después del Seeder.'
    );
  }

  if (result.pallets.length === 0) {
    errors.push('No existen pallets disponibles después del Seeder.');
  }

  if (warehouseInventory.length === 0) {
    errors.push(
      'El almacén CJWMS-01 no contiene inventario después del Seeder.'
    );
  }

  if (warehouseMovements.length === 0) {
    errors.push(
      'El almacén CJWMS-01 no contiene movimientos después del Seeder.'
    );
  }

  return errors;
}

function IntegrationLabPage() {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [stats, setStats] = useState<LabStats | null>(null);
  const [memories, setMemories] = useState<OperationalMemoryRecord[]>([]);
  const [memoryFilter, setMemoryFilter] = useState('all');
  const [memoryInsights, setMemoryInsights] = useState<MemoryInsight[]>([]);
  const [patterns, setPatterns] = useState<MemoryPattern[]>([]);

  const [decisions, setDecisions] = useState<OperationalDecision[]>([]);

  const [recommendations, setRecommendations] = useState<
    IntelligenceRecommendation[]
  >([]);

  const [seederRunning, setSeederRunning] = useState(false);

  const [seederSummary, setSeederSummary] = useState<SeederExecutionSummary | null>(null);

    type SeederStage =
    | 'idle'
    | 'reset'
    | 'seeding'
    | 'validating'
    | 'completed'
    | 'error';

  const [seederStage, setSeederStage] =
    useState<SeederStage>('idle');

  const filteredMemories =
    memoryFilter === 'all'
      ? [...memories]
      : memories.filter(
          (memory) => memory.memory_type === memoryFilter
        );

  filteredMemories.sort(
    (a, b) => (b.score ?? 0) - (a.score ?? 0)
  );

  function addLog(message: string) {
    const time = new Date().toLocaleTimeString();

    setLogs((prev) => [`[${time}] ${message}`, ...prev]);
  }

  async function loadStats() {
    setLoading(true);

    try {
      const [
        warehouses,
        products,
        racks,
        positions,
        inventory,
        movements,
      ] = await Promise.all([
        getWarehouses(),
        getProducts(),
        getRacks(),
        getRackPositions(),
        getInventory(),
        getMovements(),
      ]);

      setStats({
        warehouses: warehouses.length,
        products: products.length,
        racks: racks.length,
        positions: positions.length,
        inventory: inventory.length,
        movements: movements.length,
      });

      addLog('Estadísticas cargadas correctamente.');
    } catch (error) {
      console.error(error);
      addLog('Error al cargar estadísticas.');
    } finally {
      setLoading(false);
    }
  }

  async function loadOperationalMemories() {
    setLoading(true);

    try {
      const data = await getOperationalMemories();

      setMemories(data);
      setMemoryInsights(analyzeOperationalMemories(data));

      const detectedPatterns = await detectMemoryPatterns();

      setPatterns(detectedPatterns);

      const generatedRecommendations =
        generateRecommendationsFromPatterns(detectedPatterns);

      setRecommendations(generatedRecommendations);

      const generatedDecisions =
        generateOperationalDecisions(
          detectedPatterns,
          generatedRecommendations
        );

      setDecisions(generatedDecisions);

      addLog(
        `Decisiones generadas: ${generatedDecisions.length}.`
      );

      addLog(`Patrones detectados: ${detectedPatterns.length}.`);

      addLog(
        `Recomendaciones generadas: ${generatedRecommendations.length}.`
      );

      addLog(`Memorias cargadas: ${data.length} registros.`);
    } catch (error) {
      console.error(error);
      addLog('Error al cargar Memoria Operativa.');
    } finally {
      setLoading(false);
    }
  }

  // Seeder
  async function runSeeder() {
    setLoading(true);
    setSeederRunning(true);
    setSeederStage('reset');
    setSeederSummary(null);

    try {
      addLog(
        'Centro de Control: iniciando ejecución del Laboratorio Operativo.'
      );

      addLog('Paso 1/4 — Ejecutando Reset Inteligente...');
      await resetCJWMSDemoData();
      addLog('Paso 1/4 — Reset Inteligente completado.');

      setSeederStage('seeding');

      addLog('Paso 2/4 — Ejecutando Seeder Operativo...');
      const result = await seedCJWMSDemoData();
      addLog('Paso 2/4 — Seeder Operativo completado.');

      setSeederStage('validating');

      addLog('Paso 3/4 — Validando Laboratorio Operativo...');

      const validationErrors = validateSeederResult(result);

      if (validationErrors.length > 0) {
        for (const validationError of validationErrors) {
          addLog(`Validación fallida: ${validationError}`);
        }

        throw new Error(
          `La validación del Laboratorio encontró ${validationErrors.length} problema(s).`
        );
      }

      const warehouseId = result.warehouse.id;

      const warehouseRacks = result.racks.filter(
        (rack) => rack.warehouse_id === warehouseId
      ).length;

      const warehousePositions = result.positions.filter(
        (position) => position.warehouse_id === warehouseId
      ).length;

      const warehouseInventory = result.inventory.filter(
        (item) => item.warehouse_id === warehouseId
      ).length;

      const warehouseMovements = result.movements.filter(
        (movement) => movement.warehouse_id === warehouseId
      ).length;

      setSeederSummary({
        warehouseCode: result.warehouse.code,
        warehouseName: result.warehouse.name,
        products: result.products.length,
        racks: warehouseRacks,
        positions: warehousePositions,
        pallets: result.pallets.length,
        inventory: warehouseInventory,
        movements: warehouseMovements,
        confirmedAt: new Date().toLocaleTimeString(),
      });

      addLog(
        `Paso 3/4 — Validación correcta: ${warehouseRacks} racks, ${warehousePositions} posiciones, ${warehouseInventory} inventarios y ${warehouseMovements} movimientos en CJWMS-01.`
      );

      setSeederStage('completed');

      addLog(
        'Paso 4/4 — Ejecución confirmada. Laboratorio Operativo CJWMS listo.'
      );

      await loadStats();
    } catch (error) {
      console.error(error);

      setSeederStage('error');

      addLog(
        error instanceof Error
          ? `Centro de Control: ejecución detenida — ${error.message}`
          : 'Centro de Control: error inesperado durante la ejecución.'
      );
    } finally {
      setSeederRunning(false);
      setLoading(false);
    }
  }

  // Pruebas de persistencia
  async function testMovements() {
    setLoading(true);

    try {
      const movements = await getMovements();
      addLog(`Movements OK: ${movements.length} registros.`);
    } catch (error) {
      console.error(error);
      addLog('Error al probar Movements.');
    } finally {
      setLoading(false);
    }
  }

  async function testWorkflow() {
    setLoading(true);

    let inventoryItemId: string | null = null;
    let originalPositionId: string | null = null;

    try {
      const [inventory, pallets, positions] =
        await Promise.all([
          getInventory(),
          getPallets(),
          getRackPositions(),
        ]);

      const occupiedPositionIds = new Set(
        inventory.map(
          (item) => item.rack_position_id
        )
      );

      const candidate = inventory.find(
        (item) => {
          if (item.status !== 'available') {
            return false;
          }

          const pallet = pallets.find(
            (candidatePallet) =>
              candidatePallet.id === item.pallet_id
          );

          const originPosition = positions.find(
            (position) =>
              position.id === item.rack_position_id
          );

          if (!pallet || !originPosition) {
            return false;
          }

          return (
            validatePalletPositionPhysicalCompatibility(
              pallet,
              originPosition
            ).status === 'compatible'
          );
        }
      );

      if (!candidate) {
        throw new Error(
          'No existe inventario disponible en una posición físicamente compatible para ejecutar Test Workflow.'
        );
      }

      const pallet = pallets.find(
        (item) =>
          item.id === candidate.pallet_id
      );

      const originPosition = positions.find(
        (position) =>
          position.id === candidate.rack_position_id
      );

      if (!pallet || !originPosition) {
        throw new Error(
          'No fue posible obtener el pallet o la posición origen para Test Workflow.'
        );
      }

      const destinationPosition = positions.find(
        (position) =>
          position.warehouse_id ===
            candidate.warehouse_id &&
          position.id !== originPosition.id &&
          !occupiedPositionIds.has(position.id) &&
          position.is_active &&
          position.position_status === 'available' &&
          validatePalletPositionPhysicalCompatibility(
            pallet,
            position
          ).status === 'compatible'
      );

      if (!destinationPosition) {
        throw new Error(
          'No existe una posición libre físicamente compatible para ejecutar Test Workflow.'
        );
      }

      inventoryItemId = candidate.id;
      originalPositionId = originPosition.id;

      await executeMovementWorkflow({
        warehouse_id: candidate.warehouse_id,
        movement_type: 'reubicacion',
        pallet_id: pallet.id,
        product_id: pallet.product_id,
        origin_position_id: originPosition.id,
        destination_position_id:
          destinationPosition.id,
        quantity: pallet.quantity,
        unit: pallet.unit,
        status: 'completed',
        reason:
          'Integration Lab Workflow Compatible Test',
        notes:
          'Prueba positiva de reubicación físicamente compatible.',
        decision_score: 100,
        decision_explanation:
          'La posición destino cumple las restricciones físicas obligatorias.',
        created_by: 'Integration Lab',
      });

      const inventoryAfterMovement =
        await getInventory();

      const movedInventoryItem =
        inventoryAfterMovement.find(
          (item) => item.id === candidate.id
        );

      if (!movedInventoryItem) {
        throw new Error(
          'El inventario de prueba no fue encontrado después de la reubicación.'
        );
      }

      if (
        movedInventoryItem.rack_position_id !==
        destinationPosition.id
      ) {
        throw new Error(
          `La reubicación compatible no llegó a la posición ${destinationPosition.code}.`
        );
      }

      addLog(
        `Workflow físico compatible OK: ${pallet.pallet_code} fue reubicado correctamente de ${originPosition.code} a ${destinationPosition.code}.`
      );

      await executeMovementWorkflow({
        warehouse_id: candidate.warehouse_id,
        movement_type: 'reubicacion',
        pallet_id: pallet.id,
        product_id: pallet.product_id,
        origin_position_id:
          destinationPosition.id,
        destination_position_id:
          originPosition.id,
        quantity: pallet.quantity,
        unit: pallet.unit,
        status: 'completed',
        reason:
          'Integration Lab Workflow Compatible Test Restore',
        notes:
          'Restauración operativa posterior a la prueba positiva.',
        decision_score: 100,
        decision_explanation:
          'Restauración del pallet a su ubicación original después de validar la reubicación compatible.',
        created_by: 'Integration Lab',
      });

      const inventoryRestored =
        await getInventory();

      const restoredItem =
        inventoryRestored.find(
          (item) => item.id === candidate.id
        );

      if (
        !restoredItem ||
        restoredItem.rack_position_id !==
          originPosition.id
      ) {
        throw new Error(
          `La prueba positiva terminó correctamente, pero no fue posible confirmar el retorno a ${originPosition.code}.`
        );
      }

      addLog(
        `Workflow restaurado OK: ${pallet.pallet_code} regresó correctamente a ${originPosition.code}.`
      );

      await loadStats();
    } catch (error) {
      console.error(error);

      addLog(
        error instanceof Error
          ? `Error al probar Workflow: ${error.message}`
          : 'Error inesperado al probar Workflow.'
      );
    } finally {
      /*
      * Protección adicional:
      * si la prueba se interrumpió después del primer movimiento,
      * restauramos directamente la ubicación para no dejar alterado
      * el inventario del laboratorio.
      */
      if (
        inventoryItemId &&
        originalPositionId
      ) {
        try {
          const currentInventory =
            await getInventory();

          const currentItem =
            currentInventory.find(
              (item) =>
                item.id === inventoryItemId
            );

          if (
            currentItem &&
            currentItem.rack_position_id !==
              originalPositionId
          ) {
            await changeInventoryPosition(
              inventoryItemId,
              originalPositionId
            );
          }
        } catch (cleanupError) {
          console.error(
            'Error restaurando inventario después de Test Workflow:',
            cleanupError
          );
        }
      }

      setLoading(false);
    }
  }

  async function testGateAccess() {
    setLoading(true);

    try {
      await testGateAccessConnection();

      addLog('Gate Access OK: conexión y persistencia validadas.');

      await loadStats();
    } catch (error) {
      console.error(error);

      addLog(
        error instanceof Error
          ? `Error en Gate Access: ${error.message}`
          : 'Error en Gate Access.'
      );
    } finally {
      setLoading(false);
    }
  }

  async function testPhysicalCompatibility() {
    setLoading(true);

    try {
      const [pallets, positions] = await Promise.all([
        getPallets(),
        getRackPositions(),
      ]);

      const pallet = pallets.find(
        (item) =>
          item.width_m !== null &&
          item.length_m !== null &&
          item.height_m !== null &&
          item.current_weight_kg !== null
      );

      const position = positions.find(
        (item) =>
          item.max_height_m !== null &&
          item.max_weight_kg !== null
      );

      if (!pallet || !position) {
        addLog(
          'Compatibilidad física: faltan pallets o posiciones con datos físicos completos. Ejecute primero el Seeder.'
        );
        return;
      }

      const safeMaxHeightM = Math.max(
        position.max_height_m ?? 0,
        pallet.height_m ?? 0
      );

      const safeMaxWeightKg = Math.max(
        position.max_weight_kg ?? 0,
        pallet.current_weight_kg ?? 0
      );

      // --------------------------------------------------------
      // FASE 23.5 — Geometría Selectivo
      // 1.02 m ancho × 1.20 m largo
      // --------------------------------------------------------

      const selectivoPosition = {
        ...position,
        code: 'TEST-SELECTIVO',
        rack_type: 'selectivo',
        level: '1',
        max_height_m: safeMaxHeightM,
        max_weight_kg: safeMaxWeightKg,
      };

      const selectivoResult =
        validatePalletPositionPhysicalCompatibility(
          pallet,
          selectivoPosition
        );

      if (selectivoResult.status !== 'compatible') {
        throw new Error(
          `Selectivo: se esperaba compatible y se obtuvo ${selectivoResult.status}.`
        );
      }

      if (
        selectivoResult.requiredOrientation !==
        'standard'
      ) {
        throw new Error(
          `Selectivo: se esperaba orientación standard y se obtuvo ${selectivoResult.requiredOrientation}.`
        );
      }

      if (
        selectivoResult.positionWidthM !== 1.02 ||
        selectivoResult.positionLengthM !== 1.2
      ) {
        throw new Error(
          'Selectivo: la geometría esperada es 1.02 m × 1.20 m.'
        );
      }

      // --------------------------------------------------------
      // FASE 23.5 — Drive In nivel de piso
      // 1.02 m ancho × 1.20 m largo
      // --------------------------------------------------------

      const driveInFloorPosition = {
        ...position,
        code: 'TEST-DRIVE-IN-N1',
        rack_type: 'drive_in',
        level: '1',
        max_height_m: safeMaxHeightM,
        max_weight_kg: safeMaxWeightKg,
      };

      const driveInFloorResult =
        validatePalletPositionPhysicalCompatibility(
          pallet,
          driveInFloorPosition
        );

      if (
        driveInFloorResult.status !== 'compatible'
      ) {
        throw new Error(
          `Drive In nivel 1: se esperaba compatible y se obtuvo ${driveInFloorResult.status}.`
        );
      }

      if (
        driveInFloorResult.requiredOrientation !==
        'standard'
      ) {
        throw new Error(
          `Drive In nivel 1: se esperaba orientación standard y se obtuvo ${driveInFloorResult.requiredOrientation}.`
        );
      }

      if (
        driveInFloorResult.positionWidthM !== 1.02 ||
        driveInFloorResult.positionLengthM !== 1.2
      ) {
        throw new Error(
          'Drive In nivel 1: la geometría esperada es 1.02 m × 1.20 m.'
        );
      }

      // --------------------------------------------------------
      // FASE 23.5 — Drive In niveles superiores
      // 1.20 m ancho × 1.02 m largo
      // pallet girado 90°
      // --------------------------------------------------------

      const driveInUpperPosition = {
        ...position,
        code: 'TEST-DRIVE-IN-N2',
        rack_type: 'drive_in',
        level: '2',
        max_height_m: safeMaxHeightM,
        max_weight_kg: safeMaxWeightKg,
      };

      const driveInUpperResult =
        validatePalletPositionPhysicalCompatibility(
          pallet,
          driveInUpperPosition
        );

      if (
        driveInUpperResult.status !== 'compatible'
      ) {
        throw new Error(
          `Drive In nivel superior: se esperaba compatible y se obtuvo ${driveInUpperResult.status}.`
        );
      }

      if (
        driveInUpperResult.requiredOrientation !==
        'rotated_90'
      ) {
        throw new Error(
          `Drive In nivel superior: se esperaba orientación rotated_90 y se obtuvo ${driveInUpperResult.requiredOrientation}.`
        );
      }

      if (
        driveInUpperResult.positionWidthM !== 1.2 ||
        driveInUpperResult.positionLengthM !== 1.02
      ) {
        throw new Error(
          'Drive In nivel superior: la geometría esperada es 1.20 m × 1.02 m.'
        );
      }

      // --------------------------------------------------------
      // FASE 23.5 — Incompatibilidad dimensional
      // --------------------------------------------------------

      const oversizedPallet = {
        ...pallet,
        width_m: 1.03,
        length_m: 1.2,
      };

      const dimensionalIncompatibleResult =
        validatePalletPositionPhysicalCompatibility(
          oversizedPallet,
          selectivoPosition
        );

      if (
        dimensionalIncompatibleResult.status !==
        'incompatible'
      ) {
        throw new Error(
          `Dimensiones excedidas: se esperaba incompatible y se obtuvo ${dimensionalIncompatibleResult.status}.`
        );
      }

      const dimensionalReason =
        dimensionalIncompatibleResult.reasons.find(
          (reason) =>
            reason.field === 'dimensions'
        );

      if (
        dimensionalReason?.status !== 'incompatible'
      ) {
        throw new Error(
          'No se detectó correctamente la incompatibilidad dimensional.'
        );
      }

      // --------------------------------------------------------
      // FASE 23.5 — Datos dimensionales insuficientes
      // --------------------------------------------------------

      const incompletePallet = {
        ...pallet,
        width_m: null,
      };

      const insufficientDimensionsResult =
        validatePalletPositionPhysicalCompatibility(
          incompletePallet,
          selectivoPosition
        );

      if (
        insufficientDimensionsResult.status !==
        'insufficient_data'
      ) {
        throw new Error(
          `Dimensiones incompletas: se esperaba insufficient_data y se obtuvo ${insufficientDimensionsResult.status}.`
        );
      }

      // --------------------------------------------------------
      // Regresión FASE 23.3 — Altura y peso incompatibles
      // --------------------------------------------------------

      const incompatiblePosition = {
        ...selectivoPosition,
        max_height_m:
          pallet.height_m !== null
            ? Math.max(
                pallet.height_m - 0.1,
                0.01
              )
            : 0.01,
        max_weight_kg:
          pallet.current_weight_kg !== null
            ? Math.max(
                pallet.current_weight_kg - 1,
                0.01
              )
            : 0.01,
      };

      const incompatibleResult =
        validatePalletPositionPhysicalCompatibility(
          pallet,
          incompatiblePosition
        );

      if (
        incompatibleResult.status !== 'incompatible'
      ) {
        throw new Error(
          `Altura/peso: se esperaba incompatible y se obtuvo ${incompatibleResult.status}.`
        );
      }

      // --------------------------------------------------------
      // Regresión FASE 23.3 — Capacidad física incompleta
      // --------------------------------------------------------

      const insufficientDataPosition = {
        ...selectivoPosition,
        max_height_m: null,
        max_weight_kg: null,
      };

      const insufficientDataResult =
        validatePalletPositionPhysicalCompatibility(
          pallet,
          insufficientDataPosition
        );

      if (
        insufficientDataResult.status !==
        'insufficient_data'
      ) {
        throw new Error(
          `Capacidad incompleta: se esperaba insufficient_data y se obtuvo ${insufficientDataResult.status}.`
        );
      }

      addLog(
        `Compatibilidad física OK: ${pallet.pallet_code} validó Selectivo normal, Drive In nivel 1 normal, Drive In superior girado 90°, incompatibilidad dimensional y datos insuficientes.`
      );
    } catch (error) {
      console.error(error);

      addLog(
        error instanceof Error
          ? `Error en compatibilidad física: ${error.message}`
          : 'Error inesperado en compatibilidad física.'
      );
    } finally {
      setLoading(false);
    }
  }

  async function testLocationRecommendationPhysicalFilter() {
    setLoading(true);

    try {
      const [
        pallets,
        products,
        positions,
        inventory,
      ] = await Promise.all([
        getPallets(),
        getProducts(),
        getRackPositions(),
        getInventory(),
      ]);

      const testInventoryItem = inventory.find(
        (item) => {
          if (item.status !== 'available') {
            return false;
          }

          const pallet = pallets.find(
            (candidate) =>
              candidate.id === item.pallet_id
          );

          const originPosition = positions.find(
            (position) =>
              position.id === item.rack_position_id
          );

          const product = products.find(
            (candidate) =>
              candidate.id === pallet?.product_id
          );

          if (
            !pallet ||
            !originPosition ||
            !product ||
            pallet.width_m === null ||
            pallet.length_m === null ||
            pallet.height_m === null ||
            pallet.current_weight_kg === null
          ) {
            return false;
          }

          return positions.some(
            (position) =>
              position.warehouse_id ===
                item.warehouse_id &&
              position.id !== originPosition.id &&
              position.is_active &&
              position.position_status ===
                'available' &&
              validatePalletPositionPhysicalCompatibility(
                pallet,
                position
              ).status === 'compatible'
          );
        }
      );

      if (!testInventoryItem) {
        throw new Error(
          'No existe un pallet con datos físicos completos y una posición compatible para probar la recomendación 23.6.'
        );
      }

      const pallet = pallets.find(
        (item) =>
          item.id === testInventoryItem.pallet_id
      );

      if (!pallet) {
        throw new Error(
          'No fue posible localizar el pallet de prueba para la recomendación 23.6.'
        );
      }

      const product = products.find(
        (item) => item.id === pallet.product_id
      );

      if (!product) {
        throw new Error(
          'No fue posible localizar el producto del pallet de prueba.'
        );
      }

      const originPosition = positions.find(
        (position) =>
          position.id ===
          testInventoryItem.rack_position_id
      );

      if (!originPosition) {
        throw new Error(
          'No fue posible localizar la posición origen del pallet de prueba.'
        );
      }

      const compatibleBasePosition = positions.find(
        (position) =>
          position.warehouse_id ===
            testInventoryItem.warehouse_id &&
          position.id !== originPosition.id &&
          position.is_active &&
          position.position_status === 'available' &&
          validatePalletPositionPhysicalCompatibility(
            pallet,
            position
          ).status === 'compatible'
      );

      if (!compatibleBasePosition) {
        throw new Error(
          'No existe una posición base físicamente compatible para ejecutar la prueba 23.6.'
        );
      }

      const safeMaxHeightM = Math.max(
        compatibleBasePosition.max_height_m ?? 0,
        pallet.height_m ?? 0
      );

      const safeMaxWeightKg = Math.max(
        compatibleBasePosition.max_weight_kg ?? 0,
        pallet.current_weight_kg ?? 0
      );

      const compatiblePositionA = {
        ...compatibleBasePosition,
        id: 'TEST-23-6-COMPATIBLE-A',
        code: 'TEST-23-6-COMPATIBLE-A',
        max_height_m: safeMaxHeightM,
        max_weight_kg: safeMaxWeightKg,
      };

      const compatiblePositionB = {
        ...compatibleBasePosition,
        id: 'TEST-23-6-COMPATIBLE-B',
        code: 'TEST-23-6-COMPATIBLE-B',
        max_height_m: safeMaxHeightM,
        max_weight_kg: safeMaxWeightKg,
      };

      const incompatiblePosition = {
        ...compatibleBasePosition,
        id: 'TEST-23-6-INCOMPATIBLE',
        code: 'TEST-23-6-INCOMPATIBLE',
        max_height_m: safeMaxHeightM,
        max_weight_kg:
          pallet.current_weight_kg !== null
            ? Math.max(
                pallet.current_weight_kg - 1,
                0.01
              )
            : 0.01,
      };

      const insufficientDataPosition = {
        ...compatibleBasePosition,
        id: 'TEST-23-6-INSUFFICIENT',
        code: 'TEST-23-6-INSUFFICIENT',
        max_height_m: safeMaxHeightM,
        max_weight_kg: null,
      };

      const recommendation =
        rankPalletDestinationPositions({
          warehouseId:
            testInventoryItem.warehouse_id,
          pallet,
          product,
          pallets,
          positions: [
            originPosition,
            compatiblePositionA,
            compatiblePositionB,
            incompatiblePosition,
            insufficientDataPosition,
          ],
          inventory,
          originPositionId: originPosition.id,
        });

      if (recommendation.candidates.length !== 2) {
        throw new Error(
          `Se esperaban 2 posiciones físicamente elegibles y se obtuvieron ${recommendation.candidates.length}.`
        );
      }

      const incompatibleCandidate =
        recommendation.candidates.find(
          (candidate) =>
            candidate.position.id ===
            incompatiblePosition.id
        );

      if (incompatibleCandidate) {
        throw new Error(
          'La posición físicamente incompatible entró al ranking y debía ser descartada.'
        );
      }

      const insufficientCandidate =
        recommendation.candidates.find(
          (candidate) =>
            candidate.position.id ===
            insufficientDataPosition.id
        );

      if (insufficientCandidate) {
        throw new Error(
          'La posición con datos físicos insuficientes entró al ranking y debía ser descartada.'
        );
      }

      const incompatibleDiscard =
        recommendation.discarded.find(
          (item) =>
            item.position.id ===
            incompatiblePosition.id
        );

      if (
        incompatibleDiscard?.reason !==
        'physical_incompatible'
      ) {
        throw new Error(
          'La posición incompatible no fue registrada correctamente como descarte físico.'
        );
      }

      const insufficientDiscard =
        recommendation.discarded.find(
          (item) =>
            item.position.id ===
            insufficientDataPosition.id
        );

      if (
        insufficientDiscard?.reason !==
        'insufficient_physical_data'
      ) {
        throw new Error(
          'La posición con información física incompleta no fue descartada con el motivo esperado.'
        );
      }

      const nonCompatibleCandidate =
        recommendation.candidates.find(
          (candidate) =>
            candidate.physicalCompatibility.status !==
            'compatible'
        );

      if (nonCompatibleCandidate) {
        throw new Error(
          `La posición ${nonCompatibleCandidate.position.code} llegó al ranking sin ser físicamente compatible.`
        );
      }

      for (
        let index = 1;
        index < recommendation.candidates.length;
        index += 1
      ) {
        const previous =
          recommendation.candidates[index - 1];

        const current =
          recommendation.candidates[index];

        if (
          previous.decision.score <
          current.decision.score
        ) {
          throw new Error(
            'Las posiciones candidatas no fueron ordenadas correctamente de mayor a menor score.'
          );
        }
      }

      const bestCandidate =
        recommendation.candidates[0];

      if (!bestCandidate) {
        throw new Error(
          'El motor no produjo una mejor posición recomendada.'
        );
      }

      addLog(
        `FASE 23.6 OK: ${pallet.pallet_code} obtuvo ${recommendation.eligiblePositions} posiciones físicamente elegibles. La mejor fue ${bestCandidate.position.code} con score ${bestCandidate.decision.score}. La posición incompatible y la posición con datos físicos insuficientes fueron descartadas antes del ranking.`
      );
    } catch (error) {
      console.error(error);

      addLog(
        error instanceof Error
          ? `Error en recomendación física 23.6: ${error.message}`
          : 'Error inesperado en recomendación física 23.6.'
      );
    } finally {
      setLoading(false);
    }
  }

  async function testLocationDecisionTraceability() {
    setLoading(true);

    let inventoryItemId: string | null = null;
    let originalPositionId: string | null = null;

    try {
      const [
        pallets,
        products,
        positions,
        inventory,
      ] = await Promise.all([
        getPallets(),
        getProducts(),
        getRackPositions(),
        getInventory(),
      ]);

      const testInventoryItem = inventory.find((item) => {
        if (item.status !== 'available') {
          return false;
        }

        const pallet = pallets.find(
          (candidate) => candidate.id === item.pallet_id
        );

        const product = products.find(
          (candidate) =>
            candidate.id === pallet?.product_id
        );

        const originPosition = positions.find(
          (position) =>
            position.id === item.rack_position_id
        );

        if (!pallet || !product || !originPosition) {
          return false;
        }

        const recommendation =
          rankPalletDestinationPositions({
            warehouseId: item.warehouse_id,
            pallet,
            product,
            pallets,
            positions,
            inventory,
            originPositionId: originPosition.id,
          });

        return recommendation.candidates.length >= 2;
      });

      if (!testInventoryItem) {
        throw new Error(
          'No existe un pallet con al menos dos recomendaciones válidas para probar cumplimiento y desviación 23.10.'
        );
      }

      const pallet = pallets.find(
        (item) => item.id === testInventoryItem.pallet_id
      );

      if (!pallet) {
        throw new Error(
          'No fue posible localizar el pallet de prueba para 23.7.'
        );
      }

      const product = products.find(
        (item) => item.id === pallet.product_id
      );

      if (!product) {
        throw new Error(
          'No fue posible localizar el producto del pallet de prueba para 23.7.'
        );
      }

      const originPosition = positions.find(
        (position) =>
          position.id === testInventoryItem.rack_position_id
      );

      if (!originPosition) {
        throw new Error(
          'No fue posible localizar la posición origen para 23.7.'
        );
      }

      const recommendation =
        rankPalletDestinationPositions({
          warehouseId: testInventoryItem.warehouse_id,
          pallet,
          product,
          pallets,
          positions,
          inventory,
          originPositionId: originPosition.id,
        });

      const primaryCandidate = recommendation.candidates[0];
      const deviationCandidate = recommendation.candidates[1];

      if (!primaryCandidate || !deviationCandidate) {
        throw new Error(
          'El motor no produjo dos destinos inteligentes para probar 23.10.'
        );
      }

      const expectedExplanation = [
        `Reubicación evaluada por CJWMS para la posición ${primaryCandidate.position.code}.`,
        `Recomendación: ${primaryCandidate.decision.explanation.recommendation}`,
        `Interpretación: ${primaryCandidate.decision.explanation.interpretation}`,
        `Confianza: ${primaryCandidate.decision.explanation.confidence}/100.`,
      ].join(' ');

      const expectedRecommendationId =
        crypto.randomUUID();

      inventoryItemId = testInventoryItem.id;
      originalPositionId = originPosition.id;

      const createdMovement = await executeMovementWorkflow(
        {
          warehouse_id: testInventoryItem.warehouse_id,
          movement_type: 'reubicacion',
          pallet_id: pallet.id,
          product_id: pallet.product_id,
          origin_position_id: originPosition.id,
          destination_position_id: primaryCandidate.position.id,
          quantity: pallet.quantity,
          unit: pallet.unit,
          status: 'completed',
          reason:
            'Integration Lab FASE 23.10 compliance',
          notes:
            'Prueba controlada de cumplimiento de recomendación inteligente.',
          decision_score: primaryCandidate.decision.score,
          decision_explanation: expectedExplanation,
          recommendation_id: expectedRecommendationId,
          created_by: 'Integration Lab',
        },
        {
          recommendedDestinationPositionId:
            primaryCandidate.position.id,
          recommendedDestinationPositionCode:
            primaryCandidate.position.code,
        }
      );

      const movementsAfter = await getMovements();

      const persistedMovement = movementsAfter.find(
        (movement) => movement.id === createdMovement.id
      );

      if (!persistedMovement) {
        throw new Error(
          'El movimiento de prueba 23.7 no fue encontrado después de persistirse.'
        );
      }

      if (
        persistedMovement.decision_score !==
        primaryCandidate.decision.score
      ) {
        throw new Error(
          `El score persistido (${persistedMovement.decision_score}) no coincide con el score inteligente (${primaryCandidate.decision.score}).`
        );
      }

      if (
        persistedMovement.decision_explanation !==
        expectedExplanation
      ) {
        throw new Error(
          'La explicación inteligente persistida no coincide con la decisión ejecutada.'
        );
      }

      if (!persistedMovement.recommendation_id) {
        throw new Error(
          'El movimiento de prueba 23.9 no conservó un recommendation_id real.'
        );
      }

      if (
        persistedMovement.recommendation_id !==
        expectedRecommendationId
      ) {
        throw new Error(
          'El recommendation_id persistido no coincide con la identidad generada para la recomendación ejecutada.'
        );
      }

      const memoriesAfter =
        await getOperationalMemories();

      const movementMemory = memoriesAfter.find(
        (memory) =>
          memory.entity_id === createdMovement.id &&
          memory.entity_type === 'movement' &&
          memory.memory_type === 'movement'
      );

      if (!movementMemory) {
        throw new Error(
          'No se encontró la Memoria Operativa vinculada al movimiento 23.7.'
        );
      }

      if (
        movementMemory.score !==
        primaryCandidate.decision.score
      ) {
        throw new Error(
          `La Memoria Operativa conservó score ${movementMemory.score}, pero se esperaba ${primaryCandidate.decision.score}.`
        );
      }

      const movementMemoryMetadata =
        movementMemory.metadata ?? {};

      if (
        movementMemoryMetadata.decisionScore !==
         primaryCandidate.decision.score
      ) {
        throw new Error(
          'La Memoria Operativa no conservó correctamente decisionScore en metadata.'
        );
      }

      if (
        movementMemoryMetadata.decisionExplanation !==
        expectedExplanation
      ) {
        throw new Error(
          'La Memoria Operativa no conservó la explicación original de la decisión ejecutada.'
        );
      }

      if (!movementMemoryMetadata.recommendationId) {
        throw new Error(
          'La Memoria Operativa no conservó un recommendationId real.'
        );
      }

      if (
        movementMemoryMetadata.recommendationId !==
        expectedRecommendationId
      ) {
        throw new Error(
          'La Memoria Operativa no conservó exactamente la identidad de la recomendación ejecutada.'
        );
      }

      if (
        movementMemoryMetadata.recommendedDestinationPositionId !==
        primaryCandidate.position.id
      ) {
        throw new Error(
          'La Memoria Operativa no conservó el destino principal originalmente recomendado.'
        );
      }

      if (
        movementMemoryMetadata.recommendedDestinationPositionCode !==
        primaryCandidate.position.code
      ) {
        throw new Error(
          'La Memoria Operativa no conservó el código del destino principal originalmente recomendado.'
        );
      }

      if (
        movementMemoryMetadata.recommendationComplied !== true
      ) {
        throw new Error(
          'La Memoria Operativa no registró correctamente el cumplimiento A→A.'
        );
      }

      if (
        movementMemoryMetadata.recommendationDeviationReason !==
        undefined
      ) {
        throw new Error(
          'El cumplimiento A→A no debe registrar un motivo de desviación.'
        );
      }

      addLog(
        `FASE 23.10 cumplimiento OK: CJWMS recomendó ${primaryCandidate.position.code} y se ejecutó ${primaryCandidate.position.code}.`
      );

      // Restauramos temporalmente el pallet al origen para probar
      // una desviación controlada A → B con el mismo ranking original.
      await changeInventoryPosition(
        inventoryItemId,
        originalPositionId
      );

      const deviationExplanation = [
        `Reubicación evaluada por CJWMS para la posición ${deviationCandidate.position.code}.`,
        `Recomendación: ${deviationCandidate.decision.explanation.recommendation}`,
        `Interpretación: ${deviationCandidate.decision.explanation.interpretation}`,
        `Confianza: ${deviationCandidate.decision.explanation.confidence}/100.`,
      ].join(' ');

      const deviationRecommendationId =
        crypto.randomUUID();

      const expectedDeviationReason =
        'Prioridad operativa controlada por Integration Lab para validar la desviación A→B.';

      const deviationMovement = await executeMovementWorkflow(
        {
          warehouse_id: testInventoryItem.warehouse_id,
          movement_type: 'reubicacion',
          pallet_id: pallet.id,
          product_id: pallet.product_id,
          origin_position_id: originPosition.id,
          destination_position_id:
            deviationCandidate.position.id,
          quantity: pallet.quantity,
          unit: pallet.unit,
          status: 'completed',
          reason:
            'Integration Lab FASE 23.10 deviation',
          notes:
            'Prueba controlada de desviación de recomendación inteligente.',
          decision_score:
            deviationCandidate.decision.score,
          decision_explanation:
            deviationExplanation,
          recommendation_id:
            deviationRecommendationId,
          created_by: 'Integration Lab',
        },
        {
          recommendedDestinationPositionId:
            primaryCandidate.position.id,
          recommendedDestinationPositionCode:
            primaryCandidate.position.code,
          recommendationDeviationReason:
            expectedDeviationReason,
        }
      );

      const movementsAfterDeviation =
        await getMovements();

      const persistedDeviationMovement =
        movementsAfterDeviation.find(
          (movement) =>
            movement.id === deviationMovement.id
        );

      if (!persistedDeviationMovement) {
        throw new Error(
          'El movimiento de desviación 23.10 no fue encontrado después de persistirse.'
        );
      }

      if (
        persistedDeviationMovement.destination_position_id !==
        deviationCandidate.position.id
      ) {
        throw new Error(
          'El movimiento de desviación no conservó correctamente el destino B ejecutado.'
        );
      }

      if (
        persistedDeviationMovement.recommendation_id !==
        deviationRecommendationId
      ) {
        throw new Error(
          'El movimiento de desviación no conservó la identidad de la recomendación ejecutada B.'
        );
      }

      const memoriesAfterDeviation =
        await getOperationalMemories();

      const deviationMemory =
        memoriesAfterDeviation.find(
          (memory) =>
            memory.entity_id === deviationMovement.id &&
            memory.entity_type === 'movement' &&
            memory.memory_type === 'movement'
        );

      if (!deviationMemory) {
        throw new Error(
          'No se encontró la Memoria Operativa del movimiento de desviación 23.10.'
        );
      }

      const deviationMemoryMetadata =
        deviationMemory.metadata ?? {};

      if (
        deviationMemoryMetadata.recommendedDestinationPositionId !==
        primaryCandidate.position.id
      ) {
        throw new Error(
          'La desviación no conservó A como destino principal originalmente recomendado.'
        );
      }

      if (
        deviationMemoryMetadata.recommendedDestinationPositionCode !==
        primaryCandidate.position.code
      ) {
        throw new Error(
          'La desviación no conservó el código de A como recomendación principal original.'
        );
      }

      if (
        deviationMemoryMetadata.destinationPositionId !==
        deviationCandidate.position.id
      ) {
        throw new Error(
          'La Memoria Operativa no conservó B como destino realmente ejecutado.'
        );
      }

      if (
        deviationMemoryMetadata.recommendationComplied !== false
      ) {
        throw new Error(
          'La Memoria Operativa no registró correctamente la desviación A→B.'
        );
      }

      if (
        deviationMemoryMetadata.recommendationDeviationReason !==
        expectedDeviationReason
      ) {
        throw new Error(
          'La Memoria Operativa no conservó correctamente el motivo de la desviación A→B.'
        );
      }

      if (
        deviationMemoryMetadata.recommendationId !==
        deviationRecommendationId
      ) {
        throw new Error(
          'La Memoria Operativa de la desviación no conservó la identidad de la recomendación ejecutada B.'
        );
      }

      addLog(
        `FASE 23.11 OK: cumplimiento ${primaryCandidate.position.code}→${primaryCandidate.position.code} sin motivo de desviación y desviación ${primaryCandidate.position.code}→${deviationCandidate.position.code} con motivo operativo "${expectedDeviationReason}". CJWMS preservó recomendación original, destino ejecutado, cumplimiento/desviación y explicación de la desviación.`
      );

      const recommendationMemories =
        memoriesAfterDeviation.filter(
          (memory) =>
            memory.memory_type === 'movement' &&
            (memory.metadata?.recommendationComplied === true ||
              memory.metadata?.recommendationComplied === false)
        );

      const compliedRecommendationMemories =
        recommendationMemories.filter(
          (memory) =>
            memory.metadata?.recommendationComplied === true
        );

      const deviatedRecommendationMemories =
        recommendationMemories.filter(
          (memory) =>
            memory.metadata?.recommendationComplied === false
        );

      if (recommendationMemories.length === 0) {
        throw new Error(
          'FASE 23.12 no encontró decisiones evaluables con recomendación.'
        );
      }

      const expectedComplianceRate = Math.round(
        (compliedRecommendationMemories.length /
          recommendationMemories.length) *
          100
      );

      const recommendationInsights =
        analyzeOperationalMemories(memoriesAfterDeviation);

      const complianceInsight = recommendationInsights.find(
        (insight) =>
          insight.id === 'recommendation-compliance'
      );

      if (!complianceInsight) {
        throw new Error(
          'FASE 23.12 no generó el insight de cumplimiento de recomendación.'
        );
      }

      if (complianceInsight.score !== expectedComplianceRate) {
        throw new Error(
          `FASE 23.12 calculó cumplimiento ${complianceInsight.score}, pero se esperaba ${expectedComplianceRate}.`
        );
      }

      if (
        !complianceInsight.description.includes(
          `${recommendationMemories.length} decisiones con recomendación`
        ) ||
        !complianceInsight.description.includes(
          `${compliedRecommendationMemories.length} cumplidas`
        ) ||
        !complianceInsight.description.includes(
          `${deviatedRecommendationMemories.length} desviadas`
        ) ||
        !complianceInsight.description.includes(
          `Cumplimiento observado: ${expectedComplianceRate}%.`
        )
      ) {
        throw new Error(
          'FASE 23.12 no describió correctamente el cumplimiento y las desviaciones observadas.'
        );
      }

      const deviationReasonOccurrences =
        new Map<string, number>();

      deviatedRecommendationMemories.forEach((memory) => {
        const deviationReason =
          memory.metadata?.recommendationDeviationReason;

        if (
          typeof deviationReason !== 'string' ||
          deviationReason.trim().length === 0
        ) {
          return;
        }

        const normalizedReason = deviationReason.trim();

        deviationReasonOccurrences.set(
          normalizedReason,
          (deviationReasonOccurrences.get(normalizedReason) ?? 0) + 1
        );
      });

      const mostFrequentDeviationReason = [
        ...deviationReasonOccurrences.entries(),
      ].sort((a, b) => b[1] - a[1])[0];

      if (!mostFrequentDeviationReason) {
        throw new Error(
          'FASE 23.12 no encontró motivos operativos de desviación para analizar.'
        );
      }

      const [
        expectedMostFrequentReason,
        expectedReasonOccurrences,
      ] = mostFrequentDeviationReason;

      const deviationReasonInsight =
        recommendationInsights.find(
          (insight) =>
            insight.id === 'recommendation-deviation-reason'
        );

      if (!deviationReasonInsight) {
        throw new Error(
          'FASE 23.12 no generó el insight de motivo recurrente de desviación.'
        );
      }

      const expectedDeviationReasonScore = Math.min(
        100,
        expectedReasonOccurrences * 25
      );

      if (
        deviationReasonInsight.score !==
        expectedDeviationReasonScore
      ) {
        throw new Error(
          `FASE 23.12 calculó score ${deviationReasonInsight.score} para el motivo recurrente, pero se esperaba ${expectedDeviationReasonScore}.`
        );
      }

      if (
        !deviationReasonInsight.description.includes(
          `"${expectedMostFrequentReason}"`
        ) ||
        !deviationReasonInsight.description.includes(
          `registrado ${expectedReasonOccurrences} ${
            expectedReasonOccurrences === 1 ? 'vez' : 'veces'
          }`
        )
      ) {
        throw new Error(
          'FASE 23.12 no identificó correctamente el motivo operativo más frecuente de desviación.'
        );
      }

      addLog(
        `FASE 23.12 OK: CJWMS analizó ${recommendationMemories.length} decisiones con recomendación, detectó ${compliedRecommendationMemories.length} cumplidas y ${deviatedRecommendationMemories.length} desviadas (${expectedComplianceRate}% de cumplimiento), e identificó "${expectedMostFrequentReason}" como motivo de desviación más frecuente con ${expectedReasonOccurrences} ${
          expectedReasonOccurrences === 1 ? 'ocurrencia' : 'ocurrencias'
        }.`
      );

    } catch (error) {

      console.error(error);

      addLog(
        error instanceof Error
          ? `Error en trazabilidad inteligente 23.7: ${error.message}`
          : 'Error inesperado en trazabilidad inteligente 23.7.'
      );
    } finally {
      if (
        inventoryItemId &&
        originalPositionId
      ) {
        try {
          const currentInventory = await getInventory();

          const currentItem = currentInventory.find(
            (item) => item.id === inventoryItemId
          );

          if (
            currentItem &&
            currentItem.rack_position_id !==
              originalPositionId
          ) {
            await changeInventoryPosition(
              inventoryItemId,
              originalPositionId
            );
          }
        } catch (cleanupError) {
          console.error(
            'Error restaurando inventario después de la prueba 23.7:',
            cleanupError
          );
        }
      }

      setLoading(false);
    }
  }

  async function testRecommendationDeviationPatterns() {
    setLoading(true);

    try {
      const operationalMemories = await getOperationalMemories();

      const deviationMemories = operationalMemories.filter((memory) => {
        if (memory.memory_type !== 'movement') {
          return false;
        }

        if (memory.metadata?.recommendationComplied !== false) {
          return false;
        }

        const movementType = memory.metadata?.movementType;
        const deviationReason =
          memory.metadata?.recommendationDeviationReason;

        return (
          typeof movementType === 'string' &&
          movementType.trim().length > 0 &&
          typeof deviationReason === 'string' &&
          deviationReason.trim().length > 0
        );
      });

      if (deviationMemories.length < 2) {
        throw new Error(
          'FASE 23.13 requiere al menos dos desviaciones con contexto operativo.'
        );
      }

      const groupedDeviations = new Map<
        string,
        {
          movementType: string;
          deviationReason: string;
          occurrences: number;
        }
      >();

      deviationMemories.forEach((memory) => {
        const movementType = String(
          memory.metadata?.movementType
        ).trim();

        const deviationReason = String(
          memory.metadata?.recommendationDeviationReason
        ).trim();

        const key = JSON.stringify([
          movementType,
          deviationReason,
        ]);

        const currentGroup = groupedDeviations.get(key);

        if (currentGroup) {
          currentGroup.occurrences += 1;
          return;
        }

        groupedDeviations.set(key, {
          movementType,
          deviationReason,
          occurrences: 1,
        });
      });

      const expectedRecurrentGroups = [
        ...groupedDeviations.values(),
      ].filter((group) => group.occurrences >= 2);

      if (expectedRecurrentGroups.length === 0) {
        throw new Error(
          'FASE 23.13 no encontró recurrencias de desviación suficientes para validar el patrón.'
        );
      }

      const detectedPatterns = await detectMemoryPatterns();

      const deviationPatterns = detectedPatterns.filter(
        (pattern) =>
          pattern.id.startsWith(
            'recommendation-deviation-pattern-'
          )
      );

      if (
        deviationPatterns.length !==
        expectedRecurrentGroups.length
      ) {
        throw new Error(
          `FASE 23.13 esperaba ${expectedRecurrentGroups.length} patrones recurrentes de desviación, pero detectó ${deviationPatterns.length}.`
        );
      }

      expectedRecurrentGroups.forEach((expectedGroup) => {
        const matchingPattern = deviationPatterns.find(
          (pattern) =>
            pattern.occurrences ===
              expectedGroup.occurrences &&
            pattern.description.includes(
              `"${expectedGroup.deviationReason}"`
            ) &&
            pattern.description.includes(
              `"${expectedGroup.movementType}"`
            )
        );

        if (!matchingPattern) {
          throw new Error(
            `FASE 23.13 no detectó correctamente la recurrencia "${expectedGroup.deviationReason}" para movimientos "${expectedGroup.movementType}".`
          );
        }
      });

      const patternsWithoutDeviationKnowledge =
        detectedPatterns.filter(
          (pattern) =>
            !pattern.id.startsWith(
              'recommendation-deviation-pattern-'
            )
        );

      const recommendationsWithDeviationPatterns =
        generateRecommendationsFromPatterns(
          detectedPatterns
        );

      const recommendationsWithoutDeviationPatterns =
        generateRecommendationsFromPatterns(
          patternsWithoutDeviationKnowledge
        );

      if (
        JSON.stringify(
          recommendationsWithDeviationPatterns
        ) !==
        JSON.stringify(
          recommendationsWithoutDeviationPatterns
        )
      ) {
        throw new Error(
          'FASE 23.13 detectó que los patrones de desviación ya están modificando recomendaciones.'
        );
      }

      const decisionsWithDeviationPatterns =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsWithDeviationPatterns
        );

      const decisionsWithoutDeviationPatterns =
        generateOperationalDecisions(
          patternsWithoutDeviationKnowledge,
          recommendationsWithoutDeviationPatterns
        );

      if (
        JSON.stringify(decisionsWithDeviationPatterns) !==
        JSON.stringify(decisionsWithoutDeviationPatterns)
      ) {
        throw new Error(
          'FASE 23.13 detectó que los patrones de desviación ya están modificando decisiones operativas.'
        );
      }

      const recurrentOccurrences =
        expectedRecurrentGroups.reduce(
          (total, group) => total + group.occurrences,
          0
        );

      addLog(
        `FASE 23.13 OK: CJWMS detectó ${deviationPatterns.length} ${
          deviationPatterns.length === 1
            ? 'patrón recurrente'
            : 'patrones recurrentes'
        } de desviación a partir de ${recurrentOccurrences} ${
          recurrentOccurrences === 1
            ? 'ocurrencia contextual'
            : 'ocurrencias contextuales'
        }, sin modificar recomendaciones ni decisiones operativas.`
      );
    } catch (error) {
      console.error(error);

      addLog(
        error instanceof Error
          ? `Error en patrones recurrentes 23.13: ${error.message}`
          : 'Error inesperado en patrones recurrentes 23.13.'
      );
    } finally {
      setLoading(false);
    }
  }

  async function testOperationalKnowledgeGeneration() {
    setLoading(true);

    try {
      const operationalMemories = await getOperationalMemories();
      const detectedPatterns = await detectMemoryPatterns();

      const recurrentDeviationPatterns = detectedPatterns.filter(
        (pattern) =>
          pattern.kind === 'recommendation-deviation-recurrence'
      );

      if (recurrentDeviationPatterns.length === 0) {
        throw new Error(
          'FASE 23.14 requiere al menos un patrón recurrente de desviación.'
        );
      }

      const recommendationsBeforeKnowledge =
        generateRecommendationsFromPatterns(detectedPatterns);

      const decisionsBeforeKnowledge =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsBeforeKnowledge
        );

      const generatedKnowledge =
        generateOperationalKnowledge(detectedPatterns);

      if (
        generatedKnowledge.length !==
        recurrentDeviationPatterns.length
      ) {
        throw new Error(
          `FASE 23.14 esperaba ${recurrentDeviationPatterns.length} conocimientos operativos, pero generó ${generatedKnowledge.length}.`
        );
      }

      recurrentDeviationPatterns.forEach((pattern) => {
        if (!pattern.context || !pattern.evidence) {
          throw new Error(
            `FASE 23.14 encontró el patrón ${pattern.id} sin contexto o evidencia estructurada.`
          );
        }

        const matchingKnowledge = generatedKnowledge.find(
          (knowledge) =>
            knowledge.sourcePatternId === pattern.id
        );

        if (!matchingKnowledge) {
          throw new Error(
            `FASE 23.14 no generó conocimiento para el patrón ${pattern.id}.`
          );
        }

        if (
          matchingKnowledge.type !==
          'recurrent-recommendation-deviation'
        ) {
          throw new Error(
            `FASE 23.14 generó un tipo de conocimiento inesperado para ${pattern.id}.`
          );
        }

        if (
          matchingKnowledge.context.movementType !==
            pattern.context.movementType ||
          matchingKnowledge.context.deviationReason !==
            pattern.context.deviationReason
        ) {
          throw new Error(
            `FASE 23.14 no conservó correctamente el contexto del patrón ${pattern.id}.`
          );
        }

        if (
          matchingKnowledge.evidence.occurrences !==
          pattern.occurrences
        ) {
          throw new Error(
            `FASE 23.14 no conservó correctamente las ocurrencias del patrón ${pattern.id}.`
          );
        }

        if (
          matchingKnowledge.evidence.score !== pattern.score
        ) {
          throw new Error(
            `FASE 23.14 no conservó correctamente la fuerza observacional del patrón ${pattern.id}.`
          );
        }

        const patternMemoryIds = [
          ...new Set(pattern.evidence.memoryIds),
        ].sort();

        const knowledgeMemoryIds = [
          ...matchingKnowledge.evidence.memoryIds,
        ].sort();

        if (
          JSON.stringify(patternMemoryIds) !==
          JSON.stringify(knowledgeMemoryIds)
        ) {
          throw new Error(
            `FASE 23.14 no conservó correctamente la evidencia del patrón ${pattern.id}.`
          );
        }

        if (knowledgeMemoryIds.length < 2) {
          throw new Error(
            `FASE 23.14 generó conocimiento sin evidencia recurrente suficiente para ${pattern.id}.`
          );
        }

        knowledgeMemoryIds.forEach((memoryId) => {
          const sourceMemory = operationalMemories.find(
            (memory) => memory.id === memoryId
          );

          if (!sourceMemory) {
            throw new Error(
              `FASE 23.14 no encontró la memoria fuente ${memoryId} del conocimiento ${matchingKnowledge.id}.`
            );
          }

          if (
            sourceMemory.memory_type !== 'movement' ||
            sourceMemory.metadata?.recommendationComplied !== false
          ) {
            throw new Error(
              `FASE 23.14 encontró evidencia no válida en la memoria ${memoryId}.`
            );
          }

          const sourceMovementType =
            sourceMemory.metadata?.movementType;

          const sourceDeviationReason =
            sourceMemory.metadata?.recommendationDeviationReason;

          if (
            typeof sourceMovementType !== 'string' ||
            sourceMovementType.trim() !==
              matchingKnowledge.context.movementType ||
            typeof sourceDeviationReason !== 'string' ||
            sourceDeviationReason.trim() !==
              matchingKnowledge.context.deviationReason
          ) {
            throw new Error(
              `FASE 23.14 perdió la trazabilidad contextual de la memoria ${memoryId}.`
            );
          }
        });
      });

      const recommendationsAfterKnowledge =
        generateRecommendationsFromPatterns(detectedPatterns);

      const decisionsAfterKnowledge =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsAfterKnowledge
        );

      if (
        JSON.stringify(recommendationsBeforeKnowledge) !==
        JSON.stringify(recommendationsAfterKnowledge)
      ) {
        throw new Error(
          'FASE 23.14 detectó que la generación de conocimiento modificó recomendaciones.'
        );
      }

      if (
        JSON.stringify(decisionsBeforeKnowledge) !==
        JSON.stringify(decisionsAfterKnowledge)
      ) {
        throw new Error(
          'FASE 23.14 detectó que la generación de conocimiento modificó decisiones operativas.'
        );
      }

      const evidenceMemoryIds = new Set(
        generatedKnowledge.flatMap(
          (knowledge) => knowledge.evidence.memoryIds
        )
      );

      addLog(
        `FASE 23.14 OK: CJWMS generó ${generatedKnowledge.length} ${
          generatedKnowledge.length === 1
            ? 'conocimiento operativo'
            : 'conocimientos operativos'
        } a partir de ${recurrentDeviationPatterns.length} ${
          recurrentDeviationPatterns.length === 1
            ? 'patrón recurrente'
            : 'patrones recurrentes'
        }, con trazabilidad hacia ${evidenceMemoryIds.size} ${
          evidenceMemoryIds.size === 1
            ? 'memoria fuente'
            : 'memorias fuente'
        }, manteniendo ${recommendationsAfterKnowledge.length} recomendaciones y ${decisionsAfterKnowledge.length} decisiones sin modificación.`
      );
    } catch (error) {
      console.error(error);

      addLog(
        error instanceof Error
          ? `Error en conocimiento operativo 23.14: ${error.message}`
          : 'Error inesperado en conocimiento operativo 23.14.'
      );
    } finally {
      setLoading(false);
    }
  }

  async function testOperationalKnowledgeEligibility() {
    setLoading(true);

    try {
      const detectedPatterns = await detectMemoryPatterns();

      const generatedKnowledge =
        generateOperationalKnowledge(detectedPatterns);

      if (generatedKnowledge.length === 0) {
        throw new Error(
          'FASE 23.15 requiere al menos un conocimiento operativo generado.'
        );
      }

      const knowledge = generatedKnowledge[0];

      const recommendationsBeforeEligibility =
        generateRecommendationsFromPatterns(detectedPatterns);

      const decisionsBeforeEligibility =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsBeforeEligibility
        );

      const compatibleMovementType =
        knowledge.context.movementType.trim();

      if (
        compatibleMovementType !== 'entrada' &&
        compatibleMovementType !== 'salida' &&
        compatibleMovementType !== 'reubicacion' &&
        compatibleMovementType !== 'ajuste' &&
        compatibleMovementType !== 'bloqueo' &&
        compatibleMovementType !== 'desbloqueo'
      ) {
        throw new Error(
          `FASE 23.15 encontró un tipo de movimiento no reconocido en el conocimiento ${knowledge.id}: "${compatibleMovementType}".`
        );
      }

      const compatibleEvaluation =
        evaluateOperationalKnowledgeEligibility(
          knowledge,
          {
            movementType: compatibleMovementType,
          }
        );

      if (!compatibleEvaluation.eligible) {
        throw new Error(
          `FASE 23.15 esperaba que el conocimiento ${knowledge.id} fuera elegible para su mismo tipo de movimiento.`
        );
      }

      if (
        compatibleEvaluation.reason !==
        'context-compatible'
      ) {
        throw new Error(
          `FASE 23.15 produjo una razón inesperada para el conocimiento elegible ${knowledge.id}.`
        );
      }

      if (
        compatibleEvaluation.knowledgeId !== knowledge.id ||
        compatibleEvaluation.sourcePatternId !==
          knowledge.sourcePatternId
      ) {
        throw new Error(
          `FASE 23.15 perdió la trazabilidad del conocimiento elegible ${knowledge.id}.`
        );
      }

      const incompatibleMovementType =
        compatibleMovementType === 'entrada'
          ? 'salida'
          : 'entrada';

      const incompatibleEvaluation =
        evaluateOperationalKnowledgeEligibility(
          knowledge,
          {
            movementType: incompatibleMovementType,
          }
        );

      if (incompatibleEvaluation.eligible) {
        throw new Error(
          `FASE 23.15 consideró elegible el conocimiento ${knowledge.id} para un tipo de movimiento incompatible.`
        );
      }

      if (
        incompatibleEvaluation.reason !==
        'context-incompatible'
      ) {
        throw new Error(
          `FASE 23.15 produjo una razón inesperada para el conocimiento no elegible ${knowledge.id}.`
        );
      }

      if (
        incompatibleEvaluation.knowledgeId !== knowledge.id ||
        incompatibleEvaluation.sourcePatternId !==
          knowledge.sourcePatternId
      ) {
        throw new Error(
          `FASE 23.15 perdió la trazabilidad del conocimiento no elegible ${knowledge.id}.`
        );
      }

      const recommendationsAfterEligibility =
        generateRecommendationsFromPatterns(detectedPatterns);

      const decisionsAfterEligibility =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsAfterEligibility
        );

      if (
        JSON.stringify(recommendationsBeforeEligibility) !==
        JSON.stringify(recommendationsAfterEligibility)
      ) {
        throw new Error(
          'FASE 23.15 detectó que la evaluación de elegibilidad modificó recomendaciones.'
        );
      }

      if (
        JSON.stringify(decisionsBeforeEligibility) !==
        JSON.stringify(decisionsAfterEligibility)
      ) {
        throw new Error(
          'FASE 23.15 detectó que la evaluación de elegibilidad modificó decisiones operativas.'
        );
      }

      addLog(
        `FASE 23.15 OK: el conocimiento ${knowledge.id} fue elegible para "${compatibleMovementType}" y no elegible para "${incompatibleMovementType}", conservando trazabilidad hacia el patrón ${knowledge.sourcePatternId} y sin modificar ${recommendationsAfterEligibility.length} recomendaciones ni ${decisionsAfterEligibility.length} decisiones.`
      );
    } catch (error) {
      console.error(error);

      addLog(
        error instanceof Error
          ? `Error en elegibilidad de conocimiento 23.15: ${error.message}`
          : 'Error inesperado en elegibilidad de conocimiento 23.15.'
      );
    } finally {
      setLoading(false);
    }
  }

  async function testOperationalKnowledgeConsideration() {
    setLoading(true);

    try {
      const detectedPatterns = await detectMemoryPatterns();

      const generatedKnowledge =
        generateOperationalKnowledge(detectedPatterns);

      if (generatedKnowledge.length === 0) {
        throw new Error(
          'FASE 23.16 requiere al menos un conocimiento operativo generado.'
        );
      }

      const knowledge = generatedKnowledge[0];

      const recommendationsBeforeConsideration =
        generateRecommendationsFromPatterns(detectedPatterns);

      const decisionsBeforeConsideration =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsBeforeConsideration
        );

      const compatibleMovementType =
        knowledge.context.movementType.trim();

      if (
        compatibleMovementType !== 'entrada' &&
        compatibleMovementType !== 'salida' &&
        compatibleMovementType !== 'reubicacion' &&
        compatibleMovementType !== 'ajuste' &&
        compatibleMovementType !== 'bloqueo' &&
        compatibleMovementType !== 'desbloqueo'
      ) {
        throw new Error(
          `FASE 23.16 encontró un tipo de movimiento no reconocido en el conocimiento ${knowledge.id}: "${compatibleMovementType}".`
        );
      }

      const eligibleEvaluation =
        evaluateOperationalKnowledgeEligibility(
          knowledge,
          {
            movementType: compatibleMovementType,
          }
        );

      if (!eligibleEvaluation.eligible) {
        throw new Error(
          `FASE 23.16 esperaba elegibilidad previa para el conocimiento ${knowledge.id}.`
        );
      }

      const consideration =
        considerOperationalKnowledge(eligibleEvaluation);

      if (!consideration) {
        throw new Error(
          `FASE 23.16 no produjo consideración para el conocimiento elegible ${knowledge.id}.`
        );
      }

      if (!consideration.considered) {
        throw new Error(
          `FASE 23.16 produjo una consideración inválida para el conocimiento ${knowledge.id}.`
        );
      }

      if (
        consideration.knowledgeId !== knowledge.id ||
        consideration.sourcePatternId !==
          knowledge.sourcePatternId
      ) {
        throw new Error(
          `FASE 23.16 perdió la trazabilidad del conocimiento considerado ${knowledge.id}.`
        );
      }

      const incompatibleMovementType =
        compatibleMovementType === 'entrada'
          ? 'salida'
          : 'entrada';

      const ineligibleEvaluation =
        evaluateOperationalKnowledgeEligibility(
          knowledge,
          {
            movementType: incompatibleMovementType,
          }
        );

      if (ineligibleEvaluation.eligible) {
        throw new Error(
          `FASE 23.16 esperaba que el conocimiento ${knowledge.id} no fuera elegible para "${incompatibleMovementType}".`
        );
      }

      const rejectedConsideration =
        considerOperationalKnowledge(ineligibleEvaluation);

      if (rejectedConsideration !== null) {
        throw new Error(
          `FASE 23.16 permitió considerar el conocimiento no elegible ${knowledge.id}.`
        );
      }

      const recommendationsAfterConsideration =
        generateRecommendationsFromPatterns(detectedPatterns);

      const decisionsAfterConsideration =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsAfterConsideration
        );

      if (
        JSON.stringify(recommendationsBeforeConsideration) !==
        JSON.stringify(recommendationsAfterConsideration)
      ) {
        throw new Error(
          'FASE 23.16 detectó que la consideración de conocimiento modificó recomendaciones.'
        );
      }

      if (
        JSON.stringify(decisionsBeforeConsideration) !==
        JSON.stringify(decisionsAfterConsideration)
      ) {
        throw new Error(
          'FASE 23.16 detectó que la consideración de conocimiento modificó decisiones operativas.'
        );
      }

      addLog(
        `FASE 23.16 OK: el conocimiento elegible ${knowledge.id} fue considerado de forma explícita y trazable para "${compatibleMovementType}", mientras que el mismo conocimiento no elegible para "${incompatibleMovementType}" no produjo consideración, sin modificar ${recommendationsAfterConsideration.length} recomendaciones ni ${decisionsAfterConsideration.length} decisiones.`
      );
    } catch (error) {
      console.error(error);

      addLog(
        error instanceof Error
          ? `Error en consideración de conocimiento 23.16: ${error.message}`
          : 'Error inesperado en consideración de conocimiento 23.16.'
      );
    } finally {
      setLoading(false);
    }
  }

  async function testOperationalKnowledgePluralCoexistence() {
    setLoading(true);

    try {
      const detectedPatterns = await detectMemoryPatterns();

      const recommendationsBeforeCoexistence =
        generateRecommendationsFromPatterns(detectedPatterns);

      const decisionsBeforeCoexistence =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsBeforeCoexistence
        );

      const controlledPatterns = [
        {
          id: 'recommendation-deviation-pattern-reubicacion-coexistence-a',
          title:
            'Patrón controlado de coexistencia de conocimiento A',
          description:
            'Patrón controlado para validar coexistencia plural de conocimiento operativo.',
          score: 95,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason: 'motivo-controlado-a',
          },
          evidence: {
            memoryIds: [
              'memory-coexistence-a-1',
              'memory-coexistence-a-2',
              'memory-coexistence-a-3',
              'memory-coexistence-a-4',
            ],
          },
        },
        {
          id: 'recommendation-deviation-pattern-reubicacion-coexistence-b',
          title:
            'Patrón controlado de coexistencia de conocimiento B',
          description:
            'Segundo patrón controlado para validar coexistencia plural de conocimiento operativo.',
          score: 50,
          occurrences: 2,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason: 'motivo-controlado-b',
          },
          evidence: {
            memoryIds: [
              'memory-coexistence-b-1',
              'memory-coexistence-b-2',
            ],
          },
        },
        {
          id: 'recommendation-deviation-pattern-entrada-coexistence-c',
          title:
            'Patrón controlado no compatible C',
          description:
            'Patrón controlado para validar exclusión contextual durante coexistencia plural.',
          score: 100,
          occurrences: 6,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'entrada',
            deviationReason: 'motivo-controlado-c',
          },
          evidence: {
            memoryIds: [
              'memory-coexistence-c-1',
              'memory-coexistence-c-2',
              'memory-coexistence-c-3',
              'memory-coexistence-c-4',
              'memory-coexistence-c-5',
              'memory-coexistence-c-6',
            ],
          },
        },
      ];

      const controlledKnowledge =
        generateOperationalKnowledge(controlledPatterns);

      if (controlledKnowledge.length !== 3) {
        throw new Error(
          `FASE 23.17 esperaba 3 conocimientos controlados y generó ${controlledKnowledge.length}.`
        );
      }

      const coexistenceContext = {
        movementType: 'reubicacion' as const,
      };

      const evaluations = controlledKnowledge.map(
        (knowledge) => ({
          knowledge,
          eligibility:
            evaluateOperationalKnowledgeEligibility(
              knowledge,
              coexistenceContext
            ),
        })
      );

      const considerations = evaluations
        .map(({ knowledge, eligibility }) => ({
          knowledge,
          eligibility,
          consideration:
            considerOperationalKnowledge(eligibility),
        }))
        .filter(
          (
            item
          ): item is typeof item & {
            consideration: NonNullable<
              typeof item.consideration
            >;
          } => item.consideration !== null
        );

      if (considerations.length !== 2) {
        throw new Error(
          `FASE 23.17 esperaba 2 conocimientos considerados simultáneamente y obtuvo ${considerations.length}.`
        );
      }

      const consideredKnowledgeIds = new Set(
        considerations.map(
          (item) => item.consideration.knowledgeId
        )
      );

      const compatibleKnowledge =
        controlledKnowledge.filter(
          (knowledge) =>
            knowledge.context.movementType ===
            coexistenceContext.movementType
        );

      if (compatibleKnowledge.length !== 2) {
        throw new Error(
          `FASE 23.17 esperaba exactamente 2 conocimientos compatibles y encontró ${compatibleKnowledge.length}.`
        );
      }

      compatibleKnowledge.forEach((knowledge) => {
        if (!consideredKnowledgeIds.has(knowledge.id)) {
          throw new Error(
            `FASE 23.17 perdió el conocimiento compatible ${knowledge.id} durante la coexistencia plural.`
          );
        }

        const consideration = considerations.find(
          (item) =>
            item.consideration.knowledgeId === knowledge.id
        )?.consideration;

        if (!consideration) {
          throw new Error(
            `FASE 23.17 no encontró la consideración del conocimiento ${knowledge.id}.`
          );
        }

        if (
          consideration.sourcePatternId !==
          knowledge.sourcePatternId
        ) {
          throw new Error(
            `FASE 23.17 perdió la trazabilidad del conocimiento ${knowledge.id} hacia su patrón ${knowledge.sourcePatternId}.`
          );
        }
      });

      const incompatibleKnowledge =
        controlledKnowledge.find(
          (knowledge) =>
            knowledge.context.movementType === 'entrada'
        );

      if (!incompatibleKnowledge) {
        throw new Error(
          'FASE 23.17 no encontró el conocimiento controlado incompatible.'
        );
      }

      const incompatibleEvaluation = evaluations.find(
        (item) =>
          item.knowledge.id === incompatibleKnowledge.id
      );

      if (!incompatibleEvaluation) {
        throw new Error(
          `FASE 23.17 no encontró la evaluación del conocimiento incompatible ${incompatibleKnowledge.id}.`
        );
      }

      if (incompatibleEvaluation.eligibility.eligible) {
        throw new Error(
          `FASE 23.17 permitió que el conocimiento incompatible ${incompatibleKnowledge.id} fuera elegible para reubicación.`
        );
      }

      if (
        consideredKnowledgeIds.has(
          incompatibleKnowledge.id
        )
      ) {
        throw new Error(
          `FASE 23.17 permitió considerar el conocimiento incompatible ${incompatibleKnowledge.id}.`
        );
      }

      if (
        considerations.some(
          (item) =>
            'score' in item.consideration ||
            'priority' in item.consideration ||
            'rank' in item.consideration ||
            'selected' in item.consideration ||
            'relevant' in item.consideration
        )
      ) {
        throw new Error(
          'FASE 23.17 detectó atributos de ranking, prioridad, selección o relevancia artificial dentro de la consideración.'
        );
      }

      const recommendationsAfterCoexistence =
        generateRecommendationsFromPatterns(detectedPatterns);

      const decisionsAfterCoexistence =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsAfterCoexistence
        );

      if (
        JSON.stringify(recommendationsBeforeCoexistence) !==
        JSON.stringify(recommendationsAfterCoexistence)
      ) {
        throw new Error(
          'FASE 23.17 detectó que la coexistencia plural de conocimiento modificó recomendaciones.'
        );
      }

      if (
        JSON.stringify(decisionsBeforeCoexistence) !==
        JSON.stringify(decisionsAfterCoexistence)
      ) {
        throw new Error(
          'FASE 23.17 detectó que la coexistencia plural de conocimiento modificó decisiones operativas.'
        );
      }

      addLog(
        `FASE 23.17 OK: ${considerations.length} conocimientos compatibles coexistieron simultáneamente dentro del contexto "reubicacion", conservando identidad y trazabilidad independientes, mientras que el conocimiento incompatible quedó fuera de consideración, sin ranking, prioridad, selección, relevancia artificial ni modificación de ${recommendationsAfterCoexistence.length} recomendaciones o ${decisionsAfterCoexistence.length} decisiones.`
      );
    } catch (error) {
      console.error(error);

      addLog(
        error instanceof Error
          ? `Error en coexistencia plural de conocimiento 23.17: ${error.message}`
          : 'Error inesperado en coexistencia plural de conocimiento 23.17.'
      );
    } finally {
      setLoading(false);
    }
  }

  async function testOperationalKnowledgeUsageBoundary() {
    setLoading(true);

    try {
      const detectedPatterns = await detectMemoryPatterns();

      const recommendationsBeforeUsageBoundary =
        generateRecommendationsFromPatterns(detectedPatterns);

      const decisionsBeforeUsageBoundary =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsBeforeUsageBoundary
        );

      const controlledPatterns = [
        {
          id: 'recommendation-deviation-pattern-reubicacion-usage-boundary-a',
          title:
            'Patrón controlado de frontera de utilización A',
          description:
            'Patrón controlado para demostrar que considerar y consultar conocimiento no implica utilización ni influencia.',
          score: 95,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-frontera-utilizacion-a',
          },
          evidence: {
            memoryIds: [
              'memory-usage-boundary-a-1',
              'memory-usage-boundary-a-2',
              'memory-usage-boundary-a-3',
              'memory-usage-boundary-a-4',
            ],
          },
        },
        {
          id: 'recommendation-deviation-pattern-reubicacion-usage-boundary-b',
          title:
            'Patrón controlado de frontera de utilización B',
          description:
            'Segundo patrón controlado para demostrar consulta plural sin consumidor operativo ni influencia.',
          score: 50,
          occurrences: 2,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-frontera-utilizacion-b',
          },
          evidence: {
            memoryIds: [
              'memory-usage-boundary-b-1',
              'memory-usage-boundary-b-2',
            ],
          },
        },
      ];

      const controlledKnowledge =
        generateOperationalKnowledge(controlledPatterns);

      if (controlledKnowledge.length !== 2) {
        throw new Error(
          `FASE 23.18 esperaba 2 conocimientos controlados y generó ${controlledKnowledge.length}.`
        );
      }

      const considerationContext = {
        movementType: 'reubicacion' as const,
      };

      const considerations = controlledKnowledge
        .map((knowledge) => {
          const eligibility =
            evaluateOperationalKnowledgeEligibility(
              knowledge,
              considerationContext
            );

          return {
            knowledge,
            eligibility,
            consideration:
              considerOperationalKnowledge(eligibility),
          };
        })
        .filter(
          (
            item
          ): item is typeof item & {
            consideration: NonNullable<
              typeof item.consideration
            >;
          } => item.consideration !== null
        );

      if (considerations.length !== 2) {
        throw new Error(
          `FASE 23.18 esperaba 2 conocimientos considerados y obtuvo ${considerations.length}.`
        );
      }

      considerations.forEach(
        ({ knowledge, eligibility, consideration }) => {
          if (!eligibility.eligible) {
            throw new Error(
              `FASE 23.18 encontró no elegible el conocimiento controlado ${knowledge.id}.`
            );
          }

          if (!consideration.considered) {
            throw new Error(
              `FASE 23.18 encontró una consideración inválida para ${knowledge.id}.`
            );
          }

          if (
            consideration.knowledgeId !== knowledge.id ||
            consideration.sourcePatternId !==
              knowledge.sourcePatternId
          ) {
            throw new Error(
              `FASE 23.18 perdió la trazabilidad del conocimiento considerado ${knowledge.id}.`
            );
          }
        }
      );

      /*
       * FASE 23.18:
       *
       * Consultar o leer información de conocimientos considerados
       * continúa siendo examen contextual.
       *
       * Esta lectura deliberadamente NO crea:
       * - utilización;
       * - consumidor;
       * - resultado derivado;
       * - influencia;
       * - selección;
       * - ranking;
       * - prioridad.
       */
      const knowledgeBeforeInspection =
        JSON.stringify(controlledKnowledge);

      const inspectedKnowledgeIds = considerations.map(
        ({ knowledge, consideration }) => {
          const inspectedMovementType =
            knowledge.context.movementType;

          const inspectedDeviationReason =
            knowledge.context.deviationReason;

          if (
            inspectedMovementType !==
            considerationContext.movementType
          ) {
            throw new Error(
              `FASE 23.18 encontró contexto incompatible al consultar ${knowledge.id}.`
            );
          }

          if (!inspectedDeviationReason.trim()) {
            throw new Error(
              `FASE 23.18 encontró un conocimiento sin motivo histórico consultable: ${knowledge.id}.`
            );
          }

          return consideration.knowledgeId;
        }
      );

      if (inspectedKnowledgeIds.length !== 2) {
        throw new Error(
          `FASE 23.18 esperaba consultar 2 conocimientos considerados y consultó ${inspectedKnowledgeIds.length}.`
        );
      }

      if (
        new Set(inspectedKnowledgeIds).size !==
        inspectedKnowledgeIds.length
      ) {
        throw new Error(
          'FASE 23.18 perdió la identidad independiente de los conocimientos durante su consulta.'
        );
      }

      if (
        JSON.stringify(controlledKnowledge) !==
        knowledgeBeforeInspection
      ) {
        throw new Error(
          'FASE 23.18 detectó que consultar el conocimiento modificó el conocimiento operativo.'
        );
      }

      if (
        considerations.some(
          ({ consideration }) =>
            'used' in consideration ||
            'usage' in consideration ||
            'consumer' in consideration ||
            'consumerId' in consideration ||
            'result' in consideration ||
            'resultId' in consideration ||
            'influential' in consideration ||
            'influence' in consideration ||
            'selected' in consideration ||
            'relevant' in consideration ||
            'rank' in consideration ||
            'priority' in consideration ||
            'score' in consideration
        )
      ) {
        throw new Error(
          'FASE 23.18 detectó atributos artificiales de utilización, consumidor, resultado, influencia, selección, relevancia, ranking, prioridad o score dentro de la consideración.'
        );
      }

      const recommendationsAfterUsageBoundary =
        generateRecommendationsFromPatterns(detectedPatterns);

      const decisionsAfterUsageBoundary =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsAfterUsageBoundary
        );

      if (
        JSON.stringify(recommendationsBeforeUsageBoundary) !==
        JSON.stringify(recommendationsAfterUsageBoundary)
      ) {
        throw new Error(
          'FASE 23.18 detectó que considerar y consultar conocimiento modificó recomendaciones.'
        );
      }

      if (
        JSON.stringify(decisionsBeforeUsageBoundary) !==
        JSON.stringify(decisionsAfterUsageBoundary)
      ) {
        throw new Error(
          'FASE 23.18 detectó que considerar y consultar conocimiento modificó decisiones operativas.'
        );
      }

      addLog(
        `FASE 23.18 OK: ${considerations.length} conocimientos elegibles fueron considerados y consultados como información contextual conservando identidad y trazabilidad, sin convertir la consulta en utilización, sin consumidor ni resultado derivado, sin influencia, selección, ranking o prioridad, y sin modificar ${recommendationsAfterUsageBoundary.length} recomendaciones ni ${decisionsAfterUsageBoundary.length} decisiones.`
      );
    } catch (error) {
      console.error(error);

      addLog(
        error instanceof Error
          ? `Error en frontera de utilización de conocimiento 23.18: ${error.message}`
          : 'Error inesperado en frontera de utilización de conocimiento 23.18.'
      );
    } finally {
      setLoading(false);
    }
  }

  async function testOperationalKnowledgeObservationalUsage() {
    setLoading(true);

    try {
      const detectedPatterns = await detectMemoryPatterns();

      const recommendationsBeforeObservationalUsage =
        generateRecommendationsFromPatterns(detectedPatterns);

      const decisionsBeforeObservationalUsage =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsBeforeObservationalUsage
        );

      const controlledPatterns = [
        {
          id: 'recommendation-deviation-pattern-reubicacion-observational-usage-a',
          title:
            'Patrón controlado de utilización observacional A',
          description:
            'Patrón controlado para validar utilización observacional trazable de conocimiento operativo.',
          score: 95,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-utilizacion-observacional-a',
          },
          evidence: {
            memoryIds: [
              'memory-observational-usage-a-1',
              'memory-observational-usage-a-2',
              'memory-observational-usage-a-3',
              'memory-observational-usage-a-4',
            ],
          },
        },
        {
          id: 'recommendation-deviation-pattern-reubicacion-observational-usage-b',
          title:
            'Patrón controlado de utilización observacional B',
          description:
            'Segundo patrón controlado para validar utilización plural sin selección, ranking ni influencia.',
          score: 50,
          occurrences: 2,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-utilizacion-observacional-b',
          },
          evidence: {
            memoryIds: [
              'memory-observational-usage-b-1',
              'memory-observational-usage-b-2',
            ],
          },
        },
      ];

      const controlledKnowledge =
        generateOperationalKnowledge(controlledPatterns);

      if (controlledKnowledge.length !== 2) {
        throw new Error(
          `FASE 23.19 esperaba 2 conocimientos controlados y generó ${controlledKnowledge.length}.`
        );
      }

      const considerationContext = {
        movementType: 'reubicacion' as const,
      };

      const considerations = controlledKnowledge
        .map((knowledge) => {
          const eligibility =
            evaluateOperationalKnowledgeEligibility(
              knowledge,
              considerationContext
            );

          return {
            knowledge,
            eligibility,
            consideration:
              considerOperationalKnowledge(eligibility),
          };
        })
        .filter(
          (
            item
          ): item is typeof item & {
            consideration: NonNullable<
              typeof item.consideration
            >;
          } => item.consideration !== null
        );

      if (considerations.length !== 2) {
        throw new Error(
          `FASE 23.19 esperaba 2 conocimientos considerados y obtuvo ${considerations.length}.`
        );
      }

      type ControlledKnowledgeObservation = {
        knowledgeId: string;
        message: string;
      };

      /*
      * FASE 23.19:
      *
      * Este consumidor existe únicamente dentro del laboratorio.
      *
      * A diferencia de FASE 23.18, aquí el contenido semántico
      * del conocimiento participa en la producción de una salida
      * nueva y trazable.
      *
      * Eso constituye utilización.
      *
      * Las observaciones NO participan en:
      * - recomendaciones;
      * - decisiones;
      * - scores;
      * - prioridades;
      * - ranking;
      * - selección;
      * - workflows;
      * - ejecución operativa.
      *
      * Por tanto, utilización NO implica influencia.
      */
      const observations: ControlledKnowledgeObservation[] =
        considerations.map(({ consideration }) => {
          const knowledge = controlledKnowledge.find(
            (candidate) =>
              candidate.id === consideration.knowledgeId
          );

          if (!knowledge) {
            throw new Error(
              `FASE 23.19 no pudo resolver el conocimiento considerado ${consideration.knowledgeId}.`
            );
          }

          return {
            knowledgeId: knowledge.id,
            message:
              `CJWMS observa un antecedente operativo recurrente ` +
              `de desviación por el motivo ` +
              `"${knowledge.context.deviationReason}" ` +
              `en movimientos de tipo ` +
              `"${knowledge.context.movementType}".`,
          };
        });

      if (observations.length !== 2) {
        throw new Error(
          `FASE 23.19 esperaba producir 2 observaciones y produjo ${observations.length}.`
        );
      }

      const observationKnowledgeIds = new Set(
        observations.map(
          (observation) => observation.knowledgeId
        )
      );

      if (observationKnowledgeIds.size !== 2) {
        throw new Error(
          'FASE 23.19 perdió la identidad plural de los conocimientos utilizados.'
        );
      }

      controlledKnowledge.forEach((knowledge) => {
        const observation = observations.find(
          (candidate) =>
            candidate.knowledgeId === knowledge.id
        );

        if (!observation) {
          throw new Error(
            `FASE 23.19 no produjo observación para el conocimiento ${knowledge.id}.`
          );
        }

        if (
          !observation.message.includes(
            knowledge.context.deviationReason
          )
        ) {
          throw new Error(
            `FASE 23.19 produjo una observación que no utilizó el motivo contextual del conocimiento ${knowledge.id}.`
          );
        }

        if (
          !observation.message.includes(
            knowledge.context.movementType
          )
        ) {
          throw new Error(
            `FASE 23.19 produjo una observación que no utilizó el tipo de movimiento del conocimiento ${knowledge.id}.`
          );
        }
      });

      if (
        observations.some(
          (observation) =>
            'sourcePatternId' in observation ||
            'memoryIds' in observation ||
            'score' in observation ||
            'occurrences' in observation ||
            'priority' in observation ||
            'rank' in observation ||
            'selected' in observation ||
            'influence' in observation ||
            'influential' in observation
        )
      ) {
        throw new Error(
          'FASE 23.19 detectó atributos artificiales de evidencia duplicada, score, recurrencia, prioridad, ranking, selección o influencia dentro del resultado observacional.'
        );
      }

      const recommendationsAfterObservationalUsage =
        generateRecommendationsFromPatterns(detectedPatterns);

      const decisionsAfterObservationalUsage =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsAfterObservationalUsage
        );

      if (
        JSON.stringify(
          recommendationsBeforeObservationalUsage
        ) !==
        JSON.stringify(
          recommendationsAfterObservationalUsage
        )
      ) {
        throw new Error(
          'FASE 23.19 detectó que la utilización observacional modificó recomendaciones.'
        );
      }

      if (
        JSON.stringify(decisionsBeforeObservationalUsage) !==
        JSON.stringify(decisionsAfterObservationalUsage)
      ) {
        throw new Error(
          'FASE 23.19 detectó que la utilización observacional modificó decisiones operativas.'
        );
      }

      addLog(
      `FASE 23.19 OK: ${considerations.length} conocimientos considerados fueron utilizados por un consumidor observacional controlado para producir ${observations.length} observaciones trazables mediante knowledgeId, conservando pluralidad sin selección, ranking, prioridad, ponderación ni influencia, y sin modificar ${recommendationsAfterObservationalUsage.length} recomendaciones o ${decisionsAfterObservationalUsage.length} decisiones.`
    );
  } catch (error) {
    console.error(error);

    addLog(
      error instanceof Error
        ? `Error en utilización observacional de conocimiento 23.19: ${error.message}`
        : 'Error inesperado en utilización observacional de conocimiento 23.19.'
    );
  } finally {
    setLoading(false);
  }
}

  async function testOperationalKnowledgeExplanatoryInfluence() {
    setLoading(true);

    try {
      const detectedPatterns = await detectMemoryPatterns();

      const recommendationsBeforeExplanatoryInfluence =
        generateRecommendationsFromPatterns(detectedPatterns);

      const decisionsBeforeExplanatoryInfluence =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsBeforeExplanatoryInfluence
        );

      const controlledPatterns = [
        {
          id: 'recommendation-deviation-pattern-reubicacion-explanatory-influence-a',
          title:
            'Patrón controlado de influencia explicativa A',
          description:
            'Patrón controlado para demostrar influencia explicativa trazable sin influencia decisional.',
          score: 95,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-influencia-explicativa-a',
          },
          evidence: {
            memoryIds: [
              'memory-explanatory-influence-a-1',
              'memory-explanatory-influence-a-2',
              'memory-explanatory-influence-a-3',
              'memory-explanatory-influence-a-4',
            ],
          },
        },
        {
          id: 'recommendation-deviation-pattern-reubicacion-explanatory-influence-b',
          title:
            'Patrón controlado de influencia explicativa B',
          description:
            'Segundo patrón controlado para demostrar influencia explicativa plural sin selección, ranking ni prioridad.',
          score: 50,
          occurrences: 2,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-influencia-explicativa-b',
          },
          evidence: {
            memoryIds: [
              'memory-explanatory-influence-b-1',
              'memory-explanatory-influence-b-2',
            ],
          },
        },
      ];

      const controlledKnowledge =
        generateOperationalKnowledge(controlledPatterns);

      if (controlledKnowledge.length !== 2) {
        throw new Error(
          `FASE 23.20 esperaba 2 conocimientos controlados y generó ${controlledKnowledge.length}.`
        );
      }

      const considerationContext = {
        movementType: 'reubicacion' as const,
      };

      const considerations = controlledKnowledge
        .map((knowledge) => {
          const eligibility =
            evaluateOperationalKnowledgeEligibility(
              knowledge,
              considerationContext
            );

          return {
            knowledge,
            eligibility,
            consideration:
              considerOperationalKnowledge(eligibility),
          };
        })
        .filter(
          (
            item
          ): item is typeof item & {
            consideration: NonNullable<
              typeof item.consideration
            >;
          } => item.consideration !== null
        );

      if (considerations.length !== 2) {
        throw new Error(
          `FASE 23.20 esperaba 2 conocimientos considerados y obtuvo ${considerations.length}.`
        );
      }

      type ControlledKnowledgeObservation = {
        knowledgeId: string;
        message: string;
      };

      type ControlledExplanatoryResult = {
        movementType: 'reubicacion';
        summary: string;
        observations: ControlledKnowledgeObservation[];
      };

      /*
       * FASE 23.20 — Influencia explicativa controlada
       *
       * El resultado base existe independientemente del conocimiento.
       *
       * Los conocimientos considerados se utilizan para producir
       * observaciones semánticas trazables.
       *
       * Posteriormente esas observaciones modifican una copia del
       * resultado base.
       *
       * Por tanto:
       *
       * resultado base ≠ resultado influido
       *
       * La diferencia es atribuible mediante knowledgeId.
       *
       * La influencia queda limitada al contenido explicativo.
       *
       * NO participan:
       * - score;
       * - occurrences;
       * - prioridad;
       * - ranking;
       * - selección;
       * - recomendación;
       * - decisión;
       * - workflow;
       * - inventario;
       * - ejecución operativa.
       */

      const baseResult: ControlledExplanatoryResult = {
        movementType: 'reubicacion',
        summary:
          'CJWMS analiza el contexto operativo de la reubicación.',
        observations: [],
      };

      const baseResultSnapshot = JSON.stringify(baseResult);

      const knowledgeObservations: ControlledKnowledgeObservation[] =
        considerations.map(({ consideration }) => {
          const knowledge = controlledKnowledge.find(
            (candidate) =>
              candidate.id === consideration.knowledgeId
          );

          if (!knowledge) {
            throw new Error(
              `FASE 23.20 no pudo resolver el conocimiento considerado ${consideration.knowledgeId}.`
            );
          }

          return {
            knowledgeId: knowledge.id,
            message:
              `CJWMS incorpora como antecedente contextual el motivo recurrente ` +
              `"${knowledge.context.deviationReason}" ` +
              `observado en movimientos de tipo ` +
              `"${knowledge.context.movementType}".`,
          };
        });

      if (knowledgeObservations.length !== 2) {
        throw new Error(
          `FASE 23.20 esperaba 2 observaciones derivadas del conocimiento y produjo ${knowledgeObservations.length}.`
        );
      }

      /*
       * Éste es el punto exacto de influencia.
       *
       * El conocimiento no crea el resultado base.
       * Las observaciones producidas mediante utilización del
       * conocimiento modifican un resultado que ya existía
       * independientemente.
       */
      const influencedResult: ControlledExplanatoryResult = {
        ...baseResult,
        observations: [
          ...baseResult.observations,
          ...knowledgeObservations,
        ],
      };

      if (JSON.stringify(baseResult) !== baseResultSnapshot) {
        throw new Error(
          'FASE 23.20 modificó directamente el resultado base durante la influencia explicativa.'
        );
      }

      if (
        JSON.stringify(baseResult) ===
        JSON.stringify(influencedResult)
      ) {
        throw new Error(
          'FASE 23.20 no logró demostrar diferencia entre el resultado base y el resultado influido.'
        );
      }

      if (
        influencedResult.summary !== baseResult.summary ||
        influencedResult.movementType !==
          baseResult.movementType
      ) {
        throw new Error(
          'FASE 23.20 modificó propiedades base que debían permanecer intactas.'
        );
      }

      if (baseResult.observations.length !== 0) {
        throw new Error(
          'FASE 23.20 esperaba que el resultado base existiera sin observaciones derivadas del conocimiento.'
        );
      }

      if (
        influencedResult.observations.length !==
        baseResult.observations.length +
          knowledgeObservations.length
      ) {
        throw new Error(
          'FASE 23.20 no pudo atribuir exactamente la diferencia explicativa a las observaciones derivadas del conocimiento.'
        );
      }

      const influencedKnowledgeIds = new Set(
        influencedResult.observations.map(
          (observation) => observation.knowledgeId
        )
      );

      if (influencedKnowledgeIds.size !== 2) {
        throw new Error(
          'FASE 23.20 perdió la identidad plural de los conocimientos durante la influencia explicativa.'
        );
      }

      controlledKnowledge.forEach((knowledge) => {
        const observation =
          influencedResult.observations.find(
            (candidate) =>
              candidate.knowledgeId === knowledge.id
          );

        if (!observation) {
          throw new Error(
            `FASE 23.20 no pudo atribuir una modificación explicativa al conocimiento ${knowledge.id}.`
          );
        }

        if (
          !observation.message.includes(
            knowledge.context.deviationReason
          )
        ) {
          throw new Error(
            `FASE 23.20 produjo una modificación que no utilizó el motivo contextual del conocimiento ${knowledge.id}.`
          );
        }

        if (
          !observation.message.includes(
            knowledge.context.movementType
          )
        ) {
          throw new Error(
            `FASE 23.20 produjo una modificación que no utilizó el tipo de movimiento del conocimiento ${knowledge.id}.`
          );
        }
      });

      if (
        influencedResult.observations.some(
          (observation) =>
            'sourcePatternId' in observation ||
            'memoryIds' in observation ||
            'score' in observation ||
            'occurrences' in observation ||
            'priority' in observation ||
            'rank' in observation ||
            'selected' in observation ||
            'weight' in observation ||
            'confidence' in observation
        )
      ) {
        throw new Error(
          'FASE 23.20 detectó atributos artificiales de evidencia duplicada, score, recurrencia, prioridad, ranking, selección, ponderación o confianza dentro de la modificación explicativa.'
        );
      }

      const recommendationsAfterExplanatoryInfluence =
        generateRecommendationsFromPatterns(detectedPatterns);

      const decisionsAfterExplanatoryInfluence =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsAfterExplanatoryInfluence
        );

      if (
        JSON.stringify(
          recommendationsBeforeExplanatoryInfluence
        ) !==
        JSON.stringify(
          recommendationsAfterExplanatoryInfluence
        )
      ) {
        throw new Error(
          'FASE 23.20 detectó que la influencia explicativa modificó recomendaciones.'
        );
      }

      if (
        JSON.stringify(
          decisionsBeforeExplanatoryInfluence
        ) !==
        JSON.stringify(decisionsAfterExplanatoryInfluence)
      ) {
        throw new Error(
          'FASE 23.20 detectó que la influencia explicativa modificó decisiones operativas.'
        );
      }

      addLog(
        `FASE 23.20 OK: un resultado explicativo base independiente del conocimiento fue modificado de forma trazable por ${knowledgeObservations.length} conocimientos utilizados, produciendo ${influencedResult.observations.length} observaciones atribuibles mediante knowledgeId, con influencia explicativa plural pero sin selección, ranking, prioridad, ponderación ni influencia decisional, y sin modificar ${recommendationsAfterExplanatoryInfluence.length} recomendaciones o ${decisionsAfterExplanatoryInfluence.length} decisiones.`
      );
    } catch (error) {
      console.error(error);

      addLog(
        error instanceof Error
          ? `Error en influencia explicativa de conocimiento 23.20: ${error.message}`
          : 'Error inesperado en influencia explicativa de conocimiento 23.20.'
      );
    } finally {
      setLoading(false);
    }
  }

  async function testOperationalKnowledgeDecisionBoundary() {
    setLoading(true);

    try {
      const detectedPatterns = await detectMemoryPatterns();

      const recommendationsBeforeBoundary =
        generateRecommendationsFromPatterns(detectedPatterns);

      const decisionsBeforeBoundary =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsBeforeBoundary
        );

      if (decisionsBeforeBoundary.length === 0) {
        throw new Error(
          'FASE 23.21 necesita al menos una decisión operativa real para establecer la frontera explicativa-decisional.'
        );
      }

      /*
       * FASE 23.21 — Frontera entre influencia explicativa
       * y decisional del conocimiento operativo
       *
       * A diferencia de FASE 23.20, el resultado compuesto contiene
       * ahora como núcleo una decisión real ya producida por CJWMS.
       *
       * El conocimiento NO entra en esa decisión.
       *
       * Sólo puede modificar un contexto explicativo externo y
       * estructuralmente separado.
       *
       * Debe cumplirse:
       *
       * resultado base != resultado influido
       *
       * pero:
       *
       * decisionCore base == decisionCore influido
       *
       * Por tanto, la influencia explicativa puede aproximarse a un
       * resultado decisional real sin convertirse todavía en
       * influencia sobre la decisión.
       */

      const controlledPatterns = [
        {
          id: 'recommendation-deviation-pattern-reubicacion-decision-boundary-a',
          title:
            'Patrón controlado de frontera explicativa-decisional A',
          description:
            'Patrón controlado para probar influencia explicativa junto a una decisión real sin modificar su núcleo decisional.',
          score: 95,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-frontera-decisional-a',
          },
          evidence: {
            memoryIds: [
              'memory-decision-boundary-a-1',
              'memory-decision-boundary-a-2',
              'memory-decision-boundary-a-3',
              'memory-decision-boundary-a-4',
            ],
          },
        },
        {
          id: 'recommendation-deviation-pattern-reubicacion-decision-boundary-b',
          title:
            'Patrón controlado de frontera explicativa-decisional B',
          description:
            'Segundo patrón controlado para demostrar influencia explicativa plural manteniendo intacta una decisión real.',
          score: 50,
          occurrences: 2,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-frontera-decisional-b',
          },
          evidence: {
            memoryIds: [
              'memory-decision-boundary-b-1',
              'memory-decision-boundary-b-2',
            ],
          },
        },
      ];

      const controlledKnowledge =
        generateOperationalKnowledge(controlledPatterns);

      if (controlledKnowledge.length !== 2) {
        throw new Error(
          `FASE 23.21 esperaba 2 conocimientos controlados y generó ${controlledKnowledge.length}.`
        );
      }

      const considerationContext = {
        movementType: 'reubicacion' as const,
      };

      const considerations = controlledKnowledge
        .map((knowledge) => {
          const eligibility =
            evaluateOperationalKnowledgeEligibility(
              knowledge,
              considerationContext
            );

          return {
            knowledge,
            eligibility,
            consideration:
              considerOperationalKnowledge(eligibility),
          };
        })
        .filter(
          (
            item
          ): item is typeof item & {
            consideration: NonNullable<
              typeof item.consideration
            >;
          } => item.consideration !== null
        );

      if (considerations.length !== 2) {
        throw new Error(
          `FASE 23.21 esperaba 2 conocimientos considerados y obtuvo ${considerations.length}.`
        );
      }

      type ControlledBoundaryObservation = {
        knowledgeId: string;
        message: string;
      };

      type ControlledExplanatoryContext = {
        observations: ControlledBoundaryObservation[];
      };

      /*
       * Inferimos directamente el tipo del núcleo decisional real
       * producido por generateOperationalDecisions().
       *
       * No creamos una nueva abstracción productiva.
       */
      type ControlledDecisionCore =
        (typeof decisionsBeforeBoundary)[number];

      type ControlledDecisionBoundaryResult = {
        decisionCore: ControlledDecisionCore;
        explanatoryContext: ControlledExplanatoryContext;
      };

      const realDecisionCore = decisionsBeforeBoundary[0];

      if (!realDecisionCore) {
        throw new Error(
          'FASE 23.21 no pudo resolver la decisión operativa utilizada como núcleo controlado.'
        );
      }

      /*
       * El resultado base ya contiene una decisión real.
       *
       * Su contexto explicativo adicional existe vacío y puede
       * permanecer así sin conocimiento.
       */
      const baseResult: ControlledDecisionBoundaryResult = {
        decisionCore: realDecisionCore,
        explanatoryContext: {
          observations: [],
        },
      };

      const baseResultSnapshot = JSON.stringify(baseResult);
      const decisionCoreSnapshot = JSON.stringify(
        baseResult.decisionCore
      );

      /*
       * Utilización del conocimiento.
       *
       * Igual que en las fases anteriores, el consumidor resuelve
       * knowledgeId y utiliza contenido semántico real.
       *
       * score y occurrences siguen completamente fuera.
       */
      const knowledgeObservations: ControlledBoundaryObservation[] =
        considerations.map(({ consideration }) => {
          const knowledge = controlledKnowledge.find(
            (candidate) =>
              candidate.id === consideration.knowledgeId
          );

          if (!knowledge) {
            throw new Error(
              `FASE 23.21 no pudo resolver el conocimiento considerado ${consideration.knowledgeId}.`
            );
          }

          return {
            knowledgeId: knowledge.id,
            message:
              `Antecedente operativo contextual: el motivo recurrente ` +
              `"${knowledge.context.deviationReason}" fue observado ` +
              `en movimientos de tipo ` +
              `"${knowledge.context.movementType}".`,
          };
        });

      if (knowledgeObservations.length !== 2) {
        throw new Error(
          `FASE 23.21 esperaba 2 contribuciones explicativas y produjo ${knowledgeObservations.length}.`
        );
      }

      /*
       * Punto controlado de influencia.
       *
       * El resultado compuesto cambia porque cambia únicamente
       * explanatoryContext.
       *
       * decisionCore se conserva por referencia y por contenido.
       */
      const influencedResult: ControlledDecisionBoundaryResult = {
        ...baseResult,
        explanatoryContext: {
          ...baseResult.explanatoryContext,
          observations: [
            ...baseResult.explanatoryContext.observations,
            ...knowledgeObservations,
          ],
        },
      };

      /*
       * El resultado base no puede haber sido mutado.
       */
      if (JSON.stringify(baseResult) !== baseResultSnapshot) {
        throw new Error(
          'FASE 23.21 modificó directamente el resultado compuesto base.'
        );
      }

      /*
       * Debe existir influencia real sobre el resultado compuesto.
       */
      if (
        JSON.stringify(baseResult) ===
        JSON.stringify(influencedResult)
      ) {
        throw new Error(
          'FASE 23.21 no logró demostrar influencia sobre el resultado compuesto.'
        );
      }

      /*
       * La decisión debe permanecer exactamente intacta.
       */
      if (
        JSON.stringify(baseResult.decisionCore) !==
        JSON.stringify(influencedResult.decisionCore)
      ) {
        throw new Error(
          'FASE 23.21 cruzó la frontera: el conocimiento modificó el núcleo decisional.'
        );
      }

      if (
        JSON.stringify(influencedResult.decisionCore) !==
        decisionCoreSnapshot
      ) {
        throw new Error(
          'FASE 23.21 detectó una alteración del contenido original de la decisión.'
        );
      }

      /*
       * Conservamos incluso la misma identidad del objeto decisional.
       *
       * El experimento no reconstruye, reemplaza ni recalcula
       * la decisión.
       */
      if (
        influencedResult.decisionCore !==
        baseResult.decisionCore
      ) {
        throw new Error(
          'FASE 23.21 reemplazó artificialmente el núcleo decisional durante la influencia explicativa.'
        );
      }

      if (
        baseResult.explanatoryContext.observations.length !== 0
      ) {
        throw new Error(
          'FASE 23.21 esperaba un contexto explicativo base independiente del conocimiento.'
        );
      }

      if (
        influencedResult.explanatoryContext.observations
          .length !== 2
      ) {
        throw new Error(
          'FASE 23.21 esperaba exactamente 2 modificaciones explicativas atribuibles.'
        );
      }

      const influencedKnowledgeIds = new Set(
        influencedResult.explanatoryContext.observations.map(
          (observation) => observation.knowledgeId
        )
      );

      if (influencedKnowledgeIds.size !== 2) {
        throw new Error(
          'FASE 23.21 perdió la pluralidad o identidad independiente de los conocimientos influyentes.'
        );
      }

      controlledKnowledge.forEach((knowledge) => {
        const observation =
          influencedResult.explanatoryContext.observations.find(
            (candidate) =>
              candidate.knowledgeId === knowledge.id
          );

        if (!observation) {
          throw new Error(
            `FASE 23.21 no pudo atribuir influencia explicativa al conocimiento ${knowledge.id}.`
          );
        }

        if (
          !observation.message.includes(
            knowledge.context.deviationReason
          )
        ) {
          throw new Error(
            `FASE 23.21 no utilizó el motivo contextual del conocimiento ${knowledge.id}.`
          );
        }

        if (
          !observation.message.includes(
            knowledge.context.movementType
          )
        ) {
          throw new Error(
            `FASE 23.21 no utilizó el tipo de movimiento del conocimiento ${knowledge.id}.`
          );
        }
      });

      /*
       * La superficie explicativa no puede recibir atributos
       * que introduzcan selección, ponderación o evidencia
       * duplicada.
       */
      if (
        influencedResult.explanatoryContext.observations.some(
          (observation) =>
            'sourcePatternId' in observation ||
            'memoryIds' in observation ||
            'score' in observation ||
            'occurrences' in observation ||
            'priority' in observation ||
            'rank' in observation ||
            'selected' in observation ||
            'weight' in observation ||
            'confidence' in observation
        )
      ) {
        throw new Error(
          'FASE 23.21 detectó atributos ajenos a la frontera explicativa dentro de las contribuciones del conocimiento.'
        );
      }

      /*
       * Verificación externa adicional:
       * los motores reales siguen produciendo exactamente
       * recomendaciones y decisiones equivalentes.
       */
      const recommendationsAfterBoundary =
        generateRecommendationsFromPatterns(detectedPatterns);

      const decisionsAfterBoundary =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsAfterBoundary
        );

      if (
        JSON.stringify(recommendationsBeforeBoundary) !==
        JSON.stringify(recommendationsAfterBoundary)
      ) {
        throw new Error(
          'FASE 23.21 detectó modificación de recomendaciones operativas.'
        );
      }

      if (
        JSON.stringify(decisionsBeforeBoundary) !==
        JSON.stringify(decisionsAfterBoundary)
      ) {
        throw new Error(
          'FASE 23.21 detectó modificación de decisiones operativas.'
        );
      }

      addLog(
        `FASE 23.21 OK: ${knowledgeObservations.length} conocimientos influyeron pluralmente sobre un contexto explicativo asociado a una decisión real, mientras el núcleo decisional permaneció exactamente intacto por identidad y contenido; la frontera influencia explicativa ≠ influencia decisional quedó preservada sin selección, ranking, prioridad, ponderación ni modificación de ${recommendationsAfterBoundary.length} recomendaciones o ${decisionsAfterBoundary.length} decisiones.`
      );
    } catch (error) {
      console.error(error);

      addLog(
        error instanceof Error
          ? `Error en frontera explicativa-decisional 23.21: ${error.message}`
          : 'Error inesperado en frontera explicativa-decisional 23.21.'
      );
    } finally {
      setLoading(false);
    }
  }

  async function testOperationalKnowledgeControlledDecisionInfluence() {
    setLoading(true);

    try {
      const detectedPatterns = await detectMemoryPatterns();

      const recommendationsBeforeDecisionInfluence =
        generateRecommendationsFromPatterns(detectedPatterns);

      const decisionsBeforeDecisionInfluence =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsBeforeDecisionInfluence
        );

      if (decisionsBeforeDecisionInfluence.length === 0) {
        throw new Error(
          'FASE 23.22 necesita al menos una decisión operativa real para demostrar influencia sobre contenido decisional.'
        );
      }

      /*
       * FASE 23.22 — Influencia controlada sobre contenido
       * decisional del conocimiento operativo
       *
       * FASE 23.21 demostró que el conocimiento podía influir
       * junto a una decisión real sin modificarla.
       *
       * FASE 23.22 cruza deliberadamente esa frontera:
       *
       * una propiedad perteneciente al núcleo decisional
       * cambiará como consecuencia atribuible de la utilización
       * de conocimiento.
       *
       * La propiedad elegida es action.
       *
       * action representa aquí contenido declarativo acerca de
       * qué hacer y actualmente no ejecuta workflows.
       *
       * Debe cumplirse:
       *
       * decisión base != decisión influida
       *
       * y específicamente:
       *
       * action base != action influida
       *
       * mientras permanecen intactos:
       * - id;
       * - title;
       * - description;
       * - priority;
       * - confidence;
       * - sourcePatternId.
       *
       * NO se permite:
       * - modificar score/confidence;
       * - modificar prioridad;
       * - alterar ranking;
       * - seleccionar otra decisión;
       * - ejecutar la acción;
       * - modificar recomendaciones productivas;
       * - modificar decisiones productivas originales.
       */

      const controlledPatterns = [
        {
          id: 'recommendation-deviation-pattern-reubicacion-controlled-decision-influence',
          title:
            'Patrón controlado de influencia sobre contenido decisional',
          description:
            'Patrón controlado para demostrar una modificación atribuible de contenido decisional sin ranking, selección ni ejecución.',
          score: 95,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-influencia-contenido-decisional',
          },
          evidence: {
            memoryIds: [
              'memory-controlled-decision-influence-1',
              'memory-controlled-decision-influence-2',
              'memory-controlled-decision-influence-3',
              'memory-controlled-decision-influence-4',
            ],
          },
        },
      ];

      const controlledKnowledge =
        generateOperationalKnowledge(controlledPatterns);

      if (controlledKnowledge.length !== 1) {
        throw new Error(
          `FASE 23.22 esperaba exactamente 1 conocimiento controlado y generó ${controlledKnowledge.length}.`
        );
      }

      const knowledge = controlledKnowledge[0];

      if (!knowledge) {
        throw new Error(
          'FASE 23.22 no pudo resolver el conocimiento controlado.'
        );
      }

      const eligibility =
        evaluateOperationalKnowledgeEligibility(knowledge, {
          movementType: 'reubicacion',
        });

      const consideration =
        considerOperationalKnowledge(eligibility);

      if (!consideration) {
        throw new Error(
          'FASE 23.22 esperaba que el conocimiento controlado fuera elegible y considerado.'
        );
      }

      if (consideration.knowledgeId !== knowledge.id) {
        throw new Error(
          'FASE 23.22 perdió trazabilidad entre consideración y conocimiento.'
        );
      }

      /*
       * Utilizamos una decisión real ya producida por CJWMS.
       *
       * No recalculamos ni seleccionamos otra decisión como
       * consecuencia del conocimiento.
       */
      const baseDecision =
        decisionsBeforeDecisionInfluence[0];

      if (!baseDecision) {
        throw new Error(
          'FASE 23.22 no pudo resolver la decisión base.'
        );
      }

      const baseDecisionSnapshot =
        JSON.stringify(baseDecision);

      /*
       * El consumidor utiliza contenido semántico real del
       * conocimiento para construir una nueva expresión de action.
       *
       * knowledgeId queda incluido exclusivamente como
       * trazabilidad de la modificación controlada.
       *
       * score y occurrences NO participan.
       */
      const influencedAction =
        `${baseDecision.action} | ` +
        `considerar antecedente "${knowledge.context.deviationReason}" ` +
        `para movimiento "${knowledge.context.movementType}" ` +
        `[knowledgeId=${knowledge.id}]`;

      if (
        !influencedAction.includes(
          knowledge.context.deviationReason
        )
      ) {
        throw new Error(
          'FASE 23.22 no utilizó el motivo contextual del conocimiento para producir la modificación decisional.'
        );
      }

      if (
        !influencedAction.includes(
          knowledge.context.movementType
        )
      ) {
        throw new Error(
          'FASE 23.22 no utilizó el tipo de movimiento del conocimiento para producir la modificación decisional.'
        );
      }

      if (!influencedAction.includes(knowledge.id)) {
        throw new Error(
          'FASE 23.22 perdió la atribución mediante knowledgeId.'
        );
      }

      /*
       * Punto exacto de influencia decisional.
       *
       * Por primera vez una propiedad del núcleo decisional
       * cambia de forma atribuible al conocimiento utilizado.
       *
       * Se crea una copia controlada.
       * La decisión productiva original no se muta.
       */
      const influencedDecision: OperationalDecision = {
        ...baseDecision,
        action: influencedAction,
      };

      /*
       * La decisión original debe permanecer intacta.
       */
      if (
        JSON.stringify(baseDecision) !==
        baseDecisionSnapshot
      ) {
        throw new Error(
          'FASE 23.22 mutó directamente la decisión operativa original.'
        );
      }

      /*
       * Debe existir una diferencia real en el resultado
       * decisional controlado.
       */
      if (
        JSON.stringify(baseDecision) ===
        JSON.stringify(influencedDecision)
      ) {
        throw new Error(
          'FASE 23.22 no logró demostrar influencia sobre contenido decisional.'
        );
      }

      /*
       * La propiedad decisional elegida debe cambiar.
       */
      if (
        baseDecision.action === influencedDecision.action
      ) {
        throw new Error(
          'FASE 23.22 no modificó la propiedad action.'
        );
      }

      /*
       * Ninguna otra propiedad del núcleo puede cambiar.
       */
      if (
        influencedDecision.id !== baseDecision.id ||
        influencedDecision.title !== baseDecision.title ||
        influencedDecision.description !==
          baseDecision.description ||
        influencedDecision.priority !==
          baseDecision.priority ||
        influencedDecision.confidence !==
          baseDecision.confidence ||
        influencedDecision.sourcePatternId !==
          baseDecision.sourcePatternId
      ) {
        throw new Error(
          'FASE 23.22 modificó propiedades decisionales fuera de la frontera controlada de action.'
        );
      }

      /*
       * En particular, confidence y priority deben mantenerse
       * intactos porque actualmente participan respectivamente
       * en ordenamiento y jerarquización.
       */
      if (
        influencedDecision.confidence !==
        baseDecision.confidence
      ) {
        throw new Error(
          'FASE 23.22 modificó confidence y cruzó hacia ponderación o ranking.'
        );
      }

      if (
        influencedDecision.priority !==
        baseDecision.priority
      ) {
        throw new Error(
          'FASE 23.22 modificó priority y cruzó hacia jerarquización.'
        );
      }

      /*
       * La decisión elegida como objeto experimental sigue siendo
       * la misma identidad lógica: no cambiamos id ni seleccionamos
       * otra decisión.
       */
      if (influencedDecision.id !== baseDecision.id) {
        throw new Error(
          'FASE 23.22 seleccionó o sustituyó una decisión diferente.'
        );
      }

      /*
       * Verificación externa:
       *
       * los motores productivos deben seguir generando exactamente
       * las mismas recomendaciones y decisiones que antes.
       */
      const recommendationsAfterDecisionInfluence =
        generateRecommendationsFromPatterns(detectedPatterns);

      const decisionsAfterDecisionInfluence =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsAfterDecisionInfluence
        );

      if (
        JSON.stringify(
          recommendationsBeforeDecisionInfluence
        ) !==
        JSON.stringify(
          recommendationsAfterDecisionInfluence
        )
      ) {
        throw new Error(
          'FASE 23.22 detectó modificación de recomendaciones productivas.'
        );
      }

      if (
        JSON.stringify(decisionsBeforeDecisionInfluence) !==
        JSON.stringify(decisionsAfterDecisionInfluence)
      ) {
        throw new Error(
          'FASE 23.22 detectó modificación de decisiones productivas originales.'
        );
      }

      /*
       * Confirmamos explícitamente que el conocimiento utilizado
       * no ha introducido atributos de ranking, selección,
       * ponderación o evidencia duplicada dentro del resultado.
       */
      const controlledInfluenceTrace = {
        knowledgeId: knowledge.id,
        property: 'action' as const,
        before: baseDecision.action,
        after: influencedDecision.action,
      };

      if (
        'sourcePatternId' in controlledInfluenceTrace ||
        'memoryIds' in controlledInfluenceTrace ||
        'score' in controlledInfluenceTrace ||
        'occurrences' in controlledInfluenceTrace ||
        'priority' in controlledInfluenceTrace ||
        'rank' in controlledInfluenceTrace ||
        'selected' in controlledInfluenceTrace ||
        'weight' in controlledInfluenceTrace ||
        'confidence' in controlledInfluenceTrace
      ) {
        throw new Error(
          'FASE 23.22 detectó atributos ajenos a la influencia decisional controlada.'
        );
      }

      addLog(
        `FASE 23.22 OK: 1 conocimiento considerado modificó de forma atribuible mediante knowledgeId la propiedad decisional action de una copia controlada de una decisión real, mientras id, title, description, priority, confidence y sourcePatternId permanecieron intactos; se demostró influencia decisional sin ponderación, ranking, selección ni ejecución y sin modificar ${recommendationsAfterDecisionInfluence.length} recomendaciones o ${decisionsAfterDecisionInfluence.length} decisiones productivas.`
      );
    } catch (error) {
      console.error(error);

      addLog(
        error instanceof Error
          ? `Error en influencia controlada sobre contenido decisional 23.22: ${error.message}`
          : 'Error inesperado en influencia controlada sobre contenido decisional 23.22.'
      );
    } finally {
      setLoading(false);
    }
  }

  async function testOperationalKnowledgeControlledDecisionDetermination() {
    setLoading(true);

    try {
      const detectedPatterns = await detectMemoryPatterns();

      const recommendationsBeforeDetermination =
        generateRecommendationsFromPatterns(detectedPatterns);

      const decisionsBeforeDetermination =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsBeforeDetermination
        );

      /*
       * FASE 23.23 — Determinación controlada de contenido
       * decisional por conocimiento operativo
       *
       * FASE 23.22 demostró:
       *
       * decisión ya determinada
       *       +
       * conocimiento
       *       ↓
       * action enriquecida
       *
       * FASE 23.23 debe demostrar algo distinto:
       *
       * mismo estado decisional base
       *       |
       *       |-- sin conocimiento --> action A
       *       |
       *       `-- con conocimiento --> action B
       *
       * El conocimiento participa por primera vez en una condición
       * causal que determina cuál contenido decisional se produce.
       *
       * NO participan:
       * - confidence;
       * - priority;
       * - score;
       * - occurrences;
       * - ranking;
       * - posición en el array;
       * - selección entre decisiones;
       * - ejecución.
       */

      /*
       * Elegimos explícitamente la decisión por identidad.
       *
       * No utilizamos decisions[0], porque el array productivo ya
       * viene ordenado por confidence y eso introduciría ranking
       * dentro del experimento.
       */
      const baseDecision =
        decisionsBeforeDetermination.find(
          (decision) =>
            decision.id === 'decision-review-movements'
        );

      if (!baseDecision) {
        throw new Error(
          'FASE 23.23 no encontró la decisión estable decision-review-movements necesaria para la prueba controlada.'
        );
      }

      const baseDecisionSnapshot =
        JSON.stringify(baseDecision);

      const controlledPatterns = [
        {
          id: 'recommendation-deviation-pattern-reubicacion-controlled-determination',
          title:
            'Patrón controlado de determinación de contenido decisional',
          description:
            'Patrón controlado para demostrar que el conocimiento puede participar causalmente en la determinación de una action sin introducir ranking, prioridad ni ejecución.',
          score: 95,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-determinacion-decisional',
          },
          evidence: {
            memoryIds: [
              'memory-controlled-determination-1',
              'memory-controlled-determination-2',
              'memory-controlled-determination-3',
              'memory-controlled-determination-4',
            ],
          },
        },
      ];

      const controlledKnowledge =
        generateOperationalKnowledge(controlledPatterns);

      if (controlledKnowledge.length !== 1) {
        throw new Error(
          `FASE 23.23 esperaba exactamente 1 conocimiento controlado y generó ${controlledKnowledge.length}.`
        );
      }

      const knowledge = controlledKnowledge[0];

      if (!knowledge) {
        throw new Error(
          'FASE 23.23 no pudo resolver el conocimiento controlado.'
        );
      }

      const eligibility =
        evaluateOperationalKnowledgeEligibility(knowledge, {
          movementType: 'reubicacion',
        });

      const consideration =
        considerOperationalKnowledge(eligibility);

      if (!consideration) {
        throw new Error(
          'FASE 23.23 esperaba que el conocimiento fuera elegible y considerado.'
        );
      }

      if (consideration.knowledgeId !== knowledge.id) {
        throw new Error(
          'FASE 23.23 perdió trazabilidad entre consideración y conocimiento.'
        );
      }

      type ControlledDecisionDetermination = {
        decisionId: string;
        action: string;
        knowledgeId: string | null;
      };

      /*
       * Consumidor local de determinación.
       *
       * Recibe siempre la misma decisión base.
       *
       * La única diferencia entre ambos experimentos es si recibe
       * o no conocimiento considerado.
       *
       * El contenido semántico del conocimiento participa en una
       * condición real:
       *
       * - movementType debe ser reubicacion;
       * - deviationReason debe ser el antecedente controlado.
       *
       * score y occurrences no se consultan.
       */
      const determineControlledAction = (
        decision: OperationalDecision,
        consideredKnowledge:
          | typeof knowledge
          | null
      ): ControlledDecisionDetermination => {
        const hasApplicableKnowledge =
          consideredKnowledge !== null &&
          consideredKnowledge.context.movementType ===
            'reubicacion' &&
          consideredKnowledge.context.deviationReason ===
            'motivo-controlado-determinacion-decisional';

        if (!hasApplicableKnowledge) {
          return {
            decisionId: decision.id,
            action: decision.action,
            knowledgeId: null,
          };
        }

        return {
          decisionId: decision.id,
          action:
            'review_contextual_relocation_deviation',
          knowledgeId: consideredKnowledge.id,
        };
      };

      /*
       * Contrafactual controlado:
       *
       * misma decisión base
       * mismo consumidor
       * ninguna otra variable cambia
       */
      const resultWithoutKnowledge =
        determineControlledAction(baseDecision, null);

      const resultWithKnowledge =
        determineControlledAction(
          baseDecision,
          knowledge
        );

      /*
       * Sin conocimiento debe conservarse la action original.
       */
      if (
        resultWithoutKnowledge.action !==
        baseDecision.action
      ) {
        throw new Error(
          'FASE 23.23 alteró la action aun sin conocimiento.'
        );
      }

      if (resultWithoutKnowledge.knowledgeId !== null) {
        throw new Error(
          'FASE 23.23 atribuyó conocimiento a un resultado producido sin conocimiento.'
        );
      }

      /*
       * Con conocimiento debe determinarse un contenido distinto.
       */
      if (
        resultWithKnowledge.action ===
        resultWithoutKnowledge.action
      ) {
        throw new Error(
          'FASE 23.23 no logró demostrar una diferencia de determinación causada por conocimiento.'
        );
      }

      if (
        resultWithKnowledge.action !==
        'review_contextual_relocation_deviation'
      ) {
        throw new Error(
          'FASE 23.23 produjo una action diferente de la determinación controlada esperada.'
        );
      }

      /*
       * Atribución explícita.
       */
      if (
        resultWithKnowledge.knowledgeId !== knowledge.id
      ) {
        throw new Error(
          'FASE 23.23 perdió la atribución causal mediante knowledgeId.'
        );
      }

      /*
       * La identidad lógica de la decisión permanece igual.
       *
       * No seleccionamos otra decisión.
       */
      if (
        resultWithoutKnowledge.decisionId !==
          baseDecision.id ||
        resultWithKnowledge.decisionId !==
          baseDecision.id
      ) {
        throw new Error(
          'FASE 23.23 sustituyó o seleccionó una decisión distinta durante la determinación.'
        );
      }

      /*
       * La decisión productiva original jamás se muta.
       */
      if (
        JSON.stringify(baseDecision) !==
        baseDecisionSnapshot
      ) {
        throw new Error(
          'FASE 23.23 mutó la decisión productiva original.'
        );
      }

      /*
       * Creamos una copia decisional controlada únicamente para
       * comprobar cuál sería el resultado determinado.
       *
       * priority, confidence y el resto permanecen intactos.
       */
      const determinedDecision: OperationalDecision = {
        ...baseDecision,
        action: resultWithKnowledge.action,
      };

      if (
        determinedDecision.action ===
        baseDecision.action
      ) {
        throw new Error(
          'FASE 23.23 no transfirió la determinación controlada a la copia decisional.'
        );
      }

      if (
        determinedDecision.id !== baseDecision.id ||
        determinedDecision.title !== baseDecision.title ||
        determinedDecision.description !==
          baseDecision.description ||
        determinedDecision.priority !==
          baseDecision.priority ||
        determinedDecision.confidence !==
          baseDecision.confidence ||
        determinedDecision.sourcePatternId !==
          baseDecision.sourcePatternId
      ) {
        throw new Error(
          'FASE 23.23 modificó propiedades distintas de action durante la determinación controlada.'
        );
      }

      /*
       * Guardas explícitas contra jerarquización y ponderación.
       */
      if (
        determinedDecision.priority !==
        baseDecision.priority
      ) {
        throw new Error(
          'FASE 23.23 modificó priority y cruzó hacia jerarquización.'
        );
      }

      if (
        determinedDecision.confidence !==
        baseDecision.confidence
      ) {
        throw new Error(
          'FASE 23.23 modificó confidence y cruzó hacia ponderación o ranking.'
        );
      }

      /*
       * El conocimiento no debe llegar al consumidor mediante
       * evidencia cuantitativa ni procedencia expandida.
       */
      const determinationTrace = {
        decisionId: baseDecision.id,
        knowledgeId: knowledge.id,
        before: resultWithoutKnowledge.action,
        after: resultWithKnowledge.action,
      };

      if (
        'sourcePatternId' in determinationTrace ||
        'memoryIds' in determinationTrace ||
        'score' in determinationTrace ||
        'occurrences' in determinationTrace ||
        'priority' in determinationTrace ||
        'confidence' in determinationTrace ||
        'rank' in determinationTrace ||
        'selected' in determinationTrace ||
        'weight' in determinationTrace
      ) {
        throw new Error(
          'FASE 23.23 detectó atributos ajenos a la determinación controlada.'
        );
      }

      /*
       * Verificación productiva externa.
       *
       * El motor real continúa completamente intacto.
       */
      const recommendationsAfterDetermination =
        generateRecommendationsFromPatterns(detectedPatterns);

      const decisionsAfterDetermination =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsAfterDetermination
        );

      if (
        JSON.stringify(
          recommendationsBeforeDetermination
        ) !==
        JSON.stringify(
          recommendationsAfterDetermination
        )
      ) {
        throw new Error(
          'FASE 23.23 detectó modificación de recomendaciones productivas.'
        );
      }

      if (
        JSON.stringify(decisionsBeforeDetermination) !==
        JSON.stringify(decisionsAfterDetermination)
      ) {
        throw new Error(
          'FASE 23.23 detectó modificación de decisiones productivas.'
        );
      }

      /*
       * La posición de la decisión en el array no participa jamás
       * en la determinación.
       *
       * La resolvemos nuevamente por id para comprobar identidad
       * lógica después del experimento.
       */
      const sameProductiveDecisionAfter =
        decisionsAfterDetermination.find(
          (decision) =>
            decision.id === baseDecision.id
        );

      if (!sameProductiveDecisionAfter) {
        throw new Error(
          'FASE 23.23 perdió la decisión productiva utilizada como referencia.'
        );
      }

      if (
        JSON.stringify(sameProductiveDecisionAfter) !==
        baseDecisionSnapshot
      ) {
        throw new Error(
          'FASE 23.23 alteró indirectamente la decisión productiva de referencia.'
        );
      }

      addLog(
        `FASE 23.23 OK: utilizando la misma decisión base resuelta explícitamente por id, el consumidor produjo action "${resultWithoutKnowledge.action}" sin conocimiento y action "${resultWithKnowledge.action}" con 1 conocimiento considerado; la diferencia quedó atribuida mediante knowledgeId y demuestra determinación causal de contenido decisional sin modificar priority, confidence, ranking, selección ni ejecución, manteniendo intactas ${recommendationsAfterDetermination.length} recomendaciones y ${decisionsAfterDetermination.length} decisiones productivas.`
      );
    } catch (error) {
      console.error(error);

      addLog(
        error instanceof Error
          ? `Error en determinación controlada de contenido decisional 23.23: ${error.message}`
          : 'Error inesperado en determinación controlada de contenido decisional 23.23.'
      );
    } finally {
      setLoading(false);
    }
  }

  async function testOperationalKnowledgeControlledDecisionComparison() {
    setLoading(true);

    try {
      const detectedPatterns = await detectMemoryPatterns();

      const recommendationsBeforeComparison =
        generateRecommendationsFromPatterns(detectedPatterns);

      const decisionsBeforeComparison =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsBeforeComparison
        );

      /*
       * FASE 23.24 — Comparación contextual controlada entre
       * alternativas decisionales por conocimiento operativo
       *
       * FASE 23.23 demostró que un conocimiento puede participar
       * causalmente en la determinación del contenido de UNA decisión.
       *
       * FASE 23.24 estudia por primera vez una relación entre DOS
       * alternativas decisionales reales.
       *
       * Debe cumplirse:
       *
       * mismas decisiones A y B
       * mismo consumidor
       *
       * sin conocimiento:
       *   relación = undifferentiated
       *
       * con conocimiento:
       *   relación = contextually_distinguished
       *
       * El conocimiento modifica la relación comparativa producida,
       * pero NO:
       *
       * - modifica A;
       * - modifica B;
       * - cambia confidence;
       * - cambia priority;
       * - cambia el orden de A/B;
       * - asigna rank;
       * - declara winner/loser;
       * - declara preferred;
       * - selecciona;
       * - ejecuta.
       */

      /*
       * Las alternativas se resuelven explícitamente por identidad.
       *
       * Nunca utilizamos [0], posición de array, confidence,
       * priority ni ningún criterio de ranking.
       */
      const firstDecision =
        decisionsBeforeComparison.find(
          (decision) =>
            decision.id === 'decision-review-movements'
        );

      const secondDecision =
        decisionsBeforeComparison.find(
          (decision) =>
            decision.id === 'decision-maintain-monitoring'
        );

      if (!firstDecision) {
        throw new Error(
          'FASE 23.24 no encontró decision-review-movements para utilizarla como alternativa A.'
        );
      }

      if (!secondDecision) {
        throw new Error(
          'FASE 23.24 no encontró decision-maintain-monitoring para utilizarla como alternativa B.'
        );
      }

      const firstDecisionSnapshot =
        JSON.stringify(firstDecision);

      const secondDecisionSnapshot =
        JSON.stringify(secondDecision);

      const controlledPatterns = [
        {
          id: 'recommendation-deviation-pattern-reubicacion-controlled-comparison',
          title:
            'Patrón controlado de comparación contextual decisional',
          description:
            'Patrón controlado para demostrar que el conocimiento puede modificar una relación contextual entre dos alternativas sin ordenarlas ni seleccionar una.',
          score: 95,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-comparacion-contextual',
          },
          evidence: {
            memoryIds: [
              'memory-controlled-comparison-1',
              'memory-controlled-comparison-2',
              'memory-controlled-comparison-3',
              'memory-controlled-comparison-4',
            ],
          },
        },
      ];

      const controlledKnowledge =
        generateOperationalKnowledge(controlledPatterns);

      if (controlledKnowledge.length !== 1) {
        throw new Error(
          `FASE 23.24 esperaba exactamente 1 conocimiento controlado y generó ${controlledKnowledge.length}.`
        );
      }

      const knowledge = controlledKnowledge[0];

      if (!knowledge) {
        throw new Error(
          'FASE 23.24 no pudo resolver el conocimiento controlado.'
        );
      }

      const eligibility =
        evaluateOperationalKnowledgeEligibility(knowledge, {
          movementType: 'reubicacion',
        });

      const consideration =
        considerOperationalKnowledge(eligibility);

      if (!consideration) {
        throw new Error(
          'FASE 23.24 esperaba que el conocimiento fuera elegible y considerado.'
        );
      }

      if (consideration.knowledgeId !== knowledge.id) {
        throw new Error(
          'FASE 23.24 perdió trazabilidad entre consideración y conocimiento.'
        );
      }

      type ControlledDecisionComparisonRelation =
        | 'undifferentiated'
        | 'contextually_distinguished';

      type ControlledDecisionComparison = {
        decisionIds: [string, string];
        relation: ControlledDecisionComparisonRelation;
        knowledgeId: string | null;
        context: string | null;
      };

      /*
       * Consumidor comparativo local.
       *
       * Recibe SIEMPRE las mismas alternativas A y B.
       *
       * No decide cuál es mejor.
       * No modifica sus atributos.
       *
       * El conocimiento sólo permite producir una relación
       * contextual nueva entre ambas.
       */
      const compareControlledDecisions = (
        first: OperationalDecision,
        second: OperationalDecision,
        consideredKnowledge:
          | typeof knowledge
          | null
      ): ControlledDecisionComparison => {
        if (!consideredKnowledge) {
          return {
            decisionIds: [first.id, second.id],
            relation: 'undifferentiated',
            knowledgeId: null,
            context: null,
          };
        }

        const knowledgeAppliesToMovementContext =
          consideredKnowledge.context.movementType ===
            'reubicacion' &&
          consideredKnowledge.context.deviationReason ===
            'motivo-controlado-comparacion-contextual';

        const firstRepresentsMovementReview =
          first.action === 'review_movements';

        const secondRepresentsSystemMonitoring =
          second.action === 'monitor_system';

        if (
          !knowledgeAppliesToMovementContext ||
          !firstRepresentsMovementReview ||
          !secondRepresentsSystemMonitoring
        ) {
          return {
            decisionIds: [first.id, second.id],
            relation: 'undifferentiated',
            knowledgeId: null,
            context: null,
          };
        }

        return {
          decisionIds: [first.id, second.id],
          relation: 'contextually_distinguished',
          knowledgeId: consideredKnowledge.id,
          context:
            `El conocimiento sobre el motivo recurrente ` +
            `"${consideredKnowledge.context.deviationReason}" ` +
            `en movimientos de tipo ` +
            `"${consideredKnowledge.context.movementType}" ` +
            `permite distinguir contextualmente una alternativa ` +
            `orientada a revisión de movimientos de otra orientada ` +
            `a monitoreo general del sistema, sin establecer ` +
            `precedencia entre ambas.`,
        };
      };

      /*
       * Contrafactual controlado:
       *
       * mismas decisiones;
       * mismo orden;
       * mismo consumidor;
       * única diferencia = presencia del conocimiento.
       */
      const comparisonWithoutKnowledge =
        compareControlledDecisions(
          firstDecision,
          secondDecision,
          null
        );

      const comparisonWithKnowledge =
        compareControlledDecisions(
          firstDecision,
          secondDecision,
          knowledge
        );

      /*
       * Sin conocimiento no debe producirse diferenciación
       * contextual.
       */
      if (
        comparisonWithoutKnowledge.relation !==
        'undifferentiated'
      ) {
        throw new Error(
          'FASE 23.24 produjo diferenciación contextual aun sin conocimiento.'
        );
      }

      if (
        comparisonWithoutKnowledge.knowledgeId !== null ||
        comparisonWithoutKnowledge.context !== null
      ) {
        throw new Error(
          'FASE 23.24 atribuyó conocimiento o contexto a la comparación base.'
        );
      }

      /*
       * Con conocimiento debe cambiar la relación producida.
       */
      if (
        comparisonWithKnowledge.relation !==
        'contextually_distinguished'
      ) {
        throw new Error(
          'FASE 23.24 no logró producir una relación contextualmente distinguida mediante conocimiento.'
        );
      }

      /*
       * Atribución mediante knowledgeId.
       */
      if (
        comparisonWithKnowledge.knowledgeId !==
        knowledge.id
      ) {
        throw new Error(
          'FASE 23.24 perdió la atribución comparativa mediante knowledgeId.'
        );
      }

      if (!comparisonWithKnowledge.context) {
        throw new Error(
          'FASE 23.24 esperaba contexto semántico en la comparación influida.'
        );
      }

      if (
        !comparisonWithKnowledge.context.includes(
          knowledge.context.deviationReason
        )
      ) {
        throw new Error(
          'FASE 23.24 no utilizó deviationReason dentro de la comparación contextual.'
        );
      }

      if (
        !comparisonWithKnowledge.context.includes(
          knowledge.context.movementType
        )
      ) {
        throw new Error(
          'FASE 23.24 no utilizó movementType dentro de la comparación contextual.'
        );
      }

      /*
       * Las alternativas deben conservar exactamente su identidad
       * y orden lógico A/B.
       */
      const expectedDecisionIds: [string, string] = [
        firstDecision.id,
        secondDecision.id,
      ];

      if (
        JSON.stringify(
          comparisonWithoutKnowledge.decisionIds
        ) !== JSON.stringify(expectedDecisionIds) ||
        JSON.stringify(
          comparisonWithKnowledge.decisionIds
        ) !== JSON.stringify(expectedDecisionIds)
      ) {
        throw new Error(
          'FASE 23.24 alteró identidad u orden de las alternativas durante la comparación.'
        );
      }

      /*
       * Ninguna decisión productiva puede modificarse.
       */
      if (
        JSON.stringify(firstDecision) !==
        firstDecisionSnapshot
      ) {
        throw new Error(
          'FASE 23.24 modificó la alternativa decisional A.'
        );
      }

      if (
        JSON.stringify(secondDecision) !==
        secondDecisionSnapshot
      ) {
        throw new Error(
          'FASE 23.24 modificó la alternativa decisional B.'
        );
      }

      /*
       * Guardas explícitas:
       *
       * la comparación no puede contener conceptos que impliquen
       * ranking, selección, preferencia o ponderación.
       */
      if (
        'winner' in comparisonWithKnowledge ||
        'loser' in comparisonWithKnowledge ||
        'preferred' in comparisonWithKnowledge ||
        'selected' in comparisonWithKnowledge ||
        'rank' in comparisonWithKnowledge ||
        'position' in comparisonWithKnowledge ||
        'weight' in comparisonWithKnowledge ||
        'score' in comparisonWithKnowledge ||
        'confidence' in comparisonWithKnowledge ||
        'priority' in comparisonWithKnowledge ||
        'sourcePatternId' in comparisonWithKnowledge ||
        'memoryIds' in comparisonWithKnowledge ||
        'occurrences' in comparisonWithKnowledge
      ) {
        throw new Error(
          'FASE 23.24 detectó atributos de ranking, selección, preferencia, ponderación o evidencia duplicada dentro de la comparación.'
        );
      }

      /*
       * Verificación productiva externa.
       *
       * El motor real debe seguir generando exactamente los mismos
       * resultados.
       */
      const recommendationsAfterComparison =
        generateRecommendationsFromPatterns(detectedPatterns);

      const decisionsAfterComparison =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsAfterComparison
        );

      if (
        JSON.stringify(
          recommendationsBeforeComparison
        ) !==
        JSON.stringify(
          recommendationsAfterComparison
        )
      ) {
        throw new Error(
          'FASE 23.24 detectó modificación de recomendaciones productivas.'
        );
      }

      if (
        JSON.stringify(decisionsBeforeComparison) !==
        JSON.stringify(decisionsAfterComparison)
      ) {
        throw new Error(
          'FASE 23.24 detectó modificación u ordenamiento distinto de decisiones productivas.'
        );
      }

      /*
       * Confirmamos que A y B siguen existiendo después del
       * experimento con exactamente el mismo contenido.
       */
      const firstDecisionAfter =
        decisionsAfterComparison.find(
          (decision) =>
            decision.id === firstDecision.id
        );

      const secondDecisionAfter =
        decisionsAfterComparison.find(
          (decision) =>
            decision.id === secondDecision.id
        );

      if (
        !firstDecisionAfter ||
        !secondDecisionAfter
      ) {
        throw new Error(
          'FASE 23.24 perdió alguna de las alternativas productivas utilizadas en la comparación.'
        );
      }

      if (
        JSON.stringify(firstDecisionAfter) !==
          firstDecisionSnapshot ||
        JSON.stringify(secondDecisionAfter) !==
          secondDecisionSnapshot
      ) {
        throw new Error(
          'FASE 23.24 alteró indirectamente alguna alternativa decisional productiva.'
        );
      }

      addLog(
        `FASE 23.24 OK: las mismas alternativas ${firstDecision.id} y ${secondDecision.id}, resueltas explícitamente por id y conservadas en el mismo orden, produjeron relación "${comparisonWithoutKnowledge.relation}" sin conocimiento y "${comparisonWithKnowledge.relation}" con 1 conocimiento considerado; la diferencia contextual quedó atribuida mediante knowledgeId sin modificar confidence, priority, orden, ranking, preferencia, selección ni ejecución, manteniendo intactas ${recommendationsAfterComparison.length} recomendaciones y ${decisionsAfterComparison.length} decisiones productivas.`
      );
    } catch (error) {
      console.error(error);

      addLog(
        error instanceof Error
          ? `Error en comparación contextual controlada 23.24: ${error.message}`
          : 'Error inesperado en comparación contextual controlada 23.24.'
      );
    } finally {
      setLoading(false);
    }
  }

  async function testOperationalKnowledgeControlledDecisionPreference() {
    setLoading(true);

    try {
      const detectedPatterns = await detectMemoryPatterns();

      const recommendationsBeforePreference =
        generateRecommendationsFromPatterns(detectedPatterns);

      const decisionsBeforePreference =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsBeforePreference
        );

      /*
       * FASE 23.25 — Preferencia contextual controlada entre
       * alternativas decisionales por conocimiento operativo
       *
       * FASE 23.24 demostró que el conocimiento puede hacer que
       * dos alternativas dejen de ser contextualmente
       * indiferenciadas.
       *
       * FASE 23.25 introduce por primera vez una relación
       * direccional:
       *
       * A es contextualmente preferible a B.
       *
       * Sin embargo, preferencia NO significa todavía:
       *
       * - precedencia estructural;
       * - reordenamiento;
       * - rank;
       * - score;
       * - confidence;
       * - priority;
       * - selección;
       * - ejecución.
       *
       * Especialmente:
       *
       * preferredDecisionId NO equivale a preferred_*_first.
       */

      const firstDecision =
        decisionsBeforePreference.find(
          (decision) =>
            decision.id === 'decision-review-movements'
        );

      const secondDecision =
        decisionsBeforePreference.find(
          (decision) =>
            decision.id === 'decision-maintain-monitoring'
        );

      if (!firstDecision) {
        throw new Error(
          'FASE 23.25 no encontró decision-review-movements como alternativa A.'
        );
      }

      if (!secondDecision) {
        throw new Error(
          'FASE 23.25 no encontró decision-maintain-monitoring como alternativa B.'
        );
      }

      const firstDecisionSnapshot =
        JSON.stringify(firstDecision);

      const secondDecisionSnapshot =
        JSON.stringify(secondDecision);

      const originalAlternativeOrder: [string, string] = [
        firstDecision.id,
        secondDecision.id,
      ];

      const controlledPatterns = [
        {
          id: 'recommendation-deviation-pattern-reubicacion-controlled-preference',
          title:
            'Patrón controlado de preferencia contextual decisional',
          description:
            'Patrón controlado para demostrar una preferencia contextual atribuible entre alternativas sin convertirla en precedencia, ranking o selección.',
          score: 95,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-preferencia-contextual',
          },
          evidence: {
            memoryIds: [
              'memory-controlled-preference-1',
              'memory-controlled-preference-2',
              'memory-controlled-preference-3',
              'memory-controlled-preference-4',
            ],
          },
        },
      ];

      const controlledKnowledge =
        generateOperationalKnowledge(controlledPatterns);

      if (controlledKnowledge.length !== 1) {
        throw new Error(
          `FASE 23.25 esperaba exactamente 1 conocimiento controlado y generó ${controlledKnowledge.length}.`
        );
      }

      const knowledge = controlledKnowledge[0];

      if (!knowledge) {
        throw new Error(
          'FASE 23.25 no pudo resolver el conocimiento controlado.'
        );
      }

      const eligibility =
        evaluateOperationalKnowledgeEligibility(knowledge, {
          movementType: 'reubicacion',
        });

      const consideration =
        considerOperationalKnowledge(eligibility);

      if (!consideration) {
        throw new Error(
          'FASE 23.25 esperaba que el conocimiento fuera elegible y considerado.'
        );
      }

      if (consideration.knowledgeId !== knowledge.id) {
        throw new Error(
          'FASE 23.25 perdió trazabilidad entre consideración y conocimiento.'
        );
      }

      type ControlledDecisionPreference = {
        decisionIds: [string, string];
        relation:
          | 'no_contextual_preference'
          | 'contextual_preference';
        preferredDecisionId: string | null;
        knowledgeId: string | null;
        rationale: string | null;
      };

      /*
       * Consumidor local de preferencia.
       *
       * Recibe siempre A y B en el mismo orden.
       *
       * No devuelve un array reordenado.
       * No cambia atributos de las decisiones.
       * No produce rank.
       *
       * Sólo expresa si existe o no una preferencia semántica
       * contextual y, cuando existe, hacia cuál identidad lógica.
       */
      const determineControlledPreference = (
        first: OperationalDecision,
        second: OperationalDecision,
        consideredKnowledge:
          | typeof knowledge
          | null
      ): ControlledDecisionPreference => {
        if (!consideredKnowledge) {
          return {
            decisionIds: [first.id, second.id],
            relation: 'no_contextual_preference',
            preferredDecisionId: null,
            knowledgeId: null,
            rationale: null,
          };
        }

        const knowledgeAppliesToMovementContext =
          consideredKnowledge.context.movementType ===
            'reubicacion' &&
          consideredKnowledge.context.deviationReason ===
            'motivo-controlado-preferencia-contextual';

        const firstRepresentsMovementReview =
          first.action === 'review_movements';

        const secondRepresentsSystemMonitoring =
          second.action === 'monitor_system';

        if (
          !knowledgeAppliesToMovementContext ||
          !firstRepresentsMovementReview ||
          !secondRepresentsSystemMonitoring
        ) {
          return {
            decisionIds: [first.id, second.id],
            relation: 'no_contextual_preference',
            preferredDecisionId: null,
            knowledgeId: null,
            rationale: null,
          };
        }

        return {
          decisionIds: [first.id, second.id],
          relation: 'contextual_preference',
          preferredDecisionId: first.id,
          knowledgeId: consideredKnowledge.id,
          rationale:
            `El conocimiento sobre el motivo recurrente ` +
            `"${consideredKnowledge.context.deviationReason}" ` +
            `en movimientos de tipo ` +
            `"${consideredKnowledge.context.movementType}" ` +
            `hace contextualmente preferible revisar movimientos ` +
            `frente a limitarse al monitoreo general, sin alterar ` +
            `orden, prioridad, confianza ni selección.`,
        };
      };

      /*
       * Contrafactual controlado:
       *
       * mismas decisiones;
       * mismo orden;
       * mismo consumidor;
       * única diferencia = conocimiento.
       */
      const preferenceWithoutKnowledge =
        determineControlledPreference(
          firstDecision,
          secondDecision,
          null
        );

      const preferenceWithKnowledge =
        determineControlledPreference(
          firstDecision,
          secondDecision,
          knowledge
        );

      if (
        preferenceWithoutKnowledge.relation !==
        'no_contextual_preference'
      ) {
        throw new Error(
          'FASE 23.25 produjo una preferencia aun sin conocimiento.'
        );
      }

      if (
        preferenceWithoutKnowledge.preferredDecisionId !==
          null ||
        preferenceWithoutKnowledge.knowledgeId !== null ||
        preferenceWithoutKnowledge.rationale !== null
      ) {
        throw new Error(
          'FASE 23.25 atribuyó una preferencia o conocimiento al resultado base.'
        );
      }

      if (
        preferenceWithKnowledge.relation !==
        'contextual_preference'
      ) {
        throw new Error(
          'FASE 23.25 no produjo la preferencia contextual esperada.'
        );
      }

      /*
       * La preferencia debe ser direccional.
       */
      if (
        preferenceWithKnowledge.preferredDecisionId !==
        firstDecision.id
      ) {
        throw new Error(
          'FASE 23.25 no atribuyó la preferencia contextual a la alternativa esperada.'
        );
      }

      if (
        preferenceWithKnowledge.preferredDecisionId ===
        secondDecision.id
      ) {
        throw new Error(
          'FASE 23.25 invirtió la dirección de la preferencia contextual.'
        );
      }

      if (
        preferenceWithKnowledge.knowledgeId !==
        knowledge.id
      ) {
        throw new Error(
          'FASE 23.25 perdió atribución mediante knowledgeId.'
        );
      }

      if (!preferenceWithKnowledge.rationale) {
        throw new Error(
          'FASE 23.25 esperaba una justificación semántica de la preferencia.'
        );
      }

      if (
        !preferenceWithKnowledge.rationale.includes(
          knowledge.context.deviationReason
        )
      ) {
        throw new Error(
          'FASE 23.25 no utilizó deviationReason para justificar la preferencia.'
        );
      }

      if (
        !preferenceWithKnowledge.rationale.includes(
          knowledge.context.movementType
        )
      ) {
        throw new Error(
          'FASE 23.25 no utilizó movementType para justificar la preferencia.'
        );
      }

      /*
       * La pareja A/B debe conservar exactamente su orden.
       *
       * preferredDecisionId NO autoriza ningún reordenamiento.
       */
      if (
        JSON.stringify(
          preferenceWithoutKnowledge.decisionIds
        ) !== JSON.stringify(originalAlternativeOrder) ||
        JSON.stringify(
          preferenceWithKnowledge.decisionIds
        ) !== JSON.stringify(originalAlternativeOrder)
      ) {
        throw new Error(
          'FASE 23.25 convirtió preferencia en precedencia estructural o alteró el orden de alternativas.'
        );
      }

      /*
       * Las decisiones productivas deben permanecer intactas.
       */
      if (
        JSON.stringify(firstDecision) !==
        firstDecisionSnapshot
      ) {
        throw new Error(
          'FASE 23.25 modificó la alternativa decisional preferida.'
        );
      }

      if (
        JSON.stringify(secondDecision) !==
        secondDecisionSnapshot
      ) {
        throw new Error(
          'FASE 23.25 modificó la alternativa decisional no preferida.'
        );
      }

      /*
       * Guardas contra precedencia, ranking y selección.
       *
       * preferredDecisionId está permitido porque ES exactamente
       * la relación estudiada en esta fase.
       *
       * Lo que no puede existir es una consecuencia estructural
       * de esa preferencia.
       */
      if (
        'winner' in preferenceWithKnowledge ||
        'loser' in preferenceWithKnowledge ||
        'selected' in preferenceWithKnowledge ||
        'rank' in preferenceWithKnowledge ||
        'position' in preferenceWithKnowledge ||
        'first' in preferenceWithKnowledge ||
        'second' in preferenceWithKnowledge ||
        'weight' in preferenceWithKnowledge ||
        'score' in preferenceWithKnowledge ||
        'confidence' in preferenceWithKnowledge ||
        'priority' in preferenceWithKnowledge ||
        'strategy' in preferenceWithKnowledge ||
        'sourcePatternId' in preferenceWithKnowledge ||
        'memoryIds' in preferenceWithKnowledge ||
        'occurrences' in preferenceWithKnowledge
      ) {
        throw new Error(
          'FASE 23.25 detectó atributos de precedencia, ranking, selección, ponderación o evidencia duplicada dentro de la preferencia contextual.'
        );
      }

      /*
       * Verificación productiva externa.
       *
       * Ningún motor real debe cambiar.
       */
      const recommendationsAfterPreference =
        generateRecommendationsFromPatterns(detectedPatterns);

      const decisionsAfterPreference =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsAfterPreference
        );

      if (
        JSON.stringify(
          recommendationsBeforePreference
        ) !==
        JSON.stringify(
          recommendationsAfterPreference
        )
      ) {
        throw new Error(
          'FASE 23.25 detectó modificación de recomendaciones productivas.'
        );
      }

      if (
        JSON.stringify(decisionsBeforePreference) !==
        JSON.stringify(decisionsAfterPreference)
      ) {
        throw new Error(
          'FASE 23.25 detectó modificación o reordenamiento de decisiones productivas.'
        );
      }

      const firstDecisionAfter =
        decisionsAfterPreference.find(
          (decision) =>
            decision.id === firstDecision.id
        );

      const secondDecisionAfter =
        decisionsAfterPreference.find(
          (decision) =>
            decision.id === secondDecision.id
        );

      if (
        !firstDecisionAfter ||
        !secondDecisionAfter
      ) {
        throw new Error(
          'FASE 23.25 perdió alguna alternativa productiva después del experimento.'
        );
      }

      if (
        JSON.stringify(firstDecisionAfter) !==
          firstDecisionSnapshot ||
        JSON.stringify(secondDecisionAfter) !==
          secondDecisionSnapshot
      ) {
        throw new Error(
          'FASE 23.25 alteró indirectamente alguna alternativa productiva.'
        );
      }

      addLog(
        `FASE 23.25 OK: las mismas alternativas ${firstDecision.id} y ${secondDecision.id}, conservadas en el mismo orden, pasaron de relación "${preferenceWithoutKnowledge.relation}" sin conocimiento a "${preferenceWithKnowledge.relation}" con preferencia contextual atribuible hacia ${preferenceWithKnowledge.preferredDecisionId} mediante knowledgeId; la preferencia no produjo precedencia, ranking, modificación de confidence o priority, selección ni ejecución, y permanecieron intactas ${recommendationsAfterPreference.length} recomendaciones y ${decisionsAfterPreference.length} decisiones productivas.`
      );
    } catch (error) {
      console.error(error);

      addLog(
        error instanceof Error
          ? `Error en preferencia contextual controlada 23.25: ${error.message}`
          : 'Error inesperado en preferencia contextual controlada 23.25.'
      );
    } finally {
      setLoading(false);
    }
  }

  async function testOperationalKnowledgeControlledDecisionPrecedence() {
    setLoading(true);

    try {
      const detectedPatterns = await detectMemoryPatterns();

      const recommendationsBeforePrecedence =
        generateRecommendationsFromPatterns(detectedPatterns);

      const decisionsBeforePrecedence =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsBeforePrecedence
        );

      /*
       * FASE 23.26 — Precedencia contextual controlada entre
       * alternativas decisionales por conocimiento operativo
       *
       * FASE 23.25 demostró que una relación inicialmente
       * no preferencial puede convertirse en una preferencia
       * contextual atribuible mediante conocimiento operativo.
       *
       * FASE 23.26 estudia la consecuencia inmediata de esa
       * preferencia:
       *
       * A es contextualmente preferible a B
       *                  ↓
       * A precede contextualmente a B.
       *
       * La precedencia estudiada aquí es RELACIONAL.
       *
       * NO significa:
       *
       * - reordenar el array de alternativas;
       * - producir rank;
       * - producir position;
       * - modificar score;
       * - modificar confidence;
       * - modificar priority;
       * - seleccionar;
       * - ejecutar.
       *
       * Especialmente:
       *
       * precedingDecisionId NO equivale a posición 1.
       * precededDecisionId NO equivale a posición 2.
       */

      const firstDecision =
        decisionsBeforePrecedence.find(
          (decision) =>
            decision.id === 'decision-review-movements'
        );

      const secondDecision =
        decisionsBeforePrecedence.find(
          (decision) =>
            decision.id === 'decision-maintain-monitoring'
        );

      if (!firstDecision) {
        throw new Error(
          'FASE 23.26 no encontró decision-review-movements como alternativa A.'
        );
      }

      if (!secondDecision) {
        throw new Error(
          'FASE 23.26 no encontró decision-maintain-monitoring como alternativa B.'
        );
      }

      const firstDecisionSnapshot =
        JSON.stringify(firstDecision);

      const secondDecisionSnapshot =
        JSON.stringify(secondDecision);

      const originalAlternativeOrder: [string, string] = [
        firstDecision.id,
        secondDecision.id,
      ];

      /*
       * Conocimiento controlado independiente del experimento
       * anterior, manteniendo la misma semántica operacional.
       */
      const controlledPatterns = [
        {
          id: 'recommendation-deviation-pattern-reubicacion-controlled-precedence',
          title:
            'Patrón controlado de precedencia contextual decisional',
          description:
            'Patrón controlado para demostrar que una preferencia contextual puede producir precedencia relacional sin convertirse en ranking, selección o ejecución.',
          score: 95,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-precedencia-contextual',
          },
          evidence: {
            memoryIds: [
              'memory-controlled-precedence-1',
              'memory-controlled-precedence-2',
              'memory-controlled-precedence-3',
              'memory-controlled-precedence-4',
            ],
          },
        },
      ];

      const controlledKnowledge =
        generateOperationalKnowledge(controlledPatterns);

      if (controlledKnowledge.length !== 1) {
        throw new Error(
          `FASE 23.26 esperaba exactamente 1 conocimiento controlado y generó ${controlledKnowledge.length}.`
        );
      }

      const knowledge = controlledKnowledge[0];

      if (!knowledge) {
        throw new Error(
          'FASE 23.26 no pudo resolver el conocimiento controlado.'
        );
      }

      const eligibility =
        evaluateOperationalKnowledgeEligibility(knowledge, {
          movementType: 'reubicacion',
        });

      const consideration =
        considerOperationalKnowledge(eligibility);

      if (!consideration) {
        throw new Error(
          'FASE 23.26 esperaba que el conocimiento fuera elegible y considerado.'
        );
      }

      if (consideration.knowledgeId !== knowledge.id) {
        throw new Error(
          'FASE 23.26 perdió trazabilidad entre consideración y conocimiento.'
        );
      }

      type ControlledDecisionPreference = {
        decisionIds: [string, string];
        relation:
          | 'no_contextual_preference'
          | 'contextual_preference';
        preferredDecisionId: string | null;
        knowledgeId: string | null;
        rationale: string | null;
      };

      type ControlledDecisionPrecedence = {
        decisionIds: [string, string];
        relation:
          | 'no_contextual_precedence'
          | 'contextual_precedence';
        precedingDecisionId: string | null;
        precededDecisionId: string | null;
        knowledgeId: string | null;
        rationale: string | null;
      };

      /*
       * Primer consumidor local:
       *
       * reproduce la frontera validada en FASE 23.25.
       *
       * Su única responsabilidad es determinar si existe
       * preferencia contextual.
       */
      const determineControlledPreference = (
        first: OperationalDecision,
        second: OperationalDecision,
        consideredKnowledge:
          | typeof knowledge
          | null
      ): ControlledDecisionPreference => {
        if (!consideredKnowledge) {
          return {
            decisionIds: [first.id, second.id],
            relation: 'no_contextual_preference',
            preferredDecisionId: null,
            knowledgeId: null,
            rationale: null,
          };
        }

        const knowledgeAppliesToMovementContext =
          consideredKnowledge.context.movementType ===
            'reubicacion' &&
          consideredKnowledge.context.deviationReason ===
            'motivo-controlado-precedencia-contextual';

        const firstRepresentsMovementReview =
          first.action === 'review_movements';

        const secondRepresentsSystemMonitoring =
          second.action === 'monitor_system';

        if (
          !knowledgeAppliesToMovementContext ||
          !firstRepresentsMovementReview ||
          !secondRepresentsSystemMonitoring
        ) {
          return {
            decisionIds: [first.id, second.id],
            relation: 'no_contextual_preference',
            preferredDecisionId: null,
            knowledgeId: null,
            rationale: null,
          };
        }

        return {
          decisionIds: [first.id, second.id],
          relation: 'contextual_preference',
          preferredDecisionId: first.id,
          knowledgeId: consideredKnowledge.id,
          rationale:
            `El conocimiento sobre el motivo recurrente ` +
            `"${consideredKnowledge.context.deviationReason}" ` +
            `en movimientos de tipo ` +
            `"${consideredKnowledge.context.movementType}" ` +
            `hace contextualmente preferible revisar movimientos ` +
            `frente a limitarse al monitoreo general.`,
        };
      };

      /*
       * Segundo consumidor local:
       *
       * IMPORTANTE:
       *
       * No recibe conocimiento directamente.
       *
       * Recibe exclusivamente el resultado de preferencia.
       *
       * Esto demuestra la cadena conceptual:
       *
       * conocimiento
       *   -> preferencia contextual
       *   -> precedencia contextual.
       *
       * Tampoco reordena alternativas.
       */
      const determineControlledPrecedence = (
        preference: ControlledDecisionPreference
      ): ControlledDecisionPrecedence => {
        if (
          preference.relation !== 'contextual_preference' ||
          !preference.preferredDecisionId ||
          !preference.knowledgeId ||
          !preference.rationale
        ) {
          return {
            decisionIds: [...preference.decisionIds],
            relation: 'no_contextual_precedence',
            precedingDecisionId: null,
            precededDecisionId: null,
            knowledgeId: null,
            rationale: null,
          };
        }

        const [
          firstDecisionId,
          secondDecisionId,
        ] = preference.decisionIds;

        /*
         * Sólo una preferencia sobre una de las identidades
         * conocidas puede convertirse en precedencia.
         */
        if (
          preference.preferredDecisionId !==
            firstDecisionId &&
          preference.preferredDecisionId !==
            secondDecisionId
        ) {
          return {
            decisionIds: [...preference.decisionIds],
            relation: 'no_contextual_precedence',
            precedingDecisionId: null,
            precededDecisionId: null,
            knowledgeId: null,
            rationale: null,
          };
        }

        const precededDecisionId =
          preference.preferredDecisionId ===
          firstDecisionId
            ? secondDecisionId
            : firstDecisionId;

        return {
          decisionIds: [...preference.decisionIds],
          relation: 'contextual_precedence',
          precedingDecisionId:
            preference.preferredDecisionId,
          precededDecisionId,
          knowledgeId: preference.knowledgeId,
          rationale:
            `${preference.rationale} ` +
            `Esa preferencia establece una precedencia contextual ` +
            `entre las mismas alternativas, sin modificar su orden ` +
            `estructural ni producir ranking, selección o ejecución.`,
        };
      };

      /*
       * Contrafactual controlado.
       *
       * Mismas decisiones.
       * Mismo orden.
       * Mismos consumidores.
       *
       * Única diferencia inicial:
       * presencia o ausencia de conocimiento considerado.
       */
      const preferenceWithoutKnowledge =
        determineControlledPreference(
          firstDecision,
          secondDecision,
          null
        );

      const preferenceWithKnowledge =
        determineControlledPreference(
          firstDecision,
          secondDecision,
          knowledge
        );

      const precedenceWithoutKnowledge =
        determineControlledPrecedence(
          preferenceWithoutKnowledge
        );

      const precedenceWithKnowledge =
        determineControlledPrecedence(
          preferenceWithKnowledge
        );

      /*
       * Verificación de la etapa intermedia:
       * sin conocimiento no existe preferencia.
       */
      if (
        preferenceWithoutKnowledge.relation !==
        'no_contextual_preference'
      ) {
        throw new Error(
          'FASE 23.26 produjo preferencia contextual aun sin conocimiento.'
        );
      }

      /*
       * Con conocimiento debe existir primero la preferencia.
       */
      if (
        preferenceWithKnowledge.relation !==
        'contextual_preference'
      ) {
        throw new Error(
          'FASE 23.26 no produjo la preferencia contextual necesaria antes de evaluar precedencia.'
        );
      }

      if (
        preferenceWithKnowledge.preferredDecisionId !==
        firstDecision.id
      ) {
        throw new Error(
          'FASE 23.26 no produjo la dirección de preferencia esperada antes de la precedencia.'
        );
      }

      if (
        preferenceWithKnowledge.knowledgeId !==
        knowledge.id
      ) {
        throw new Error(
          'FASE 23.26 perdió atribución mediante knowledgeId durante la preferencia intermedia.'
        );
      }

      /*
       * Sin preferencia contextual no puede aparecer precedencia.
       */
      if (
        precedenceWithoutKnowledge.relation !==
        'no_contextual_precedence'
      ) {
        throw new Error(
          'FASE 23.26 produjo precedencia aun sin preferencia contextual.'
        );
      }

      if (
        precedenceWithoutKnowledge.precedingDecisionId !==
          null ||
        precedenceWithoutKnowledge.precededDecisionId !==
          null ||
        precedenceWithoutKnowledge.knowledgeId !== null ||
        precedenceWithoutKnowledge.rationale !== null
      ) {
        throw new Error(
          'FASE 23.26 atribuyó precedencia o conocimiento al resultado base.'
        );
      }

      /*
       * La preferencia contextual válida debe producir ahora
       * una relación explícita de precedencia.
       */
      if (
        precedenceWithKnowledge.relation !==
        'contextual_precedence'
      ) {
        throw new Error(
          'FASE 23.26 no produjo la precedencia contextual esperada.'
        );
      }

      if (
        precedenceWithKnowledge.precedingDecisionId !==
        firstDecision.id
      ) {
        throw new Error(
          'FASE 23.26 no asignó como precedente la alternativa contextualmente preferida.'
        );
      }

      if (
        precedenceWithKnowledge.precededDecisionId !==
        secondDecision.id
      ) {
        throw new Error(
          'FASE 23.26 no asignó correctamente la alternativa contextualmente precedida.'
        );
      }

      if (
        precedenceWithKnowledge.precedingDecisionId ===
        precedenceWithKnowledge.precededDecisionId
      ) {
        throw new Error(
          'FASE 23.26 produjo una precedencia autorreferencial inválida.'
        );
      }

      /*
       * La dirección debe provenir exactamente de la preferencia.
       */
      if (
        precedenceWithKnowledge.precedingDecisionId !==
        preferenceWithKnowledge.preferredDecisionId
      ) {
        throw new Error(
          'FASE 23.26 perdió continuidad causal entre preferencia y precedencia.'
        );
      }

      if (
        precedenceWithKnowledge.knowledgeId !==
        preferenceWithKnowledge.knowledgeId ||
        precedenceWithKnowledge.knowledgeId !==
        knowledge.id
      ) {
        throw new Error(
          'FASE 23.26 perdió trazabilidad mediante knowledgeId al transformar preferencia en precedencia.'
        );
      }

      if (!precedenceWithKnowledge.rationale) {
        throw new Error(
          'FASE 23.26 esperaba una justificación semántica de la precedencia.'
        );
      }

      if (
        !precedenceWithKnowledge.rationale.includes(
          knowledge.context.deviationReason
        )
      ) {
        throw new Error(
          'FASE 23.26 no conservó deviationReason dentro de la justificación de precedencia.'
        );
      }

      if (
        !precedenceWithKnowledge.rationale.includes(
          knowledge.context.movementType
        )
      ) {
        throw new Error(
          'FASE 23.26 no conservó movementType dentro de la justificación de precedencia.'
        );
      }

      /*
       * PRECEDENCIA RELACIONAL ≠ REORDENAMIENTO.
       *
       * El array debe continuar exactamente como [A, B]
       * tanto antes como después de producir la precedencia.
       */
      if (
        JSON.stringify(
          precedenceWithoutKnowledge.decisionIds
        ) !== JSON.stringify(originalAlternativeOrder) ||
        JSON.stringify(
          precedenceWithKnowledge.decisionIds
        ) !== JSON.stringify(originalAlternativeOrder)
      ) {
        throw new Error(
          'FASE 23.26 convirtió precedencia relacional en reordenamiento estructural de alternativas.'
        );
      }

      /*
       * También la etapa intermedia debe haber conservado
       * exactamente el mismo orden.
       */
      if (
        JSON.stringify(
          preferenceWithoutKnowledge.decisionIds
        ) !== JSON.stringify(originalAlternativeOrder) ||
        JSON.stringify(
          preferenceWithKnowledge.decisionIds
        ) !== JSON.stringify(originalAlternativeOrder)
      ) {
        throw new Error(
          'FASE 23.26 alteró el orden de alternativas durante la preferencia intermedia.'
        );
      }

      /*
       * Las decisiones reales utilizadas como alternativas
       * deben continuar completamente intactas.
       */
      if (
        JSON.stringify(firstDecision) !==
        firstDecisionSnapshot
      ) {
        throw new Error(
          'FASE 23.26 modificó la alternativa decisional precedente.'
        );
      }

      if (
        JSON.stringify(secondDecision) !==
        secondDecisionSnapshot
      ) {
        throw new Error(
          'FASE 23.26 modificó la alternativa decisional precedida.'
        );
      }

      /*
       * Guardas explícitas de frontera.
       *
       * precedingDecisionId y precededDecisionId son las únicas
       * propiedades direccionales nuevas permitidas.
       *
       * No deben aparecer atributos propios de ranking,
       * ordenamiento, ponderación, selección o ejecución.
       */
      if (
        'preferredDecisionId' in precedenceWithKnowledge ||
        'winner' in precedenceWithKnowledge ||
        'loser' in precedenceWithKnowledge ||
        'selected' in precedenceWithKnowledge ||
        'selection' in precedenceWithKnowledge ||
        'rank' in precedenceWithKnowledge ||
        'ranking' in precedenceWithKnowledge ||
        'position' in precedenceWithKnowledge ||
        'first' in precedenceWithKnowledge ||
        'second' in precedenceWithKnowledge ||
        'order' in precedenceWithKnowledge ||
        'weight' in precedenceWithKnowledge ||
        'score' in precedenceWithKnowledge ||
        'confidence' in precedenceWithKnowledge ||
        'priority' in precedenceWithKnowledge ||
        'strategy' in precedenceWithKnowledge ||
        'executed' in precedenceWithKnowledge ||
        'execution' in precedenceWithKnowledge ||
        'sourcePatternId' in precedenceWithKnowledge ||
        'memoryIds' in precedenceWithKnowledge ||
        'occurrences' in precedenceWithKnowledge
      ) {
        throw new Error(
          'FASE 23.26 detectó atributos de preferencia duplicada, ranking, ordenamiento, ponderación, selección, ejecución o evidencia duplicada dentro de la precedencia contextual.'
        );
      }

      /*
       * Verificación productiva externa.
       *
       * El experimento no debe modificar ningún motor real.
       */
      const recommendationsAfterPrecedence =
        generateRecommendationsFromPatterns(detectedPatterns);

      const decisionsAfterPrecedence =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsAfterPrecedence
        );

      if (
        JSON.stringify(
          recommendationsBeforePrecedence
        ) !==
        JSON.stringify(
          recommendationsAfterPrecedence
        )
      ) {
        throw new Error(
          'FASE 23.26 detectó modificación de recomendaciones productivas.'
        );
      }

      if (
        JSON.stringify(decisionsBeforePrecedence) !==
        JSON.stringify(decisionsAfterPrecedence)
      ) {
        throw new Error(
          'FASE 23.26 detectó modificación, ranking o reordenamiento de decisiones productivas.'
        );
      }

      const firstDecisionAfter =
        decisionsAfterPrecedence.find(
          (decision) =>
            decision.id === firstDecision.id
        );

      const secondDecisionAfter =
        decisionsAfterPrecedence.find(
          (decision) =>
            decision.id === secondDecision.id
        );

      if (
        !firstDecisionAfter ||
        !secondDecisionAfter
      ) {
        throw new Error(
          'FASE 23.26 perdió alguna alternativa productiva después del experimento.'
        );
      }

      if (
        JSON.stringify(firstDecisionAfter) !==
          firstDecisionSnapshot ||
        JSON.stringify(secondDecisionAfter) !==
          secondDecisionSnapshot
      ) {
        throw new Error(
          'FASE 23.26 alteró indirectamente alguna alternativa decisional productiva.'
        );
      }

      addLog(
        `FASE 23.26 OK: las mismas alternativas ${firstDecision.id} y ${secondDecision.id}, conservadas en el mismo orden, produjeron primero la relación "${preferenceWithKnowledge.relation}" atribuible mediante knowledgeId y posteriormente la relación "${precedenceWithKnowledge.relation}", donde ${precedenceWithKnowledge.precedingDecisionId} precede contextualmente a ${precedenceWithKnowledge.precededDecisionId}; la precedencia fue relacional y no produjo reordenamiento, rank, score, modificación de confidence o priority, selección ni ejecución, permaneciendo intactas ${recommendationsAfterPrecedence.length} recomendaciones y ${decisionsAfterPrecedence.length} decisiones productivas.`
      );
    } catch (error) {
      console.error(error);

      addLog(
        error instanceof Error
          ? `Error en precedencia contextual controlada 23.26: ${error.message}`
          : 'Error inesperado en precedencia contextual controlada 23.26.'
      );
    } finally {
      setLoading(false);
    }
  }

  async function testOperationalKnowledgePluralDecisionPrecedenceCoexistence() {
    setLoading(true);

    try {
      const detectedPatterns = await detectMemoryPatterns();

      const recommendationsBeforePrecedenceCoexistence =
        generateRecommendationsFromPatterns(detectedPatterns);

      const decisionsBeforePrecedenceCoexistence =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsBeforePrecedenceCoexistence
        );

      /*
       * FASE 23.27 — Coexistencia contextual plural de
       * precedencias entre alternativas decisionales por
       * conocimiento operativo
       *
       * FASE 23.26 demostró una precedencia contextual binaria:
       *
       * A -> B
       *
       * FASE 23.27 introduce pluralidad relacional controlada:
       *
       * K1 -> A -> B
       * K2 -> B -> C
       *
       * Las dos precedencias deben coexistir simultáneamente
       * conservando identidad y atribución independientes.
       *
       * Esta fase NO introduce:
       *
       * - inferencia transitiva A -> C;
       * - cierre transitivo;
       * - orden parcial formal;
       * - reordenamiento de alternativas;
       * - rank;
       * - ranking;
       * - position;
       * - score derivado;
       * - modificación de confidence;
       * - modificación de priority;
       * - selección;
       * - ejecución.
       *
       * Especialmente:
       *
       * coexistencia de A -> B y B -> C
       * NO autoriza todavía inferir A -> C.
       */

      /*
       * Las tres alternativas se resuelven exclusivamente
       * por identidad.
       *
       * No utilizamos posiciones del array productivo porque
       * generateOperationalDecisions() ya ordena por confidence.
       */
      const firstDecision =
        decisionsBeforePrecedenceCoexistence.find(
          (decision) =>
            decision.id === 'decision-review-movements'
        );

      const secondDecision =
        decisionsBeforePrecedenceCoexistence.find(
          (decision) =>
            decision.id === 'decision-maintain-monitoring'
        );

      const thirdDecision =
        decisionsBeforePrecedenceCoexistence.find(
          (decision) =>
            decision.id === 'decision-prioritize-high-value'
        );

      if (!firstDecision) {
        throw new Error(
          'FASE 23.27 no encontró decision-review-movements como alternativa A.'
        );
      }

      if (!secondDecision) {
        throw new Error(
          'FASE 23.27 no encontró decision-maintain-monitoring como alternativa B.'
        );
      }

      if (!thirdDecision) {
        throw new Error(
          'FASE 23.27 no encontró decision-prioritize-high-value como alternativa C.'
        );
      }

      if (
        firstDecision.id === secondDecision.id ||
        firstDecision.id === thirdDecision.id ||
        secondDecision.id === thirdDecision.id
      ) {
        throw new Error(
          'FASE 23.27 esperaba tres alternativas decisionales distintas.'
        );
      }

      const firstDecisionSnapshot =
        JSON.stringify(firstDecision);

      const secondDecisionSnapshot =
        JSON.stringify(secondDecision);

      const thirdDecisionSnapshot =
        JSON.stringify(thirdDecision);

      /*
       * Esta tupla representa exclusivamente las identidades
       * controladas del experimento.
       *
       * No expresa ranking, posición ni prioridad.
       */
      const controlledAlternativeIds: [
        string,
        string,
        string,
      ] = [
        firstDecision.id,
        secondDecision.id,
        thirdDecision.id,
      ];

      /*
       * Dos patrones independientes producirán dos conocimientos
       * independientes:
       *
       * K1 para A -> B
       * K2 para B -> C
       */
      const controlledPatterns = [
        {
          id: 'recommendation-deviation-pattern-reubicacion-controlled-precedence-plural-ab',
          title:
            'Patrón controlado de precedencia plural A-B',
          description:
            'Patrón controlado para producir una precedencia contextual A-B conservando atribución independiente.',
          score: 95,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-precedencia-plural-ab',
          },
          evidence: {
            memoryIds: [
              'memory-controlled-precedence-plural-ab-1',
              'memory-controlled-precedence-plural-ab-2',
              'memory-controlled-precedence-plural-ab-3',
              'memory-controlled-precedence-plural-ab-4',
            ],
          },
        },
        {
          id: 'recommendation-deviation-pattern-reubicacion-controlled-precedence-plural-bc',
          title:
            'Patrón controlado de precedencia plural B-C',
          description:
            'Patrón controlado para producir una precedencia contextual B-C conservando atribución independiente.',
          score: 94,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-precedencia-plural-bc',
          },
          evidence: {
            memoryIds: [
              'memory-controlled-precedence-plural-bc-1',
              'memory-controlled-precedence-plural-bc-2',
              'memory-controlled-precedence-plural-bc-3',
              'memory-controlled-precedence-plural-bc-4',
            ],
          },
        },
      ];

      const controlledKnowledge =
        generateOperationalKnowledge(controlledPatterns);

      if (controlledKnowledge.length !== 2) {
        throw new Error(
          `FASE 23.27 esperaba exactamente 2 conocimientos controlados y generó ${controlledKnowledge.length}.`
        );
      }

      const knowledgeAB =
        controlledKnowledge.find(
          (knowledge) =>
            knowledge.sourcePatternId ===
            controlledPatterns[0].id
        );

      const knowledgeBC =
        controlledKnowledge.find(
          (knowledge) =>
            knowledge.sourcePatternId ===
            controlledPatterns[1].id
        );

      if (!knowledgeAB) {
        throw new Error(
          'FASE 23.27 no pudo resolver el conocimiento controlado K1 para A-B.'
        );
      }

      if (!knowledgeBC) {
        throw new Error(
          'FASE 23.27 no pudo resolver el conocimiento controlado K2 para B-C.'
        );
      }

      if (knowledgeAB.id === knowledgeBC.id) {
        throw new Error(
          'FASE 23.27 colapsó dos conocimientos independientes en el mismo knowledgeId.'
        );
      }

      if (
        knowledgeAB.sourcePatternId ===
        knowledgeBC.sourcePatternId
      ) {
        throw new Error(
          'FASE 23.27 perdió independencia entre los patrones fuente de K1 y K2.'
        );
      }

      /*
       * Ambos conocimientos comparten contexto de movimiento
       * "reubicacion", pero conservan deviationReason diferente.
       */
      const eligibilityAB =
        evaluateOperationalKnowledgeEligibility(
          knowledgeAB,
          {
            movementType: 'reubicacion',
          }
        );

      const eligibilityBC =
        evaluateOperationalKnowledgeEligibility(
          knowledgeBC,
          {
            movementType: 'reubicacion',
          }
        );

      const considerationAB =
        considerOperationalKnowledge(eligibilityAB);

      const considerationBC =
        considerOperationalKnowledge(eligibilityBC);

      if (!considerationAB) {
        throw new Error(
          'FASE 23.27 esperaba que K1 fuera elegible y considerado.'
        );
      }

      if (!considerationBC) {
        throw new Error(
          'FASE 23.27 esperaba que K2 fuera elegible y considerado.'
        );
      }

      if (
        considerationAB.knowledgeId !== knowledgeAB.id
      ) {
        throw new Error(
          'FASE 23.27 perdió trazabilidad entre consideración K1 y conocimiento A-B.'
        );
      }

      if (
        considerationBC.knowledgeId !== knowledgeBC.id
      ) {
        throw new Error(
          'FASE 23.27 perdió trazabilidad entre consideración K2 y conocimiento B-C.'
        );
      }

      if (
        considerationAB.knowledgeId ===
        considerationBC.knowledgeId
      ) {
        throw new Error(
          'FASE 23.27 perdió pluralidad de knowledgeId durante la consideración.'
        );
      }

      type ControlledKnowledge =
        (typeof controlledKnowledge)[number];

      type ControlledDecisionPreference = {
        decisionIds: [string, string];
        relation:
          | 'no_contextual_preference'
          | 'contextual_preference';
        preferredDecisionId: string | null;
        knowledgeId: string | null;
        rationale: string | null;
      };

      type ControlledDecisionPrecedence = {
        decisionIds: [string, string];
        relation:
          | 'no_contextual_precedence'
          | 'contextual_precedence';
        precedingDecisionId: string | null;
        precededDecisionId: string | null;
        knowledgeId: string | null;
        rationale: string | null;
      };

      type ControlledDecisionPrecedenceCoexistence = {
        decisionIds: [string, string, string];
        relation:
          | 'no_contextual_precedence_coexistence'
          | 'contextual_precedence_coexistence';
        precedences: ControlledDecisionPrecedence[];
        rationale: string | null;
      };

      /*
       * Consumidor local de preferencia.
       *
       * La semántica esperada de cada pareja se entrega
       * explícitamente y nunca se deriva de confidence,
       * priority ni posición dentro del array.
       */
      const determineControlledPreference = (
        first: OperationalDecision,
        second: OperationalDecision,
        consideredKnowledge: ControlledKnowledge | null,
        expectedDeviationReason: string,
        expectedFirstAction: string,
        expectedSecondAction: string
      ): ControlledDecisionPreference => {
        if (!consideredKnowledge) {
          return {
            decisionIds: [first.id, second.id],
            relation: 'no_contextual_preference',
            preferredDecisionId: null,
            knowledgeId: null,
            rationale: null,
          };
        }

        const knowledgeAppliesToMovementContext =
          consideredKnowledge.context.movementType ===
            'reubicacion' &&
          consideredKnowledge.context.deviationReason ===
            expectedDeviationReason;

        const firstMatchesExpectedSemantics =
          first.action === expectedFirstAction;

        const secondMatchesExpectedSemantics =
          second.action === expectedSecondAction;

        if (
          !knowledgeAppliesToMovementContext ||
          !firstMatchesExpectedSemantics ||
          !secondMatchesExpectedSemantics
        ) {
          return {
            decisionIds: [first.id, second.id],
            relation: 'no_contextual_preference',
            preferredDecisionId: null,
            knowledgeId: null,
            rationale: null,
          };
        }

        return {
          decisionIds: [first.id, second.id],
          relation: 'contextual_preference',
          preferredDecisionId: first.id,
          knowledgeId: consideredKnowledge.id,
          rationale:
            `El conocimiento "${consideredKnowledge.id}" sobre ` +
            `el motivo recurrente ` +
            `"${consideredKnowledge.context.deviationReason}" ` +
            `en movimientos de tipo ` +
            `"${consideredKnowledge.context.movementType}" ` +
            `hace contextualmente preferible ` +
            `"${first.id}" frente a "${second.id}", ` +
            `sin utilizar confidence, priority ni ranking.`,
        };
      };

      /*
       * Consumidor local de precedencia.
       *
       * Igual que en FASE 23.26, no recibe conocimiento
       * directamente.
       *
       * Sólo una preferencia contextual válida puede producir
       * una precedencia contextual.
       */
      const determineControlledPrecedence = (
        preference: ControlledDecisionPreference
      ): ControlledDecisionPrecedence => {
        if (
          preference.relation !==
            'contextual_preference' ||
          !preference.preferredDecisionId ||
          !preference.knowledgeId ||
          !preference.rationale
        ) {
          return {
            decisionIds: [
              preference.decisionIds[0],
              preference.decisionIds[1],
            ],
            relation: 'no_contextual_precedence',
            precedingDecisionId: null,
            precededDecisionId: null,
            knowledgeId: null,
            rationale: null,
          };
        }

        const [
          firstDecisionId,
          secondDecisionId,
        ] = preference.decisionIds;

        if (
          preference.preferredDecisionId !==
            firstDecisionId &&
          preference.preferredDecisionId !==
            secondDecisionId
        ) {
          return {
            decisionIds: [
              firstDecisionId,
              secondDecisionId,
            ],
            relation: 'no_contextual_precedence',
            precedingDecisionId: null,
            precededDecisionId: null,
            knowledgeId: null,
            rationale: null,
          };
        }

        const precededDecisionId =
          preference.preferredDecisionId ===
          firstDecisionId
            ? secondDecisionId
            : firstDecisionId;

        return {
          decisionIds: [
            firstDecisionId,
            secondDecisionId,
          ],
          relation: 'contextual_precedence',
          precedingDecisionId:
            preference.preferredDecisionId,
          precededDecisionId,
          knowledgeId: preference.knowledgeId,
          rationale:
            `${preference.rationale} ` +
            `La preferencia establece una precedencia ` +
            `contextual relacional sin modificar la estructura ` +
            `de las alternativas.`,
        };
      };

      /*
       * Consumidor plural de coexistencia.
       *
       * IMPORTANTE:
       *
       * No compone matemáticamente las relaciones.
       * No infiere transitividad.
       * No genera relaciones nuevas.
       * No ordena las alternativas.
       *
       * Sólo conserva simultáneamente las precedencias
       * explícitas recibidas.
       */
      const determineControlledPrecedenceCoexistence = (
        decisionIds: [string, string, string],
        precedences: ControlledDecisionPrecedence[]
      ): ControlledDecisionPrecedenceCoexistence => {
        const contextualPrecedences =
          precedences.filter(
            (precedence) =>
              precedence.relation ===
                'contextual_precedence' &&
              precedence.precedingDecisionId !== null &&
              precedence.precededDecisionId !== null &&
              precedence.knowledgeId !== null
          );

        if (contextualPrecedences.length !== 2) {
          return {
            decisionIds: [
              decisionIds[0],
              decisionIds[1],
              decisionIds[2],
            ],
            relation:
              'no_contextual_precedence_coexistence',
            precedences: [],
            rationale: null,
          };
        }

        return {
          decisionIds: [
            decisionIds[0],
            decisionIds[1],
            decisionIds[2],
          ],
          relation:
            'contextual_precedence_coexistence',
          precedences: [
            contextualPrecedences[0],
            contextualPrecedences[1],
          ],
          rationale:
            `Dos precedencias contextuales explícitas ` +
            `coexisten simultáneamente sobre tres alternativas ` +
            `sin inferencia transitiva, orden parcial formal, ` +
            `ranking, selección ni ejecución.`,
        };
      };

      /*
       * Contrafactual base:
       *
       * mismas tres decisiones;
       * mismas parejas A-B y B-C;
       * ausencia de conocimiento.
       */
      const preferenceABWithoutKnowledge =
        determineControlledPreference(
          firstDecision,
          secondDecision,
          null,
          'motivo-controlado-precedencia-plural-ab',
          'review_movements',
          'monitor_system'
        );

      const preferenceBCWithoutKnowledge =
        determineControlledPreference(
          secondDecision,
          thirdDecision,
          null,
          'motivo-controlado-precedencia-plural-bc',
          'monitor_system',
          'prioritize_high_value'
        );

      const precedenceABWithoutKnowledge =
        determineControlledPrecedence(
          preferenceABWithoutKnowledge
        );

      const precedenceBCWithoutKnowledge =
        determineControlledPrecedence(
          preferenceBCWithoutKnowledge
        );

      const coexistenceWithoutKnowledge =
        determineControlledPrecedenceCoexistence(
          controlledAlternativeIds,
          [
            precedenceABWithoutKnowledge,
            precedenceBCWithoutKnowledge,
          ]
        );

      /*
       * Escenario contextual plural:
       *
       * K1 -> preferencia A/B -> A -> B
       * K2 -> preferencia B/C -> B -> C
       */
      const preferenceABWithKnowledge =
        determineControlledPreference(
          firstDecision,
          secondDecision,
          knowledgeAB,
          'motivo-controlado-precedencia-plural-ab',
          'review_movements',
          'monitor_system'
        );

      const preferenceBCWithKnowledge =
        determineControlledPreference(
          secondDecision,
          thirdDecision,
          knowledgeBC,
          'motivo-controlado-precedencia-plural-bc',
          'monitor_system',
          'prioritize_high_value'
        );

      const precedenceABWithKnowledge =
        determineControlledPrecedence(
          preferenceABWithKnowledge
        );

      const precedenceBCWithKnowledge =
        determineControlledPrecedence(
          preferenceBCWithKnowledge
        );

      const coexistenceWithKnowledge =
        determineControlledPrecedenceCoexistence(
          controlledAlternativeIds,
          [
            precedenceABWithKnowledge,
            precedenceBCWithKnowledge,
          ]
        );

      /*
       * Sin conocimiento no deben aparecer preferencias.
       */
      if (
        preferenceABWithoutKnowledge.relation !==
          'no_contextual_preference' ||
        preferenceBCWithoutKnowledge.relation !==
          'no_contextual_preference'
      ) {
        throw new Error(
          'FASE 23.27 produjo preferencia contextual en el escenario base sin conocimiento.'
        );
      }

      /*
       * Sin preferencias tampoco pueden aparecer precedencias.
       */
      if (
        precedenceABWithoutKnowledge.relation !==
          'no_contextual_precedence' ||
        precedenceBCWithoutKnowledge.relation !==
          'no_contextual_precedence'
      ) {
        throw new Error(
          'FASE 23.27 produjo precedencias en el escenario base sin conocimiento.'
        );
      }

      if (
        coexistenceWithoutKnowledge.relation !==
        'no_contextual_precedence_coexistence'
      ) {
        throw new Error(
          'FASE 23.27 produjo coexistencia contextual de precedencias sin conocimiento.'
        );
      }

      if (
        coexistenceWithoutKnowledge.precedences.length !== 0
      ) {
        throw new Error(
          'FASE 23.27 conservó precedencias contextuales inexistentes dentro del resultado base.'
        );
      }

      /*
       * Con conocimiento deben aparecer exactamente las dos
       * preferencias contextuales controladas.
       */
      if (
        preferenceABWithKnowledge.relation !==
        'contextual_preference'
      ) {
        throw new Error(
          'FASE 23.27 no produjo la preferencia contextual A-B.'
        );
      }

      if (
        preferenceBCWithKnowledge.relation !==
        'contextual_preference'
      ) {
        throw new Error(
          'FASE 23.27 no produjo la preferencia contextual B-C.'
        );
      }

      if (
        preferenceABWithKnowledge.preferredDecisionId !==
        firstDecision.id
      ) {
        throw new Error(
          'FASE 23.27 produjo una dirección incorrecta para la preferencia A-B.'
        );
      }

      if (
        preferenceBCWithKnowledge.preferredDecisionId !==
        secondDecision.id
      ) {
        throw new Error(
          'FASE 23.27 produjo una dirección incorrecta para la preferencia B-C.'
        );
      }

      if (
        preferenceABWithKnowledge.knowledgeId !==
          knowledgeAB.id ||
        preferenceBCWithKnowledge.knowledgeId !==
          knowledgeBC.id
      ) {
        throw new Error(
          'FASE 23.27 perdió atribución independiente mediante knowledgeId durante las preferencias.'
        );
      }

      /*
       * Verificación de las dos precedencias explícitas.
       */
      if (
        precedenceABWithKnowledge.relation !==
        'contextual_precedence'
      ) {
        throw new Error(
          'FASE 23.27 no produjo la precedencia contextual A-B.'
        );
      }

      if (
        precedenceBCWithKnowledge.relation !==
        'contextual_precedence'
      ) {
        throw new Error(
          'FASE 23.27 no produjo la precedencia contextual B-C.'
        );
      }

      if (
        precedenceABWithKnowledge.precedingDecisionId !==
          firstDecision.id ||
        precedenceABWithKnowledge.precededDecisionId !==
          secondDecision.id
      ) {
        throw new Error(
          'FASE 23.27 produjo una relación de precedencia A-B incorrecta.'
        );
      }

      if (
        precedenceBCWithKnowledge.precedingDecisionId !==
          secondDecision.id ||
        precedenceBCWithKnowledge.precededDecisionId !==
          thirdDecision.id
      ) {
        throw new Error(
          'FASE 23.27 produjo una relación de precedencia B-C incorrecta.'
        );
      }

      if (
        precedenceABWithKnowledge.knowledgeId !==
          knowledgeAB.id ||
        precedenceBCWithKnowledge.knowledgeId !==
          knowledgeBC.id
      ) {
        throw new Error(
          'FASE 23.27 perdió atribución independiente mediante knowledgeId durante las precedencias.'
        );
      }

      if (
        precedenceABWithKnowledge.knowledgeId ===
        precedenceBCWithKnowledge.knowledgeId
      ) {
        throw new Error(
          'FASE 23.27 colapsó dos precedencias independientes bajo el mismo knowledgeId.'
        );
      }

      /*
       * Deben coexistir exactamente dos precedencias.
       */
      if (
        coexistenceWithKnowledge.relation !==
        'contextual_precedence_coexistence'
      ) {
        throw new Error(
          'FASE 23.27 no produjo coexistencia contextual plural de precedencias.'
        );
      }

      if (
        coexistenceWithKnowledge.precedences.length !== 2
      ) {
        throw new Error(
          `FASE 23.27 esperaba exactamente 2 precedencias coexistentes y obtuvo ${coexistenceWithKnowledge.precedences.length}.`
        );
      }

      const coexistenceAB =
        coexistenceWithKnowledge.precedences.find(
          (precedence) =>
            precedence.precedingDecisionId ===
              firstDecision.id &&
            precedence.precededDecisionId ===
              secondDecision.id
        );

      const coexistenceBC =
        coexistenceWithKnowledge.precedences.find(
          (precedence) =>
            precedence.precedingDecisionId ===
              secondDecision.id &&
            precedence.precededDecisionId ===
              thirdDecision.id
        );

      if (!coexistenceAB) {
        throw new Error(
          'FASE 23.27 perdió la precedencia A-B durante la coexistencia plural.'
        );
      }

      if (!coexistenceBC) {
        throw new Error(
          'FASE 23.27 perdió la precedencia B-C durante la coexistencia plural.'
        );
      }

      if (
        coexistenceAB.knowledgeId !== knowledgeAB.id ||
        coexistenceBC.knowledgeId !== knowledgeBC.id
      ) {
        throw new Error(
          'FASE 23.27 perdió la atribución independiente de las precedencias durante la coexistencia.'
        );
      }

      /*
       * Ninguna precedencia puede ser autorreferencial.
       */
      const hasSelfPrecedence =
        coexistenceWithKnowledge.precedences.some(
          (precedence) =>
            precedence.precedingDecisionId ===
            precedence.precededDecisionId
        );

      if (hasSelfPrecedence) {
        throw new Error(
          'FASE 23.27 produjo una precedencia autorreferencial inválida.'
        );
      }

      /*
       * Todas las identidades presentes en las precedencias deben
       * pertenecer exclusivamente a A, B o C.
       */
      const controlledDecisionIdSet =
        new Set(controlledAlternativeIds);

      const hasUnknownDecisionReference =
        coexistenceWithKnowledge.precedences.some(
          (precedence) =>
            !precedence.precedingDecisionId ||
            !precedence.precededDecisionId ||
            !controlledDecisionIdSet.has(
              precedence.precedingDecisionId
            ) ||
            !controlledDecisionIdSet.has(
              precedence.precededDecisionId
            )
        );

      if (hasUnknownDecisionReference) {
        throw new Error(
          'FASE 23.27 introdujo una identidad decisional ajena al conjunto controlado A-B-C.'
        );
      }

      /*
       * FRONTERA CENTRAL DE 23.27:
       *
       * A -> B
       * B -> C
       *
       * NO implica todavía:
       *
       * A -> C
       *
       * No debe existir inferencia transitiva.
       */
      const hasInferredTransitivePrecedence =
        coexistenceWithKnowledge.precedences.some(
          (precedence) =>
            precedence.precedingDecisionId ===
              firstDecision.id &&
            precedence.precededDecisionId ===
              thirdDecision.id
        );

      if (hasInferredTransitivePrecedence) {
        throw new Error(
          'FASE 23.27 infirió transitivamente A-C y cruzó la frontera de coexistencia plural.'
        );
      }

      /*
       * Tampoco debe aparecer una relación inversa C -> A
       * como consecuencia artificial de la pluralidad.
       */
      const hasArtificialReversePrecedence =
        coexistenceWithKnowledge.precedences.some(
          (precedence) =>
            precedence.precedingDecisionId ===
              thirdDecision.id &&
            precedence.precededDecisionId ===
              firstDecision.id
        );

      if (hasArtificialReversePrecedence) {
        throw new Error(
          'FASE 23.27 produjo una precedencia inversa C-A no sustentada.'
        );
      }

      /*
       * Las identidades A-B-C deben conservarse exactamente.
       *
       * Esta lista NO representa ranking ni orden calculado.
       */
      if (
        JSON.stringify(
          coexistenceWithoutKnowledge.decisionIds
        ) !== JSON.stringify(controlledAlternativeIds) ||
        JSON.stringify(
          coexistenceWithKnowledge.decisionIds
        ) !== JSON.stringify(controlledAlternativeIds)
      ) {
        throw new Error(
          'FASE 23.27 alteró las identidades controladas de las alternativas durante la coexistencia plural.'
        );
      }

      /*
       * Las parejas originales también deben permanecer intactas.
       */
      if (
        JSON.stringify(
          precedenceABWithKnowledge.decisionIds
        ) !==
          JSON.stringify([
            firstDecision.id,
            secondDecision.id,
          ]) ||
        JSON.stringify(
          precedenceBCWithKnowledge.decisionIds
        ) !==
          JSON.stringify([
            secondDecision.id,
            thirdDecision.id,
          ])
      ) {
        throw new Error(
          'FASE 23.27 alteró alguna pareja decisional al producir precedencias plurales.'
        );
      }

      /*
       * Las tres decisiones productivas deben permanecer
       * completamente intactas.
       */
      if (
        JSON.stringify(firstDecision) !==
        firstDecisionSnapshot
      ) {
        throw new Error(
          'FASE 23.27 modificó la alternativa decisional A.'
        );
      }

      if (
        JSON.stringify(secondDecision) !==
        secondDecisionSnapshot
      ) {
        throw new Error(
          'FASE 23.27 modificó la alternativa decisional B.'
        );
      }

      if (
        JSON.stringify(thirdDecision) !==
        thirdDecisionSnapshot
      ) {
        throw new Error(
          'FASE 23.27 modificó la alternativa decisional C.'
        );
      }

      /*
       * Guardas contra conceptos todavía no autorizados.
       *
       * La coexistencia puede contener únicamente:
       *
       * - decisionIds;
       * - relation;
       * - precedences explícitas;
       * - rationale.
       *
       * No debe expresar transitividad, orden parcial,
       * ranking, selección ni ejecución.
       */
      if (
        'transitive' in coexistenceWithKnowledge ||
        'transitivity' in coexistenceWithKnowledge ||
        'closure' in coexistenceWithKnowledge ||
        'partialOrder' in coexistenceWithKnowledge ||
        'orderedDecisionIds' in coexistenceWithKnowledge ||
        'sortedDecisionIds' in coexistenceWithKnowledge ||
        'order' in coexistenceWithKnowledge ||
        'position' in coexistenceWithKnowledge ||
        'rank' in coexistenceWithKnowledge ||
        'ranking' in coexistenceWithKnowledge ||
        'winner' in coexistenceWithKnowledge ||
        'loser' in coexistenceWithKnowledge ||
        'selected' in coexistenceWithKnowledge ||
        'selection' in coexistenceWithKnowledge ||
        'score' in coexistenceWithKnowledge ||
        'weight' in coexistenceWithKnowledge ||
        'confidence' in coexistenceWithKnowledge ||
        'priority' in coexistenceWithKnowledge ||
        'strategy' in coexistenceWithKnowledge ||
        'executed' in coexistenceWithKnowledge ||
        'execution' in coexistenceWithKnowledge ||
        'knowledgeId' in coexistenceWithKnowledge ||
        'sourcePatternId' in coexistenceWithKnowledge ||
        'memoryIds' in coexistenceWithKnowledge ||
        'occurrences' in coexistenceWithKnowledge
      ) {
        throw new Error(
          'FASE 23.27 detectó atributos de transitividad, orden parcial, ordenamiento, ranking, ponderación, selección, ejecución o atribución global indebida dentro de la coexistencia plural.'
        );
      }

      /*
       * Tampoco las precedencias individuales pueden adquirir
       * propiedades de ranking o selección.
       */
      const hasForbiddenPrecedenceAttributes =
        coexistenceWithKnowledge.precedences.some(
          (precedence) =>
            'rank' in precedence ||
            'ranking' in precedence ||
            'position' in precedence ||
            'order' in precedence ||
            'selected' in precedence ||
            'selection' in precedence ||
            'winner' in precedence ||
            'loser' in precedence ||
            'score' in precedence ||
            'weight' in precedence ||
            'confidence' in precedence ||
            'priority' in precedence ||
            'executed' in precedence ||
            'execution' in precedence
        );

      if (hasForbiddenPrecedenceAttributes) {
        throw new Error(
          'FASE 23.27 detectó atributos de ranking, ponderación, selección o ejecución dentro de una precedencia individual.'
        );
      }

      /*
       * Verificación productiva externa.
       *
       * Ningún motor real debe modificarse como consecuencia
       * del experimento plural.
       */
      const recommendationsAfterPrecedenceCoexistence =
        generateRecommendationsFromPatterns(detectedPatterns);

      const decisionsAfterPrecedenceCoexistence =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsAfterPrecedenceCoexistence
        );

      if (
        JSON.stringify(
          recommendationsBeforePrecedenceCoexistence
        ) !==
        JSON.stringify(
          recommendationsAfterPrecedenceCoexistence
        )
      ) {
        throw new Error(
          'FASE 23.27 detectó modificación de recomendaciones productivas.'
        );
      }

      if (
        JSON.stringify(
          decisionsBeforePrecedenceCoexistence
        ) !==
        JSON.stringify(
          decisionsAfterPrecedenceCoexistence
        )
      ) {
        throw new Error(
          'FASE 23.27 detectó modificación, reordenamiento o ranking distinto de decisiones productivas.'
        );
      }

      const firstDecisionAfter =
        decisionsAfterPrecedenceCoexistence.find(
          (decision) =>
            decision.id === firstDecision.id
        );

      const secondDecisionAfter =
        decisionsAfterPrecedenceCoexistence.find(
          (decision) =>
            decision.id === secondDecision.id
        );

      const thirdDecisionAfter =
        decisionsAfterPrecedenceCoexistence.find(
          (decision) =>
            decision.id === thirdDecision.id
        );

      if (
        !firstDecisionAfter ||
        !secondDecisionAfter ||
        !thirdDecisionAfter
      ) {
        throw new Error(
          'FASE 23.27 perdió alguna de las tres alternativas productivas después del experimento.'
        );
      }

      if (
        JSON.stringify(firstDecisionAfter) !==
          firstDecisionSnapshot ||
        JSON.stringify(secondDecisionAfter) !==
          secondDecisionSnapshot ||
        JSON.stringify(thirdDecisionAfter) !==
          thirdDecisionSnapshot
      ) {
        throw new Error(
          'FASE 23.27 alteró indirectamente alguna alternativa decisional productiva.'
        );
      }

      addLog(
        `FASE 23.27 OK: tres alternativas reales ${firstDecision.id}, ${secondDecision.id} y ${thirdDecision.id} conservaron identidad y contenido mientras dos conocimientos independientes produjeron y mantuvieron simultáneamente las precedencias contextuales ${firstDecision.id} -> ${secondDecision.id} mediante ${knowledgeAB.id} y ${secondDecision.id} -> ${thirdDecision.id} mediante ${knowledgeBC.id}; ambas relaciones coexistieron sin inferir ${firstDecision.id} -> ${thirdDecision.id}, sin cierre transitivo, orden parcial formal, reordenamiento, rank, score, modificación de confidence o priority, selección ni ejecución, permaneciendo intactas ${recommendationsAfterPrecedenceCoexistence.length} recomendaciones y ${decisionsAfterPrecedenceCoexistence.length} decisiones productivas.`
      );
    } catch (error) {
      console.error(error);

      addLog(
        error instanceof Error
          ? `Error en coexistencia contextual plural de precedencias 23.27: ${error.message}`
          : 'Error inesperado en coexistencia contextual plural de precedencias 23.27.'
      );
    } finally {
      setLoading(false);
    }
  }

  async function testOperationalKnowledgeControlledDecisionPrecedenceConsistency() {
    setLoading(true);

    try {
      const detectedPatterns = await detectMemoryPatterns();

      const recommendationsBeforeConsistency =
        generateRecommendationsFromPatterns(detectedPatterns);

      const decisionsBeforeConsistency =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsBeforeConsistency
        );

      /*
       * FASE 23.28 — Consistencia contextual controlada de
       * precedencias plurales entre alternativas decisionales
       * por conocimiento operativo
       *
       * FASE 23.27 demostró que dos precedencias contextuales
       * independientes pueden coexistir simultáneamente:
       *
       * A -> B
       * B -> C
       *
       * sin inferir A -> C.
       *
       * FASE 23.28 introduce una nueva capacidad:
       *
       * evaluar si un conjunto explícito de precedencias
       * contextuales coexistentes contiene o no una
       * contradicción direccional directa.
       *
       * Escenario consistente:
       *
       * A -> B
       * B -> C
       *
       * Escenario inconsistente:
       *
       * A -> B
       * B -> A
       *
       * Esta fase NO introduce:
       *
       * - detección general de ciclos;
       * - recorrido de grafos;
       * - transitividad;
       * - cierre transitivo;
       * - orden parcial formal;
       * - reordenamiento;
       * - ranking;
       * - score derivado;
       * - modificación de confidence;
       * - modificación de priority;
       * - selección;
       * - ejecución.
       *
       * Especialmente:
       *
       * detectar A -> B + B -> A
       * NO equivale todavía a implementar detección
       * general de ciclos A -> B -> C -> A.
       */

      /*
       * Las tres decisiones se resuelven exclusivamente por id.
       *
       * Nunca por posición del array productivo, porque
       * generateOperationalDecisions() ordena por confidence.
       */
      const firstDecision =
        decisionsBeforeConsistency.find(
          (decision) =>
            decision.id === 'decision-review-movements'
        );

      const secondDecision =
        decisionsBeforeConsistency.find(
          (decision) =>
            decision.id === 'decision-maintain-monitoring'
        );

      const thirdDecision =
        decisionsBeforeConsistency.find(
          (decision) =>
            decision.id === 'decision-prioritize-high-value'
        );

      if (!firstDecision) {
        throw new Error(
          'FASE 23.28 no encontró decision-review-movements como alternativa A.'
        );
      }

      if (!secondDecision) {
        throw new Error(
          'FASE 23.28 no encontró decision-maintain-monitoring como alternativa B.'
        );
      }

      if (!thirdDecision) {
        throw new Error(
          'FASE 23.28 no encontró decision-prioritize-high-value como alternativa C.'
        );
      }

      if (
        firstDecision.id === secondDecision.id ||
        firstDecision.id === thirdDecision.id ||
        secondDecision.id === thirdDecision.id
      ) {
        throw new Error(
          'FASE 23.28 esperaba tres alternativas decisionales distintas.'
        );
      }

      const firstDecisionSnapshot =
        JSON.stringify(firstDecision);

      const secondDecisionSnapshot =
        JSON.stringify(secondDecision);

      const thirdDecisionSnapshot =
        JSON.stringify(thirdDecision);

      const controlledAlternativeIds: [
        string,
        string,
        string,
      ] = [
        firstDecision.id,
        secondDecision.id,
        thirdDecision.id,
      ];

      /*
       * Tres conocimientos independientes:
       *
       * K1 -> A -> B
       * K2 -> B -> C
       * K3 -> B -> A
       *
       * K1 + K2 formarán el escenario consistente.
       * K1 + K3 formarán el escenario contradictorio.
       */
      const controlledPatterns = [
        {
          id: 'recommendation-deviation-pattern-reubicacion-controlled-consistency-ab',
          title:
            'Patrón controlado de consistencia A-B',
          description:
            'Patrón controlado para producir la precedencia contextual A-B dentro de la evaluación de consistencia.',
          score: 95,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-consistencia-ab',
          },
          evidence: {
            memoryIds: [
              'memory-controlled-consistency-ab-1',
              'memory-controlled-consistency-ab-2',
              'memory-controlled-consistency-ab-3',
              'memory-controlled-consistency-ab-4',
            ],
          },
        },
        {
          id: 'recommendation-deviation-pattern-reubicacion-controlled-consistency-bc',
          title:
            'Patrón controlado de consistencia B-C',
          description:
            'Patrón controlado para producir la precedencia contextual B-C dentro del escenario consistente.',
          score: 94,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-consistencia-bc',
          },
          evidence: {
            memoryIds: [
              'memory-controlled-consistency-bc-1',
              'memory-controlled-consistency-bc-2',
              'memory-controlled-consistency-bc-3',
              'memory-controlled-consistency-bc-4',
            ],
          },
        },
        {
          id: 'recommendation-deviation-pattern-reubicacion-controlled-consistency-ba',
          title:
            'Patrón controlado de contradicción B-A',
          description:
            'Patrón controlado para producir la precedencia contextual B-A y demostrar una contradicción direccional directa frente a A-B.',
          score: 93,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-consistencia-ba',
          },
          evidence: {
            memoryIds: [
              'memory-controlled-consistency-ba-1',
              'memory-controlled-consistency-ba-2',
              'memory-controlled-consistency-ba-3',
              'memory-controlled-consistency-ba-4',
            ],
          },
        },
      ];

      const controlledKnowledge =
        generateOperationalKnowledge(controlledPatterns);

      if (controlledKnowledge.length !== 3) {
        throw new Error(
          `FASE 23.28 esperaba exactamente 3 conocimientos controlados y generó ${controlledKnowledge.length}.`
        );
      }

      const knowledgeAB =
        controlledKnowledge.find(
          (knowledge) =>
            knowledge.sourcePatternId ===
            controlledPatterns[0].id
        );

      const knowledgeBC =
        controlledKnowledge.find(
          (knowledge) =>
            knowledge.sourcePatternId ===
            controlledPatterns[1].id
        );

      const knowledgeBA =
        controlledKnowledge.find(
          (knowledge) =>
            knowledge.sourcePatternId ===
            controlledPatterns[2].id
        );

      if (!knowledgeAB) {
        throw new Error(
          'FASE 23.28 no pudo resolver K1 para A-B.'
        );
      }

      if (!knowledgeBC) {
        throw new Error(
          'FASE 23.28 no pudo resolver K2 para B-C.'
        );
      }

      if (!knowledgeBA) {
        throw new Error(
          'FASE 23.28 no pudo resolver K3 para B-A.'
        );
      }

      const uniqueKnowledgeIds =
        new Set([
          knowledgeAB.id,
          knowledgeBC.id,
          knowledgeBA.id,
        ]);

      if (uniqueKnowledgeIds.size !== 3) {
        throw new Error(
          'FASE 23.28 esperaba tres knowledgeId independientes.'
        );
      }

      /*
       * Los tres conocimientos deben ser elegibles dentro del
       * mismo contexto controlado "reubicacion".
       */
      const eligibilityAB =
        evaluateOperationalKnowledgeEligibility(
          knowledgeAB,
          {
            movementType: 'reubicacion',
          }
        );

      const eligibilityBC =
        evaluateOperationalKnowledgeEligibility(
          knowledgeBC,
          {
            movementType: 'reubicacion',
          }
        );

      const eligibilityBA =
        evaluateOperationalKnowledgeEligibility(
          knowledgeBA,
          {
            movementType: 'reubicacion',
          }
        );

      const considerationAB =
        considerOperationalKnowledge(eligibilityAB);

      const considerationBC =
        considerOperationalKnowledge(eligibilityBC);

      const considerationBA =
        considerOperationalKnowledge(eligibilityBA);

      if (!considerationAB) {
        throw new Error(
          'FASE 23.28 esperaba consideración válida para K1 A-B.'
        );
      }

      if (!considerationBC) {
        throw new Error(
          'FASE 23.28 esperaba consideración válida para K2 B-C.'
        );
      }

      if (!considerationBA) {
        throw new Error(
          'FASE 23.28 esperaba consideración válida para K3 B-A.'
        );
      }

      if (
        considerationAB.knowledgeId !== knowledgeAB.id ||
        considerationBC.knowledgeId !== knowledgeBC.id ||
        considerationBA.knowledgeId !== knowledgeBA.id
      ) {
        throw new Error(
          'FASE 23.28 perdió trazabilidad entre consideración y conocimiento.'
        );
      }

      type ControlledKnowledge =
        (typeof controlledKnowledge)[number];

      type ControlledDecisionPreference = {
        decisionIds: [string, string];
        relation:
          | 'no_contextual_preference'
          | 'contextual_preference';
        preferredDecisionId: string | null;
        knowledgeId: string | null;
        rationale: string | null;
      };

      type ControlledDecisionPrecedence = {
        decisionIds: [string, string];
        relation:
          | 'no_contextual_precedence'
          | 'contextual_precedence';
        precedingDecisionId: string | null;
        precededDecisionId: string | null;
        knowledgeId: string | null;
        rationale: string | null;
      };

      type ControlledDecisionPrecedenceCoexistence = {
        decisionIds: [string, string, string];
        relation:
          | 'no_contextual_precedence_coexistence'
          | 'contextual_precedence_coexistence';
        precedences: ControlledDecisionPrecedence[];
        rationale: string | null;
      };

      type ControlledDecisionPrecedenceConflict = {
        firstPrecedence: {
          precedingDecisionId: string;
          precededDecisionId: string;
          knowledgeId: string;
        };
        secondPrecedence: {
          precedingDecisionId: string;
          precededDecisionId: string;
          knowledgeId: string;
        };
      };

      type ControlledDecisionPrecedenceConsistency = {
        decisionIds: [string, string, string];
        relation:
          | 'contextual_precedence_consistent'
          | 'contextual_precedence_inconsistent';
        consistent: boolean;
        conflict:
          | ControlledDecisionPrecedenceConflict
          | null;
        rationale: string;
      };

      /*
       * Consumidor local de preferencia.
       *
       * No utiliza confidence, priority ni posición.
       *
       * La dirección deseada se expresa mediante la identidad
       * de la primera decisión de cada pareja.
       */
      const determineControlledPreference = (
        first: OperationalDecision,
        second: OperationalDecision,
        consideredKnowledge: ControlledKnowledge | null,
        expectedDeviationReason: string,
        expectedFirstAction: string,
        expectedSecondAction: string
      ): ControlledDecisionPreference => {
        if (!consideredKnowledge) {
          return {
            decisionIds: [first.id, second.id],
            relation: 'no_contextual_preference',
            preferredDecisionId: null,
            knowledgeId: null,
            rationale: null,
          };
        }

        const knowledgeApplies =
          consideredKnowledge.context.movementType ===
            'reubicacion' &&
          consideredKnowledge.context.deviationReason ===
            expectedDeviationReason;

        const firstMatches =
          first.action === expectedFirstAction;

        const secondMatches =
          second.action === expectedSecondAction;

        if (
          !knowledgeApplies ||
          !firstMatches ||
          !secondMatches
        ) {
          return {
            decisionIds: [first.id, second.id],
            relation: 'no_contextual_preference',
            preferredDecisionId: null,
            knowledgeId: null,
            rationale: null,
          };
        }

        return {
          decisionIds: [first.id, second.id],
          relation: 'contextual_preference',
          preferredDecisionId: first.id,
          knowledgeId: consideredKnowledge.id,
          rationale:
            `El conocimiento "${consideredKnowledge.id}" ` +
            `sobre "${consideredKnowledge.context.deviationReason}" ` +
            `en movimientos "${consideredKnowledge.context.movementType}" ` +
            `hace contextualmente preferible "${first.id}" ` +
            `frente a "${second.id}".`,
        };
      };

      /*
       * Consumidor local de precedencia.
       *
       * Recibe únicamente preferencia.
       */
      const determineControlledPrecedence = (
        preference: ControlledDecisionPreference
      ): ControlledDecisionPrecedence => {
        if (
          preference.relation !==
            'contextual_preference' ||
          !preference.preferredDecisionId ||
          !preference.knowledgeId ||
          !preference.rationale
        ) {
          return {
            decisionIds: [
              preference.decisionIds[0],
              preference.decisionIds[1],
            ],
            relation: 'no_contextual_precedence',
            precedingDecisionId: null,
            precededDecisionId: null,
            knowledgeId: null,
            rationale: null,
          };
        }

        const [
          firstDecisionId,
          secondDecisionId,
        ] = preference.decisionIds;

        if (
          preference.preferredDecisionId !==
            firstDecisionId &&
          preference.preferredDecisionId !==
            secondDecisionId
        ) {
          return {
            decisionIds: [
              firstDecisionId,
              secondDecisionId,
            ],
            relation: 'no_contextual_precedence',
            precedingDecisionId: null,
            precededDecisionId: null,
            knowledgeId: null,
            rationale: null,
          };
        }

        const precededDecisionId =
          preference.preferredDecisionId ===
          firstDecisionId
            ? secondDecisionId
            : firstDecisionId;

        return {
          decisionIds: [
            firstDecisionId,
            secondDecisionId,
          ],
          relation: 'contextual_precedence',
          precedingDecisionId:
            preference.preferredDecisionId,
          precededDecisionId,
          knowledgeId: preference.knowledgeId,
          rationale:
            `${preference.rationale} ` +
            `La preferencia establece una precedencia contextual.`,
        };
      };

      /*
       * Consumidor plural de coexistencia.
       *
       * Conserva solamente las precedencias explícitas recibidas.
       * No analiza todavía consistencia.
       */
      const determineControlledPrecedenceCoexistence = (
        decisionIds: [string, string, string],
        precedences: ControlledDecisionPrecedence[]
      ): ControlledDecisionPrecedenceCoexistence => {
        const contextualPrecedences =
          precedences.filter(
            (precedence) =>
              precedence.relation ===
                'contextual_precedence' &&
              precedence.precedingDecisionId !== null &&
              precedence.precededDecisionId !== null &&
              precedence.knowledgeId !== null
          );

        if (contextualPrecedences.length !== 2) {
          return {
            decisionIds: [
              decisionIds[0],
              decisionIds[1],
              decisionIds[2],
            ],
            relation:
              'no_contextual_precedence_coexistence',
            precedences: [],
            rationale: null,
          };
        }

        return {
          decisionIds: [
            decisionIds[0],
            decisionIds[1],
            decisionIds[2],
          ],
          relation:
            'contextual_precedence_coexistence',
          precedences: [
            contextualPrecedences[0],
            contextualPrecedences[1],
          ],
          rationale:
            `Dos precedencias contextuales explícitas ` +
            `coexisten sin generar nuevas relaciones.`,
        };
      };

      /*
       * NUEVO CONSUMIDOR DE FASE 23.28.
       *
       * Recibe exclusivamente una coexistencia ya producida.
       *
       * No recibe conocimiento.
       * No recibe preferencias.
       * No crea precedencias.
       * No modifica precedencias.
       *
       * Únicamente evalúa contradicción direccional directa:
       *
       * X -> Y
       * Y -> X
       *
       * No busca ciclos de longitud mayor.
       */
      const evaluateControlledPrecedenceConsistency = (
        coexistence: ControlledDecisionPrecedenceCoexistence
      ): ControlledDecisionPrecedenceConsistency => {
        const precedences =
          coexistence.precedences.filter(
            (precedence) =>
              precedence.relation ===
                'contextual_precedence' &&
              precedence.precedingDecisionId !== null &&
              precedence.precededDecisionId !== null &&
              precedence.knowledgeId !== null
          );

        for (
          let firstIndex = 0;
          firstIndex < precedences.length;
          firstIndex += 1
        ) {
          const firstPrecedence =
            precedences[firstIndex];

          if (
            !firstPrecedence ||
            !firstPrecedence.precedingDecisionId ||
            !firstPrecedence.precededDecisionId ||
            !firstPrecedence.knowledgeId
          ) {
            continue;
          }

          for (
            let secondIndex = firstIndex + 1;
            secondIndex < precedences.length;
            secondIndex += 1
          ) {
            const secondPrecedence =
              precedences[secondIndex];

            if (
              !secondPrecedence ||
              !secondPrecedence.precedingDecisionId ||
              !secondPrecedence.precededDecisionId ||
              !secondPrecedence.knowledgeId
            ) {
              continue;
            }

            const isDirectContradiction =
              firstPrecedence.precedingDecisionId ===
                secondPrecedence.precededDecisionId &&
              firstPrecedence.precededDecisionId ===
                secondPrecedence.precedingDecisionId;

            if (isDirectContradiction) {
              return {
                decisionIds: [
                  coexistence.decisionIds[0],
                  coexistence.decisionIds[1],
                  coexistence.decisionIds[2],
                ],
                relation:
                  'contextual_precedence_inconsistent',
                consistent: false,
                conflict: {
                  firstPrecedence: {
                    precedingDecisionId:
                      firstPrecedence.precedingDecisionId,
                    precededDecisionId:
                      firstPrecedence.precededDecisionId,
                    knowledgeId:
                      firstPrecedence.knowledgeId,
                  },
                  secondPrecedence: {
                    precedingDecisionId:
                      secondPrecedence.precedingDecisionId,
                    precededDecisionId:
                      secondPrecedence.precededDecisionId,
                    knowledgeId:
                      secondPrecedence.knowledgeId,
                  },
                },
                rationale:
                  `Se detectó una contradicción direccional ` +
                  `directa entre ` +
                  `"${firstPrecedence.precedingDecisionId}" -> ` +
                  `"${firstPrecedence.precededDecisionId}" y ` +
                  `"${secondPrecedence.precedingDecisionId}" -> ` +
                  `"${secondPrecedence.precededDecisionId}", ` +
                  `sin ejecutar detección general de ciclos.`,
              };
            }
          }
        }

        return {
          decisionIds: [
            coexistence.decisionIds[0],
            coexistence.decisionIds[1],
            coexistence.decisionIds[2],
          ],
          relation:
            'contextual_precedence_consistent',
          consistent: true,
          conflict: null,
          rationale:
            `Las precedencias contextuales coexistentes no ` +
            `presentan contradicción direccional directa.`,
        };
      };

      /*
       * Construcción del escenario consistente:
       *
       * K1 -> A -> B
       * K2 -> B -> C
       */
      const preferenceAB =
        determineControlledPreference(
          firstDecision,
          secondDecision,
          knowledgeAB,
          'motivo-controlado-consistencia-ab',
          'review_movements',
          'monitor_system'
        );

      const preferenceBC =
        determineControlledPreference(
          secondDecision,
          thirdDecision,
          knowledgeBC,
          'motivo-controlado-consistencia-bc',
          'monitor_system',
          'prioritize_high_value'
        );

      const precedenceAB =
        determineControlledPrecedence(preferenceAB);

      const precedenceBC =
        determineControlledPrecedence(preferenceBC);

      const consistentCoexistence =
        determineControlledPrecedenceCoexistence(
          controlledAlternativeIds,
          [
            precedenceAB,
            precedenceBC,
          ]
        );

      const consistentEvaluation =
        evaluateControlledPrecedenceConsistency(
          consistentCoexistence
        );

      /*
       * Construcción del escenario contradictorio:
       *
       * K1 -> A -> B
       * K3 -> B -> A
       */
      const preferenceBA =
        determineControlledPreference(
          secondDecision,
          firstDecision,
          knowledgeBA,
          'motivo-controlado-consistencia-ba',
          'monitor_system',
          'review_movements'
        );

      const precedenceBA =
        determineControlledPrecedence(preferenceBA);

      const inconsistentCoexistence =
        determineControlledPrecedenceCoexistence(
          controlledAlternativeIds,
          [
            precedenceAB,
            precedenceBA,
          ]
        );

      const inconsistentEvaluation =
        evaluateControlledPrecedenceConsistency(
          inconsistentCoexistence
        );

      /*
       * Las tres preferencias deben existir.
       */
      if (
        preferenceAB.relation !==
          'contextual_preference' ||
        preferenceBC.relation !==
          'contextual_preference' ||
        preferenceBA.relation !==
          'contextual_preference'
      ) {
        throw new Error(
          'FASE 23.28 no produjo las tres preferencias contextuales controladas.'
        );
      }

      if (
        preferenceAB.preferredDecisionId !==
          firstDecision.id ||
        preferenceBC.preferredDecisionId !==
          secondDecision.id ||
        preferenceBA.preferredDecisionId !==
          secondDecision.id
      ) {
        throw new Error(
          'FASE 23.28 produjo una dirección de preferencia incorrecta.'
        );
      }

      /*
       * Las tres precedencias explícitas deben existir.
       */
      if (
        precedenceAB.relation !==
          'contextual_precedence' ||
        precedenceBC.relation !==
          'contextual_precedence' ||
        precedenceBA.relation !==
          'contextual_precedence'
      ) {
        throw new Error(
          'FASE 23.28 no produjo las precedencias contextuales esperadas.'
        );
      }

      if (
        precedenceAB.precedingDecisionId !==
          firstDecision.id ||
        precedenceAB.precededDecisionId !==
          secondDecision.id
      ) {
        throw new Error(
          'FASE 23.28 produjo una precedencia A-B incorrecta.'
        );
      }

      if (
        precedenceBC.precedingDecisionId !==
          secondDecision.id ||
        precedenceBC.precededDecisionId !==
          thirdDecision.id
      ) {
        throw new Error(
          'FASE 23.28 produjo una precedencia B-C incorrecta.'
        );
      }

      if (
        precedenceBA.precedingDecisionId !==
          secondDecision.id ||
        precedenceBA.precededDecisionId !==
          firstDecision.id
      ) {
        throw new Error(
          'FASE 23.28 produjo una precedencia B-A incorrecta.'
        );
      }

      /*
       * Cada precedencia conserva su knowledgeId independiente.
       */
      if (
        precedenceAB.knowledgeId !== knowledgeAB.id ||
        precedenceBC.knowledgeId !== knowledgeBC.id ||
        precedenceBA.knowledgeId !== knowledgeBA.id
      ) {
        throw new Error(
          'FASE 23.28 perdió atribución mediante knowledgeId.'
        );
      }

      /*
       * Ambos escenarios deben conservar coexistencia plural.
       */
      if (
        consistentCoexistence.relation !==
          'contextual_precedence_coexistence' ||
        inconsistentCoexistence.relation !==
          'contextual_precedence_coexistence'
      ) {
        throw new Error(
          'FASE 23.28 no logró construir ambos escenarios de coexistencia plural.'
        );
      }

      if (
        consistentCoexistence.precedences.length !== 2 ||
        inconsistentCoexistence.precedences.length !== 2
      ) {
        throw new Error(
          'FASE 23.28 esperaba exactamente dos precedencias en cada escenario.'
        );
      }

      /*
       * ESCENARIO CONSISTENTE.
       */
      if (
        consistentEvaluation.relation !==
        'contextual_precedence_consistent'
      ) {
        throw new Error(
          'FASE 23.28 clasificó incorrectamente el escenario A-B / B-C.'
        );
      }

      if (!consistentEvaluation.consistent) {
        throw new Error(
          'FASE 23.28 marcó como inconsistente un conjunto sin contradicción directa.'
        );
      }

      if (consistentEvaluation.conflict !== null) {
        throw new Error(
          'FASE 23.28 generó un conflicto artificial en el escenario consistente.'
        );
      }

      /*
       * ESCENARIO INCONSISTENTE.
       */
      if (
        inconsistentEvaluation.relation !==
        'contextual_precedence_inconsistent'
      ) {
        throw new Error(
          'FASE 23.28 no clasificó la contradicción A-B / B-A.'
        );
      }

      if (inconsistentEvaluation.consistent) {
        throw new Error(
          'FASE 23.28 marcó como consistente una contradicción direccional directa.'
        );
      }

      if (!inconsistentEvaluation.conflict) {
        throw new Error(
          'FASE 23.28 esperaba información explícita del conflicto detectado.'
        );
      }

      const conflict =
        inconsistentEvaluation.conflict;

      const conflictFirst =
        conflict.firstPrecedence;

      const conflictSecond =
        conflict.secondPrecedence;

      const conflictMatchesExpectedDirections =
        (
          conflictFirst.precedingDecisionId ===
            firstDecision.id &&
          conflictFirst.precededDecisionId ===
            secondDecision.id &&
          conflictSecond.precedingDecisionId ===
            secondDecision.id &&
          conflictSecond.precededDecisionId ===
            firstDecision.id
        ) ||
        (
          conflictFirst.precedingDecisionId ===
            secondDecision.id &&
          conflictFirst.precededDecisionId ===
            firstDecision.id &&
          conflictSecond.precedingDecisionId ===
            firstDecision.id &&
          conflictSecond.precededDecisionId ===
            secondDecision.id
        );

      if (!conflictMatchesExpectedDirections) {
        throw new Error(
          'FASE 23.28 identificó un conflicto distinto de A-B / B-A.'
        );
      }

      const conflictKnowledgeIds =
        new Set([
          conflictFirst.knowledgeId,
          conflictSecond.knowledgeId,
        ]);

      if (
        !conflictKnowledgeIds.has(knowledgeAB.id) ||
        !conflictKnowledgeIds.has(knowledgeBA.id) ||
        conflictKnowledgeIds.size !== 2
      ) {
        throw new Error(
          'FASE 23.28 perdió trazabilidad de los conocimientos causantes del conflicto.'
        );
      }

      /*
       * Las identidades controladas no deben convertirse en
       * un orden calculado.
       */
      if (
        JSON.stringify(
          consistentEvaluation.decisionIds
        ) !== JSON.stringify(controlledAlternativeIds) ||
        JSON.stringify(
          inconsistentEvaluation.decisionIds
        ) !== JSON.stringify(controlledAlternativeIds)
      ) {
        throw new Error(
          'FASE 23.28 alteró la estructura de identidades A-B-C durante la evaluación de consistencia.'
        );
      }

      /*
       * La consistencia NO debe generar relaciones nuevas.
       *
       * En especial no debe aparecer A -> C.
       */
      const allExplicitPrecedences = [
        ...consistentCoexistence.precedences,
        ...inconsistentCoexistence.precedences,
      ];

      const hasArtificialTransitivePrecedence =
        allExplicitPrecedences.some(
          (precedence) =>
            precedence.precedingDecisionId ===
              firstDecision.id &&
            precedence.precededDecisionId ===
              thirdDecision.id
        );

      if (hasArtificialTransitivePrecedence) {
        throw new Error(
          'FASE 23.28 infirió A-C durante una evaluación que debía limitarse a consistencia.'
        );
      }

      /*
       * No debe aparecer una tercera precedencia en ninguno
       * de los escenarios.
       */
      if (
        consistentCoexistence.precedences.length !== 2 ||
        inconsistentCoexistence.precedences.length !== 2
      ) {
        throw new Error(
          'FASE 23.28 generó relaciones de precedencia adicionales.'
        );
      }

      /*
       * Guardas de frontera del resultado de consistencia.
       *
       * Se permiten:
       *
       * - decisionIds;
       * - relation;
       * - consistent;
       * - conflict;
       * - rationale.
       *
       * No se permiten propiedades propias de conceptos
       * posteriores.
       */
      if (
        'cycle' in consistentEvaluation ||
        'cycles' in consistentEvaluation ||
        'cyclic' in consistentEvaluation ||
        'acyclic' in consistentEvaluation ||
        'graph' in consistentEvaluation ||
        'transitive' in consistentEvaluation ||
        'transitivity' in consistentEvaluation ||
        'closure' in consistentEvaluation ||
        'partialOrder' in consistentEvaluation ||
        'orderedDecisionIds' in consistentEvaluation ||
        'sortedDecisionIds' in consistentEvaluation ||
        'order' in consistentEvaluation ||
        'rank' in consistentEvaluation ||
        'ranking' in consistentEvaluation ||
        'position' in consistentEvaluation ||
        'score' in consistentEvaluation ||
        'weight' in consistentEvaluation ||
        'confidence' in consistentEvaluation ||
        'priority' in consistentEvaluation ||
        'winner' in consistentEvaluation ||
        'loser' in consistentEvaluation ||
        'selected' in consistentEvaluation ||
        'selection' in consistentEvaluation ||
        'executed' in consistentEvaluation ||
        'execution' in consistentEvaluation ||
        'knowledgeId' in consistentEvaluation ||
        'sourcePatternId' in consistentEvaluation ||
        'memoryIds' in consistentEvaluation ||
        'occurrences' in consistentEvaluation
      ) {
        throw new Error(
          'FASE 23.28 detectó atributos de ciclos, transitividad, orden parcial, ranking, ponderación, selección, ejecución o atribución global indebida.'
        );
      }

      if (
        'cycle' in inconsistentEvaluation ||
        'cycles' in inconsistentEvaluation ||
        'cyclic' in inconsistentEvaluation ||
        'acyclic' in inconsistentEvaluation ||
        'graph' in inconsistentEvaluation ||
        'transitive' in inconsistentEvaluation ||
        'transitivity' in inconsistentEvaluation ||
        'closure' in inconsistentEvaluation ||
        'partialOrder' in inconsistentEvaluation ||
        'orderedDecisionIds' in inconsistentEvaluation ||
        'sortedDecisionIds' in inconsistentEvaluation ||
        'order' in inconsistentEvaluation ||
        'rank' in inconsistentEvaluation ||
        'ranking' in inconsistentEvaluation ||
        'position' in inconsistentEvaluation ||
        'score' in inconsistentEvaluation ||
        'weight' in inconsistentEvaluation ||
        'confidence' in inconsistentEvaluation ||
        'priority' in inconsistentEvaluation ||
        'winner' in inconsistentEvaluation ||
        'loser' in inconsistentEvaluation ||
        'selected' in inconsistentEvaluation ||
        'selection' in inconsistentEvaluation ||
        'executed' in inconsistentEvaluation ||
        'execution' in inconsistentEvaluation ||
        'knowledgeId' in inconsistentEvaluation ||
        'sourcePatternId' in inconsistentEvaluation ||
        'memoryIds' in inconsistentEvaluation ||
        'occurrences' in inconsistentEvaluation
      ) {
        throw new Error(
          'FASE 23.28 detectó atributos posteriores dentro del resultado inconsistente.'
        );
      }

      /*
       * Las decisiones productivas utilizadas como referencia
       * deben permanecer intactas.
       */
      if (
        JSON.stringify(firstDecision) !==
        firstDecisionSnapshot
      ) {
        throw new Error(
          'FASE 23.28 modificó la alternativa decisional A.'
        );
      }

      if (
        JSON.stringify(secondDecision) !==
        secondDecisionSnapshot
      ) {
        throw new Error(
          'FASE 23.28 modificó la alternativa decisional B.'
        );
      }

      if (
        JSON.stringify(thirdDecision) !==
        thirdDecisionSnapshot
      ) {
        throw new Error(
          'FASE 23.28 modificó la alternativa decisional C.'
        );
      }

      /*
       * Verificación externa:
       * ningún motor productivo debe cambiar.
       */
      const recommendationsAfterConsistency =
        generateRecommendationsFromPatterns(detectedPatterns);

      const decisionsAfterConsistency =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsAfterConsistency
        );

      if (
        JSON.stringify(
          recommendationsBeforeConsistency
        ) !==
        JSON.stringify(
          recommendationsAfterConsistency
        )
      ) {
        throw new Error(
          'FASE 23.28 detectó modificación de recomendaciones productivas.'
        );
      }

      if (
        JSON.stringify(
          decisionsBeforeConsistency
        ) !==
        JSON.stringify(
          decisionsAfterConsistency
        )
      ) {
        throw new Error(
          'FASE 23.28 detectó modificación, reordenamiento o ranking distinto de decisiones productivas.'
        );
      }

      const firstDecisionAfter =
        decisionsAfterConsistency.find(
          (decision) =>
            decision.id === firstDecision.id
        );

      const secondDecisionAfter =
        decisionsAfterConsistency.find(
          (decision) =>
            decision.id === secondDecision.id
        );

      const thirdDecisionAfter =
        decisionsAfterConsistency.find(
          (decision) =>
            decision.id === thirdDecision.id
        );

      if (
        !firstDecisionAfter ||
        !secondDecisionAfter ||
        !thirdDecisionAfter
      ) {
        throw new Error(
          'FASE 23.28 perdió alguna alternativa productiva después del experimento.'
        );
      }

      if (
        JSON.stringify(firstDecisionAfter) !==
          firstDecisionSnapshot ||
        JSON.stringify(secondDecisionAfter) !==
          secondDecisionSnapshot ||
        JSON.stringify(thirdDecisionAfter) !==
          thirdDecisionSnapshot
      ) {
        throw new Error(
          'FASE 23.28 alteró indirectamente alguna alternativa decisional productiva.'
        );
      }

      addLog(
        `FASE 23.28 OK: sobre las mismas tres alternativas ${firstDecision.id}, ${secondDecision.id} y ${thirdDecision.id}, la coexistencia ${firstDecision.id} -> ${secondDecision.id} junto con ${secondDecision.id} -> ${thirdDecision.id} fue evaluada como consistente, mientras ${firstDecision.id} -> ${secondDecision.id} junto con ${secondDecision.id} -> ${firstDecision.id} fue evaluada como inconsistente mediante una contradicción direccional directa atribuible a conocimientos independientes; la evaluación no introdujo detección general de ciclos, transitividad, cierre transitivo, orden parcial, reordenamiento, rank, score, modificación de confidence o priority, selección ni ejecución, permaneciendo intactas ${recommendationsAfterConsistency.length} recomendaciones y ${decisionsAfterConsistency.length} decisiones productivas.`
      );
    } catch (error) {
      console.error(error);

      addLog(
        error instanceof Error
          ? `Error en consistencia contextual controlada de precedencias 23.28: ${error.message}`
          : 'Error inesperado en consistencia contextual controlada de precedencias 23.28.'
      );
    } finally {
      setLoading(false);
    }
  }

  async function testOperationalKnowledgeControlledStructuralPrecedenceConsistency() {
    setLoading(true);

    try {
      const detectedPatterns = await detectMemoryPatterns();

      const recommendationsBeforeStructuralConsistency =
        generateRecommendationsFromPatterns(detectedPatterns);

      const decisionsBeforeStructuralConsistency =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsBeforeStructuralConsistency
        );

      /*
       * FASE 23.29 — Consistencia estructural controlada de
       * precedencias plurales entre alternativas decisionales
       * por conocimiento operativo
       *
       * FASE 23.28 demostró consistencia relacional local:
       *
       * A -> B
       * B -> A
       *
       * puede reconocerse como contradicción direccional
       * directa.
       *
       * FASE 23.29 introduce la siguiente propiedad mínima:
       *
       * evaluar si tres precedencias contextuales explícitas,
       * ninguna de las cuales contradice directamente a otra,
       * forman conjuntamente un ciclo estructural:
       *
       * A -> B
       * B -> C
       * C -> A
       *
       * Escenario estructuralmente consistente:
       *
       * A -> B
       * B -> C
       *
       * Escenario estructuralmente inconsistente:
       *
       * A -> B
       * B -> C
       * C -> A
       *
       * Esta fase NO introduce:
       *
       * - transitividad;
       * - inferencia A -> C;
       * - cierre transitivo;
       * - orden parcial formal;
       * - reordenamiento;
       * - ranking;
       * - score derivado;
       * - modificación de confidence;
       * - modificación de priority;
       * - selección;
       * - ejecución.
       */

      const firstDecision =
        decisionsBeforeStructuralConsistency.find(
          (decision) =>
            decision.id === 'decision-review-movements'
        );

      const secondDecision =
        decisionsBeforeStructuralConsistency.find(
          (decision) =>
            decision.id === 'decision-maintain-monitoring'
        );

      const thirdDecision =
        decisionsBeforeStructuralConsistency.find(
          (decision) =>
            decision.id === 'decision-prioritize-high-value'
        );

      if (!firstDecision) {
        throw new Error(
          'FASE 23.29 no encontró decision-review-movements como alternativa A.'
        );
      }

      if (!secondDecision) {
        throw new Error(
          'FASE 23.29 no encontró decision-maintain-monitoring como alternativa B.'
        );
      }

      if (!thirdDecision) {
        throw new Error(
          'FASE 23.29 no encontró decision-prioritize-high-value como alternativa C.'
        );
      }

      if (
        firstDecision.id === secondDecision.id ||
        firstDecision.id === thirdDecision.id ||
        secondDecision.id === thirdDecision.id
      ) {
        throw new Error(
          'FASE 23.29 esperaba tres alternativas decisionales distintas.'
        );
      }

      const firstDecisionSnapshot =
        JSON.stringify(firstDecision);

      const secondDecisionSnapshot =
        JSON.stringify(secondDecision);

      const thirdDecisionSnapshot =
        JSON.stringify(thirdDecision);

      const controlledAlternativeIds: [
        string,
        string,
        string,
      ] = [
        firstDecision.id,
        secondDecision.id,
        thirdDecision.id,
      ];

      /*
       * Tres conocimientos independientes:
       *
       * K1 -> A -> B
       * K2 -> B -> C
       * K3 -> C -> A
       *
       * K1 + K2 forman el escenario acíclico.
       * K1 + K2 + K3 forman el ciclo controlado.
       */
      const controlledPatterns = [
        {
          id: 'recommendation-deviation-pattern-reubicacion-controlled-structural-consistency-ab',
          title:
            'Patrón controlado de consistencia estructural A-B',
          description:
            'Patrón controlado para producir la precedencia contextual A-B dentro de la evaluación estructural.',
          score: 95,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-consistencia-estructural-ab',
          },
          evidence: {
            memoryIds: [
              'memory-controlled-structural-consistency-ab-1',
              'memory-controlled-structural-consistency-ab-2',
              'memory-controlled-structural-consistency-ab-3',
              'memory-controlled-structural-consistency-ab-4',
            ],
          },
        },
        {
          id: 'recommendation-deviation-pattern-reubicacion-controlled-structural-consistency-bc',
          title:
            'Patrón controlado de consistencia estructural B-C',
          description:
            'Patrón controlado para producir la precedencia contextual B-C dentro de la evaluación estructural.',
          score: 94,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-consistencia-estructural-bc',
          },
          evidence: {
            memoryIds: [
              'memory-controlled-structural-consistency-bc-1',
              'memory-controlled-structural-consistency-bc-2',
              'memory-controlled-structural-consistency-bc-3',
              'memory-controlled-structural-consistency-bc-4',
            ],
          },
        },
        {
          id: 'recommendation-deviation-pattern-reubicacion-controlled-structural-consistency-ca',
          title:
            'Patrón controlado de ciclo estructural C-A',
          description:
            'Patrón controlado para producir la precedencia contextual C-A y cerrar el ciclo A-B-C-A.',
          score: 93,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-consistencia-estructural-ca',
          },
          evidence: {
            memoryIds: [
              'memory-controlled-structural-consistency-ca-1',
              'memory-controlled-structural-consistency-ca-2',
              'memory-controlled-structural-consistency-ca-3',
              'memory-controlled-structural-consistency-ca-4',
            ],
          },
        },
      ];

      const controlledKnowledge =
        generateOperationalKnowledge(controlledPatterns);

      if (controlledKnowledge.length !== 3) {
        throw new Error(
          `FASE 23.29 esperaba exactamente 3 conocimientos controlados y generó ${controlledKnowledge.length}.`
        );
      }

      const knowledgeAB =
        controlledKnowledge.find(
          (knowledge) =>
            knowledge.sourcePatternId ===
            controlledPatterns[0].id
        );

      const knowledgeBC =
        controlledKnowledge.find(
          (knowledge) =>
            knowledge.sourcePatternId ===
            controlledPatterns[1].id
        );

      const knowledgeCA =
        controlledKnowledge.find(
          (knowledge) =>
            knowledge.sourcePatternId ===
            controlledPatterns[2].id
        );

      if (!knowledgeAB || !knowledgeBC || !knowledgeCA) {
        throw new Error(
          'FASE 23.29 no pudo resolver los tres conocimientos estructurales controlados.'
        );
      }

      const uniqueKnowledgeIds = new Set([
        knowledgeAB.id,
        knowledgeBC.id,
        knowledgeCA.id,
      ]);

      if (uniqueKnowledgeIds.size !== 3) {
        throw new Error(
          'FASE 23.29 esperaba tres knowledgeId independientes.'
        );
      }

      const eligibilityAB =
        evaluateOperationalKnowledgeEligibility(
          knowledgeAB,
          { movementType: 'reubicacion' }
        );

      const eligibilityBC =
        evaluateOperationalKnowledgeEligibility(
          knowledgeBC,
          { movementType: 'reubicacion' }
        );

      const eligibilityCA =
        evaluateOperationalKnowledgeEligibility(
          knowledgeCA,
          { movementType: 'reubicacion' }
        );

      const considerationAB =
        considerOperationalKnowledge(eligibilityAB);

      const considerationBC =
        considerOperationalKnowledge(eligibilityBC);

      const considerationCA =
        considerOperationalKnowledge(eligibilityCA);

      if (
        !considerationAB ||
        !considerationBC ||
        !considerationCA
      ) {
        throw new Error(
          'FASE 23.29 esperaba consideración válida para los tres conocimientos.'
        );
      }

      if (
        considerationAB.knowledgeId !== knowledgeAB.id ||
        considerationBC.knowledgeId !== knowledgeBC.id ||
        considerationCA.knowledgeId !== knowledgeCA.id
      ) {
        throw new Error(
          'FASE 23.29 perdió trazabilidad entre consideración y conocimiento.'
        );
      }

      type ControlledKnowledge =
        (typeof controlledKnowledge)[number];

      type ControlledDecisionPreference = {
        decisionIds: [string, string];
        relation:
          | 'no_contextual_preference'
          | 'contextual_preference';
        preferredDecisionId: string | null;
        knowledgeId: string | null;
        rationale: string | null;
      };

      type ControlledDecisionPrecedence = {
        decisionIds: [string, string];
        relation:
          | 'no_contextual_precedence'
          | 'contextual_precedence';
        precedingDecisionId: string | null;
        precededDecisionId: string | null;
        knowledgeId: string | null;
        rationale: string | null;
      };

      type ControlledStructuralPrecedenceCoexistence = {
        decisionIds: [string, string, string];
        relation:
          | 'no_structural_precedence_coexistence'
          | 'structural_precedence_coexistence';
        precedences: ControlledDecisionPrecedence[];
        rationale: string | null;
      };

      type ControlledStructuralPrecedenceConsistency = {
        decisionIds: [string, string, string];
        relation:
          | 'structural_precedence_consistent'
          | 'structural_precedence_inconsistent';
        consistent: boolean;
        cycle: {
          decisionIds: string[];
          knowledgeIds: string[];
        } | null;
        rationale: string;
      };

      const determineControlledPreference = (
        first: OperationalDecision,
        second: OperationalDecision,
        consideredKnowledge: ControlledKnowledge | null,
        expectedDeviationReason: string,
        expectedFirstAction: string,
        expectedSecondAction: string
      ): ControlledDecisionPreference => {
        if (!consideredKnowledge) {
          return {
            decisionIds: [first.id, second.id],
            relation: 'no_contextual_preference',
            preferredDecisionId: null,
            knowledgeId: null,
            rationale: null,
          };
        }

        const knowledgeApplies =
          consideredKnowledge.context.movementType ===
            'reubicacion' &&
          consideredKnowledge.context.deviationReason ===
            expectedDeviationReason;

        const firstMatches =
          first.action === expectedFirstAction;

        const secondMatches =
          second.action === expectedSecondAction;

        if (
          !knowledgeApplies ||
          !firstMatches ||
          !secondMatches
        ) {
          return {
            decisionIds: [first.id, second.id],
            relation: 'no_contextual_preference',
            preferredDecisionId: null,
            knowledgeId: null,
            rationale: null,
          };
        }

        return {
          decisionIds: [first.id, second.id],
          relation: 'contextual_preference',
          preferredDecisionId: first.id,
          knowledgeId: consideredKnowledge.id,
          rationale:
            `El conocimiento "${consideredKnowledge.id}" ` +
            `hace contextualmente preferible "${first.id}" ` +
            `frente a "${second.id}".`,
        };
      };

      const determineControlledPrecedence = (
        preference: ControlledDecisionPreference
      ): ControlledDecisionPrecedence => {
        if (
          preference.relation !==
            'contextual_preference' ||
          !preference.preferredDecisionId ||
          !preference.knowledgeId ||
          !preference.rationale
        ) {
          return {
            decisionIds: [
              preference.decisionIds[0],
              preference.decisionIds[1],
            ],
            relation: 'no_contextual_precedence',
            precedingDecisionId: null,
            precededDecisionId: null,
            knowledgeId: null,
            rationale: null,
          };
        }

        const [
          firstDecisionId,
          secondDecisionId,
        ] = preference.decisionIds;

        const precededDecisionId =
          preference.preferredDecisionId ===
          firstDecisionId
            ? secondDecisionId
            : firstDecisionId;

        return {
          decisionIds: [
            firstDecisionId,
            secondDecisionId,
          ],
          relation: 'contextual_precedence',
          precedingDecisionId:
            preference.preferredDecisionId,
          precededDecisionId,
          knowledgeId: preference.knowledgeId,
          rationale:
            `${preference.rationale} ` +
            `La preferencia establece una precedencia contextual.`,
        };
      };

      const determineControlledStructuralCoexistence = (
        decisionIds: [string, string, string],
        precedences: ControlledDecisionPrecedence[]
      ): ControlledStructuralPrecedenceCoexistence => {
        const contextualPrecedences =
          precedences.filter(
            (precedence) =>
              precedence.relation ===
                'contextual_precedence' &&
              precedence.precedingDecisionId !== null &&
              precedence.precededDecisionId !== null &&
              precedence.knowledgeId !== null
          );

        if (
          contextualPrecedences.length < 2 ||
          contextualPrecedences.length > 3
        ) {
          return {
            decisionIds: [
              decisionIds[0],
              decisionIds[1],
              decisionIds[2],
            ],
            relation:
              'no_structural_precedence_coexistence',
            precedences: [],
            rationale: null,
          };
        }

        return {
          decisionIds: [
            decisionIds[0],
            decisionIds[1],
            decisionIds[2],
          ],
          relation: 'structural_precedence_coexistence',
          precedences: [...contextualPrecedences],
          rationale:
            `${contextualPrecedences.length} precedencias ` +
            `contextuales explícitas coexisten sin generar relaciones nuevas.`,
        };
      };

      /*
       * NUEVO CONSUMIDOR DE FASE 23.29.
       *
       * Inspecciona exclusivamente las precedencias explícitas.
       * No deriva ni materializa precedencias transitivas.
       *
       * La exploración se limita a determinar si, partiendo
       * de una alternativa, las relaciones existentes permiten
       * regresar a ella mediante más de dos aristas.
       */
      const evaluateControlledStructuralConsistency = (
        coexistence: ControlledStructuralPrecedenceCoexistence
      ): ControlledStructuralPrecedenceConsistency => {
        const precedences =
          coexistence.precedences.filter(
            (precedence) =>
              precedence.relation ===
                'contextual_precedence' &&
              precedence.precedingDecisionId !== null &&
              precedence.precededDecisionId !== null &&
              precedence.knowledgeId !== null
          );

        for (const firstPrecedence of precedences) {
          if (
            !firstPrecedence.precedingDecisionId ||
            !firstPrecedence.precededDecisionId ||
            !firstPrecedence.knowledgeId
          ) {
            continue;
          }

          for (const secondPrecedence of precedences) {
            if (
              secondPrecedence === firstPrecedence ||
              !secondPrecedence.precedingDecisionId ||
              !secondPrecedence.precededDecisionId ||
              !secondPrecedence.knowledgeId
            ) {
              continue;
            }

            if (
              firstPrecedence.precededDecisionId !==
              secondPrecedence.precedingDecisionId
            ) {
              continue;
            }

            for (const thirdPrecedence of precedences) {
              if (
                thirdPrecedence === firstPrecedence ||
                thirdPrecedence === secondPrecedence ||
                !thirdPrecedence.precedingDecisionId ||
                !thirdPrecedence.precededDecisionId ||
                !thirdPrecedence.knowledgeId
              ) {
                continue;
              }

              const closesControlledCycle =
                secondPrecedence.precededDecisionId ===
                  thirdPrecedence.precedingDecisionId &&
                thirdPrecedence.precededDecisionId ===
                  firstPrecedence.precedingDecisionId;

              if (closesControlledCycle) {
                return {
                  decisionIds: [
                    coexistence.decisionIds[0],
                    coexistence.decisionIds[1],
                    coexistence.decisionIds[2],
                  ],
                  relation:
                    'structural_precedence_inconsistent',
                  consistent: false,
                  cycle: {
                    decisionIds: [
                      firstPrecedence.precedingDecisionId,
                      firstPrecedence.precededDecisionId,
                      secondPrecedence.precededDecisionId,
                      firstPrecedence.precedingDecisionId,
                    ],
                    knowledgeIds: [
                      firstPrecedence.knowledgeId,
                      secondPrecedence.knowledgeId,
                      thirdPrecedence.knowledgeId,
                    ],
                  },
                  rationale:
                    `Se detectó un ciclo estructural controlado ` +
                    `de tres precedencias explícitas, sin derivar ` +
                    `relaciones transitivas.`,
                };
              }
            }
          }
        }

        return {
          decisionIds: [
            coexistence.decisionIds[0],
            coexistence.decisionIds[1],
            coexistence.decisionIds[2],
          ],
          relation: 'structural_precedence_consistent',
          consistent: true,
          cycle: null,
          rationale:
            `Las precedencias explícitas no forman un ciclo ` +
            `estructural controlado de longitud tres.`,
        };
      };

      const preferenceAB = determineControlledPreference(
        firstDecision,
        secondDecision,
        knowledgeAB,
        'motivo-controlado-consistencia-estructural-ab',
        firstDecision.action,
        secondDecision.action
      );

      const preferenceBC = determineControlledPreference(
        secondDecision,
        thirdDecision,
        knowledgeBC,
        'motivo-controlado-consistencia-estructural-bc',
        secondDecision.action,
        thirdDecision.action
      );

      const preferenceCA = determineControlledPreference(
        thirdDecision,
        firstDecision,
        knowledgeCA,
        'motivo-controlado-consistencia-estructural-ca',
        thirdDecision.action,
        firstDecision.action
      );

      const precedenceAB =
        determineControlledPrecedence(preferenceAB);

      const precedenceBC =
        determineControlledPrecedence(preferenceBC);

      const precedenceCA =
        determineControlledPrecedence(preferenceCA);

      const acyclicCoexistence =
        determineControlledStructuralCoexistence(
          controlledAlternativeIds,
          [precedenceAB, precedenceBC]
        );

      const cyclicCoexistence =
        determineControlledStructuralCoexistence(
          controlledAlternativeIds,
          [precedenceAB, precedenceBC, precedenceCA]
        );

      const acyclicEvaluation =
        evaluateControlledStructuralConsistency(
          acyclicCoexistence
        );

      const cyclicEvaluation =
        evaluateControlledStructuralConsistency(
          cyclicCoexistence
        );

      if (
        preferenceAB.relation !==
          'contextual_preference' ||
        preferenceBC.relation !==
          'contextual_preference' ||
        preferenceCA.relation !==
          'contextual_preference'
      ) {
        throw new Error(
          'FASE 23.29 no produjo las tres preferencias contextuales controladas.'
        );
      }

      if (
        precedenceAB.relation !==
          'contextual_precedence' ||
        precedenceBC.relation !==
          'contextual_precedence' ||
        precedenceCA.relation !==
          'contextual_precedence'
      ) {
        throw new Error(
          'FASE 23.29 no produjo las tres precedencias contextuales esperadas.'
        );
      }

      if (
        precedenceAB.precedingDecisionId !==
          firstDecision.id ||
        precedenceAB.precededDecisionId !==
          secondDecision.id ||
        precedenceBC.precedingDecisionId !==
          secondDecision.id ||
        precedenceBC.precededDecisionId !==
          thirdDecision.id ||
        precedenceCA.precedingDecisionId !==
          thirdDecision.id ||
        precedenceCA.precededDecisionId !==
          firstDecision.id
      ) {
        throw new Error(
          'FASE 23.29 produjo una dirección de precedencia estructural incorrecta.'
        );
      }

      if (
        precedenceAB.knowledgeId !== knowledgeAB.id ||
        precedenceBC.knowledgeId !== knowledgeBC.id ||
        precedenceCA.knowledgeId !== knowledgeCA.id
      ) {
        throw new Error(
          'FASE 23.29 perdió atribución individual mediante knowledgeId.'
        );
      }

      if (
        acyclicCoexistence.precedences.length !== 2 ||
        cyclicCoexistence.precedences.length !== 3
      ) {
        throw new Error(
          'FASE 23.29 no conservó exactamente las precedencias explícitas de cada escenario.'
        );
      }

      if (
        acyclicEvaluation.relation !==
          'structural_precedence_consistent' ||
        !acyclicEvaluation.consistent ||
        acyclicEvaluation.cycle !== null
      ) {
        throw new Error(
          'FASE 23.29 clasificó incorrectamente el escenario acíclico A-B / B-C.'
        );
      }

      if (
        cyclicEvaluation.relation !==
          'structural_precedence_inconsistent' ||
        cyclicEvaluation.consistent ||
        !cyclicEvaluation.cycle
      ) {
        throw new Error(
          'FASE 23.29 no detectó el ciclo estructural A-B-C-A.'
        );
      }

      const detectedCycle =
        cyclicEvaluation.cycle;

      if (
        detectedCycle.decisionIds.length !== 4 ||
        detectedCycle.decisionIds[0] !==
          detectedCycle.decisionIds[3] ||
        !detectedCycle.decisionIds.includes(
          firstDecision.id
        ) ||
        !detectedCycle.decisionIds.includes(
          secondDecision.id
        ) ||
        !detectedCycle.decisionIds.includes(
          thirdDecision.id
        )
      ) {
        throw new Error(
          'FASE 23.29 identificó una trayectoria cíclica distinta de A-B-C-A.'
        );
      }

      if (
        detectedCycle.knowledgeIds.length !== 3 ||
        !detectedCycle.knowledgeIds.includes(
          knowledgeAB.id
        ) ||
        !detectedCycle.knowledgeIds.includes(
          knowledgeBC.id
        ) ||
        !detectedCycle.knowledgeIds.includes(
          knowledgeCA.id
        )
      ) {
        throw new Error(
          'FASE 23.29 perdió trazabilidad de los conocimientos que forman el ciclo.'
        );
      }

      /*
       * La evaluación estructural NO debe materializar
       * transitividad A -> C.
       */
      const allExplicitPrecedences = [
        ...acyclicCoexistence.precedences,
        ...cyclicCoexistence.precedences,
      ];

      const inferredAC =
        allExplicitPrecedences.some(
          (precedence) =>
            precedence.precedingDecisionId ===
              firstDecision.id &&
            precedence.precededDecisionId ===
              thirdDecision.id
        );

      if (inferredAC) {
        throw new Error(
          'FASE 23.29 infirió A-C y cruzó indebidamente la frontera de transitividad.'
        );
      }

      /*
       * Guardas de frontera.
       *
       * El resultado puede expresar el ciclo detectado,
       * pero no conceptos posteriores.
       */
      if (
        'transitive' in cyclicEvaluation ||
        'transitivity' in cyclicEvaluation ||
        'closure' in cyclicEvaluation ||
        'partialOrder' in cyclicEvaluation ||
        'orderedDecisionIds' in cyclicEvaluation ||
        'sortedDecisionIds' in cyclicEvaluation ||
        'order' in cyclicEvaluation ||
        'rank' in cyclicEvaluation ||
        'ranking' in cyclicEvaluation ||
        'position' in cyclicEvaluation ||
        'score' in cyclicEvaluation ||
        'weight' in cyclicEvaluation ||
        'confidence' in cyclicEvaluation ||
        'priority' in cyclicEvaluation ||
        'winner' in cyclicEvaluation ||
        'loser' in cyclicEvaluation ||
        'selected' in cyclicEvaluation ||
        'selection' in cyclicEvaluation ||
        'executed' in cyclicEvaluation ||
        'execution' in cyclicEvaluation
      ) {
        throw new Error(
          'FASE 23.29 detectó atributos de transitividad, orden parcial, ranking, ponderación, selección o ejecución.'
        );
      }

      if (
        JSON.stringify(
          cyclicCoexistence.precedences
        ) !==
        JSON.stringify([
          precedenceAB,
          precedenceBC,
          precedenceCA,
        ])
      ) {
        throw new Error(
          'FASE 23.29 modificó las precedencias explícitas durante la evaluación estructural.'
        );
      }

      const recommendationsAfterStructuralConsistency =
        generateRecommendationsFromPatterns(detectedPatterns);

      const decisionsAfterStructuralConsistency =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsAfterStructuralConsistency
        );

      if (
        JSON.stringify(
          recommendationsBeforeStructuralConsistency
        ) !==
        JSON.stringify(
          recommendationsAfterStructuralConsistency
        )
      ) {
        throw new Error(
          'FASE 23.29 detectó modificación de recomendaciones productivas.'
        );
      }

      if (
        JSON.stringify(
          decisionsBeforeStructuralConsistency
        ) !==
        JSON.stringify(
          decisionsAfterStructuralConsistency
        )
      ) {
        throw new Error(
          'FASE 23.29 detectó modificación, reordenamiento o ranking distinto de decisiones productivas.'
        );
      }

      const firstDecisionAfter =
        decisionsAfterStructuralConsistency.find(
          (decision) =>
            decision.id === firstDecision.id
        );

      const secondDecisionAfter =
        decisionsAfterStructuralConsistency.find(
          (decision) =>
            decision.id === secondDecision.id
        );

      const thirdDecisionAfter =
        decisionsAfterStructuralConsistency.find(
          (decision) =>
            decision.id === thirdDecision.id
        );

      if (
        !firstDecisionAfter ||
        !secondDecisionAfter ||
        !thirdDecisionAfter
      ) {
        throw new Error(
          'FASE 23.29 perdió alguna alternativa productiva después del experimento.'
        );
      }

      if (
        JSON.stringify(firstDecisionAfter) !==
          firstDecisionSnapshot ||
        JSON.stringify(secondDecisionAfter) !==
          secondDecisionSnapshot ||
        JSON.stringify(thirdDecisionAfter) !==
          thirdDecisionSnapshot
      ) {
        throw new Error(
          'FASE 23.29 alteró indirectamente alguna alternativa decisional productiva.'
        );
      }

      addLog(
        `FASE 23.29 OK: sobre las mismas tres alternativas ${firstDecision.id}, ${secondDecision.id} y ${thirdDecision.id}, las precedencias explícitas ${firstDecision.id} -> ${secondDecision.id} y ${secondDecision.id} -> ${thirdDecision.id} permanecieron estructuralmente consistentes, mientras la incorporación explícita de ${thirdDecision.id} -> ${firstDecision.id} cerró y permitió detectar el ciclo estructural ${firstDecision.id} -> ${secondDecision.id} -> ${thirdDecision.id} -> ${firstDecision.id}, atribuible a tres conocimientos independientes; la evaluación no introdujo transitividad, cierre transitivo, orden parcial, reordenamiento, rank, score, modificación de confidence o priority, selección ni ejecución, permaneciendo intactas ${recommendationsAfterStructuralConsistency.length} recomendaciones y ${decisionsAfterStructuralConsistency.length} decisiones productivas.`
      );
    } catch (error) {
      console.error(error);

      addLog(
        error instanceof Error
          ? `Error en consistencia estructural controlada de precedencias 23.29: ${error.message}`
          : 'Error inesperado en consistencia estructural controlada de precedencias 23.29.'
      );
    } finally {
      setLoading(false);
    }
  }

  async function testOperationalKnowledgeControlledTransitiveDecisionPrecedence() {
    setLoading(true);

    try {
      const detectedPatterns = await detectMemoryPatterns();

      const recommendationsBeforeTransitivity =
        generateRecommendationsFromPatterns(detectedPatterns);

      const decisionsBeforeTransitivity =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsBeforeTransitivity
        );

      /*
       * FASE 23.30 — Transitividad contextual controlada de
       * precedencias plurales entre alternativas decisionales
       * por conocimiento operativo
       *
       * FASE 23.27 demostró coexistencia explícita:
       *
       * A -> B
       * B -> C
       *
       * sin inferir A -> C.
       *
       * FASE 23.28 y 23.29 evaluaron propiedades de
       * consistencia sin crear relaciones nuevas.
       *
       * FASE 23.30 cruza por primera vez la frontera hacia
       * una inferencia relacional controlada:
       *
       * A -> B
       * B -> C
       *
       * implica de forma transitiva:
       *
       * A -> C
       *
       * La precedencia A -> C debe permanecer claramente
       * diferenciada de las precedencias explícitas A -> B
       * y B -> C.
       *
       * Esta fase NO introduce:
       *
       * - cierre transitivo general;
       * - orden parcial formal;
       * - ordenamiento topológico;
       * - reordenamiento productivo;
       * - ranking;
       * - score derivado;
       * - ponderación;
       * - modificación de confidence;
       * - modificación de priority;
       * - selección;
       * - ejecución.
       */

      const firstDecision =
        decisionsBeforeTransitivity.find(
          (decision) =>
            decision.id === 'decision-review-movements'
        );

      const secondDecision =
        decisionsBeforeTransitivity.find(
          (decision) =>
            decision.id === 'decision-maintain-monitoring'
        );

      const thirdDecision =
        decisionsBeforeTransitivity.find(
          (decision) =>
            decision.id === 'decision-prioritize-high-value'
        );

      if (!firstDecision) {
        throw new Error(
          'FASE 23.30 no encontró decision-review-movements como alternativa A.'
        );
      }

      if (!secondDecision) {
        throw new Error(
          'FASE 23.30 no encontró decision-maintain-monitoring como alternativa B.'
        );
      }

      if (!thirdDecision) {
        throw new Error(
          'FASE 23.30 no encontró decision-prioritize-high-value como alternativa C.'
        );
      }

      if (
        firstDecision.id === secondDecision.id ||
        firstDecision.id === thirdDecision.id ||
        secondDecision.id === thirdDecision.id
      ) {
        throw new Error(
          'FASE 23.30 esperaba tres alternativas decisionales distintas.'
        );
      }

      const firstDecisionSnapshot =
        JSON.stringify(firstDecision);

      const secondDecisionSnapshot =
        JSON.stringify(secondDecision);

      const thirdDecisionSnapshot =
        JSON.stringify(thirdDecision);

      const controlledAlternativeIds: [
        string,
        string,
        string,
      ] = [
        firstDecision.id,
        secondDecision.id,
        thirdDecision.id,
      ];

      /*
       * Tres conocimientos independientes.
       *
       * K1 produce A -> B.
       * K2 produce B -> C.
       *
       * K3 produce C -> B exclusivamente para construir
       * un escenario no componible:
       *
       * A -> B
       * C -> B
       *
       * donde no debe derivarse A -> C.
       */
      const controlledPatterns = [
        {
          id: 'recommendation-deviation-pattern-reubicacion-controlled-transitivity-ab',
          title:
            'Patrón controlado de transitividad A-B',
          description:
            'Patrón controlado para producir la precedencia contextual explícita A-B.',
          score: 95,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-transitividad-ab',
          },
          evidence: {
            memoryIds: [
              'memory-controlled-transitivity-ab-1',
              'memory-controlled-transitivity-ab-2',
              'memory-controlled-transitivity-ab-3',
              'memory-controlled-transitivity-ab-4',
            ],
          },
        },
        {
          id: 'recommendation-deviation-pattern-reubicacion-controlled-transitivity-bc',
          title:
            'Patrón controlado de transitividad B-C',
          description:
            'Patrón controlado para producir la precedencia contextual explícita B-C.',
          score: 94,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-transitividad-bc',
          },
          evidence: {
            memoryIds: [
              'memory-controlled-transitivity-bc-1',
              'memory-controlled-transitivity-bc-2',
              'memory-controlled-transitivity-bc-3',
              'memory-controlled-transitivity-bc-4',
            ],
          },
        },
        {
          id: 'recommendation-deviation-pattern-reubicacion-controlled-transitivity-cb',
          title:
            'Patrón controlado no transitivo C-B',
          description:
            'Patrón controlado para producir la precedencia contextual explícita C-B dentro del escenario no componible.',
          score: 93,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-transitividad-cb',
          },
          evidence: {
            memoryIds: [
              'memory-controlled-transitivity-cb-1',
              'memory-controlled-transitivity-cb-2',
              'memory-controlled-transitivity-cb-3',
              'memory-controlled-transitivity-cb-4',
            ],
          },
        },
      ];

      const controlledKnowledge =
        generateOperationalKnowledge(controlledPatterns);

      if (controlledKnowledge.length !== 3) {
        throw new Error(
          `FASE 23.30 esperaba exactamente 3 conocimientos controlados y generó ${controlledKnowledge.length}.`
        );
      }

      const knowledgeAB =
        controlledKnowledge.find(
          (knowledge) =>
            knowledge.sourcePatternId ===
            controlledPatterns[0].id
        );

      const knowledgeBC =
        controlledKnowledge.find(
          (knowledge) =>
            knowledge.sourcePatternId ===
            controlledPatterns[1].id
        );

      const knowledgeCB =
        controlledKnowledge.find(
          (knowledge) =>
            knowledge.sourcePatternId ===
            controlledPatterns[2].id
        );

      if (
        !knowledgeAB ||
        !knowledgeBC ||
        !knowledgeCB
      ) {
        throw new Error(
          'FASE 23.30 no pudo resolver los tres conocimientos controlados.'
        );
      }

      const uniqueKnowledgeIds = new Set([
        knowledgeAB.id,
        knowledgeBC.id,
        knowledgeCB.id,
      ]);

      if (uniqueKnowledgeIds.size !== 3) {
        throw new Error(
          'FASE 23.30 esperaba tres knowledgeId independientes.'
        );
      }

      const eligibilityAB =
        evaluateOperationalKnowledgeEligibility(
          knowledgeAB,
          { movementType: 'reubicacion' }
        );

      const eligibilityBC =
        evaluateOperationalKnowledgeEligibility(
          knowledgeBC,
          { movementType: 'reubicacion' }
        );

      const eligibilityCB =
        evaluateOperationalKnowledgeEligibility(
          knowledgeCB,
          { movementType: 'reubicacion' }
        );

      const considerationAB =
        considerOperationalKnowledge(eligibilityAB);

      const considerationBC =
        considerOperationalKnowledge(eligibilityBC);

      const considerationCB =
        considerOperationalKnowledge(eligibilityCB);

      if (
        !considerationAB ||
        !considerationBC ||
        !considerationCB
      ) {
        throw new Error(
          'FASE 23.30 esperaba consideración válida para los tres conocimientos.'
        );
      }

      if (
        considerationAB.knowledgeId !== knowledgeAB.id ||
        considerationBC.knowledgeId !== knowledgeBC.id ||
        considerationCB.knowledgeId !== knowledgeCB.id
      ) {
        throw new Error(
          'FASE 23.30 perdió trazabilidad entre consideración y conocimiento.'
        );
      }

      type ControlledKnowledge =
        (typeof controlledKnowledge)[number];

      type ControlledDecisionPreference = {
        decisionIds: [string, string];
        relation:
          | 'no_contextual_preference'
          | 'contextual_preference';
        preferredDecisionId: string | null;
        knowledgeId: string | null;
        rationale: string | null;
      };

      type ControlledDecisionPrecedence = {
        decisionIds: [string, string];
        relation:
          | 'no_contextual_precedence'
          | 'contextual_precedence';
        precedingDecisionId: string | null;
        precededDecisionId: string | null;
        knowledgeId: string | null;
        rationale: string | null;
      };

      type ControlledDecisionPrecedenceCoexistence = {
        decisionIds: [string, string, string];
        relation:
          | 'no_contextual_precedence_coexistence'
          | 'contextual_precedence_coexistence';
        precedences: ControlledDecisionPrecedence[];
        rationale: string | null;
      };

      type ControlledTransitiveSourcePrecedence = {
        precedingDecisionId: string;
        precededDecisionId: string;
        knowledgeId: string;
      };

      type ControlledTransitivePrecedence = {
        decisionIds: [string, string, string];
        relation:
          | 'no_contextual_transitive_precedence'
          | 'contextual_transitive_precedence';
        precedingDecisionId: string | null;
        intermediateDecisionId: string | null;
        precededDecisionId: string | null;
        sourcePrecedences:
          | [
              ControlledTransitiveSourcePrecedence,
              ControlledTransitiveSourcePrecedence,
            ]
          | null;
        rationale: string | null;
      };

      /*
       * Consumidor local de preferencia.
       *
       * Igual que en las fases anteriores, no utiliza
       * confidence, priority ni posición productiva.
       */
      const determineControlledPreference = (
        first: OperationalDecision,
        second: OperationalDecision,
        consideredKnowledge: ControlledKnowledge | null,
        expectedDeviationReason: string,
        expectedFirstAction: string,
        expectedSecondAction: string
      ): ControlledDecisionPreference => {
        if (!consideredKnowledge) {
          return {
            decisionIds: [first.id, second.id],
            relation: 'no_contextual_preference',
            preferredDecisionId: null,
            knowledgeId: null,
            rationale: null,
          };
        }

        const knowledgeApplies =
          consideredKnowledge.context.movementType ===
            'reubicacion' &&
          consideredKnowledge.context.deviationReason ===
            expectedDeviationReason;

        const firstMatches =
          first.action === expectedFirstAction;

        const secondMatches =
          second.action === expectedSecondAction;

        if (
          !knowledgeApplies ||
          !firstMatches ||
          !secondMatches
        ) {
          return {
            decisionIds: [first.id, second.id],
            relation: 'no_contextual_preference',
            preferredDecisionId: null,
            knowledgeId: null,
            rationale: null,
          };
        }

        return {
          decisionIds: [first.id, second.id],
          relation: 'contextual_preference',
          preferredDecisionId: first.id,
          knowledgeId: consideredKnowledge.id,
          rationale:
            `El conocimiento "${consideredKnowledge.id}" ` +
            `sobre "${consideredKnowledge.context.deviationReason}" ` +
            `hace contextualmente preferible "${first.id}" ` +
            `frente a "${second.id}".`,
        };
      };

      const determineControlledPrecedence = (
        preference: ControlledDecisionPreference
      ): ControlledDecisionPrecedence => {
        if (
          preference.relation !==
            'contextual_preference' ||
          !preference.preferredDecisionId ||
          !preference.knowledgeId ||
          !preference.rationale
        ) {
          return {
            decisionIds: [
              preference.decisionIds[0],
              preference.decisionIds[1],
            ],
            relation: 'no_contextual_precedence',
            precedingDecisionId: null,
            precededDecisionId: null,
            knowledgeId: null,
            rationale: null,
          };
        }

        const [
          firstDecisionId,
          secondDecisionId,
        ] = preference.decisionIds;

        if (
          preference.preferredDecisionId !==
            firstDecisionId &&
          preference.preferredDecisionId !==
            secondDecisionId
        ) {
          return {
            decisionIds: [
              firstDecisionId,
              secondDecisionId,
            ],
            relation: 'no_contextual_precedence',
            precedingDecisionId: null,
            precededDecisionId: null,
            knowledgeId: null,
            rationale: null,
          };
        }

        const precededDecisionId =
          preference.preferredDecisionId ===
          firstDecisionId
            ? secondDecisionId
            : firstDecisionId;

        return {
          decisionIds: [
            firstDecisionId,
            secondDecisionId,
          ],
          relation: 'contextual_precedence',
          precedingDecisionId:
            preference.preferredDecisionId,
          precededDecisionId,
          knowledgeId: preference.knowledgeId,
          rationale:
            `${preference.rationale} ` +
            `La preferencia establece una precedencia contextual explícita.`,
        };
      };

      /*
       * Conserva exclusivamente dos precedencias explícitas.
       *
       * No introduce todavía ninguna inferencia.
       */
      const determineControlledPrecedenceCoexistence = (
        decisionIds: [string, string, string],
        precedences: ControlledDecisionPrecedence[]
      ): ControlledDecisionPrecedenceCoexistence => {
        const contextualPrecedences =
          precedences.filter(
            (precedence) =>
              precedence.relation ===
                'contextual_precedence' &&
              precedence.precedingDecisionId !== null &&
              precedence.precededDecisionId !== null &&
              precedence.knowledgeId !== null
          );

        if (contextualPrecedences.length !== 2) {
          return {
            decisionIds: [
              decisionIds[0],
              decisionIds[1],
              decisionIds[2],
            ],
            relation:
              'no_contextual_precedence_coexistence',
            precedences: [],
            rationale: null,
          };
        }

        return {
          decisionIds: [
            decisionIds[0],
            decisionIds[1],
            decisionIds[2],
          ],
          relation:
            'contextual_precedence_coexistence',
          precedences: [
            contextualPrecedences[0],
            contextualPrecedences[1],
          ],
          rationale:
            `Dos precedencias contextuales explícitas ` +
            `coexisten sin materializar todavía relaciones derivadas.`,
        };
      };

      /*
       * NUEVO CONSUMIDOR DE FASE 23.30.
       *
       * Recibe únicamente una coexistencia ya producida.
       *
       * No recibe OperationalKnowledge.
       * No recibe preferencias.
       * No modifica las precedencias explícitas.
       *
       * Si encuentra exactamente una composición:
       *
       * X -> Y
       * Y -> Z
       *
       * deriva:
       *
       * X -> Z
       *
       * preservando las dos precedencias causales.
       */
      const deriveControlledTransitivePrecedence = (
        coexistence: ControlledDecisionPrecedenceCoexistence
      ): ControlledTransitivePrecedence => {
        const precedences =
          coexistence.precedences.filter(
            (precedence) =>
              precedence.relation ===
                'contextual_precedence' &&
              precedence.precedingDecisionId !== null &&
              precedence.precededDecisionId !== null &&
              precedence.knowledgeId !== null
          );

        if (precedences.length !== 2) {
          return {
            decisionIds: [
              coexistence.decisionIds[0],
              coexistence.decisionIds[1],
              coexistence.decisionIds[2],
            ],
            relation:
              'no_contextual_transitive_precedence',
            precedingDecisionId: null,
            intermediateDecisionId: null,
            precededDecisionId: null,
            sourcePrecedences: null,
            rationale: null,
          };
        }

        const firstPrecedence = precedences[0];
        const secondPrecedence = precedences[1];

        if (
          !firstPrecedence ||
          !secondPrecedence ||
          !firstPrecedence.precedingDecisionId ||
          !firstPrecedence.precededDecisionId ||
          !firstPrecedence.knowledgeId ||
          !secondPrecedence.precedingDecisionId ||
          !secondPrecedence.precededDecisionId ||
          !secondPrecedence.knowledgeId
        ) {
          return {
            decisionIds: [
              coexistence.decisionIds[0],
              coexistence.decisionIds[1],
              coexistence.decisionIds[2],
            ],
            relation:
              'no_contextual_transitive_precedence',
            precedingDecisionId: null,
            intermediateDecisionId: null,
            precededDecisionId: null,
            sourcePrecedences: null,
            rationale: null,
          };
        }

        const composesForward =
          firstPrecedence.precededDecisionId ===
            secondPrecedence.precedingDecisionId;

        const composesReverse =
          secondPrecedence.precededDecisionId ===
            firstPrecedence.precedingDecisionId;

        if (composesForward) {
          return {
            decisionIds: [
              coexistence.decisionIds[0],
              coexistence.decisionIds[1],
              coexistence.decisionIds[2],
            ],
            relation:
              'contextual_transitive_precedence',
            precedingDecisionId:
              firstPrecedence.precedingDecisionId,
            intermediateDecisionId:
              firstPrecedence.precededDecisionId,
            precededDecisionId:
              secondPrecedence.precededDecisionId,
            sourcePrecedences: [
              {
                precedingDecisionId:
                  firstPrecedence.precedingDecisionId,
                precededDecisionId:
                  firstPrecedence.precededDecisionId,
                knowledgeId:
                  firstPrecedence.knowledgeId,
              },
              {
                precedingDecisionId:
                  secondPrecedence.precedingDecisionId,
                precededDecisionId:
                  secondPrecedence.precededDecisionId,
                knowledgeId:
                  secondPrecedence.knowledgeId,
              },
            ],
            rationale:
              `Las precedencias explícitas ` +
              `"${firstPrecedence.precedingDecisionId}" -> ` +
              `"${firstPrecedence.precededDecisionId}" y ` +
              `"${secondPrecedence.precedingDecisionId}" -> ` +
              `"${secondPrecedence.precededDecisionId}" ` +
              `comparten la alternativa intermedia ` +
              `"${firstPrecedence.precededDecisionId}" y permiten ` +
              `derivar controladamente ` +
              `"${firstPrecedence.precedingDecisionId}" -> ` +
              `"${secondPrecedence.precededDecisionId}".`,
          };
        }

        if (composesReverse) {
          return {
            decisionIds: [
              coexistence.decisionIds[0],
              coexistence.decisionIds[1],
              coexistence.decisionIds[2],
            ],
            relation:
              'contextual_transitive_precedence',
            precedingDecisionId:
              secondPrecedence.precedingDecisionId,
            intermediateDecisionId:
              secondPrecedence.precededDecisionId,
            precededDecisionId:
              firstPrecedence.precededDecisionId,
            sourcePrecedences: [
              {
                precedingDecisionId:
                  secondPrecedence.precedingDecisionId,
                precededDecisionId:
                  secondPrecedence.precededDecisionId,
                knowledgeId:
                  secondPrecedence.knowledgeId,
              },
              {
                precedingDecisionId:
                  firstPrecedence.precedingDecisionId,
                precededDecisionId:
                  firstPrecedence.precededDecisionId,
                knowledgeId:
                  firstPrecedence.knowledgeId,
              },
            ],
            rationale:
              `Las dos precedencias explícitas son componibles ` +
              `en dirección inversa a su orden de almacenamiento y ` +
              `permiten una única derivación transitiva controlada.`,
          };
        }

        return {
          decisionIds: [
            coexistence.decisionIds[0],
            coexistence.decisionIds[1],
            coexistence.decisionIds[2],
          ],
          relation:
            'no_contextual_transitive_precedence',
          precedingDecisionId: null,
          intermediateDecisionId: null,
          precededDecisionId: null,
          sourcePrecedences: null,
          rationale:
            `Las precedencias explícitas no comparten una ` +
            `alternativa intermedia compatible y no producen ` +
            `derivación transitiva.`,
        };
      };

      /*
       * Escenario transitivo:
       *
       * A -> B
       * B -> C
       */
      const preferenceAB =
        determineControlledPreference(
          firstDecision,
          secondDecision,
          knowledgeAB,
          'motivo-controlado-transitividad-ab',
          firstDecision.action,
          secondDecision.action
        );

      const preferenceBC =
        determineControlledPreference(
          secondDecision,
          thirdDecision,
          knowledgeBC,
          'motivo-controlado-transitividad-bc',
          secondDecision.action,
          thirdDecision.action
        );

      /*
       * Escenario no componible:
       *
       * A -> B
       * C -> B
       */
      const preferenceCB =
        determineControlledPreference(
          thirdDecision,
          secondDecision,
          knowledgeCB,
          'motivo-controlado-transitividad-cb',
          thirdDecision.action,
          secondDecision.action
        );

      const precedenceAB =
        determineControlledPrecedence(preferenceAB);

      const precedenceBC =
        determineControlledPrecedence(preferenceBC);

      const precedenceCB =
        determineControlledPrecedence(preferenceCB);

      const transitiveCoexistence =
        determineControlledPrecedenceCoexistence(
          controlledAlternativeIds,
          [precedenceAB, precedenceBC]
        );

      const nonComposableCoexistence =
        determineControlledPrecedenceCoexistence(
          controlledAlternativeIds,
          [precedenceAB, precedenceCB]
        );

      const transitivePrecedence =
        deriveControlledTransitivePrecedence(
          transitiveCoexistence
        );

      const nonTransitivePrecedence =
        deriveControlledTransitivePrecedence(
          nonComposableCoexistence
        );

      if (
        preferenceAB.relation !==
          'contextual_preference' ||
        preferenceBC.relation !==
          'contextual_preference' ||
        preferenceCB.relation !==
          'contextual_preference'
      ) {
        throw new Error(
          'FASE 23.30 no produjo las tres preferencias contextuales controladas.'
        );
      }

      if (
        precedenceAB.relation !==
          'contextual_precedence' ||
        precedenceBC.relation !==
          'contextual_precedence' ||
        precedenceCB.relation !==
          'contextual_precedence'
      ) {
        throw new Error(
          'FASE 23.30 no produjo las tres precedencias explícitas esperadas.'
        );
      }

      if (
        precedenceAB.precedingDecisionId !==
          firstDecision.id ||
        precedenceAB.precededDecisionId !==
          secondDecision.id ||
        precedenceBC.precedingDecisionId !==
          secondDecision.id ||
        precedenceBC.precededDecisionId !==
          thirdDecision.id ||
        precedenceCB.precedingDecisionId !==
          thirdDecision.id ||
        precedenceCB.precededDecisionId !==
          secondDecision.id
      ) {
        throw new Error(
          'FASE 23.30 produjo una dirección incorrecta en alguna precedencia explícita.'
        );
      }

      if (
        precedenceAB.knowledgeId !== knowledgeAB.id ||
        precedenceBC.knowledgeId !== knowledgeBC.id ||
        precedenceCB.knowledgeId !== knowledgeCB.id
      ) {
        throw new Error(
          'FASE 23.30 perdió atribución individual de las precedencias explícitas.'
        );
      }

      /*
       * El escenario A -> B / C -> B no es componible.
       */
      if (
        nonTransitivePrecedence.relation !==
          'no_contextual_transitive_precedence' ||
        nonTransitivePrecedence.precedingDecisionId !==
          null ||
        nonTransitivePrecedence.intermediateDecisionId !==
          null ||
        nonTransitivePrecedence.precededDecisionId !==
          null ||
        nonTransitivePrecedence.sourcePrecedences !== null
      ) {
        throw new Error(
          'FASE 23.30 produjo transitividad artificial en el escenario no componible A-B / C-B.'
        );
      }

      /*
       * A -> B + B -> C debe derivar exactamente A -> C.
       */
      if (
        transitivePrecedence.relation !==
          'contextual_transitive_precedence'
      ) {
        throw new Error(
          'FASE 23.30 no produjo una precedencia transitiva contextual.'
        );
      }

      if (
        transitivePrecedence.precedingDecisionId !==
          firstDecision.id ||
        transitivePrecedence.intermediateDecisionId !==
          secondDecision.id ||
        transitivePrecedence.precededDecisionId !==
          thirdDecision.id
      ) {
        throw new Error(
          'FASE 23.30 derivó una relación distinta de A-B-C => A-C.'
        );
      }

      if (!transitivePrecedence.sourcePrecedences) {
        throw new Error(
          'FASE 23.30 perdió las precedencias causales de la derivación transitiva.'
        );
      }

      const [
        firstSourcePrecedence,
        secondSourcePrecedence,
      ] = transitivePrecedence.sourcePrecedences;

      if (
        firstSourcePrecedence.precedingDecisionId !==
          firstDecision.id ||
        firstSourcePrecedence.precededDecisionId !==
          secondDecision.id ||
        firstSourcePrecedence.knowledgeId !==
          knowledgeAB.id ||
        secondSourcePrecedence.precedingDecisionId !==
          secondDecision.id ||
        secondSourcePrecedence.precededDecisionId !==
          thirdDecision.id ||
        secondSourcePrecedence.knowledgeId !==
          knowledgeBC.id
      ) {
        throw new Error(
          'FASE 23.30 perdió trazabilidad causal entre A-B, B-C y la derivación A-C.'
        );
      }

      /*
       * La precedencia derivada NO debe insertarse dentro de
       * las precedencias explícitas coexistentes.
       */
      if (
        transitiveCoexistence.precedences.length !== 2
      ) {
        throw new Error(
          'FASE 23.30 modificó la cardinalidad de las precedencias explícitas coexistentes.'
        );
      }

      const derivedInsertedAsExplicit =
        transitiveCoexistence.precedences.some(
          (precedence) =>
            precedence.precedingDecisionId ===
              firstDecision.id &&
            precedence.precededDecisionId ===
              thirdDecision.id
        );

      if (derivedInsertedAsExplicit) {
        throw new Error(
          'FASE 23.30 materializó A-C dentro de las precedencias explícitas y perdió la distinción entre relación fuente y relación derivada.'
        );
      }

      /*
       * No debe fabricarse un knowledgeId agregado para A -> C.
       */
      if (
        'knowledgeId' in transitivePrecedence ||
        'sourcePatternId' in transitivePrecedence ||
        'memoryIds' in transitivePrecedence ||
        'occurrences' in transitivePrecedence
      ) {
        throw new Error(
          'FASE 23.30 atribuyó globalmente la relación derivada a un conocimiento artificial.'
        );
      }

      /*
       * Guardas contra conceptos posteriores.
       */
      if (
        'closure' in transitivePrecedence ||
        'transitiveClosure' in transitivePrecedence ||
        'partialOrder' in transitivePrecedence ||
        'orderedDecisionIds' in transitivePrecedence ||
        'sortedDecisionIds' in transitivePrecedence ||
        'order' in transitivePrecedence ||
        'rank' in transitivePrecedence ||
        'ranking' in transitivePrecedence ||
        'position' in transitivePrecedence ||
        'score' in transitivePrecedence ||
        'weight' in transitivePrecedence ||
        'confidence' in transitivePrecedence ||
        'priority' in transitivePrecedence ||
        'winner' in transitivePrecedence ||
        'loser' in transitivePrecedence ||
        'selected' in transitivePrecedence ||
        'selection' in transitivePrecedence ||
        'executed' in transitivePrecedence ||
        'execution' in transitivePrecedence
      ) {
        throw new Error(
          'FASE 23.30 detectó atributos de cierre transitivo, orden parcial, ranking, ponderación, selección o ejecución.'
        );
      }

      if (
        JSON.stringify(
          transitiveCoexistence.precedences
        ) !==
        JSON.stringify([
          precedenceAB,
          precedenceBC,
        ])
      ) {
        throw new Error(
          'FASE 23.30 modificó las precedencias explícitas durante la derivación transitiva.'
        );
      }

      /*
       * Las alternativas productivas deben permanecer intactas.
       */
      const recommendationsAfterTransitivity =
        generateRecommendationsFromPatterns(detectedPatterns);

      const decisionsAfterTransitivity =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsAfterTransitivity
        );

      if (
        JSON.stringify(
          recommendationsBeforeTransitivity
        ) !==
        JSON.stringify(
          recommendationsAfterTransitivity
        )
      ) {
        throw new Error(
          'FASE 23.30 detectó modificación de recomendaciones productivas.'
        );
      }

      if (
        JSON.stringify(
          decisionsBeforeTransitivity
        ) !==
        JSON.stringify(
          decisionsAfterTransitivity
        )
      ) {
        throw new Error(
          'FASE 23.30 detectó modificación, reordenamiento o ranking distinto de decisiones productivas.'
        );
      }

      const firstDecisionAfter =
        decisionsAfterTransitivity.find(
          (decision) =>
            decision.id === firstDecision.id
        );

      const secondDecisionAfter =
        decisionsAfterTransitivity.find(
          (decision) =>
            decision.id === secondDecision.id
        );

      const thirdDecisionAfter =
        decisionsAfterTransitivity.find(
          (decision) =>
            decision.id === thirdDecision.id
        );

      if (
        !firstDecisionAfter ||
        !secondDecisionAfter ||
        !thirdDecisionAfter
      ) {
        throw new Error(
          'FASE 23.30 perdió alguna alternativa productiva después del experimento.'
        );
      }

      if (
        JSON.stringify(firstDecisionAfter) !==
          firstDecisionSnapshot ||
        JSON.stringify(secondDecisionAfter) !==
          secondDecisionSnapshot ||
        JSON.stringify(thirdDecisionAfter) !==
          thirdDecisionSnapshot
      ) {
        throw new Error(
          'FASE 23.30 alteró indirectamente alguna alternativa decisional productiva.'
        );
      }

      addLog(
        `FASE 23.30 OK: sobre las mismas tres alternativas ${firstDecision.id}, ${secondDecision.id} y ${thirdDecision.id}, las precedencias explícitas ${firstDecision.id} -> ${secondDecision.id} mediante ${knowledgeAB.id} y ${secondDecision.id} -> ${thirdDecision.id} mediante ${knowledgeBC.id} permitieron derivar transitivamente ${firstDecision.id} -> ${thirdDecision.id} conservando ${secondDecision.id} como alternativa intermedia y manteniendo separada la relación derivada de sus dos precedencias causales; el escenario ${firstDecision.id} -> ${secondDecision.id} junto con ${thirdDecision.id} -> ${secondDecision.id} no produjo transitividad artificial, y la fase no introdujo cierre transitivo general, orden parcial, reordenamiento, rank, score, modificación de confidence o priority, selección ni ejecución, permaneciendo intactas ${recommendationsAfterTransitivity.length} recomendaciones y ${decisionsAfterTransitivity.length} decisiones productivas.`
      );
    } catch (error) {
      console.error(error);

      addLog(
        error instanceof Error
          ? `Error en transitividad contextual controlada de precedencias 23.30: ${error.message}`
          : 'Error inesperado en transitividad contextual controlada de precedencias 23.30.'
      );
    } finally {
      setLoading(false);
    }
  }

  async function testOperationalKnowledgeControlledExplicitDerivedPrecedenceConsistency() {
    setLoading(true);

    try {
      const detectedPatterns = await detectMemoryPatterns();

      const recommendationsBeforeConsistency =
        generateRecommendationsFromPatterns(
          detectedPatterns
        );

      const decisionsBeforeConsistency =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsBeforeConsistency
        );

      /*
       * FASE 23.31 — Consistencia contextual controlada entre
       * precedencias explícitas y transitivas derivadas por
       * conocimiento operativo.
       *
       * FASE 23.30 introdujo:
       *
       * A -> B explícita
       * B -> C explícita
       *
       * y permitió derivar:
       *
       * A -> C derivada
       *
       * manteniendo la relación derivada separada de las
       * precedencias explícitas que la sustentan.
       *
       * FASE 23.31 evalúa ahora la convivencia directa entre
       * esa relación derivada y una precedencia explícita.
       *
       * Escenario compatible:
       *
       * A -> C derivada
       * A -> C explícita
       *
       * Escenario incompatible:
       *
       * A -> C derivada
       * C -> A explícita
       *
       * La evaluación NO:
       *
       * - convierte la relación derivada en explícita;
       * - realimenta la derivación transitiva;
       * - crea nuevas precedencias;
       * - ejecuta cierre transitivo;
       * - construye un orden parcial;
       * - reordena decisiones;
       * - introduce ranking;
       * - introduce score derivado;
       * - modifica confidence;
       * - modifica priority;
       * - selecciona;
       * - ejecuta.
       */

      const firstDecision =
        decisionsBeforeConsistency.find(
          (decision) =>
            decision.id === 'decision-review-movements'
        );

      const secondDecision =
        decisionsBeforeConsistency.find(
          (decision) =>
            decision.id === 'decision-maintain-monitoring'
        );

      const thirdDecision =
        decisionsBeforeConsistency.find(
          (decision) =>
            decision.id === 'decision-prioritize-high-value'
        );

      if (!firstDecision) {
        throw new Error(
          'FASE 23.31 no encontró decision-review-movements como alternativa A.'
        );
      }

      if (!secondDecision) {
        throw new Error(
          'FASE 23.31 no encontró decision-maintain-monitoring como alternativa B.'
        );
      }

      if (!thirdDecision) {
        throw new Error(
          'FASE 23.31 no encontró decision-prioritize-high-value como alternativa C.'
        );
      }

      if (
        firstDecision.id === secondDecision.id ||
        firstDecision.id === thirdDecision.id ||
        secondDecision.id === thirdDecision.id
      ) {
        throw new Error(
          'FASE 23.31 esperaba tres alternativas decisionales distintas.'
        );
      }

      const firstDecisionSnapshot =
        JSON.stringify(firstDecision);

      const secondDecisionSnapshot =
        JSON.stringify(secondDecision);

      const thirdDecisionSnapshot =
        JSON.stringify(thirdDecision);

      const controlledAlternativeIds: [
        string,
        string,
        string,
      ] = [
        firstDecision.id,
        secondDecision.id,
        thirdDecision.id,
      ];

      /*
       * Cuatro conocimientos independientes:
       *
       * K1 -> A -> B
       * K2 -> B -> C
       *
       * K1 + K2 permiten derivar A -> C.
       *
       * K3 -> A -> C explícita y compatible.
       * K4 -> C -> A explícita e incompatible.
       */
      const controlledPatterns = [
        {
          id: 'recommendation-deviation-pattern-reubicacion-controlled-explicit-derived-consistency-ab',
          title:
            'Patrón controlado explícito-derivado A-B',
          description:
            'Patrón controlado para producir la precedencia contextual explícita A-B.',
          score: 96,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-explicit-derived-consistency-ab',
          },
          evidence: {
            memoryIds: [
              'memory-controlled-explicit-derived-consistency-ab-1',
              'memory-controlled-explicit-derived-consistency-ab-2',
              'memory-controlled-explicit-derived-consistency-ab-3',
              'memory-controlled-explicit-derived-consistency-ab-4',
            ],
          },
        },
        {
          id: 'recommendation-deviation-pattern-reubicacion-controlled-explicit-derived-consistency-bc',
          title:
            'Patrón controlado explícito-derivado B-C',
          description:
            'Patrón controlado para producir la precedencia contextual explícita B-C.',
          score: 95,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-explicit-derived-consistency-bc',
          },
          evidence: {
            memoryIds: [
              'memory-controlled-explicit-derived-consistency-bc-1',
              'memory-controlled-explicit-derived-consistency-bc-2',
              'memory-controlled-explicit-derived-consistency-bc-3',
              'memory-controlled-explicit-derived-consistency-bc-4',
            ],
          },
        },
        {
          id: 'recommendation-deviation-pattern-reubicacion-controlled-explicit-derived-consistency-ac',
          title:
            'Patrón controlado explícito compatible A-C',
          description:
            'Patrón controlado para producir una precedencia contextual explícita A-C compatible con la relación A-C derivada.',
          score: 94,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-explicit-derived-consistency-ac',
          },
          evidence: {
            memoryIds: [
              'memory-controlled-explicit-derived-consistency-ac-1',
              'memory-controlled-explicit-derived-consistency-ac-2',
              'memory-controlled-explicit-derived-consistency-ac-3',
              'memory-controlled-explicit-derived-consistency-ac-4',
            ],
          },
        },
        {
          id: 'recommendation-deviation-pattern-reubicacion-controlled-explicit-derived-consistency-ca',
          title:
            'Patrón controlado explícito contradictorio C-A',
          description:
            'Patrón controlado para producir una precedencia contextual explícita C-A contradictoria frente a la relación A-C derivada.',
          score: 93,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-explicit-derived-consistency-ca',
          },
          evidence: {
            memoryIds: [
              'memory-controlled-explicit-derived-consistency-ca-1',
              'memory-controlled-explicit-derived-consistency-ca-2',
              'memory-controlled-explicit-derived-consistency-ca-3',
              'memory-controlled-explicit-derived-consistency-ca-4',
            ],
          },
        },
      ];

      const controlledKnowledge =
        generateOperationalKnowledge(controlledPatterns);

      if (controlledKnowledge.length !== 4) {
        throw new Error(
          `FASE 23.31 esperaba exactamente 4 conocimientos controlados y generó ${controlledKnowledge.length}.`
        );
      }

      const knowledgeAB =
        controlledKnowledge.find(
          (knowledge) =>
            knowledge.sourcePatternId ===
            controlledPatterns[0].id
        );

      const knowledgeBC =
        controlledKnowledge.find(
          (knowledge) =>
            knowledge.sourcePatternId ===
            controlledPatterns[1].id
        );

      const knowledgeAC =
        controlledKnowledge.find(
          (knowledge) =>
            knowledge.sourcePatternId ===
            controlledPatterns[2].id
        );

      const knowledgeCA =
        controlledKnowledge.find(
          (knowledge) =>
            knowledge.sourcePatternId ===
            controlledPatterns[3].id
        );

      if (
        !knowledgeAB ||
        !knowledgeBC ||
        !knowledgeAC ||
        !knowledgeCA
      ) {
        throw new Error(
          'FASE 23.31 no pudo resolver los cuatro conocimientos controlados.'
        );
      }

      const uniqueKnowledgeIds = new Set([
        knowledgeAB.id,
        knowledgeBC.id,
        knowledgeAC.id,
        knowledgeCA.id,
      ]);

      if (uniqueKnowledgeIds.size !== 4) {
        throw new Error(
          'FASE 23.31 esperaba cuatro knowledgeId independientes.'
        );
      }

      const eligibilityAB =
        evaluateOperationalKnowledgeEligibility(
          knowledgeAB,
          { movementType: 'reubicacion' }
        );

      const eligibilityBC =
        evaluateOperationalKnowledgeEligibility(
          knowledgeBC,
          { movementType: 'reubicacion' }
        );

      const eligibilityAC =
        evaluateOperationalKnowledgeEligibility(
          knowledgeAC,
          { movementType: 'reubicacion' }
        );

      const eligibilityCA =
        evaluateOperationalKnowledgeEligibility(
          knowledgeCA,
          { movementType: 'reubicacion' }
        );

      const considerationAB =
        considerOperationalKnowledge(eligibilityAB);

      const considerationBC =
        considerOperationalKnowledge(eligibilityBC);

      const considerationAC =
        considerOperationalKnowledge(eligibilityAC);

      const considerationCA =
        considerOperationalKnowledge(eligibilityCA);

      if (
        !considerationAB ||
        !considerationBC ||
        !considerationAC ||
        !considerationCA
      ) {
        throw new Error(
          'FASE 23.31 esperaba consideración válida para los cuatro conocimientos.'
        );
      }

      if (
        considerationAB.knowledgeId !== knowledgeAB.id ||
        considerationBC.knowledgeId !== knowledgeBC.id ||
        considerationAC.knowledgeId !== knowledgeAC.id ||
        considerationCA.knowledgeId !== knowledgeCA.id
      ) {
        throw new Error(
          'FASE 23.31 perdió trazabilidad entre consideración y conocimiento.'
        );
      }

      type ControlledKnowledge =
        (typeof controlledKnowledge)[number];

      type ControlledDecisionPreference = {
        decisionIds: [string, string];
        relation:
          | 'no_contextual_preference'
          | 'contextual_preference';
        preferredDecisionId: string | null;
        knowledgeId: string | null;
        rationale: string | null;
      };

      type ControlledDecisionPrecedence = {
        decisionIds: [string, string];
        relation:
          | 'no_contextual_precedence'
          | 'contextual_precedence';
        precedingDecisionId: string | null;
        precededDecisionId: string | null;
        knowledgeId: string | null;
        rationale: string | null;
      };

      type ControlledDecisionPrecedenceCoexistence = {
        decisionIds: [string, string, string];
        relation:
          | 'no_contextual_precedence_coexistence'
          | 'contextual_precedence_coexistence';
        precedences: ControlledDecisionPrecedence[];
        rationale: string | null;
      };

      type ControlledTransitiveSourcePrecedence = {
        precedingDecisionId: string;
        precededDecisionId: string;
        knowledgeId: string;
      };

      type ControlledTransitivePrecedence = {
        decisionIds: [string, string, string];
        relation:
          | 'no_contextual_transitive_precedence'
          | 'contextual_transitive_precedence';
        precedingDecisionId: string | null;
        intermediateDecisionId: string | null;
        precededDecisionId: string | null;
        sourcePrecedences:
          | [
              ControlledTransitiveSourcePrecedence,
              ControlledTransitiveSourcePrecedence,
            ]
          | null;
        rationale: string | null;
      };

      type ControlledExplicitDerivedPrecedenceConflict = {
        derivedPrecedence: {
          precedingDecisionId: string;
          intermediateDecisionId: string;
          precededDecisionId: string;
          sourcePrecedences: [
            ControlledTransitiveSourcePrecedence,
            ControlledTransitiveSourcePrecedence,
          ];
        };
        explicitPrecedence: {
          precedingDecisionId: string;
          precededDecisionId: string;
          knowledgeId: string;
        };
      };

      type ControlledExplicitDerivedPrecedenceConsistency = {
        decisionIds: [string, string, string];
        relation:
          | 'contextual_explicit_derived_precedence_consistent'
          | 'contextual_explicit_derived_precedence_inconsistent';
        consistent: boolean;
        conflict:
          | ControlledExplicitDerivedPrecedenceConflict
          | null;
        rationale: string;
      };

      const determineControlledPreference = (
        first: OperationalDecision,
        second: OperationalDecision,
        consideredKnowledge: ControlledKnowledge | null,
        expectedDeviationReason: string,
        expectedFirstAction: string,
        expectedSecondAction: string
      ): ControlledDecisionPreference => {
        if (!consideredKnowledge) {
          return {
            decisionIds: [first.id, second.id],
            relation: 'no_contextual_preference',
            preferredDecisionId: null,
            knowledgeId: null,
            rationale: null,
          };
        }

        const knowledgeApplies =
          consideredKnowledge.context.movementType ===
            'reubicacion' &&
          consideredKnowledge.context.deviationReason ===
            expectedDeviationReason;

        const firstMatches =
          first.action === expectedFirstAction;

        const secondMatches =
          second.action === expectedSecondAction;

        if (
          !knowledgeApplies ||
          !firstMatches ||
          !secondMatches
        ) {
          return {
            decisionIds: [first.id, second.id],
            relation: 'no_contextual_preference',
            preferredDecisionId: null,
            knowledgeId: null,
            rationale: null,
          };
        }

        return {
          decisionIds: [first.id, second.id],
          relation: 'contextual_preference',
          preferredDecisionId: first.id,
          knowledgeId: consideredKnowledge.id,
          rationale:
            `El conocimiento "${consideredKnowledge.id}" ` +
            `hace contextualmente preferible "${first.id}" ` +
            `frente a "${second.id}".`,
        };
      };

      const determineControlledPrecedence = (
        preference: ControlledDecisionPreference
      ): ControlledDecisionPrecedence => {
        if (
          preference.relation !==
            'contextual_preference' ||
          !preference.preferredDecisionId ||
          !preference.knowledgeId ||
          !preference.rationale
        ) {
          return {
            decisionIds: [
              preference.decisionIds[0],
              preference.decisionIds[1],
            ],
            relation: 'no_contextual_precedence',
            precedingDecisionId: null,
            precededDecisionId: null,
            knowledgeId: null,
            rationale: null,
          };
        }

        const [
          firstDecisionId,
          secondDecisionId,
        ] = preference.decisionIds;

        if (
          preference.preferredDecisionId !==
            firstDecisionId &&
          preference.preferredDecisionId !==
            secondDecisionId
        ) {
          return {
            decisionIds: [
              firstDecisionId,
              secondDecisionId,
            ],
            relation: 'no_contextual_precedence',
            precedingDecisionId: null,
            precededDecisionId: null,
            knowledgeId: null,
            rationale: null,
          };
        }

        return {
          decisionIds: [
            firstDecisionId,
            secondDecisionId,
          ],
          relation: 'contextual_precedence',
          precedingDecisionId:
            preference.preferredDecisionId,
          precededDecisionId:
            preference.preferredDecisionId ===
            firstDecisionId
              ? secondDecisionId
              : firstDecisionId,
          knowledgeId: preference.knowledgeId,
          rationale:
            `${preference.rationale} ` +
            `La preferencia establece una precedencia contextual explícita.`,
        };
      };

      const determineControlledPrecedenceCoexistence = (
        decisionIds: [string, string, string],
        precedences: ControlledDecisionPrecedence[]
      ): ControlledDecisionPrecedenceCoexistence => {
        const contextualPrecedences =
          precedences.filter(
            (precedence) =>
              precedence.relation ===
                'contextual_precedence' &&
              precedence.precedingDecisionId !== null &&
              precedence.precededDecisionId !== null &&
              precedence.knowledgeId !== null
          );

        if (contextualPrecedences.length !== 2) {
          return {
            decisionIds: [
              decisionIds[0],
              decisionIds[1],
              decisionIds[2],
            ],
            relation:
              'no_contextual_precedence_coexistence',
            precedences: [],
            rationale: null,
          };
        }

        return {
          decisionIds: [
            decisionIds[0],
            decisionIds[1],
            decisionIds[2],
          ],
          relation:
            'contextual_precedence_coexistence',
          precedences: [
            contextualPrecedences[0],
            contextualPrecedences[1],
          ],
          rationale:
            `Dos precedencias contextuales explícitas ` +
            `coexisten sin materializar relaciones derivadas.`,
        };
      };

      const deriveControlledTransitivePrecedence = (
        coexistence: ControlledDecisionPrecedenceCoexistence
      ): ControlledTransitivePrecedence => {
        const precedences =
          coexistence.precedences.filter(
            (precedence) =>
              precedence.relation ===
                'contextual_precedence' &&
              precedence.precedingDecisionId !== null &&
              precedence.precededDecisionId !== null &&
              precedence.knowledgeId !== null
          );

        if (precedences.length !== 2) {
          return {
            decisionIds: [
              coexistence.decisionIds[0],
              coexistence.decisionIds[1],
              coexistence.decisionIds[2],
            ],
            relation:
              'no_contextual_transitive_precedence',
            precedingDecisionId: null,
            intermediateDecisionId: null,
            precededDecisionId: null,
            sourcePrecedences: null,
            rationale: null,
          };
        }

        const firstPrecedence = precedences[0];
        const secondPrecedence = precedences[1];

        if (
          !firstPrecedence ||
          !secondPrecedence ||
          !firstPrecedence.precedingDecisionId ||
          !firstPrecedence.precededDecisionId ||
          !firstPrecedence.knowledgeId ||
          !secondPrecedence.precedingDecisionId ||
          !secondPrecedence.precededDecisionId ||
          !secondPrecedence.knowledgeId
        ) {
          return {
            decisionIds: [
              coexistence.decisionIds[0],
              coexistence.decisionIds[1],
              coexistence.decisionIds[2],
            ],
            relation:
              'no_contextual_transitive_precedence',
            precedingDecisionId: null,
            intermediateDecisionId: null,
            precededDecisionId: null,
            sourcePrecedences: null,
            rationale: null,
          };
        }

        const composesForward =
          firstPrecedence.precededDecisionId ===
            secondPrecedence.precedingDecisionId;

        const composesReverse =
          secondPrecedence.precededDecisionId ===
            firstPrecedence.precedingDecisionId;

        if (composesForward) {
          return {
            decisionIds: [
              coexistence.decisionIds[0],
              coexistence.decisionIds[1],
              coexistence.decisionIds[2],
            ],
            relation:
              'contextual_transitive_precedence',
            precedingDecisionId:
              firstPrecedence.precedingDecisionId,
            intermediateDecisionId:
              firstPrecedence.precededDecisionId,
            precededDecisionId:
              secondPrecedence.precededDecisionId,
            sourcePrecedences: [
              {
                precedingDecisionId:
                  firstPrecedence.precedingDecisionId,
                precededDecisionId:
                  firstPrecedence.precededDecisionId,
                knowledgeId:
                  firstPrecedence.knowledgeId,
              },
              {
                precedingDecisionId:
                  secondPrecedence.precedingDecisionId,
                precededDecisionId:
                  secondPrecedence.precededDecisionId,
                knowledgeId:
                  secondPrecedence.knowledgeId,
              },
            ],
            rationale:
              `Dos precedencias explícitas componibles ` +
              `permiten una única derivación transitiva controlada.`,
          };
        }

        if (composesReverse) {
          return {
            decisionIds: [
              coexistence.decisionIds[0],
              coexistence.decisionIds[1],
              coexistence.decisionIds[2],
            ],
            relation:
              'contextual_transitive_precedence',
            precedingDecisionId:
              secondPrecedence.precedingDecisionId,
            intermediateDecisionId:
              secondPrecedence.precededDecisionId,
            precededDecisionId:
              firstPrecedence.precededDecisionId,
            sourcePrecedences: [
              {
                precedingDecisionId:
                  secondPrecedence.precedingDecisionId,
                precededDecisionId:
                  secondPrecedence.precededDecisionId,
                knowledgeId:
                  secondPrecedence.knowledgeId,
              },
              {
                precedingDecisionId:
                  firstPrecedence.precedingDecisionId,
                precededDecisionId:
                  firstPrecedence.precededDecisionId,
                knowledgeId:
                  firstPrecedence.knowledgeId,
              },
            ],
            rationale:
              `Dos precedencias explícitas componibles ` +
              `permiten una única derivación transitiva controlada.`,
          };
        }

        return {
          decisionIds: [
            coexistence.decisionIds[0],
            coexistence.decisionIds[1],
            coexistence.decisionIds[2],
          ],
          relation:
            'no_contextual_transitive_precedence',
          precedingDecisionId: null,
          intermediateDecisionId: null,
          precededDecisionId: null,
          sourcePrecedences: null,
          rationale: null,
        };
      };

      /*
       * NUEVO CONSUMIDOR DE FASE 23.31.
       *
       * Recibe una relación transitiva ya derivada y una
       * precedencia explícita ya producida.
       *
       * Únicamente evalúa su compatibilidad direccional.
       *
       * No transforma ninguno de los dos objetos recibidos.
       * No genera una nueva precedencia.
       * No realimenta la transitividad.
       */
      const evaluateControlledExplicitDerivedPrecedenceConsistency = (
        derivedPrecedence: ControlledTransitivePrecedence,
        explicitPrecedence: ControlledDecisionPrecedence
      ): ControlledExplicitDerivedPrecedenceConsistency => {
        const derivedIsValid =
          derivedPrecedence.relation ===
            'contextual_transitive_precedence' &&
          derivedPrecedence.precedingDecisionId !== null &&
          derivedPrecedence.intermediateDecisionId !== null &&
          derivedPrecedence.precededDecisionId !== null &&
          derivedPrecedence.sourcePrecedences !== null;

        const explicitIsValid =
          explicitPrecedence.relation ===
            'contextual_precedence' &&
          explicitPrecedence.precedingDecisionId !== null &&
          explicitPrecedence.precededDecisionId !== null &&
          explicitPrecedence.knowledgeId !== null;

        if (!derivedIsValid || !explicitIsValid) {
          return {
            decisionIds: [
              derivedPrecedence.decisionIds[0],
              derivedPrecedence.decisionIds[1],
              derivedPrecedence.decisionIds[2],
            ],
            relation:
              'contextual_explicit_derived_precedence_consistent',
            consistent: true,
            conflict: null,
            rationale:
              `No existe una pareja explícita-derivada válida ` +
              `sobre la cual detectar contradicción direccional directa.`,
          };
        }

        const isDirectContradiction =
          derivedPrecedence.precedingDecisionId ===
            explicitPrecedence.precededDecisionId &&
          derivedPrecedence.precededDecisionId ===
            explicitPrecedence.precedingDecisionId;

        if (isDirectContradiction) {
          return {
            decisionIds: [
              derivedPrecedence.decisionIds[0],
              derivedPrecedence.decisionIds[1],
              derivedPrecedence.decisionIds[2],
            ],
            relation:
              'contextual_explicit_derived_precedence_inconsistent',
            consistent: false,
            conflict: {
              derivedPrecedence: {
                precedingDecisionId:
                  derivedPrecedence.precedingDecisionId!,
                intermediateDecisionId:
                  derivedPrecedence.intermediateDecisionId!,
                precededDecisionId:
                  derivedPrecedence.precededDecisionId!,
                sourcePrecedences: [
                  derivedPrecedence.sourcePrecedences![0],
                  derivedPrecedence.sourcePrecedences![1],
                ],
              },
              explicitPrecedence: {
                precedingDecisionId:
                  explicitPrecedence.precedingDecisionId!,
                precededDecisionId:
                  explicitPrecedence.precededDecisionId!,
                knowledgeId:
                  explicitPrecedence.knowledgeId!,
              },
            },
            rationale:
              `Se detectó una contradicción direccional directa ` +
              `entre la precedencia transitiva derivada ` +
              `"${derivedPrecedence.precedingDecisionId}" -> ` +
              `"${derivedPrecedence.precededDecisionId}" y la ` +
              `precedencia explícita ` +
              `"${explicitPrecedence.precedingDecisionId}" -> ` +
              `"${explicitPrecedence.precededDecisionId}".`,
          };
        }

        return {
          decisionIds: [
            derivedPrecedence.decisionIds[0],
            derivedPrecedence.decisionIds[1],
            derivedPrecedence.decisionIds[2],
          ],
          relation:
            'contextual_explicit_derived_precedence_consistent',
          consistent: true,
          conflict: null,
          rationale:
            `La precedencia transitiva derivada y la ` +
            `precedencia explícita no presentan contradicción ` +
            `direccional directa.`,
        };
      };

      const preferenceAB =
        determineControlledPreference(
          firstDecision,
          secondDecision,
          knowledgeAB,
          'motivo-controlado-explicit-derived-consistency-ab',
          firstDecision.action,
          secondDecision.action
        );

      const preferenceBC =
        determineControlledPreference(
          secondDecision,
          thirdDecision,
          knowledgeBC,
          'motivo-controlado-explicit-derived-consistency-bc',
          secondDecision.action,
          thirdDecision.action
        );

      const preferenceAC =
        determineControlledPreference(
          firstDecision,
          thirdDecision,
          knowledgeAC,
          'motivo-controlado-explicit-derived-consistency-ac',
          firstDecision.action,
          thirdDecision.action
        );

      const preferenceCA =
        determineControlledPreference(
          thirdDecision,
          firstDecision,
          knowledgeCA,
          'motivo-controlado-explicit-derived-consistency-ca',
          thirdDecision.action,
          firstDecision.action
        );

      const precedenceAB =
        determineControlledPrecedence(preferenceAB);

      const precedenceBC =
        determineControlledPrecedence(preferenceBC);

      const precedenceAC =
        determineControlledPrecedence(preferenceAC);

      const precedenceCA =
        determineControlledPrecedence(preferenceCA);

      const sourceCoexistence =
        determineControlledPrecedenceCoexistence(
          controlledAlternativeIds,
          [precedenceAB, precedenceBC]
        );

      const derivedAC =
        deriveControlledTransitivePrecedence(
          sourceCoexistence
        );

      const compatibleEvaluation =
        evaluateControlledExplicitDerivedPrecedenceConsistency(
          derivedAC,
          precedenceAC
        );

      const incompatibleEvaluation =
        evaluateControlledExplicitDerivedPrecedenceConsistency(
          derivedAC,
          precedenceCA
        );

      if (
        preferenceAB.relation !==
          'contextual_preference' ||
        preferenceBC.relation !==
          'contextual_preference' ||
        preferenceAC.relation !==
          'contextual_preference' ||
        preferenceCA.relation !==
          'contextual_preference'
      ) {
        throw new Error(
          'FASE 23.31 no produjo las cuatro preferencias contextuales controladas.'
        );
      }

      if (
        precedenceAB.relation !==
          'contextual_precedence' ||
        precedenceBC.relation !==
          'contextual_precedence' ||
        precedenceAC.relation !==
          'contextual_precedence' ||
        precedenceCA.relation !==
          'contextual_precedence'
      ) {
        throw new Error(
          'FASE 23.31 no produjo las cuatro precedencias explícitas esperadas.'
        );
      }

      if (
        precedenceAB.precedingDecisionId !==
          firstDecision.id ||
        precedenceAB.precededDecisionId !==
          secondDecision.id ||
        precedenceBC.precedingDecisionId !==
          secondDecision.id ||
        precedenceBC.precededDecisionId !==
          thirdDecision.id ||
        precedenceAC.precedingDecisionId !==
          firstDecision.id ||
        precedenceAC.precededDecisionId !==
          thirdDecision.id ||
        precedenceCA.precedingDecisionId !==
          thirdDecision.id ||
        precedenceCA.precededDecisionId !==
          firstDecision.id
      ) {
        throw new Error(
          'FASE 23.31 produjo una dirección incorrecta en alguna precedencia explícita.'
        );
      }

      if (
        precedenceAB.knowledgeId !== knowledgeAB.id ||
        precedenceBC.knowledgeId !== knowledgeBC.id ||
        precedenceAC.knowledgeId !== knowledgeAC.id ||
        precedenceCA.knowledgeId !== knowledgeCA.id
      ) {
        throw new Error(
          'FASE 23.31 perdió atribución individual mediante knowledgeId.'
        );
      }

      if (
        derivedAC.relation !==
          'contextual_transitive_precedence' ||
        derivedAC.precedingDecisionId !==
          firstDecision.id ||
        derivedAC.intermediateDecisionId !==
          secondDecision.id ||
        derivedAC.precededDecisionId !==
          thirdDecision.id ||
        !derivedAC.sourcePrecedences
      ) {
        throw new Error(
          'FASE 23.31 no logró reconstruir la relación transitiva derivada A-C.'
        );
      }

      const [
        derivedFirstSource,
        derivedSecondSource,
      ] = derivedAC.sourcePrecedences;

      if (
        derivedFirstSource.precedingDecisionId !==
          firstDecision.id ||
        derivedFirstSource.precededDecisionId !==
          secondDecision.id ||
        derivedFirstSource.knowledgeId !==
          knowledgeAB.id ||
        derivedSecondSource.precedingDecisionId !==
          secondDecision.id ||
        derivedSecondSource.precededDecisionId !==
          thirdDecision.id ||
        derivedSecondSource.knowledgeId !==
          knowledgeBC.id
      ) {
        throw new Error(
          'FASE 23.31 perdió la genealogía causal de la relación derivada A-C.'
        );
      }

      if (
        compatibleEvaluation.relation !==
          'contextual_explicit_derived_precedence_consistent' ||
        !compatibleEvaluation.consistent ||
        compatibleEvaluation.conflict !== null
      ) {
        throw new Error(
          'FASE 23.31 clasificó incorrectamente A-C derivada / A-C explícita como incompatibles.'
        );
      }

      if (
        incompatibleEvaluation.relation !==
          'contextual_explicit_derived_precedence_inconsistent' ||
        incompatibleEvaluation.consistent ||
        !incompatibleEvaluation.conflict
      ) {
        throw new Error(
          'FASE 23.31 no detectó la contradicción A-C derivada / C-A explícita.'
        );
      }

      const conflict =
        incompatibleEvaluation.conflict;

      if (
        conflict.derivedPrecedence.precedingDecisionId !==
          firstDecision.id ||
        conflict.derivedPrecedence.intermediateDecisionId !==
          secondDecision.id ||
        conflict.derivedPrecedence.precededDecisionId !==
          thirdDecision.id ||
        conflict.explicitPrecedence.precedingDecisionId !==
          thirdDecision.id ||
        conflict.explicitPrecedence.precededDecisionId !==
          firstDecision.id ||
        conflict.explicitPrecedence.knowledgeId !==
          knowledgeCA.id
      ) {
        throw new Error(
          'FASE 23.31 identificó un conflicto explícito-derivado distinto del esperado.'
        );
      }

      const conflictSourceKnowledgeIds = new Set(
        conflict.derivedPrecedence.sourcePrecedences.map(
          (source) => source.knowledgeId
        )
      );

      if (
        conflictSourceKnowledgeIds.size !== 2 ||
        !conflictSourceKnowledgeIds.has(knowledgeAB.id) ||
        !conflictSourceKnowledgeIds.has(knowledgeBC.id)
      ) {
        throw new Error(
          'FASE 23.31 perdió trazabilidad de los conocimientos causales de la relación derivada.'
        );
      }

      /*
       * La relación derivada sigue sin convertirse en una
       * precedencia explícita.
       */
      if (sourceCoexistence.precedences.length !== 2) {
        throw new Error(
          'FASE 23.31 modificó la cardinalidad de las precedencias fuente.'
        );
      }

      const derivedInsertedAsExplicit =
        sourceCoexistence.precedences.some(
          (precedence) =>
            precedence.precedingDecisionId ===
              firstDecision.id &&
            precedence.precededDecisionId ===
              thirdDecision.id
        );

      if (derivedInsertedAsExplicit) {
        throw new Error(
          'FASE 23.31 materializó indebidamente A-C derivada como precedencia explícita.'
        );
      }

      /*
       * La evaluación no debe fabricar atribución global.
       */
      if (
        'knowledgeId' in compatibleEvaluation ||
        'sourcePatternId' in compatibleEvaluation ||
        'memoryIds' in compatibleEvaluation ||
        'occurrences' in compatibleEvaluation ||
        'knowledgeId' in incompatibleEvaluation ||
        'sourcePatternId' in incompatibleEvaluation ||
        'memoryIds' in incompatibleEvaluation ||
        'occurrences' in incompatibleEvaluation
      ) {
        throw new Error(
          'FASE 23.31 fabricó atribución global para la evaluación explícita-derivada.'
        );
      }

      /*
       * Guardas contra conceptos posteriores.
       */
      if (
        'closure' in compatibleEvaluation ||
        'transitiveClosure' in compatibleEvaluation ||
        'partialOrder' in compatibleEvaluation ||
        'orderedDecisionIds' in compatibleEvaluation ||
        'sortedDecisionIds' in compatibleEvaluation ||
        'order' in compatibleEvaluation ||
        'rank' in compatibleEvaluation ||
        'ranking' in compatibleEvaluation ||
        'position' in compatibleEvaluation ||
        'score' in compatibleEvaluation ||
        'weight' in compatibleEvaluation ||
        'confidence' in compatibleEvaluation ||
        'priority' in compatibleEvaluation ||
        'winner' in compatibleEvaluation ||
        'loser' in compatibleEvaluation ||
        'selected' in compatibleEvaluation ||
        'selection' in compatibleEvaluation ||
        'executed' in compatibleEvaluation ||
        'execution' in compatibleEvaluation ||
        'closure' in incompatibleEvaluation ||
        'transitiveClosure' in incompatibleEvaluation ||
        'partialOrder' in incompatibleEvaluation ||
        'orderedDecisionIds' in incompatibleEvaluation ||
        'sortedDecisionIds' in incompatibleEvaluation ||
        'order' in incompatibleEvaluation ||
        'rank' in incompatibleEvaluation ||
        'ranking' in incompatibleEvaluation ||
        'position' in incompatibleEvaluation ||
        'score' in incompatibleEvaluation ||
        'weight' in incompatibleEvaluation ||
        'confidence' in incompatibleEvaluation ||
        'priority' in incompatibleEvaluation ||
        'winner' in incompatibleEvaluation ||
        'loser' in incompatibleEvaluation ||
        'selected' in incompatibleEvaluation ||
        'selection' in incompatibleEvaluation ||
        'executed' in incompatibleEvaluation ||
        'execution' in incompatibleEvaluation
      ) {
        throw new Error(
          'FASE 23.31 detectó atributos de cierre transitivo, orden parcial, ranking, ponderación, selección o ejecución.'
        );
      }

      /*
       * La derivación y la evaluación no deben modificar
       * las precedencias explícitas fuente.
       */
      if (
        JSON.stringify(sourceCoexistence.precedences) !==
        JSON.stringify([precedenceAB, precedenceBC])
      ) {
        throw new Error(
          'FASE 23.31 modificó las precedencias explícitas fuente durante la evaluación.'
        );
      }

      /*
       * Las recomendaciones y decisiones productivas deben
       * permanecer completamente intactas.
       */
      const recommendationsAfterConsistency =
        generateRecommendationsFromPatterns(
          detectedPatterns
        );

      const decisionsAfterConsistency =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsAfterConsistency
        );

      if (
        JSON.stringify(
          recommendationsBeforeConsistency
        ) !==
        JSON.stringify(
          recommendationsAfterConsistency
        )
      ) {
        throw new Error(
          'FASE 23.31 detectó modificación de recomendaciones productivas.'
        );
      }

      if (
        JSON.stringify(
          decisionsBeforeConsistency
        ) !==
        JSON.stringify(
          decisionsAfterConsistency
        )
      ) {
        throw new Error(
          'FASE 23.31 detectó modificación, reordenamiento o ranking distinto de decisiones productivas.'
        );
      }

      const firstDecisionAfter =
        decisionsAfterConsistency.find(
          (decision) =>
            decision.id === firstDecision.id
        );

      const secondDecisionAfter =
        decisionsAfterConsistency.find(
          (decision) =>
            decision.id === secondDecision.id
        );

      const thirdDecisionAfter =
        decisionsAfterConsistency.find(
          (decision) =>
            decision.id === thirdDecision.id
        );

      if (
        !firstDecisionAfter ||
        !secondDecisionAfter ||
        !thirdDecisionAfter
      ) {
        throw new Error(
          'FASE 23.31 perdió alguna alternativa productiva después del experimento.'
        );
      }

      if (
        JSON.stringify(firstDecisionAfter) !==
          firstDecisionSnapshot ||
        JSON.stringify(secondDecisionAfter) !==
          secondDecisionSnapshot ||
        JSON.stringify(thirdDecisionAfter) !==
          thirdDecisionSnapshot
      ) {
        throw new Error(
          'FASE 23.31 alteró indirectamente alguna alternativa decisional productiva.'
        );
      }

      addLog(
        `FASE 23.31 OK: la relación transitiva derivada ${firstDecision.id} -> ${thirdDecision.id}, sustentada por las precedencias explícitas ${firstDecision.id} -> ${secondDecision.id} mediante ${knowledgeAB.id} y ${secondDecision.id} -> ${thirdDecision.id} mediante ${knowledgeBC.id}, coexistió consistentemente con la precedencia explícita homodireccional ${firstDecision.id} -> ${thirdDecision.id} mediante ${knowledgeAC.id}, mientras la precedencia explícita inversa ${thirdDecision.id} -> ${firstDecision.id} mediante ${knowledgeCA.id} fue detectada como contradicción direccional directa frente a la relación derivada; la evaluación preservó la genealogía causal de la derivación, no convirtió relaciones derivadas en explícitas, no realimentó la transitividad y no introdujo cierre transitivo, orden parcial, reordenamiento, rank, score, modificación de confidence o priority, selección ni ejecución, permaneciendo intactas ${recommendationsAfterConsistency.length} recomendaciones y ${decisionsAfterConsistency.length} decisiones productivas.`
      );
    } catch (error) {
      console.error(error);

      addLog(
        error instanceof Error
          ? `Error en consistencia explícita-derivada de precedencias 23.31: ${error.message}`
          : 'Error inesperado en consistencia explícita-derivada de precedencias 23.31.'
      );
    } finally {
      setLoading(false);
    }
  }

  async function testOperationalKnowledgeControlledDerivedPrecedenceCoexistence() {
    setLoading(true);

    try {
      const detectedPatterns = await detectMemoryPatterns();

      const recommendationsBeforeCoexistence =
        generateRecommendationsFromPatterns(
          detectedPatterns
        );

      const decisionsBeforeCoexistence =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsBeforeCoexistence
        );

      /*
       * FASE 23.32 — Coexistencia contextual controlada de
       * relaciones transitivas derivadas por conocimiento
       * operativo.
       *
       * FASE 23.30 permitió derivar una relación transitiva
       * controlada a partir de dos precedencias explícitas:
       *
       * A -> B
       * B -> C
       * => A -> C derivada
       *
       * FASE 23.31 permitió evaluar una relación derivada
       * frente a una precedencia explícita sin realimentar
       * el mecanismo de transitividad.
       *
       * FASE 23.32 introduce exclusivamente la capacidad de
       * hacer coexistir dos relaciones transitivas derivadas
       * independientes:
       *
       * A -> B [K1]
       * B -> C [K2]
       * => R1 = A -> C
       *
       * B -> C [K2]
       * C -> D [K3]
       * => R2 = B -> D
       *
       * R1 y R2 pueden coexistir conservando identidad,
       * dirección, intermediateDecisionId y genealogía causal.
       *
       * La coexistencia NO:
       *
       * - fusiona R1 y R2;
       * - fabrica un knowledgeId agregado;
       * - convierte derivadas en explícitas;
       * - modifica las precedencias fuente;
       * - compone una derivada con una explícita;
       * - compone derivadas entre sí;
       * - produce A -> D;
       * - realimenta la transitividad;
       * - ejecuta propagación transitiva;
       * - ejecuta cierre transitivo;
       * - construye orden parcial;
       * - reordena decisiones;
       * - introduce ranking;
       * - introduce score derivado;
       * - introduce ponderación;
       * - modifica confidence;
       * - modifica priority;
       * - selecciona;
       * - ejecuta.
       */

      const firstDecision =
        decisionsBeforeCoexistence.find(
          (decision) =>
            decision.id === 'decision-review-movements'
        );

      const secondDecision =
        decisionsBeforeCoexistence.find(
          (decision) =>
            decision.id === 'decision-maintain-monitoring'
        );

      const thirdDecision =
        decisionsBeforeCoexistence.find(
          (decision) =>
            decision.id === 'decision-prioritize-high-value'
        );

      const fourthDecision =
        decisionsBeforeCoexistence.find(
          (decision) =>
            decision.id ===
            'recommendation-prioritize-high-score-actions'
        );

      if (!firstDecision) {
        throw new Error(
          'FASE 23.32 no encontró decision-review-movements como alternativa A.'
        );
      }

      if (!secondDecision) {
        throw new Error(
          'FASE 23.32 no encontró decision-maintain-monitoring como alternativa B.'
        );
      }

      if (!thirdDecision) {
        throw new Error(
          'FASE 23.32 no encontró decision-prioritize-high-value como alternativa C.'
        );
      }

      if (!fourthDecision) {
        throw new Error(
          'FASE 23.32 no encontró recommendation-prioritize-high-score-actions como alternativa D.'
        );
      }

      const controlledDecisionIds = [
        firstDecision.id,
        secondDecision.id,
        thirdDecision.id,
        fourthDecision.id,
      ];

      if (new Set(controlledDecisionIds).size !== 4) {
        throw new Error(
          'FASE 23.32 esperaba cuatro alternativas decisionales distintas.'
        );
      }

      const firstDecisionSnapshot =
        JSON.stringify(firstDecision);

      const secondDecisionSnapshot =
        JSON.stringify(secondDecision);

      const thirdDecisionSnapshot =
        JSON.stringify(thirdDecision);

      const fourthDecisionSnapshot =
        JSON.stringify(fourthDecision);

      /*
       * Tres conocimientos independientes:
       *
       * K1 -> A -> B
       * K2 -> B -> C
       * K3 -> C -> D
       *
       * K1 + K2 permiten derivar R1 = A -> C.
       * K2 + K3 permiten derivar R2 = B -> D.
       *
       * K2 es compartido legítimamente por ambas genealogías.
       */
      const controlledPatterns = [
        {
          id: 'recommendation-deviation-pattern-reubicacion-controlled-derived-coexistence-ab',
          title:
            'Patrón controlado coexistencia derivada A-B',
          description:
            'Patrón controlado para producir la precedencia contextual explícita A-B.',
          score: 96,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-derived-coexistence-ab',
          },
          evidence: {
            memoryIds: [
              'memory-controlled-derived-coexistence-ab-1',
              'memory-controlled-derived-coexistence-ab-2',
              'memory-controlled-derived-coexistence-ab-3',
              'memory-controlled-derived-coexistence-ab-4',
            ],
          },
        },
        {
          id: 'recommendation-deviation-pattern-reubicacion-controlled-derived-coexistence-bc',
          title:
            'Patrón controlado coexistencia derivada B-C',
          description:
            'Patrón controlado para producir la precedencia contextual explícita B-C compartida por dos derivaciones.',
          score: 95,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-derived-coexistence-bc',
          },
          evidence: {
            memoryIds: [
              'memory-controlled-derived-coexistence-bc-1',
              'memory-controlled-derived-coexistence-bc-2',
              'memory-controlled-derived-coexistence-bc-3',
              'memory-controlled-derived-coexistence-bc-4',
            ],
          },
        },
        {
          id: 'recommendation-deviation-pattern-reubicacion-controlled-derived-coexistence-cd',
          title:
            'Patrón controlado coexistencia derivada C-D',
          description:
            'Patrón controlado para producir la precedencia contextual explícita C-D.',
          score: 94,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-derived-coexistence-cd',
          },
          evidence: {
            memoryIds: [
              'memory-controlled-derived-coexistence-cd-1',
              'memory-controlled-derived-coexistence-cd-2',
              'memory-controlled-derived-coexistence-cd-3',
              'memory-controlled-derived-coexistence-cd-4',
            ],
          },
        },
      ];

      const controlledKnowledge =
        generateOperationalKnowledge(controlledPatterns);

      if (controlledKnowledge.length !== 3) {
        throw new Error(
          `FASE 23.32 esperaba exactamente 3 conocimientos controlados y generó ${controlledKnowledge.length}.`
        );
      }

      const knowledgeAB =
        controlledKnowledge.find(
          (knowledge) =>
            knowledge.sourcePatternId ===
            controlledPatterns[0].id
        );

      const knowledgeBC =
        controlledKnowledge.find(
          (knowledge) =>
            knowledge.sourcePatternId ===
            controlledPatterns[1].id
        );

      const knowledgeCD =
        controlledKnowledge.find(
          (knowledge) =>
            knowledge.sourcePatternId ===
            controlledPatterns[2].id
        );

      if (
        !knowledgeAB ||
        !knowledgeBC ||
        !knowledgeCD
      ) {
        throw new Error(
          'FASE 23.32 no pudo resolver los tres conocimientos controlados.'
        );
      }

      const uniqueKnowledgeIds = new Set([
        knowledgeAB.id,
        knowledgeBC.id,
        knowledgeCD.id,
      ]);

      if (uniqueKnowledgeIds.size !== 3) {
        throw new Error(
          'FASE 23.32 esperaba tres knowledgeId independientes.'
        );
      }

      const eligibilityAB =
        evaluateOperationalKnowledgeEligibility(
          knowledgeAB,
          { movementType: 'reubicacion' }
        );

      const eligibilityBC =
        evaluateOperationalKnowledgeEligibility(
          knowledgeBC,
          { movementType: 'reubicacion' }
        );

      const eligibilityCD =
        evaluateOperationalKnowledgeEligibility(
          knowledgeCD,
          { movementType: 'reubicacion' }
        );

      const considerationAB =
        considerOperationalKnowledge(eligibilityAB);

      const considerationBC =
        considerOperationalKnowledge(eligibilityBC);

      const considerationCD =
        considerOperationalKnowledge(eligibilityCD);

      if (
        !considerationAB ||
        !considerationBC ||
        !considerationCD
      ) {
        throw new Error(
          'FASE 23.32 esperaba consideración válida para los tres conocimientos.'
        );
      }

      if (
        considerationAB.knowledgeId !== knowledgeAB.id ||
        considerationBC.knowledgeId !== knowledgeBC.id ||
        considerationCD.knowledgeId !== knowledgeCD.id
      ) {
        throw new Error(
          'FASE 23.32 perdió trazabilidad entre consideración y conocimiento.'
        );
      }

      type ControlledKnowledge =
        (typeof controlledKnowledge)[number];

      type ControlledDecisionPreference = {
        decisionIds: [string, string];
        relation:
          | 'no_contextual_preference'
          | 'contextual_preference';
        preferredDecisionId: string | null;
        knowledgeId: string | null;
        rationale: string | null;
      };

      type ControlledDecisionPrecedence = {
        decisionIds: [string, string];
        relation:
          | 'no_contextual_precedence'
          | 'contextual_precedence';
        precedingDecisionId: string | null;
        precededDecisionId: string | null;
        knowledgeId: string | null;
        rationale: string | null;
      };

      type ControlledDecisionPrecedenceCoexistence = {
        decisionIds: [string, string, string];
        relation:
          | 'no_contextual_precedence_coexistence'
          | 'contextual_precedence_coexistence';
        precedences: ControlledDecisionPrecedence[];
        rationale: string | null;
      };

      type ControlledTransitiveSourcePrecedence = {
        precedingDecisionId: string;
        precededDecisionId: string;
        knowledgeId: string;
      };

      type ControlledTransitivePrecedence = {
        decisionIds: [string, string, string];
        relation:
          | 'no_contextual_transitive_precedence'
          | 'contextual_transitive_precedence';
        precedingDecisionId: string | null;
        intermediateDecisionId: string | null;
        precededDecisionId: string | null;
        sourcePrecedences:
          | [
              ControlledTransitiveSourcePrecedence,
              ControlledTransitiveSourcePrecedence,
            ]
          | null;
        rationale: string | null;
      };

      type ControlledTransitivePrecedenceCoexistence = {
        decisionIds: [string, string, string, string];
        relation:
          | 'no_contextual_transitive_precedence_coexistence'
          | 'contextual_transitive_precedence_coexistence';
        derivedPrecedences: ControlledTransitivePrecedence[];
        rationale: string | null;
      };

      const determineControlledPreference = (
        first: OperationalDecision,
        second: OperationalDecision,
        consideredKnowledge: ControlledKnowledge | null,
        expectedDeviationReason: string,
        expectedFirstAction: string,
        expectedSecondAction: string
      ): ControlledDecisionPreference => {
        if (!consideredKnowledge) {
          return {
            decisionIds: [first.id, second.id],
            relation: 'no_contextual_preference',
            preferredDecisionId: null,
            knowledgeId: null,
            rationale: null,
          };
        }

        const knowledgeApplies =
          consideredKnowledge.context.movementType ===
            'reubicacion' &&
          consideredKnowledge.context.deviationReason ===
            expectedDeviationReason;

        const firstMatches =
          first.action === expectedFirstAction;

        const secondMatches =
          second.action === expectedSecondAction;

        if (
          !knowledgeApplies ||
          !firstMatches ||
          !secondMatches
        ) {
          return {
            decisionIds: [first.id, second.id],
            relation: 'no_contextual_preference',
            preferredDecisionId: null,
            knowledgeId: null,
            rationale: null,
          };
        }

        return {
          decisionIds: [first.id, second.id],
          relation: 'contextual_preference',
          preferredDecisionId: first.id,
          knowledgeId: consideredKnowledge.id,
          rationale:
            `El conocimiento "${consideredKnowledge.id}" ` +
            `hace contextualmente preferible "${first.id}" ` +
            `frente a "${second.id}".`,
        };
      };

      const determineControlledPrecedence = (
        preference: ControlledDecisionPreference
      ): ControlledDecisionPrecedence => {
        if (
          preference.relation !==
            'contextual_preference' ||
          !preference.preferredDecisionId ||
          !preference.knowledgeId ||
          !preference.rationale
        ) {
          return {
            decisionIds: [
              preference.decisionIds[0],
              preference.decisionIds[1],
            ],
            relation: 'no_contextual_precedence',
            precedingDecisionId: null,
            precededDecisionId: null,
            knowledgeId: null,
            rationale: null,
          };
        }

        const [
          firstDecisionId,
          secondDecisionId,
        ] = preference.decisionIds;

        if (
          preference.preferredDecisionId !==
            firstDecisionId &&
          preference.preferredDecisionId !==
            secondDecisionId
        ) {
          return {
            decisionIds: [
              firstDecisionId,
              secondDecisionId,
            ],
            relation: 'no_contextual_precedence',
            precedingDecisionId: null,
            precededDecisionId: null,
            knowledgeId: null,
            rationale: null,
          };
        }

        return {
          decisionIds: [
            firstDecisionId,
            secondDecisionId,
          ],
          relation: 'contextual_precedence',
          precedingDecisionId:
            preference.preferredDecisionId,
          precededDecisionId:
            preference.preferredDecisionId ===
            firstDecisionId
              ? secondDecisionId
              : firstDecisionId,
          knowledgeId: preference.knowledgeId,
          rationale:
            `${preference.rationale} ` +
            `La preferencia establece una precedencia contextual explícita.`,
        };
      };

      const determineControlledPrecedenceCoexistence = (
        decisionIds: [string, string, string],
        precedences: ControlledDecisionPrecedence[]
      ): ControlledDecisionPrecedenceCoexistence => {
        const contextualPrecedences =
          precedences.filter(
            (precedence) =>
              precedence.relation ===
                'contextual_precedence' &&
              precedence.precedingDecisionId !== null &&
              precedence.precededDecisionId !== null &&
              precedence.knowledgeId !== null
          );

        if (contextualPrecedences.length !== 2) {
          return {
            decisionIds: [
              decisionIds[0],
              decisionIds[1],
              decisionIds[2],
            ],
            relation:
              'no_contextual_precedence_coexistence',
            precedences: [],
            rationale: null,
          };
        }

        return {
          decisionIds: [
            decisionIds[0],
            decisionIds[1],
            decisionIds[2],
          ],
          relation:
            'contextual_precedence_coexistence',
          precedences: [
            contextualPrecedences[0],
            contextualPrecedences[1],
          ],
          rationale:
            `Dos precedencias contextuales explícitas ` +
            `coexisten sin materializar relaciones derivadas.`,
        };
      };

      const deriveControlledTransitivePrecedence = (
        coexistence: ControlledDecisionPrecedenceCoexistence
      ): ControlledTransitivePrecedence => {
        const precedences =
          coexistence.precedences.filter(
            (precedence) =>
              precedence.relation ===
                'contextual_precedence' &&
              precedence.precedingDecisionId !== null &&
              precedence.precededDecisionId !== null &&
              precedence.knowledgeId !== null
          );

        if (precedences.length !== 2) {
          return {
            decisionIds: [
              coexistence.decisionIds[0],
              coexistence.decisionIds[1],
              coexistence.decisionIds[2],
            ],
            relation:
              'no_contextual_transitive_precedence',
            precedingDecisionId: null,
            intermediateDecisionId: null,
            precededDecisionId: null,
            sourcePrecedences: null,
            rationale: null,
          };
        }

        const firstPrecedence = precedences[0];
        const secondPrecedence = precedences[1];

        if (
          !firstPrecedence ||
          !secondPrecedence ||
          !firstPrecedence.precedingDecisionId ||
          !firstPrecedence.precededDecisionId ||
          !firstPrecedence.knowledgeId ||
          !secondPrecedence.precedingDecisionId ||
          !secondPrecedence.precededDecisionId ||
          !secondPrecedence.knowledgeId
        ) {
          return {
            decisionIds: [
              coexistence.decisionIds[0],
              coexistence.decisionIds[1],
              coexistence.decisionIds[2],
            ],
            relation:
              'no_contextual_transitive_precedence',
            precedingDecisionId: null,
            intermediateDecisionId: null,
            precededDecisionId: null,
            sourcePrecedences: null,
            rationale: null,
          };
        }

        const composesForward =
          firstPrecedence.precededDecisionId ===
            secondPrecedence.precedingDecisionId;

        const composesReverse =
          secondPrecedence.precededDecisionId ===
            firstPrecedence.precedingDecisionId;

        if (composesForward) {
          return {
            decisionIds: [
              coexistence.decisionIds[0],
              coexistence.decisionIds[1],
              coexistence.decisionIds[2],
            ],
            relation:
              'contextual_transitive_precedence',
            precedingDecisionId:
              firstPrecedence.precedingDecisionId,
            intermediateDecisionId:
              firstPrecedence.precededDecisionId,
            precededDecisionId:
              secondPrecedence.precededDecisionId,
            sourcePrecedences: [
              {
                precedingDecisionId:
                  firstPrecedence.precedingDecisionId,
                precededDecisionId:
                  firstPrecedence.precededDecisionId,
                knowledgeId:
                  firstPrecedence.knowledgeId,
              },
              {
                precedingDecisionId:
                  secondPrecedence.precedingDecisionId,
                precededDecisionId:
                  secondPrecedence.precededDecisionId,
                knowledgeId:
                  secondPrecedence.knowledgeId,
              },
            ],
            rationale:
              `Dos precedencias explícitas componibles ` +
              `permiten una única derivación transitiva controlada.`,
          };
        }

        if (composesReverse) {
          return {
            decisionIds: [
              coexistence.decisionIds[0],
              coexistence.decisionIds[1],
              coexistence.decisionIds[2],
            ],
            relation:
              'contextual_transitive_precedence',
            precedingDecisionId:
              secondPrecedence.precedingDecisionId,
            intermediateDecisionId:
              secondPrecedence.precededDecisionId,
            precededDecisionId:
              firstPrecedence.precededDecisionId,
            sourcePrecedences: [
              {
                precedingDecisionId:
                  secondPrecedence.precedingDecisionId,
                precededDecisionId:
                  secondPrecedence.precededDecisionId,
                knowledgeId:
                  secondPrecedence.knowledgeId,
              },
              {
                precedingDecisionId:
                  firstPrecedence.precedingDecisionId,
                precededDecisionId:
                  firstPrecedence.precededDecisionId,
                knowledgeId:
                  firstPrecedence.knowledgeId,
              },
            ],
            rationale:
              `Dos precedencias explícitas componibles ` +
              `permiten una única derivación transitiva controlada.`,
          };
        }

        return {
          decisionIds: [
            coexistence.decisionIds[0],
            coexistence.decisionIds[1],
            coexistence.decisionIds[2],
          ],
          relation:
            'no_contextual_transitive_precedence',
          precedingDecisionId: null,
          intermediateDecisionId: null,
          precededDecisionId: null,
          sourcePrecedences: null,
          rationale: null,
        };
      };

      /*
       * NUEVO CONSUMIDOR DE FASE 23.32.
       *
       * Recibe relaciones transitivas ya derivadas.
       *
       * Únicamente reconoce su coexistencia plural.
       *
       * No modifica las derivaciones recibidas.
       * No las combina.
       * No genera una nueva precedencia.
       * No realimenta la transitividad.
       */
      const determineControlledTransitivePrecedenceCoexistence = (
        decisionIds: [string, string, string, string],
        derivedPrecedences: ControlledTransitivePrecedence[]
      ): ControlledTransitivePrecedenceCoexistence => {
        const validDerivedPrecedences =
          derivedPrecedences.filter(
            (precedence) =>
              precedence.relation ===
                'contextual_transitive_precedence' &&
              precedence.precedingDecisionId !== null &&
              precedence.intermediateDecisionId !== null &&
              precedence.precededDecisionId !== null &&
              precedence.sourcePrecedences !== null
          );

        if (validDerivedPrecedences.length !== 2) {
          return {
            decisionIds: [
              decisionIds[0],
              decisionIds[1],
              decisionIds[2],
              decisionIds[3],
            ],
            relation:
              'no_contextual_transitive_precedence_coexistence',
            derivedPrecedences: [],
            rationale: null,
          };
        }

        return {
          decisionIds: [
            decisionIds[0],
            decisionIds[1],
            decisionIds[2],
            decisionIds[3],
          ],
          relation:
            'contextual_transitive_precedence_coexistence',
          derivedPrecedences: [
            validDerivedPrecedences[0],
            validDerivedPrecedences[1],
          ],
          rationale:
            `Dos relaciones transitivas derivadas coexisten ` +
            `sin fusionarse ni producir nuevas derivaciones.`,
        };
      };

      const preferenceAB =
        determineControlledPreference(
          firstDecision,
          secondDecision,
          knowledgeAB,
          'motivo-controlado-derived-coexistence-ab',
          firstDecision.action,
          secondDecision.action
        );

      const preferenceBC =
        determineControlledPreference(
          secondDecision,
          thirdDecision,
          knowledgeBC,
          'motivo-controlado-derived-coexistence-bc',
          secondDecision.action,
          thirdDecision.action
        );

      const preferenceCD =
        determineControlledPreference(
          thirdDecision,
          fourthDecision,
          knowledgeCD,
          'motivo-controlado-derived-coexistence-cd',
          thirdDecision.action,
          fourthDecision.action
        );

      const precedenceAB =
        determineControlledPrecedence(preferenceAB);

      const precedenceBC =
        determineControlledPrecedence(preferenceBC);

      const precedenceCD =
        determineControlledPrecedence(preferenceCD);

      const firstSourceCoexistence =
        determineControlledPrecedenceCoexistence(
          [
            firstDecision.id,
            secondDecision.id,
            thirdDecision.id,
          ],
          [precedenceAB, precedenceBC]
        );

      const secondSourceCoexistence =
        determineControlledPrecedenceCoexistence(
          [
            secondDecision.id,
            thirdDecision.id,
            fourthDecision.id,
          ],
          [precedenceBC, precedenceCD]
        );

      const derivedAC =
        deriveControlledTransitivePrecedence(
          firstSourceCoexistence
        );

      const derivedBD =
        deriveControlledTransitivePrecedence(
          secondSourceCoexistence
        );

      const derivedCoexistence =
        determineControlledTransitivePrecedenceCoexistence(
          [
            firstDecision.id,
            secondDecision.id,
            thirdDecision.id,
            fourthDecision.id,
          ],
          [derivedAC, derivedBD]
        );

      if (
        preferenceAB.relation !==
          'contextual_preference' ||
        preferenceBC.relation !==
          'contextual_preference' ||
        preferenceCD.relation !==
          'contextual_preference'
      ) {
        throw new Error(
          'FASE 23.32 no produjo las tres preferencias contextuales controladas.'
        );
      }

      if (
        precedenceAB.relation !==
          'contextual_precedence' ||
        precedenceBC.relation !==
          'contextual_precedence' ||
        precedenceCD.relation !==
          'contextual_precedence'
      ) {
        throw new Error(
          'FASE 23.32 no produjo las tres precedencias explícitas esperadas.'
        );
      }

      if (
        precedenceAB.precedingDecisionId !==
          firstDecision.id ||
        precedenceAB.precededDecisionId !==
          secondDecision.id ||
        precedenceBC.precedingDecisionId !==
          secondDecision.id ||
        precedenceBC.precededDecisionId !==
          thirdDecision.id ||
        precedenceCD.precedingDecisionId !==
          thirdDecision.id ||
        precedenceCD.precededDecisionId !==
          fourthDecision.id
      ) {
        throw new Error(
          'FASE 23.32 produjo una dirección incorrecta en alguna precedencia explícita.'
        );
      }

      if (
        precedenceAB.knowledgeId !== knowledgeAB.id ||
        precedenceBC.knowledgeId !== knowledgeBC.id ||
        precedenceCD.knowledgeId !== knowledgeCD.id
      ) {
        throw new Error(
          'FASE 23.32 perdió atribución individual mediante knowledgeId.'
        );
      }

      if (
        derivedAC.relation !==
          'contextual_transitive_precedence' ||
        derivedAC.precedingDecisionId !==
          firstDecision.id ||
        derivedAC.intermediateDecisionId !==
          secondDecision.id ||
        derivedAC.precededDecisionId !==
          thirdDecision.id ||
        !derivedAC.sourcePrecedences
      ) {
        throw new Error(
          'FASE 23.32 no produjo correctamente R1 = A-C.'
        );
      }

      if (
        derivedBD.relation !==
          'contextual_transitive_precedence' ||
        derivedBD.precedingDecisionId !==
          secondDecision.id ||
        derivedBD.intermediateDecisionId !==
          thirdDecision.id ||
        derivedBD.precededDecisionId !==
          fourthDecision.id ||
        !derivedBD.sourcePrecedences
      ) {
        throw new Error(
          'FASE 23.32 no produjo correctamente R2 = B-D.'
        );
      }

      const [
        derivedACFirstSource,
        derivedACSecondSource,
      ] = derivedAC.sourcePrecedences;

      const [
        derivedBDFirstSource,
        derivedBDSecondSource,
      ] = derivedBD.sourcePrecedences;

      if (
        derivedACFirstSource.precedingDecisionId !==
          firstDecision.id ||
        derivedACFirstSource.precededDecisionId !==
          secondDecision.id ||
        derivedACFirstSource.knowledgeId !==
          knowledgeAB.id ||
        derivedACSecondSource.precedingDecisionId !==
          secondDecision.id ||
        derivedACSecondSource.precededDecisionId !==
          thirdDecision.id ||
        derivedACSecondSource.knowledgeId !==
          knowledgeBC.id
      ) {
        throw new Error(
          'FASE 23.32 perdió la genealogía causal de R1 = A-C.'
        );
      }

      if (
        derivedBDFirstSource.precedingDecisionId !==
          secondDecision.id ||
        derivedBDFirstSource.precededDecisionId !==
          thirdDecision.id ||
        derivedBDFirstSource.knowledgeId !==
          knowledgeBC.id ||
        derivedBDSecondSource.precedingDecisionId !==
          thirdDecision.id ||
        derivedBDSecondSource.precededDecisionId !==
          fourthDecision.id ||
        derivedBDSecondSource.knowledgeId !==
          knowledgeCD.id
      ) {
        throw new Error(
          'FASE 23.32 perdió la genealogía causal de R2 = B-D.'
        );
      }

      /*
       * K2 / B-C debe ser exactamente la fuente causal
       * compartida entre las dos relaciones derivadas.
       */
      const sharedSourceIsPreserved =
        derivedACSecondSource.precedingDecisionId ===
          derivedBDFirstSource.precedingDecisionId &&
        derivedACSecondSource.precededDecisionId ===
          derivedBDFirstSource.precededDecisionId &&
        derivedACSecondSource.knowledgeId ===
          derivedBDFirstSource.knowledgeId &&
        derivedACSecondSource.knowledgeId ===
          knowledgeBC.id;

      if (!sharedSourceIsPreserved) {
        throw new Error(
          'FASE 23.32 perdió la fuente causal compartida B-C / K2 entre ambas derivaciones.'
        );
      }

      if (
        derivedCoexistence.relation !==
          'contextual_transitive_precedence_coexistence' ||
        derivedCoexistence.derivedPrecedences.length !== 2
      ) {
        throw new Error(
          'FASE 23.32 no estableció coexistencia plural entre las dos relaciones derivadas.'
        );
      }

      if (
        derivedCoexistence.derivedPrecedences[0] !==
          derivedAC ||
        derivedCoexistence.derivedPrecedences[1] !==
          derivedBD
      ) {
        throw new Error(
          'FASE 23.32 sustituyó o fusionó las relaciones derivadas durante su coexistencia.'
        );
      }

      /*
       * Las derivadas no deben convertirse en explícitas.
       */
      if (
        firstSourceCoexistence.precedences.length !== 2 ||
        secondSourceCoexistence.precedences.length !== 2
      ) {
        throw new Error(
          'FASE 23.32 modificó la cardinalidad de alguna coexistencia explícita fuente.'
        );
      }

      const derivedInsertedAsExplicit =
        firstSourceCoexistence.precedences.some(
          (precedence) =>
            precedence.precedingDecisionId ===
              firstDecision.id &&
            precedence.precededDecisionId ===
              thirdDecision.id
        ) ||
        secondSourceCoexistence.precedences.some(
          (precedence) =>
            precedence.precedingDecisionId ===
              secondDecision.id &&
            precedence.precededDecisionId ===
              fourthDecision.id
        );

      if (derivedInsertedAsExplicit) {
        throw new Error(
          'FASE 23.32 materializó indebidamente una relación derivada como precedencia explícita.'
        );
      }

      /*
       * No debe aparecer A -> D.
       *
       * Su presencia significaría que una derivación ya
       * producida volvió a participar en otra inferencia.
       */
      const propagatedAD =
        derivedCoexistence.derivedPrecedences.some(
          (precedence) =>
            precedence.precedingDecisionId ===
              firstDecision.id &&
            precedence.precededDecisionId ===
              fourthDecision.id
        );

      if (propagatedAD) {
        throw new Error(
          'FASE 23.32 propagó indebidamente la transitividad y produjo A-D.'
        );
      }

      /*
       * La coexistencia no debe fabricar atribución causal
       * global ni conceptos propios de fases posteriores.
       */
      if (
        'knowledgeId' in derivedCoexistence ||
        'sourcePatternId' in derivedCoexistence ||
        'memoryIds' in derivedCoexistence ||
        'occurrences' in derivedCoexistence ||
        'closure' in derivedCoexistence ||
        'transitiveClosure' in derivedCoexistence ||
        'partialOrder' in derivedCoexistence ||
        'orderedDecisionIds' in derivedCoexistence ||
        'sortedDecisionIds' in derivedCoexistence ||
        'order' in derivedCoexistence ||
        'rank' in derivedCoexistence ||
        'ranking' in derivedCoexistence ||
        'position' in derivedCoexistence ||
        'score' in derivedCoexistence ||
        'weight' in derivedCoexistence ||
        'confidence' in derivedCoexistence ||
        'priority' in derivedCoexistence ||
        'winner' in derivedCoexistence ||
        'loser' in derivedCoexistence ||
        'selected' in derivedCoexistence ||
        'selection' in derivedCoexistence ||
        'executed' in derivedCoexistence ||
        'execution' in derivedCoexistence
      ) {
        throw new Error(
          'FASE 23.32 detectó atribución global, cierre transitivo, orden parcial, ranking, ponderación, selección o ejecución.'
        );
      }

      /*
       * Ninguna operación debe modificar las precedencias
       * explícitas fuente.
       */
      if (
        JSON.stringify(
          firstSourceCoexistence.precedences
        ) !==
          JSON.stringify([
            precedenceAB,
            precedenceBC,
          ]) ||
        JSON.stringify(
          secondSourceCoexistence.precedences
        ) !==
          JSON.stringify([
            precedenceBC,
            precedenceCD,
          ])
      ) {
        throw new Error(
          'FASE 23.32 modificó alguna precedencia explícita fuente.'
        );
      }

      /*
       * Las recomendaciones y decisiones productivas deben
       * permanecer completamente intactas.
       */
      const recommendationsAfterCoexistence =
        generateRecommendationsFromPatterns(
          detectedPatterns
        );

      const decisionsAfterCoexistence =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsAfterCoexistence
        );

      if (
        JSON.stringify(recommendationsAfterCoexistence) !==
        JSON.stringify(recommendationsBeforeCoexistence)
      ) {
        throw new Error(
          'FASE 23.32 detectó modificación de recomendaciones productivas.'
        );
      }

      if (
        JSON.stringify(decisionsAfterCoexistence) !==
        JSON.stringify(decisionsBeforeCoexistence)
      ) {
        throw new Error(
          'FASE 23.32 detectó modificación, reordenamiento o ranking distinto de decisiones productivas.'
        );
      }

      const firstDecisionAfter =
        decisionsAfterCoexistence.find(
          (decision) =>
            decision.id === firstDecision.id
        );

      const secondDecisionAfter =
        decisionsAfterCoexistence.find(
          (decision) =>
            decision.id === secondDecision.id
        );

      const thirdDecisionAfter =
        decisionsAfterCoexistence.find(
          (decision) =>
            decision.id === thirdDecision.id
        );

      const fourthDecisionAfter =
        decisionsAfterCoexistence.find(
          (decision) =>
            decision.id === fourthDecision.id
        );

      if (
        !firstDecisionAfter ||
        !secondDecisionAfter ||
        !thirdDecisionAfter ||
        !fourthDecisionAfter
      ) {
        throw new Error(
          'FASE 23.32 perdió alguna alternativa productiva después del experimento.'
        );
      }

      if (
        JSON.stringify(firstDecisionAfter) !==
          firstDecisionSnapshot ||
        JSON.stringify(secondDecisionAfter) !==
          secondDecisionSnapshot ||
        JSON.stringify(thirdDecisionAfter) !==
          thirdDecisionSnapshot ||
        JSON.stringify(fourthDecisionAfter) !==
          fourthDecisionSnapshot
      ) {
        throw new Error(
          'FASE 23.32 alteró indirectamente alguna alternativa decisional productiva.'
        );
      }

      addLog(
        `FASE 23.32 OK: coexistieron dos relaciones transitivas derivadas independientes, ${firstDecision.id} -> ${thirdDecision.id} mediante ${knowledgeAB.id} + ${knowledgeBC.id} y ${secondDecision.id} -> ${fourthDecision.id} mediante ${knowledgeBC.id} + ${knowledgeCD.id}; ambas conservaron identidad, dirección, intermediateDecisionId y genealogía causal, compartieron legítimamente la precedencia explícita ${secondDecision.id} -> ${thirdDecision.id} mediante ${knowledgeBC.id}, no se fusionaron, no se convirtieron en precedencias explícitas, no produjeron ${firstDecision.id} -> ${fourthDecision.id}, no realimentaron la transitividad y no introdujeron propagación transitiva, cierre transitivo, orden parcial, reordenamiento, rank, score, ponderación, modificación de confidence o priority, selección ni ejecución, permaneciendo intactas ${recommendationsAfterCoexistence.length} recomendaciones y ${decisionsAfterCoexistence.length} decisiones productivas.`
      );
    } catch (error) {
      console.error(error);

      addLog(
        error instanceof Error
          ? `Error en coexistencia plural de relaciones transitivas derivadas 23.32: ${error.message}`
          : 'Error inesperado en coexistencia plural de relaciones transitivas derivadas 23.32.'
      );
    } finally {
      setLoading(false);
    }
  }

  async function testOperationalKnowledgeControlledDerivedPrecedenceConsistency() {
    setLoading(true);

    try {
      const detectedPatterns = await detectMemoryPatterns();

      const recommendationsBeforeCoexistence =
        generateRecommendationsFromPatterns(
          detectedPatterns
        );

      const decisionsBeforeCoexistence =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsBeforeCoexistence
        );

      /*
       * FASE 23.33 — Consistencia contextual controlada entre
       * relaciones transitivas derivadas por conocimiento
       * operativo.
       *
       * FASE 23.30 permitió derivar una relación transitiva
       * controlada a partir de dos precedencias explícitas:
       *
       * A -> B
       * B -> C
       * => A -> C derivada
       *
       * FASE 23.31 permitió evaluar una relación derivada
       * frente a una precedencia explícita sin realimentar
       * el mecanismo de transitividad.
       *
       * FASE 23.32 permitió exclusivamente la capacidad de
       * hacer coexistir dos relaciones transitivas derivadas
       * independientes:
       *
       * A -> B [K1]
       * B -> C [K2]
       * => R1 = A -> C
       *
       * B -> C [K2]
       * C -> D [K3]
       * => R2 = B -> D
       *
       * R1 y R2 pueden coexistir conservando identidad,
       * dirección, intermediateDecisionId y genealogía causal.
       *
       * La coexistencia NO:
       *
       * - fusiona R1 y R2;
       * - fabrica un knowledgeId agregado;
       * - convierte derivadas en explícitas;
       * - modifica las precedencias fuente;
       * - compone una derivada con una explícita;
       * - compone derivadas entre sí;
       * - produce A -> D;
       * - realimenta la transitividad;
       * - ejecuta propagación transitiva;
       * - ejecuta cierre transitivo;
       * - construye orden parcial;
       * - reordena decisiones;
       * - introduce ranking;
       * - introduce score derivado;
       * - introduce ponderación;
       * - modifica confidence;
       * - modifica priority;
       * - selecciona;
       * - ejecuta.
       */

      const firstDecision =
        decisionsBeforeCoexistence.find(
          (decision) =>
            decision.id === 'decision-review-movements'
        );

      const secondDecision =
        decisionsBeforeCoexistence.find(
          (decision) =>
            decision.id === 'decision-maintain-monitoring'
        );

      const thirdDecision =
        decisionsBeforeCoexistence.find(
          (decision) =>
            decision.id === 'decision-prioritize-high-value'
        );

      const fourthDecision =
        decisionsBeforeCoexistence.find(
          (decision) =>
            decision.id ===
            'recommendation-prioritize-high-score-actions'
        );

      if (!firstDecision) {
        throw new Error(
          'FASE 23.33 no encontró decision-review-movements como alternativa A.'
        );
      }

      if (!secondDecision) {
        throw new Error(
          'FASE 23.33 no encontró decision-maintain-monitoring como alternativa B.'
        );
      }

      if (!thirdDecision) {
        throw new Error(
          'FASE 23.33 no encontró decision-prioritize-high-value como alternativa C.'
        );
      }

      if (!fourthDecision) {
        throw new Error(
          'FASE 23.33 no encontró recommendation-prioritize-high-score-actions como alternativa D.'
        );
      }

      const controlledDecisionIds = [
        firstDecision.id,
        secondDecision.id,
        thirdDecision.id,
        fourthDecision.id,
      ];

      if (new Set(controlledDecisionIds).size !== 4) {
        throw new Error(
          'FASE 23.33 esperaba cuatro alternativas decisionales distintas.'
        );
      }

      const firstDecisionSnapshot =
        JSON.stringify(firstDecision);

      const secondDecisionSnapshot =
        JSON.stringify(secondDecision);

      const thirdDecisionSnapshot =
        JSON.stringify(thirdDecision);

      const fourthDecisionSnapshot =
        JSON.stringify(fourthDecision);

      /*
       * Cuatro conocimientos independientes:
       *
       * K1 -> A -> B
       * K2 -> B -> C
       * K3 -> C -> D
       * K4 -> D -> A
       *
       * K1 + K2 permiten derivar R1 = A -> C.
       * K2 + K3 permiten derivar R2 = B -> D.
       * K3 + K4 permiten derivar R3 = C -> A.
       *
       * K2 es compartido legítimamente por R1 y R2.
       * R1 y R3 permiten comprobar una contradicción
       * direccional directa A -> C frente a C -> A.
       */
      const controlledPatterns = [
        {
          id: 'recommendation-deviation-pattern-reubicacion-controlled-derived-coexistence-ab',
          title:
            'Patrón controlado coexistencia derivada A-B',
          description:
            'Patrón controlado para producir la precedencia contextual explícita A-B.',
          score: 96,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-derived-coexistence-ab',
          },
          evidence: {
            memoryIds: [
              'memory-controlled-derived-coexistence-ab-1',
              'memory-controlled-derived-coexistence-ab-2',
              'memory-controlled-derived-coexistence-ab-3',
              'memory-controlled-derived-coexistence-ab-4',
            ],
          },
        },
        {
          id: 'recommendation-deviation-pattern-reubicacion-controlled-derived-coexistence-bc',
          title:
            'Patrón controlado coexistencia derivada B-C',
          description:
            'Patrón controlado para producir la precedencia contextual explícita B-C compartida por dos derivaciones.',
          score: 95,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-derived-coexistence-bc',
          },
          evidence: {
            memoryIds: [
              'memory-controlled-derived-coexistence-bc-1',
              'memory-controlled-derived-coexistence-bc-2',
              'memory-controlled-derived-coexistence-bc-3',
              'memory-controlled-derived-coexistence-bc-4',
            ],
          },
        },
        {
          id: 'recommendation-deviation-pattern-reubicacion-controlled-derived-coexistence-cd',
          title:
            'Patrón controlado coexistencia derivada C-D',
          description:
            'Patrón controlado para producir la precedencia contextual explícita C-D.',
          score: 94,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-derived-coexistence-cd',
          },
          evidence: {
            memoryIds: [
              'memory-controlled-derived-coexistence-cd-1',
              'memory-controlled-derived-coexistence-cd-2',
              'memory-controlled-derived-coexistence-cd-3',
              'memory-controlled-derived-coexistence-cd-4',
            ],
          },
        },
        {
          id: 'recommendation-deviation-pattern-reubicacion-controlled-derived-consistency-da',
          title:
            'Patrón controlado consistencia derivada D-A',
          description:
            'Patrón controlado para producir la precedencia contextual explícita D-A utilizada en la contradicción derivada A-C frente a C-A.',
          score: 93,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-derived-consistency-da',
          },
          evidence: {
            memoryIds: [
              'memory-controlled-derived-consistency-da-1',
              'memory-controlled-derived-consistency-da-2',
              'memory-controlled-derived-consistency-da-3',
              'memory-controlled-derived-consistency-da-4',
            ],
          },
        },
      ];

      const controlledKnowledge =
        generateOperationalKnowledge(controlledPatterns);

      if (controlledKnowledge.length !== 4) {
        throw new Error(
          `FASE 23.33 esperaba exactamente 4 conocimientos controlados y generó ${controlledKnowledge.length}.`
        );
      }

      const knowledgeAB =
        controlledKnowledge.find(
          (knowledge) =>
            knowledge.sourcePatternId ===
            controlledPatterns[0].id
        );

      const knowledgeBC =
        controlledKnowledge.find(
          (knowledge) =>
            knowledge.sourcePatternId ===
            controlledPatterns[1].id
        );

      const knowledgeCD =
        controlledKnowledge.find(
          (knowledge) =>
            knowledge.sourcePatternId ===
            controlledPatterns[2].id
        );

      const knowledgeDA =
        controlledKnowledge.find(
          (knowledge) =>
            knowledge.sourcePatternId ===
            controlledPatterns[3].id
        );

      if (
        !knowledgeAB ||
        !knowledgeBC ||
        !knowledgeCD ||
        !knowledgeDA
      ) {
        throw new Error(
          'FASE 23.33 no pudo resolver los cuatro conocimientos controlados.'
        );
      }

      const uniqueKnowledgeIds = new Set([
        knowledgeAB.id,
        knowledgeBC.id,
        knowledgeCD.id,
        knowledgeDA.id,
      ]);

      if (uniqueKnowledgeIds.size !== 4) {
        throw new Error(
          'FASE 23.33 esperaba cuatro knowledgeId independientes.'
        );
      }

      const eligibilityAB =
        evaluateOperationalKnowledgeEligibility(
          knowledgeAB,
          { movementType: 'reubicacion' }
        );

      const eligibilityBC =
        evaluateOperationalKnowledgeEligibility(
          knowledgeBC,
          { movementType: 'reubicacion' }
        );

      const eligibilityCD =
        evaluateOperationalKnowledgeEligibility(
          knowledgeCD,
          { movementType: 'reubicacion' }
        );

      const eligibilityDA =
        evaluateOperationalKnowledgeEligibility(
          knowledgeDA,
          { movementType: 'reubicacion' }
        );

      const considerationAB =
        considerOperationalKnowledge(eligibilityAB);

      const considerationBC =
        considerOperationalKnowledge(eligibilityBC);

      const considerationCD =
        considerOperationalKnowledge(eligibilityCD);

      const considerationDA =
        considerOperationalKnowledge(eligibilityDA);

      if (
        !considerationAB ||
        !considerationBC ||
        !considerationCD ||
        !considerationDA
      ) {
        throw new Error(
          'FASE 23.33 esperaba consideración válida para los cuatro conocimientos.'
        );
      }

      if (
        considerationAB.knowledgeId !== knowledgeAB.id ||
        considerationBC.knowledgeId !== knowledgeBC.id ||
        considerationCD.knowledgeId !== knowledgeCD.id ||
        considerationDA.knowledgeId !== knowledgeDA.id
      ) {
        throw new Error(
          'FASE 23.33 perdió trazabilidad entre consideración y conocimiento.'
        );
      }

      type ControlledKnowledge =
        (typeof controlledKnowledge)[number];

      type ControlledDecisionPreference = {
        decisionIds: [string, string];
        relation:
          | 'no_contextual_preference'
          | 'contextual_preference';
        preferredDecisionId: string | null;
        knowledgeId: string | null;
        rationale: string | null;
      };

      type ControlledDecisionPrecedence = {
        decisionIds: [string, string];
        relation:
          | 'no_contextual_precedence'
          | 'contextual_precedence';
        precedingDecisionId: string | null;
        precededDecisionId: string | null;
        knowledgeId: string | null;
        rationale: string | null;
      };

      type ControlledDecisionPrecedenceCoexistence = {
        decisionIds: [string, string, string];
        relation:
          | 'no_contextual_precedence_coexistence'
          | 'contextual_precedence_coexistence';
        precedences: ControlledDecisionPrecedence[];
        rationale: string | null;
      };

      type ControlledTransitiveSourcePrecedence = {
        precedingDecisionId: string;
        precededDecisionId: string;
        knowledgeId: string;
      };

      type ControlledTransitivePrecedence = {
        decisionIds: [string, string, string];
        relation:
          | 'no_contextual_transitive_precedence'
          | 'contextual_transitive_precedence';
        precedingDecisionId: string | null;
        intermediateDecisionId: string | null;
        precededDecisionId: string | null;
        sourcePrecedences:
          | [
              ControlledTransitiveSourcePrecedence,
              ControlledTransitiveSourcePrecedence,
            ]
          | null;
        rationale: string | null;
      };

      type ControlledTransitivePrecedenceCoexistence = {
        decisionIds: [string, string, string, string];
        relation:
          | 'no_contextual_transitive_precedence_coexistence'
          | 'contextual_transitive_precedence_coexistence';
        derivedPrecedences: ControlledTransitivePrecedence[];
        rationale: string | null;
      };

      type ControlledDerivedPrecedenceConflict = {
        firstDerivedPrecedence: {
          precedingDecisionId: string;
          intermediateDecisionId: string;
          precededDecisionId: string;
          sourcePrecedences: [
            ControlledTransitiveSourcePrecedence,
            ControlledTransitiveSourcePrecedence,
          ];
        };
        secondDerivedPrecedence: {
          precedingDecisionId: string;
          intermediateDecisionId: string;
          precededDecisionId: string;
          sourcePrecedences: [
            ControlledTransitiveSourcePrecedence,
            ControlledTransitiveSourcePrecedence,
          ];
        };
      };

      type ControlledDerivedPrecedenceConsistency = {
        decisionIds: [string, string, string, string];
        relation:
          | 'contextual_derived_precedence_consistent'
          | 'contextual_derived_precedence_inconsistent';
        consistent: boolean;
        conflict: ControlledDerivedPrecedenceConflict | null;
        rationale: string;
      };

      const determineControlledPreference = (
        first: OperationalDecision,
        second: OperationalDecision,
        consideredKnowledge: ControlledKnowledge | null,
        expectedDeviationReason: string,
        expectedFirstAction: string,
        expectedSecondAction: string
      ): ControlledDecisionPreference => {
        if (!consideredKnowledge) {
          return {
            decisionIds: [first.id, second.id],
            relation: 'no_contextual_preference',
            preferredDecisionId: null,
            knowledgeId: null,
            rationale: null,
          };
        }

        const knowledgeApplies =
          consideredKnowledge.context.movementType ===
            'reubicacion' &&
          consideredKnowledge.context.deviationReason ===
            expectedDeviationReason;

        const firstMatches =
          first.action === expectedFirstAction;

        const secondMatches =
          second.action === expectedSecondAction;

        if (
          !knowledgeApplies ||
          !firstMatches ||
          !secondMatches
        ) {
          return {
            decisionIds: [first.id, second.id],
            relation: 'no_contextual_preference',
            preferredDecisionId: null,
            knowledgeId: null,
            rationale: null,
          };
        }

        return {
          decisionIds: [first.id, second.id],
          relation: 'contextual_preference',
          preferredDecisionId: first.id,
          knowledgeId: consideredKnowledge.id,
          rationale:
            `El conocimiento "${consideredKnowledge.id}" ` +
            `hace contextualmente preferible "${first.id}" ` +
            `frente a "${second.id}".`,
        };
      };

      const determineControlledPrecedence = (
        preference: ControlledDecisionPreference
      ): ControlledDecisionPrecedence => {
        if (
          preference.relation !==
            'contextual_preference' ||
          !preference.preferredDecisionId ||
          !preference.knowledgeId ||
          !preference.rationale
        ) {
          return {
            decisionIds: [
              preference.decisionIds[0],
              preference.decisionIds[1],
            ],
            relation: 'no_contextual_precedence',
            precedingDecisionId: null,
            precededDecisionId: null,
            knowledgeId: null,
            rationale: null,
          };
        }

        const [
          firstDecisionId,
          secondDecisionId,
        ] = preference.decisionIds;

        if (
          preference.preferredDecisionId !==
            firstDecisionId &&
          preference.preferredDecisionId !==
            secondDecisionId
        ) {
          return {
            decisionIds: [
              firstDecisionId,
              secondDecisionId,
            ],
            relation: 'no_contextual_precedence',
            precedingDecisionId: null,
            precededDecisionId: null,
            knowledgeId: null,
            rationale: null,
          };
        }

        return {
          decisionIds: [
            firstDecisionId,
            secondDecisionId,
          ],
          relation: 'contextual_precedence',
          precedingDecisionId:
            preference.preferredDecisionId,
          precededDecisionId:
            preference.preferredDecisionId ===
            firstDecisionId
              ? secondDecisionId
              : firstDecisionId,
          knowledgeId: preference.knowledgeId,
          rationale:
            `${preference.rationale} ` +
            `La preferencia establece una precedencia contextual explícita.`,
        };
      };

      const determineControlledPrecedenceCoexistence = (
        decisionIds: [string, string, string],
        precedences: ControlledDecisionPrecedence[]
      ): ControlledDecisionPrecedenceCoexistence => {
        const contextualPrecedences =
          precedences.filter(
            (precedence) =>
              precedence.relation ===
                'contextual_precedence' &&
              precedence.precedingDecisionId !== null &&
              precedence.precededDecisionId !== null &&
              precedence.knowledgeId !== null
          );

        if (contextualPrecedences.length !== 2) {
          return {
            decisionIds: [
              decisionIds[0],
              decisionIds[1],
              decisionIds[2],
            ],
            relation:
              'no_contextual_precedence_coexistence',
            precedences: [],
            rationale: null,
          };
        }

        return {
          decisionIds: [
            decisionIds[0],
            decisionIds[1],
            decisionIds[2],
          ],
          relation:
            'contextual_precedence_coexistence',
          precedences: [
            contextualPrecedences[0],
            contextualPrecedences[1],
          ],
          rationale:
            `Dos precedencias contextuales explícitas ` +
            `coexisten sin materializar relaciones derivadas.`,
        };
      };

      const deriveControlledTransitivePrecedence = (
        coexistence: ControlledDecisionPrecedenceCoexistence
      ): ControlledTransitivePrecedence => {
        const precedences =
          coexistence.precedences.filter(
            (precedence) =>
              precedence.relation ===
                'contextual_precedence' &&
              precedence.precedingDecisionId !== null &&
              precedence.precededDecisionId !== null &&
              precedence.knowledgeId !== null
          );

        if (precedences.length !== 2) {
          return {
            decisionIds: [
              coexistence.decisionIds[0],
              coexistence.decisionIds[1],
              coexistence.decisionIds[2],
            ],
            relation:
              'no_contextual_transitive_precedence',
            precedingDecisionId: null,
            intermediateDecisionId: null,
            precededDecisionId: null,
            sourcePrecedences: null,
            rationale: null,
          };
        }

        const firstPrecedence = precedences[0];
        const secondPrecedence = precedences[1];

        if (
          !firstPrecedence ||
          !secondPrecedence ||
          !firstPrecedence.precedingDecisionId ||
          !firstPrecedence.precededDecisionId ||
          !firstPrecedence.knowledgeId ||
          !secondPrecedence.precedingDecisionId ||
          !secondPrecedence.precededDecisionId ||
          !secondPrecedence.knowledgeId
        ) {
          return {
            decisionIds: [
              coexistence.decisionIds[0],
              coexistence.decisionIds[1],
              coexistence.decisionIds[2],
            ],
            relation:
              'no_contextual_transitive_precedence',
            precedingDecisionId: null,
            intermediateDecisionId: null,
            precededDecisionId: null,
            sourcePrecedences: null,
            rationale: null,
          };
        }

        const composesForward =
          firstPrecedence.precededDecisionId ===
            secondPrecedence.precedingDecisionId;

        const composesReverse =
          secondPrecedence.precededDecisionId ===
            firstPrecedence.precedingDecisionId;

        if (composesForward) {
          return {
            decisionIds: [
              coexistence.decisionIds[0],
              coexistence.decisionIds[1],
              coexistence.decisionIds[2],
            ],
            relation:
              'contextual_transitive_precedence',
            precedingDecisionId:
              firstPrecedence.precedingDecisionId,
            intermediateDecisionId:
              firstPrecedence.precededDecisionId,
            precededDecisionId:
              secondPrecedence.precededDecisionId,
            sourcePrecedences: [
              {
                precedingDecisionId:
                  firstPrecedence.precedingDecisionId,
                precededDecisionId:
                  firstPrecedence.precededDecisionId,
                knowledgeId:
                  firstPrecedence.knowledgeId,
              },
              {
                precedingDecisionId:
                  secondPrecedence.precedingDecisionId,
                precededDecisionId:
                  secondPrecedence.precededDecisionId,
                knowledgeId:
                  secondPrecedence.knowledgeId,
              },
            ],
            rationale:
              `Dos precedencias explícitas componibles ` +
              `permiten una única derivación transitiva controlada.`,
          };
        }

        if (composesReverse) {
          return {
            decisionIds: [
              coexistence.decisionIds[0],
              coexistence.decisionIds[1],
              coexistence.decisionIds[2],
            ],
            relation:
              'contextual_transitive_precedence',
            precedingDecisionId:
              secondPrecedence.precedingDecisionId,
            intermediateDecisionId:
              secondPrecedence.precededDecisionId,
            precededDecisionId:
              firstPrecedence.precededDecisionId,
            sourcePrecedences: [
              {
                precedingDecisionId:
                  secondPrecedence.precedingDecisionId,
                precededDecisionId:
                  secondPrecedence.precededDecisionId,
                knowledgeId:
                  secondPrecedence.knowledgeId,
              },
              {
                precedingDecisionId:
                  firstPrecedence.precedingDecisionId,
                precededDecisionId:
                  firstPrecedence.precededDecisionId,
                knowledgeId:
                  firstPrecedence.knowledgeId,
              },
            ],
            rationale:
              `Dos precedencias explícitas componibles ` +
              `permiten una única derivación transitiva controlada.`,
          };
        }

        return {
          decisionIds: [
            coexistence.decisionIds[0],
            coexistence.decisionIds[1],
            coexistence.decisionIds[2],
          ],
          relation:
            'no_contextual_transitive_precedence',
          precedingDecisionId: null,
          intermediateDecisionId: null,
          precededDecisionId: null,
          sourcePrecedences: null,
          rationale: null,
        };
      };

      /*
       * NUEVO CONSUMIDOR DE FASE 23.33.
       *
       * Recibe relaciones transitivas ya derivadas.
       *
       * Únicamente reconoce su coexistencia plural.
       *
       * No modifica las derivaciones recibidas.
       * No las combina.
       * No genera una nueva precedencia.
       * No realimenta la transitividad.
       */
      const determineControlledTransitivePrecedenceCoexistence = (
        decisionIds: [string, string, string, string],
        derivedPrecedences: ControlledTransitivePrecedence[]
      ): ControlledTransitivePrecedenceCoexistence => {
        const validDerivedPrecedences =
          derivedPrecedences.filter(
            (precedence) =>
              precedence.relation ===
                'contextual_transitive_precedence' &&
              precedence.precedingDecisionId !== null &&
              precedence.intermediateDecisionId !== null &&
              precedence.precededDecisionId !== null &&
              precedence.sourcePrecedences !== null
          );

        if (validDerivedPrecedences.length !== 2) {
          return {
            decisionIds: [
              decisionIds[0],
              decisionIds[1],
              decisionIds[2],
              decisionIds[3],
            ],
            relation:
              'no_contextual_transitive_precedence_coexistence',
            derivedPrecedences: [],
            rationale: null,
          };
        }

        return {
          decisionIds: [
            decisionIds[0],
            decisionIds[1],
            decisionIds[2],
            decisionIds[3],
          ],
          relation:
            'contextual_transitive_precedence_coexistence',
          derivedPrecedences: [
            validDerivedPrecedences[0],
            validDerivedPrecedences[1],
          ],
          rationale:
            `Dos relaciones transitivas derivadas coexisten ` +
            `sin fusionarse ni producir nuevas derivaciones.`,
        };
      };

      const evaluateControlledDerivedPrecedenceConsistency = (
        coexistence: ControlledTransitivePrecedenceCoexistence,
      ): ControlledDerivedPrecedenceConsistency => {
        const [firstDerivedPrecedence, secondDerivedPrecedence] =
          coexistence.derivedPrecedences;

        if (!firstDerivedPrecedence || !secondDerivedPrecedence) {
          throw new Error(
            'FASE 23.33: la consistencia derivada requiere exactamente dos relaciones transitivas derivadas coexistentes.',
          );
        }

        const firstPrecedingDecisionId =
          firstDerivedPrecedence.precedingDecisionId;
        const firstIntermediateDecisionId =
          firstDerivedPrecedence.intermediateDecisionId;
        const firstPrecededDecisionId =
          firstDerivedPrecedence.precededDecisionId;
        const firstSourcePrecedences =
          firstDerivedPrecedence.sourcePrecedences;

        const secondPrecedingDecisionId =
          secondDerivedPrecedence.precedingDecisionId;
        const secondIntermediateDecisionId =
          secondDerivedPrecedence.intermediateDecisionId;
        const secondPrecededDecisionId =
          secondDerivedPrecedence.precededDecisionId;
        const secondSourcePrecedences =
          secondDerivedPrecedence.sourcePrecedences;

        if (
          firstPrecedingDecisionId === null ||
          firstIntermediateDecisionId === null ||
          firstPrecededDecisionId === null ||
          firstSourcePrecedences === null ||
          secondPrecedingDecisionId === null ||
          secondIntermediateDecisionId === null ||
          secondPrecededDecisionId === null ||
          secondSourcePrecedences === null
        ) {
          throw new Error(
            'FASE 23.33: la consistencia derivada requiere relaciones transitivas completas con extremos, decisión intermedia y genealogía causal.',
          );
        }

        const hasDirectDirectionalContradiction =
          firstPrecedingDecisionId === secondPrecededDecisionId &&
          firstPrecededDecisionId === secondPrecedingDecisionId;

        if (hasDirectDirectionalContradiction) {
          return {
            decisionIds: coexistence.decisionIds,
            relation: 'contextual_derived_precedence_inconsistent',
            consistent: false,
            conflict: {
              firstDerivedPrecedence: {
                precedingDecisionId: firstPrecedingDecisionId,
                intermediateDecisionId: firstIntermediateDecisionId,
                precededDecisionId: firstPrecededDecisionId,
                sourcePrecedences: firstSourcePrecedences,
              },
              secondDerivedPrecedence: {
                precedingDecisionId: secondPrecedingDecisionId,
                intermediateDecisionId: secondIntermediateDecisionId,
                precededDecisionId: secondPrecededDecisionId,
                sourcePrecedences: secondSourcePrecedences,
              },
            },
            rationale:
              'Las relaciones transitivas derivadas presentan una contradicción direccional directa entre sus extremos, conservando intactas sus genealogías causales independientes.',
          };
        }

        return {
          decisionIds: coexistence.decisionIds,
          relation: 'contextual_derived_precedence_consistent',
          consistent: true,
          conflict: null,
          rationale:
            'Las relaciones transitivas derivadas coexistentes no presentan contradicción direccional directa y conservan identidad, dirección y genealogía causal independientes.',
        };
      };

      const preferenceAB =
        determineControlledPreference(
          firstDecision,
          secondDecision,
          knowledgeAB,
          'motivo-controlado-derived-coexistence-ab',
          firstDecision.action,
          secondDecision.action
        );

      const preferenceBC =
        determineControlledPreference(
          secondDecision,
          thirdDecision,
          knowledgeBC,
          'motivo-controlado-derived-coexistence-bc',
          secondDecision.action,
          thirdDecision.action
        );

      const preferenceCD =
        determineControlledPreference(
          thirdDecision,
          fourthDecision,
          knowledgeCD,
          'motivo-controlado-derived-coexistence-cd',
          thirdDecision.action,
          fourthDecision.action
        );

      const preferenceDA =
        determineControlledPreference(
          fourthDecision,
          firstDecision,
          knowledgeDA,
          'motivo-controlado-derived-consistency-da',
          fourthDecision.action,
          firstDecision.action
        );

      const precedenceAB =
        determineControlledPrecedence(preferenceAB);

      const precedenceBC =
        determineControlledPrecedence(preferenceBC);

      const precedenceCD =
        determineControlledPrecedence(preferenceCD);

      const precedenceDA =
        determineControlledPrecedence(preferenceDA);

      const firstSourceCoexistence =
        determineControlledPrecedenceCoexistence(
          [
            firstDecision.id,
            secondDecision.id,
            thirdDecision.id,
          ],
          [precedenceAB, precedenceBC]
        );

      const secondSourceCoexistence =
        determineControlledPrecedenceCoexistence(
          [
            secondDecision.id,
            thirdDecision.id,
            fourthDecision.id,
          ],
          [precedenceBC, precedenceCD]
        );

      const contradictorySourceCoexistence =
        determineControlledPrecedenceCoexistence(
          [
            thirdDecision.id,
            fourthDecision.id,
            firstDecision.id,
          ],
          [precedenceCD, precedenceDA]
        );

      const derivedAC =
        deriveControlledTransitivePrecedence(
          firstSourceCoexistence
        );

      const derivedBD =
        deriveControlledTransitivePrecedence(
          secondSourceCoexistence
        );

      const derivedCA =
        deriveControlledTransitivePrecedence(
          contradictorySourceCoexistence
        );

      const derivedCoexistence =
        determineControlledTransitivePrecedenceCoexistence(
          [
            firstDecision.id,
            secondDecision.id,
            thirdDecision.id,
            fourthDecision.id,
          ],
          [derivedAC, derivedBD]
        );

      const contradictoryDerivedCoexistence =
        determineControlledTransitivePrecedenceCoexistence(
          [
            firstDecision.id,
            secondDecision.id,
            thirdDecision.id,
            fourthDecision.id,
          ],
          [derivedAC, derivedCA]
        );

      const contradictoryDerivedPrecedenceConsistency =
        evaluateControlledDerivedPrecedenceConsistency(
          contradictoryDerivedCoexistence,
        );

      const derivedPrecedenceConsistency =
        evaluateControlledDerivedPrecedenceConsistency(
          derivedCoexistence,
        );

      if (
        derivedPrecedenceConsistency.relation !==
          'contextual_derived_precedence_consistent' ||
        derivedPrecedenceConsistency.consistent !== true ||
        derivedPrecedenceConsistency.conflict !== null ||
        contradictoryDerivedPrecedenceConsistency.relation !==
          'contextual_derived_precedence_inconsistent' ||
        contradictoryDerivedPrecedenceConsistency.consistent !== false ||
        contradictoryDerivedPrecedenceConsistency.conflict === null ||
        preferenceAB.relation !==
          'contextual_preference' ||
        preferenceBC.relation !==
          'contextual_preference' ||
        preferenceCD.relation !==
          'contextual_preference' ||
        preferenceDA.relation !==
          'contextual_preference'
      ) {
        throw new Error(
          'FASE 23.33 no produjo las cuatro preferencias contextuales controladas.'
        );
      }

      const contradictoryConflict =
        contradictoryDerivedPrecedenceConsistency.conflict;

      if (!contradictoryConflict) {
        throw new Error(
          'FASE 23.33 esperaba conservar un conflicto trazable entre las relaciones derivadas A-C y C-A.'
        );
      }

      if (
        contradictoryConflict.firstDerivedPrecedence.precedingDecisionId !==
          firstDecision.id ||
        contradictoryConflict.firstDerivedPrecedence.intermediateDecisionId !==
          secondDecision.id ||
        contradictoryConflict.firstDerivedPrecedence.precededDecisionId !==
          thirdDecision.id ||
        contradictoryConflict.secondDerivedPrecedence.precedingDecisionId !==
          thirdDecision.id ||
        contradictoryConflict.secondDerivedPrecedence.intermediateDecisionId !==
          fourthDecision.id ||
        contradictoryConflict.secondDerivedPrecedence.precededDecisionId !==
          firstDecision.id
      ) {
        throw new Error(
          'FASE 23.33 perdió dirección o decisión intermedia al representar la contradicción entre A-C y C-A.'
        );
      }

      const [
        conflictingFirstSourceOne,
        conflictingFirstSourceTwo,
      ] =
        contradictoryConflict.firstDerivedPrecedence.sourcePrecedences;

      const [
        conflictingSecondSourceOne,
        conflictingSecondSourceTwo,
      ] =
        contradictoryConflict.secondDerivedPrecedence.sourcePrecedences;

      if (
        conflictingFirstSourceOne.precedingDecisionId !== firstDecision.id ||
        conflictingFirstSourceOne.precededDecisionId !== secondDecision.id ||
        conflictingFirstSourceOne.knowledgeId !== knowledgeAB.id ||
        conflictingFirstSourceTwo.precedingDecisionId !== secondDecision.id ||
        conflictingFirstSourceTwo.precededDecisionId !== thirdDecision.id ||
        conflictingFirstSourceTwo.knowledgeId !== knowledgeBC.id ||
        conflictingSecondSourceOne.precedingDecisionId !== thirdDecision.id ||
        conflictingSecondSourceOne.precededDecisionId !== fourthDecision.id ||
        conflictingSecondSourceOne.knowledgeId !== knowledgeCD.id ||
        conflictingSecondSourceTwo.precedingDecisionId !== fourthDecision.id ||
        conflictingSecondSourceTwo.precededDecisionId !== firstDecision.id ||
        conflictingSecondSourceTwo.knowledgeId !== knowledgeDA.id
      ) {
        throw new Error(
          'FASE 23.33 perdió la genealogía causal o los knowledgeId originales de las relaciones derivadas contradictorias.'
        );
      }

      if (
        precedenceAB.relation !==
          'contextual_precedence' ||
        precedenceBC.relation !==
          'contextual_precedence' ||
        precedenceCD.relation !==
          'contextual_precedence' ||
        precedenceDA.relation !==
          'contextual_precedence'
      ) {
        throw new Error(
          'FASE 23.33 no produjo las cuatro precedencias explícitas esperadas.'
        );
      }

      if (
        precedenceAB.precedingDecisionId !==
          firstDecision.id ||
        precedenceAB.precededDecisionId !==
          secondDecision.id ||
        precedenceBC.precedingDecisionId !==
          secondDecision.id ||
        precedenceBC.precededDecisionId !==
          thirdDecision.id ||
        precedenceCD.precedingDecisionId !==
          thirdDecision.id ||
        precedenceCD.precededDecisionId !==
          fourthDecision.id ||
        precedenceDA.precedingDecisionId !==
          fourthDecision.id ||
        precedenceDA.precededDecisionId !==
          firstDecision.id
      ) {
        throw new Error(
          'FASE 23.33 produjo una dirección incorrecta en alguna precedencia explícita.'
        );
      }

      if (
        precedenceAB.knowledgeId !== knowledgeAB.id ||
        precedenceBC.knowledgeId !== knowledgeBC.id ||
        precedenceCD.knowledgeId !== knowledgeCD.id ||
        precedenceDA.knowledgeId !== knowledgeDA.id
      ) {
        throw new Error(
          'FASE 23.33 perdió atribución individual mediante knowledgeId.'
        );
      }

      if (
        derivedAC.relation !==
          'contextual_transitive_precedence' ||
        derivedAC.precedingDecisionId !==
          firstDecision.id ||
        derivedAC.intermediateDecisionId !==
          secondDecision.id ||
        derivedAC.precededDecisionId !==
          thirdDecision.id ||
        !derivedAC.sourcePrecedences
      ) {
        throw new Error(
          'FASE 23.33 no produjo correctamente R1 = A-C.'
        );
      }

      if (
        derivedBD.relation !==
          'contextual_transitive_precedence' ||
        derivedBD.precedingDecisionId !==
          secondDecision.id ||
        derivedBD.intermediateDecisionId !==
          thirdDecision.id ||
        derivedBD.precededDecisionId !==
          fourthDecision.id ||
        !derivedBD.sourcePrecedences
      ) {
        throw new Error(
          'FASE 23.33 no produjo correctamente R2 = B-D.'
        );
      }

      if (
        derivedCA.relation !==
          'contextual_transitive_precedence' ||
        derivedCA.precedingDecisionId !==
          thirdDecision.id ||
        derivedCA.intermediateDecisionId !==
          fourthDecision.id ||
        derivedCA.precededDecisionId !==
          firstDecision.id ||
        !derivedCA.sourcePrecedences
      ) {
        throw new Error(
          'FASE 23.33 no produjo correctamente R3 = C-A.'
        );
      }

      const [
        derivedACFirstSource,
        derivedACSecondSource,
      ] = derivedAC.sourcePrecedences;

      const [
        derivedBDFirstSource,
        derivedBDSecondSource,
      ] = derivedBD.sourcePrecedences;

      const [
        derivedCAFirstSource,
        derivedCASecondSource,
      ] = derivedCA.sourcePrecedences;

      if (
        derivedACFirstSource.precedingDecisionId !==
          firstDecision.id ||
        derivedACFirstSource.precededDecisionId !==
          secondDecision.id ||
        derivedACFirstSource.knowledgeId !==
          knowledgeAB.id ||
        derivedACSecondSource.precedingDecisionId !==
          secondDecision.id ||
        derivedACSecondSource.precededDecisionId !==
          thirdDecision.id ||
        derivedACSecondSource.knowledgeId !==
          knowledgeBC.id
      ) {
        throw new Error(
          'FASE 23.33 perdió la genealogía causal de R1 = A-C.'
        );
      }

      if (
        derivedBDFirstSource.precedingDecisionId !==
          secondDecision.id ||
        derivedBDFirstSource.precededDecisionId !==
          thirdDecision.id ||
        derivedBDFirstSource.knowledgeId !==
          knowledgeBC.id ||
        derivedBDSecondSource.precedingDecisionId !==
          thirdDecision.id ||
        derivedBDSecondSource.precededDecisionId !==
          fourthDecision.id ||
        derivedBDSecondSource.knowledgeId !==
          knowledgeCD.id
      ) {
        throw new Error(
          'FASE 23.33 perdió la genealogía causal de R2 = B-D.'
        );
      }

      if (
        derivedCAFirstSource.precedingDecisionId !==
          thirdDecision.id ||
        derivedCAFirstSource.precededDecisionId !==
          fourthDecision.id ||
        derivedCAFirstSource.knowledgeId !==
          knowledgeCD.id ||
        derivedCASecondSource.precedingDecisionId !==
          fourthDecision.id ||
        derivedCASecondSource.precededDecisionId !==
          firstDecision.id ||
        derivedCASecondSource.knowledgeId !==
          knowledgeDA.id
      ) {
        throw new Error(
          'FASE 23.33 perdió la genealogía causal de R3 = C-A.'
        );
      }

      if (
        derivedCoexistence.derivedPrecedences.length !== 2 ||
        derivedCoexistence.derivedPrecedences[0] !== derivedAC ||
        derivedCoexistence.derivedPrecedences[1] !== derivedBD
      ) {
        throw new Error(
          'FASE 23.33 alteró la coexistencia derivada consistente o introdujo inferencias adicionales.'
        );
      }

      if (
        contradictoryDerivedCoexistence.derivedPrecedences.length !== 2 ||
        contradictoryDerivedCoexistence.derivedPrecedences[0] !== derivedAC ||
        contradictoryDerivedCoexistence.derivedPrecedences[1] !== derivedCA
      ) {
        throw new Error(
          'FASE 23.33 alteró la coexistencia derivada contradictoria o introdujo inferencias adicionales.'
        );
      }

      /*
       * K2 / B-C debe ser exactamente la fuente causal
       * compartida entre las dos relaciones derivadas.
       */
      const sharedSourceIsPreserved =
        derivedACSecondSource.precedingDecisionId ===
          derivedBDFirstSource.precedingDecisionId &&
        derivedACSecondSource.precededDecisionId ===
          derivedBDFirstSource.precededDecisionId &&
        derivedACSecondSource.knowledgeId ===
          derivedBDFirstSource.knowledgeId &&
        derivedACSecondSource.knowledgeId ===
          knowledgeBC.id;

      if (!sharedSourceIsPreserved) {
        throw new Error(
          'FASE 23.33 perdió la fuente causal compartida B-C / K2 entre ambas derivaciones.'
        );
      }

      if (
        derivedCoexistence.relation !==
          'contextual_transitive_precedence_coexistence' ||
        derivedCoexistence.derivedPrecedences.length !== 2
      ) {
        throw new Error(
          'FASE 23.33 no estableció coexistencia plural entre las dos relaciones derivadas.'
        );
      }

      if (
        derivedCoexistence.derivedPrecedences[0] !==
          derivedAC ||
        derivedCoexistence.derivedPrecedences[1] !==
          derivedBD
      ) {
        throw new Error(
          'FASE 23.33 sustituyó o fusionó las relaciones derivadas durante su coexistencia.'
        );
      }

      /*
       * Las derivadas no deben convertirse en explícitas.
       */
      if (
        firstSourceCoexistence.precedences.length !== 2 ||
        secondSourceCoexistence.precedences.length !== 2
      ) {
        throw new Error(
          'FASE 23.33 modificó la cardinalidad de alguna coexistencia explícita fuente.'
        );
      }

      const derivedInsertedAsExplicit =
        firstSourceCoexistence.precedences.some(
          (precedence) =>
            precedence.precedingDecisionId ===
              firstDecision.id &&
            precedence.precededDecisionId ===
              thirdDecision.id
        ) ||
        secondSourceCoexistence.precedences.some(
          (precedence) =>
            precedence.precedingDecisionId ===
              secondDecision.id &&
            precedence.precededDecisionId ===
              fourthDecision.id
        );

      if (derivedInsertedAsExplicit) {
        throw new Error(
          'FASE 23.33 materializó indebidamente una relación derivada como precedencia explícita.'
        );
      }

      /*
       * No debe aparecer A -> D.
       *
       * Su presencia significaría que una derivación ya
       * producida volvió a participar en otra inferencia.
       */
      const propagatedAD =
        derivedCoexistence.derivedPrecedences.some(
          (precedence) =>
            precedence.precedingDecisionId ===
              firstDecision.id &&
            precedence.precededDecisionId ===
              fourthDecision.id
        );

      if (propagatedAD) {
        throw new Error(
          'FASE 23.33 propagó indebidamente la transitividad y produjo A-D.'
        );
      }

      /*
       * La coexistencia no debe fabricar atribución causal
       * global ni conceptos propios de fases posteriores.
       */
      if (
        'knowledgeId' in derivedCoexistence ||
        'sourcePatternId' in derivedCoexistence ||
        'memoryIds' in derivedCoexistence ||
        'occurrences' in derivedCoexistence ||
        'closure' in derivedCoexistence ||
        'transitiveClosure' in derivedCoexistence ||
        'partialOrder' in derivedCoexistence ||
        'orderedDecisionIds' in derivedCoexistence ||
        'sortedDecisionIds' in derivedCoexistence ||
        'order' in derivedCoexistence ||
        'rank' in derivedCoexistence ||
        'ranking' in derivedCoexistence ||
        'position' in derivedCoexistence ||
        'score' in derivedCoexistence ||
        'weight' in derivedCoexistence ||
        'confidence' in derivedCoexistence ||
        'priority' in derivedCoexistence ||
        'winner' in derivedCoexistence ||
        'loser' in derivedCoexistence ||
        'selected' in derivedCoexistence ||
        'selection' in derivedCoexistence ||
        'executed' in derivedCoexistence ||
        'execution' in derivedCoexistence
      ) {
        throw new Error(
          'FASE 23.33 detectó atribución global, cierre transitivo, orden parcial, ranking, ponderación, selección o ejecución.'
        );
      }

      /*
       * Ninguna operación debe modificar las precedencias
       * explícitas fuente.
       */
      if (
        JSON.stringify(
          firstSourceCoexistence.precedences
        ) !==
          JSON.stringify([
            precedenceAB,
            precedenceBC,
          ]) ||
        JSON.stringify(
          secondSourceCoexistence.precedences
        ) !==
          JSON.stringify([
            precedenceBC,
            precedenceCD,
          ])
      ) {
        throw new Error(
          'FASE 23.33 modificó alguna precedencia explícita fuente.'
        );
      }

      /*
       * Las recomendaciones y decisiones productivas deben
       * permanecer completamente intactas.
       */
      const recommendationsAfterCoexistence =
        generateRecommendationsFromPatterns(
          detectedPatterns
        );

      const decisionsAfterCoexistence =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsAfterCoexistence
        );

      if (
        JSON.stringify(recommendationsAfterCoexistence) !==
        JSON.stringify(recommendationsBeforeCoexistence)
      ) {
        throw new Error(
          'FASE 23.33 detectó modificación de recomendaciones productivas.'
        );
      }

      if (
        JSON.stringify(decisionsAfterCoexistence) !==
        JSON.stringify(decisionsBeforeCoexistence)
      ) {
        throw new Error(
          'FASE 23.33 detectó modificación, reordenamiento o ranking distinto de decisiones productivas.'
        );
      }

      const firstDecisionAfter =
        decisionsAfterCoexistence.find(
          (decision) =>
            decision.id === firstDecision.id
        );

      const secondDecisionAfter =
        decisionsAfterCoexistence.find(
          (decision) =>
            decision.id === secondDecision.id
        );

      const thirdDecisionAfter =
        decisionsAfterCoexistence.find(
          (decision) =>
            decision.id === thirdDecision.id
        );

      const fourthDecisionAfter =
        decisionsAfterCoexistence.find(
          (decision) =>
            decision.id === fourthDecision.id
        );

      if (
        !firstDecisionAfter ||
        !secondDecisionAfter ||
        !thirdDecisionAfter ||
        !fourthDecisionAfter
      ) {
        throw new Error(
          'FASE 23.33 perdió alguna alternativa productiva después del experimento.'
        );
      }

      if (
        JSON.stringify(firstDecisionAfter) !==
          firstDecisionSnapshot ||
        JSON.stringify(secondDecisionAfter) !==
          secondDecisionSnapshot ||
        JSON.stringify(thirdDecisionAfter) !==
          thirdDecisionSnapshot ||
        JSON.stringify(fourthDecisionAfter) !==
          fourthDecisionSnapshot
      ) {
        throw new Error(
          'FASE 23.33 alteró indirectamente alguna alternativa decisional productiva.'
        );
      }

      addLog(
        `FASE 23.33 OK: dos relaciones transitivas derivadas coexistentes fueron evaluadas contextualmente sin participar en nuevas inferencias; ${firstDecision.id} -> ${thirdDecision.id} mediante ${knowledgeAB.id} + ${knowledgeBC.id} coexistió consistentemente con ${secondDecision.id} -> ${fourthDecision.id} mediante ${knowledgeBC.id} + ${knowledgeCD.id}, mientras ${firstDecision.id} -> ${thirdDecision.id} mediante ${knowledgeAB.id} + ${knowledgeBC.id} y ${thirdDecision.id} -> ${firstDecision.id} mediante ${knowledgeCD.id} + ${knowledgeDA.id} fueron detectadas como contradicción direccional directa. La evaluación preservó dirección, intermediateDecisionId, sourcePrecedences y los knowledgeId originales de ambas genealogías, no fusionó relaciones, no generó knowledgeId agregado, no convirtió relaciones derivadas en explícitas, no produjo inferencias adicionales, no realimentó la transitividad y no introdujo composición derivada-derivada, composición derivada-explícita, propagación transitiva, cierre transitivo, orden parcial, reordenamiento, rank, score, ponderación, modificación de confidence o priority, selección ni ejecución, permaneciendo intactas ${recommendationsAfterCoexistence.length} recomendaciones y ${decisionsAfterCoexistence.length} decisiones productivas.`
      );
    } catch (error) {
      console.error(error);

      addLog(
        error instanceof Error
          ? `Error en consistencia contextual entre relaciones transitivas derivadas 23.33: ${error.message}`
          : 'Error inesperado en consistencia contextual entre relaciones transitivas derivadas 23.33.'
      );
    } finally {
      setLoading(false);
    }
  }

  async function testOperationalKnowledgeControlledDerivedPrecedenceConvergence() {
    setLoading(true);

    try {
      const detectedPatterns = await detectMemoryPatterns();

      const recommendationsBeforeConvergence =
        generateRecommendationsFromPatterns(detectedPatterns);

      const decisionsBeforeConvergence =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsBeforeConvergence
        );

      /*
      * FASE 23.34 — Convergencia contextual controlada de
      * relaciones transitivas derivadas por conocimiento
      * operativo.
      *
      * Dos genealogías causales independientes pueden
      * producir la misma relación transitiva derivada:
      *
      * A -> B [K1]
      * B -> D [K2]
      * => R1 = A -> D
      *
      * A -> C [K3]
      * C -> D [K4]
      * => R2 = A -> D
      *
      * R1 y R2 convergen sobre los mismos extremos y la
      * misma dirección, pero conservan diferentes:
      *
      * - intermediateDecisionId;
      * - sourcePrecedences;
      * - knowledgeId causales.
      *
      * La convergencia NO:
      *
      * - fusiona R1 y R2;
      * - deduplica las derivaciones;
      * - selecciona una genealogía;
      * - fabrica una tercera derivación A -> D;
      * - fabrica un knowledgeId agregado;
      * - agrega evidencia;
      * - contabiliza apoyo como fuerza;
      * - introduce reinforcement o strength;
      * - introduce weight;
      * - introduce score;
      * - modifica confidence;
      * - modifica priority;
      * - convierte derivadas en explícitas;
      * - compone derivadas entre sí;
      * - compone una derivada con una explícita;
      * - realimenta la transitividad;
      * - ejecuta propagación transitiva;
      * - ejecuta cierre transitivo;
      * - construye orden parcial;
      * - reordena decisiones;
      * - introduce ranking;
      * - selecciona;
      * - ejecuta.
      */

      const firstDecision =
        decisionsBeforeConvergence.find(
          (decision) =>
            decision.id === 'decision-review-movements'
        );

      const secondDecision =
        decisionsBeforeConvergence.find(
          (decision) =>
            decision.id === 'decision-maintain-monitoring'
        );

      const thirdDecision =
        decisionsBeforeConvergence.find(
          (decision) =>
            decision.id === 'decision-prioritize-high-value'
        );

      const fourthDecision =
        decisionsBeforeConvergence.find(
          (decision) =>
            decision.id ===
            'recommendation-prioritize-high-score-actions'
        );

      if (!firstDecision) {
        throw new Error(
          'FASE 23.34 no encontró decision-review-movements como alternativa A.'
        );
      }

      if (!secondDecision) {
        throw new Error(
          'FASE 23.34 no encontró decision-maintain-monitoring como alternativa B.'
        );
      }

      if (!thirdDecision) {
        throw new Error(
          'FASE 23.34 no encontró decision-prioritize-high-value como alternativa C.'
        );
      }

      if (!fourthDecision) {
        throw new Error(
          'FASE 23.34 no encontró recommendation-prioritize-high-score-actions como alternativa D.'
        );
      }

      const controlledDecisionIds = [
        firstDecision.id,
        secondDecision.id,
        thirdDecision.id,
        fourthDecision.id,
      ];

      if (new Set(controlledDecisionIds).size !== 4) {
        throw new Error(
          'FASE 23.34 esperaba cuatro alternativas decisionales distintas.'
        );
      }

      const firstDecisionSnapshot =
        JSON.stringify(firstDecision);

      const secondDecisionSnapshot =
        JSON.stringify(secondDecision);

      const thirdDecisionSnapshot =
        JSON.stringify(thirdDecision);

      const fourthDecisionSnapshot =
        JSON.stringify(fourthDecision);

      /*
      * Conocimientos controlados:
      *
      * K1 -> A -> B
      * K2 -> B -> D
      * K3 -> A -> C
      * K4 -> C -> D
      *
      * K1 + K2 => R1 = A -> D vía B.
      * K3 + K4 => R2 = A -> D vía C.
      *
      * K5 -> B -> C se utiliza exclusivamente para construir
      * R3 = A -> C mediante K1 + K5 y comprobar el escenario
      * negativo de no convergencia.
      */
      const controlledPatterns = [
        {
          id: 'recommendation-deviation-pattern-reubicacion-controlled-derived-convergence-ab',
          title:
            'Patrón controlado convergencia derivada A-B',
          description:
            'Patrón controlado para producir la precedencia contextual explícita A-B.',
          score: 97,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-derived-convergence-ab',
          },
          evidence: {
            memoryIds: [
              'memory-controlled-derived-convergence-ab-1',
              'memory-controlled-derived-convergence-ab-2',
              'memory-controlled-derived-convergence-ab-3',
              'memory-controlled-derived-convergence-ab-4',
            ],
          },
        },
        {
          id: 'recommendation-deviation-pattern-reubicacion-controlled-derived-convergence-bd',
          title:
            'Patrón controlado convergencia derivada B-D',
          description:
            'Patrón controlado para producir la precedencia contextual explícita B-D.',
          score: 96,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-derived-convergence-bd',
          },
          evidence: {
            memoryIds: [
              'memory-controlled-derived-convergence-bd-1',
              'memory-controlled-derived-convergence-bd-2',
              'memory-controlled-derived-convergence-bd-3',
              'memory-controlled-derived-convergence-bd-4',
            ],
          },
        },
        {
          id: 'recommendation-deviation-pattern-reubicacion-controlled-derived-convergence-ac',
          title:
            'Patrón controlado convergencia derivada A-C',
          description:
            'Patrón controlado para producir la precedencia contextual explícita A-C.',
          score: 95,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-derived-convergence-ac',
          },
          evidence: {
            memoryIds: [
              'memory-controlled-derived-convergence-ac-1',
              'memory-controlled-derived-convergence-ac-2',
              'memory-controlled-derived-convergence-ac-3',
              'memory-controlled-derived-convergence-ac-4',
            ],
          },
        },
        {
          id: 'recommendation-deviation-pattern-reubicacion-controlled-derived-convergence-cd',
          title:
            'Patrón controlado convergencia derivada C-D',
          description:
            'Patrón controlado para producir la precedencia contextual explícita C-D.',
          score: 94,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-derived-convergence-cd',
          },
          evidence: {
            memoryIds: [
              'memory-controlled-derived-convergence-cd-1',
              'memory-controlled-derived-convergence-cd-2',
              'memory-controlled-derived-convergence-cd-3',
              'memory-controlled-derived-convergence-cd-4',
            ],
          },
        },
        {
          id: 'recommendation-deviation-pattern-reubicacion-controlled-derived-convergence-bc-negative',
          title:
            'Patrón controlado no convergencia derivada B-C',
          description:
            'Patrón controlado para producir B-C exclusivamente para el escenario negativo.',
          score: 93,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-derived-convergence-bc-negative',
          },
          evidence: {
            memoryIds: [
              'memory-controlled-derived-convergence-bc-negative-1',
              'memory-controlled-derived-convergence-bc-negative-2',
              'memory-controlled-derived-convergence-bc-negative-3',
              'memory-controlled-derived-convergence-bc-negative-4',
            ],
          },
        },
      ];

      const controlledKnowledge =
        generateOperationalKnowledge(controlledPatterns);

      if (controlledKnowledge.length !== 5) {
        throw new Error(
          `FASE 23.34 esperaba exactamente 5 conocimientos controlados y generó ${controlledKnowledge.length}.`
        );
      }

      const knowledgeAB =
        controlledKnowledge.find(
          (knowledge) =>
            knowledge.sourcePatternId ===
            controlledPatterns[0].id
        );

      const knowledgeBD =
        controlledKnowledge.find(
          (knowledge) =>
            knowledge.sourcePatternId ===
            controlledPatterns[1].id
        );

      const knowledgeAC =
        controlledKnowledge.find(
          (knowledge) =>
            knowledge.sourcePatternId ===
            controlledPatterns[2].id
        );

      const knowledgeCD =
        controlledKnowledge.find(
          (knowledge) =>
            knowledge.sourcePatternId ===
            controlledPatterns[3].id
        );

      const knowledgeBCNegative =
        controlledKnowledge.find(
          (knowledge) =>
            knowledge.sourcePatternId ===
            controlledPatterns[4].id
        );

      if (
        !knowledgeAB ||
        !knowledgeBD ||
        !knowledgeAC ||
        !knowledgeCD ||
        !knowledgeBCNegative
      ) {
        throw new Error(
          'FASE 23.34 no pudo resolver los cinco conocimientos controlados.'
        );
      }

      if (
        new Set([
          knowledgeAB.id,
          knowledgeBD.id,
          knowledgeAC.id,
          knowledgeCD.id,
          knowledgeBCNegative.id,
        ]).size !== 5
      ) {
        throw new Error(
          'FASE 23.34 esperaba cinco knowledgeId independientes.'
        );
      }

      const considerationAB =
        considerOperationalKnowledge(
          evaluateOperationalKnowledgeEligibility(
            knowledgeAB,
            { movementType: 'reubicacion' }
          )
        );

      const considerationBD =
        considerOperationalKnowledge(
          evaluateOperationalKnowledgeEligibility(
            knowledgeBD,
            { movementType: 'reubicacion' }
          )
        );

      const considerationAC =
        considerOperationalKnowledge(
          evaluateOperationalKnowledgeEligibility(
            knowledgeAC,
            { movementType: 'reubicacion' }
          )
        );

      const considerationCD =
        considerOperationalKnowledge(
          evaluateOperationalKnowledgeEligibility(
            knowledgeCD,
            { movementType: 'reubicacion' }
          )
        );

      const considerationBCNegative =
        considerOperationalKnowledge(
          evaluateOperationalKnowledgeEligibility(
            knowledgeBCNegative,
            { movementType: 'reubicacion' }
          )
        );

      if (
        !considerationAB ||
        !considerationBD ||
        !considerationAC ||
        !considerationCD ||
        !considerationBCNegative
      ) {
        throw new Error(
          'FASE 23.34 esperaba consideración válida para los cinco conocimientos.'
        );
      }

      if (
        considerationAB.knowledgeId !== knowledgeAB.id ||
        considerationBD.knowledgeId !== knowledgeBD.id ||
        considerationAC.knowledgeId !== knowledgeAC.id ||
        considerationCD.knowledgeId !== knowledgeCD.id ||
        considerationBCNegative.knowledgeId !==
          knowledgeBCNegative.id
      ) {
        throw new Error(
          'FASE 23.34 perdió trazabilidad entre consideración y conocimiento.'
        );
      }

      type ControlledKnowledge =
        (typeof controlledKnowledge)[number];

      type ControlledDecisionPreference = {
        decisionIds: [string, string];
        relation:
          | 'no_contextual_preference'
          | 'contextual_preference';
        preferredDecisionId: string | null;
        knowledgeId: string | null;
        rationale: string | null;
      };

      type ControlledDecisionPrecedence = {
        decisionIds: [string, string];
        relation:
          | 'no_contextual_precedence'
          | 'contextual_precedence';
        precedingDecisionId: string | null;
        precededDecisionId: string | null;
        knowledgeId: string | null;
        rationale: string | null;
      };

      type ControlledDecisionPrecedenceCoexistence = {
        decisionIds: [string, string, string];
        relation:
          | 'no_contextual_precedence_coexistence'
          | 'contextual_precedence_coexistence';
        precedences: ControlledDecisionPrecedence[];
        rationale: string | null;
      };

      type ControlledTransitiveSourcePrecedence = {
        precedingDecisionId: string;
        precededDecisionId: string;
        knowledgeId: string;
      };

      type ControlledTransitivePrecedence = {
        decisionIds: [string, string, string];
        relation:
          | 'no_contextual_transitive_precedence'
          | 'contextual_transitive_precedence';
        precedingDecisionId: string | null;
        intermediateDecisionId: string | null;
        precededDecisionId: string | null;
        sourcePrecedences:
          | [
              ControlledTransitiveSourcePrecedence,
              ControlledTransitiveSourcePrecedence,
            ]
          | null;
        rationale: string | null;
      };

      type ControlledDerivedPrecedenceSnapshot = {
        precedingDecisionId: string;
        intermediateDecisionId: string;
        precededDecisionId: string;
        sourcePrecedences: [
          ControlledTransitiveSourcePrecedence,
          ControlledTransitiveSourcePrecedence,
        ];
      };

      type ControlledDerivedPrecedenceConvergence = {
        decisionIds: [string, string, string, string];
        relation:
          | 'no_contextual_derived_precedence_convergence'
          | 'contextual_derived_precedence_convergence';
        convergent: boolean;
        firstDerivedPrecedence:
          | ControlledDerivedPrecedenceSnapshot
          | null;
        secondDerivedPrecedence:
          | ControlledDerivedPrecedenceSnapshot
          | null;
        rationale: string;
      };

      const determineControlledPreference = (
        first: OperationalDecision,
        second: OperationalDecision,
        consideredKnowledge: ControlledKnowledge | null,
        expectedDeviationReason: string,
        expectedFirstAction: string,
        expectedSecondAction: string
      ): ControlledDecisionPreference => {
        if (!consideredKnowledge) {
          return {
            decisionIds: [first.id, second.id],
            relation: 'no_contextual_preference',
            preferredDecisionId: null,
            knowledgeId: null,
            rationale: null,
          };
        }

        const knowledgeApplies =
          consideredKnowledge.context.movementType ===
            'reubicacion' &&
          consideredKnowledge.context.deviationReason ===
            expectedDeviationReason;

        const firstMatches =
          first.action === expectedFirstAction;

        const secondMatches =
          second.action === expectedSecondAction;

        if (
          !knowledgeApplies ||
          !firstMatches ||
          !secondMatches
        ) {
          return {
            decisionIds: [first.id, second.id],
            relation: 'no_contextual_preference',
            preferredDecisionId: null,
            knowledgeId: null,
            rationale: null,
          };
        }

        return {
          decisionIds: [first.id, second.id],
          relation: 'contextual_preference',
          preferredDecisionId: first.id,
          knowledgeId: consideredKnowledge.id,
          rationale:
            `El conocimiento "${consideredKnowledge.id}" ` +
            `hace contextualmente preferible "${first.id}" ` +
            `frente a "${second.id}".`,
        };
      };

      const determineControlledPrecedence = (
        preference: ControlledDecisionPreference
      ): ControlledDecisionPrecedence => {
        if (
          preference.relation !== 'contextual_preference' ||
          !preference.preferredDecisionId ||
          !preference.knowledgeId ||
          !preference.rationale
        ) {
          return {
            decisionIds: [
              preference.decisionIds[0],
              preference.decisionIds[1],
            ],
            relation: 'no_contextual_precedence',
            precedingDecisionId: null,
            precededDecisionId: null,
            knowledgeId: null,
            rationale: null,
          };
        }

        const [firstDecisionId, secondDecisionId] =
          preference.decisionIds;

        if (
          preference.preferredDecisionId !==
            firstDecisionId &&
          preference.preferredDecisionId !== secondDecisionId
        ) {
          return {
            decisionIds: [
              firstDecisionId,
              secondDecisionId,
            ],
            relation: 'no_contextual_precedence',
            precedingDecisionId: null,
            precededDecisionId: null,
            knowledgeId: null,
            rationale: null,
          };
        }

        return {
          decisionIds: [
            firstDecisionId,
            secondDecisionId,
          ],
          relation: 'contextual_precedence',
          precedingDecisionId:
            preference.preferredDecisionId,
          precededDecisionId:
            preference.preferredDecisionId ===
            firstDecisionId
              ? secondDecisionId
              : firstDecisionId,
          knowledgeId: preference.knowledgeId,
          rationale:
            `${preference.rationale} ` +
            `La preferencia establece una precedencia contextual explícita.`,
        };
      };

      const determineControlledPrecedenceCoexistence = (
        decisionIds: [string, string, string],
        precedences: ControlledDecisionPrecedence[]
      ): ControlledDecisionPrecedenceCoexistence => {
        const contextualPrecedences =
          precedences.filter(
            (precedence) =>
              precedence.relation ===
                'contextual_precedence' &&
              precedence.precedingDecisionId !== null &&
              precedence.precededDecisionId !== null &&
              precedence.knowledgeId !== null
          );

        if (contextualPrecedences.length !== 2) {
          return {
            decisionIds,
            relation:
              'no_contextual_precedence_coexistence',
            precedences: [],
            rationale: null,
          };
        }

        return {
          decisionIds,
          relation: 'contextual_precedence_coexistence',
          precedences: [
            contextualPrecedences[0],
            contextualPrecedences[1],
          ],
          rationale:
            `Dos precedencias contextuales explícitas ` +
            `coexisten sin materializar relaciones derivadas adicionales.`,
        };
      };

      const deriveControlledTransitivePrecedence = (
        coexistence: ControlledDecisionPrecedenceCoexistence
      ): ControlledTransitivePrecedence => {
        const precedences =
          coexistence.precedences.filter(
            (precedence) =>
              precedence.relation ===
                'contextual_precedence' &&
              precedence.precedingDecisionId !== null &&
              precedence.precededDecisionId !== null &&
              precedence.knowledgeId !== null
          );

        if (precedences.length !== 2) {
          return {
            decisionIds: coexistence.decisionIds,
            relation:
              'no_contextual_transitive_precedence',
            precedingDecisionId: null,
            intermediateDecisionId: null,
            precededDecisionId: null,
            sourcePrecedences: null,
            rationale: null,
          };
        }

        const firstPrecedence = precedences[0];
        const secondPrecedence = precedences[1];

        const composesForward =
          firstPrecedence.precededDecisionId ===
          secondPrecedence.precedingDecisionId;

        const composesReverse =
          secondPrecedence.precededDecisionId ===
          firstPrecedence.precedingDecisionId;

        const sourceFrom = (
          precedence: ControlledDecisionPrecedence
        ): ControlledTransitiveSourcePrecedence => ({
          precedingDecisionId:
            precedence.precedingDecisionId!,
          precededDecisionId:
            precedence.precededDecisionId!,
          knowledgeId: precedence.knowledgeId!,
        });

        if (composesForward) {
          return {
            decisionIds: coexistence.decisionIds,
            relation:
              'contextual_transitive_precedence',
            precedingDecisionId:
              firstPrecedence.precedingDecisionId,
            intermediateDecisionId:
              firstPrecedence.precededDecisionId,
            precededDecisionId:
              secondPrecedence.precededDecisionId,
            sourcePrecedences: [
              sourceFrom(firstPrecedence),
              sourceFrom(secondPrecedence),
            ],
            rationale:
              `Dos precedencias explícitas componibles ` +
              `permiten una única derivación transitiva controlada.`,
          };
        }

        if (composesReverse) {
          return {
            decisionIds: coexistence.decisionIds,
            relation:
              'contextual_transitive_precedence',
            precedingDecisionId:
              secondPrecedence.precedingDecisionId,
            intermediateDecisionId:
              secondPrecedence.precededDecisionId,
            precededDecisionId:
              firstPrecedence.precededDecisionId,
            sourcePrecedences: [
              sourceFrom(secondPrecedence),
              sourceFrom(firstPrecedence),
            ],
            rationale:
              `Dos precedencias explícitas componibles ` +
              `permiten una única derivación transitiva controlada.`,
          };
        }

        return {
          decisionIds: coexistence.decisionIds,
          relation:
            'no_contextual_transitive_precedence',
          precedingDecisionId: null,
          intermediateDecisionId: null,
          precededDecisionId: null,
          sourcePrecedences: null,
          rationale: null,
        };
      };

      /*
      * NUEVO CONSUMIDOR DE FASE 23.34.
      *
      * Recibe exclusivamente dos relaciones ya derivadas.
      * Compara sus extremos y conserva intacta la identidad
      * causal individual de cada derivación.
      *
      * No deriva, fusiona, pondera ni realimenta relaciones.
      */
      const evaluateControlledDerivedPrecedenceConvergence = (
        decisionIds: [string, string, string, string],
        firstDerivedPrecedence:
          ControlledTransitivePrecedence,
        secondDerivedPrecedence:
          ControlledTransitivePrecedence
      ): ControlledDerivedPrecedenceConvergence => {
        const firstIsValid =
          firstDerivedPrecedence.relation ===
            'contextual_transitive_precedence' &&
          firstDerivedPrecedence.precedingDecisionId !==
            null &&
          firstDerivedPrecedence.intermediateDecisionId !==
            null &&
          firstDerivedPrecedence.precededDecisionId !==
            null &&
          firstDerivedPrecedence.sourcePrecedences !==
            null;

        const secondIsValid =
          secondDerivedPrecedence.relation ===
            'contextual_transitive_precedence' &&
          secondDerivedPrecedence.precedingDecisionId !==
            null &&
          secondDerivedPrecedence.intermediateDecisionId !==
            null &&
          secondDerivedPrecedence.precededDecisionId !==
            null &&
          secondDerivedPrecedence.sourcePrecedences !==
            null;

        if (!firstIsValid || !secondIsValid) {
          return {
            decisionIds,
            relation:
              'no_contextual_derived_precedence_convergence',
            convergent: false,
            firstDerivedPrecedence: null,
            secondDerivedPrecedence: null,
            rationale:
              'La convergencia requiere dos relaciones transitivas derivadas contextuales completas.',
          };
        }

        const firstSnapshot: ControlledDerivedPrecedenceSnapshot =
          {
            precedingDecisionId:
              firstDerivedPrecedence.precedingDecisionId!,
            intermediateDecisionId:
              firstDerivedPrecedence.intermediateDecisionId!,
            precededDecisionId:
              firstDerivedPrecedence.precededDecisionId!,
            sourcePrecedences:
              firstDerivedPrecedence.sourcePrecedences!,
          };

        const secondSnapshot: ControlledDerivedPrecedenceSnapshot =
          {
            precedingDecisionId:
              secondDerivedPrecedence.precedingDecisionId!,
            intermediateDecisionId:
              secondDerivedPrecedence.intermediateDecisionId!,
            precededDecisionId:
              secondDerivedPrecedence.precededDecisionId!,
            sourcePrecedences:
              secondDerivedPrecedence.sourcePrecedences!,
          };

        const sameDirectionalEndpoints =
          firstSnapshot.precedingDecisionId ===
            secondSnapshot.precedingDecisionId &&
          firstSnapshot.precededDecisionId ===
            secondSnapshot.precededDecisionId;

        if (!sameDirectionalEndpoints) {
          return {
            decisionIds,
            relation:
              'no_contextual_derived_precedence_convergence',
            convergent: false,
            firstDerivedPrecedence: firstSnapshot,
            secondDerivedPrecedence: secondSnapshot,
            rationale:
              'Las relaciones transitivas derivadas conservan sus genealogías, pero no convergen sobre los mismos extremos y dirección.',
          };
        }

        return {
          decisionIds,
          relation:
            'contextual_derived_precedence_convergence',
          convergent: true,
          firstDerivedPrecedence: firstSnapshot,
          secondDerivedPrecedence: secondSnapshot,
          rationale:
            'Dos relaciones transitivas derivadas convergen sobre los mismos extremos y dirección, conservando genealogías causales independientes sin fusionarse ni reforzarse.',
        };
      };

      const preferenceAB =
        determineControlledPreference(
          firstDecision,
          secondDecision,
          knowledgeAB,
          'motivo-controlado-derived-convergence-ab',
          firstDecision.action,
          secondDecision.action
        );

      const preferenceBD =
        determineControlledPreference(
          secondDecision,
          fourthDecision,
          knowledgeBD,
          'motivo-controlado-derived-convergence-bd',
          secondDecision.action,
          fourthDecision.action
        );

      const preferenceAC =
        determineControlledPreference(
          firstDecision,
          thirdDecision,
          knowledgeAC,
          'motivo-controlado-derived-convergence-ac',
          firstDecision.action,
          thirdDecision.action
        );

      const preferenceCD =
        determineControlledPreference(
          thirdDecision,
          fourthDecision,
          knowledgeCD,
          'motivo-controlado-derived-convergence-cd',
          thirdDecision.action,
          fourthDecision.action
        );

      const preferenceBCNegative =
        determineControlledPreference(
          secondDecision,
          thirdDecision,
          knowledgeBCNegative,
          'motivo-controlado-derived-convergence-bc-negative',
          secondDecision.action,
          thirdDecision.action
        );

      const precedenceAB =
        determineControlledPrecedence(preferenceAB);

      const precedenceBD =
        determineControlledPrecedence(preferenceBD);

      const precedenceAC =
        determineControlledPrecedence(preferenceAC);

      const precedenceCD =
        determineControlledPrecedence(preferenceCD);

      const precedenceBCNegative =
        determineControlledPrecedence(
          preferenceBCNegative
        );

      const firstConvergentSourceCoexistence =
        determineControlledPrecedenceCoexistence(
          [
            firstDecision.id,
            secondDecision.id,
            fourthDecision.id,
          ],
          [precedenceAB, precedenceBD]
        );

      const secondConvergentSourceCoexistence =
        determineControlledPrecedenceCoexistence(
          [
            firstDecision.id,
            thirdDecision.id,
            fourthDecision.id,
          ],
          [precedenceAC, precedenceCD]
        );

      const negativeSourceCoexistence =
        determineControlledPrecedenceCoexistence(
          [
            firstDecision.id,
            secondDecision.id,
            thirdDecision.id,
          ],
          [precedenceAB, precedenceBCNegative]
        );

      const firstDerivedAD =
        deriveControlledTransitivePrecedence(
          firstConvergentSourceCoexistence
        );

      const secondDerivedAD =
        deriveControlledTransitivePrecedence(
          secondConvergentSourceCoexistence
        );

      const negativeDerivedAC =
        deriveControlledTransitivePrecedence(
          negativeSourceCoexistence
        );

      const convergenceEvaluation =
        evaluateControlledDerivedPrecedenceConvergence(
          [
            firstDecision.id,
            secondDecision.id,
            thirdDecision.id,
            fourthDecision.id,
          ],
          firstDerivedAD,
          secondDerivedAD
        );

      const nonConvergenceEvaluation =
        evaluateControlledDerivedPrecedenceConvergence(
          [
            firstDecision.id,
            secondDecision.id,
            thirdDecision.id,
            fourthDecision.id,
          ],
          firstDerivedAD,
          negativeDerivedAC
        );

      if (
        preferenceAB.relation !==
          'contextual_preference' ||
        preferenceBD.relation !==
          'contextual_preference' ||
        preferenceAC.relation !==
          'contextual_preference' ||
        preferenceCD.relation !==
          'contextual_preference' ||
        preferenceBCNegative.relation !==
          'contextual_preference'
      ) {
        throw new Error(
          'FASE 23.34 no produjo las cinco preferencias contextuales controladas.'
        );
      }

      if (
        precedenceAB.relation !==
          'contextual_precedence' ||
        precedenceBD.relation !==
          'contextual_precedence' ||
        precedenceAC.relation !==
          'contextual_precedence' ||
        precedenceCD.relation !==
          'contextual_precedence' ||
        precedenceBCNegative.relation !==
          'contextual_precedence'
      ) {
        throw new Error(
          'FASE 23.34 no produjo las cinco precedencias explícitas esperadas.'
        );
      }

      if (
        firstDerivedAD.relation !==
          'contextual_transitive_precedence' ||
        firstDerivedAD.precedingDecisionId !==
          firstDecision.id ||
        firstDerivedAD.intermediateDecisionId !==
          secondDecision.id ||
        firstDerivedAD.precededDecisionId !==
          fourthDecision.id ||
        !firstDerivedAD.sourcePrecedences
      ) {
        throw new Error(
          'FASE 23.34 no produjo correctamente R1 = A-D mediante A-B-D.'
        );
      }

      if (
        secondDerivedAD.relation !==
          'contextual_transitive_precedence' ||
        secondDerivedAD.precedingDecisionId !==
          firstDecision.id ||
        secondDerivedAD.intermediateDecisionId !==
          thirdDecision.id ||
        secondDerivedAD.precededDecisionId !==
          fourthDecision.id ||
        !secondDerivedAD.sourcePrecedences
      ) {
        throw new Error(
          'FASE 23.34 no produjo correctamente R2 = A-D mediante A-C-D.'
        );
      }

      if (
        negativeDerivedAC.relation !==
          'contextual_transitive_precedence' ||
        negativeDerivedAC.precedingDecisionId !==
          firstDecision.id ||
        negativeDerivedAC.intermediateDecisionId !==
          secondDecision.id ||
        negativeDerivedAC.precededDecisionId !==
          thirdDecision.id ||
        !negativeDerivedAC.sourcePrecedences
      ) {
        throw new Error(
          'FASE 23.34 no produjo correctamente el control negativo R3 = A-C.'
        );
      }

      if (
        firstDerivedAD.intermediateDecisionId ===
          secondDerivedAD.intermediateDecisionId
      ) {
        throw new Error(
          'FASE 23.34 esperaba intermediateDecisionId distintos para las dos genealogías convergentes.'
        );
      }

      const [
        firstADSource1,
        firstADSource2,
      ] = firstDerivedAD.sourcePrecedences;

      const [
        secondADSource1,
        secondADSource2,
      ] = secondDerivedAD.sourcePrecedences;

      if (
        firstADSource1.knowledgeId !== knowledgeAB.id ||
        firstADSource2.knowledgeId !== knowledgeBD.id ||
        secondADSource1.knowledgeId !== knowledgeAC.id ||
        secondADSource2.knowledgeId !== knowledgeCD.id
      ) {
        throw new Error(
          'FASE 23.34 perdió los cuatro knowledgeId originales de las genealogías convergentes.'
        );
      }

      if (
        new Set([
          firstADSource1.knowledgeId,
          firstADSource2.knowledgeId,
          secondADSource1.knowledgeId,
          secondADSource2.knowledgeId,
        ]).size !== 4
      ) {
        throw new Error(
          'FASE 23.34 esperaba genealogías convergentes causalmente independientes.'
        );
      }

      if (
        convergenceEvaluation.relation !==
          'contextual_derived_precedence_convergence' ||
        convergenceEvaluation.convergent !== true ||
        !convergenceEvaluation.firstDerivedPrecedence ||
        !convergenceEvaluation.secondDerivedPrecedence
      ) {
        throw new Error(
          'FASE 23.34 no reconoció la convergencia A-D mediante dos genealogías causales independientes.'
        );
      }

      if (
        nonConvergenceEvaluation.relation !==
          'no_contextual_derived_precedence_convergence' ||
        nonConvergenceEvaluation.convergent !== false
      ) {
        throw new Error(
          'FASE 23.34 clasificó incorrectamente A-D frente a A-C como convergencia.'
        );
      }

      const convergentFirst =
        convergenceEvaluation.firstDerivedPrecedence;

      const convergentSecond =
        convergenceEvaluation.secondDerivedPrecedence;

      if (
        convergentFirst.precedingDecisionId !==
          firstDecision.id ||
        convergentFirst.intermediateDecisionId !==
          secondDecision.id ||
        convergentFirst.precededDecisionId !==
          fourthDecision.id ||
        convergentSecond.precedingDecisionId !==
          firstDecision.id ||
        convergentSecond.intermediateDecisionId !==
          thirdDecision.id ||
        convergentSecond.precededDecisionId !==
          fourthDecision.id
      ) {
        throw new Error(
          'FASE 23.34 perdió dirección, extremos o intermediateDecisionId durante la convergencia.'
        );
      }

      if (
        JSON.stringify(
          convergentFirst.sourcePrecedences
        ) !==
          JSON.stringify(
            firstDerivedAD.sourcePrecedences
          ) ||
        JSON.stringify(
          convergentSecond.sourcePrecedences
        ) !==
          JSON.stringify(
            secondDerivedAD.sourcePrecedences
          )
      ) {
        throw new Error(
          'FASE 23.34 modificó las genealogías causales durante la convergencia.'
        );
      }

      /*
      * Ninguna de las relaciones A -> D debe convertirse en
      * precedencia explícita.
      */
      const allExplicitPrecedences = [
        precedenceAB,
        precedenceBD,
        precedenceAC,
        precedenceCD,
        precedenceBCNegative,
      ];

      const derivedInsertedAsExplicit =
        allExplicitPrecedences.some(
          (precedence) =>
            precedence.precedingDecisionId ===
              firstDecision.id &&
            precedence.precededDecisionId ===
              fourthDecision.id
        );

      if (derivedInsertedAsExplicit) {
        throw new Error(
          'FASE 23.34 materializó indebidamente A-D derivada como precedencia explícita.'
        );
      }

      /*
      * Guardas explícitas contra refuerzo, agregación causal,
      * ponderación y capacidades posteriores.
      */
      if (
        'knowledgeId' in convergenceEvaluation ||
        'aggregatedKnowledgeId' in convergenceEvaluation ||
        'sourcePatternId' in convergenceEvaluation ||
        'memoryIds' in convergenceEvaluation ||
        'occurrences' in convergenceEvaluation ||
        'supportCount' in convergenceEvaluation ||
        'support' in convergenceEvaluation ||
        'strength' in convergenceEvaluation ||
        'reinforcement' in convergenceEvaluation ||
        'weight' in convergenceEvaluation ||
        'score' in convergenceEvaluation ||
        'confidence' in convergenceEvaluation ||
        'priority' in convergenceEvaluation ||
        'closure' in convergenceEvaluation ||
        'transitiveClosure' in convergenceEvaluation ||
        'partialOrder' in convergenceEvaluation ||
        'orderedDecisionIds' in convergenceEvaluation ||
        'sortedDecisionIds' in convergenceEvaluation ||
        'order' in convergenceEvaluation ||
        'rank' in convergenceEvaluation ||
        'ranking' in convergenceEvaluation ||
        'position' in convergenceEvaluation ||
        'winner' in convergenceEvaluation ||
        'loser' in convergenceEvaluation ||
        'selected' in convergenceEvaluation ||
        'selection' in convergenceEvaluation ||
        'executed' in convergenceEvaluation ||
        'execution' in convergenceEvaluation
      ) {
        throw new Error(
          'FASE 23.34 detectó atribución agregada, refuerzo, ponderación, cierre transitivo, orden parcial, ranking, selección o ejecución.'
        );
      }

      /*
      * El consumidor no debe sustituir ni mutar las relaciones
      * derivadas recibidas.
      */
      if (
        JSON.stringify(firstDerivedAD) !==
          JSON.stringify(
            deriveControlledTransitivePrecedence(
              firstConvergentSourceCoexistence
            )
          ) ||
        JSON.stringify(secondDerivedAD) !==
          JSON.stringify(
            deriveControlledTransitivePrecedence(
              secondConvergentSourceCoexistence
            )
          )
      ) {
        throw new Error(
          'FASE 23.34 alteró alguna relación derivada durante la evaluación de convergencia.'
        );
      }

      const recommendationsAfterConvergence =
        generateRecommendationsFromPatterns(
          detectedPatterns
        );

      const decisionsAfterConvergence =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsAfterConvergence
        );

      if (
        JSON.stringify(
          recommendationsBeforeConvergence
        ) !==
        JSON.stringify(
          recommendationsAfterConvergence
        )
      ) {
        throw new Error(
          'FASE 23.34 detectó modificación de recomendaciones productivas.'
        );
      }

      if (
        JSON.stringify(decisionsBeforeConvergence) !==
        JSON.stringify(decisionsAfterConvergence)
      ) {
        throw new Error(
          'FASE 23.34 detectó modificación, reordenamiento o ranking distinto de decisiones productivas.'
        );
      }

      const firstDecisionAfter =
        decisionsAfterConvergence.find(
          (decision) =>
            decision.id === firstDecision.id
        );

      const secondDecisionAfter =
        decisionsAfterConvergence.find(
          (decision) =>
            decision.id === secondDecision.id
        );

      const thirdDecisionAfter =
        decisionsAfterConvergence.find(
          (decision) =>
            decision.id === thirdDecision.id
        );

      const fourthDecisionAfter =
        decisionsAfterConvergence.find(
          (decision) =>
            decision.id === fourthDecision.id
        );

      if (
        !firstDecisionAfter ||
        !secondDecisionAfter ||
        !thirdDecisionAfter ||
        !fourthDecisionAfter
      ) {
        throw new Error(
          'FASE 23.34 perdió alguna alternativa productiva después del experimento.'
        );
      }

      if (
        JSON.stringify(firstDecisionAfter) !==
          firstDecisionSnapshot ||
        JSON.stringify(secondDecisionAfter) !==
          secondDecisionSnapshot ||
        JSON.stringify(thirdDecisionAfter) !==
          thirdDecisionSnapshot ||
        JSON.stringify(fourthDecisionAfter) !==
          fourthDecisionSnapshot
      ) {
        throw new Error(
          'FASE 23.34 alteró indirectamente alguna alternativa decisional productiva.'
        );
      }

      addLog(
        `FASE 23.34 OK: dos relaciones transitivas derivadas independientes convergieron sobre ${firstDecision.id} -> ${fourthDecision.id}; R1 utilizó ${secondDecision.id} como intermediateDecisionId mediante ${knowledgeAB.id} + ${knowledgeBD.id}, mientras R2 utilizó ${thirdDecision.id} como intermediateDecisionId mediante ${knowledgeAC.id} + ${knowledgeCD.id}. Ambas conservaron dirección, intermediateDecisionId, sourcePrecedences y sus knowledgeId causales originales; el escenario de control ${firstDecision.id} -> ${fourthDecision.id} frente a ${firstDecision.id} -> ${thirdDecision.id} no fue clasificado como convergencia. La evaluación no fusionó ni deduplicó relaciones, no fabricó una tercera derivación ni knowledgeId agregado, no agregó evidencia, no introdujo refuerzo, strength, supportCount, weight, score, modificación de confidence o priority, composición derivada-derivada, composición derivada-explícita, propagación transitiva, cierre transitivo, orden parcial, reordenamiento, ranking, selección ni ejecución, permaneciendo intactas ${recommendationsAfterConvergence.length} recomendaciones y ${decisionsAfterConvergence.length} decisiones productivas.`
      );
    } catch (error) {
      console.error(error);

      addLog(
        error instanceof Error
          ? `Error en convergencia contextual controlada de relaciones transitivas derivadas 23.34: ${error.message}`
          : 'Error inesperado en convergencia contextual controlada de relaciones transitivas derivadas 23.34.'
      );
    } finally {
      setLoading(false);
    }
  }

  async function testOperationalKnowledgeControlledDerivedPrecedenceGenealogicalDiversity() {
    setLoading(true);

    try {
      const detectedPatterns = await detectMemoryPatterns();

      const recommendationsBeforeGenealogicalDiversity =
        generateRecommendationsFromPatterns(detectedPatterns);

      const decisionsBeforeGenealogicalDiversity =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsBeforeGenealogicalDiversity
        );

      /*
      * FASE 23.35 — Diversidad genealógica contextual
      * controlada de relaciones transitivas derivadas
      * convergentes por conocimiento operativo.
      *
      * FASE 23.34 ya estableció la frontera:
      *
      * R1 = A -> D
      * R2 = A -> D
      *
      * pueden ser reconocidas como convergentes cuando
      * conservan los mismos extremos y dirección.
      *
      * FASE 23.35 NO vuelve a calcular:
      *
      * - preferencia contextual;
      * - precedencia contextual explícita;
      * - coexistencia;
      * - transitividad;
      * - convergencia.
      *
      * Recibe exclusivamente una convergencia ya evaluada
      * y clasifica si sus genealogías son:
      *
      * - distintas;
      * - coincidentes;
      * - no evaluables.
      *
      * Diversidad genealógica NO significa:
      *
      * - independencia causal;
      * - independencia de evidencia;
      * - evidencia adicional;
      * - soporte acumulado;
      * - supportCount;
      * - refuerzo;
      * - strength;
      * - weight;
      * - score;
      * - mayor confidence;
      * - mayor priority;
      * - selección de genealogía;
      * - fusión;
      * - deduplicación;
      * - composición derivada-derivada;
      * - composición derivada-explícita;
      * - propagación transitiva;
      * - cierre transitivo;
      * - orden parcial;
      * - reordenamiento;
      * - ranking;
      * - selección;
      * - ejecución.
      */

      const firstDecision =
        decisionsBeforeGenealogicalDiversity.find(
          (decision) =>
            decision.id === 'decision-review-movements'
        );

      const secondDecision =
        decisionsBeforeGenealogicalDiversity.find(
          (decision) =>
            decision.id === 'decision-maintain-monitoring'
        );

      const thirdDecision =
        decisionsBeforeGenealogicalDiversity.find(
          (decision) =>
            decision.id === 'decision-prioritize-high-value'
        );

      const fourthDecision =
        decisionsBeforeGenealogicalDiversity.find(
          (decision) =>
            decision.id ===
            'recommendation-prioritize-high-score-actions'
        );

      if (!firstDecision) {
        throw new Error(
          'FASE 23.35 no encontró decision-review-movements como alternativa A.'
        );
      }

      if (!secondDecision) {
        throw new Error(
          'FASE 23.35 no encontró decision-maintain-monitoring como alternativa B.'
        );
      }

      if (!thirdDecision) {
        throw new Error(
          'FASE 23.35 no encontró decision-prioritize-high-value como alternativa C.'
        );
      }

      if (!fourthDecision) {
        throw new Error(
          'FASE 23.35 no encontró recommendation-prioritize-high-score-actions como alternativa D.'
        );
      }

      const controlledDecisionIds = [
        firstDecision.id,
        secondDecision.id,
        thirdDecision.id,
        fourthDecision.id,
      ];

      if (new Set(controlledDecisionIds).size !== 4) {
        throw new Error(
          'FASE 23.35 esperaba cuatro alternativas decisionales distintas.'
        );
      }

      const recommendationsSnapshot =
        JSON.stringify(
          recommendationsBeforeGenealogicalDiversity
        );

      const decisionsSnapshot =
        JSON.stringify(
          decisionsBeforeGenealogicalDiversity
        );

      const firstDecisionSnapshot =
        JSON.stringify(firstDecision);

      const secondDecisionSnapshot =
        JSON.stringify(secondDecision);

      const thirdDecisionSnapshot =
        JSON.stringify(thirdDecision);

      const fourthDecisionSnapshot =
        JSON.stringify(fourthDecision);

      type ControlledGenealogicalSourcePrecedence = {
        precedingDecisionId: string;
        precededDecisionId: string;
        knowledgeId: string;
      };

      type ControlledGenealogicalDerivedPrecedenceSnapshot = {
        precedingDecisionId: string;
        intermediateDecisionId: string;
        precededDecisionId: string;
        sourcePrecedences: [
          ControlledGenealogicalSourcePrecedence,
          ControlledGenealogicalSourcePrecedence,
        ];
      };

      type ControlledGenealogicalDerivedPrecedenceConvergence = {
        decisionIds: [string, string, string, string];
        relation:
          | 'no_contextual_derived_precedence_convergence'
          | 'contextual_derived_precedence_convergence';
        convergent: boolean;
        firstDerivedPrecedence:
          | ControlledGenealogicalDerivedPrecedenceSnapshot
          | null;
        secondDerivedPrecedence:
          | ControlledGenealogicalDerivedPrecedenceSnapshot
          | null;
        rationale: string;
      };

      type ControlledDerivedPrecedenceGenealogicalDiversity = {
        decisionIds: [string, string, string, string];
        relation:
          | 'no_contextual_derived_precedence_genealogical_diversity'
          | 'contextual_derived_precedence_genealogical_coincidence'
          | 'contextual_derived_precedence_genealogical_diversity';
        genealogicallyDistinct: boolean | null;
        firstDerivedPrecedence:
          | ControlledGenealogicalDerivedPrecedenceSnapshot
          | null;
        secondDerivedPrecedence:
          | ControlledGenealogicalDerivedPrecedenceSnapshot
          | null;
        rationale: string;
      };

      /*
      * NUEVO CONSUMIDOR DE FASE 23.35.
      *
      * Consume exclusivamente el resultado ya evaluado
      * de convergencia de FASE 23.34.
      *
      * No reconstruye convergencia ni deriva relaciones.
      * Únicamente observa la genealogía conservada por
      * las dos relaciones convergentes.
      */
      const evaluateControlledDerivedPrecedenceGenealogicalDiversity =
        (
          convergence:
            ControlledGenealogicalDerivedPrecedenceConvergence
        ): ControlledDerivedPrecedenceGenealogicalDiversity => {
          const convergenceIsEvaluable =
            convergence.relation ===
              'contextual_derived_precedence_convergence' &&
            convergence.convergent === true &&
            convergence.firstDerivedPrecedence !== null &&
            convergence.secondDerivedPrecedence !== null;

          if (!convergenceIsEvaluable) {
            return {
              decisionIds: convergence.decisionIds,
              relation:
                'no_contextual_derived_precedence_genealogical_diversity',
              genealogicallyDistinct: null,
              firstDerivedPrecedence: null,
              secondDerivedPrecedence: null,
              rationale:
                'La diversidad genealógica requiere una convergencia contextual válida previamente reconocida.',
            };
          }

          const firstDerivedPrecedence =
            convergence.firstDerivedPrecedence!;

          const secondDerivedPrecedence =
            convergence.secondDerivedPrecedence!;

          const sameSourcePrecedence = (
            first:
              ControlledGenealogicalSourcePrecedence,
            second:
              ControlledGenealogicalSourcePrecedence
          ): boolean =>
            first.precedingDecisionId ===
              second.precedingDecisionId &&
            first.precededDecisionId ===
              second.precededDecisionId &&
            first.knowledgeId === second.knowledgeId;

          const sameIntermediateDecision =
            firstDerivedPrecedence.intermediateDecisionId ===
            secondDerivedPrecedence.intermediateDecisionId;

          const sameFirstSource =
            sameSourcePrecedence(
              firstDerivedPrecedence.sourcePrecedences[0],
              secondDerivedPrecedence.sourcePrecedences[0]
            );

          const sameSecondSource =
            sameSourcePrecedence(
              firstDerivedPrecedence.sourcePrecedences[1],
              secondDerivedPrecedence.sourcePrecedences[1]
            );

          const sameGenealogy =
            sameIntermediateDecision &&
            sameFirstSource &&
            sameSecondSource;

          if (sameGenealogy) {
            return {
              decisionIds: convergence.decisionIds,
              relation:
                'contextual_derived_precedence_genealogical_coincidence',
              genealogicallyDistinct: false,
              firstDerivedPrecedence,
              secondDerivedPrecedence,
              rationale:
                'Las relaciones transitivas derivadas convergentes conservan una genealogía causal coincidente; la coincidencia no implica fusión, deduplicación ni refuerzo.',
            };
          }

          return {
            decisionIds: convergence.decisionIds,
            relation:
              'contextual_derived_precedence_genealogical_diversity',
            genealogicallyDistinct: true,
            firstDerivedPrecedence,
            secondDerivedPrecedence,
            rationale:
              'Las relaciones transitivas derivadas convergentes conservan genealogías causalmente distintas; la diversidad no implica independencia causal, evidencia adicional ni refuerzo.',
          };
        };

      /*
      * Escenario positivo.
      *
      * R1:
      *
      * A -> B [K1]
      * B -> D [K2]
      * => A -> D vía B
      *
      * R2:
      *
      * A -> C [K3]
      * C -> D [K4]
      * => A -> D vía C
      *
      * Ambas relaciones ya llegan clasificadas como
      * convergentes por la frontera de FASE 23.34.
      */
      const diverseConvergence:
        ControlledGenealogicalDerivedPrecedenceConvergence =
        {
          decisionIds: [
            firstDecision.id,
            secondDecision.id,
            thirdDecision.id,
            fourthDecision.id,
          ],
          relation:
            'contextual_derived_precedence_convergence',
          convergent: true,
          firstDerivedPrecedence: {
            precedingDecisionId: firstDecision.id,
            intermediateDecisionId: secondDecision.id,
            precededDecisionId: fourthDecision.id,
            sourcePrecedences: [
              {
                precedingDecisionId: firstDecision.id,
                precededDecisionId: secondDecision.id,
                knowledgeId:
                  'operational-knowledge-controlled-derived-convergence-ab',
              },
              {
                precedingDecisionId: secondDecision.id,
                precededDecisionId: fourthDecision.id,
                knowledgeId:
                  'operational-knowledge-controlled-derived-convergence-bd',
              },
            ],
          },
          secondDerivedPrecedence: {
            precedingDecisionId: firstDecision.id,
            intermediateDecisionId: thirdDecision.id,
            precededDecisionId: fourthDecision.id,
            sourcePrecedences: [
              {
                precedingDecisionId: firstDecision.id,
                precededDecisionId: thirdDecision.id,
                knowledgeId:
                  'operational-knowledge-controlled-derived-convergence-ac',
              },
              {
                precedingDecisionId: thirdDecision.id,
                precededDecisionId: fourthDecision.id,
                knowledgeId:
                  'operational-knowledge-controlled-derived-convergence-cd',
              },
            ],
          },
          rationale:
            'Convergencia contextual controlada previamente reconocida entre dos relaciones A -> D.',
        };

      /*
      * Escenario negativo de diversidad.
      *
      * Dos objetos distintos representan:
      *
      * A -> B [K1]
      * B -> D [K2]
      * => A -> D vía B
      *
      * y conservan exactamente la misma genealogía.
      *
      * La convergencia sigue siendo válida, pero no existe
      * diversidad genealógica.
      */
      const coincidentConvergence:
        ControlledGenealogicalDerivedPrecedenceConvergence =
        {
          decisionIds: [
            firstDecision.id,
            secondDecision.id,
            thirdDecision.id,
            fourthDecision.id,
          ],
          relation:
            'contextual_derived_precedence_convergence',
          convergent: true,
          firstDerivedPrecedence: {
            precedingDecisionId: firstDecision.id,
            intermediateDecisionId: secondDecision.id,
            precededDecisionId: fourthDecision.id,
            sourcePrecedences: [
              {
                precedingDecisionId: firstDecision.id,
                precededDecisionId: secondDecision.id,
                knowledgeId:
                  'operational-knowledge-controlled-derived-convergence-ab',
              },
              {
                precedingDecisionId: secondDecision.id,
                precededDecisionId: fourthDecision.id,
                knowledgeId:
                  'operational-knowledge-controlled-derived-convergence-bd',
              },
            ],
          },
          secondDerivedPrecedence: {
            precedingDecisionId: firstDecision.id,
            intermediateDecisionId: secondDecision.id,
            precededDecisionId: fourthDecision.id,
            sourcePrecedences: [
              {
                precedingDecisionId: firstDecision.id,
                precededDecisionId: secondDecision.id,
                knowledgeId:
                  'operational-knowledge-controlled-derived-convergence-ab',
              },
              {
                precedingDecisionId: secondDecision.id,
                precededDecisionId: fourthDecision.id,
                knowledgeId:
                  'operational-knowledge-controlled-derived-convergence-bd',
              },
            ],
          },
          rationale:
            'Convergencia contextual controlada con genealogías coincidentes.',
        };

      /*
      * Escenario no evaluable.
      *
      * 23.35 no debe intentar clasificar genealogías si
      * FASE 23.34 no reconoció primero una convergencia.
      */
      const nonEvaluableConvergence:
        ControlledGenealogicalDerivedPrecedenceConvergence =
        {
          decisionIds: [
            firstDecision.id,
            secondDecision.id,
            thirdDecision.id,
            fourthDecision.id,
          ],
          relation:
            'no_contextual_derived_precedence_convergence',
          convergent: false,
          firstDerivedPrecedence: null,
          secondDerivedPrecedence: null,
          rationale:
            'Control negativo sin convergencia contextual.',
        };

      const diverseConvergenceSnapshot =
        JSON.stringify(diverseConvergence);

      const coincidentConvergenceSnapshot =
        JSON.stringify(coincidentConvergence);

      const nonEvaluableConvergenceSnapshot =
        JSON.stringify(nonEvaluableConvergence);

      const diversityEvaluation =
        evaluateControlledDerivedPrecedenceGenealogicalDiversity(
          diverseConvergence
        );

      const coincidenceEvaluation =
        evaluateControlledDerivedPrecedenceGenealogicalDiversity(
          coincidentConvergence
        );

      const nonEvaluableEvaluation =
        evaluateControlledDerivedPrecedenceGenealogicalDiversity(
          nonEvaluableConvergence
        );

      if (
        diversityEvaluation.relation !==
          'contextual_derived_precedence_genealogical_diversity' ||
        diversityEvaluation.genealogicallyDistinct !== true ||
        !diversityEvaluation.firstDerivedPrecedence ||
        !diversityEvaluation.secondDerivedPrecedence
      ) {
        throw new Error(
          'FASE 23.35 no reconoció la diversidad genealógica entre las dos derivaciones convergentes A-D.'
        );
      }

      if (
        coincidenceEvaluation.relation !==
          'contextual_derived_precedence_genealogical_coincidence' ||
        coincidenceEvaluation.genealogicallyDistinct !== false ||
        !coincidenceEvaluation.firstDerivedPrecedence ||
        !coincidenceEvaluation.secondDerivedPrecedence
      ) {
        throw new Error(
          'FASE 23.35 no reconoció correctamente la coincidencia genealógica entre dos derivaciones convergentes.'
        );
      }

      if (
        nonEvaluableEvaluation.relation !==
          'no_contextual_derived_precedence_genealogical_diversity' ||
        nonEvaluableEvaluation.genealogicallyDistinct !== null ||
        nonEvaluableEvaluation.firstDerivedPrecedence !== null ||
        nonEvaluableEvaluation.secondDerivedPrecedence !== null
      ) {
        throw new Error(
          'FASE 23.35 intentó clasificar diversidad genealógica sin una convergencia contextual válida.'
        );
      }

      const diverseFirst =
        diversityEvaluation.firstDerivedPrecedence;

      const diverseSecond =
        diversityEvaluation.secondDerivedPrecedence;

      if (
        diverseFirst.intermediateDecisionId !==
          secondDecision.id ||
        diverseSecond.intermediateDecisionId !==
          thirdDecision.id ||
        diverseFirst.intermediateDecisionId ===
          diverseSecond.intermediateDecisionId
      ) {
        throw new Error(
          'FASE 23.35 perdió la diferencia de intermediateDecisionId entre las genealogías diversas.'
        );
      }

      const diverseKnowledgeIds = [
        diverseFirst.sourcePrecedences[0].knowledgeId,
        diverseFirst.sourcePrecedences[1].knowledgeId,
        diverseSecond.sourcePrecedences[0].knowledgeId,
        diverseSecond.sourcePrecedences[1].knowledgeId,
      ];

      if (new Set(diverseKnowledgeIds).size !== 4) {
        throw new Error(
          'FASE 23.35 perdió la diversidad de los cuatro knowledgeId causales del escenario positivo.'
        );
      }

      const coincidentFirst =
        coincidenceEvaluation.firstDerivedPrecedence;

      const coincidentSecond =
        coincidenceEvaluation.secondDerivedPrecedence;

      if (
        coincidentFirst.intermediateDecisionId !==
          coincidentSecond.intermediateDecisionId ||
        JSON.stringify(
          coincidentFirst.sourcePrecedences
        ) !==
          JSON.stringify(
            coincidentSecond.sourcePrecedences
          )
      ) {
        throw new Error(
          'FASE 23.35 clasificó como coincidencia dos genealogías que no eran estructuralmente coincidentes.'
        );
      }

      /*
      * El consumidor debe ser puramente observacional.
      * Ninguna de sus entradas puede ser modificada.
      */
      if (
        JSON.stringify(diverseConvergence) !==
          diverseConvergenceSnapshot ||
        JSON.stringify(coincidentConvergence) !==
          coincidentConvergenceSnapshot ||
        JSON.stringify(nonEvaluableConvergence) !==
          nonEvaluableConvergenceSnapshot
      ) {
        throw new Error(
          'FASE 23.35 modificó alguna convergencia o genealogía durante su evaluación.'
        );
      }

      /*
      * La clasificación no puede incorporar semántica de
      * evidencia, independencia, agregación, fuerza,
      * ponderación ni efectos decisionales.
      */
      const forbiddenProperties = [
        'knowledgeId',
        'aggregatedKnowledgeId',
        'genealogyId',
        'evidenceId',
        'evidenceIds',
        'evidence',
        'evidenceCount',
        'occurrences',
        'supportCount',
        'support',
        'causalIndependence',
        'independent',
        'independence',
        'strength',
        'reinforcement',
        'weight',
        'score',
        'confidence',
        'priority',
        'closure',
        'transitiveClosure',
        'partialOrder',
        'orderedDecisionIds',
        'sortedDecisionIds',
        'order',
        'rank',
        'ranking',
        'position',
        'winner',
        'loser',
        'selected',
        'selection',
        'executed',
        'execution',
      ];

      const evaluationObjects: Record<
        string,
        unknown
      >[] = [
        diversityEvaluation as unknown as Record<
          string,
          unknown
        >,
        coincidenceEvaluation as unknown as Record<
          string,
          unknown
        >,
        nonEvaluableEvaluation as unknown as Record<
          string,
          unknown
        >,
      ];

      const detectedForbiddenProperty =
        forbiddenProperties.find((property) =>
          evaluationObjects.some(
            (evaluation) => property in evaluation
          )
        );

      if (detectedForbiddenProperty) {
        throw new Error(
          `FASE 23.35 introdujo indebidamente la propiedad "${detectedForbiddenProperty}" en la clasificación genealógica.`
        );
      }

      /*
      * Tampoco puede producir una tercera relación derivada
      * ni estructuras de agregación/fusión.
      */
      const forbiddenStructuralProperties = [
        'derivedPrecedence',
        'thirdDerivedPrecedence',
        'mergedDerivedPrecedence',
        'deduplicatedDerivedPrecedence',
        'canonicalDerivedPrecedence',
        'composedDerivedPrecedence',
        'aggregatedDerivedPrecedence',
        'combinedDerivedPrecedence',
      ];

      const detectedForbiddenStructuralProperty =
        forbiddenStructuralProperties.find((property) =>
          evaluationObjects.some(
            (evaluation) => property in evaluation
          )
        );

      if (detectedForbiddenStructuralProperty) {
        throw new Error(
          `FASE 23.35 fabricó indebidamente la estructura "${detectedForbiddenStructuralProperty}".`
        );
      }

      const recommendationsAfterGenealogicalDiversity =
        generateRecommendationsFromPatterns(
          detectedPatterns
        );

      const decisionsAfterGenealogicalDiversity =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsAfterGenealogicalDiversity
        );

      if (
        JSON.stringify(
          recommendationsAfterGenealogicalDiversity
        ) !== recommendationsSnapshot
      ) {
        throw new Error(
          'FASE 23.35 detectó modificación de recomendaciones productivas.'
        );
      }

      if (
        JSON.stringify(
          decisionsAfterGenealogicalDiversity
        ) !== decisionsSnapshot
      ) {
        throw new Error(
          'FASE 23.35 detectó modificación, reordenamiento o ranking distinto de decisiones productivas.'
        );
      }

      const firstDecisionAfter =
        decisionsAfterGenealogicalDiversity.find(
          (decision) =>
            decision.id === firstDecision.id
        );

      const secondDecisionAfter =
        decisionsAfterGenealogicalDiversity.find(
          (decision) =>
            decision.id === secondDecision.id
        );

      const thirdDecisionAfter =
        decisionsAfterGenealogicalDiversity.find(
          (decision) =>
            decision.id === thirdDecision.id
        );

      const fourthDecisionAfter =
        decisionsAfterGenealogicalDiversity.find(
          (decision) =>
            decision.id === fourthDecision.id
        );

      if (
        !firstDecisionAfter ||
        !secondDecisionAfter ||
        !thirdDecisionAfter ||
        !fourthDecisionAfter
      ) {
        throw new Error(
          'FASE 23.35 perdió alguna alternativa productiva después del experimento.'
        );
      }

      if (
        JSON.stringify(firstDecisionAfter) !==
          firstDecisionSnapshot ||
        JSON.stringify(secondDecisionAfter) !==
          secondDecisionSnapshot ||
        JSON.stringify(thirdDecisionAfter) !==
          thirdDecisionSnapshot ||
        JSON.stringify(fourthDecisionAfter) !==
          fourthDecisionSnapshot
      ) {
        throw new Error(
          'FASE 23.35 alteró indirectamente alguna alternativa decisional productiva.'
        );
      }

      addLog(
        `FASE 23.35 OK: sobre una convergencia contextual previamente reconocida ${firstDecision.id} -> ${fourthDecision.id}, se distinguieron controladamente una diversidad genealógica vía ${secondDecision.id} frente a ${thirdDecision.id} y una coincidencia genealógica vía ${secondDecision.id}. La diversidad conservó cuatro knowledgeId causales distintos sin interpretarlos como independencia causal, evidencia adicional, soporte acumulado ni refuerzo; el escenario coincidente demostró que convergencia no implica diversidad genealógica y el control no evaluable demostró que 23.35 no clasifica genealogías sin convergencia previa. La evaluación no fusionó ni deduplicó derivaciones, no fabricó una tercera relación ni knowledgeId agregado, no introdujo evidence, supportCount, strength, reinforcement, weight, score, modificación de confidence o priority, composición derivada-derivada, composición derivada-explícita, propagación transitiva, cierre transitivo, orden parcial, reordenamiento, ranking, selección ni ejecución, permaneciendo intactas ${recommendationsAfterGenealogicalDiversity.length} recomendaciones y ${decisionsAfterGenealogicalDiversity.length} decisiones productivas.`
      );
    } catch (error) {
      console.error(error);

      addLog(
        error instanceof Error
          ? `Error en diversidad genealógica contextual controlada de relaciones transitivas derivadas convergentes 23.35: ${error.message}`
          : 'Error inesperado en diversidad genealógica contextual controlada de relaciones transitivas derivadas convergentes 23.35.'
      );
    } finally {
      setLoading(false);
    }
  }

  async function testOperationalKnowledgeControlledDerivedPrecedenceGenealogicalOverlap() {
    setLoading(true);

    try {
      const detectedPatterns = await detectMemoryPatterns();

      const recommendationsBeforeGenealogicalOverlap =
        generateRecommendationsFromPatterns(detectedPatterns);

      const decisionsBeforeGenealogicalOverlap =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsBeforeGenealogicalOverlap
        );

      /*
       * FASE 23.36 — Solapamiento genealógico contextual
       * controlado de relaciones transitivas derivadas
       * convergentes por conocimiento operativo.
       *
       * FASE 23.35 ya estableció la frontera:
       *
       * convergencia
       *   -> diversidad genealógica.
       *
       * FASE 23.36 NO vuelve a calcular:
       *
       * - preferencia contextual;
       * - precedencia contextual explícita;
       * - coexistencia;
       * - transitividad;
       * - convergencia;
       * - diversidad genealógica.
       *
       * Recibe exclusivamente una diversidad genealógica
       * previamente evaluada y determina si las dos
       * genealogías distintas:
       *
       * - comparten al menos un knowledgeId;
       * - no comparten ningún knowledgeId;
       * - no son evaluables porque no existe previamente
       *   diversidad genealógica válida.
       *
       * IMPORTANTE:
       *
       * ausencia de solapamiento NO significa:
       *
       * - independencia causal;
       * - independencia de evidencia;
       * - evidencia adicional;
       * - soporte independiente;
       * - soporte acumulado;
       * - supportCount;
       * - refuerzo;
       * - strength;
       * - weight;
       * - score;
       * - mayor confidence;
       * - mayor priority.
       *
       * Tampoco se materializa la intersección como una
       * nueva genealogía, knowledgeId agregado o relación.
       */

      const firstDecision =
        decisionsBeforeGenealogicalOverlap.find(
          (decision) =>
            decision.id === 'decision-review-movements'
        );

      const secondDecision =
        decisionsBeforeGenealogicalOverlap.find(
          (decision) =>
            decision.id === 'decision-maintain-monitoring'
        );

      const thirdDecision =
        decisionsBeforeGenealogicalOverlap.find(
          (decision) =>
            decision.id === 'decision-prioritize-high-value'
        );

      const fourthDecision =
        decisionsBeforeGenealogicalOverlap.find(
          (decision) =>
            decision.id ===
            'recommendation-prioritize-high-score-actions'
        );

      if (!firstDecision) {
        throw new Error(
          'FASE 23.36 no encontró decision-review-movements como alternativa A.'
        );
      }

      if (!secondDecision) {
        throw new Error(
          'FASE 23.36 no encontró decision-maintain-monitoring como alternativa B.'
        );
      }

      if (!thirdDecision) {
        throw new Error(
          'FASE 23.36 no encontró decision-prioritize-high-value como alternativa C.'
        );
      }

      if (!fourthDecision) {
        throw new Error(
          'FASE 23.36 no encontró recommendation-prioritize-high-score-actions como alternativa D.'
        );
      }

      const controlledDecisionIds = [
        firstDecision.id,
        secondDecision.id,
        thirdDecision.id,
        fourthDecision.id,
      ];

      if (new Set(controlledDecisionIds).size !== 4) {
        throw new Error(
          'FASE 23.36 esperaba cuatro alternativas decisionales distintas.'
        );
      }

      const recommendationsSnapshot =
        JSON.stringify(
          recommendationsBeforeGenealogicalOverlap
        );

      const decisionsSnapshot =
        JSON.stringify(
          decisionsBeforeGenealogicalOverlap
        );

      const firstDecisionSnapshot =
        JSON.stringify(firstDecision);

      const secondDecisionSnapshot =
        JSON.stringify(secondDecision);

      const thirdDecisionSnapshot =
        JSON.stringify(thirdDecision);

      const fourthDecisionSnapshot =
        JSON.stringify(fourthDecision);

      /*
       * Generamos cuatro conocimientos controlados.
       *
       * El conocimiento K1 será reutilizado deliberadamente
       * por dos genealogías distintas en el escenario de
       * solapamiento:
       *
       * G1 = K1 + K2
       * G2 = K1 + K3
       *
       * El segundo escenario utilizará:
       *
       * G1 = K1 + K2
       * G2 = K3 + K4
       *
       * para demostrar diversidad sin solapamiento.
       */
      const controlledPatterns = [
        {
          id: 'recommendation-deviation-pattern-reubicacion-controlled-genealogical-overlap-k1',
          title:
            'Patrón controlado de solapamiento genealógico K1',
          description:
            'Patrón controlado que proporciona el conocimiento K1 compartido entre genealogías distintas sin convertirlo en evidencia acumulada o refuerzo.',
          score: 95,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-genealogical-overlap-k1',
          },
          evidence: {
            memoryIds: [
              'memory-controlled-genealogical-overlap-k1-1',
              'memory-controlled-genealogical-overlap-k1-2',
              'memory-controlled-genealogical-overlap-k1-3',
              'memory-controlled-genealogical-overlap-k1-4',
            ],
          },
        },
        {
          id: 'recommendation-deviation-pattern-reubicacion-controlled-genealogical-overlap-k2',
          title:
            'Patrón controlado de solapamiento genealógico K2',
          description:
            'Patrón controlado que proporciona el conocimiento K2 de la primera genealogía.',
          score: 94,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-genealogical-overlap-k2',
          },
          evidence: {
            memoryIds: [
              'memory-controlled-genealogical-overlap-k2-1',
              'memory-controlled-genealogical-overlap-k2-2',
              'memory-controlled-genealogical-overlap-k2-3',
              'memory-controlled-genealogical-overlap-k2-4',
            ],
          },
        },
        {
          id: 'recommendation-deviation-pattern-reubicacion-controlled-genealogical-overlap-k3',
          title:
            'Patrón controlado de solapamiento genealógico K3',
          description:
            'Patrón controlado que proporciona el conocimiento K3 de la segunda genealogía.',
          score: 93,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-genealogical-overlap-k3',
          },
          evidence: {
            memoryIds: [
              'memory-controlled-genealogical-overlap-k3-1',
              'memory-controlled-genealogical-overlap-k3-2',
              'memory-controlled-genealogical-overlap-k3-3',
              'memory-controlled-genealogical-overlap-k3-4',
            ],
          },
        },
        {
          id: 'recommendation-deviation-pattern-reubicacion-controlled-genealogical-overlap-k4',
          title:
            'Patrón controlado de solapamiento genealógico K4',
          description:
            'Patrón controlado que proporciona el conocimiento K4 para el escenario de ausencia de solapamiento.',
          score: 92,
          occurrences: 4,
          kind: 'recommendation-deviation-recurrence' as const,
          context: {
            movementType: 'reubicacion',
            deviationReason:
              'motivo-controlado-genealogical-overlap-k4',
          },
          evidence: {
            memoryIds: [
              'memory-controlled-genealogical-overlap-k4-1',
              'memory-controlled-genealogical-overlap-k4-2',
              'memory-controlled-genealogical-overlap-k4-3',
              'memory-controlled-genealogical-overlap-k4-4',
            ],
          },
        },
      ];

      const controlledKnowledge =
        generateOperationalKnowledge(controlledPatterns);

      if (controlledKnowledge.length !== 4) {
        throw new Error(
          `FASE 23.36 esperaba exactamente 4 conocimientos controlados y generó ${controlledKnowledge.length}.`
        );
      }

      const knowledgeK1 = controlledKnowledge[0];
      const knowledgeK2 = controlledKnowledge[1];
      const knowledgeK3 = controlledKnowledge[2];
      const knowledgeK4 = controlledKnowledge[3];

      if (
        !knowledgeK1 ||
        !knowledgeK2 ||
        !knowledgeK3 ||
        !knowledgeK4
      ) {
        throw new Error(
          'FASE 23.36 no pudo resolver los cuatro conocimientos controlados.'
        );
      }

      const controlledKnowledgeIds = [
        knowledgeK1.id,
        knowledgeK2.id,
        knowledgeK3.id,
        knowledgeK4.id,
      ];

      if (new Set(controlledKnowledgeIds).size !== 4) {
        throw new Error(
          'FASE 23.36 esperaba cuatro knowledgeId distintos antes de construir los escenarios genealógicos.'
        );
      }

      type ControlledGenealogicalSourcePrecedence = {
        precedingDecisionId: string;
        precededDecisionId: string;
        knowledgeId: string;
      };

      type ControlledGenealogicalDerivedPrecedenceSnapshot = {
        precedingDecisionId: string;
        intermediateDecisionId: string;
        precededDecisionId: string;
        sourcePrecedences: [
          ControlledGenealogicalSourcePrecedence,
          ControlledGenealogicalSourcePrecedence,
        ];
      };

      /*
       * Contrato de entrada heredado conceptualmente de
       * FASE 23.35.
       *
       * 23.36 no obtiene conocimiento directamente para
       * decidir diversidad: consume este resultado ya
       * clasificado.
       */
      type ControlledDerivedPrecedenceGenealogicalDiversity = {
        decisionIds: [string, string, string, string];
        relation:
          | 'no_contextual_derived_precedence_genealogical_diversity'
          | 'contextual_derived_precedence_genealogical_coincidence'
          | 'contextual_derived_precedence_genealogical_diversity';
        genealogicallyDistinct: boolean | null;
        firstDerivedPrecedence:
          | ControlledGenealogicalDerivedPrecedenceSnapshot
          | null;
        secondDerivedPrecedence:
          | ControlledGenealogicalDerivedPrecedenceSnapshot
          | null;
        rationale: string;
      };

      type ControlledDerivedPrecedenceGenealogicalOverlap = {
        decisionIds: [string, string, string, string];
        relation:
          | 'no_contextual_derived_precedence_genealogical_overlap'
          | 'contextual_derived_precedence_genealogical_overlap'
          | 'contextual_derived_precedence_genealogical_non_overlap';
        genealogicallyOverlapping: boolean | null;
        firstDerivedPrecedence:
          | ControlledGenealogicalDerivedPrecedenceSnapshot
          | null;
        secondDerivedPrecedence:
          | ControlledGenealogicalDerivedPrecedenceSnapshot
          | null;
        rationale: string;
      };

      /*
       * NUEVO CONSUMIDOR DE FASE 23.36.
       *
       * Sólo acepta como evaluable una diversidad
       * genealógica previamente reconocida por 23.35.
       *
       * La intersección se observa únicamente mediante
       * knowledgeId presentes en sourcePrecedences.
       *
       * No devuelve:
       *
       * - sharedKnowledgeIds;
       * - overlapCount;
       * - overlapRatio;
       * - causalIndependence;
       * - evidence;
       * - support;
       * - strength.
       */
      const evaluateControlledDerivedPrecedenceGenealogicalOverlap =
        (
          diversity:
            ControlledDerivedPrecedenceGenealogicalDiversity
        ): ControlledDerivedPrecedenceGenealogicalOverlap => {
          const diversityIsEvaluable =
            diversity.relation ===
              'contextual_derived_precedence_genealogical_diversity' &&
            diversity.genealogicallyDistinct === true &&
            diversity.firstDerivedPrecedence !== null &&
            diversity.secondDerivedPrecedence !== null;

          if (!diversityIsEvaluable) {
            return {
              decisionIds: diversity.decisionIds,
              relation:
                'no_contextual_derived_precedence_genealogical_overlap',
              genealogicallyOverlapping: null,
              firstDerivedPrecedence: null,
              secondDerivedPrecedence: null,
              rationale:
                'El solapamiento genealógico requiere diversidad genealógica contextual válida previamente reconocida.',
            };
          }

          const firstDerivedPrecedence =
            diversity.firstDerivedPrecedence!;

          const secondDerivedPrecedence =
            diversity.secondDerivedPrecedence!;

          const firstKnowledgeIds = new Set(
            firstDerivedPrecedence.sourcePrecedences.map(
              (sourcePrecedence) =>
                sourcePrecedence.knowledgeId
            )
          );

          const hasGenealogicalOverlap =
            secondDerivedPrecedence.sourcePrecedences.some(
              (sourcePrecedence) =>
                firstKnowledgeIds.has(
                  sourcePrecedence.knowledgeId
                )
            );

          return {
            decisionIds: diversity.decisionIds,
            relation: hasGenealogicalOverlap
              ? 'contextual_derived_precedence_genealogical_overlap'
              : 'contextual_derived_precedence_genealogical_non_overlap',
            genealogicallyOverlapping:
              hasGenealogicalOverlap,
            firstDerivedPrecedence,
            secondDerivedPrecedence,
            rationale: hasGenealogicalOverlap
              ? 'Las genealogías previamente reconocidas como distintas comparten al menos un knowledgeId de origen, sin interpretar ese solapamiento como evidencia acumulada, soporte o dependencia causal.'
              : 'Las genealogías previamente reconocidas como distintas no comparten knowledgeId de origen, sin interpretar esa ausencia de solapamiento como independencia causal o independencia de evidencia.',
          };
        };

      /*
       * ESCENARIO 1 — DIVERSIDAD CON SOLAPAMIENTO.
       *
       * R1:
       * A -> B -> D
       * G1 = K1 + K2
       *
       * R2:
       * A -> C -> D
       * G2 = K1 + K3
       *
       * Las genealogías son distintas por ruta y
       * composición, pero comparten K1.
       */
      const overlappingDiversity:
        ControlledDerivedPrecedenceGenealogicalDiversity = {
          decisionIds: [
            firstDecision.id,
            secondDecision.id,
            thirdDecision.id,
            fourthDecision.id,
          ],
          relation:
            'contextual_derived_precedence_genealogical_diversity',
          genealogicallyDistinct: true,
          firstDerivedPrecedence: {
            precedingDecisionId: firstDecision.id,
            intermediateDecisionId: secondDecision.id,
            precededDecisionId: fourthDecision.id,
            sourcePrecedences: [
              {
                precedingDecisionId: firstDecision.id,
                precededDecisionId: secondDecision.id,
                knowledgeId: knowledgeK1.id,
              },
              {
                precedingDecisionId: secondDecision.id,
                precededDecisionId: fourthDecision.id,
                knowledgeId: knowledgeK2.id,
              },
            ],
          },
          secondDerivedPrecedence: {
            precedingDecisionId: firstDecision.id,
            intermediateDecisionId: thirdDecision.id,
            precededDecisionId: fourthDecision.id,
            sourcePrecedences: [
              {
                precedingDecisionId: firstDecision.id,
                precededDecisionId: thirdDecision.id,
                knowledgeId: knowledgeK1.id,
              },
              {
                precedingDecisionId: thirdDecision.id,
                precededDecisionId: fourthDecision.id,
                knowledgeId: knowledgeK3.id,
              },
            ],
          },
          rationale:
            'Diversidad genealógica controlada previamente reconocida con K1 compartido entre dos rutas causales distintas.',
        };

      /*
       * ESCENARIO 2 — DIVERSIDAD SIN SOLAPAMIENTO.
       *
       * G1 = K1 + K2
       * G2 = K3 + K4
       */
      const nonOverlappingDiversity:
        ControlledDerivedPrecedenceGenealogicalDiversity = {
          decisionIds: [
            firstDecision.id,
            secondDecision.id,
            thirdDecision.id,
            fourthDecision.id,
          ],
          relation:
            'contextual_derived_precedence_genealogical_diversity',
          genealogicallyDistinct: true,
          firstDerivedPrecedence: {
            precedingDecisionId: firstDecision.id,
            intermediateDecisionId: secondDecision.id,
            precededDecisionId: fourthDecision.id,
            sourcePrecedences: [
              {
                precedingDecisionId: firstDecision.id,
                precededDecisionId: secondDecision.id,
                knowledgeId: knowledgeK1.id,
              },
              {
                precedingDecisionId: secondDecision.id,
                precededDecisionId: fourthDecision.id,
                knowledgeId: knowledgeK2.id,
              },
            ],
          },
          secondDerivedPrecedence: {
            precedingDecisionId: firstDecision.id,
            intermediateDecisionId: thirdDecision.id,
            precededDecisionId: fourthDecision.id,
            sourcePrecedences: [
              {
                precedingDecisionId: firstDecision.id,
                precededDecisionId: thirdDecision.id,
                knowledgeId: knowledgeK3.id,
              },
              {
                precedingDecisionId: thirdDecision.id,
                precededDecisionId: fourthDecision.id,
                knowledgeId: knowledgeK4.id,
              },
            ],
          },
          rationale:
            'Diversidad genealógica controlada previamente reconocida sin knowledgeId compartidos.',
        };

      /*
       * ESCENARIO 3 — NO EVALUABLE.
       *
       * La entrada representa coincidencia genealógica.
       * Aunque dos genealogías coincidentes tendrían
       * matemáticamente intersección total, 23.36 no debe
       * clasificarlas porque su precondición estricta es
       * diversidad genealógica válida.
       */
      const nonEvaluableDiversity:
        ControlledDerivedPrecedenceGenealogicalDiversity = {
          decisionIds: [
            firstDecision.id,
            secondDecision.id,
            thirdDecision.id,
            fourthDecision.id,
          ],
          relation:
            'contextual_derived_precedence_genealogical_coincidence',
          genealogicallyDistinct: false,
          firstDerivedPrecedence: {
            precedingDecisionId: firstDecision.id,
            intermediateDecisionId: secondDecision.id,
            precededDecisionId: fourthDecision.id,
            sourcePrecedences: [
              {
                precedingDecisionId: firstDecision.id,
                precededDecisionId: secondDecision.id,
                knowledgeId: knowledgeK1.id,
              },
              {
                precedingDecisionId: secondDecision.id,
                precededDecisionId: fourthDecision.id,
                knowledgeId: knowledgeK2.id,
              },
            ],
          },
          secondDerivedPrecedence: {
            precedingDecisionId: firstDecision.id,
            intermediateDecisionId: secondDecision.id,
            precededDecisionId: fourthDecision.id,
            sourcePrecedences: [
              {
                precedingDecisionId: firstDecision.id,
                precededDecisionId: secondDecision.id,
                knowledgeId: knowledgeK1.id,
              },
              {
                precedingDecisionId: secondDecision.id,
                precededDecisionId: fourthDecision.id,
                knowledgeId: knowledgeK2.id,
              },
            ],
          },
          rationale:
            'Coincidencia genealógica controlada utilizada para demostrar la frontera de no evaluabilidad.',
        };

      const overlappingDiversitySnapshot =
        JSON.stringify(overlappingDiversity);

      const nonOverlappingDiversitySnapshot =
        JSON.stringify(nonOverlappingDiversity);

      const nonEvaluableDiversitySnapshot =
        JSON.stringify(nonEvaluableDiversity);

      /*
       * Confirmamos primero que el escenario positivo
       * contiene exactamente un knowledgeId compartido.
       *
       * La intersección sólo se usa como aserción interna;
       * no forma parte del resultado de 23.36.
       */
      const overlappingFirstKnowledgeIds = new Set(
        overlappingDiversity.firstDerivedPrecedence!
          .sourcePrecedences.map(
            (sourcePrecedence) =>
              sourcePrecedence.knowledgeId
          )
      );

      const internallySharedKnowledgeIds =
        overlappingDiversity.secondDerivedPrecedence!
          .sourcePrecedences
          .map(
            (sourcePrecedence) =>
              sourcePrecedence.knowledgeId
          )
          .filter((knowledgeId) =>
            overlappingFirstKnowledgeIds.has(knowledgeId)
          );

      if (
        internallySharedKnowledgeIds.length !== 1 ||
        internallySharedKnowledgeIds[0] !== knowledgeK1.id
      ) {
        throw new Error(
          'FASE 23.36 no construyó correctamente el escenario controlado G1 = K1 + K2 y G2 = K1 + K3.'
        );
      }

      const overlapEvaluation =
        evaluateControlledDerivedPrecedenceGenealogicalOverlap(
          overlappingDiversity
        );

      const nonOverlapEvaluation =
        evaluateControlledDerivedPrecedenceGenealogicalOverlap(
          nonOverlappingDiversity
        );

      const nonEvaluableEvaluation =
        evaluateControlledDerivedPrecedenceGenealogicalOverlap(
          nonEvaluableDiversity
        );

      if (
        overlapEvaluation.relation !==
          'contextual_derived_precedence_genealogical_overlap' ||
        overlapEvaluation.genealogicallyOverlapping !== true ||
        overlapEvaluation.firstDerivedPrecedence === null ||
        overlapEvaluation.secondDerivedPrecedence === null
      ) {
        throw new Error(
          'FASE 23.36 no reconoció el solapamiento genealógico esperado entre G1 = K1 + K2 y G2 = K1 + K3.'
        );
      }

      if (
        nonOverlapEvaluation.relation !==
          'contextual_derived_precedence_genealogical_non_overlap' ||
        nonOverlapEvaluation.genealogicallyOverlapping !== false ||
        nonOverlapEvaluation.firstDerivedPrecedence === null ||
        nonOverlapEvaluation.secondDerivedPrecedence === null
      ) {
        throw new Error(
          'FASE 23.36 no reconoció correctamente la diversidad genealógica sin solapamiento G1 = K1 + K2 y G2 = K3 + K4.'
        );
      }

      if (
        nonEvaluableEvaluation.relation !==
          'no_contextual_derived_precedence_genealogical_overlap' ||
        nonEvaluableEvaluation.genealogicallyOverlapping !== null ||
        nonEvaluableEvaluation.firstDerivedPrecedence !== null ||
        nonEvaluableEvaluation.secondDerivedPrecedence !== null
      ) {
        throw new Error(
          'FASE 23.36 evaluó indebidamente solapamiento sin diversidad genealógica válida previa.'
        );
      }

      /*
       * El consumidor debe preservar las genealogías
       * exactamente como fueron recibidas.
       */
      if (
        overlapEvaluation.firstDerivedPrecedence !==
          overlappingDiversity.firstDerivedPrecedence ||
        overlapEvaluation.secondDerivedPrecedence !==
          overlappingDiversity.secondDerivedPrecedence ||
        nonOverlapEvaluation.firstDerivedPrecedence !==
          nonOverlappingDiversity.firstDerivedPrecedence ||
        nonOverlapEvaluation.secondDerivedPrecedence !==
          nonOverlappingDiversity.secondDerivedPrecedence
      ) {
        throw new Error(
          'FASE 23.36 reconstruyó, fusionó o sustituyó alguna genealogía de entrada.'
        );
      }

      if (
        JSON.stringify(overlappingDiversity) !==
          overlappingDiversitySnapshot ||
        JSON.stringify(nonOverlappingDiversity) !==
          nonOverlappingDiversitySnapshot ||
        JSON.stringify(nonEvaluableDiversity) !==
          nonEvaluableDiversitySnapshot
      ) {
        throw new Error(
          'FASE 23.36 modificó alguna diversidad genealógica durante su evaluación.'
        );
      }

      /*
       * 23.36 no puede materializar la intersección ni
       * introducir semántica de independencia, evidencia,
       * soporte, refuerzo, fuerza o decisión.
       */
      const forbiddenProperties = [
        'knowledgeId',
        'sharedKnowledgeId',
        'sharedKnowledgeIds',
        'uniqueKnowledgeIds',
        'mergedKnowledgeIds',
        'aggregatedKnowledgeId',
        'genealogyId',
        'overlapCount',
        'overlapRatio',
        'causalIndependence',
        'independent',
        'independence',
        'evidenceId',
        'evidenceIds',
        'evidence',
        'evidenceCount',
        'independentEvidence',
        'occurrences',
        'supportCount',
        'support',
        'reinforcement',
        'strength',
        'weight',
        'score',
        'confidence',
        'priority',
        'closure',
        'transitiveClosure',
        'partialOrder',
        'orderedDecisionIds',
        'sortedDecisionIds',
        'order',
        'rank',
        'ranking',
        'position',
        'winner',
        'loser',
        'selected',
        'selection',
        'executed',
        'execution',
      ];

      const evaluationObjects: Record<
        string,
        unknown
      >[] = [
        overlapEvaluation as unknown as Record<
          string,
          unknown
        >,
        nonOverlapEvaluation as unknown as Record<
          string,
          unknown
        >,
        nonEvaluableEvaluation as unknown as Record<
          string,
          unknown
        >,
      ];

      const detectedForbiddenProperty =
        forbiddenProperties.find((property) =>
          evaluationObjects.some(
            (evaluation) => property in evaluation
          )
        );

      if (detectedForbiddenProperty) {
        throw new Error(
          `FASE 23.36 introdujo indebidamente la propiedad "${detectedForbiddenProperty}" en la clasificación de solapamiento genealógico.`
        );
      }

      const forbiddenStructuralProperties = [
        'derivedPrecedence',
        'thirdDerivedPrecedence',
        'mergedDerivedPrecedence',
        'deduplicatedDerivedPrecedence',
        'canonicalDerivedPrecedence',
        'composedDerivedPrecedence',
        'aggregatedDerivedPrecedence',
        'combinedDerivedPrecedence',
        'mergedGenealogy',
        'canonicalGenealogy',
      ];

      const detectedForbiddenStructuralProperty =
        forbiddenStructuralProperties.find((property) =>
          evaluationObjects.some(
            (evaluation) => property in evaluation
          )
        );

      if (detectedForbiddenStructuralProperty) {
        throw new Error(
          `FASE 23.36 fabricó indebidamente la estructura "${detectedForbiddenStructuralProperty}".`
        );
      }

      /*
       * Verificación productiva externa.
       *
       * Ninguna recomendación ni decisión real puede
       * cambiar por observar el solapamiento genealógico.
       */
      const recommendationsAfterGenealogicalOverlap =
        generateRecommendationsFromPatterns(
          detectedPatterns
        );

      const decisionsAfterGenealogicalOverlap =
        generateOperationalDecisions(
          detectedPatterns,
          recommendationsAfterGenealogicalOverlap
        );

      if (
        JSON.stringify(
          recommendationsAfterGenealogicalOverlap
        ) !== recommendationsSnapshot
      ) {
        throw new Error(
          'FASE 23.36 detectó modificación de recomendaciones productivas.'
        );
      }

      if (
        JSON.stringify(
          decisionsAfterGenealogicalOverlap
        ) !== decisionsSnapshot
      ) {
        throw new Error(
          'FASE 23.36 detectó modificación, reordenamiento o ranking distinto de decisiones productivas.'
        );
      }

      const firstDecisionAfter =
        decisionsAfterGenealogicalOverlap.find(
          (decision) =>
            decision.id === firstDecision.id
        );

      const secondDecisionAfter =
        decisionsAfterGenealogicalOverlap.find(
          (decision) =>
            decision.id === secondDecision.id
        );

      const thirdDecisionAfter =
        decisionsAfterGenealogicalOverlap.find(
          (decision) =>
            decision.id === thirdDecision.id
        );

      const fourthDecisionAfter =
        decisionsAfterGenealogicalOverlap.find(
          (decision) =>
            decision.id === fourthDecision.id
        );

      if (
        !firstDecisionAfter ||
        !secondDecisionAfter ||
        !thirdDecisionAfter ||
        !fourthDecisionAfter
      ) {
        throw new Error(
          'FASE 23.36 perdió alguna alternativa productiva después del experimento.'
        );
      }

      if (
        JSON.stringify(firstDecisionAfter) !==
          firstDecisionSnapshot ||
        JSON.stringify(secondDecisionAfter) !==
          secondDecisionSnapshot ||
        JSON.stringify(thirdDecisionAfter) !==
          thirdDecisionSnapshot ||
        JSON.stringify(fourthDecisionAfter) !==
          fourthDecisionSnapshot
      ) {
        throw new Error(
          'FASE 23.36 alteró indirectamente alguna alternativa decisional productiva.'
        );
      }

      addLog(
        `FASE 23.36 OK: sobre diversidades genealógicas contextuales previamente reconocidas para ${firstDecision.id} -> ${fourthDecision.id}, se distinguieron controladamente un solapamiento genealógico G1 = K1 + K2 / G2 = K1 + K3 y una ausencia de solapamiento G1 = K1 + K2 / G2 = K3 + K4; el control de coincidencia genealógica quedó correctamente no evaluable. La ausencia de knowledgeId compartidos no fue interpretada como independencia causal ni independencia de evidencia, y el solapamiento no produjo evidence, supportCount, refuerzo, strength, weight, score, modificación de confidence o priority, fusión, deduplicación, genealogía agregada, tercera relación derivada, composición derivada-derivada, composición derivada-explícita, propagación transitiva, cierre transitivo, orden parcial, reordenamiento, ranking, selección ni ejecución, permaneciendo intactas ${recommendationsAfterGenealogicalOverlap.length} recomendaciones y ${decisionsAfterGenealogicalOverlap.length} decisiones productivas.`
      );
    } catch (error) {
      console.error(error);

      addLog(
        error instanceof Error
          ? `Error en solapamiento genealógico contextual controlado de relaciones transitivas derivadas convergentes 23.36: ${error.message}`
          : 'Error inesperado en solapamiento genealógico contextual controlado de relaciones transitivas derivadas convergentes 23.36.'
      );
    } finally {
      setLoading(false);
    }
  }

  async function testMandatoryPhysicalPlacement() {
    setLoading(true);

    let destinationPositionId: string | null = null;
    let originalMaxHeightM: number | null = null;
    let originalMaxWeightKg: number | null = null;

    let inventoryItemId: string | null = null;
    let originalPositionId: string | null = null;

    let testPalletId: string | null = null;
    let originalCurrentWeightKg: number | null = null;
    let originalTareWeightKg: number | null = null;
    let originalMaxPalletWeightKg: number | null = null;
    let originalWidthM: number | null = null;
    let originalLengthM: number | null = null;
    let originalHeightM: number | null = null;

    try {
      const [pallets, positions, inventoryBefore] =
        await Promise.all([
          getPallets(),
          getRackPositions(),
          getInventory(),
        ]);

      const occupiedPositionIds = new Set(
        inventoryBefore.map(
          (item) => item.rack_position_id
        )
      );

      const testInventoryItem = inventoryBefore.find(
        (item) => {
          if (item.status !== 'available') {
            return false;
          }

          const pallet = pallets.find(
            (candidate) =>
              candidate.id === item.pallet_id
          );

          return Boolean(
            pallet &&
              pallet.current_weight_kg !== null &&
              pallet.tare_weight_kg !== null &&
              pallet.max_weight_kg !== null &&
              pallet.width_m !== null &&
              pallet.length_m !== null &&
              pallet.height_m !== null
          );
        }
      );

      if (!testInventoryItem) {
        throw new Error(
          'No existe inventario disponible con datos físicos completos para ejecutar la prueba obligatoria.'
        );
      }

      const pallet = pallets.find(
        (item) =>
          item.id === testInventoryItem.pallet_id
      );

      if (
        !pallet ||
        pallet.current_weight_kg === null ||
        pallet.tare_weight_kg === null ||
        pallet.max_weight_kg === null ||
        pallet.width_m === null ||
        pallet.length_m === null ||
        pallet.height_m === null
      ) {
        throw new Error(
          'No fue posible obtener un pallet con datos físicos completos para la prueba.'
        );
      }

      const originPosition = positions.find(
        (position) =>
          position.id ===
          testInventoryItem.rack_position_id
      );

      if (!originPosition) {
        throw new Error(
          'No fue posible localizar la posición origen del pallet de prueba.'
        );
      }

      const destinationPosition = positions.find(
        (position) =>
          position.warehouse_id ===
            testInventoryItem.warehouse_id &&
          position.id !== originPosition.id &&
          !occupiedPositionIds.has(position.id) &&
          position.is_active &&
          position.position_status === 'available' &&
          position.max_height_m !== null &&
          position.max_weight_kg !== null &&
          (
            position.rack_type === 'selectivo' ||
            (
              position.rack_type === 'drive_in' &&
              Number.isFinite(Number(position.level)) &&
              Number(position.level) > 0
            )
          )
      );

      if (!destinationPosition) {
        throw new Error(
          'No existe una posición destino libre con geometría y capacidad física completas para ejecutar la prueba.'
        );
      }

      destinationPositionId = destinationPosition.id;
      originalMaxHeightM =
        destinationPosition.max_height_m;
      originalMaxWeightKg =
        destinationPosition.max_weight_kg;

      inventoryItemId = testInventoryItem.id;
      originalPositionId = originPosition.id;

      testPalletId = pallet.id;
      originalCurrentWeightKg =
        pallet.current_weight_kg;
      originalTareWeightKg =
        pallet.tare_weight_kg;
      originalMaxPalletWeightKg =
        pallet.max_weight_kg;
      originalWidthM = pallet.width_m;
      originalLengthM = pallet.length_m;
      originalHeightM = pallet.height_m;

      // ======================================================
      // PRUEBA 1 — Regresión FASE 23.4
      // Rechazo obligatorio por altura/peso
      // ======================================================

      await updateRackPositionPhysical({
        positionId: destinationPosition.id,
        maxHeightM: Math.max(
          pallet.height_m - 0.1,
          0.01
        ),
        maxWeightKg: Math.max(
          pallet.current_weight_kg - 1,
          0.01
        ),
      });

      let physicalRejectionError: Error | null = null;

      try {
        await executeMovementWorkflow({
          warehouse_id:
            testInventoryItem.warehouse_id,
          movement_type: 'reubicacion',
          pallet_id: pallet.id,
          product_id: pallet.product_id,
          origin_position_id: originPosition.id,
          destination_position_id:
            destinationPosition.id,
          quantity: pallet.quantity,
          unit: pallet.unit,
          status: 'completed',
          reason:
            'Integration Lab FASE 23.4 regression',
          notes:
            'Prueba obligatoria de rechazo por altura y peso.',
          decision_score: 100,
          decision_explanation:
            'La reubicación debe ser rechazada antes de modificar el inventario.',
          created_by: 'Integration Lab',
        });
      } catch (error) {
        physicalRejectionError =
          error instanceof Error
            ? error
            : new Error(
                'El workflow produjo un error inesperado.'
              );
      }

      if (!physicalRejectionError) {
        throw new Error(
          'La reubicación incompatible por altura/peso fue permitida y debía ser rechazada.'
        );
      }

      const inventoryAfterPhysicalRejection =
        await getInventory();

      const itemAfterPhysicalRejection =
        inventoryAfterPhysicalRejection.find(
          (item) =>
            item.id === testInventoryItem.id
        );

      if (
        !itemAfterPhysicalRejection ||
        itemAfterPhysicalRejection.rack_position_id !==
          originPosition.id
      ) {
        throw new Error(
          'El rechazo por altura/peso no conservó correctamente la posición origen.'
        );
      }

      addLog(
        `Restricción altura/peso OK: ${pallet.pallet_code} fue rechazado para ${destinationPosition.code} y permaneció en ${originPosition.code}.`
      );

      // Restauramos la capacidad real antes de probar dimensiones.
      await updateRackPositionPhysical({
        positionId: destinationPosition.id,
        maxHeightM: originalMaxHeightM,
        maxWeightKg: originalMaxWeightKg,
      });

      // ======================================================
      // PRUEBA 2 — FASE 23.5
      // Rechazo obligatorio por dimensiones
      // ======================================================

      await updatePalletPhysical({
        palletId: pallet.id,
        currentWeightKg:
          pallet.current_weight_kg,
        tareWeightKg:
          pallet.tare_weight_kg,
        maxWeightKg:
          pallet.max_weight_kg,
        widthM: 1.03,
        lengthM: pallet.length_m,
        heightM: pallet.height_m,
      });

      let dimensionalRejectionError:
        | Error
        | null = null;

      try {
        await executeMovementWorkflow({
          warehouse_id:
            testInventoryItem.warehouse_id,
          movement_type: 'reubicacion',
          pallet_id: pallet.id,
          product_id: pallet.product_id,
          origin_position_id: originPosition.id,
          destination_position_id:
            destinationPosition.id,
          quantity: pallet.quantity,
          unit: pallet.unit,
          status: 'completed',
          reason:
            'Integration Lab FASE 23.5',
          notes:
            'Prueba obligatoria de rechazo por dimensiones del pallet.',
          decision_score: 100,
          decision_explanation:
            'La reubicación debe ser rechazada por incompatibilidad dimensional antes de modificar el inventario.',
          created_by: 'Integration Lab',
        });
      } catch (error) {
        dimensionalRejectionError =
          error instanceof Error
            ? error
            : new Error(
                'El workflow produjo un error inesperado.'
              );
      }

      if (!dimensionalRejectionError) {
        throw new Error(
          'La reubicación dimensionalmente incompatible fue permitida y debía ser rechazada.'
        );
      }

      if (
        !dimensionalRejectionError.message.includes(
          'dimensiones'
        )
      ) {
        throw new Error(
          `El workflow rechazó la operación, pero no por dimensiones. Motivo recibido: ${dimensionalRejectionError.message}`
        );
      }

      const inventoryAfterDimensionalRejection =
        await getInventory();

      const itemAfterDimensionalRejection =
        inventoryAfterDimensionalRejection.find(
          (item) =>
            item.id === testInventoryItem.id
        );

      if (
        !itemAfterDimensionalRejection ||
        itemAfterDimensionalRejection.rack_position_id !==
          originPosition.id
      ) {
        throw new Error(
          'El rechazo dimensional no conservó correctamente la posición origen.'
        );
      }

      addLog(
        `Restricción dimensional obligatoria OK: ${pallet.pallet_code} con ancho temporal de 1.03 m fue rechazado para ${destinationPosition.code} y permaneció correctamente en ${originPosition.code}. Motivo: ${dimensionalRejectionError.message}`
      );
    } catch (error) {
      console.error(error);

      addLog(
        error instanceof Error
          ? `Error en restricción física obligatoria: ${error.message}`
          : 'Error inesperado en restricción física obligatoria.'
      );
    } finally {
      if (
        inventoryItemId &&
        originalPositionId
      ) {
        try {
          const inventoryCurrent =
            await getInventory();

          const currentItem =
            inventoryCurrent.find(
              (item) =>
                item.id === inventoryItemId
            );

          if (
            currentItem &&
            currentItem.rack_position_id !==
              originalPositionId
          ) {
            await changeInventoryPosition(
              inventoryItemId,
              originalPositionId
            );
          }
        } catch (cleanupError) {
          console.error(
            'Error restaurando inventario de prueba:',
            cleanupError
          );
        }
      }

      if (
        testPalletId &&
        originalCurrentWeightKg !== null &&
        originalTareWeightKg !== null &&
        originalMaxPalletWeightKg !== null &&
        originalWidthM !== null &&
        originalLengthM !== null &&
        originalHeightM !== null
      ) {
        try {
          await updatePalletPhysical({
            palletId: testPalletId,
            currentWeightKg:
              originalCurrentWeightKg,
            tareWeightKg:
              originalTareWeightKg,
            maxWeightKg:
              originalMaxPalletWeightKg,
            widthM: originalWidthM,
            lengthM: originalLengthM,
            heightM: originalHeightM,
          });
        } catch (cleanupError) {
          console.error(
            'Error restaurando dimensiones físicas del pallet de prueba:',
            cleanupError
          );
        }
      }

      if (
        destinationPositionId &&
        originalMaxHeightM !== null &&
        originalMaxWeightKg !== null
      ) {
        try {
          await updateRackPositionPhysical({
            positionId: destinationPositionId,
            maxHeightM: originalMaxHeightM,
            maxWeightKg: originalMaxWeightKg,
          });
        } catch (cleanupError) {
          console.error(
            'Error restaurando capacidad física de prueba:',
            cleanupError
          );
        }
      }

      setLoading(false);
    }
  }

  // Memoria Operativa
  async function testOperationalMemory() {
    setLoading(true);

    try {
      await registerOperationalMemory({
        memoryType: 'system',
        entityType: 'integration_lab',
        title: 'Primera memoria operativa CJWMS',
        description:
          'El sistema registró correctamente su primera memoria operativa desde Integration Lab.',
        score: 100,
        metadata: {
          phase: '12.3',
          source: 'IntegrationLabPage',
          createdBy: 'Integration Lab',
        },
      });

      addLog('Memoria Operativa OK: primera memoria registrada.');
            await loadOperationalMemories();
    } catch (error) {
      console.error(error);
      addLog('Error al registrar Memoria Operativa.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStats();
    loadOperationalMemories();
  }, []);

  function getScoreBadge(score?: number | null) {
    const value = score ?? 0;

    if (value >= 90) {
      return 'bg-emerald-100 text-emerald-700';
    }

    if (value >= 70) {
      return 'bg-blue-100 text-blue-700';
    }

    if (value >= 40) {
      return 'bg-amber-100 text-amber-700';
    }

    return 'bg-slate-100 text-slate-700';
  }

  const seederStageLabel: Record<SeederStage, string> = {
    idle: 'LISTO',
    reset: 'RESET INTELIGENTE',
    seeding: 'SEEDER OPERATIVO',
    validating: 'VALIDANDO',
    completed: 'COMPLETADO',
    error: 'ERROR',
  };

  const seederStageDescription: Record<SeederStage, string> = {
    idle: 'Laboratorio preparado para una nueva ejecución.',
    reset: 'Restableciendo de forma selectiva los datos del Laboratorio.',
    seeding: 'Generando el escenario operativo base de CJWMS.',
    validating: 'Comprobando que los datos generados sean operativamente válidos.',
    completed: 'Ejecución finalizada y Laboratorio Operativo listo.',
    error: 'La ejecución se detuvo antes de completar el Laboratorio.',
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">
          🧪 Integration Lab
        </h1>

        <p className="mt-2 text-slate-600">
          Centro de pruebas técnicas para validar Supabase, Repositories,
          Services, Seeder e integración del CJWMS.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-6">
        <button
          onClick={loadStats}
          disabled={loading}
          className="rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white disabled:opacity-50"
        >
          Probar conexión
        </button>

        <button
          onClick={runSeeder}
          disabled={loading}
          className="rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {seederRunning
            ? 'Ejecutando Laboratorio...'
            : 'Ejecutar Seeder'}
        </button>

        <button
          onClick={testMovements}
          disabled={loading}
          className="rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white disabled:opacity-50"
        >
          Test Movements
        </button>

        <button
          onClick={testWorkflow}
          disabled={loading}
          className="rounded-xl bg-purple-600 px-4 py-3 font-semibold text-white disabled:opacity-50"
        >
          Test Workflow
        </button>

        <button
          onClick={testGateAccess}
          disabled={loading}
          className="rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white disabled:opacity-50"
        >
          Test Gate Access
        </button>

        <button
          onClick={testPhysicalCompatibility}
          disabled={loading}
          className="rounded-xl bg-rose-600 px-4 py-3 font-semibold text-white disabled:opacity-50"
        >
          Test Físico
        </button>

        <button
          onClick={testLocationRecommendationPhysicalFilter}
          disabled={loading}
          className="rounded-xl bg-violet-700 px-4 py-3 font-semibold text-white disabled:opacity-50"
        >
          Test Recomendación Física 23.6
        </button>

        <button
          onClick={testLocationDecisionTraceability}
          disabled={loading}
          className="rounded-xl bg-sky-700 px-4 py-3 font-semibold text-white disabled:opacity-50"
        >
          Test Trazabilidad 23.7
        </button>

        <button
          onClick={testRecommendationDeviationPatterns}
          disabled={loading}
          className="rounded-xl bg-indigo-700 px-4 py-3 font-semibold text-white disabled:opacity-50"
        >
          Test Patrones de Desviación 23.13
        </button>

        <button
          onClick={testOperationalKnowledgeGeneration}
          disabled={loading}
          className="rounded-xl bg-emerald-700 px-4 py-3 font-semibold text-white disabled:opacity-50"
        >
          Test Conocimiento Operativo 23.14
        </button>

        <button
          onClick={testOperationalKnowledgeEligibility}
          disabled={loading}
          className="rounded-xl bg-teal-700 px-4 py-3 font-semibold text-white disabled:opacity-50"
        >
          Test Elegibilidad Conocimiento 23.15
        </button>

        <button
          onClick={testOperationalKnowledgeConsideration}
          disabled={loading}
          className="rounded-xl bg-cyan-700 px-4 py-3 font-semibold text-white disabled:opacity-50"
        >
          Test Consideración Conocimiento 23.16
        </button>

        <button
          onClick={testOperationalKnowledgePluralCoexistence}
          disabled={loading}
          className="rounded-xl bg-blue-700 px-4 py-3 font-semibold text-white disabled:opacity-50"
        >
          Test Coexistencia Conocimiento 23.17
        </button>

        <button
          onClick={testOperationalKnowledgeUsageBoundary}
          disabled={loading}
          className="rounded-xl bg-slate-700 px-4 py-3 font-semibold text-white disabled:opacity-50"
        >
          Test Frontera Utilización 23.18
        </button>

        <button
          onClick={testOperationalKnowledgeObservationalUsage}
          disabled={loading}
          className="rounded-xl bg-zinc-700 px-4 py-3 font-semibold text-white disabled:opacity-50"
        >
          Test Utilización Observacional 23.19
        </button>

        <button
          onClick={testOperationalKnowledgeExplanatoryInfluence}
          disabled={loading}
          className="rounded-xl bg-stone-700 px-4 py-3 font-semibold text-white disabled:opacity-50"
        >
          Test Influencia Explicativa 23.20
        </button>

        <button
          onClick={testOperationalKnowledgeDecisionBoundary}
          disabled={loading}
          className="rounded-xl bg-neutral-700 px-4 py-3 font-semibold text-white disabled:opacity-50"
        >
          Test Frontera Explicativa-Decisional 23.21
        </button>

        <button
          onClick={testOperationalKnowledgeControlledDecisionInfluence}
          disabled={loading}
          className="rounded-xl bg-gray-800 px-4 py-3 font-semibold text-white disabled:opacity-50"
        >
          Test Influencia Decisional Controlada 23.22
        </button>

        <button
          onClick={testOperationalKnowledgeControlledDecisionDetermination}
          disabled={loading}
          className="rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white disabled:opacity-50"
        >
          Test Determinación Decisional 23.23
        </button>

        <button
          onClick={testOperationalKnowledgeControlledDecisionComparison}
          disabled={loading}
          className="rounded-xl bg-indigo-950 px-4 py-3 font-semibold text-white disabled:opacity-50"
        >
          Test Comparación Decisional 23.24
        </button>

        <button
          onClick={testOperationalKnowledgeControlledDecisionPreference}
          disabled={loading}
          className="rounded-xl bg-violet-950 px-4 py-3 font-semibold text-white disabled:opacity-50"
        >
          Test Preferencia Decisional 23.25
        </button>

        <button
          onClick={testOperationalKnowledgeControlledDecisionPrecedence}
          disabled={loading}
          className="rounded-xl bg-purple-950 px-4 py-3 font-semibold text-white disabled:opacity-50"
        >
          Test Precedencia Decisional 23.26
        </button>

        <button
          onClick={testOperationalKnowledgePluralDecisionPrecedenceCoexistence}
          disabled={loading}
          className="rounded-xl bg-fuchsia-950 px-4 py-3 font-semibold text-white disabled:opacity-50"
        >
          Test Precedencias Plurales 23.27
        </button>

        <button
          onClick={testOperationalKnowledgeControlledDecisionPrecedenceConsistency}
          disabled={loading}
          className="rounded-xl bg-pink-950 px-4 py-3 font-semibold text-white disabled:opacity-50"
        >
          Test Consistencia Precedencias 23.28
        </button>

        <button
          onClick={testOperationalKnowledgeControlledStructuralPrecedenceConsistency}
          disabled={loading}
          className="rounded-xl bg-rose-950 px-4 py-3 font-semibold text-white disabled:opacity-50"
        >
          Test Consistencia Estructural 23.29
        </button>

        <button
          onClick={testOperationalKnowledgeControlledTransitiveDecisionPrecedence}
          disabled={loading}
          className="rounded-xl bg-red-950 px-4 py-3 font-semibold text-white disabled:opacity-50"
        >
          Test Transitividad Precedencias 23.30
        </button>

        <button
          onClick={testOperationalKnowledgeControlledExplicitDerivedPrecedenceConsistency}
          disabled={loading}
          className="rounded-xl bg-orange-950 px-4 py-3 font-semibold text-white disabled:opacity-50"
        >
          Test Consistencia Explícita-Derivada 23.31
        </button>

        <button
          onClick={testOperationalKnowledgeControlledDerivedPrecedenceCoexistence}
          disabled={loading}
          className="rounded-xl bg-amber-950 px-4 py-3 font-semibold text-white disabled:opacity-50"
        >
          Test Coexistencia Derivadas 23.32
        </button>

        <button
          onClick={testOperationalKnowledgeControlledDerivedPrecedenceConsistency}
          disabled={loading}
          className="bg-slate-800 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Test Consistencia Derivadas 23.33
        </button>

        <button
          onClick={testOperationalKnowledgeControlledDerivedPrecedenceConvergence}
          disabled={loading}
          className="bg-slate-800 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Test Convergencia Derivadas 23.34
        </button>

        <button
          onClick={testOperationalKnowledgeControlledDerivedPrecedenceGenealogicalDiversity}
          disabled={loading}
          className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700 disabled:opacity-50"
        >
          Test Diversidad Genealógica 23.35
        </button>

        <button
          onClick={testOperationalKnowledgeControlledDerivedPrecedenceGenealogicalOverlap}
          disabled={loading}
          className="rounded-xl bg-slate-800 px-4 py-3 font-semibold text-white disabled:opacity-50"
        >
          Test Solapamiento Genealógico 23.36
        </button>

        <button
          onClick={testMandatoryPhysicalPlacement}
          disabled={loading}
          className="rounded-xl bg-red-700 px-4 py-3 font-semibold text-white disabled:opacity-50"
        >
          Test Restricción Física Obligatoria
        </button>

        <button
          onClick={testOperationalMemory}
          disabled={loading}
          className="rounded-xl bg-amber-600 px-4 py-3 font-semibold text-white disabled:opacity-50"
        >
          Registrar primera memoria
        </button>

        <button
          onClick={loadOperationalMemories}
          disabled={loading}
          className="rounded-xl bg-cyan-600 px-4 py-3 font-semibold text-white disabled:opacity-50"
        >
          Cargar memorias
        </button>
      </div>

      <div
        className={`rounded-2xl border p-5 ${
          seederRunning
            ? 'border-blue-200 bg-blue-50'
            : 'border-slate-200 bg-white'
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h2 className="font-bold text-slate-900">
              Centro de Control del Laboratorio
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              Ejecuta automáticamente Reset Inteligente → Seeder Operativo →
              Validación → Confirmación.
            </p>

            <p className="mt-3 text-sm font-medium text-slate-700">
              {seederStageDescription[seederStage]}
            </p>

            <div className="mt-4 grid gap-2 md:grid-cols-4">
              {[
                ['reset', '1. Reset Inteligente'],
                ['seeding', '2. Seeder Operativo'],
                ['validating', '3. Validación'],
                ['completed', '4. Confirmación'],
              ].map(([stage, label]) => {
                const isActive = seederStage === stage;

                const isCompleted =
                  seederStage === 'completed' ||
                  (stage === 'reset' &&
                    ['seeding', 'validating'].includes(seederStage)) ||
                  (stage === 'seeding' &&
                    seederStage === 'validating');

                return (
                  <div
                    key={stage}
                    className={`rounded-xl border px-3 py-2 text-center text-xs font-semibold ${
                      isActive
                        ? 'border-blue-300 bg-blue-100 text-blue-800'
                        : isCompleted
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          : 'border-slate-200 bg-slate-50 text-slate-500'
                    }`}
                  >
                    {label}
                  </div>
                );
              })}
            </div>

            {seederSummary && seederStage === 'completed' && (
              <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-emerald-800">
                      Última ejecución validada
                    </p>

                    <p className="mt-1 text-sm text-emerald-700">
                      {seederSummary.warehouseCode} — {seederSummary.warehouseName}
                    </p>
                  </div>

                  <span className="text-xs font-semibold text-emerald-700">
                    Confirmado: {seederSummary.confirmedAt}
                  </span>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
                  <div className="min-w-0 rounded-lg bg-white px-4 py-3">
                    <p className="text-xs text-slate-500">Productos</p>
                    <p className="font-bold text-slate-900">
                      {seederSummary.products}
                    </p>
                  </div>

                  <div className="min-w-0 rounded-lg bg-white px-4 py-3">
                    <p className="text-xs text-slate-500">Racks</p>
                    <p className="font-bold text-slate-900">
                      {seederSummary.racks}
                    </p>
                  </div>

                  <div className="min-w-0 rounded-lg bg-white px-4 py-3">
                    <p className="text-xs text-slate-500">Posiciones</p>
                    <p className="font-bold text-slate-900">
                      {seederSummary.positions}
                    </p>
                  </div>

                  <div className="min-w-0 rounded-lg bg-white px-4 py-3">
                    <p className="text-xs text-slate-500">Pallets</p>
                    <p className="font-bold text-slate-900">
                      {seederSummary.pallets}
                    </p>
                  </div>

                  <div className="min-w-0 rounded-lg bg-white px-4 py-3">
                    <p className="text-xs text-slate-500">Inventario</p>
                    <p className="font-bold text-slate-900">
                      {seederSummary.inventory}
                    </p>
                  </div>

                  <div className="min-w-0 rounded-lg bg-white px-4 py-3">
                    <p className="text-xs text-slate-500">Movimientos</p>
                    <p className="font-bold text-slate-900">
                      {seederSummary.movements}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              seederRunning
                ? 'bg-blue-100 text-blue-700'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            {seederStageLabel[seederStage]}
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h2 className="text-xl font-bold">
          Estado del sistema
        </h2>

        {stats ? (
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Warehouses</p>
              <p className="text-2xl font-bold">{stats.warehouses}</p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Products</p>
              <p className="text-2xl font-bold">{stats.products}</p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Racks</p>
              <p className="text-2xl font-bold">{stats.racks}</p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Positions</p>
              <p className="text-2xl font-bold">{stats.positions}</p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Inventory</p>
              <p className="text-2xl font-bold">{stats.inventory}</p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Movements</p>
              <p className="text-2xl font-bold">{stats.movements}</p>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-slate-500">
            Ejecuta una prueba para ver el estado.
          </p>
        )}
      </div>

      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h2 className="text-xl font-bold">
          Inteligencia de Memoria
        </h2>

        {memoryInsights.length === 0 ? (
          <p className="mt-4 text-slate-500">
            Aún no hay inteligencia generada.
          </p>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {memoryInsights.map((insight) => (
              <div
                key={insight.id}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <p className="text-sm font-semibold text-slate-500">
                  {insight.severity.toUpperCase()}
                </p>

                <h3 className="mt-2 font-bold text-slate-900">
                  {insight.title}
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  {insight.description}
                </p>

                <p className="mt-4 text-2xl font-bold">
                  {insight.score}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h2 className="text-xl font-bold">
          Patrones Detectados
        </h2>

        {patterns.length === 0 ? (
          <p className="mt-4 text-slate-500">
            Aún no hay patrones detectados.
          </p>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {patterns.map((pattern) => (
              <div
                key={pattern.id}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <p className="text-sm font-semibold text-slate-500">
                  PATRÓN
                </p>

                <h3 className="mt-2 font-bold text-slate-900">
                  {pattern.title}
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  {pattern.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700">
                    Score {pattern.score}
                  </span>

                  <span className="text-sm text-slate-500">
                    {pattern.occurrences} eventos
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h2 className="text-xl font-bold">
          Recomendaciones Inteligentes
        </h2>

        {recommendations.length === 0 ? (
          <p className="mt-4 text-slate-500">
            Aún no hay recomendaciones generadas.
          </p>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {recommendations.map((recommendation) => (
              <div
                key={recommendation.id}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <p className="text-sm font-semibold uppercase text-slate-500">
                  {recommendation.priority}
                </p>

                <h3 className="mt-2 font-bold text-slate-900">
                  {recommendation.title}
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  {recommendation.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700">
                    Score {recommendation.score}
                  </span>

                  <span className="text-sm text-slate-500">
                    Patrón: {recommendation.sourcePatternId}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="mb-8 text-3xl font-bold text-slate-900">
          Decisiones Operativas
        </h2>

        <div className="grid gap-6 lg:grid-cols-3">
          {decisions.map((decision) => (
            <div
              key={decision.id}
              className="rounded-2xl border border-slate-200 p-6"
            >
              <p className="mb-3 text-sm font-bold uppercase text-slate-500">
                {decision.priority}
              </p>

              <h3 className="mb-3 text-2xl font-bold text-slate-900">
                {decision.title}
              </h3>

              <p className="mb-6 text-slate-600">
                {decision.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="rounded-full bg-green-100 px-4 py-1 font-semibold text-green-700">
                  Confianza {decision.confidence}
                </span>

                <span className="text-sm text-slate-500">
                  {decision.action}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="rounded-2xl bg-white p-8 shadow-sm">

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">
            Memoria Operativa
          </h2>

          <select
            value={memoryFilter}
            onChange={(event) => setMemoryFilter(event.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="all">Todas</option>
            <option value="system">System</option>
            <option value="movement">Movement</option>
            <option value="optimization">Optimization</option>
            <option value="decision">Decision</option>
          </select>
        </div>

        {filteredMemories.length === 0 ? (
          <p className="mt-4 text-slate-500">
            Aún no hay memorias registradas.
          </p>
        ) : (
          <div className="mt-6 overflow-auto rounded-xl border border-slate-200">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-4 py-3">Tipo</th>
                  <th className="px-4 py-3">Entidad</th>
                  <th className="px-4 py-3">Título</th>
                  <th className="px-4 py-3">Score</th>
                  <th className="px-4 py-3">Metadata</th>
                  <th className="px-4 py-3">Fecha</th>
                </tr>
              </thead>

              <tbody>
                {filteredMemories.map((memory) => (
                  <tr
                    key={memory.id}
                    className="border-t border-slate-100"
                  >
                    <td className="px-4 py-3 font-medium">
                      {memory.memory_type}
                    </td>

                    <td className="px-4 py-3 text-slate-600">
                      {memory.entity_type ?? '—'}
                    </td>

                    <td className="px-4 py-3">
                      <p className="font-semibold text-slate-900">
                        {memory.title}
                      </p>

                      {memory.description ? (
                        <p className="mt-1 text-xs text-slate-500">
                          {memory.description}
                        </p>
                      ) : null}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${getScoreBadge(
                          memory.score
                        )}`}
                      >
                        {memory.score ?? 0}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-xs text-slate-500">
                      {memory.metadata ? (
                        <pre className="max-w-xs overflow-auto whitespace-pre-wrap">
                          {JSON.stringify(memory.metadata, null, 2)}
                        </pre>
                      ) : (
                        '—'
                      )}
                    </td>

                    <td className="px-4 py-3 text-slate-500">
                      {memory.created_at
                        ? new Date(memory.created_at).toLocaleString()
                        : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h2 className="text-xl font-bold">
          Logs
        </h2>

        <div className="mt-4 max-h-80 overflow-auto rounded-xl bg-slate-950 p-4 text-sm text-slate-100">
          {logs.length === 0 ? (
            <p className="text-slate-400">
              Aún no hay eventos registrados.
            </p>
          ) : (
            logs.map((log, index) => (
              <p key={index} className="border-b border-slate-800 py-2">
                {log}
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default IntegrationLabPage;