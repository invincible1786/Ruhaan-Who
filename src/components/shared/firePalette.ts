export const FIRE = {
  core: "255, 240, 200", // near-white hot center
  mid: "255, 140, 40", // amber
  edge: "200, 40, 20", // cooled ember
} as const

/** Single time source so both systems stay phase-locked */
export function heartbeat(now: number) {
  return 1 + Math.sin(now * 0.0015) * 0.06 // ≈ 3.2 s period
}
