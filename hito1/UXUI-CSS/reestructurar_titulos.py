#!/usr/bin/env python3
"""
Script para reestructurar la sección de título y agregar comentarios
"""

import re
from pathlib import Path

BASE_DIR = Path("/Applications/MAMP/htdocs/uxpfud/hito1/UXUI-CSS")

# Archivos con buscador
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

# Archivos sin buscador
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

def extract_title_section(content):
    """Extrae información de la sección de título actual"""
    # Buscar breadcrumb
    breadcrumb_match = re.search(
        r'<nav aria-label="breadcrumb"[^>]*>.*?</nav>',
        content,
        re.DOTALL
    )
    
    # Buscar título e icono
    title_match = re.search(
        r'<svg[^>]*>.*?</svg>\s*<h1[^>]*>(.*?)</h1>',
        content,
        re.DOTALL
    )
    
    # Buscar icono completo
    icon_match = re.search(
        r'(<svg class="me-2"[^>]*>.*?</svg>)',
        content,
        re.DOTALL
    )
    
    # Buscar botón
    button_match = re.search(
        r'(<a\s+href="[^"]*"\s+class="btn[^"]*".*?</a>)\s*</div>\s*</div>\s*</div>\s*</div>\s*</header>',
        content,
        re.DOTALL
    )
    
    # Buscar buscador
    search_match = re.search(
        r'(<div class="pfud-w-60">.*?</div>\s*</div>\s*</div>)',
        content,
        re.DOTALL
    )
    
    return {
        'breadcrumb': breadcrumb_match.group(0) if breadcrumb_match else None,
        'title_text': title_match.group(1) if title_match else None,
        'icon': icon_match.group(1) if icon_match else None,
        'button': button_match.group(1) if button_match else None,
        'search': search_match.group(1) if search_match else None,
    }

def restructure_title_section_with_search(filepath):
    """Reestructura sección de título para archivos CON buscador"""
    print(f"  Reestructurando: {filepath.name}")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Buscar y reemplazar la estructura del título
    # Patrón más flexible para encontrar la sección actual
    pattern = r'(</div>\s*</div>\s*</div>\s*<div class="container-fluid px-4">\s*<div class="pfud-header-section">)(.*?)(</div>\s*</div>\s*</header>)'
    
    match = re.search(pattern, content, re.DOTALL)
    if not match:
        print(f"    ⚠ No se encontró la sección de título en {filepath.name}")
        return False
    
    # Extraer información
    info = extract_title_section(content)
    
    if not info['title_text'] or not info['icon']:
        print(f"    ⚠ No se pudo extraer título o icono")
        return False
    
    # Construir nueva estructura
    new_section = '''</div>
            </div>
          </div>
        </header>
        <!-- ============================= FIN TOP ============================= -->

        <!-- ============================= TITULO: Breadcrumb, Icono, Título, Buscador, Botón ============================= -->
        <div class="container-fluid px-4">
          <div class="pfud-header-section">
            <!-- Fila superior: Breadcrumb -->
            <div class="row">
              <div class="col">'''
    
    if info['breadcrumb']:
        new_section += f'''
                {info['breadcrumb']}'''
    
    new_section += '''
              </div>
            </div>
            
            <!-- Fila inferior: Icono/Título, Buscador y Botón -->
            <div class="row align-items-center">
              <!-- Columna 1: Icono y Título -->
              <div class="col-auto">
                <div class="d-flex align-items-baseline">'''
    
    if info['icon']:
        new_section += f'''
                  {info['icon']}'''
    
    new_section += f'''
                  <h1 class="h2 mb-0">{info['title_text']}</h1>
                </div>
              </div>
              
              <!-- Columna 2: Buscador -->
              <div class="col">
                <div class="d-flex justify-content-center">'''
    
    if info['search']:
        new_section += f'''
                  {info['search']}'''
    
    new_section += '''
                </div>
              </div>
              
              <!-- Columna 3: Botón alineado a la derecha -->
              <div class="col-auto">'''
    
    if info['button']:
        # Indentar el botón correctamente
        button_lines = info['button'].split('\n')
        button_indented = '\n'.join(['                ' + line.lstrip() for line in button_lines])
        new_section += f'''
{button_indented}'''
    
    new_section += '''
              </div>
            </div>
          </div>
        </div>
        <!-- ============================= FIN TITULO ============================= -->

        <!-- ============================= CUERPO: Contenido Principal ============================= -->'''
    
    # Reemplazar
    content = re.sub(pattern, new_section, content, count=1, flags=re.DOTALL)
    
    # Guardar
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"    ✓ Reestructurado: {filepath.name}")
    return True

def restructure_title_section_without_search(filepath):
    """Reestructura sección de título para archivos SIN buscador"""
    print(f"  Reestructurando: {filepath.name}")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Buscar y reemplazar la estructura del título
    pattern = r'(</div>\s*</div>\s*</div>\s*<div class="container-fluid px-4">\s*<div class="pfud-header-section">)(.*?)(</div>\s*</div>\s*</header>)'
    
    match = re.search(pattern, content, re.DOTALL)
    if not match:
        print(f"    ⚠ No se encontró la sección de título en {filepath.name}")
        return False
    
    # Extraer información
    info = extract_title_section(content)
    
    if not info['title_text'] or not info['icon']:
        print(f"    ⚠ No se pudo extraer título o icono")
        return False
    
    # Construir nueva estructura (sin buscador)
    new_section = '''</div>
            </div>
          </div>
        </header>
        <!-- ============================= FIN TOP ============================= -->

        <!-- ============================= TITULO: Breadcrumb, Icono, Título, Botón ============================= -->
        <div class="container-fluid px-4">
          <div class="pfud-header-section">
            <!-- Fila superior: Breadcrumb -->
            <div class="row">
              <div class="col">'''
    
    if info['breadcrumb']:
        new_section += f'''
                {info['breadcrumb']}'''
    
    new_section += '''
              </div>
            </div>
            
            <!-- Fila inferior: Icono/Título y Botón -->
            <div class="row align-items-center">
              <!-- Columna 1: Icono y Título -->
              <div class="col-auto">
                <div class="d-flex align-items-baseline">'''
    
    if info['icon']:
        new_section += f'''
                  {info['icon']}'''
    
    new_section += f'''
                  <h1 class="h2 mb-0">{info['title_text']}</h1>
                </div>
              </div>
              
              <!-- Columna 2: En blanco -->
              <div class="col"></div>
              
              <!-- Columna 3: Botón alineado a la derecha -->
              <div class="col-auto">'''
    
    if info['button']:
        # Indentar el botón correctamente
        button_lines = info['button'].split('\n')
        button_indented = '\n'.join(['                ' + line.lstrip() for line in button_lines])
        new_section += f'''
{button_indented}'''
    
    new_section += '''
              </div>
            </div>
          </div>
        </div>
        <!-- ============================= FIN TITULO ============================= -->

        <!-- ============================= CUERPO: Contenido Principal ============================= -->'''
    
    # Reemplazar
    content = re.sub(pattern, new_section, content, count=1, flags=re.DOTALL)
    
    # Guardar
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"    ✓ Reestructurado: {filepath.name}")
    return True

def main():
    print("=" * 60)
    print("REESTRUCTURACIÓN DE SECCIÓN DE TÍTULO")
    print("=" * 60)
    print()
    
    modified = 0
    
    print("Archivos CON buscador...")
    print("-" * 60)
    for filename in FILES_WITH_SEARCH:
        filepath = BASE_DIR / filename
        if filepath.exists():
            if restructure_title_section_with_search(filepath):
                modified += 1
    
    print()
    print("Archivos SIN buscador...")
    print("-" * 60)
    for filename in FILES_WITHOUT_SEARCH:
        filepath = BASE_DIR / filename
        if filepath.exists():
            if restructure_title_section_without_search(filepath):
                modified += 1
    
    print()
    print("=" * 60)
    print(f"Archivos reestructurados: {modified}")
    print("=" * 60)

if __name__ == "__main__":
    main()
