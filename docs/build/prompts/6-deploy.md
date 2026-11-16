# Prompt 6: deploy to Vercel

Run this after prompt 4 has passed. Paste everything below this line into Claude Code, in the portfolio folder.

---

Deploy this site to Vercel and connect it to GitHub so every push to `main` redeploys. Do everything yourself. Stop and ask me only for the steps in "What I do myself". Before using any `gh` or `vercel` command, run its `--help` and use the flags it shows; do not rely on memory for flags.

What I do myself. When you reach one of these, tell me exactly what to click or type, wait for me, then continue:

- Signing in. Run `gh auth login` and `npx vercel login` and let me complete each sign-in in the browser. Never ask for, type or store a password, token or one-time code.
- Creating a GitHub or Vercel account if I don't have one.
- Approving the Vercel GitHub app's access to the repository, if Vercel asks.
- Anything that costs money, and buying or pointing a custom domain.

Steps:

1. Pre-flight. Confirm the working tree is clean, and that `npm run lint`, `npx tsc --noEmit` and `npm run build` pass. Confirm `.gitignore` covers `.env*`, `.vercel` and `node_modules`. Search the repository for secrets or tokens; there must be none. Stop if any check fails.
2. GitHub. Check `gh auth status`; if not signed in, hand over to me for sign-in. Create a public repository named `portfolio` under my account from this folder and push `main`. If the name is taken, ask me for another name.
3. Vercel. Check `npx vercel whoami`; if not signed in, hand over to me. Link this folder to a new Vercel project named `bilal-aamir` (ask me if that name is taken), accepting the detected Next.js settings. Deploy to production.
4. Site address. Read the production address Vercel assigned. Set `NEXT_PUBLIC_SITE_URL` to that full `https://` address for the production environment, then deploy to production again so metadata, the sitemap and the Open Graph image use it.
5. Git connection. Connect the Vercel project to the GitHub repository so pushes to `main` deploy to production. Prove it: make a trivial commit to `README.md`, push, and confirm a new production deployment starts and succeeds.
6. Verify the live site with the Claude in Chrome browser tools. Open a new tab; do not use or close my existing tabs. On `/`, `/work/insightex` and `/work/planted-note`:
   - The page loads with no console errors and no failed network requests.
   - At 1440px and 390px wide nothing overflows sideways and the header does not cover content.
   - Scroll the full page: blocks rise in, the progress bar tracks, the nav underline follows the section.
   - Operate every pill and button once: the hero demo, the RAG switcher, the Planted Note panel, the pipeline stepper, the defense switcher.
   - Every link works. External links open the right address.
   - `/sitemap.xml`, `/robots.txt` and the Open Graph image load and use the production address.
   - An unknown address such as `/work/nope` shows the 404 page.
   Fix anything that fails, push, wait for the redeploy, and check again.
7. Report: the live address, the GitHub repository address, what you verified with pass or fail for each item, and anything left for me.

Rules:

- Do not add analytics, paid add-ons, team members or a custom domain.
- Do not change copy, colours, layout or motion.
- If a command fails twice, stop and show me the error instead of trying workarounds.

After this, tell me in two lines how to update the site later: push to `main`, or run prompt 5 for project numbers.
