const REVEAL_SELECTOR = ".reveal-on-scroll";

/**
 * Hands `.reveal-on-scroll` elements inside `container` over to GSAP by
 * switching off the CSS failsafe. Returns false when the failsafe already
 * revealed them (slow script); they stay visible and must not animate,
 * otherwise they would disappear and fade in again.
 */
export function takeOverReveal(container: HTMLElement): boolean {
  const targets = container.matches(REVEAL_SELECTOR)
    ? [container]
    : Array.from(container.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));

  const failsafeFired = targets.some(
    (el) => getComputedStyle(el).visibility === "visible",
  );
  if (failsafeFired) {
    targets.forEach((el) => (el.style.visibility = "visible"));
  }

  container.dataset.reveal = "ready";
  return !failsafeFired;
}
