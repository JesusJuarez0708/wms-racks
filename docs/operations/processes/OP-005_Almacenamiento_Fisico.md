# OP-005 — Almacenamiento Físico

---

# Información General

| Campo                | Valor                                   |
| -------------------- | --------------------------------------- |
| Código               | OP-005                                  |
| Nombre               | Almacenamiento Físico                   |
| Tipo                 | Proceso Operativo                       |
| Estado               | En construcción                         |
| Metodología          | COM (Cognitive Operational Modeling)    |
| Versión              | 1.0                                     |
| Dependencia anterior | OP-004 — Asignación de Ubicación        |
| Proceso siguiente    | OP-006 — Confirmación de Almacenamiento |

---

# Objetivo

Transformar una asignación de ubicación aprobada en un almacenamiento físico confirmado, asegurando que el montacarguista ejecute correctamente el movimiento, el inventario sea actualizado, los estados operativos evolucionen de forma consistente y toda la operación quede registrada mediante evidencias trazables.

---

# Alcance

Este proceso inicia cuando una ubicación ha sido asignada oficialmente por CJWMS y finaliza cuando el pallet queda físicamente almacenado, confirmado por el operador y registrado dentro del sistema.

Incluye:

- Recepción de la orden de almacenamiento.
- Traslado físico del pallet.
- Validación de la ubicación destino.
- Colocación del pallet.
- Confirmación de almacenamiento.
- Actualización del inventario.
- Registro del movimiento operativo.
- Generación de evidencias.
- Cambio de estados operativos.

No incluye:

- Recepción física.
- Inspección.
- Asignación de ubicación.
- Procesos posteriores de surtido o reubicación.

---

# Objetivos Operativos

- Garantizar que cada pallet llegue exactamente a la ubicación asignada.
- Evitar errores de ubicación.
- Mantener sincronizado el inventario físico y lógico.
- Registrar la trazabilidad completa del movimiento.
- Permitir auditoría total del almacenamiento.
- Proporcionar información confiable para los procesos posteriores.

---

# Actores Principales

- Supervisor
- Montacarguista
- CJWMS
- Inventario
- Motor de Reglas Operativas
- Motor de Trazabilidad
- Motor de Evidencias

---

# Entradas

- Orden de almacenamiento.
- Ubicación asignada.
- Pallet aprobado.
- Información del producto.
- Información del lote.
- Estado operativo autorizado.

---

# Salidas

- Pallet almacenado.
- Inventario actualizado.
- Movimiento registrado.
- Evidencias generadas.
- Estados actualizados.
- Trazabilidad completa.

---

# Referencias

- Modelo de Estados Operativos
- Modelo de Eventos Operativos
- Modelo de Actividades Operativas
- Modelo de Actores Operativos
- OP-002 — Recepción Física
- OP-003 — Inspección
- OP-004 — Asignación de Ubicación

---

# Índice de Microfases

18.4.1 Contexto Operativo

18.4.2 Flujo General del Proceso

18.4.3 Modelo de Actividades Operativas

18.4.4 Modelo de Estados Operativos

18.4.5 Modelo de Eventos Operativos

18.4.6 Reglas de Negocio

18.4.7 Modelo Oficial de Evidencias Operativas

18.4.8 Matriz de Trazabilidad Operativa

18.4.9 Diagrama Integrado del Proceso

18.4.10 Validación Operativa Integral

18.4.11 Conclusiones Oficiales del Proceso

---

---

# 18.4.1 Contexto Operativo

## Propósito

El proceso de Almacenamiento Físico representa la ejecución material de una decisión previamente autorizada por CJWMS durante el proceso de Asignación de Ubicación (OP-004). En esta etapa, la ubicación deja de ser una recomendación lógica y se convierte en una realidad física dentro del almacén.

La correcta ejecución de este proceso garantiza que el inventario físico y el inventario lógico permanezcan sincronizados, preservando la confiabilidad de la operación y evitando desviaciones que afecten los procesos posteriores.

---

## Descripción Operativa

Una vez aprobada la ubicación destino, el Supervisor comunica la orden de almacenamiento al montacarguista.

El montacarguista traslada el pallet desde el área donde quedó disponible después de la asignación (por ejemplo, recepción o zona temporal autorizada) hasta la ubicación indicada por CJWMS.

Al llegar al destino, el operador verifica visualmente que la ubicación corresponda con la asignada y realiza la colocación física del pallet siguiendo las reglas operativas del tipo de rack (Drive In o Selectivo).

Concluida la maniobra, el almacenamiento es confirmado en CJWMS, permitiendo que el sistema:

- Actualice el inventario.
- Cambie los estados operativos correspondientes.
- Registre el movimiento logístico.
- Genere la evidencia operativa.
- Mantenga la trazabilidad completa.

---

## Objetivos Operativos

Durante este proceso se busca asegurar que:

- El pallet llegue exactamente a la ubicación asignada.
- No existan diferencias entre la ubicación física y la registrada en el sistema.
- El inventario permanezca sincronizado.
- Todo movimiento quede documentado.
- La evidencia permita auditorías posteriores.
- Los procesos siguientes trabajen sobre información confiable.

---

## Riesgos Controlados

Este proceso reduce riesgos como:

- Almacenar un pallet en una ubicación incorrecta.
- Registrar una ubicación distinta a la física.
- Pérdida de trazabilidad.
- Inventario desactualizado.
- Errores durante surtido.
- Bloqueos operativos por ubicaciones equivocadas.
- Reubicaciones no autorizadas.
- Movimientos sin evidencia.

---

## Principios Operativos COM Aplicados

Este proceso adopta los principios definidos por el Modelo Operativo Corporativo:

- Una asignación aprobada siempre debe concluir con un almacenamiento confirmado o con una excepción controlada.
- Ningún pallet puede considerarse almacenado hasta existir confirmación operativa.
- Todo almacenamiento genera evidencia.
- Todo almacenamiento modifica estados operativos.
- Todo almacenamiento genera un movimiento logístico.
- Toda operación debe ser completamente trazable.
- El inventario físico siempre debe coincidir con el inventario lógico.

---

## Relación con Procesos Anteriores

Este proceso recibe como entrada:

- OP-002 — Recepción Física.
- OP-003 — Inspección.
- OP-004 — Asignación de Ubicación.

La calidad de estas etapas determina la correcta ejecución del almacenamiento.

---

## Relación con Procesos Posteriores

La confirmación exitosa del almacenamiento habilita procesos posteriores como:

- Confirmación Operativa del Almacenamiento (OP-006).
- Reubicaciones.
- Surtido.
- Inventarios cíclicos.
- Auditorías.
- Inteligencia Operativa.
- Analítica Ejecutiva.
- Trazabilidad histórica.

---

# 18.4.2 Flujo General del Proceso

## Visión General

El proceso de Almacenamiento Físico inicia cuando CJWMS ha aprobado una ubicación destino y concluye cuando el pallet queda correctamente almacenado, confirmado y registrado dentro del sistema.

Durante este proceso participan tanto actores humanos como componentes cognitivos del sistema, garantizando que la ejecución física y el registro lógico permanezcan sincronizados.

---

## Flujo Operativo General

### Paso 1. Recepción de la Orden de Almacenamiento

El Supervisor comunica al montacarguista la orden de almacenar un pallet en la ubicación previamente asignada por CJWMS.

**Resultado esperado**

- El operador conoce qué pallet debe mover.
- Se identifica claramente la ubicación destino.

---

### Paso 2. Preparación para el Traslado

El montacarguista verifica visualmente el pallet y prepara la maniobra de traslado.

Durante esta etapa se confirma que:

- El pallet corresponde a la orden recibida.
- La carga es estable.
- El montacargas puede realizar la maniobra con seguridad.

**Resultado esperado**

El pallet está listo para iniciar el movimiento.

---

### Paso 3. Traslado hacia la Ubicación

El montacarguista desplaza el pallet desde su ubicación de origen hasta la ubicación destino asignada.

Durante el recorrido pueden existir eventos como:

- Espera por tránsito interno.
- Bloqueo temporal de pasillos.
- Prioridades operativas.
- Interacciones con otros operadores.

Estos eventos no modifican la asignación aprobada, pero forman parte de la ejecución operativa.

**Resultado esperado**

El pallet llega físicamente a la ubicación asignada.

---

### Paso 4. Verificación de la Ubicación

Antes de colocar el pallet, el operador verifica que la ubicación física coincida con la indicada por CJWMS.

Se valida que:

- El rack sea correcto.
- El nivel sea correcto.
- La posición sea correcta.
- La ubicación esté disponible para recibir el pallet.

**Resultado esperado**

Existe correspondencia entre la ubicación física y la ubicación lógica.

---

### Paso 5. Colocación Física del Pallet

El montacarguista realiza la maniobra de almacenamiento respetando las reglas operativas del tipo de rack.

Dependiendo del almacén, esto puede implicar:

- Inserción en rack Drive In.
- Colocación en rack Selectivo.
- Alineación adecuada del pallet.
- Verificación visual de estabilidad.

**Resultado esperado**

El pallet queda correctamente almacenado.

---

### Paso 6. Confirmación del Almacenamiento

Una vez concluida la maniobra, el almacenamiento es confirmado en CJWMS.

La confirmación puede realizarse mediante diferentes mecanismos operativos definidos por la organización (por ejemplo, validación del supervisor, terminal RF o interfaz del sistema), sin alterar la lógica del proceso.

**Resultado esperado**

El sistema reconoce oficialmente que el almacenamiento fue ejecutado.

---

### Paso 7. Actualización Operativa

Después de la confirmación, CJWMS ejecuta automáticamente las acciones correspondientes.

Entre ellas:

- Actualización del inventario.
- Cambio de estados operativos.
- Registro del movimiento logístico.
- Generación de evidencias.
- Actualización de la trazabilidad.

**Resultado esperado**

El almacenamiento queda completamente integrado al modelo operativo del sistema.

---

## Resultado Final del Proceso

Al concluir OP-005 se garantiza que:

- El pallet se encuentra físicamente en la ubicación asignada.
- El inventario refleja la realidad física.
- Los estados operativos permanecen consistentes.
- Existe evidencia completa del movimiento.
- La trazabilidad histórica permanece intacta.
- Los procesos posteriores pueden continuar con información confiable.

---

## Flujo Resumido

```text
Ubicación Asignada
        │
        ▼
Supervisor comunica la orden
        │
        ▼
Montacarguista prepara el traslado
        │
        ▼
Traslado hacia la ubicación
        │
        ▼
Verificación de ubicación
        │
        ▼
Colocación física del pallet
        │
        ▼
Confirmación del almacenamiento
        │
        ▼
CJWMS actualiza inventario,
estados, movimientos,
evidencias y trazabilidad
```

---

# 18.4.3 Modelo de Actividades Operativas

## Objetivo

Descomponer el proceso de Almacenamiento Físico en actividades operativas claramente definidas, identificando para cada una su propósito, responsable, entradas, salidas y criterios de finalización.

---

## AO-005-01 — Recepción de la Orden de Almacenamiento

**Propósito**

Iniciar formalmente la ejecución del almacenamiento mediante la comunicación de la orden al montacarguista.

**Responsable principal**

- Supervisor

**Entradas**

- Orden de almacenamiento.
- Ubicación asignada.
- Identificación del pallet.

**Salidas**

- Orden comunicada al operador.

**Criterio de finalización**

El montacarguista conoce el pallet a mover y la ubicación destino.

---

## AO-005-02 — Preparación para el Traslado

**Propósito**

Verificar que el pallet y el equipo se encuentren en condiciones adecuadas para realizar el movimiento.

**Responsable principal**

- Montacarguista

**Entradas**

- Orden de almacenamiento.
- Pallet disponible.

**Salidas**

- Pallet listo para traslado.

**Criterio de finalización**

La maniobra puede ejecutarse de forma segura.

---

## AO-005-03 — Traslado del Pallet

**Propósito**

Mover físicamente el pallet desde su ubicación de origen hasta la ubicación asignada.

**Responsable principal**

- Montacarguista

**Entradas**

- Pallet preparado.
- Ruta operativa disponible.

**Salidas**

- Pallet ubicado frente al destino asignado.

**Criterio de finalización**

El pallet llega a la ubicación indicada por CJWMS.

---

## AO-005-04 — Verificación de la Ubicación

**Propósito**

Confirmar que la ubicación física corresponde exactamente con la ubicación aprobada por el sistema.

**Responsable principal**

- Montacarguista

**Entradas**

- Pallet en destino.
- Ubicación asignada.

**Salidas**

- Validación positiva o detección de una excepción.

**Criterio de finalización**

La ubicación queda validada antes de colocar el pallet.

---

## AO-005-05 — Colocación Física del Pallet

**Propósito**

Realizar la maniobra de almacenamiento respetando las reglas operativas del tipo de rack.

**Responsable principal**

- Montacarguista

**Entradas**

- Ubicación validada.
- Pallet listo para almacenar.

**Salidas**

- Pallet físicamente almacenado.

**Criterio de finalización**

El pallet queda estable y correctamente posicionado.

---

## AO-005-06 — Confirmación del Almacenamiento

**Propósito**

Registrar oficialmente que la maniobra fue ejecutada correctamente.

**Responsable principal**

- Montacarguista / Supervisor (según el procedimiento operativo de la organización)

**Entradas**

- Pallet almacenado.

**Salidas**

- Confirmación operativa.

**Criterio de finalización**

CJWMS recibe la confirmación del almacenamiento.

---

## AO-005-07 — Actualización Operativa

**Propósito**

Sincronizar el modelo lógico con la ejecución física realizada.

**Responsable principal**

- CJWMS

**Entradas**

- Confirmación del almacenamiento.

**Salidas**

- Inventario actualizado.
- Estados actualizados.
- Movimiento registrado.
- Evidencias generadas.
- Trazabilidad actualizada.

**Criterio de finalización**

La operación queda registrada integralmente en el sistema.

---

## Resumen de Actividades

| Código    | Actividad                               | Responsable                 |
| --------- | --------------------------------------- | --------------------------- |
| AO-005-01 | Recepción de la Orden de Almacenamiento | Supervisor                  |
| AO-005-02 | Preparación para el Traslado            | Montacarguista              |
| AO-005-03 | Traslado del Pallet                     | Montacarguista              |
| AO-005-04 | Verificación de la Ubicación            | Montacarguista              |
| AO-005-05 | Colocación Física del Pallet            | Montacarguista              |
| AO-005-06 | Confirmación del Almacenamiento         | Montacarguista / Supervisor |
| AO-005-07 | Actualización Operativa                 | CJWMS                       |

---

# 18.4.4 Modelo de Estados Operativos

## Objetivo

Definir la evolución de los estados operativos del pallet durante el proceso de Almacenamiento Físico, garantizando que cada transición represente un cambio verificable dentro de la operación y pueda ser auditada posteriormente.

---

## Estado Inicial

### Ubicación Asignada

**Descripción**

El pallet cuenta con una ubicación destino aprobada por CJWMS, pero aún no ha iniciado el movimiento físico hacia dicha ubicación.

**Origen**

- OP-004 — Asignación de Ubicación.

**Condición para avanzar**

El Supervisor comunica la orden de almacenamiento al montacarguista.

---

## Estado 1

### Orden de Almacenamiento Emitida

**Descripción**

La orden ha sido comunicada al operador responsable de ejecutar la maniobra.

**Actor principal**

- Supervisor

**Evento que activa el estado**

Emisión de la orden de almacenamiento.

**Siguiente estado**

Traslado en Proceso.

---

## Estado 2

### Traslado en Proceso

**Descripción**

El pallet está siendo desplazado físicamente hacia la ubicación asignada.

**Actor principal**

- Montacarguista

**Eventos asociados**

- Inicio del traslado.
- Pausa operativa (si aplica).
- Reanudación del traslado.

**Siguiente estado**

Verificación de Ubicación.

---

## Estado 3

### Verificación de Ubicación

**Descripción**

El operador confirma que la ubicación física coincide con la ubicación aprobada por CJWMS antes de realizar la colocación del pallet.

**Actor principal**

- Montacarguista

**Resultado esperado**

La ubicación queda validada para recibir el pallet.

**Siguiente estado**

Almacenamiento Físico Ejecutado.

---

## Estado 4

### Almacenamiento Físico Ejecutado

**Descripción**

El pallet ha sido colocado físicamente en la ubicación correspondiente siguiendo las reglas operativas del tipo de rack.

**Actor principal**

- Montacarguista

**Resultado esperado**

El pallet permanece correctamente almacenado.

**Siguiente estado**

Almacenamiento Confirmado.

---

## Estado 5

### Almacenamiento Confirmado

**Descripción**

CJWMS recibe la confirmación oficial de que la maniobra fue ejecutada correctamente.

**Actor principal**

- CJWMS

**Resultado esperado**

El sistema reconoce el almacenamiento como una operación concluida.

**Siguiente estado**

Inventario Actualizado.

---

## Estado Final

### Inventario Actualizado

**Descripción**

El inventario, los estados operativos, los movimientos y las evidencias han sido sincronizados con la ejecución física realizada.

**Actor principal**

- CJWMS

**Resultado esperado**

La operación queda completamente integrada al modelo operativo corporativo.

---

# Flujo de Estados

```text
Ubicación Asignada
        │
        ▼
Orden de Almacenamiento Emitida
        │
        ▼
Traslado en Proceso
        │
        ▼
Verificación de Ubicación
        │
        ▼
Almacenamiento Físico Ejecutado
        │
        ▼
Almacenamiento Confirmado
        │
        ▼
Inventario Actualizado
```

---

## Reglas Generales de Transición

- Ningún estado puede omitirse.
- Toda transición debe estar respaldada por un evento operativo.
- El inventario únicamente se actualiza después de la confirmación del almacenamiento.
- Un pallet no puede avanzar al siguiente proceso sin haber alcanzado el estado **Inventario Actualizado**.
- Cualquier desviación debe registrarse como una excepción operativa y conservar su trazabilidad.

---

# 18.4.5 Modelo de Eventos Operativos

## Objetivo

Definir los eventos operativos que impulsan la evolución del proceso de Almacenamiento Físico, estableciendo la relación entre las actividades ejecutadas, los cambios de estado y la evidencia generada para garantizar una trazabilidad completa.

---

## EO-005-01 — Orden de Almacenamiento Emitida

**Descripción**

El Supervisor comunica oficialmente la orden de almacenamiento al montacarguista.

**Origen**

Supervisor

**Estado origen**

Ubicación Asignada

**Estado destino**

Orden de Almacenamiento Emitida

**Evidencia asociada**

- Registro de emisión de la orden.
- Identificación del pallet.
- Ubicación destino asignada.

---

## EO-005-02 — Inicio del Traslado

**Descripción**

El montacarguista inicia el movimiento físico del pallet hacia la ubicación asignada.

**Origen**

Montacarguista

**Estado origen**

Orden de Almacenamiento Emitida

**Estado destino**

Traslado en Proceso

**Evidencia asociada**

- Inicio de maniobra.
- Operador responsable.
- Fecha y hora de inicio.

---

## EO-005-03 — Llegada a la Ubicación

**Descripción**

El pallet llega físicamente a la ubicación destino para iniciar la validación previa al almacenamiento.

**Origen**

Montacarguista

**Estado origen**

Traslado en Proceso

**Estado destino**

Verificación de Ubicación

**Evidencia asociada**

- Confirmación de llegada.
- Ubicación alcanzada.

---

## EO-005-04 — Ubicación Validada

**Descripción**

La ubicación física coincide con la ubicación aprobada por CJWMS y está disponible para recibir el pallet.

**Origen**

Montacarguista

**Estado origen**

Verificación de Ubicación

**Estado destino**

Almacenamiento Físico Ejecutado

**Evidencia asociada**

- Validación de rack.
- Validación de nivel.
- Validación de posición.

---

## EO-005-05 — Almacenamiento Ejecutado

**Descripción**

El pallet queda colocado físicamente en la ubicación asignada.

**Origen**

Montacarguista

**Estado origen**

Almacenamiento Físico Ejecutado

**Estado destino**

Almacenamiento Confirmado

**Evidencia asociada**

- Confirmación de colocación.
- Fecha y hora de finalización de la maniobra.

---

## EO-005-06 — Confirmación Operativa

**Descripción**

CJWMS recibe la confirmación oficial del almacenamiento y ejecuta la sincronización del modelo operativo.

**Origen**

CJWMS

**Estado origen**

Almacenamiento Confirmado

**Estado destino**

Inventario Actualizado

**Evidencia asociada**

- Movimiento logístico registrado.
- Inventario actualizado.
- Estados sincronizados.
- Evidencias operativas generadas.
- Trazabilidad actualizada.

---

# Matriz de Eventos

| Código    | Evento                          | Estado origen                   | Estado destino                  | Actor principal |
| --------- | ------------------------------- | ------------------------------- | ------------------------------- | --------------- |
| EO-005-01 | Orden de Almacenamiento Emitida | Ubicación Asignada              | Orden de Almacenamiento Emitida | Supervisor      |
| EO-005-02 | Inicio del Traslado             | Orden de Almacenamiento Emitida | Traslado en Proceso             | Montacarguista  |
| EO-005-03 | Llegada a la Ubicación          | Traslado en Proceso             | Verificación de Ubicación       | Montacarguista  |
| EO-005-04 | Ubicación Validada              | Verificación de Ubicación       | Almacenamiento Físico Ejecutado | Montacarguista  |
| EO-005-05 | Almacenamiento Ejecutado        | Almacenamiento Físico Ejecutado | Almacenamiento Confirmado       | Montacarguista  |
| EO-005-06 | Confirmación Operativa          | Almacenamiento Confirmado       | Inventario Actualizado          | CJWMS           |

---

## Principios COM Aplicados

- Todo cambio de estado debe originarse por un evento identificable.
- Todo evento debe poder asociarse a un actor responsable.
- Todo evento debe generar evidencia suficiente para auditoría.
- Ningún evento puede modificar el inventario sin la confirmación operativa correspondiente.
- La secuencia cronológica de los eventos constituye la base de la trazabilidad del proceso.

---

# 18.4.6 Reglas de Negocio

## Objetivo

Establecer las reglas de negocio que gobiernan el proceso de Almacenamiento Físico, asegurando la correcta ejecución de las maniobras, la consistencia del inventario y la integridad de la trazabilidad operativa.

---

## RN-005-01 — Almacenamiento únicamente con ubicación aprobada

**Regla**

Un pallet únicamente podrá ser almacenado cuando exista una ubicación previamente asignada y aprobada por CJWMS.

**Propósito**

Evitar almacenamientos improvisados o sin autorización.

---

## RN-005-02 — Correspondencia obligatoria de la ubicación

**Regla**

La ubicación física donde se coloque el pallet deberá coincidir exactamente con la ubicación registrada en la orden de almacenamiento.

**Propósito**

Garantizar la sincronización entre el inventario físico y el inventario lógico.

---

## RN-005-03 — Validación previa a la colocación

**Regla**

Antes de colocar el pallet, el operador deberá verificar visualmente que:

- Rack.
- Nivel.
- Posición.

correspondan con la ubicación asignada.

**Propósito**

Reducir errores de almacenamiento.

---

## RN-005-04 — Respeto a las reglas del tipo de rack

**Regla**

La colocación del pallet deberá respetar las políticas operativas definidas para el tipo de rack correspondiente (Drive In o Selectivo).

**Propósito**

Mantener la integridad física y operativa del almacén.

---

## RN-005-05 — Confirmación obligatoria del almacenamiento

**Regla**

Ningún pallet será considerado almacenado hasta que la maniobra haya sido confirmada mediante el procedimiento operativo vigente de la organización.

**Propósito**

Evitar diferencias entre la ejecución física y el registro del sistema.

---

## RN-005-06 — Actualización del inventario posterior a la confirmación

**Regla**

La actualización del inventario únicamente podrá ejecutarse después de la confirmación oficial del almacenamiento.

**Propósito**

Asegurar que el inventario represente únicamente operaciones realmente ejecutadas.

---

## RN-005-07 — Registro obligatorio del movimiento operativo

**Regla**

Toda operación de almacenamiento deberá generar un movimiento logístico con su información mínima de trazabilidad.

**Información mínima**

- Identificador del pallet.
- Ubicación origen.
- Ubicación destino.
- Operador responsable.
- Fecha y hora.
- Tipo de movimiento.

**Propósito**

Mantener la trazabilidad completa de la operación.

---

## RN-005-08 — Generación obligatoria de evidencia

**Regla**

Cada almacenamiento deberá generar la evidencia operativa necesaria para permitir auditorías posteriores.

**Propósito**

Garantizar la reconstrucción completa de la operación.

---

## RN-005-09 — Gestión de excepciones

**Regla**

Si durante el almacenamiento se detecta una diferencia entre la ubicación asignada y la ubicación física disponible, la maniobra deberá detenerse y registrarse como una excepción operativa.

**Propósito**

Evitar decisiones no autorizadas durante la ejecución.

---

## RN-005-10 — Integridad de la trazabilidad

**Regla**

Todas las actividades, estados, eventos y evidencias generadas durante OP-005 deberán conservar su secuencia cronológica y permanecer asociadas al mismo identificador de operación.

**Propósito**

Garantizar la trazabilidad histórica de extremo a extremo.

---

# Resumen de Reglas

| Código    | Regla                                                    |
| --------- | -------------------------------------------------------- |
| RN-005-01 | Almacenamiento únicamente con ubicación aprobada         |
| RN-005-02 | Correspondencia obligatoria de la ubicación              |
| RN-005-03 | Validación previa a la colocación                        |
| RN-005-04 | Respeto a las reglas del tipo de rack                    |
| RN-005-05 | Confirmación obligatoria del almacenamiento              |
| RN-005-06 | Actualización del inventario posterior a la confirmación |
| RN-005-07 | Registro obligatorio del movimiento operativo            |
| RN-005-08 | Generación obligatoria de evidencia                      |
| RN-005-09 | Gestión de excepciones                                   |
| RN-005-10 | Integridad de la trazabilidad                            |

---

# 18.4.7 Modelo Oficial de Evidencias Operativas

## Objetivo

Definir las evidencias operativas mínimas que deberán generarse durante el proceso de Almacenamiento Físico para garantizar la trazabilidad, la auditoría y la reconstrucción completa de la operación.

Las evidencias forman parte del Modelo Corporativo COM y constituyen el respaldo oficial de que la ejecución física coincide con el registro lógico de CJWMS.

---

## Principios Generales

Toda evidencia generada durante OP-005 deberá cumplir los siguientes principios:

- Ser objetiva.
- Ser verificable.
- Estar asociada a una operación específica.
- Mantener su secuencia cronológica.
- Permanecer disponible para auditoría.
- No poder alterar el historial de la operación.

---

# Evidencias Operativas

## EV-005-01 — Emisión de la Orden de Almacenamiento

**Descripción**

Registro de la comunicación oficial para iniciar el almacenamiento.

**Información mínima**

- Identificador de la operación.
- Pallet.
- Producto.
- Ubicación destino.
- Supervisor responsable.
- Fecha y hora.

---

## EV-005-02 — Inicio del Traslado

**Descripción**

Registro del momento en que el montacarguista inicia el movimiento físico del pallet.

**Información mínima**

- Operación.
- Operador.
- Hora de inicio.
- Ubicación origen.

---

## EV-005-03 — Llegada a la Ubicación

**Descripción**

Registro de la llegada del pallet a la ubicación asignada.

**Información mínima**

- Operación.
- Ubicación destino.
- Hora de llegada.

---

## EV-005-04 — Validación de la Ubicación

**Descripción**

Evidencia de que la ubicación física coincide con la asignada por CJWMS.

**Información mínima**

- Rack.
- Nivel.
- Posición.
- Resultado de la validación.
- Operador.

---

## EV-005-05 — Almacenamiento Ejecutado

**Descripción**

Registro de que el pallet fue colocado físicamente en la ubicación correspondiente.

**Información mínima**

- Pallet.
- Ubicación final.
- Operador.
- Fecha y hora.

---

## EV-005-06 — Confirmación Operativa

**Descripción**

Confirmación oficial de que la maniobra fue concluida correctamente.

**Información mínima**

- Identificador de la operación.
- Responsable de la confirmación.
- Fecha y hora.
- Resultado.

---

## EV-005-07 — Actualización del Inventario

**Descripción**

Registro de la sincronización del inventario lógico con la ejecución física.

**Información mínima**

- Inventario actualizado.
- Movimiento generado.
- Estados modificados.
- Fecha y hora.

---

## EV-005-08 — Trazabilidad Consolidada

**Descripción**

Conjunto de referencias que enlazan todas las actividades, eventos, estados y evidencias generadas durante OP-005.

**Información mínima**

- Identificador único de la operación.
- Referencias a actividades.
- Referencias a eventos.
- Referencias a estados.
- Referencias a movimientos.
- Referencias a evidencias.

---

# Matriz de Evidencias

| Código    | Evidencia                             | Responsable           |
| --------- | ------------------------------------- | --------------------- |
| EV-005-01 | Emisión de la Orden de Almacenamiento | Supervisor            |
| EV-005-02 | Inicio del Traslado                   | Montacarguista        |
| EV-005-03 | Llegada a la Ubicación                | Montacarguista        |
| EV-005-04 | Validación de la Ubicación            | Montacarguista        |
| EV-005-05 | Almacenamiento Ejecutado              | Montacarguista        |
| EV-005-06 | Confirmación Operativa                | Supervisor / CJWMS    |
| EV-005-07 | Actualización del Inventario          | CJWMS                 |
| EV-005-08 | Trazabilidad Consolidada              | Motor de Trazabilidad |

---

## Integración con el Modelo COM

Las evidencias generadas durante OP-005 se integran directamente con:

- Modelo de Estados Operativos.
- Modelo de Eventos Operativos.
- Modelo de Actividades Operativas.
- Motor de Evidencias.
- Motor de Trazabilidad.
- Memoria Operativa.
- Inteligencia Operativa.
- Analítica Ejecutiva.

Esto garantiza que cualquier operación de almacenamiento pueda reconstruirse completamente desde su emisión hasta la actualización final del inventario.

---

# 18.4.8 Matriz de Trazabilidad Operativa

## Objetivo

Relacionar cada actividad del proceso de Almacenamiento Físico con los estados, eventos, reglas de negocio, evidencias y actores involucrados, garantizando una trazabilidad integral conforme a la metodología COM.

---

## Matriz de Trazabilidad

| Actividad                                         | Estado Principal                | Evento Disparador                         | Reglas Aplicables                          | Evidencias Generadas | Actor Responsable           |
| ------------------------------------------------- | ------------------------------- | ----------------------------------------- | ------------------------------------------ | -------------------- | --------------------------- |
| AO-005-01 Recepción de la Orden de Almacenamiento | Orden de Almacenamiento Emitida | EO-005-01 Orden de Almacenamiento Emitida | RN-005-01                                  | EV-005-01            | Supervisor                  |
| AO-005-02 Preparación para el Traslado            | Orden de Almacenamiento Emitida | EO-005-02 Inicio del Traslado             | RN-005-03                                  | EV-005-02            | Montacarguista              |
| AO-005-03 Traslado del Pallet                     | Traslado en Proceso             | EO-005-03 Llegada a la Ubicación          | RN-005-04                                  | EV-005-03            | Montacarguista              |
| AO-005-04 Verificación de la Ubicación            | Verificación de Ubicación       | EO-005-04 Ubicación Validada              | RN-005-02, RN-005-03                       | EV-005-04            | Montacarguista              |
| AO-005-05 Colocación Física del Pallet            | Almacenamiento Físico Ejecutado | EO-005-05 Almacenamiento Ejecutado        | RN-005-04                                  | EV-005-05            | Montacarguista              |
| AO-005-06 Confirmación del Almacenamiento         | Almacenamiento Confirmado       | EO-005-06 Confirmación Operativa          | RN-005-05                                  | EV-005-06            | Montacarguista / Supervisor |
| AO-005-07 Actualización Operativa                 | Inventario Actualizado          | EO-005-06 Confirmación Operativa          | RN-005-06, RN-005-07, RN-005-08, RN-005-10 | EV-005-07, EV-005-08 | CJWMS                       |

---

## Cobertura de la Trazabilidad

La matriz garantiza que:

- Toda actividad tiene un responsable claramente identificado.
- Todo cambio de estado está respaldado por un evento operativo.
- Toda actividad cumple una o más reglas de negocio.
- Cada paso genera la evidencia correspondiente.
- La operación puede reconstruirse cronológicamente desde su inicio hasta su conclusión.

---

## Validaciones de Integridad

La Matriz de Trazabilidad deberá cumplir las siguientes validaciones:

### Integridad de Actividades

- Todas las actividades del proceso aparecen representadas.
- No existen actividades sin responsable.

### Integridad de Estados

- Todos los estados tienen al menos un evento asociado.
- No existen estados huérfanos.

### Integridad de Eventos

- Todo evento provoca una transición válida.
- No existen eventos sin impacto operativo.

### Integridad de Reglas

- Todas las reglas de negocio están asociadas a una o más actividades.
- Ninguna regla permanece sin aplicación.

### Integridad de Evidencias

- Cada actividad genera evidencia verificable.
- Toda evidencia puede relacionarse con una operación específica.

---

## Relación con el Modelo Operativo Corporativo

La Matriz de Trazabilidad de OP-005 se integra con:

- Modelo de Estados Operativos.
- Modelo de Eventos Operativos.
- Modelo de Actividades Operativas.
- Modelo Oficial de Evidencias.
- Motor de Reglas Operativas.
- Motor de Trazabilidad.
- Memoria Operativa.
- Inteligencia Operativa.
- Analítica Ejecutiva.

Esta integración permite mantener una visión consistente y auditada de todo el ciclo de almacenamiento dentro de CJWMS.

---

# 18.4.9 Diagrama Integrado del Proceso

## Objetivo

Representar de manera integrada el flujo operativo de OP-005, mostrando la relación entre los actores, las actividades principales, los cambios de estado y la actualización del modelo operativo de CJWMS.

---

## Diagrama Integrado

```text
                    OP-004
             Ubicación Aprobada
                     │
                     ▼
        ┌───────────────────────────────┐
        │ Supervisor                    │
        │ Emite Orden de Almacenamiento │
        └──────────────┬────────────────┘
                       │
                       ▼
          Estado: Orden Emitida
                       │
                       ▼
        ┌────────────────────────────┐
        │ Montacarguista             │
        │ Prepara el Traslado        │
        └──────────────┬─────────────┘
                       │
                       ▼
          Estado: Traslado en Proceso
                       │
                       ▼
        ┌────────────────────────────┐
        │ Traslado hacia Ubicación   │
        └──────────────┬─────────────┘
                       │
                       ▼
        ┌────────────────────────────┐
        │ Verifica Rack / Nivel /    │
        │ Posición                   │
        └──────────────┬─────────────┘
                       │
             ¿Ubicación correcta?
                 │             │
               Sí│             │No
                 ▼             ▼
     Estado: Almacenamiento    Registrar
        Físico Ejecutado       Excepción
                 │
                 ▼
        ┌────────────────────────────┐
        │ Colocación Física          │
        │ del Pallet                 │
        └──────────────┬─────────────┘
                       │
                       ▼
      Estado: Almacenamiento Confirmado
                       │
                       ▼
        ┌────────────────────────────┐
        │ CJWMS                      │
        │ Actualiza Inventario       │
        │ Estados                    │
        │ Movimientos                │
        │ Evidencias                 │
        │ Trazabilidad               │
        └──────────────┬─────────────┘
                       │
                       ▼
       Estado Final: Inventario Actualizado
                       │
                       ▼
                 OP-006
     Confirmación Operativa del Almacenamiento
```

---

## Interpretación del Diagrama

El proceso puede dividirse en tres grandes bloques:

### 1. Ejecución Operativa

Comprende las actividades realizadas por el Supervisor y el Montacarguista para trasladar y colocar físicamente el pallet.

### 2. Validación Operativa

Antes de almacenar el pallet se verifica que la ubicación física corresponda exactamente con la ubicación aprobada por CJWMS.

En caso de detectarse una diferencia, la operación no continúa y debe registrarse una excepción operativa conforme a las reglas del proceso.

### 3. Sincronización del Modelo Operativo

Una vez confirmada la maniobra, CJWMS sincroniza automáticamente:

- Inventario.
- Estados operativos.
- Movimiento logístico.
- Evidencias.
- Trazabilidad.

Con esta sincronización finaliza oficialmente OP-005.

---

## Integración con Procesos

**Proceso anterior**

- OP-004 — Asignación de Ubicación.

**Proceso siguiente**

- OP-006 — Confirmación Operativa del Almacenamiento.

El diagrama evidencia que OP-005 constituye el puente entre la decisión logística (OP-004) y la validación formal de la ejecución (OP-006).

---

# 18.4.10 Validación Operativa Integral

## Objetivo

Verificar que el proceso OP-005 — Almacenamiento Físico cumple con los lineamientos del Modelo Operativo Corporativo COM, garantizando consistencia documental, trazabilidad, alineación con procesos relacionados y preparación para su implementación en CJWMS.

---

# Validación Estructural

| Elemento                         | Estado |
| -------------------------------- | ------ |
| Objetivo del proceso definido    | ✅     |
| Alcance documentado              | ✅     |
| Actores identificados            | ✅     |
| Entradas y salidas documentadas  | ✅     |
| Flujo operativo definido         | ✅     |
| Actividades operativas modeladas | ✅     |
| Estados operativos definidos     | ✅     |
| Eventos operativos identificados | ✅     |
| Reglas de negocio documentadas   | ✅     |
| Evidencias operativas definidas  | ✅     |
| Matriz de trazabilidad integrada | ✅     |
| Diagrama integrado incluido      | ✅     |

---

# Validación de Consistencia

Se confirma que:

- Las actividades operativas corresponden con el flujo general del proceso.
- Cada cambio de estado está respaldado por un evento operativo.
- Las reglas de negocio gobiernan las actividades correspondientes.
- Todas las actividades generan evidencia verificable.
- El modelo mantiene la sincronización entre la ejecución física y el inventario lógico.
- La secuencia del proceso es cronológicamente consistente.

---

# Validación de Integración

## Procesos anteriores

Se verifica la correcta integración con:

- OP-002 — Recepción Física.
- OP-003 — Inspección.
- OP-004 — Asignación de Ubicación.

Las salidas de estos procesos constituyen las entradas necesarias para OP-005.

---

## Procesos posteriores

Se confirma que OP-005 proporciona la información necesaria para:

- OP-006 — Confirmación Operativa del Almacenamiento.
- Reubicaciones.
- Surtido.
- Inventarios Cíclicos.
- Auditorías Operativas.
- Inteligencia Operativa.
- Analítica Ejecutiva.

---

# Validación de Trazabilidad

Se confirma que durante OP-005:

- Cada actividad posee un responsable.
- Cada estado tiene una transición definida.
- Cada transición está originada por un evento.
- Cada evento genera evidencia.
- Toda la operación conserva un identificador único de trazabilidad.

---

# Validación de Gobernanza Operativa

El proceso garantiza que:

- No existan almacenamientos sin ubicación aprobada.
- No existan actualizaciones de inventario sin confirmación operativa.
- No existan movimientos sin evidencia.
- Las excepciones operativas sean registradas y controladas.
- Toda la información permanezca disponible para auditoría.

---

# Resultado de la Validación

**Resultado general**

✅ APROBADO

El proceso OP-005 — Almacenamiento Físico cumple con los criterios establecidos por la Metodología de Modelado Operativo Cognitivo (COM) y se considera apto para integrarse al Modelo Operativo Corporativo de CJWMS.

---

## Observaciones

Durante esta validación no se identificaron inconsistencias estructurales entre:

- Flujo operativo.
- Actividades.
- Estados.
- Eventos.
- Reglas.
- Evidencias.
- Matriz de trazabilidad.

El proceso queda preparado para su implementación funcional y para su integración con los procesos operativos subsecuentes.

---

# 18.4.11 Conclusiones Oficiales del Proceso

## Resumen Ejecutivo

El proceso **OP-005 — Almacenamiento Físico** transforma una decisión logística previamente aprobada en una ejecución física controlada, verificable y completamente trazable.

Su propósito principal es garantizar que el pallet sea almacenado exactamente en la ubicación asignada por CJWMS, manteniendo la sincronización entre la realidad física del almacén y el modelo lógico del sistema.

Durante este proceso se formalizan las responsabilidades del Supervisor, del Montacarguista y de CJWMS, estableciendo un flujo operativo que integra actividades, estados, eventos, reglas de negocio y evidencias dentro de un único modelo coherente.

---

## Aportación al Modelo Operativo Corporativo

Con la incorporación de OP-005, el Modelo Operativo Corporativo de CJWMS fortalece las siguientes capacidades:

- Ejecución controlada del almacenamiento físico.
- Sincronización confiable entre inventario físico y lógico.
- Registro estructurado de movimientos operativos.
- Generación sistemática de evidencias.
- Trazabilidad integral de cada operación.
- Base documental para auditorías y mejora continua.

---

## Integración con la Arquitectura COM

OP-005 mantiene integración directa con los modelos corporativos definidos durante la Fase 18:

- Modelo de Estados Operativos.
- Modelo de Eventos Operativos.
- Modelo de Actividades Operativas.
- Modelo de Actores Operativos.
- Motor de Reglas Operativas.
- Motor de Evidencias.
- Motor de Trazabilidad.
- Memoria Operativa.
- Inteligencia Operativa.
- Analítica Ejecutiva.

Esta integración garantiza que la ejecución física del almacenamiento pueda ser comprendida, auditada y analizada como parte de una arquitectura operativa unificada.

---

## Continuidad del Flujo Operativo

Con la conclusión de OP-005, el flujo operativo documentado de CJWMS queda conformado por:

- OP-002 — Recepción Física.
- OP-003 — Inspección.
- OP-004 — Asignación de Ubicación.
- OP-005 — Almacenamiento Físico.

El siguiente proceso será:

- **OP-006 — Confirmación Operativa del Almacenamiento**, donde se formalizará la aceptación definitiva de la operación y se consolidará el cierre operativo del ciclo de almacenamiento.

---

## Declaración Oficial

El proceso **OP-005 — Almacenamiento Físico** ha sido modelado conforme a la **Metodología de Modelado Operativo Cognitivo (COM)**, cumpliendo los criterios de:

- Consistencia documental.
- Gobernanza operativa.
- Integridad de trazabilidad.
- Alineación con los Modelos Operativos Corporativos.
- Preparación para implementación en CJWMS.

**Estado del proceso:** ✅ CONCLUIDO

**Versión:** 1.0

**Estado documental:** Aprobado para integración al Modelo Operativo Corporativo.
