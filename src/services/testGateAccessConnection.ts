import {
  createGateAccess,
  getGateAccesses,
} from './gateAccessService';

import { getWarehouses } from './warehouseService';

export async function testGateAccessConnection(): Promise<void> {
  console.log('=== PRUEBA CONTROL DE ACCESO ===');

  const warehouses = await getWarehouses();

  if (warehouses.length === 0) {
    throw new Error(
      'No existen almacenes disponibles para probar Control de Acceso.'
    );
  }

  const warehouse = warehouses[0];

  console.log('Almacén seleccionado:', warehouse);

  const createdGateAccess = await createGateAccess({
    warehouse_id: warehouse.id,
    vehicle_plate: `TEST-${Date.now()}`,
    driver_name: 'Operador de prueba',
    carrier_company: 'Transportista de prueba',
    operation_type: 'inbound',
    notes: 'Registro temporal creado por testGateAccessConnection.',
    created_by: 'Integration Test',
  });

  console.log('Registro creado:', createdGateAccess);

  const gateAccesses = await getGateAccesses();

  console.log(
    'Registros consultados:',
    gateAccesses.length
  );

  const persistedGateAccess = gateAccesses.find(
    (gateAccess) => gateAccess.id === createdGateAccess.id
  );

  if (!persistedGateAccess) {
    throw new Error(
      'El registro de Control de Acceso fue creado, pero no apareció en la consulta posterior.'
    );
  }

  console.log(
    'Registro persistido correctamente:',
    persistedGateAccess
  );

  console.log('=== PRUEBA FINALIZADA CORRECTAMENTE ===');
}