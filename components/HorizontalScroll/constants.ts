// components/HorizontalScroll/constants.ts

/**
 * Configuration for the scroll animation
 */
export const SCROLL_CONFIG = {
  /** Duration of the scroll animation in seconds */
  DURATION: 1.2,
  /** Length of the scroll container in viewport widths */
  SCROLL_LENGTH: 3000,
  /** Stagger delay between animated elements in seconds */
  STAGGER_DELAY: 0.2,
  /** Initial Y offset for animated elements in pixels */
  ANIMATION_OFFSET: 50,
} as const;

/**
 * Animation configuration for smooth scrolling
 */
export const SCROLL_EASE = {
  duration: SCROLL_CONFIG.DURATION,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
} as const;
