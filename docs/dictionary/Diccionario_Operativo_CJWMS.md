# 📘 Diccionario Operativo CJWMS

> **Versión:** 1.0 (Fundacional)  
> **Estado:** En construcción  
> **Proyecto:** CJWMS – Collaborative Journey Warehouse Management System

---

# Propósito

El Diccionario Operativo CJWMS establece el lenguaje oficial del sistema.

Su objetivo es garantizar que operadores, supervisores, directivos, consultores, desarrolladores y el Executive Brain utilicen las mismas definiciones para describir la operación logística.

Este documento forma parte de la arquitectura funcional de CJWMS y será la referencia oficial para:

- Operación diaria.
- Desarrollo del sistema.
- Manuales.
- Capacitación.
- Implantaciones.
- Inteligencia Artificial.

---

# Principios

Este documento sigue los siguientes principios:

1. Cada término tiene una única definición oficial.
2. Toda nueva funcionalidad deberá utilizar este lenguaje.
3. Ningún término podrá tener significados distintos dentro del proyecto.
4. Toda definición deberá representar la realidad operativa del almacén.
5. El Diccionario evoluciona junto con CJWMS.

---

# Estructura de cada término

Cada concepto documentado utilizará la siguiente estructura:

- Categoría
- Definición
- Propósito
- Responsable principal
- Utilizado en
- Reglas principales
- Relación con Executive Brain
- Relación con Operational Memory
- Relación con el Centro Ejecutivo
- Relación con otros términos

---

# Índice Maestro

El siguiente índice contiene los conceptos oficiales del lenguaje de CJWMS.

Los códigos identifican de forma única cada término y permiten referenciarlo desde la documentación, los manuales, la arquitectura y el sistema.

---

# 📘 Operativos (OP)

| Código | Estado | Concepto |
|---------|:------:|----------|
| OP-001 | ✅ | Unidad Logística |
| OP-002 | ⏳ | Recepción |
| OP-003 | ⏳ | Inspección |
| OP-004 | ⏳ | Staging |
| OP-005 | ⏳ | Rack |
| OP-006 | ⏳ | Rack Selectivo |
| OP-007 | ⏳ | Drive In |
| OP-008 | ⏳ | Ubicación |
| OP-009 | ⏳ | Línea |
| OP-010 | ⏳ | Carril |
| OP-011 | ⏳ | Profundidad |
| OP-012 | ⏳ | Supervisor |
| OP-013 | ⏳ | Montacarguista |
| OP-014 | ⏳ | Misión Operativa |
| OP-015 | ⏳ | Hoja Operativa |

---

# 🧠 Inteligencia (IA)

| Código | Estado | Concepto |
|---------|:------:|----------|
| IA-001 | ⏳ | Executive Brain |
| IA-002 | ⏳ | Executive Insight |
| IA-003 | ⏳ | Operational Memory |
| IA-004 | ⏳ | Inteligencia Colaborativa |

---

# 📊 Ejecutivos (EJ)

| Código | Estado | Concepto |
|---------|:------:|----------|
| EJ-001 | ⏳ | Centro Ejecutivo |
| EJ-002 | ⏳ | Salud Operativa |
| EJ-003 | ⏳ | Riesgo Operativo |
| EJ-004 | ⏳ | Prioridad Estratégica |

---

# 📋 Funcionalidad Validada (FV)

| Código | Estado | Concepto |
|---------|:------:|----------|
| FV-001 | ✅ | Modelo de Recepción por Camión |
| FV-002 | ✅ | Flujo de Ejecución mediante Hoja Operativa |

---

## Estados

- ✅ Documentado
- ⏳ Pendiente de documentar
- 🔄 En revisión
- 🚀 Evolucionado

---

## Inteligencia

*(Pendiente de construcción)*

---

## Ejecutivos

*(Pendiente de construcción)*

---

> "Un sistema inteligente comienza cuando todas las personas hablan el mismo idioma.
> El Diccionario Operativo CJWMS define ese idioma para la operación, la tecnología y la inteligencia artificial."

---

# Término OP-001

# Unidad Logística

## Categoría

📘 Operativo

---

## Definición

Unidad física de manipulación sobre la que trabaja CJWMS durante toda la operación logística.

Representa el elemento que se mueve, almacena, reubica, surte, inventaría y embarca.

Normalmente corresponde a un pallet completo, aunque puede representar otra unidad logística definida por la operación.

---

## Propósito

Permitir la trazabilidad completa de la mercancía desde la recepción hasta el embarque.

---

## Responsable principal

Montacarguista.

---

## Utilizado en

- Recepción
- Inspección
- Staging
- Almacenamiento
- Reubicación
- Picking
- Embarque
- Inventarios

---

## Reglas principales

- Tiene un identificador único.
- Pertenece a un cliente.
- Contiene uno o varios productos.
- Mantiene un estado operativo.
- Puede cambiar de ubicación sin perder su identidad.

---

## Relación con Executive Brain

Es la unidad sobre la cual el Executive Brain genera recomendaciones y misiones.

---

## Relación con Operational Memory

Registra toda la historia operativa de la Unidad Logística.

---

## Relación con el Centro Ejecutivo

Alimenta indicadores de:

- Productividad.
- Ocupación.
- Rotación.
- Riesgo.
- Trazabilidad.

---

## Relación con otros términos

- Misión Operativa.
- Staging.
- Rack.
- Ubicación.
- Supervisor.

---

# OP-002

# Recepción

**Categoría:** Operativo

**Estado:** Oficial

**Versión:** 1.0

---

## Definición

Proceso mediante el cual CJWMS registra el ingreso formal de una o más Unidades Logísticas al almacén, iniciando su trazabilidad operativa.

La Recepción marca el momento en que la mercancía pasa a formar parte de la operación controlada por el sistema.

---

## Propósito

Garantizar que toda mercancía ingresada al almacén quede registrada, identificada y disponible para continuar con las siguientes etapas del proceso logístico.

---

## Responsable principal

Supervisor de Recepción.

---

## Utilizado en

- Llegada de mercancía
- Registro de ingreso
- Inicio de trazabilidad
- Asignación de proceso
- Integración con inspección

---

## Reglas principales

- Toda Recepción inicia con una llegada física de mercancía.
- La descarga ocurre antes de la Recepción.
- Cada Recepción corresponde al ingreso de un camión o evento de llegada de mercancía.
- Una Recepción puede contener una o varias Unidades Logísticas.
- Todas las Unidades Logísticas pertenecientes a una Recepción comparten el mismo registro de ingreso.
- Cada Recepción genera un registro único dentro del sistema.
- Ninguna Unidad Logística puede continuar hacia Inspección sin haber sido recibida.
- Toda mercancía descargada permanece temporalmente en el Área de Recepción hasta concluir la inspección.

---

## Relación con Executive Brain

Permite analizar carga de trabajo, productividad de recepción y tiempos de ingreso.

---

## Relación con Operational Memory

Registra el inicio del historial operativo de cada Recepción.

---

## Relación con el Centro Ejecutivo

Alimenta indicadores relacionados con:

- Volumen recibido.
- Productividad.
- Tiempo de recepción.
- Cumplimiento operativo.

---

## Relación con otros términos

- OP-001 Unidad Logística
- OP-003 Inspección
- OP-004 Staging
- OP-012 Supervisor

---

# OP-003 — Inspección

## Código

OP-003

---

## Definición

La Inspección es el proceso mediante el cual se verifica que la mercancía recibida cumple con las condiciones necesarias para ingresar al almacén.

Durante esta etapa se valida físicamente la Unidad Logística antes de autorizar su continuidad hacia la siguiente etapa del proceso.

---

## Objetivo

Garantizar que únicamente la mercancía aceptada continúe dentro del flujo operativo del almacén.

---

## Validaciones realizadas

Durante la inspección se verifica:

- Cantidad recibida.
- Estado físico.
- Lote.
- Fecha de caducidad.
- Etiquetas de identificación.

---

## Participantes

- Supervisor.
- Personal de Inspección o Calidad.
- Montacarguista (cuando aplica).

---

## Entradas

- Recepción registrada.
- Unidad Logística descargada.

---

## Salidas

- Mercancía aprobada.
- Mercancía rechazada.
- Observaciones de inspección.

---

## Reglas principales

- Ninguna Unidad Logística puede avanzar sin haber sido inspeccionada.
- Toda Inspección pertenece a una Recepción.
- El resultado de la Inspección determina el siguiente paso operativo.
- La inspección se realiza en el Área de Recepción antes de asignar la ubicación definitiva.

---

## Relación con Executive Brain

Permite medir calidad de recepción, incidencias y porcentaje de aceptación.

---

## Relación con Operational Memory

Conserva el historial de inspecciones realizadas.

---

## Relación con el Centro Ejecutivo

Alimenta indicadores de:

- Calidad.
- Incidencias.
- Rechazos.
- Productividad.

---

## Relación con otros términos

- Recepción.
- Unidad Logística.
- Supervisor.
- Staging.

---

# OP-015 — Hoja Operativa

## Código

OP-015

---

## Definición

La Hoja Operativa es el documento utilizado por el Supervisor para comunicar al montacarguista la misión operativa que debe ejecutar.

Contiene la información necesaria para trasladar una Unidad Logística desde el Área de Recepción hasta la ubicación asignada dentro del almacén.

---

## Objetivo

Garantizar que el montacarguista ejecute correctamente la misión asignada por el Supervisor.

---

## Responsable de emisión

Supervisor.

---

## Usuario principal

Montacarguista.

---

## Información mínima

La Hoja Operativa puede contener, entre otros datos:

- Número de misión.
- Fecha y hora.
- Producto.
- Lote.
- Cantidad.
- Unidad Logística.
- Ubicación destino.
- Observaciones.
- Nombre del Supervisor.

---

## Momento de generación

La Hoja Operativa se genera una vez que:

- La mercancía fue descargada.
- La Recepción fue registrada.
- La Inspección fue concluida.
- El Supervisor asignó la ubicación definitiva.

---

## Relación con Executive Brain

El Executive Brain podrá generar recomendaciones de ubicación, prioridades y optimizaciones que servirán como apoyo al Supervisor antes de emitir la Hoja Operativa.

---

## Relación con Operational Memory

Permite conservar el historial de misiones ejecutadas para análisis posteriores.

---

## Relación con el Centro Ejecutivo

Alimenta indicadores de:

- Tiempo de ejecución.
- Productividad.
- Cumplimiento.
- Trazabilidad.
- Desempeño operativo.

---

## Evolución dentro de CJWMS

Actualmente la Hoja Operativa existe en formato impreso.

En futuras versiones de CJWMS evolucionará hacia una Misión Operativa Digital, conservando el mismo propósito operativo.

---

## Relación con otros términos

- Recepción.
- Inspección.
- Área de Recepción.
- Unidad Logística.
- Supervisor.
- Montacarguista.

> **Nota de arquitectura**
>
> La Hoja Operativa representa el mecanismo operativo actual del almacén.
> CJWMS no modifica este proceso; inicialmente lo digitaliza y posteriormente lo evoluciona hacia una Misión Operativa Digital, manteniendo la autoridad del Supervisor sobre la asignación de tareas.

---

# OP-016 — Área de Recepción

## Código

OP-016

---

## Definición

El Área de Recepción es la zona física del almacén donde se descarga la mercancía proveniente del transporte y permanece temporalmente mientras se realizan las actividades iniciales del proceso operativo.

En esta área se lleva a cabo la Recepción, la Inspección y la asignación de la ubicación definitiva antes de que la mercancía sea trasladada al almacén.

---

## Objetivo

Concentrar las actividades iniciales de control para garantizar que la mercancía sea validada antes de incorporarse al inventario operativo.

---

## Actividades realizadas

- Descarga de la mercancía.
- Registro de la Recepción.
- Inspección por parte del Supervisor.
- Registro de observaciones cuando existan.
- Asignación de la ubicación definitiva.
- Emisión de la Hoja Operativa.

---

## Responsable principal

Supervisor.

---

## Participantes

- Supervisor.
- Montacarguista.
- Personal de descarga.

---

## Entradas

- Camión o transporte.
- Unidades Logísticas.

---

## Salidas

- Mercancía inspeccionada.
- Observaciones registradas.
- Ubicación asignada.
- Hoja Operativa emitida.

---

## Reglas principales

- Toda mercancía debe descargarse en el Área de Recepción antes de ingresar al almacén.
- Ninguna Unidad Logística puede ser almacenada sin concluir las actividades del Área de Recepción.
- La mercancía solo puede abandonar esta área cuando el Supervisor autoriza su traslado.

---

## Relación con Executive Brain

El Executive Brain podrá analizar la disponibilidad de ubicaciones y generar recomendaciones para apoyar al Supervisor durante la asignación de la ubicación definitiva.

---

## Relación con Operational Memory

Permite conservar el historial de Recepciones, Inspecciones, observaciones y asignaciones realizadas en esta etapa.

---

## Relación con el Centro Ejecutivo

Alimenta indicadores relacionados con:

- Tiempo de recepción.
- Tiempo de inspección.
- Tiempo de permanencia en recepción.
- Calidad de recepción.
- Productividad del proceso.

---

## Nota de arquitectura

El Área de Recepción forma parte del flujo operativo validado del almacén.

No debe confundirse con una zona de Staging. Su propósito principal es realizar las actividades iniciales de control antes del almacenamiento definitivo.

---

## Observación

El Área de Recepción representa una etapa temporal del flujo operativo.

La mercancía permanece en esta área únicamente el tiempo necesario para completar la Recepción, la Inspección y la asignación de ubicación.

---

## Inicio y fin del proceso

### Inicio

El proceso del Área de Recepción inicia cuando el transporte llega al almacén y comienza la descarga de las Unidades Logísticas.

### Fin

El proceso concluye cuando el Supervisor autoriza el traslado de la mercancía y el montacarguista recibe la Hoja Operativa para llevar la Unidad Logística a su ubicación definitiva.

---

## Relación con otros términos

- Unidad Logística.
- Recepción.
- Inspección.
- Hoja Operativa.
- Supervisor.
- Montacarguista.

---



