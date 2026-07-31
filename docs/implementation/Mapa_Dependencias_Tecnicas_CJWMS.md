# Mapa de Dependencias Técnicas CJWMS

---

# Documento

**Proyecto:** CJWMS (Cognitive Warehouse Management System)

**Fase:** 20 — Cierre de Arquitectura Operativa

**Documento:** 20.3 — Mapa de Dependencias Técnicas

**Versión:** 2.0

**Estado:** Oficial

---

# 1. Propósito

El presente documento constituye el mapa oficial de dependencias técnicas del CJWMS.

Su finalidad es documentar las relaciones existentes entre los componentes implementados del sistema con base exclusivamente en evidencia observable del repositorio.

A diferencia del Modelo Cognitivo Operacional (COM), este documento no describe procesos de negocio.

A diferencia del Framework de Auditoría de Implementación (FAI), no evalúa el grado de implementación.

Su objetivo es representar la estructura técnica del software y las relaciones existentes entre sus componentes.

---

# 2. Alcance

El mapa comprende las dependencias observables entre las principales capas del CJWMS:

- Interfaces de usuario.
- Componentes React.
- Contexto global.
- Servicios de aplicación.
- Servicios de orquestación.
- Repositorios.
- Persistencia en Supabase.

Asimismo, identifica los principales puntos de acoplamiento del sistema y los componentes compartidos por múltiples procesos operativos.

---

# 3. Principios Arquitectónicos

Toda dependencia documentada deberá cumplir simultáneamente con los siguientes criterios.

## 3.1 Evidencia observable

Toda relación deberá poder verificarse mediante:

- imports;
- llamadas de funciones;
- consumo de contexto;
- utilización de tipos;
- acceso a repositorios;
- consultas a entidades persistentes.

No se documentarán relaciones inferidas únicamente por comportamiento esperado.

---

## 3.2 Dirección de la dependencia

Las relaciones se representan desde el componente consumidor hacia el componente utilizado.

Ejemplo:

```text
Página
    ↓
Servicio
    ↓
Repositorio
    ↓
Entidad
```

---

## 3.3 Dependencias directas

Se consideran dependencias directas aquellas observables mediante imports o llamadas explícitas.

Ejemplo:

```text
MovementsPage
    ↓
movementService
```

---

## 3.4 Dependencias indirectas

Se consideran dependencias indirectas aquellas mediadas por una capa intermedia.

Ejemplo:

```text
MontacargasPage
        ↓
WmsDataContext
        ↓
Movimientos
```

---

## 3.5 Componentes de orquestación

Se consideran componentes de orquestación aquellos cuya responsabilidad consiste en coordinar múltiples servicios especializados sin representar la lógica final del proceso.

Ejemplos observados durante la inspección técnica:

- movementWorkflowService
- executiveOrchestrationService

---

# 4. Capas Arquitectónicas

Durante las auditorías FAI se identificaron las siguientes capas técnicas.

## Capa de Presentación

Responsable de las interfaces visibles para el usuario.

Incluye páginas y componentes React.

---

## Capa de Coordinación

Responsable del intercambio de información compartida entre páginas.

Actualmente representada principalmente por:

```text
WmsDataContext
```

---

## Capa de Servicios

Responsable de la lógica de aplicación.

Incluye servicios de negocio, consulta y coordinación.

---

## Capa de Orquestación

Responsable de coordinar múltiples servicios especializados.

En esta capa se identifican actualmente:

- movementWorkflowService
- executiveOrchestrationService

---

## Capa de Persistencia

Responsable del acceso a datos mediante repositorios y entidades de Supabase.

Representa la frontera entre la aplicación y la base de datos.

---

# 5. Clasificación Oficial de Dependencias

Para efectos del presente documento las dependencias se clasifican en cuatro categorías.

| Categoría    | Descripción                                                       |
| ------------ | ----------------------------------------------------------------- |
| Directa      | Existe consumo observable mediante import o llamada explícita.    |
| Indirecta    | La relación ocurre mediante un componente intermedio verificable. |
| Orquestación | El componente coordina múltiples servicios especializados.        |
| Persistencia | La dependencia termina en una entidad almacenada en Supabase.     |

Esta clasificación será utilizada en las secciones posteriores para representar el mapa oficial de dependencias del CJWMS.

---

# 6. Mapa Oficial de Dependencias Directas

Las siguientes dependencias fueron verificadas mediante inspección técnica del repositorio durante la FASE 20.

Únicamente se documentan relaciones observables.

---

## 6.1 MovementsPage

### Dependencias directas verificadas

```text
MovementsPage
├── MovementFormModal
├── movementService
├── productService
├── palletService
├── rackPositionService
└── enrichMovement
```

### Observaciones

La página consume directamente servicios de consulta y enriquecimiento de información.

No existe evidencia de una dependencia directa hacia `movementWorkflowService`.

---

## 6.2 MontacargasPage

### Dependencias directas verificadas

```text
MontacargasPage
├── WmsDataContext
└── data/racks
```

### Observaciones

La lógica operacional se obtiene mediante `useWmsData()`.

No se observaron imports directos hacia servicios, repositorios o flujos de movimiento.

---

## 6.3 OrdenesTrabajoPage

### Dependencias directas verificadas

```text
OrdenesTrabajoPage
└── WmsDataContext
```

### Observaciones

Toda la interacción con órdenes de trabajo ocurre mediante el contexto global.

No existe evidencia de una dependencia directa con `MontacargasPage`.

---

## 6.4 RacksPage

### Dependencias directas verificadas

```text
RacksPage
├── inventoryService
├── rackPositionService
├── palletService
├── productService
└── movementService
```

### Observaciones

RacksPage concentra la consulta operativa del inventario y de los movimientos relacionados con las posiciones físicas del almacén.

---

## 6.5 HistoryPage

### Dependencias directas verificadas

```text
HistoryPage
└── WmsDataContext
```

### Observaciones

La información histórica proviene del contexto compartido.

---

## 6.6 DashboardPage

### Dependencias directas verificadas

```text
DashboardPage
├── DashboardHeader
├── KpiCard
├── MovementsTable
├── RackStatusPanel
├── dashboardService
├── operationalIntelligenceService
└── operationalOptimizationService
```

### Observaciones

El Dashboard integra componentes visuales con servicios especializados para indicadores, alertas y recomendaciones.

---

## 6.7 OptimizacionPage

### Dependencias directas verificadas

La página de optimización presenta el mayor número de dependencias directas observadas en el sistema.

Entre ellas destacan:

#### Componentes

- ExecutiveSummarySection
- ExecutiveForecastSection
- ExecutiveImpactSimulationSection
- ExecutiveComplianceSection
- ExecutiveExecutionTrackingSection
- ExecutivePrioritiesSection
- ExecutiveActionPlanSection
- ExecutiveRiskRadarSection
- ExecutiveNarrativeSection
- ExecutiveScenarioCenterSection
- ExecutiveExecutionCenterSection
- ExecutiveCommandCenterSection
- ExecutiveRiskIntelligenceSection
- ExecutiveHealthSection
- ExecutiveProjectionSection
- ExecutiveDecisionSimulatorSection
- ExecutiveBrainSection
- ExecutiveInsightSection
- ExecutiveKpiPanel
- ExecutiveExecutionStepCard
- ExecutiveExpectedResultCard

#### Servicios ejecutables

- executiveOrchestrationService
- executiveBrainService
- executiveInsightService
- operationalMaturityService
- operationalRoadmapService
- strategicRecommendationEngineService
- executivePlannerService
- executiveSimulationImpactService

### Observaciones

OptimizacionPage funciona como el principal punto de integración de la arquitectura ejecutiva del CJWMS y concentra la mayor cantidad de dependencias directas verificadas durante las auditorías.

---

# 7. Mapa Oficial de Dependencias Indirectas

Las dependencias indirectas representan relaciones observables que ocurren mediante una capa de coordinación u orquestación.

No implican un import directo entre el origen y el destino.

---

## 7.1 Coordinación mediante WmsDataContext

Durante la inspección técnica se verificó que varias páginas consumen información operativa mediante el contexto global.

La relación general es la siguiente:

```text
                WmsDataContext
               /       |       \
              /        |        \
             /         |         \
MovementsPage  HistoryPage  OrdenesTrabajoPage
                     \
                      \
                 MontacargasPage
```

El contexto concentra información compartida relacionada con:

- movimientos;
- órdenes de trabajo;
- estados operativos;
- funciones de actualización;
- información utilizada por múltiples páginas.

Por ello constituye uno de los principales puntos de coordinación del sistema.

---

## 7.2 Orquestación del Flujo Operativo

La inspección del repositorio permitió identificar que `movementWorkflowService` no es consumido directamente por las páginas principales.

Su responsabilidad consiste en coordinar múltiples servicios especializados.

La relación observada es:

```text
movementWorkflowService
│
├── movementService
├── inventoryService
├── palletService
└── operationalMemoryService
```

Posteriormente estos servicios continúan hacia sus respectivos repositorios y entidades persistentes.

Este patrón corresponde a un componente de orquestación.

---

## 7.3 Orquestación Ejecutiva

El componente con mayor nivel de integración observado es:

```text
executiveOrchestrationService
```

Su responsabilidad consiste en coordinar múltiples servicios ejecutivos especializados.

Entre ellos:

- Operational Narrative
- Operational Health
- Operational Trend
- Operational Forecast
- Operational Action Plan
- Operational Impact Simulation
- Executive Priorities
- Operational Execution Tracking
- Operational Compliance
- Executive KPI
- Executive Decision Summary
- Executive Command Center
- Executive Risk Intelligence
- Executive Forecast
- Executive Decision Simulator
- Operational Saturation Predictor
- Predictive Work Order
- Intelligent Work Order Execution
- Strategic Alerts
- Strategic Opportunities
- Prioritized Scenarios

Este servicio representa el principal orquestador de la capa ejecutiva del CJWMS.

---

# 8. Nodos Arquitectónicos Críticos

Los siguientes componentes presentan un alto grado de reutilización o coordinación y, por tanto, requieren especial atención durante cualquier modificación.

## 8.1 WmsDataContext

Responsabilidad principal:

- coordinación del estado operativo compartido;
- distribución de movimientos;
- administración de órdenes de trabajo;
- sincronización entre páginas.

Impacto esperado ante modificaciones:

Alto.

Un cambio puede afectar simultáneamente varias interfaces operativas.

---

## 8.2 movementWorkflowService

Responsabilidad principal:

- coordinar la ejecución de movimientos;
- actualizar inventario;
- registrar memoria operativa;
- coordinar servicios especializados.

Impacto esperado:

Muy alto.

Una modificación puede afectar múltiples procesos COM relacionados con movimientos e inventario.

---

## 8.3 executiveOrchestrationService

Responsabilidad principal:

- integrar los servicios ejecutivos;
- consolidar indicadores;
- coordinar análisis;
- preparar información para la interfaz ejecutiva.

Impacto esperado:

Muy alto.

Representa el principal punto de integración de la arquitectura cognitiva del CJWMS.

---

## 8.4 movementRepository

Responsabilidad principal:

Persistencia de los movimientos operativos.

Impacto esperado:

Alto.

Los cambios afectan trazabilidad, historial y ejecución operacional.

---

## 8.5 inventoryRepository

Responsabilidad principal:

Persistencia del inventario.

Impacto esperado:

Alto.

Las modificaciones repercuten directamente en disponibilidad, ubicación y consultas de inventario.

---

## 8.6 operationalMemoryService

Responsabilidad principal:

Registrar evidencia operacional y memoria del sistema.

Impacto esperado:

Medio-Alto.

Su utilización es transversal para la trazabilidad y los componentes cognitivos.

---

# 9. Matriz Oficial de Dependencias

La siguiente matriz resume las dependencias verificadas durante la inspección técnica.

| Capa                          | Dependencia Principal       | Tipo         |
| ----------------------------- | --------------------------- | ------------ |
| Presentación                  | Componentes React           | Directa      |
| Presentación                  | WmsDataContext              | Directa      |
| Presentación                  | Servicios de Aplicación     | Directa      |
| Componentes                   | Servicios                   | Directa      |
| Componentes                   | Contexto Global             | Directa      |
| WmsDataContext                | Estado Operativo Compartido | Coordinación |
| movementService               | movementRepository          | Directa      |
| inventoryService              | inventoryRepository         | Directa      |
| operationalMemoryService      | operationalMemoryRepository | Directa      |
| movementWorkflowService       | Servicios Operativos        | Orquestación |
| executiveOrchestrationService | Servicios Ejecutivos        | Orquestación |
| Repositorios                  | Supabase                    | Persistencia |

Esta matriz resume las relaciones observables entre las capas principales del CJWMS.

No representa el flujo completo de ejecución, sino la clasificación oficial de dependencias verificadas.

---

# 10. Dependencias por Proceso Operativo

La siguiente tabla resume los componentes técnicos que participan en cada proceso operativo documentado.

| Proceso | Componentes Técnicos Principales                                               |
| ------- | ------------------------------------------------------------------------------ |
| OP-001  | Sin evidencia suficiente                                                       |
| OP-002  | movementService, movementWorkflowService, inventoryService, WmsDataContext     |
| OP-003  | Sin evidencia suficiente                                                       |
| OP-004  | movementWorkflowService, inventoryService, rackPositionService, WmsDataContext |
| OP-005  | movementWorkflowService, inventoryService                                      |
| OP-006  | movementWorkflowService, operationalMemoryService                              |
| OP-007  | inventoryService, movementService, palletService, productService               |
| OP-008  | movementWorkflowService, WmsDataContext                                        |
| OP-009  | Sin evidencia suficiente                                                       |
| OP-010  | movementWorkflowService, operationalMemoryService                              |
| OP-011  | movementWorkflowService, operationalMemoryService                              |

La tabla anterior constituye una vista resumida.

El detalle de cada dependencia deberá consultarse directamente en las auditorías FAI correspondientes.

---

# 11. Análisis de Impacto

Antes de modificar cualquier componente técnico deberá evaluarse:

- qué páginas consumen el componente;
- qué servicios dependen de él;
- si participa en un proceso de orquestación;
- qué repositorios utiliza;
- qué entidades persistentes modifica;
- qué procesos COM podrían verse afectados;
- qué auditorías FAI requerirán actualización;
- qué documentos arquitectónicos deberán mantenerse sincronizados.

Los componentes clasificados como **Nodos Arquitectónicos Críticos** deberán analizarse con especial atención debido a su impacto transversal.

---

# 12. Reglas de Actualización

El presente documento deberá actualizarse cuando ocurra cualquiera de los siguientes eventos:

- incorporación de nuevas páginas;
- creación de nuevos servicios;
- incorporación de nuevos componentes de orquestación;
- modificación de dependencias verificadas;
- incorporación de nuevos repositorios;
- cambios en la estructura de persistencia;
- implementación de nuevos procesos COM;
- actualización de las auditorías FAI con nueva evidencia técnica.

Toda modificación deberá estar respaldada por evidencia observable del repositorio.

---

# 13. Relación con otros Documentos

El Mapa de Dependencias Técnicas mantiene relación directa con:

- Modelo Cognitivo Operacional (COM)
- Documentación Oficial OP-001 a OP-011
- Framework de Auditoría de Implementación (FAI)
- Auditorías FAI-OP-001 a FAI-OP-011
- Mapa Maestro de Implementación
- Matriz de Trazabilidad Completa
- Backlog Oficial de Brechas de Implementación

En conjunto, estos documentos constituyen la arquitectura documental oficial del CJWMS.

---

# 14. Observaciones

El análisis realizado durante la FASE 20 permitió identificar tres patrones estructurales predominantes dentro del CJWMS:

1. Coordinación mediante contexto compartido (`WmsDataContext`).
2. Orquestación operativa (`movementWorkflowService`).
3. Orquestación ejecutiva (`executiveOrchestrationService`).

Estos componentes concentran una parte significativa de las dependencias observables del sistema y representan los principales puntos de integración entre la interfaz, la lógica de negocio y la persistencia.

El presente documento establece la línea base oficial del Mapa de Dependencias Técnicas al cierre de la FASE 20.3 y deberá evolucionar únicamente con base en evidencia técnica verificable del repositorio.