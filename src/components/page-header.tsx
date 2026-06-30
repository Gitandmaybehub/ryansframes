import { cn } from "@/lib/utils";

/**
 * Consistent page masthead for the standalone routes (Portfolio / About /
 * Contact). Clears the fixed 76px header and sets the varsity tone.
 */
export function PageHeader({
  eyebrow,
  title,
  intro,
  className,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "site-px mx-auto max-w-[1800px] pb-12 pt-[calc(76px+3rem)] sm:pb-16 sm:pt-[calc(76px+4.5rem)]",
        className
      )}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="display-title mt-4 text-[3rem] leading-[1.05] sm:text-6xl lg:text-7xl">
        {title}
      </h1>
      <div aria-hidden className="mt-6 h-[3px] w-16 bg-accent" />
      {intro && (
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {intro}
        </p>
      )}
    </header>
  );
}
