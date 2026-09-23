// Kontaktdaten werden erst zur Laufzeit entschlüsselt, um sie vor
// automatisiertem Scraping aus dem statischen HTML zu schützen.
document.querySelectorAll('.email-link').forEach(link => {
  const email = atob(link.dataset.email);
  let href = 'mailto:' + email;
  if (link.dataset.subject) {
    href += '?subject=' + encodeURIComponent(link.dataset.subject);
  }
  link.href = href;
  const textEl = link.querySelector('.email-text');
  if (textEl) textEl.textContent = email;
});

document.querySelectorAll('.tel-link').forEach(link => {
  const display = atob(link.dataset.tel);
  const dialable = display.replace(/\s+/g, '').replace(/^0/, '+49');
  link.href = 'tel:' + dialable;
  const textEl = link.querySelector('.tel-text');
  if (textEl) textEl.textContent = display;
});
