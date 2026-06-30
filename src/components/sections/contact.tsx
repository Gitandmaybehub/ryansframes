import { MessageSquareText, Phone, ArrowUpRight, MapPin } from "lucide-react";
import { InstagramIcon } from "@/components/icons";
import { SITE } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Reach out",
    body: "Text me the date, team, and event — or ask about shots from a game I've already covered.",
  },
  {
    title: "I shoot & edit",
    body: "I cover the game and hand-edit a gallery of the best moments in Lightroom.",
  },
  {
    title: "Get your photos",
    body: "You receive your high-resolution photos to download — simple payment by Venmo or Zelle.",
  },
];

export function Contact() {
  return (
    <section className="site-px mx-auto max-w-[1800px] pb-24 sm:pb-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface/40 p-8 sm:p-12 lg:p-16">
          {/* Crimson glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/15 blur-3xl"
          />

          <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            {/* How it works */}
            <div>
              <p className="font-condensed text-lg font-semibold uppercase tracking-[0.12em] text-accent-soft">
                How it works
              </p>

              <ol className="mt-8 space-y-6">
                {steps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 font-display text-base leading-none text-accent-soft">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-condensed text-lg font-semibold uppercase tracking-[0.06em] text-foreground">
                        {s.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {s.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Action card */}
            <div className="lg:pl-8">
              <div className="rounded-2xl border border-border bg-background/60 p-6 sm:p-8">
                <p className="font-condensed text-sm uppercase tracking-[0.14em] text-muted">
                  Get in touch
                </p>

                <div className="mt-5 flex flex-col gap-3">
                  <a
                    href={`sms:${SITE.phone.e164}`}
                    className={cn(buttonVariants({ size: "lg" }), "w-full")}
                  >
                    <MessageSquareText className="size-[1.15rem]" strokeWidth={1.8} />
                    Text me
                  </a>
                  <a
                    href={`tel:${SITE.phone.e164}`}
                    className={cn(
                      buttonVariants({ variant: "secondary", size: "lg" }),
                      "w-full"
                    )}
                  >
                    <Phone className="size-[1.05rem]" strokeWidth={1.8} />
                    Call {SITE.phone.display}
                  </a>
                  <a
                    href={SITE.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "w-full"
                    )}
                  >
                    <InstagramIcon className="size-[1.05rem]" strokeWidth={1.8} />
                    DM @{SITE.instagram.handle}
                    <ArrowUpRight className="size-4 opacity-70" />
                  </a>
                </div>

                <div className="mt-6 space-y-2 border-t border-border pt-5 text-sm text-muted">
                  <p className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-accent" />
                    Usually replies within a day
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="size-4 text-faint" strokeWidth={1.6} />
                    {SITE.location} · available across NJ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
