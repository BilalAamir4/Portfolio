/**
 * Small text and class helpers. Content files import this with a `.ts`
 * extension so scripts/check-content.mjs can load them under plain Node.
 */

/** Join class names, skipping empty values. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** 688 -> "11:28" */
export function clock(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

/** "In development" -> "in development" */
export function lowerFirst(text: string): string {
  return text.charAt(0).toLowerCase() + text.slice(1);
}

/** "a" or "an" before a number written in digits: an 8, an 11, a 12. */
export function articleFor(n: number): "a" | "an" {
  const digits = String(Math.floor(n));
  if (digits.startsWith("8")) return "an";
  if (digits.length % 3 === 2 && (digits.startsWith("11") || digits.startsWith("18"))) {
    return "an";
  }
  return "a";
}

/** Replace {name} tokens: fill("{n} of {total}", { n: 9, total: 10 }) */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
