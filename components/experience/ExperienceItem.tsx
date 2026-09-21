import type { Experience } from "@/data/experience";

type ExperienceItemProps = {
  item: Experience;
  index: string;
};

export function ExperienceItem({ item, index }: ExperienceItemProps) {
  return (
    <article className="grid gap-8 border-t border-white/8 py-12 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16">
      <div>
        <p className="font-mono text-[11px] tracking-[0.18em] text-foreground-muted uppercase">
          {index}
        </p>
        <p className="mt-3 font-mono text-[11px] tracking-[0.12em] text-accent uppercase">
          {item.dates}
        </p>
      </div>
      <div>
        <h3 className="font-display text-2xl tracking-tight text-foreground sm:text-3xl">
          {item.role}
        </h3>
        <p className="mt-2 text-sm text-foreground-muted">
          {item.org} · {item.location}
        </p>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/90">
          {item.summary}
        </p>
        <ul className="mt-5 max-w-2xl space-y-3 text-sm leading-relaxed text-foreground-muted">
          {item.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        {item.metrics.length > 0 ? (
          <ul className="mt-8 grid grid-cols-3 gap-6 max-w-lg">
            {item.metrics.map((metric) => (
              <li key={metric.label}>
                <p className="font-display text-2xl text-foreground sm:text-3xl">
                  {metric.value}
                </p>
                <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-foreground-muted uppercase">
                  {metric.label}
                </p>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
