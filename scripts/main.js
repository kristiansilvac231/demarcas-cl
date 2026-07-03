/* ============================================================
   SMOOTH SCROLL
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href');
    if (id === '#' || id.startsWith('#plan-')) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const header = document.querySelector('.header');
    const urgency = document.querySelector('.urgency-bar');
    const offset = (header?.offsetHeight || 0) + (urgency?.offsetHeight || 0);
    const top = target.getBoundingClientRect().top + window.scrollY - offset - 16;
    window.scrollTo({ top, behavior: 'smooth' });
    // Close mobile menu if open
    closeMobileMenu();
  });
});

/* ============================================================
   MOBILE MENU TOGGLE
   ============================================================ */
const menuToggle = document.querySelector('.header__menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

function closeMobileMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.remove('is-open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
}

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('is-open');
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

/* ============================================================
   FAQ CHEVRON ANIMATION
   Handled via CSS, but we ensure only one open at a time on mobile
   ============================================================ */
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  item.addEventListener('toggle', () => {
    // No forced single-open behavior — allow multiple open
  });
});

/* ============================================================
   URGENCY COUNTDOWN — días restantes hasta el 31 de julio
   To change the offer month: update `deadline` below
   ============================================================ */
(function() {
  const countdownEl = document.getElementById('countdown');
  if (!countdownEl) return;

  // Change this date to update the offer deadline
  const deadline = new Date('2026-07-31T23:59:59-04:00'); // Chile timezone

  function update() {
    const now = new Date();
    const diff = deadline - now;
    if (diff <= 0) {
      countdownEl.textContent = '';
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (days > 0) {
      countdownEl.textContent = `· ${days} día${days !== 1 ? 's' : ''} restante${days !== 1 ? 's' : ''}`;
    } else if (hours > 0) {
      countdownEl.textContent = `· ${hours} hora${hours !== 1 ? 's' : ''} restante${hours !== 1 ? 's' : ''}`;
    } else {
      countdownEl.textContent = '· ¡Últimas horas!';
    }
  }

  update();
  setInterval(update, 60000);
})();

/* ============================================================
   STICKY HEADER — offset urgency bar height
   ============================================================ */
(function() {
  const urgency = document.querySelector('.urgency-bar');
  const header = document.querySelector('.header');
  if (!urgency || !header) return;

  function setHeaderTop() {
    header.style.top = urgency.offsetHeight + 'px';
  }

  setHeaderTop();
  window.addEventListener('resize', setHeaderTop);
})();
