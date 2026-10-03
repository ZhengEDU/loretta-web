// Deterministic pseudo-random helpers, seeded by index, so scrapbook layouts
// (rotation, tape position, etc.) stay stable between renders instead of
// jittering on every re-render.
export function seededRandom(seed) {
  const x = Math.sin(seed * 999) * 10000;
  return x - Math.floor(x);
}

export function seededRange(seed, min, max) {
  return min + seededRandom(seed) * (max - min);
}

export function pick(seed, arr) {
  return arr[Math.floor(seededRandom(seed) * arr.length) % arr.length];
}
