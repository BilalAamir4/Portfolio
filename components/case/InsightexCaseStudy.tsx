import { LinkButton } from "@/components/LinkButton";
import { Reveal } from "@/components/Reveal";
import { profile } from "@/content/profile";
import { insightex } from "@/content/projects/insightex";
import { BackSection, BulletList, CaseHeading, CaseIntro, SplitSection, twoColumns } from "./CaseParts";
import { DecisionLedger } from "./DecisionLedger";
import { MemoryBars } from "./MemoryBars";
import { PipelineStepper, type Stage } from "./PipelineStepper";

export function InsightexCaseStudy() {
  const p = insightex;
  const cs = p.caseStudy;
  const introLine = p.roleLine ? `${cs.introLine} ${p.roleLine}` : cs.introLine;

  // Stage status comes from the facts; descriptions from the case study.
  const stages: Stage[] = p.stages.flatMap((s) => {
    const detail = cs.pipeline.details.find((d) => d.name === s.name);
    return detail ? [{ ...s, what: detail.what, tools: detail.tools }] : [];
  });

  return (
    <>
      <CaseIntro introLine={introLine} title={p.name} lead={cs.lead}>
        <LinkButton href={p.repoUrl} newTab>
          {profile.ui.viewRepository}
        </LinkButton>
      </CaseIntro>

      <SplitSection heading={cs.problem.heading} first gap="gap-x-16 gap-y-6">
        <div className="max-w-[62ch]">
          {cs.problem.paragraphs.map((text, i) => (
            <p key={i} className={i === 0 ? "m-0" : "mt-4 mb-0"}>
              {text}
            </p>
          ))}
        </div>
      </SplitSection>

      <section className="border-t border-line py-14">
        <CaseHeading>{cs.pipeline.heading}</CaseHeading>
        <p className="mt-3 mb-0 max-w-[62ch] text-ink-soft">{cs.pipeline.intro}</p>
        <PipelineStepper
          stages={stages}
          groupLabel={cs.pipeline.groupLabel}
          defaultStage={cs.pipeline.defaultStage}
        />
        <p className="mt-5 mb-0 max-w-[70ch] text-muted">{cs.pipeline.note}</p>
      </section>

      <section className={`${twoColumns(300)} gap-x-16 gap-y-8 border-t border-line py-14`}>
        <Reveal>
          <CaseHeading>{cs.memory.heading}</CaseHeading>
          {cs.memory.paragraphs.map((text, i) => (
            <p key={i} className="mt-4 mb-0 max-w-[52ch]">
              {text}
            </p>
          ))}
        </Reveal>
        <MemoryBars memory={cs.memory} />
      </section>

      <section className="border-t border-line py-14">
        <CaseHeading>{cs.decisions.heading}</CaseHeading>
        <p className="mt-3 mb-0 max-w-[64ch] text-ink-soft">{cs.decisions.intro}</p>
        <DecisionLedger
          rows={cs.decisions.rows.map((r) => ({ heading: r.question, body: r.found, kept: r.kept }))}
        />
      </section>

      <section className={`${twoColumns(300)} gap-x-16 gap-y-10 border-t border-line py-14`}>
        <Reveal>
          <CaseHeading>{cs.worksTodayHeading}</CaseHeading>
          <BulletList items={p.worksToday} className="mt-5 max-w-[52ch] gap-3" />
        </Reveal>
        <Reveal>
          <CaseHeading>{cs.stillHardHeading}</CaseHeading>
          <BulletList items={p.stillHard} className="mt-5 max-w-[52ch] gap-3" />
        </Reveal>
      </section>

      <BackSection label={profile.ui.backToAllWork} />
    </>
  );
}
