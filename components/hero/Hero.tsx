"use client";

import { useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { OrbitLines } from "@/components/hero/OrbitLines";
import { Planet } from "@/components/hero/Planet";
import { StarField } from "@/components/hero/StarField";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { site } from "@/data/site";
import { gsap, registerGsap } from "@/lib/animations/register";
import { useIsomorphicLayoutEffect } from "@/lib/animations/useIsomorphicLayoutEffect";

function NameLines() {
  return (
    <>
      <span className="line">Hriday</span>
      <span className="line">Adani</span>
    </>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const orbitsRef = useRef<HTMLDivElement>(null);
  const nameBackRef = useRef<HTMLDivElement>(null);
  const nameFrontRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const supportRef = useRef<HTMLDivElement>(null);
  const planetWrapRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    registerGsap();
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=220%",
            pin: true,
            scrub: 1.25,
            anticipatePin: 1,
          },
        });

        tl.to(
          [nameBackRef.current, nameFrontRef.current],
          { yPercent: -32, scale: 0.84, opacity: 0.42 },
          0,
        )
          .to(
            [statusRef.current, supportRef.current, metaRef.current],
            { opacity: 0, y: -16 },
            0,
          )
          .to(planetWrapRef.current, { scale: 2.4, yPercent: 16 }, 0)
          .to(starsRef.current, { scale: 1.14, opacity: 0.65 }, 0)
          .to(orbitsRef.current, { rotate: 16, scale: 1.2, yPercent: 10 }, 0);
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative isolate block min-h-[100svh] overflow-hidden bg-background"
      aria-labelledby="hero-name"
    >
      <div ref={starsRef} className="absolute inset-0 z-0 origin-center will-change-transform">
        <StarField />
      </div>
      <div className="hero-vignette z-[1]" />

      <div
        ref={nameBackRef}
        className="name-lockup font-display pointer-events-none absolute top-[18%] left-0 z-[2] w-fit origin-top-left px-5 text-foreground sm:px-8 lg:top-[16%] lg:px-12"
        aria-hidden="true"
      >
        <NameLines />
      </div>

      <div
        ref={orbitsRef}
        className="pointer-events-none absolute inset-0 z-[3] origin-[50%_72%] will-change-transform"
      >
        <OrbitLines className="h-full w-full" />
      </div>

      <div
        ref={nameFrontRef}
        className="name-lockup name-front font-display pointer-events-none absolute top-[18%] left-0 z-[6] w-fit origin-top-left px-5 text-foreground sm:px-8 lg:top-[16%] lg:px-12"
        aria-hidden="true"
      >
        <NameLines />
      </div>

      <h1 id="hero-name" className="sr-only">
        Hriday Adani
      </h1>

      <div
        ref={planetWrapRef}
        className="absolute inset-0 z-[5] origin-[50%_100%] will-change-transform"
      >
        <Planet />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[7] mx-auto flex w-full max-w-[1440px] flex-col px-5 pb-8 pt-[calc(var(--nav-height)+1.25rem)] sm:px-8 lg:px-12 lg:pb-10">
        <div ref={statusRef} className="pointer-events-auto flex items-center gap-3">
          <span className="status-dot" aria-hidden="true" />
          <SectionLabel>01 / System Online</SectionLabel>
        </div>

        <div ref={supportRef} className="pointer-events-auto mt-auto max-w-xl space-y-5 pb-6">
          <p className="font-mono text-[12px] tracking-[0.16em] text-accent uppercase">
            {site.role}
          </p>
          <p className="max-w-md text-base leading-relaxed text-foreground-muted sm:text-lg">
            {site.statement}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href="#work"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/14 bg-white/4 px-5 text-[12px] tracking-[0.18em] text-foreground uppercase transition-colors hover:border-accent/50 hover:bg-white/8"
            >
              Explore work
              <ArrowDown size={14} aria-hidden="true" />
            </a>
            <a
              href={site.resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 px-3 text-[12px] tracking-[0.18em] text-foreground-muted uppercase transition-colors hover:text-foreground"
            >
              Resume
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div
          ref={metaRef}
          className="pointer-events-none flex items-end justify-between gap-6 font-mono text-[10px] tracking-[0.2em] text-foreground-muted uppercase sm:text-[11px]"
        >
          <p>{site.location}</p>
          <p className="text-right">{site.opportunity}</p>
        </div>
      </div>
    </section>
  );
}
