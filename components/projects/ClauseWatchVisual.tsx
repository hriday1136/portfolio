"use client";

import { cn } from "@/lib/cn";

type ClauseWatchVisualProps = {
  active: boolean;
};

const fields = ["Parties", "Dates", "Obligations", "Confidence", "Risks"];

export function ClauseWatchVisual({ active }: ClauseWatchVisualProps) {
  return (
    <div
      className="grid h-full grid-cols-1 gap-4 p-1 sm:grid-cols-[0.9fr_1.1fr] sm:gap-6"
      aria-label="Contract extraction interface showing a document and structured fields"
    >
      <div className="relative overflow-hidden rounded-sm border border-white/10 bg-[#0c111b]">
        <div className="flex items-center justify-between gap-3 border-b border-white/8 px-3 py-2 font-mono text-[10px] tracking-[0.16em] text-foreground-muted uppercase">
          <span className="truncate">Contract.pdf</span>
          <span className="shrink-0">PDF / DOCX</span>
        </div>
        <div className="space-y-2 p-4">
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className="h-1.5 rounded-full bg-white/8"
              style={{ width: `${72 - index * 6}%` }}
            />
          ))}
        </div>
        <div
          className={cn(
            "absolute inset-y-10 left-3 w-[42%] rounded-sm bg-accent/18",
            "origin-left transition-transform duration-1000 ease-out",
            active ? "scale-x-100" : "scale-x-0",
          )}
        />
      </div>

      <ul className="flex flex-col justify-center gap-2.5">
        {fields.map((field, index) => (
          <li
            key={field}
            className="flex items-center justify-between border border-white/10 bg-[#0c111b]/80 px-3 py-2.5"
            style={{
              opacity: active ? 1 : 0.25,
              transform: active ? "translateX(0)" : "translateX(12px)",
              transition: `opacity 0.55s ${0.1 * index}s ease, transform 0.55s ${0.1 * index}s ease`,
            }}
          >
            <span className="font-mono text-[10px] tracking-[0.16em] text-foreground-muted uppercase">
              {field}
            </span>
            <span className="h-1 w-12 overflow-hidden bg-white/10">
              <span
                className="block h-full bg-accent"
                style={{
                  width: active ? "100%" : "0%",
                  transition: `width 0.7s ${0.12 * index}s ease`,
                }}
              />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
