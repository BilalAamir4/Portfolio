# Design

## Direction

"Research notebook". Light theme primary; dark theme via prefers-color-scheme only, with no toggle.

## Colour tokens

| Token | Light | Dark |
|---|---|---|
| paper | #F6F4EF | #15140F |
| ink | #1C1B18 | #ECE7DC |
| ink-muted | #5C574D | #A39D90 |
| rule | #D8D2C4 | #34312A |
| accent | #0F5F5C | #6FBFB8 |
| progress-text | #7A4A00 | #E8C27A |
| progress-fill | #F7EBD3 | #2E2615 |

Primary button: accent background with paper text. No other colours, gradients or opacity tricks.

## Fonts

Loaded with next/font/google, self-hosted.

- Newsreader for display and headings.
- IBM Plex Sans for body.
- IBM Plex Mono for numbers, tables, code, dates and labels.

Weights 400 and 600 only.

## Type scale

| Style | Size (px) |
|---|---|
| mono-small | 13 |
| meta | 15 |
| body | 17 |
| lead | 20 |
| h3 | 26 |
| h2 | 34 |
| h1 | 48 at 768 px and up (36 below) |

- Body line height 1.6.
- Headings 1.15.
- Measure at most 66ch.
- No uppercase letter-spaced eyebrows.

## Layout

- One container, max 1120 px, padding 24 px below 768 px and 40 px from 768 px, a 12-column grid with 24 px gutters, one left edge everywhere.
- An 8 px spacing scale; section gaps of 96 px from 768 px and 64 px below.
- A static header (not fixed): name left, links right (Work, About, Contact, Résumé), a disclosure menu below 640 px.
- Blocks separated by 1 px rules; radius 2 px at most; no shadows.

## Signature elements

1. **Results table:** mono, hairline rules, columns metric / value / context. Empty results show one italic row, "Results pending", followed by the evaluation plan.
2. **Paper-style case study:** title, one-sentence abstract, a mono metadata line (status · period · role · stack), then numbered sections 1 Problem, 2 Approach, 3 Results, 4 Limitations, 5 Links, with figures captioned "Fig. n".
3. **Status written as words:** Shipped, In progress, Planned. In progress uses progress-text on progress-fill; Shipped uses accent text.

## Interaction

- Underlined links with a 3 px offset.
- Colour-only hover within 150 ms.
- A 2 px accent focus ring with 2 px offset.
- No load or scroll animation.
- prefers-reduced-motion respected.

## Banned

- gradients, glow, blur, glassmorphism
- tilt or 3D, typewriter, pulsing dots, fake code editors
- vanity stat strips, progress or percentage meters
- emoji, decorative icons (allowed only for external-link and download)
- Inter
- identical 3-column card grids
- "Built with" credits
- the words "passionate", "cutting-edge", "leveraging"

## Copy voice

First person, plain, specific.

## Approved copy

Status: approved by Bilal, 2026-11-12.

### Hero

- Name: "Bilal Aamir"
- Statement: "I build retrieval, language and speech systems, and I measure how well they work."
- Meta line: "IT undergraduate, Bahria University Islamabad · graduating 2027 · open to AI engineering internships"

## References

Mobbin was replaced by public-site references because the Mobbin MCP needs a paid plan. Screenshots (1440×900, fold only) are kept locally in `docs/references/` and are not committed. Borrow structure and rhythm only: colours and fonts stay as specified above.

- **#1 distill.pub (home)**: https://distill.pub. Selected work rows on home and the /projects index. Narrow left column for meta (period, status), main column for title and tagline, hairline rule between entries. Our results table takes the place of their thumbnail on the right. Not the badge pills or images.
- **#5 karpathy.github.io (home)**: https://karpathy.github.io. The "More work" list. Row density: meta line, title, one-line summary, about 100 px per entry, no thumbnails. Not the blue link colour.
- **#7 simonwillison.net (Highlights list)**: https://simonwillison.net. The "Foundations" one-liners. A linked title and a short trailing detail on one line, entries stacked tightly. Not the purple band, tag pills or search.
- **#3 lilianweng.github.io (agent post)**: https://lilianweng.github.io/posts/2023-06-23-agent/. Case-study typography rhythm. The heading-to-body size ratio and the extra space above each section heading. Not the dark theme or the boxed table of contents.
- **#6 karpathy.github.io (recipe post)**: https://karpathy.github.io/2019/04/25/recipe/. Case-study section headings. The number sits inside the heading, in the text column. Our format stays "1 Problem", not "1)".
- **#10 gwern.net (scaling hypothesis)**: https://gwern.net/scaling-hypothesis. The case-study metadata line. Dot-separated facts on one line under the abstract. Ours is mono and left-aligned: status · period · role · stack. Not the centred small caps, boxed TOC or icon bar.
