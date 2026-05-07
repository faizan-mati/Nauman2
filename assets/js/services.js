/* ══════════════════════════════════════════════════════
   SERVICES PAGE JAVASCRIPT
══════════════════════════════════════════════════════ */

// Scroll reveal animation for service cards
document.addEventListener('DOMContentLoaded', function() {
  
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe all service cards
  const serviceCards = document.querySelectorAll('.svc-card');
  serviceCards.forEach(card => {
    observer.observe(card);
  });

  // Observe process steps
  const processSteps = document.querySelectorAll('.step-item');
  processSteps.forEach(step => {
    observer.observe(step);
  });

  // Observe pricing cards
  const priceCards = document.querySelectorAll('.price-card');
  priceCards.forEach(card => {
    observer.observe(card);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add active state to pricing cards on click
  const pricingButtons = document.querySelectorAll('.btn-price');
  pricingButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const card = this.closest('.price-card');
      const planName = card.querySelector('.price-plan').textContent;
      
      // You can add your own logic here (e.g., redirect to contact form)
      console.log(`Selected plan: ${planName}`);
      
      // Optional: Show a confirmation message
      alert(`You selected the ${planName} plan. Redirecting to contact...`);
      // window.location.href = 'contact.html?plan=' + encodeURIComponent(planName);
    });
  });

  // Navbar scroll effect (if not already in main script.js)
  const navbar = document.getElementById('nav');
  if (navbar) {
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        navbar.classList.add('pinned');
      } else {
        navbar.classList.remove('pinned');
      }
      
      lastScroll = currentScroll;
    });
  }

  // Add hover effect to service icons
  const serviceIcons = document.querySelectorAll('.svc-icon');
  serviceIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.08) rotate(5deg)';
    });
    
    icon.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1) rotate(0deg)';
    });
  });

  // Animate step numbers on scroll
  const stepNumbers = document.querySelectorAll('.step-num');
  const stepObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'pulse 2s ease-in-out infinite';
      }
    });
  }, { threshold: 0.5 });

  stepNumbers.forEach(num => {
    stepObserver.observe(num);
  });

});

// Add pulse animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  .visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);
