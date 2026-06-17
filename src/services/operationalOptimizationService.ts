export type OptimizationRecommendation = {
  id: string;
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  expectedImpact: string;
};

export async function generateOptimizationRecommendations(): Promise<
  OptimizationRecommendation[]
> {
  return [
    {
      id: crypto.randomUUID(),
      priority: 'medium',
      title: 'Consolidación de líneas subutilizadas',
      description:
        'Se detectaron líneas con baja ocupación que podrían consolidarse.',
      expectedImpact:
        'Liberación potencial de espacio operativo.',
    },
  ];
}