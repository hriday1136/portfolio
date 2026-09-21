"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initOrbital() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cleanups: Array<() => void> = [];

  const hero = document.getElementById("hero");
  hero?.classList.add("hero-in");

  const canvas = document.getElementById("starfield") as HTMLCanvasElement | null;
  const ctx = canvas?.getContext("2d");
  let stars: Array<{
    x: number;
    y: number;
    z: number;
    r: number;
    a: number;
    tw: number;
  }> = [];
  let W = 0;
  let H = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let scrollY = window.scrollY;
  let rafStars = 0;

  function sizeCanvas() {
    if (!canvas) return;
    W = canvas.width = innerWidth * dpr;
    H = canvas.height = innerHeight * dpr;
    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;
    const count = innerWidth < 600 ? 90 : innerWidth < 1100 ? 150 : 210;
    stars = [];
    for (let i = 0; i < count; i++) {
      const depth = Math.random();
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        z: depth,
        r: (depth * 1.4 + 0.3) * dpr,
        a: Math.random() * 0.6 + 0.2,
        tw: Math.random() * Math.PI * 2,
      });
    }
  }

  function drawStars(t: number) {
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);
    for (const s of stars) {
      const par = s.z * scrollY * 0.15 * dpr;
      let y = (s.y - par) % H;
      if (y < 0) y += H;
      const tw = reduce ? 1 : 0.65 + 0.35 * Math.sin(t * 0.001 + s.tw);
      ctx.beginPath();
      ctx.globalAlpha = s.a * tw;
      ctx.fillStyle = s.z > 0.85 ? "#8FD3E8" : "#F4F6F8";
      ctx.arc(s.x, y, s.r, 0, 6.283);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    if (!reduce) rafStars = requestAnimationFrame(drawStars);
  }

  if (canvas && ctx) {
    sizeCanvas();
    const onResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      sizeCanvas();
    };
    window.addEventListener("resize", onResize);
    cleanups.push(() => window.removeEventListener("resize", onResize));
    if (reduce) drawStars(0);
    else rafStars = requestAnimationFrame(drawStars);
    cleanups.push(() => cancelAnimationFrame(rafStars));
  }

  const nav = document.getElementById("nav");
  const links = [...document.querySelectorAll<HTMLAnchorElement>(".nav__links a[data-sec]")];
  const navLinks = document.getElementById("navLinks");
  const navToggle = document.getElementById("navToggle");

  const closeMenu = () => {
    if (!navLinks || !navToggle) return;
    navLinks.classList.remove("open");
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  };

  const onToggle = () => {
    if (!navLinks || !navToggle) return;
    const open = navLinks.classList.toggle("open");
    navToggle.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  navToggle?.addEventListener("click", onToggle);
  cleanups.push(() => navToggle?.removeEventListener("click", onToggle));

  const onNavClick = (e: Event) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "A") closeMenu();
  };
  navLinks?.addEventListener("click", onNavClick);
  cleanups.push(() => navLinks?.removeEventListener("click", onNavClick));

  const brand = document.querySelector<HTMLAnchorElement>(".nav__brand");
  const goHome = (e: Event) => {
    e.preventDefault();
    closeMenu();
    links.forEach((l) => l.classList.remove("active"));
    window.scrollTo({ top: 0, behavior: "auto" });
    history.replaceState(null, "", "#hero");
  };
  brand?.addEventListener("click", goHome);
  cleanups.push(() => brand?.removeEventListener("click", goHome));

  const onScroll = () => {
    scrollY = window.scrollY;
    nav?.classList.toggle("scrolled", scrollY > 40);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  cleanups.push(() => window.removeEventListener("scroll", onScroll));

  const secs = ["work", "experience", "about", "systems", "contact"]
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => Boolean(el));
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          links.forEach((l) =>
            l.classList.toggle("active", l.dataset.sec === en.target.id),
          );
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );
  secs.forEach((s) => spy.observe(s));
  cleanups.push(() => spy.disconnect());

  const revs = [...document.querySelectorAll(".r")];
  const revObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          revObs.unobserve(en.target);
        }
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
  );
  revs.forEach((r) => revObs.observe(r));
  cleanups.push(() => revObs.disconnect());

  if (matchMedia("(pointer:fine)").matches && !reduce) {
    const cur = document.getElementById("cursor");
    let cx = innerWidth / 2;
    let cy = innerHeight / 2;
    let tx = cx;
    let ty = cy;
    let cursorRaf = 0;
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      cur?.classList.add("on");
    };
    window.addEventListener("mousemove", onMove);
    const hoverables = [...document.querySelectorAll("a,button")];
    const enter = () => cur?.classList.add("grow");
    const leave = () => cur?.classList.remove("grow");
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });
    const loop = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      if (cur) cur.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
      cursorRaf = requestAnimationFrame(loop);
    };
    loop();
    cleanups.push(() => {
      window.removeEventListener("mousemove", onMove);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
      cancelAnimationFrame(cursorRaf);
    });
  }

  if (matchMedia("(pointer:fine)").matches && !reduce) {
    const orbitBack = document.getElementById("orbitBack");
    const orbitFront = document.getElementById("orbitFront");
    const onParallax = (e: MouseEvent) => {
      const dx = e.clientX / innerWidth - 0.5;
      const dy = e.clientY / innerHeight - 0.5;
      if (orbitBack)
        orbitBack.style.transform = `translate(-50%,-52%) translate(${dx * 14}px,${dy * 10}px)`;
      if (orbitFront)
        orbitFront.style.transform = `translate(-50%,-52%) translate(${dx * 22}px,${dy * 16}px)`;
    };
    window.addEventListener("mousemove", onParallax);
    cleanups.push(() => window.removeEventListener("mousemove", onParallax));
  }

  const sat = document.getElementById("sat");
  const glow = document.getElementById("satGlow");
  if (sat && glow) {
    const cx = 750;
    const cy = 450;
    const rx = 720;
    const ry = 250;
    const rot = (-14 * Math.PI) / 180;
    let a = Math.PI * 0.15;
    let satRaf = 0;
    const step = () => {
      a += reduce ? 0 : 0.0022;
      const ex = rx * Math.cos(a);
      const ey = ry * Math.sin(a);
      const x = cx + ex * Math.cos(rot) - ey * Math.sin(rot);
      const y = cy + ex * Math.sin(rot) + ey * Math.cos(rot);
      sat.setAttribute("cx", String(x));
      sat.setAttribute("cy", String(y));
      glow.setAttribute("cx", String(x));
      glow.setAttribute("cy", String(y));
      if (!reduce) satRaf = requestAnimationFrame(step);
    };
    step();
    cleanups.push(() => cancelAnimationFrame(satRaf));
  }

  if (!reduce) {
    gsap.registerPlugin(ScrollTrigger);
    const desktop = window.matchMedia("(min-width: 901px)").matches;
    if (desktop) document.documentElement.classList.add("gsap-active");

    let heroTl: gsap.core.Timeline | null = null;
    if (desktop) {
      gsap.set("#planet", { xPercent: -50, transformOrigin: "50% 50%" });
      heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero-pin",
          start: "top top",
          end: "+=120%",
          scrub: 0.6,
          pin: "#hero-pin",
          pinSpacing: true,
          anticipatePin: 1,
        },
      });
      heroTl
        .to(".hero__name", { yPercent: -28, ease: "none" }, 0)
        .to(".hero__copy", { opacity: 0, y: -40, ease: "none" }, 0)
        .to(".hero__top,.hero__foot,.scroll-hint", { opacity: 0, ease: "none" }, 0)
        .to("#planet", { scale: 1.28, yPercent: -10, ease: "none" }, 0)
        .to(".planet-glow", { opacity: 1.4, ease: "none" }, 0)
        .to(".orbit-back,.orbit-front", { opacity: 0, scale: 1.12, ease: "none" }, 0);
    }

    const panels = [...document.querySelectorAll(".proj-panel")];
    const stages = [...document.querySelectorAll(".proj-stage")];
    const idxBtns = [...document.querySelectorAll<HTMLButtonElement>("#projIndex button")];
    const afSteps = [...document.querySelectorAll(".af-step")];

    const setActive = (i: number) => {
      panels.forEach((p, n) => p.classList.toggle("active", n === i));
      stages.forEach((s, n) => s.classList.toggle("active", n === i));
      idxBtns.forEach((b, n) => b.classList.toggle("active", n === i));
      const tint = ["#0a1324", "#0c1022", "#0a1622"][i];
      gsap.to("#work", { "--work-bg": tint, duration: 0.6 });
    };

    panels.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => {
          if (self.isActive) setActive(i);
        },
      });
    });

    ScrollTrigger.create({
      trigger: '.proj-panel[data-panel="2"]',
      start: "top center",
      end: "bottom center",
      scrub: true,
      onUpdate: (self) => {
        const lit = Math.round(self.progress * 5);
        afSteps.forEach((s, n) => s.classList.toggle("lit", n < lit));
      },
    });

    const jumpHandlers: Array<() => void> = [];
    idxBtns.forEach((b) => {
      const handler = () => {
        const i = Number(b.dataset.jump);
        panels[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
      };
      b.addEventListener("click", handler);
      jumpHandlers.push(() => b.removeEventListener("click", handler));
    });
    cleanups.push(...jumpHandlers);

    const log = document.querySelector<HTMLElement>(".log");
    const rocket = document.getElementById("logRocket");
    const fill = document.getElementById("logFill");
    const missions = [...document.querySelectorAll<HTMLElement>(".exp")];

    if (log && rocket && fill && missions.length) {
      const nodeOffset = (el: HTMLElement) => el.offsetTop + 10;
      const markHot = (progress: number) => {
        const idx = Math.round(progress * (missions.length - 1));
        missions.forEach((m, n) => m.classList.toggle("is-hot", n === idx));
      };
      markHot(0);
      fill.style.height = `${nodeOffset(missions[0]) + 8}px`;
      gsap.fromTo(
        rocket,
        { y: () => nodeOffset(missions[0]) - 8 },
        {
          y: () => nodeOffset(missions[missions.length - 1]) - 8,
          ease: "none",
          scrollTrigger: {
            trigger: log,
            start: "top 55%",
            end: "bottom 50%",
            scrub: 0.85,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const y = Number(gsap.getProperty(rocket, "y"));
              fill.style.height = `${Math.max(18, y + 16)}px`;
              markHot(self.progress);
            },
          },
        },
      );
    }

    ScrollTrigger.refresh();
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    cleanups.push(() => {
      window.removeEventListener("load", onLoad);
      document.documentElement.classList.remove("gsap-active");
      ScrollTrigger.getAll().forEach((t) => t.kill());
      heroTl?.kill();
    });
  } else {
    document.querySelectorAll(".af-step").forEach((s) => s.classList.add("lit"));
    document.querySelectorAll(".proj-panel").forEach((p) => p.classList.add("active"));
    document.querySelector(".exp")?.classList.add("is-hot");
  }

  return () => {
    cleanups.forEach((fn) => fn());
  };
}
