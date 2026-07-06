type ExecutiveRiskRadar = {
  saturation: number;
  fragmentation: number;
  blockage: number;
  rotation: number;
};

type ExecutiveRiskRadarSectionProps = {
  riskRadar: ExecutiveRiskRadar;
};

function ExecutiveRiskRadarSection({
  riskRadar,
}: ExecutiveRiskRadarSectionProps) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        Radar de Riesgo Operativo
      </p>

      <div className="mt-4 space-y-4">
        {[
          ['Saturación', riskRadar.saturation],
          ['Fragmentación', riskRadar.fragmentation],
          ['Bloqueo', riskRadar.blockage],
          ['Rotación', riskRadar.rotation],
        ].map(([label, value]) => (
          <div key={label}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="font-medium text-slate-700">
                {label}
              </span>

              <span className="font-semibold text-slate-900">
                {value}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className={`h-full rounded-full ${
                  Number(value) >= 70
                    ? 'bg-red-500'
                    : Number(value) >= 40
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                }`}
                style={{
                  width: `${value}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExecutiveRiskRadarSection;