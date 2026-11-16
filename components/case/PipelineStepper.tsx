"use client";

import { Fragment, useState } from "react";
import type { StageStatus } from "@/content/schema";
import { cn } from "@/lib/format";

export type Stage = {
  name: string;
  status: StageStatus;
  what: string;
  tools: string;
};

type Props = {
  stages: readonly Stage[];
  groupLabel: string;
  defaultStage: string;
};

const statusTone: Record<StageStatus, string> = {
  Built: "text-moss",
  "In progress": "text-ink",
  Planned: "text-muted",
};

/**
 * Spec 7.5: seven stage buttons joined by lines. Built stages are solid,
 * others dashed. The selected stage is highlight, lifted 4px with a hard
 * shadow. The detail panel remounts (key) so its slide-in replays.
 */
export function PipelineStepper({ stages, groupLabel, defaultStage }: Props) {
  const [selected, setSelected] = useState(() =>
    Math.max(0, stages.findIndex((s) => s.name === defaultStage)),
  );
  const stage = stages[selected];

  return (
    <>
      <div
        role="group"
        aria-label={groupLabel}
        className="mt-8 flex flex-wrap items-center gap-2.5 xl:flex-nowrap xl:gap-0"
      >
        {stages.map((s, i) => {
          const on = i === selected;
          const built = s.status === "Built";
          return (
            <Fragment key={s.name}>
              {i > 0 && (
                <div
                  aria-hidden="true"
                  className="hidden h-0.5 max-w-5 min-w-2 flex-1 bg-ink xl:block"
                  style={{ opacity: built ? 1 : 0.3 }}
                />
              )}
              <button
                type="button"
                aria-pressed={on}
                onClick={() => setSelected(i)}
                className={cn(
                  "min-h-11 shrink-0 rounded-[10px] border-[1.5px] border-ink px-4 py-2.5 font-semibold whitespace-nowrap text-ink",
                  built ? "border-solid" : "border-dashed",
                  on ? "bg-highlight" : "bg-transparent",
                )}
                style={{
                  transform: `translateY(${on ? -4 : 0}px)`,
                  boxShadow: on ? "0 4px 0 var(--color-ink)" : "0 0 0 var(--color-ink)",
                  transition: "background-color 250ms, transform 250ms, box-shadow 250ms",
                }}
              >
                {s.name}
              </button>
            </Fragment>
          );
        })}
      </div>

      <div aria-live="polite">
        <div
          key={stage.name}
          className="swap mt-7 grid min-h-[150px] grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-x-12 gap-y-4 rounded-[14px] border-[1.5px] border-ink bg-surface p-7"
        >
          <div>
            <h3 className="m-0 text-[26px] leading-[1.3] font-semibold">{stage.name}</h3>
            <p className={cn("mt-2 mb-0 font-semibold", statusTone[stage.status])}>{stage.status}</p>
          </div>
          <div>
            <p className="m-0 max-w-[56ch]">{stage.what}</p>
            <p className="mt-3 mb-0 max-w-[56ch] text-muted">{stage.tools}</p>
          </div>
        </div>
      </div>
    </>
  );
}
