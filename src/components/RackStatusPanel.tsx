const racks = [
  { name: 'Rack A-01', status: 'Disponible', progress: 70 },
  { name: 'Rack B-04', status: 'En movimiento', progress: 58 },
  { name: 'Rack C-02', status: 'Disponible', progress: 44 },
  { name: 'Rack D-06', status: 'Disponible', progress: 31 },
];

function RackStatusPanel() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold">
        Estado de racks
      </h2>

      <div className="mt-5 space-y-4">
        {racks.map((rack) => (
          <div
            key={rack.name}
            className="rounded-xl border border-slate-200 p-4"
          >
            <div className="flex items-center justify-between">
              <p className="font-semibold">
                {rack.name}
              </p>

              <span className="text-xs text-slate-500">
                {rack.status}
              </span>
            </div>

            <div className="mt-3 h-2 rounded-full bg-slate-100">
              <div
                className="h-2 rounded-full bg-blue-600"
                style={{ width: `${rack.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RackStatusPanel;