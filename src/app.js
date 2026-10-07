import { getAnswer } from './oracle.js';
import { locales } from './locales.js';

const DRAW_DELAY = 900;
const button = document.querySelector('#ask');
const result = document.querySelector('#result');
const orb = document.querySelector('#orb');
const hint = document.querySelector('#hint');
const oracle = document.querySelector('.oracle');
const languageButtons = document.querySelectorAll('[data-language]');

let language = 'en';
let outcome = null;
let loadingLabel;

function updateFortuneText() {
  const text = locales[language];

  if (button.disabled) {
    button.textContent = text.loading;
    loadingLabel.textContent = text.loadingLabel;
    hint.textContent = text.loadingHint;
    return;
  }

  button.textContent = outcome ? text.again : text.ask;
  hint.textContent = outcome ? text[outcome].message : text.hint;

  if (outcome) {
    result.textContent = text[outcome].title;
  } else {
    result.querySelector('.waiting').textContent = text.waiting;
  }
}

function setLanguage(nextLanguage) {
  language = nextLanguage;
  const text = locales[language];

  document.documentElement.lang = language;
  document.documentElement.dir = text.direction;
  document.title = text.title;
  oracle.setAttribute('aria-label', text.oracleLabel);
  document.querySelector('.steps').setAttribute('aria-label', text.stepsLabel);

  document.querySelectorAll('[data-copy]').forEach(element => {
    element.textContent = text[element.dataset.copy];
  });

  languageButtons.forEach(element => {
    element.setAttribute('aria-pressed', String(element.dataset.language === language));
  });

  const numberFormat = new Intl.NumberFormat(language, { minimumIntegerDigits: 2 });
  document.querySelectorAll('.steps b').forEach((element, index) => {
    element.textContent = numberFormat.format(index + 1);
  });

  updateFortuneText();
}

function showLoading() {
  const loading = document.createElement('span');
  loading.className = 'fortune-loading';

  loadingLabel = document.createElement('span');
  loadingLabel.className = 'loading-label';

  const dots = document.createElement('span');
  dots.className = 'loading-dots';
  dots.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < 3; i++) {
    dots.append(document.createElement('i'));
  }

  loading.append(dots, loadingLabel);
  result.replaceChildren(loading);
  result.setAttribute('aria-busy', 'true');
  oracle.classList.add('is-loading');
  orb.className = 'orb thinking';
  updateFortuneText();
}

function drawFortune() {
  if (button.disabled) return;

  button.disabled = true;
  showLoading();

  window.setTimeout(() => {
    outcome = getAnswer();
    orb.className = `orb ${outcome} revealed`;
    result.removeAttribute('aria-busy');
    oracle.classList.remove('is-loading');
    button.disabled = false;
    updateFortuneText();
  }, DRAW_DELAY);
}

button.addEventListener('click', drawFortune);
languageButtons.forEach(element => {
  element.addEventListener('click', () => setLanguage(element.dataset.language));
});

setLanguage(language);
