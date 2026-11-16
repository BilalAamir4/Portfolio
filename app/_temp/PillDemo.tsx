"use client";

// TEMPORARY: foundation test page only. Delete with app/page.tsx in prompt 2.

import { useState } from "react";
import { PillButton } from "@/components/PillButton";

type Props = {
  options: readonly string[];
  groupLabel: string;
  actionLabel: string;
};

export function PillDemo({ options, groupLabel, actionLabel }: Props) {
  const [selected, setSelected] = useState(0);
  const [runs, setRuns] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div role="group" aria-label={groupLabel} className="flex flex-wrap gap-2.5">
        {options.map((option, i) => (
          <PillButton key={option} pressed={i === selected} onClick={() => setSelected(i)}>
            {option}
          </PillButton>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <PillButton variant="action" onClick={() => setRuns((n) => n + 1)}>
          {actionLabel}
        </PillButton>
        <p aria-live="polite" className="m-0 text-sm text-muted">
          Action pressed {runs} times.
        </p>
      </div>
    </div>
  );
}
