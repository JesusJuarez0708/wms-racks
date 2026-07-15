# Executive Design System

## Objetivo

El Executive Design System define los componentes, patrones y convenciones utilizados por el Centro Ejecutivo del CJWMS.

Su objetivo es garantizar:

- Consistencia visual.
- Reutilización de componentes.
- Escalabilidad.
- Mantenimiento sencillo.
- Evolución controlada del framework.

---

# Arquitectura

```text
executive/

├── ui/
├── cards/
├── patterns/
```

## ui/

Componentes visuales básicos.

Estos componentes representan la unidad mínima del sistema y no contienen lógica de negocio.

Ejemplos:

- ExecutiveCard
- ExecutiveBadge
- ExecutiveSection
- ExecutiveSectionHeader
- ExecutiveMetricCard

---

## cards/

Componentes especializados construidos sobre los componentes base.

Representan piezas reutilizables con un propósito específico.

Ejemplos:

- ExecutiveExecutionStepCard
- ExecutiveExpectedResultCard

---

## patterns/

Patrones de composición.

Estos componentes combinan múltiples elementos del Design System para construir estructuras reutilizables.

Ejemplos:

- ExecutivePanel
- ExecutiveMetricsGrid
- ExecutiveInfoBlock

---

# Principio Fundamental

Los componentes deben expresar la intención del diseño y no únicamente su implementación visual.

Siempre que exista un Pattern reutilizable deberá utilizarse antes de construir nuevamente la misma estructura mediante HTML y clases de Tailwind.