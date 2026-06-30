import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { Portfolio } from "@/components/sections/portfolio-gallery";
import { getGalleryPhotos } from "@/lib/sanity";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Re-check Sanity for new photos at most once a minute (ISR).
export const revalidate = 60;

export default async function Home() {
  const photos = await getGalleryPhotos();

  return (
    <>
      <Hero />

      {/* A live view of the portfolio, right on the landing page. The hero's
          scroll cue targets this #featured anchor. */}
      <section id="featured" className="py-24 sm:py-32">
        <div className="site-px mx-auto mb-10 flex max-w-[1800px] flex-col gap-6 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Portfolio</p>
            <h2 className="display-title mt-4 text-[2.6rem] leading-[1.05] sm:text-6xl">
              Selected frames
            </h2>
          </div>
          <Link
            href="/portfolio"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Open full portfolio
            <ArrowUpRight className="size-4 opacity-70" />
          </Link>
        </div>
        <Portfolio photos={photos} />
      </section>

      {/* Funnel to the two key pages */}
      <section className="site-px mx-auto max-w-[1800px] pb-24 sm:pb-32">
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          <Link
            href="/about"
            className="group relative overflow-hidden rounded-2xl border border-border bg-surface/50 p-8 transition-colors hover:border-white/20 sm:p-10"
          >
            <p className="eyebrow">About</p>
            <h3 className="display-title mt-3 text-3xl sm:text-4xl">
              Meet the photographer
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              The story behind the lens — who Ryan is and how he shoots.
            </p>
            <ArrowUpRight className="absolute right-7 top-8 size-6 text-faint transition-colors group-hover:text-foreground" />
          </Link>

          <Link
            href="/contact"
            className="group relative overflow-hidden rounded-2xl border border-accent/40 bg-accent/[0.08] p-8 transition-colors hover:border-accent/70 sm:p-10"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl"
            />
            <p className="eyebrow">Contact</p>
            <h3 className="display-title mt-3 text-3xl sm:text-4xl">
              Book a shoot
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              Need a photographer for an upcoming game? Let&apos;s capture your
              moment.
            </p>
            <ArrowUpRight className="absolute right-7 top-8 size-6 text-accent-soft transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </section>
    </>
  );
}
