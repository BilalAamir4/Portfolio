"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Status = "idle" | "sending" | "success" | "error";

const FORMSPREE_ID = "REPLACE_WITH_YOUR_ID";

// ─── Field ────────────────────────────────────────────────────────────────────

const inputClass = cn(
  "w-full bg-[#080810] border border-[#1a1a2e] rounded-xl px-4 py-3",
  "text-foreground text-sm font-sans placeholder:text-muted",
  "focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30",
  "transition-colors duration-150"
);

const labelClass = "text-xs font-mono text-muted mb-1.5 block";

// ─── Button content helper ────────────────────────────────────────────────────

function renderButtonContent(status: Status): React.ReactNode {
  if (status === "sending") {
    return (
      <>
        <Loader2 size={16} className="animate-spin" />
        Sending...
      </>
    );
  }
  if (status === "error") {
    return (
      <>
        <AlertCircle size={16} className="text-red-400" />
        Try Again
      </>
    );
  }
  return (
    <>
      <Send size={16} />
      Send Message
    </>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  // ── Success screen ──────────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" as const }}
        className="bg-[#0d0d14] border border-[#1a1a2e] rounded-2xl p-8 card-glow flex flex-col items-center justify-center gap-4 py-20 text-center"
      >
        <CheckCircle size={48} className="text-green-400" strokeWidth={1.5} />
        <p className="text-foreground font-medium">Message sent!</p>
        <p className="text-muted text-sm">I&apos;ll get back to you soon.</p>
      </motion.div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="form"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" as const }}
        className="bg-[#0d0d14] border border-[#1a1a2e] rounded-2xl p-8 card-glow"
      >
        <form onSubmit={handleSubmit} noValidate>
          {/* Name + Email row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="contact-name" className={labelClass}>
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="contact-email" className={labelClass}>
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {/* Message */}
          <div className="mb-4">
            <label htmlFor="contact-message" className={labelClass}>
              Message
            </label>
            <textarea
              id="contact-message"
              rows={5}
              required
              placeholder="What's on your mind?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={cn(inputClass, "resize-y")}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "sending"}
            className={cn(
              "w-full py-3 rounded-xl font-medium text-sm transition-all duration-200",
              "flex items-center justify-center gap-2",
              status === "sending"
                ? "bg-accent text-white opacity-60 cursor-not-allowed"
                : "bg-accent hover:bg-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/25"
            )}
          >
            {renderButtonContent(status)}
          </button>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}
