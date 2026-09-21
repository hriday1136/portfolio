export type Experience = {
  id: string
  role: string
  org: string
  location: string
  dates: string
  summary: string
  points: string[]
  metrics: { value: string; label: string }[]
};

export const experience: Experience[] = [
  {
    id: "rcsb",
    role: "Scientific Software Research Assistant",
    org: "RCSB Protein Data Bank",
    location: "New Brunswick, NJ",
    dates: "Jul. 2026 — Present",
    summary:
      "Building LLM-facing scientific software on top of the PDB search API, with an emphasis on correctness under composition.",
    points: [
      "Shipped an MCP server tool that exposes PDB search to LLM agents, composing filter nodes from seven extended tools through a custom validation layer so multi-service AND/OR queries resolve in a single call.",
      "Fixed two silent data-corruption bugs in result-grouping by tracing parameter flow against the tool’s own docstrings — stopping invalid API parameters and user configurations before they formed.",
    ],
    metrics: [],
  },
  {
    id: "surf",
    role: "Summer Research Fellow (CSI SURF)",
    org: "Rutgers Artificial Intelligence and Data Science Collaboratory",
    location: "New Brunswick, NJ",
    dates: "May 2026 — Jul. 2026",
    summary:
      "Research software for molecular-structure compression, from column typing through floating-point encoding.",
    points: [
      "Replaced a dictionary-driven column-typing model in py-mmcif’s compression pipeline with automatic detection and a value-scanning classifier, cutting molecular structure file size by 27% and removing that dependency.",
      "Worked with four researchers on binary encoding-chain algorithms, reducing compressed structure file sizes by up to 76% across 37 PDB structures by optimizing floating-point encoding.",
    ],
    metrics: [
      { value: "27%", label: "File size reduction" },
      { value: "76%", label: "Compression improvement" },
      { value: "37", label: "PDB structures" },
    ],
  },
];
