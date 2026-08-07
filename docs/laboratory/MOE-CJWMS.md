# CJWMS-MOE-001
## Matriz Operativa del Escenario CJWMS

### Manual Oficial del Laboratorio Operativo

| Campo                | Valor                                |
| -------------------- | ------------------------------------ |
| Documento            | CJWMS-MOE-001                        |
| Nombre               | Matriz Operativa del Escenario CJWMS |
| Proyecto             | CJWMS                                |
| Versión              | 1.0                                  |
| Estado               | En construcción                      |
| Tipo                 | Documento de Ingeniería              |
| Ubicación            | docs/laboratory/MOE-CJWMS.md         |
| Última actualización | FASE 22.3                            |

---

# Introducción

## Alcance

La MOE-CJWMS (Matriz Operativa del Escenario CJWMS) constituye el documento rector del Laboratorio Operativo del proyecto CJWMS.

Su alcance comprende la definición del escenario operativo permanente utilizado para diseñar, implementar, validar y mantener todas las funcionalidades del sistema durante su ciclo de vida.

Este documento describe:

- Los productos utilizados en el laboratorio.
- La distribución física del inventario.
- Los pallets que conforman el escenario base.
- Los escenarios operativos de prueba.
- La relación entre funcionalidades y escenarios.
- El estado oficial del laboratorio después de un restablecimiento.

---

## Audiencia

Este documento está dirigido a:

- Arquitectos de software.
- Desarrolladores.
- Personal de aseguramiento de calidad (QA).
- Analistas funcionales.
- Responsables de operación logística.
- Integrantes del proyecto CJWMS.

---

## Objetivos

La MOE tiene como finalidad:

- Proporcionar un laboratorio permanente de pruebas.
- Garantizar escenarios reproducibles.
- Facilitar la validación funcional del sistema.
- Mantener la trazabilidad entre desarrollo y operación.
- Servir como referencia oficial durante todas las fases del proyecto.

---

## Cómo utilizar este documento

La utilización de la MOE deberá seguir el siguiente flujo:

1. Consultar el escenario operativo que se desea validar.
2. Preparar o restablecer el laboratorio mediante el Seeder Operativo CJWMS.
3. Ejecutar la funcionalidad correspondiente.
4. Comparar el resultado obtenido contra el resultado esperado definido en la MOE.
5. Registrar cualquier desviación detectada durante la validación.

La MOE deberá consultarse antes de iniciar cualquier prueba funcional relacionada con el Laboratorio Operativo CJWMS.

---

# Índice

- Objetivo
- Decisiones de Arquitectura
- Organización del Documento
- Control de Versiones
- MOE-00 — Convenciones del Laboratorio
- MOE-01 — Catálogo Maestro de Productos
- MOE-02 — Catálogo Maestro de Pallets
- MOE-03 — Catálogo de Escenarios Operativos
- MOE-04 — Matriz de Trazabilidad
- MOE-05 — Estado Base del Laboratorio
- Historial de Cambios

---

# Objetivo

La MOE-CJWMS (Matriz Operativa del Escenario CJWMS) es el documento oficial que define el Laboratorio Operativo del proyecto.

Su propósito es proporcionar un escenario permanente, determinista y reproducible para validar todas las funcionalidades del CJWMS durante su desarrollo y evolución.

La MOE constituye la referencia oficial para:

- Preparar el laboratorio.
- Ejecutar pruebas funcionales.
- Validar procesos operativos.
- Mantener la trazabilidad entre funcionalidades y escenarios.
- Restablecer el laboratorio a un estado conocido.

---

# Decisiones de Arquitectura

## DA-001

La MOE-CJWMS será la referencia oficial de pruebas del proyecto.

Toda funcionalidad implementada deberá contar con al menos un escenario de validación dentro de la MOE antes de considerarse terminada.

---

## DA-002

La MOE-CJWMS formará parte del repositorio Git del proyecto y evolucionará junto con el código fuente.

La documentación tendrá el mismo nivel de control de versiones que la aplicación.

---

# Organización del Documento

La MOE se divide en los siguientes módulos:

| Código | Descripción                       |
| ------ | --------------------------------- |
| MOE-00 | Convenciones del Laboratorio      |
| MOE-01 | Catálogo Maestro de Productos     |
| MOE-02 | Catálogo Maestro de Pallets       |
| MOE-03 | Catálogo de Escenarios Operativos |
| MOE-04 | Matriz de Trazabilidad            |
| MOE-05 | Estado Base del Laboratorio       |

---

# Control de Versiones

| Versión | Fase      | Descripción                 |
| ------- | --------- | --------------------------- |
| 1.0     | FASE 22.3 | Creación del documento      |
| 1.1     | Pendiente | Catálogo Maestro de Pallets |
| 1.2     | Pendiente | Escenarios Operativos       |
| 1.3     | Pendiente | Matriz de Trazabilidad      |
| 1.4     | Pendiente | Estado Base del Laboratorio |

---

# MOE-00

# Convenciones del Laboratorio

## Objetivo

Esta sección define el lenguaje oficial del Laboratorio Operativo CJWMS.

Todas las implementaciones, escenarios de prueba, Seeder Operativo y documentación técnica deberán utilizar estas convenciones para garantizar consistencia durante todo el ciclo de vida del proyecto.

---

## 1. Convenciones de Identificación

### Documentos

| Prefijo | Descripción                    |
| ------- | ------------------------------ |
| ARC     | Arquitectura                   |
| AUD     | Auditoría                      |
| DIC     | Diccionario                    |
| IMP     | Implementación                 |
| LAB     | Laboratorio                    |
| MOE     | Matriz Operativa del Escenario |
| OPS     | Operaciones                    |
| VAL     | Validación                     |

Ejemplo:

CJWMS-MOE-001
CJWMS-ARC-001
CJWMS-VAL-001

---

## 2. Convenciones de Productos

### Rotación

| Código | Significado    |
| ------ | -------------- |
| ALT    | Alta rotación  |
| MED    | Media rotación |
| BAJ    | Baja rotación  |

Ejemplos:

ALT-001
MED-002
BAJ-004

---

## 3. Convenciones de Pallets

Formato oficial:

PLT-[SKU]-[Consecutivo]

Ejemplos:

PLT-ALT001-01
PLT-MED002-03
PLT-BAJ004-02

---

## 4. Convenciones de Lotes

Formato oficial:

LOT-[SKU]-[Consecutivo]

Ejemplos:

LOT-ALT001-01
LOT-MED002-02
LOT-BAJ001-01

---

## 5. Roles Operativos

Cada pallet podrá tener un único Rol Operativo dentro del Laboratorio.

| Rol              | Descripción                                       |
| ---------------- | ------------------------------------------------- |
| Stock            | Inventario normal disponible.                     |
| Picking          | Pallet destinado a surtido frecuente.             |
| Reserva          | Inventario reservado para una operación.          |
| Consolidación    | Diseñado para validar consolidaciones.            |
| Reabastecimiento | Fuente para reponer posiciones de picking.        |
| Bloqueado        | Inventario no disponible para operación.          |
| Optimización     | Escenario preparado para recomendaciones futuras. |

---

## 6. Prioridad de los Escenarios

| Prioridad | Uso                                                  |
| --------- | ---------------------------------------------------- |
| Crítica   | Utilizado en la mayoría de las pruebas del proyecto. |
| Alta      | Utilizado frecuentemente durante el desarrollo.      |
| Media     | Utilizado en pruebas específicas.                    |
| Baja      | Escenarios preparados para funcionalidades futuras.  |

---

## 7. Estados Operativos

### Pallets

| Estado  |
| ------- |
| active  |
| blocked |
| damaged |
| out     |

### Inventario

| Estado    |
| --------- |
| available |
| reserved  |
| blocked   |

---

## 8. Convenciones de Escenarios

| Código | Descripción             |
| ------ | ----------------------- |
| S      | Salidas                 |
| C      | Consolidación           |
| R      | Reabastecimiento        |
| RS     | Reservas                |
| B      | Bloqueos                |
| O      | Optimización            |
| IA     | Inteligencia Artificial |

Ejemplos:

S-001
S-002
C-001
R-001
IA-001

---

## 9. Principios del Laboratorio

El Laboratorio Operativo CJWMS deberá cumplir siempre los siguientes principios:

1. Determinista.
2. Reproducible.
3. Escalable.
4. Documentado.
5. Versionado.
6. Compatible con el modelo de datos oficial.
7. Alineado con los procesos operativos del CJWMS.

---

## 10. Regla General

Todo escenario incorporado al Laboratorio deberá:

- tener un identificador único;
- definir claramente su objetivo;
- indicar los pallets participantes;
- especificar el resultado esperado;
- estar asociado al menos a una funcionalidad del sistema;
- formar parte de la Matriz de Trazabilidad (MOE-04).

Esta regla garantiza que cada escenario del Laboratorio tenga un propósito definido y pueda reutilizarse durante todo el ciclo de vida del proyecto.

---

# MOE-01

# Catálogo Maestro de Productos

## Objetivo

El Catálogo Maestro de Productos define los productos oficiales que conforman el Laboratorio Operativo CJWMS.

Cada producto representa un caso de uso específico dentro del almacén y ha sido seleccionado para validar diferentes funcionalidades operativas del sistema, incluyendo movimientos, salidas parciales, consumo multipallet, consolidación, reabastecimiento y futuras recomendaciones mediante Inteligencia Artificial.

Este catálogo constituye la referencia oficial para el Seeder Operativo CJWMS.

---

## Reglas del Catálogo

Todos los productos deberán cumplir las siguientes reglas:

- Cada SKU deberá ser único.
- Cada producto tendrá una única unidad de medida.
- Cada producto tendrá una clasificación de rotación.
- Cada producto definirá una capacidad operativa de referencia por pallet.
- Los productos podrán distribuirse en múltiples pallets.
- Los productos podrán participar en múltiples escenarios operativos.

---

## Clasificación por Rotación

El Laboratorio clasifica los productos en tres categorías.

| Rotación | Descripción                                                                                |
| -------- | ------------------------------------------------------------------------------------------ |
| Alta     | Productos de alta demanda utilizados frecuentemente en picking.                            |
| Media    | Productos de demanda intermedia utilizados para validar escenarios mixtos.                 |
| Baja     | Productos de baja demanda destinados a almacenamiento prolongado y escenarios específicos. |

---

## Catálogo Maestro

| SKU     | Producto                      | Unidad  | Rotación | Capacidad por Pallet | Objetivo Principal           |
| ------- | ----------------------------- | ------- | -------- | -------------------: | ---------------------------- |
| ALT-001 | Agua embotellada 600 ml       | CAJA    | Alta     |                   50 | Picking y salidas parciales  |
| ALT-002 | Refresco 2 L                  | CAJA    | Alta     |                   60 | Salidas completas y reservas |
| ALT-003 | Harina de trigo               | SACO    | Alta     |                  100 | Consumo multipallet          |
| ALT-004 | Aceite vegetal                | CAJA    | Alta     |                   40 | Reabastecimiento             |
| MED-001 | Pintura vinílica              | CUBETA  | Media    |                   30 | Bloqueo de calidad           |
| MED-002 | Detergente líquido            | CAJA    | Media    |                   50 | Consolidación                |
| MED-003 | Papel higiénico institucional | PAQUETE | Media    |                   80 | Optimización de ubicación    |
| MED-004 | Refacción automotriz          | PIEZA   | Media    |                   25 | Inventario insuficiente      |
| BAJ-001 | Lubricante industrial         | TAMBOR  | Baja     |                   20 | Salida completa              |
| BAJ-002 | Resina plástica               | SACO    | Baja     |                   75 | Drive-In                     |
| BAJ-003 | Interruptor industrial        | PIEZA   | Baja     |                   15 | Reservas                     |
| BAJ-004 | Equipo de protección personal | CAJA    | Baja     |                   24 | Escenarios de bloqueo        |

---

## Resumen del Catálogo

| Concepto                    |  Valor |
| --------------------------- | -----: |
| Productos de Alta Rotación  |      4 |
| Productos de Media Rotación |      4 |
| Productos de Baja Rotación  |      4 |
| Total de Productos          | **12** |

---

## Consideraciones de Diseño

La capacidad operativa por pallet representa la capacidad objetivo utilizada por el Laboratorio Operativo para construir escenarios reproducibles.

Esta capacidad no forma parte actualmente del modelo de datos del sistema, pero constituye un parámetro funcional utilizado para:

- validar consolidaciones;
- diseñar escenarios de reabastecimiento;
- evaluar utilización de capacidad;
- preparar futuras recomendaciones mediante Inteligencia Artificial.

---

## Relación con el Seeder

El Seeder Operativo CJWMS deberá generar únicamente productos contenidos en este catálogo.

La incorporación de nuevos productos requerirá la actualización previa de este documento antes de modificar el Seeder o cualquier otro componente del sistema.

---

# MOE-02

# Catálogo Maestro de Pallets

## Objetivo

El Catálogo Maestro de Pallets define el estado físico oficial del Laboratorio Operativo CJWMS.

Cada pallet representa una unidad logística identificable y constituye la base para la construcción del Seeder Operativo, los escenarios de prueba y la validación de las funcionalidades del sistema.

Este catálogo describe la fotografía oficial del almacén y deberá mantenerse sincronizado con el Seeder Operativo.

---

## Reglas del Catálogo

Todos los pallets deberán cumplir las siguientes reglas:

- Cada pallet tendrá un identificador único.
- Cada pallet pertenecerá a un único producto.
- Cada pallet ocupará una única posición física.
- Cada pallet tendrá un único estado operativo.
- Un pallet podrá participar en uno o varios escenarios de prueba.
- Toda modificación al Seeder deberá reflejarse previamente en este catálogo.

---

## Escenario Base del Laboratorio

El Laboratorio Operativo CJWMS contará con un único Escenario Base permanente.

Este escenario constituye la configuración oficial utilizada por el Seeder Operativo y representa el estado inicial del almacén después de ejecutar el proceso de restablecimiento.

El Escenario Base estará conformado por:

| Concepto               |     Valor |
| ---------------------- | --------: |
| Productos              |        12 |
| Pallets                |        32 |
| Posiciones ocupadas    |        32 |
| Escenarios operativos  | Múltiples |
| Estado del laboratorio | Operativo |

Todos los pallets descritos en este capítulo pertenecen al Escenario Base del Laboratorio.

Los escenarios adicionales que se incorporen en fases futuras se documentarán como Escenarios Extendidos y no modificarán el estado base definido en esta sección.

---

# MOE-02A

# Pallets de Alta Rotación

## Objetivo

Los pallets de Alta Rotación representan los productos con mayor frecuencia de movimiento dentro del Laboratorio Operativo CJWMS.

Estos pallets serán utilizados principalmente para validar los procesos de:

- Picking.
- Salidas parciales.
- Salidas completas.
- Consumo multipallet.
- Reabastecimiento.
- Consolidación.
- Optimización futura mediante Inteligencia Artificial.

Su distribución física privilegia las posiciones de acceso rápido, manteniendo algunos casos intencionales que permitirán validar futuras recomendaciones del motor de optimización.

---

## Catálogo de Pallets

| Código        | Producto                | Cantidad | Unidad | Lote          | Ubicación | Pallet Status | Inventory Status | Rol Operativo    | Prioridad | Escenarios MOE | Objetivo de Validación                                  |
| ------------- | ----------------------- | -------: | ------ | ------------- | --------- | ------------- | ---------------- | ---------------- | --------- | -------------- | ------------------------------------------------------- |
| PLT-ALT001-01 | Agua embotellada 600 ml |       50 | CAJA   | LOT-ALT001-01 | A01A      | active        | available        | Picking          | Crítica   | S-001          | Validar salida parcial.                                 |
| PLT-ALT001-02 | Agua embotellada 600 ml |       30 | CAJA   | LOT-ALT001-01 | A02A      | active        | available        | Stock            | Crítica   | S-002, C-001   | Consumo multipallet y consolidación.                    |
| PLT-ALT001-03 | Agua embotellada 600 ml |       20 | CAJA   | LOT-ALT001-01 | C01A      | active        | available        | Consolidación    | Alta      | C-001          | Consolidar con PLT-ALT001-02 para liberar una posición. |
| PLT-ALT001-04 | Agua embotellada 600 ml |       50 | CAJA   | LOT-ALT001-02 | D3-A-1-5  | active        | available        | Reabastecimiento | Alta      | R-001          | Fuente para reabastecimiento de picking.                |
| PLT-ALT002-01 | Refresco 2 L            |       60 | CAJA   | LOT-ALT002-01 | A03A      | active        | available        | Picking          | Crítica   | S-003          | Validar salida completa.                                |
| PLT-ALT002-02 | Refresco 2 L            |       60 | CAJA   | LOT-ALT002-01 | B01A      | active        | reserved         | Reserva          | Alta      | RS-001         | Validar exclusión de pallets reservados.                |
| PLT-ALT002-03 | Refresco 2 L            |       35 | CAJA   | LOT-ALT002-01 | B02A      | active        | available        | Stock            | Alta      | S-002          | Participar en consumo multipallet.                      |
| PLT-ALT002-04 | Refresco 2 L            |       60 | CAJA   | LOT-ALT002-02 | D3-A-1-4  | active        | available        | Reabastecimiento | Media     | R-001          | Reposición hacia posiciones de picking.                 |
| PLT-ALT003-01 | Harina de trigo         |      100 | SACO   | LOT-ALT003-01 | D1-A-1-5  | active        | available        | Stock            | Crítica   | S-002          | Primer pallet del escenario multipallet.                |
| PLT-ALT003-02 | Harina de trigo         |      100 | SACO   | LOT-ALT003-01 | D1-A-1-4  | active        | available        | Stock            | Crítica   | S-002          | Segundo pallet del escenario multipallet.               |
| PLT-ALT003-03 | Harina de trigo         |       40 | SACO   | LOT-ALT003-01 | D1-A-1-3  | active        | available        | Stock            | Alta      | S-002          | Remanente después del consumo multipallet.              |
| PLT-ALT004-01 | Aceite vegetal          |       40 | CAJA   | LOT-ALT004-01 | A04A      | active        | available        | Picking          | Alta      | S-003          | Validar salida completa.                                |
| PLT-ALT004-02 | Aceite vegetal          |       15 | CAJA   | LOT-ALT004-01 | E01A      | active        | available        | Optimización     | Media     | O-001          | Generar recomendación de reubicación por IA.            |
| PLT-ALT004-03 | Aceite vegetal          |       40 | CAJA   | LOT-ALT004-02 | D3-B-1-5  | active        | available        | Reabastecimiento | Alta      | R-001          | Reposición de posiciones de picking.                    |

---

## Resumen

| Concepto                 |                                             Valor |
| ------------------------ | ------------------------------------------------: |
| Productos                |                                                 4 |
| Pallets                  |                                                14 |
| Posiciones Selectivas    |                                                 8 |
| Posiciones Drive-In      |                                                 6 |
| Escenarios MOE cubiertos | S-001, S-002, S-003, C-001, R-001, RS-001 y O-001 |

---

## Observaciones

Los pallets de Alta Rotación constituyen el núcleo operativo del Laboratorio CJWMS.

La mayoría de las validaciones de Picking (OP-008), Empaque (OP-009), Embarque (OP-010) y Confirmación de Salida (OP-011) utilizarán uno o varios pallets definidos en esta sección.

Cualquier modificación a estos pallets deberá reflejarse previamente en la presente MOE antes de implementarse en el Seeder Operativo.

---

# MOE-02B

## Pallets de Media Rotación

### Objetivo

Los pallets de Media Rotación representan productos con demanda intermedia y se utilizan para validar escenarios que normalmente no forman parte del flujo continuo de picking, pero que son fundamentales para garantizar la robustez operativa del sistema.

Estos pallets permiten validar:

- Consolidación de inventario.
- Bloqueos operativos.
- Reubicaciones.
- Inventario insuficiente.
- Optimización de ocupación.
- Consistencia de inventario.

---

## Catálogo de Pallets

| Código        | Producto                      | Cantidad | Unidad  | Lote          | Ubicación | Pallet Status | Inventory Status | Rol Operativo.   | Prioridad | Escenarios MOE | Objetivo de Validación                                      |
| ------------- | ----------------------------- | -------: | ------- | ------------- | --------- | ------------- | ---------------- | ---------------- | --------- | -------------- | ----------------------------------------------------------- |
| PLT-MED001-01 | Pintura vinílica              |       30 | CUBETA  | LOT-MED001-01 | F01A      | active        | available        | Stock            | Alta      | B-001          | Validar bloqueo por calidad.                                |
| PLT-MED001-02 | Pintura vinílica              |       18 | CUBETA  | LOT-MED001-01 | F02A      | active        | blocked          | Bloqueado        | Alta      | B-001          | Inventario bloqueado.                                       |
| PLT-MED001-03 | Pintura vinílica              |       30 | CUBETA  | LOT-MED001-02 | D2-B-1-5  | active        | available        | Stock            | Media     | R-002          | Reubicación desde Drive-In.                                 |
| PLT-MED002-01 | Detergente líquido            |       20 | CAJA    | LOT-MED002-01 | C02A      | active        | available        | Consolidación    | Alta      | C-002          | Pallet parcial origen del escenario de consolidación.       |
| PLT-MED002-02 | Detergente líquido            |       25 | CAJA    | LOT-MED002-01 | C03A      | active        | available        | Consolidación    | Alta      | C-002          | Consolidar ambos pallets en 45 CAJA y liberar una posición. |
| PLT-MED002-03 | Detergente líquido            |       50 | CAJA    | LOT-MED002-02 | D2-C-1-5  | active        | available        | Reabastecimiento | Media     | R-002          | Reabastecimiento.                                           |
| PLT-MED003-01 | Papel higiénico institucional |       80 | PAQUETE | LOT-MED003-01 | G01A      | active        | available        | Stock            | Media     | O-002          | Optimización de ocupación.                                  |
| PLT-MED003-02 | Papel higiénico institucional |       35 | PAQUETE | LOT-MED003-01 | G02A      | active        | available        | Optimización     | Media     | O-002          | Recomendación IA.                                           |
| PLT-MED004-01 | Refacción automotriz          |       25 | PIEZA   | LOT-MED004-01 | H01A      | active        | available        | Picking          | Alta      | S-004          | Inventario insuficiente.                                    |
| PLT-MED004-02 | Refacción automotriz          |        8 | PIEZA   | LOT-MED004-01 | H02A      | active        | available        | Stock            | Alta      | S-004          | Completar solicitud multipallet.                            |

---

## Resumen

| Concepto                 |                              Valor |
| ------------------------ | ---------------------------------: |
| Productos                |                                  4 |
| Pallets                  |                                 10 |
| Posiciones Selectivas    |                                  8 |
| Posiciones Drive-In      |                                  2 |
| Escenarios MOE cubiertos | B-001, C-002, R-002, O-002 y S-004 |

---

## Observaciones

Los pallets de Media Rotación complementan el flujo principal del Laboratorio Operativo.

Su finalidad es validar reglas de negocio, excepciones operativas y escenarios que requieren condiciones específicas de inventario.

Estos pallets permiten comprobar que el sistema responde correctamente ante situaciones menos frecuentes, manteniendo la consistencia del inventario y la trazabilidad de las operaciones.

> **Nota:** Los campos **Rol Operativo** y **Prioridad** forman parte de la especificación funcional del Laboratorio Operativo y actualmente no corresponden a atributos persistidos en la base de datos.

---

# MOE-02C

## Pallets de Baja Rotación

### Objetivo

Los pallets de Baja Rotación representan productos con baja frecuencia de movimiento y están orientados a validar escenarios específicos relacionados con almacenamiento prolongado, reservas, bloqueos y optimización del uso de posiciones.

Estos pallets permiten comprobar el correcto funcionamiento del sistema en situaciones de baja demanda, garantizando la consistencia del inventario y la correcta administración del espacio disponible.

---

## Catálogo de Pallets

| Código        | Producto                      | Cantidad | Unidad | Lote          | Ubicación | Pallet Status | Inventory Status | Rol Operativo | Prioridad | Escenarios MOE | Objetivo de Validación                                                     |
| ------------- | ----------------------------- | -------: | ------ | ------------- | --------- | ------------- | ---------------- | ------------- | --------- | -------------- | -------------------------------------------------------------------------- |
| PLT-BAJ001-01 | Lubricante industrial         |       20 | TAMBOR | LOT-BAJ001-01 | D4-A-1-5  | active        | available        | Stock         | Media     | S-005          | Validar salida completa de baja rotación.                                  |
| PLT-BAJ001-02 | Lubricante industrial         |        8 | TAMBOR | LOT-BAJ001-01 | D4-A-1-4  | active        | available        | Stock         | Baja      | S-005          | Mantener inventario remanente del producto después de una salida completa. |
| PLT-BAJ002-01 | Resina plástica               |       40 | SACO   | LOT-BAJ002-01 | D4-B-1-5  | active        | available        | Consolidación | Media     | C-003, R-003   | Pallet parcial origen para consolidación y almacenamiento Drive-In.        |
| PLT-BAJ002-02 | Resina plástica               |       28 | SACO   | LOT-BAJ002-01 | D4-B-1-4  | active        | available        | Consolidación | Alta      | C-003          | Consolidar 40 + 28 SACO y liberar una posición.                            |
| PLT-BAJ003-01 | Interruptor industrial        |       15 | PIEZA  | LOT-BAJ003-01 | J01A      | active        | reserved         | Reserva       | Alta      | RS-002         | Validar inventario reservado.                                              |
| PLT-BAJ003-02 | Interruptor industrial        |       15 | PIEZA  | LOT-BAJ003-02 | J02A      | active        | available        | Stock         | Media     | S-006          | Liberación de reserva.                                                     |
| PLT-BAJ004-01 | Equipo de protección personal |       24 | CAJA   | LOT-BAJ004-01 | K01A      | blocked       | blocked          | Bloqueado     | Alta      | B-002          | Validar inventario bloqueado.                                              |
| PLT-BAJ004-02 | Equipo de protección personal |       24 | CAJA   | LOT-BAJ004-02 | K02A      | active        | available        | Stock         | Baja      | O-003          | Optimización futura mediante IA.                                           |

---

## Resumen

| Concepto                 |                                             Valor |
| ------------------------ | ------------------------------------------------: |
| Productos                |                                                 4 |
| Pallets                  |                                                 8 |
| Posiciones Selectivas    |                                                 4 |
| Posiciones Drive-In      |                                                 4 |
| Escenarios MOE cubiertos | S-005, S-006, C-003, R-003, RS-002, B-002 y O-003 |

---

## Observaciones

Los pallets de Baja Rotación representan productos cuya demanda es reducida, pero cuya correcta administración resulta indispensable para validar el comportamiento integral del Laboratorio Operativo CJWMS.

Estos pallets complementan el Escenario Base permitiendo validar reservas, bloqueos, consolidaciones, almacenamiento en Drive-In y escenarios de optimización que serán utilizados durante las siguientes fases del proyecto.

> **Nota:** Los campos **Rol Operativo** y **Prioridad** forman parte de la especificación funcional del Laboratorio Operativo y actualmente no corresponden a atributos persistidos en la base de datos.














---

# MOE-03
# Catálogo de Escenarios Operativos

> En construcción.

---

# MOE-04
# Matriz de Trazabilidad

> En construcción.

---

# MOE-05
# Estado Base del Laboratorio

> En construcción.

---

# Historial de Cambios

## Versión 1.0

- Creación del documento.
- Definición de la arquitectura de la MOE.
- Definición de las decisiones DA-001 y DA-002.
- Definición de la estructura general del Laboratorio Operativo CJWMS.