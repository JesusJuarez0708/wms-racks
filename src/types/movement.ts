export type MovementStatus = 'Pendiente' | 'En proceso' | 'Completado';

export type MovementPriority = 'Baja' | 'Media' | 'Alta';

export type MovementType = 'Entrada' | 'Salida' | 'Reubicación';

export type Movement = {
  id: string;
  type: MovementType;
  product: string;
  rack: string;
  location: string;
  operator: string;
  status: MovementStatus;
  priority: MovementPriority;
  createdAt: string;
};