const body = document.body;

const taglines = [
  "alright its time",
  "i have no idea how to make a website but im trying",
  "i have been animating girls for months please help",
  "all of this for the price of 0$",
  "any donations will most likely go to the people who are helping me make this",
  "the biggest ddlc project since",
  "i will avenge you rap rabbit"
];

let currentIndex = 0;
let timeoutId = null;
const interval = 10000;
let startTime = null;
let remaining = interval;
let isPaused = false;
let taglineEl;

function getRandomIndex(excludeIndex) {
  let idx;
  do {
    idx = Math.floor(Math.random() * taglines.length);
  } while (idx === excludeIndex);
  return idx;
}

function showTagline(index, withFade = true) {
  if (withFade && taglineEl) {
    taglineEl.classList.add('fade-out');
    setTimeout(() => {
      taglineEl.textContent = taglines[index];
      taglineEl.classList.remove('fade-out');
    }, 800);
  } else if (taglineEl) {
    taglineEl.textContent = taglines[index];
    taglineEl.classList.remove('fade-out');
  }
  localStorage.setItem('taglineIndex', index);
}

function scheduleNext() {
  startTime = Date.now();
  timeoutId = setTimeout(() => {
    currentIndex = getRandomIndex(currentIndex);
    showTagline(currentIndex);
    remaining = interval;
    localStorage.setItem('taglineRemaining', remaining);
    scheduleNext();
  }, remaining);
}

function pauseAnimation() {
  if (isPaused) return;
  isPaused = true;
  clearTimeout(timeoutId);
  remaining -= Date.now() - startTime;
  localStorage.setItem('taglineRemaining', remaining);
}

function resumeAnimation() {
  if (!isPaused) return;
  isPaused = false;
  scheduleNext();
}

function toggleHeader() {
  body.classList.toggle('header-collapsed');

  const toggleTab = document.querySelector('.header-toggle-tab');
  const isCollapsed = body.classList.contains('header-collapsed');
  if (toggleTab) {
    toggleTab.textContent = isCollapsed ? '▼' : '▲';
    toggleTab.setAttribute('aria-pressed', isCollapsed.toString());
  }

  if (isCollapsed) {
    pauseAnimation();
  } else {
    resumeAnimation();
  }
}

function adjustMainContentOffset() {
  const header = document.querySelector('header');
  const toggle = document.querySelector('.header-toggle-tab');
  const main = document.querySelector('.main-content');

  if (header && toggle && main) {
    const headerHeight = header.offsetHeight;
    const toggleHeight = toggle.offsetHeight;
    const spacing = 8;
    main.style.marginTop = `${headerHeight + toggleHeight + spacing}px`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  taglineEl = document.querySelector('.tagline');

  const savedIndex = parseInt(localStorage.getItem('taglineIndex'), 10);
  const savedRemaining = parseInt(localStorage.getItem('taglineRemaining'), 10);

  if (!isNaN(savedIndex) && savedIndex >= 0 && savedIndex < taglines.length) {
    currentIndex = savedIndex;
  }

  if (!isNaN(savedRemaining) && savedRemaining > 0 && savedRemaining <= interval) {
    remaining = savedRemaining;
  } else {
    remaining = interval;
  }

  if (taglineEl) {
    showTagline(currentIndex, false);
    scheduleNext();
  }

  adjustMainContentOffset();
  window.addEventListener('resize', adjustMainContentOffset);
});
