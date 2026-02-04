#!/usr/bin/env python3
"""
Script final para actualizar TODOS los archivos HTML de UXUI-CSS
Maneja tanto los archivos simples como los que tienen barra de búsqueda
"""

import os
import re
import glob


def process_simple_header_files():
    """Procesa archivos con estructura simple (solo breadcrumb + título + botón opcional)"""
    # Estos archivos ya fueron procesados y están correctos
    return


def process_search_header_files():
    """Procesa archivos con barra de búsqueda integrada en el header"""
    
    files_with_search = [
        'aprobaciones.html',
        'aprobaciones-resultado-busqueda.html',
        'aprobaciones-sin-publicacion.html',
        'en-creacion.html',
        'en-creacion-resultado-busqueda.html',
        'en-creacion-sin-publicacion.html',
        'pendientes.html',
        'pendientes-resultado-busqueda.html',
        'publicados.html',
        'publicados-resultado-busqueda.html',
        'publicados-sin-publicacion.html',
    ]
    
    base_path = '/Applications/MAMP/htdocs/uxpfud/hito1/UXUI-CSS/'
    modified_count = 0
    
    for filename in files_with_search:
        filepath = os.path.join(base_path, filename)
        
        if not os.path.exists(filepath):
            continue
        
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            
            # Cambiar px-5 p-3 a px-4 en estos archivos
            content = re.sub(
                r'(<div class="container-fluid )px-5 p-3(">)',
                r'\1px-4\2',
                content
            )
            
            # Eliminar el span class="small" del breadcrumb pero mantener el contenido
            content = re.sub(
                r'<span class="small">([^<]+)</span>',
                r'\1',
                content
            )
            
            if content != original_content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"✓ Actualizado (con búsqueda): {filename}")
                modified_count += 1
        
        except Exception as e:
            print(f"Error procesando {filepath}: {e}")
    
    return modified_count


def process_other_header_files():
    """Procesa otros archivos con estructuras especiales"""
    
    special_files = {
        'crear-formulario.html': True,
        'crear-formulario-desde-cero.html': True,
        'crear-formulario-duplicado.html': True,
        'builder-datos.html': True,
        'comprobante-aprobaciones-aprobar.html': True,
        'comprobante-programacion.html': True,
        'error-programacion.html': True,
        'programar-publicacion.html': True,
        'programar-publicacion-nueva-version.html': True,
        'programar-sin-publicacion.html': True,
        'publicados-derogar.html': True,
        'publicados-derogar-comprobante.html': True,
        'aprobaciones-aprobar.html': True,
        'previsualizar.html': True,
        'mi-perfil.html': True,
        'ayuda.html': True,
    }
    
    base_path = '/Applications/MAMP/htdocs/uxpfud/hito1/UXUI-CSS/'
    modified_count = 0
    
    for filename in special_files:
        filepath = os.path.join(base_path, filename)
        
        if not os.path.exists(filepath):
            continue
        
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            
            # Cambiar px-5 p-3 a px-4 en estos archivos
            content = re.sub(
                r'(<div class="container-fluid )px-5 p-3(">)',
                r'\1px-4\2',
                content
            )
            
            if content != original_content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"✓ Actualizado (especial): {filename}")
                modified_count += 1
        
        except Exception as e:
            print(f"Error procesando {filepath}: {e}")
    
    return modified_count


def main():
    """Función principal"""
    print("Procesando archivos con barra de búsqueda...")
    count1 = process_search_header_files()
    
    print("\nProcesando otros archivos especiales...")
    count2 = process_other_header_files()
    
    print(f"\n{'='*60}")
    print(f"Total de archivos actualizados: {count1 + count2}")
    print(f"{'='*60}")


if __name__ == '__main__':
    main()
