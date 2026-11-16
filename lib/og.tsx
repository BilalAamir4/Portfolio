import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

/**
 * Open Graph images (spec 9), built at build time by app/opengraph-image.tsx
 * and app/work/[slug]/opengraph-image.tsx.
 *
 * Colours are read from the @theme tokens in app/globals.css so that file
 * stays the only place they are written. The display font is the static
 * Bold cut of Bricolage Grotesque (OFL, see assets/fonts/OFL.txt): the image
 * renderer cannot read the woff2 files next/font serves.
 */

export const ogSize = { width: 1200, height: 630 };

/** "Bilal Aamir" -> "BA", the same mark as app/icon.svg. */
const initials = profile.name
  .split(/\s+/)
  .map((word) => word.charAt(0).toUpperCase())
  .join("");

async function tokens() {
  const css = await readFile(join(process.cwd(), "app/globals.css"), "utf8");
  const value = (name: string) => {
    const match = css.match(new RegExp(`--color-${name}:\\s*([^;]+);`));
    if (!match) throw new Error(`lib/og.tsx: --color-${name} is missing from app/globals.css`);
    return match[1].trim();
  };
  return { paper: value("paper"), ink: value("ink"), highlight: value("highlight") };
}

/** Smaller type for longer sentences, so every image fits in the frame. */
function textSize(text: string) {
  if (text.length <= 90) return 72;
  if (text.length <= 130) return 60;
  return 52;
}

export async function renderOgImage({ label, text }: { label: string; text: string }) {
  const [color, display] = await Promise.all([
    tokens(),
    readFile(join(process.cwd(), "assets/fonts/BricolageGrotesque-Bold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: color.paper,
          color: color.ink,
          fontFamily: "Bricolage Grotesque",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: 14,
              background: color.highlight,
              fontSize: 36,
              letterSpacing: "-0.02em",
            }}
          >
            {initials}
          </div>
          <div style={{ fontSize: 36 }}>{label}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <div style={{ display: "flex", height: 2, background: color.ink }} />
          <div
            style={{
              fontSize: textSize(text),
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              maxWidth: 1020,
            }}
          >
            {text}
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [{ name: "Bricolage Grotesque", data: display, style: "normal", weight: 700 }],
    },
  );
}
