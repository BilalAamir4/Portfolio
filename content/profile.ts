import type { Profile } from "./schema.ts";

const lead =
  "I'm a third-year IT student at Bahria University in Islamabad, working toward AI engineering. Most of my time goes into RAG pipelines and agents built with LangChain and LangGraph.";

export const profile: Profile = {
  name: "Bilal Aamir",
  meta: {
    title: "Bilal Aamir, AI engineer",
    description: lead,
  },
  hero: {
    headline: "I build retrieval systems, then test whether they find the right answer.",
    lead,
  },
  nav: [
    { label: "Work", sectionId: "work" },
    { label: "Earlier work", sectionId: "earlier" },
    { label: "Background", sectionId: "background" },
    { label: "Contact", sectionId: "contact" },
  ],
  ui: {
    sectionsNav: "Sections",
    backToAllWork: "Back to all work",
    readCaseStudy: "Read the case study",
    viewRepository: "View the repository",
    openLiveDemo: "Open the live demo",
    runReview: "Run a review",
  },
  work: { heading: "Selected work" },
  earlier: {
    heading: "Earlier work",
    intro:
      "Machine learning and NLP projects from before I moved to retrieval. Each one links to its repository.",
  },
  background: {
    heading: "Background",
    education: {
      heading: "Education",
      text: "BS Information Technology, Bahria University Islamabad. Graduating in 2027 with a CGPA of 3.63 out of 4.0 so far.",
    },
    experience: {
      heading: "Experience",
      text: "Remote ML and AI internship at Zynxis: a weekly program that went from data analysis through classification, regression, clustering and NLP to deployment, and ended with an FAQ bot.",
    },
    certificates: {
      heading: "Certificates",
      items: [
        {
          name: null,
          issuer: "DeepLearning.AI",
          url: "https://coursera.org/share/34f2d5ef4070acd2f9a61f182f1d2334",
        },
        {
          name: null,
          issuer: "DeepLearning.AI",
          url: "https://coursera.org/share/712773fd156ec00beff0032736461611",
        },
        {
          name: null,
          issuer: "DeepLearning.AI",
          url: "https://coursera.org/share/8476c5dec1d619f60d6b35b7dbdae591",
        },
      ],
    },
    skills: {
      heading: "What I work with",
      text: "Python, LangChain and LangGraph for pipelines and agents. FAISS and BGE-M3 for retrieval, faster-whisper for speech, Ollama for local models, FastAPI for serving. PyTorch and scikit-learn underneath.",
    },
  },
  notFound: {
    title: "Page not found",
    heading: "Nothing lives at this address.",
    text: "The page may have moved, or the project behind it is not published yet. Everything that is public is on the home page.",
  },
  contact: {
    intro: "I'm looking for an AI engineering internship. The fastest way to reach me is email.",
    email: "bilalaamirr@gmail.com",
    links: [
      { label: "GitHub", href: "https://github.com/BilalAamir4" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/bilalaamir4" },
    ],
    resume: { label: null, href: null },
  },
  footer: "Bilal Aamir, Islamabad, 2026",
};
