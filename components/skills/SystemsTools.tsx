import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { skillGroups } from "@/data/skills";

export function SystemsTools() {
  return (
    <section
      id="systems"
      className="bg-background px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
      aria-labelledby="systems-heading"
    >
      <div className="mx-auto max-w-[1440px]">
        <SectionLabel>04 / Technical Stack</SectionLabel>
        <RevealText
          id="systems-heading"
          className="mt-4 text-4xl tracking-tight text-foreground uppercase sm:text-6xl lg:text-7xl"
        >
          Systems & Tools
        </RevealText>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-foreground-muted">
          Languages, libraries, and infrastructure from shipped systems and research software.
        </p>

        <div className="mt-16 grid gap-12 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.id}>
              <h3 className="font-mono text-[11px] tracking-[0.2em] text-foreground-muted uppercase">
                {group.label}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <span className="sys-cell inline-flex min-h-11 items-center px-3.5 font-mono text-[11px] tracking-[0.08em] text-foreground-muted uppercase">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
