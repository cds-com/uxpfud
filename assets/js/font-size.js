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
let pfudTooltips = {};

// Cargar tooltips desde TXT
fetch('../assets/js/pfud-tooltips.txt')
  .then(response => response.text())
  .then(data => {
    data.split('\n').forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) {
        pfudTooltips[key.trim()] = value.trim();
      }
    });
    console.log('PFUD Tooltips cargados:', Object.keys(pfudTooltips).length);
  })
  .catch(err => console.error('Error cargando tooltips:', err));

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
        
        tooltip.style.left = (rect.left + rect.width / 2 - tooltipRect.width / 2) + 'px';
        tooltip.style.top = (rect.bottom + 2) + 'px';
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
});
