# CJWMS Architecture Overview

## Propósito

El CJWMS (Control Inteligente de WMS Racks) es una plataforma orientada a la optimización logística mediante inteligencia operativa, análisis ejecutivo y automatización de decisiones.

La arquitectura del sistema está diseñada bajo principios de modularidad, reutilización y escalabilidad para facilitar su crecimiento conforme evolucionen los diferentes módulos del proyecto.

---

# Arquitectura General

```text
Usuario

    │

Interfaz React

    │

Pages

    │

Executive Framework

    │

Patterns

    │

UI Components

    │

Business Services

    │

Repositories

    │

Supabase

    │

PostgreSQL
```

---

# Capas del Sistema

## 1. Presentación

Responsable de la interacción con el usuario.

Incluye:

- Pages
- Layout
- Navegación
- Routing

---

## 2. Executive Framework

Framework visual utilizado por el Centro Ejecutivo.

Su responsabilidad es construir interfaces consistentes utilizando componentes reutilizables.

Actualmente está dividido en:

- ui
- cards
- patterns

---

## 3. Servicios

Contienen la lógica de negocio.

Ejemplos:

- Operational Health
- Executive Brain
- Forecast
- Risk Intelligence
- Compliance
- Strategic Opportunities

Los servicios no contienen lógica de presentación.

---

## 4. Repositories

Responsables de la comunicación con la base de datos.

Permiten desacoplar la lógica del almacenamiento.

---

## 5. Base de Datos

Actualmente el proyecto utiliza Supabase sobre PostgreSQL como plataforma de persistencia.

---

# Principios Arquitectónicos

La arquitectura del CJWMS se basa en los siguientes principios:

- Separación de responsabilidades.
- Componentes reutilizables.
- Evolución incremental.
- Bajo acoplamiento.
- Alta cohesión.
- Escalabilidad.
- Documentación como parte del producto.

---

# Filosofía del Proyecto

Cada nueva funcionalidad debe integrarse respetando la arquitectura existente.

La prioridad del proyecto no es únicamente agregar funcionalidades, sino construir una plataforma sostenible, mantenible y preparada para evolucionar durante muchos años.