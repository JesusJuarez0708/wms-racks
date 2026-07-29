# OP-008 — Surtido (Picking)

## 18.7.0 Definición Estratégica del Proceso

### Propósito

El proceso de Surtido (Picking) tiene como propósito seleccionar de manera controlada, precisa y trazable los productos almacenados que conforman una orden de preparación, garantizando que la mercancía retirada del inventario corresponda exactamente a lo solicitado por el cliente y cumpla con las políticas operativas del almacén.

Este proceso constituye el puente entre la administración del inventario y la preparación de los embarques, por lo que su correcta ejecución impacta directamente en la calidad del servicio, la productividad operativa y la satisfacción del cliente.

---

### Objetivos Estratégicos

- Garantizar la correcta selección de productos.
- Reducir errores de surtido.
- Mantener la trazabilidad completa de cada movimiento.
- Optimizar los recorridos de los montacarguistas u operadores.
- Disminuir tiempos de preparación.
- Preservar la integridad del inventario.
- Mantener sincronización entre inventario físico y lógico.
- Registrar todas las evidencias operativas.
- Permitir auditoría completa del proceso.

---

### Importancia dentro del Modelo Operativo Cognitivo (COM)

Dentro del Modelo Operativo Cognitivo, el proceso de Picking representa el inicio de la salida física del inventario.

A partir de este punto la mercancía deja de estar disponible para nuevas asignaciones y comienza la cadena operativa que culminará con el embarque al cliente.

El Motor Cognitivo utiliza este proceso para:

- verificar disponibilidad real;
- validar reglas FEFO/FIFO/LIFO cuando apliquen;
- priorizar órdenes;
- optimizar rutas de surtido;
- minimizar recorridos;
- prevenir errores de extracción;
- detectar inconsistencias de inventario;
- alimentar la inteligencia operativa para futuras recomendaciones.

---

### Principios Operativos

Todo surtido deberá cumplir los siguientes principios:

1. Exactitud.
2. Trazabilidad.
3. Seguridad.
4. Confirmación operativa.
5. Integridad del inventario.
6. Evidencia digital.
7. Cumplimiento de reglas operativas.
8. Auditoría completa.
9. Sincronización con el Motor Cognitivo.
10. Preparación para la siguiente fase operativa.

---

### Resultado Esperado

Al concluir este proceso:

- los productos correctos habrán sido retirados del inventario;
- el inventario quedará actualizado;
- las evidencias quedarán registradas;
- la orden quedará lista para la etapa de empaque o consolidación;
- el Motor Cognitivo dispondrá de toda la información necesaria para continuar el flujo operativo sin pérdida de trazabilidad.

---

# 18.7.1 Objetivo Operativo

## Objetivo General

Seleccionar y retirar del inventario los productos requeridos por una orden de surtido de manera exacta, segura y trazable, garantizando que las cantidades, lotes, ubicaciones y condiciones de la mercancía correspondan con la solicitud autorizada, manteniendo la sincronización entre el inventario físico, el inventario lógico y el Modelo Operativo Cognitivo (COM).

---

## Objetivos Específicos

### OE-01. Exactitud del surtido

Garantizar que cada producto seleccionado corresponda exactamente al SKU, lote, presentación y cantidad solicitados por la orden de surtido.

---

### OE-02. Trazabilidad completa

Registrar cada extracción realizada del inventario, incluyendo operador, fecha, hora, ubicación origen, cantidad retirada y evidencia operativa.

---

### OE-03. Integridad del inventario

Actualizar en tiempo real las existencias disponibles, evitando diferencias entre el inventario físico y el lógico.

---

### OE-04. Cumplimiento de reglas operativas

Aplicar durante el surtido todas las reglas definidas por el almacén, incluyendo políticas de rotación (FIFO, FEFO, LIFO o la que corresponda), restricciones operativas y validaciones del Motor Cognitivo.

---

### OE-05. Optimización operativa

Reducir tiempos de recorrido y minimizar movimientos innecesarios mediante la selección inteligente de ubicaciones de surtido.

---

### OE-06. Seguridad operacional

Realizar la extracción de mercancía preservando la integridad del operador, del producto y de la infraestructura del almacén.

---

### OE-07. Evidencia operativa

Generar evidencia suficiente para permitir auditorías, análisis históricos y reconstrucción completa del proceso de surtido.

---

## Indicadores de Cumplimiento

El proceso se considerará correctamente ejecutado cuando:

- el 100 % de los productos surtidos coincidan con la orden autorizada;
- no existan diferencias entre inventario físico y lógico atribuibles al surtido;
- todas las extracciones cuenten con trazabilidad completa;
- las reglas operativas hayan sido respetadas;
- el proceso quede preparado para la siguiente etapa operativa (empaque, consolidación o embarque).

---

## Relación con el Modelo Operativo Cognitivo (COM)

El objetivo operativo de OP-008 establece el punto de transición entre la administración del inventario y la preparación de pedidos.

La información generada durante este proceso alimenta directamente al Motor Cognitivo para:

- validar la consistencia operativa;
- actualizar el estado de las existencias;
- registrar patrones de surtido;
- optimizar futuras rutas de preparación;
- fortalecer la inteligencia operativa mediante el aprendizaje continuo del comportamiento del almacén.

---

# 18.7.2 Alcance del Proceso

## Alcance General

El proceso OP-008 — Surtido (Picking) comprende todas las actividades necesarias para localizar, seleccionar, extraer y confirmar los productos requeridos por una orden de surtido autorizada, garantizando la exactitud de la mercancía retirada y la actualización inmediata del inventario.

El proceso inicia cuando existe una orden de surtido liberada para ejecución y finaliza cuando todos los productos han sido retirados del inventario, confirmados operativamente y puestos a disposición del siguiente proceso operativo.

---

## Punto de Inicio

El proceso comienza cuando se cumplen las siguientes condiciones:

- Existe una orden de surtido autorizada.
- La mercancía se encuentra disponible en inventario.
- Las ubicaciones de almacenamiento están confirmadas.
- El operador responsable recibe la instrucción de surtido.

---

## Punto de Terminación

El proceso concluye cuando:

- Todos los productos solicitados han sido surtidos.
- Las cantidades fueron verificadas.
- El inventario quedó actualizado.
- Se registraron las evidencias operativas.
- La orden cambia al estado **Surtido**.
- La mercancía queda disponible para el siguiente proceso (empaque, consolidación o embarque).

---

## Procesos Predecesores

Este proceso depende directamente de:

- OP-001 — Control de Acceso
- OP-002 — Recepción Física
- OP-003 — Inspección
- OP-004 — Asignación de Ubicación
- OP-005 — Almacenamiento Físico
- OP-006 — Confirmación Operativa del Almacenamiento
- OP-007 — Consulta de Inventario

---

## Procesos Sucesores

Los procesos que continúan después del surtido podrán variar dependiendo de la operación logística, entre ellos:

- OP-009 — Consolidación de Pedido (si aplica)
- OP-010 — Empaque
- OP-011 — Embarque
- OP-012 — Confirmación de Salida

> **Nota:** En operaciones donde no exista una etapa de consolidación, el flujo puede continuar directamente hacia el proceso de empaque.

---

## Entradas del Proceso

El proceso recibe como entradas:

- Orden de surtido autorizada.
- Inventario disponible.
- Ubicaciones confirmadas.
- Información del producto (SKU, lote, serie, caducidad cuando aplique).
- Reglas operativas de surtido.
- Prioridad de atención.
- Instrucciones del Motor Cognitivo.

---

## Salidas del Proceso

Como resultado del proceso se generan:

- Productos surtidos.
- Inventario actualizado.
- Movimientos de inventario registrados.
- Evidencias operativas.
- Confirmación del surtido.
- Información para el siguiente proceso operativo.

---

## Exclusiones

Este proceso no contempla:

- Empaque.
- Consolidación física del pedido.
- Embarque.
- Transporte.
- Facturación.
- Entrega al cliente.

Estas actividades pertenecen a procesos operativos posteriores.

---

## Relación con el Modelo Operativo Cognitivo (COM)

El alcance definido para OP-008 delimita claramente la responsabilidad operativa del proceso, evitando superposiciones con los procesos anteriores y posteriores.

Esta delimitación facilita:

- la trazabilidad integral;
- la asignación clara de responsabilidades;
- la medición de desempeño;
- la auditoría operativa;
- la evolución independiente del proceso dentro del Modelo Operativo Cognitivo.

---

# 18.7.3 Actores Operativos

## Objetivo

Identificar los actores que intervienen en el proceso de surtido, definiendo claramente sus responsabilidades, interacciones y nivel de participación dentro del Modelo Operativo Cognitivo (COM).

---

## Actores Primarios

### Montacarguista

Es el responsable de ejecutar físicamente el retiro de la mercancía desde las ubicaciones de almacenamiento asignadas.

Su participación inicia una vez que el Supervisor le asigna una orden de surtido y concluye cuando la mercancía ha sido retirada, verificada y entregada al siguiente proceso operativo.

Responsabilidades:

- Recibir la orden de surtido asignada.
- Localizar las ubicaciones indicadas.
- Retirar la mercancía correspondiente.
- Verificar producto, lote y cantidad.
- Confirmar el surtido en el sistema.
- Reportar incidencias operativas.
- Preservar la integridad de la mercancía y de la infraestructura del almacén.

---

### Supervisor de Almacén

Es el responsable de coordinar y controlar operativamente el proceso de surtido.

Responsabilidades:

- Revisar las órdenes de surtido pendientes.
- Liberar la ejecución del surtido.
- Asignar la orden al montacarguista disponible.
- Balancear la carga de trabajo entre operadores.
- Resolver incidencias.
- Autorizar excepciones.
- Validar diferencias de inventario.
- Supervisar el cumplimiento de las reglas operativas.

---

## Actores Secundarios

### Sistema CJWMS

Responsabilidades:

- Generar las órdenes de surtido.
- Asignar prioridades.
- Identificar ubicaciones.
- Registrar movimientos.
- Actualizar inventario.
- Mantener la trazabilidad.

---

### Motor Cognitivo (COM)

Responsabilidades:

- Optimizar rutas de surtido.
- Aplicar reglas operativas.
- Recomendar la mejor secuencia de extracción.
- Detectar anomalías.
- Generar inteligencia operativa.
- Aprender de los patrones históricos.

---

## Actores Externos

### Cliente

Participa de manera indirecta al originar la necesidad de surtido mediante un pedido u orden de salida.

---

## Matriz de Responsabilidades

| Actor                 | Responsabilidad Principal                        |
| --------------------- | ------------------------------------------------ |
| Supervisor de Almacén | Liberar y asignar las órdenes de surtido         |
| Montacarguista        | Ejecutar el retiro físico de la mercancía        |
| CJWMS                 | Coordinar, registrar y actualizar el inventario  |
| Motor Cognitivo (COM) | Optimizar la estrategia y secuencia del surtido  |
| Cliente               | Originar la demanda mediante una orden de salida |

---

## Interacciones Operativas

Durante OP-008 se establece la siguiente secuencia de interacción:

1. El CJWMS genera la orden de surtido.
2. El Supervisor revisa la orden.
3. El Supervisor asigna la orden a un montacarguista disponible.
4. El Motor Cognitivo propone la mejor estrategia y secuencia de surtido.
5. El Montacarguista ejecuta el retiro de la mercancía.
6. El CJWMS registra los movimientos y actualiza el inventario.
7. El Supervisor atiende cualquier excepción operativa.
8. La mercancía queda preparada para el siguiente proceso operativo.

---

## Relación con el Modelo Operativo Cognitivo (COM)

La definición formal de actores permite asignar de manera inequívoca las responsabilidades operativas, separar las decisiones humanas de las decisiones asistidas por inteligencia artificial y garantizar la trazabilidad completa de cada intervención durante el proceso de surtido.

---

# 18.7.4 Precondiciones

## Objetivo

Definir las condiciones operativas que deben cumplirse antes de iniciar el proceso de surtido, garantizando que la ejecución se realice sobre información confiable, inventario disponible y recursos autorizados.

---

## Precondiciones Generales

Para que el proceso OP-008 pueda iniciar, deberán cumplirse las siguientes condiciones:

### PC-01. Orden de surtido autorizada

Debe existir una orden de surtido generada por el CJWMS y autorizada por el Supervisor de Almacén.

---

### PC-02. Inventario disponible

Los productos solicitados deberán encontrarse disponibles en inventario y en estado apto para surtido.

---

### PC-03. Ubicaciones confirmadas

Las ubicaciones físicas de la mercancía deberán estar registradas y confirmadas dentro del sistema.

---

### PC-04. Montacarguista asignado

El Supervisor deberá asignar la orden de surtido a un montacarguista disponible para su ejecución.

---

### PC-05. Equipo operativo disponible

El montacarguista deberá contar con el equipo necesario para realizar el retiro de la mercancía (montacargas, radio, terminal móvil o los dispositivos definidos por la operación).

---

### PC-06. Reglas operativas cargadas

El CJWMS y el Motor Cognitivo deberán tener disponibles las reglas de surtido aplicables (FIFO, FEFO, prioridades, restricciones de ubicación y cualquier otra política vigente).

---

### PC-07. Sin bloqueos operativos

La mercancía no deberá encontrarse bloqueada por calidad, cuarentena, auditoría, mantenimiento o cualquier otra restricción operativa.

---

### PC-08. Acceso seguro

Las rutas hacia las ubicaciones de surtido deberán encontrarse libres y en condiciones seguras para la operación.

---

## Validaciones Previas

Antes de iniciar el surtido, el sistema deberá verificar como mínimo:

- existencia de la orden;
- autorización del Supervisor;
- disponibilidad del inventario;
- estado del producto;
- ubicación registrada;
- montacarguista asignado;
- ausencia de bloqueos operativos.

---

## Resultado Esperado

Al cumplirse todas las precondiciones:

- la orden podrá ejecutarse;
- el montacarguista iniciará el recorrido de surtido;
- el inventario estará preparado para registrar los movimientos correspondientes;
- el proceso avanzará sin inconsistencias operativas.

---

## Relación con el Modelo Operativo Cognitivo (COM)

Las precondiciones constituyen el mecanismo formal que evita la ejecución de órdenes sobre inventario incorrecto, recursos no disponibles o mercancía restringida.

Dentro del COM, estas validaciones representan la puerta de entrada al proceso de surtido y permiten que el Motor Cognitivo opere sobre información consistente, reduciendo errores y fortaleciendo la trazabilidad integral.

---

# 18.7.5 Postcondiciones

## Objetivo

Definir el estado esperado del proceso una vez concluido el surtido, garantizando que la mercancía, el inventario y la información operativa permanezcan sincronizados y preparados para la siguiente etapa del flujo logístico.

---

## Postcondiciones Generales

Al finalizar correctamente el proceso OP-008 deberán cumplirse las siguientes condiciones:

### PS-01. Mercancía surtida

Todos los productos solicitados en la orden deberán haber sido retirados de sus ubicaciones correspondientes.

---

### PS-02. Cantidades verificadas

Las cantidades surtidas deberán coincidir con las cantidades autorizadas en la orden.

---

### PS-03. Inventario actualizado

El inventario lógico deberá reflejar inmediatamente la disminución de existencias correspondiente al surtido realizado.

---

### PS-04. Movimientos registrados

Cada retiro de mercancía deberá generar el movimiento de inventario correspondiente, conservando la trazabilidad completa del proceso.

---

### PS-05. Evidencias operativas registradas

El sistema deberá almacenar todas las evidencias generadas durante el surtido, incluyendo:

- fecha y hora;
- montacarguista responsable;
- supervisor responsable;
- productos surtidos;
- cantidades;
- ubicaciones origen;
- incidencias, en caso de existir.

---

### PS-06. Estado de la orden actualizado

La orden de surtido deberá cambiar al estado **Surtido**, quedando disponible para el siguiente proceso operativo.

---

### PS-07. Mercancía entregada al siguiente proceso

La mercancía surtida deberá quedar físicamente entregada en el área correspondiente según el tipo de operación:

- Área de empaque, cuando el pedido requiera acondicionamiento.
- Andén de embarque, cuando la mercancía pueda despacharse directamente.

En ambos casos, la entrega deberá quedar registrada en el CJWMS para conservar la trazabilidad del proceso.

---

## Validaciones Finales

Antes de cerrar el proceso, el CJWMS deberá verificar:

- que todos los productos fueron surtidos;
- que no existan diferencias entre lo solicitado y lo retirado;
- que el inventario haya sido actualizado correctamente;
- que todas las evidencias hayan sido registradas;
- que la orden pueda avanzar al siguiente proceso.

---

## Resultado Esperado

Al concluir OP-008:

- la mercancía habrá sido retirada correctamente del inventario;
- el inventario permanecerá sincronizado;
- la orden quedará cerrada para la etapa de surtido;
- el siguiente proceso podrá comenzar sin necesidad de validaciones adicionales sobre el retiro de mercancía.

---

## Relación con el Modelo Operativo Cognitivo (COM)

Las postcondiciones representan el criterio formal de finalización del proceso de surtido.

Dentro del COM, estas condiciones permiten garantizar que la información utilizada por los procesos posteriores sea consistente, verificable y completamente trazable, evitando propagación de errores hacia el empaque, la consolidación o el embarque.

---

# 18.7.6 Modelo Oficial de Estados Operativos

## Objetivo

Definir los estados oficiales por los que transita una orden durante el proceso de surtido, permitiendo controlar su evolución, garantizar la trazabilidad y habilitar decisiones inteligentes dentro del Modelo Operativo Cognitivo (COM).

---

## Estados Operativos

### ES-01. Pendiente de Surtido

La orden ha sido generada y autorizada, pero aún no ha sido asignada a un montacarguista.

---

### ES-02. Asignada

El Supervisor asignó la orden a un montacarguista y quedó lista para iniciar su ejecución.

---

### ES-03. En Traslado a Ubicación

El montacarguista se encuentra desplazándose hacia la primera ubicación de surtido.

---

### ES-04. Surtiendo

El montacarguista está retirando la mercancía de una o más ubicaciones.

Durante este estado se registran todos los movimientos del inventario.

---

### ES-05. Validando Surtido

El CJWMS verifica:

- productos;
- cantidades;
- lotes;
- reglas operativas;
- incidencias.

---

### ES-06. Surtido Confirmado

La extracción fue validada correctamente y el inventario quedó actualizado.

---

### ES-07. Entregado al Siguiente Proceso

La mercancía fue entregada físicamente al siguiente proceso operativo.

Dependiendo de la naturaleza de la orden, la transición podrá dirigirse a:

- Área de Empaque.
- Andén de Embarque.

Esta decisión constituye una transición condicional dentro del Modelo Operativo Cognitivo (COM).

---

## Diagrama de Estados

```text
Pendiente de Surtido
        │
        ▼
Asignada
        │
        ▼
En Traslado a Ubicación
        │
        ▼
Surtiendo
        │
        ▼
Validando Surtido
        │
        ▼
Surtido Confirmado
        │
        ▼
Entregado al Siguiente Proceso
        │
   ┌────┴────┐
   ▼         ▼
Empaque   Embarque
```

---

## Transiciones Permitidas

| Estado Actual                  | Evento                | Nuevo Estado                   |
| ------------------------------ | --------------------- | ------------------------------ |
| Pendiente de Surtido           | Supervisor asigna     | Asignada                       |
| Asignada                       | Montacarguista inicia | En Traslado a Ubicación        |
| En Traslado a Ubicación        | Llega a ubicación     | Surtiendo                      |
| Surtiendo                      | Finaliza extracción   | Validando Surtido              |
| Validando Surtido              | Validación correcta   | Surtido Confirmado             |
| Surtido Confirmado             | Entrega física        | Entregado al Siguiente Proceso |
| Entregado al Siguiente Proceso | Requiere empaque      | OP-009 — Empaque               |
| Entregado al Siguiente Proceso | No requiere empaque   | OP-010 — Embarque              |

---

## Reglas del Modelo de Estados

- Ningún surtido podrá iniciar sin haber sido asignado.
- Todo retiro de mercancía deberá quedar asociado a un estado válido.
- No podrá cambiarse una orden a **Surtido Confirmado** sin actualizar previamente el inventario.
- La transición hacia el siguiente proceso dependerá de las características de la orden y de las reglas operativas configuradas.
- Todas las transiciones deberán registrarse con fecha, hora, usuario y evidencia operativa.

---

## Relación con el Modelo Operativo Cognitivo (COM)

El Modelo de Estados de OP-008 incorpora el primer punto formal de decisión dentro del flujo de salida del almacén.

Esta transición condicional permitirá al Motor Cognitivo seleccionar automáticamente el siguiente proceso operativo conforme a las características del pedido, manteniendo la trazabilidad y la flexibilidad del modelo sin duplicar procesos.

---

# 18.7.7 Modelo Oficial de Eventos Operativos

## Objetivo

Definir los eventos que provocan las transiciones de estado durante el proceso de surtido, permitiendo que el CJWMS y el Modelo Operativo Cognitivo (COM) reaccionen de manera consistente, trazable y controlada ante cada cambio operativo.

---

## Eventos de Inicio

### EV-01. Orden de surtido generada

Se crea una nueva orden de surtido a partir de una solicitud de salida autorizada.

**Origen:** CJWMS

---

### EV-02. Orden liberada

El Supervisor autoriza la ejecución de la orden.

**Origen:** Supervisor de Almacén

---

### EV-03. Orden asignada

El Supervisor asigna la orden a un montacarguista disponible.

**Origen:** Supervisor de Almacén

---

## Eventos de Ejecución

### EV-04. Inicio del surtido

El montacarguista acepta la orden e inicia el recorrido hacia la primera ubicación.

**Origen:** Montacarguista

---

### EV-05. Llegada a ubicación

El montacarguista llega a la ubicación asignada para realizar la extracción.

**Origen:** Montacarguista

---

### EV-06. Mercancía retirada

La mercancía es retirada físicamente del rack.

**Origen:** Montacarguista

---

### EV-07. Movimiento registrado

El CJWMS registra el movimiento de inventario correspondiente.

**Origen:** CJWMS

---

### EV-08. Validación completada

El sistema verifica que el producto, lote y cantidad coincidan con la orden.

**Origen:** CJWMS

---

## Eventos de Excepción

### EV-09. Diferencia de inventario detectada

Se identifica una discrepancia entre la orden y la mercancía disponible.

**Origen:** CJWMS

---

### EV-10. Incidencia operativa reportada

El montacarguista informa una situación que impide continuar normalmente con el surtido (ubicación bloqueada, producto dañado, acceso restringido, etc.).

**Origen:** Montacarguista

---

### EV-11. Excepción autorizada

El Supervisor autoriza una acción extraordinaria para continuar el proceso.

**Origen:** Supervisor de Almacén

---

## Eventos de Cierre

### EV-12. Surtido confirmado

La extracción ha finalizado y el inventario fue actualizado correctamente.

**Origen:** CJWMS

---

### EV-13. Mercancía entregada al siguiente proceso

El montacarguista entrega la mercancía en el área correspondiente:

- Empaque, cuando el pedido requiere acondicionamiento.
- Andén de embarque, cuando el pedido puede despacharse directamente.

**Origen:** Montacarguista

---

## Matriz de Eventos

| Evento                    | Disparador           | Estado Resultante              |
| ------------------------- | -------------------- | ------------------------------ |
| Orden de surtido generada | Solicitud autorizada | Pendiente de Surtido           |
| Orden liberada            | Supervisor           | Pendiente de Asignación        |
| Orden asignada            | Supervisor           | Asignada                       |
| Inicio del surtido        | Montacarguista       | En Traslado a Ubicación        |
| Llegada a ubicación       | Montacarguista       | Surtiendo                      |
| Mercancía retirada        | Montacarguista       | Surtiendo                      |
| Movimiento registrado     | CJWMS                | Validando Surtido              |
| Validación completada     | CJWMS                | Surtido Confirmado             |
| Mercancía entregada       | Montacarguista       | Entregado al Siguiente Proceso |

---

## Reglas de los Eventos

- Todo evento deberá registrarse con fecha y hora.
- Cada evento deberá estar asociado a una orden de surtido.
- Los eventos deberán conservar el actor que los originó.
- Ningún evento podrá modificar estados fuera de las transiciones permitidas.
- Todos los eventos deberán quedar disponibles para auditoría y análisis histórico.

---

## Relación con el Modelo Operativo Cognitivo (COM)

Los eventos constituyen los disparadores oficiales del flujo operativo.

El Motor Cognitivo utilizará esta información para:

- reconstruir la secuencia completa de ejecución;
- identificar patrones operativos;
- detectar cuellos de botella;
- calcular indicadores de desempeño;
- alimentar los modelos de aprendizaje continuo y de optimización de procesos.

---

# 18.7.8 Modelo Oficial de Actividades Operativas

## Objetivo

Definir las actividades que ejecuta cada actor durante el proceso de surtido, estableciendo una secuencia operativa clara, trazable y alineada con el Modelo Operativo Cognitivo (COM).

---

## Actividades del Supervisor de Almacén

### ACT-01. Revisar órdenes pendientes

Analizar las órdenes de surtido liberadas y determinar su prioridad de atención.

---

### ACT-02. Asignar montacarguista

Seleccionar un montacarguista disponible considerando la carga de trabajo, la disponibilidad y las necesidades de la operación.

> **Nota:** En futuras versiones del COM, esta actividad podrá apoyarse en recomendaciones del Motor Cognitivo.

---

### ACT-03. Resolver incidencias

Atender las excepciones reportadas durante el surtido y autorizar las acciones necesarias para continuar con la operación.

---

## Actividades del Montacarguista

### ACT-04. Recibir la orden de surtido

Aceptar la orden asignada por el Supervisor y revisar los productos, cantidades y ubicaciones indicadas.

---

### ACT-05. Trasladarse a la ubicación

Desplazarse de forma segura hacia la ubicación donde se encuentra la mercancía.

---

### ACT-06. Verificar la mercancía

Confirmar que el producto, lote, presentación y cantidad correspondan con la orden de surtido.

---

### ACT-07. Retirar la mercancía

Extraer la mercancía de la ubicación asignada siguiendo las reglas operativas del almacén.

---

### ACT-08. Confirmar el surtido

Registrar la extracción en el CJWMS o mediante el mecanismo definido por la operación.

---

### ACT-09. Entregar la mercancía

Trasladar la mercancía al siguiente proceso operativo:

- Área de Empaque, cuando el pedido requiera acondicionamiento.
- Andén de Embarque, cuando el pedido pueda despacharse directamente.

---

### ACT-10. Reportar incidencias

Informar al Supervisor cualquier anomalía detectada durante el surtido.

---

## Actividades del CJWMS

### ACT-11. Generar la orden de surtido

Crear la orden con base en la solicitud de salida autorizada.

---

### ACT-12. Registrar movimientos

Actualizar el inventario y registrar cada extracción realizada.

---

### ACT-13. Validar consistencia

Verificar que los productos retirados coincidan con la orden autorizada.

---

### ACT-14. Actualizar el estado de la orden

Cambiar el estado de la orden conforme avance el proceso.

---

## Actividades del Motor Cognitivo (COM)

### ACT-15. Analizar el contexto operativo

Evaluar disponibilidad de inventario, reglas operativas y condiciones del almacén antes de emitir recomendaciones.

---

### ACT-16. Recomendar estrategia de surtido

Proponer la mejor secuencia de extracción considerando eficiencia, recorridos, prioridades y restricciones operativas.

---

### ACT-17. Registrar patrones operativos

Almacenar información sobre tiempos, recorridos, incidencias y resultados para fortalecer el aprendizaje continuo.

---

## Secuencia General de Actividades

1. El CJWMS genera la orden de surtido.
2. El Supervisor revisa la prioridad.
3. El Supervisor asigna un montacarguista.
4. El Motor Cognitivo recomienda la estrategia de surtido.
5. El montacarguista recibe la orden.
6. El montacarguista se dirige a la ubicación.
7. Verifica la mercancía.
8. Retira la mercancía.
9. El CJWMS registra el movimiento.
10. El montacarguista entrega la mercancía al siguiente proceso.
11. El CJWMS confirma el cierre del surtido.

---

## Relación con el Modelo Operativo Cognitivo (COM)

El Modelo Oficial de Actividades representa la ejecución detallada del proceso.

A diferencia del Modelo de Estados (qué ocurre) y del Modelo de Eventos (qué provoca un cambio), este modelo describe **qué acciones realiza cada actor** y constituye la base para medir productividad, tiempos de ejecución y oportunidades de optimización dentro del COM.

---

# 18.7.9 Reglas Operativas

## Objetivo

Definir las reglas que gobiernan la ejecución del proceso de surtido, garantizando uniformidad operativa, integridad del inventario, trazabilidad y cumplimiento de las políticas del almacén.

---

## Reglas Generales

### RO-01. Inicio autorizado

Ningún surtido podrá iniciar sin una orden previamente liberada por el Supervisor.

---

### RO-02. Asignación obligatoria

Toda orden de surtido deberá estar asignada a un montacarguista antes de iniciar su ejecución.

---

### RO-03. Validación previa

Antes de retirar la mercancía, el montacarguista deberá verificar:

- SKU.
- Lote.
- Cantidad.
- Presentación.
- Ubicación.

---

### RO-04. Integridad del inventario

Toda extracción deberá actualizar inmediatamente el inventario lógico del CJWMS.

---

### RO-05. Trazabilidad

Cada movimiento deberá registrar:

- orden de surtido;
- montacarguista;
- supervisor;
- fecha;
- hora;
- ubicación;
- producto;
- cantidad.

---

## Reglas de Ejecución

### RO-06. Respeto a las reglas de rotación

Cuando aplique, el surtido deberá respetar la política configurada (FIFO, FEFO, LIFO u otra definida por la operación).

---

### RO-07. Prioridad de órdenes

Las órdenes deberán atenderse conforme a la prioridad establecida por la operación o por el Supervisor.

---

### RO-08. Ruta recomendada

Siempre que exista una recomendación emitida por el Motor Cognitivo, esta deberá presentarse al Supervisor o al montacarguista como apoyo a la ejecución.

La recomendación podrá ser aceptada o modificada por el Supervisor.

---

### RO-09. Ubicación no disponible

Si la ubicación asignada no puede surtirse (bloqueo, acceso restringido, mercancía dañada o inexistente), el montacarguista deberá detener la extracción y reportar la incidencia al Supervisor.

No se permitirá seleccionar una ubicación alternativa sin autorización.

---

### RO-10. Surtido parcial

Cuando el inventario disponible sea insuficiente para cubrir la totalidad de la orden, el sistema deberá identificar la condición como **Surtido Parcial**.

La continuación del proceso requerirá autorización del Supervisor conforme a las políticas de la operación.

---

### RO-11. Manejo de diferencias

Toda diferencia detectada entre la orden y la mercancía encontrada deberá registrarse como incidencia antes de continuar.

---

### RO-12. Entrega al siguiente proceso

Al finalizar el surtido, la mercancía deberá entregarse:

- al área de Empaque, cuando el pedido requiera acondicionamiento; o
- directamente al Andén de Embarque, cuando el pedido pueda despacharse sin empaque.

La entrega deberá quedar registrada en el CJWMS.

---

## Reglas de Seguridad

### RO-13. Seguridad operacional

El retiro de mercancía deberá realizarse respetando las normas de seguridad del almacén y el uso adecuado del montacargas.

---

### RO-14. Protección de la mercancía

Durante el surtido deberá preservarse la integridad física del producto, evitando daños por manipulación o transporte interno.

---

## Reglas del Modelo Operativo Cognitivo (COM)

### RO-15. Registro para aprendizaje

Todos los recorridos, tiempos, incidencias y resultados del surtido deberán registrarse para alimentar el aprendizaje continuo del Motor Cognitivo.

---

### RO-16. Recomendaciones inteligentes

Las recomendaciones emitidas por el Motor Cognitivo tendrán carácter asistido y no sustituirán la decisión operativa del Supervisor, salvo que la organización defina un esquema de automatización autorizado.

---

## Resultado Esperado

El cumplimiento de estas reglas garantiza que el proceso de surtido sea ejecutado de forma consistente, segura, trazable y alineada con los principios del Modelo Operativo Cognitivo (COM).

---

# 18.7.10 Matriz Oficial de Trazabilidad Operativa

## Objetivo

Consolidar en una única matriz la relación entre actividades, actores, estados, eventos, reglas operativas y evidencias del proceso de surtido, garantizando la trazabilidad integral definida por el Modelo Operativo Cognitivo (COM).

---

## Matriz de Trazabilidad

| ID    | Actividad                       | Actor Responsable | Evento Asociado | Estado Resultante              | Reglas Aplicables | Evidencia Generada         |
| ----- | ------------------------------- | ----------------- | --------------- | ------------------------------ | ----------------- | -------------------------- |
| TR-01 | Generar orden de surtido        | CJWMS             | EV-01           | Pendiente de Surtido           | RO-01             | Orden generada             |
| TR-02 | Liberar orden                   | Supervisor        | EV-02           | Pendiente de Surtido           | RO-01             | Registro de autorización   |
| TR-03 | Asignar montacarguista          | Supervisor        | EV-03           | Asignada                       | RO-02             | Asignación registrada      |
| TR-04 | Iniciar recorrido               | Montacarguista    | EV-04           | En Traslado a Ubicación        | RO-07             | Inicio de ejecución        |
| TR-05 | Llegar a ubicación              | Montacarguista    | EV-05           | Surtiendo                      | RO-03             | Confirmación de llegada    |
| TR-06 | Retirar mercancía               | Montacarguista    | EV-06           | Surtiendo                      | RO-03, RO-06      | Confirmación de extracción |
| TR-07 | Registrar movimiento            | CJWMS             | EV-07           | Validando Surtido              | RO-04, RO-05      | Movimiento de inventario   |
| TR-08 | Validar surtido                 | CJWMS             | EV-08           | Surtido Confirmado             | RO-11             | Validación registrada      |
| TR-09 | Reportar incidencia (si aplica) | Montacarguista    | EV-10           | Incidencia en Proceso          | RO-09, RO-10      | Registro de incidencia     |
| TR-10 | Autorizar excepción (si aplica) | Supervisor        | EV-11           | Reanudación del Proceso        | RO-09, RO-10      | Autorización registrada    |
| TR-11 | Entregar mercancía              | Montacarguista    | EV-13           | Entregado al Siguiente Proceso | RO-12             | Confirmación de entrega    |

---

## Evidencias Obligatorias

Cada ejecución del proceso deberá generar, como mínimo:

- Orden de surtido.
- Registro de asignación del montacarguista.
- Confirmación de inicio.
- Registro de extracción.
- Movimiento de inventario.
- Confirmación de validación.
- Evidencia de entrega al siguiente proceso.
- Registro de incidencias y autorizaciones, cuando existan.

---

## Objetivos de la Trazabilidad

La información registrada permitirá:

- reconstruir completamente el proceso;
- identificar al responsable de cada actividad;
- verificar el cumplimiento de las reglas operativas;
- facilitar auditorías;
- medir indicadores de desempeño;
- alimentar el aprendizaje continuo del Motor Cognitivo.

---

## Relación con el Modelo Operativo Cognitivo (COM)

La Matriz Oficial de Trazabilidad integra todos los modelos desarrollados para OP-008 (Estados, Eventos, Actividades y Reglas), proporcionando una visión unificada del proceso.

Esta integración constituye el principal mecanismo de seguimiento operativo y la base para el análisis histórico, la inteligencia operativa y la mejora continua dentro del COM.

---

# 18.7.11 Modelo Oficial de Evidencias Operativas

## Objetivo

Definir las evidencias mínimas obligatorias que deberán registrarse durante la ejecución del proceso de surtido, garantizando trazabilidad, auditoría, análisis operativo y aprendizaje continuo dentro del Modelo Operativo Cognitivo (COM).

---

## Evidencias Generadas

### EVD-01. Orden de surtido

Información mínima:

- Identificador de la orden.
- Fecha y hora de generación.
- Supervisor responsable.
- Prioridad.
- Estado inicial.

---

### EVD-02. Asignación del montacarguista

Información mínima:

- Montacarguista asignado.
- Supervisor que realizó la asignación.
- Fecha y hora.
- Estado de la orden.

---

### EVD-03. Inicio del surtido

Información mínima:

- Fecha y hora de inicio.
- Montacarguista.
- Primera ubicación visitada.

---

### EVD-04. Extracción de mercancía

Registrar por cada retiro:

- SKU.
- Descripción.
- Lote (cuando aplique).
- Cantidad.
- Unidad de manejo.
- Ubicación origen.
- Fecha y hora.
- Operador responsable.

---

### EVD-05. Movimiento de inventario

Registrar:

- Tipo de movimiento.
- Existencia antes del surtido.
- Cantidad retirada.
- Existencia posterior.
- Usuario.
- Fecha y hora.

---

### EVD-06. Incidencias operativas (cuando existan)

Registrar:

- Tipo de incidencia.
- Descripción.
- Responsable que la reportó.
- Acción tomada.
- Supervisor que autorizó la resolución.

---

### EVD-07. Entrega al siguiente proceso

Registrar:

- Destino de la mercancía:
  - Área de Empaque; o
  - Andén de Embarque.
- Fecha y hora.
- Montacarguista responsable.
- Estado final del surtido.

---

## Evidencias para Inteligencia Operativa

Además de la evidencia operativa tradicional, el COM almacenará información para análisis histórico:

- tiempo total de surtido;
- tiempo de traslado;
- tiempo de extracción;
- cantidad de ubicaciones visitadas;
- distancia estimada recorrida (cuando exista la información);
- incidencias por zona;
- productividad por operador;
- cumplimiento de prioridades;
- utilización de recomendaciones del Motor Cognitivo.

---

## Conservación de Evidencias

Las evidencias deberán:

- conservarse íntegramente;
- ser auditables;
- permitir reconstruir completamente la ejecución;
- asociarse a la orden correspondiente;
- permanecer disponibles para análisis históricos.

---

## Relación con el Modelo Operativo Cognitivo (COM)

Las evidencias operativas constituyen la fuente oficial de datos para el aprendizaje continuo del Motor Cognitivo.

Su calidad y consistencia determinarán la capacidad del COM para identificar patrones, optimizar recorridos, proponer mejoras y fortalecer la inteligencia operativa del almacén.

---

# 18.7.12 Diagrama Operativo Integrado

## Objetivo

Representar de manera integral el flujo operativo del proceso de surtido, mostrando la interacción entre los actores, los estados, los eventos y la transición hacia el siguiente proceso conforme a las reglas definidas por el Modelo Operativo Cognitivo (COM).

---

## Flujo Operativo General

```text
                 ORDEN DE SALIDA AUTORIZADA
                           │
                           ▼
                CJWMS GENERA ORDEN DE SURTIDO
                           │
                           ▼
            SUPERVISOR REVISA Y LIBERA LA ORDEN
                           │
                           ▼
      SUPERVISOR ASIGNA MONTACARGUISTA DISPONIBLE
                           │
                           ▼
      MOTOR COGNITIVO PROPONE ESTRATEGIA DE SURTIDO
                           │
                           ▼
          MONTACARGUISTA RECIBE LA ORDEN
                           │
                           ▼
      SE TRASLADA A LA UBICACIÓN ASIGNADA
                           │
                           ▼
           VERIFICA PRODUCTO Y CANTIDAD
                           │
                           ▼
            RETIRA LA MERCANCÍA DEL RACK
                           │
                           ▼
       CJWMS REGISTRA MOVIMIENTO DE INVENTARIO
                           │
                           ▼
         CJWMS VALIDA LA CONSISTENCIA DEL SURTIDO
                           │
                           ▼
               SURTIDO CONFIRMADO
                           │
                           ▼
          ENTREGA AL SIGUIENTE PROCESO
                           │
               ¿REQUIERE EMPAQUE?
                     │
          ┌──────────┴──────────┐
          ▼                     ▼
       SÍ                         NO
          │                      │
          ▼                      ▼
 OP-009 — EMPAQUE        OP-010 — EMBARQUE
```

---

## Integración de Componentes del COM

| Componente  | Aplicación en OP-008                                            |
| ----------- | --------------------------------------------------------------- |
| Actores     | Supervisor, Montacarguista, CJWMS, Motor Cognitivo              |
| Estados     | Desde Pendiente de Surtido hasta Entregado al Siguiente Proceso |
| Eventos     | Generación, asignación, extracción, validación y entrega        |
| Actividades | Ejecución completa del surtido                                  |
| Reglas      | Controlan cada transición y validación                          |
| Evidencias  | Documentan toda la ejecución                                    |
| Decisiones  | Determinan el siguiente proceso según el tipo de pedido         |

---

## Escenarios Operativos

### Escenario A — Pedido con Empaque

1. Se realiza el surtido.
2. La mercancía se entrega al área de empaque.
3. Continúa con OP-009.

---

### Escenario B — Pedido sin Empaque

1. Se realiza el surtido.
2. La mercancía se entrega directamente al andén de embarque.
3. Continúa con OP-010.

---

## Relación con el Modelo Operativo Cognitivo (COM)

Este diagrama consolida todos los modelos desarrollados para OP-008 y representa el comportamiento operativo completo del proceso.

La bifurcación final constituye la primera transición condicional formal del COM y servirá como patrón de diseño para futuros procesos que requieran decisiones de flujo basadas en reglas operativas.

---

# 18.7.13 Validación Operativa Integral

## Objetivo

Verificar que el proceso OP-008 — Surtido (Picking) ha sido modelado de manera completa, consistente y alineada con el Modelo Operativo Cognitivo (COM), garantizando su correcta integración con los procesos operativos anteriores y posteriores.

---

## Validación de Integridad del Proceso

| Elemento                     | Estado       |
| ---------------------------- | ------------ |
| Definición Estratégica       | ✅ Completa  |
| Objetivo Operativo           | ✅ Completo  |
| Alcance                      | ✅ Completo  |
| Actores Operativos           | ✅ Validados |
| Precondiciones               | ✅ Validadas |
| Postcondiciones              | ✅ Validadas |
| Modelo de Estados            | ✅ Completo  |
| Modelo de Eventos            | ✅ Completo  |
| Modelo de Actividades        | ✅ Completo  |
| Reglas Operativas            | ✅ Completas |
| Matriz de Trazabilidad       | ✅ Completa  |
| Modelo de Evidencias         | ✅ Completo  |
| Diagrama Operativo Integrado | ✅ Completo  |

---

## Validación del Flujo Operativo

Se confirma que el proceso:

- inicia únicamente con una orden de surtido autorizada;
- requiere asignación del Supervisor a un montacarguista;
- mantiene sincronización entre inventario físico y lógico;
- registra todas las evidencias operativas;
- conserva la trazabilidad completa;
- permite la gestión de incidencias;
- finaliza con la entrega al siguiente proceso operativo.

---

## Validación de Integración con el COM

Se verifica que OP-008 incorpora correctamente los principios fundamentales del Modelo Operativo Cognitivo:

- separación entre responsabilidades humanas y funciones del sistema;
- utilización del Motor Cognitivo como apoyo a la decisión;
- registro estructurado de estados, eventos, actividades y reglas;
- generación de evidencias para auditoría y aprendizaje continuo;
- incorporación de transiciones condicionales hacia procesos posteriores.

---

## Hallazgos Relevantes

Durante el modelado de OP-008 se identificaron oportunidades de evolución para el COM:

1. Formalizar el **Modelo Oficial de Decisiones Operativas** como un componente estándar de todos los procesos.

2. Establecer las **transiciones condicionales** como un mecanismo oficial para representar flujos operativos no lineales.

3. Diferenciar explícitamente entre:

   - **Modelo Operativo Cognitivo (COM):** marco conceptual y metodológico.
   - **Motor Cognitivo:** componente tecnológico que implementa recomendaciones y análisis basados en el COM.

Estas mejoras deberán incorporarse al estándar metodológico antes de iniciar la documentación de los procesos posteriores.

---

## Conclusión

El proceso OP-008 — Surtido (Picking) queda formalmente validado y aprobado como parte del Modelo Operativo Cognitivo (COM).

La documentación desarrollada representa fielmente la operación del almacén, mantiene consistencia con los procesos OP-001 a OP-007 e introduce las bases metodológicas necesarias para la evolución futura del COM y del Motor Cognitivo.