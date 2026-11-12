"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SkillPillsProps {
  skills: string[];
}

export default function SkillPills({ skills }: SkillPillsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <motion.span
          key={skill}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{
            duration: 0.25,
            ease: "easeOut" as const,
            delay: index * 0.04,
          }}
          className={cn(
            "bg-[#0d0d14] border border-[#1a1a2e] rounded-lg px-3 py-1.5",
            "font-mono text-sm text-foreground",
            "hover:border-accent/50 hover:text-accent transition-colors duration-150 cursor-default"
          )}
        >
          {skill}
        </motion.span>
      ))}
    </div>
  );
}
