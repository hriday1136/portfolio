import { education } from "@/data/education";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Education() {
  return (
    <section
      id="education"
      className="bg-background px-5 py-16 sm:px-8 lg:px-12"
      aria-labelledby="education-heading"
    >
      <div className="mx-auto max-w-[1440px] border-y border-white/8 py-12 lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16 lg:py-16">
        <SectionLabel>Education</SectionLabel>
        <div>
          <h2
            id="education-heading"
            className="font-display text-2xl tracking-tight text-foreground sm:text-3xl"
          >
            {education.school}
          </h2>
          <p className="mt-3 text-sm text-foreground-muted">
            {education.degree}; Major in {education.majors}
          </p>
          <p className="mt-2 font-mono text-[11px] tracking-[0.14em] text-accent uppercase">
            {education.graduation}
          </p>
          <p className="mt-6 font-mono text-[11px] tracking-[0.16em] text-foreground-muted uppercase">
            Relevant coursework
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {education.coursework.map((course) => (
              <li
                key={course}
                className="border border-white/8 px-3 py-2 text-sm text-foreground-muted"
              >
                {course}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
