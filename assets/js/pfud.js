// Función global para ajuste de tamaño de fuente
let currentFontSize = 100; // porcentaje base
function adjustFontSize(delta) {
  currentFontSize += delta * 10; // cambio de 10% cada vez
  if (currentFontSize < 80) currentFontSize = 80;   // mínimo 80%
  if (currentFontSize > 140) currentFontSize = 140; // máximo 140%
  document.documentElement.style.fontSize = currentFontSize + '%';
}

// Animador de números enteros con easing
function animateCounter(id, start, end, duration) {
  const el = document.getElementById(id);
  let startTimestamp = null;
  const easeOutQuad = t => t * (2 - t); // Desaceleración suave al final
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const linearProgress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easedProgress = easeOutQuad(linearProgress);
    el.textContent = Math.floor(easedProgress * (end - start) + start);
    if (linearProgress < 1) {
      window.requestAnimationFrame(step);
    } else {
      el.textContent = end;
    }
  };
  window.requestAnimationFrame(step);
}

// Animador de números decimales con easing (para tiempo promedio en horas)
function animateDecimalCounter(id, start, end, duration) {
  const el = document.getElementById(id);
  let startTimestamp = null;
  const easeOutQuad = t => t * (2 - t); // Desaceleración suave al final
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const linearProgress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easedProgress = easeOutQuad(linearProgress);
    const current = easedProgress * (end - start) + start;
    el.textContent = current.toFixed(1);
    if (linearProgress < 1) {
      window.requestAnimationFrame(step);
    } else {
      el.textContent = end.toFixed(1);
    }
  };
  window.requestAnimationFrame(step);
}

// Sistema de tooltips PFUD
const pfudTooltips = {
  'nav_dashboard': 'Ir al Dashboard',
  'nav_creacion': 'Ver formularios en creación',
  'nav_pendientes': 'Ver formularios pendientes',
  'nav_publicados': 'Ver formularios publicados',
  'nav_builder': 'Ir al constructor de formularios',
  'sidebar_toggle': 'Colapsar o expandir menú lateral',
  'font_decrease': 'Disminuir tamaño de fuente',
  'font_increase': 'Aumentar tamaño de fuente',
  'theme_toggle': 'Cambiar modo de color',
  'theme_light': 'Cambiar a modo claro',
  'theme_dark': 'Cambiar a modo oscuro',
  'theme_auto': 'Cambiar a modo automático',
  'ayuda_link': 'Ver ayuda',
  'perfil_menu': 'Abrir menú de perfil',
  'perfil_email': 'Enviar correo a dchacrag@minvu.cl',
  'perfil_update': 'Ir a mi perfil para actualizar datos',
  'logout_link': 'Cerrar sesión',
  'breadcrumb_home': 'Volver al inicio',
  'crear_formulario': 'Crear nuevo formulario',
  'ver_todas_creacion': 'Ver todos los formularios en creación',
  'ver_todas_pendientes': 'Ver todos los formularios pendientes',
  'ver_todas_publicados': 'Ver todos los formularios publicados',
  'action_preview': 'Previsualizar formulario',
  'action_edit': 'Editar formulario',
  'action_delete': 'Eliminar formulario',
  'action_schedule': 'Programar publicación del formulario',
  'action_new_version': 'Crear nueva versión del formulario',
  'modal_cancel': 'Cancelar y permanecer en la página',
  'modal_confirm_logout': 'Confirmar salida y cerrar sesión',
  'norma_link': 'Ver detalles de la norma',
  'perfil_link': 'Ver perfil del usuario'
};

document.addEventListener('DOMContentLoaded', function() {
  animateCounter('counterPublicados', 0, 24, 1800);
  animateCounter('counterProceso', 0, 12, 1800);
  animateCounter('counterObservaciones', 0, 47, 1800);
  animateCounter('counterCiudadanos', 0, 156, 1800);
  animateCounter('counterSolicitudes', 0, 240, 1800);
  animateDecimalCounter('counterTiempo', 0, 12.2, 1800);
  
  // Inicializar tooltips PFUD
  document.querySelectorAll('.pfud-hint').forEach(el => {
    const hintId = el.getAttribute('data-hint');
    
    el.addEventListener('mouseenter', function(e) {
      if (pfudTooltips[hintId]) {
        const text = pfudTooltips[hintId];
        this.setAttribute('aria-label', text);
        
        // Crear tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'pfud-tooltip show';
        tooltip.textContent = text;
        tooltip.id = 'pfud-active-tooltip';
        document.body.appendChild(tooltip);
        
        // Posicionar
        const rect = this.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        tooltip.style.left = (rect.left + rect.width / 2 - tooltipRect.width / 2) + window.scrollX + 'px';
        tooltip.style.top = (rect.bottom + 8) + window.scrollY + 'px';
      }
    });
    
    el.addEventListener('mouseleave', function() {
      const tooltip = document.getElementById('pfud-active-tooltip');
      if (tooltip) tooltip.remove();
    });
    
    el.addEventListener('focus', function() {
      if (pfudTooltips[hintId]) {
        this.setAttribute('aria-label', pfudTooltips[hintId]);
      }
    });
  });
  
  // Hover dropdown para los tres puntos en las tarjetas del dashboard
  const dropdownButtons = document.querySelectorAll('.table .dropdown button[data-coreui-toggle="dropdown"]');
  dropdownButtons.forEach(function(button) {
    button.addEventListener('mouseenter', function() {
      if (!this.classList.contains('show')) {
        this.click();
      }
    });
  });
  
  // Inyectar modal de logout
  const logoutModalHTML = `
<div class="modal fade" id="logoutModal" tabindex="-1" aria-labelledby="logoutModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header border-0">
        <button type="button" class="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body text-center px-4 pb-4">
        <h5 class="mb-3">¿Estás seguro que deseas salir?</h5>
        <p class="text-body-secondary">Si deseas salir del portal, presiona Sí, quiero salir. En caso contrario, presiona la X para mantenerte en el portal.</p>
      </div>
      <div class="modal-footer border-0 justify-content-end pb-4 gap-2">
        
        <a href="index.html" class="btn btn-primary pfud-hint" data-hint="modal_confirm_logout">Sí, quiero salir</a>
      </div>
    </div>
  </div>
</div>`;
  
  document.body.insertAdjacentHTML('beforeend', logoutModalHTML);
  
  // Validación de login si existe el botón
  if (document.getElementById('loginButton')) {
    validarLogin();
  }
});

// Función para archivar formulario y mostrar toast
function archivarFormulario() {
  const toastEl = document.getElementById('archivarToast');
  const toast = new coreui.Toast(toastEl, {
    autohide: true,
    delay: 3000
  });
  toast.show();
}

// Validación de login - activar botón solo con datos válidos
function validarLogin() {
  const rutInput = document.getElementById('rut');
  const passwordInput = document.getElementById('password');
  const loginButton = document.getElementById('loginButton');
  
  if (!rutInput || !passwordInput || !loginButton) return;
  
  function validarRUT(rut) {
    // Validar formato XX.XXX.XXX-X o XXXXXXXX-X
    const rutLimpio = rut.replace(/\./g, '');
    const rutRegex = /^\d{7,8}-[0-9kK]$/;
    return rutRegex.test(rutLimpio) && rutLimpio.length >= 9;
  }
  
  function validarPassword(password) {
    // Mínimo 4 caracteres
    return password.length >= 4;
  }
  
  function actualizarBoton() {
    const rutValido = validarRUT(rutInput.value);
    const passwordValido = validarPassword(passwordInput.value);
    
    if (rutValido && passwordValido) {
      loginButton.disabled = false;
    } else {
      loginButton.disabled = true;
    }
  }
  
  rutInput.addEventListener('input', actualizarBoton);
  passwordInput.addEventListener('input', actualizarBoton);
}
