/* ============================================================
   Portfolio – Lucas Rajany
   Librairies : Vanta.js (fond), anime.js v3 (animations), Lenis (scroll)
   ============================================================ */
(function () {
  'use strict';
  window.__portfolioReady = true;   // lu par le filet de sécurité de index.html

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none)').matches;
  const isMobile = window.innerWidth < 820;
  const root = document.documentElement;
  if (reduced) document.documentElement.classList.add('reduced');

  /* ── 1. LENIS : scroll fluide ───────────────────────────── */
  let lenis = null;
  const progress = document.getElementById('scroll-progress');
  const nav = document.getElementById('nav');

  function onScroll(y) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    nav.classList.toggle('scrolled', y > 40);
  }

  if (window.Lenis && !reduced) {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on('scroll', (e) => onScroll(e.scroll));
    (function raf(time) { lenis.raf(time); requestAnimationFrame(raf); })(0);
    // Le scroll reste bloqué pendant l'intro
    if (document.documentElement.classList.contains('is-loading')) lenis.stop();
  } else {
    window.addEventListener('scroll', () => onScroll(window.scrollY), { passive: true });
  }

  // Liens d'ancre → défilement fluide via Lenis
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -60 });
      else target.scrollIntoView({ behavior: 'smooth' });
      document.getElementById('nav-links').classList.remove('open');
      if (lenis) lenis.start();
    });
  });

  /* ── 2. THÈME + VANTA : fond animé du hero ──────────────── */
  let vanta = null;
  function startVanta(theme) {
    if (vanta) { try { vanta.destroy(); } catch (e) {} vanta = null; }
    if (!(window.VANTA && window.THREE) || reduced) return;
    const light = theme === 'light';
    try {
      vanta = VANTA.NET({
        el: '#vanta-bg',
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1.0,
        scaleMobile: 1.0,
        color: light ? 0xc2410c : 0x38bdf8,
        backgroundColor: light ? 0xd8c7b0 : 0x07070d,
        points: isMobile ? 7 : 11,
        maxDistance: isMobile ? 18 : 22,
        spacing: isMobile ? 20 : 17,
        showDots: true
      });
    } catch (err) {
      console.warn('Vanta indisponible :', err);
    }
  }
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);   // les variables CSS font le reste
    startVanta(theme);
    try { localStorage.setItem('portfolio-theme', theme); } catch (e) {}   // les pages projet reprennent ce choix
  }
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) themeBtn.addEventListener('click', () => applyTheme(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light'));

  /* ── 3. Menu mobile ─────────────────────────────────────── */
  const navLinks = document.getElementById('nav-links');
  document.getElementById('nav-toggle').addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    if (lenis) open ? lenis.stop() : lenis.start();
  });

  /* ── 4. Texte tapé (rôles) ──────────────────────────────── */
  const FR_ROLES = [
    'Étudiant BTS SIO SLAM',
    'Développeur en formation',
    "Passionné d'automatisation IA",
    'Curieux de systèmes & DevOps'
  ];
  const getRoles = () => (window.I18N ? window.I18N.roles() : FR_ROLES);
  const tr = (key, fallback) => (window.I18N ? window.I18N.t(key) : fallback);
  const typedEl = document.getElementById('typed');
  let ri = 0, ci = 0, deleting = false;
  function type() {
    const roles = getRoles();
    const cur = roles[ri];
    if (!deleting) {
      typedEl.textContent = cur.slice(0, ++ci);
      if (ci === cur.length) { deleting = true; setTimeout(type, 2200); return; }
    } else {
      typedEl.textContent = cur.slice(0, --ci);
      if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
    }
    setTimeout(type, deleting ? 45 : 80);
  }
  type();
  // Changement de langue : on repart du premier rôle dans la nouvelle langue
  document.addEventListener('languagechange', () => { ri = 0; ci = 0; deleting = false; });

  /* ── 5. ANIME.JS : entrée du hero ───────────────────────── */
  // Lancée pendant la fin de l'intro (voir section 10)
  function playHero() {
    if (window.anime && !reduced) {
      anime.timeline({ easing: 'easeOutExpo' })
        .add({ targets: '.hero-badge', opacity: [0, 1], translateY: [24, 0], duration: 900 })
        .add({ targets: '.hero-last', opacity: [0, 1], translateX: [80, 0], duration: 1100 }, '-=700')
        .add({ targets: ['.hero-role', '.hero-desc'], opacity: [0, 1], translateY: [24, 0], duration: 900, delay: anime.stagger(120) }, '-=800')
        .add({ targets: ['.hero-actions', '.hero-socials'], opacity: [0, 1], translateY: [24, 0], duration: 900, delay: anime.stagger(120) }, '-=700');
    } else {
      document.querySelectorAll('.a-hero').forEach((el) => (el.style.opacity = 1));
    }
  }

  /* ── 6. ANIME.JS : révélation au scroll ─────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  if (window.anime && !reduced && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        io.unobserve(el);
        anime({
          targets: el,
          opacity: [0, 1],
          translateY: [40, 0],
          duration: 900,
          easing: 'easeOutCubic',
          complete: () => { el.style.transform = ''; }
        });
        // Les pastilles/tags à l'intérieur apparaissent en cascade
        const kids = el.querySelectorAll('.skill-pill, .project-tag, .tag, .timeline-list li');
        if (kids.length) {
          anime({
            targets: kids,
            opacity: [0, 1],
            translateX: [-12, 0],
            duration: 600,
            delay: anime.stagger(45, { start: 250 }),
            easing: 'easeOutQuad'
          });
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => (el.style.opacity = 1));
  }

  /* ── 7. Lien actif dans la nav (scrollspy) ──────────────── */
  const sections = [...document.querySelectorAll('main section, section[id]')];
  const links = [...document.querySelectorAll('.nav-links a')];
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
        }
      });
    }, { threshold: 0.45 });
    sections.forEach((s) => spy.observe(s));
  }

  /* ── 8. Effets souris (desktop uniquement) ──────────────── */
  if (!isTouch && !reduced) {
    // Halo qui suit le curseur
    const glow = document.getElementById('cursor-glow');
    window.addEventListener('mousemove', (e) => {
      glow.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
    }, { passive: true });

    // Inclinaison 3D des cartes
    document.querySelectorAll('.tilt').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'perspective(900px) rotateY(' + x * 7 + 'deg) rotateX(' + -y * 7 + 'deg) translateY(-4px)';
      });
      card.addEventListener('mouseleave', () => {
        if (window.anime) {
          anime({ targets: card, rotateX: 0, rotateY: 0, translateY: 0, duration: 500, easing: 'easeOutQuad', complete: () => (card.style.transform = '') });
        } else card.style.transform = '';
      });
    });

    // Boutons « magnétiques »
    document.querySelectorAll('.magnetic').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        btn.style.transform = 'translate(' + dx * 0.25 + 'px,' + dy * 0.35 + 'px)';
      });
      btn.addEventListener('mouseleave', () => {
        if (window.anime) anime({ targets: btn, translateX: 0, translateY: 0, duration: 600, easing: 'easeOutElastic(1, .6)', complete: () => (btn.style.transform = '') });
        else btn.style.transform = '';
      });
    });
  }

  /* ── 9. Formulaire : ouvre le client mail avec le message ── */
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = (id) => document.getElementById(id).value.trim();
    const subject = v('f-sujet') || tr('mailSubject', 'Contact depuis le portfolio');
    const body =
      tr('mailHello', 'Bonjour Lucas,') + '\n\n' + v('f-message') +
      '\n\n— ' + v('f-prenom') + ' ' + v('f-nom') + ' (' + v('f-email') + ')';
    document.getElementById('form-msg').style.display = 'block';
    window.location.href =
      'mailto:lucas.lbruno2007@gmail.com?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);
    form.reset();
  });

  /* ── 9b. CHOIX DU MODE : nuit / jour ────────────────────────
     Les deux moitiés se « confrontent » (animation CSS). Au survol, la moitié
     visée gagne du terrain ; au clic, elle envahit l'écran, le thème est
     appliqué, puis l'intro (section 10) démarre. */
  const choice = document.getElementById('choice');
  let chosenResolve;
  const chosen = new Promise((r) => (chosenResolve = r));

  function finishChoice() {
    root.classList.remove('is-choosing');
    chosenResolve();
  }

  if (!choice) {
    applyTheme('dark');          // pas d'écran de choix : mode nuit par défaut
    finishChoice();
  } else {
    let picked = false;
    const lean = (t) => { if (!picked) choice.dataset.lean = t; };

    choice.querySelectorAll('.choice-side').forEach((btn) => {
      const t = btn.dataset.theme;
      btn.addEventListener('pointerenter', () => lean(t));
      btn.addEventListener('pointerleave', () => lean(''));
      btn.addEventListener('focus', () => lean(t));
      btn.addEventListener('blur', () => lean(''));
      btn.addEventListener('click', () => pick(t));
    });

    function pick(t) {
      if (picked) return;
      picked = true;
      choice.dataset.lean = '';
      choice.dataset.pick = t;                       // la moitié choisie envahit l'écran
      setTimeout(() => {
        applyTheme(t);                               // thème + fond Vanta
        choice.classList.add('is-leaving');          // fondu de l'écran de choix
        setTimeout(finishChoice, reduced ? 0 : 600); // puis l'intro démarre
      }, reduced ? 0 : 950);
    }
  }

  /* ── 10. INTRO façon lenis.dev ──────────────────────────────
     1) écran de couleur unie
     2) les 5 lettres apparaissent EN MÊME TEMPS, déjà dans l'ordre (zigzag haut/bas)
     3) elles glissent à la verticale pour s'aligner sur le titre du hero
        pendant que le fond rose se retire par le bas
     ----------------------------------------------------------- */
  const intro = document.getElementById('intro');
  const heroLetters = [...document.querySelectorAll('.hero-name .hl')];

  function endIntro() {
    root.classList.remove('is-loading');
    if (intro) intro.remove();
    window.dispatchEvent(new Event('resize'));
    if (lenis) lenis.start();
  }

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  if (!intro || !window.anime || reduced) {
    chosen.then(() => {
      heroLetters.forEach((l) => (l.style.opacity = 1));
      endIntro();
      playHero();
    });
  } else {
    const bg = document.getElementById('intro-bg');
    const wrappers = [...document.querySelectorAll('#intro-letters .il')];
    const glyphs = [...document.querySelectorAll('#intro-letters .il-g')];

    // On attend la police gothique + le chargement de la page (filets de sécurité)
    const fontReady = Promise.race([
      document.fonts ? document.fonts.load('900 100px "Grenze Gotisch"', 'LUCAS') : Promise.resolve(),
      new Promise((r) => setTimeout(r, 3000))
    ]);
    const pageLoaded = document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise((r) => window.addEventListener('load', r, { once: true }));
    const pageReady = Promise.race([pageLoaded, new Promise((r) => setTimeout(r, 5000))]);

    Promise.all([fontReady, pageReady, chosen]).then(() => {
      // 2) Les 5 lettres arrivent toutes ensemble, déjà dans l'ordre (L U C A S en zigzag)
      anime({
        targets: wrappers,
        opacity: [0, 1],
        translateY: [80, 0],
        duration: 1000,
        delay: 500,
        easing: 'easeOutExpo'
      }).finished.then(() => setTimeout(fly, 700));
    });

    // 3) Les lettres glissent (vers le haut / vers le bas) pour s'aligner sur le titre,
    //    pendant que le fond rose se retire et que la couleur s'inverse.
    function fly() {
      const to = heroLetters.map((l) => l.getBoundingClientRect());
      const from = glyphs.map((g) => g.getBoundingClientRect());

      const flight = anime({
        targets: glyphs,
        translateX: (el, i) => to[i].left - from[i].left,
        translateY: (el, i) => to[i].top - from[i].top,
        duration: 1400,
        easing: 'easeInOutExpo'
      });

      // Mode jour : les lettres passent du brun foncé (sur le rideau orange) à l'orange du titre
      if (root.getAttribute('data-theme') === 'light') {
        const cs = getComputedStyle(root);
        anime({
          targets: glyphs,
          color: [cs.getPropertyValue('--ink').trim() || '#26140a', cs.getPropertyValue('--title').trim() || '#d4541c'],
          duration: 1100, delay: 250, easing: 'easeInOutQuad'
        });
      }

      const wipe = { v: 0 };
      anime({
        targets: wipe, v: 100, duration: 1300, delay: 150, easing: 'easeInOutQuart',
        update: () => { bg.style.clipPath = 'inset(0 0 ' + wipe.v + '% 0)'; }
      });

      setTimeout(playHero, 1000);

      flight.finished.then(() => {
        heroLetters.forEach((l) => (l.style.opacity = 1)); // le vrai titre prend le relais
        requestAnimationFrame(endIntro);
      });
    }
  }

  /* ── 11. PROJETS : défilé horizontal ─────────────────────────
     Desktop : la section s'épingle, le scroll vertical (Lenis) fait
     défiler les cartes horizontalement.
     Mobile / tactile / animations réduites : carrousel natif (swipe). */
  const hs = document.getElementById('hscroll');
  if (hs) {
    const track = document.getElementById('hscroll-track');
    const bar = document.getElementById('hs-bar');
    const count = document.getElementById('hs-count');
    const hint = document.getElementById('hs-hint');
    const nCards = track.querySelectorAll('.proj').length;
    const SPEED = 1.15; // > 1 = défilé un peu plus lent
    let pinned = false, travel = 0;
    const pad = (n) => String(n).padStart(2, '0');

    function setUI(p) {
      bar.style.transform = 'scaleX(' + Math.max(p, 0.04) + ')';
      count.textContent = pad(Math.round(p * (nCards - 1)) + 1) + ' / ' + pad(nCards);
    }

    function update() {
      if (pinned) {
        const r = hs.getBoundingClientRect();
        const max = hs.offsetHeight - window.innerHeight;
        const p = max > 0 ? Math.min(Math.max(-r.top / max, 0), 1) : 0;
        track.style.transform = 'translate3d(' + (-p * travel) + 'px,0,0)';
        setUI(p);
      } else {
        const max = track.scrollWidth - track.clientWidth;
        setUI(max > 0 ? track.scrollLeft / max : 0);
      }
    }

    function measure() {
      pinned = !reduced && !isTouch && window.innerWidth >= 900 && window.innerHeight >= 720;
      hs.classList.toggle('hs-pinned', pinned);
      track.style.transform = '';
      if (pinned) {
        travel = Math.max(track.scrollWidth - hs.clientWidth, 0);
        hs.style.height = (travel * SPEED + window.innerHeight) + 'px';
        hint.textContent = tr('hsDown', 'Faites défiler ↓');
      } else {
        hs.style.height = '';
        hint.textContent = tr('hsSwipe', 'Glissez →');
      }
      update();
    }

    window.addEventListener('scroll', update, { passive: true });
    track.addEventListener('scroll', () => { if (!pinned) update(); }, { passive: true });
    window.addEventListener('resize', measure);
    document.addEventListener('languagechange', () => {
      hint.textContent = pinned ? tr('hsDown', 'Faites défiler ↓') : tr('hsSwipe', 'Glissez →');
    });
    window.addEventListener('load', measure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    measure();
  }

  // Nettoyage Vanta si la page est quittée
  window.addEventListener('beforeunload', () => { if (vanta) vanta.destroy(); });
})();
