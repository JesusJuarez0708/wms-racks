import { useEffect, useState } from 'react';

import {
  assignDockToGateAccess,
  changeGateAccessStatus,
  createGateAccess,
  getGateAccesses,
  releaseGateAccessToReception,
  startGateAccessReception,
  startGateAccessUnloading,
  finishGateAccessUnloading,
  startGateAccessInitialInspection,
  startGateAccessInspection,
  completeGateAccessInspection,
  acceptGateAccessReception,
  assignGateAccessLocation,
  startGateAccessStorage,
  continueGateAccessStorage,
  completeGateAccessStorage,
  confirmGateAccessStorage,
  type GateAccessItem,
} from '../services/gateAccessService';

import { getWarehouses } from '../services/warehouseService';
import GateAccessTable from '../components/GateAccessTable';

import {
  getGateAccessStatusLabel,
  getGateAccessTransition,
  type GateAccessAction,
} from '../services/gateAccessStateMachine';

import type {
  GateAccessStatus,
} from '../repositories/gateAccessRepository';

import DockAssignmentDialog from '../components/DockAssignmentDialog';

export default function AccessControlPage() {
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [driverName, setDriverName] = useState('');
    const [carrierCompany, setCarrierCompany] = useState('');
    const [operationType, setOperationType] = useState<'entrada' | 'salida'>('entrada');
    const [notes, setNotes] = useState('');
    const [warehouseId, setWarehouseId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [updatingAccessId, setUpdatingAccessId] =
        useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [gateAccesses, setGateAccesses] = useState<GateAccessItem[]>([]);
    const [dockAssignmentOpen, setDockAssignmentOpen] =
    useState(false);

    const [selectedAccessId, setSelectedAccessId] =
    useState<string | null>(null);

  useEffect(() => {
  loadInitialData();
  }, []);

  async function loadInitialData() {
    setLoading(true);
    setErrorMessage(null);

    try {
        const [warehouses, accesses] = await Promise.all([
        getWarehouses(),
        getGateAccesses(),
        ]);

        const activeWarehouse =
        warehouses.find((warehouse) => warehouse.is_active) ??
        warehouses[0];

        if (!activeWarehouse) {
        throw new Error(
            'No existe un almacén disponible para registrar accesos.'
        );
        }

        setWarehouseId(activeWarehouse.id);
        setGateAccesses(accesses);
    } catch (error) {
        console.error(error);

        setErrorMessage(
        error instanceof Error
            ? error.message
            : 'No fue posible cargar Control de Acceso.'
        );
    } finally {
        setLoading(false);
    }
  }

  async function loadGateAccesses() {
    setLoading(true);

    try {
      const data = await getGateAccesses();
      setGateAccesses(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateGateAccess() {
    setMessage(null);
    setErrorMessage(null);

    const normalizedPlate = vehiclePlate.trim().toUpperCase();
    const normalizedDriverName = driverName.trim();
    const normalizedCarrierCompany = carrierCompany.trim();
    const normalizedNotes = notes.trim();

    if (!warehouseId) {
        setErrorMessage(
        'No existe un almacén disponible para registrar el acceso.'
        );
        return;
    }

    if (
        !normalizedPlate ||
        !normalizedDriverName ||
        !normalizedCarrierCompany
    ) {
        setErrorMessage(
        'Completa las placas, el nombre del operador y la empresa transportista.'
        );
        return;
    }

    setSaving(true);

    try {
        await createGateAccess({
        warehouse_id: warehouseId,
        vehicle_plate: normalizedPlate,
        driver_name: normalizedDriverName,
        carrier_company: normalizedCarrierCompany,
        operation_type:
            operationType === 'entrada' ? 'inbound' : 'outbound',
        notes: normalizedNotes || null,
        created_by: 'Usuario CJWMS',
        });

        await loadGateAccesses();

        setVehiclePlate('');
        setDriverName('');
        setCarrierCompany('');
        setOperationType('entrada');
        setNotes('');

        setMessage('Acceso registrado correctamente.');
    } catch (error) {
        console.error(error);

        setErrorMessage(
        error instanceof Error
            ? error.message
            : 'No fue posible registrar el acceso.'
        );
    } finally {
        setSaving(false);
    }
  }

  async function handleGateAccessTransition(
    id: string,
    currentStatus: GateAccessStatus,
    action: GateAccessAction
    ) {
    setMessage(null);
    setErrorMessage(null);

    const transition = getGateAccessTransition(
        currentStatus,
        action
    );

    if (!transition) {
        setErrorMessage(
        'La transición solicitada no está permitida para el estado actual.'
        );
        return;
    }

    setUpdatingAccessId(id);

    try {

        if (action === 'assign_dock') {
            setSelectedAccessId(id);
            setDockAssignmentOpen(true);
            return;
        }

        if (action === 'release_to_reception') {
            await releaseGateAccessToReception(id);
        } else if (action === 'start_reception') {
            await startGateAccessReception(id);
        } else if (action === 'start_unloading') {
            await startGateAccessUnloading(id);
        } else if (action === 'finish_unloading') {
            await finishGateAccessUnloading(id);
        } else if (action === 'start_initial_inspection') {
            await startGateAccessInitialInspection(id);
        } else if (action === 'start_inspection') {
            await startGateAccessInspection(id);
        } else if (action === 'complete_inspection') {
            await completeGateAccessInspection(id);
        } else if (action === 'accept_reception') {
            await acceptGateAccessReception(id);
        } else if (action === 'assign_location') {
            await assignGateAccessLocation(id);
        } else if (action === 'start_storage') {
            await startGateAccessStorage(id);
        } else if (action === 'continue_storage') {
            await continueGateAccessStorage(id);
        } else if (action === 'complete_storage') {
            await completeGateAccessStorage(id);
        } else if (action === 'confirm_storage') {
            await confirmGateAccessStorage(id);
        } else {
            await changeGateAccessStatus(
                id,
                transition.to
            );
        }

        await loadGateAccesses();

        setMessage(
            `Estado actualizado correctamente: ${
            getGateAccessStatusLabel(transition.to)
            }.`
        );
    } catch (error) {
        console.error(error);

        setErrorMessage(
        error instanceof Error
            ? error.message
            : 'No fue posible actualizar el estado del acceso.'
        );
    } finally {
        setUpdatingAccessId(null);
    }
  }

  async function handleDockAssignment(dockId: string) {
    if (!selectedAccessId) {
        return;
    }

    setUpdatingAccessId(selectedAccessId);

    try {
        await assignDockToGateAccess(
            selectedAccessId,
            dockId
        );

        setDockAssignmentOpen(false);
        setSelectedAccessId(null);

        await loadGateAccesses();

        setMessage(
            'Andén asignado correctamente.'
        );
    } catch (error) {
        console.error(error);

        setErrorMessage(
            error instanceof Error
                ? error.message
                : 'No fue posible asignar el andén.'
        );
    } finally {
        setUpdatingAccessId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">
          Control de Acceso
        </h1>

        <p className="mt-2 text-slate-600">
          Registro y consulta de accesos al almacén.
        </p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div>
            <h2 className="text-xl font-semibold text-slate-900">
            Nuevo acceso
            </h2>

            <p className="mt-1 text-sm text-slate-500">
            Registra los datos de la unidad que solicita acceso al almacén.
            </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
            <label
                htmlFor="vehiclePlate"
                className="mb-2 block text-sm font-medium text-slate-700"
            >
                Placas de la unidad
            </label>

            <input
                id="vehiclePlate"
                type="text"
                value={vehiclePlate}
                onChange={(event) =>
                setVehiclePlate(event.target.value.toUpperCase())
                }
                placeholder="Ej. ABC-123"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
            </div>

            <div>
            <label
                htmlFor="driverName"
                className="mb-2 block text-sm font-medium text-slate-700"
            >
                Nombre del operador
            </label>

            <input
                id="driverName"
                type="text"
                value={driverName}
                onChange={(event) => setDriverName(event.target.value)}
                placeholder="Nombre completo"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
            </div>

            <div>
            <label
                htmlFor="carrierCompany"
                className="mb-2 block text-sm font-medium text-slate-700"
            >
                Empresa transportista
            </label>

            <input
                id="carrierCompany"
                type="text"
                value={carrierCompany}
                onChange={(event) => setCarrierCompany(event.target.value)}
                placeholder="Nombre de la empresa"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
            </div>

            <div>
            <label
                htmlFor="operationType"
                className="mb-2 block text-sm font-medium text-slate-700"
            >
                Tipo de operación
            </label>

            <select
                id="operationType"
                value={operationType}
                onChange={(event) =>
                setOperationType(
                    event.target.value as 'entrada' | 'salida'
                )
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
                <option value="entrada">Entrada</option>
                <option value="salida">Salida</option>
            </select>
            </div>
        </div>

        <div className="mt-5">
            <label
            htmlFor="notes"
            className="mb-2 block text-sm font-medium text-slate-700"
            >
            Observaciones
            </label>

            <textarea
            id="notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={4}
            placeholder="Observaciones relacionadas con el acceso..."
            className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
        </div>

        {errorMessage && (
        <div
            role="alert"
            className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
            {errorMessage}
        </div>
        )}

        {message && (
        <div
            role="status"
            className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
        >
            {message}
        </div>
        )}

        <div className="mt-6 flex justify-end">
            <button
            type="button"
            onClick={handleCreateGateAccess}
            disabled={saving || loading || !warehouseId}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {saving ? 'Registrando...' : 'Registrar acceso'}
            </button>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">
          Resumen
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border p-4">
            <p className="text-sm text-slate-500">
              Registros
            </p>

            <p className="mt-2 text-3xl font-bold">
              {gateAccesses.length}
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <p className="text-sm text-slate-500">
              Estado
            </p>

            <p className="mt-2 font-semibold">
              {loading ? 'Cargando...' : 'Listo'}
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <p className="text-sm text-slate-500">
              Última actualización
            </p>

            <p className="mt-2 font-semibold">
              {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div>
            <h2 className="text-xl font-semibold text-slate-900">
            Accesos registrados
            </h2>

            <p className="mt-1 text-sm text-slate-500">
            Consulta los accesos registrados en el almacén.
            </p>
        </div>

        <GateAccessTable
            gateAccesses={gateAccesses}
            loading={loading}
            updatingAccessId={updatingAccessId}
            onTransition={handleGateAccessTransition}
        />
      </div>

      <DockAssignmentDialog
        open={dockAssignmentOpen}
        assigning={
            selectedAccessId !== null &&
            updatingAccessId === selectedAccessId
        }
        onClose={() => {
            setDockAssignmentOpen(false);
            setSelectedAccessId(null);
        }}
        onAssign={handleDockAssignment}
      />

    </div>
  );
}