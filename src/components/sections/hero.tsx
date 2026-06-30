"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ArrowDown } from "lucide-react";
import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";
import heroImg from "@/assets/gallery/lacrosse-morristown.jpg";
import { SITE } from "@/lib/site";
import { scrollToHash } from "@/lib/lenis";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.9 },
      });
      // Explicit fromTo end-states keep the reveal deterministic (gsap.from
      // infers the end from current DOM state, which StrictMode can corrupt).
      tl.fromTo(
        ".hero-stagger",
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.1, duration: 1 }
      )
        .fromTo(
          ".hero-fade",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1 },
          "-=0.55"
        )
        // Transform-only on the LCP image: it stays painted (no opacity gate),
        // so `priority` actually wins the Largest Contentful Paint.
        .fromTo(
          ".hero-media",
          { scale: 1.06 },
          { scale: 1, duration: 1.2 },
          "-=0.95"
        )
        .fromTo(
          ".hero-cue",
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.3"
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={root} className="relative overflow-hidden pt-[76px]">
      <div className="site-px mx-auto grid min-h-[calc(100dvh-76px)] max-w-[1800px] grid-cols-1 items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-0">
        {/* Copy */}
        <div className="order-2 lg:order-1">
          <div className="hero-fade mb-7 inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/60 px-4 py-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            <span className="font-condensed text-xs font-medium uppercase tracking-[0.18em] text-muted">
              Available for bookings · {SITE.region}
            </span>
          </div>

          {/* The chrome gradient is applied to each ANIMATED leaf span
              (.text-chrome), NOT inherited from this h1's .display-title.
              GSAP promotes .hero-stagger to its own compositing layer
              (transform + opacity), and an ancestor's `background-clip: text`
              gradient does not paint into a child layer — leaving the text
              transparent/invisible. A self-contained gradient on the same
              element that animates renders reliably. (The faint line below
              overrides the fill with a solid color, so it never needed this.) */}
          <h1 className="display-title text-[3.4rem] leading-[1.08] sm:text-7xl lg:text-[6rem]">
            <span className="block overflow-hidden py-[0.08em]">
              <span className="hero-stagger text-chrome block">I capture</span>
            </span>
            <span className="block overflow-hidden py-[0.08em]">
              <span className="hero-stagger text-chrome block">
                the moment
                <span className="text-accent-soft [-webkit-text-fill-color:var(--color-accent-soft)]">
                  .
                </span>
              </span>
            </span>
            <span className="block overflow-hidden py-[0.08em]">
              <span className="hero-stagger block text-faint [-webkit-text-fill-color:var(--color-faint)]">
                Not just the photo.
              </span>
            </span>
          </h1>

          <p className="hero-fade mt-7 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            Freelance sports photography across New Jersey — 50+ events covered,
            from Friday-night lights to championship Saturdays. Based in{" "}
            {SITE.location}.
          </p>

          <div className="hero-fade mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/portfolio" className={cn(buttonVariants({ size: "lg" }))}>
              View portfolio
            </Link>
            <Link
              href="/contact"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              Book a shoot
            </Link>
          </div>

          <dl className="hero-fade mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-8">
            {SITE.stats.map((s) => (
              <div key={s.label}>
                <dt className="text-chrome font-display text-2xl uppercase leading-none tracking-wide sm:text-3xl">
                  {s.value}
                </dt>
                <dd className="mt-2 font-condensed text-xs uppercase tracking-[0.12em] text-faint">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Featured image */}
        <div className="order-1 lg:order-2">
          <div className="hero-media relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-white/10 lg:max-w-none">
            <Image
              src={heroImg}
              alt="Boys lacrosse players battle for a loose ball near the crease in golden evening light"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 92vw"
              placeholder="blur"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            {/* crimson corner accent */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 h-16 w-[3px] bg-accent"
            />
            <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-background/50 px-3 py-1.5 backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-accent" />
              <span className="font-condensed text-xs font-medium uppercase tracking-[0.12em] text-white/90">
                Boys Lacrosse · Morristown
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={() => scrollToHash("#featured")}
        aria-label="Scroll to featured photos"
        className="hero-cue absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-faint transition-colors hover:text-foreground lg:flex"
      >
        <span className="eyebrow !text-faint">Scroll</span>
        <ArrowDown className="size-4 animate-bounce" strokeWidth={1.6} />
      </button>
    </section>
  );
}
