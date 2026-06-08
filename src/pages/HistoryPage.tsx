import { useWmsData } from '../context/WmsDataContext';

function getTipoLabel(tipo: string) {
  if (tipo === 'entrada') return 'Entrada';
  if (tipo === 'salida') return 'Salida';
  return 'Reubicación';
}

function getTipoClass(tipo: string) {
  if (tipo === 'entrada') return 'bg-emerald-100 text-emerald-700';
  if (tipo === 'salida') return 'bg-red-100 text-red-700';
  return 'bg-blue-100 text-blue-700';
}

function HistoryPage() {
  const { movimientos } = useWmsData();

  return (
    <div className="space-y-6">
      <header className="rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">Historial</h1>

        <p className="mt-2 text-slate-600">
          Bitácora de entradas, salidas y reubicaciones realizadas.
        </p>
      </header>

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        {movimientos.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
            <p className="text-lg font-bold text-slate-700">
              No hay movimientos registrados
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Cuando captures entradas, salidas o reubicaciones aparecerán aquí.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-separate border-spacing-y-3">
              <thead>
                <tr className="text-left text-sm text-slate-500">
                  <th className="px-4 py-2">Fecha</th>
                  <th className="px-4 py-2">Tipo</th>
                  <th className="px-4 py-2">SKU / Producto</th>
                  <th className="px-4 py-2">Cantidad</th>
                  <th className="px-4 py-2">Origen</th>
                  <th className="px-4 py-2">Destino</th>
                  <th className="px-4 py-2">Operador</th>
                </tr>
              </thead>

              <tbody>
                {movimientos.map((mov) => (
                  <tr key={mov.id} className="bg-slate-50">
                    <td className="rounded-l-xl px-4 py-4 text-sm font-semibold text-slate-700">
                      {new Date(mov.fecha).toLocaleString()}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${getTipoClass(
                          mov.tipo
                        )}`}
                      >
                        {getTipoLabel(mov.tipo)}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-sm font-bold text-slate-900">
                      {mov.sku}
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-700">
                      {mov.cantidad}
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-700">
                      {mov.posicionOrigen ?? '—'}
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-700">
                      {mov.posicionDestino ?? '—'}
                    </td>

                    <td className="rounded-r-xl px-4 py-4 text-sm font-semibold text-slate-700">
                      {mov.operador}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default HistoryPage;