import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, GraduationCap, Trophy, Camera } from "lucide-react";
import { InstagramIcon } from "@/components/icons";
import portrait from "@/assets/about/ryan-portrait.jpg";
import { SITE } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const details = [
  { icon: GraduationCap, text: "Whippany Park High School · Hanover, NJ" },
  { icon: Trophy, text: "Boys & girls sports across Morris County" },
  { icon: Camera, text: "Freelance — available for local shoots" },
];

export function About() {
  return (
    <section className="site-px mx-auto grid max-w-[1800px] grid-cols-1 items-center gap-12 pb-24 sm:pb-32 lg:grid-cols-2 lg:gap-20">
      {/* Portrait */}
      <Reveal className="order-2 lg:order-1">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-white/10 lg:max-w-lg">
          <Image
            src={portrait}
            alt="Ryan Heiart on the sideline holding his camera"
            fill
            sizes="(min-width: 1024px) 45vw, 92vw"
            placeholder="blur"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 h-16 w-[3px] bg-accent"
          />
          {/* Floating stat card */}
          <div className="absolute -bottom-px right-4 rounded-tl-2xl border-l border-t border-white/10 bg-background/85 px-5 py-4 backdrop-blur-md">
            <p className="text-chrome font-display text-3xl uppercase leading-none tracking-wide">
              50+
            </p>
            <p className="mt-1.5 font-condensed text-xs uppercase tracking-[0.12em] text-muted">
              events covered
            </p>
          </div>
        </div>
      </Reveal>

      {/* Copy */}
      <Reveal className="order-1 lg:order-2" delay={0.08}>
        <p className="font-condensed text-lg font-semibold uppercase tracking-[0.12em] text-accent-soft">
          Meet the photographer
        </p>

        <div className="mt-6 space-y-5 text-base leading-relaxed text-muted sm:text-lg">
          <p>
            Hey — I&apos;m Ryan Heiart, a high school sports photographer from
            Whippany Park. I&apos;ve covered over 50 sporting events for schools
            across Morris County, with the goal of not just capturing photos, but
            capturing the moments themselves.
          </p>
          <p>
            I&apos;ve developed a passion for covering the beauty, triumph, and
            raw emotion that comes with sports photography. Take a look through my
            portfolio, and be sure to follow along on Instagram at{" "}
            <a
              href={SITE.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline decoration-accent/60 underline-offset-4 transition-colors hover:decoration-accent"
            >
              @{SITE.instagram.handle}
            </a>
            .
          </p>
        </div>

        <ul className="mt-8 space-y-3">
          {details.map((d) => (
            <li key={d.text} className="flex items-center gap-3 text-sm">
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-accent-soft">
                <d.icon className="size-[1.05rem]" strokeWidth={1.6} />
              </span>
              <span className="text-muted">{d.text}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link href="/contact" className={cn(buttonVariants())}>
            Work with Ryan
          </Link>
          <a
            href={SITE.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            <InstagramIcon className="size-4" strokeWidth={1.6} />
            See more on Instagram
            <ArrowUpRight className="size-4 opacity-70" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
