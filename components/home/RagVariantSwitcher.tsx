"use client";

import { Fragment, useState } from "react";
import { PillButton } from "@/components/PillButton";
import type { AgenticRagProject } from "@/content/schema";
import { cn } from "@/lib/format";

type Switcher = AgenticRagProject["switcher"];

/** Spec 7.5: 400ms transitions, 60ms stagger by node index. */
export function RagVariantSwitcher({ switcher }: { switcher: Switcher }) {
  const [selected, setSelected] = useState(0);
  const variant = switcher.variants[selected];

  return (
    <>
      <div role="group" aria-label={switcher.groupLabel} className="flex flex-wrap gap-2.5">
        {switcher.variants.map((v, i) => (
          <PillButton key={v.name} pressed={i === selected} onClick={() => setSelected(i)}>
            {v.name}
          </PillButton>
        ))}
      </div>

      <div aria-hidden="true" className="mt-7 flex flex-col items-start lg:flex-row lg:flex-wrap lg:items-center lg:gap-y-3">
        {switcher.steps.map((label, i) => {
          const on = variant.on[i];
          const fresh = variant.fresh[i];
          const delay = `${i * 60}ms`;
          return (
            <Fragment key={label}>
              {i > 0 && (
                <div
                  className="ml-6 h-4 w-0.5 bg-ink lg:ml-0 lg:h-0.5 lg:w-7"
                  style={{ opacity: on ? 1 : 0.2, transition: `opacity 400ms ${delay}` }}
                />
              )}
              <div
                className={cn(
                  "rounded-[10px] border-[1.5px] border-ink px-4 py-3 font-semibold whitespace-nowrap",
                  on ? "border-solid" : "border-dashed",
                  fresh ? "bg-highlight" : on ? "bg-surface" : "bg-transparent",
                )}
                style={{
                  opacity: on ? 1 : 0.32,
                  transform: `translateY(${on ? 0 : 6}px)`,
                  transition: `opacity 400ms ${delay}, transform 400ms ${delay}, background-color 400ms ${delay}`,
                }}
              >
                {label}
              </div>
            </Fragment>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-6 mb-0 max-w-[70ch]">
        {variant.note}
      </p>
    </>
  );
}
