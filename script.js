/* =========================================
   PRABHU PORTFOLIO — script.js
   ========================================= */

/* ===== NAVBAR: Sticky + Scroll Class ===== */
const navbar  = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  // Navbar background
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  // Scroll-to-top button
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
  // Active nav link
  highlightNavLink();
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== HAMBURGER MENU ===== */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  });
});

/* ===== ACTIVE NAV LINK ON SCROLL ===== */
function highlightNavLink() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id     = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

/* ===== TYPING TEXT ANIMATION ===== */
const typedTextEl  = document.getElementById('typedText');
const typingPhrases = [
  'ECE Undergraduate',
  'Frontend Developer',
  'JavaScript Learner',
  'React Enthusiast',
  'DSA Practitioner',
  'Problem Solver',
];

let phraseIdx  = 0;
let charIdx    = 0;
let isDeleting = false;
let typingTimer;

function typeEffect() {
  const currentPhrase = typingPhrases[phraseIdx];
  const displayText   = isDeleting
    ? currentPhrase.substring(0, charIdx - 1)
    : currentPhrase.substring(0, charIdx + 1);

  typedTextEl.textContent = displayText;
  charIdx = isDeleting ? charIdx - 1 : charIdx + 1;

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIdx === currentPhrase.length + 1) {
    // Full word typed — pause then delete
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    // Deleted — move to next phrase
    isDeleting = false;
    phraseIdx  = (phraseIdx + 1) % typingPhrases.length;
    delay      = 350;
  }

  typingTimer = setTimeout(typeEffect, delay);
}

typeEffect();

/* ===== SCROLL REVEAL ANIMATIONS ===== */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Animate skill bars when skill cards become visible
        const fill = entry.target.querySelector('.skill-fill');
        if (fill) {
          const targetWidth = fill.getAttribute('data-width');
          setTimeout(() => { fill.style.width = targetWidth; }, 200);
        }
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ===== CONTACT FORM ===== */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Simple validation
  const inputs = contactForm.querySelectorAll('[required]');
  let valid = true;

  inputs.forEach(input => {
    input.style.borderColor = '';
    if (!input.value.trim()) {
      input.style.borderColor = 'rgba(255,80,80,0.6)';
      valid = false;
    }
    if (input.type === 'email' && input.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value)) {
        input.style.borderColor = 'rgba(255,80,80,0.6)';
        valid = false;
      }
    }
  });

  if (!valid) return;

  // Simulate sending
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
  btn.disabled  = true;

  setTimeout(() => {
    contactForm.reset();
    btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
    btn.disabled  = false;
    formSuccess.classList.add('show');
    setTimeout(() => formSuccess.classList.remove('show'), 4000);
  }, 1500);
});

/* ===== INPUT FOCUS: clear error border ===== */
document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(el => {
  el.addEventListener('focus', () => { el.style.borderColor = ''; });
});

/* ===== SMOOTH SCROLL for anchor links ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ===== PROJECT CARD: subtle parallax on mouse move ===== */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect    = card.getBoundingClientRect();
    const x       = e.clientX - rect.left - rect.width  / 2;
    const y       = e.clientY - rect.top  - rect.height / 2;
    const rotateX = -(y / rect.height) * 6;
    const rotateY =  (x / rect.width)  * 6;
    card.style.transform = `translateY(-8px) perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ===== SKILL CARD: subtle tilt ===== */
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect    = card.getBoundingClientRect();
    const x       = e.clientX - rect.left - rect.width  / 2;
    const y       = e.clientY - rect.top  - rect.height / 2;
    const rotateX = -(y / rect.height) * 5;
    const rotateY =  (x / rect.width)  * 5;
    card.style.transform = `translateY(-6px) perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ===== FOOTER YEAR (auto-update) ===== */
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
  footerYear.innerHTML = footerYear.innerHTML.replace(
    /\d{4}/,
    new Date().getFullYear()
  );
}

/* ===== HERO greeting time-of-day ===== */
const greetingEl = document.querySelector('.hero-greeting');
if (greetingEl) {
  const hour = new Date().getHours();
  let greet  = "Hello, I'm";
  if (hour >= 5  && hour < 12) greet = "Good Morning, I'm";
  if (hour >= 12 && hour < 17) greet = "Good Afternoon, I'm";
  if (hour >= 17 && hour < 21) greet = "Good Evening, I'm";
  greetingEl.textContent = greet;
}
