# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary:** recruiters and engineers hiring AI or ML engineering interns and junior engineers. They are screening many candidates quickly and want proof of working systems and honest measurement, not claims.
- **Secondary:** university faculty and potential collaborators, judging research direction and rigour.

## Product Purpose

The personal portfolio of Bilal Aamir, a third-year B.S. Information Technology student at Bahria University Islamabad (graduating 2027) who is aiming to become an AI engineer. His work centres on retrieval-augmented generation, NLP, speech and evaluation.

The site's job: in under a minute, show that Bilal builds working AI systems and measures them honestly.

Success means a visitor takes one of the primary actions:

1. open a project case study;
2. open the repo;
3. email;
4. download the résumé.

## Positioning

Every featured project leads with its results: what was measured, the value, and the context. In-progress work is shown with its evaluation plan, not dressed up as finished. Most student portfolios list technologies. This one shows measured outcomes and is plain about their limits.

## Operating Context

- Visitors arrive from a CV, a LinkedIn profile or a job application. They skim the home page, then open one or two case studies or repos.
- Case studies are read the way an engineer reads a short paper: problem, approach, results, limitations, links.

## Capabilities and Constraints

- An existing Next.js 16 App Router site (TypeScript strict, Tailwind v4). The redesign keeps the route set: home, projects, project detail, about and contact.
- From P2, all user-facing facts (names, numbers, links, dates) live in files under `content/`, never inside components.
- Project tiers:
  - **AI/ML work** is the focus. Only AI/ML projects are featured or get case-study emphasis.
  - **Foundations:** non-AI work. NexChat (a Flutter messaging app) stays, but only as a one-line row (title, tagline, Code link) below all AI work. It is never featured and gets no case-study emphasis. Non-AI work shows general engineering range only.
- Skills:
  - Drop the ASP.NET Web Forms, SQL Server and AES Encryption skills entirely.
  - Keep Flutter and Firebase only, as a short "Mobile" skills group listed last.
- RAG and speech projects are **in progress** and not yet on the site. They will be added during content work (P2), labelled In progress, with an evaluation plan in place of results.
- **Undecided or missing:**
  - per-project repo URLs (current links point to the GitHub profile root);
  - project figures and screenshots;
  - a form backend;
  - the deploy target and live domain.

## Brand Commitments

- Plain and specific.
- Numbers over adjectives.
- Honest status: in-progress work is labelled, never dressed up.
- No hype words.
- Anti-references:
  - the current site: gradient headings, glow blobs, tilt cards, typewriter hero, fake code editor, pulsing dots, vanity stats;
  - generic dark developer-portfolio templates.

## Evidence on Hand

- Measured results in `data/projects.ts` (to be checked against the source work before reuse):
  - Customer Churn Prediction: ROC-AUC 0.853, F1 0.627.
  - BERT Sentiment Analysis: accuracy 88.88%, F1 0.89, test set 25K samples.
  - Dengue Outbreak Prediction: AUC-ROC 0.9945.
- Projects with no recorded results:
  - Multi-Domain Object Detection;
  - Resume Parser;
  - ML Algorithms From Scratch;
  - NexChat.

  Their results must not be invented. They show "Results pending" and an evaluation plan, or no results table at all.
- Education: B.S. Information Technology, Bahria University Islamabad, CGPA 3.63 / 4.0, expected 2027.
- Contact: email, LinkedIn and GitHub (see the audit, §3).
- **Résumé PDF:** Bilal will provide it. It is a required asset before launch.
- **Not on hand, do not fabricate:**
  - work experience;
  - certificates;
  - testimonials;
  - a photo;
  - RAG and speech results (in progress).

## Product Principles

1. Results first: a project earns its place by what it measured, not the tools it used.
2. Honest status over impressive status. Pending results are labelled pending.
3. Fast to skim: the core claim is visible in under a minute without interaction.
4. AI/ML work leads. Other work appears only as brief evidence of range.
5. Every fact has one source, in `content/`.

## Accessibility & Inclusion

- Every interactive element is a real link or button, keyboard-reachable, with a visible focus ring.
- No load or scroll animation, and prefers-reduced-motion is respected.
- Text contrast is at least 4.5:1.
