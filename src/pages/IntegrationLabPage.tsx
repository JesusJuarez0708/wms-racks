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

        return recommendation.candidates.length > 0;
      });

      if (!testInventoryItem) {
        throw new Error(
          'No existe un pallet con una recomendación válida para probar la trazabilidad 23.7.'
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

      const selectedCandidate = recommendation.candidates[0];

      if (!selectedCandidate) {
        throw new Error(
          'El motor no produjo un destino inteligente para probar 23.7.'
        );
      }

      const expectedExplanation = [
        `Reubicación evaluada por CJWMS para la posición ${selectedCandidate.position.code}.`,
        `Recomendación: ${selectedCandidate.decision.explanation.recommendation}`,
        `Interpretación: ${selectedCandidate.decision.explanation.interpretation}`,
        `Confianza: ${selectedCandidate.decision.explanation.confidence}/100.`,
      ].join(' ');

      inventoryItemId = testInventoryItem.id;
      originalPositionId = originPosition.id;

      const createdMovement = await executeMovementWorkflow({
        warehouse_id: testInventoryItem.warehouse_id,
        movement_type: 'reubicacion',
        pallet_id: pallet.id,
        product_id: pallet.product_id,
        origin_position_id: originPosition.id,
        destination_position_id:
          selectedCandidate.position.id,
        quantity: pallet.quantity,
        unit: pallet.unit,
        status: 'completed',
        reason:
          'Integration Lab FASE 23.7 traceability',
        notes:
          'Prueba controlada de trazabilidad de decisión inteligente.',
        decision_score: selectedCandidate.decision.score,
        decision_explanation: expectedExplanation,
        created_by: 'Integration Lab',
      });

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
        selectedCandidate.decision.score
      ) {
        throw new Error(
          `El score persistido (${persistedMovement.decision_score}) no coincide con el score inteligente (${selectedCandidate.decision.score}).`
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
        selectedCandidate.decision.score
      ) {
        throw new Error(
          `La Memoria Operativa conservó score ${movementMemory.score}, pero se esperaba ${selectedCandidate.decision.score}.`
        );
      }

      const movementMemoryMetadata =
        movementMemory.metadata ?? {};

      if (
        movementMemoryMetadata.decisionScore !==
        selectedCandidate.decision.score
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

      if (
        movementMemoryMetadata.recommendationId !==
        persistedMovement.recommendation_id
      ) {
        throw new Error(
          'La Memoria Operativa no conservó correctamente recommendationId.'
        );
      }

      addLog(
        `FASE 23.8 OK: ${pallet.pallet_code} fue reubicado de ${originPosition.code} a ${selectedCandidate.position.code}. Movimiento ${createdMovement.id} conservó score ${selectedCandidate.decision.score} y la Memoria Operativa preservó score, explicación y recommendationId de la decisión ejecutada.`
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