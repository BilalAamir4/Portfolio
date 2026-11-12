import type { Metadata } from "next";
import { Mail } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import ContactForm from "@/components/ContactForm";

// lucide-react v1.17 removed Github and Linkedin — inline SVGs below
function GithubIcon({ size = 32 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.6 6-6.5 0-1.4-.5-2.5-1.5-3.4.1-.3.6-1.6-.1-3.3 0 0-1.2-.4-3.8 1.4a12.8 12.8 0 0 0-7 0C6.2 1.2 5 1.6 5 1.6c-.7 1.7-.2 3-.1 3.3-1 .9-1.5 2-1.5 3.4 0 4.9 3 6.2 6 6.5-.4.4-.8 1.1-.8 2.2v4" />
      <path d="M9 18c-4.5 1.6-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ size = 32 }: { size?: number }) {
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

export const metadata: Metadata = {
  title: "Contact | Bilal Aamir",
  description:
    "Open to ML, CV, and NLP internship opportunities. Get in touch with Bilal Aamir.",
};

// ─── Contact cards data ────────────────────────────────────────────────────────

// Icon union type — inline SVG components share the same size prop signature
type IconComponent = (({ size }: { size?: number }) => React.JSX.Element) | typeof Mail;

const contactCards: {
  label: string;
  detail: string;
  href: string;
  external: boolean;
  Icon: IconComponent;
}[] = [
  {
    label: "Email",
    detail: "bilalaamirr@gmail.com",
    href: "mailto:bilalaamirr@gmail.com",
    external: false,
    Icon: ({ size = 32 }) => <Mail size={size} />,
  },
  {
    label: "LinkedIn",
    detail: "bilal-aamir",
    href: "https://www.linkedin.com/in/bilal-aamir-8011a8295",
    external: true,
    Icon: LinkedinIcon,
  },
  {
    label: "GitHub",
    detail: "BilalAamir4",
    href: "https://github.com/BilalAamir4",
    external: true,
    Icon: GithubIcon,
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

      {/* ── Header ───────────────────────────────────────────────── */}
      <ScrollReveal className="mb-12">
        <p className="text-sm font-mono text-accent mb-2">Get in Touch</p>
        <h1 className="text-4xl sm:text-5xl font-bold gradient-text">Contact</h1>
        <p className="text-muted text-base mt-3">
          Open to ML / CV / NLP internship opportunities. Let&apos;s talk.
        </p>
      </ScrollReveal>

      {/* ── Contact Cards ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {contactCards.map(({ label, detail, href, external, Icon }, i) => (
          <ScrollReveal key={label} delay={i * 0.1}>
            <a
              href={href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="bg-[#0d0d14] border border-[#1a1a2e] rounded-2xl p-6 card-glow
                         flex flex-col items-center gap-3 text-center
                         hover:border-accent/50 transition-colors duration-200 block"
            >
              <span className="p-2 bg-accent/10 rounded-xl text-accent">
                <Icon size={32} />
              </span>
              <span className="text-sm font-semibold text-foreground">{label}</span>
              <span className="text-xs text-muted">{detail}</span>
            </a>
          </ScrollReveal>
        ))}
      </div>

      {/* ── Contact Form ─────────────────────────────────────────── */}
      <ScrollReveal delay={0.2}>
        <ContactForm />
      </ScrollReveal>
    </main>
  );
}
