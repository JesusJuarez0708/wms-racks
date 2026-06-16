import { useEffect, useState } from 'react';

import { seedCJWMSDemoData } from '../seeders/cjwmsSeeder';
import { getWarehouses } from '../services/warehouseService';
import { getProducts } from '../services/productService';
import { getRacks } from '../services/rackService';
import { getRackPositions } from '../services/rackPositionService';
import { getInventory } from '../services/inventoryService';
import { getMovements } from '../services/movementService';
import { registerOperationalMemory } from '../services/operationalMemoryService';

import { executeMovementWorkflow } from '../services/movementWorkflowService';

type LabStats = {
  warehouses: number;
  products: number;
  racks: number;
  positions: number;
  inventory: number;
  movements: number;
};

function IntegrationLabPage() {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [stats, setStats] = useState<LabStats | null>(null);

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

  async function runSeeder() {
    setLoading(true);

    try {
      await seedCJWMSDemoData();
      addLog('Seeder CJWMS ejecutado correctamente.');
      await loadStats();
    } catch (error) {
      console.error(error);
      addLog(
        error instanceof Error
          ? `Error al ejecutar Seeder CJWMS: ${error.message}`
          : 'Error al ejecutar Seeder CJWMS.'
      );
    } finally {
      setLoading(false);
    }
  }

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
    } catch (error) {
      console.error(error);
      addLog('Error al registrar Memoria Operativa.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStats();
  }, []);

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

      <div className="grid gap-4 md:grid-cols-5">
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
          className="rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white disabled:opacity-50"
        >
          Ejecutar Seeder
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
          onClick={testOperationalMemory}
          disabled={loading}
          className="rounded-xl bg-amber-600 px-4 py-3 font-semibold text-white disabled:opacity-50"
        >
          Registrar primera memoria
        </button>

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