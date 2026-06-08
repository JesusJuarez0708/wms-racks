function DashboardHeader() {
  return (
    <header className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
        Dashboard operativo
      </p>

      <h1 className="mt-2 text-2xl font-bold lg:text-4xl">
        Control inteligente de movimientos en racks compactos
      </h1>

      <p className="mt-2 text-slate-600">
        Monitoreo de movimientos, racks activos e incidencias del almacén.
      </p>
    </header>
  );
}

export default DashboardHeader;