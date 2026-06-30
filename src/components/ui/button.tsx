import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-condensed font-semibold uppercase tracking-[0.08em] whitespace-nowrap transition-[background-color,border-color,color,transform] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent-soft disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] select-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-accent text-accent-foreground hover:bg-accent-deep shadow-[0_10px_30px_-12px_rgba(204,26,47,0.7)]",
        secondary:
          "bg-surface-2 text-foreground border border-border hover:bg-[#23232b] hover:border-[#3a3a44]",
        outline:
          "border border-border text-foreground hover:bg-white/[0.05] hover:border-white/25",
        ghost: "text-muted hover:text-foreground hover:bg-white/[0.06]",
        link: "text-foreground normal-case tracking-normal underline-offset-4 hover:underline px-0",
      },
      size: {
        sm: "h-9 px-4 text-[0.82rem]",
        default: "h-11 px-6 text-sm",
        lg: "h-[3.25rem] px-8 text-[0.95rem]",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
