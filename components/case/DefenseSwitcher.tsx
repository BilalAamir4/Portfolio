"use client";

import { useState } from "react";
import { PillButton } from "@/components/PillButton";
import { cn, fill } from "@/lib/format";

export type DefenseOption = {
  name: string;
  rawLeaks: number;
  finalLeaks: number;
  head: string;
  body: string;
};

type Props = {
  options: readonly DefenseOption[];
  trials: number;
  groupLabel: string;
  rawLabel: string;
  finalLabel: string;
  countTemplate: string;
};

/** Spec 7.5: 45ms stagger per dot, springy easing. */
function Dots({ leaks, trials }: { leaks: number; trials: number }) {
  return (
    <div aria-hidden="true" className="flex flex-wrap gap-2.5">
      {Array.from({ length: trials }, (_, i) => {
        const leaked = i < leaks;
        const d = `${i * 45}ms`;
        return (
          <div
            key={i}
            className={cn(
              "h-[34px] w-[34px] rounded-full border-2",
              leaked ? "border-alert bg-alert" : "border-moss bg-transparent",
            )}
            style={{
              transform: `scale(${leaked ? 1 : 0.72})`,
              transition: `background-color 350ms ${d}, border-color 350ms ${d}, transform 450ms cubic-bezier(.3,1.6,.5,1) ${d}`,
            }}
          />
        );
      })}
    </div>
  );
}

export function DefenseSwitcher({
  options,
  trials,
  groupLabel,
  rawLabel,
  finalLabel,
  countTemplate,
}: Props) {
  const [selected, setSelected] = useState(0);
  const option = options[selected];
  const count = (n: number) => fill(countTemplate, { n, total: trials });

  return (
    <>
      <div role="group" aria-label={groupLabel} className="mt-7 flex flex-wrap gap-2.5">
        {options.map((o, i) => (
          <PillButton key={o.name} pressed={i === selected} onClick={() => setSelected(i)}>
            {o.name}
          </PillButton>
        ))}
      </div>

      <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-x-14 gap-y-8 rounded-[14px] border-[1.5px] border-ink bg-surface p-7">
        <div>
          <p className="mt-0 mb-3 font-semibold">
            {rawLabel}: {count(option.rawLeaks)}
          </p>
          <Dots leaks={option.rawLeaks} trials={trials} />
          <p className="mt-7 mb-3 font-semibold">
            {finalLabel}: {count(option.finalLeaks)}
          </p>
          <Dots leaks={option.finalLeaks} trials={trials} />
        </div>
        <div aria-live="polite">
          <div key={option.name} className="swap">
            <h3 className="m-0 text-[24px] leading-[1.2] font-semibold">{option.head}</h3>
            <p className="mt-3 mb-0 max-w-[48ch]">{option.body}</p>
          </div>
        </div>
      </div>
    </>
  );
}
