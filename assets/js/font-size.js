// Función global para ajuste de tamaño de fuente
let currentFontSize = 100; // porcentaje base
function adjustFontSize(delta) {
  currentFontSize += delta * 10; // cambio de 10% cada vez
  if (currentFontSize < 80) currentFontSize = 80;   // mínimo 80%
  if (currentFontSize > 140) currentFontSize = 140; // máximo 140%
  document.documentElement.style.fontSize = currentFontSize + '%';
}

// Animador de números enteros
function animateCounter(id, start, end, duration) {
  const el = document.getElementById(id);
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    el.textContent = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      el.textContent = end;
    }
  };
  window.requestAnimationFrame(step);
}

// Animador de formato tiempo mm:ss (para tiempo promedio)
function animateTimeCounter(id, startSeconds, endSeconds, duration) {
  const el = document.getElementById(id);
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const current = Math.floor(progress * (endSeconds - startSeconds) + startSeconds);
    const m = Math.floor(current / 60);
    const s = current % 60;
    el.textContent = `${m}:${s.toString().padStart(2, '0')}`;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      el.textContent = `${Math.floor(endSeconds / 60)}:${(endSeconds % 60).toString().padStart(2, '0')}`;
    }
  };
  window.requestAnimationFrame(step);
}

// Ejecución de animaciones
document.addEventListener('DOMContentLoaded', function() {
  animateCounter('counterPublicados', 0, 24, 1200);
  animateCounter('counterObservaciones', 0, 47, 1200);
  animateCounter('counterCreacion', 0, 12, 1200);
  animateCounter('counterUsuarios', 0, 156, 1200);
  animateTimeCounter('counterTiempo', 0, 8 * 60 + 42, 1200); // 8:42 = 522 segundos
});
