"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { PillButton } from "@/components/PillButton";
import type { InsightexProject } from "@/content/schema";
import { clock, cn, fill } from "@/lib/format";
import { prefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type Demo = InsightexProject["heroDemo"];
type Phase = 1 | 2 | 3;

/** Spec 7.5: step 2 at 900ms, step 3 at 2300ms. */
const STEP_2_MS = 900;
const STEP_3_MS = 2300;

/**
 * Home hero demo. The server renders the final step for the first
 * question, so the page reads correctly with JavaScript off and under
 * reduced motion. With motion allowed, the sequence runs on mount and
 * again whenever a question is picked.
 */
export function LectureDemo({ demo }: { demo: Demo }) {
  const firstCitation = useCallback(
    (question: number) => demo.questions[question].top[0] * demo.windowSeconds,
    [demo],
  );

  const [question, setQuestion] = useState(0);
  const [phase, setPhase] = useState<Phase>(3);
  const [second, setSecond] = useState(() => firstCitation(0));
  // True only for the run started on mount: the bars drop from the
  // server-rendered final state to step 1 without animating down.
  const [snap, setSnap] = useState(false);
  const timers = useRef<number[]>([]);
  const jumpLabelId = useId();

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  const run = useCallback(
    (index: number, fromMount = false) => {
      clearTimers();
      const first = firstCitation(index);
      setQuestion(index);
      if (prefersReducedMotion()) {
        setSnap(false);
        setPhase(3);
        setSecond(first);
        return;
      }
      setSnap(fromMount);
      setPhase(1);
      setSecond(0);
      timers.current.push(
        window.setTimeout(() => {
          setSnap(false);
          setPhase(2);
        }, STEP_2_MS),
        window.setTimeout(() => {
          setPhase(3);
          setSecond(first);
        }, STEP_3_MS),
      );
    },
    [clearTimers, firstCitation],
  );

  useEffect(() => {
    // Start after the effect so the first paint keeps the server markup.
    const start = window.setTimeout(() => {
      if (!prefersReducedMotion()) run(0, true);
    }, 0);
    return () => {
      window.clearTimeout(start);
      clearTimers();
    };
  }, [run, clearTimers]);

  const current = demo.questions[question];
  const { scores } = demo;
  const totalSeconds = demo.windowCount * demo.windowSeconds;

  const status =
    phase === 1 ? demo.status.rewriting : phase === 2 ? demo.status.scoring : demo.status.found;

  return (
    <>
      <div role="group" aria-label={demo.questionsLabel} className="mt-5 flex flex-wrap gap-2.5">
        {demo.questions.map((q, i) => (
          <PillButton key={q.text} pressed={i === question} onClick={() => run(i)}>
            {q.text}
          </PillButton>
        ))}
      </div>

      <p aria-live="polite" className="mt-[22px] mb-0 min-h-7 font-medium">
        {status}
      </p>

      <div className="relative mt-3">
        <div aria-hidden="true" className="flex h-[150px] items-end gap-1 border-b-2 border-ink">
          {Array.from({ length: demo.windowCount }, (_, i) => {
            const rank = current.top.indexOf(i);
            const score =
              rank >= 0
                ? scores.top[rank]
                : scores.base + ((i * scores.mixIndex + question * scores.mixQuestion) % scores.spread);
            const height = phase >= 2 ? score : scores.resting;
            return (
              <div
                key={i}
                className={cn(
                  "min-w-0 flex-1 rounded-t-[3px]",
                  phase === 3 ? (rank >= 0 ? "bg-highlight" : "bg-idle") : "bg-moss",
                  phase === 3 && rank >= 0 && "shadow-[inset_0_0_0_1.5px_var(--color-ink)]",
                )}
                style={{
                  height: `${height}%`,
                  transition: snap
                    ? "background-color 400ms"
                    : `height 800ms var(--ease-out-soft) ${i * 30}ms, background-color 400ms`,
                }}
              />
            );
          })}
        </div>
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 w-0.5 bg-ink"
          style={{
            left: `${((second + demo.windowSeconds / 2) / totalSeconds) * 100}%`,
            opacity: phase === 3 ? 1 : 0,
            transition: "left 700ms cubic-bezier(.3,.9,.3,1), opacity 300ms",
          }}
        >
          <div className="absolute -top-[9px] -left-1.5 h-3.5 w-3.5 rounded-full bg-ink" />
        </div>
      </div>

      <div className="mt-2 flex justify-between gap-3 text-[14px] text-muted tabular-nums">
        <span>{demo.startLabel}</span>
        <span className="text-center">{demo.timelineCaption}</span>
        <span>{demo.endLabel}</span>
      </div>

      {phase === 3 && (
        <div
          role="group"
          aria-labelledby={jumpLabelId}
          className="pop mt-6 flex flex-wrap items-center gap-3"
        >
          <span id={jumpLabelId} className="font-semibold">
            {demo.jumpLabel}
          </span>
          {current.top.map((w) => {
            const start = w * demo.windowSeconds;
            const on = second === start;
            return (
              <button
                key={w}
                type="button"
                aria-pressed={on}
                onClick={() => setSecond(start)}
                className={cn(
                  "btn min-h-11 rounded-lg border-[1.5px] border-ink px-[18px] py-2.5 font-semibold tabular-nums",
                  on ? "bg-ink text-paper" : "bg-transparent text-ink",
                )}
              >
                {fill(demo.citationTemplate, {
                  start: clock(start),
                  end: clock(start + demo.windowSeconds),
                })}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
