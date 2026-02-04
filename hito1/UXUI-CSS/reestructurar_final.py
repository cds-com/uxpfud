#!/usr/bin/env python3
"""
Script para reestructurar secciones de título con estructura de rows
"""

import re
from pathlib import Path

BASE_DIR = Path("/Applications/MAMP/htdocs/uxpfud/hito1/UXUI-CSS")

def reestructurar_archivo(filepath):
    """Reestructura un archivo HTML"""
    print(f"Procesando: {filepath.name}")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Verificar si ya tiene la estructura correcta
    if '<!-- Fila superior: Breadcrumb -->' in content:
        print(f"  ✓ Ya tiene estructura correcta")
        return False
    
    # Buscar el patrón de la estructura antigua
    # Buscamos: <nav aria-label="breadcrumb" ... </nav> + <div class="d-flex w-100 ... flex-nowrap">
    
    # Patrón complejo: extraer breadcrumb, título, icono, buscador (si existe), botón (si existe)
    pattern = r'(<div class="pfud-header-section">\s*)<nav aria-label="breadcrumb"[^>]*>(.*?)</nav>\s*<div class="d-flex w-100 align-items-center gap-3 flex-nowrap">(.*?)</div>\s*</div>\s*</div>'
    
    match = re.search(pattern, content, re.DOTALL)
    if not match:
        print(f"  ⚠ No se encontró el patrón esperado")
        return False
    
    # Extraer partes
    header_section_start = match.group(1)
    breadcrumb_content = match.group(2)
    middle_content = match.group(3)
    
    # Extraer icono y título
    icon_title_pattern = r'<div class="d-flex align-items-baseline flex-wrap[^"]*">\s*(<svg[^>]*>.*?</svg>)\s*<h1[^>]*>(.*?)</h1>\s*</div>'
    icon_title_match = re.search(icon_title_pattern, middle_content, re.DOTALL)
    
    if not icon_title_match:
        print(f"  ⚠ No se encontró icono/título")
        return False
    
    icon = icon_title_match.group(1)
    title = icon_title_match.group(2)
    
    # Verificar si tiene buscador
    has_search = 'pfud-w-60' in middle_content
    
    # Extraer buscador si existe
    search_content = ""
    if has_search:
        search_pattern = r'<div class="d-flex justify-content-center flex-grow-1">\s*(<div class="pfud-w-60">.*?</div>\s*</div>\s*</div>)'
        search_match = re.search(search_pattern, middle_content, re.DOTALL)
        if search_match:
            search_content = search_match.group(1)
    
    # Extraer botón si existe
    button_pattern = r'<div class="ms-auto">\s*(<a[^>]*>.*?</a>)\s*</div>'
    button_match = re.search(button_pattern, middle_content, re.DOTALL)
    button_content = ""
    if button_match:
        button_content = button_match.group(1)
    
    # Construir nueva estructura
    if has_search:
        # Estructura con buscador (3 columnas)
        new_structure = f'''<div class="pfud-header-section">
            <!-- Fila superior: Breadcrumb -->
            <div class="row">
              <div class="col">
                <nav aria-label="breadcrumb" class="mb-2">
                  <ol class="breadcrumb my-0 small">{breadcrumb_content}</ol>
                </nav>
              </div>
            </div>
            
            <!-- Fila inferior: Icono/Título, Buscador y Botón -->
            <div class="row align-items-center">
              <!-- Columna 1: Icono y Título -->
              <div class="col-auto">
                <div class="d-flex align-items-baseline">
                  {icon}
                  <h1 class="h2 mb-0">{title}</h1>
                </div>
              </div>
              
              <!-- Columna 2: Buscador -->
              <div class="col">
                <div class="d-flex justify-content-center">
                  {search_content}
                </div>
              </div>
              
              <!-- Columna 3: Botón alineado a la derecha -->
              <div class="col-auto">'''
        
        if button_content:
            # Indentar correctamente el botón
            button_lines = button_content.strip().split('\n')
            button_indented = '\n                '.join(line.strip() for line in button_lines)
            new_structure += f'\n                {button_indented}'
        
        new_structure += '''
              </div>
            </div>
          </div>
        </div>'''
    else:
        # Estructura sin buscador (2 columnas)
        new_structure = f'''<div class="pfud-header-section">
            <!-- Fila superior: Breadcrumb -->
            <div class="row">
              <div class="col">
                <nav aria-label="breadcrumb" class="mb-2">
                  <ol class="breadcrumb my-0 small">{breadcrumb_content}</ol>
                </nav>
              </div>
            </div>
            
            <!-- Fila inferior: Icono/Título y Botón -->
            <div class="row align-items-center">
              <!-- Columna 1: Icono y Título -->
              <div class="col-auto">
                <div class="d-flex align-items-baseline">
                  {icon}
                  <h1 class="h2 mb-0">{title}</h1>
                </div>
              </div>
              
              <!-- Columna 2: En blanco -->
              <div class="col"></div>
              
              <!-- Columna 3: Botón alineado a la derecha -->
              <div class="col-auto">'''
        
        if button_content:
            button_lines = button_content.strip().split('\n')
            button_indented = '\n                '.join(line.strip() for line in button_lines)
            new_structure += f'\n                {button_indented}'
        
        new_structure += '''
              </div>
            </div>
          </div>
        </div>'''
    
    # Reemplazar en el contenido
    content = re.sub(pattern, new_structure, content, count=1, flags=re.DOTALL)
    
    # Guardar
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"  ✓ Reestructurado exitosamente")
    return True

def main():
    # Archivos a procesar (excluir los que ya están bien)
    files_to_process = [
        "aprobaciones-resultado-busqueda.html",
        "aprobaciones-sin-publicacion.html",
        "aprobaciones-aprobar.html",
        "en-creacion-resultado-busqueda.html",
        "en-creacion-sin-publicacion.html",
        "en-creacion.html",
        "pendientes-resultado-busqueda.html",
        "pendientes.html",
        "publicados-resultado-busqueda.html",
        "publicados-sin-publicacion.html",
        "publicados.html",
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
    ]
    
    print("=" * 60)
    print("REESTRUCTURACIÓN DE SECCIONES DE TÍTULO")
    print("=" * 60)
    print()
    
    modified = 0
    for filename in files_to_process:
        filepath = BASE_DIR / filename
        if filepath.exists():
            if reestructurar_archivo(filepath):
                modified += 1
        else:
            print(f"⚠ No encontrado: {filename}")
    
    print()
    print("=" * 60)
    print(f"Archivos modificados: {modified}")
    print("=" * 60)

if __name__ == "__main__":
    main()
