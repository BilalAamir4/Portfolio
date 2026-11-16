import { Reveal } from "@/components/Reveal";
import type { InsightexProject } from "@/content/schema";
import { cn, fill } from "@/lib/format";

type Memory = InsightexProject["caseStudy"]["memory"];

/**
 * Peak graphics memory per stage against the card's limit. A picture for
 * sighted users: the wrapper is role="img" with the mockup's label. Bars
 * fill from the left when revealed (spec 7.2: 1300ms, 150ms delay).
 */
export function MemoryBars({ memory }: { memory: Memory }) {
  return (
    <div>
      <div role="img" aria-label={memory.ariaLabel} className="flex flex-col gap-[22px]">
        {memory.bars.map((bar) => (
          <div key={bar.label}>
            <div className="flex justify-between gap-4 font-medium">
              <span>{bar.label}</span>
              <span className="tabular-nums">{fill(memory.valueTemplate, { n: bar.gb })}</span>
            </div>
            <div className="mt-1.5 h-[22px] rounded bg-track">
              <Reveal
                variant="bar"
                className={cn("h-full rounded", bar.tone === "ink" ? "bg-ink" : "bg-moss")}
                style={{ width: `${Math.min(100, (bar.gb / memory.cardGb) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3.5 mb-0 text-[14px] text-muted">{memory.caption}</p>
    </div>
  );
}
