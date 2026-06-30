import type Lenis from "lenis";

/** Height of the fixed header, used to offset anchor scrolling. */
export const HEADER_OFFSET = 76;

let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}

export function getLenis() {
  return instance;
}

/** Smoothly scroll to an in-page anchor, accounting for the fixed header. */
export function scrollToHash(hash: string) {
  if (typeof document === "undefined") return;
  const el = document.querySelector(hash);
  if (!el) return;
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(el as HTMLElement, { offset: -HEADER_OFFSET, duration: 1.1 });
  } else {
    const top =
      (el as HTMLElement).getBoundingClientRect().top +
      window.scrollY -
      HEADER_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }
}
