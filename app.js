/* Font + size + theme controls. Preferences persist across pages where storage is
   available; degrade silently to per-page defaults where it isn't. */

const FONTS = {
  'Atkinson':     "'Atkinson Hyperlegible',system-ui,sans-serif",
  'OpenDyslexic': "'OpenDyslexic','Comic Sans MS',Verdana,sans-serif",
  'Lexend':       "'Lexend',system-ui,sans-serif"
};

function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
function recall(k)   { try { return localStorage.getItem(k); } catch (e) { return null; } }

/* ── Font controls ─────────────────────────────────────────── */
function applyFont(name) {
  document.documentElement.style.setProperty('--font', FONTS[name] || FONTS.Atkinson);
  document.querySelectorAll('[data-font]').forEach(b =>
    b.classList.toggle('on', b.dataset.font === name)
  );
}

function setFont(name) { applyFont(name); store('cg-font', name); }

/* ── Size controls ─────────────────────────────────────────── */
let _size = 17;
function applySize(px) {
  _size = Math.max(14, Math.min(26, px));
  document.documentElement.style.setProperty('--size', _size + 'px');
}
function bump(d) { applySize(_size + d); store('cg-size', _size); }

/* ── Theme controls ────────────────────────────────────────── */
function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.documentElement.classList.toggle('dark-theme', isDark);
  document.body.classList.toggle('dark-theme', isDark);
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.textContent = isDark ? '☀️ Light' : '🌙 Dark';
    btn.classList.toggle('on', isDark);
  }
}

function setTheme(theme) {
  applyTheme(theme);
  store('cg-theme', theme);
}

function toggleTheme() {
  const current = recall('cg-theme') || 'light';
  const next = current === 'light' ? 'dark' : 'light';
  setTheme(next);
}

/* ── Detect system preference ──────────────────────────────── */
function getSystemTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

/* ── Build the control bar, restore preferences ────────────── */
function mountBar() {
  const bar = document.querySelector('.bar .wrap');
  if (!bar) return;
  
  bar.innerHTML =
    `<span>Font</span>` +
    Object.keys(FONTS).map(n => `<button data-font="${n}" onclick="setFont('${n}')">${n}</button>`).join('') +
    `<span style="margin-left:8px">Size</span>` +
    `<button onclick="bump(-1)" aria-label="Smaller text">A−</button>` +
    `<button onclick="bump(1)" aria-label="Larger text">A+</button>` +
    `<button id="theme-toggle" onclick="toggleTheme()" aria-label="Toggle dark/light theme">🌙 Dark</button>` +
    `<button onclick="window.print()" style="margin-left:auto" aria-label="Print page">Print</button>`;

  // Restore font preference
  applyFont(recall('cg-font') || 'Atkinson');
  
  // Restore size preference
  applySize(parseInt(recall('cg-size'), 10) || 17);
  
  // Restore theme preference, or detect system preference
  const savedTheme = recall('cg-theme');
  const theme = savedTheme || getSystemTheme();
  applyTheme(theme);
  store('cg-theme', theme);
}

document.addEventListener('DOMContentLoaded', mountBar);

/* Listen for system theme changes */
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!recall('cg-theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
}
