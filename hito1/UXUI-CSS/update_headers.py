#!/usr/bin/env python3
"""
Script para actualizar la estructura del header en todos los archivos HTML de UXUI-CSS
"""

import os
import re
import glob


def process_file(filepath):
    """Procesa un archivo HTML"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # 1. Cambiar px-5 a px-4 en el header principal
        content = re.sub(
            r'(<div class="w-100 bg-body-tertiary border-bottom[^>]*>\s*<div class="container-fluid )px-5(">)',
            r'\1px-4\2',
            content
        )
        
        # 2. Cambiar mall a small (en todo el contenido)
        content = content.replace('class="mall', 'class="small')
        content = content.replace('"mall"', '"small"')
        content = content.replace('<span class="small">', '<span class="small">')
        
        # 3. Agregar text-nowrap al dropdown-menu del perfil
        content = re.sub(
            r'(<ul class="dropdown-menu dropdown-menu-end)" (aria-labelledby="perfilDropdown">)',
            r'\1 text-nowrap" \2',
            content
        )
        
        # 4. Cambiar title="breadcrumb" a aria-label="breadcrumb"
        content = re.sub(
            r'<nav title="breadcrumb"',
            r'<nav aria-label="breadcrumb"',
            content
        )
        
        # 5. Eliminar comillas dobles duplicadas como class="dropdown-item""
        content = re.sub(
            r'class="([^"]+)""',
            r'class="\1"',
            content
        )
        
        # 6. Eliminar títulos duplicados
        content = re.sub(
            r'title="([^"]*)" title="[^"]*"',
            r'title="\1"',
            content
        )
        
        content = re.sub(
            r'title="([^"]*)"\s+title="[^"]*"',
            r'title="\1"',
            content
        )
        
        # 7. Reemplazar la sección del breadcrumb y título
        # Buscar el patrón con row py-3 bg-body rounded-3
        pattern = re.compile(
            r'(<div class="container-fluid )px-5(">)\s*'
            r'<div class="row py-3 bg-body rounded-3 text-body mt-2 align-items-center">\s*'
            r'<div class="col">\s*'
            r'<nav [^>]*>([^<]*<ol class="breadcrumb[^<]*>[\s\S]*?</ol>\s*)'
            r'</nav>\s*'
            r'<div class="d-flex align-items-baseline flex-wrap">\s*'
            r'(<svg[^>]*>[\s\S]*?</svg>)\s*'
            r'<h1 class="h2[^>]*>([^<]*)</h1>\s*'
            r'</div>\s*'
            r'</div>\s*'
            r'</div>\s*'
            r'(?:<div class="d-flex justify-content-end mt-3">\s*'
            r'(<a href="[^"]*" class="btn[^>]*>[\s\S]*?</a>)\s*'
            r'</div>\s*)?'
            r'</div>',
            re.MULTILINE | re.DOTALL
        )
        
        def build_new_header(match):
            breadcrumb = match.group(3).strip()
            svg = match.group(4).strip()
            title = match.group(5).strip()
            button = match.group(6).strip() if match.group(6) else None
            
            # Extraer solo el contenido del <ol> si existe
            ol_match = re.search(r'<ol class="breadcrumb[^>]*>([\s\S]*?)</ol>', breadcrumb)
            if ol_match:
                breadcrumb_content = ol_match.group(1).strip()
            else:
                breadcrumb_content = breadcrumb
            
            # Limpiar el breadcrumb de etiquetas span
            breadcrumb_content = breadcrumb_content.replace('<span class="small">', '').replace('</span>', '')
            breadcrumb_content = breadcrumb_content.replace('<span>', '').replace('</span>', '')
            breadcrumb_content = breadcrumb_content.strip()
            
            # Si el breadcrumb solo tiene texto (sin <li>), crear un li
            if '<li' not in breadcrumb_content:
                breadcrumb_content = f'<li class="breadcrumb-item active">{breadcrumb_content}</li>'
            
            new_section = f'''<div class="container-fluid px-4">
          <div class="pfud-header-section">
            <!-- Fila superior: Breadcrumb -->
            <div class="row">
              <div class="col">
                <nav aria-label="breadcrumb" class="mb-2">
                  <ol class="breadcrumb my-0 small">
                    {breadcrumb_content}
                  </ol>
                </nav>
              </div>
            </div>
            
            <!-- Fila inferior: Icono/Título y Botón -->
            <div class="row align-items-center">
              <!-- Columna 1: Icono y Título -->
              <div class="col-auto">
                <div class="d-flex align-items-baseline">
                  {svg}
                  <h1 class="h2 mb-0">{title}</h1>
                </div>
              </div>
              
              <!-- Columna 2: En blanco -->
              <div class="col"></div>
              '''
            
            if button:
                new_section += f'''
              <!-- Columna 3: Botón alineado a la derecha -->
              <div class="col-auto">
                {button}
              </div>'''
            
            new_section += '''
            </div>
          </div>
        </div>'''
            
            return new_section
        
        content = pattern.sub(build_new_header, content)
        
        # 8. Manejar archivos que usan container-fluid px-5 p-3
        pattern2 = re.compile(
            r'(<div class="container-fluid )px-5( p-3">)\s*'
            r'<nav [^>]*>([^<]*<ol class="breadcrumb[^<]*>[\s\S]*?</ol>\s*)'
            r'</nav>\s*'
            r'<div class="d-flex[^>]*>\s*'
            r'<div class="d-flex align-items-baseline[^>]*>\s*'
            r'(<svg[^>]*>[\s\S]*?</svg>)\s*'
            r'<h1 class="h2[^>]*>([^<]*)</h1>\s*'
            r'</div>',
            re.MULTILINE | re.DOTALL
        )
        
        # Solo escribir si hubo cambios
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
        
    except Exception as e:
        print(f"Error procesando {filepath}: {e}")
        import traceback
        traceback.print_exc()
        return False


def main():
    """Función principal"""
    # Obtener todos los archivos HTML en UXUI-CSS
    html_files = sorted(glob.glob('/Applications/MAMP/htdocs/uxpfud/hito1/UXUI-CSS/*.html'))
    
    modified_count = 0
    changes = []
    
    print(f"Procesando {len(html_files)} archivos...\n")
    
    for filepath in html_files:
        filename = os.path.basename(filepath)
        print(f"Procesando: {filename}...", end=' ')
        
        if process_file(filepath):
            print("✓ Modificado")
            modified_count += 1
            changes.append(filename)
        else:
            print("Sin cambios")
    
    print(f"\n{'='*60}")
    print(f"RESUMEN:")
    print(f"Total de archivos procesados: {len(html_files)}")
    print(f"Archivos modificados: {modified_count}")
    print(f"\nCambios aplicados:")
    print(f"1. px-5 → px-4 en container-fluid del header")
    print(f"2. mall → small en todo el contenido")
    print(f"3. Agregado text-nowrap al dropdown-menu del perfil")
    print(f"4. title='breadcrumb' → aria-label='breadcrumb'")
    print(f"5. Eliminados atributos duplicados")
    print(f"6. Reestructurado breadcrumb + título con pfud-header-section")
    print(f"{'='*60}")


if __name__ == '__main__':
    main()
