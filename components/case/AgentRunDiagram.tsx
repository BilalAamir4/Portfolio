"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { PillButton } from "@/components/PillButton";
import type { RunStep } from "@/content/schema";
import { cn } from "@/lib/format";
import { prefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/** Spec 7.5: one step every 900ms on the case study. */
const STEP_MS = 900;
const SPRING = "cubic-bezier(.3,1.6,.5,1)";

type Props = {
  /** Seven steps. Steps 2 and 3 label the specialist and worker groups. */
  steps: readonly RunStep[];
  specialists: readonly { name: string; detail: string }[];
  workers: readonly string[];
  buttonLabel: string;
};

/**
 * Starts on the final step, all lit. "Run a review" steps through all seven.
 * Steps not reached are dashed at 30%, the current one is highlight and
 * pulses, and the workers spring in with a 110ms stagger at step 3.
 */
export function AgentRunDiagram({ steps, specialists, workers, buttonLabel }: Props) {
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

  const reached = (i: number) => i <= step;
  const current = (i: number) => i === step && step < last;

  const node = (i: number) => (
    <div
      className={cn(
        "rounded-[10px] border-[1.5px] border-ink px-4 py-3 font-semibold",
        reached(i) ? "border-solid" : "border-dashed",
        current(i) ? "pulse bg-highlight" : reached(i) ? "bg-paper" : "bg-transparent",
      )}
      style={{ opacity: reached(i) ? 1 : 0.3, transition: "opacity 400ms, background-color 400ms" }}
    >
      {steps[i].label}
    </div>
  );

  const line = (i: number) => (
    <div
      className="ml-6 h-4 w-0.5 shrink-0 bg-ink lg:ml-0 lg:h-0.5 lg:w-6"
      style={{ opacity: reached(i) ? 1 : 0.2, transition: "opacity 400ms" }}
    />
  );

  const group = (i: number): { className: string; style: CSSProperties } => ({
    className: cn(
      "rounded-xl border-[1.5px] border-ink p-[18px]",
      reached(i) ? "border-solid" : "border-dashed",
      current(i) ? "pulse bg-highlight" : "bg-transparent",
    ),
    style: { opacity: reached(i) ? 1 : 0.3, transition: "opacity 400ms, background-color 400ms" },
  });

  const row = "flex flex-col items-start lg:flex-row lg:flex-wrap lg:items-center lg:gap-y-3";
  const workersIn = step >= 3;

  return (
    <>
      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
        <PillButton variant="action" onClick={run}>
          {buttonLabel}
        </PillButton>
        <p aria-live="polite" className="m-0 flex-[1_1_320px] font-medium">
          {steps[step].note}
        </p>
      </div>

      <div
        aria-hidden="true"
        className="mt-7 flex flex-col gap-3.5 rounded-[14px] border-[1.5px] border-ink bg-surface p-7"
      >
        <div className={row}>
          {node(0)}
          {line(1)}
          {node(1)}
        </div>

        <div {...group(2)}>
          <p className="mt-0 mb-3 font-semibold">{steps[2].label}</p>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-3">
            {specialists.map((s) => (
              <div
                key={s.name}
                className="rounded-[10px] border-[1.5px] border-ink bg-surface px-3.5 py-3"
                style={{
                  transform: `scale(${reached(2) ? 1 : 0.94})`,
                  transition: `transform 450ms ${SPRING}`,
                }}
              >
                <strong>{s.name}</strong>
                <br />
                {s.detail}
              </div>
            ))}
          </div>
        </div>

        <div {...group(3)}>
          <p className="mt-0 mb-3 font-semibold">{steps[3].label}</p>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(140px,100%),1fr))] gap-3">
            {workers.map((label, i) => (
              <div
                key={label}
                className="rounded-[10px] border-[1.5px] border-ink bg-surface px-3.5 py-3"
                style={{
                  opacity: workersIn ? 1 : 0,
                  transform: `translateY(${workersIn ? 0 : 14}px) scale(${workersIn ? 1 : 0.9})`,
                  transition: `opacity 400ms ${i * 110}ms, transform 500ms ${SPRING} ${i * 110}ms`,
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className={row}>
          {node(4)}
          {line(5)}
          {node(5)}
          {line(6)}
          {node(6)}
        </div>
      </div>
    </>
  );
}
