// Forzar recarga de CSS y JS añadiendo timestamp
(function() {
  const timestamp = new Date().getTime();
  document.querySelectorAll('link[rel="stylesheet"][href*="pfud"]').forEach(link => {
    const url = new URL(link.href);
    url.searchParams.set('v', timestamp);
    link.href = url.toString();
  });
})();

// Función global para ajuste de tamaño de fuente
// Cargar el tamaño guardado de localStorage o usar 100% por defecto
let currentFontSize = parseInt(localStorage.getItem('fontSizePreference')) || 100;
document.documentElement.style.fontSize = currentFontSize + '%';

// Actualizar indicador si existe
function updateFontSizeIndicator() {
  const indicator = document.getElementById('fontSizeIndicator');
  if (indicator) {
    indicator.textContent = currentFontSize + '%';
  }
}

function adjustFontSize(delta) {
  currentFontSize += delta * 10; // cambio de 10% cada vez
  if (currentFontSize < 80) currentFontSize = 80;   // mínimo 80%
  if (currentFontSize > 140) currentFontSize = 140; // máximo 140%
  document.documentElement.style.fontSize = currentFontSize + '%';
  
  // Guardar la preferencia en localStorage
  localStorage.setItem('fontSizePreference', currentFontSize);
  
  // Actualizar indicador visual
  updateFontSizeIndicator();
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
  // Inicializar indicador de tamaño de fuente
  updateFontSizeIndicator();
  
  // Animadores de contadores
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
    initBuilderFormChanges();
  });
}

// Builder: Activar botón de aprobación cuando hay cambios
function initBuilderFormChanges() {
  const btnSolicitarAprobacion = document.getElementById("btnSolicitarAprobacion");
  const formCanvas = document.getElementById("formCanvas");
  
  if (!btnSolicitarAprobacion || !formCanvas) return;
  
  formCanvas.addEventListener("change", function () {
    btnSolicitarAprobacion.disabled = false;
  });

  formCanvas.addEventListener("input", function () {
    btnSolicitarAprobacion.disabled = false;
  });

  btnSolicitarAprobacion.addEventListener("click", function () {
    const toastEl = document.getElementById("successToast");
    const toast = new coreui.Toast(toastEl);
    toast.show();
    btnSolicitarAprobacion.disabled = true;
  });
}

// Toggle password visibility
function initPasswordToggle() {
  const toggleButton = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");
  const eyeIcon = document.getElementById("eyeIcon");
  
  if (!toggleButton || !passwordInput || !eyeIcon) return;
  
  toggleButton.addEventListener("click", function () {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeIcon.classList.remove("bi-eye-slash");
      eyeIcon.classList.add("bi-eye");
    } else {
      passwordInput.type = "password";
      eyeIcon.classList.remove("bi-eye");
      eyeIcon.classList.add("bi-eye-slash");
    }
  });
}

// Formatear RUT automáticamente
function initRutFormatter() {
  const rutInput = document.getElementById("rut");
  
  if (!rutInput) return;
  
  rutInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/[^0-9kK]/g, "");

    if (value.length > 1) {
      let rut = value.slice(0, -1);
      let dv = value.slice(-1).toUpperCase();

      // Formatear con puntos y guión
      rut = rut.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      e.target.value = rut + "-" + dv;
    } else {
      e.target.value = value;
    }
  });
}

// Inicializar funciones de login
document.addEventListener('DOMContentLoaded', function() {
  initPasswordToggle();
  initRutFormatter();
});

// Tour guiado con Intro.js
function iniciarTourGuiado() {
  if (typeof introJs === 'undefined') {
    console.error('Intro.js no está cargado');
    return;
  }
  
  introJs()
    .setOptions({
      nextLabel: 'Siguiente →',
      prevLabel: '← Atrás',
      skipLabel: '×',
      doneLabel: 'Hecho',
      showProgress: true,
      showBullets: false,
      exitOnOverlayClick: false,
      exitOnEsc: true,
      scrollToElement: true,
      scrollPadding: 80,
      disableInteraction: true
    })
    .start();
}

// Función para guardar cambios en builder
function guardarCambios() {
  const toastEl = document.getElementById("successToast");
  if (toastEl) {
    const toast = new coreui.Toast(toastEl, {
      autohide: true,
      delay: 3000
    });
    toast.show();
  } else {
    alert('Cambios guardados correctamente');
  }
}

// Funcionalidad de navegación de previsualización de formularios
document.addEventListener('DOMContentLoaded', function() {
  const progressNavItems = document.querySelectorAll('.progress-nav-item');
  const sections = {
    'encabezado': document.getElementById('section-encabezado'),
    'sec1': document.getElementById('section-sec1'),
    'sec2': document.getElementById('section-sec2'),
    'sec3': document.getElementById('section-sec3'),
    'sec4': document.getElementById('section-sec4'),
    'sec5': document.getElementById('section-sec5'),
    'sec6': document.getElementById('section-sec6'),
    'sec7': document.getElementById('section-sec7'),
    'sec8': document.getElementById('section-sec8')
  };

  // Click navigation
  progressNavItems.forEach(item => {
    item.addEventListener('click', () => {
      const sectionId = item.getAttribute('data-section');
      const section = sections[sectionId];
      if (section) {
        const headerOffset = 120;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Highlight active section on scroll
  function updateActiveSection() {
    const scrollPosition = window.scrollY + 150;
    let currentSection = 'encabezado';
    
    for (const [key, section] of Object.entries(sections)) {
      if (section && section.offsetTop <= scrollPosition) {
        currentSection = key;
      }
    }

    progressNavItems.forEach(item => {
      const sectionId = item.getAttribute('data-section');
      if (sectionId === currentSection) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveSection);
  updateActiveSection();

  // Hide/show title and form header on scroll
  const titleContainer = document.getElementById('preview-title-container');
  const formHeader = document.getElementById('preview-form-header');
  
  if (titleContainer && formHeader) {
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > 100) {
        titleContainer.style.opacity = '0';
        titleContainer.style.maxHeight = '0';
        titleContainer.style.overflow = 'hidden';
        titleContainer.style.transition = 'opacity 0.3s ease, max-height 0.3s ease';
        
        formHeader.style.opacity = '0';
        formHeader.style.maxHeight = '0';
        formHeader.style.overflow = 'hidden';
        formHeader.style.transition = 'opacity 0.3s ease, max-height 0.3s ease';
      } else {
        titleContainer.style.opacity = '1';
        titleContainer.style.maxHeight = '200px';
        titleContainer.style.overflow = 'visible';
        
        formHeader.style.opacity = '1';
        formHeader.style.maxHeight = '500px';
        formHeader.style.overflow = 'visible';
      }
    });
  }
});

// Navegación del formulario previsualizar
document.addEventListener('DOMContentLoaded', function() {
  const navItems = document.querySelectorAll('.progress-nav-item');
  const sections = document.querySelectorAll('[id^="sec"], #encabezado');
  
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      const targetSection = this.getAttribute('data-section');
      const section = document.getElementById(targetSection);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        navItems.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });
});

// Dropdowns con hover
document.addEventListener('DOMContentLoaded', function() {
  const dropdowns = document.querySelectorAll('.dropdown');
  
  dropdowns.forEach(dropdown => {
    const button = dropdown.querySelector('[data-coreui-toggle="dropdown"]');
    const menu = dropdown.querySelector('.dropdown-menu');
    
    if (button && menu) {
      let closeTimeout;
      
      const openMenu = () => {
        if (!menu.classList.contains('show')) {
          button.click();
        }
      };
      
      const scheduleClose = () => {
        closeTimeout = setTimeout(() => {
          if (menu.classList.contains('show')) {
            button.click();
          }
        }, 150);
      };
      
      const cancelClose = () => {
        clearTimeout(closeTimeout);
      };
      
      dropdown.addEventListener('mouseenter', () => {
        cancelClose();
        openMenu();
      });
      
      dropdown.addEventListener('mouseleave', scheduleClose);
      
      menu.addEventListener('mouseenter', cancelClose);
      menu.addEventListener('mouseleave', scheduleClose);
    }
  });
});

// Scroll to top button
window.addEventListener('DOMContentLoaded', function() {
  const scrollToTopBtn = document.getElementById('scrollToTop');
  if (scrollToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.remove('d-none');
      } else {
        scrollToTopBtn.classList.add('d-none');
      }
    });
    scrollToTopBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

// Funciones para cerrar constructor
function cerrarSinGuardar() {
  window.close();
  // Si window.close() no funciona (navegador bloquea el cierre), redirigir
  setTimeout(function() {
    window.location.href = 'dashboard.html';
  }, 100);
}

function guardarYCerrar() {
  // Aquí iría la lógica de guardado
  guardarCambios();
  // Cerrar después de guardar
  setTimeout(function() {
    window.close();
    // Si window.close() no funciona, redirigir
    setTimeout(function() {
      window.location.href = 'dashboard.html';
    }, 100);
  }, 500);
}

function guardarCambios() {
  // Lógica de guardado (simulada)
  console.log('Guardando cambios...');
}

// Toggle para habilitar/deshabilitar edición en offcanvas de detalles
let isEditMode = false;

function toggleEditMode() {
  const btn = document.getElementById('toggleEditMode');
  const inputs = document.querySelectorAll('#offcanvasDetalles input, #offcanvasDetalles select, #offcanvasDetalles textarea');
  
  isEditMode = !isEditMode;
  
  inputs.forEach(input => {
    input.disabled = !isEditMode;
  });
  
  if (isEditMode) {
    btn.innerHTML = '<i class="bi bi-lock me-1"></i>Bloquear Edición';
    btn.classList.remove('btn-outline-secondary');
    btn.classList.add('btn-outline-primary');
  } else {
    btn.innerHTML = '<i class="bi bi-pencil me-1"></i>Habilitar Edición';
    btn.classList.remove('btn-outline-primary');
    btn.classList.add('btn-outline-secondary');
  }
}

// Builder action bindings (no inline JS)
document.addEventListener('DOMContentLoaded', () => {
  const actionHandlers = {
    'guardar-cambios': guardarCambios,
    'toggle-edit-mode': toggleEditMode,
    'cerrar-sin-guardar': cerrarSinGuardar,
    'guardar-y-cerrar': guardarYCerrar
  };

  Object.entries(actionHandlers).forEach(([action, handler]) => {
    document.querySelectorAll(`[data-action="${action}"]`).forEach((element) => {
      element.addEventListener('click', (event) => {
        event.preventDefault();
        handler();
      });
    });
  });

  document.querySelectorAll('[data-adjust-font]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const delta = Number(button.getAttribute('data-adjust-font')) || 0;
      if (delta) {
        adjustFontSize(delta);
      }
    });
  });
});
