#!/usr/bin/env node
/**
 * Fails the build if content/ could ship a placeholder (DESIGN_SPEC section 8).
 *
 * 1. Any string anywhere in content/ that contains "[" followed by a capital
 *    letter, e.g. "[PROJECT NAME]".
 * 2. Any published project with a null field that is not listed in
 *    `optionalWhenPublished` in content/schema.ts.
 * 3. Any published project that still carries the mockup's template wording.
 *
 * Content files are TypeScript with only erasable syntax, so Node (22.18+)
 * loads them directly. Run: node scripts/check-content.mjs
 */
import { readdir } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const contentDir = join(root, "content");

const PLACEHOLDER = /\[[A-Z]/;
const TEMPLATE_WORDING = /\bTemplate (entry|page)\b/;
const SLUG = /^[a-z]+(-[a-z]+)*$/;

async function listTsFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await listTsFiles(full)));
    else if (entry.name.endsWith(".ts")) files.push(full);
  }
  return files.sort();
}

/** Visit every primitive value with its dotted path. */
function walk(value, path, visit) {
  visit(value, path);
  if (Array.isArray(value)) {
    value.forEach((item, i) => walk(item, `${path}[${i}]`, visit));
  } else if (value !== null && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      walk(child, path ? `${path}.${key}` : key, visit);
    }
  }
}

/** "results[2].recallPct" -> "results.recallPct" for matching the allow list. */
function normalise(path) {
  return path.replace(/\[\d+\]/g, "");
}

function isOptional(path, optional) {
  const plain = normalise(path);
  return optional.some((field) => plain === field || plain.startsWith(`${field}.`));
}

const errors = [];
const files = await listTsFiles(contentDir);
const modules = [];

for (const file of files) {
  const name = relative(root, file).split(sep).join("/");
  try {
    modules.push({ name, exports: await import(pathToFileURL(file).href) });
  } catch (error) {
    errors.push(`${name}: could not be loaded (${error.message})`);
  }
}

const schema = modules.find((m) => m.name === "content/schema.ts")?.exports;
const optionalWhenPublished = schema?.optionalWhenPublished;
if (!optionalWhenPublished) {
  errors.push("content/schema.ts: missing the optionalWhenPublished export");
}

let projectCount = 0;
let publishedCount = 0;

for (const { name, exports } of modules) {
  for (const [exportName, value] of Object.entries(exports)) {
    // 1. Placeholders in any string.
    walk(value, exportName, (v, path) => {
      if (typeof v === "string" && PLACEHOLDER.test(v)) {
        errors.push(`${name}: ${path} contains a placeholder: "${v}"`);
      }
    });

    // 2 and 3. Published projects.
    const isProject =
      value !== null &&
      typeof value === "object" &&
      typeof value.key === "string" &&
      optionalWhenPublished &&
      value.key in optionalWhenPublished;
    if (!isProject) continue;

    projectCount += 1;
    if (typeof value.published !== "boolean") {
      errors.push(`${name}: ${exportName}.published must be true or false`);
      continue;
    }
    if (!value.published) continue;
    publishedCount += 1;

    const optional = optionalWhenPublished[value.key];
    walk(value, "", (v, path) => {
      if (v === null && !isOptional(path, optional)) {
        errors.push(
          `${name}: "${value.name ?? value.key}" is published but ${path} is null. ` +
            `Fill it in, or set published: false.`,
        );
      }
      if (typeof v === "string" && TEMPLATE_WORDING.test(v)) {
        errors.push(
          `${name}: "${value.name ?? value.key}" is published but ${path} still has the mockup's template wording: "${v}"`,
        );
      }
    });
    if (typeof value.slug !== "string" || !SLUG.test(value.slug)) {
      errors.push(
        `${name}: "${value.name ?? value.key}" is published but its slug "${value.slug}" is not lowercase letters and hyphens`,
      );
    }
  }
}

if (projectCount === 0) {
  errors.push("content/: no projects found; check content/projects/");
}

if (errors.length > 0) {
  console.error(`check-content: ${errors.length} problem(s) in content/\n`);
  for (const error of errors) console.error(`  - ${error}`);
  console.error("\nNothing with a placeholder or a missing required value can ship.");
  process.exit(1);
}

console.log(
  `check-content: OK (${files.length} files, ${projectCount} projects, ${publishedCount} published)`,
);
