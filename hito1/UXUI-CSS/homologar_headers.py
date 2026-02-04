#!/usr/bin/env python3
"""
Script para homologar headers en archivos HTML
"""

import re
import os
from pathlib import Path

# Directorio de trabajo
BASE_DIR = Path("/Applications/MAMP/htdocs/uxpfud/hito1/UXUI-CSS")

# Archivos con buscador (estructura de 3 columnas: título, buscador, botón)
FILES_WITH_SEARCH = [
    "aprobaciones-resultado-busqueda.html",
    "aprobaciones-sin-publicacion.html",
    "en-creacion-resultado-busqueda.html",
    "en-creacion-sin-publicacion.html",
    "en-creacion.html",
    "pendientes-resultado-busqueda.html",
    "pendientes.html",
    "publicados-resultado-busqueda.html",
    "publicados-sin-publicacion.html",
    "publicados.html",
]

# Archivos sin buscador (estructura de 2 columnas: título, botón opcional)
FILES_WITHOUT_SEARCH = [
    "dashboard-sin-publicacion.html",
    "ayuda.html",
    "mi-perfil.html",
    "crear-formulario-desde-cero.html",
    "crear-formulario-duplicado.html",
    "crear-formulario.html",
    "error-programacion.html",
    "builder-datos.html",
    "builder-constructor.html",
    "comprobante-aprobaciones-aprobar.html",
    "comprobante-programacion.html",
    "previsualizar.html",
    "programar-publicacion.html",
    "programar-sin-publicacion.html",
    "programar-publicacion-nueva-version.html",
    "publicados-derogar.html",
    "publicados-derogar-comprobante.html",
    "aprobaciones-aprobar.html",
]

def process_file(filepath, has_search=False):
    """Procesa un archivo HTML aplicando todas las homologaciones"""
    print(f"Procesando: {filepath.name}")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # 1. Eliminar atributos del tag header
    content = re.sub(
        r'<header\s+class="header header-sticky p-0 mb-4"\s+data-coreui-theme="auto"\s+data-coreui-theme-dark="[^"]+"\s+data-coreui-theme-light="[^"]+"\s*>',
        '<header class="header header-sticky p-0 mb-4">',
        content
    )
    
    # 2. Eliminar clases position-sticky top-0 z-3 del div interno
    content = re.sub(
        r'<div class="w-100 bg-body-tertiary border-bottom position-sticky top-0 z-3">',
        '<div class="w-100 bg-body-tertiary border-bottom">',
        content
    )
    
    # 3. Eliminar me-0 de botones A+/A-
    content = re.sub(
        r'class="btn btn-outline-secondary btn-sm me-0"',
        'class="btn btn-outline-secondary btn-sm"',
        content
    )
    
    # 4. Eliminar title duplicados - varios patrones comunes
    # Patrón: title="..." data-coreui-toggle="dropdown" ... title="..."
    content = re.sub(
        r'title="Abrir menú de acciones"\s+data-coreui-toggle="dropdown"\s+aria-expanded="false"\s+title="Seleccionar rol"',
        'data-coreui-toggle="dropdown"\n                      aria-expanded="false"\n                      title="Seleccionar rol"',
        content
    )
    
    # Patrón: title="..." data-coreui-theme-value="..." title="..."
    content = re.sub(
        r'title="Cambiar a modo claro"\s+data-coreui-theme-value="light"\s+title="Cambiar a modo claro"',
        'data-coreui-theme-value="light"\n                          title="Cambiar a modo claro"',
        content
    )
    content = re.sub(
        r'title="Cambiar a modo oscuro"\s+data-coreui-theme-value="dark"\s+title="Cambiar a modo oscuro"',
        'data-coreui-theme-value="dark"\n                          title="Cambiar a modo oscuro"',
        content
    )
    content = re.sub(
        r'title="Cambiar a modo automático"\s+data-coreui-theme-value="auto"\s+title="Cambiar a modo automático"',
        'data-coreui-theme-value="auto"\n                          title="Cambiar a modo automático"',
        content
    )
    
    # 5. Agregar text-nowrap a items del dropdown de perfil
    content = re.sub(
        r'(<div class="small text-body-secondary">Nombre</div>\s*<div class="small)">',
        r'\1 text-nowrap">',
        content
    )
    content = re.sub(
        r'(<div class="small text-body-secondary">Rol</div>\s*<div class="small)">',
        r'\1 text-nowrap">',
        content
    )
    content = re.sub(
        r'(<div class="small text-body-secondary">E-mail</div>\s*<div class="small)">',
        r'\1 text-nowrap">',
        content
    )
    content = re.sub(
        r'(<div class="small text-body-secondary">Teléfono</div>\s*<div class="small)">',
        r'\1 text-nowrap">',
        content
    )
    
    # 9. Cambiar px-5 a px-4 en el body (dentro de div class="body")
    # Buscar específicamente dentro de la sección body
    content = re.sub(
        r'(<div class="body flex-grow-1 bg-body-tertiary">\s*<div class="container-fluid )px-5">',
        r'\1px-4">',
        content
    )
    
    # También en otros lugares que puedan tener px-5 en el body
    # (pero no en header o footer)
    lines = content.split('\n')
    in_body_section = False
    for i, line in enumerate(lines):
        if '<div class="body flex-grow-1 bg-body-tertiary">' in line:
            in_body_section = True
        elif '</div>' in line and 'wrapper' in lines[i:i+5]:
            in_body_section = False
        elif in_body_section and 'container-fluid px-5' in line:
            lines[i] = line.replace('px-5', 'px-4')
    content = '\n'.join(lines)
    
    # Guardar el archivo
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✓ Modificado: {filepath.name}")
        return True
    else:
        print(f"  - Sin cambios: {filepath.name}")
        return False

def main():
    """Procesa todos los archivos"""
    processed = 0
    modified = 0
    
    print("=" * 60)
    print("HOMOLOGACIÓN DE HEADERS - ARCHIVOS HTML")
    print("=" * 60)
    print()
    
    print("Procesando archivos CON buscador...")
    print("-" * 60)
    for filename in FILES_WITH_SEARCH:
        filepath = BASE_DIR / filename
        if filepath.exists():
            if process_file(filepath, has_search=True):
                modified += 1
            processed += 1
        else:
            print(f"  ⚠ No encontrado: {filename}")
    
    print()
    print("Procesando archivos SIN buscador...")
    print("-" * 60)
    for filename in FILES_WITHOUT_SEARCH:
        filepath = BASE_DIR / filename
        if filepath.exists():
            if process_file(filepath, has_search=False):
                modified += 1
            processed += 1
        else:
            print(f"  ⚠ No encontrado: {filename}")
    
    print()
    print("=" * 60)
    print(f"RESUMEN:")
    print(f"  Archivos procesados: {processed}")
    print(f"  Archivos modificados: {modified}")
    print("=" * 60)

if __name__ == "__main__":
    main()
