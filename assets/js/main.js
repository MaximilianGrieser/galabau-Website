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
