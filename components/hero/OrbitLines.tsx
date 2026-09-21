type OrbitLinesProps = {
  className?: string;
};

export function OrbitLines({ className }: OrbitLinesProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 900"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <ellipse
        className="orbit-path"
        cx="720"
        cy="560"
        rx="520"
        ry="168"
        transform="rotate(-12 720 560)"
      />
      <ellipse
        className="orbit-path accent"
        cx="740"
        cy="540"
        rx="430"
        ry="132"
        transform="rotate(16 740 540)"
      />
      <ellipse
        className="orbit-path"
        cx="700"
        cy="590"
        rx="620"
        ry="210"
        transform="rotate(-4 700 590)"
        opacity="0.55"
      />
    </svg>
  );
}
