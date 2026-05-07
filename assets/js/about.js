/* ── Sticky Navbar ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('pinned', window.scrollY > 60);
});

/* ── Scroll Reveal with Enhanced Stagger ── */
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Check if it's a mission/vision card for special stagger
      if (entry.target.classList.contains('mv-card')) {
        entry.target.classList.add('visible');
      } else {
        // Regular reveal with slight delay
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 100);
      }
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

/* ── Counter Animation ── */
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16); // 60fps
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start) + '+';
    }
  }, 16);
}

// Observe stat cards for counter animation
const statCards = document.querySelectorAll('.stat-card');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const statNum = entry.target.querySelector('.stat-num');
      const targetValue = parseInt(statNum.textContent);
      animateCounter(statNum, targetValue, 2000);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statCards.forEach(card => counterObserver.observe(card));

/* ── Mission & Vision Section Enhanced Animation ── */
const mvSection = document.querySelector('.mv-sec');
if (mvSection) {
  const mvObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const mvCards = entry.target.querySelectorAll('.mv-card');
        mvCards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('visible');
          }, index * 150); // Stagger by 150ms
        });
        mvObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  mvObserver.observe(mvSection);
}
