/* ══════════════════════════════════════════
   QUASAR — Main JavaScript
   ══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Header scroll effect ── */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
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

  /* ── Active nav link ── */
  const currentPath = window.location.pathname;
  document.querySelectorAll('.main-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath ||
        (currentPath.endsWith('/') && href === 'index.html') ||
        currentPath.endsWith(href)) {
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
  if (modalBtn) {
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
    setTimeout(() => cookieBanner.classList.add('visible'), 1500);
  }
  if (cookieAccept) {
    cookieAccept.addEventListener('click', () => {
      localStorage.setItem('quasar-cookies-accepted', 'true');
      cookieBanner.classList.remove('visible');
    });
  }
  if (cookieManage) {
    cookieManage.addEventListener('click', () => {
      localStorage.setItem('quasar-cookies-accepted', 'true');
      cookieBanner.classList.remove('visible');
    });
  }

  /* ── Confidence bar animation on scroll ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.confidence-fill');
        fills.forEach(fill => {
          fill.style.width = fill.dataset.width;
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.confidence-visual').forEach(el => {
    observer.observe(el);
  });

  /* ── Fade-in sections on scroll ── */
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section, .page-header').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
  });

  // CSS class for fade in
  const style = document.createElement('style');
  style.textContent = `.fade-in { opacity: 1 !important; transform: translateY(0) !important; }`;
  document.head.appendChild(style);

});
