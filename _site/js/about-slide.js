document.addEventListener('DOMContentLoaded', () => {
  const slidesData = window.slidesData || [];

  if (!slidesData.length) {
    console.warn("No slide data found. Check your inline script in about.md.");
    return;
  }

  const imageWrappers = Array.from(document.querySelectorAll('.image-wrapper'));
  const images = imageWrappers.map(wrapper => wrapper.querySelector('.slider-image'));
  const heading = document.getElementById('slider-heading');
  const paragraph = document.getElementById('slider-paragraph');
  const gradient1 = document.getElementById('gradient1');
  const gradient2 = document.getElementById('gradient2');
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');

  let currentIndex = 0;
  let isAnimating = false;
  let activeGradient = 1;

  function swapGradient(index) {
    const newGrad = slidesData[index].gradient || 'linear-gradient(to right, #000, transparent)';
    if (activeGradient === 1) {
      gradient2.style.background = newGrad;
      gradient2.style.opacity = 1;
      gradient1.style.opacity = 0;
      activeGradient = 2;
    } else {
      gradient1.style.background = newGrad;
      gradient1.style.opacity = 1;
      gradient2.style.opacity = 0;
      activeGradient = 1;
    }
  }

  function slideTo(index) {
    if (isAnimating || index === currentIndex) return;
    isAnimating = true;

    gsap.to([leftArrow, rightArrow], {
      opacity: 0,
      duration: 0.3,
      pointerEvents: "none"
    });

    const currentImage = images[currentIndex];
    const nextImage = images[index];

    if (!currentImage || !nextImage) {
      console.error("Missing image(s) for slide index:", currentIndex, index);
      return;
    }

    const currentGhost = currentImage.parentElement.querySelector('.ghost-image');
    const nextGhost = nextImage.parentElement.querySelector('.ghost-image');

    if (!currentGhost || !nextGhost) {
      console.error("Missing ghost image(s) for slide index:", currentIndex, index);
      return;
    }

    currentGhost.src = currentImage.src;
    nextGhost.src = nextImage.src;

    const tl = gsap.timeline({
      onComplete: () => {
        currentIndex = index;
        isAnimating = false;

        gsap.to([leftArrow, rightArrow], {
          opacity: 1,
          duration: 0.3,
          pointerEvents: "auto"
        });
      }
    });

    tl.set(currentImage, { zIndex: 1, pointerEvents: "none" }, 0);
    tl.set(nextImage, { zIndex: 2, pointerEvents: "auto" }, 0);
    tl.set(currentGhost, { opacity: 0.35, x: '-40%' }, 0);
    tl.set(nextGhost, { opacity: 0, x: '100%' }, 0);

    tl.to(currentImage, {
      x: '-100vw',
      duration: 0.5,
      ease: "power4.in"
    }, 0);

    tl.to(currentGhost, {
      opacity: 0,
      duration: 0.3,
      ease: "power3.out"
    }, 0);

    tl.to([heading, paragraph], {
      opacity: 0,
      y: 20,
      duration: 0.1,
      ease: "power2.out"
    }, 0);

    tl.add(() => {
      swapGradient(index);
    }, 0);

    tl.add(() => {
      heading.textContent = slidesData[index].heading || '';
      paragraph.innerHTML = marked.parse(slidesData[index]?.paragraph || '');
    }, 0.1);

    tl.fromTo(heading, {
      opacity: 0,
      y: 40
    }, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power3.out"
    }, 0.3);

    tl.fromTo(paragraph, {
      opacity: 0,
      y: 40
    }, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power3.out"
    }, 0.6);

    tl.fromTo(nextImage, {
      x: '-100vw'
    }, {
      x: 0,
      duration: 2.2,
      ease: "power3.out"
    }, -0.2);

    tl.fromTo(nextGhost, {
      x: '-200%'
    }, {
      x: '-40%',
      opacity: 0.35,
      duration: 2.2,
      ease: "power3.out"
    }, 0.2);

    tl.set(currentImage, {
      x: '-100vw',
      pointerEvents: "none",
      clearProps: "zIndex"
    }, 1.1);

    tl.set(currentGhost, {
      x: '-50%',
      clearProps: "zIndex"
    }, 1.1);
  }

  function goToNext() {
    slideTo((currentIndex + 1) % images.length);
  }

  function goToPrev() {
    slideTo((currentIndex - 1 + images.length) % images.length);
  }

  if (leftArrow) leftArrow.addEventListener('click', goToPrev);
  if (rightArrow) rightArrow.addEventListener('click', goToNext);

  gsap.set([leftArrow, rightArrow], {
    opacity: 0,
    pointerEvents: "none"
  });

  gradient1.style.background = slidesData[currentIndex]?.gradient || 'linear-gradient(to right, #000, transparent)';
  gradient1.style.opacity = 1;
  activeGradient = 1;

  const initImage = images[currentIndex];
  if (!initImage) {
    console.error("Initial image not found for index 0.");
    return;
  }

  const initGhost = initImage.parentElement.querySelector('.ghost-image');
  const initTl = gsap.timeline();

  initTl.fromTo(initImage, {
    x: '-100vw'
  }, {
    x: 0,
    duration: 2.2,
    ease: "power3.out"
  }, 0);

  initTl.fromTo(initGhost, {
    x: '-200%'
  }, {
    x: '-40%',
    opacity: 0.35,
    duration: 2.2,
    ease: "power3.out"
  }, 0.2);

  heading.textContent = slidesData[currentIndex]?.heading || '';
  paragraph.innerHTML = marked.parse(slidesData[currentIndex]?.paragraph || '');

  initTl.fromTo(heading, {
    opacity: 0,
    y: 40
  }, {
    opacity: 1,
    y: 0,
    duration: 1.5,
    ease: "power3.out"
  }, 0.5);

  initTl.fromTo(paragraph, {
    opacity: 0,
    y: 40
  }, {
    opacity: 1,
    y: 0,
    duration: 1.5,
    ease: "power3.out"
  }, 0.8);

  initTl.to([leftArrow, rightArrow], {
    opacity: 1,
    duration: 0.3,
    pointerEvents: "auto"
  }, '+=0.2');
});
