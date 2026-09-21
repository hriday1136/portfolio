export type ProjectMetric = {
  value: string;
  label: string;
};

export type Project = {
  id: string
  index: string
  name: string
  subtitle: string
  stack: string
  summary: string
  details: string[]
  metrics: ProjectMetric[]
  atmosphere: "navy" | "indigo" | "ice"
};

export const projects: Project[] = [
  {
    id: "epochos",
    index: "01",
    name: "EpochOS",
    subtitle: "AI-Native Local System Layer",
    stack: "React · Tailwind CSS · Tauri · Node.js",
    summary:
      "A local-first system layer that turns ordinary OS work into autonomous workflows — running against OpenAI or offline models through Ollama.",
    details: [
      "Desktop shell built with Tauri, React, and Tailwind, with a 90% smaller build than comparable apps.",
      "Memory engine on ChromaDB with OpenAI embeddings and RAG for faster retrieval.",
      "System-level file I/O automates 15+ repetitive workflows, with local storage sized for large user state.",
    ],
    metrics: [
      { value: "90%", label: "Smaller build" },
      { value: "40%", label: "Workflow efficiency" },
      { value: "65%", label: "Faster retrieval" },
      { value: "15+", label: "Automated workflows" },
    ],
    atmosphere: "navy",
  },
  {
    id: "clausewatch",
    index: "02",
    name: "ClauseWatch",
    subtitle: "AI-Powered Contract Intelligence SaaS",
    stack: "Next.js · FastAPI · PostgreSQL · OpenAI",
    summary:
      "An LLM contract-extraction pipeline with per-field confidence scoring across PDF and DOCX — designed as production software, not a demo.",
    details: [
      "Five independently secured HMAC token systems (webhooks, downloads, password reset, email verification, cron auth), each with a dedicated secret and constant-time comparison.",
      "Tenant-scoped queries at the ORM layer on every API endpoint, verified by six integration tests with zero cross-tenant leakage.",
      "Nine zero-downtime Alembic migrations, including isolated handling of Postgres enum constraints that autogeneration cannot safely emit.",
    ],
    metrics: [
      { value: "5", label: "HMAC token systems" },
      { value: "6", label: "Isolation tests" },
      { value: "9", label: "Zero-downtime migrations" },
      { value: "PDF/DOCX", label: "Extraction formats" },
    ],
    atmosphere: "indigo",
  },
  {
    id: "accessforge",
    index: "03",
    name: "AccessForge",
    subtitle: "Accessibility Remediation Pipeline",
    stack: "FastAPI · LangGraph · PostgreSQL · Redis/RQ · Docker",
    summary:
      "An end-to-end remediation platform that scans React apps, generates and independently verifies WCAG fixes, and opens GitHub pull requests.",
    details: [
      "Crash-recoverable async pipeline on PostgreSQL-backed state and Redis/RQ workers — a real worker crash resumed with zero duplicate branches or lost progress.",
      "100% build-pass, first-attempt-fix, and regression-free rates on fully verified LLM-assisted patches across 20 accessibility benchmarks in 6 WCAG categories.",
      "Confidence-gated source localization defers to human review instead of guessing. ElevenLabs TTS delivers audio summaries in 10+ languages. Auth via Google OAuth with encrypted document storage.",
    ],
    metrics: [
      { value: "100%", label: "Build-pass / first-attempt / regression-free" },
      { value: "20", label: "Benchmark cases" },
      { value: "6", label: "WCAG categories" },
      { value: "10+", label: "Languages" },
    ],
    atmosphere: "ice",
  },
];
