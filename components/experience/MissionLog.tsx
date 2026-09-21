"use client";

import { useRef } from "react";
import { ExperienceItem } from "@/components/experience/ExperienceItem";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { experience } from "@/data/experience";
import { gsap, registerGsap } from "@/lib/animations/register";
import { useIsomorphicLayoutEffect } from "@/lib/animations/useIsomorphicLayoutEffect";

export function MissionLog() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useIsomorphicLayoutEffect(() => {
    registerGsap();
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section || !line) return;

    const length = line.getTotalLength();
    line.style.strokeDasharray = `${length}`;
    line.style.strokeDashoffset = `${length}`;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.to(line, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 18%",
          scrub: 1.1,
        },
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      line.style.strokeDashoffset = "0";
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative bg-background px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="relative mb-6 h-24 overflow-hidden lg:h-32">
          <svg
            viewBox="0 0 1200 120"
            className="h-full w-full"
            aria-hidden="true"
            preserveAspectRatio="none"
          >
            <path
              ref={lineRef}
              d="M40 90 C 220 90, 280 18, 460 18 L 1160 18"
              fill="none"
              stroke="rgba(94,139,255,0.55)"
              strokeWidth="1.2"
            />
            <circle cx="40" cy="90" r="3.5" fill="#8FD8E8" />
          </svg>
        </div>

        <SectionLabel>03 / Experience</SectionLabel>
        <RevealText
          id="experience-heading"
          className="mt-4 text-4xl tracking-tight text-foreground uppercase sm:text-6xl lg:text-7xl"
        >
          Mission Log
        </RevealText>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-foreground-muted">
          Research software with production constraints — scientific APIs, data integrity, and
          compression systems.
        </p>

        <div className="mt-8">
          {experience.map((item, index) => (
            <ExperienceItem
              key={item.id}
              item={item}
              index={`0${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
