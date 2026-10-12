'use strict';

// All portfolio content remains available when JavaScript is disabled.
const imageDialog = document.querySelector('#image-dialog');
const dialogImage = document.querySelector('#dialog-image');
const dialogCaption = document.querySelector('#dialog-caption');
if (imageDialog && typeof imageDialog.showModal === 'function') {
  document.querySelectorAll('[data-lightbox]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      dialogImage.src = link.href;
      dialogImage.alt = link.querySelector('img').alt;
      dialogCaption.textContent = link.dataset.caption;
      imageDialog.showModal();
    });
  });
  imageDialog.querySelector('.dialog-close').addEventListener('click', () => imageDialog.close());
  imageDialog.addEventListener('click', event => {
    if (event.target !== imageDialog) return;
    const box = imageDialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) imageDialog.close();
  });
}

// Highlight the last section whose heading has crossed the navigation line.
const navLinks = [...document.querySelectorAll('nav a')];
const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
let scrollScheduled = false;
function updateCurrentSection() {
  const threshold = document.querySelector('.site-header').getBoundingClientRect().height + 45;
  let currentId = '';
  sections.forEach(section => { if (section.getBoundingClientRect().top <= threshold) currentId = section.id; });
  navLinks.forEach(link => {
    if (link.getAttribute('href') === '#' + currentId) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scrollScheduled = false;
}
window.addEventListener('scroll', () => {
  if (!scrollScheduled) { scrollScheduled = true; requestAnimationFrame(updateCurrentSection); }
}, { passive: true });
window.addEventListener('resize', updateCurrentSection);
window.addEventListener('load', updateCurrentSection);
updateCurrentSection();
