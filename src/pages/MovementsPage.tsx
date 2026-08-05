import { useEffect, useState } from 'react';
import MovementFormModal from '../components/MovementFormModal';

import PickingAssignmentModal, {
  type PickingAssignmentData,
} from '../components/PickingAssignmentModal';

import PickingProgressModal, {
  type PickingProgressData,
} from '../components/PickingProgressModal';

import DeliveryAreaArrivalModal, {
  type DeliveryAreaArrivalData,
} from '../components/DeliveryAreaArrivalModal';

import OperationalVerificationModal, {
  type OperationalVerificationData,
} from '../components/OperationalVerificationModal';

import PackingProgressModal, {
  type PackingAction,
  type PackingProgressData,
} from '../components/PackingProgressModal';

import ShippingProgressModal, {
  type ShippingAction,
  type ShippingProgressData,
} from '../components/ShippingProgressModal';

import {
  assignPickingWorkflow,
  completePackingWorkflow,
  completePickingWorkflow,
  completeShippingWorkflow,
  confirmDeliveryAreaArrivalWorkflow,
  confirmExitWorkflow,
  confirmOperationalVerificationWorkflow,
  registerPackingProgressWorkflow,
  registerPickingProgressWorkflow,
  registerShippingProgressWorkflow,
  startPackingWorkflow,
  startPickingWorkflow,
  startShippingWorkflow,
} from '../services/movementWorkflowService';

import {
  getMovements,
  type MovementItem,
} from '../services/movementService';

import { getProducts } from '../services/productService';
import { getPallets } from '../services/palletService';
import { getRackPositions } from '../services/rackPositionService';
import {
  enrichMovements,
  type EnrichedMovement,
} from '../utils/enrichMovement';

import {
  canCompletePacking,
  canCompleteShipping,
  canConfirmDeliveryAreaArrival,
  canConfirmExit,
  canRegisterPackingProgress,
  canRegisterShippingProgress,
  canStartOperationalVerification,
  canStartPacking,
  canStartShipping,
  hasPickingPartialProgress,
  isExitConfirmed,
  isPackingInProgress,
  isPickingInProgress,
  isShippingCompleted,
  isShippingInProgress,
} from '../utils/movementOperationalState';

function getStatusClass(status: MovementItem['status']) {
  if (status === 'completed') return 'bg-emerald-100 text-emerald-700';
  if (status === 'pending') return 'bg-amber-100 text-amber-700';
  if (status === 'cancelled') return 'bg-slate-100 text-slate-700';
  return 'bg-red-100 text-red-700';
}

function formatMovementDate(date?: string) {
  if (!date) {
    return {
      fecha: '-',
      hora: '',
    };
  }

  const d = new Date(date);

  const fecha = d.toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const hora = d.toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return {
    fecha,
    hora,
  };
}

function getStatusLabel(status: MovementItem['status']) {
  if (status === 'completed') return 'Completado';
  if (status === 'pending') return 'Pendiente';
  if (status === 'cancelled') return 'Cancelado';
  if (status === 'failed') return 'Fallido';
  return status;
}

function getMovementTypeLabel(type: MovementItem['movement_type']) {
  if (type === 'entrada') return 'Entrada';
  if (type === 'salida') return 'Salida';
  if (type === 'reubicacion') return 'Reubicación';
  if (type === 'ajuste') return 'Ajuste';
  if (type === 'bloqueo') return 'Bloqueo';
  if (type === 'desbloqueo') return 'Desbloqueo';
  return type;
}

function getMovementTypeIcon(type: string) {
  if (type === 'entrada') return '📥';
  if (type === 'salida') return '📤';
  if (type === 'reubicacion') return '🔄';
  if (type === 'ajuste') return '⚙️';
  if (type === 'bloqueo') return '⛔';
  if (type === 'desbloqueo') return '✅';

  return '📦';
}

function getMovementTypeClass(type: string) {
  if (type === 'entrada') return 'bg-blue-100 text-blue-700';
  if (type === 'salida') return 'bg-red-100 text-red-700';
  if (type === 'reubicacion') return 'bg-indigo-100 text-indigo-700';
  if (type === 'ajuste') return 'bg-slate-100 text-slate-700';
  if (type === 'bloqueo') return 'bg-orange-100 text-orange-700';
  if (type === 'desbloqueo') return 'bg-emerald-100 text-emerald-700';

  return 'bg-slate-100 text-slate-700';
}

function getPriorityByScore(score: number | null) {
  if ((score ?? 0) >= 80) return 'Alta';
  if ((score ?? 0) >= 50) return 'Media';
  return 'Baja';
}

function getPriorityClass(priority: string) {
  if (priority === 'Alta') return 'bg-red-100 text-red-700';
  if (priority === 'Media') return 'bg-yellow-100 text-yellow-700';
  return 'bg-slate-100 text-slate-700';
}

function getAssignedPickingOperator(notes: string | null) {
  if (!notes) {
    return '';
  }

  const operatorLine = notes
    .split('\n')
    .find((line) => line.startsWith('Operador asignado:'));

  return operatorLine
    ? operatorLine.replace('Operador asignado:', '').trim()
    : '';
}

function MovementsPage() {
  const [movements, setMovements] = useState<EnrichedMovement[]>([]);
  const [loading, setLoading] = useState(true);

  const [showMovementModal, setShowMovementModal] = useState(false);

  const [selectedPickingMovement, setSelectedPickingMovement] =
    useState<EnrichedMovement | null>(null);

  const [submittingPickingAssignment, setSubmittingPickingAssignment] =
    useState(false);

  const [startingPickingMovementId, setStartingPickingMovementId] =
    useState<string | null>(null);

  const [selectedPickingProgressMovement, setSelectedPickingProgressMovement] =
    useState<EnrichedMovement | null>(null);

  const [submittingPickingProgress, setSubmittingPickingProgress] =
    useState(false);

  const [finishingPickingMovementId, setFinishingPickingMovementId] =
    useState<string | null>(null);

  const [
    selectedDeliveryArrivalMovement,
    setSelectedDeliveryArrivalMovement,
  ] = useState<EnrichedMovement | null>(null);

  const [
    selectedOperationalVerificationMovement,
    setSelectedOperationalVerificationMovement,
  ] = useState<EnrichedMovement | null>(null);

  const [
    submittingOperationalVerification,
    setSubmittingOperationalVerification,
  ] = useState(false);

  const [
    submittingDeliveryArrival,
    setSubmittingDeliveryArrival,
  ] = useState(false);

  const [
    selectedPackingMovement,
    setSelectedPackingMovement,
  ] = useState<EnrichedMovement | null>(null);

  const [packingAction, setPackingAction] =
    useState<PackingAction>('start');

  const [submittingPacking, setSubmittingPacking] =
    useState(false);

  const [
    selectedShippingMovement,
    setSelectedShippingMovement,
  ] = useState<EnrichedMovement | null>(null);

  const [shippingAction, setShippingAction] =
    useState<ShippingAction>('start');

  const [submittingShipping, setSubmittingShipping] =
    useState(false);

  const [
    confirmingExitMovementId,
    setConfirmingExitMovementId,
  ] = useState<string | null>(null);

  const [operationMessage, setOperationMessage] = useState('');

  const [operationError, setOperationError] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [priorityFilter, setPriorityFilter] = useState('Todas');

  async function loadMovements() {
    try {
      setLoading(true);

      const [movementsData, productsData, palletsData, positionsData] =
        await Promise.all([
          getMovements(),
          getProducts(),
          getPallets(),
          getRackPositions(),
        ]);

      const enriched = enrichMovements(
        movementsData,
        productsData,
        palletsData,
        positionsData
      );

      setMovements(enriched);
    } catch (error) {
      console.error('Error al cargar movimientos desde Supabase:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMovements();
  }, []);

  const filteredMovements = movements.filter((movement) => {
    const search = searchTerm.toLowerCase();
    const priority = getPriorityByScore(movement.decision_score);

    const matchesSearch =
      movement.id.toLowerCase().includes(search) ||
      movement.movement_type.toLowerCase().includes(search) ||
      (movement.reason ?? '').toLowerCase().includes(search) ||
      (movement.notes ?? '').toLowerCase().includes(search) ||
      (movement.created_by ?? '').toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === 'Todos' ||
      getStatusLabel(movement.status) === statusFilter;

    const matchesPriority =
      priorityFilter === 'Todas' || priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  function clearFilters() {
    setSearchTerm('');
    setStatusFilter('Todos');
    setPriorityFilter('Todas');
  }

  function handleNewMovement() {
    setShowMovementModal(true);
  }

  function handleOpenPickingAssignment(movement: EnrichedMovement) {
    setSelectedPickingMovement(movement);
    setOperationMessage('');
    setOperationError('');
  }

  function handleClosePickingAssignment() {
    if (submittingPickingAssignment) {
      return;
    }

    setSelectedPickingMovement(null);
  }

  async function handleConfirmPickingAssignment(
    movement: EnrichedMovement,
    assignment: PickingAssignmentData
  ) {
    try {
      setSubmittingPickingAssignment(true);
      setOperationMessage('');
      setOperationError('');

      const assignmentNotes = [
        assignment.notes,
        `Operador asignado: ${assignment.operatorId}`,
        assignment.forkliftUnitId
          ? `Unidad de montacargas: ${assignment.forkliftUnitId}`
          : '',
      ]
        .filter(Boolean)
        .join('\n');

      await assignPickingWorkflow(movement.id, {
        operator_id: null,
        forklift_unit_id: null,
        notes: assignmentNotes,
        decision_explanation:
          'Solicitud de surtido asignada operativamente y pendiente de inicio.',
        created_by: 'Usuario CJWMS',
      });

      await loadMovements();

      setSelectedPickingMovement(null);

      setOperationMessage(
        `Picking asignado correctamente al operador ${assignment.operatorId}.`
      );
    } catch (error) {
      console.error('Error al asignar el picking:', error);

      setOperationError(
        error instanceof Error
          ? error.message
          : 'No fue posible completar la asignación operativa de picking.'
      );
    } finally {
      setSubmittingPickingAssignment(false);
    }
  }

  async function handleStartPicking(movement: EnrichedMovement) {
    try {
      setStartingPickingMovementId(movement.id);
      setOperationMessage('');
      setOperationError('');

      const pickingNotes = [
        movement.notes,
        'Estado operativo: Picking en proceso',
      ]
        .filter(Boolean)
        .join('\n');

      await startPickingWorkflow(movement.id, {
        notes: pickingNotes,
        decision_explanation:
          'Inicio Operativo del Picking confirmado.',
        created_by: 'Usuario CJWMS',
      });

      await loadMovements();

      setOperationMessage(
        `Picking iniciado correctamente para el movimiento ${movement.id}.`
      );
    } catch (error) {
      console.error('Error al iniciar el picking:', error);

      setOperationError(
        error instanceof Error
          ? error.message
          : 'No fue posible iniciar operativamente el picking.'
      );
    } finally {
      setStartingPickingMovementId(null);
    }
  }

  function handleOpenPickingProgress(movement: EnrichedMovement) {
    setSelectedPickingProgressMovement(movement);
    setOperationMessage('');
    setOperationError('');
  }

  function handleClosePickingProgress() {
    if (submittingPickingProgress) {
      return;
    }

    setSelectedPickingProgressMovement(null);
  }

  async function handleConfirmPickingProgress(
    movement: EnrichedMovement,
    progress: PickingProgressData
  ) {
    try {
      setSubmittingPickingProgress(true);
      setOperationMessage('');
      setOperationError('');

      const progressNotes = [
        movement.notes,
        `Cantidad extraída parcialmente: ${progress.extractedQuantity} ${
          movement.unit ?? ''
        }`,
        progress.notes
          ? `Observaciones del avance: ${progress.notes}`
          : '',
        'Estado operativo: Picking en proceso con extracción parcial confirmada',
      ]
        .filter(Boolean)
        .join('\n');

      await registerPickingProgressWorkflow(movement.id, {
        notes: progressNotes,
        decision_explanation:
          'Picking en Proceso: extracción parcial confirmada.',
        created_by: 'Usuario CJWMS',
      });

      await loadMovements();

      setSelectedPickingProgressMovement(null);

      setOperationMessage(
        `Avance parcial registrado correctamente para el movimiento ${movement.id}.`
      );
    } catch (error) {
      console.error(
        'Error al registrar el avance parcial del picking:',
        error
      );

      setOperationError(
        error instanceof Error
          ? error.message
          : 'No fue posible registrar el avance parcial del picking.'
      );
    } finally {
      setSubmittingPickingProgress(false);
    }
  }

  async function handleCompletePicking(
    movement: EnrichedMovement
  ) {
    try {
      setFinishingPickingMovementId(movement.id);
      setOperationMessage('');
      setOperationError('');

      const completionNotes = [
        movement.notes,
        `Cantidad total extraída: ${movement.quantity ?? 0} ${movement.unit ?? ''}`,
        'Estado operativo: Picking finalizado',
      ]
        .filter(Boolean)
        .join('\n');

      await completePickingWorkflow(movement.id, {
        notes: completionNotes,
        decision_explanation:
          'Picking Finalizado: extracción total confirmada.',
        created_by: 'Usuario CJWMS',
      });

      await loadMovements();

      setOperationMessage(
        `Picking finalizado correctamente para el movimiento ${movement.id}.`
      );
    } catch (error) {
      console.error(
        'Error al finalizar el picking:',
        error
      );

      setOperationError(
        error instanceof Error
          ? error.message
          : 'No fue posible finalizar el picking.'
      );
    } finally {
      setFinishingPickingMovementId(null);
    }
  }

  function handleOpenDeliveryArrival(
    movement: EnrichedMovement
  ) {
    setSelectedDeliveryArrivalMovement(movement);
    setOperationMessage('');
    setOperationError('');
  }

  function handleCloseDeliveryArrival() {
    if (submittingDeliveryArrival) {
      return;
    }

    setSelectedDeliveryArrivalMovement(null);
  }

  async function handleConfirmDeliveryArrival(
    movement: EnrichedMovement,
    data: DeliveryAreaArrivalData
  ) {
    try {
      setSubmittingDeliveryArrival(true);
      setOperationMessage('');
      setOperationError('');

      await confirmDeliveryAreaArrivalWorkflow(
        movement.id,
        {
          notes: data.notes,
          created_by: 'Usuario CJWMS',
        }
      );

      await loadMovements();

      setSelectedDeliveryArrivalMovement(null);

      setOperationMessage(
        'La llegada al Área de Entrega fue confirmada correctamente.'
      );
    } catch (error) {
      console.error(error);

      setOperationError(
        error instanceof Error
          ? error.message
          : 'No fue posible confirmar la llegada al Área de Entrega.'
      );
    } finally {
      setSubmittingDeliveryArrival(false);
    }
  }

  function handleOpenOperationalVerification(
    movement: EnrichedMovement
  ) {
    setSelectedOperationalVerificationMovement(movement);
    setOperationMessage('');
    setOperationError('');
  }

  function handleCloseOperationalVerification() {
    if (submittingOperationalVerification) {
      return;
    }

    setSelectedOperationalVerificationMovement(null);
  }

  async function handleConfirmOperationalVerification(
    movement: EnrichedMovement,
    data: OperationalVerificationData
  ) {
    try {
      setSubmittingOperationalVerification(true);
      setOperationMessage('');
      setOperationError('');

      const verificationNotes = [
        movement.notes,
        data.notes,
        data.requiresPacking
          ? 'Decisión operativa: requiere empaque.'
          : 'Decisión operativa: liberado para embarque.',
      ]
        .filter(Boolean)
        .join('\n');

      await confirmOperationalVerificationWorkflow(
        movement.id,
        {
          requires_packing: data.requiresPacking,
          notes: verificationNotes,
          created_by: 'Usuario CJWMS',
        }
      );

      await loadMovements();

      setSelectedOperationalVerificationMovement(null);

      setOperationMessage(
        data.requiresPacking
          ? 'Verificación completada. La mercancía quedó pendiente de Empaque.'
          : 'Verificación completada. La mercancía quedó liberada para Embarque.'
      );
    } catch (error) {
      console.error(
        'Error al confirmar la verificación operativa:',
        error
      );

      setOperationError(
        error instanceof Error
          ? error.message
          : 'No fue posible completar la verificación operativa.'
      );
    } finally {
      setSubmittingOperationalVerification(false);
    }
  }

  function handleOpenPacking(
    movement: EnrichedMovement,
    action: PackingAction
  ) {
    setSelectedPackingMovement(movement);
    setPackingAction(action);
    setOperationMessage('');
    setOperationError('');
  }

  function handleClosePacking() {
    if (submittingPacking) {
      return;
    }

    setSelectedPackingMovement(null);
  }

  async function handleConfirmPacking(
    movement: EnrichedMovement,
    data: PackingProgressData
  ) {
    try {
      setSubmittingPacking(true);
      setOperationMessage('');
      setOperationError('');

      if (packingAction === 'start') {
        const packingNotes = [
          movement.notes,
          `Observaciones de inicio de empaque: ${data.notes}`,
          'Estado operativo: Empaque iniciado',
        ]
          .filter(Boolean)
          .join('\n');

        await startPackingWorkflow(movement.id, {
          notes: packingNotes,
          decision_explanation:
            'Empaque Iniciado: preparación física de la mercancía confirmada.',
          created_by: 'Usuario CJWMS',
        });
      }

      if (packingAction === 'progress') {
        const packingProgressNotes = [
          movement.notes,
          `Observaciones del avance de empaque: ${data.notes}`,
          'Estado operativo: Empaque en proceso',
        ]
          .filter(Boolean)
          .join('\n');

        await registerPackingProgressWorkflow(movement.id, {
          notes: packingProgressNotes,
          decision_explanation:
            'Empaque en Proceso: avance operativo confirmado.',
          created_by: 'Usuario CJWMS',
        });
      }

      if (packingAction === 'complete') {
        const packingCompletionNotes = [
          movement.notes,
          `Observaciones de finalización de empaque: ${data.notes}`,
          'Estado operativo: Empaque finalizado y liberado para embarque',
        ]
          .filter(Boolean)
          .join('\n');

        await completePackingWorkflow(movement.id, {
          notes: packingCompletionNotes,
          decision_explanation:
            'Empaque Finalizado: mercancía liberada para embarque.',
          created_by: 'Usuario CJWMS',
        });
      }

      await loadMovements();

      setSelectedPackingMovement(null);

      setOperationMessage(
        packingAction === 'start'
          ? 'El proceso de Empaque fue iniciado correctamente.'
          : packingAction === 'progress'
            ? 'El avance del proceso de Empaque fue registrado correctamente.'
            : 'El Empaque fue finalizado y la mercancía quedó liberada para Embarque.'
      );
    } catch (error) {
      console.error(
        'Error durante el proceso de empaque:',
        error
      );

      setOperationError(
        error instanceof Error
          ? error.message
          : 'No fue posible completar la operación de Empaque.'
      );
    } finally {
      setSubmittingPacking(false);
    }
  }

  function handleOpenShipping(
    movement: EnrichedMovement,
    action: ShippingAction
  ) {
    setSelectedShippingMovement(movement);
    setShippingAction(action);
    setOperationMessage('');
    setOperationError('');
  }

  function handleCloseShipping() {
    if (submittingShipping) {
      return;
    }

    setSelectedShippingMovement(null);
  }

  async function handleConfirmShipping(
    movement: EnrichedMovement,
    data: ShippingProgressData
  ) {
    try {
      setSubmittingShipping(true);
      setOperationMessage('');
      setOperationError('');

      if (shippingAction === 'start') {
        const shippingNotes = [
          movement.notes,
          `Observaciones de inicio de embarque: ${data.notes}`,
          'Estado operativo: Embarque iniciado',
        ]
          .filter(Boolean)
          .join('\n');

        await startShippingWorkflow(movement.id, {
          notes: shippingNotes,
          decision_explanation:
            'Embarque Iniciado: carga física de la mercancía confirmada.',
          created_by: 'Usuario CJWMS',
        });
      }

      if (shippingAction === 'progress') {
        const shippingProgressNotes = [
          movement.notes,
          `Observaciones del avance de embarque: ${data.notes}`,
          'Estado operativo: Embarque en proceso',
        ]
          .filter(Boolean)
          .join('\n');

        await registerShippingProgressWorkflow(movement.id, {
          notes: shippingProgressNotes,
          decision_explanation:
            'Embarque en Proceso: avance operativo de carga confirmado.',
          created_by: 'Usuario CJWMS',
        });
      }

      if (shippingAction === 'complete') {
        const shippingCompletionNotes = [
          movement.notes,
          `Observaciones de finalización de embarque: ${data.notes}`,
          'Estado operativo: Embarque finalizado y pendiente de confirmación de salida',
        ]
          .filter(Boolean)
          .join('\n');

        await completeShippingWorkflow(movement.id, {
          notes: shippingCompletionNotes,
          decision_explanation:
            'Embarque Finalizado: carga física completada y pendiente de confirmación de salida.',
          created_by: 'Usuario CJWMS',
        });
      }

      await loadMovements();

      setSelectedShippingMovement(null);

      setOperationMessage(
        shippingAction === 'start'
          ? 'El proceso de Embarque fue iniciado correctamente.'
          : shippingAction === 'progress'
            ? 'El avance del proceso de Embarque fue registrado correctamente.'
            : 'El Embarque fue finalizado y quedó pendiente la Confirmación de Salida.'
      );
    } catch (error) {
      console.error(
        'Error durante el proceso de embarque:',
        error
      );

      setOperationError(
        error instanceof Error
          ? error.message
          : 'No fue posible completar la operación de Embarque.'
      );
    } finally {
      setSubmittingShipping(false);
    }
  }

  async function handleConfirmExit(
    movement: EnrichedMovement
  ) {
    const confirmed = window.confirm(
      '¿Confirmas que la mercancía salió físicamente del almacén? Esta acción dará de baja definitiva el inventario reservado.'
    );

    if (!confirmed) {
      return;
    }

    try {
      setConfirmingExitMovementId(movement.id);
      setOperationMessage('');
      setOperationError('');

      const exitConfirmationNotes = [
        movement.notes,
        'Estado operativo: Salida confirmada',
        'La mercancía fue retirada físicamente del almacén.',
      ]
        .filter(Boolean)
        .join('\n');

      await confirmExitWorkflow(movement.id, {
        notes: exitConfirmationNotes,
        decision_explanation:
          'Salida Confirmada: mercancía retirada físicamente del almacén y movimiento cerrado.',
        created_by: 'Usuario CJWMS',
      });

      await loadMovements();

      setOperationMessage(
        'La salida fue confirmada correctamente y el inventario reservado fue dado de baja.'
      );
    } catch (error) {
      console.error(
        'Error al confirmar la salida de la mercancía:',
        error
      );

      setOperationError(
        error instanceof Error
          ? error.message
          : 'No fue posible confirmar la salida de la mercancía.'
      );
    } finally {
      setConfirmingExitMovementId(null);
    }
  }

  function handleEdit() {
    alert('La edición de movimientos se migrará en D.7.3.');
  }

  function handleDelete() {
    alert('La eliminación de movimientos se migrará en D.7.4.');
  }

  return (
    <div className="space-y-6">
      <header className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Operación WMS
        </p>

        <h1 className="mt-2 text-3xl font-bold">Movimientos</h1>

        <p className="mt-2 text-slate-600">
          Control y seguimiento de entradas, salidas y reubicaciones en racks compactos.
        </p>
      </header>

      {operationMessage && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-medium text-emerald-700">
            {operationMessage}
          </p>
        </div>
      )}

      {operationError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="font-medium text-red-700">
            {operationError}
          </p>
        </div>
      )}

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-bold">Lista de movimientos</h2>

            <p className="text-sm text-slate-500">
              Mostrando {filteredMovements.length} de {movements.length} movimientos
            </p>
          </div>

          <button
            onClick={handleNewMovement}
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Nuevo movimiento
          </button>
        </div>

        <div className="mb-5 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 md:grid-cols-4">
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-slate-600">
              Buscar
            </label>

            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Buscar por ID, tipo, notas, motivo o usuario"
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-600">
              Estado
            </label>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
            >
              <option>Todos</option>
              <option>Pendiente</option>
              <option>Completado</option>
              <option>Cancelado</option>
              <option>Fallido</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-600">
              Prioridad
            </label>

            <select
              value={priorityFilter}
              onChange={(event) => setPriorityFilter(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
            >
              <option>Todas</option>
              <option>Baja</option>
              <option>Media</option>
              <option>Alta</option>
            </select>
          </div>

          <div className="md:col-span-4">
            <button
              onClick={clearFilters}
              className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100"
            >
              Limpiar filtros
            </button>
          </div>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
            Cargando movimientos desde Supabase...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1180px] border-separate border-spacing-y-2 text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-4 py-3">Tipo</th>
                  <th className="px-4 py-3">Producto</th>
                  <th className="px-4 py-3">Pallet</th>
                  <th className="px-4 py-3">Origen</th>
                  <th className="px-4 py-3">Destino</th>
                  <th className="px-4 py-3">Prioridad</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3">Fecha</th>
                  <th className="px-4 py-3">Asignación</th>
                  <th className="px-4 py-3">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {filteredMovements.map((movement) => {
                  const priority = getPriorityByScore(movement.decision_score);
                  const assignedPickingOperator = getAssignedPickingOperator(
                    movement.notes
                  );

                  const pickingInProgress = isPickingInProgress(movement);

                  const pickingPartialProgress = hasPickingPartialProgress(movement);

                  const packingCanStart =
                    canStartPacking(movement);

                  const packingCanRegisterProgress =
                    canRegisterPackingProgress(movement);

                  const packingCanComplete =
                    canCompletePacking(movement);

                  const packingInProgress =
                    isPackingInProgress(movement);

                  const shippingCanStart =
                    canStartShipping(movement);

                  const shippingCanRegisterProgress =
                    canRegisterShippingProgress(movement);

                  const shippingCanComplete =
                    canCompleteShipping(movement);

                  const shippingInProgress =
                    isShippingInProgress(movement);

                  const shippingCompleted =
                    isShippingCompleted(movement);

                  const exitCanBeConfirmed =
                    canConfirmExit(movement);

                  const exitConfirmed =
                    isExitConfirmed(movement);

                  return (
                    <tr
                      key={movement.id}
                      className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-100"
                    >

                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${getMovementTypeClass(
                            movement.movement_type
                          )}`}
                        >
                          <span>{getMovementTypeIcon(movement.movement_type)}</span>
                          {getMovementTypeLabel(movement.movement_type)}
                        </span>
                      </td>

                      <td className="px-4 py-4 font-semibold text-slate-900">
                        {movement.productName}
                      </td>

                      <td className="px-4 py-4 text-slate-700 whitespace-nowrap">
                        {movement.palletName}
                      </td>

                      <td className="px-4 py-4 text-slate-700 whitespace-nowrap">
                        {movement.originName}
                      </td>

                      <td className="px-4 py-4 text-slate-700 whitespace-nowrap">
                        {movement.destinationName}
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getPriorityClass(
                            priority
                          )}`}
                        >
                          {priority}
                        </span>
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                            movement.status
                          )}`}
                        >
                          {getStatusLabel(movement.status)}
                        </span>
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap text-slate-700">
                        {(() => {
                          const fecha = formatMovementDate(movement.created_at);

                          return (
                            <div className="leading-tight">
                              <div className="font-medium">
                                {fecha.fecha}
                              </div>

                              <div className="text-xs text-slate-500">
                                {fecha.hora}
                              </div>
                            </div>
                          );
                        })()}
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        {movement.movement_type === 'salida' &&
                        movement.status === 'pending' &&
                        !assignedPickingOperator ? (
                          <button
                            type="button"
                            onClick={() => handleOpenPickingAssignment(movement)}
                            className="rounded-lg bg-violet-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-violet-700"
                          >
                            Asignar Picking
                          </button>
                        ) : movement.movement_type === 'salida' &&
                          movement.status === 'pending' &&
                          assignedPickingOperator &&
                          !pickingInProgress ? (
                          <div className="space-y-2">
                            <div className="leading-tight">
                              <div className="font-semibold text-violet-700">
                                {assignedPickingOperator}
                              </div>

                              <div className="text-xs text-slate-500">
                                Picking pendiente de inicio
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleStartPicking(movement)}
                              disabled={startingPickingMovementId === movement.id}
                              className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {startingPickingMovementId === movement.id
                                ? 'Iniciando...'
                                : 'Iniciar Picking'}
                            </button>
                          </div>
                        ) : movement.movement_type === 'salida' &&
                          movement.status === 'pending' &&
                          assignedPickingOperator &&
                          pickingInProgress ? (
                          <div className="space-y-2">
                            <div className="leading-tight">
                              <div className="font-semibold text-blue-700">
                                {assignedPickingOperator}
                              </div>

                              <div
                                className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                  pickingPartialProgress
                                    ? 'bg-cyan-100 text-cyan-700'
                                    : 'bg-blue-100 text-blue-700'
                                }`}
                              >
                                {pickingPartialProgress
                                  ? 'Extracción parcial confirmada'
                                  : 'Picking en proceso'}
                              </div>
                            </div>

                            <div className="flex flex-col gap-2">
                              <button
                                type="button"
                                onClick={() => handleOpenPickingProgress(movement)}
                                disabled={finishingPickingMovementId === movement.id}
                                className="rounded-lg bg-cyan-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60"
                              >
                                Confirmar avance parcial
                              </button>

                              <button
                                type="button"
                                onClick={() => handleCompletePicking(movement)}
                                disabled={finishingPickingMovementId === movement.id}
                                className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                              >
                                {finishingPickingMovementId === movement.id
                                  ? 'Finalizando...'
                                  : 'Finalizar Picking'}
                              </button>
                            </div>

                          </div>

                          ) : canConfirmDeliveryAreaArrival(movement) ? (
                            <button
                              type="button"
                              onClick={() => handleOpenDeliveryArrival(movement)}
                              className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700"
                            >
                              Área de Entrega
                            </button>
                            ) : canStartOperationalVerification(movement) ? (
                              <div className="space-y-2">
                                <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                                  En Área de Entrega
                                </span>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleOpenOperationalVerification(movement)
                                  }
                                  className="block rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700"
                                >
                                  Verificar mercancía
                                </button>
                              </div>
                            ) : packingCanStart ? (
                              <div className="space-y-2">
                                <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                                  Pendiente de Empaque
                                </span>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleOpenPacking(movement, 'start')
                                  }
                                  className="block rounded-lg bg-amber-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-amber-700"
                                >
                                  Iniciar Empaque
                                </button>
                              </div>
                            ) : packingCanRegisterProgress ? (
                              <div className="space-y-2">
                                <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                                  Empaque Iniciado
                                </span>

                                <div className="flex flex-col gap-2">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleOpenPacking(
                                        movement,
                                        'progress'
                                      )
                                    }
                                    className="rounded-lg bg-orange-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-orange-700"
                                  >
                                    Registrar Avance
                                  </button>

                                  {packingCanComplete && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleOpenPacking(
                                          movement,
                                          'complete'
                                        )
                                      }
                                      className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700"
                                    >
                                      Finalizar Empaque
                                    </button>
                                  )}
                                </div>
                              </div>
                            ) : packingInProgress &&
                              packingCanComplete ? (
                              <div className="space-y-2">
                                <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                                  Empaque en Proceso
                                </span>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleOpenPacking(
                                      movement,
                                      'complete'
                                    )
                                  }
                                  className="block rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700"
                                >
                                  Finalizar Empaque
                                </button>
                              </div>
                            ) : shippingCanStart ? (
                              <div className="space-y-2">
                                <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                                  Liberado para Embarque
                                </span>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleOpenShipping(movement, 'start')
                                  }
                                  className="block rounded-lg bg-sky-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-sky-700"
                                >
                                  Iniciar Embarque
                                </button>
                              </div>
                            ) : shippingCanRegisterProgress ? (
                              <div className="space-y-2">
                                <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                                  Embarque Iniciado
                                </span>

                                <div className="flex flex-col gap-2">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleOpenShipping(movement, 'progress')
                                    }
                                    className="rounded-lg bg-sky-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-sky-700"
                                  >
                                    Registrar Avance
                                  </button>

                                  {shippingCanComplete && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleOpenShipping(movement, 'complete')
                                      }
                                      className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700"
                                    >
                                      Finalizar Embarque
                                    </button>
                                  )}
                                </div>
                              </div>
                            ) : shippingInProgress &&
                              shippingCanComplete ? (
                              <div className="space-y-2">
                                <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                  Embarque en Proceso
                                </span>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleOpenShipping(movement, 'complete')
                                  }
                                  className="block rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700"
                                >
                                  Finalizar Embarque
                                </button>
                              </div>
                            ) : exitCanBeConfirmed ? (
                              <div className="space-y-2">
                                <span className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
                                  Pendiente de Confirmación de Salida
                                </span>

                                <button
                                  type="button"
                                  onClick={() => handleConfirmExit(movement)}
                                  disabled={confirmingExitMovementId === movement.id}
                                  className="block rounded-lg bg-violet-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                  {confirmingExitMovementId === movement.id
                                    ? 'Confirmando...'
                                    : 'Confirmar Salida'}
                                </button>
                              </div>
                            ) : exitConfirmed ? (
                              <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                                Salida Confirmada
                              </span>
                            ) : shippingCompleted ? (
                              <span className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
                                Pendiente de Confirmación de Salida
                              </span>
                            ) : (
                              <span className="text-slate-400">—</span>
                          )}
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button
                            onClick={handleEdit}
                            className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                          >
                            Editar
                          </button>

                          <button
                            onClick={handleDelete}
                            className="rounded-lg bg-red-100 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-200"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {filteredMovements.length === 0 && (
                  <tr>
                    <td
                      colSpan={11}
                      className="py-8 text-center text-sm text-slate-500"
                    >
                      No se encontraron movimientos con los filtros seleccionados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <MovementFormModal
        open={showMovementModal}
        onClose={() => {
          setShowMovementModal(false);
          loadMovements();
        }}
        onCreated={() => {
          loadMovements();

          window.dispatchEvent(
            new CustomEvent('cjwms-inventory-updated')
          );
        }}
      />

      <PickingAssignmentModal
        open={selectedPickingMovement !== null}
        movement={selectedPickingMovement}
        submitting={submittingPickingAssignment}
        onClose={handleClosePickingAssignment}
        onConfirm={handleConfirmPickingAssignment}
      />

      <PickingProgressModal
        open={selectedPickingProgressMovement !== null}
        movement={selectedPickingProgressMovement}
        submitting={submittingPickingProgress}
        onClose={handleClosePickingProgress}
        onConfirm={handleConfirmPickingProgress}
      />

      <DeliveryAreaArrivalModal
        open={selectedDeliveryArrivalMovement !== null}
        movement={selectedDeliveryArrivalMovement}
        submitting={submittingDeliveryArrival}
        onClose={handleCloseDeliveryArrival}
        onConfirm={handleConfirmDeliveryArrival}
      />

      <OperationalVerificationModal
        open={selectedOperationalVerificationMovement !== null}
        movement={selectedOperationalVerificationMovement}
        submitting={submittingOperationalVerification}
        onClose={handleCloseOperationalVerification}
        onConfirm={handleConfirmOperationalVerification}
      />

      <PackingProgressModal
        open={selectedPackingMovement !== null}
        movement={selectedPackingMovement}
        action={packingAction}
        submitting={submittingPacking}
        onClose={handleClosePacking}
        onConfirm={handleConfirmPacking}
      />

      <ShippingProgressModal
        open={selectedShippingMovement !== null}
        movement={selectedShippingMovement}
        action={shippingAction}
        submitting={submittingShipping}
        onClose={handleCloseShipping}
        onConfirm={handleConfirmShipping}
      />

    </div>
  );
}

export default MovementsPage;