"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
  type Ref,
} from "react";
import { observe } from "@/lib/useInView";
import { cn } from "@/lib/format";

/** Spec 7.2: once, when 5% visible, root margin 0px 0px -10% 0px. */
const REVEAL_OPTIONS = { rootMargin: "0px 0px -10% 0px", threshold: 0.05 };

type Tag = "div" | "section" | "article" | "li" | "ul" | "tr" | "figure" | "p";

type Props = HTMLAttributes<HTMLElement> & {
  /** Element to render. Defaults to div. */
  as?: Tag;
  /** rise: fade and lift in. draw: rule grows from the left. bar: bar fills from the left. */
  variant?: "rise" | "draw" | "bar";
  /** Delay in ms before the transition starts (rise and draw). */
  delay?: number;
  children?: ReactNode;
};

/**
 * Scroll reveal wrapper. Content is only hidden when <html> has .rv-on,
 * which the inline script in layout.tsx adds before first paint; without
 * it (no JS, reduced motion, no IntersectionObserver) nothing is hidden and
 * this component does nothing. Every Reveal on the page shares one observer.
 */
export function Reveal({
  as = "div",
  variant = "rise",
  delay,
  className,
  style,
  children,
  ...rest
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || element.hasAttribute("data-in")) return;
    if (!document.documentElement.classList.contains("rv-on")) return;

    const stop = observe(
      element,
      (visible) => {
        if (!visible) return;
        element.setAttribute("data-in", "");
        stop();
      },
      REVEAL_OPTIONS,
    );
    return stop;
  }, []);

  const Component = as as ElementType;
  const merged: CSSProperties | undefined =
    delay !== undefined ? ({ ...style, "--d": `${delay}ms` } as CSSProperties) : style;

  return (
    <Component
      ref={ref as Ref<HTMLElement>}
      className={cn(variant, className)}
      style={merged}
      {...rest}
    >
      {children}
    </Component>
  );
}
