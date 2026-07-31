# 1. Información General

| Campo                           | Información                                                                                                                                                |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Proceso Operativo**           | OP-010 — Embarque                                                                                                                                          |
| **Código de Auditoría**         | FAI-OP-010                                                                                                                                                 |
| **Framework Aplicado**          | Framework de Auditoría de Implementación (FAI)                                                                                                             |
| **Versión del Framework**       | Estándar Oficial vigente (9 secciones)                                                                                                                     |
| **Proyecto**                    | CJWMS — Cognitive Warehouse Management System                                                                                                              |
| **Modelo de Referencia**        | Cognitive Operational Model (COM)                                                                                                                          |
| **Tipo de Auditoría**           | Auditoría de Implementación basada en evidencia del repositorio                                                                                            |
| **Objeto Auditado**             | Implementación técnica del proceso OP-010 — Embarque                                                                                                       |
| **Fuente Oficial de Evidencia** | Código fuente del repositorio, arquitectura del sistema, servicios, repositorios, componentes, páginas, modelos de datos y documentación técnica existente |
| **Criterio de Evaluación**      | Correspondencia entre la especificación oficial de OP-010 y la implementación observable en el repositorio                                                 |
| **Metodología**                 | Inspección estática del código, análisis de arquitectura, revisión de flujo operativo, validación de persistencia, trazabilidad y cobertura funcional      |
| **Criterio de Evidencia**       | Únicamente se consideran implementaciones verificables mediante evidencia observable; no se realizan inferencias sobre funcionalidades no encontradas.     |
| **Resultado Esperado**          | Determinar el nivel real de implementación de OP-010 dentro del CJWMS e identificar objetivamente las funcionalidades implementadas, parciales o ausentes. |

## Alcance de la Auditoría

La presente auditoría comprende la verificación integral de todos los componentes del repositorio que participan en el proceso operativo **OP-010 — Embarque**, incluyendo, cuando exista evidencia de implementación:

- Interfaces de usuario (Pages y Components).
- Servicios de negocio.
- Repositorios de acceso a datos.
- Persistencia en Supabase.
- Flujo operativo.
- Estados operativos.
- Reglas de negocio.
- Trazabilidad.
- Evidencias operativas.
- Integración con el Modelo Operativo Cognitivo (COM).

La evaluación se limitará estrictamente a la evidencia técnica presente en el repositorio al momento de la inspección.

---

# 2. Objetivo

La presente auditoría tiene como objetivo determinar el nivel real de implementación del proceso operativo **OP-010 — Embarque** dentro del CJWMS, verificando exclusivamente mediante evidencia observable del repositorio la existencia, integración y funcionamiento de los componentes que soportan dicho proceso.

La evaluación comprende la revisión de interfaces de usuario, servicios, repositorios, persistencia, reglas de negocio, flujos operativos, trazabilidad, evidencias operativas e integración con el Modelo Operativo Cognitivo (COM), comparando la implementación técnica contra la especificación oficial del proceso.

Las conclusiones emitidas en esta auditoría se fundamentarán únicamente en evidencia verificable obtenida del código fuente y de la arquitectura del sistema, sin realizar inferencias sobre funcionalidades no implementadas o no observables.

El resultado permitirá establecer objetivamente el grado de cumplimiento de OP-010, identificar brechas de implementación y generar recomendaciones técnicas para alcanzar la conformidad con el Modelo Operativo Cognitivo del CJWMS.

---

# 3. Alcance

La presente auditoría comprende la revisión integral de la implementación técnica del proceso operativo **OP-010 — Embarque** dentro del CJWMS, considerando exclusivamente la evidencia observable disponible en el repositorio al momento de la inspección.

La evaluación incluye la verificación de los siguientes elementos, cuando formen parte de la implementación del proceso:

- Interfaces de usuario (Pages y Components).
- Servicios de negocio.
- Repositorios de acceso a datos.
- Persistencia en Supabase.
- Modelos y tipos de datos.
- Flujo operativo del proceso de embarque.
- Estados operativos involucrados.
- Reglas de negocio implementadas.
- Validaciones funcionales.
- Generación y consulta de movimientos.
- Actualización de inventario.
- Evidencias operativas y trazabilidad.
- Integración con procesos previos y posteriores del flujo operativo.
- Integración con el Modelo Operativo Cognitivo (COM).

La auditoría verificará la correspondencia entre la especificación oficial del proceso **OP-010 — Embarque** y su implementación técnica, identificando funcionalidades completamente implementadas, implementaciones parciales y componentes no implementados.

No forman parte del alcance de esta auditoría la evaluación del rendimiento, pruebas de carga, seguridad informática, calidad del código, experiencia de usuario o futuras funcionalidades que no se encuentren implementadas en el repositorio.

---

# 4. Inspección Técnica

## 4.1 Arquitectura del Proceso

La inspección técnica del repositorio permitió identificar que el proceso operativo **OP-010 — Embarque** no se encuentra implementado como un módulo independiente dentro del CJWMS. En su lugar, la funcionalidad observable corresponde a la ejecución de movimientos de tipo **`salida`**, integrados dentro de la arquitectura general de gestión de movimientos e inventario.

La implementación del proceso involucra principalmente los siguientes componentes:

| Capa         | Componentes identificados                                                                                |
| ------------ | -------------------------------------------------------------------------------------------------------- |
| Pages        | `MontacargasPage.tsx`, `MovementsPage.tsx`                                                               |
| Components   | `MovementFormModal.tsx`, `MovementsTable.tsx`                                                            |
| Services     | `movementWorkflowService.ts`, `movementService.ts`, `inventoryService.ts`, `operationalMemoryService.ts` |
| Repositories | `movementRepository.ts`                                                                                  |
| Persistencia | Tabla `movements`                                                                                        |
| Tipos        | `movement.ts`                                                                                            |

La arquitectura implementada concentra la lógica operativa en el servicio **movementWorkflowService**, responsable de coordinar la actualización del inventario, registrar el movimiento y generar la correspondiente Memoria Operativa.

---

## 4.2 Componentes Inspeccionados

Durante la auditoría fueron inspeccionados los siguientes componentes relacionados con el proceso de salida de mercancía:

### Interfaces de usuario

- `src/pages/MontacargasPage.tsx`
- `src/pages/MovementsPage.tsx`
- `src/components/MovementFormModal.tsx`
- `src/components/MovementsTable.tsx`

### Servicios

- `src/services/movementWorkflowService.ts`
- `src/services/movementService.ts`

### Persistencia

- `src/repositories/movementRepository.ts`

### Tipos de datos

- `src/types/movement.ts`

No se identificaron componentes específicos denominados **Embarque**, **Shipping**, **Dispatch**, **Outbound** o equivalentes que representen un proceso operativo independiente.

---

## 4.3 Flujo de Implementación Observado

La implementación observada corresponde al siguiente flujo técnico:

1. El usuario selecciona un movimiento de tipo **Salida** desde la interfaz de Movimientos o Montacargas.

2. El sistema solicita la captura de la información operativa correspondiente.

3. Para registrar una salida se verifican como datos obligatorios:

   - SKU / Producto.
   - Cantidad.
   - Operador.
   - Posición origen.

4. Una vez validada la información, el sistema construye el objeto del movimiento y ejecuta el servicio:

```text
executeMovementWorkflow()
```

5. Durante la ejecución del workflow se realiza la búsqueda del inventario asociado al pallet.

6. Si el movimiento corresponde a una **salida**, el inventario cambia su estado a:

```text
reserved
```

7. Posteriormente el movimiento es persistido en la tabla **movements**.

8. Finalmente se registra una Memoria Operativa que conserva la trazabilidad técnica del movimiento ejecutado.

No se observó una implementación que represente explícitamente un proceso de **embarque** independiente del movimiento de salida.

---

## 4.4 Persistencia

La persistencia del proceso utiliza la tabla **movements**.

Durante la inspección se verificó que el modelo almacena información correspondiente a:

- Almacén.
- Tipo de movimiento.
- Pallet.
- Producto.
- Posición origen.
- Posición destino.
- Operador.
- Unidad de montacargas.
- Cantidad.
- Unidad.
- Estado.
- Motivo.
- Notas.
- Decision Score.
- Explicación de la decisión.
- Recomendación asociada.
- Usuario creador.
- Fecha de creación.

Asimismo, el workflow registra una Memoria Operativa que conserva metadatos como:

- Tipo de movimiento.
- Warehouse.
- Pallet.
- Producto.
- Posición origen.
- Posición destino.
- Estado.
- Motivo.
- Score de decisión.

La implementación proporciona trazabilidad técnica del movimiento registrado.

---

## 4.5 Evidencia Operacional y Trazabilidad

La inspección permitió verificar la existencia de evidencia operacional correspondiente al registro de movimientos de salida.

Se observaron evidencias de:

- Captura manual del movimiento.
- Validación básica de datos obligatorios.
- Actualización del estado del inventario.
- Registro persistente del movimiento.
- Generación de Memoria Operativa.
- Conservación del historial del movimiento.

No se observó evidencia de implementación para elementos propios del proceso operativo de embarque, tales como:

- Orden de embarque.
- Folio de embarque.
- Cliente destinatario.
- Transportista.
- Unidad de transporte.
- Placas del vehículo.
- Andén de carga.
- Confirmación de carga.
- Hora de inicio o término del embarque.
- Documentación de embarque.
- Evidencias de entrega al transportista.
- Estado operativo "Embarcado" o equivalente.

En consecuencia, la trazabilidad implementada corresponde al movimiento logístico de salida y no al ciclo operativo completo de embarque.

---

## 4.6 Conclusiones Técnicas

Como resultado de la inspección técnica se concluye lo siguiente:

- Se identificó una implementación funcional para el registro de movimientos de tipo **salida** dentro del CJWMS.

- La lógica operativa se encuentra centralizada en el servicio `movementWorkflowService`, el cual coordina la actualización del inventario, el registro del movimiento y la generación de Memoria Operativa.

- La persistencia de la información se realiza mediante la tabla `movements`, conservando trazabilidad suficiente para el movimiento registrado.

- La interfaz de usuario permite registrar salidas mediante formularios operativos tanto en **MovementsPage** como en **MontacargasPage**.

- No se identificó un módulo específico para **OP-010 — Embarque** ni una implementación que modele el proceso operativo completo de embarque conforme a la especificación funcional del proceso.

- La evidencia observada corresponde a la implementación de movimientos logísticos de salida y no a un proceso independiente de embarque.

Las observaciones anteriores se fundamentan exclusivamente en la evidencia técnica inspeccionada en el repositorio y constituyen la base para la evaluación de cobertura y determinación del nivel oficial de implementación en las siguientes secciones de la auditoría.

---

# 5. Cobertura de las Dimensiones COM

| Dimensión             |    Nivel    | Evidencia Observada                                                                                                                                                                                                                                                                                                                                                                                                                | Evaluación Técnica                                                                                                               |
| --------------------- | :---------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **C — Cognitiva**     | **Parcial** | El sistema implementa reglas para el procesamiento de movimientos de salida mediante `movementWorkflowService`, incluyendo actualización del estado del inventario y registro de Memoria Operativa. Sin embargo, no se identificó un motor de decisiones específico para el proceso de embarque ni reglas cognitivas relacionadas con la selección de andén, validación documental, asignación de transporte o secuencia de carga. | Existe lógica cognitiva aplicada al movimiento logístico, pero no al proceso operativo completo de embarque.                     |
| **O — Operativa**     | **Parcial** | Se verificó la implementación funcional del movimiento de tipo **salida** desde las interfaces `MontacargasPage` y `MovementFormModal`, permitiendo registrar el retiro de mercancía desde una ubicación de origen. No se observó una implementación específica del flujo operativo de embarque ni de sus actividades asociadas.                                                                                                   | El sistema soporta la salida de inventario, pero no modela integralmente el proceso de embarque definido en el Modelo Operativo. |
| **M — Medible**       | **Parcial** | El movimiento registra información cuantificable como cantidad, unidad, operador, fecha, pallet, producto y Decision Score. No se identificaron indicadores específicos del proceso de embarque, tales como tiempos de carga, productividad del embarque, cumplimiento de despacho o desempeño por andén.                                                                                                                          | Se dispone de métricas del movimiento, pero no de indicadores propios del proceso de embarque.                                   |
| **T — Trazable**      |  **Alta**   | La implementación registra los movimientos en la tabla `movements` y genera una Memoria Operativa con información del movimiento ejecutado, conservando datos del pallet, producto, posiciones, estado y metadatos asociados.                                                                                                                                                                                                      | La trazabilidad del movimiento de salida se encuentra implementada y permite reconstruir la ejecución registrada.                |
| **A — Automatizable** | **Parcial** | El workflow automatiza el cambio de estado del inventario, el registro del movimiento y la generación de Memoria Operativa. No se observaron automatizaciones específicas para la gestión integral del embarque, como validaciones documentales, liberación automática del despacho o confirmación del transporte.                                                                                                                 | Existe automatización del movimiento logístico, pero no del proceso completo de embarque.                                        |

## Resumen de Cobertura COM

| Dimensión     | Cobertura |
| ------------- | --------- |
| Cognitiva     | Parcial   |
| Operativa     | Parcial   |
| Medible       | Parcial   |
| Trazable      | Alta      |
| Automatizable | Parcial   |

## Conclusión

La evidencia inspeccionada demuestra que el CJWMS implementa satisfactoriamente la gestión técnica de movimientos de tipo **salida**, proporcionando persistencia, trazabilidad y automatización básica del flujo logístico correspondiente.

No obstante, la implementación observada no constituye un módulo operativo completo para **OP-010 — Embarque**, ya que no se identificaron componentes específicos que modelen actividades propias del proceso de embarque, tales como la administración del transporte, control de andenes, documentación de despacho, validación de carga o confirmación formal del embarque.

En consecuencia, la cobertura de las Dimensiones COM corresponde principalmente a la implementación del movimiento logístico de salida, presentando una cobertura parcial respecto al proceso operativo integral definido para OP-010.

---

# 6. Nivel Oficial de Implementación

## Evaluación General

Con base en la evidencia técnica observada durante la inspección del repositorio, se determina que el proceso **OP-010 — Embarque** presenta una **implementación parcial**, sustentada principalmente en la infraestructura existente para el registro y gestión de movimientos de tipo **salida**.

La implementación identificada proporciona capacidades funcionales para registrar la extracción de mercancía del inventario, actualizar el estado del inventario asociado, persistir el movimiento en la base de datos y generar trazabilidad mediante la Memoria Operativa.

No obstante, la evidencia inspeccionada no permitió identificar una implementación específica que modele el proceso operativo integral de embarque conforme a la especificación oficial de OP-010.

---

## Nivel por Componente

| Componente                       |    Nivel     |
| -------------------------------- | :----------: |
| Interfaces de usuario            | Implementado |
| Registro de movimientos          | Implementado |
| Persistencia                     | Implementado |
| Actualización de inventario      | Implementado |
| Trazabilidad                     | Implementado |
| Memoria Operativa                | Implementado |
| Flujo operativo de salida        | Implementado |
| Proceso específico de embarque   | No observado |
| Gestión documental del embarque  | No observado |
| Administración del transporte    | No observado |
| Control de andenes               | No observado |
| Confirmación formal del embarque | No observado |

---

## Nivel Oficial

**Nivel Oficial de Implementación: PARCIAL**

La clasificación **PARCIAL** se fundamenta en que el sistema implementa correctamente la infraestructura técnica necesaria para registrar movimientos logísticos de salida, pero dicha implementación no constituye, con base en la evidencia observada, un proceso operativo completo de embarque.

Las funcionalidades implementadas corresponden principalmente al registro del movimiento, actualización del inventario y trazabilidad operativa, mientras que los componentes propios del proceso de embarque no fueron identificados durante la inspección técnica.

---

## Fundamentación

La clasificación anterior se sustenta en las siguientes observaciones verificadas:

- Existe soporte para movimientos de tipo **salida**.
- El inventario es actualizado durante la ejecución del workflow.
- Los movimientos son persistidos en la tabla `movements`.
- Se genera Memoria Operativa para conservar la trazabilidad técnica.
- Las interfaces permiten registrar movimientos de salida desde la operación.

Durante la auditoría no se observó evidencia de implementación para funcionalidades específicas del proceso de embarque, incluyendo administración del transporte, control de andenes, documentación de embarque, confirmación de carga o cierre formal del proceso operativo.

En consecuencia, el nivel oficial asignado refleja el estado real de implementación observable en el repositorio al momento de la auditoría.

---

# 7. Brechas de Implementación

## Brechas Identificadas

Como resultado de la inspección técnica del repositorio, se identificaron las siguientes brechas entre la especificación oficial del proceso **OP-010 — Embarque** y la implementación observable del CJWMS.

| Área                       | Brecha observada                                                                                                                                       | Impacto                                                                               |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| Proceso Operativo          | No se identificó un módulo específico para OP-010 — Embarque; la funcionalidad implementada corresponde al registro de movimientos de tipo **salida**. | El proceso operativo de embarque no se encuentra modelado de manera independiente.    |
| Gestión del Transporte     | No se observó el registro de información relacionada con transportista, unidad de transporte, operador del vehículo o placas.                          | No existe trazabilidad del medio de transporte asociado al embarque.                  |
| Control de Andenes         | No se identificó evidencia de administración o asignación de andenes de carga.                                                                         | El proceso de carga física no puede ser gestionado desde el sistema.                  |
| Documentación de Embarque  | No se observaron estructuras para registrar folios, órdenes o documentos de embarque.                                                                  | No existe control documental del despacho de mercancía.                               |
| Confirmación del Embarque  | No se identificó una etapa formal de confirmación de carga o cierre del embarque.                                                                      | La salida registrada no representa el cierre operativo completo del proceso.          |
| Estados Operativos         | El workflow cambia el inventario al estado **reserved**, pero no se observó un estado equivalente a **embarcado**, **despachado** o similar.           | El estado operativo final del embarque no queda representado en el modelo de datos.   |
| Indicadores Operativos     | No se observaron indicadores específicos para el proceso de embarque, como tiempos de carga, productividad o cumplimiento de despacho.                 | No es posible evaluar el desempeño del proceso de embarque mediante métricas propias. |
| Automatización del Proceso | No se identificaron automatizaciones específicas para validaciones documentales, liberación del embarque o confirmación automática del despacho.       | El proceso operativo depende únicamente del registro manual del movimiento de salida. |

---

## Análisis de Impacto

Las brechas identificadas no afectan la capacidad del sistema para registrar movimientos de salida ni la actualización del inventario correspondiente.

Sin embargo, limitan la implementación del proceso **OP-010 — Embarque** como una entidad operativa completa dentro del Modelo Operativo Cognitivo (COM), ya que actividades fundamentales del embarque no se encuentran representadas mediante componentes, flujos o estructuras específicas observables en el repositorio.

---

## Conclusión

Las brechas documentadas corresponden exclusivamente a funcionalidades que no fueron identificadas durante la inspección técnica del repositorio.

Su identificación no implica una evaluación negativa del sistema, sino que constituye el resultado objetivo de comparar la implementación observable con la especificación oficial del proceso operativo **OP-010 — Embarque**, proporcionando la base técnica para las recomendaciones de mejora incluidas en la siguiente sección.

---

# 8. Recomendaciones Técnicas

## Recomendaciones Prioritarias

Con base en las brechas identificadas durante la auditoría de implementación, se recomienda incorporar progresivamente las siguientes capacidades para alcanzar la implementación integral del proceso **OP-010 — Embarque** dentro del CJWMS.

| Prioridad | Recomendación                                                                                                             | Objetivo                                                                                        |
| --------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Alta      | Implementar un módulo específico para **OP-010 — Embarque** independiente del registro genérico de movimientos de salida. | Modelar el proceso operativo completo de embarque conforme al Modelo Operativo Cognitivo (COM). |
| Alta      | Incorporar una entidad de **Embarque** con su identificador único y ciclo de vida operativo.                              | Permitir la administración independiente de cada embarque y su trazabilidad completa.           |
| Alta      | Registrar información del transporte (transportista, operador, unidad y placas).                                          | Integrar la trazabilidad logística del despacho de mercancía.                                   |
| Alta      | Implementar la administración de andenes de carga.                                                                        | Controlar la asignación y utilización de posiciones de embarque durante la operación.           |
| Alta      | Incorporar la gestión documental del embarque (folio, orden de embarque y documentos asociados).                          | Garantizar el control documental del proceso de salida de mercancía.                            |
| Media     | Implementar un estado operativo específico para mercancía embarcada.                                                      | Diferenciar claramente el proceso de salida del proceso concluido de embarque.                  |
| Media     | Incorporar indicadores operativos específicos del embarque.                                                               | Medir productividad, tiempos de carga, cumplimiento de despacho y desempeño operativo.          |
| Media     | Automatizar validaciones previas al cierre del embarque.                                                                  | Reducir errores operativos y fortalecer la consistencia del proceso.                            |
| Baja      | Integrar el proceso de embarque con paneles ejecutivos e indicadores estratégicos del CJWMS.                              | Incorporar el desempeño del embarque dentro del análisis operativo y ejecutivo del sistema.     |

---

## Prioridad de Implementación

Se recomienda abordar las mejoras conforme al siguiente orden de prioridad:

### Fase 1 — Modelado Operativo

- Crear la entidad operativa **Embarque**.
- Definir estados operativos del embarque.
- Incorporar el flujo operativo específico.

### Fase 2 — Integración Logística

- Gestión del transporte.
- Administración de andenes.
- Control documental.
- Confirmación formal del embarque.

### Fase 3 — Inteligencia Operativa

- Indicadores específicos del proceso.
- Automatizaciones cognitivas.
- Integración con el Centro Ejecutivo.
- Reglas inteligentes para validación y liberación del embarque.

---

## Conclusión

Las recomendaciones anteriores tienen como propósito evolucionar la implementación actual, basada en movimientos de tipo **salida**, hacia una representación completa del proceso **OP-010 — Embarque**, manteniendo la arquitectura del CJWMS alineada con el Modelo Operativo Cognitivo (COM).

Su implementación permitirá fortalecer la trazabilidad logística, incrementar el nivel de automatización del proceso y proporcionar una representación operativa integral del ciclo de embarque dentro del sistema.

---

# 9. Dictamen Oficial

## Resultado de la Auditoría

Con fundamento en la evidencia técnica obtenida durante la inspección del repositorio del CJWMS, se concluye que el proceso **OP-010 — Embarque** presenta una **implementación parcial**.

La auditoría confirmó la existencia de una infraestructura funcional para la gestión de movimientos de tipo **salida**, integrada con los servicios de inventario, persistencia en Supabase y generación de Memoria Operativa. Asimismo, se verificó la disponibilidad de interfaces de usuario para registrar dichos movimientos y conservar su trazabilidad técnica.

No obstante, la evidencia observada no permitió identificar una implementación específica que represente el proceso operativo integral de **Embarque** conforme a la especificación oficial del Modelo Operativo Cognitivo (COM). Las funcionalidades implementadas corresponden al registro y control de movimientos logísticos de salida, sin incorporar componentes propios de la gestión del embarque, como la administración del transporte, control de andenes, documentación de despacho o confirmación formal del embarque.

---

## Clasificación Oficial

| Criterio                                | Resultado                                                                        |
| --------------------------------------- | -------------------------------------------------------------------------------- |
| Estado de implementación                | **Parcial**                                                                      |
| Nivel de evidencia                      | **Verificado mediante inspección del repositorio**                               |
| Cobertura funcional                     | **Movimiento de salida implementado; proceso integral de embarque no observado** |
| Cumplimiento respecto al proceso OP-010 | **Parcial**                                                                      |

---

## Fundamentación

El presente dictamen se sustenta exclusivamente en la evidencia técnica observable obtenida durante la auditoría, incluyendo la revisión de componentes, servicios, repositorios, estructuras de datos, persistencia y flujos operativos implementados.

No se realizaron inferencias sobre funcionalidades no presentes en el repositorio ni se consideraron especificaciones documentales como evidencia de implementación.

---

## Dictamen Final

Se dictamina que el CJWMS dispone de una implementación funcional para la gestión de movimientos de salida de inventario, la cual constituye una base sólida para el proceso de despacho de mercancías.

Sin embargo, de acuerdo con la evidencia inspeccionada, el proceso **OP-010 — Embarque** aún no se encuentra implementado como un proceso operativo independiente y completo conforme al Modelo Operativo Cognitivo (COM).

En consecuencia, el **Nivel Oficial de Implementación** del proceso **OP-010 — Embarque** se establece como:

# **IMPLEMENTACIÓN PARCIAL**

Este dictamen corresponde al estado del repositorio auditado en la fecha de realización de la presente auditoría y constituye el resultado oficial del proceso **FAI-OP-010 — Embarque**.