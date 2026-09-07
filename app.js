/* Font + size controls. Preference persists across pages where storage is
   available; degrades silently to per-page defaults where it isn't. */

const FONTS = {
  'Atkinson':     "'Atkinson Hyperlegible',system-ui,sans-serif",
  'OpenDyslexic': "'OpenDyslexic','Comic Sans MS',Verdana,sans-serif",
  'Lexend':       "'Lexend',system-ui,sans-serif"
};

function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
function recall(k)   { try { return localStorage.getItem(k); } catch (e) { return null; } }

function applyFont(name) {
  document.documentElement.style.setProperty('--font', FONTS[name] || FONTS.Atkinson);
  document.querySelectorAll('[data-font]').forEach(b =>
    b.classList.toggle('on', b.dataset.font === name)
  );
}

function setFont(name) { applyFont(name); store('cg-font', name); }

let _size = 17;
function applySize(px) {
  _size = Math.max(14, Math.min(26, px));
  document.documentElement.style.setProperty('--size', _size + 'px');
}
function bump(d) { applySize(_size + d); store('cg-size', _size); }

/* Build the control bar, then restore any saved preference. */
function mountBar() {
  const bar = document.querySelector('.bar .wrap');
  if (!bar) return;
  bar.innerHTML =
    `<span>Font</span>` +
    Object.keys(FONTS).map(n => `<button data-font="${n}" onclick="setFont('${n}')">${n}</button>`).join('') +
    `<span style="margin-left:8px">Size</span>` +
    `<button onclick="bump(-1)" aria-label="Smaller text">A&minus;</button>` +
    `<button onclick="bump(1)" aria-label="Larger text">A+</button>` +
    `<button onclick="window.print()" style="margin-left:auto">Print</button>`;

  applyFont(recall('cg-font') || 'Atkinson');
  applySize(parseInt(recall('cg-size'), 10) || 17);
}

document.addEventListener('DOMContentLoaded', mountBar);
