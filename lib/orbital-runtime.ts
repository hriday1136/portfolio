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
  const scrollY = 0;
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

  const dur = (n: number) => (reduce ? 0.001 : n);

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
    const orbitPoints = document.getElementById("orbitPoints");
    const onParallax = (e: MouseEvent) => {
      const dx = e.clientX / innerWidth - 0.5;
      const dy = e.clientY / innerHeight - 0.5;
      if (orbitBack)
        orbitBack.style.transform = `translate(-50%,-52%) translate(${dx * 14}px,${dy * 10}px)`;
      if (orbitPoints)
        orbitPoints.style.transform = `translate(-50%,-52%) translate(${dx * 14}px,${dy * 10}px)`;
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


  // ---------------------------------------------------------------
  // Orbit navigation: hero -> orbit (points) -> dive into the planet -> section
  // ---------------------------------------------------------------
  gsap.registerPlugin(ScrollTrigger);
  const SECTION_IDS = ["work", "experience", "about", "systems", "contact"];
  const viewEls = SECTION_IDS.map((id) => document.getElementById(id)).filter(
    (el): el is HTMLElement => Boolean(el),
  );
  const viewBack = document.getElementById("viewBack");
  const enterBtn = document.getElementById("enterOrbit");
  const points = [...document.querySelectorAll<SVGGElement>(".orbit-pt")];
  const afSteps = [...document.querySelectorAll(".af-step")];

  let mode = "hero"; // "hero" | "orbit" | a section id
  let busy = false;
  let rocketSync: ((fromStart: boolean) => void) | null = null;
  let workSync: ((fromStart: boolean) => void) | null = null;

  gsap.set("#planet", { xPercent: -50, transformOrigin: "50% 50%" });
  gsap.set([...viewEls, viewBack], { autoAlpha: 0 });
  gsap.set(points, { autoAlpha: 0 });
  gsap.set("#orbitName", { autoAlpha: 0 });

  // The landing-page name travels into the orbit: each word flies to its place in
  // the outlined name at the centre of the orbit, then the two cross-fade.
  const heroWords = [...document.querySelectorAll<HTMLElement>(".hero__name span")];
  const orbitWords = [...document.querySelectorAll<HTMLElement>("#orbitName span")];
  const wordMove = (i: number) => {
    const from = heroWords[i];
    const to = orbitWords[i];
    if (!from || !to) return { x: 0, y: 0, scale: 1, origin: "50% 50%" };
    const range = document.createRange();
    range.selectNodeContents(from);
    const text = range.getBoundingClientRect();
    const box = from.getBoundingClientRect();
    const target = to.getBoundingClientRect();
    return {
      x: target.left + target.width / 2 - (text.left + text.width / 2),
      y: target.top + target.height / 2 - (text.top + text.height / 2),
      scale: to.offsetWidth / text.width,
      origin: `${text.left + text.width / 2 - box.left}px ${text.top + text.height / 2 - box.top}px`,
    };
  };

  const toOrbit = gsap
    .timeline({ paused: true })
    .to(
      heroWords,
      {
        x: (i: number) => wordMove(i).x,
        y: (i: number) => wordMove(i).y,
        scale: (i: number) => wordMove(i).scale,
        transformOrigin: (i: number) => wordMove(i).origin,
        rotation: -14,
        ease: "power2.inOut",
        duration: 1.1,
      },
      0,
    )
    .to(heroWords, { opacity: 0, ease: "none", duration: 0.35 }, 0.75)
    .set(".hero__name", { autoAlpha: 0 }, 1.1)
    .to(".hero__copy", { y: -40, autoAlpha: 0, ease: "power2.inOut", duration: 0.9 }, 0)
    .to(".hero__top,.hero__foot,.hero__tag--stage", { autoAlpha: 0, ease: "none", duration: 0.7 }, 0)
    .to("#planet", { scale: 1.28, yPercent: -10, ease: "power2.inOut", duration: 1.1 }, 0)
    .to(".planet-glow", { opacity: 1.4, ease: "none", duration: 1.1 }, 0)
    .to("#orbitName", { autoAlpha: 1, ease: "none", duration: 0.35 }, 0.75)
    .to(points, { autoAlpha: 1, ease: "power1.out", duration: 0.6, stagger: 0.12 }, 0.7);

  const dive = gsap
    .timeline({ paused: true })
    .to("#planet", { scale: 3.2, ease: "power2.in", duration: 1.3 }, 0)
    .to(".planet-depth", { opacity: 1, ease: "none", duration: 0.8 }, 0.5)
    .to(".orbit-back,.orbit-front,.orbit-points,#orbitName", { autoAlpha: 0, ease: "none", duration: 0.6 }, 0.1)
    .to(".planet-glow", { opacity: 0, ease: "none", duration: 0.6 }, 0.6)
    .set("#planet", { autoAlpha: 0 }, 1.3);

  if (reduce) {
    toOrbit.timeScale(60);
    dive.timeScale(60);
  }

  const run = (tl: gsap.core.Timeline, reverse = false) =>
    new Promise<void>((resolve) => {
      const evt = reverse ? "onReverseComplete" : "onComplete";
      tl.eventCallback(evt, () => {
        tl.eventCallback(evt, null);
        resolve();
      });
      if (reverse) tl.reverse();
      else tl.play();
    });

  const tween = (vars: gsap.TweenVars, target: gsap.TweenTarget) =>
    new Promise<void>((resolve) => {
      gsap.to(target, { ...vars, onComplete: () => resolve() });
    });

  const setActiveLink = (id: string | null) =>
    links.forEach((l) => l.classList.toggle("active", l.dataset.sec === id));

  const showView = async (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollTop = 0;
    el.querySelectorAll(".r").forEach((r) => {
      r.classList.remove("in");
      revObs.observe(r);
    });
    nav?.classList.add("scrolled", "in-view");
    setActiveLink(id);
    gsap.set(el, { transformOrigin: "50% 45vh", scale: 0.6 });
    await tween({ autoAlpha: 1, scale: 1, duration: dur(0.9), ease: "power2.out", clearProps: "transform,transformOrigin" }, el);
    ScrollTrigger.refresh();
    if (id === "experience") rocketSync?.(true);
    if (id === "work") {
      equalizeProjTech();
      workSync?.(true);
    }
    gsap.to(viewBack, { autoAlpha: 1, duration: dur(0.4) });
    if (id === "work") {
      afSteps.forEach((s, n) => {
        gsap.delayedCall(dur(0.25 + n * 0.22), () => s.classList.add("lit"));
      });
    }
  };

  const hideView = async (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    gsap.set(el, { transformOrigin: "50% 45vh" });
    gsap.to(viewBack, { autoAlpha: 0, duration: dur(0.3) });
    await tween({ autoAlpha: 0, scale: 0.6, duration: dur(0.6), ease: "power2.in" }, el);
    gsap.set(el, { clearProps: "transform,transformOrigin" });
    afSteps.forEach((s) => s.classList.remove("lit"));
  };

  const freezeHeroTransitions = () => {
    document.querySelectorAll<HTMLElement>(".hero .reveal-up").forEach((el) => {
      el.style.transition = "none";
    });
  };

  const enterOrbit = async () => {
    if (busy || mode !== "hero") return;
    busy = true;
    freezeHeroTransitions();
    toOrbit.invalidate();
    await run(toOrbit);
    mode = "orbit";
    busy = false;
  };

  const goSection = async (id: string) => {
    if (busy || mode === id) return;
    busy = true;
    closeMenu();
    if (mode === "hero") {
      freezeHeroTransitions();
      toOrbit.invalidate();
      toOrbit.timeScale(reduce ? 60 : 1.8);
      await run(toOrbit);
      toOrbit.timeScale(reduce ? 60 : 1);
      mode = "orbit";
    }
    if (mode === "orbit") {
      await run(dive);
    } else {
      await hideView(mode);
    }
    mode = id;
    await showView(id);
    busy = false;
  };

  const backToOrbit = async () => {
    if (busy || mode === "hero" || mode === "orbit") return;
    busy = true;
    nav?.classList.remove("in-view");
    setActiveLink(null);
    closeMenu();
    await hideView(mode);
    nav?.classList.remove("scrolled");
    await run(dive, true);
    mode = "orbit";
    busy = false;
  };

  const backToHero = async () => {
    if (busy || mode !== "orbit") return;
    busy = true;
    await run(toOrbit, true);
    mode = "hero";
    busy = false;
  };

  const goHome = async () => {
    if (mode === "hero" || busy) return;
    if (mode !== "orbit") await backToOrbit();
    await backToHero();
  };

  const onEnter = () => void enterOrbit();
  enterBtn?.addEventListener("click", onEnter);
  cleanups.push(() => enterBtn?.removeEventListener("click", onEnter));

  const pointHandlers = points.map((pt) => {
    const id = pt.dataset.go ?? "";
    const click = () => {
      if (mode === "orbit") void goSection(id);
    };
    const key = (e: KeyboardEvent) => {
      if (mode === "orbit" && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        void goSection(id);
      }
    };
    pt.addEventListener("click", click);
    pt.addEventListener("keydown", key);
    return () => {
      pt.removeEventListener("click", click);
      pt.removeEventListener("keydown", key);
    };
  });
  cleanups.push(...pointHandlers);

  const onNavLink = (e: Event) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[data-sec]");
    if (!a) return;
    e.preventDefault();
    closeMenu();
    void goSection(a.dataset.sec ?? "");
  };
  navLinks?.addEventListener("click", onNavLink);
  cleanups.push(() => navLinks?.removeEventListener("click", onNavLink));

  const brand = document.querySelector<HTMLAnchorElement>(".nav__brand");
  const onBrand = (e: Event) => {
    e.preventDefault();
    void goHome();
  };
  brand?.addEventListener("click", onBrand);
  cleanups.push(() => brand?.removeEventListener("click", onBrand));

  const onBackBtn = () => void backToOrbit();
  viewBack?.addEventListener("click", onBackBtn);
  cleanups.push(() => viewBack?.removeEventListener("click", onBackBtn));

  const onEsc = (e: KeyboardEvent) => {
    if (e.key !== "Escape") return;
    if (mode === "orbit") void backToHero();
    else if (mode !== "hero") void backToOrbit();
  };
  window.addEventListener("keydown", onEsc);
  cleanups.push(() => window.removeEventListener("keydown", onEsc));

  // Experience: the rocket follows the view's own scroll
  const expView = document.getElementById("experience");
  const log = document.querySelector<HTMLElement>(".log");
  const rocket = document.getElementById("logRocket");
  const fill = document.getElementById("logFill");
  const missions = [...document.querySelectorAll<HTMLElement>(".exp")];

  if (!reduce && expView && log && rocket && fill && missions.length) {
    const nodeOffset = (el: HTMLElement) => el.offsetTop + 10;
    const line = log.querySelector<HTMLElement>(".log__line");
    const markHot = (progress: number) => {
      const idx = Math.round(progress * (missions.length - 1));
      missions.forEach((m, n) => m.classList.toggle("is-hot", n === idx));
    };
    // The rocket's position is the view's own scroll position (0 = top, 1 = bottom),
    // so it reaches the last point exactly when the bottom of the page is reached.
    const pos = { v: 0 };
    const apply = () => {
      const y0 = nodeOffset(missions[0]) - 8;
      const y1 = nodeOffset(missions[missions.length - 1]) - 8;
      const y = y0 + (y1 - y0) * pos.v;
      const end = nodeOffset(missions[missions.length - 1]);
      // the line stops at the final point
      if (line) {
        line.style.bottom = "auto";
        line.style.height = `${end}px`;
      }
      gsap.set(rocket, { y });
      fill.style.height = `${Math.min(end, Math.max(18, y + 16))}px`;
      markHot(pos.v);
    };
    const target = () => {
      const max = expView.scrollHeight - expView.clientHeight;
      // everything fits on screen: both points are in view, so the rocket goes to the end
      return max > 4 ? Math.min(1, Math.max(0, expView.scrollTop / max)) : 1;
    };
    const follow = (duration: number, delay = 0) =>
      gsap.to(pos, { v: target(), duration, delay, ease: "power2.out", overwrite: true, onUpdate: apply });
    apply();
    const onExpScroll = () => {
      follow(0.35);
    };
    expView.addEventListener("scroll", onExpScroll, { passive: true });
    const onResize = () => follow(0.01);
    window.addEventListener("resize", onResize);
    rocketSync = (fromStart) => {
      if (fromStart) {
        gsap.killTweensOf(pos);
        pos.v = 0;
        apply();
        follow(1.2, 0.4);
      } else follow(0.01);
    };
    cleanups.push(() => {
      expView.removeEventListener("scroll", onExpScroll);
      window.removeEventListener("resize", onResize);
      gsap.killTweensOf(pos);
      rocketSync = null;
    });
  } else if (reduce) {
    document.querySelector(".exp")?.classList.add("is-hot");
  }

  // Personal Missions: the three cards' tag lists wrap to different numbers of rows
  // (AccessForge has more tags than the others), which would otherwise push its
  // metrics grid out of line with the other two (whose .metrics both flush to the
  // bottom via margin-top:auto). Equalizing each card's tag-list height to the
  // tallest one keeps all three metrics grids aligned, using the tags' real
  // measured height rather than a guessed pixel value.
  const equalizeProjTech = () => {
    const techEls = [...document.querySelectorAll<HTMLElement>("#work .proj-tech")];
    if (!techEls.length) return;
    techEls.forEach((el) => {
      el.style.marginBottom = "";
    });
    if (window.innerWidth <= 1100) return; // single-column layout: no side-by-side alignment to keep
    const heights = techEls.map((el) => el.getBoundingClientRect().height);
    const max = Math.max(...heights);
    // margin-bottom (not min-height/height) reserves the extra space in the flex
    // layout without changing the tag list's own size, so a card with fewer tag
    // rows still renders at its normal height, just with blank space below it.
    techEls.forEach((el, i) => {
      el.style.marginBottom = `${max - heights[i]}px`;
    });
  };
  const onTechResize = () => {
    if (mode === "work") equalizeProjTech();
  };
  window.addEventListener("resize", onTechResize);
  cleanups.push(() => window.removeEventListener("resize", onTechResize));

  // Personal Missions: a continuous rocket bar that follows the view's scroll
  const workView = document.getElementById("work");
  const workBar = document.getElementById("workBar");
  const workRocket = document.getElementById("workRocket");
  const workFill = document.getElementById("workFill");

  if (!reduce && workView && workBar && workRocket && workFill) {
    const wpos = { v: 0 };
    const wapply = () => {
      const y = Math.max(0, workBar.clientHeight - 40) * wpos.v;
      gsap.set(workRocket, { y });
      workFill.style.height = `${Math.max(18, y + 16)}px`;
    };
    const wtarget = () => {
      const max = workView.scrollHeight - workView.clientHeight;
      return max > 4 ? Math.min(1, Math.max(0, workView.scrollTop / max)) : 1;
    };
    const wfollow = (duration: number, delay = 0) =>
      gsap.to(wpos, { v: wtarget(), duration, delay, ease: "power2.out", overwrite: true, onUpdate: wapply });
    wapply();
    const onWorkScroll = () => {
      wfollow(0.35);
    };
    workView.addEventListener("scroll", onWorkScroll, { passive: true });
    const onWorkResize = () => wfollow(0.01);
    window.addEventListener("resize", onWorkResize);
    workSync = (fromStart) => {
      if (fromStart) {
        gsap.killTweensOf(wpos);
        wpos.v = 0;
        wapply();
        wfollow(1.2, 0.4);
      } else wfollow(0.01);
    };
    cleanups.push(() => {
      workView.removeEventListener("scroll", onWorkScroll);
      window.removeEventListener("resize", onWorkResize);
      gsap.killTweensOf(wpos);
      workSync = null;
    });
  }

  if (reduce) afSteps.forEach((s) => s.classList.add("lit"));

  // Landing-page name: the letters near the cursor light up like a scanner sweeping over them
  const nameEl = document.querySelector<HTMLElement>(".hero__name");
  if (nameEl && matchMedia("(pointer:fine)").matches && !reduce) {
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let target = 0;
    let level = 0;
    let running = false;
    let raf = 0;

    const frame = () => {
      level += (target - level) * 0.12;
      cx += (tx - cx) * 0.2;
      cy += (ty - cy) * 0.2;
      heroWords.forEach((w) => {
        const b = w.getBoundingClientRect();
        w.style.setProperty("--mx", `${cx - b.left}px`);
        w.style.setProperty("--my", `${cy - b.top}px`);
        w.style.setProperty("--r", `${90 + 50 * level}px`);
        w.style.setProperty("--lv", level.toFixed(3));
      });
      if (target === 0 && level < 0.003) {
        heroWords.forEach((w) => w.style.setProperty("--lv", "0"));
        running = false;
        return;
      }
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const onMove = (e: PointerEvent) => {
      if (mode !== "hero") return;
      if (target === 0) {
        cx = e.clientX;
        cy = e.clientY;
      }
      tx = e.clientX;
      ty = e.clientY;
      target = 1;
      start();
    };
    const onLeave = () => {
      target = 0;
      start();
    };
    nameEl.addEventListener("pointermove", onMove);
    nameEl.addEventListener("pointerleave", onLeave);
    const stopWhenLeaving = window.setInterval(() => {
      if (mode !== "hero" && target === 1) onLeave();
    }, 200);
    cleanups.push(() => {
      nameEl.removeEventListener("pointermove", onMove);
      nameEl.removeEventListener("pointerleave", onLeave);
      window.clearInterval(stopWhenLeaving);
      cancelAnimationFrame(raf);
      heroWords.forEach((w) => {
        ["--mx", "--my", "--r", "--lv"].forEach((v) => w.style.removeProperty(v));
      });
    });
  }

  cleanups.push(() => {
    toOrbit.kill();
    dive.kill();
    ScrollTrigger.getAll().forEach((t) => t.kill());
    gsap.killTweensOf([...viewEls, viewBack, ".hero__name", ".hero__copy", "#planet"]);
    gsap.set(
      [
        ".hero__name",
        ...heroWords,
        ".hero__copy",
        ".hero__top",
        ".hero__foot",
        ".hero__tag--stage",
        "#planet",
        ".planet-glow",
        ".planet-depth",
        ".orbit-back",
        ".orbit-front",
        ".orbit-points",
        "#orbitName",
        "#logRocket",
        "#workRocket",
        ...points,
        ...viewEls,
        viewBack,
      ],
      { clearProps: "all" },
    );
    document.querySelectorAll<HTMLElement>(".hero .reveal-up").forEach((el) => {
      el.style.transition = "";
    });
  });

  return () => {
    cleanups.forEach((fn) => fn());
  };
}
