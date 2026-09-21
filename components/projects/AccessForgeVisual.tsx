"use client";

type AccessForgeVisualProps = {
  active: boolean;
};

const stages = ["Scan", "Detect", "Fix", "Verify", "Pull Request"];

export function AccessForgeVisual({ active }: AccessForgeVisualProps) {
  return (
    <div
      className="flex h-full flex-col justify-center gap-4 px-2"
      aria-label="AccessForge remediation workflow from scan to pull request"
    >
      {stages.map((stage, index) => (
        <div
          key={stage}
          className="flex items-center gap-4"
          style={{
            opacity: active ? 1 : 0.28,
            transform: active ? "translateX(0)" : "translateX(-10px)",
            transition: `opacity 0.5s ${0.1 * index}s ease, transform 0.5s ${0.1 * index}s ease`,
          }}
        >
          <span className="w-8 font-mono text-[10px] tracking-[0.18em] text-accent-icy">
            0{index + 1}
          </span>
          <div className="relative h-px flex-1 overflow-hidden bg-white/10">
            <span
              className="absolute inset-y-0 left-0 bg-accent-icy"
              style={{
                width: active ? "100%" : "0%",
                transition: `width 0.8s ${0.12 * index}s ease`,
              }}
            />
          </div>
          <span className="min-w-[7.5rem] text-right font-display text-lg tracking-tight text-foreground sm:text-xl">
            {stage}
          </span>
        </div>
      ))}
    </div>
  );
}
