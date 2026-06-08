import type { Movement } from '../types/movement';

export const movements: Movement[] = [
  {
    id: 'MOV-001',
    type: 'Entrada',
    product: 'Tarima medicamento RX',
    rack: 'Rack A-01',
    location: 'Pasillo 1 / Nivel 3',
    operator: 'Juan Pérez',
    status: 'Pendiente',
    priority: 'Alta',
    createdAt: '2026-05-13 08:30',
  },
  {
    id: 'MOV-002',
    type: 'Salida',
    product: 'Insumo hospitalario',
    rack: 'Rack B-04',
    location: 'Pasillo 2 / Nivel 1',
    operator: 'María López',
    status: 'En proceso',
    priority: 'Media',
    createdAt: '2026-05-13 09:10',
  },
  {
    id: 'MOV-003',
    type: 'Reubicación',
    product: 'Material de empaque',
    rack: 'Rack C-02',
    location: 'Pasillo 3 / Nivel 4',
    operator: 'Carlos Ruiz',
    status: 'Completado',
    priority: 'Baja',
    createdAt: '2026-05-13 10:00',
  },
];