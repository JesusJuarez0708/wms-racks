# Arquitectura Operativa CJWMS
## Cognitive Warehouse Management System

---

# Propósito

Este documento describe la Arquitectura Operativa oficial de CJWMS.

A diferencia de la Arquitectura Cognitiva, que define cómo razona la plataforma, este documento describe cómo opera CJWMS durante la ejecución real de los procesos logísticos de un almacén.

La Arquitectura Operativa representa la relación entre:

- Los procesos del negocio.
- Los actores involucrados.
- Los eventos operativos.
- Los estados de cada proceso.
- Las reglas de negocio.
- La interacción con la Arquitectura Cognitiva.

Este documento se construye progresivamente durante la **Fase 18 — Validación Operativa Integral (VOI)** y se convertirá en la referencia oficial del comportamiento operativo de la plataforma.

---

# Objetivos

La Arquitectura Operativa tiene como objetivos:

- Representar fielmente la operación real de un almacén.
- Servir como puente entre la operación y la tecnología.
- Garantizar que cada funcionalidad tenga una justificación operativa.
- Facilitar futuras implantaciones de CJWMS.
- Mantener la coherencia con la Arquitectura Cognitiva.

---

# Principios Operativos

## 1. La operación define el sistema

CJWMS se desarrolla a partir de procesos operativos reales y no a partir de pantallas o funcionalidades aisladas.

---

## 2. Cada funcionalidad responde a un Evento Operativo

Toda funcionalidad implementada deberá estar asociada a un Evento Operativo previamente validado.

---

## 3. La Arquitectura Cognitiva complementa la operación

Los motores inteligentes participan como apoyo a la toma de decisiones, pero nunca sustituyen el flujo operativo del almacén.

---

## 4. Un proceso puede involucrar múltiples componentes

Un mismo proceso operativo puede utilizar varias pantallas, servicios, tablas de base de datos y motores cognitivos.

---

## 5. La trazabilidad inicia desde el primer evento

La operación comienza con la llegada del transporte al almacén y finaliza con el cierre completo del proceso logístico.

---

# Macroprocesos Operativos

La Arquitectura Operativa de CJWMS se organiza en los siguientes macroprocesos:

## A. Recepción de Mercancía

Estado: 🔄 En construcción

Eventos Operativos:

- OP-001 Llegada del Transporte
- OP-002 Descarga
- OP-003 Validación de Recepción
- OP-004 Inspección
- OP-005 Paletización
- OP-006 Etiquetado
- OP-007 Asignación de Ubicación
- OP-008 Confirmación de Almacenamiento

---

## B. Operación Interna

Estado: ⏳ Pendiente de validación

---

## C. Salidas

Estado: ⏳ Pendiente de validación

---

## D. Inteligencia Operativa

Estado: ⏳ Pendiente de validación

---

# Relación con la Arquitectura Cognitiva

Cada Evento Operativo podrá generar información que será consumida por los diferentes componentes cognitivos de CJWMS, permitiendo que la plataforma genere análisis, recomendaciones, predicciones y apoyo a la toma de decisiones ejecutivas.

La integración entre la Arquitectura Operativa y la Arquitectura Cognitiva constituye el fundamento de CJWMS como Plataforma de Inteligencia Operativa.

---

# Estado del Documento

**Versión:** 0.1 (Documento Vivo)

**Estado:** En construcción.

Este documento será actualizado conforme avance la validación de cada Evento Operativo durante la Fase 18.

---

# OP-001 — Llegada del Transporte

---

## Objetivo

Controlar el ingreso de un transporte al almacén desde su llegada hasta la autorización para iniciar la descarga, garantizando la trazabilidad del proceso y el cumplimiento de las validaciones operativas.

---

# Actores

| Actor | Participación | Utiliza CJWMS |
|---------|---------------|---------------|
| Guardia | Recibe al transporte y dirige al operador | No |
| Operador Logístico | Entrega documentación y mueve el vehículo | No |
| Mesa de Control | Registra, valida y autoriza | Sí |
| Cliente | Autoriza incidencias cuando existen excepciones | No (en la operación actual) |

---

# Flujo Operativo Oficial

```text
                LLEGADA DEL TRANSPORTE
                         │
                         ▼
        Guardia recibe al operador logístico
                         │
                         ▼
      Operador entrega documentación e identificación
                         │
                         ▼
      Mesa de Control registra la llegada en CJWMS
                         │
                         ▼
 Mesa de Control valida documentación e identificación
                         │
                         ▼
        ¿Existe alguna incidencia documental?
               ┌─────────┴─────────┐
               │                   │
             NO                    SÍ
               │                   │
               ▼                   ▼
      Asigna andén         Registra incidencia
               │                   │
               ▼                   ▼
     Guardia informa        Notifica al cliente
       al operador                  │
               │                   ▼
               │       Cliente autoriza decisión
               │                   │
               └─────────┬─────────┘
                         ▼
               Asignación de andén
                         │
                         ▼
        Operador mueve el transporte
                         │
                         ▼
                Inicio de descarga
```

---

# Reglas de Negocio

## RN-001

Todo transporte deberá registrarse antes de ingresar al área de descarga.

---

## RN-002

Mesa de Control será el único usuario responsable de registrar y autorizar la llegada.

---

## RN-003

La atención de transportes seguirá la política FIFO (First In, First Out).

---

## RN-004

El operador deberá presentar:

- Documentación de la carga.
- Licencia o identificación oficial (INE).

---

## RN-005

Si existe cualquier inconsistencia documental o física, Mesa de Control registrará la incidencia y solicitará la autorización del cliente antes de continuar.

---

# Información capturada por CJWMS

Durante este proceso se registra, como mínimo:

### Transporte

- Empresa transportista
- Placas

### Operador

- Nombre
- Tipo de identificación presentada

### Documentación

- Tipo de documento
- Número o folio

### Recepción

- Fecha y hora de llegada
- Andén asignado
- Estado de la recepción

---

# Eventos Cognitivos Generados

Al concluir correctamente este proceso, CJWMS genera los siguientes eventos operativos:

- Transporte registrado
- Recepción creada
- Andén asignado
- Inicio del proceso de recepción

Estos eventos podrán ser utilizados posteriormente por los componentes de Inteligencia Operativa y Arquitectura Cognitiva.

---

# Brechas Detectadas

BO-001 — Control de Llegadas.

BO-002 — Separación entre validación física y validación documental.

BO-003 — Control de identidad del operador.

BO-004 — Gestión de incidencias.

---

# Estado

✅ Validado funcionalmente.

Pendiente de implementación técnica durante la Fase 18.

---

