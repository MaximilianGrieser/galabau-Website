// Kontaktdaten werden erst zur Laufzeit entschlüsselt und der mailto:/tel:-Link
// wird erst im Klick-Moment gebaut. So taucht die Adresse nie im statischen HTML
// oder im href-Attribut des gerenderten DOM auf – nur ein echter Klick löst die
// Navigation aus, was reine HTML-Scraper und die meisten automatisierten
// DOM-Dumps ins Leere laufen lässt.
document.querySelectorAll('.email-link').forEach(link => {
  const textEl = link.querySelector('.email-text');
  if (textEl) textEl.textContent = atob(link.dataset.email);

  link.addEventListener('click', (e) => {
    e.preventDefault();
    const email = atob(link.dataset.email);
    let href = 'mailto:' + email;
    if (link.dataset.subject) {
      href += '?subject=' + encodeURIComponent(link.dataset.subject);
    }
    window.location.href = href;
  });
});

document.querySelectorAll('.tel-link').forEach(link => {
  const textEl = link.querySelector('.tel-text');
  if (textEl) textEl.textContent = atob(link.dataset.tel);

  link.addEventListener('click', (e) => {
    e.preventDefault();
    const display = atob(link.dataset.tel);
    const dialable = display.replace(/\s+/g, '').replace(/^0/, '+49');
    window.location.href = 'tel:' + dialable;
  });
});

// Mobiles Ausklapp-Menü
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Sanftes Einblenden von Inhalten beim Scrollen
const revealTargets = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && revealTargets.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => revealObserver.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add('in-view'));
}
