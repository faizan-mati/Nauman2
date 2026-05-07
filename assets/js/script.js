(function () {
  /* ── Sticky navbar ── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => nav.classList.toggle('pinned', scrollY > 60), { passive: true });

  /* ── Scroll-reveal — simple & reliable ── */
  const srObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('on');
      srObs.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.sr').forEach((el, i) => {
    el.style.transitionDelay = (i % 6) * 0.1 + 's';
    srObs.observe(el);
  });

  /* Fallback: show anything already in view on load */
  window.addEventListener('load', () => {
    document.querySelectorAll('.sr:not(.on)').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) el.classList.add('on');
    });
  });

  /* ── Counter animation ── */
  const cntObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.target;
      let n = 0;
      const step = Math.ceil(target / 45);
      const t = setInterval(() => {
        n = Math.min(n + step, target);
        el.textContent = n + '+';
        if (n >= target) clearInterval(t);
      }, 38);
      cntObs.unobserve(el);
    });
  }, { threshold: 0.55 });
  document.querySelectorAll('.count').forEach(c => cntObs.observe(c));

  /* ── Service cards stagger ── */
  document.querySelectorAll('.services-sec .sr').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.09) + 's';
  });

  /* ── Testimonial Stats Counter Animation ── */
  const statsObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.target);
      const isDecimal = target % 1 !== 0;
      let n = 0;
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = target / steps;
      const stepTime = duration / steps;
      
      const timer = setInterval(() => {
        n += increment;
        if (n >= target) {
          n = target;
          clearInterval(timer);
        }
        el.textContent = isDecimal ? n.toFixed(1) : Math.floor(n);
      }, stepTime);
      
      statsObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  
  document.querySelectorAll('.count-up').forEach(c => statsObs.observe(c));
})();

(function () {
    const track = document.getElementById('track');
    const dotsEl = document.getElementById('dots');
    const cards = track.querySelectorAll('.ts-card');
    let perView = window.innerWidth <= 600 ? 1 : window.innerWidth <= 900 ? 2 : 3;
    const total = cards.length;
    const pages = Math.ceil(total / perView);
    let cur = 0;
    let autoPlayInterval;

    function buildDots() {
      dotsEl.innerHTML = '';
      for (let i = 0; i < pages; i++) {
        const d = document.createElement('div');
        d.className = 'ts-dot' + (i === cur ? ' active' : '');
        d.onclick = () => { go(i); resetAutoPlay(); };
        dotsEl.appendChild(d);
      }
    }

    function updateActive() {
      cards.forEach((c, i) => {
        c.classList.toggle('active-card', i === cur * perView);
      });
    }

    function go(idx) {
      cur = Math.max(0, Math.min(idx, pages - 1));
      const cardW = cards[0].offsetWidth + 20;
      track.style.transform = `translateX(-${cur * perView * cardW}px)`;
      dotsEl.querySelectorAll('.ts-dot').forEach((d, i) => d.classList.toggle('active', i === cur));
      updateActive();
    }

    function autoPlay() {
      const next = cur + 1 >= pages ? 0 : cur + 1;
      go(next);
    }

    function startAutoPlay() {
      autoPlayInterval = setInterval(autoPlay, 5000);
    }

    function resetAutoPlay() {
      clearInterval(autoPlayInterval);
      startAutoPlay();
    }

    document.getElementById('prev').onclick = () => { go(cur - 1); resetAutoPlay(); };
    document.getElementById('next').onclick = () => { go(cur + 1); resetAutoPlay(); };

    buildDots();
    updateActive();
    startAutoPlay();

    let startX = 0;
    track.addEventListener('touchstart', e => startX = e.touches[0].clientX, { passive: true });
    track.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) { go(dx < 0 ? cur + 1 : cur - 1); resetAutoPlay(); }
    }, { passive: true });

    window.addEventListener('resize', () => {
      const nv = window.innerWidth <= 600 ? 1 : window.innerWidth <= 900 ? 2 : 3;
      if (nv !== perView) { perView = nv; const p2 = Math.ceil(total / perView); if (cur >= p2) cur = p2 - 1; buildDots(); go(cur); }
    });
  })();