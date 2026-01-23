// Función global para ajuste de tamaño de fuente
var currentFontSize = 100;
function adjustFontSize(delta) {
  currentFontSize += delta * 10;
  if (currentFontSize < 80) currentFontSize = 80;
  if (currentFontSize > 140) currentFontSize = 140;
  document.documentElement.style.fontSize = currentFontSize + '%';
}

// Animador de números enteros
function animateCounter(id, start, end, duration) {
  var el = document.getElementById(id);
  if (!el) return;

  var startTimestamp = null;
  var easeOutQuad = function (t) { return t * (2 - t); };

  function step(timestamp) {
    if (!startTimestamp) startTimestamp = timestamp;

    var linearProgress = Math.min((timestamp - startTimestamp) / duration, 1);
    var easedProgress = easeOutQuad(linearProgress);

    el.textContent = Math.floor(easedProgress * (end - start) + start);

    if (linearProgress < 1) {
      window.requestAnimationFrame(step);
    } else {
      el.textContent = end;
    }
  }

  window.requestAnimationFrame(step);
}

// Animador de números decimales
function animateDecimalCounter(id, start, end, duration) {
  var el = document.getElementById(id);
  if (!el) return;

  var startTimestamp = null;
  var easeOutQuad = function (t) { return t * (2 - t); };

  function step(timestamp) {
    if (!startTimestamp) startTimestamp = timestamp;

    var linearProgress = Math.min((timestamp - startTimestamp) / duration, 1);
    var easedProgress = easeOutQuad(linearProgress);
    var current = easedProgress * (end - start) + start;

    el.textContent = current.toFixed(1);

    if (linearProgress < 1) {
      window.requestAnimationFrame(step);
    } else {
      el.textContent = end.toFixed(1);
    }
  }

  window.requestAnimationFrame(step);
}

// Tooltips PFUD
var pfudTooltips = {
  nav_dashboard: 'Ir al Dashboard',
  nav_creacion: 'Ver formularios en creación',
  nav_pendientes: 'Ver formularios pendientes',
  nav_publicados: 'Ver formularios publicados',
  nav_builder: 'Ir al constructor de formularios',
  sidebar_toggle: 'Colapsar o expandir menú lateral',
  font_decrease: 'Disminuir tamaño de fuente',
  font_increase: 'Aumentar tamaño de fuente',
  theme_toggle: 'Cambiar modo de color',
  theme_light: 'Cambiar a modo claro',
  theme_dark: 'Cambiar a modo oscuro',
  theme_auto: 'Cambiar a modo automático',
  ayuda_link: 'Ver ayuda',
  perfil_menu: 'Abrir menú de perfil',
  perfil_email: 'Enviar correo a dchacrag@minvu.cl',
  perfil_update: 'Ir a mi perfil para actualizar datos',
  logout_link: 'Cerrar sesión',
  breadcrumb_home: 'Volver al inicio',
  crear_formulario: 'Crear nuevo formulario',
  ver_todas_creacion: 'Ver todos los formularios en creación',
  ver_todas_pendientes: 'Ver todos los formularios pendientes',
  ver_todas_publicados: 'Ver todos los formularios publicados',
  action_preview: 'Previsualizar formulario',
  action_edit: 'Editar formulario',
  action_delete: 'Eliminar formulario',
  action_schedule: 'Programar publicación del formulario',
  action_new_version: 'Crear nueva versión del formulario',
  modal_cancel: 'Cancelar y permanecer en la página',
  modal_confirm_logout: 'Confirmar salida y cerrar sesión',
  norma_link: 'Ver detalles de la norma',
  perfil_link: 'Ver perfil del usuario'
};

document.addEventListener('DOMContentLoaded', function () {
  animateCounter('counterPublicados', 0, 24, 1800);
  animateCounter('counterProceso', 0, 12, 1800);
  animateCounter('counterObservaciones', 0, 47, 1800);
  animateCounter('counterCiudadanos', 0, 156, 1800);
  animateCounter('counterSolicitudes', 0, 240, 1800);
  animateDecimalCounter('counterTiempo', 0, 12.2, 1800);

  var hints = document.querySelectorAll('.pfud-hint');
  Array.prototype.forEach.call(hints, function (el) {
    var hintId = el.getAttribute('data-hint');

    el.addEventListener('mouseenter', function () {
      if (!pfudTooltips[hintId]) return;

      var tooltip = document.createElement('div');
      tooltip.className = 'pfud-tooltip show';
      tooltip.id = 'pfud-active-tooltip';
      tooltip.textContent = pfudTooltips[hintId];
      document.body.appendChild(tooltip);

      var rect = el.getBoundingClientRect();
      var tooltipRect = tooltip.getBoundingClientRect();

      tooltip.style.left = (rect.left + rect.width / 2 - tooltipRect.width / 2 + window.scrollX) + 'px';
      tooltip.style.top = (rect.bottom + 8 + window.scrollY) + 'px';
    });

    el.addEventListener('mouseleave', function () {
      var tooltip = document.getElementById('pfud-active-tooltip');
      if (tooltip) tooltip.parentNode.removeChild(tooltip);
    });
  });

  var dropdownButtons = document.querySelectorAll('.table .dropdown button[data-coreui-toggle="dropdown"]');
  Array.prototype.forEach.call(dropdownButtons, function (button) {
    button.addEventListener('mouseenter', function () {
      if (!button.classList.contains('show')) button.click();
    });
  });

  var logoutModalHTML =
    '<div class="modal fade" id="logoutModal" tabindex="-1" aria-hidden="true">' +
    '<div class="modal-dialog modal-dialog-centered">' +
    '<div class="modal-content">' +
    '<div class="modal-header border-0">' +
    '<button type="button" class="btn-close" data-coreui-dismiss="modal"></button>' +
    '</div>' +
    '<div class="modal-body text-center px-4 pb-4">' +
    '<h5 class="mb-3">¿Estás seguro que deseas salir?</h5>' +
    '<p class="text-body-secondary">Presiona aceptar para guardar tu trabajo y cerrar tu sesión.</p>' +
    '</div>' +
    '<div class="modal-footer border-0 justify-content-center pb-4 gap-2">' +
    '<button type="button" class="btn btn-secondary" data-coreui-dismiss="modal">Cancelar</button>' +
    '<a href="index.html" class="btn btn-primary">Sí, quiero salir</a>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';

  document.body.insertAdjacentHTML('beforeend', logoutModalHTML);
});
