/* greenLi unified animation system — drop this script on every page */
(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════════════
     CSS — injected once, scoped with prefixed class names
  ═══════════════════════════════════════════════════════════ */
  var CSS = [
    /* ── 1. Page fade-in ── */
    '@keyframes _gl_pi{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}',
    'body{animation:_gl_pi 0.55s cubic-bezier(.16,1,.3,1) both}',
    'body._gl_out{opacity:0!important;transform:translateY(-6px)!important;',
    '  transition:opacity .26s ease,transform .26s ease!important;animation:none!important}',

    /* ── 2. Nav drop-in ── */
    '@keyframes _gl_nd{from{opacity:0;transform:translateY(-14px)}to{opacity:1;transform:none}}',
    '#main-nav{animation:_gl_nd .6s cubic-bezier(.16,1,.3,1) .05s both}',

    /* ── 3. Hero stagger ── */
    '@keyframes _gl_up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}',
    '._h_ey{animation:_gl_up .7s cubic-bezier(.16,1,.3,1) .18s both}',
    '._h_h1{animation:_gl_up .85s cubic-bezier(.16,1,.3,1) .34s both}',
    '._h_bd{animation:_gl_up .7s cubic-bezier(.16,1,.3,1) .52s both}',
    '._h_ct{animation:_gl_up .65s cubic-bezier(.16,1,.3,1) .66s both}',
    '._h_nt{animation:_gl_up .5s cubic-bezier(.16,1,.3,1) .78s both}',

    /* ── 4. Scroll reveal ── */
    '.glr{opacity:0;transform:translateY(28px);',
    '  transition:opacity .75s cubic-bezier(.16,1,.3,1),transform .75s cubic-bezier(.16,1,.3,1);',
    '  will-change:transform,opacity}',
    '.glrl{opacity:0;transform:translateX(-38px);',
    '  transition:opacity .75s cubic-bezier(.16,1,.3,1),transform .75s cubic-bezier(.16,1,.3,1)}',
    '.glrr{opacity:0;transform:translateX(38px);',
    '  transition:opacity .75s cubic-bezier(.16,1,.3,1),transform .75s cubic-bezier(.16,1,.3,1)}',
    '.glrs{opacity:0;transform:scale(.95);',
    '  transition:opacity .65s cubic-bezier(.16,1,.3,1),transform .65s cubic-bezier(.16,1,.3,1)}',
    '.glr.on,.glrl.on,.glrr.on,.glrs.on{opacity:1;transform:none}',
    '.d1{transition-delay:.08s!important}.d2{transition-delay:.16s!important}',
    '.d3{transition-delay:.24s!important}.d4{transition-delay:.32s!important}',
    '.d5{transition-delay:.40s!important}',

    /* ── 5. Logo ticker ── */
    '.gl-tick-outer{overflow:hidden;',
    '  -webkit-mask-image:linear-gradient(to right,transparent,black 10%,black 90%,transparent);',
    '  mask-image:linear-gradient(to right,transparent,black 10%,black 90%,transparent)}',
    '.gl-tick-track{display:flex;align-items:center;width:max-content;',
    '  animation:_gl_tk 36s linear infinite}',
    '.gl-tick-track:hover{animation-play-state:paused}',
    '@keyframes _gl_tk{from{transform:translateX(0)}to{transform:translateX(-50%)}}',
    '.gl-tick-item{display:flex;align-items:center;gap:.75rem;padding:0 3rem;',
    '  flex-shrink:0;white-space:nowrap}',
    '.gl-tick-sep{width:4px;height:4px;border-radius:50%;',
    '  background:rgba(58,232,122,.18);flex-shrink:0}',
    '.gl-tick-name{font-family:"Space Grotesk",sans-serif;font-size:1rem;font-weight:500;',
    '  letter-spacing:-.01em;color:#8A9E8F}',
    '.gl-tick-role{font-family:"Inter",sans-serif;font-size:.6rem;font-weight:600;',
    '  letter-spacing:.1em;text-transform:uppercase;color:#6A8878;',
    '  padding:.2rem .5rem;border:1px solid #2A3828;border-radius:3px}',

    /* ── 6. Shimmer on primary buttons ── */
    '.gl-sh{position:relative!important;overflow:hidden!important}',
    '.gl-sh::after{content:"";position:absolute;top:0;left:-130%;width:50%;height:100%;',
    '  background:linear-gradient(105deg,transparent 0%,rgba(255,255,255,.10) 45%,',
    '    rgba(255,255,255,.22) 50%,rgba(255,255,255,.10) 55%,transparent 100%);',
    '  animation:_gl_sh 3.2s ease-in-out infinite;pointer-events:none}',
    '@keyframes _gl_sh{0%{left:-130%}45%{left:140%}100%{left:140%}}',

    /* ── 7. CTA section shimmer overlay ── */
    '.gl-cta{position:relative;overflow:hidden}',
    '.gl-cta>*{position:relative;z-index:1}',
    '.gl-cta::before{content:"";position:absolute;inset:0;z-index:0;pointer-events:none;',
    '  background:linear-gradient(130deg,transparent 15%,rgba(58,232,122,.04) 38%,',
    '    rgba(58,232,122,.075) 50%,rgba(58,232,122,.04) 62%,transparent 85%);',
    '  background-size:280% 280%;animation:_gl_cg 5.5s ease-in-out infinite}',
    '@keyframes _gl_cg{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}',

    /* ── 8. Enhanced stat card hover ── */
    '.stat-card{transition:transform .28s cubic-bezier(.16,1,.3,1),box-shadow .28s ease!important}',
    '.stat-card:hover{transform:translateY(-5px) scale(1.012)!important;',
    '  box-shadow:0 2px 4px rgba(0,0,0,.4),0 14px 36px rgba(0,0,0,.35),',
    '  0 0 80px rgba(58,232,122,.10)!important}',

    /* ── 9. Application card hover ── */
    '.app-card{transition:transform .25s cubic-bezier(.16,1,.3,1),',
    '  border-color .25s ease,box-shadow .25s ease!important}',
    '.app-card:hover{transform:translateY(-4px)!important;',
    '  border-color:rgba(58,232,122,.25)!important;',
    '  box-shadow:0 8px 32px rgba(0,0,0,.32),0 0 60px rgba(58,232,122,.07)!important}',

    /* ── 10. Section eyebrow line decoration ── */
    '.eyebrow{position:relative}',

    /* ── 11. Tablet (769–1024px) ── */
    '@media(max-width:1024px) and (min-width:769px){',
    'section[style*="padding:8rem"]{padding-top:5.5rem!important;padding-bottom:5.5rem!important}',
    'section[style*="padding:7rem"]{padding-top:4.5rem!important;padding-bottom:4.5rem!important}',
    'section[style*="padding:10rem"]{padding-top:6.5rem!important;padding-bottom:6.5rem!important}',
    'section [style*="grid-template-columns:repeat(3,1fr)"]{grid-template-columns:repeat(2,1fr)!important}',
    'section [style*="gap:5rem"]{gap:3rem!important}',
    'section [style*="gap:4rem"]{gap:2.5rem!important}',
    '}',

    /* ── 12. Mobile (≤768px) ── */
    '@media(max-width:768px){',
    /* Section vertical padding */
    'section[style*="padding:8rem"]{padding-top:4rem!important;padding-bottom:4rem!important}',
    'section[style*="padding:7rem"]{padding-top:3.5rem!important;padding-bottom:3.5rem!important}',
    'section[style*="padding:6rem"]{padding-top:3rem!important;padding-bottom:3rem!important}',
    'section[style*="padding:5rem"]{padding-top:2.5rem!important;padding-bottom:2.5rem!important}',
    'section[style*="padding:10rem"]{padding-top:5rem!important;padding-bottom:5rem!important}',
    /* Multi-column → single column */
    'section [style*="grid-template-columns:1fr 1fr"]{grid-template-columns:1fr!important}',
    'section [style*="grid-template-columns:repeat(2,1fr)"]{grid-template-columns:1fr!important}',
    'section [style*="grid-template-columns:repeat(3,1fr)"]{grid-template-columns:1fr!important}',
    /* Gap reduction */
    'section [style*="gap:5rem"]{gap:2rem!important}',
    'section [style*="gap:4rem"]{gap:2rem!important}',
    'section [style*="gap:3rem"]{gap:1.5rem!important}',
    /* Images */
    'section img{max-width:100%!important}',
    '}',
  ].join('\n');

  if (!document.getElementById('_glcss')) {
    var s = document.createElement('style');
    s.id = '_glcss';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  /* ═══════════════════════════════════════════════════════════
     Page transitions
  ═══════════════════════════════════════════════════════════ */
  function initTransitions() {
    document.querySelectorAll('a[href]').forEach(function (link) {
      var href = link.getAttribute('href') || '';
      if (!href || href.charAt(0) === '#') return;
      if (/^mailto:|^tel:/.test(href)) return;
      if (/^https?:\/\//.test(href) && href.indexOf(location.hostname) === -1) return;
      if (link.target) return;
      link.addEventListener('click', function (e) {
        var dest = this.href;
        if (!dest || dest === location.href) return;
        e.preventDefault();
        document.body.classList.add('_gl_out');
        setTimeout(function () { location.href = dest; }, 270);
      });
    });
  }

  /* ═══════════════════════════════════════════════════════════
     Scroll reveal observer
  ═══════════════════════════════════════════════════════════ */
  function initReveal() {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('on'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
    document.querySelectorAll('.glr,.glrl,.glrr,.glrs').forEach(function (el) { io.observe(el); });
  }

  /* ═══════════════════════════════════════════════════════════
     Auto-tag elements for scroll reveal
  ═══════════════════════════════════════════════════════════ */
  function autoTag() {
    function tagged(el) {
      return el.classList.contains('glr') || el.classList.contains('glrl') ||
             el.classList.contains('glrr') || el.classList.contains('glrs');
    }
    var heroSec = document.querySelector('section[style*="100vh"]');

    /* Section headings & eyebrows (skip if in hero) */
    document.querySelectorAll('.section-heading').forEach(function (el) {
      if (!tagged(el) && !(heroSec && heroSec.contains(el))) el.classList.add('glr');
    });
    document.querySelectorAll('.eyebrow').forEach(function (el) {
      if (!tagged(el) && !(heroSec && heroSec.contains(el))) el.classList.add('glr');
    });

    /* Stat cards — staggered */
    document.querySelectorAll('.stats-grid .stat-card').forEach(function (el, i) {
      if (!tagged(el)) el.classList.add('glr', 'd' + Math.min((i % 3) + 1, 5));
    });

    /* Application link cards */
    document.querySelectorAll('.stats-grid > a[href]').forEach(function (el, i) {
      if (!tagged(el)) {
        el.classList.add('app-card', 'glr', 'd' + Math.min((i % 4) + 1, 5));
      }
    });

    /* Comparison boxes (MLE vs DLE, etc.) — slide in from sides */
    document.querySelectorAll('section > div > div > div[style*="border-radius:8px"]').forEach(function (el, i) {
      if (tagged(el)) return;
      if (el.closest('.stat-card') || el.closest('.stats-grid') || el.closest('#pilot-process')) return;
      el.classList.add(i % 2 === 0 ? 'glrl' : 'glrr');
    });

    /* Long paragraphs outside hero */
    document.querySelectorAll('section p').forEach(function (el) {
      if (el.textContent.trim().length < 130) return;
      if (tagged(el) || (heroSec && heroSec.contains(el))) return;
      el.classList.add('glr');
    });

    /* Images */
    document.querySelectorAll('section img').forEach(function (el) {
      var h = el.getAttribute('style') || '';
      if (h.indexOf('height:34px') !== -1 || h.indexOf('height:38px') !== -1) return;
      if (!tagged(el)) el.classList.add('glrs');
    });

    /* Pilot process step cards — staggered in groups */
    var pilotSec = document.getElementById('pilot-process');
    if (pilotSec) {
      var stepCards = pilotSec.querySelectorAll('[style*="border-radius:8px"][style*="padding:1.5rem"]');
      stepCards.forEach(function (el, i) {
        if (!tagged(el)) el.classList.add('glr', 'd' + Math.min((i % 3) + 1, 5));
      });
      /* Phase label rows */
      pilotSec.querySelectorAll('[style*="display:flex"][style*="align-items:center"][style*="gap:1rem"]').forEach(function (el) {
        if (!tagged(el)) el.classList.add('glr');
      });
    }

    /* Big statement text blocks */
    document.querySelectorAll('section > div > p[style*="Space Grotesk"]').forEach(function (el) {
      if (!tagged(el) && !(heroSec && heroSec.contains(el))) el.classList.add('glr');
    });

    /* "How D.C.M. works" inline links */
    document.querySelectorAll('section > div > a[style]').forEach(function (el) {
      if (!tagged(el)) el.classList.add('glr');
    });
  }

  /* ═══════════════════════════════════════════════════════════
     Counter animation (spring ease, triggers once on viewport enter)
  ═══════════════════════════════════════════════════════════ */
  function initCounters() {
    function countUp(el, target, dur) {
      var t0 = performance.now();
      (function frame(t) {
        var p = Math.min((t - t0) / dur, 1);
        var ease = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.floor(target * ease);
        if (p < 1) requestAnimationFrame(frame);
        else el.textContent = target;
      })(performance.now());
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          countUp(e.target, Number(e.target.dataset.target), 2000);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    document.querySelectorAll('[data-counter]').forEach(function (el) { io.observe(el); });
  }

  /* ═══════════════════════════════════════════════════════════
     Shimmer on all primary CTA buttons
  ═══════════════════════════════════════════════════════════ */
  function initShimmer() {
    document.querySelectorAll('.btn-primary, .btn-primary-sm').forEach(function (el) {
      el.classList.add('gl-sh');
    });
  }

  /* ═══════════════════════════════════════════════════════════
     CTA section shimmer overlay (auto-detect "Run a Simulation" sections)
  ═══════════════════════════════════════════════════════════ */
  function initCTASection() {
    document.querySelectorAll('section').forEach(function (sec) {
      var txt = sec.textContent;
      var hasCTA = txt.indexOf('Get in touch') !== -1 || txt.indexOf('Run a Simulation') !== -1;
      var hasVideo = !!sec.querySelector('video');
      var hasForm = !!sec.querySelector('form, input');
      if (hasCTA && !hasVideo && !hasForm) {
        sec.classList.add('gl-cta');
      }
    });
  }

  /* ═══════════════════════════════════════════════════════════
     Boot
  ═══════════════════════════════════════════════════════════ */
  document.addEventListener('DOMContentLoaded', function () {
    autoTag();
    initReveal();
    initCounters();
    initTransitions();
    initShimmer();
    initCTASection();
  });

})();
