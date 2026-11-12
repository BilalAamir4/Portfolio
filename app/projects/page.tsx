"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { SearchX } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Animation variants ────────────────────────────────────────────────────────

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" as const } },
};

// ─── Stats data ────────────────────────────────────────────────────────────────

const stats = [
  { value: "7", label: "Projects" },
  { value: "3", label: "Domains" },
  { value: "2025", label: "Latest Year" },
  { value: "Open Source", label: "License" },
] as const;

// ─── Category list ─────────────────────────────────────────────────────────────

const CATEGORIES = ["ML", "DL", "NLP", "CV", "Mobile", "Web"] as const;

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));

  const filtered = projects.filter((p) => {
    const tagMatch = activeTag === null || p.tags.includes(activeTag);
    const categoryMatch = activeCategory === null || p.category === activeCategory;
    return tagMatch && categoryMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

      {/* ── Page Header ──────────────────────────────────────────── */}
      <motion.div
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="mb-10"
      >
        <p className="text-sm font-mono text-accent mb-2">My Work</p>
        <h1 className="text-4xl sm:text-5xl font-bold gradient-text">Projects</h1>
        <p className="text-muted text-base mt-3">
          End-to-end ML pipelines, NLP models, CV systems, and mobile apps.
        </p>
      </motion.div>

      {/* ── Stats Bar ────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.15 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#0d0d14] border border-[#1a1a2e] rounded-xl px-5 py-4 text-center"
          >
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted font-mono mt-0.5">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* ── Tag Filter ───────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.25 }}
      >
        <div className="flex flex-wrap gap-2 my-8">
          {/* "All" pill */}
          <button
            id="filter-tag-all"
            onClick={() => setActiveTag(null)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150 cursor-pointer",
              activeTag === null
                ? "bg-accent text-white"
                : "bg-white/5 text-muted hover:bg-white/10 hover:text-foreground"
            )}
          >
            All
          </button>

          {/* Tag pills */}
          {allTags.map((tag) => (
            <button
              key={tag}
              id={`filter-tag-${tag.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150 cursor-pointer",
                activeTag === tag
                  ? "bg-accent text-white"
                  : "bg-white/5 text-muted hover:bg-white/10 hover:text-foreground"
              )}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* ── Category Filter ──────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-8 -mt-4">
          {/* "All" category pill */}
          <button
            id="filter-cat-all"
            onClick={() => setActiveCategory(null)}
            className={cn(
              "text-xs px-3 py-1 rounded-full font-medium transition-all duration-150 cursor-pointer",
              activeCategory === null
                ? "bg-accent text-white"
                : "bg-white/5 text-muted hover:bg-white/10 hover:text-foreground"
            )}
          >
            All
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              id={`filter-cat-${cat.toLowerCase()}`}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={cn(
                "text-xs px-3 py-1 rounded-full font-medium transition-all duration-150 cursor-pointer",
                activeCategory === cat
                  ? "bg-accent text-white"
                  : "bg-white/5 text-muted hover:bg-white/10 hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── Animated Grid ────────────────────────────────────────── */}
      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center justify-center py-24 gap-4"
          >
            <SearchX className="text-muted" size={40} strokeWidth={1.5} />
            <p className="text-muted text-sm">No projects match this filter.</p>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.slug}
                  variants={itemVariants}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  layout
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
