#!/usr/bin/env python3
"""
Script para corregir la estructura del header en todos los archivos HTML de UXUI-CSS
Versión 2 - Corrección completa
"""

import os
import re
import glob
from pathlib import Path


def fix_breadcrumb_nesting(content):
    """Corrige el anidamiento doble de <ol> en breadcrumbs"""
    # Buscar y corregir <li class="breadcrumb-item active"><ol class="breadcrumb my-0 small">...
    pattern = r'<li class="breadcrumb-item active"><ol class="breadcrumb my-0 small">\s*([^<]+)\s*</ol></li>'
    content = re.sub(pattern, r'<li class="breadcrumb-item active">\1</li>', content)
    
    return content


def fix_button_class(content):
    """Remueve 'small' de las clases de botones dentro del header section"""
    # Buscar botones dentro de pfud-header-section y remover 'small'
    pattern = r'(<div class="pfud-header-section">[\s\S]*?<a href="[^"]*" class="btn btn-sm) small( btn-[^"]*"[^>]*>[\s\S]*?</div>\s*</div>\s*</div>)'
    content = re.sub(pattern, r'\1\2', content)
    
    return content


def process_all_files():
    """Procesa todos los archivos HTML"""
    html_files = sorted(glob.glob('/Applications/MAMP/htdocs/uxpfud/hito1/UXUI-CSS/*.html'))
    
    modified_count = 0
    
    for filepath in html_files:
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            
            # Aplicar correcciones
            content = fix_breadcrumb_nesting(content)
            content = fix_button_class(content)
            
            # Solo escribir si hubo cambios
            if content != original_content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                filename = os.path.basename(filepath)
                print(f"✓ Corregido: {filename}")
                modified_count += 1
        
        except Exception as e:
            print(f"Error procesando {filepath}: {e}")
    
    print(f"\n{'='*60}")
    print(f"Archivos corregidos: {modified_count}")
    print(f"{'='*60}")


if __name__ == '__main__':
    process_all_files()
