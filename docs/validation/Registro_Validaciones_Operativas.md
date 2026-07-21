# 📋 Registro de Validaciones Operativas

> **Versión:** 1.0 (Fundacional)  
> **Estado:** En construcción  
> **Proyecto:** CJWMS – Collaborative Journey Warehouse Management System

---

# Propósito

Este documento registra todas las validaciones realizadas con la operación real del almacén.

Cada validación documenta una decisión funcional confirmada con personal operativo, supervisores o responsables del almacén.

Su objetivo es asegurar que el comportamiento de CJWMS represente fielmente la realidad operativa y que ninguna funcionalidad importante sea implementada sobre supuestos no validados.

---

# Metodología

Cada validación seguirá el mismo formato.

- Identificador único.
- Pregunta de validación.
- Contexto.
- Respuesta oficial.
- Impacto en CJWMS.
- Estado.

---

# Estados

| Estado | Significado |
|---------|-------------|
| ⏳ | Pendiente |
| ✅ | Validada |
| 🔄 | En revisión |

---

# Validaciones

---

## FV-001

### Pregunta

¿La Recepción se registra por camión completo o por cada Unidad Logística?

### Contexto

Durante la definición de OP-002 (Recepción) surgió la necesidad de conocer cómo inicia oficialmente el proceso operativo dentro del almacén.

### Respuesta oficial

La Recepción se registra una sola vez por cada llegada de mercancía (camión).

Dentro de una misma Recepción pueden existir una o varias Unidades Logísticas.

### Impacto en CJWMS

Definirá el modelo de Recepción utilizado por el sistema y la relación entre Recepción y Unidad Logística.

### Estado

✅ Validada

---

## FV-002

### Pregunta

¿Quién asigna al montacarguista el pallet que debe mover?

### Contexto

Durante la validación del flujo de almacenamiento se identificó la necesidad de conocer quién dirige la ejecución de las misiones operativas.

### Respuesta oficial

Supervisor.

### Impacto en CJWMS

Confirma que el Executive Brain colaborará inicialmente con el Supervisor y no sustituirá la autoridad operativa.

### Estado

✅ Validada

---

## FV-003

### Pregunta

¿Qué tipos de racks utiliza actualmente el almacén?

### Contexto

Durante el modelado físico del almacén se verificó la infraestructura utilizada.

### Respuesta oficial

Drive In y Rack Selectivo.

### Impacto en CJWMS

El modelo inicial del sistema se enfocará exclusivamente en estos dos tipos de almacenamiento.

### Estado

✅ Validada

---

# FV-002

## Pregunta

¿Cómo recibe el montacarguista la información necesaria para ejecutar una misión operativa?

---

## Contexto

Durante el modelado del flujo colaborativo entre Supervisor, Montacarguista y CJWMS surgió la necesidad de validar cómo trabaja actualmente el operador una vez que recibe una misión.

Hasta ese momento se había asumido que la asignación era únicamente verbal.

---

## Respuesta oficial

El supervisor entrega al montacarguista una hoja impresa donde se indican las ubicaciones y los movimientos que debe realizar.

Durante la ejecución de la misión, el operador utiliza esa hoja para registrar observaciones, detalles y cualquier información relevante del movimiento.

---

## Impacto en CJWMS

CJWMS sustituirá progresivamente la hoja operativa por una Misión Operativa Digital.

La nueva misión conservará toda la información que actualmente registra el operador en papel, permitiendo:

- Consultar la misión en tiempo real.
- Confirmar cada movimiento realizado.
- Registrar observaciones digitales.
- Alimentar automáticamente Operational Memory.
- Enviar información al Executive Brain.
- Actualizar los indicadores del Centro Ejecutivo sin intervención manual.

El objetivo no es modificar el proceso operativo, sino digitalizar la herramienta que actualmente utiliza el montacarguista.

---

## Estado

✅ Validada

---

# FV-003

## Pregunta

¿Quién realiza normalmente la inspección de la mercancía?

---

## Respuesta oficial

La inspección es realizada por el Supervisor.

---

## Impacto en CJWMS

El Supervisor será el responsable de aprobar o registrar observaciones durante la inspección.

---

## Estado

✅ Validada

---

# FV-004

## Pregunta

¿Qué se revisa durante la inspección?

---

## Respuesta oficial

Se revisan:

- Cantidad.
- Estado físico.
- Lote.
- Caducidad.
- Etiquetas.

---

## Impacto en CJWMS

La pantalla de Inspección deberá permitir registrar cada uno de estos elementos.

---

## Estado

✅ Validada

---

# FV-005

## Pregunta

¿Qué sucede cuando existe mercancía dañada?

---

## Respuesta oficial

La mercancía se recibe con observaciones.

---

## Impacto en CJWMS

La Inspección deberá permitir registrar observaciones sin rechazar automáticamente la mercancía.

---

## Estado

✅ Validada

---

# FV-006

## Pregunta

¿Dónde se realiza la inspección y cuál es el flujo posterior?

---

## Respuesta oficial

La mercancía se descarga en el Área de Recepción.

El Supervisor realiza la inspección.

Si existen observaciones, se registran.

Posteriormente el Supervisor asigna la ubicación.

El montacarguista recibe la Hoja Operativa y traslada la mercancía a dicha ubicación.

---

## Impacto en CJWMS

CJWMS deberá considerar el Área de Recepción como la zona inicial de trabajo antes del almacenamiento definitivo.

La Hoja Operativa se genera una vez aprobada la inspección y asignada la ubicación.

---

## Estado

✅ Validada

---

# FV-007

## Pregunta

¿Cómo recibe el montacarguista la información necesaria para ejecutar una misión?

---

## Respuesta oficial

El Supervisor entrega una Hoja Operativa donde se indican los detalles y la ubicación asignada para la mercancía.

---

## Impacto en CJWMS

CJWMS deberá modelar la Hoja Operativa como el medio mediante el cual las decisiones del Supervisor se convierten en tareas ejecutables.

En versiones futuras esta Hoja Operativa podrá evolucionar hacia una Misión Operativa Digital.

---

## Estado

✅ Validada

---

# FV-008

## Pregunta

¿Cuál es el flujo operativo dentro del Área de Recepción?

---

## Respuesta oficial

La mercancía se descarga en el Área de Recepción.

El Supervisor realiza la Recepción y la Inspección.

Si existen incidencias, registra observaciones.

Posteriormente asigna la ubicación definitiva y entrega la Hoja Operativa al montacarguista para ejecutar el traslado.

---

## Impacto en CJWMS

El Área de Recepción se modela como la primera etapa operativa del almacén y concentra todas las actividades previas al almacenamiento definitivo.

---

## Estado

✅ Validada

---

## Resultado

Flujo operativo validado y documentado como base oficial para el modelado del proceso de entrada de mercancía en CJWMS.

---


