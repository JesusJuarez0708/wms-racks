# Modelo Oficial de Actores Operativos
## CJWMS — Cognitive Warehouse Management System

---

# Propósito

Este documento define el modelo oficial de actores operativos utilizado por CJWMS.

Un actor operativo representa una persona, rol organizacional, sistema o entidad externa que participa en la ejecución de uno o más procesos del almacén.

Los actores poseen responsabilidades claramente definidas y participan en actividades específicas dentro de los procesos operativos.

---

# Definición

Un Actor Operativo es cualquier entidad capaz de participar en la operación del almacén.

Un actor puede:

- Ejecutar actividades.
- Autorizar decisiones.
- Registrar información.
- Generar eventos.
- Consumir información.
- Participar sin utilizar directamente CJWMS.

---

# Principios

- Todo proceso debe tener actores definidos.
- Toda actividad debe tener un actor responsable.
- Todo evento debe estar asociado, cuando aplique, a un actor.
- Ningún actor debe asumir responsabilidades ambiguas.
- Los permisos del sistema deberán derivarse de las responsabilidades operativas.
- La Arquitectura Cognitiva complementa a los actores, pero no sustituye sus responsabilidades.

---

# Clasificación de Actores

## Actores Humanos

Participan directamente en la operación del almacén.

Ejemplos:

- Guardia
- Mesa de Control
- Supervisor
- Montacarguista
- Operador Logístico

---

## Actores Externos

Participan en la operación sin pertenecer al almacén.

Ejemplos:

- Cliente
- Proveedor
- Transportista
- Auditor Externo

---

## Actores del Sistema

Representan procesos automáticos ejecutados por CJWMS.

Ejemplos:

- Motor de Eventos
- Motor de Estados
- Operational Memory
- Executive Brain
- Operational Intelligence

---

# Actores Oficiales de OP-001

## Guardia

### Responsabilidades

- Recibir al transporte.
- Canalizar al operador.
- Informar el andén asignado.

### Utiliza CJWMS

No.

---

## Operador Logístico

### Responsabilidades

- Entregar documentación.
- Presentar identificación.
- Posicionar el transporte.
- Trasladar el vehículo al andén.

### Utiliza CJWMS

No.

---

## Mesa de Control

### Responsabilidades

- Registrar la llegada.
- Validar documentación.
- Validar identidad.
- Registrar incidencias.
- Notificar al cliente.
- Registrar decisiones.
- Asignar andén.
- Autorizar el inicio del proceso.

### Utiliza CJWMS

Sí.

Es el usuario principal durante OP-001.

---

## Cliente

### Responsabilidades

- Analizar incidencias.
- Autorizar excepciones.
- Rechazar recepciones cuando corresponda.

### Utiliza CJWMS

No en la operación actual.

La decisión es registrada por Mesa de Control.

---

## CJWMS

### Responsabilidades

- Registrar eventos.
- Actualizar estados.
- Generar trazabilidad.
- Calcular posición FIFO.
- Registrar fechas y horas.
- Actualizar indicadores.
- Alimentar la Arquitectura Cognitiva.

### Utiliza CJWMS

No aplica.

Representa la automatización del sistema.

---

# Relación Actor–Actividad

| Actor | Actividades principales |
|--------|-------------------------|
| Guardia | Recibir transporte, informar andén |
| Operador Logístico | Entregar documentos, mover vehículo |
| Mesa de Control | Registrar, validar, autorizar |
| Cliente | Autorizar o rechazar incidencias |
| CJWMS | Automatizar registros, trazabilidad e inteligencia |

---

# Relación Actor–Evento

| Actor | Eventos que puede generar o provocar |
|--------|--------------------------------------|
| Guardia | DRIVER_NOTIFIED |
| Operador Logístico | DOCUMENTS_RECEIVED, OPERATOR_ID_RECEIVED, VEHICLE_POSITIONED |
| Mesa de Control | ARRIVAL_REGISTERED, DOCUMENT_VALIDATION_STARTED, DOCK_ASSIGNED |
| Cliente | CUSTOMER_APPROVED, CUSTOMER_REJECTED |
| CJWMS | Eventos automáticos de trazabilidad, auditoría y actualización de indicadores |

---

# Relación Actor–Responsabilidad

| Actor | Responsable de la decisión |
|--------|----------------------------|
| Guardia | Control de acceso físico |
| Operador Logístico | Traslado del vehículo y entrega documental |
| Mesa de Control | Control administrativo y operativo |
| Cliente | Decisiones sobre incidencias |
| CJWMS | Automatización, coordinación y trazabilidad |

---

# Integración con la Arquitectura Cognitiva

Los actores representan la operación humana.

CJWMS registra sus acciones, interpreta los eventos generados y transforma esa información en conocimiento operativo.

La inteligencia no reemplaza al actor.

La inteligencia asiste al actor para tomar mejores decisiones.

---

# Principio Fundamental

Los procesos existen gracias a los actores.

Las actividades son ejecutadas por los actores.

Los eventos registran sus acciones.

Los estados reflejan el resultado de dichas acciones.

La Arquitectura Cognitiva aprende de toda la interacción.

---

# Estado

Documento oficial.

Versión 1.0

Fase 18 — Validación Operativa Integral.