export type Star = {
  id: number
  x: number
  y: number
  r: number
  opacity: number
  twinkle: boolean
};

function mulberry32(seed: number) {
  let t = seed;
  return () => {
    t += 0x6d2b79f5;
    let n = Math.imul(t ^ (t >>> 15), 1 | t);
    n ^= n + Math.imul(n ^ (n >>> 7), 61 | n);
    return ((n ^ (n >>> 14)) >>> 0) / 4294967296;
  };
}

export function createStars(count: number, seed = 1136): Star[] {
  const rand = mulberry32(seed);
  return Array.from({ length: count }, (_, id) => ({
    id,
    x: rand() * 100,
    y: rand() * 100,
    r: rand() * 1.15 + 0.18,
    opacity: rand() * 0.55 + 0.18,
    twinkle: rand() > 0.72,
  }));
}
