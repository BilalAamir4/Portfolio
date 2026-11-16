import type { InsightexFacts, InsightexProject } from "../schema.ts";
import { articleFor, clock, lowerFirst } from "../../lib/format.ts";

/**
 * Facts from the "Portfolio facts" block in the Insightex README.
 * The facts-sync prompt edits only this object.
 */
const facts: InsightexFacts = {
  status: "In development",
  roleLine: null,
  transcribeSeconds: 78,
  lectureSeconds: 688,
  answerLatencyText: "About one second",
  stages: [
    { name: "Ingest", status: "Built" },
    { name: "Transcribe", status: "Built" },
    { name: "Window and embed", status: "Built" },
    { name: "Ask", status: "Built" },
    { name: "Extract concepts", status: "In progress" },
    { name: "Graph and router", status: "Planned" },
    { name: "Link the textbook", status: "Planned" },
  ],
  worksToday: [
    "Paste a link or upload a video and watch it process.",
    "An 11-minute lecture is transcribed in 78 seconds.",
    "Ask in English or Roman Urdu and get three timestamps in about a second. Each one seeks the player.",
    "Jobs survive a crash and resume where they stopped.",
  ],
  stillHard: [
    "Concept extraction is weak so far: both models scored an F1 near 0.3 on the development lecture. The run on a second, unseen lecture is next.",
    'Deciding what counts as "a concept" is hard for people too. Two of us labelling the same windows agreed at an F1 of 0.24 under strict name matching.',
    "Retrieval has been measured on one lecture. More lectures and more speakers come before any accuracy claim.",
  ],
};

const context = "Final-year project";
const windowSeconds = 30;
const windowCount = Math.ceil(facts.lectureSeconds / windowSeconds);
const minutes = Math.floor(facts.lectureSeconds / 60);

const lead =
  "Ask a question about a lecture video and land on the moment that answers it, even when the lecturer keeps switching between Hindi or Urdu and English.";

export const insightex: InsightexProject = {
  ...facts,
  key: "insightex",
  slug: "insightex",
  name: "Insightex",
  published: true,
  repoUrl: "https://github.com/BilalAamir4/Insightex-ASR-Hybrid-RAG-FYP",
  meta: { title: "Insightex", description: lead },

  home: {
    statusLine: `${context}, ${lowerFirst(facts.status)}`,
    summary:
      "A searchable knowledge base for lecture videos that switch between Hindi or Urdu and English. You ask a question and it sends you to the exact moment in the video that answers it.",
    highlights: [
      {
        figure: `${facts.transcribeSeconds} seconds`,
        text: `to transcribe ${articleFor(minutes)} ${minutes}-minute lecture on an 8 GB graphics card.`,
      },
      {
        figure: facts.answerLatencyText,
        text: "from question to three timestamps that seek the video.",
      },
      {
        figure: "Every model chosen by a test",
        text: "with the pass rule written down before the run.",
      },
    ],
  },

  heroDemo: {
    heading: "Ask a lecture a question",
    caption: "How Insightex answers. An illustration of the steps, not recorded output.",
    questionsLabel: "Sample questions",
    windowSeconds,
    windowCount,
    questions: [
      { text: "What is batch learning?", top: [2, 3, 8] },
      { text: "Why does batch learning struggle with big data?", top: [9, 10, 5] },
      { text: "Online learning kya hoti hai?", top: [14, 15, 19] },
    ],
    scores: { top: [96, 84, 74], base: 16, spread: 34, mixIndex: 37, mixQuestion: 53, resting: 8 },
    status: {
      rewriting: "Rewriting the question into English, and keeping the original wording too.",
      scoring: `Scoring all ${windowCount} windows of the transcript against the question.`,
      found: "Three best windows found. Pick one and the video jumps there.",
    },
    startLabel: clock(0),
    endLabel: clock(facts.lectureSeconds),
    timelineCaption: `One ${minutes}-minute lecture, cut into ${windowCount} windows of ${windowSeconds} seconds`,
    jumpLabel: "Jump to",
    citationTemplate: "{start} to {end}",
  },

  caseStudy: {
    introLine: `${context}, ${lowerFirst(facts.status)}. Two-person team.`,
    lead,
    problem: {
      heading: "The problem",
      paragraphs: [
        "A recorded lecture is hard to revise from. You remember the teacher explained something, and finding it means scrubbing through an hour of video.",
        "Search tools built for English do badly here, because many lectures in Pakistan and India are spoken in a mix: a sentence starts in Urdu or Hindi and the technical terms arrive in English. Students also type questions in Roman Urdu. Insightex is built for that mix, and every answer points back to a timestamp so you can check it against the video.",
      ],
    },
    pipeline: {
      heading: "How a lecture becomes searchable",
      intro: "Pick a stage to see what it does and whether it is built yet.",
      groupLabel: "Pipeline stages",
      defaultStage: "Ask",
      details: [
        {
          name: "Ingest",
          what: "Takes an uploaded file or a video link, checks it, and normalises it to one video format plus a 16 kHz audio track. Odd codecs are rejected with a clear error.",
          tools: "ffmpeg and ffprobe, a SQLite job queue, one worker.",
        },
        {
          name: "Transcribe",
          what: "Turns the audio into a timestamped transcript in the language the lecture is spoken in. The user picks that language; nothing is auto-detected.",
          tools: `faster-whisper large-v3. A ${facts.lectureSeconds}-second lecture takes ${facts.transcribeSeconds} seconds.`,
        },
        {
          name: "Window and embed",
          what: "Cuts the transcript into fixed 30-second windows and stores a vector for each, so a question can be matched to a stretch of the video.",
          tools: "BGE-M3 embeddings in a FAISS index.",
        },
        {
          name: "Ask",
          what: "Rewrites the question into English, searches with both the rewrite and the original, merges the two rankings, and returns the top three windows as timestamps that seek the player.",
          tools: "A local model for the rewrite with a 2-second timeout. If it is slow, the original question is used alone.",
        },
        {
          name: "Extract concepts",
          what: "Reads each window and pulls out the concepts it explains and how they relate, as structured JSON checked against a schema.",
          tools: "Gemma 4 E4B through Ollama, scored against hand-labelled windows.",
        },
        {
          name: "Graph and router",
          what: "Builds a knowledge graph from the concepts and routes each question to the graph, the vector index, or both. The router stays only if it beats vector search on its own.",
          tools: "NetworkX for the graph.",
        },
        {
          name: "Link the textbook",
          what: "Matches moments in the lecture to pages of the course textbook, so an answer can cite a timestamp and a page.",
          tools: "PyMuPDF for page text and printed page numbers.",
        },
      ],
      note: "Reading slides and whiteboards from the video frames is an optional track. It runs only if a test on 30 frames passes, and it never blocks the speech pipeline.",
    },
    memory: {
      heading: "One 8 GB graphics card",
      paragraphs: [
        "The whole system runs locally on an RTX 3070. No two models fit in memory together, so each stage loads its model, does its work and unloads before the next one starts. A lease makes sure only one job holds the card.",
        "Questions are embedded on the CPU in about 50 milliseconds, which keeps the card free for the language model while someone is asking.",
      ],
      cardGb: 8,
      valueTemplate: "{n} GB",
      ariaLabel:
        "Peak graphics memory by stage, against an 8 GB limit: transcription 4.4 GB, embedding 1.1 GB, largest language model tested 7.7 GB",
      bars: [
        { label: "Transcription", gb: 4.4, tone: "moss" },
        { label: "Embedding the transcript", gb: 1.1, tone: "moss" },
        { label: "Largest language model tested", gb: 7.7, tone: "ink" },
      ],
      caption: "Peak memory per stage. The full width of each track is the card's 8 GB.",
    },
    decisions: {
      heading: "Decisions, and what decided them",
      intro:
        "Each choice below was a test with its pass rule written before the run. When two options tie, the simpler or smaller one stays.",
      rows: [
        {
          question: "Which speech model?",
          found:
            "Four setups on a full lecture. The medium model dropped 21.9% of the speech, and with auto-detect it translated Hindi into English. Large-v3 with a fixed language dropped under 2%.",
          kept: "Large-v3, language set by the user",
        },
        {
          question: "Which embedding model?",
          found: "BGE-M3 against Qwen3-Embedding-0.6B on 28 questions. A tie.",
          kept: "BGE-M3",
        },
        {
          question: "How should the transcript be cut?",
          found:
            "A fixed 30-second grid against overlapping windows and against snapping to sentence edges. Both ties.",
          kept: "The fixed grid",
        },
        {
          question: "Dense search alone, or dense plus keyword?",
          found: "Adding the sparse keyword signal did not change the result.",
          kept: "Dense only",
        },
        {
          question: "What about Roman Urdu questions?",
          found:
            "They lost three questions net against their English twins. Rewriting to English and merging both rankings turned that into a gain of two, with English unchanged.",
          kept: "Rewrite, then merge",
        },
        {
          question: "Which model reads the transcript?",
          found: "Qwen 3.5 against Gemma 4 E4B on hand-labelled windows. A tie.",
          kept: "Gemma, the smaller one",
        },
        {
          question: "Translate before extracting?",
          found:
            "Feeding the model an English translation instead of the original transcript made no difference.",
          kept: "The original, one step fewer",
        },
      ],
    },
    worksTodayHeading: "What works today",
    stillHardHeading: "What is still hard",
  },
};
