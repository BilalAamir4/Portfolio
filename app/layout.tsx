import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { profile } from "@/content/profile";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  // The installed next/font types accept "variable" (the font's full 200-800
  // axis) but not a "400 800" sub-range; the design uses 400 to 800.
  weight: "variable",
  axes: ["opsz"],
  variable: "--font-display",
  display: "swap",
});

const body = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? `http://localhost:${process.env.PORT ?? 3000}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: `%s | ${profile.name}`,
    default: profile.meta.title,
  },
  description: profile.meta.description,
  applicationName: profile.name,
  authors: [{ name: profile.name }],
  openGraph: {
    type: "website",
    siteName: profile.name,
    locale: "en",
    title: profile.meta.title,
    description: profile.meta.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: profile.meta.title,
    description: profile.meta.description,
  },
};

/**
 * Spec 7.1: runs before first paint. Adds .rv-on (which lets scroll reveals
 * hide content) only when IntersectionObserver exists and reduced motion is
 * not requested. Failsafe: if the app's scripts never start (SiteHeader sets
 * window.__rvReady), the class is removed so nothing stays hidden.
 */
const revealBootstrap = `(function(){try{var d=document.documentElement;if(!("IntersectionObserver" in window))return;if(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;d.classList.add("rv-on");setTimeout(function(){if(!window.__rvReady)d.classList.remove("rv-on")},4000)}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealBootstrap }} />
      </head>
      {/* Font variables go on <body>, not <html>: Tailwind's @theme also
          declares --font-display on :root, and an element's own declaration
          always beats an inherited one, whatever the stylesheet order. */}
      <body className={`${display.variable} ${body.variable}`}>
        <SiteHeader name={profile.name} nav={profile.nav} backLabel={profile.ui.backToAllWork} />
        <main id="top" className="container-page">
          {children}
        </main>
        <SiteFooter line={profile.footer} />
      </body>
    </html>
  );
}
