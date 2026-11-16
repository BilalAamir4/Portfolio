import { LinkButton } from "@/components/LinkButton";
import { Reveal } from "@/components/Reveal";
import { profile } from "@/content/profile";
import { agent } from "@/content/projects/agent";
import { fill } from "@/lib/format";
import { AgentRunDiagram } from "./AgentRunDiagram";
import { BackSection, CaseHeading, CaseIntro, SplitSection, twoColumns } from "./CaseParts";
import { DecisionLedger } from "./DecisionLedger";
import { ResultsTable } from "./ResultsTable";

/**
 * The page renders only when the project is published, and
 * scripts/check-content.mjs fails the build if a published project has a
 * null field. This turns a null that slipped through into a build error.
 */
function must<T>(value: T | null, field: string): T {
  if (value === null) throw new Error(`content/projects/agent.ts: ${field} is null`);
  return value;
}

export function AgentCaseStudy() {
  const p = agent;
  const cs = p.caseStudy;
  const f = cs.results.formats;
  const runs = must(p.runsPerConfig, "runsPerConfig");

  return (
    <>
      <CaseIntro introLine={cs.introLine} title={must(p.name, "name")} lead={cs.lead}>
        <LinkButton href={must(p.repoUrl, "repoUrl")} newTab>
          {profile.ui.viewRepository}
        </LinkButton>
        <LinkButton href={must(p.demoUrl, "demoUrl")} variant="text" newTab>
          {must(cs.demoLabel, "caseStudy.demoLabel")}
        </LinkButton>
      </CaseIntro>

      <SplitSection heading={cs.question.heading} first gap="gap-x-16 gap-y-6">
        <div className="max-w-[62ch]">
          <p className="m-0">{cs.question.paragraph}</p>
          <p className="mt-4 mb-0">
            {fill(cs.question.datasetTemplate, { n: must(p.datasetSize, "datasetSize") })}
          </p>
        </div>
      </SplitSection>

      <section className="border-t border-line py-14">
        <CaseHeading>{cs.run.heading}</CaseHeading>
        <AgentRunDiagram
          steps={cs.run.steps}
          specialists={cs.run.specialists}
          workers={cs.run.workers}
          buttonLabel={profile.ui.runReview}
        />
      </section>

      <section className="border-t border-line py-14">
        <CaseHeading>{cs.results.heading}</CaseHeading>
        <p className="mt-3 mb-0 max-w-[64ch] text-ink-soft">
          {must(p.resultsHeadline, "resultsHeadline")} {fill(cs.results.runsTemplate, { n: runs })}
        </p>
        <ResultsTable
          className="mt-7"
          columns={[
            cs.results.columns.version,
            cs.results.columns.recall,
            cs.results.columns.precision,
            cs.results.columns.falseAlarms,
            cs.results.columns.cost,
            cs.results.columns.time,
          ]}
          rows={p.results.map((r) => ({
            name: r.version,
            cells: [
              fill(f.recall, { n: must(r.recallPct, "results.recallPct") }),
              fill(f.precision, { n: must(r.precisionPct, "results.precisionPct") }),
              fill(f.falseAlarms, { n: must(r.falseAlarmsPerCleanPr, "results.falseAlarmsPerCleanPr") }),
              fill(f.cost, { n: must(r.costPerReviewUsd, "results.costPerReviewUsd") }),
              fill(f.time, { n: must(r.medianSeconds, "results.medianSeconds") }),
            ],
          }))}
        />
        <p className="mt-5 mb-0 max-w-[70ch] text-muted">{must(p.smallVsLargeLine, "smallVsLargeLine")}</p>
      </section>

      <section className={`${twoColumns(300)} gap-x-16 gap-y-10 border-t border-line py-14`}>
        <Reveal>
          <CaseHeading>{cs.caughtHeading}</CaseHeading>
          <p className="mt-4 mb-0 max-w-[52ch]">{must(p.caught.bug, "caught.bug")}</p>
          <p className="mt-4 mb-0 max-w-[52ch] border-l-4 border-moss bg-moss-tint px-[18px] py-3.5">
            {must(p.caught.comment, "caught.comment")}
          </p>
        </Reveal>
        <Reveal>
          <CaseHeading>{cs.missedHeading}</CaseHeading>
          <p className="mt-4 mb-0 max-w-[52ch]">{must(p.missed.bug, "missed.bug")}</p>
          <p className="mt-4 mb-0 max-w-[52ch]">{must(p.missed.why, "missed.why")}</p>
        </Reveal>
      </section>

      <section className="border-t border-line py-14">
        <CaseHeading>{cs.production.heading}</CaseHeading>
        <DecisionLedger
          minColumn={260}
          rows={cs.production.rows.map((r) => ({
            heading: r.what,
            body: [r.how, r.detail].filter((x): x is string => x !== null).join(" "),
          }))}
        />
        <p className="mt-6 mb-0 max-w-[70ch] text-muted">{must(p.stackLine, "stackLine")}</p>
      </section>

      <BackSection label={profile.ui.backToAllWork} />
    </>
  );
}
