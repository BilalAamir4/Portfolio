"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { observe } from "@/lib/useInView";
import { cn } from "@/lib/format";
import type { NavItem } from "@/content/schema";

type Props = {
  name: string;
  nav: readonly NavItem[];
  backLabel: string;
};

/** Root margin from spec 7.2: the section crossing the middle of the viewport. */
const ACTIVE_BAND = { rootMargin: "-40% 0px -55% 0px", threshold: 0 };

export function SiteHeader({ name, nav, backLabel }: Props) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const barRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("");
  // The last section is too short to reach the middle of the viewport, so
  // it becomes active when the page is scrolled to the bottom.
  const [atBottom, setAtBottom] = useState(false);

  // Tell the bootstrap script in <head> that scripts are running, so it
  // keeps .rv-on (its failsafe removes the class if this never happens).
  useEffect(() => {
    (window as Window & { __rvReady?: boolean }).__rvReady = true;
  }, []);

  // Scroll progress: passive listener, one rAF per frame, style set directly.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const bar = barRef.current;
      if (!bar) return;
      const el = document.scrollingElement ?? document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, el.scrollTop / max)) : 0;
      bar.style.transform = `scaleX(${progress})`;
      setAtBottom(max > 0 && el.scrollTop >= max - 4);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  // Active section underline on the home page.
  useEffect(() => {
    if (!isHome) return;
    const stops = nav.flatMap(({ sectionId }) => {
      const section = document.getElementById(sectionId);
      if (!section) return [];
      return [
        observe(
          section,
          (visible) =>
            setActive((current) =>
              visible ? sectionId : current === sectionId ? "" : current,
            ),
          ACTIVE_BAND,
        ),
      ];
    });
    return () => {
      stops.forEach((stop) => stop());
      setActive("");
    };
  }, [isHome, nav]);

  const lastSection = nav[nav.length - 1]?.sectionId ?? "";
  const current = isHome && atBottom ? lastSection : active;

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-paper/92 backdrop-blur-[8px]">
      <div className="container-page flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-1.5">
        {isHome ? (
          <a href="#top" className="py-3 font-display text-[20px] font-bold no-underline">
            {name}
          </a>
        ) : (
          <Link href="/" className="py-3 font-display text-[20px] font-bold no-underline">
            {name}
          </Link>
        )}
        {isHome ? (
          <nav
            aria-label="Sections"
            className="flex flex-wrap gap-x-7 gap-y-1 font-medium max-[479px]:w-full max-[479px]:justify-between max-[479px]:gap-x-3"
          >
            {nav.map(({ label, sectionId }) => (
              <a
                key={sectionId}
                href={`#${sectionId}`}
                className={cn("navlink", current === sectionId && "on")}
                aria-current={current === sectionId ? "location" : undefined}
              >
                {label}
              </a>
            ))}
          </nav>
        ) : (
          <Link href="/" className="py-3 font-medium">
            {backLabel}
          </Link>
        )}
      </div>
      <div
        ref={barRef}
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-[3px] h-[3px] origin-left bg-ink"
        style={{ transform: "scaleX(0)" }}
      />
    </header>
  );
}
