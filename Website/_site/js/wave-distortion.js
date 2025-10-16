document.addEventListener('DOMContentLoaded', () => {
  const turbulence = document.getElementById('turbulence');
  if (!turbulence) {
    console.warn('Wave distortion: #turbulence element not found.');
    return;
  }

  let start = null;

  // Base frequencies around which we oscillate
  const baseFreqX = 0.015;
  const baseFreqY = 0.015;

  // Amplitude of oscillation for frequencies
  const amplitudeX = 0.007;
  const amplitudeY = 0.007;

  // Speed of oscillation in radians per second
  const speedX = 0.1;
  const speedY = 0.25;

  function animateWave(timestamp) {
    if (!start) start = timestamp;
    const elapsed = (timestamp - start) / 1000; // convert ms to seconds

    // Calculate oscillating frequencies with sine and cosine for smooth morph
    const freqX = baseFreqX + amplitudeX * Math.sin(elapsed * speedX);
    const freqY = baseFreqY + amplitudeY * Math.cos(elapsed * speedY);

    turbulence.setAttribute('baseFrequency', `${freqX.toFixed(5)} ${freqY.toFixed(5)}`);

    requestAnimationFrame(animateWave);
  }

  requestAnimationFrame(animateWave);
});
