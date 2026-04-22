/* ============================================================
   MAIN.JS — L'Alliance V2
   Vanilla JS: nav scroll, mobile menu, reveal observer, contact
   ============================================================ */

// ── Contact (mailto obfusqué) ────────────────────────────────
function handleContact(e) {
  if (e) e.preventDefault();
  const addr = ['fabrice', 'liut.me'].join('@');
  window.location.href = `mailto:${addr}`;
}

// ── Smooth scroll to section ────────────────────────────────
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ── Navbar: scroll state ─────────────────────────────────────
const navbar = document.getElementById('navbar');
function onScroll() {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // init state

// ── Navbar: scroll buttons ───────────────────────────────────
document.querySelectorAll('[data-scroll]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.scroll;
    closeMobileMenu();
    scrollToSection(id);
  });
});

// ── Mobile menu ──────────────────────────────────────────────
const burgerBtn   = document.getElementById('burger-btn');
const mobileMenu  = document.getElementById('mobile-menu');
const iconMenu    = document.getElementById('icon-menu');
const iconClose   = document.getElementById('icon-close');

let menuOpen = false;

function openMobileMenu() {
  menuOpen = true;
  mobileMenu.classList.add('open');
  burgerBtn.setAttribute('aria-expanded', 'true');
  burgerBtn.setAttribute('aria-label', 'Fermer le menu');
  iconMenu.style.display  = 'none';
  iconClose.style.display = 'block';
  document.body.style.overflow = 'hidden';
  // focus first item
  const first = mobileMenu.querySelector('button, a');
  if (first) first.focus();
}

function closeMobileMenu() {
  menuOpen = false;
  mobileMenu.classList.remove('open');
  burgerBtn.setAttribute('aria-expanded', 'false');
  burgerBtn.setAttribute('aria-label', 'Ouvrir le menu');
  iconMenu.style.display  = 'block';
  iconClose.style.display = 'none';
  document.body.style.overflow = '';
}

burgerBtn.addEventListener('click', () => {
  menuOpen ? closeMobileMenu() : openMobileMenu();
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuOpen) {
    closeMobileMenu();
    burgerBtn.focus();
  }
});

// ── Contact CTAs ─────────────────────────────────────────────
const contactIds = [
  'cta-contact-nav',
  'cta-contact-mobile',
  'cta-contact-expertise',
  'cta-contact-partners',
  'cta-contact-footer',
];

contactIds.forEach((id) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('click', handleContact);
});

// ── Reveal on scroll (IntersectionObserver) ──────────────────
// Respect prefers-reduced-motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  // Single reveals
  document.querySelectorAll('.reveal').forEach((el) => {
    // Apply transition-delay from inline style if set
    revealObserver.observe(el);
  });

  // Stagger groups — observe the group wrapper, then cascade
  const staggerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          staggerObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal-stagger').forEach((el) => {
    staggerObserver.observe(el);
  });
} else {
  // Show everything immediately when motion is reduced
  document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => {
    el.classList.add('is-visible');
  });
}

// ── Hero: apply reveal immediately (above fold) ──────────────
// Items with transition-delay defined via inline style still need is-visible
// For above-fold hero items, trigger after a micro-tick so CSS parses delays
setTimeout(() => {
  document.querySelectorAll('.hero .reveal').forEach((el) => {
    // The IntersectionObserver will fire but hero is already in viewport,
    // so this is a belt-and-suspenders fallback.
    el.classList.add('is-visible');
  });
}, 50);
