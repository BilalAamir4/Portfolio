import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import { ResultsTable } from "@/components/case/ResultsTable";
import { AgentRunStrip } from "@/components/home/AgentRunStrip";
import { EarlierWorkList } from "@/components/home/EarlierWorkList";
import { LectureDemo } from "@/components/home/LectureDemo";
import { PlantedNotePanel } from "@/components/home/PlantedNotePanel";
import { RagVariantSwitcher } from "@/components/home/RagVariantSwitcher";
import { LinkButton } from "@/components/LinkButton";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { profile } from "@/content/profile";
import { agent } from "@/content/projects/agent";
import { agenticRag } from "@/content/projects/agentic-rag";
import { earlierProjects } from "@/content/projects/earlier";
import { insightex } from "@/content/projects/insightex";
import { plantedNote } from "@/content/projects/planted-note";
import { fill } from "@/lib/format";

export const metadata: Metadata = {
  title: { absolute: profile.meta.title },
  description: profile.meta.description,
  alternates: { canonical: "/" },
};

const { ui } = profile;

/* ---------- Small server-only building blocks ---------- */

function ProjectTitle({ name, status }: { name: string; status: string }) {
  return (
    <>
      <h3 className="m-0 text-[34px] leading-[1.1] font-bold">{name}</h3>
      <p className="mt-2 mb-0 text-muted">{status}</p>
    </>
  );
}

function Panel({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`rounded-[14px] border-[1.5px] border-ink bg-surface p-7 ${className}`} style={style}>
      {children}
    </div>
  );
}

function Links({ children, className = "mt-7" }: { children: ReactNode; className?: string }) {
  return <div className={`flex flex-wrap gap-x-6 gap-y-3 ${className}`}>{children}</div>;
}

const twoColumns = "grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))]";

/* ---------- Page ---------- */

export default function HomePage() {
  const certificates = profile.background.certificates.items.filter(
    (c): c is typeof c & { name: string; url: string } => c.name !== null && c.url !== null,
  );
  const { resume } = profile.contact;
  const rag = agenticRag;
  const ragResults = rag.results;
  const agentName = agent.name;
  const showAgent = agent.published && agentName !== null && agent.slug !== null;

  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-18">
        <h1 className="intro m-0 max-w-[15ch] text-[clamp(40px,6.2vw,88px)] leading-[1.02] font-bold tracking-[-0.02em]">
          {profile.hero.headline}
        </h1>
        <p
          className="intro mt-8 mb-0 max-w-[58ch] text-[20px] text-ink-soft"
          style={{ animationDelay: "150ms" }}
        >
          {profile.hero.lead}
        </p>

        <Panel className="intro mt-16" style={{ animationDelay: "350ms" }}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h2 className="m-0 text-[22px] font-semibold">{insightex.heroDemo.heading}</h2>
            <p className="m-0 text-[14px] text-muted">{insightex.heroDemo.caption}</p>
          </div>
          <LectureDemo demo={insightex.heroDemo} />
        </Panel>
      </section>

      {/* Selected work */}
      <section id="work" className="scroll-target py-18">
        <SectionHeading>{profile.work.heading}</SectionHeading>

        {insightex.published && (
          <Reveal as="article" className={`${twoColumns} gap-x-16 gap-y-10 border-b border-line py-14`}>
            <div>
              <ProjectTitle name={insightex.name} status={insightex.home.statusLine} />
              <p className="mt-5 mb-0 max-w-[52ch]">{insightex.home.summary}</p>
              <Links>
                <LinkButton href={`/work/${insightex.slug}`}>{ui.readCaseStudy}</LinkButton>
                <LinkButton href={insightex.repoUrl} variant="text" newTab>
                  {ui.viewRepository}
                </LinkButton>
              </Links>
            </div>
            <ul className="m-0 flex list-none flex-col gap-5 p-0">
              {insightex.home.highlights.map((h) => (
                <Reveal as="li" key={h.figure} className="border-l-[3px] border-ink pl-5">
                  <strong className="font-display text-[22px]">{h.figure}</strong>
                  <br />
                  {h.text}
                </Reveal>
              ))}
            </ul>
          </Reveal>
        )}

        {rag.published && (
          <Reveal as="article" className="border-b border-line py-14">
            <div className={`${twoColumns} gap-x-16 gap-y-8`}>
              <div>
                <ProjectTitle name={rag.name} status={rag.status} />
              </div>
              <div>
                <p className="m-0 max-w-[52ch]">{rag.home.summary}</p>
                <p className="mt-3 mb-0 max-w-[52ch] text-muted">
                  {ragResults ? rag.headline : rag.home.resultsPending}
                </p>
              </div>
            </div>

            <Panel className="mt-9">
              <RagVariantSwitcher switcher={rag.switcher} />
            </Panel>

            {ragResults && (
              <ResultsTable
                className="mt-7"
                columns={[
                  rag.resultsColumns.variant,
                  rag.resultsColumns.faithfulness,
                  rag.resultsColumns.answerRelevancy,
                  rag.resultsColumns.contextPrecision,
                  rag.resultsColumns.contextRecall,
                  rag.resultsColumns.medianLatency,
                ]}
                rows={ragResults.map((r) => ({
                  name: r.variant,
                  cells: [
                    r.faithfulness,
                    r.answerRelevancy,
                    r.contextPrecision,
                    r.contextRecall,
                  ]
                    .map((n) => n.toFixed(rag.resultsColumns.scoreDecimals))
                    .concat(fill(rag.resultsColumns.latencyTemplate, { n: r.medianLatencySeconds })),
                }))}
              />
            )}

            <Links>
              <LinkButton href={rag.liveDemoUrl} newTab>
                {ui.openLiveDemo}
              </LinkButton>
              <LinkButton href={rag.repoUrl} variant="text" newTab>
                {ui.viewRepository}
              </LinkButton>
            </Links>
          </Reveal>
        )}

        {plantedNote.published && (
          <Reveal as="article" className={`${twoColumns} gap-x-16 gap-y-6 py-14`}>
            <div>
              <ProjectTitle name={plantedNote.name} status={plantedNote.home.statusLine} />
            </div>
            <div>
              <p className="m-0 max-w-[52ch]">{plantedNote.home.summary}</p>
              <Links className="mt-6">
                <LinkButton href={`/work/${plantedNote.slug}`}>{ui.readCaseStudy}</LinkButton>
                <LinkButton href={plantedNote.repoUrl} variant="text" newTab>
                  {ui.viewRepository}
                </LinkButton>
              </Links>
            </div>
            <Panel className="col-span-full">
              <PlantedNotePanel home={plantedNote.home} />
            </Panel>
          </Reveal>
        )}

        {showAgent && (
          <Reveal as="article" className="border-t border-line py-14">
            <div className={`${twoColumns} gap-x-16 gap-y-6`}>
              <div>
                <ProjectTitle name={agentName} status={agent.home.statusLine} />
              </div>
              <div>
                <p className="m-0 max-w-[52ch]">
                  {agent.home.summary}
                  {agent.homeHeadline && ` ${agent.homeHeadline}`}
                </p>
              </div>
            </div>
            <Panel className="mt-9">
              <AgentRunStrip steps={agent.home.steps} buttonLabel={ui.runReview} />
            </Panel>
            <Links>
              <LinkButton href={`/work/${agent.slug}`}>{ui.readCaseStudy}</LinkButton>
              {agent.repoUrl && (
                <LinkButton href={agent.repoUrl} variant="text" newTab>
                  {ui.viewRepository}
                </LinkButton>
              )}
            </Links>
          </Reveal>
        )}
      </section>

      {/* Earlier work */}
      <section id="earlier" className="scroll-target py-18">
        <SectionHeading>{profile.earlier.heading}</SectionHeading>
        <p className="mt-6 mb-2 max-w-[60ch] text-ink-soft">{profile.earlier.intro}</p>
        <EarlierWorkList projects={earlierProjects} />
      </section>

      {/* Background */}
      <section id="background" className="scroll-target py-18">
        <SectionHeading>{profile.background.heading}</SectionHeading>
        <Reveal className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-x-16 gap-y-12">
          <div>
            <h3 className="mt-0 mb-3 text-[22px] font-semibold">{profile.background.education.heading}</h3>
            <p className="m-0">{profile.background.education.text}</p>
            <h3 className="mt-8 mb-3 text-[22px] font-semibold">{profile.background.experience.heading}</h3>
            <p className="m-0">{profile.background.experience.text}</p>
          </div>
          <div>
            {certificates.length > 0 && (
              <>
                <h3 className="mt-0 mb-3 text-[22px] font-semibold">
                  {profile.background.certificates.heading}
                </h3>
                <ul className="m-0 mb-8 flex list-none flex-col gap-1 p-0">
                  {certificates.map((c) => (
                    <li key={c.url}>
                      <a href={c.url} className="inline-block py-2.5">
                        {c.name}, {c.issuer}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <h3 className="mt-0 mb-3 text-[22px] font-semibold">{profile.background.skills.heading}</h3>
            <p className="m-0">{profile.background.skills.text}</p>
          </div>
        </Reveal>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-target pt-24 pb-18">
        <p className="mt-0 mb-4 text-[20px] text-ink-soft">{profile.contact.intro}</p>
        <Reveal>
          <a
            href={`mailto:${profile.contact.email}`}
            className="inline-block py-[7px] font-display text-[clamp(28px,5.4vw,76px)] leading-[1.1] font-bold tracking-[-0.02em] [overflow-wrap:anywhere] no-underline"
          >
            <span className="mark">{profile.contact.email}</span>
          </a>
        </Reveal>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 font-semibold">
          {profile.contact.links.map((link) => (
            <LinkButton
              key={link.href}
              href={link.href}
              variant="text"
              newTab={link.href.startsWith("https://github.com/")}
            >
              {link.label}
            </LinkButton>
          ))}
          {resume.label && resume.href && (
            <LinkButton href={resume.href} variant="text">
              {resume.label}
            </LinkButton>
          )}
        </div>
      </section>
    </>
  );
}
