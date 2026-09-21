import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { education } from "@/data/education";
import { site } from "@/data/site";

export function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-background px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
      aria-labelledby="about-heading"
    >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute top-[20%] right-[12%] h-px w-24 bg-white/20" />
        <div className="absolute top-[20%] right-[12%] h-16 w-px bg-white/20" />
        <div className="console-geometry" aria-hidden="true">
          <svg viewBox="0 0 120 72" className="h-full w-full">
            <rect x="18" y="28" width="84" height="28" rx="10" fill="none" stroke="rgba(244,246,248,0.28)" />
            <circle cx="40" cy="42" r="5" fill="none" stroke="rgba(94,139,255,0.7)" />
            <circle cx="60" cy="42" r="5" fill="none" stroke="rgba(143,216,232,0.55)" />
            <circle cx="80" cy="42" r="5" fill="none" stroke="rgba(244,246,248,0.35)" />
          </svg>
        </div>
      </div>

      <div className="relative mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div>
          <SectionLabel>Personnel</SectionLabel>
          <RevealText
            id="about-heading"
            className="mt-4 text-4xl tracking-tight text-foreground uppercase sm:text-6xl"
          >
            Off the Clock
          </RevealText>
          <div
            className="portrait-frame mt-10 aspect-[4/5] max-w-md"
            role="img"
            aria-label="Portrait placeholder for Hriday Adani"
          />
        </div>

        <div className="flex flex-col justify-end lg:pb-6">
          <p className="font-display text-3xl tracking-tight text-foreground sm:text-4xl">
            {site.name}
          </p>
          <p className="mt-3 font-mono text-[12px] tracking-[0.14em] text-foreground-muted uppercase">
            {education.majors} · {education.school}
          </p>
          <div className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-foreground-muted">
            <p>
              Software engineering with a bias toward systems: local AI infrastructure, backend
              architecture, accessibility tooling, and research software that has to be correct.
            </p>
            <p>
              Off the clock, that same attention to interfaces shows up elsewhere — long sessions
              on PS5, and a lasting interest in space. The work stays technical. The taste is
              cinematic.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
