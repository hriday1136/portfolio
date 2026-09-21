import type { ProjectMetric } from "@/data/projects";

type ProjectMetricsProps = {
  metrics: ProjectMetric[];
};

export function ProjectMetrics({ metrics }: ProjectMetricsProps) {
  return (
    <ul className="grid grid-cols-2 gap-x-8 gap-y-6">
      {metrics.map((metric) => (
        <li key={`${metric.value}-${metric.label}`}>
          <p className="font-display text-3xl tracking-tight text-foreground sm:text-4xl">
            {metric.value}
          </p>
          <p className="mt-1 max-w-[12rem] font-mono text-[10px] tracking-[0.16em] text-foreground-muted uppercase">
            {metric.label}
          </p>
        </li>
      ))}
    </ul>
  );
}
