import type { ReactNode } from "react";
import { LinkButton } from "@/components/LinkButton";
import { Reveal } from "@/components/Reveal";

/** Case study opening: intro line, h1, lead and links, with the 0/100/200/300ms entrance. */
export function CaseIntro({
  introLine,
  title,
  lead,
  children,
}: {
  introLine: string;
  title: string;
  lead: string;
  children?: ReactNode;
}) {
  return (
    <section className="pt-[88px] pb-16">
      <p className="intro mt-0 mb-4 text-muted">{introLine}</p>
      <h1
        className="intro m-0 text-[clamp(40px,6.2vw,88px)] leading-[1.02] font-bold tracking-[-0.02em]"
        style={{ animationDelay: "100ms" }}
      >
        {title}
      </h1>
      <p
        className="intro mt-7 mb-0 max-w-[60ch] text-[22px] leading-[1.45] text-ink-soft"
        style={{ animationDelay: "200ms" }}
      >
        {lead}
      </p>
      {children && (
        <div
          className="intro mt-7 flex flex-wrap gap-x-6 gap-y-3"
          style={{ animationDelay: "300ms" }}
        >
          {children}
        </div>
      )}
    </section>
  );
}

/** Case study h2: 34px, weight 700. */
export function CaseHeading({ children }: { children: ReactNode }) {
  return <h2 className="m-0 text-[34px] leading-[1.1] font-bold">{children}</h2>;
}

/** Two columns that collapse to one; `minimum` is the column width in px. */
export function twoColumns(minimum: 260 | 280 | 300) {
  return {
    260: "grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))]",
    280: "grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))]",
    300: "grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))]",
  }[minimum];
}

/** Section with the heading on the left and text on the right, rising in. */
export function SplitSection({
  heading,
  children,
  first = false,
  gap = "gap-x-16 gap-y-8",
}: {
  heading: string;
  children: ReactNode;
  first?: boolean;
  gap?: string;
}) {
  return (
    <Reveal
      as="section"
      className={`${twoColumns(300)} ${gap} py-14 ${first ? "border-t-2 border-ink" : "border-t border-line"}`}
    >
      <CaseHeading>{heading}</CaseHeading>
      {children}
    </Reveal>
  );
}

export function BulletList({ items, className = "" }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={`m-0 flex list-disc flex-col pl-5 ${className}`}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function BackSection({ label }: { label: string }) {
  return (
    <section className="border-t-2 border-ink pt-14 pb-[88px]">
      <LinkButton href="/">{label}</LinkButton>
    </section>
  );
}
