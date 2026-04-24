/* ══════════════════════════════════════════
   QUASAR — Main JavaScript
   ══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Header scroll effect ── */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Mobile nav toggle ── */
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      mainNav.classList.toggle('open');
    });

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        mainNav.classList.remove('open');
      });
    });
  }

  /* ── Active nav link — match current page ── */
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === currentFile || (currentFile === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── Disclaimer modal (first visit) ── */
  const modal = document.querySelector('.disclaimer-modal-overlay');
  const modalBtn = document.querySelector('.disclaimer-accept');
  if (modal && !localStorage.getItem('quasar-disclaimer-accepted')) {
    modal.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }
  if (modalBtn && modal) {
    modalBtn.addEventListener('click', () => {
      localStorage.setItem('quasar-disclaimer-accepted', 'true');
      modal.classList.remove('visible');
      document.body.style.overflow = '';
    });
  }

  /* ── Cookie banner ── */
  const cookieBanner = document.querySelector('.cookie-banner');
  const cookieAccept = document.querySelector('.cookie-accept');
  const cookieManage = document.querySelector('.cookie-manage');
  if (cookieBanner && !localStorage.getItem('quasar-cookies-accepted')) {
    setTimeout(() => cookieBanner.classList.add('visible'), 1800);
  }
  const dismissCookies = () => {
    localStorage.setItem('quasar-cookies-accepted', 'true');
    cookieBanner && cookieBanner.classList.remove('visible');
  };
  cookieAccept && cookieAccept.addEventListener('click', dismissCookies);
  cookieManage && cookieManage.addEventListener('click', dismissCookies);

  /* ── Confidence bar animation on scroll into view ── */
  const confidenceEls = document.querySelectorAll('.confidence-visual');
  if (confidenceEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.confidence-fill').forEach(fill => {
            fill.style.width = fill.dataset.width;
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });
    confidenceEls.forEach(el => observer.observe(el));
  }

});
