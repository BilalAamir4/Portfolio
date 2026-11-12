import Link from "next/link";
import { MapPin, Mail } from "lucide-react";

// lucide-react v1.17 removed Github and Linkedin — inline SVGs
function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.6 6-6.5 0-1.4-.5-2.5-1.5-3.4.1-.3.6-1.6-.1-3.3 0 0-1.2-.4-3.8 1.4a12.8 12.8 0 0 0-7 0C6.2 1.2 5 1.6 5 1.6c-.7 1.7-.2 3-.1 3.3-1 .9-1.5 2-1.5 3.4 0 4.9 3 6.2 6 6.5-.4.4-.8 1.1-.8 2.2v4" />
      <path d="M9 18c-4.5 1.6-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ size = 14 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/BilalAamir4",
    Icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/bilal-aamir-8011a8295",
    Icon: LinkedinIcon,
  },
  {
    label: "Email",
    href: "mailto:bilalaamirr@gmail.com",
    Icon: ({ size = 14 }: { size?: number }) => <Mail size={size} />,
  },
] as const;

// ─── Footer ───────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="border-t border-[#1a1a2e] bg-[#050508] py-12 px-6">
      <div className="max-w-6xl mx-auto">

        {/* ── Three-column grid ─────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Column 1 — Brand */}
          <div>
            <p className="font-mono font-bold text-foreground">
              Bilal Aamir
              <span className="text-accent">.</span>
            </p>
            <p className="text-sm text-muted mt-1">ML Engineering Student</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <MapPin size={11} className="text-muted shrink-0" />
              <span className="text-xs text-muted">Islamabad, Pakistan</span>
            </div>
          </div>

          {/* Column 2 — Navigation */}
          <div>
            <p className="text-xs font-mono text-accent uppercase tracking-widest mb-4">
              Navigation
            </p>
            <ul className="space-y-2">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-muted hover:text-foreground transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Connect */}
          <div>
            <p className="text-xs font-mono text-accent uppercase tracking-widest mb-4">
              Connect
            </p>
            <ul className="space-y-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors duration-150"
                  >
                    <Icon size={14} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ────────────────────────────────────────── */}
        <div className="border-t border-[#1a1a2e] mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-muted">
            © 2025 Bilal Aamir. Built with Next.js &amp; Tailwind.
          </p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            <span className="text-xs text-green-400 font-mono">
              Open to opportunities
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
