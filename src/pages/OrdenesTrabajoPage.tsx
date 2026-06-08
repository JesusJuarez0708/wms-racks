import { useState } from 'react';

import {
  useWmsData,
  type EstadoOrdenTrabajo,
} from '../context/WmsDataContext';

type FiltroOrdenes =
  | 'todas'
  | 'pendiente'
  | 'asignada'
  | 'en_proceso'
  | 'completada';

function obtenerTextoEstadoOT(estado: EstadoOrdenTrabajo) {
  if (estado === 'pendiente') return 'Pendiente';
  if (estado === 'asignada') return 'Asignada';
  if (estado === 'en_proceso') return 'En proceso';
  return 'Completada';
}

function obtenerColorEstadoOT(estado: EstadoOrdenTrabajo) {
  if (estado === 'pendiente') {
    return 'bg-yellow-100 text-yellow-700 border-yellow-200';
  }

  if (estado === 'asignada') {
    return 'bg-blue-100 text-blue-700 border-blue-200';
  }

  if (estado === 'en_proceso') {
    return 'bg-purple-100 text-purple-700 border-purple-200';
  }

  return 'bg-green-100 text-green-700 border-green-200';
}

function obtenerTextoBotonEstadoOT(estado: EstadoOrdenTrabajo) {
  if (estado === 'pendiente') return 'Asignar OT';
  if (estado === 'asignada') return 'Iniciar ejecución';
  if (estado === 'en_proceso') return 'Completar OT';
  return 'Completada';
}

export default function OrdenesTrabajoPage() {
  const {
    ordenesTrabajo,
    avanzarEstadoOrdenTrabajo,
  } = useWmsData();

  const [filtro, setFiltro] = useState<FiltroOrdenes>('todas');

  const ordenesFiltradas =
    filtro === 'todas'
      ? ordenesTrabajo
      : ordenesTrabajo.filter((orden) => orden.estado === filtro);

  const totalPendientes = ordenesTrabajo.filter(
    (orden) => orden.estado === 'pendiente'
  ).length;

  const totalAsignadas = ordenesTrabajo.filter(
    (orden) => orden.estado === 'asignada'
  ).length;

  const totalEnProceso = ordenesTrabajo.filter(
    (orden) => orden.estado === 'en_proceso'
  ).length;

  const totalCompletadas = ordenesTrabajo.filter(
    (orden) => orden.estado === 'completada'
  ).length;

  return (
    <div className="space-y-6">
      <header className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Gestión operativa
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          Órdenes de trabajo
        </h1>

        <p className="mt-2 text-slate-600">
          Control de órdenes generadas, asignadas, en ejecución y completadas.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-yellow-700">
            Pendientes
          </p>
          <p className="mt-2 text-3xl font-black text-yellow-900">
            {totalPendientes}
          </p>
        </div>

        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
            Asignadas
          </p>
          <p className="mt-2 text-3xl font-black text-blue-900">
            {totalAsignadas}
          </p>
        </div>

        <div className="rounded-2xl border border-purple-200 bg-purple-50 p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-purple-700">
            En proceso
          </p>
          <p className="mt-2 text-3xl font-black text-purple-900">
            {totalEnProceso}
          </p>
        </div>

        <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-green-700">
            Completadas
          </p>
          <p className="mt-2 text-3xl font-black text-green-900">
            {totalCompletadas}
          </p>
        </div>
      </section>

      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="mb-5 flex flex-wrap gap-3">
          {[
            { label: 'Todas', value: 'todas' },
            { label: 'Pendientes', value: 'pendiente' },
            { label: 'Asignadas', value: 'asignada' },
            { label: 'En proceso', value: 'en_proceso' },
            { label: 'Completadas', value: 'completada' },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setFiltro(item.value as FiltroOrdenes)}
              className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
                filtro === item.value
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {ordenesFiltradas.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <p className="text-lg font-black text-slate-700">
              No hay órdenes en este estado
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-500">
              Las órdenes generadas desde Optimización aparecerán aquí.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {ordenesFiltradas.map((orden) => (
              <div
                key={orden.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xl font-black text-slate-900">
                      {orden.id} · {orden.producto}
                    </p>

                    <p className="text-sm font-semibold text-slate-500">
                      Lote: {orden.lote}
                    </p>
                  </div>

                  <span
                    className={`w-fit rounded-full border px-3 py-1 text-xs font-bold ${obtenerColorEstadoOT(
                      orden.estado
                    )}`}
                  >
                    {obtenerTextoEstadoOT(orden.estado)}
                  </span>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-xs font-bold uppercase text-slate-400">
                        Destino
                        </p>
                        <p className="mt-1 text-sm font-black text-slate-900">
                        {orden.destino}
                        </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-xs font-bold uppercase text-slate-400">
                        Orígenes
                        </p>
                        <p className="mt-1 text-sm font-black text-slate-900">
                        {orden.origenes.join(', ')}
                        </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-xs font-bold uppercase text-slate-400">
                        Cantidad
                        </p>
                        <p className="mt-1 text-sm font-black text-slate-900">
                        {orden.cantidad} {orden.unidad}
                        </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-xs font-bold uppercase text-slate-400">
                        Total piezas
                        </p>
                        <p className="mt-1 text-sm font-black text-slate-900">
                        {orden.totalPiezas}
                        </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-xs font-bold uppercase text-slate-400">
                        Responsable
                        </p>
                        <p className="mt-1 text-sm font-black text-slate-900">
                        {orden.responsable ?? 'Sin asignar'}
                        </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-xs font-bold uppercase text-slate-400">
                        Prioridad
                        </p>
                        <p className="mt-1 text-sm font-black text-slate-900">
                        {orden.prioridad}
                        </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-xs font-bold uppercase text-slate-400">
                        Impacto operativo
                        </p>

                        <div>
                            <p className="text-2xl font-bold">
                                {orden.score}/100
                            </p>

                            <p
                                className={`text-sm font-semibold ${
                                orden.score >= 70
                                    ? 'text-emerald-600'
                                    : orden.score >= 40
                                    ? 'text-amber-600'
                                    : 'text-slate-500'
                                }`}
                            >
                                {orden.score >= 70
                                ? 'Alto'
                                : orden.score >= 40
                                ? 'Medio'
                                : 'Bajo'}
                            </p>

                            <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
                                <div
                                className={`h-2 rounded-full ${
                                    orden.score >= 70
                                    ? 'bg-emerald-500'
                                    : orden.score >= 40
                                    ? 'bg-amber-500'
                                    : 'bg-slate-400'
                                }`}
                                style={{
                                    width: `${orden.score}%`,
                                }}
                                />
                            </div>
                        </div>

                        {orden.motivosScore?.length > 0 && (
                        <div className="mt-2 border-t border-slate-200 pt-2">
                            <p className="text-xs font-bold uppercase text-slate-400">
                            Motivos
                            </p>

                            <div className="mt-2 flex flex-wrap gap-2">
                            {orden.motivosScore.map((motivo) => (
                                <span
                                key={motivo}
                                className="rounded-full bg-white px-2 py-1 text-xs font-bold text-slate-600 shadow-sm"
                                >
                                {motivo}
                                </span>
                            ))}
                            </div>
                        </div>
                        )}
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-xs font-bold uppercase text-slate-400">
                        Estado
                        </p>
                        <p className="mt-1 text-sm font-black text-slate-900">
                        {obtenerTextoEstadoOT(orden.estado)}
                        </p>
                    </div>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                  <div className="rounded-xl border border-slate-200 bg-white p-3">
                    <p className="text-xs font-bold uppercase text-slate-400">
                      Creada
                    </p>
                    <p className="mt-1 text-xs font-bold text-slate-700">
                      {orden.fecha}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-3">
                    <p className="text-xs font-bold uppercase text-slate-400">
                      Asignada
                    </p>
                    <p className="mt-1 text-xs font-bold text-slate-700">
                      {orden.fechaAsignacion ?? '--'}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-3">
                    <p className="text-xs font-bold uppercase text-slate-400">
                      Inicio
                    </p>
                    <p className="mt-1 text-xs font-bold text-slate-700">
                      {orden.fechaInicio ?? '--'}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-3">
                    <p className="text-xs font-bold uppercase text-slate-400">
                      Completada
                    </p>
                    <p className="mt-1 text-xs font-bold text-slate-700">
                      {orden.fechaCompletado ?? '--'}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    disabled={orden.estado === 'completada'}
                    onClick={() => avanzarEstadoOrdenTrabajo(orden.id)}
                    className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    {obtenerTextoBotonEstadoOT(orden.estado)}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}