import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/format";

type Props = {
  href: string;
  children: ReactNode;
  /** outline: pill with highlight sweep and lift. text: plain underlined link. */
  variant?: "outline" | "text";
  /**
   * Open in a new tab. Spec 9: only for links that leave to GitHub or a
   * demo. Never for mailto.
   */
  newTab?: boolean;
  className?: string;
};

/** Internal routes go through next/link; everything else is a plain anchor. */
export function LinkButton({ href, children, variant = "outline", newTab = false, className }: Props) {
  const classes = cn(
    "inline-block py-3 font-semibold",
    variant === "outline" &&
      "sweep btn rounded-full border-[1.5px] border-ink px-5 no-underline",
    className,
  );

  // next/link for page routes only; files such as /resume.pdf stay plain links.
  const isRoute = href.startsWith("/") && !/\.[a-z0-9]+$/i.test(href);
  if (isRoute && !newTab) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const opensTab = newTab && !href.startsWith("mailto:");
  return (
    <a
      href={href}
      className={classes}
      target={opensTab ? "_blank" : undefined}
      rel={opensTab ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}
