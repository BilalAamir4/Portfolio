"use client";

import Image from "next/image";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { type ProjectType } from "@/data/projects";
import { useRouter } from "next/navigation";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Custom GitHub SVG (not in lucide-react) ─────────────────────────────────

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.6 6-6.5 0-1.4-.5-2.5-1.5-3.4.1-.3.6-1.6-.1-3.3 0 0-1.2-.4-3.8 1.4a12.8 12.8 0 0 0-7 0C6.2 1.2 5 1.6 5 1.6c-.7 1.7-.2 3-.1 3.3-1 .9-1.5 2-1.5 3.4 0 4.9 3 6.2 6 6.5-.4.4-.8 1.1-.8 2.2v4" />
      <path d="M9 18c-4.5 1.6-5-2-7-2" />
    </svg>
  );
}

// ─── ProjectCard ─────────────────────────────────────────────────────────────

export default function ProjectCard({ project }: { project: ProjectType }) {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt spring values
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 25 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    rotateY.set((offsetX / (rect.width / 2)) * 10);
    rotateX.set(-(offsetY / (rect.height / 2)) * 6);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  function handleCardClick() {
    router.push(`/projects/${project.slug}`);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={cn(
        "group cursor-pointer",
        "bg-[#0d0d14] rounded-2xl overflow-hidden",
        "border border-[#1a1a2e]",
        "transition-shadow duration-300",
        "card-glow",
        "flex flex-col h-full"
      )}
    >
      {/* ── Image area ───────────────────────────────────────────────── */}
      <div className="relative h-48 overflow-hidden bg-[#080810]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          unoptimized
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Bottom fade overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-transparent to-transparent" />
        {/* Category badge */}
        <span className="absolute top-3 right-3 bg-[#050508]/80 backdrop-blur-sm border border-[#1a1a2e] rounded-full px-3 py-1 text-xs font-mono text-accent">
          {project.category}
        </span>
      </div>

      {/* ── Card body ────────────────────────────────────────────────── */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Title */}
        <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-200 leading-snug">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted leading-relaxed line-clamp-2 mb-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                "text-xs font-mono px-2 py-0.5 rounded",
                "bg-white/5 border border-white/5 text-muted",
                "hover:border-accent/50 hover:text-accent/80 transition-colors duration-150"
              )}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Metrics */}
        {project.metrics.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-4">
            {project.metrics.map((metric) => (
              <span key={metric} className="text-xs font-mono text-green-400 flex items-center gap-1">
                <span className="text-green-400/50">↑</span>
                {metric}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#1a1a2e]">
          {/* Year */}
          <span className="text-xs text-muted font-mono">{project.year}</span>

          {/* Icon links — stop propagation so card click doesn't fire */}
          <div
            className="flex gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            {project.github !== null && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View on GitHub"
                className={cn(
                  "p-2 rounded-lg bg-white/5 hover:bg-white/10",
                  "text-muted hover:text-foreground",
                  "transition-all duration-150"
                )}
              >
                <GithubIcon size={16} />
              </a>
            )}
            {project.demo !== null && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View live demo"
                className={cn(
                  "p-2 rounded-lg bg-white/5 hover:bg-white/10",
                  "text-muted hover:text-foreground",
                  "transition-all duration-150"
                )}
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
