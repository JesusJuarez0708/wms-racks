import { useEffect, useMemo, useState } from 'react';

import {
  getMovements,
  type MovementItem,
} from '../services/movementService';

import { getProducts } from '../services/productService';
import { getPallets } from '../services/palletService';
import { getRackPositions } from '../services/rackPositionService';

import {
  getOperationalMemories,
} from '../services/operationalMemoryService';

import type {
  OperationalMemoryRecord,
} from '../repositories/operationalMemoryRepository';

import {
  enrichMovements,
  type EnrichedMovement,
} from '../utils/enrichMovement';

function getMovementTypeLabel(
  type: MovementItem['movement_type']
) {
  if (type === 'entrada') return 'Entrada';
  if (type === 'salida') return 'Salida';
  if (type === 'reubicacion') return 'Reubicación';
  if (type === 'ajuste') return 'Ajuste';
  if (type === 'bloqueo') return 'Bloqueo';
  if (type === 'desbloqueo') return 'Desbloqueo';

  return type;
}

function getMovementTypeClass(
  type: MovementItem['movement_type']
) {
  if (type === 'entrada') {
    return 'bg-emerald-100 text-emerald-700';
  }

  if (type === 'salida') {
    return 'bg-red-100 text-red-700';
  }

  if (type === 'reubicacion') {
    return 'bg-blue-100 text-blue-700';
  }

  return 'bg-slate-100 text-slate-700';
}

function getStatusLabel(status: MovementItem['status']) {
  if (status === 'completed') return 'Completado';
  if (status === 'pending') return 'Pendiente';
  if (status === 'cancelled') return 'Cancelado';
  if (status === 'failed') return 'Fallido';

  return status;
}

function getMetadataString(
  memory: OperationalMemoryRecord,
  key: string
) {
  const value = memory.metadata?.[key];

  return typeof value === 'string' ? value : null;
}

function getMetadataNumber(
  memory: OperationalMemoryRecord,
  key: string
) {
  const value = memory.metadata?.[key];

  return typeof value === 'number' ? value : null;
}

function isPhase238MovementMemory(
  memory: OperationalMemoryRecord
) {
  return (
    memory.memory_type === 'movement' &&
    memory.entity_type === 'movement' &&
    getMetadataString(memory, 'phase') === '23.8'
  );
}

function HistoryPage() {
  const [movements, setMovements] =
    useState<EnrichedMovement[]>([]);

  const [memories, setMemories] =
    useState<OperationalMemoryRecord[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadHistory() {
      try {
        setLoading(true);
        setError('');

        const [
          movementsData,
          productsData,
          palletsData,
          positionsData,
          memoriesData,
        ] = await Promise.all([
          getMovements(),
          getProducts(),
          getPallets(),
          getRackPositions(),
          getOperationalMemories(),
        ]);

        setMovements(
          enrichMovements(
            movementsData,
            productsData,
            palletsData,
            positionsData
          )
        );

        setMemories(memoriesData);
      } catch (loadError) {
        console.error(
          'Error al cargar historial persistente:',
          loadError
        );

        setError(
          loadError instanceof Error
            ? loadError.message
            : 'No fue posible cargar el historial.'
        );
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, []);

  const auditMemoryByMovementId = useMemo(() => {
    const memoryMap =
      new Map<string, OperationalMemoryRecord>();

    memories
      .filter(isPhase238MovementMemory)
      .forEach((memory) => {
        if (
          memory.entity_id &&
          !memoryMap.has(memory.entity_id)
        ) {
          memoryMap.set(memory.entity_id, memory);
        }
      });

    return memoryMap;
  }, [memories]);

  return (
    <div className="space-y-6">
      <header className="rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">
          Historial
        </h1>

        <p className="mt-2 text-slate-600">
          Bitácora persistente de movimientos y auditoría
          de decisiones ejecutadas por CJWMS.
        </p>
      </header>

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        {loading ? (
          <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
            <p className="font-semibold text-slate-700">
              Cargando historial...
            </p>
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
            {error}
          </div>
        ) : movements.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
            <p className="text-lg font-bold text-slate-700">
              No hay movimientos registrados
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Los movimientos persistidos en CJWMS aparecerán aquí.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px] border-separate border-spacing-y-3">
              <thead>
                <tr className="text-left text-sm text-slate-500">
                  <th className="px-4 py-2">
                    Fecha
                  </th>

                  <th className="px-4 py-2">
                    Tipo
                  </th>

                  <th className="px-4 py-2">
                    Producto
                  </th>

                  <th className="px-4 py-2">
                    Pallet
                  </th>

                  <th className="px-4 py-2">
                    Cantidad
                  </th>

                  <th className="px-4 py-2">
                    Origen
                  </th>

                  <th className="px-4 py-2">
                    Destino
                  </th>

                  <th className="px-4 py-2">
                    Estado
                  </th>

                  <th className="px-4 py-2">
                    Auditoría
                  </th>
                </tr>
              </thead>

              <tbody>
                {movements.map((movement) => {
                  const auditMemory =
                    auditMemoryByMovementId.get(
                      movement.id
                    );

                  const decisionScore = auditMemory
                    ? getMetadataNumber(
                        auditMemory,
                        'decisionScore'
                      )
                    : null;

                  const decisionExplanation = auditMemory
                    ? getMetadataString(
                        auditMemory,
                        'decisionExplanation'
                      )
                    : null;

                  const recommendationId = auditMemory
                    ? getMetadataString(
                        auditMemory,
                        'recommendationId'
                      )
                    : null;

                  return (
                    <tr
                      key={movement.id}
                      className="bg-slate-50 align-top"
                    >
                      <td className="rounded-l-xl px-4 py-4 text-sm font-semibold text-slate-700">
                        {movement.created_at
                          ? new Date(
                              movement.created_at
                            ).toLocaleString(
                              'es-MX'
                            )
                          : '—'}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${getMovementTypeClass(
                            movement.movement_type
                          )}`}
                        >
                          {getMovementTypeLabel(
                            movement.movement_type
                          )}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-sm font-semibold text-slate-900">
                        {movement.productName}
                      </td>

                      <td className="px-4 py-4 text-sm text-slate-700">
                        {movement.palletName}
                      </td>

                      <td className="px-4 py-4 text-sm text-slate-700">
                        {movement.quantity ?? '—'}{' '}
                        {movement.unit ?? ''}
                      </td>

                      <td className="px-4 py-4 text-sm text-slate-700">
                        {movement.originName}
                      </td>

                      <td className="px-4 py-4 text-sm text-slate-700">
                        {movement.destinationName}
                      </td>

                      <td className="px-4 py-4 text-sm font-semibold text-slate-700">
                        {getStatusLabel(
                          movement.status
                        )}
                      </td>

                      <td className="rounded-r-xl px-4 py-4 text-sm text-slate-700">
                        {auditMemory ? (
                          <details className="min-w-[280px]">
                            <summary className="cursor-pointer font-bold text-blue-700">
                              Ver decisión
                            </summary>

                            <div className="mt-3 space-y-2 rounded-xl border border-slate-200 bg-white p-3">
                              <p>
                                <span className="font-bold">
                                  Score:
                                </span>{' '}
                                {decisionScore ?? '—'}
                              </p>

                              <p>
                                <span className="font-bold">
                                  Explicación:
                                </span>{' '}
                                {decisionExplanation ??
                                  'Sin explicación registrada.'}
                              </p>

                              <p className="break-all">
                                <span className="font-bold">
                                  Recommendation ID:
                                </span>{' '}
                                {recommendationId ?? '—'}
                              </p>

                              <p className="break-all text-xs text-slate-500">
                                Movimiento: {movement.id}
                              </p>
                            </div>
                          </details>
                        ) : (
                          <span className="text-xs font-semibold text-slate-400">
                            Sin snapshot 23.8
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default HistoryPage;