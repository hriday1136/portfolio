"use client";

import { cn } from "@/lib/cn";

type EpochOSVisualProps = {
  active: boolean;
};

const nodes = [
  { id: "user", label: "User", x: 50, y: 10 },
  { id: "os", label: "EpochOS", x: 50, y: 42 },
  { id: "files", label: "Files", x: 14, y: 82 },
  { id: "llm", label: "Local LLM", x: 38, y: 88 },
  { id: "memory", label: "Memory", x: 62, y: 88 },
  { id: "flow", label: "Workflows", x: 86, y: 82 },
];

export function EpochOSVisual({ active }: EpochOSVisualProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-full w-full"
      role="img"
      aria-label="EpochOS system map from user through EpochOS to files, local LLM, memory, and workflows"
    >
      <defs>
        <linearGradient id="epoch-line" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#5E8BFF" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#5E8BFF" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      {["files", "llm", "memory", "flow"].map((id, index) => {
        const target = nodes.find((node) => node.id === id);
        if (!target) return null;
        return (
          <line
            key={id}
            x1="50"
            y1="42"
            x2={target.x}
            y2={target.y - 8}
            stroke="#7AA2FF"
            strokeWidth="0.55"
            className={cn(active && "origin-top")}
            style={{
              strokeDasharray: 40,
              strokeDashoffset: active ? 0 : 40,
              transition: `stroke-dashoffset 1.1s ${0.15 * index}s ease`,
            }}
          />
        );
      })}
      <line
        x1="50"
        y1="16"
        x2="50"
        y2="34"
        stroke="#5E8BFF"
        strokeWidth="0.55"
        style={{
          strokeDasharray: 24,
          strokeDashoffset: active ? 0 : 24,
          transition: "stroke-dashoffset 0.8s ease",
        }}
      />
      {nodes.map((node, index) => (
        <g
          key={node.id}
          style={{
            opacity: active ? 1 : 0.35,
            transition: `opacity 0.6s ${0.08 * index}s ease`,
          }}
        >
          <circle
            cx={node.x}
            cy={node.y}
            r={node.id === "os" ? 8.2 : 6.2}
            fill={node.id === "os" ? "rgba(94,139,255,0.16)" : "#0C111B"}
            stroke={node.id === "os" ? "#5E8BFF" : "rgba(244,246,248,0.2)"}
            strokeWidth="0.4"
          />
          <text
            x={node.x}
            y={node.y + 0.8}
            textAnchor="middle"
            fill="#F4F6F8"
            fontSize="3.4"
            fontFamily="ui-monospace, monospace"
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
