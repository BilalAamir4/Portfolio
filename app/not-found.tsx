import type { Metadata } from "next";
import { LinkButton } from "@/components/LinkButton";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: profile.notFound.title,
};

/** Rendered inside the root layout, so the header and footer stay. */
export default function NotFound() {
  return (
    <section className="pt-[88px] pb-[88px]">
      <h1 className="intro m-0 max-w-[18ch] text-[clamp(40px,6.2vw,88px)] leading-[1.02] font-bold tracking-[-0.02em]">
        {profile.notFound.heading}
      </h1>
      <p
        className="intro mt-7 mb-0 max-w-[60ch] text-[20px] text-ink-soft"
        style={{ animationDelay: "100ms" }}
      >
        {profile.notFound.text}
      </p>
      <div className="intro mt-8" style={{ animationDelay: "200ms" }}>
        <LinkButton href="/">{profile.ui.backToAllWork}</LinkButton>
      </div>
    </section>
  );
}
