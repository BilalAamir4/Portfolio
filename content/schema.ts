/**
 * Types for everything in content/.
 *
 * Conventions
 * - A value that was a [BRACKETED PLACEHOLDER] in the mockups is `null`.
 *   Components never render `null` as text.
 * - Each project file starts with a `facts` object whose keys match the
 *   "Portfolio facts" JSON in the project's README exactly
 *   (docs/build/readme-facts-templates.md). The facts-sync prompt edits only
 *   that object; copy that quotes a fact is built from it.
 * - Content files import each other with explicit `.ts` extensions and use
 *   only erasable TypeScript, so scripts/check-content.mjs can load them
 *   under plain Node.
 */

export type Url = string;

export type PageMeta = {
  /** Page's own part of the title; layout adds " | <name>". */
  title: string;
  description: string;
};

export type TextLink = {
  label: string;
  href: Url;
};

/** Both fields must be present for the link to render. */
export type OptionalLink = {
  label: string | null;
  href: Url | null;
};

export type NavItem = {
  label: string;
  sectionId: string;
};

/* ------------------------------------------------------------------ */
/* Profile                                                             */
/* ------------------------------------------------------------------ */

export type Certificate = {
  /** Rendered only when name and url are both present. */
  name: string | null;
  issuer: string;
  url: Url | null;
};

export type Profile = {
  name: string;
  /** Home page metadata. Home uses `title` as an absolute title. */
  meta: PageMeta;
  hero: {
    headline: string;
    lead: string;
  };
  nav: NavItem[];
  /** Labels reused across pages. */
  ui: {
    backToAllWork: string;
    readCaseStudy: string;
    viewRepository: string;
    openLiveDemo: string;
    runReview: string;
  };
  work: { heading: string };
  earlier: { heading: string; intro: string };
  background: {
    heading: string;
    education: { heading: string; text: string };
    experience: { heading: string; text: string };
    certificates: { heading: string; items: Certificate[] };
    skills: { heading: string; text: string };
  };
  contact: {
    intro: string;
    email: string;
    links: TextLink[];
    /** The PDF lives at public/resume.pdf once supplied. */
    resume: OptionalLink;
  };
  footer: string;
};

/* ------------------------------------------------------------------ */
/* Shared project pieces                                               */
/* ------------------------------------------------------------------ */

export type ProjectSlug = "insightex" | "agentic-rag" | "planted-note" | "agent";

/** A short highlighted fact beside a project on the home page. */
export type Highlight = {
  figure: string;
  text: string;
};

/** A row in a "what / why" or "decision" list on a case study. */
export type ExplainedRow = {
  what: string;
  why: string;
};

/** Steps of a pipeline diagram with a note per step. */
export type RunStep = {
  label: string;
  note: string;
};

export type BulletSection = {
  heading: string;
  items: string[];
};

/* ------------------------------------------------------------------ */
/* Insightex                                                           */
/* ------------------------------------------------------------------ */

export type StageStatus = "Built" | "In progress" | "Planned";

export type InsightexFacts = {
  status: string;
  /** The owner's part of the work. Hidden until supplied. */
  roleLine: string | null;
  transcribeSeconds: number;
  lectureSeconds: number;
  answerLatencyText: string;
  stages: { name: string; status: StageStatus }[];
  worksToday: string[];
  stillHard: string[];
};

export type LectureQuestion = {
  text: string;
  /** Indices of the three best windows, best first. */
  top: [number, number, number];
};

export type InsightexProject = InsightexFacts & {
  key: "insightex";
  slug: "insightex";
  name: string;
  published: boolean;
  repoUrl: Url;
  meta: PageMeta;
  home: {
    /** e.g. "Final-year project, in development" */
    statusLine: string;
    summary: string;
    highlights: Highlight[];
  };
  /** Home hero demo (LectureDemo). */
  heroDemo: {
    heading: string;
    caption: string;
    questionsLabel: string;
    windowSeconds: number;
    windowCount: number;
    questions: LectureQuestion[];
    /**
     * Illustrative bar heights in percent, from the mockup script: the three
     * top windows get `top`, every other window
     * base + ((index * mixIndex + question * mixQuestion) % spread).
     */
    scores: {
      top: [number, number, number];
      base: number;
      spread: number;
      mixIndex: number;
      mixQuestion: number;
      /** Height of every bar during the first step. */
      resting: number;
    };
    status: { rewriting: string; scoring: string; found: string };
    /** Clock labels under the timeline: "0:00" and "11:28". */
    startLabel: string;
    endLabel: string;
    timelineCaption: string;
    jumpLabel: string;
    /** "{start} to {end}" */
    citationTemplate: string;
  };
  caseStudy: {
    introLine: string;
    lead: string;
    problem: { heading: string; paragraphs: string[] };
    pipeline: {
      heading: string;
      intro: string;
      groupLabel: string;
      /** Stage shown first. Must match a name in `stages`. */
      defaultStage: string;
      /** Matched to `stages` by name. */
      details: { name: string; what: string; tools: string }[];
      note: string;
    };
    memory: {
      heading: string;
      paragraphs: string[];
      cardGb: number;
      ariaLabel: string;
      bars: { label: string; gb: number; tone: "moss" | "ink" }[];
      caption: string;
    };
    decisions: {
      heading: string;
      intro: string;
      rows: { question: string; found: string; kept: string }[];
    };
    worksTodayHeading: string;
    stillHardHeading: string;
  };
};

/* ------------------------------------------------------------------ */
/* Agentic RAG Docs Assistant (home entry only)                        */
/* ------------------------------------------------------------------ */

export type RagResult = {
  variant: string;
  faithfulness: number;
  answerRelevancy: number;
  contextPrecision: number;
  contextRecall: number;
  medianLatencySeconds: number;
};

export type AgenticRagFacts = {
  status: string;
  liveDemoUrl: Url;
  evalSetSize: number | null;
  headline: string | null;
  /** Filled only when every variant has every metric. Otherwise null. */
  results: RagResult[] | null;
};

export type RagVariant = {
  name: string;
  /** One flag per entry in `switcher.steps`. */
  on: boolean[];
  fresh: boolean[];
  note: string;
};

export type AgenticRagProject = AgenticRagFacts & {
  key: "agentic-rag";
  slug: "agentic-rag";
  name: string;
  published: boolean;
  hasCaseStudy: false;
  repoUrl: Url;
  home: {
    summary: string;
    /** Shown instead of the table while `results` is null. */
    resultsPending: string;
  };
  switcher: {
    groupLabel: string;
    steps: string[];
    variants: RagVariant[];
  };
  resultsColumns: {
    variant: string;
    faithfulness: string;
    answerRelevancy: string;
    contextPrecision: string;
    contextRecall: string;
    medianLatency: string;
    /** "{n} s" */
    latencyTemplate: string;
    /** Decimal places for RAGAS scores. */
    scoreDecimals: number;
  };
};

/* ------------------------------------------------------------------ */
/* Planted Note                                                        */
/* ------------------------------------------------------------------ */

export type DefenseSetup = {
  name: string;
  rawLeaks: number;
  finalLeaks: number;
};

export type PlantedNoteFacts = {
  status: string;
  name: string;
  repoUrl: Url;
  model: string;
  trialsPerSetup: number;
  setups: DefenseSetup[];
};

export type PlantedNoteProject = PlantedNoteFacts & {
  key: "planted-note";
  slug: "planted-note";
  published: boolean;
  meta: PageMeta;
  home: {
    statusLine: string;
    summary: string;
    groupLabel: string;
    /** Setup names (from `setups`) offered as the two home pills. */
    modes: [string, string];
    question: { label: string; text: string };
    retrieved: { label: string; text: string };
    leaked: { label: string; text: string };
    blocked: { label: string; text: string };
    caption: string;
  };
  caseStudy: {
    introLine: string;
    lead: string;
    attack: {
      heading: string;
      paragraphs: string[];
      figureCaption: string;
      plantedNote: string;
    };
    defenses: {
      heading: string;
      intro: string;
      groupLabel: string;
      rawLabel: string;
      finalLabel: string;
      /** "{n} of {total} contained the attack" */
      countTemplate: string;
      /** Matched to `setups` by name. */
      outcomes: { name: string; head: string; body: string }[];
    };
    numbers: { heading: string; paragraphs: string[] };
    ownErrors: BulletSection;
    built: { heading: string; rows: ExplainedRow[]; stack: string };
    next: BulletSection;
  };
};

/* ------------------------------------------------------------------ */
/* Agent project                                                       */
/* ------------------------------------------------------------------ */

export type AgentResult = {
  version: string;
  recallPct: number | null;
  precisionPct: number | null;
  falseAlarmsPerCleanPr: number | null;
  costPerReviewUsd: number | null;
  medianSeconds: number | null;
};

export type AgentFacts = {
  name: string | null;
  /** Lowercase letters and hyphens; the page is /work/<slug>. */
  slug: string | null;
  repoUrl: Url | null;
  demoUrl: Url | null;
  homeHeadline: string | null;
  datasetSize: number | null;
  runsPerConfig: number | null;
  resultsHeadline: string | null;
  results: AgentResult[];
  smallVsLargeLine: string | null;
  caught: { bug: string | null; comment: string | null };
  missed: { bug: string | null; why: string | null };
  limitsLine: string | null;
  injectionResultLine: string | null;
  costliestAgentLine: string | null;
  stackLine: string | null;
};

export type AgentProject = AgentFacts & {
  key: "agent";
  published: boolean;
  meta: { description: string };
  home: {
    statusLine: string;
    summary: string;
    steps: RunStep[];
  };
  caseStudy: {
    introLine: string;
    lead: string;
    question: {
      heading: string;
      paragraph: string;
      /** "{n}" is datasetSize. */
      datasetTemplate: string;
    };
    run: {
      heading: string;
      /** Steps 2 and 3 label the specialist and worker groups. */
      steps: RunStep[];
      specialists: { name: string; detail: string }[];
      workers: string[];
    };
    results: {
      heading: string;
      /** "{n}" is runsPerConfig. */
      runsTemplate: string;
      columns: {
        version: string;
        recall: string;
        precision: string;
        falseAlarms: string;
        cost: string;
        time: string;
      };
    };
    caughtHeading: string;
    missedHeading: string;
    production: {
      heading: string;
      /** `detail` comes from a fact and is appended after `how`. */
      rows: { what: string; how: string | null; detail: string | null }[];
    };
  };
};

/* ------------------------------------------------------------------ */
/* Earlier work                                                        */
/* ------------------------------------------------------------------ */

export type EarlierProject = {
  name: string;
  href: Url;
  line: string;
};

/* ------------------------------------------------------------------ */
/* Publishing rules (read by scripts/check-content.mjs)                */
/* ------------------------------------------------------------------ */

/**
 * Fields that may stay null on a published project (spec section 8).
 * Every other null on a published project fails the build.
 * Paths are dot-separated from the project root.
 */
export const optionalWhenPublished: Record<ProjectSlug, readonly string[]> = {
  insightex: ["roleLine"],
  "agentic-rag": ["results", "evalSetSize", "headline"],
  "planted-note": [],
  agent: [],
};
