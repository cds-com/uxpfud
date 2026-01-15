## Clasificación de `ux-ui-validacion-minvu/assets/`

Resumen: clasifico los archivos en **vendor** (bibliotecas/activos del template) vs **propio** (activos específicos del proyecto).

Acción tomada: he puesto en staging (git add) los archivos marcados como **vendor** listados abajo. NO he hecho commit.

---

**Vendor (staged)**
- `assets/icons/` (SVG icon set incluido `brands/` y `coreui/`)
- `assets/img/` (imágenes del template: `avatars/`, `full.jpg`, `background-pro.jpg`, `components.webp`, `icons.webp`)
- `assets/brand/coreui.svg`

Estos son activos suministrados por el template / librerías y conviene tratarlos como vendors.

**Propio (NOT staged)**
- `assets/favicon/` (favicons y `manifest.json`) — considerado **propio** porque suele ser específico del sitio

Si quieres que marque algún archivo de `assets/` distinto a lo anterior como `vendor` o `propio`, indícalo y ajusto el staging.

---

Comandos ejecutados para preparar staging (no commit):

- `git add -- ux-ui-validacion-minvu/assets/icons`
- `git add -- ux-ui-validacion-minvu/assets/img`
- `git add -- ux-ui-validacion-minvu/assets/brand/coreui.svg`

Revisa el staging con `git status --porcelain` o abre este archivo para ajustar la clasificación.

Fecha: 2025-12-26
