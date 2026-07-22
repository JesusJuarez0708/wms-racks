# Modelo Oficial de Eventos Operativos
## CJWMS — Cognitive Warehouse Management System

---

# Propósito

Este documento define el modelo oficial de eventos operativos utilizado por CJWMS.

Un evento operativo representa un hecho ocurrido durante la ejecución de un proceso del almacén.

Los eventos permiten controlar las transiciones de estado, generar trazabilidad y alimentar la inteligencia operativa y cognitiva del sistema.

---

# Definición

Un Evento Operativo es un hecho consumado, registrado de forma inmutable, que describe algo relevante ocurrido dentro de un proceso.

Ejemplos:

- Transporte llegó.
- Documentación recibida.
- Incidencia detectada.
- Cliente autorizó.
- Andén asignado.
- Descarga iniciada.

---

# Diferencia entre conceptos

| Concepto | Descripción |
|---|---|
| Proceso | Operación de negocio que se está ejecutando. |
| Estado | Situación actual del proceso. |
| Actividad | Trabajo que se realiza dentro del proceso. |
| Evento | Hecho ocurrido como resultado de una acción o condición. |

---

# Principios

- Todo cambio de estado debe originarse en un evento.
- Los eventos representan hechos consumados.
- Los eventos no deben modificarse después de su registro.
- Todo evento debe ser trazable.
- Todo evento debe registrar fecha y hora.
- Cuando corresponda, debe registrar actor y origen.
- Los eventos pueden activar componentes cognitivos.
- Las incidencias deben registrarse como eventos operativos.

---

# Flujo Conceptual

```text
Actividad ejecutada
        │
        ▼
Evento registrado
        │
        ▼
Regla de transición evaluada
        │
        ▼
Estado actualizado
        │
        ▼
Trazabilidad generada
        │
        ▼
Arquitectura Cognitiva notificada
```

---

# Estructura Conceptual de un Evento

Todo evento operativo deberá contener, como mínimo:

| Campo | Descripción |
|---|---|
| event_id | Identificador único del evento. |
| event_type | Tipo de evento ocurrido. |
| process_type | Tipo de proceso relacionado. |
| process_id | Identificador del proceso. |
| previous_state | Estado anterior. |
| new_state | Estado resultante. |
| occurred_at | Fecha y hora del evento. |
| actor_type | Tipo de actor responsable. |
| actor_id | Identificador del actor, cuando aplique. |
| source | Origen del evento. |
| description | Descripción legible del hecho. |
| metadata | Información adicional relacionada. |

---

# Clasificación de Eventos

## Eventos de Inicio

Crean o activan un proceso operativo.

Ejemplos:

- TRANSPORT_ARRIVED
- ARRIVAL_REGISTERED
- RECEIVING_CREATED

---

## Eventos de Progreso

Representan avances normales del proceso.

Ejemplos:

- DOCUMENT_VALIDATION_STARTED
- DOCK_ASSIGNED
- UNLOADING_STARTED

---

## Eventos de Decisión

Representan una resolución operativa.

Ejemplos:

- CUSTOMER_APPROVED
- CUSTOMER_REJECTED
- VALIDATION_APPROVED

---

## Eventos de Incidencia

Registran una desviación o problema.

Ejemplos:

- RECEIVING_ISSUE_DETECTED
- DAMAGED_GOODS_DETECTED
- MISSING_GOODS_DETECTED
- INCOMPLETE_DOCUMENTATION_DETECTED

---

## Eventos de Suspensión

Detienen temporalmente el proceso.

Ejemplos:

- PROCESS_PLACED_ON_HOLD
- UNLOADING_SUSPENDED

---

## Eventos de Cierre

Concluyen el ciclo de vida del proceso.

Ejemplos:

- RECEIVING_COMPLETED
- PROCESS_CANCELLED
- PROCESS_REJECTED
- PROCESS_CLOSED

---

# Eventos Oficiales de OP-001 — Llegada del Transporte

| Código | Evento | Descripción |
|---|---|---|
| EV-REC-001 | TRANSPORT_ARRIVED | El transporte llegó al almacén. |
| EV-REC-002 | ARRIVAL_REGISTERED | Mesa de Control registró la llegada. |
| EV-REC-003 | DOCUMENTS_RECEIVED | Se recibieron los documentos de entrada. |
| EV-REC-004 | OPERATOR_ID_RECEIVED | Se recibió la licencia o INE del operador. |
| EV-REC-005 | DOCUMENT_VALIDATION_STARTED | Inició la validación documental. |
| EV-REC-006 | DOCUMENT_VALIDATION_APPROVED | La documentación fue validada correctamente. |
| EV-REC-007 | RECEIVING_ISSUE_DETECTED | Se detectó una incidencia. |
| EV-REC-008 | CUSTOMER_NOTIFICATION_SENT | Mesa de Control notificó al cliente. |
| EV-REC-009 | CUSTOMER_APPROVED | El cliente autorizó continuar. |
| EV-REC-010 | CUSTOMER_REJECTED | El cliente rechazó continuar. |
| EV-REC-011 | DOCK_ASSIGNED | Se asignó un andén. |
| EV-REC-012 | DRIVER_NOTIFIED | El guardia informó al operador. |
| EV-REC-013 | VEHICLE_POSITIONED | El transporte se colocó en el andén. |
| EV-REC-014 | UNLOADING_STARTED | Comenzó la descarga. |

---

# Relación Evento–Estado

| Evento | Estado resultante |
|---|---|
| TRANSPORT_ARRIVED | CREATED |
| ARRIVAL_REGISTERED | PENDING_VALIDATION |
| DOCUMENT_VALIDATION_STARTED | DOCUMENT_VALIDATION |
| RECEIVING_ISSUE_DETECTED | PENDING_CUSTOMER |
| CUSTOMER_APPROVED | AUTHORIZED |
| CUSTOMER_REJECTED | REJECTED |
| DOCK_ASSIGNED | DOCK_ASSIGNED |
| UNLOADING_STARTED | UNLOADING |

---

# Integración Cognitiva

Los eventos operativos podrán alimentar los siguientes componentes:

- Operational Memory
- Operational Timeline
- Operational Health
- Operational Risk Radar
- Executive KPIs
- Executive Brain
- Operational Intelligence

La operación genera eventos.

Los eventos generan conocimiento.

El conocimiento mejora la operación.

---

# Principio Fundamental

Los estados indican dónde se encuentra un proceso.

Los eventos explican cómo llegó hasta ahí.

---

# Estado

Documento oficial.

Versión 1.0

Fase 18 — Validación Operativa Integral.