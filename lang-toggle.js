/* greenLi language toggle (EN / ES). Shared by English (root) and Spanish (/es/) pages. */
(function () {
  var path = location.pathname;
  var inES = /\/es(\/|$)/.test(path);
  // Clean URLs: strip any .html and treat a folder index as an empty slug.
  var file = path.split('/').pop().replace(/\.html$/, '');
  if (file === 'es' || file === 'index') file = '';
  var enHref = inES ? ('../' + file) : ('./' + file);
  var esHref = inES ? ('./' + file) : ('./es/' + file);

  function makeToggle(mobile) {
    var w = document.createElement('div');
    w.className = 'lang-toggle' + (mobile ? ' lang-toggle-mobile' : '');
    w.setAttribute('role', 'group');
    w.setAttribute('aria-label', 'Language');
    w.innerHTML =
      '<a href="' + enHref + '" class="lang-opt' + (inES ? '' : ' lang-active') + '"' + (inES ? '' : ' aria-current="true"') + '>EN</a>' +
      '<span class="lang-sep" aria-hidden="true">/</span>' +
      '<a href="' + esHref + '" class="lang-opt' + (inES ? ' lang-active' : '') + '"' + (inES ? ' aria-current="true"' : '') + '>ES</a>';
    return w;
  }

  function init() {
    var nl = document.querySelector('.nav-links');
    if (nl) nl.appendChild(makeToggle(false));
    var mm = document.getElementById('mobile-menu');
    if (mm) mm.appendChild(makeToggle(true));
  }

  var s = document.createElement('style');
  s.textContent =
    '.lang-toggle{display:inline-flex;align-items:center;gap:0.4rem;margin-left:1.25rem;font-family:Inter,sans-serif;font-size:0.75rem;font-weight:600;letter-spacing:0.07em;}' +
    '.lang-toggle .lang-opt{color:var(--dim,#748C80);text-decoration:none;text-transform:uppercase;transition:color 0.2s ease;padding:2px 0;}' +
    '.lang-toggle .lang-opt:hover{color:var(--text,#F0F4F1);}' +
    '.lang-toggle .lang-opt.lang-active{color:var(--green,#3AE87A);}' +
    '.lang-toggle .lang-sep{color:var(--dim,#748C80);}' +
    '.lang-toggle-mobile{margin-left:0;margin-top:0.75rem;padding-top:0.9rem;border-top:1px solid var(--border,#1F2820);width:100%;font-size:0.9375rem;}';
  (document.head || document.documentElement).appendChild(s);

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
