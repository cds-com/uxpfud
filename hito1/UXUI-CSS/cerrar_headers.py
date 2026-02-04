#!/usr/bin/env python3
"""
Script final para cerrar headers y agregar comentarios en todos los archivos
"""

import re
from pathlib import Path

BASE_DIR = Path("/Applications/MAMP/htdocs/uxpfud/hito1/UXUI-CSS")

# Archivos a procesar (excluir dashboard.html, aprobaciones.html, dashboard-sin-publicacion.html que ya están bien)
FILES_TO_PROCESS = [
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
]

def close_header_and_add_comments(filepath):
    """Cierra el header antes del container-fluid y agrega comentarios"""
    print(f"Procesando: {filepath.name}")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Verificar si ya tiene el comentario FIN TOP
    if '<!-- ============================= FIN TOP =============================' in content:
        print(f"  ✓ Ya procesado (tiene comentario FIN TOP)")
        return False
    
    # Patrón 1: Cerrar header y agregar comentarios (caso más común)
    # Buscar: </div></div></div></div><div class="container-fluid px-4"><div class="pfud-header-section">
    pattern1 = r'(</div>\s*</div>\s*</div>\s*)</div>\s*<div class="container-fluid px-4">\s*<div class="pfud-header-section">'
    
    if re.search(pattern1, content):
        replacement1 = r'''\1</div>
        </header>
        <!-- ============================= FIN TOP ============================= -->

        <!-- ============================= TITULO: Breadcrumb, Icono, Título ============================= -->
        <div class="container-fluid px-4">
          <div class="pfud-header-section">'''
        
        content = re.sub(pattern1, replacement1, content, count=1)
        print(f"  ✓ Header cerrado y comentarios agregados")
    else:
        print(f"  ⚠ Patrón no encontrado")
        return False
    
    # Patrón 2: Agregar comentario antes del body
    # Buscar: </div></div></header> seguido de <!--cuerpo--> o <div class="body
    pattern2 = r'(</div>\s*</div>\s*</header>\s*(?:<!--.*?-->)?\s*)(<div class="body flex-grow-1 bg-body-tertiary">)'
    
    if re.search(pattern2, content):
        replacement2 = r'''\1<!-- ============================= FIN TITULO ============================= -->

        <!-- ============================= CUERPO: Contenido Principal ============================= -->
        \2'''
        
        content = re.sub(pattern2, replacement2, content, count=1)
        print(f"  ✓ Comentarios de cuerpo agregados")
    
    # Guardar
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return True

def main():
    print("=" * 60)
    print("CIERRE DE HEADERS Y COMENTARIOS")
    print("=" * 60)
    print()
    
    modified = 0
    
    for filename in FILES_TO_PROCESS:
        filepath = BASE_DIR / filename
        if filepath.exists():
            if close_header_and_add_comments(filepath):
                modified += 1
        else:
            print(f"⚠ No encontrado: {filename}")
    
    print()
    print("=" * 60)
    print(f"Archivos modificados: {modified}")
    print("=" * 60)

if __name__ == "__main__":
    main()
