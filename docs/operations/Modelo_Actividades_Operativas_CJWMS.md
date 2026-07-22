# Modelo Oficial de Actividades Operativas
## CJWMS — Cognitive Warehouse Management System

---

# Propósito

Este documento define el modelo oficial de actividades operativas utilizado por CJWMS.

Una actividad operativa representa el trabajo que debe realizar una persona, un actor externo o el sistema durante la ejecución de un proceso del almacén.

Las actividades permiten transformar una situación operativa, producir resultados y generar eventos que pueden provocar cambios de estado.

---

# Definición

Una Actividad Operativa es una acción ejecutable dentro de un proceso de negocio.

Una actividad posee:

- Un propósito.
- Un responsable.
- Una condición de inicio.
- Un resultado esperado.
- Una posible relación con eventos y estados.

Ejemplos:

- Registrar la llegada de un transporte.
- Validar documentación.
- Notificar una incidencia.
- Asignar un andén.
- Posicionar el vehículo.
- Iniciar la descarga.

---

# Diferencia entre conceptos

| Concepto | Descripción |
|---|---|
| Proceso | Operación de negocio que se está ejecutando. |
| Estado | Situación actual del proceso. |
| Actividad | Trabajo que debe realizarse dentro del proceso. |
| Evento | Hecho ocurrido como resultado de una actividad o condición. |

---

# Relación Conceptual

```text
Proceso Operativo
        │
        ▼
Estado Actual
        │
        ▼
Actividad Habilitada
        │
        ▼
Actividad Ejecutada
        │
        ▼
Resultado Obtenido
        │
        ▼
Evento Registrado
        │
        ▼
Nuevo Estado
```

---

# Principios

- Toda actividad debe pertenecer a un proceso operativo.
- Toda actividad debe tener un responsable definido.
- Una actividad solo debe ejecutarse cuando se cumplan sus condiciones de inicio.
- Toda actividad debe producir un resultado verificable.
- Las actividades relevantes deben generar trazabilidad.
- Una actividad puede generar uno o varios eventos.
- No todas las actividades producen un cambio de estado.
- Las actividades automáticas deben diferenciarse de las actividades humanas.
- Las decisiones externas deben registrarse, aunque el actor no utilice directamente CJWMS.
- Ninguna actividad crítica debe considerarse terminada sin evidencia de su resultado.

---

# Clasificación de Actividades

## Actividades Humanas

Son realizadas directamente por una persona.

Ejemplos:

- Registrar la llegada.
- Validar documentos.
- Asignar un andén.
- Informar al operador.

---

## Actividades del Sistema

Son ejecutadas automáticamente por CJWMS como respuesta a una acción o evento.

Ejemplos:

- Registrar fecha y hora.
- Calcular la posición FIFO.
- Actualizar la trazabilidad.
- Actualizar indicadores operativos.
- Registrar eventos en la Memoria Operativa.

---

## Actividades Externas

Son realizadas por actores que participan en la operación, pero que no necesariamente utilizan CJWMS.

Ejemplos:

- El operador entrega documentación.
- El cliente autoriza una incidencia.
- El guardia informa al operador.
- El operador mueve el transporte al andén.

---

## Actividades de Decisión

Evalúan información y determinan la continuidad del proceso.

Ejemplos:

- Aprobar la validación documental.
- Autorizar una excepción.
- Rechazar una recepción.
- Suspender temporalmente la operación.

---

# Estructura Conceptual de una Actividad

Toda actividad operativa deberá contener, como mínimo:

| Campo | Descripción |
|---|---|
| activity_id | Identificador único de la actividad. |
| activity_type | Tipo o código de actividad. |
| process_type | Tipo de proceso al que pertenece. |
| process_id | Identificador del proceso relacionado. |
| name | Nombre legible de la actividad. |
| description | Descripción de la acción a ejecutar. |
| activity_category | Humana, automática, externa o de decisión. |
| responsible_actor | Actor responsable de ejecutarla. |
| required_state | Estado requerido para habilitar la actividad. |
| prerequisites | Condiciones previas necesarias. |
| started_at | Fecha y hora de inicio. |
| completed_at | Fecha y hora de finalización. |
| result | Resultado obtenido. |
| resulting_event | Evento generado, cuando aplique. |
| resulting_state | Estado resultante, cuando aplique. |
| evidence | Evidencia o referencia de ejecución. |
| metadata | Información adicional relacionada. |

Esta estructura es conceptual y no representa todavía una definición final de base de datos.

---

# Ciclo de Vida de una Actividad

Una actividad podrá encontrarse en alguna de las siguientes situaciones:

| Situación | Descripción |
|---|---|
| AVAILABLE | La actividad puede ejecutarse. |
| PENDING | La actividad está pendiente. |
| IN_PROGRESS | La actividad está siendo ejecutada. |
| COMPLETED | La actividad finalizó correctamente. |
| BLOCKED | No puede continuar por una condición pendiente. |
| CANCELLED | La actividad fue cancelada. |
| FAILED | La actividad no pudo completarse correctamente. |

> El ciclo de vida de una actividad es diferente al estado general del proceso.

---

# Actividades Oficiales de OP-001 — Llegada del Transporte

| Código | Actividad | Responsable | Categoría | Resultado esperado |
|---|---|---|---|---|
| AC-REC-001 | Recibir al transporte | Guardia | Externa | Transporte atendido en el acceso. |
| AC-REC-002 | Entregar documentación de entrada | Operador logístico | Externa | Documentación disponible para revisión. |
| AC-REC-003 | Entregar identificación oficial | Operador logístico | Externa | Licencia o INE disponible para revisión. |
| AC-REC-004 | Registrar la llegada | Mesa de Control | Humana | Recepción creada en CJWMS. |
| AC-REC-005 | Registrar fecha y hora de llegada | CJWMS | Automática | Momento de llegada trazado. |
| AC-REC-006 | Asignar posición FIFO | CJWMS | Automática | Orden de atención determinado. |
| AC-REC-007 | Validar identificación del operador | Mesa de Control | Humana | Identidad revisada. |
| AC-REC-008 | Validar documentación de entrada | Mesa de Control | Humana | Documentación aprobada o incidencia detectada. |
| AC-REC-009 | Registrar incidencia | Mesa de Control | Humana | Problema documentado en CJWMS. |
| AC-REC-010 | Notificar al cliente | Mesa de Control | Humana | Cliente informado de la incidencia. |
| AC-REC-011 | Evaluar incidencia | Cliente | Decisión externa | Resolución emitida. |
| AC-REC-012 | Registrar decisión del cliente | Mesa de Control | Humana | Autorización o rechazo trazado. |
| AC-REC-013 | Asignar andén | Mesa de Control | Humana | Andén asignado al transporte. |
| AC-REC-014 | Registrar asignación de andén | CJWMS | Automática | Evento y trazabilidad actualizados. |
| AC-REC-015 | Informar al operador | Guardia | Externa | Operador conoce el andén asignado. |
| AC-REC-016 | Posicionar el transporte | Operador logístico | Externa | Vehículo colocado en el andén. |
| AC-REC-017 | Confirmar posicionamiento | Mesa de Control | Humana | Transporte confirmado en andén. |
| AC-REC-018 | Autorizar inicio de descarga | Mesa de Control | Decisión | Descarga habilitada. |
| AC-REC-019 | Registrar inicio de descarga | CJWMS | Automática | Estado actualizado a UNLOADING. |

---

# Relación Actividad–Evento–Estado

| Actividad | Evento generado | Estado resultante |
|---|---|---|
| Registrar la llegada | ARRIVAL_REGISTERED | PENDING_VALIDATION |
| Iniciar validación documental | DOCUMENT_VALIDATION_STARTED | DOCUMENT_VALIDATION |
| Registrar incidencia | RECEIVING_ISSUE_DETECTED | PENDING_CUSTOMER |
| Registrar autorización del cliente | CUSTOMER_APPROVED | AUTHORIZED |
| Registrar rechazo del cliente | CUSTOMER_REJECTED | REJECTED |
| Asignar andén | DOCK_ASSIGNED | DOCK_ASSIGNED |
| Confirmar inicio de descarga | UNLOADING_STARTED | UNLOADING |

---

# Actividades que no cambian el estado

Algunas actividades generan información o trazabilidad sin modificar necesariamente el estado general del proceso.

Ejemplos:

- Entregar documentación.
- Recibir identificación.
- Informar al operador.
- Registrar una observación.
- Consultar el orden FIFO.
- Actualizar un dato complementario.

Estas actividades podrán generar eventos informativos, pero no requieren obligatoriamente una transición de estado.

---

# Responsabilidad Operativa

## Guardia

- Recibe al transporte.
- Canaliza al operador.
- Informa el andén asignado.

El Guardia no utiliza CJWMS en la operación actual.

---

## Operador Logístico

- Entrega documentación.
- Entrega identificación.
- Posiciona el transporte.

El Operador Logístico no utiliza CJWMS en la operación actual.

---

## Mesa de Control

- Registra la llegada.
- Valida documentación e identidad.
- Registra incidencias.
- Notifica al cliente.
- Registra la decisión del cliente.
- Asigna el andén.
- Autoriza la continuidad del proceso.

Mesa de Control es el usuario principal de CJWMS durante OP-001.

---

## Cliente

- Evalúa incidencias.
- Autoriza o rechaza la continuidad de la recepción.

En la operación actual, la decisión del cliente es registrada en CJWMS por Mesa de Control.

---

## CJWMS

- Registra fecha y hora.
- Calcula la posición FIFO.
- Genera trazabilidad.
- Registra eventos.
- Actualiza estados.
- Actualiza indicadores.
- Alimenta los componentes cognitivos.

---

# Integración Cognitiva

La ejecución de actividades y el registro de sus eventos podrán alimentar:

- Operational Memory
- Operational Timeline
- Operational Health
- Operational Risk Radar
- Executive KPIs
- Executive Brain
- Operational Intelligence

CJWMS no sustituye la responsabilidad de los actores.

CJWMS registra, coordina, controla y transforma la actividad operativa en conocimiento.

---

# Principio Fundamental

Las actividades representan el trabajo.

Los eventos demuestran que el trabajo ocurrió.

Los estados reflejan el resultado operativo.

---

# Estado

Documento oficial.

Versión 1.0

Fase 18 — Validación Operativa Integral.