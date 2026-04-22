/* ============================================================
   MANIFESTO.JS — reading progress + reveals + contact
   ============================================================ */
import './main.js';

// Reading progress bar
const progressBar = document.getElementById('reading-progress');
if (progressBar) {
  const updateProgress = () => {
    const scrollTop    = document.documentElement.scrollTop;
    const totalHeight  = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const pct = totalHeight > 0 ? (scrollTop / totalHeight) * 100 : 0;
    progressBar.style.width = `${pct}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}
