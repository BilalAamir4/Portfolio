"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const GPA = 3.63;
const MAX_GPA = 4.0;
const PERCENT = `${((GPA / MAX_GPA) * 100).toFixed(2)}%`;

export default function GpaBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="mt-5">
      <div className="flex justify-between mb-1.5">
        <span className="text-xs font-mono text-muted">CGPA</span>
        <span className="text-xs font-mono text-accent">3.63 / 4.0</span>
      </div>
      <div className="bg-[#1a1a2e] rounded-full h-1.5 w-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-accent to-violet"
          initial={{ width: "0%" }}
          animate={inView ? { width: PERCENT } : { width: "0%" }}
          transition={{ duration: 1.1, ease: "easeOut" as const, delay: 0.2 }}
        />
      </div>
    </div>
  );
}
