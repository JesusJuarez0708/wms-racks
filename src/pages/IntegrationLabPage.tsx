import { useEffect, useState } from 'react';

import {
  resetCJWMSDemoData,
  seedCJWMSDemoData,
} from '../seeders/cjwmsSeeder';

import { getWarehouses } from '../services/warehouseService';
import { getProducts } from '../services/productService';
import { getRacks } from '../services/rackService';
import { getRackPositions } from '../services/rackPositionService';
import { getInventory } from '../services/inventoryService';
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

    try {
      const movements = await getMovements();

      const lastMovement = movements[0];

      if (!lastMovement) {
        addLog('No hay movimientos disponibles para probar Workflow.');
        return;
      }

      await executeMovementWorkflow({
        warehouse_id: lastMovement.warehouse_id,
        movement_type: 'reubicacion',
        pallet_id: lastMovement.pallet_id,
        product_id: lastMovement.product_id,
        origin_position_id: lastMovement.destination_position_id,
        destination_position_id: lastMovement.origin_position_id,
        quantity: lastMovement.quantity,
        unit: lastMovement.unit,
        status: 'completed',
        reason: 'Integration Lab Workflow Test',
        notes: 'Prueba de workflow transaccional CJWMS.',
        decision_score: 90,
        decision_explanation:
          'Test automático para validar Movement + Inventory.',
        created_by: 'Integration Lab',
      });

      addLog('Workflow OK: movimiento e inventario procesados.');
      await loadStats();
    } catch (error) {
      console.error(error);
      addLog('Error al probar Workflow.');
    } finally {
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