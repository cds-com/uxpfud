#!/usr/bin/env python3
"""
Script para verificar que todos los cambios se aplicaron correctamente
"""

import os
import re
import glob


def check_files():
    """Verifica los cambios en todos los archivos"""
    
    html_files = sorted(glob.glob('/Applications/MAMP/htdocs/uxpfud/hito1/UXUI-CSS/*.html'))
    
    # Archivos que no tienen la estructura completa (login, etc.)
    skip_files = {'index-clave-incorrecta.html', 'index-no-autenticar.html', 
                  'index-no-usuario.html', 'index.html', 'sitemap.html',
                  'previsualizar-modal.html', 'test_modal.html'}
    
    stats = {
        'total': 0,
        'px-4_en_header': 0,
        'px-4_en_titulo': 0,
        'text-nowrap_perfil': 0,
        'aria-label_breadcrumb': 0,
        'sin_mall': 0,
        'con_pfud-header-section': 0,
    }
    
    issues = []
    
    for filepath in html_files:
        filename = os.path.basename(filepath)
        
        if filename in skip_files:
            continue
        
        stats['total'] += 1
        
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Verificar px-4 en header principal
            if re.search(r'<div class=["\']w-100 bg-body-tertiary border-bottom[^>]*>\s*<div class=["\']container-fluid px-4["\']>', content, re.DOTALL):
                stats['px-4_en_header'] += 1
            else:
                issues.append(f"{filename}: No tiene px-4 en header principal")
            
            # Verificar text-nowrap en dropdown perfil
            if 'dropdown-menu dropdown-menu-end text-nowrap' in content:
                stats['text-nowrap_perfil'] += 1
            else:
                issues.append(f"{filename}: No tiene text-nowrap en dropdown perfil")
            
            # Verificar aria-label="breadcrumb"
            if 'aria-label="breadcrumb"' in content:
                stats['aria-label_breadcrumb'] += 1
            else:
                if 'breadcrumb' in content:
                    issues.append(f"{filename}: breadcrumb sin aria-label")
            
            # Verificar que no haya 'mall'
            if 'class="mall' not in content and '"mall"' not in content:
                stats['sin_mall'] += 1
            else:
                issues.append(f"{filename}: Todavía contiene 'mall'")
            
            # Verificar pfud-header-section (solo en archivos que deben tenerlo)
            if 'pfud-header-section' in content:
                stats['con_pfud-header-section'] += 1
        
        except Exception as e:
            issues.append(f"{filename}: Error al leer - {e}")
    
    # Mostrar resultados
    print("=" * 70)
    print("VERIFICACIÓN DE CAMBIOS APLICADOS")
    print("=" * 70)
    print(f"\nArchivos procesados: {stats['total']}")
    print(f"\n{'CAMBIO':<40} {'APLICADO':<10} {'%':<10}")
    print("-" * 70)
    print(f"{'px-4 en header principal':<40} {stats['px-4_en_header']}/{stats['total']:<10} {stats['px-4_en_header']/stats['total']*100:.1f}%")
    print(f"{'text-nowrap en dropdown perfil':<40} {stats['text-nowrap_perfil']}/{stats['total']:<10} {stats['text-nowrap_perfil']/stats['total']*100:.1f}%")
    print(f"{'aria-label breadcrumb':<40} {stats['aria-label_breadcrumb']}/{stats['total']:<10} {stats['aria-label_breadcrumb']/stats['total']*100:.1f}%")
    print(f"{'Sin class mall':<40} {stats['sin_mall']}/{stats['total']:<10} {stats['sin_mall']/stats['total']*100:.1f}%")
    print(f"{'Con pfud-header-section':<40} {stats['con_pfud-header-section']}/{stats['total']:<10} {stats['con_pfud-header-section']/stats['total']*100:.1f}%")
    
    if issues:
        print("\n" + "=" * 70)
        print("PROBLEMAS ENCONTRADOS:")
        print("=" * 70)
        for issue in issues:
            print(f"  • {issue}")
    else:
        print("\n" + "=" * 70)
        print("✓ ¡TODOS LOS ARCHIVOS ACTUALIZADOS CORRECTAMENTE!")
        print("=" * 70)


if __name__ == '__main__':
    check_files()
