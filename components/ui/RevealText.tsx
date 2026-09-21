"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/animations/usePrefersReducedMotion";

type RevealTextProps = {
  as?: "h1" | "h2" | "h3" | "p";
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export function RevealText({
  as: Tag = "h2",
  children,
  className,
  id,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced) return;

    node.style.clipPath = "inset(0 0 100% 0)";
    node.style.opacity = "0.35";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        node.style.transition =
          "clip-path 1.1s cubic-bezier(0.22, 1, 0.36, 1), opacity 1.1s ease";
        node.style.clipPath = "inset(0 0 0% 0)";
        node.style.opacity = "1";
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <Tag ref={ref as never} id={id} className={cn("font-display", className)}>
      {children}
    </Tag>
  );
}
