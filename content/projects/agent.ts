import type { AgentFacts, AgentProject } from "../schema.ts";

/**
 * Facts from the "Portfolio facts" block in the agent project's README.
 * The facts-sync prompt edits only this object. Every key is required
 * before the project can be published.
 *
 * Draft for `stackLine`, from the mockup, to confirm against what was
 * actually used: "LangChain and LangGraph for the agents, LangSmith for
 * tracing and evaluation, FastAPI for the webhook, Docker for the sandbox."
 */
const facts: AgentFacts = {
  name: null,
  slug: null,
  repoUrl: null,
  demoUrl: null,
  homeHeadline: null,
  datasetSize: null,
  runsPerConfig: null,
  resultsHeadline: null,
  results: [
    { version: "One agent", recallPct: null, precisionPct: null, falseAlarmsPerCleanPr: null, costPerReviewUsd: null, medianSeconds: null },
    { version: "Orchestrator calling specialists", recallPct: null, precisionPct: null, falseAlarmsPerCleanPr: null, costPerReviewUsd: null, medianSeconds: null },
    { version: "Plus spawned workers", recallPct: null, precisionPct: null, falseAlarmsPerCleanPr: null, costPerReviewUsd: null, medianSeconds: null },
    { version: "Plus verifier", recallPct: null, precisionPct: null, falseAlarmsPerCleanPr: null, costPerReviewUsd: null, medianSeconds: null },
  ],
  smallVsLargeLine: null,
  caught: { bug: null, comment: null },
  missed: { bug: null, why: null },
  limitsLine: null,
  injectionResultLine: null,
  costliestAgentLine: null,
  stackLine: null,
};

const lead =
  "A team of agents that reviews a pull request. One plans the review, calls specialist reviewers, spawns extra workers for large changes, and waits for a person before posting anything.";

export const agent: AgentProject = {
  ...facts,
  key: "agent",
  published: false,
  meta: { description: lead },

  home: {
    // Template wording from the mockup. Replace before publishing.
    statusLine: "Planned. Template entry, fill in when built",
    summary:
      "A pull request reviewer built from several agents. An orchestrator calls specialist reviewers, spawns extra workers for large changes, and a person approves before anything is posted.",
    steps: [
      { label: "Pull request", note: "A pull request arrives." },
      { label: "Orchestrator plans", note: "The orchestrator reads the diff and decides which reviewers it needs." },
      { label: "Specialists called", note: "It calls the standing specialists: bugs, security and tests." },
      { label: "Workers spawned", note: "The diff is large, so it spawns one temporary worker per file." },
      { label: "Verifier filters", note: "A verifier re-reads every finding against the code and drops the weak ones." },
      { label: "Person approves", note: "The run pauses. A person approves, edits or rejects each finding." },
      { label: "Comments posted", note: "Approved findings are posted as review comments. Press the button to watch a run." },
    ],
  },

  caseStudy: {
    // Template wording from the mockup. Replace before publishing.
    introLine: "Template page. Every value in square brackets gets filled in once the project is built.",
    lead,
    question: {
      heading: "The question",
      paragraph:
        "Multi-agent systems are easy to build and hard to justify. This project asks one thing: does splitting a code review across several agents find more real bugs than a single agent, and what does it cost in money and time?",
      datasetTemplate:
        "To answer it, {n} pull requests were prepared with known bugs planted in them, and each version of the reviewer was scored on how many it found.",
    },
    run: {
      heading: "How a review runs",
      steps: [
        { label: "Pull request", note: "A pull request arrives." },
        { label: "Orchestrator: reads the diff, plans the review", note: "The orchestrator reads the diff and decides which reviewers it needs." },
        { label: "Called: three standing specialists", note: "It calls the standing specialists. They already exist and have fixed jobs." },
        { label: "Spawned: one temporary worker per file, only for large changes", note: "The change is large, so it creates one temporary worker per file." },
        { label: "Verifier: drops weak findings", note: "A verifier checks every finding against the code and drops the weak ones." },
        { label: "A person approves, edits or rejects", note: "The run pauses here until a person decides." },
        { label: "Comments posted", note: "Approved findings are posted. Press the button to watch a run." },
      ],
      specialists: [
        { name: "Bug reviewer", detail: "logic errors and edge cases" },
        { name: "Security reviewer", detail: "its own service, called over A2A" },
        { name: "Test reviewer", detail: "runs the tests in a sandbox" },
      ],
      workers: ["Worker for file 1", "Worker for file 2", "Worker for file 3", "as many as needed"],
    },
    results: {
      heading: "Results",
      runsTemplate: "Each version ran {n} times on the full set.",
      columns: {
        version: "Version",
        recall: "Bugs found",
        precision: "Findings that were real",
        falseAlarms: "False alarms per clean PR",
        cost: "Cost per review",
        time: "Time per review",
      },
    },
    caughtHeading: "One it caught",
    missedHeading: "One it missed",
    production: {
      heading: "Built to run unattended",
      rows: [
        {
          what: "Limits on every agent",
          how: "A cap on steps, tokens and time. A review that hits a cap ends with a clear partial result.",
          detail: facts.limitsLine,
        },
        {
          what: "Resumes after a crash",
          how: "State is saved after every step, so a stopped or paused review picks up where it left off.",
          detail: null,
        },
        {
          what: "Nothing posted without approval",
          how: "The run pauses before posting and a person approves, edits or rejects each finding.",
          detail: null,
        },
        {
          what: "Code runs in a sandbox",
          how: "Tests from a pull request run in a container with no network and a read-only copy of the code.",
          detail: null,
        },
        {
          what: "Diffs are treated as untrusted",
          how: "Instructions hidden in comments were planted to try to steer the reviewer.",
          detail: facts.injectionResultLine,
        },
        {
          what: "Cost is tracked per agent",
          how: null,
          detail: facts.costliestAgentLine,
        },
      ],
    },
  },
};
