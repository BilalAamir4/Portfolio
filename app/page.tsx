// TEMPORARY foundation test page. Replaced by the real home page in prompt 2
// (delete app/_temp/ at the same time).

import { LinkButton } from "@/components/LinkButton";
import { PillButton } from "@/components/PillButton";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { profile } from "@/content/profile";
import { PillDemo } from "./_temp/PillDemo";

/** Literal class names so Tailwind generates every token's utility. */
const swatches = [
  { token: "paper", className: "bg-paper" },
  { token: "surface", className: "bg-surface" },
  { token: "ink", className: "bg-ink" },
  { token: "ink-soft", className: "bg-ink-soft" },
  { token: "muted", className: "bg-muted" },
  { token: "line", className: "bg-line" },
  { token: "track", className: "bg-track" },
  { token: "idle", className: "bg-idle" },
  { token: "moss", className: "bg-moss" },
  { token: "moss-tint", className: "bg-moss-tint" },
  { token: "highlight", className: "bg-highlight" },
  { token: "alert", className: "bg-alert" },
  { token: "alert-tint", className: "bg-alert-tint" },
];

const blocks = [
  { id: "work", title: "Reveal block one" },
  { id: "earlier", title: "Reveal block two" },
  { id: "background", title: "Reveal block three" },
];

export default function FoundationTestPage() {
  return (
    <>
      <section className="pt-24 pb-18">
        <h1
          className="intro m-0 max-w-[15ch] text-[clamp(40px,6.2vw,88px)] leading-[1.02] font-bold tracking-[-0.02em]"
        >
          {profile.hero.headline}
        </h1>
        <p
          className="intro mt-8 mb-0 max-w-[58ch] text-xl text-ink-soft"
          style={{ animationDelay: "150ms" }}
        >
          {profile.hero.lead}
        </p>

        <div
          className="intro mt-16 rounded-[14px] border-[1.5px] border-ink bg-surface p-7"
          style={{ animationDelay: "350ms" }}
        >
          <h2 className="m-0 text-[22px] font-semibold">Buttons</h2>
          <div className="mt-5 flex flex-col gap-6">
            <PillDemo
              options={["Toggle pill one", "Toggle pill two", "Toggle pill three"]}
              groupLabel="Sample toggle pills"
              actionLabel={profile.ui.runReview}
            />
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              <LinkButton href="#work">{profile.ui.readCaseStudy}</LinkButton>
              <LinkButton href="https://github.com/BilalAamir4" variant="text" newTab>
                {profile.ui.viewRepository}
              </LinkButton>
              <PillButton pressed>Server-rendered pressed pill</PillButton>
            </div>
          </div>
        </div>
      </section>

      <section className="py-18" aria-labelledby="tokens-heading">
        <h2 id="tokens-heading" className="m-0 text-[34px] leading-[1.1] font-bold">
          Colour tokens
        </h2>
        <ul className="m-0 mt-7 grid list-none grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 p-0">
          {swatches.map(({ token, className }) => (
            <li key={token} className="rounded-[10px] border-[1.5px] border-ink bg-surface p-2">
              <div className={`h-16 rounded-md border border-line ${className}`} />
              <p className="m-0 mt-2 text-sm font-semibold tabular-nums">{token}</p>
            </li>
          ))}
        </ul>
      </section>

      {blocks.map(({ id, title }, i) => (
        <section key={id} id={id} className="scroll-target min-h-[90vh] py-18">
          <SectionHeading>{title}</SectionHeading>
          <Reveal className="mt-10 rounded-[14px] border-[1.5px] border-ink bg-surface p-7">
            <h3 className="m-0 text-[26px] font-semibold">Rises in once</h3>
            <p className="m-0 mt-3 max-w-[52ch] text-ink-soft">
              Block {i + 1} of 3. It should fade and lift into place the first time it is 5% visible,
              and stay put after that.
            </p>
          </Reveal>
          <ul className="m-0 mt-6 list-none p-0">
            {[0, 1, 2].map((row) => (
              <Reveal
                as="li"
                key={row}
                delay={row * 70}
                className="border-b border-line py-4"
              >
                Staggered row {row + 1}, delay {row * 70} ms
              </Reveal>
            ))}
          </ul>
        </section>
      ))}

      <section id="contact" className="scroll-target pt-24 pb-18">
        <p className="m-0 mb-4 text-xl text-ink-soft">{profile.contact.intro}</p>
        <a
          href={`mailto:${profile.contact.email}`}
          className="inline-block font-display text-[clamp(28px,5.4vw,76px)] leading-[1.1] font-bold tracking-[-0.02em] [overflow-wrap:anywhere] no-underline"
        >
          <span className="mark">{profile.contact.email}</span>
        </a>
      </section>
    </>
  );
}
