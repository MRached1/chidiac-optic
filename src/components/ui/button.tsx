"use client";

import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg" | "icon";
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-primary-400 text-white hover:bg-primary-500 active:bg-primary-600":
              variant === "primary",
            "bg-foreground text-white hover:bg-gray-800":
              variant === "secondary",
            "border-2 border-foreground text-foreground hover:bg-foreground hover:text-white":
              variant === "outline",
            "text-foreground hover:bg-gray-100": variant === "ghost",
            "text-primary-500 underline-offset-4 hover:underline p-0 h-auto":
              variant === "link",
          },
          {
            "h-9 px-4 text-sm rounded": size === "sm",
            "h-11 px-6 text-sm tracking-wider uppercase rounded": size === "md",
            "h-13 px-8 text-base tracking-wider uppercase rounded": size === "lg",
            "h-10 w-10 rounded-full": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
export type { ButtonProps };
