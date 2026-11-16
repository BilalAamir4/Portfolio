# Prompt 4 of 6: quality pass and deploy preparation

Paste everything below this line into Claude Code after prompt 3 is finished and committed, and after you have filled in what you can in `docs/build/OWNER_TODO.md`.

---

Re-read `docs/build/DESIGN_SPEC.md`. Do a full quality pass on the finished site, fix what you find, and prepare it for Vercel. Do not change copy, colours, layout or motion timings.

1. Owner values. Read `docs/build/OWNER_TODO.md`. For each item I have filled in, write the value into the right content file. For each item still open, leave it `null` and confirm the site hides it cleanly.
2. Spec audit. Go through spec sections 4 to 10 line by line and check the code against each rule. Fix every violation. In particular search the codebase for: hex colours outside `globals.css`, `onClick` on non-interactive elements, more than one `<main>`, any text in `[SQUARE BRACKETS]`, any hard-coded number in a component, unused files, unused dependencies, `console.log`.
3. SEO and metadata. Verify the title template, unique descriptions, Open Graph and Twitter metadata, the generated Open Graph image, `sitemap.ts` (published routes only), `robots.ts`, and `icon.svg`. `metadataBase` reads `NEXT_PUBLIC_SITE_URL`.
4. Accessibility. Check heading order on every page, `aria-pressed` on all pills, labels on all groups, focus rings, 44px targets, and that every `aria-live` note updates. Check each page in the browser by keyboard and fix every finding.
5. Performance. Confirm only the interactive widgets are client components. Confirm fonts load through `next/font` with no layout shift. Confirm there is no scroll handler that sets React state. Run Lighthouse from the command line (`npx lighthouse`) against the production build for `/` and `/work/insightex` and report the four scores. Fix anything under 95 that is within the spec. If Lighthouse cannot run here, say so.
6. Browser check. Using the Claude in Chrome browser tools in a new tab, test `/`, `/work/insightex` and `/work/planted-note` at 360, 390, 768, 1280, 1440 and 1920px. Fix any overflow or overlap. Check the console for errors on every page.
7. Robustness. Click every pill rapidly and switch between options mid-animation. Navigate between pages mid-animation. There must be no console errors and no state updates after unmount.
8. Deploy preparation. Add `.env.example` with `NEXT_PUBLIC_SITE_URL`. Do not deploy or push in this step; deployment is prompt 6.

Done when:

- `npm run lint`, `npx tsc --noEmit` and `npm run build` pass with zero warnings, and the `prebuild` content check passes.
- You have given me a report with: every fix made, every spec rule you could not verify and why, the Lighthouse and accessibility results if run, and the items still open in `OWNER_TODO.md`.

Commit with the message "Quality pass and deploy preparation".
