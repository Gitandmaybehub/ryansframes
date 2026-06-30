"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";

import type { GalleryPhoto, Sport } from "@/lib/types";
import { sportsIn } from "@/data/gallery";
import { cn } from "@/lib/utils";

function srcUrl(p: GalleryPhoto) {
  return typeof p.src === "string" ? p.src : p.src.src;
}

export function Portfolio({ photos }: { photos: GalleryPhoto[] }) {
  const [active, setActive] = useState<Sport | "All">("All");
  const [index, setIndex] = useState(-1);
  const gridRef = useRef<HTMLDivElement>(null);

  const sports = useMemo(() => sportsIn(photos), [photos]);
  const filters = useMemo<(Sport | "All")[]>(
    () => ["All", ...sports],
    [sports]
  );
  const filtered = useMemo(
    () => (active === "All" ? photos : photos.filter((p) => p.sport === active)),
    [photos, active]
  );

  const slides = useMemo(
    () =>
      filtered.map((p) => ({
        src: srcUrl(p),
        width: p.width,
        height: p.height,
        alt: p.alt,
        title: p.sport,
        description: p.caption,
      })),
    [filtered]
  );

  // Scroll-reveal the grid items (re-runs when the filter changes).
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const items = gsap.utils.toArray<HTMLElement>(".gallery-item", grid);
    if (!items.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.set(items, { opacity: 0, y: 28 });
      ScrollTrigger.batch(items, {
        start: "top 94%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.07,
            overwrite: true,
          }),
      });
      ScrollTrigger.refresh();
    }, grid);

    return () => ctx.revert();
  }, [active, photos]);

  return (
    <div className="site-px mx-auto max-w-[1800px]">
      {/* Filters */}
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter photos by sport"
      >
        {filters.map((s) => {
          const isActive = active === s;
          return (
            <button
              key={s}
              onClick={() => setActive(s)}
              aria-pressed={isActive}
              className={cn(
                "inline-flex h-11 items-center rounded-full border px-5 font-condensed text-sm font-medium uppercase tracking-[0.1em] transition-colors duration-200 sm:h-10",
                isActive
                  ? "border-accent/50 bg-accent/10 text-accent-soft"
                  : "border-border text-muted hover:border-white/25 hover:text-foreground"
              )}
            >
              {s}
            </button>
          );
        })}
      </div>

      {/* Masonry grid */}
      <div
        key={active}
        ref={gridRef}
        className="mt-10 columns-1 gap-4 sm:columns-2 sm:gap-5 lg:columns-3 lg:gap-6"
      >
        {filtered.map((p, i) => (
          <figure
            key={p.id}
            className="gallery-item mb-4 break-inside-avoid sm:mb-5 lg:mb-6"
          >
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Open photo: ${p.alt}`}
              className="group relative block w-full cursor-pointer overflow-hidden rounded-xl border border-white/5 bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-soft"
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={p.width}
                height={p.height}
                placeholder={p.blurDataURL ? "blur" : "empty"}
                blurDataURL={p.blurDataURL}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                className="h-auto w-full select-none transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]"
                draggable={false}
              />

              {/* Caption — hover-reveal on pointer devices, always on touch */}
              <figcaption className="img-veil pointer-events-none absolute inset-x-0 bottom-0 flex items-end p-4 pt-16 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [@media(hover:none)]:opacity-100">
                <span className="translate-y-2 transition-transform duration-500 group-hover:translate-y-0 [@media(hover:none)]:translate-y-0">
                  <span className="block font-display text-base uppercase tracking-wide text-white">
                    {p.sport}
                  </span>
                  {p.caption && (
                    <span className="mt-0.5 block font-condensed text-xs uppercase tracking-[0.1em] text-white/70">
                      {p.caption}
                    </span>
                  )}
                </span>
              </figcaption>
            </button>
          </figure>
        ))}
      </div>

      <p className="mt-10 font-condensed text-sm uppercase tracking-[0.1em] text-faint">
        {filtered.length} {filtered.length === 1 ? "photograph" : "photographs"}
        {active !== "All" ? ` · ${active}` : ""} — tap any image to view full
        screen.
      </p>

      <Lightbox
        open={index >= 0}
        index={Math.max(index, 0)}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Zoom, Captions, Counter]}
        captions={{ descriptionTextAlign: "center" }}
        counter={{ container: { style: { top: "unset", bottom: 0 } } }}
        zoom={{ maxZoomPixelRatio: 3 }}
        carousel={{ finite: false }}
        controller={{ closeOnBackdropClick: true }}
        styles={{
          container: { backgroundColor: "rgba(9, 9, 11, 0.97)" },
        }}
        animation={{ fade: 300 }}
      />
    </div>
  );
}
