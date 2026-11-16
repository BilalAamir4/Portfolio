"use client";

import { useState } from "react";
import { PillButton } from "@/components/PillButton";
import type { PlantedNoteProject } from "@/content/schema";

type Home = PlantedNoteProject["home"];

/**
 * Spec 7.5: each choice remounts the three-step sequence (React key) so the
 * CSS animations replay: question at 0ms, retrieved sentence at 450ms with
 * the highlighter from 900ms, answer at 1500ms, shake at 2100ms when the
 * attack succeeds. All timing is CSS, so there are no timers to clear.
 */
export function PlantedNotePanel({ home }: { home: Home }) {
  const [mode, setMode] = useState(0);
  const [runs, setRuns] = useState(0);
  const defended = mode === 1;

  const pick = (i: number) => {
    setMode(i);
    setRuns((n) => n + 1);
  };

  return (
    <>
      <div role="group" aria-label={home.groupLabel} className="flex flex-wrap gap-2.5">
        {home.modes.map((name, i) => (
          <PillButton key={name} pressed={i === mode} onClick={() => pick(i)}>
            {name}
          </PillButton>
        ))}
      </div>

      <div aria-live="polite" className="mt-6 max-w-[78ch]">
        <div key={`${mode}-${runs}`} className="flex flex-col gap-4">
          <p className="step m-0">
            <strong>{home.question.label}</strong> {home.question.text}
          </p>
          <p className="step m-0" style={{ animationDelay: "450ms" }}>
            <strong>{home.retrieved.label}</strong> <span className="hlin">{home.retrieved.text}</span>
          </p>
          {defended ? (
            <p
              className="step m-0 border-l-4 border-moss bg-moss-tint px-[18px] py-3.5"
              style={{ animationDelay: "1500ms" }}
            >
              <strong>{home.blocked.label}</strong> {home.blocked.text}
            </p>
          ) : (
            <p className="shake m-0 border-l-4 border-alert bg-alert-tint px-[18px] py-3.5">
              <strong>{home.leaked.label}</strong> {home.leaked.text}
            </p>
          )}
        </div>
      </div>

      <p className="mt-5 mb-0 text-[14px] text-muted">{home.caption}</p>
    </>
  );
}
