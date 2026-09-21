"use client";

import { useEffect } from "react";
import { initOrbital } from "@/lib/orbital-runtime";

export function OrbitalSite() {
  useEffect(() => initOrbital(), []);

  return (
    <>
      <canvas id="starfield" aria-hidden="true" />
      <div className="atmos" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <div className="cursor" id="cursor" aria-hidden="true" />

      <nav className="nav" id="nav" aria-label="Primary">
        <a className="nav__brand" href="#hero" aria-label="Hriday Adani, home">
          <span className="nav__name">HRIDAY ADANI</span>
          <span className="nav__status">
            <span className="pulse" />
            SYSTEM ONLINE · 01 / PORTFOLIO
          </span>
        </a>
        <button
          className="nav__toggle"
          id="navToggle"
          aria-expanded="false"
          aria-controls="navLinks"
          aria-label="Open menu"
        >
          <span className="nav__burger" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
        <div className="nav__links" id="navLinks">
          <a href="#work" data-sec="work">
            Work
          </a>
          <a href="#experience" data-sec="experience">
            Experience
          </a>
          <a href="#about" data-sec="about">
            About
          </a>
          <a href="#systems" data-sec="systems">
            Systems
          </a>
          <a href="#contact" data-sec="contact">
            Contact
          </a>
        </div>
      </nav>

      <main>
        <section id="hero-pin" aria-label="Introduction">
          <div className="hero" id="hero">
            <div className="planet-glow" aria-hidden="true" />
            <div className="planet" id="planet" aria-hidden="true" />

            <svg className="orbit-svg orbit-back" viewBox="0 0 1500 900" aria-hidden="true" id="orbitBack">
              <ellipse
                className="orbit-path"
                cx="750"
                cy="450"
                rx="720"
                ry="250"
                transform="rotate(-14 750 450)"
              />
              <ellipse
                className="orbit-path"
                cx="750"
                cy="450"
                rx="520"
                ry="170"
                transform="rotate(-14 750 450)"
              />
            </svg>

            <div className="hero__top">
              <div className="wrap">
                <div className="hero__tag reveal-up d1">
                  <span className="mono mono--accent">01 / SYSTEM ONLINE</span>
                </div>
              </div>
            </div>

            <svg className="orbit-svg orbit-front" viewBox="0 0 1500 900" aria-hidden="true" id="orbitFront">
              <defs>
                <clipPath id="frontClip">
                  <rect x="0" y="0" width="760" height="900" />
                </clipPath>
              </defs>
              <g clipPath="url(#frontClip)">
                <ellipse
                  className="orbit-path orbit-path--accent"
                  cx="750"
                  cy="450"
                  rx="720"
                  ry="250"
                  transform="rotate(-14 750 450)"
                />
              </g>
              <circle className="orbit-sat-glow" id="satGlow" cx="0" cy="0" r="10" />
              <circle className="orbit-sat" id="sat" cx="0" cy="0" r="4" />
            </svg>

            <div className="hero__stage">
              <div className="wrap">
                <div className="hero__tag hero__tag--stage reveal-up d1">
                  <span className="mono mono--accent">01 / SYSTEM ONLINE</span>
                </div>
                <h1 className="hero__name">
                  <span className="reveal-up d2">HRIDAY</span>
                  <span className="reveal-up d3">ADANI</span>
                </h1>
                <div className="hero__copy reveal-up d4">
                  <div className="hero__role">
                    <span>Software Engineer</span>
                    <span className="sep">·</span>
                    <span>AI Systems</span>
                    <span className="sep">·</span>
                    <span>Research</span>
                  </div>
                  <p className="hero__line">
                    I build intelligent systems, from research prototypes to production software.
                  </p>
                  <div className="hero__cta">
                    <a className="btn btn--primary" href="#work">
                      Explore work <span className="btn__arrow">↓</span>
                    </a>
                    <a
                      className="btn btn--ext"
                      href="/hriday-adani-resume.pdf"
                      download="Hriday-Adani-Resume.pdf"
                    >
                      Resume <span className="btn__arrow">↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="hero__foot reveal-up d5">
              <div className="wrap">
                <span className="mono">Rutgers University · 2027</span>
                <span className="mono mono--accent">Open to New Grad opportunities</span>
              </div>
            </div>

            <div className="scroll-hint" aria-hidden="true">
              <span className="bar" />
              <span className="mono" style={{ fontSize: 10 }}>
                Enter orbit
              </span>
            </div>
          </div>
        </section>

        <section id="work" className="pad" aria-label="Selected work">
          <div className="wrap">
            <div className="projects__head">
              <div>
                <div className="eyebrow">
                  <span className="num">02</span>
                  <span className="dot" />
                  <span className="lab">Project Archive</span>
                </div>
                <h2 className="section-title">Selected Missions</h2>
              </div>
              <div className="projects__index" id="projIndex" aria-hidden="true">
                <button data-jump="0" className="active">
                  01 EchoOS
                </button>
                <button data-jump="1">02 ClauseWatch</button>
                <button data-jump="2">03 AccessForge</button>
              </div>
            </div>

            <div className="proj-grid">
              <div className="proj-visual-col">
                <div className="proj-visual" id="projVisual">
                  <div className="proj-stage active m-show" data-stage="0">
                    <div className="pv-frame" data-label="ECHOOS · LOCAL-FIRST SYSTEM LAYER">
                      <span className="pv-corner tl" />
                      <span className="pv-corner tr" />
                      <span className="pv-corner bl" />
                      <span className="pv-corner br" />
                      <div className="echo-core">
                        <div className="echo-ring" style={{ width: "78%", height: "78%" }} />
                        <div className="echo-ring" style={{ width: "52%", height: "52%" }} />
                        <div className="echo-center">SHELL</div>
                        <div className="echo-node" style={{ top: "14%", left: "50%" }} />
                        <div className="echo-node" style={{ top: "50%", left: "87%" }} />
                        <div className="echo-node" style={{ top: "84%", left: "52%" }} />
                        <div className="echo-node" style={{ top: "52%", left: "12%" }} />
                        <div className="echo-label" style={{ top: "8%", left: "42%" }}>
                          LLM · OLLAMA
                        </div>
                        <div className="echo-label" style={{ top: "48%", right: "2%" }}>
                          RAG MEMORY
                        </div>
                        <div className="echo-label" style={{ bottom: "8%", left: "44%" }}>
                          FILE I/O
                        </div>
                        <div className="echo-label" style={{ top: "50%", left: 0 }}>
                          OPENAI
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="proj-stage" data-stage="1">
                    <div className="pv-frame" data-label="CLAUSEWATCH · EXTRACTION PIPELINE">
                      <span className="pv-corner tl" />
                      <span className="pv-corner tr" />
                      <span className="pv-corner bl" />
                      <span className="pv-corner br" />
                      <svg className="cw-wire" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                        <path d="M52 30 H72" stroke="rgba(143,211,232,0.35)" strokeWidth="0.4" fill="none" />
                        <path d="M52 44 H72" stroke="rgba(143,211,232,0.35)" strokeWidth="0.4" fill="none" />
                        <path d="M52 58 H72" stroke="rgba(143,211,232,0.35)" strokeWidth="0.4" fill="none" />
                        <path d="M52 72 H72" stroke="rgba(143,211,232,0.35)" strokeWidth="0.4" fill="none" />
                      </svg>
                      <div className="cw-doc">
                        <div className="cw-doc__tag">CONTRACT.PDF</div>
                        <div className="ln m" />
                        <div className="ln s" />
                        <div className="ln" />
                        <div className="ln m" />
                        <div className="ln s" />
                        <div className="ln m" />
                        <div className="ln" />
                        <div className="ln s" />
                      </div>
                      <div className="cw-fields">
                        <div className="cw-field">
                          <span className="k">Parties</span>
                          <span className="c">0.98</span>
                        </div>
                        <div className="cw-field">
                          <span className="k">Dates</span>
                          <span className="c">0.95</span>
                        </div>
                        <div className="cw-field">
                          <span className="k">Obligations</span>
                          <span className="c">0.91</span>
                        </div>
                        <div className="cw-field">
                          <span className="k">Risks</span>
                          <span className="c">0.88</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="proj-stage" data-stage="2">
                    <div className="pv-frame" data-label="ACCESSFORGE · REMEDIATION PIPELINE">
                      <span className="pv-corner tl" />
                      <span className="pv-corner tr" />
                      <span className="pv-corner bl" />
                      <span className="pv-corner br" />
                      <div className="af-pipe">
                        <div className="af-step" data-af="0">
                          <div className="af-step__dot">01</div>
                          <div className="af-step__t">Scan</div>
                          <div className="af-connector" />
                        </div>
                        <div className="af-step" data-af="1">
                          <div className="af-step__dot">02</div>
                          <div className="af-step__t">Detect</div>
                          <div className="af-connector" />
                        </div>
                        <div className="af-step" data-af="2">
                          <div className="af-step__dot">03</div>
                          <div className="af-step__t">Fix</div>
                          <div className="af-connector" />
                        </div>
                        <div className="af-step" data-af="3">
                          <div className="af-step__dot">04</div>
                          <div className="af-step__t">Verify</div>
                          <div className="af-connector" />
                        </div>
                        <div className="af-step" data-af="4">
                          <div className="af-step__dot">05</div>
                          <div className="af-step__t">Pull request</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="proj-panels" id="projPanels">
                <article className="proj-panel active" data-panel="0">
                  <div className="proj-mission">Mission 01</div>
                  <h3 className="proj-name">EchoOS</h3>
                  <div className="proj-sub">AI-Native Local System Layer</div>
                  <p className="proj-desc">
                    A local-first system layer that augments ordinary OS interactions with autonomous
                    workflows. The desktop shell is built on <strong>Tauri, React and Tailwind</strong>,
                    and pairs <strong>OpenAI with local models via Ollama</strong> so automation keeps
                    working offline. A memory engine built on <strong>ChromaDB embeddings and RAG</strong>{" "}
                    gives it fast, grounded recall.
                  </p>
                  <div className="metrics">
                    <div className="metric">
                      <div className="metric__val">
                        90<em>%</em>
                      </div>
                      <div className="metric__lab">Smaller build</div>
                    </div>
                    <div className="metric">
                      <div className="metric__val">
                        40<em>%</em>
                      </div>
                      <div className="metric__lab">Workflow efficiency</div>
                    </div>
                    <div className="metric">
                      <div className="metric__val">
                        65<em>%</em>
                      </div>
                      <div className="metric__lab">Faster retrieval</div>
                    </div>
                    <div className="metric">
                      <div className="metric__val">
                        15<em>+</em>
                      </div>
                      <div className="metric__lab">Automated workflows</div>
                    </div>
                  </div>
                  <div className="proj-tech">
                    <span>React</span>
                    <span>Tailwind CSS</span>
                    <span>Tauri CLI</span>
                    <span>Node.js</span>
                    <span>Ollama</span>
                    <span>ChromaDB</span>
                    <span>OpenAI</span>
                  </div>
                </article>

                <article className="proj-panel" data-panel="1">
                  <div className="proj-mission">Mission 02</div>
                  <h3 className="proj-name">ClauseWatch</h3>
                  <div className="proj-sub">AI-Powered Contract Intelligence SaaS</div>
                  <p className="proj-desc">
                    A multi-tenant SaaS that turns raw contracts into structured, reviewable data. An{" "}
                    <strong>LLM extraction pipeline</strong> pulls fields from PDF and DOCX with{" "}
                    <strong>per-field confidence scoring</strong>. Tenants are isolated at the ORM layer
                    with <strong>tenant-scoped queries</strong>, verified for zero cross-tenant leakage
                    through automated integration tests, and secured with{" "}
                    <strong>five independent HMAC token systems</strong>.
                  </p>
                  <div className="metrics">
                    <div className="metric">
                      <div className="metric__val">5</div>
                      <div className="metric__lab">HMAC token systems</div>
                    </div>
                    <div className="metric">
                      <div className="metric__val">9</div>
                      <div className="metric__lab">Zero-downtime migrations</div>
                    </div>
                    <div className="metric">
                      <div className="metric__val">0</div>
                      <div className="metric__lab">Cross-tenant leaks</div>
                    </div>
                    <div className="metric">
                      <div className="metric__val">2</div>
                      <div className="metric__lab">Document formats</div>
                    </div>
                  </div>
                  <div className="proj-tech">
                    <span>Next.js</span>
                    <span>FastAPI</span>
                    <span>PostgreSQL</span>
                    <span>Alembic</span>
                    <span>OpenAI</span>
                  </div>
                </article>

                <article className="proj-panel" data-panel="2">
                  <div className="proj-mission">Mission 03</div>
                  <h3 className="proj-name">AccessForge</h3>
                  <div className="proj-sub">Accessibility Remediation Pipeline</div>
                  <p className="proj-desc">
                    An end-to-end pipeline that scans React apps, generates <strong>WCAG fixes</strong>,
                    verifies them independently, and opens GitHub pull requests. Orchestration runs on a{" "}
                    <strong>LangGraph deterministic state machine</strong> with a crash-recoverable async
                    pipeline backed by <strong>PostgreSQL state and Redis/RQ workers</strong>. It uses
                    multimodal visual-regression comparison, confidence-gated source localization, and
                    ElevenLabs TTS for multilingual audio summaries.
                  </p>
                  <div className="metrics">
                    <div className="metric">
                      <div className="metric__val">
                        100<em>%</em>
                      </div>
                      <div className="metric__lab">Build pass rate</div>
                    </div>
                    <div className="metric">
                      <div className="metric__val">20</div>
                      <div className="metric__lab">Benchmark cases</div>
                    </div>
                    <div className="metric">
                      <div className="metric__val">6</div>
                      <div className="metric__lab">WCAG categories</div>
                    </div>
                    <div className="metric">
                      <div className="metric__val">
                        10<em>+</em>
                      </div>
                      <div className="metric__lab">Audio languages</div>
                    </div>
                  </div>
                  <div className="proj-tech">
                    <span>FastAPI</span>
                    <span>LangGraph</span>
                    <span>PostgreSQL</span>
                    <span>Redis / RQ</span>
                    <span>Docker</span>
                    <span>ElevenLabs</span>
                    <span>Google OAuth</span>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="pad" aria-label="Experience">
          <div className="wrap">
            <div className="eyebrow r">
              <span className="num">03</span>
              <span className="dot" />
              <span className="lab">Experience</span>
            </div>
            <h2 className="section-title r" style={{ marginBottom: 70 }}>
              Mission Log
            </h2>

            <div className="log">
              <div className="log__line" aria-hidden="true" />
              <div className="log__line-fill" id="logFill" aria-hidden="true" />
              <div className="log__rocket" id="logRocket" aria-hidden="true">
                <div className="log__rocket-inner">
                  <svg viewBox="0 0 24 44" fill="none">
                    <path
                      className="log__flame"
                      d="M9 36c1.2 4 3 7 3 7s1.8-3 3-7c-1.4 1.2-4.6 1.2-6 0Z"
                      fill="#5E8BFF"
                    />
                    <path
                      d="M12 2.5 18 13v14.5c0 1.4-1.2 3.2-3.2 4.2L12 33.5l-2.8-1.8C7.2 30.7 6 28.9 6 27.5V13L12 2.5Z"
                      fill="#0C111B"
                      stroke="#8FD3E8"
                      strokeWidth="1.2"
                      strokeLinejoin="round"
                    />
                    <path d="M9 13h6" stroke="#5E8BFF" strokeWidth="1" />
                    <circle cx="12" cy="20" r="2.2" fill="#8FD3E8" />
                    <path d="M6 16.5 3.5 21 6 25.5" stroke="#5E8BFF" strokeWidth="1.1" strokeLinejoin="round" />
                    <path d="M18 16.5 20.5 21 18 25.5" stroke="#5E8BFF" strokeWidth="1.1" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div className="log__items">
                <article className="exp r">
                  <span className="exp__node" aria-hidden="true" />
                  <div className="exp__meta">
                    <span className="exp__org">RCSB Protein Data Bank</span>
                    <span className="exp__role">Scientific Software Research Assistant</span>
                    <span className="exp__when">Jul 2026 — Present</span>
                  </div>
                  <span className="exp__loc">New Brunswick, NJ</span>
                  <ul className="exp__body">
                    <li>
                      Built a new <strong>MCP server tool</strong> exposing the PDB search API to LLM
                      agents, enabling multi-service AND/OR queries in a single call by composing filter
                      nodes from 7 extended tools through a custom validation layer.
                    </li>
                    <li>
                      Traced parameter flow against tool documentation to fix{" "}
                      <strong>two silent data-corruption bugs</strong> in result-grouping logic,
                      preventing invalid API parameters and user configurations.
                    </li>
                  </ul>
                </article>

                <article className="exp r">
                  <span className="exp__node" aria-hidden="true" />
                  <div className="exp__meta">
                    <span className="exp__org">Rutgers AI &amp; Data Science Collaboratory</span>
                    <span className="exp__role">Summer Research Fellow · CSII SURF</span>
                    <span className="exp__when">May 2026 — Jul 2026</span>
                  </div>
                  <span className="exp__loc">New Brunswick, NJ</span>
                  <ul className="exp__body">
                    <li>
                      Redesigned a dictionary-driven column-typing model in <strong>py-mmcif&apos;s</strong>{" "}
                      data-compression pipeline with automatic detection and value-scanning
                      classification, cutting molecular structure file size by 27% and removing a
                      dependency on prior processing.
                    </li>
                    <li>
                      Researched binary-encoding chain algorithms alongside four researchers, improving
                      floating-point encoding to reduce compressed structure size by up to 76% across 37
                      varied PDB structures.
                    </li>
                  </ul>
                  <div className="exp__metrics">
                    <div className="exp__metric">
                      <div className="v">27%</div>
                      <div className="l">File size reduction</div>
                    </div>
                    <div className="exp__metric">
                      <div className="v">76%</div>
                      <div className="l">Compression improvement</div>
                    </div>
                    <div className="exp__metric">
                      <div className="v">37</div>
                      <div className="l">PDB structures</div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="pad" aria-label="About">
          <div className="wrap">
            <div className="about-grid">
              <div className="about__copy r">
                <div className="eyebrow">
                  <span className="num">04</span>
                  <span className="dot" />
                  <span className="lab">The person behind the work</span>
                </div>
                <h2 className="section-title">Off the Clock</h2>
                <p>
                  I&apos;m Hriday, a <strong>Computer Science and Economics</strong> student at Rutgers
                  University–New Brunswick. I enjoy building software where systems engineering, AI, and
                  practical problem solving intersect.
                </p>
                <p>
                  Outside of development, I&apos;m usually gaming on my PS5, reading about space, or
                  disappearing into another technical rabbit hole.
                </p>

                <div className="gaming">
                  <div className="pad-motif" aria-hidden="true">
                    <span className="halo" />
                    <span className="btn-dot t" />
                    <span className="btn-dot r" />
                    <span className="btn-dot b" />
                    <span className="btn-dot l" />
                  </div>
                  <div className="gaming__txt">
                    <span className="mono mono--accent">Space → controls</span>
                    The same instinct that pulls me toward orbital mechanics pulls me toward a
                    well-designed system: a small set of inputs, precise feedback, and a state you can
                    always read.
                  </div>
                </div>
              </div>

              <div className="portrait r" id="portrait">
                <img
                  src="/photo.png"
                  alt="Hriday Adani"
                  width={1086}
                  height={1448}
                  decoding="async"
                />
                <span className="portrait__cap">HRIDAY ADANI · 01</span>
              </div>
            </div>
          </div>
        </section>

        <section id="systems" className="pad" aria-label="Systems and tools">
          <div className="wrap">
            <div className="eyebrow r">
              <span className="num">05</span>
              <span className="dot" />
              <span className="lab">Technical stack</span>
            </div>
            <h2 className="section-title r" style={{ marginBottom: 56 }}>
              Systems &amp; Tools
            </h2>

            <div className="sys-grid r">
              <div className="sys-mod">
                <div className="sys-mod__num">01</div>
                <div className="sys-mod__t">Languages</div>
                <div className="sys-list">
                  <span>Python</span>
                  <span>Java</span>
                  <span>C</span>
                  <span>Rust</span>
                  <span>JavaScript</span>
                  <span>SQL</span>
                  <span>PHP</span>
                  <span>HTML / CSS</span>
                </div>
              </div>
              <div className="sys-mod">
                <div className="sys-mod__num">02</div>
                <div className="sys-mod__t">Systems &amp; Infra</div>
                <div className="sys-list">
                  <span>FastAPI</span>
                  <span>Flask</span>
                  <span>PostgreSQL</span>
                  <span>Docker</span>
                  <span>Tauri</span>
                  <span>MCP</span>
                  <span>Alembic</span>
                  <span>Neon</span>
                  <span>Cloudflare</span>
                  <span>WSL</span>
                </div>
              </div>
              <div className="sys-mod">
                <div className="sys-mod__num">03</div>
                <div className="sys-mod__t">Web &amp; Data</div>
                <div className="sys-list">
                  <span>React</span>
                  <span>Next.js</span>
                  <span>Tailwind CSS</span>
                  <span>Pandas</span>
                  <span>Scikit-Learn</span>
                  <span>Git</span>
                  <span>VS Code</span>
                  <span>IntelliJ</span>
                </div>
              </div>
            </div>

            <div className="edu r">
              <div>
                <div className="edu__school">Rutgers University — New Brunswick</div>
                <div className="edu__deg">B.S. Computer Science + Economics</div>
              </div>
              <div className="edu__course">
                Coursework: Data Structures · Artificial Intelligence · Algorithms
              </div>
              <div className="edu__grad">
                Expected
                <br />
                May 2027
              </div>
            </div>
          </div>
        </section>

        <section id="contact" aria-label="Contact">
          <div className="deep-planet" aria-hidden="true" />
          <div className="wrap">
            <div className="contact__lead r">Next mission?</div>
            <h2 className="contact__h r">
              Let&apos;s build
              <br />
              something
              <br />
              interesting.
            </h2>

            <div className="contact__links r">
              <a className="clink" href="mailto:hriday1136@gmail.com">
                <span className="clink__k">Email</span>
                <span className="clink__v">
                  hriday1136@gmail.com <span className="ar">↗</span>
                </span>
              </a>
              <a
                className="clink"
                href="https://linkedin.com/in/hridayadani"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="clink__k">LinkedIn</span>
                <span className="clink__v">
                  linkedin.com/in/hridayadani <span className="ar">↗</span>
                </span>
              </a>
              <a
                className="clink"
                href="https://github.com/hriday1136"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="clink__k">GitHub</span>
                <span className="clink__v">
                  github.com/hriday1136 <span className="ar">↗</span>
                </span>
              </a>
            </div>

            <div className="contact__foot">
              <div className="contact__name">HRIDAY ADANI</div>
              <div className="contact__note">
                Software Engineer · AI Systems · Research · Rutgers 2027
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
