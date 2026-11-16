"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { PillButton } from "@/components/PillButton";
import type { RunStep } from "@/content/schema";
import { cn } from "@/lib/format";
import { prefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/** Spec 7.5: one step every 750ms on home. */
const STEP_MS = 750;

type Props = {
  steps: readonly RunStep[];
  buttonLabel: string;
};

/** Starts on the final step, all lit. "Run a review" steps through all seven. */
export function AgentRunStrip({ steps, buttonLabel }: Props) {
  const last = steps.length - 1;
  const [step, setStep] = useState(last);
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const run = () => {
    clearTimers();
    if (prefersReducedMotion()) {
      setStep(last);
      return;
    }
    setStep(0);
    for (let i = 1; i <= last; i++) {
      timers.current.push(window.setTimeout(() => setStep(i), i * STEP_MS));
    }
  };

  return (
    <>
      <PillButton variant="action" onClick={run}>
        {buttonLabel}
      </PillButton>

      <div aria-hidden="true" className="mt-6 flex flex-col items-start lg:flex-row lg:items-stretch">
        {steps.map(({ label }, i) => {
          const done = i <= step;
          const now = i === step && step < last;
          return (
            <Fragment key={label}>
              {i > 0 && (
                <div
                  className="ml-6 h-4 w-0.5 shrink-0 bg-ink lg:ml-0 lg:h-0.5 lg:w-[22px] lg:self-center"
                  style={{ opacity: done ? 1 : 0.2, transition: "opacity 350ms" }}
                />
              )}
              <div
                className={cn(
                  "rounded-[10px] border-[1.5px] border-ink px-3.5 py-3 font-semibold whitespace-nowrap lg:flex lg:min-w-0 lg:flex-1 lg:items-center lg:justify-center lg:text-center lg:whitespace-normal",
                  done ? "border-solid" : "border-dashed",
                  now ? "pulse bg-highlight" : done ? "bg-surface" : "bg-transparent",
                )}
                style={{
                  opacity: done ? 1 : 0.3,
                  transform: `translateY(${now ? -4 : 0}px)`,
                  transition: "opacity 350ms, transform 350ms, background-color 350ms",
                }}
              >
                {label}
              </div>
            </Fragment>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-6 mb-0 max-w-[70ch]">
        {steps[step].note}
      </p>
    </>
  );
}
