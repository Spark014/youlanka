// =============================================
// YOULANKA TRAVELS – main.js
// =============================================

// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
function handleNavScroll() {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();

// ── MOBILE HAMBURGER ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(isOpen));
  // Animate hamburger to X
  const spans = hamburger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ── SMOOTH SCROLL REVEAL ──
function setupReveal() {
  const revealEls = document.querySelectorAll(
    '.stat-item, .adv-card, .case-card, .capability-card, .hotel-logo-card, ' +
    '.fleet-img, .leadership-card, .office-img, .fleet-block, .team-hl, ' +
    '.about-img-main, .about-img-secondary, .contact-card, .contact-form-wrap'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Stagger children if parent is a grid
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  // Add staggered delay per sibling group
  const grids = document.querySelectorAll(
    '.advantages-grid, .capability-grid, .hotels-grid, .cases-grid, ' +
    '.stats-inner, .team-highlights, .fleet-images, .leadership-grid, .office-grid'
  );

  grids.forEach(grid => {
    Array.from(grid.children).forEach((child, i) => {
      child.style.transitionDelay = `${i * 90}ms`;
    });
  });

  revealEls.forEach(el => observer.observe(el));
}

// ── SECTION H2 / H3 REVEAL ──
function setupTitleReveal() {
  const titles = document.querySelectorAll('.section-title, .section-tag, .section-desc, h3');
  titles.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  titles.forEach(el => obs.observe(el));
}

// ── ACTIVE NAV HIGHLIGHT ──
function setupActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href').slice(1);
          if (href === id) {
            link.style.color = 'var(--gold-light)';
          } else if (!link.classList.contains('nav-cta')) {
            link.style.color = '';
          }
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(sec => observer.observe(sec));
}

// ── COUNTER ANIMATION ──
function animateCounter(el, target, suffix) {
  let start = 0;
  const duration = 1800;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = current.toLocaleString() + (suffix || '');
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function setupCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  const counterData = [
    { value: 2015, suffix: '' },
    { value: 50000, suffix: '+' },
    { value: 100, suffix: '%' },
    { value: 15, suffix: '%' },
    { value: 1000, suffix: '㎡' },
  ];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const data = counterData[i];
        animateCounter(entry.target, data.value, data.suffix);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach((el, i) => {
    if (counterData[i]) observer.observe(el);
  });
}

// ── CONTACT FORM ──
function setupContactForm() {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simulate send (replace with actual API endpoint)
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = '发送中...';
    btn.disabled = true;

    setTimeout(() => {
      form.style.display = 'none';
      success.classList.add('show');
    }, 1200);
  });
}

// ── HOTEL LOGO CARD EQUAL HEIGHT FIX ──
function fixHotelLogos() {
  document.querySelectorAll('.hotel-logo-card img').forEach(img => {
    img.style.width = 'auto';
    img.style.maxWidth = '100%';
    img.style.maxHeight = '60px';
    img.style.height = 'auto';
  });
}

// ── PARALLAX HERO ──
function setupParallax() {
  const heroBg = document.querySelector('.hero-bg-img');
  if (!heroBg) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      heroBg.style.transform = `scale(1.08) translateY(${scrollY * 0.25}px)`;
    }
  }, { passive: true });
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  setupReveal();
  setupTitleReveal();
  setupActiveNav();
  setupCounters();
  setupContactForm();
  fixHotelLogos();
  setupParallax();
});
