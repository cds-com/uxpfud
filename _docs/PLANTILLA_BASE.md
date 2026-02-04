# Plantilla Base - Sistema PFUD MINVU

## 📋 Descripción General

Este documento define la estructura HTML estándar utilizada en todas las páginas del sistema PFUD (Portal de Formularios Únicos Digitales) del MINVU. La plantilla se basa en **CoreUI v4.x** y Bootstrap 5.

---

## 🏗️ Estructura Principal

```
html
└── body.theme-auto
    └── div.d-flex (contenedor flexbox principal)
        ├── SIDEBAR (navegación lateral fija)
        └── WRAPPER (contenedor principal)
            ├── HEADER (cabecera sticky)
            ├── BODY (contenido principal)
            └── FOOTER (pie de página)
```

---

## 📦 Componentes CoreUI Utilizados

### 1. SIDEBAR - Navegación Lateral

**Clases principales:**
- `.sidebar` - Componente base
- `.sidebar-dark` - Tema oscuro
- `.sidebar-fixed` - Posición fija en viewport
- `.border-end` - Borde derecho

**Estructura:**
```html
<div class="sidebar sidebar-dark sidebar-fixed border-end" id="sidebar">
  <div class="sidebar-header">
    <div class="sidebar-brand">...</div>
  </div>
  <ul class="sidebar-nav" data-coreui="navigation" data-simplebar>
    <li class="nav-item">...</li>
    <li class="nav-title">...</li>
    <li class="nav-divider">...</li>
  </ul>
  <div class="sidebar-footer">...</div>
</div>
```

**Elementos del sidebar:**
- **nav-item**: Item de navegación estándar
- **nav-link**: Link dentro del item (usar `.active` para página actual)
- **nav-icon**: SVG icon dentro del link
- **nav-title**: Título de sección
- **nav-divider**: Línea divisoria visual
- **badge.ms-auto**: Contador en extremo derecho

**Atributos especiales:**
- `data-coreui="navigation"` - Activa navegación CoreUI
- `data-simplebar=""` - Activa scrollbar personalizado
- `data-coreui-toggle="unfoldable"` - Botón de colapsar sidebar

---

### 2. HEADER - Cabecera Superior

**Clases principales:**
- `.header` - Componente base
- `.header-sticky` - Sticky al hacer scroll
- `.p-0 .mb-4` - Sin padding, margen inferior

**Estructura:**
```html
<header class="header header-sticky p-0 mb-4" data-coreui-theme="auto">
  <div class="bg-body-tertiary border-bottom position-sticky top-0 z-3">
    <div class="container-fluid px-5">
      <div class="d-flex justify-content-between">
        <!-- Saludo usuario -->
        <!-- Selector rol (dropdown) -->
        <!-- Acciones (A-, A+, tema, ayuda, perfil, salir) -->
      </div>
    </div>
  </div>
  <div class="container-fluid px-5">
    <!-- Breadcrumb (opcional) -->
  </div>
</header>
```

**Secciones del header:**

#### a) Saludo usuario
```html
<div class="d-flex align-items-center flex-shrink-0">
  <span class="text-body-secondary small me-2 d-none d-lg-inline">Hola,</span>
  <span class="fw-semibold small d-none d-lg-inline">Nombre Usuario</span>
</div>
```

#### b) Selector de rol (Dropdown)
```html
<div class="dropdown">
  <button class="btn btn-outline-secondary btn-sm dropdown-toggle" 
          data-coreui-toggle="dropdown">
    Rol Actual
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item active" href="#">Rol 1</a></li>
  </ul>
</div>
```

#### c) Botones de accesibilidad
```html
<!-- A- -->
<button class="btn btn-outline-secondary btn-sm" 
        onclick="adjustFontSize(-1)">A-</button>

<!-- A+ -->
<button class="btn btn-outline-secondary btn-sm" 
        onclick="adjustFontSize(1)">A+</button>
```

#### d) Selector de tema (Dropdown)
```html
<div class="dropdown">
  <button class="btn btn-link text-body p-0" 
          id="bd-theme" 
          data-coreui-toggle="dropdown">
    <svg class="icon icon-lg theme-icon-active">
      <use href="...#cil-sun"></use>
    </svg>
  </button>
  <ul class="dropdown-menu dropdown-menu-end">
    <li>
      <button class="dropdown-item" data-coreui-theme-value="light">
        Claro
      </button>
    </li>
    <!-- dark, auto -->
  </ul>
</div>
```

#### e) Links de navegación
```html
<!-- Ayuda -->
<a href="ayuda.html" class="btn btn-link text-body p-0">
  <svg class="icon icon-lg">...</svg>
  <span class="d-none d-lg-inline ms-1">Ayuda</span>
</a>

<!-- Mi Perfil -->
<a href="mi-perfil.html" class="btn btn-link text-body p-0">
  <svg class="icon icon-lg">...</svg>
  <span class="d-none d-lg-inline ms-1">Mi Perfil</span>
</a>

<!-- Salir (modal) -->
<button class="btn btn-link text-body p-0" 
        data-coreui-toggle="modal" 
        data-coreui-target="#logoutModal">
  <svg class="icon icon-lg">...</svg>
  <span class="d-none d-lg-inline ms-1">Salir</span>
</button>
```

#### f) Breadcrumb (opcional)
```html
<nav aria-label="breadcrumb">
  <ol class="breadcrumb my-0 py-2">
    <li class="breadcrumb-item"><a href="dashboard.html">Inicio</a></li>
    <li class="breadcrumb-item active">Página Actual</li>
  </ol>
</nav>
```

---

### 3. BODY - Contenido Principal

**Clases principales:**
- `.body` - Contenedor principal
- `.flex-grow-1` - Ocupa espacio disponible
- `.bg-body-tertiary` - Fondo terciario

**Estructura:**
```html
<div class="body flex-grow-1 bg-body-tertiary">
  <div class="container-fluid px-5">
    <!-- Título de página -->
    <!-- Grid de KPIs -->
    <!-- Grid de contenido -->
  </div>
</div>
```

---

### 4. CARDS - Tarjetas de Contenido

#### a) Card KPI (Métrica)
```html
<div class="col-12 col-md-4 col-xl-2">
  <div class="card h-100">
    <div class="card-body d-flex flex-column justify-content-between align-items-start p-3">
      <!-- Número -->
      <div class="w-100">
        <span class="fs-2 fw-semibold">24</span>
      </div>
      <!-- Título -->
      <div class="w-100">
        <span class="fs-6 text-uppercase fw-bold d-block">FORMULARIOS</span>
      </div>
      <!-- Descripción -->
      <div class="w-100 mb-2">
        <span class="mall text-body-secondary d-block">Publicados</span>
      </div>
      <!-- Icono decorativo -->
      <div class="position-absolute top-0 end-0 m-2">
        <svg class="text-body-secondary opacity-50" width="32" height="32">
          <use xlink:href="...#cil-check-circle"></use>
        </svg>
      </div>
    </div>
  </div>
</div>
```

**Características:**
- `.h-100` - Altura 100% para uniformidad
- `.card-body .p-3` - Padding reducido
- `.position-absolute` - Icono posicionado en esquina

#### b) Card con Tabla
```html
<div class="card">
  <!-- Header con título y badge -->
  <div class="card-header d-flex justify-content-between align-items-center">
    <div class="fw-semibold">Título</div>
    <span class="badge bg-secondary">12 Items</span>
  </div>
  
  <!-- Body con tabla -->
  <div class="card-body p-0">
    <div class="table-responsive">
      <table class="table mb-0">
        <tbody>
          <tr class="pfud-table-truncate">...</tr>
        </tbody>
      </table>
    </div>
  </div>
  
  <!-- Footer con botón (opcional) -->
  <div class="card-footer text-end">
    <a href="#" class="btn btn-outline-secondary btn-sm small">Ver Todos</a>
  </div>
</div>
```

**Notas importantes:**
- `.card-body .p-0` - Sin padding cuando contiene tabla
- `.table-responsive` - Scroll horizontal en móviles
- `.table .mb-0` - Sin margen inferior
- `.pfud-table-truncate` - Clase custom para truncar texto

#### c) Card con Alertas (Estado vacío)
```html
<div class="card">
  <div class="card-header">...</div>
  <div class="card-body p-0">
    <!-- Alert info -->
    <div class="alert alert-info d-flex align-items-center m-3" role="alert">
      <svg class="icon icon-xl me-3 flex-shrink-0">
        <use xlink:href="...#cil-info"></use>
      </svg>
      <div>Mensaje informativo...</div>
    </div>
    
    <!-- Alert danger -->
    <div class="alert alert-danger d-flex align-items-center m-3" role="alert">
      <svg class="icon icon-xl me-3 flex-shrink-0">
        <use xlink:href="...#cil-warning"></use>
      </svg>
      <div>Mensaje de error...</div>
    </div>
  </div>
</div>
```

**Variantes de alertas:**
- `.alert-info` - Información (azul)
- `.alert-success` - Éxito (verde)
- `.alert-warning` - Advertencia (amarillo)
- `.alert-danger` - Error (rojo)

---

### 5. TABLES - Tablas de Datos

**Estructura de fila:**
```html
<tr class="pfud-table-truncate">
  <td>
    <div class="d-flex align-items-start gap-3">
      <!-- Badge identificador -->
      <div class="flex-shrink-0">
        <span class="badge bg-primary">2-5.2</span>
      </div>
      
      <!-- Contenido principal -->
      <div class="flex-grow-1 overflow-hidden">
        <div class="fw-semibold small pfud-text-truncate-2">
          Título del documento...
        </div>
        <div class="mall text-body-secondary">
          <span class="fw-bold">Campo:</span>
          <span>Valor</span>
        </div>
      </div>
    </div>
  </td>
  
  <!-- Columna de acciones -->
  <td class="text-end">
    <div class="dropdown">
      <button class="btn btn-link text-body p-0" 
              data-coreui-toggle="dropdown">
        <svg class="icon">
          <use xlink:href="...#cil-options"></use>
        </svg>
      </button>
      <div class="dropdown-menu dropdown-menu-end">
        <a class="dropdown-item" href="#">
          <svg width="18" height="18">...</svg>
          Acción 1
        </a>
      </div>
    </div>
  </td>
</tr>
```

**Clases custom (pfud.css):**
- `.pfud-table-truncate` - Trunca filas largas
- `.pfud-text-truncate-2` - Trunca a 2 líneas
- `.mall` - Tamaño de fuente pequeño

---

### 6. GRID SYSTEM - Sistema de Grillas

**Grid de KPIs (6 columnas):**
```html
<div class="row g-3 mb-4">
  <div class="col-12 col-md-4 col-xl-2">...</div>
  <div class="col-12 col-md-4 col-xl-2">...</div>
  <!-- 4 más... -->
</div>
```

**Grid de contenido (2 columnas):**
```html
<div class="row g-4 mb-4">
  <div class="col-12 col-md-6">...</div>
  <div class="col-12 col-md-6">...</div>
</div>
```

**Breakpoints:**
- `col-12` - Móvil (< 768px): 1 columna
- `col-md-6` - Tablet (≥ 768px): 2 columnas
- `col-md-4` - Tablet (≥ 768px): 3 columnas
- `col-xl-2` - Desktop (≥ 1200px): 6 columnas

**Gaps:**
- `g-3` - Gap mediano (KPIs)
- `g-4` - Gap grande (contenido)

---

### 7. MODALES

**Estructura básica:**
```html
<div class="modal fade" id="miModal" tabindex="-1" 
     aria-labelledby="miModalLabel" aria-hidden="true">
  <div class="modal-dialog" id="miModalDialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="miModalLabel">Título</h5>
        <button type="button" class="btn-close" 
                data-coreui-dismiss="modal"></button>
      </div>
      <div class="modal-body" id="miModalBody">
        Contenido...
      </div>
      <div class="modal-footer justify-content-center" id="miModalFooter">
        <button class="btn btn-primary">Aceptar</button>
      </div>
    </div>
  </div>
</div>
```

**Tamaños de modal:**
- (sin clase) - Estándar
- `.modal-sm` - Pequeño
- `.modal-lg` - Grande
- `.modal-xl` - Extra grande

**Activación:**
```html
<button data-coreui-toggle="modal" 
        data-coreui-target="#miModal">Abrir</button>
```

---

### 8. DROPDOWNS

**Estructura básica:**
```html
<div class="dropdown">
  <button class="btn btn-outline-secondary btn-sm dropdown-toggle"
          data-coreui-toggle="dropdown" aria-expanded="false">
    Opciones
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Opción 1</a></li>
    <li><a class="dropdown-item active" href="#">Opción 2</a></li>
  </ul>
</div>
```

**Posicionamiento:**
- `.dropdown-menu-end` - Alineado a la derecha
- `.dropdown-menu-start` - Alineado a la izquierda (default)

**Items con iconos:**
```html
<a class="dropdown-item" href="#">
  <svg class="align-middle" width="18" height="18">...</svg>
  Texto
</a>
```

---

### 9. BADGES

**Variantes de color:**
```html
<span class="badge bg-primary">Primario</span>
<span class="badge bg-secondary">Secundario</span>
<span class="badge bg-info">Info</span>
<span class="badge bg-success">Éxito</span>
<span class="badge bg-warning">Advertencia</span>
<span class="badge bg-danger">Peligro</span>
```

**Tamaños:**
```html
<span class="badge badge-sm">Pequeño</span>
<span class="badge">Normal</span>
```

**Uso en navegación:**
```html
<span class="badge badge-sm bg-secondary ms-auto">12</span>
```

---

### 10. BOTONES

**Variantes:**
```html
<!-- Primario -->
<button class="btn btn-primary">Primario</button>

<!-- Secundario -->
<button class="btn btn-secondary">Secundario</button>

<!-- Outline -->
<button class="btn btn-outline-secondary">Outline</button>

<!-- Link -->
<button class="btn btn-link text-body">Link</button>
```

**Tamaños:**
```html
<button class="btn btn-sm">Pequeño</button>
<button class="btn">Normal</button>
<button class="btn btn-lg">Grande</button>
```

**Con iconos:**
```html
<button class="btn btn-primary">
  <svg class="icon me-2">...</svg>
  Texto
</button>
```

---

### 11. ICONOS (CoreUI Icons)

**Implementación:**
```html
<svg class="icon">
  <use xlink:href="../../_coreui-base/vendors/@coreui/icons/svg/free.svg#cil-home"></use>
</svg>
```

**Tamaños:**
```html
<svg class="icon icon-sm">...</svg>    <!-- Pequeño -->
<svg class="icon">...</svg>            <!-- Normal -->
<svg class="icon icon-lg">...</svg>    <!-- Grande -->
<svg class="icon icon-xl">...</svg>    <!-- Extra grande -->
```

**Iconos más usados:**
- `#cil-home` - Inicio/Dashboard
- `#cil-pencil` - Editar/Crear
- `#cil-file` - Documento
- `#cil-check-circle` - Aprobado/Completado
- `#cil-clock` - Pendiente
- `#cil-options` - Menú de opciones (3 puntos)
- `#cil-search` - Buscar/Previsualizar
- `#cil-trash` - Eliminar
- `#cil-user` - Usuario/Perfil
- `#cil-info` - Información
- `#cil-warning` - Advertencia
- `#cil-account-logout` - Salir

---

## 🎨 Clases de Utilidad Bootstrap/CoreUI

### Espaciado
- `m-{0-5}` - Margin (todos los lados)
- `mt-{0-5}`, `mb-{0-5}`, `ms-{0-5}`, `me-{0-5}` - Margin específico
- `p-{0-5}` - Padding (todos los lados)
- `px-{0-5}`, `py-{0-5}` - Padding horizontal/vertical
- `gap-{1-5}` - Gap en flexbox/grid

### Display
- `d-none`, `d-block`, `d-flex`, `d-inline`
- `d-{breakpoint}-{value}` - Responsive (md, lg, xl)

### Flexbox
- `d-flex` - Activar flexbox
- `flex-row`, `flex-column` - Dirección
- `align-items-{start|center|end}` - Alineación vertical
- `justify-content-{start|center|end|between}` - Alineación horizontal
- `flex-grow-1`, `flex-shrink-0` - Crecimiento/encogimiento
- `gap-{1-5}` - Espacio entre items

### Texto
- `text-{start|center|end}` - Alineación
- `fw-{normal|semibold|bold}` - Peso de fuente
- `fs-{1-6}` - Tamaño de fuente
- `text-uppercase` - Mayúsculas
- `text-body-secondary` - Color secundario
- `small`, `mall` (custom) - Tamaños pequeños

### Colores
- `bg-primary`, `bg-secondary`, `bg-info`, etc. - Fondos
- `text-primary`, `text-secondary`, etc. - Textos
- `bg-body-tertiary` - Fondo terciario del tema

### Borders
- `border`, `border-{top|bottom|start|end}` - Bordes
- `border-{0-5}` - Grosor
- `rounded` - Bordes redondeados

### Sizing
- `w-{25|50|75|100}` - Ancho en porcentaje
- `h-{25|50|75|100}` - Alto en porcentaje
- `min-vh-100` - Altura mínima 100vh

### Position
- `position-{static|relative|absolute|fixed|sticky}`
- `top-{0}`, `bottom-{0}`, `start-{0}`, `end-{0}` - Posicionamiento
- `z-{1-3}` - Z-index

### Visibility
- `d-none d-{breakpoint}-{block|flex}` - Ocultar/mostrar responsivo
- `opacity-{0|25|50|75|100}` - Opacidad

---

## 📱 Responsive Design

### Breakpoints
- `xs`: < 576px (móvil pequeño)
- `sm`: ≥ 576px (móvil)
- `md`: ≥ 768px (tablet)
- `lg`: ≥ 992px (desktop)
- `xl`: ≥ 1200px (desktop grande)
- `xxl`: ≥ 1400px (desktop extra grande)

### Patrones comunes
```html
<!-- Ocultar en móvil, mostrar en desktop -->
<span class="d-none d-lg-inline">Texto</span>

<!-- Botón de hamburguesa solo en móvil -->
<button class="d-lg-none">☰</button>

<!-- Grid responsive -->
<div class="col-12 col-md-6 col-xl-4">...</div>
```

---

## 🔧 JavaScript / Interactividad

### Atributos data de CoreUI

**Toggle (abrir/cerrar):**
- `data-coreui-toggle="dropdown"` - Dropdown
- `data-coreui-toggle="modal"` - Modal
- `data-coreui-toggle="unfoldable"` - Sidebar collapse

**Target:**
- `data-coreui-target="#idElemento"` - Elemento objetivo

**Dismiss:**
- `data-coreui-dismiss="modal"` - Cerrar modal

**Tema:**
- `data-coreui-theme="auto|light|dark"` - Tema de color
- `data-coreui-theme-value="light"` - Valor de tema en selector

### Funciones JavaScript (pfud.js)

**Ajuste de fuente:**
```javascript
adjustFontSize(-1) // Reducir
adjustFontSize(1)  // Aumentar
```

**Archivar formulario:**
```javascript
archivarFormulario() // Muestra toast de confirmación
```

**Sidebar toggle (móvil):**
```javascript
coreui.Sidebar.getInstance(document.querySelector('#sidebar')).toggle()
```

---

## 📄 Archivos de Plantilla

### Ubicación
`/Applications/MAMP/htdocs/uxpfud/hito1/UXUI/_plantilla-base.html`

### Uso
1. Copiar `_plantilla-base.html`
2. Renombrar según funcionalidad
3. Actualizar:
   - `<title>` en head
   - Breadcrumb si aplica
   - Contenido del `<div class="body">`
   - Scripts específicos al final

---

## ✅ Checklist de Nueva Página

- [ ] Copiar plantilla base
- [ ] Actualizar título y meta description
- [ ] Marcar nav-link activo en sidebar
- [ ] Actualizar breadcrumb (si aplica)
- [ ] Implementar contenido específico
- [ ] Agregar modales necesarios
- [ ] Incluir scripts específicos
- [ ] Verificar responsive en móvil/tablet/desktop
- [ ] Validar accesibilidad (aria-labels, roles)
- [ ] Actualizar sitemap.html

---

## 🚫 Restricciones Importantes

### NO USAR:
1. **CSS inline** - Solo clases de CoreUI/Bootstrap
2. **Estilos custom inline** - Usar pfud.css
3. **JavaScript inline extenso** - Mover a archivos .js
4. **Componentes no documentados** - Seguir esta guía

### SÍ USAR:
1. Clases de utilidad de CoreUI/Bootstrap
2. Componentes documentados en esta guía
3. Estructura semántica HTML5
4. Atributos aria para accesibilidad

---

## 📚 Referencias

- **CoreUI Docs**: https://coreui.io/docs/4.0/
- **Bootstrap 5 Docs**: https://getbootstrap.com/docs/5.0/
- **CoreUI Icons**: https://icons.coreui.io/icons/
- **Archivo plantilla**: `hito1/UXUI/_plantilla-base.html`
- **CSS custom**: `assets/css/pfud.css`
- **JS custom**: `assets/js/pfud.js`

---

**Última actualización:** 2 de febrero de 2026  
**Versión del sistema:** 2.1  
**Framework:** CoreUI v4.x + Bootstrap 5
