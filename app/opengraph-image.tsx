import { profile } from "@/content/profile";
import { ogSize, renderOgImage } from "@/lib/og";

/** Home, and every page without its own image. */
export const alt = profile.meta.title;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({ label: profile.meta.title, text: profile.hero.headline });
}
