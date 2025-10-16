window.addEventListener('DOMContentLoaded', () => {
  const animationDuration = 10000; // 10 seconds in ms
  const startTimeKey = 'bgAnimationStartTime';

  let startTime = localStorage.getItem(startTimeKey);
  if (!startTime) {
    startTime = Date.now();
    localStorage.setItem(startTimeKey, startTime);
  }

  const elapsed = (Date.now() - startTime) % animationDuration;
  document.body.style.setProperty('--animation-delay', `-${elapsed}ms`);
});
