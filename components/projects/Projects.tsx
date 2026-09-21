"use client";

import { useRef, useState } from "react";
import { ProjectPanel } from "@/components/projects/ProjectPanel";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { projects } from "@/data/projects";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/animations/register";
import { useIsomorphicLayoutEffect } from "@/lib/animations/useIsomorphicLayoutEffect";
import { cn } from "@/lib/cn";

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const project = projects[active] ?? projects[0];

  useIsomorphicLayoutEffect(() => {
    registerGsap();
    const pin = pinRef.current;
    if (!pin) return;

    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        ScrollTrigger.create({
          trigger: pin,
          start: "top top",
          end: "+=280%",
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const next = Math.min(
              projects.length - 1,
              Math.floor(self.progress * projects.length),
            );
            setActive((current) => (current === next ? current : next));
          },
        });
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="missions section-shell bg-background"
      data-atmosphere={project.atmosphere}
      aria-labelledby="missions-heading"
    >
      <div className="missions-glow" />

      <div className="relative z-[1] mx-auto max-w-[1440px] px-5 pt-24 sm:px-8 lg:hidden">
        <SectionLabel>02 / Project Archive</SectionLabel>
        <RevealText
          className="mt-4 text-4xl tracking-tight text-foreground uppercase sm:text-6xl"
        >
          Selected Missions
        </RevealText>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-foreground-muted">
          Three systems spanning local AI infrastructure, contract intelligence, and
          accessibility remediation.
        </p>
      </div>

      <div className="relative z-[1] space-y-20 px-5 py-16 sm:px-8 lg:hidden">
        {projects.map((item) => (
          <article key={item.id} className="border-t border-white/8 pt-10">
            <p className="font-mono text-[10px] tracking-[0.2em] text-foreground-muted">
              {item.index}
            </p>
            <h3 className="font-display mt-2 text-3xl tracking-tight text-foreground uppercase">
              {item.name}
            </h3>
            <p className="mt-1 text-sm text-foreground-muted">{item.subtitle}</p>
            <div className="mt-8">
              <ProjectPanel project={item} />
            </div>
          </article>
        ))}
      </div>

      <div
        ref={pinRef}
        className="relative z-[1] mx-auto hidden min-h-[100svh] max-w-[1440px] flex-col px-12 py-28 lg:flex"
      >
        <div className="flex items-end justify-between gap-10">
          <div>
            <SectionLabel>02 / Project Archive</SectionLabel>
            <h2
              id="missions-heading"
              className="font-display mt-4 text-5xl tracking-tight text-foreground uppercase xl:text-6xl"
            >
              Selected Missions
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-foreground-muted">
            Three systems spanning local AI infrastructure, contract intelligence, and
            accessibility remediation.
          </p>
        </div>

        <div className="mt-16 grid min-h-0 flex-1 grid-cols-[240px_minmax(0,1fr)] gap-16">
          <ol className="flex flex-col gap-1 self-center">
            {projects.map((item, index) => {
              const isActive = index === active;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    className={cn(
                      "w-full rounded-sm px-1 py-3 text-left transition-opacity duration-500",
                      isActive ? "opacity-100" : "opacity-35 hover:opacity-70",
                    )}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <span className="font-mono text-[10px] tracking-[0.2em] text-foreground-muted">
                      {item.index}
                    </span>
                    <span
                      className={cn(
                        "mt-1 block font-display tracking-tight uppercase",
                        isActive
                          ? "text-4xl text-foreground"
                          : "text-xl text-foreground-muted",
                      )}
                    >
                      {item.name}
                    </span>
                    <span className="mt-1 block text-xs text-foreground-muted">
                      {item.subtitle}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="min-h-0 self-center">
            <ProjectPanel project={project} />
          </div>
        </div>
      </div>
    </section>
  );
}
