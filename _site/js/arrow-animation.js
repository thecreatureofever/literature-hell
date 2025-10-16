document.addEventListener("DOMContentLoaded", () => {
  function animateArrow(button, svgEl) {
    const polyline = svgEl.querySelector("polyline");
    let isHovered = false;
    let hoverProgress = 0;

    button.addEventListener("mouseenter", () => {
      isHovered = true;
    });

    button.addEventListener("mouseleave", () => {
      isHovered = false;
    });

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function step(timestamp) {
      const transitionSpeed = 0.05;

      if (isHovered && hoverProgress < 1) {
        hoverProgress = Math.min(1, hoverProgress + transitionSpeed);
      } else if (!isHovered && hoverProgress > 0) {
        hoverProgress = Math.max(0, hoverProgress - transitionSpeed);
      }

      const easedHover = easeOutCubic(hoverProgress);

      // Stroke fade
      const alpha = 0.4 + 0.6 * hoverProgress;
      polyline.setAttribute("stroke", `rgba(255, 255, 255, ${alpha.toFixed(2)})`);

      // Floating + rotation
      const translateY = 0.5 * Math.sin(timestamp / 500);
      const rotateOffset = 1 * Math.sin(timestamp / 300);
      const pulse = 1 + 0.05 * Math.sin(timestamp / 500);

      // Hover scale boost
      const hoverScaleBoost = 1 + 0.2 * easedHover;

      // Total scale calculation
      const scaleX = pulse * hoverScaleBoost;
      const scaleY = pulse * 8 * hoverScaleBoost;

      // Apply transform
      svgEl.style.transform = `
        translateY(${translateY}px)
        rotate(${rotateOffset}deg)
        scale(${scaleX}, ${scaleY})
      `;

      requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const leftButton = document.querySelector(".nav-arrow.left-arrow");
  const rightButton = document.querySelector(".nav-arrow.right-arrow");

  if (leftButton) {
    const svg = leftButton.querySelector(".arrow-svg");
    animateArrow(leftButton, svg);
  }

  if (rightButton) {
    const svg = rightButton.querySelector(".arrow-svg");
    animateArrow(rightButton, svg);
  }
});
