# FAI-OP-011 — Auditoría de Implementación
## OP-011 — Confirmación de Salida

| Campo                  | Información                                    |
| ---------------------- | ---------------------------------------------- |
| Código de Auditoría    | FAI-OP-011                                     |
| Proceso Auditado       | OP-011 — Confirmación de Salida                |
| Proyecto               | CJWMS (Cognitive Warehouse Management System)  |
| Framework              | Framework de Auditoría de Implementación (FAI) |
| Tipo de Auditoría      | Auditoría de Implementación                    |
| Criterio de Evaluación | Evidencia técnica observable en el repositorio |
| Fecha                  | Julio 2026                                     |
| Estado                 | En proceso                                     |

---

## Objetivo de la Auditoría

Verificar el nivel real de implementación del proceso **OP-011 — Confirmación de Salida** dentro del repositorio del CJWMS, identificando la evidencia técnica existente, los componentes implementados, el grado de cobertura funcional y las posibles brechas entre el modelo operativo y la implementación actual.

La auditoría se basa exclusivamente en evidencia verificable dentro del código fuente del sistema. No se consideran especificaciones documentales, diseños conceptuales o funcionalidades proyectadas como evidencia de implementación.

---

# 2. Objetivo

Evaluar técnicamente la implementación del proceso **OP-011 — Confirmación de Salida**, verificando que el sistema registre correctamente el cierre operativo de una salida de mercancía una vez concluido el embarque.

La auditoría identificará la evidencia de implementación relacionada con:

- Confirmación del cierre de la operación.
- Actualización de movimientos.
- Persistencia de la confirmación.
- Actualización de estados operativos.
- Integridad del inventario.
- Consistencia del flujo operacional.
- Evidencia histórica y trazabilidad.
- Integración con los servicios del CJWMS.

El resultado permitirá determinar el nivel oficial de implementación del proceso dentro de la arquitectura actual del sistema.

---

# 3. Alcance

La presente auditoría comprende exclusivamente la inspección técnica del código fuente correspondiente al proceso **OP-011 — Confirmación de Salida** dentro del repositorio oficial del CJWMS.

La revisión incluye, entre otros, los siguientes elementos cuando existan evidencias de implementación:

- Componentes de interfaz relacionados con la confirmación de salida.
- Servicios de negocio.
- Repositorios.
- Modelos y tipos de datos.
- Persistencia en Supabase.
- Flujos de actualización de inventario.
- Registro de movimientos.
- Cambios de estado.
- Integración con órdenes de trabajo.
- Historial operativo.
- Memoria operativa.
- Componentes de trazabilidad.

La auditoría no evalúa documentación funcional, especificaciones conceptuales ni procesos operativos documentados que no posean evidencia directa dentro del código fuente.

---

# 4. Inspección Técnica

## 4.1 Componentes Técnicos Inspeccionados

La inspección técnica de **OP-011 — Confirmación de Salida** se realizó exclusivamente sobre la evidencia observable en el código fuente del CJWMS.

Los principales componentes revisados fueron:

| Componente                                 | Responsabilidad observable                                                                    |
| ------------------------------------------ | --------------------------------------------------------------------------------------------- |
| `src/services/movementWorkflowService.ts`  | Ejecuta la lógica general de movimientos y modifica el inventario según el tipo de operación. |
| `src/services/movementService.ts`          | Expone las operaciones de consulta y creación de movimientos.                                 |
| `src/repositories/movementRepository.ts`   | Consulta e inserta movimientos en Supabase.                                                   |
| `src/components/MovementFormModal.tsx`     | Permite capturar manualmente movimientos, incluida la salida.                                 |
| `src/pages/MovementsPage.tsx`              | Consulta y presenta movimientos persistidos en Supabase.                                      |
| `src/pages/MontacargasPage.tsx`            | Permite registrar movimientos operativos desde el módulo del montacarguista.                  |
| `src/context/WmsDataContext.tsx`           | Administra movimientos locales, validaciones y reconstrucción lógica de ocupación.            |
| `src/repositories/inventoryRepository.ts`  | Consulta y actualiza el inventario persistido en Supabase.                                    |
| `src/pages/HistoryPage.tsx`                | Presenta la bitácora de movimientos almacenados localmente.                                   |
| `src/services/operationalMemoryService.ts` | Registra y consulta memoria operativa.                                                        |
| `src/types/movement.ts`                    | Define tipos generales relacionados con movimientos.                                          |

La revisión identificó dos flujos independientes para registrar salidas:

1. Flujo persistente mediante servicios, repositorios y Supabase.
2. Flujo local mediante `WmsDataContext`, estado React y `localStorage`.

No se identificó un componente, servicio, repositorio o función explícitamente denominado como **Confirmación de Salida**.

---

## 4.2 Identificación del Movimiento de Salida

El sistema reconoce la salida como un tipo general de movimiento.

En el modelo persistente se encuentra incluida dentro de los valores permitidos de `movement_type`:

```ts
movement_type:
  | 'entrada'
  | 'salida'
  | 'reubicacion'
  | 'ajuste'
  | 'bloqueo'
  | 'desbloqueo';
```

La interfaz principal de movimientos también permite seleccionarla explícitamente:

```tsx
<option value="salida">Salida</option>
```

Asimismo, el módulo del montacarguista utiliza el tipo:

```ts
type TipoMovimiento = 'entrada' | 'salida' | 'reubicacion';
```

Esta evidencia demuestra que el CJWMS posee capacidad técnica para registrar operaciones clasificadas como salidas.

Sin embargo, el concepto observable en el código corresponde a un movimiento genérico de salida y no a un proceso independiente de confirmación posterior al embarque.

---

## 4.3 Flujo Persistente de Salida

El flujo persistente se ejecuta mediante:

```ts
executeMovementWorkflow()
```

Cuando el movimiento es de tipo `salida`, el workflow busca un registro de inventario asociado al pallet y modifica su estado:

```ts
if (movement.movement_type === 'salida') {
  if (existingInventoryItem) {
    await changeInventoryStatus(existingInventoryItem.id, 'reserved');
  }
}
```

Después de modificar el inventario, el workflow crea el movimiento:

```ts
const createdMovement = await createMovement(movementToCreate);
```

Finalmente registra una memoria operativa:

```ts
await registerOperationalMemory({
  memoryType: 'movement',
  entityId: createdMovement.id,
  entityType: 'movement',
  ...
});
```

El flujo técnico observable es:

```text
Captura del movimiento de salida
        ↓
Consulta del inventario
        ↓
Localización del pallet
        ↓
Cambio del inventario a reserved
        ↓
Inserción del movimiento
        ↓
Registro de memoria operativa
```

No se observa una etapa posterior que confirme que la mercancía abandonó físicamente el almacén.

---

## 4.4 Estado del Movimiento

El repositorio de movimientos define los siguientes estados:

```ts
status:
  | 'pending'
  | 'completed'
  | 'cancelled'
  | 'failed';
```

No obstante, al insertar un movimiento, el repositorio utiliza `completed` como estado predeterminado:

```ts
status: movement.status ?? 'completed'
```

Adicionalmente, `MovementFormModal.tsx` envía explícitamente:

```ts
status: 'completed'
```

Por tanto, el movimiento de salida se registra directamente como completado durante su creación.

No se encontró evidencia de una transición como:

```text
pending
   ↓
confirmed
   ↓
completed
```

Tampoco se identificaron funciones equivalentes a:

```ts
confirmMovement()
completeMovement()
updateMovementStatus()
confirmShipment()
confirmDispatch()
closeExit()
```

El repositorio implementa únicamente:

```ts
fetchMovements()
insertMovement()
```

Por ello, los estados `pending`, `cancelled` y `failed` existen en el modelo y pueden mostrarse en la interfaz, pero no se encontró evidencia de servicios que administren formalmente sus transiciones.

---

## 4.5 Interfaz de Captura Persistente

`MovementFormModal.tsx` utiliza un formulario genérico para todos los tipos de movimiento.

Los campos visibles incluyen:

- Tipo de movimiento.
- Producto.
- Pallet.
- Cantidad.
- Posición de origen.
- Posición de destino.
- Unidad.
- Notas.

El botón principal de ejecución es:

```tsx
Guardar movimiento
```

No existe una acción específica denominada:

- Confirmar salida.
- Finalizar salida.
- Cerrar embarque.
- Autorizar despacho.
- Confirmar abandono del almacén.

El formulario tampoco implementa validaciones específicas para una salida.

La información de trazabilidad enviada por esta interfaz incluye valores genéricos como:

```ts
reason: 'Movimiento manual',
decision_score: 60,
decision_explanation:
  'Movimiento capturado manualmente desde pantalla de Movimientos.',
created_by: 'Usuario CJWMS',
```

El campo `created_by` utiliza un valor fijo y no demuestra integración con un usuario autenticado.

Como resultado, la interfaz implementa el **registro de un movimiento**, pero no evidencia una **confirmación formal de salida** como proceso independiente.

---

## 4.6 Efecto Persistente Sobre el Inventario

El modelo persistente del inventario permite únicamente los siguientes estados:

```ts
status:
  | 'available'
  | 'reserved'
  | 'blocked';
```

No existen estados terminales equivalentes a:

- `shipped`
- `dispatched`
- `departed`
- `confirmed_exit`
- `out_of_warehouse`

Cuando se registra un movimiento de tipo `salida`, el workflow modifica el inventario a:

```ts
await changeInventoryStatus(existingInventoryItem.id, 'reserved');
```

El repositorio actualiza también el campo temporal:

```ts
updated_at: new Date().toISOString()
```

Sin embargo, el registro de inventario continúa asociado a:

- un pallet;
- una posición física;
- un almacén;
- un estado de inventario.

Durante la inspección no se identificó evidencia de funciones equivalentes a:

```ts
deleteInventory()
removeInventoryItem()
dispatchInventory()
confirmInventoryExit()
```

En consecuencia, el resultado persistente observable es:

```text
Movimiento: completed
Inventario: reserved
Posición: permanece asociada al pallet
Salida física confirmada: No
```

La implementación actual demuestra el cambio de estado del inventario, pero no demuestra técnicamente que la mercancía haya abandonado definitivamente el almacén.

---

## 4.7 Flujo Local del Módulo de Montacargas

`MontacargasPage.tsx` implementa un segundo flujo para registrar movimientos de salida.

Este flujo aplica validaciones operativas más estrictas que el formulario persistente.

Para cualquier movimiento requiere:

- operador;
- cantidad mayor que cero.

Para una salida requiere además una posición de origen válida:

```ts
if (tipo === 'salida' && !posicionOrigen.trim()) {
  setMensaje('Captura la posición origen.');
  return;
}
```

El movimiento construido localmente contiene información como:

```ts
const nuevoMovimiento = {
  id,
  tipo,
  sku,
  descripcion,
  lote,
  cantidad,
  posicionOrigen,
  posicionDestino,
  operador,
  fecha,
  unidad,
  piezasPorCaja,
  totalPiezas,
  rotacion
}
```

Este flujo conserva información operativa adicional, incluyendo:

- SKU;
- descripción;
- lote;
- operador;
- fecha;
- unidad de medida;
- piezas por caja;
- total de piezas;
- clasificación de rotación.

Después de construir el movimiento ejecuta:

```ts
validarMovimiento(...)
agregarMovimiento(...)
```

Finalizando con el mensaje:

```text
Movimiento registrado correctamente.
```

No existe un mensaje específico que indique que la salida física fue confirmada.

---

## 4.8 Validación Local de la Posición de Origen

`WmsDataContext.tsx` reconstruye la ocupación lógica del almacén utilizando el historial local de movimientos.

Antes de aceptar una salida verifica que la posición origen se encuentre ocupada:

```ts
if (
  movimiento.tipo === 'salida' &&
  movimiento.posicionOrigen &&
  !posicionesOcupadas.has(movimiento.posicionOrigen)
)
```

Si la posición está vacía devuelve:

```text
La posición <origen> está vacía.
No se puede registrar salida.
```

Posteriormente, durante el recálculo de ocupación, elimina la posición del mapa lógico:

```ts
if (mov.tipo === 'salida' && mov.posicionOrigen) {
    posicionesOcupadas.delete(mov.posicionOrigen);
}
```

El comportamiento observado es:

```text
Salida registrada
        ↓
Movimiento agregado al historial local
        ↓
Posición liberada del mapa lógico
```

Esta lógica representa correctamente la liberación de la posición dentro del contexto local.

Sin embargo, esta liberación no modifica el inventario persistido en Supabase.

---

## 4.9 Persistencia Local

Los movimientos registrados desde el módulo del montacarguista utilizan almacenamiento local mediante:

```ts
const STORAGE_KEY = 'wms_movimientos';
```

La recuperación de información utiliza:

```ts
localStorage.getItem(STORAGE_KEY)
```

La persistencia utiliza:

```ts
localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(movimientos)
)
```

La función responsable de agregar movimientos realiza únicamente:

```ts
setMovimientos((prev) => [movimiento, ...prev]);
```

Durante la inspección no se observó que este flujo invoque:

- `executeMovementWorkflow()`
- `createMovement()`
- `insertMovement()`
- servicios de inventario;
- servicios de memoria operativa.

En consecuencia, el movimiento registrado desde esta pantalla permanece únicamente en el navegador donde fue capturado.

No existe evidencia de sincronización automática con:

- Supabase;
- otros usuarios;
- otros dispositivos;
- inventario persistente;
- tabla central de movimientos.

---

## 4.10 Divergencia Entre el Flujo Persistente y el Flujo Local

La inspección confirma la existencia de dos implementaciones diferentes para registrar una salida.

| Elemento                     | Flujo Persistente   | Flujo Local                    |
| ---------------------------- | ------------------- | ------------------------------ |
| Persistencia                 | Supabase            | localStorage                   |
| Registro principal           | Tabla `movements`   | Estado React                   |
| Estado del movimiento        | `completed`         | No existe                      |
| Inventario                   | Cambia a `reserved` | No modifica inventario central |
| Posición física              | Continúa asociada   | Se libera localmente           |
| Validación de origen ocupado | No observable       | Sí                             |
| Operador obligatorio         | No observable       | Sí                             |
| Memoria operativa            | Sí                  | No                             |
| Actualización centralizada   | Sí                  | No                             |
| Confirmación posterior       | No                  | No                             |

Como resultado, una misma salida produce dos comportamientos distintos.

### Flujo persistente

```text
Salida
    ↓
Inventario = reserved
Movimiento = completed
```

### Flujo local

```text
Salida
    ↓
Posición liberada
Movimiento almacenado localmente
```

Esta divergencia impide garantizar consistencia completa entre:

- el inventario persistido;
- el estado lógico del almacén;
- la representación local utilizada por el módulo del montacarguista.

Desde la perspectiva de la auditoría, esta es una de las principales brechas técnicas identificadas para OP-011, ya que ambos flujos representan parcialmente la salida física, pero ninguno implementa una **Confirmación de Salida** como proceso independiente y unificado.

---

## 4.11 Historial Local de Movimientos

`HistoryPage.tsx` implementa una bitácora para los movimientos administrados por `WmsDataContext`.

La información presentada incluye:

- Fecha y hora.
- Tipo de movimiento.
- SKU / Producto.
- Cantidad.
- Posición de origen.
- Posición de destino.
- Operador.

Para los movimientos de salida, la interfaz utiliza la etiqueta:

```ts
if (tipo === 'salida') return 'Salida';
```

La fecha mostrada corresponde a la fecha registrada durante la captura:

```tsx
{new Date(mov.fecha).toLocaleString()}
```

Esta pantalla proporciona una trazabilidad básica de los movimientos registrados desde el flujo local.

Sin embargo, no presenta información relacionada con:

- estado del movimiento;
- confirmación de salida;
- embarque asociado;
- orden de trabajo;
- usuario que autorizó la salida;
- unidad de transporte;
- placas;
- empresa transportista;
- evidencia documental;
- fecha independiente de confirmación.

La página consulta exclusivamente el historial local administrado por `WmsDataContext`.

---

## 4.12 Historial Persistente de Movimientos

`MovementsPage.tsx` consulta los movimientos persistidos mediante:

```ts
getMovements()
```

La información recuperada proviene del repositorio de movimientos almacenado en Supabase.

La tabla presenta para cada registro:

- Tipo.
- Producto.
- Pallet.
- Origen.
- Destino.
- Prioridad.
- Estado.
- Fecha y hora.
- Acciones.

Los movimientos de salida aparecen identificados como:

```text
Tipo: Salida
Estado: Completado
```

La interfaz permite filtrar registros por:

- Pendiente.
- Completado.
- Cancelado.
- Fallido.

Las acciones disponibles para cada movimiento son únicamente:

- Editar.
- Eliminar.

Durante la inspección no se encontró evidencia de acciones equivalentes a:

- Confirmar salida.
- Finalizar embarque.
- Autorizar despacho.
- Completar salida.
- Cambiar estado del movimiento.

Aunque el modelo contempla distintos estados, la implementación observada registra directamente las salidas como **completed**, sin una etapa posterior de confirmación.

---

## 4.13 Trazabilidad Mediante Memoria Operativa

`operationalMemoryService.ts` implementa el registro de memoria operativa mediante:

```ts
registerOperationalMemory(...)
```

El servicio admite los siguientes tipos de memoria:

```ts
'recommendation'
'movement'
'optimization'
'inventory'
'operator'
'system'
```

Cada registro puede almacenar:

- tipo;
- entidad relacionada;
- título;
- descripción;
- score;
- metadatos.

Durante la ejecución del workflow, después de crear un movimiento, se registra automáticamente una memoria operativa de tipo:

```text
movement
```

Los metadatos almacenados incluyen información relacionada con:

- almacén;
- tipo de movimiento;
- pallet;
- producto;
- posición origen;
- posición destino;
- estado;
- motivo del movimiento.

Esta funcionalidad aporta trazabilidad persistente sobre la ejecución del movimiento.

No obstante, la memoria registrada continúa representando el mismo evento de creación del movimiento.

Durante la inspección no se encontró un registro independiente equivalente a:

- Salida confirmada.
- Embarque concluido.
- Vehículo liberado.
- Mercancía fuera del almacén.
- Confirmación definitiva del despacho.

En consecuencia, la memoria operativa complementa la trazabilidad existente, pero no constituye una implementación específica de OP-011.

---

## 4.14 Integración con Órdenes de Trabajo

Durante la inspección del módulo `MontacargasPage.tsx` se observó que las órdenes de trabajo avanzan automáticamente únicamente cuando el movimiento corresponde a una reubicación.

La condición observada es equivalente a:

```ts
tipo === 'reubicacion'
```

No se encontró una condición similar para:

```ts
tipo === 'salida'
```

Por ello, no existe evidencia técnica de que una salida:

- avance automáticamente una Orden de Trabajo;
- cierre una Orden de Embarque;
- complete una tarea operativa de despacho;
- actualice el estado del proceso OP-010.

La implementación observable mantiene ambos procesos desacoplados.

---

## 4.15 Asociación con el Proceso de Embarque

Durante toda la inspección no se identificaron relaciones explícitas entre el movimiento de salida y un embarque.

No se observaron campos equivalentes a:

- `shipment_id`
- `dispatch_id`
- `loading_order_id`
- `vehicle_id`
- `transport_id`
- `departure_confirmation_id`

Tampoco se encontraron validaciones que aseguren que el embarque haya concluido antes de registrar una salida.

Como consecuencia, el movimiento puede registrarse sin demostrar técnicamente que OP-010 — Embarque haya finalizado.

Desde el punto de vista de implementación, no existe una dependencia observable entre:

```text
OP-010 — Embarque
        ↓
OP-011 — Confirmación de Salida
```

---

## 4.16 Información de Confirmación No Implementada

La inspección no encontró evidencia de almacenamiento para información específica relacionada con la confirmación física de la salida.

No se observaron campos para registrar:

- fecha real de salida;
- hora real de salida;
- usuario confirmador;
- responsable que autorizó;
- número de embarque;
- unidad de transporte;
- placas;
- operador del transporte;
- empresa transportista;
- documento de salida;
- sello de seguridad;
- evidencia documental del despacho;
- firma digital;
- observaciones finales;
- referencia del cliente;
- autorización de Mesa de Control;
- liberación por parte del personal de acceso.

La ausencia de estos elementos impide demostrar una confirmación formal, independiente y completamente trazable de la salida física de la mercancía.

---

## 4.17 Resultado de la Inspección Técnica

La evidencia observada demuestra que el CJWMS implementa capacidades técnicas para:

- registrar movimientos de salida;
- persistir movimientos en Supabase;
- registrar movimientos localmente;
- consultar historiales de movimientos;
- registrar memoria operativa;
- modificar el estado del inventario a `reserved`;
- validar localmente posiciones de origen;
- liberar posiciones dentro del flujo local;
- mantener trazabilidad básica de los movimientos.

Sin embargo, no se encontró evidencia técnica que demuestre una implementación completa e independiente del proceso **OP-011 — Confirmación de Salida**.

En particular, no se observaron mecanismos para:

- confirmar formalmente una salida;
- registrar una transición posterior al embarque;
- establecer un estado terminal de mercancía fuera del almacén;
- retirar definitivamente el inventario del almacén;
- liberar la posición persistida en Supabase;
- asociar la salida con un embarque específico;
- cerrar automáticamente una Orden de Trabajo;
- registrar autorización operativa;
- identificar al usuario que confirmó la salida;
- almacenar evidencia documental del despacho;
- sincronizar completamente el flujo persistente y el flujo local.

La implementación existente corresponde principalmente al **registro de un movimiento de salida**, pero no a la ejecución integral del proceso definido documentalmente como **OP-011 — Confirmación de Salida**.

### Resumen de Hallazgos

| Aspecto evaluado                        | Resultado               |
| --------------------------------------- | ----------------------- |
| Registro de movimiento de salida        | ✔ Implementado         |
| Persistencia del movimiento             | ✔ Implementado         |
| Historial persistente                   | ✔ Implementado         |
| Historial local                         | ✔ Implementado         |
| Memoria operativa                       | ✔ Implementada         |
| Cambio de estado del inventario         | ✔ Parcial (`reserved`) |
| Confirmación explícita de salida        | ✘ No implementada      |
| Integración con OP-010 Embarque         | ✘ No observada         |
| Estado terminal de mercancía despachada | ✘ No implementado      |
| Liberación persistente del inventario   | ✘ No implementada      |
| Cierre operativo independiente          | ✘ No implementado      |

Como resultado de la inspección técnica, se concluye que la implementación actual proporciona la infraestructura necesaria para registrar movimientos de salida y mantener una trazabilidad básica; sin embargo, **no implementa de manera completa el proceso operativo definido para OP-011 — Confirmación de Salida**, existiendo una diferencia clara entre el modelo operativo documentado y la funcionalidad actualmente desarrollada en el sistema.

---

# 5. Cobertura de las Dimensiones COM

La presente evaluación determina el nivel de implementación de **OP-011 — Confirmación de Salida** con respecto al Modelo Cognitivo Operacional (COM), verificando si la evidencia técnica observada implementa las cinco dimensiones oficiales del modelo.

La valoración se basa exclusivamente en los componentes inspeccionados durante la auditoría técnica y no en la documentación conceptual del proceso.

| Dimensión COM | Cobertura | Nivel |
| ------------- | --------- | ----- |
| Actores       | Parcial   | 🟡   |
| Procesos      | Parcial   | 🟡   |
| Estados       | Parcial   | 🟡   |
| Actividades   | Parcial   | 🟡   |
| Eventos       | Bajo      | 🔴   |

---

## 5.1 Actores

**Cobertura observada:** **Parcial**

Durante la inspección técnica se identificó evidencia de algunos actores operativos involucrados en el registro de una salida.

Entre ellos se observaron:

- Operador del movimiento.
- Usuario creador del movimiento (`created_by`).
- Usuario capturado en el módulo de Montacargas.

Asimismo, el sistema registra parcialmente información relacionada con el operador responsable del movimiento dentro de los historiales locales y persistentes.

Sin embargo, no se encontró evidencia de implementación para actores fundamentales definidos en el proceso oficial, tales como:

- Supervisor de Almacén.
- Responsable de Embarques.
- Mesa de Control.
- Guardia de Acceso.
- Empresa Transportista.
- Operador del Transporte.
- Cliente receptor.

Tampoco existe evidencia de autenticación o identificación del usuario que confirma la salida física.

Como resultado, la dimensión **Actores** presenta únicamente una implementación parcial.

---

## 5.2 Procesos

**Cobertura observada:** **Parcial**

La evidencia técnica demuestra la existencia del proceso general de registro de un movimiento de salida.

El flujo implementado incluye:

- captura del movimiento;
- validaciones básicas;
- actualización parcial del inventario;
- persistencia del movimiento;
- registro de memoria operativa;
- visualización en historiales.

Sin embargo, el proceso oficial de **Confirmación de Salida** contempla etapas adicionales que no fueron identificadas durante la inspección.

Entre ellas destacan:

- validación posterior al embarque;
- confirmación física del abandono del almacén;
- autorización del despacho;
- cierre definitivo del proceso operativo;
- integración con OP-010 — Embarque.

Por ello, únicamente se considera implementada una parte del proceso definido por el COM.

---

## 5.3 Estados

**Cobertura observada:** **Parcial**

El modelo persistente implementa estados generales para los movimientos:

- `pending`
- `completed`
- `cancelled`
- `failed`

Asimismo, el inventario utiliza:

- `available`
- `reserved`
- `blocked`

No obstante, durante la inspección no se identificó un estado específico que represente una salida confirmada o una mercancía definitivamente despachada.

Tampoco existe evidencia de transiciones formales entre estados durante el cierre del proceso.

En consecuencia, los estados implementados representan únicamente una parte del ciclo operativo definido para OP-011.

---

## 5.4 Actividades

**Cobertura observada:** **Parcial**

Las actividades observadas incluyen:

- registrar movimiento;
- validar origen;
- actualizar inventario;
- registrar memoria operativa;
- consultar historial;
- liberar posición en el flujo local.

No se observaron actividades equivalentes a:

- confirmar salida;
- validar documentación;
- confirmar embarque;
- autorizar despacho;
- cerrar proceso operativo;
- finalizar la salida física.

La implementación cubre actividades operativas básicas, pero no el conjunto completo de actividades definidas por el modelo COM.

---

## 5.5 Eventos

**Cobertura observada:** **Baja**

El sistema genera eventos relacionados con:

- creación del movimiento;
- actualización del inventario;
- registro de memoria operativa.

Sin embargo, no se encontraron eventos específicos para:

- salida confirmada;
- mercancía despachada;
- vehículo liberado;
- embarque concluido;
- cierre definitivo del proceso;
- confirmación de abandono del almacén.

La memoria operativa registra la ejecución del movimiento, pero no un evento independiente que represente la conclusión oficial de OP-011.

Como resultado, esta dimensión presenta el menor nivel de cobertura dentro de la implementación inspeccionada.

---

## Resultado Consolidado

La implementación observada proporciona soporte para el registro técnico de movimientos de salida y su trazabilidad básica.

No obstante, la mayor parte de las capacidades implementadas corresponden al registro de un movimiento genérico y no a la ejecución integral del proceso **OP-011 — Confirmación de Salida** definido por el Modelo Cognitivo Operacional.

En consecuencia, la cobertura global de las Dimensiones COM se determina como:

**Cobertura Parcial**, con una implementación aproximada del **45 %** respecto al modelo operativo oficialmente documentado.

---

# 6. Nivel Oficial de Implementación

Con base en la inspección técnica realizada y en la evaluación de las Dimensiones COM, se determina el nivel oficial de implementación de **OP-011 — Confirmación de Salida** dentro del CJWMS.

La evaluación considera exclusivamente la evidencia observable en el código fuente inspeccionado y la correspondencia entre dicha implementación y el modelo operativo oficial documentado.

## Clasificación General

| Criterio                          | Resultado                            |
| --------------------------------- | ------------------------------------ |
| Implementación técnica observable | Sí                                   |
| Implementación funcional completa | No                                   |
| Integración con el Modelo COM     | Parcial                              |
| Cobertura del proceso operativo   | Parcial                              |
| Nivel Oficial de Implementación   | **Nivel 2 — Implementación Parcial** |

---

## Justificación Técnica

La inspección confirma que el sistema implementa componentes suficientes para registrar movimientos de salida y mantener una trazabilidad operativa básica.

Entre las capacidades implementadas se encuentran:

- registro persistente de movimientos;
- historial de movimientos en Supabase;
- historial local de operaciones;
- actualización parcial del inventario;
- registro de memoria operativa;
- validaciones básicas para movimientos de salida;
- consulta y filtrado de movimientos.

Estas capacidades permiten representar técnicamente una salida como un movimiento operativo.

Sin embargo, la implementación no desarrolla el proceso completo definido para **OP-011 — Confirmación de Salida**.

Durante la auditoría no se encontró evidencia de funcionalidades equivalentes a:

- confirmación explícita de salida;
- cierre posterior al embarque;
- autorización del despacho;
- liberación definitiva del inventario;
- estado terminal de mercancía despachada;
- integración con OP-010 — Embarque;
- cierre automático de órdenes de trabajo;
- registro de evidencia documental;
- confirmación mediante usuario autenticado.

Asimismo, la existencia de dos flujos independientes (persistente y local) genera diferencias funcionales que impiden considerar la implementación como completamente integrada.

---

## Correspondencia con el Modelo COM

La implementación actual satisface parcialmente los objetivos del Modelo Cognitivo Operacional.

La cobertura observada por dimensión es la siguiente:

| Dimensión COM | Nivel observado |
| ------------- | --------------- |
| Actores       | Parcial         |
| Procesos      | Parcial         |
| Estados       | Parcial         |
| Actividades   | Parcial         |
| Eventos       | Bajo            |

Esta distribución confirma que el sistema implementa principalmente la infraestructura necesaria para registrar movimientos, pero todavía no materializa el proceso completo de Confirmación de Salida definido en el modelo operativo.

---

## Capacidades Implementadas

La auditoría confirma la existencia de las siguientes capacidades técnicas:

- identificación del movimiento de salida;
- captura manual de movimientos;
- persistencia de movimientos en Supabase;
- persistencia local mediante `localStorage`;
- historial de movimientos;
- memoria operativa;
- consulta y filtrado de movimientos;
- actualización parcial del inventario;
- validación local de posiciones de origen.

Estas capacidades constituyen una base sólida para evolucionar hacia una implementación completa.

---

## Capacidades No Implementadas

No se encontró evidencia de implementación para las siguientes capacidades definidas por OP-011:

- confirmación independiente de salida;
- liberación definitiva del inventario;
- estado de mercancía despachada;
- asociación obligatoria con el embarque;
- confirmación del abandono físico del almacén;
- autorización operativa del despacho;
- cierre del proceso posterior al embarque;
- sincronización completa entre flujo local y flujo persistente;
- trazabilidad específica de la confirmación de salida.

---

## Determinación Oficial

Como resultado de la evidencia técnica inspeccionada, **OP-011 — Confirmación de Salida** se clasifica oficialmente como:

> **Nivel 2 — Implementación Parcial**

La funcionalidad existente implementa correctamente el registro de movimientos de salida y parte de la infraestructura requerida para el proceso.

No obstante, todavía no implementa el conjunto de actividades, estados, eventos y mecanismos de control necesarios para representar de forma completa el proceso operativo definido por el Modelo Cognitivo Operacional (COM).

Por ello, la implementación actual debe considerarse una base funcional susceptible de evolucionar hacia una implementación integral en futuras fases del proyecto.

---

# 7. Brechas de Implementación

La auditoría identificó las siguientes brechas entre el proceso oficial **OP-011 — Confirmación de Salida**, definido por el Modelo Cognitivo Operacional (COM), y la implementación actualmente disponible en el CJWMS.

Las brechas descritas corresponden exclusivamente a evidencia técnica observable durante la inspección del código fuente.

---

## 7.1 Ausencia de un Proceso Independiente de Confirmación de Salida

La implementación actual registra movimientos de tipo `salida`, pero no desarrolla un proceso independiente de **Confirmación de Salida** posterior al embarque.

No se identificaron servicios, componentes o funciones específicas encargadas de:

- confirmar el abandono físico de la mercancía;
- validar el cierre del despacho;
- finalizar formalmente la operación.

Como resultado, OP-011 se encuentra representado únicamente como un movimiento de salida.

**Impacto:** Alto.

---

## 7.2 Inventario Sin Estado Terminal

Cuando se registra una salida, el inventario cambia al estado:

```text
reserved
```

No existe un estado equivalente a:

- despachado;
- embarcado;
- fuera del almacén;
- salida confirmada.

En consecuencia, el inventario permanece registrado dentro del sistema aun después del supuesto despacho.

**Impacto:** Alto.

---

## 7.3 Falta de Integración con OP-010 — Embarque

Durante la inspección no se encontró una relación técnica entre:

- OP-010 — Embarque;
- OP-011 — Confirmación de Salida.

El movimiento puede registrarse independientemente del resultado del embarque.

No existe evidencia de validaciones que garanticen que el embarque haya concluido antes de confirmar la salida.

**Impacto:** Alto.

---

## 7.4 Doble Flujo Operativo

Actualmente coexisten dos implementaciones distintas:

- flujo persistente mediante Supabase;
- flujo local mediante `WmsDataContext`.

Ambos flujos generan comportamientos diferentes respecto a:

- inventario;
- ocupación de posiciones;
- persistencia;
- trazabilidad.

Esta diferencia puede producir inconsistencias entre la representación local del almacén y el inventario persistido.

**Impacto:** Alto.

---

## 7.5 Ausencia de Confirmación Explícita

La interfaz permite registrar una salida, pero no existe una acción específica para:

- Confirmar salida.
- Finalizar despacho.
- Cerrar embarque.
- Autorizar salida.

El movimiento se registra directamente como **Completado**.

No existe una transición posterior que represente el cierre oficial del proceso.

**Impacto:** Medio.

---

## 7.6 Trazabilidad Operativa Incompleta

La memoria operativa registra la creación del movimiento, pero no registra un evento independiente para la confirmación definitiva de la salida.

No se conserva evidencia específica relacionada con:

- confirmación del despacho;
- autorización;
- cierre operativo;
- salida física del almacén.

**Impacto:** Medio.

---

## 7.7 Información Operativa No Implementada

No se encontró evidencia de almacenamiento para información crítica del proceso de salida, incluyendo:

- unidad de transporte;
- placas;
- empresa transportista;
- operador del transporte;
- documento de salida;
- sello de seguridad;
- autorización del supervisor;
- autorización de Mesa de Control;
- evidencia documental;
- firma digital;
- fecha real de salida.

La ausencia de estos datos limita significativamente la trazabilidad del proceso.

**Impacto:** Medio.

---

## 7.8 Integración Parcial con Órdenes de Trabajo

La inspección mostró integración automática únicamente para movimientos de reubicación.

No existe evidencia de que una salida:

- cierre órdenes de trabajo;
- complete órdenes de embarque;
- actualice el proceso operativo posterior.

Esta situación deja desacoplados ambos procesos.

**Impacto:** Medio.

---

## 7.9 Diferencias con el Modelo COM

Comparando la implementación observada con el proceso oficial documentado, se identifican diferencias relevantes en las cinco dimensiones del COM.

| Dimensión   | Situación observada                                     |
| ----------- | ------------------------------------------------------- |
| Actores     | Parcialmente implementados.                             |
| Procesos    | Registro de movimiento, sin confirmación independiente. |
| Estados     | Sin estado terminal de salida.                          |
| Actividades | No existe cierre formal del proceso.                    |
| Eventos     | No existe evento específico de confirmación de salida.  |

Estas diferencias explican la clasificación de **Nivel 2 — Implementación Parcial** obtenida durante la auditoría.

---

## Conclusión de Brechas

La implementación existente proporciona una base sólida para registrar movimientos de salida y mantener una trazabilidad operativa básica.

No obstante, el sistema aún presenta diferencias importantes respecto al modelo operativo oficial de **OP-011 — Confirmación de Salida**.

Las principales brechas corresponden a:

- inexistencia de un proceso independiente de confirmación;
- falta de integración con el proceso de embarque;
- ausencia de un estado terminal del inventario;
- coexistencia de dos flujos operativos independientes;
- carencia de evidencia formal del cierre de la operación.

Estas brechas deberán atenderse en futuras fases para alcanzar una implementación completamente alineada con el Modelo Cognitivo Operacional.

---

# 8. Recomendaciones Técnicas

Con base en las brechas identificadas durante la auditoría de implementación, se proponen las siguientes recomendaciones técnicas para lograr una implementación completamente alineada con el Modelo Cognitivo Operacional (COM) y con el proceso oficial **OP-011 — Confirmación de Salida**.

Las recomendaciones se presentan en orden de prioridad técnica y funcional.

---

## 8.1 Implementar un Proceso Independiente de Confirmación de Salida

Se recomienda desarrollar un flujo específico para **Confirmación de Salida**, separado del registro inicial del movimiento.

Este proceso deberá ejecutarse únicamente después de concluir satisfactoriamente el embarque y representar formalmente el cierre operativo del despacho.

La implementación debería incluir:

- validación previa del embarque;
- confirmación explícita por parte del usuario;
- registro de fecha y hora de confirmación;
- generación del evento de cierre operativo.

**Prioridad:** Crítica.

---

## 8.2 Incorporar un Estado Terminal del Inventario

El modelo actual finaliza el proceso dejando el inventario en estado `reserved`.

Se recomienda incorporar un estado terminal que represente inequívocamente que la mercancía abandonó el almacén.

Ejemplos:

- `shipped`
- `dispatched`
- `confirmed_exit`

Esto permitirá diferenciar claramente entre mercancía reservada y mercancía despachada.

**Prioridad:** Crítica.

---

## 8.3 Integrar OP-010 y OP-011

La Confirmación de Salida debe depender directamente de la conclusión del proceso de Embarque.

Se recomienda establecer una relación técnica entre ambos procesos mediante identificadores compartidos o referencias operativas.

La salida únicamente debería confirmarse cuando el embarque haya sido completado satisfactoriamente.

**Prioridad:** Alta.

---

## 8.4 Unificar los Flujos Operativos

Actualmente coexisten dos mecanismos distintos para registrar salidas:

- flujo persistente en Supabase;
- flujo local mediante `WmsDataContext`.

Se recomienda consolidar ambos flujos en una única implementación persistente que garantice consistencia entre:

- inventario;
- posiciones;
- movimientos;
- memoria operativa;
- historiales.

Esta unificación reducirá inconsistencias funcionales y facilitará el mantenimiento del sistema.

**Prioridad:** Alta.

---

## 8.5 Implementar Transiciones Reales de Estado

Aunque el modelo contempla estados como:

- `pending`
- `completed`
- `cancelled`
- `failed`

la implementación registra directamente los movimientos como `completed`.

Se recomienda desarrollar un ciclo completo de transición de estados que permita representar la evolución natural del proceso operativo.

**Prioridad:** Alta.

---

## 8.6 Fortalecer la Trazabilidad Operativa

La Confirmación de Salida debería generar un evento independiente dentro de la memoria operativa.

Se recomienda registrar información adicional como:

- usuario que confirmó;
- fecha y hora de confirmación;
- resultado de la operación;
- referencias del embarque;
- observaciones del cierre.

Esto incrementará significativamente la capacidad de auditoría del sistema.

**Prioridad:** Media.

---

## 8.7 Incorporar Información del Transporte

La implementación futura debería contemplar el almacenamiento de información relacionada con el despacho físico.

Entre los datos recomendados se encuentran:

- unidad de transporte;
- placas;
- empresa transportista;
- operador del transporte;
- número de embarque;
- documentos entregados;
- sellos de seguridad;
- observaciones finales.

Esta información fortalecerá la trazabilidad logística del proceso.

**Prioridad:** Media.

---

## 8.8 Integrar el Cierre con Órdenes de Trabajo

Se recomienda que la Confirmación de Salida pueda actualizar automáticamente las órdenes de trabajo relacionadas con el embarque.

El cierre del proceso debería reflejarse en los módulos operativos correspondientes, evitando procesos manuales adicionales.

**Prioridad:** Media.

---

## 8.9 Incorporar Evidencia Formal de Confirmación

La implementación futura debería permitir conservar evidencia específica del cierre de la operación.

Dependiendo de las necesidades operativas, podrían integrarse mecanismos como:

- confirmación electrónica;
- firma digital;
- evidencia fotográfica;
- validación documental;
- registro de autorizaciones.

Estas capacidades fortalecerán los procesos de auditoría y cumplimiento operativo.

**Prioridad:** Baja.

---

## Resumen de Prioridades

| Recomendación                                    | Prioridad |
| ------------------------------------------------ | --------- |
| Implementar Confirmación de Salida independiente | Crítica   |
| Incorporar estado terminal del inventario        | Crítica   |
| Integrar OP-010 con OP-011                       | Alta      |
| Unificar flujos persistente y local              | Alta      |
| Implementar transición real de estados           | Alta      |
| Fortalecer memoria operativa                     | Media     |
| Incorporar información del transporte            | Media     |
| Integrar cierre con Órdenes de Trabajo           | Media     |
| Incorporar evidencia formal de confirmación      | Baja      |

---

## Conclusión

La auditoría demuestra que el CJWMS dispone actualmente de una base funcional sólida para registrar movimientos de salida y mantener trazabilidad operativa básica.

Las recomendaciones propuestas no requieren rediseñar la arquitectura existente; por el contrario, buscan evolucionar la infraestructura ya implementada hacia una representación completa del proceso **OP-011 — Confirmación de Salida**, fortaleciendo la consistencia operativa, la trazabilidad y el alineamiento con el Modelo Cognitivo Operacional (COM).

La adopción progresiva de estas recomendaciones permitirá que futuras versiones del sistema alcancen una implementación integral del proceso de despacho y cierre operativo.

---

# 9. Dictamen Oficial

## Resultado de la Auditoría

Con fundamento en la inspección técnica realizada sobre el código fuente del CJWMS, en la evidencia observable durante la implementación y en la evaluación efectuada conforme al Framework de Auditoría de Implementación (FAI), se emite el siguiente dictamen para el proceso **OP-011 — Confirmación de Salida**.

La auditoría confirma la existencia de una implementación funcional para el registro de movimientos de salida, sustentada en componentes persistentes, servicios de negocio, mecanismos de trazabilidad y funcionalidades de consulta que permiten administrar este tipo de operación dentro del sistema.

Durante la inspección se verificó evidencia objetiva de:

- registro de movimientos de tipo `salida`;
- persistencia de movimientos en Supabase;
- actualización parcial del inventario;
- validaciones operativas básicas;
- historial persistente de movimientos;
- historial local de operaciones;
- registro de memoria operativa;
- mecanismos básicos de trazabilidad.

Estas capacidades demuestran que el sistema dispone de una infraestructura técnica suficiente para representar y registrar movimientos de salida dentro del flujo operativo del almacén.

No obstante, la evidencia recopilada también demuestra que la implementación actual **no desarrolla de forma independiente el proceso operativo definido como OP-011 — Confirmación de Salida**.

En particular, no se identificó evidencia técnica de:

- una etapa específica de confirmación posterior al embarque;
- integración obligatoria con OP-010 — Embarque;
- un estado terminal que represente mercancía despachada;
- liberación definitiva del inventario en la persistencia;
- cierre formal del proceso operativo;
- captura de información propia del despacho (transportista, unidad, autorizaciones y evidencia documental);
- sincronización completa entre el flujo persistente y el flujo local.

Como consecuencia, la funcionalidad actualmente implementada representa principalmente el **registro de un movimiento de salida**, pero no el proceso integral de confirmación de salida descrito por el Modelo Cognitivo Operacional (COM).

---

## Nivel Oficial de Implementación

De acuerdo con los criterios establecidos por el Framework de Auditoría de Implementación (FAI), el proceso **OP-011 — Confirmación de Salida** se clasifica como:

> **Nivel 2 — Implementación Parcial**

Esta clasificación se fundamenta en que existe una implementación técnica verificable y funcional para registrar movimientos de salida, pero aún persisten diferencias relevantes respecto al proceso operativo oficialmente documentado.

---

## Estado de Cumplimiento

| Área evaluada                        | Resultado    |
| ------------------------------------ | ------------ |
| Implementación técnica observable    | ✔ Cumple    |
| Persistencia de movimientos          | ✔ Cumple    |
| Historial y trazabilidad básica      | ✔ Cumple    |
| Integración con el Modelo COM        | ◑ Parcial    |
| Confirmación independiente de salida | ✘ No cumple |
| Integración con OP-010               | ✘ No cumple |
| Estado terminal del inventario       | ✘ No cumple |
| Cierre operativo completo            | ✘ No cumple |

---

## Conclusión Oficial

La auditoría concluye que el CJWMS cuenta con una implementación funcional y verificable para el registro y seguimiento de movimientos de salida, proporcionando una base técnica consistente sobre la cual evolucionar el proceso de despacho.

Sin embargo, la implementación actual aún no materializa completamente el proceso **OP-011 — Confirmación de Salida** definido por el Modelo Cognitivo Operacional, debido a la ausencia de mecanismos específicos de confirmación, cierre operativo e integración con el proceso de embarque.

En consecuencia, **la auditoría se considera APROBADA con observaciones**, reconociendo que la funcionalidad existente satisface parcialmente los objetivos del proceso, pero requiere la atención de las brechas identificadas para alcanzar una implementación integral y plenamente alineada con el modelo operativo oficial.

---

**Dictamen Final:**

**APROBADA CON OBSERVACIONES**

**Nivel Oficial de Implementación:** **Nivel 2 — Implementación Parcial**

**Resultado de la Auditoría:** **Implementación funcional del registro de salidas con infraestructura técnica sólida, pero sin una implementación completa del proceso operativo de Confirmación de Salida conforme al Modelo Cognitivo Operacional (COM).**