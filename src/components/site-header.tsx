"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { InstagramIcon } from "@/components/icons";
import { SITE } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${SITE.name} — home`}
      className="group flex items-center gap-2 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-soft"
    >
      <span
        aria-hidden
        className="block h-5 w-[3px] bg-accent transition-all duration-300 group-hover:h-6"
      />
      <span className="font-condensed text-[1.7rem] font-semibold tracking-wide leading-none text-foreground">
        Ryan Heiart
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Background appears once the page is scrolled a little.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="site-px mx-auto flex h-[76px] max-w-[1800px] items-center justify-between">
        <Wordmark />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {SITE.nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative px-4 py-2 font-condensed text-[0.95rem] font-medium uppercase tracking-[0.12em] transition-colors duration-200",
                  active ? "text-foreground" : "text-muted hover:text-foreground"
                )}
              >
                {item.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-4 -bottom-0.5 h-[2px] origin-left bg-accent transition-transform duration-300",
                    active ? "scale-x-100" : "scale-x-0"
                  )}
                />
              </Link>
            );
          })}

          <a
            href={SITE.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram — @${SITE.instagram.handle}`}
            className="ml-1 inline-flex size-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/[0.06] hover:text-foreground"
          >
            <InstagramIcon className="size-[1.15rem]" strokeWidth={1.6} />
          </a>

          <Link
            href="/contact"
            className={cn(buttonVariants({ size: "sm" }), "ml-2")}
          >
            Book a shoot
          </Link>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 md:hidden">
          <a
            href={SITE.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram — @${SITE.instagram.handle}`}
            className="inline-flex size-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/[0.06] hover:text-foreground"
          >
            <InstagramIcon className="size-5" strokeWidth={1.6} />
          </a>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger
              aria-label="Open menu"
              className="inline-flex size-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-white/[0.06]"
            >
              <Menu className="size-6" strokeWidth={1.6} />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="menu-overlay fixed inset-0 z-[70] bg-background/50 backdrop-blur-sm" />
              <Dialog.Content
                className="menu-panel fixed inset-0 z-[80] flex flex-col bg-background"
                aria-label="Site menu"
              >
                <Dialog.Title className="sr-only">Menu</Dialog.Title>
                <div className="site-px flex h-[76px] items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span aria-hidden className="block h-5 w-[3px] bg-accent" />
                    <span className="font-condensed text-[1.7rem] font-semibold tracking-wide leading-none">
                      Ryan Heiart
                    </span>
                  </span>
                  <Dialog.Close
                    aria-label="Close menu"
                    className="inline-flex size-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-white/[0.06]"
                  >
                    <X className="size-6" strokeWidth={1.6} />
                  </Dialog.Close>
                </div>

                <nav
                  className="site-px flex flex-1 flex-col justify-center gap-3"
                  aria-label="Primary"
                >
                  {SITE.nav.map((item, i) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="text-chrome font-display text-[2.9rem] uppercase leading-none tracking-[0.01em] transition-colors"
                    >
                      <span className="eyebrow mr-4 align-middle">
                        0{i + 1}
                      </span>
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <div className="site-px flex flex-col gap-4 pb-[max(2rem,env(safe-area-inset-bottom))]">
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className={cn(buttonVariants({ size: "lg" }), "w-full")}
                  >
                    Book a shoot
                  </Link>
                  <a
                    href={SITE.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                  >
                    <InstagramIcon className="size-4" strokeWidth={1.6} />
                    @{SITE.instagram.handle}
                  </a>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
