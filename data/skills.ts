export type SkillGroup = {
  id: string
  label: string
  items: string[]
};

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    label: "Languages",
    items: [
      "Python",
      "Java",
      "C",
      "PHP",
      "JavaScript",
      "React",
      "Next.js",
      "SQL",
      "HTML/CSS",
      "Rust",
    ],
  },
  {
    id: "frameworks",
    label: "Frameworks / Libraries",
    items: [
      "Tailwind CSS",
      "Tauri",
      "Flask",
      "FastAPI",
      "SciKit-Learn",
      "Pandas",
    ],
  },
  {
    id: "tools",
    label: "Tools / Infrastructure",
    items: [
      "VS Code",
      "IntelliJ",
      "Git",
      "Docker",
      "WSL",
      "Alembic",
      "Neon",
      "Cloudflare",
      "MCP",
    ],
  },
];
