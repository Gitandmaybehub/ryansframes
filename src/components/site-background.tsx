import { BGPattern } from "@/components/ui/bg-pattern";

/**
 * Site-wide animated background. Fixed behind all content (-z-10):
 *  - a slow-panning crimson grid (the "texture" the photos sit on)
 *  - two soft crimson glows for stadium-light depth
 *  - a faint top vignette so the fixed header reads cleanly
 *
 * The pan animation is pure CSS and is disabled automatically under
 * `prefers-reduced-motion` (see globals.css).
 */
export function SiteBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {/* Panning crimson grid */}
      <BGPattern
        variant="grid"
        mask="fade-edges"
        size={40}
        fill="rgba(204,26,47,0.13)"
        className="rh-bg-pan z-0 opacity-90"
      />

      {/* Stadium-light glows */}
      <div className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]" />
      <div className="absolute -bottom-48 -right-24 h-[34rem] w-[34rem] rounded-full bg-accent-deep/10 blur-[150px]" />

      {/* Keep the very top calm under the fixed header */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
    </div>
  );
}
