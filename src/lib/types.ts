import type { StaticImageData } from "next/image";

export type Sport =
  | "Basketball"
  | "Baseball"
  | "Lacrosse"
  | "Soccer"
  | "Softball"
  | "Football"
  | "Hockey"
  | "Wrestling"
  | "Track"
  | "Other";

export interface GalleryPhoto {
  id: string;
  /** Local static import (auto-optimized) or a remote URL (from Sanity). */
  src: StaticImageData | string;
  alt: string;
  /** Short context line shown on hover / in the lightbox, e.g. "Whippany Park". */
  caption?: string;
  sport: Sport;
  width: number;
  height: number;
  /** Low-quality blur placeholder. Present for local imports and Sanity (lqip). */
  blurDataURL?: string;
  featured?: boolean;
}
