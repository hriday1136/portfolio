"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AccessForgeVisual } from "@/components/projects/AccessForgeVisual";
import { ClauseWatchVisual } from "@/components/projects/ClauseWatchVisual";
import { EpochOSVisual } from "@/components/projects/EpochOSVisual";
import { ProjectMetrics } from "@/components/projects/ProjectMetrics";
import type { Project } from "@/data/projects";

type ProjectPanelProps = {
  project: Project;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function ProjectPanel({ project }: ProjectPanelProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.id}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.55, ease }}
        className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16"
      >
        <div className="relative min-h-[280px] overflow-hidden border border-white/8 bg-background-elevated/70 p-4 sm:min-h-[320px] sm:p-6 lg:h-[380px]">
          {project.id === "epochos" ? <EpochOSVisual active /> : null}
          {project.id === "clausewatch" ? <ClauseWatchVisual active /> : null}
          {project.id === "accessforge" ? <AccessForgeVisual active /> : null}
        </div>

        <div className="flex flex-col justify-center">
          <p className="font-mono text-[11px] tracking-[0.18em] text-foreground-muted uppercase">
            {project.stack}
          </p>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-foreground/92">
            {project.summary}
          </p>
          <ul className="mt-6 max-w-lg space-y-3 text-sm leading-relaxed text-foreground-muted">
            {project.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
          <div className="mt-10">
            <ProjectMetrics metrics={project.metrics} />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
