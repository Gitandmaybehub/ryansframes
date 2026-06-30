import Link from "next/link";
import { Phone, MessageSquareText, ArrowUpRight } from "lucide-react";
import { InstagramIcon } from "@/components/icons";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-background/60">
      <div className="site-px mx-auto max-w-[1800px] py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span aria-hidden className="block h-6 w-[3px] bg-accent" />
              <span className="font-condensed text-[1.9rem] font-semibold tracking-wide leading-none">
                Ryan Heiart
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {SITE.role} based in {SITE.location}. Covering the beauty,
              triumph, and raw emotion of {SITE.region} athletics.
            </p>
          </div>

          {/* Explore */}
          <nav aria-label="Footer">
            <p className="eyebrow mb-5">Explore</p>
            <ul className="space-y-3">
              {SITE.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <div>
            <p className="eyebrow mb-5">Connect</p>
            <ul className="space-y-3">
              <li>
                <a
                  href={SITE.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                >
                  <InstagramIcon className="size-4" strokeWidth={1.6} />
                  @{SITE.instagram.handle}
                  <ArrowUpRight className="size-3.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phone.e164}`}
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                >
                  <Phone className="size-4" strokeWidth={1.6} />
                  Call {SITE.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={`sms:${SITE.phone.e164}`}
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                >
                  <MessageSquareText className="size-4" strokeWidth={1.6} />
                  Text me
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-border pt-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Ryan Heiart. All rights reserved.</p>
          <p>Sports photography · {SITE.region}</p>
        </div>
      </div>
    </footer>
  );
}
