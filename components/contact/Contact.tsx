import { ArrowUpRight } from "lucide-react";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { site } from "@/data/site";

const links = [
  { label: "Email", href: `mailto:${site.email}`, value: site.email },
  { label: "LinkedIn", href: site.linkedin, value: "linkedin.com/in/hridayadani" },
  { label: "GitHub", href: site.github, value: "github.com/hriday1136" },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-background px-5 py-24 sm:px-8 lg:px-12 lg:py-36"
      aria-labelledby="contact-heading"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="distant-planet bottom-[18%] right-[14%]" aria-hidden="true" />
        <div
          className="absolute top-[22%] left-[18%] h-0.5 w-0.5 rounded-full bg-white/70"
          aria-hidden="true"
        />
        <div
          className="absolute top-[40%] left-[62%] h-px w-px rounded-full bg-white/50"
          aria-hidden="true"
        />
        <div
          className="absolute top-[58%] left-[30%] h-0.5 w-0.5 rounded-full bg-white/40"
          aria-hidden="true"
        />
      </div>

      <div className="relative mx-auto max-w-[1440px]">
        <SectionLabel>05 / Contact</SectionLabel>
        <RevealText
          id="contact-heading"
          className="mt-4 text-5xl tracking-tight text-foreground uppercase sm:text-7xl lg:text-8xl"
        >
          Next Mission?
        </RevealText>
        <p className="mt-6 max-w-lg text-lg text-foreground-muted">
          Let’s build something interesting.
        </p>

        <ul className="mt-16 max-w-xl space-y-4">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="group flex min-h-14 items-center justify-between border-b border-white/10 py-4 text-foreground transition-colors hover:text-accent"
              >
                <span className="font-mono text-[11px] tracking-[0.18em] text-foreground-muted uppercase">
                  {link.label}
                </span>
                <span className="flex items-center gap-2 text-sm sm:text-base">
                  {link.value}
                  <ArrowUpRight
                    size={16}
                    className="opacity-50 transition-opacity group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-20 font-mono text-[10px] tracking-[0.18em] text-foreground-muted uppercase">
          {site.location} · {site.opportunity}
        </p>
      </div>
    </section>
  );
}
