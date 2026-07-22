# Modelo Oficial de Estados Operativos
## CJWMS — Cognitive Warehouse Management System

---

# Propósito

Este documento define el modelo oficial de estados operativos utilizado por CJWMS para representar la evolución de los procesos del almacén.

Los estados representan el ciclo de vida de un proceso y constituyen la fuente oficial para la operación, la trazabilidad y la inteligencia del sistema.

---

# Principios

- Todo proceso posee un ciclo de vida.
- Todo cambio de estado debe generar un evento operativo.
- Todo evento operativo debe ser trazable.
- Ningún proceso puede existir sin un estado.
- El estado representa la verdad operativa del sistema.

---

# Estados Operativos

| Estado | Descripción |
|----------|-------------|
| CREATED | Proceso creado. |
| PENDING_VALIDATION | Pendiente de validación documental. |
| DOCUMENT_VALIDATION | Validación documental en curso. |
| PENDING_CUSTOMER | Esperando autorización del cliente. |
| AUTHORIZED | Proceso autorizado. |
| DOCK_ASSIGNED | Andén asignado. |
| UNLOADING | Descarga en proceso. |
| PHYSICAL_RECEIVING | Recepción física en proceso. |
| INSPECTION | Inspección de mercancía. |
| PENDING_STORAGE | Pendiente de almacenamiento. |
| STORED | Mercancía almacenada. |
| CLOSED | Recepción finalizada. |

---

# Estados de Excepción

| Estado | Descripción |
|----------|-------------|
| ON_HOLD | Proceso detenido temporalmente. |
| REJECTED | Recepción rechazada. |
| CANCELLED | Recepción cancelada. |
| SUSPENDED | Operación suspendida. |

---

# Principio Fundamental

Las pantallas muestran información.

Los estados controlan la operación.

CJWMS gestiona procesos mediante estados operativos.

---

# Estado

Documento oficial.

Versión 1.0