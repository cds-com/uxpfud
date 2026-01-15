# Componentes Custom PFUD/MINVU

Este documento registra los componentes que **NO son parte de CoreUI/Bootstrap** y que fueron creados específicamente para el sistema PFUD/MINVU.

---

## ⚠️ IMPORTANTE: Flujo de Capas

**El HTML debe usar SOLO clases de CoreUI/Bootstrap para garantizar el mapping correcto de TI.**

Los componentes listados aquí son **excepciones documentadas** que requieren coordinación entre UX/UI y TI.

---

## 📋 Componentes Custom

### 1. **Stepper (Indicador de pasos)**

**Descripción:** Componente visual para mostrar el progreso en formularios multipaso o procesos secuenciales.

**Clases CSS:**
```css
.stepper              /* Contenedor principal del stepper */
.step                 /* Cada paso individual */
.step.active          /* Paso activo actual */
.step.completed       /* Paso completado */
.stepper-line         /* Línea conectora entre pasos */
.step-label           /* Etiqueta de texto del paso */
```

**Uso en HTML:**
```html
<div class="stepper">
  <div class="step completed">1</div>
  <div class="stepper-line"></div>
  <div class="step active">2</div>
  <div class="stepper-line"></div>
  <div class="step">3</div>
</div>

<!-- Con etiquetas -->
<div class="stepper">
  <div>
    <div class="step completed">1</div>
    <div class="step-label">Datos personales</div>
  </div>
  <div class="stepper-line"></div>
  <div>
    <div class="step active">2</div>
    <div class="step-label">Documentos</div>
  </div>
  <div class="stepper-line"></div>
  <div>
    <div class="step">3</div>
    <div class="step-label">Confirmación</div>
  </div>
</div>
```

**Estilos definidos en:** [`assets/css/pfud-minvu-general.css`](../assets/css/pfud-minvu-general.css#L436-L458) (líneas 436-458)

**Estados:**
- **Default** (`.step`): Paso pendiente, borde azul, fondo blanco
- **Active** (`.step.active`): Paso actual, fondo azul, texto blanco
- **Completed** (`.step.completed`): Paso completado, fondo azul, texto blanco

**Colores:**
- Border/Background: `#1f5cc4` (azul institucional)
- Texto: `#1f5cc4` (default) / `#fff` (active/completed)
- Línea: `#1f5cc4`, height: 2px

**Dimensiones:**
- Circle: 36px × 36px
- Border: 2px
- Font: 'Roboto Sans', 18px, weight 500

**Responsabilidad de implementación:**
- **UX/UI:** Mantener estilos visuales en CSS
- **TI:** Implementar lógica de cambio de estado (agregar/remover clases `.active`, `.completed`)

---

## 🔧 Alternativas CoreUI/Bootstrap

Si se desea evitar componentes custom, considerar estas alternativas estándar:

### Stepper → **Breadcrumb + Progress Bar**

```html
<!-- Usando componentes CoreUI estándar -->
<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item active">Paso 1</li>
    <li class="breadcrumb-item">Paso 2</li>
    <li class="breadcrumb-item">Paso 3</li>
  </ol>
</nav>

<div class="progress" style="height: 4px;">
  <div class="progress-bar" role="progressbar" style="width: 33%" aria-valuenow="33" aria-valuemin="0" aria-valuemax="100"></div>
</div>
```

**Ventajas:**
- ✅ Usa solo clases CoreUI estándar
- ✅ TI puede mapear sin documentación adicional
- ✅ Accesibilidad nativa (ARIA)

**Desventajas:**
- ❌ No replica exactamente el diseño visual de los mockups

---

## 📝 Proceso para agregar nuevos componentes custom

1. **Validar necesidad:** ¿Existe alternativa en CoreUI/Bootstrap?
2. **Documentar aquí:** Agregar sección con clases, uso y responsabilidades
3. **Notificar a TI:** Coordinar implementación de lógica
4. **Actualizar CSS:** Definir estilos en [`pfud-minvu-general.css`](../assets/css/pfud-minvu-general.css)
5. **Ejemplo en guía:** Agregar demo en [`css.html`](../css.html) si corresponde

---

## 🎯 Objetivo

Minimizar componentes custom para mantener la compatibilidad con el flujo de 3 capas:

1. **CoreUI/Bootstrap** (base de clases estándar)
2. **HTML** (usa clases estándar que TI puede mapear)
3. **CSS Override** (aplica identidad visual PFUD/MINVU)

---

**Última actualización:** 5 de enero de 2026  
**Responsable:** UX/UI PFUD/MINVU
