# Portfolio design spec

This is the single source of truth for building Bilal Aamir's portfolio. Read all of it before writing code. Where this spec and a mockup file disagree, this spec wins. Where this spec is silent, copy the mockup exactly.

## 1. What the site is

A personal portfolio for an aspiring AI engineer whose focus is RAG and agents. Its job: in under a minute, show a recruiter real retrieval and agent work, measured honestly. It must not look like a template. Nothing on it may be invented: every number comes from `content/` files.

## 2. Mockup files and how to read them

`docs/build/mockup/` holds four files. They define layout, copy, colours, sizes and behaviour.

| Mockup file | Route to build |
|---|---|
| `Main.dc.html` | `/` |
| `Insightex.dc.html` | `/work/insightex` |
| `PlantedNote.dc.html` | `/work/planted-note` |
| `AgentReview.dc.html` | `/work/<agent slug from content>` |

The files use a template format, not plain HTML. Translate it like this:

- `{{name}}` is a value returned by `renderVals()` in the `<script type="text/x-dc">` block at the bottom of the file. Find it there.
- `<sc-for list="{{items}}" as="x">…</sc-for>` is a loop: `items.map(x => …)`.
- `<sc-if value="{{flag}}">…</sc-if>` is a conditional render.
- `class Component extends DCLogic` is a React class component: `this.state`, `setState`, `componentDidMount`. Rebuild it as function components with hooks.
- `<helmet><style>` is global CSS for that page. Move shared rules into `app/globals.css`.
- `--hl` is the highlight colour variable. Replace it with the `highlight` token.
- `data-props`, `$preview`, `support.js`, `<x-dc>` and `hint-*` attributes are mockup plumbing. Ignore them.
- Links ending in `.dc.html` map to the routes in the table above.
- Text in `[SQUARE BRACKETS]` is a placeholder. It never ships. See section 8.

The mockups were never rendered and checked in a browser. Treat them as design intent. If a mockup behaviour is broken or impossible, build what this spec describes and note it in your report.

## 3. Stack (fixed)

- Next.js, App Router, latest stable, created with `create-next-app`. TypeScript with `"strict": true`.
- Tailwind CSS v4, tokens defined in an `@theme` block in `app/globals.css`. No `tailwind.config.*` file.
- No UI component library. No animation library. All motion is CSS transitions and keyframes plus two small hooks (section 7). This is deliberate: fewer dependencies, no version conflicts.
- Fonts through `next/font/google`: `Bricolage_Grotesque` (display, variable, weights 400 to 800) and `Instrument_Sans` (body, weights 400, 500, 600). Expose them as CSS variables `--font-display` and `--font-body` and register them in `@theme` as `--font-display` and `--font-sans`.
- No icon library. The design uses no icons.
- Package manager: npm. After install, pin exact versions in `package.json` (no `^`).
- Before using any Next.js or Tailwind API, check the installed version's own docs in `node_modules` or the official site. Do not rely on memory for API names.

## 4. Colour tokens (final)

Light theme only. No dark mode. Define exactly these in `@theme` and use only these. No hex values anywhere else in the code.

| Token | Hex | Use |
|---|---|---|
| `paper` | `#F2F4EF` | Page background |
| `surface` | `#FBFCF9` | Panels and demo boxes |
| `ink` | `#10201B` | Text, borders, rules, filled buttons |
| `ink-soft` | `#33443D` | Secondary paragraphs |
| `muted` | `#4A5A53` | Captions, status lines |
| `line` | `#C9D1C8` | Hairline dividers |
| `track` | `#DDE3DC` | Empty bar tracks |
| `idle` | `#C3CCC3` | Timeline windows that were not retrieved |
| `moss` | `#2E5A4C` | "Built", "safe", scored bars |
| `moss-tint` | `#E6EEE8` | Background of a safe or blocked result |
| `highlight` | `#FFD84A` | The one accent: selected state, retrieved windows, hover sweep |
| `alert` | `#B5371F` | Attack succeeded, leaked dots |
| `alert-tint` | `#F7E9E5` | Background of a leaked result |

Measured contrast: ink on paper 15.2:1, ink-soft on paper 9.3:1, muted on paper 6.6:1, moss on surface 7.6:1, alert on surface 5.8:1, ink on highlight 12.2:1. All pass WCAG AA for normal text. Never put text on `highlight` in any colour but `ink`. Never use `highlight` as a text colour.

Rules for the accent: `highlight` means "this is the selected or cited thing". It appears as a fill behind ink text, never as decoration, never as a gradient. `alert` appears only on the Planted Note material.

## 5. Typography and layout

- Display font for `h1`, `h2`, `h3`, the logo, stat figures and row names. Body font for everything else.
- Sizes, exactly as in the mockups: `h1` `clamp(40px, 6.2vw, 88px)`, line-height 1.02, letter-spacing -0.02em, weight 700. Section `h2` on home `clamp(32px, 4vw, 52px)`, weight 700. Case-study `h2` 34px. Project `h3` 34px. Small `h3` 20 to 26px, weight 600. Body 17px, line-height 1.55 on home and 1.6 on case studies. Lead paragraph 20 to 22px. Captions 14px.
- No all-caps labels. No letter-spaced eyebrow text above headings. No monospace font anywhere. Numbers that align use `font-variant-numeric: tabular-nums`.
- One container for every page and the header and footer: `max-width: 1120px`, centred, `padding-inline: 32px`. Every block's left edge lines up. On screens under 480px the padding is 20px.
- Text blocks keep the `max-width` in `ch` given in the mockup.
- Radii: panels 14px, node boxes 10px, citation buttons 8px, pills 999px. Borders on panels and buttons are 1.5px `ink`. Section dividers are 1px `line`, and 2px `ink` under section headings.
- No shadows except the hard 4px offset shadow on hovered buttons (section 7). No gradients. No blur except the header backdrop.

## 6. Structure and files

```
app/
  layout.tsx            fonts, metadata, header, footer, the reveal bootstrap script
  globals.css           @theme tokens, base styles, all shared motion classes
  page.tsx              home
  work/[slug]/page.tsx  case studies, static params from content
  not-found.tsx
  sitemap.ts, robots.ts, opengraph-image.tsx, icon.svg
components/
  SiteHeader.tsx        sticky header, scroll progress bar, active section underline (client)
  SiteFooter.tsx
  Reveal.tsx            scroll reveal wrapper (client)
  PillButton.tsx, LinkButton.tsx, SectionHeading.tsx
  home/LectureDemo.tsx          hero timeline demo (client)
  home/RagVariantSwitcher.tsx   (client)
  home/PlantedNotePanel.tsx     (client)
  home/AgentRunStrip.tsx        (client)
  home/EarlierWorkList.tsx
  case/PipelineStepper.tsx      (client)
  case/MemoryBars.tsx
  case/DecisionLedger.tsx
  case/DefenseSwitcher.tsx      (client)
  case/AgentRunDiagram.tsx      (client)
  case/ResultsTable.tsx
content/
  profile.ts            name, intro, education, experience, certificates, links
  projects/insightex.ts, agentic-rag.ts, planted-note.ts, agent.ts, earlier.ts
  schema.ts             TypeScript types for all content
lib/
  useInView.ts, usePrefersReducedMotion.ts, format.ts
scripts/
  check-content.mjs     fails the build on placeholders (section 8)
```

Rules:

- Pages and static sections are server components. Only the components marked (client) use `"use client"`.
- All copy and every number lives in `content/`. Components contain no project text. This lets the facts-sync prompt update the site by editing data files only.
- One shared `cn()` helper if needed. No duplicated helpers or duplicated SVGs.
- Exactly one `<main>` per page, in `layout.tsx`. Pages render sections inside it.
- Heading order never skips a level. One `h1` per page.

## 7. Motion (required, and the full list)

The owner asked for motion on scroll and on every interaction. Build all of the following. Shared easing: `cubic-bezier(.2,.8,.2,1)`, called `ease-out-soft` below. Springy easing: `cubic-bezier(.3,1.6,.5,1)`.

### 7.1 Reduced motion and no-JavaScript

- Everything must be fully visible and usable with JavaScript disabled and with `prefers-reduced-motion: reduce`.
- Scroll reveal hides elements only when `<html>` has the class `rv-on`. Add that class with a small inline script in `<head>` in `layout.tsx` that runs before first paint and only when `IntersectionObserver` exists and reduced motion is not requested. Without the class, nothing is hidden. Never server-render content at `opacity: 0` by any other means.
- Under reduced motion: no reveal, no entrance animation, no pulse, no shake, no sweep transition, `scroll-behavior: auto`. State changes still happen, instantly. The hero demo jumps straight to its final step.

### 7.2 Scroll

| Effect | Where | Details |
|---|---|---|
| Rise in | Every block with class `rise` in the mockups | From `opacity 0; translateY(56px)` to rest, 850ms, `ease-out-soft`. Triggered once when 5% visible, root margin `0px 0px -10% 0px`. `Reveal` takes an optional `delay` in ms |
| Staggered rows | Earlier-work rows | Delay 70ms times row index |
| Rule draw | The 2px rule under each home section heading | `scaleX(0)` to `1` from the left, 1100ms |
| Bars fill | Memory bars on Insightex | `scaleX(0)` to `1` from the left, 1300ms, 150ms delay |
| Highlighter draw | The planted note text on the Planted Note page | Background fill grows 0% to 100% wide, 1600ms, 300ms delay, when its section is revealed |
| Progress bar | Bottom edge of the sticky header | 3px `ink` bar, `scaleX` equals scroll progress, updated in a passive scroll listener through `requestAnimationFrame`, set on the element's style directly, not through React state |
| Active section | Header nav on home | The link for the section crossing the middle of the viewport keeps its underline. `IntersectionObserver` with root margin `-40% 0px -55% 0px` |
| Smooth anchors | Home nav | `scroll-behavior: smooth`, sections have `scroll-margin-top: 72px` |

Use one shared `IntersectionObserver` per page for reveals, not one per element.

### 7.3 Page load

- `h1`, lead paragraph and the first panel use the `intro` entrance: from `opacity 0; translateY(24px)`, 900ms, `ease-out-soft`, delays 0, 150 and 350ms on home and 0, 100, 200, 300ms on case studies. This is a CSS animation with `animation-fill-mode: both`, and it is disabled under reduced motion. The `h1` must be in the server HTML as real text.

### 7.4 Interaction

| Element | Hover and focus | Press |
|---|---|---|
| Pill buttons and outlined link buttons (`btn`) | `translateY(-3px)` and `box-shadow: 0 4px 0 ink`, 200ms | Back to rest, shadow 0 |
| Outlined link buttons (`sweep`) | `highlight` fill sweeps left to right, `background-size` 0% to 100%, 400ms | |
| Earlier-work rows | Same sweep across the whole row, and the project name slides 12px right, 350ms | |
| Header nav links | 2px underline grows from the left, 300ms | |
| Selected pill | Background becomes `highlight`, 250ms | |
| Every interactive element | Focus-visible outline 3px `ink`, offset 3px | |

### 7.5 Component behaviour

**LectureDemo (home hero).** 23 bars for 23 thirty-second windows of a 688-second lecture. Three question pills. On mount and whenever a question is picked, run: step 1 at 0ms (status text about rewriting, bars at 8% height), step 2 at 900ms (bars grow to their scores over 800ms with 30ms stagger per bar, colour `moss`), step 3 at 2300ms (top three bars turn `highlight` with a 1.5px `ink` inset edge, the rest turn `idle`, a playhead line fades in at the first citation, three citation buttons pop in). Clicking a citation moves the playhead with a 700ms transition and fills that button `ink` with `paper` text. Picking another question clears all pending timers first. Clear timers on unmount. The status line is `aria-live="polite"`. The bars are `aria-hidden`. Use the questions, top windows and score formula from the mockup's script. Keep the caption that says it is an illustration.

**RagVariantSwitcher.** Three pills. Six nodes in a row joined by 28px lines. Nodes not used by the selected variant are dashed, 32% opacity and shifted down 6px. Nodes new in the selected variant are filled `highlight`. Transitions 400ms with 60ms stagger by node index. The note below is `aria-live`.

**PlantedNotePanel (home).** Two pills. Each choice mounts a fresh three-step sequence so the animation replays: question at 0ms, retrieved sentence at 450ms with the highlighter drawing across it from 900ms, answer at 1500ms. With no defenses the answer box is `alert-tint` with a 4px `alert` left border and shakes once at 2100ms. With everything on it is `moss-tint` with a `moss` border and no shake. Use React `key` on the sequence wrapper to force the remount.

**AgentRunStrip (home) and AgentRunDiagram (case study).** A "Run a review" button steps through 7 states, one every 750ms on home and 900ms on the case study. Steps not yet reached are dashed and 30% opacity. The current step is filled `highlight` and pulses. On the case study, the four worker boxes spring in with 110ms stagger at step 3. Initial state is the final step, all lit. The note is `aria-live`.

**PipelineStepper (Insightex).** Seven stage buttons joined by lines. Built stages have solid borders, others dashed. The selected stage is `highlight`, lifted 4px with a hard shadow. The detail panel below remounts with a 450ms slide-in from 16px right each time the stage changes (use `key`). Default selection: "Ask".

**DefenseSwitcher (Planted Note).** Five pills. Two rows of ten dots. A leaked dot is filled `alert`, a clean dot is an outlined `moss` ring at 72% scale. Dots change with 45ms stagger and the springy easing. The explanation panel remounts with the slide-in.

## 8. Content rules

- Copy every word from the mockups into `content/` exactly, except where this spec says otherwise. Do not rewrite, shorten or "improve" copy.
- A placeholder is any value in `[SQUARE BRACKETS]` in a mockup. In `content/` it is stored as `null`. A `null` value is never rendered as text.
- Every project has `published: boolean`. An unpublished project does not appear on the home page, its route returns 404, and it is left out of the sitemap.
- Optional blocks render only when their data exists: the résumé link, the RAG results table, each certificate (name and URL both required), the Insightex role line.
- `scripts/check-content.mjs` runs before `next build` (wire it as `prebuild`). It fails with a clear message if any published project has a required field that is `null`, or if any string in `content/` contains `[` followed by capital letters. This makes it impossible to ship a placeholder.

Initial state of `published`:

| Project | published | Notes |
|---|---|---|
| Insightex | true | Role line is `null` until the owner supplies it; the line is hidden until then |
| Agentic RAG Docs Assistant | true | Home entry only, no case study page. `results` is `null`; show the "comparison table goes here" sentence instead of a table |
| Planted Note | true | All numbers are already real |
| Agent project | false | Every bracketed value is `null`. Hidden until the facts-sync prompt fills it |

When the RAG assistant has results, render them under its variant switcher as a table: one row per variant, columns faithfulness, answer relevancy, context precision, context recall, median latency. Use the same table styling as `ResultsTable`.

Values the owner must supply before launch are listed in `docs/build/OWNER_TODO.md`. Create that file in prompt 1 and keep it current.

## 9. Accessibility and quality bar

- Every clickable thing is a real `<a>` or `<button>`. No `onClick` on a `div`. Everything is reachable and operable by keyboard, with a visible focus ring.
- Toggle pills expose `aria-pressed`. Groups of pills have `role="group"` and an `aria-label`.
- Decorative diagrams are `aria-hidden`, and the same information is available in the `aria-live` note or surrounding text.
- Minimum touch target 44px.
- Page titles use a template in `layout.tsx`: `"%s | Bilal Aamir"`. Pages set only their own part. Home is `"Bilal Aamir, AI engineer"`.
- External links open in the same tab unless they leave to GitHub or a demo, where they use `target="_blank" rel="noopener noreferrer"`. The `mailto:` link never has `target`.
- Each page has a unique meta description. Add Open Graph and Twitter card metadata, `sitemap.ts`, `robots.ts`, a generated Open Graph image using the tokens and display font, and an `icon.svg` favicon: the letters "BA" in `ink` on `highlight`.
- `metadataBase` comes from `NEXT_PUBLIC_SITE_URL`, with a localhost fallback in development.
- Layout holds from 360px to 1920px with no horizontal scroll. The sticky header never covers page content: on a 390px screen the first heading is fully visible below it.
- `npm run lint`, `npx tsc --noEmit` and `npm run build` all pass with zero warnings.

## 10. Things that must not appear

Gradient text, glow or blob backgrounds, glass cards, a typewriter effect, 3D tilt on hover, pulsing "available" dots, skill progress bars, a wall of skill chips, stat strips with vanity numbers, emoji, stock illustrations, a contact form, a "Built with" footer credit, any number not present in `content/`.
