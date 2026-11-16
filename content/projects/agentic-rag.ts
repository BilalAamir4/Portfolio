import type { AgenticRagFacts, AgenticRagProject } from "../schema.ts";

/**
 * Facts from the "Portfolio facts" block in the Agentic RAG Docs Assistant
 * README. The facts-sync prompt edits only this object. `results` stays null
 * until all three variants have every metric.
 */
const facts: AgenticRagFacts = {
  status: "In development",
  liveDemoUrl: "https://agentic-rag-docs-assistant.vercel.app",
  evalSetSize: null,
  headline: null,
  results: null,
};

export const agenticRag: AgenticRagProject = {
  ...facts,
  key: "agentic-rag",
  slug: "agentic-rag",
  name: "Agentic RAG Docs Assistant",
  published: true,
  hasCaseStudy: false,
  repoUrl: "https://github.com/BilalAamir4/Agentic-RAG-Docs-Assistant",
  home: {
    summary:
      'A documentation assistant built three ways and scored on one evaluation set, so the question "is the agentic version worth it?" gets a number instead of an opinion.',
    resultsPending: "The comparison table goes here once the evaluation runs are finished.",
  },
  switcher: {
    groupLabel: "Pipeline variant",
    steps: ["Question", "Retrieve", "Grade passages", "Rewrite question", "Generate", "Check the answer"],
    variants: [
      {
        name: "Baseline",
        on: [true, true, false, false, true, false],
        fresh: [false, false, false, false, false, false],
        note: "Baseline, a plain LangChain chain: retrieve the closest passages and write an answer from them. Fast, and it has no way to notice a bad retrieval.",
      },
      {
        name: "Corrective RAG",
        on: [true, true, true, true, true, false],
        fresh: [false, false, true, true, false, false],
        note: "Corrective RAG, a LangGraph graph: a grader checks whether the retrieved passages are relevant. If they are not, the question is rewritten and retrieval runs again before anything is generated.",
      },
      {
        name: "Self-RAG",
        on: [true, true, true, true, true, true],
        fresh: [false, false, false, false, false, true],
        note: "Self-RAG adds a check after generation: is the answer supported by the passages, and does it answer the question? If not, the graph loops back instead of returning it.",
      },
    ],
  },
  resultsColumns: {
    variant: "Variant",
    faithfulness: "Faithfulness",
    answerRelevancy: "Answer relevancy",
    contextPrecision: "Context precision",
    contextRecall: "Context recall",
    medianLatency: "Median latency",
  },
};
