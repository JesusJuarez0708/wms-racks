import { useEffect, useState } from 'react';
import {
  generateOperationalNarrative,
  type OperationalNarrative,
} from '../services/operationalNarrativeService';

export default function OptimizacionPage() {
  const [narrative, setNarrative] =
    useState<OperationalNarrative | null>(null);

  useEffect(() => {
    async function loadNarrative() {
      const narrativeData = await generateOperationalNarrative();
      setNarrative(narrativeData);
    }

    loadNarrative();
  }, []);

  return (
    <div className="space-y-6 p-6 text-slate-100">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Optimización de espacios
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Centro de Optimización Operativa CJWMS
        </p>
      </div>

      {narrative && (
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            Análisis Ejecutivo CJWMS
          </div>

          <p className="text-sm text-slate-200">
            {narrative.summary}
          </p>
        </div>
      )}
    </div>
  );
}