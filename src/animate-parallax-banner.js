/**
 * @callback Calc
 * @param {number} percent Amout of image displayed.
 * @returns {number}
 */

/**
 * Create a parallax animation with custom transition.
 * @param {HTMLElement} container
 * @param {HTMLElement} image
 * @param {Calc} calc
 */
function animateParallaxBanner(container, image, calc) {
  let screen = window.innerHeight;
  let { top, height } = container.getBoundingClientRect();
  let percent = 100;

  const visible = top < screen;
  const fullVisible = top < (screen - height);

  if (visible && !fullVisible)
    percent = ~~((-top + screen) / height * 100);
  image.style.transform = `translateY(${calc(percent)}%)`;

  requestAnimationFrame(() => animateParallaxBanner(container, image, calc));
}

export default animateParallaxBanner;
