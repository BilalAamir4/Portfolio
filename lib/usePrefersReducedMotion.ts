const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * True when the visitor asked the system for reduced motion. Read when a
 * timed sequence starts (spec 7.1), so it needs no subscription.
 */
export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia(QUERY).matches;
}
