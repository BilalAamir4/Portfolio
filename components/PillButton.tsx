import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/format";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
  /**
   * Toggle state. When set, the button exposes aria-pressed and turns
   * highlight while pressed. Leave undefined for an action button.
   */
  pressed?: boolean;
  /** toggle: weight 500, highlight only when pressed. action: weight 600, always highlight. */
  variant?: "toggle" | "action";
};

/**
 * Rounded pill button from the mockups: 44px minimum height, 1.5px ink
 * border, lifts on hover and focus (.btn). No "use client": it is a plain
 * button, so client components can pass onClick and server components can
 * render it without one.
 */
export function PillButton({
  pressed,
  variant = "toggle",
  className,
  children,
  ...rest
}: Props) {
  const filled = variant === "action" || pressed === true;
  return (
    <button
      type="button"
      aria-pressed={pressed}
      className={cn(
        "btn min-h-11 rounded-full border-[1.5px] border-ink px-[18px] py-2.5 text-ink",
        variant === "action" ? "font-semibold" : "font-medium",
        filled ? "bg-highlight" : "bg-transparent",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
