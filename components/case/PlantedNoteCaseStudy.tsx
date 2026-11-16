import { LinkButton } from "@/components/LinkButton";
import { Reveal } from "@/components/Reveal";
import { profile } from "@/content/profile";
import { plantedNote } from "@/content/projects/planted-note";
import { BackSection, BulletList, CaseHeading, CaseIntro, SplitSection, twoColumns } from "./CaseParts";
import { DecisionLedger } from "./DecisionLedger";
import { DefenseSwitcher, type DefenseOption } from "./DefenseSwitcher";

export function PlantedNoteCaseStudy() {
  const p = plantedNote;
  const cs = p.caseStudy;

  // Leak counts come from the facts; explanations from the case study.
  const options: DefenseOption[] = p.setups.flatMap((s) => {
    const outcome = cs.defenses.outcomes.find((o) => o.name === s.name);
    return outcome ? [{ ...s, head: outcome.head, body: outcome.body }] : [];
  });

  return (
    <>
      <CaseIntro introLine={cs.introLine} title={p.name} lead={cs.lead}>
        <LinkButton href={p.repoUrl} newTab>
          {profile.ui.viewRepository}
        </LinkButton>
      </CaseIntro>

      {/* The planted note's highlighter draws when this section is revealed. */}
      <Reveal
        as="section"
        className={`${twoColumns(300)} gap-x-16 gap-y-8 border-t-2 border-ink py-14`}
      >
        <div>
          <CaseHeading>{cs.attack.heading}</CaseHeading>
          {cs.attack.paragraphs.map((text, i) => (
            <p key={i} className="mt-4 mb-0 max-w-[50ch]">
              {text}
            </p>
          ))}
        </div>
        <figure className="m-0 rounded-[14px] border-[1.5px] border-ink bg-surface p-7">
          <figcaption className="mb-3.5 font-semibold">{cs.attack.figureCaption}</figcaption>
          <p className="m-0 text-[18px] leading-[1.75] [overflow-wrap:anywhere]">
            <span className="note">{cs.attack.plantedNote}</span>
          </p>
        </figure>
      </Reveal>

      <section className="border-t border-line py-14">
        <CaseHeading>{cs.defenses.heading}</CaseHeading>
        <p className="mt-3 mb-0 max-w-[64ch] text-ink-soft">{cs.defenses.intro}</p>
        <DefenseSwitcher
          options={options}
          trials={p.trialsPerSetup}
          groupLabel={cs.defenses.groupLabel}
          rawLabel={cs.defenses.rawLabel}
          finalLabel={cs.defenses.finalLabel}
          countTemplate={cs.defenses.countTemplate}
        />
      </section>

      <SplitSection heading={cs.numbers.heading}>
        <div className="max-w-[62ch]">
          {cs.numbers.paragraphs.map((text, i) => (
            <p key={i} className={i === 0 ? "m-0" : "mt-4 mb-0"}>
              {text}
            </p>
          ))}
        </div>
      </SplitSection>

      <SplitSection heading={cs.ownErrors.heading}>
        <BulletList items={cs.ownErrors.items} className="max-w-[60ch] gap-3.5" />
      </SplitSection>

      <section className="border-t border-line py-14">
        <CaseHeading>{cs.built.heading}</CaseHeading>
        <DecisionLedger
          minColumn={260}
          rows={cs.built.rows.map((r) => ({ heading: r.what, body: r.why }))}
        />
        <p className="mt-6 mb-0 max-w-[70ch] text-muted">{cs.built.stack}</p>
      </section>

      <SplitSection heading={cs.next.heading}>
        <BulletList items={cs.next.items} className="max-w-[60ch] gap-3.5" />
      </SplitSection>

      <BackSection label={profile.ui.backToAllWork} />
    </>
  );
}
