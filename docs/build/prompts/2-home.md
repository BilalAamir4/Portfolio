# Prompt 2 of 6: home page

Paste everything below this line into Claude Code after prompt 1 is finished and committed.

---

Re-read `docs/build/DESIGN_SPEC.md` and `docs/build/mockup/Main.dc.html` in full. Build the home page at `/` to match the mockup exactly: same sections, same order, same copy, same sizes, same spacing, same behaviour. Replace the temporary page from prompt 1.

Sections, top to bottom:

1. Hero: the `h1`, the lead paragraph, and the `LectureDemo` panel.
2. Selected work, in this order: Insightex, Agentic RAG Docs Assistant, Planted Note, then the agent project. Render only projects with `published: true`.
   - Insightex: description, two links, three stat lines.
   - Agentic RAG Docs Assistant: text, `RagVariantSwitcher`, the results table only if `results` is not `null`, two links.
   - Planted Note: text, links, `PlantedNotePanel`.
   - Agent project: text, `AgentRunStrip`, links.
3. Earlier work: five rows from `content/projects/earlier.ts`, each a single link to its repository.
4. Background: education, experience, certificates, what I work with.
5. Contact: the sentence, the large email link with the highlighter mark behind it, then GitHub, LinkedIn and the résumé link if the file exists.

Build every motion and interaction listed in spec section 7 that applies to this page. For each client component, follow its paragraph in spec 7.5 to the letter, including timings, and take data (questions, windows, scores, variant notes, step notes) from `content/`, copied from the mockup script.

Requirements that are easy to miss:

- The `h1` and all section text are server-rendered. Only the five interactive widgets are client components.
- All timers are cleared on unmount and before a new run starts. Clicking quickly between options must never leave two animations running.
- The sweep and the lift on outlined link buttons both work at once.
- The agent project is unpublished now, so it must not appear. Verify by temporarily setting it to published with dummy values, checking it renders, then reverting. Do not commit the dummy values.
- Case study links point to `/work/insightex` and `/work/planted-note`.
- At 390px wide: the header wraps cleanly, grids collapse to one column, the 23 bars still fit, pills wrap, nothing scrolls sideways.

Done when all of these are true. Check each one and report the result:

- `npm run lint`, `npx tsc --noEmit` and `npm run build` pass with zero warnings.
- Every item in spec 7.2, 7.3 and 7.4 that applies to home works. List them one by one with pass or fail.
- Keyboard only: Tab reaches every link and button in a sensible order, Enter and Space operate every pill, focus is always visible.
- JavaScript disabled: all text is visible. The demos show their default state.
- Reduced motion: nothing moves, the hero demo shows its final step.
- In the browser, check every section at 1440px and 390px against the mockup. List any differences and fix them.

Browser checks: use the Claude in Chrome browser tools to open the local dev server in a new tab (never reuse or close my open tabs), resize the window to the widths asked for, read the console, and operate the page. Do the checks yourself; do not ask me to do them. If the browser tools are not connected, say so and continue with the checks you can run.

Commit with the message "Home page".
