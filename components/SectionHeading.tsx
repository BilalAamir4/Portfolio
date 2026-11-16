import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

type Props = {
  children: ReactNode;
  id?: string;
};

/** Home section heading with the 2px ink rule that draws in from the left. */
export function SectionHeading({ children, id }: Props) {
  return (
    <>
      <h2
        id={id}
        className="mb-3 text-[clamp(32px,4vw,52px)] font-bold leading-[1.1] tracking-[-0.015em]"
      >
        {children}
      </h2>
      <Reveal variant="draw" aria-hidden="true" className="h-0.5 bg-ink" />
    </>
  );
}
