# README "Portfolio facts" blocks

Add the matching block to each project's `README.md`, under a heading written exactly `## Portfolio facts`. Fill in real values. Leave a value as `null` if you don't have it yet. Prompt 5 reads only this block, so anything you want on the site has to be in it.

Rules for values: numbers without units or percent signs, percentages as 0 to 100, plain sentences with no square brackets, full `https://` URLs.

## Insightex

```json
{
  "status": "In development",
  "roleLine": null,
  "transcribeSeconds": 78,
  "lectureSeconds": 688,
  "answerLatencyText": "About one second",
  "stages": [
    { "name": "Ingest", "status": "Built" },
    { "name": "Transcribe", "status": "Built" },
    { "name": "Window and embed", "status": "Built" },
    { "name": "Ask", "status": "Built" },
    { "name": "Extract concepts", "status": "In progress" },
    { "name": "Graph and router", "status": "Planned" },
    { "name": "Link the textbook", "status": "Planned" }
  ],
  "worksToday": null,
  "stillHard": null
}
```

`status` for a stage is one of `Built`, `In progress`, `Planned`. `worksToday` and `stillHard` are lists of sentences; `null` keeps what the site already says.

## Agentic RAG Docs Assistant

```json
{
  "status": "In development",
  "liveDemoUrl": "https://agentic-rag-docs-assistant.vercel.app",
  "evalSetSize": null,
  "headline": null,
  "results": [
    { "variant": "Baseline", "faithfulness": null, "answerRelevancy": null, "contextPrecision": null, "contextRecall": null, "medianLatencySeconds": null },
    { "variant": "Corrective RAG", "faithfulness": null, "answerRelevancy": null, "contextPrecision": null, "contextRecall": null, "medianLatencySeconds": null },
    { "variant": "Self-RAG", "faithfulness": null, "answerRelevancy": null, "contextPrecision": null, "contextRecall": null, "medianLatencySeconds": null }
  ]
}
```

RAGAS scores as 0 to 1, exactly as RAGAS reports them. `headline` is one sentence saying which variant won and by how much. The table appears on the site only when every cell is filled.

## Planted Note

```json
{
  "status": "Being finalized",
  "name": "Planted Note",
  "repoUrl": "https://github.com/BilalAamir4/Rag-Prompt-Injection-Security",
  "model": "Llama 3.1",
  "trialsPerSetup": 10,
  "setups": [
    { "name": "No defenses", "rawLeaks": 10, "finalLeaks": 10 },
    { "name": "Mark retrieved text as untrusted", "rawLeaks": 9, "finalLeaks": 9 },
    { "name": "Strip suspicious phrases", "rawLeaks": 10, "finalLeaks": 10 },
    { "name": "Both together", "rawLeaks": 9, "finalLeaks": 9 },
    { "name": "Everything on", "rawLeaks": 9, "finalLeaks": 0 }
  ]
}
```

If you rerun the tests or rename the project, change the values here and run prompt 5.

## Agent project

Every key is required before the project is published.

```json
{
  "name": null,
  "slug": null,
  "repoUrl": null,
  "demoUrl": null,
  "homeHeadline": null,
  "datasetSize": null,
  "runsPerConfig": null,
  "resultsHeadline": null,
  "results": [
    { "version": "One agent", "recallPct": null, "precisionPct": null, "falseAlarmsPerCleanPr": null, "costPerReviewUsd": null, "medianSeconds": null },
    { "version": "Orchestrator calling specialists", "recallPct": null, "precisionPct": null, "falseAlarmsPerCleanPr": null, "costPerReviewUsd": null, "medianSeconds": null },
    { "version": "Plus spawned workers", "recallPct": null, "precisionPct": null, "falseAlarmsPerCleanPr": null, "costPerReviewUsd": null, "medianSeconds": null },
    { "version": "Plus verifier", "recallPct": null, "precisionPct": null, "falseAlarmsPerCleanPr": null, "costPerReviewUsd": null, "medianSeconds": null }
  ],
  "smallVsLargeLine": null,
  "caught": { "bug": null, "comment": null },
  "missed": { "bug": null, "why": null },
  "limitsLine": null,
  "injectionResultLine": null,
  "costliestAgentLine": null,
  "stackLine": null
}
```

`slug` is lowercase letters and hyphens only; it becomes the page address `/work/<slug>`. `homeHeadline` is the one sentence with the headline result shown on the home page. `resultsHeadline` is the sentence above the results table.
