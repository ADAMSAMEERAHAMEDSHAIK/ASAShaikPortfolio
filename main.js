

// basic interactions: hamburger, smooth scroll, contact form mailto fallback, reveal
document.addEventListener('DOMContentLoaded', function () {
  // set year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // hamburger toggle
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.querySelector('.nav');
  menuToggle && menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuToggle.classList.toggle('active');
  });

  // smooth anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth', block:'start'});
        // close menu on mobile
        if (nav.classList.contains('open')) nav.classList.remove('open');
      }
    });
  });

  // contact form fallback to mailto
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('cname').value.trim();
      const email = document.getElementById('cemail').value.trim();
      const message = document.getElementById('cmessage').value.trim();
      if (!name || !email || !message) {
        status && (status.textContent = 'Please fill all fields.');
        return;
      }
      // mailto fallback
      const mailto = `mailto:adamsameerahamedshaik@gmail.com?subject=${encodeURIComponent('Portfolio contact from ' + name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' <' + email + '>')}`;
      window.location.href = mailto;
      status && (status.textContent = 'Opening your email client...');
    });
  }

  // reveal on scroll
  const reveal = document.querySelectorAll('.section, .proj-card, .skill-tile, .about-card, .timeline-card, .cert');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.style.transform = 'translateY(0)';
        en.target.style.opacity = 1;
        en.target.style.transition = 'opacity 600ms ease, transform 600ms ease';
      } else {
        en.target.style.transform = 'translateY(18px)';
        en.target.style.opacity = 0;
      }
    });
  }, {threshold: 0.12});
  reveal.forEach(r => {
    r.style.transform = 'translateY(18px)';
    r.style.opacity = 0;
    obs.observe(r);
  });
});
