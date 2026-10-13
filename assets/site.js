'use strict';
document.documentElement.classList.add('js');
const menu = document.querySelector('[data-menu]');
const nav = document.querySelector('#nav-links');
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu?.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav?.classList.contains('open')) {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.focus();
  }
});
document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(document.querySelector(button.dataset.copy).textContent);
    button.textContent = 'Copied';
    document.querySelector('#site-status').textContent = 'Citation copied.';
  } catch {
    document.querySelector('#site-status').textContent = 'Select the citation text to copy it.';
  }
}));
document.querySelectorAll('[data-video]').forEach(button => button.addEventListener('click', () => {
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(button.dataset.video)}?autoplay=1`;
  iframe.title = button.dataset.title;
  iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
  iframe.allowFullscreen = true;
  button.replaceWith(iframe);
}));
const datasetButtons = document.querySelectorAll('[data-dataset-filter]');
function filterBenchmark(dataset) {
  let visible = 0;
  document.querySelectorAll('#benchmark-body tr').forEach(row => {
    row.hidden = dataset !== row.dataset.dataset;
    if (!row.hidden) visible++;
  });
  datasetButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.datasetFilter === dataset)));
  document.querySelector('#benchmark-status').textContent = `${visible} ${visible === 1 ? 'comparison' : 'comparisons'} shown.`;
}
datasetButtons.forEach(button => button.addEventListener('click', () => filterBenchmark(button.dataset.datasetFilter)));
if (datasetButtons.length) filterBenchmark('Overall');
const figureDialog = document.querySelector('#figure-dialog');
let figureTrigger;
if (typeof figureDialog?.showModal === 'function') {
  document.querySelectorAll('[data-expand-figure]').forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    figureTrigger = link;
    const caption = link.querySelector('img').alt;
    document.querySelector('#dialog-image').src = link.href;
    document.querySelector('#dialog-image').alt = caption;
    document.querySelector('#figure-caption').textContent = caption;
    figureDialog.showModal();
    document.querySelector('#close-figure').focus();
  }));
  document.querySelector('#close-figure').addEventListener('click', () => figureDialog.close());
  figureDialog.addEventListener('click', event => {
    if (event.target !== figureDialog) return;
    const rect = figureDialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) figureDialog.close();
  });
  figureDialog.addEventListener('close', () => figureTrigger?.focus());
}

if (['localhost','127.0.0.1'].includes(location.hostname) &&
    ['Personal','MOISST','SOAC','3DGS-Calib','AVoptim'].includes(location.pathname.split('/')[1])) {
  document.querySelectorAll('[data-preview-path]').forEach(link => { link.href = link.dataset.previewPath; });
}

const comparisonVideo = document.querySelector('#comparison-video');
document.querySelectorAll('[data-comparison-video]').forEach(button => button.addEventListener('click', () => {
  comparisonVideo.querySelector('source').src = button.dataset.comparisonVideo;
  comparisonVideo.load();
  document.querySelectorAll('[data-comparison-video]').forEach(option => option.setAttribute('aria-pressed', String(option === button)));
  comparisonVideo.play().catch(() => {});
}));
document.querySelectorAll('.pose-comparison input').forEach(input => {
  const update = () => {
    input.parentElement.style.setProperty('--split', `${input.value}%`);
    input.parentElement.dataset.position = input.value < 10 ? 'start' : input.value > 90 ? 'end' : 'middle';
    input.setAttribute('aria-valuetext', `${input.value}% original, ${100 - input.value}% refined`);
  };
  input.addEventListener('input', update);
  update();
});

const siteSwitcher = document.querySelector('[data-site-switcher]');
document.addEventListener('click', event => {
  if (siteSwitcher?.open && !siteSwitcher.contains(event.target)) siteSwitcher.open = false;
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && siteSwitcher?.open) {
    siteSwitcher.open = false;
    siteSwitcher.querySelector('summary').focus();
  }
});
