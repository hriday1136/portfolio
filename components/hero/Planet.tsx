type PlanetProps = {
  className?: string;
};

export function Planet({ className }: PlanetProps) {
  return (
    <div className={className ?? "planet-shell"} aria-hidden="true">
      <div className="planet-glow" />
      <div className="planet-limb" />
      <div className="planet-body">
        <div className="planet-band" />
        <div className="planet-terminator" />
      </div>
    </div>
  );
}
