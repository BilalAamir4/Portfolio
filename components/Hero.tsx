"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import TypingEffect from "@/components/TypingEffect";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ROLES = [
  "ML Engineer",
  "NLP Engineer",
  "Computer Vision Engineer",
  "Flutter Developer",
];

const STATS = ["3.63 CGPA", "7 Projects", "3rd Year"];

// ─── Syntax-highlighted code lines ──────────────────────────────────────────

type Token = { text: string; cls: string };
type CodeLine = Token[];

const keyword = (text: string): Token => ({ text, cls: "text-violet-400" });
const string = (text: string): Token => ({ text, cls: "text-green-400" });
const comment = (text: string): Token => ({ text, cls: "text-[#64748b]" });
const funcName = (text: string): Token => ({ text, cls: "text-blue-400" });
const number = (text: string): Token => ({ text, cls: "text-orange-400" });
const plain = (text: string): Token => ({ text, cls: "text-[#e2e8f0]" });

const CODE_LINES: CodeLine[] = [
  [keyword("from"), plain(" transformers "), keyword("import"), plain(" "), funcName("BertForSequenceClassification")],
  [keyword("from"), plain(" torch.utils.data "), keyword("import"), plain(" "), funcName("DataLoader")],
  [],
  [comment("# Fine-tuned on IMDB — 88.88% accuracy")],
  [plain("model = "), funcName("BertForSequenceClassification"), plain("."), funcName("from_pretrained"), plain("(")],
  [plain("    "), string('"bert-base-uncased"'), plain(", num_labels="), number("2")],
  [plain(")")],
];

function CodeCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    // Map offset to a ±15deg range
    rotateY.set((offsetX / (rect.width / 2)) * 12);
    rotateX.set(-(offsetY / (rect.height / 2)) * 8);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div className="relative flex items-center justify-center">
      {/* Glow behind card */}
      <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />

      {/* Float wrapper */}
      <div className="animate-[float_4s_ease-in-out_infinite] w-full">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformPerspective: 1000 }}
          className="bg-[#0d0d14] border border-[#1a1a2e] rounded-2xl overflow-hidden w-full"
        >
          {/* Editor header */}
          <div className="bg-[#080810] px-4 py-3 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            <span className="ml-2 font-mono text-xs text-muted">
              model_pipeline.py
            </span>
          </div>

          {/* Code body */}
          <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
            {CODE_LINES.map((line, lineIdx) => (
              <div key={lineIdx} className="flex items-start gap-4">
                <span className="text-[#1a1a2e] text-xs select-none w-6 text-right shrink-0 pt-px">
                  {lineIdx + 1}
                </span>
                <span className="flex flex-wrap">
                  {line.length === 0 ? (
                    <span className="text-transparent select-none">&#8203;</span>
                  ) : (
                    line.map((token, tIdx) => (
                      <span key={tIdx} className={token.cls}>
                        {token.text}
                      </span>
                    ))
                  )}
                </span>
              </div>
            ))}
          </div>

          {/* Status bar */}
          <div className="bg-[#080810] border-t border-[#1a1a2e] px-4 py-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="font-mono text-xs text-green-400">
              Model ready — F1: 0.89
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Staggered child helper ──────────────────────────────────────────────────

function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* ── Left: text content ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" as const }}
            className="flex flex-col gap-6"
          >
            {/* Availability pill */}
            <FadeIn delay={0.1}>
              <span className="inline-flex items-center gap-2 border border-[#1a1a2e] bg-[#0d0d14] rounded-full px-4 py-1.5 text-sm text-muted w-fit">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Available for Internships
              </span>
            </FadeIn>

            {/* Name */}
            <FadeIn delay={0.2}>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight gradient-text leading-[1.1]">
                Bilal Aamir
              </h1>
            </FadeIn>

            {/* Typing effect */}
            <FadeIn delay={0.3}>
              <TypingEffect words={ROLES} />
            </FadeIn>

            {/* Bio */}
            <FadeIn delay={0.4}>
              <p className="text-base text-muted leading-relaxed max-w-lg">
                Building end-to-end AI pipelines — from raw data to deployed
                models. Currently pursuing BSIT at Bahria University, targeting
                ML, NLP, and CV internship roles.
              </p>
            </FadeIn>

            {/* CTA buttons */}
            <FadeIn delay={0.5}>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                <Link
                  href="/projects"
                  className={cn(
                    "bg-accent text-white px-6 py-3 rounded-lg font-medium",
                    "hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5",
                    "transition-all duration-200"
                  )}
                >
                  View Projects
                </Link>
                <Link
                  href="https://github.com/BilalAamir4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "border border-[#1a1a2e] text-foreground px-6 py-3 rounded-lg font-medium",
                    "hover:border-accent hover:text-accent",
                    "transition-all duration-200"
                  )}
                >
                  GitHub ↗
                </Link>
              </div>
            </FadeIn>

            {/* Stats */}
            <FadeIn delay={0.6}>
              <div className="flex items-center gap-3 flex-wrap">
                {STATS.map((stat, i) => (
                  <span key={stat} className="flex items-center gap-3">
                    <span className="text-xs font-mono text-muted">{stat}</span>
                    {i < STATS.length - 1 && (
                      <span className="text-[#1a1a2e] text-xs select-none">·</span>
                    )}
                  </span>
                ))}
              </div>
            </FadeIn>
          </motion.div>

          {/* ── Right: 3D floating code card ───────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" as const, delay: 0.2 }}
            className="hidden lg:block"
          >
            <CodeCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
