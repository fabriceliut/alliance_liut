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
  'cta-contact-manifesto',
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

// ── Contact form (Web3Forms) ──────────────────────────────────
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const submitBtn     = document.getElementById('form-submit-btn');
  const submitLabel   = document.getElementById('form-submit-label');
  const spinner       = document.getElementById('form-submit-spinner');
  const successMsg    = document.getElementById('form-success');
  const serverErrMsg  = document.getElementById('form-server-error');

  // Inline validation helpers
  function setFieldError(input, errorId, show) {
    const errorEl = document.getElementById(errorId);
    if (!errorEl) return;
    input.setAttribute('aria-invalid', show ? 'true' : 'false');
    errorEl.classList.toggle('visible', show);
  }

  function validateField(input) {
    if (input.type === 'email') {
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
      setFieldError(input, `${input.id}-error`, !valid);
      return valid;
    }
    const empty = input.value.trim() === '';
    setFieldError(input, `${input.id}-error`, empty);
    return !empty;
  }

  // Live validation on blur
  contactForm.querySelectorAll('.form-input, .form-textarea').forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') validateField(field);
    });
  });

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all fields
    const fields = [...contactForm.querySelectorAll('.form-input, .form-textarea')];
    const allValid = fields.every((f) => validateField(f));
    if (!allValid) {
      fields.find((f) => f.getAttribute('aria-invalid') === 'true')?.focus();
      return;
    }

    // Loading state
    submitBtn.disabled = true;
    submitLabel.textContent = 'Envoi en cours…';
    spinner.style.display = 'block';
    successMsg.classList.remove('visible');
    serverErrMsg.classList.remove('visible');

    try {
      const formData = new FormData(contactForm);
      const response = await fetch('https://formsubmit.co/ajax/liut.fabrice@gmail.com', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        successMsg.classList.add('visible');
        contactForm.reset();
        fields.forEach((f) => f.setAttribute('aria-invalid', 'false'));
      } else {
        serverErrMsg.classList.add('visible');
      }
    } catch {
      serverErrMsg.classList.add('visible');
    } finally {
      submitBtn.disabled = false;
      submitLabel.textContent = 'Envoyer le message';
      spinner.style.display = 'none';
    }
  });
}

// ── Spinner keyframe (inline) ─────────────────────────────────
const styleEl = document.createElement('style');
styleEl.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
document.head.appendChild(styleEl);
// Items with transition-delay defined via inline style still need is-visible
// For above-fold hero items, trigger after a micro-tick so CSS parses delays
setTimeout(() => {
  document.querySelectorAll('.hero .reveal').forEach((el) => {
    // The IntersectionObserver will fire but hero is already in viewport,
    // so this is a belt-and-suspenders fallback.
    el.classList.add('is-visible');
  });
}, 50);
