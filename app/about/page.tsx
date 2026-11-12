import type { Metadata } from "next";
import { MapPin, GraduationCap, Target } from "lucide-react";
import { skillGroups } from "@/data/skills";
import ScrollReveal from "@/components/ScrollReveal";
import GpaBar from "@/components/GpaBar";
import SkillPills from "@/components/SkillPills";

export const metadata: Metadata = {
  title: "About | Bilal Aamir",
  description:
    "BSIT student at Bahria University building ML systems from the ground up. Passionate about ML, NLP, and CV internships.",
};

// ─── Focus items ───────────────────────────────────────────────────────────────

const focusItems = [
  {
    title: "MLOps & Deployment",
    subtitle: "FastAPI, Docker, cloud hosting",
    border: false,
  },
  {
    title: "Advanced CV",
    subtitle: "Final Year Project",
    border: true,
  },
  {
    title: "Open Source",
    subtitle: "Contributing to HuggingFace ecosystem",
    border: true,
  },
] as const;

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

      {/* ── Section 1: Header ────────────────────────────────────── */}
      <ScrollReveal className="mb-12">
        <p className="text-sm font-mono text-accent mb-2">Who I Am</p>
        <h1 className="text-4xl sm:text-5xl font-bold gradient-text">About Me</h1>
        <p className="text-muted text-base mt-3">
          BSIT student at Bahria University building ML systems from the ground up.
        </p>
      </ScrollReveal>

      {/* ── Section 2: Bio + Education ───────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">

        {/* Bio card */}
        <ScrollReveal delay={0.1}>
          <div className="bg-[#0d0d14] border border-[#1a1a2e] rounded-2xl p-6 card-glow h-full">
            <h2 className="text-lg font-semibold text-foreground mb-4">Background</h2>
            <p className="text-sm text-muted leading-relaxed">
              I&apos;m Bilal Aamir, a third-year Information Technology student at Bahria
              University Islamabad with a CGPA of 3.63/4.0, actively targeting internships
              in ML Engineering, NLP, and Computer Vision.
            </p>
            <p className="text-sm text-muted leading-relaxed mt-3">
              I build end-to-end AI systems — from classical ML pipelines with MLflow
              experiment tracking to fine-tuned transformer models and production-ready
              Flutter apps. I enjoy the full arc: data to deployment.
            </p>

            {/* Meta rows */}
            <div className="mt-5 space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted">
                <MapPin size={15} className="text-accent shrink-0" />
                <span>Islamabad, Pakistan</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted">
                <GraduationCap size={15} className="text-accent shrink-0" />
                <span>Expected 2027</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted">
                <Target size={15} className="text-accent shrink-0" />
                <span>Targeting ML / NLP / CV Internships</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Education card */}
        <ScrollReveal delay={0.2}>
          <div className="bg-[#0d0d14] border border-[#1a1a2e] rounded-2xl p-6 card-glow h-full">
            <h2 className="text-lg font-semibold text-foreground mb-4">Education</h2>
            <p className="text-lg font-semibold text-foreground">Bahria University</p>
            <p className="text-sm text-muted mt-1">B.S. Information Technology</p>
            <p className="font-mono text-accent text-sm mt-2">CGPA: 3.63 / 4.0</p>
            <p className="text-xs text-muted mt-1">Expected 2027 · Islamabad, Pakistan</p>

            {/* Animated CGPA bar */}
            <GpaBar />
          </div>
        </ScrollReveal>
      </div>

      {/* ── Section 3: Skills ────────────────────────────────────── */}
      <section className="mb-12">
        <ScrollReveal>
          <h2 className="text-2xl font-bold text-foreground mb-8">Skills</h2>
        </ScrollReveal>

        <div className="flex flex-col gap-8">
          {skillGroups.map((group, groupIndex) => (
            <ScrollReveal key={group.category} delay={groupIndex * 0.1}>
              <h3 className="text-xs font-mono text-accent uppercase tracking-widest mb-3">
                {group.category}
              </h3>
              <SkillPills skills={group.skills} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Section 4: Current Focus ─────────────────────────────── */}
      <ScrollReveal delay={0.1}>
        <div className="bg-[#0d0d14] border border-[#1a1a2e] rounded-2xl p-6 card-glow">
          <p className="font-semibold text-foreground mb-4">Current Focus</p>
          <div className="flex flex-col sm:flex-row gap-6">
            {focusItems.map((item) => (
              <div
                key={item.title}
                className={
                  item.border
                    ? "flex-1 border-l border-[#1a1a2e] pl-4"
                    : "flex-1 pl-0"
                }
              >
                <p className="text-sm font-semibold text-foreground">{item.title}</p>
                <p className="text-xs text-muted mt-1">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </main>
  );
}
