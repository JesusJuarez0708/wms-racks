# OP-003 — Inspección

## 1. Propósito

Garantizar que toda mercancía recibida cumpla con las condiciones físicas, documentales y operativas requeridas antes de incorporarse al inventario del almacén.

La inspección constituye el punto oficial de validación de calidad dentro del flujo operativo de CJWMS y determina si la mercancía puede:

- incorporarse al inventario;
- registrarse con observaciones;
- enviarse a revisión;
- o rechazarse de acuerdo con las políticas operativas.

Este proceso asegura la confiabilidad del inventario desde el momento de su ingreso.

---

# 2. Objetivo Estratégico

Validar cada unidad logística recibida mediante un procedimiento uniforme, documentado y trazable que permita garantizar:

- integridad física;
- coincidencia documental;
- identificación correcta;
- cumplimiento de requisitos comerciales;
- generación de evidencia para auditoría.

---

# 3. Alcance

El proceso inicia inmediatamente después de concluir la recepción física (OP-002).

Incluye:

- inspección visual;
- validación documental;
- revisión de cantidades;
- revisión de lote;
- revisión de caducidad;
- validación de etiquetas;
- registro de observaciones;
- autorización para almacenamiento.

El proceso finaliza cuando el supervisor autoriza el ingreso de la mercancía al inventario o determina una incidencia.

---

# 4. Actores Participantes

| Actor | Responsabilidad |
|--------|-----------------|
| Supervisor | Ejecutar la inspección completa. |
| Montacarguista | Mantener la mercancía disponible durante la inspección. |
| Sistema CJWMS | Registrar resultados y evidencias. |
| Cliente (cuando aplique) | Definir criterios especiales de aceptación. |

---

# 5. Entradas

- Mercancía descargada.
- Documentación de recepción.
- Orden de compra.
- Remisión.
- Información del producto.

---

# 6. Salidas

- Mercancía aprobada.
- Mercancía aprobada con observaciones.
- Mercancía rechazada.
- Registro de inspección.
- Evidencias operativas.

---

# 7. Objetivos Operativos

El proceso debe asegurar:

- Cero productos sin inspección.
- Completa trazabilidad.
- Evidencia de aceptación.
- Evidencia de rechazo.
- Reducción de errores de inventario.
- Prevención de reclamaciones posteriores.

---

# 8. Indicadores Estratégicos (KPIs)

Se evaluarán, entre otros, los siguientes indicadores:

- Porcentaje de mercancía aprobada.
- Porcentaje de mercancía aprobada con observaciones.
- Porcentaje de mercancía rechazada.
- Tiempo promedio de inspección.
- Número de incidencias por proveedor.
- Número de incidencias por producto.

---

# 9. Riesgos Operativos

Entre los principales riesgos se encuentran:

- Aceptar mercancía dañada.
- Registrar cantidades incorrectas.
- Aceptar productos vencidos.
- Registrar lotes equivocados.
- Errores en etiquetas.
- Omitir evidencia fotográfica.
- Inspecciones incompletas.

---

# 10. Relación con otros procesos

## Proceso anterior

**OP-002 — Recepción Física**

## Proceso siguiente

**OP-004 — Asignación de Ubicación**

---

# 11. Principios Cognitivos Aplicados

Durante este proceso CJWMS deberá garantizar:

- Trazabilidad completa.
- Registro automático de evidencias.
- Validación documental.
- Consistencia de datos.
- Generación de eventos operativos.
- Explicación de decisiones.
- Soporte para auditoría.

---

# Resultado Esperado

Al concluir OP-003 deberá existir una decisión formal sobre cada recepción:

- Aprobada.
- Aprobada con observaciones.
- Rechazada.
- En revisión.

Esta decisión será utilizada por todos los procesos posteriores del almacén como la única fuente oficial del estado de aceptación de la mercancía.

---

# Conclusión

OP-003 constituye el punto de control de calidad operativo del flujo logístico de CJWMS. Su propósito es garantizar que únicamente la mercancía que cumple con los criterios establecidos sea incorporada al inventario, manteniendo la integridad de la información, la trazabilidad de las decisiones y la generación de evidencias para auditoría.

La decisión emitida durante este proceso será considerada la fuente oficial para los procesos subsecuentes, permitiendo que la asignación de ubicación, el almacenamiento y las operaciones posteriores se ejecuten sobre información validada y confiable.

---

# Modelo Conceptual de Inspección

## Objetivo del Modelo

Definir el comportamiento conceptual del proceso de inspección dentro de CJWMS, estableciendo los estados, decisiones y transiciones que debe seguir toda mercancía desde que finaliza la recepción física hasta que queda autorizada (o no) para incorporarse al inventario.

Este modelo constituye la referencia oficial para la implementación funcional, la automatización de reglas de negocio y la trazabilidad operativa.

---

# Principio Operativo

Toda mercancía recibida debe ser inspeccionada antes de ser almacenada.

Ningún pallet podrá avanzar al siguiente proceso sin contar con una decisión formal emitida por el supervisor y registrada por CJWMS.

---

# Flujo Conceptual

```text
Recepción Física (OP-002)
            │
            ▼
Inicio de Inspección
            │
            ▼
Validación Física
            │
            ▼
Validación Documental
            │
            ▼
Evaluación Integral
            │
     ┌──────┼───────────┐
     ▼      ▼           ▼
Aprobada  Observaciones Rechazada
     │      │           │
     └──────┴───────────┘
            │
            ▼
Registro Oficial
            │
            ▼
Autorización para OP-004
```

---

# Componentes del Modelo

## 1. Inicio

El proceso inicia cuando la recepción física ha sido concluida satisfactoriamente y la mercancía permanece disponible para inspección.

Entradas principales:

- mercancía descargada;
- documentos de recepción;
- orden de compra;
- información del producto.

---

## 2. Validación Física

Durante esta etapa el supervisor verifica las condiciones físicas de la mercancía.

Entre los aspectos a revisar se encuentran:

- estado general;
- daños visibles;
- integridad del empaque;
- estabilidad del pallet;
- condiciones de manipulación.

---

## 3. Validación Documental

Se verifica la consistencia entre la mercancía y la documentación recibida.

Incluye:

- cantidades;
- lote;
- caducidad;
- etiquetas;
- identificación del producto.

---

## 4. Evaluación Integral

CJWMS consolida toda la información registrada durante la inspección para generar una decisión operativa.

La decisión siempre deberá quedar documentada.

---

## 5. Resultado de la Inspección

El proceso puede concluir con alguno de los siguientes resultados:

### Aprobada

La mercancía cumple todos los criterios establecidos.

Puede continuar hacia OP-004.

---

### Aprobada con Observaciones

La mercancía presenta incidencias menores que no impiden su almacenamiento.

Las observaciones quedan registradas para consulta futura.

---

### Rechazada

La mercancía incumple uno o más criterios críticos.

No podrá incorporarse al inventario hasta resolver la incidencia correspondiente.

---

### En Revisión

Se requiere información adicional antes de emitir una decisión definitiva.

---

# Reglas Conceptuales

El modelo establece las siguientes reglas generales:

- Toda inspección debe concluir con una decisión.
- Toda decisión debe quedar registrada.
- Toda observación debe ser trazable.
- Ninguna mercancía podrá almacenarse sin autorización.
- Toda incidencia debe generar evidencia operativa.

---

# Resultado del Modelo Conceptual

Al finalizar este proceso existirá una decisión única, documentada y trazable que determinará el estado oficial de aceptación de la mercancía y habilitará (o bloqueará) su continuidad dentro del flujo operativo de CJWMS.

---

# Modelo de Estados Operativos de OP-003

## Objetivo

Definir los estados oficiales por los que transita una mercancía durante el proceso de inspección, estableciendo las condiciones de entrada, permanencia y salida de cada uno de ellos.

Este modelo será utilizado por CJWMS como la referencia única para controlar el avance del proceso, validar transiciones y garantizar la trazabilidad completa de las decisiones operativas.

---

# Principios del Modelo de Estados

Todo pallet deberá encontrarse siempre en un único estado operativo.

Las transiciones entre estados únicamente podrán realizarse cuando se cumplan las reglas definidas por el proceso.

Cada cambio de estado generará un evento operativo registrado en la bitácora del sistema.

---

# Diagrama General de Estados

```text
                OP-002 Finalizado
                       │
                       ▼
             Pendiente de Inspección
                       │
                       ▼
             Inspección en Proceso
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
     Aprobada   Con Observaciones  Rechazada
          │            │            │
          └────────────┼────────────┘
                       ▼
             Inspección Finalizada
                       │
                       ▼
              Disponible para OP-004
```

---

# Estados Operativos

## Estado 1 — Pendiente de Inspección

### Descripción

La mercancía ha concluido el proceso de recepción física y se encuentra disponible para ser inspeccionada.

### Condiciones de Entrada

- OP-002 finalizado.
- Mercancía descargada.
- Recepción registrada.

### Condiciones de Salida

- El supervisor inicia la inspección.

---

## Estado 2 — Inspección en Proceso

### Descripción

El supervisor realiza todas las validaciones físicas y documentales definidas por el procedimiento.

### Actividades Asociadas

- Revisión física.
- Revisión documental.
- Registro de observaciones.
- Captura de evidencias.
- Validación de criterios.

### Condiciones de Salida

Finalización de la evaluación integral.

---

## Estado 3 — Aprobada

### Descripción

La mercancía cumple todos los criterios de aceptación establecidos.

### Resultado

Puede continuar hacia OP-004.

---

## Estado 4 — Con Observaciones

### Descripción

La mercancía presenta desviaciones menores que no impiden su almacenamiento.

### Resultado

Puede continuar al siguiente proceso manteniendo el registro de las observaciones para consulta y auditoría.

---

## Estado 5 — Rechazada

### Descripción

La mercancía incumple uno o más criterios críticos de aceptación.

### Resultado

La mercancía no podrá incorporarse al inventario hasta que la incidencia sea resuelta conforme a los procedimientos correspondientes.

---

## Estado 6 — Inspección Finalizada

### Descripción

La inspección ha concluido y existe una decisión oficial registrada por el sistema.

### Condiciones

- Decisión registrada.
- Evidencias almacenadas.
- Bitácora actualizada.

---

## Estado 7 — Disponible para OP-004

### Descripción

La mercancía queda habilitada para continuar con el proceso de Asignación de Ubicación (OP-004), siempre que la decisión de inspección lo permita.

---

# Reglas Generales de Transición

Las transiciones entre estados deberán cumplir las siguientes reglas:

- Ningún estado puede omitirse.
- Toda transición debe quedar registrada.
- Toda transición debe generar un evento operativo.
- Toda transición debe registrar fecha y hora.
- Toda transición debe identificar al responsable que la ejecutó.
- Toda transición debe poder reconstruirse durante una auditoría.

---

# Beneficios del Modelo

Este modelo permite que CJWMS:

- conozca en todo momento el estado operativo de cada recepción;
- detecte procesos detenidos o incompletos;
- reconstruya el historial de inspección de cualquier mercancía;
- soporte auditorías internas y externas;
- alimente los motores de inteligencia operativa y analítica con información consistente y trazable.

---

# Modelo de Eventos Operativos de OP-003

## Objetivo

Definir los eventos oficiales que pueden producirse durante el proceso de inspección, estableciendo el momento en que ocurren, la información que generan y su impacto sobre los estados operativos.

Cada evento representa un hecho verificable dentro de la operación y constituye la base de la trazabilidad histórica de CJWMS.

---

# Principios del Modelo de Eventos

Todo cambio relevante dentro del proceso deberá generar un evento operativo.

Los eventos:

- son inmutables;
- poseen marca de tiempo;
- identifican al responsable;
- registran el contexto operativo;
- alimentan la bitácora histórica del sistema.

Los eventos nunca sustituyen a los estados; únicamente explican cómo y por qué ocurrió una transición.

---

# Flujo General de Eventos

```text
Recepción Finalizada
        │
        ▼
Inspección Iniciada
        │
        ▼
Validaciones Ejecutadas
        │
        ▼
Observaciones Registradas (si aplica)
        │
        ▼
Decisión Emitida
        │
        ▼
Inspección Finalizada
        │
        ▼
Mercancía Liberada o Bloqueada
```

---

# Catálogo Oficial de Eventos

## EVT-OP003-001 — Inspección Iniciada

### Descripción

Se registra cuando el supervisor inicia formalmente la inspección de la mercancía.

### Información registrada

- Fecha y hora.
- Supervisor responsable.
- Recepción relacionada.
- Mercancía inspeccionada.

### Estado generado

**Pendiente de Inspección → Inspección en Proceso**

---

## EVT-OP003-002 — Validación Física Completada

### Descripción

Confirma que la revisión física de la mercancía ha sido concluida.

### Información registrada

- Resultado de la revisión.
- Condiciones físicas observadas.
- Evidencias capturadas (cuando aplique).

---

## EVT-OP003-003 — Validación Documental Completada

### Descripción

Confirma que la información documental coincide con la mercancía inspeccionada.

### Información registrada

- Cantidades verificadas.
- Lote.
- Caducidad.
- Etiquetas.
- Observaciones documentales.

---

## EVT-OP003-004 — Observación Registrada

### Descripción

Se genera cuando durante la inspección se identifica una condición que debe quedar documentada.

### Información registrada

- Tipo de observación.
- Descripción.
- Severidad.
- Responsable del registro.

---

## EVT-OP003-005 — Decisión de Inspección Emitida

### Descripción

Registra la decisión oficial del supervisor respecto a la aceptación de la mercancía.

### Posibles resultados

- Aprobada.
- Aprobada con observaciones.
- Rechazada.
- En revisión.

Este evento representa la decisión formal del proceso.

---

## EVT-OP003-006 — Inspección Finalizada

### Descripción

Confirma el cierre operativo de la inspección.

### Información registrada

- Fecha y hora de cierre.
- Duración de la inspección.
- Responsable.
- Resultado final.

### Estado generado

**Inspección en Proceso → Inspección Finalizada**

---

## EVT-OP003-007 — Mercancía Liberada para OP-004

### Descripción

Se genera cuando la mercancía queda autorizada para continuar con el siguiente proceso operativo.

### Estado generado

**Inspección Finalizada → Disponible para OP-004**

---

# Reglas Generales

Todos los eventos deberán:

- registrarse automáticamente;
- almacenarse en la bitácora histórica;
- ser consultables por auditoría;
- conservar su secuencia cronológica;
- relacionarse con el proceso OP-003;
- mantener referencia a la mercancía inspeccionada.

---

# Beneficios del Modelo de Eventos

Este modelo permite que CJWMS:

- reconstruya completamente cualquier inspección;
- explique por qué se tomó una decisión;
- identifique desviaciones operativas;
- genere indicadores de desempeño;
- alimente los motores de inteligencia y auditoría con información verificable y consistente.

---

# Modelo de Actividades Operativas de OP-003

## Objetivo

Definir las actividades oficiales que conforman el proceso de inspección, especificando su secuencia lógica, el actor responsable y el resultado esperado de cada una.

Las actividades representan las acciones ejecutadas por las personas y por CJWMS para transformar una mercancía recibida en una mercancía oficialmente aceptada, observada o rechazada.

---

# Principios del Modelo

Toda actividad deberá:

- tener un objetivo definido;
- generar un resultado verificable;
- ser ejecutada por un actor identificado;
- poder auditarse posteriormente;
- formar parte de la trazabilidad completa del proceso.

---

# Flujo General de Actividades

```text
Inicio de Inspección
        │
        ▼
Preparar mercancía
        │
        ▼
Realizar inspección física
        │
        ▼
Realizar inspección documental
        │
        ▼
Registrar observaciones
        │
        ▼
Emitir decisión
        │
        ▼
Registrar resultado
        │
        ▼
Cerrar inspección
```

---

# Catálogo Oficial de Actividades

## ACT-OP003-001 — Iniciar Inspección

### Objetivo

Dar inicio formal al proceso de inspección de la mercancía.

### Responsable

Supervisor.

### Resultado esperado

La mercancía cambia al estado **Inspección en Proceso**.

---

## ACT-OP003-002 — Preparar Mercancía para Inspección

### Objetivo

Verificar que la mercancía se encuentre accesible y disponible para realizar la inspección.

### Responsable

Montacarguista.

### Resultado esperado

La mercancía queda lista para ser inspeccionada sin restricciones físicas.

---

## ACT-OP003-003 — Ejecutar Inspección Física

### Objetivo

Comprobar las condiciones físicas de la mercancía.

### Responsable

Supervisor.

### Aspectos evaluados

- Estado físico.
- Integridad del empaque.
- Daños visibles.
- Estabilidad del pallet.
- Condiciones generales.

### Resultado esperado

Se registra el resultado de la inspección física.

---

## ACT-OP003-004 — Ejecutar Inspección Documental

### Objetivo

Validar la consistencia entre la mercancía y la documentación asociada.

### Responsable

Supervisor.

### Aspectos evaluados

- Cantidad.
- Lote.
- Caducidad.
- Etiquetas.
- Identificación del producto.

### Resultado esperado

La información documental queda validada o se registran las diferencias detectadas.

---

## ACT-OP003-005 — Registrar Observaciones

### Objetivo

Documentar cualquier incidencia identificada durante la inspección.

### Responsable

Supervisor.

### Resultado esperado

Las observaciones quedan asociadas permanentemente a la recepción y a la mercancía inspeccionada.

---

## ACT-OP003-006 — Emitir Decisión de Inspección

### Objetivo

Determinar el resultado oficial de la inspección.

### Responsable

Supervisor.

### Posibles decisiones

- Aprobada.
- Aprobada con observaciones.
- Rechazada.
- En revisión.

### Resultado esperado

La decisión queda registrada en CJWMS.

---

## ACT-OP003-007 — Registrar Evidencias

### Objetivo

Almacenar las evidencias generadas durante la inspección.

### Responsable

CJWMS.

### Evidencias posibles

- Fotografías.
- Observaciones.
- Resultados de validaciones.
- Fecha y hora.
- Responsable.

### Resultado esperado

La inspección cuenta con evidencia suficiente para auditoría.

---

## ACT-OP003-008 — Finalizar Inspección

### Objetivo

Cerrar formalmente el proceso de inspección.

### Responsable

CJWMS.

### Resultado esperado

La mercancía queda preparada para continuar hacia OP-004 o permanecer bloqueada según la decisión emitida.

---

# Reglas Generales

Todas las actividades deberán:

- ejecutarse en el orden establecido;
- registrar fecha y hora;
- identificar al responsable;
- generar evidencia cuando corresponda;
- alimentar la bitácora operativa.

---

# Beneficios del Modelo

La definición formal de actividades permite a CJWMS:

- estandarizar la ejecución del proceso;
- reducir variaciones operativas;
- medir tiempos de ejecución;
- identificar cuellos de botella;
- mejorar la capacitación del personal;
- fortalecer la trazabilidad de cada inspección.

---

# Modelo de Actores Operativos de OP-003

## Objetivo

Definir los actores que participan en el proceso de inspección, estableciendo sus responsabilidades, nivel de autoridad e interacción con CJWMS.

Este modelo permite asegurar que cada actividad sea ejecutada por el actor correspondiente y que toda decisión quede asociada a un responsable claramente identificado.

---

# Principios del Modelo

Todo actor deberá:

- tener responsabilidades definidas;
- ejecutar únicamente las actividades autorizadas;
- generar evidencia de sus acciones;
- quedar identificado en cada evento operativo;
- participar dentro de los límites establecidos por el proceso.

---

# Actores del Proceso

## ACTOR-001 — Supervisor

### Rol

Responsable de ejecutar y validar la inspección oficial de la mercancía.

### Responsabilidades

- Iniciar la inspección.
- Realizar la validación física.
- Realizar la validación documental.
- Registrar observaciones.
- Emitir la decisión oficial.
- Autorizar o rechazar la mercancía.

### Autoridad

Alta.

Puede emitir decisiones que modifican el estado operativo de la mercancía.

---

## ACTOR-002 — Montacarguista

### Rol

Responsable de mantener la mercancía disponible durante el proceso de inspección.

### Responsabilidades

- Presentar la mercancía para inspección.
- Reubicar la mercancía cuando sea requerido.
- Mantener condiciones seguras para la revisión.

### Autoridad

Operativa.

No puede modificar decisiones de inspección.

---

## ACTOR-003 — Sistema CJWMS

### Rol

Responsable de registrar, controlar y dar trazabilidad al proceso.

### Responsabilidades

- Registrar eventos.
- Registrar estados.
- Almacenar evidencias.
- Registrar responsables.
- Generar historial operativo.
- Validar reglas del proceso.
- Mantener la integridad de la información.

### Autoridad

Automática.

Ejecuta únicamente las acciones definidas por las reglas operativas del sistema.

---

## ACTOR-004 — Cliente (cuando aplique)

### Rol

Define criterios especiales de aceptación cuando existen acuerdos comerciales específicos.

### Responsabilidades

- Establecer requisitos particulares.
- Autorizar excepciones previamente acordadas.
- Atender aclaraciones relacionadas con la inspección.

### Autoridad

Limitada.

Su participación depende de las condiciones comerciales establecidas.

---

# Matriz de Responsabilidades

| Actividad | Supervisor | Montacarguista | CJWMS | Cliente |
|-----------|------------|----------------|--------|----------|
| Iniciar inspección | ✔ | | | |
| Preparar mercancía | | ✔ | | |
| Inspección física | ✔ | | | |
| Inspección documental | ✔ | | | |
| Registrar observaciones | ✔ | | ✔ | |
| Registrar evidencias | ✔ | | ✔ | |
| Emitir decisión | ✔ | | | |
| Actualizar estados | | | ✔ | |
| Registrar eventos | | | ✔ | |
| Autorizar criterios especiales | | | | ✔ |

---

# Interacción entre Actores

```text
Montacarguista
        │
        ▼
Supervisor
        │
        ▼
CJWMS
        │
        ▼
Registro Histórico
        │
        ▼
Procesos Posteriores (OP-004)
```

---

# Reglas Generales

- Cada actividad deberá tener un responsable único.
- Ninguna decisión podrá registrarse sin identificar al responsable.
- CJWMS conservará permanentemente la relación entre actor, actividad, evento y estado.
- Toda modificación deberá quedar registrada para efectos de auditoría.
- Las responsabilidades deberán mantenerse consistentes durante todo el ciclo operativo.

---

# Beneficios del Modelo

Este modelo permite que CJWMS:

- elimine ambigüedades en la asignación de responsabilidades;
- fortalezca la trazabilidad operativa;
- facilite auditorías internas y externas;
- implemente controles de acceso basados en funciones;
- genere indicadores de desempeño por actor;
- soporte futuras automatizaciones del proceso.

---

# Reglas de Negocio de OP-003

## Objetivo

Definir las reglas oficiales que gobiernan el proceso de inspección, estableciendo las condiciones bajo las cuales la mercancía puede ser aceptada, observada, rechazada o puesta en revisión.

Estas reglas serán utilizadas por CJWMS para validar automáticamente la consistencia del proceso y garantizar decisiones homogéneas, trazables y auditables.

---

# Principios Generales

Toda regla deberá:

- aplicarse de manera uniforme;
- ser verificable;
- producir un resultado determinístico;
- quedar registrada cuando sea evaluada;
- poder auditarse posteriormente.

---

# RN-OP003-001 — Inspección Obligatoria

Toda mercancía recibida deberá ser inspeccionada antes de continuar con cualquier proceso posterior.

**Resultado esperado**

No podrá iniciarse OP-004 mientras la inspección permanezca pendiente.

---

# RN-OP003-002 — Responsable de la Inspección

Únicamente el Supervisor podrá emitir la decisión oficial de inspección.

**Resultado esperado**

Las decisiones emitidas por cualquier otro actor serán rechazadas por CJWMS.

---

# RN-OP003-003 — Validación Física Completa

La inspección física deberá incluir, como mínimo:

- estado físico;
- integridad del empaque;
- daños visibles;
- estabilidad del pallet.

Si alguno de estos elementos no ha sido evaluado, la inspección no podrá concluir.

---

# RN-OP003-004 — Validación Documental Completa

Antes de emitir una decisión deberán validarse:

- cantidad;
- lote;
- caducidad;
- etiquetas;
- identificación del producto.

La omisión de cualquiera de estos elementos impedirá finalizar la inspección.

---

# RN-OP003-005 — Registro Obligatorio de Observaciones

Toda desviación detectada deberá registrarse como observación.

Las observaciones deberán incluir:

- descripción;
- responsable;
- fecha y hora;
- nivel de severidad (cuando aplique).

---

# RN-OP003-006 — Evidencia Operativa

Cuando una incidencia lo requiera, el Supervisor deberá registrar la evidencia correspondiente.

La evidencia podrá consistir en:

- fotografías;
- comentarios;
- documentación adicional;
- cualquier otro soporte definido por la operación.

---

# RN-OP003-007 — Decisión Única

Cada inspección deberá concluir con una única decisión oficial.

Valores permitidos:

- Aprobada.
- Aprobada con observaciones.
- Rechazada.
- En revisión.

No podrán coexistir múltiples decisiones para una misma inspección.

---

# RN-OP003-008 — Bloqueo por Rechazo

Si la decisión es **Rechazada**, la mercancía no podrá avanzar hacia OP-004.

CJWMS deberá mantenerla bloqueada hasta que exista un procedimiento autorizado que resuelva la incidencia.

---

# RN-OP003-009 — Continuidad con Observaciones

Si la decisión es **Aprobada con observaciones**, la mercancía podrá continuar al siguiente proceso conservando permanentemente el historial de observaciones.

---

# RN-OP003-010 — Trazabilidad Completa

Toda evaluación deberá conservar:

- actor;
- actividad;
- evento;
- estado;
- fecha;
- hora;
- evidencia asociada.

La información deberá permanecer disponible para auditoría durante todo el ciclo de vida del registro.

---

# Matriz Resumen de Reglas

| Regla | Objetivo |
|--------|----------|
| RN-OP003-001 | Garantizar inspección obligatoria |
| RN-OP003-002 | Controlar autoridad de decisión |
| RN-OP003-003 | Validar revisión física |
| RN-OP003-004 | Validar revisión documental |
| RN-OP003-005 | Registrar observaciones |
| RN-OP003-006 | Gestionar evidencias |
| RN-OP003-007 | Emitir una decisión única |
| RN-OP003-008 | Bloquear mercancía rechazada |
| RN-OP003-009 | Mantener trazabilidad de observaciones |
| RN-OP003-010 | Garantizar trazabilidad integral |

---

# Beneficios

La implementación de estas reglas permitirá que CJWMS:

- aplique criterios homogéneos de inspección;
- reduzca errores humanos;
- fortalezca la trazabilidad del proceso;
- facilite auditorías;
- sirva como base para la automatización y la inteligencia operativa.

---

# Reglas de Cambio de Estado de OP-003

## Objetivo

Definir las condiciones oficiales bajo las cuales una mercancía puede cambiar de un estado operativo a otro durante el proceso de inspección.

Estas reglas garantizan que las transiciones sean consistentes, trazables y acordes con la lógica de negocio establecida para CJWMS.

---

# Principios Generales

Toda transición de estado deberá:

- originarse por un evento operativo válido;
- cumplir las reglas de negocio correspondientes;
- quedar registrada en la bitácora histórica;
- identificar al actor responsable;
- registrar fecha y hora;
- conservar la evidencia asociada cuando aplique.

No se permitirán cambios directos que omitan estados definidos por el modelo operativo.

---

# Matriz Oficial de Transiciones

| Estado Actual | Evento Disparador | Nuevo Estado | Responsable |
|-------------------------------|------------------------------------|-------------------------------|--------------|
| Pendiente de Inspección | Inicio de inspección | Inspección en Proceso | Supervisor |
| Inspección en Proceso | Decisión: Aprobada | Aprobada | Supervisor |
| Inspección en Proceso | Decisión: Aprobada con observaciones | Con Observaciones | Supervisor |
| Inspección en Proceso | Decisión: Rechazada | Rechazada | Supervisor |
| Inspección en Proceso | Decisión: En revisión | En Revisión | Supervisor |
| Aprobada | Registro de cierre | Inspección Finalizada | CJWMS |
| Con Observaciones | Registro de cierre | Inspección Finalizada | CJWMS |
| Rechazada | Registro de cierre | Inspección Finalizada | CJWMS |
| En Revisión | Decisión definitiva | Aprobada / Con Observaciones / Rechazada | Supervisor |
| Inspección Finalizada | Liberación para OP-004 | Disponible para OP-004 | CJWMS |

---

# Reglas Específicas

## RCE-OP003-001

No podrá iniciarse una inspección si la recepción física (OP-002) no ha finalizado correctamente.

---

## RCE-OP003-002

Una inspección únicamente podrá encontrarse en un estado operativo a la vez.

---

## RCE-OP003-003

La transición hacia **Aprobada**, **Con Observaciones**, **Rechazada** o **En Revisión** únicamente podrá realizarse mediante una decisión emitida por el Supervisor.

---

## RCE-OP003-004

Toda decisión deberá generar automáticamente el evento operativo correspondiente.

---

## RCE-OP003-005

La transición hacia **Inspección Finalizada** solamente podrá ejecutarse cuando exista una decisión oficial registrada.

---

## RCE-OP003-006

La mercancía únicamente podrá pasar al estado **Disponible para OP-004** cuando la decisión final permita su continuidad dentro del flujo operativo.

---

## RCE-OP003-007

Las mercancías en estado **Rechazada** no podrán liberarse automáticamente para el siguiente proceso.

Su cambio de condición dependerá del procedimiento de resolución definido por la operación.

---

## RCE-OP003-008

Las mercancías en estado **En Revisión** permanecerán bloqueadas para procesos posteriores hasta que exista una decisión definitiva.

---

# Validaciones Automáticas

CJWMS deberá validar automáticamente que:

- no existan transiciones inválidas;
- no se omitan estados;
- exista un responsable identificado;
- exista evidencia cuando sea requerida;
- toda transición tenga un evento asociado;
- toda transición quede registrada en la bitácora histórica.

---

# Beneficios

La implementación de estas reglas permitirá:

- mantener la integridad del flujo operativo;
- evitar inconsistencias entre procesos;
- simplificar auditorías;
- detectar desviaciones en tiempo real;
- facilitar la explicación de decisiones por parte de la IA Cognitiva de CJWMS.

---

# Modelo Oficial de Evidencias Operativas de OP-003

## Objetivo

Definir las evidencias oficiales que deberán generarse durante el proceso de inspección para respaldar cada decisión operativa, garantizando la trazabilidad, la auditoría y la explicación de los resultados registrados por CJWMS.

Las evidencias constituyen el soporte documental del proceso y deberán permanecer asociadas permanentemente al registro de inspección.

---

# Principios Generales

Toda evidencia deberá:

- corresponder a una inspección específica;
- relacionarse con un evento operativo;
- identificar al responsable que la registró;
- conservar fecha y hora de captura;
- mantenerse disponible durante todo el ciclo de vida del registro;
- ser consultable durante auditorías internas y externas.

---

# Tipos de Evidencia

## EV-OP003-001 — Evidencia Fotográfica

### Objetivo

Documentar visualmente el estado de la mercancía inspeccionada.

### Ejemplos

- Daños visibles.
- Condición del empaque.
- Estado del pallet.
- Etiquetas.
- Lote.
- Fecha de caducidad.

---

## EV-OP003-002 — Evidencia Documental

### Objetivo

Respaldar la validación documental realizada durante la inspección.

### Puede incluir

- Orden de compra.
- Remisión.
- Lista de empaque.
- Documentación proporcionada por el cliente.
- Otros documentos aplicables.

---

## EV-OP003-003 — Evidencia de Observaciones

### Objetivo

Registrar las incidencias detectadas durante la inspección.

### Información mínima

- Descripción.
- Tipo de observación.
- Severidad.
- Responsable.
- Fecha y hora.

---

## EV-OP003-004 — Evidencia de Decisión

### Objetivo

Respaldar la decisión final emitida por el Supervisor.

### Información registrada

- Resultado de la inspección.
- Justificación.
- Responsable.
- Fecha y hora.

---

## EV-OP003-005 — Evidencia de Trazabilidad

### Objetivo

Conservar el historial completo del proceso.

Incluye:

- Estados recorridos.
- Eventos generados.
- Actividades ejecutadas.
- Actores participantes.
- Reglas aplicadas.

---

# Matriz de Evidencias

| Actividad | Evidencia requerida |
|-----------|---------------------|
| Inicio de inspección | Registro del evento |
| Inspección física | Fotografías (cuando aplique) |
| Inspección documental | Validaciones registradas |
| Observaciones | Registro de observaciones |
| Decisión | Justificación de la decisión |
| Cierre de inspección | Registro final del proceso |

---

# Reglas Generales

Las evidencias deberán:

- estar asociadas al identificador de la inspección;
- no poder eliminarse sin autorización administrativa;
- conservar su versión original;
- formar parte del historial operativo;
- ser recuperables para auditoría.

---

# Beneficios

La correcta gestión de evidencias permitirá que CJWMS:

- justifique todas las decisiones de inspección;
- reduzca controversias con clientes y proveedores;
- fortalezca la trazabilidad del inventario;
- facilite auditorías regulatorias y operativas;
- proporcione información confiable a los motores de inteligencia y análisis.

---

# Matriz de Trazabilidad Operativa de OP-003

## Objetivo

Establecer la relación oficial entre los estados operativos, eventos, actividades, actores, reglas de negocio y evidencias que conforman el proceso de inspección.

Esta matriz constituye el mecanismo principal de trazabilidad de CJWMS y permite reconstruir íntegramente cualquier ejecución del proceso.

---

# Principios de Trazabilidad

Toda ejecución de OP-003 deberá permitir identificar de forma unívoca:

- el estado operativo alcanzado;
- el evento que originó la transición;
- la actividad ejecutada;
- el actor responsable;
- las reglas de negocio aplicadas;
- las evidencias generadas.

Ningún elemento del proceso deberá quedar sin relación con los demás.

---

# Matriz Oficial de Trazabilidad

| Estado Operativo | Evento | Actividad | Actor Responsable | Reglas Aplicables | Evidencias |
|------------------|---------|-----------|-------------------|-------------------|------------|
| Pendiente de Inspección | EVT-OP003-001 | ACT-OP003-001 Iniciar Inspección | Supervisor | RN-001, RCE-001 | Registro de inicio |
| Inspección en Proceso | EVT-OP003-002 | ACT-OP003-003 Inspección Física | Supervisor | RN-003 | Fotografías, observaciones |
| Inspección en Proceso | EVT-OP003-003 | ACT-OP003-004 Inspección Documental | Supervisor | RN-004 | Validaciones documentales |
| Inspección en Proceso | EVT-OP003-004 | ACT-OP003-005 Registrar Observaciones | Supervisor | RN-005 | Observaciones registradas |
| Aprobada / Con Observaciones / Rechazada / En Revisión | EVT-OP003-005 | ACT-OP003-006 Emitir Decisión | Supervisor | RN-007, RN-008, RN-009 | Decisión registrada |
| Inspección Finalizada | EVT-OP003-006 | ACT-OP003-008 Finalizar Inspección | CJWMS | RCE-005 | Registro de cierre |
| Disponible para OP-004 | EVT-OP003-007 | Continuidad del flujo | CJWMS | RCE-006 | Historial operativo |

---

# Relación entre Componentes

```text
Estado
   │
   ▼
Evento
   │
   ▼
Actividad
   │
   ▼
Actor
   │
   ▼
Regla Aplicada
   │
   ▼
Evidencia
   │
   ▼
Historial Operativo
```

---

# Reglas de Consistencia

Toda ejecución del proceso deberá cumplir las siguientes condiciones:

- Cada estado deberá estar asociado a uno o más eventos.
- Cada evento deberá corresponder a una actividad.
- Cada actividad deberá tener un actor responsable.
- Cada decisión deberá estar respaldada por una o más reglas de negocio.
- Cada regla aplicada deberá poder justificarse mediante evidencias.
- Toda la información deberá integrarse en el historial operativo.

---

# Beneficios

La Matriz de Trazabilidad permite que CJWMS:

- reconstruya cualquier inspección de principio a fin;
- explique el motivo de cada decisión operativa;
- identifique inconsistencias en el flujo;
- fortalezca auditorías internas y externas;
- facilite el análisis por parte de la IA Cognitiva;
- mantenga una trazabilidad completa durante todo el ciclo de vida de la mercancía.

---

# Resultado Esperado

Al finalizar OP-003 existirá una cadena completa de trazabilidad que relacionará:

- estados;
- eventos;
- actividades;
- actores;
- reglas;
- evidencias;

permitiendo que cualquier inspección pueda analizarse, auditarse y explicarse de forma íntegra y consistente.

---

# Diagrama Integrado de OP-003

## Objetivo

Representar de forma unificada el comportamiento operativo del proceso de inspección, integrando las actividades, estados, eventos, decisiones y transiciones definidas durante el modelado operativo cognitivo.

Este diagrama constituye la vista ejecutiva oficial del proceso y servirá como referencia para implementación, capacitación, auditoría y análisis operativo.

---

# Diagrama Integrado

```text
                   OP-002 Recepción Física
                             │
                             ▼
                 Pendiente de Inspección
                             │
          EVT-OP003-001 / ACT-OP003-001
                             │
                             ▼
                 Inspección en Proceso
                             │
       ┌─────────────────────┼─────────────────────┐
       │                     │                     │
       ▼                     ▼                     ▼
Inspección Física     Inspección Documental   Registro de Observaciones
ACT-OP003-003         ACT-OP003-004          ACT-OP003-005
       │                     │                     │
       └───────────────┬─────┴─────────────────────┘
                       ▼
              Evaluación Integral
                       │
             ACT-OP003-006
                       │
       ┌───────────────┼──────────────────────────────┐
       ▼               ▼               ▼              ▼
   Aprobada   Con Observaciones   Rechazada     En Revisión
       │               │               │              │
       └───────────────┼───────────────┴──────────────┘
                       ▼
             ACT-OP003-008
           Inspección Finalizada
                       │
            EVT-OP003-007
                       │
                       ▼
           Disponible para OP-004
```

---

# Integración de Componentes

## Estados Operativos

- Pendiente de Inspección
- Inspección en Proceso
- Aprobada
- Con Observaciones
- Rechazada
- En Revisión
- Inspección Finalizada
- Disponible para OP-004

---

## Eventos Operativos

- Inicio de inspección.
- Validación física completada.
- Validación documental completada.
- Observación registrada.
- Decisión emitida.
- Inspección finalizada.
- Mercancía liberada para OP-004.

---

## Actividades Operativas

- Iniciar inspección.
- Preparar mercancía.
- Ejecutar inspección física.
- Ejecutar inspección documental.
- Registrar observaciones.
- Emitir decisión.
- Registrar evidencias.
- Finalizar inspección.

---

## Actores

- Supervisor.
- Montacarguista.
- Sistema CJWMS.
- Cliente (cuando aplique).

---

## Reglas de Negocio

Aplican las reglas RN-OP003-001 a RN-OP003-010 y las reglas de cambio de estado RCE-OP003-001 a RCE-OP003-008.

---

## Evidencias

Durante el proceso podrán generarse:

- Evidencia fotográfica.
- Evidencia documental.
- Evidencia de observaciones.
- Evidencia de decisión.
- Evidencia de trazabilidad.

---

# Resultado del Proceso

El proceso concluye cuando existe una decisión oficial registrada y la mercancía queda:

- disponible para continuar con OP-004, o
- bloqueada hasta la resolución de la incidencia correspondiente.

---

# Beneficios del Diagrama Integrado

Esta representación permite:

- visualizar el proceso completo en una sola vista;
- comprender la interacción entre todos los componentes del modelo COM;
- facilitar la capacitación del personal;
- servir como referencia para desarrollo e implementación;
- apoyar auditorías y revisiones operativas;
- proporcionar una base clara para el motor de inteligencia de CJWMS.

---

# Validación Operativa Integral de OP-003

## Objetivo

Verificar que todos los componentes del proceso de inspección mantengan consistencia metodológica, operativa y documental conforme al Modelo de Operación Cognitiva (COM) adoptado por CJWMS.

Esta validación certifica que el proceso puede ser implementado, auditado y evolucionado sin inconsistencias estructurales.

---

# Validación de Consistencia

## 1. Definición Estratégica

| Validación | Estado |
|------------|--------|
| Propósito definido | ✅ |
| Objetivo estratégico definido | ✅ |
| Alcance documentado | ✅ |
| Actores identificados | ✅ |
| Entradas y salidas definidas | ✅ |

---

## 2. Modelo Conceptual

| Validación | Estado |
|------------|--------|
| Flujo conceptual definido | ✅ |
| Inicio y fin identificados | ✅ |
| Decisiones principales modeladas | ✅ |
| Resultados posibles definidos | ✅ |

---

## 3. Estados Operativos

| Validación | Estado |
|------------|--------|
| Estados identificados | ✅ |
| Transiciones permitidas | ✅ |
| Estados finales definidos | ✅ |
| Consistencia con el flujo | ✅ |

---

## 4. Eventos Operativos

| Validación | Estado |
|------------|--------|
| Eventos documentados | ✅ |
| Eventos asociados a estados | ✅ |
| Eventos registrados en bitácora | ✅ |

---

## 5. Actividades Operativas

| Validación | Estado |
|------------|--------|
| Actividades identificadas | ✅ |
| Responsables definidos | ✅ |
| Resultados esperados documentados | ✅ |

---

## 6. Actores

| Validación | Estado |
|------------|--------|
| Roles definidos | ✅ |
| Responsabilidades asignadas | ✅ |
| Autoridad documentada | ✅ |

---

## 7. Reglas de Negocio

| Validación | Estado |
|------------|--------|
| Reglas completas | ✅ |
| Restricciones definidas | ✅ |
| Consistencia con estados | ✅ |

---

## 8. Reglas de Cambio de Estado

| Validación | Estado |
|------------|--------|
| Transiciones válidas | ✅ |
| Validaciones automáticas | ✅ |
| Integridad del flujo | ✅ |

---

## 9. Evidencias Operativas

| Validación | Estado |
|------------|--------|
| Evidencias definidas | ✅ |
| Asociación con actividades | ✅ |
| Asociación con decisiones | ✅ |

---

## 10. Matriz de Trazabilidad

| Validación | Estado |
|------------|--------|
| Relación estado-evento | ✅ |
| Relación evento-actividad | ✅ |
| Relación actividad-actor | ✅ |
| Relación regla-evidencia | ✅ |

---

## 11. Diagrama Integrado

| Validación | Estado |
|------------|--------|
| Representación completa | ✅ |
| Consistencia con el modelo | ✅ |
| Flujo operativo validado | ✅ |

---

# Resultado de la Validación

Se confirma que OP-003:

- mantiene consistencia metodológica con OP-002;
- cumple el estándar oficial del Modelo de Operación Cognitiva (COM);
- conserva trazabilidad completa;
- define responsabilidades claras;
- registra evidencias suficientes;
- establece reglas de negocio implementables;
- puede integrarse con los procesos posteriores sin inconsistencias.

---

# Estado de Homologación

| Criterio | Resultado |
|----------|-----------|
| Consistencia documental | ✅ Aprobada |
| Consistencia operativa | ✅ Aprobada |
| Consistencia metodológica | ✅ Aprobada |
| Preparado para implementación | ✅ Sí |
| Preparado para auditoría | ✅ Sí |
| Preparado para integración con OP-004 | ✅ Sí |

---

# Conclusión Oficial

El proceso **OP-003 — Inspección** queda formalmente validado conforme a la metodología COM utilizada por CJWMS.

Su estructura es consistente, trazable y completamente alineada con la arquitectura documental definida para los procesos operativos del sistema.

A partir de este momento, OP-003 podrá utilizarse como referencia oficial para:

- implementación funcional;
- desarrollo de software;
- pruebas operativas;
- capacitación;
- auditorías;
- integración con procesos posteriores;
- motores de inteligencia operativa.