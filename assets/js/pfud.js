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

document.addEventListener('DOMContentLoaded', function() {
  animateCounter('counterPublicados', 0, 24, 1800);
  animateCounter('counterProceso', 0, 12, 1800);
  animateCounter('counterObservaciones', 0, 47, 1800);
  animateCounter('counterCiudadanos', 0, 156, 1800);
  animateCounter('counterSolicitudes', 0, 240, 1800);
  animateDecimalCounter('counterTiempo', 0, 12.2, 1800);
  
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
        
        <a href="index.html" class="btn btn-primary">Sí, quiero salir</a>
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

// Builder: Ocultar breadcrumb y título al hacer scroll
function initBuilderScrollBehavior() {
  const breadcrumbContainer = document.getElementById('builderBreadcrumb');
  if (!breadcrumbContainer) return;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      breadcrumbContainer.classList.add('d-none');
    } else {
      breadcrumbContainer.classList.remove('d-none');
    }
  });
}

// Builder: Scroll to top button
function initScrollToTop() {
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (!scrollBtn) return;
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollBtn.classList.add('show');
    } else {
      scrollBtn.classList.remove('show');
    }
  });
  
  scrollBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Inicializar funcionalidades de builder si estamos en builder-constructor
if (window.location.pathname.includes('builder-constructor')) {
  document.addEventListener('DOMContentLoaded', function() {
    initBuilderScrollBehavior();
    initScrollToTop();
  });
}
