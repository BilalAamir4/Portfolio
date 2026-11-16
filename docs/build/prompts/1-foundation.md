# Prompt 1 of 6: foundation

Paste everything below this line into Claude Code, in an empty folder that contains only the `docs/` folder from the build kit.

---

You are building a personal portfolio site. Read `docs/build/DESIGN_SPEC.md` in full, then read all four files in `docs/build/mockup/` in full, before doing anything else. The spec is the source of truth. Do not build any page in this step.

Do this, in order:

1. Run `git init`. Create the Next.js app in the current folder with `create-next-app`: TypeScript, App Router, Tailwind CSS, ESLint, no `src/` directory, import alias `@/*`, npm. Keep the existing `docs/` folder. If the installer refuses a non-empty folder, create the app in a temporary folder and move its contents here.
2. Check the installed Next.js and Tailwind versions. Read their installed docs for fonts, metadata, and Tailwind v4 `@theme` before writing code. Pin exact versions in `package.json`.
3. Remove all `create-next-app` boilerplate: default page content, default SVGs in `public/`, the default favicon, the boilerplate README.
4. `app/globals.css`: the `@theme` block with exactly the colour tokens in spec section 4 and the two font variables, base styles, and every shared motion class from spec section 7 (`rise`, `draw`, `bar`, `intro`, `btn`, `sweep`, `pop`, `step`, `swap`, `hlin`, `shake`, `pulse`, nav underline, focus ring), including the reduced-motion overrides.
5. `app/layout.tsx`: fonts through `next/font/google`, the title template and default metadata, the inline `rv-on` bootstrap script from spec 7.1, `SiteHeader`, one `<main>`, `SiteFooter`.
6. Shared pieces: `lib/useInView.ts`, `lib/usePrefersReducedMotion.ts`, `components/Reveal.tsx` (one shared observer per page), `SiteHeader` with the scroll progress bar and active-section underline, `SiteFooter`, `PillButton`, `LinkButton`, `SectionHeading` with the drawn rule.
7. `content/schema.ts` with types for everything, then the content files. Copy all text from the mockups word for word. Store every bracketed placeholder as `null`. Set `published` as in spec section 8.
8. `scripts/check-content.mjs`, wired as `prebuild`, as described in spec section 8.
9. `docs/build/OWNER_TODO.md`: a checklist of every `null` the owner must supply, each with the file and field name. It must include: the three certificate names (URLs are in the mockup), the Insightex role line, the résumé PDF (to be placed at `public/resume.pdf`), confirmation of the LinkedIn URL, and the production site URL for `NEXT_PUBLIC_SITE_URL`.
10. A temporary `app/page.tsx` that renders the header, a heading in the display font, one paragraph, one of each button, a colour swatch for every token with its name, and three `Reveal` blocks far enough apart to test scrolling.
11. Write a short `README.md`: what the site is, how to run it, where content lives, and how publishing a project works.

Rules:

- No UI library, no animation library, no icon library.
- No hex colours outside `globals.css`.
- If anything in the spec is impossible with the installed versions, stop and tell me instead of improvising.

Done when all of these are true. Check each one and report the result:

- `npm run lint`, `npx tsc --noEmit` and `npm run build` pass with zero warnings.
- With JavaScript disabled, the temporary page shows all content.
- With reduced motion on, nothing animates and nothing is hidden.
- The scroll progress bar tracks scrolling and the `Reveal` blocks rise in once.
- `git status` is clean after a first commit with the message "Foundation: tokens, layout, shared components, content".

Finish by listing every file you created and anything in the spec you could not follow.
