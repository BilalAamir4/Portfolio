# Portfolio Website PRD — Bilal Aamir

## Tech Stack
- Next.js 14 (App Router, TypeScript)
- Tailwind CSS, Framer Motion, Lucide React
- No backend. Static data in /data folder.
- Deploy target: Vercel

## Design System
- Background: #0a0a0a, text: #fafafa, accent: #3b82f6
- Font: Inter (body), JetBrains Mono (code/tags)
- Dark mode only
- Components must use Tailwind utility classes only — no custom CSS files

## Critical Rules
- Server Components are the default. NEVER import Framer Motion, useState,
  useEffect, or event handlers in a file without "use client" as its first line.
- Always use next/image instead of <img>
- Always use clsx + tailwind-merge for conditional class logic
- Use images.remotePatterns (not images.domains) in next.config.js
- Read AGENTS.md before starting each task

---

## Task 0: AGENTS.md + Scaffold
- AGENTS.md already exists in root — read it, do not overwrite it
- - Next.js 14 is already initialized in the workspace. Do NOT run create-next-app.
- Install missing dependencies if needed: npm install framer-motion lucide-react clsx tailwind-merge
- In tailwind.config.ts, extend theme.fontFamily: { mono: ['JetBrains Mono', 'monospace'] }
- Verify npm run dev starts without errors
- Create progress.txt if it does not exist (empty file)

## Task 1: Global Layout + Navbar + Footer
- Create app/layout.tsx:
  - Import Inter and JetBrains_Mono from next/font/google
  - Inter as variable --font-inter, JetBrains_Mono as variable --font-mono
  - Apply both font variables to <html> className
  - Background #0a0a0a, text #fafafa set via globals.css body rule
  - Metadata: title template "%s | Bilal Aamir", description "ML Engineering
    student building end-to-end AI pipelines — from training to deployment."
  - openGraph: title, description, type "website"
  - Render <Navbar /> and <Footer /> around {children}
- Create components/Navbar.tsx as "use client":
  - Logo "Bilal Aamir" on left (links to /)
  - Nav links on right: Home (/), Projects (/projects), About (/about),
    Contact (/contact)
  - useState for mobile menu toggle (hamburger icon from Lucide: Menu / X)
  - sticky top-0 z-50, bg-black/80 backdrop-blur-md border-b border-white/10
- Create components/Footer.tsx as server component:
  - "© 2025 Bilal Aamir" on left
  - GitHub and LinkedIn icon links on right (Lucide Github icon, custom LinkedIn)
  - GitHub: https://github.com/BilalAamir4
  - LinkedIn: https://linkedin.com/in/bilal-aamir-8011a8295
  - border-t border-white/10, py-6, text-gray-400
- Acceptance: npm run dev shows dark page, navbar and footer render,
  mobile menu toggles, no console errors

## Task 2: Data Layer
- Create data/projects.ts with this exact interface:

  export interface ProjectType {
    slug: string
    title: string
    description: string
    tags: string[]
    category: "ML" | "DL" | "NLP" | "CV" | "Mobile" | "Web"
    github: string | null
    demo: string | null
    metrics: string[]
    image: string
    year: number
    featured: boolean
  }

- Populate with all 7 projects (accurate data from resume):
  1. slug: "customer-churn-prediction", category: "ML", featured: true
     metrics: ["ROC-AUC: 0.853", "F1: 0.627"]
     tags: ["XGBoost", "LightGBM", "MLflow", "Optuna", "SHAP", "Streamlit", "Python"]
  2. slug: "bert-sentiment-analysis", category: "NLP", featured: true
     metrics: ["Accuracy: 88.88%", "F1: 0.89", "Test set: 25K samples"]
     tags: ["BERT", "PyTorch", "HuggingFace", "Transformers", "Streamlit", "Python"]
  3. slug: "multi-domain-object-detection", category: "CV", featured: true
     metrics: []
     tags: ["YOLOv8", "Transfer Learning", "COCO 2017", "Python"]
  4. slug: "resume-parser", category: "NLP", featured: false
     metrics: []
     tags: ["spaCy", "NER", "PyMuPDF", "Streamlit", "Python"]
  5. slug: "dengue-outbreak-prediction", category: "ML", featured: false
     metrics: ["AUC-ROC: 0.9945"]
     tags: ["XGBoost", "Random Forest", "SMOTE", "Streamlit", "Python"]
  6. slug: "ml-algorithms-from-scratch", category: "ML", featured: false
     metrics: []
     tags: ["NumPy", "Pandas", "Matplotlib", "Python"]
  7. slug: "nexchat-messaging-app", category: "Mobile", featured: false
     metrics: []
     tags: ["Flutter", "Firebase", "Firestore", "Riverpod", "FCM", "Dart"]
  
  For all image fields use: "/images/<slug>.jpg"
  For github fields use: "https://github.com/BilalAamir4"

- Create data/skills.ts with this structure:

  export interface SkillGroup {
    category: string
    skills: string[]
  }

  Groups (use exact skill names from resume):
  - Languages: Python, Dart, C++, JavaScript, SQL
  - Machine Learning: XGBoost, LightGBM, Random Forest, KNN, Linear Regression,
    Logistic Regression, MLflow, Optuna, SHAP, Scikit-learn, NumPy, Pandas,
    Matplotlib, Streamlit
  - Deep Learning & NLP: PyTorch, HuggingFace Transformers, BERT, YOLOv8,
    spaCy, PyMuPDF
  - Mobile Development: Flutter, Firebase, Firestore, Auth, FCM, Riverpod,
    Dart, Android Studio
  - Web & Backend: ASP.NET Web Forms, SQL Server, AES Encryption
  - Tools & Platforms: Git, GitHub, VS Code, Linux

- Acceptance: both files compile with zero TypeScript errors (run npx tsc --noEmit)

## Task 3: MotionWrapper + Hero
- Create components/MotionWrapper.tsx:
  - "use client" as absolute first line
  - Props: children: React.ReactNode, delay?: number (default 0)
  - Wraps children in motion.div:
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
  - This is the only file that imports from framer-motion

- Create app/page.tsx as a SERVER component (no "use client"):
  - Import MotionWrapper, ProjectCard, and projects from data/projects.ts
  - Hero section:
    - Small label: "ML Engineering Student" in accent blue, monospace font
    - H1: "Bilal Aamir" — large, bold, white
    - Tagline: "Building end-to-end AI pipelines — from training to deployment."
    - Two buttons: "View Projects" (→ /projects, filled blue), "GitHub"
      (→ https://github.com/BilalAamir4, outlined, external link)
    - Wrap hero content in MotionWrapper with delay={0}
  - Featured Projects section below:
    - Heading "Featured Projects" with a "View all →" link to /projects
    - Grid of ProjectCards where featured === true
    - Wrap section in MotionWrapper with delay={0.2}
  - Acceptance: page renders, animation plays on load, no "use client" in page.tsx,
    no hydration errors in console

## Task 4: ProjectCard Component
- Create components/ProjectCard.tsx as "use client"
- Props: project: ProjectType
- Structure:
  - Outer div: relative group cursor-pointer, dark border border-white/10,
    hover:border-blue-500 transition-colors duration-200, rounded-xl overflow-hidden,
    bg-white/[0.02]
  - Image area: next/image with project.image, width=400 height=200,
    unoptimized={true}, className="w-full object-cover"
    Wrap in a div with relative h-[200px] bg-white/5 — if image fails to load
    the bg-white/5 div acts as fallback
  - Content area: p-5 flex flex-col gap-3
  - Title: font-semibold text-white text-lg
  - Description: text-gray-400 text-sm line-clamp-3
  - Tags: flex flex-wrap gap-2, each tag is a span with
    font-mono text-xs bg-white/5 text-gray-300 px-2 py-1 rounded
  - Metrics (if length > 0): flex flex-wrap gap-2, each metric is a span with
    text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded font-mono
  - Footer: flex justify-between items-center mt-auto pt-3 border-t border-white/5
    GitHub icon link (Lucide Github, size 16) and ExternalLink icon (if demo not null)
    Both icons: text-gray-500 hover:text-white transition-colors
- Acceptance: card renders in grids, line-clamp works, icons only show when
  github/demo are not null

## Task 5: Projects Page
- Create app/projects/page.tsx as "use client"
- Add this metadata export at the top BEFORE "use client" — wait, metadata cannot
  be exported from a client component. Instead: create a separate
  app/projects/layout.tsx as a SERVER component that exports:
  export const metadata = { title: "Projects" }
  Then app/projects/page.tsx is the client component with the filter UI.
- Import all projects from data/projects.ts
- State: const [activeTag, setActiveTag] = useState<string | null>(null)
- Unique tags: const allTags = Array.from(new Set(projects.flatMap(p => p.tags)))
- Filtered: const filtered = activeTag ? projects.filter(p => p.tags.includes(activeTag)) : projects
- Filter pills row: "All" pill + one per tag
  Active: bg-blue-600 text-white. Inactive: bg-white/5 text-gray-400 hover:bg-white/10
  All pills: font-mono text-xs px-3 py-1.5 rounded-full cursor-pointer transition-colors
- Page heading: "Projects" h1 + subtitle "All my work across ML, NLP, CV, and Mobile"
- Grid: grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6
- Acceptance: filter works, all 7 projects show on "All", responsive at 375px

## Task 6: Project Detail Page
- Create app/projects/[slug]/page.tsx as a SERVER component
- generateStaticParams: return projects.map(p => ({ slug: p.slug }))
- generateMetadata: find project by slug, return { title: project.title }
  If project is undefined, return { title: "Project Not Found" }
- Page:
  - Back link: "← Projects" → /projects, text-gray-400 hover:text-white
  - next/image: full width, height 400, unoptimized, rounded-xl, object-cover
    Wrap in relative w-full h-[400px]
  - Title: text-3xl font-bold text-white mt-6
  - Tags: same pill style as ProjectCard
  - Metrics: same badge style as ProjectCard (if any)
  - Description: text-gray-300 leading-relaxed mt-4
  - Buttons row: GitHub button (if not null), Demo button (if not null)
    Both as <a> tags styled as buttons
  - If project not found: call notFound() from next/navigation
- Acceptance: /projects/bert-sentiment-analysis renders correctly,
  tab title shows "bert-sentiment-analysis | Bilal Aamir",
  /projects/fake-slug returns Next.js 404 page

## Task 7: About Page
- Create app/about/page.tsx as SERVER component
- Export metadata: { title: "About" }
- Section 1 — Bio:
  "I'm Bilal Aamir, a third-year Information Technology student at Bahria University
  Islamabad (CGPA 3.63/4.0), targeting internships in ML Engineering, NLP, and
  Computer Vision. I build end-to-end AI pipelines — from classical ML with MLflow
  experiment tracking to fine-tuned transformer models and real-time mobile apps."
- Section 2 — Education card:
  bg-white/[0.03] border border-white/10 rounded-xl p-6
  University: "Bahria University", Degree: "B.S. Information Technology",
  CGPA: "3.63 / 4.0", Location: "Islamabad, Pakistan", Expected: "2027"
  Use Lucide GraduationCap icon
- Section 3 — Skills:
  Import skillGroups from data/skills.ts
  For each group: category heading (text-blue-400 font-mono text-sm uppercase
  tracking-widest mb-3) + flex-wrap row of skill pills
  Skill pill: font-mono text-sm bg-white/5 text-gray-300 px-3 py-1 rounded
  NO progress bars
- Acceptance: all sections render, no TypeScript errors

## Task 8: Contact Page
- Create app/contact/page.tsx as SERVER component
- Export metadata: { title: "Contact" }
- Three contact cards in a grid (grid-cols-1 sm:grid-cols-3):
  Each card: bg-white/[0.03] border border-white/10 rounded-xl p-6
  flex flex-col items-center gap-3 text-center
  1. Email — Lucide Mail icon, "bilalaamirr@gmail.com",
     href="mailto:bilalaamirr@gmail.com"
  2. LinkedIn — Lucide Linkedin icon, "bilal-aamir",
     href="https://linkedin.com/in/bilal-aamir-8011a8295"
  3. GitHub — Lucide Github icon, "BilalAamir4",
     href="https://github.com/BilalAamir4"
- Contact form below the cards:
  <form action="https://formspree.io/f/REPLACE_WITH_YOUR_ID" method="POST">
  Fields: name (text), email (email), message (textarea rows=5)
  Each field: label above, input with className:
  "w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white
   focus:border-blue-500 focus:outline-none transition-colors"
  Submit button: bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg
  transition-colors font-medium
- Acceptance: page renders, form styled correctly

## Task 9: next.config.js + Final SEO
- Update next.config.js — use remotePatterns NOT domains:
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' }
    ]
  }
- Verify app/layout.tsx has correct metadata with title template
- Add scroll-smooth to html element: <html lang="en" className="scroll-smooth ...">
- Ensure all external links across all components have
  target="_blank" rel="noopener noreferrer"
- Acceptance: no next/image warnings in console, title shows correctly on all pages

## Task 10: Build & Fix
- Run npx tsc --noEmit and fix ALL TypeScript errors
- Run npm run build and fix ALL errors until exit code 0
- After build succeeds, run npm run dev and manually check these routes:
  /, /about, /projects, /projects/nexchat-messaging-app, /contact
- Fix any console errors, layout overflow at 375px, or broken links
- Acceptance: npm run build exits 0, zero console errors on all pages

## Start
Read AGENTS.md first (it already exists — do not overwrite it).
Then begin Task 0.