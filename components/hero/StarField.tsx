"use client";

import { createStars } from "@/lib/stars";
import { cn } from "@/lib/cn";

const stars = createStars(110);

type StarFieldProps = {
  className?: string;
};

export function StarField({ className }: StarFieldProps) {
  return (
    <svg
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {stars.map((star) => (
        <circle
          key={star.id}
          className={cn("star", star.twinkle && "twinkle")}
          cx={star.x}
          cy={star.y}
          r={star.r * 0.35}
          fill="#F4F6F8"
          opacity={star.opacity}
          style={star.twinkle ? { animationDelay: `${(star.id % 9) * 0.35}s` } : undefined}
        />
      ))}
    </svg>
  );
}
