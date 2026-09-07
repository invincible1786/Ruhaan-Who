import { createNoise2D } from 'simplex-noise'

const noise = createNoise2D()

type State = { x: number; y: number; vx: number; vy: number }

const MAX_SPEED = 0.045 // px / ms
const MAX_FORCE = 0.00012
const DAMPING = 0.985
const MAX_TURN = 0.0035 // rad / ms (fully dt-scaled)

export function createFlightSteering(getBounds: () => { w: number; h: number }) {
  const state: State = { x: 0, y: 0, vx: 0, vy: 0 }
  let heading = 0
  let waypointT = 0
  let initialized = false

  function nextWaypoint(bounds: { w: number; h: number }) {
    waypointT += 0.00006
    return {
      x: (noise(waypointT, 0) * 0.5 + 0.5) * bounds.w,
      y: (noise(0, waypointT) * 0.5 + 0.5) * bounds.h * 0.55,
    }
  }

  return function step(dt: number, scrollVel = 0) {
    const bounds = getBounds()

    if (!initialized) {
      state.x = bounds.w * 0.55
      state.y = bounds.h * 0.28
      initialized = true
    }

    const target = nextWaypoint(bounds)
    const dx = target.x - state.x
    const dy = target.y - state.y
    const dist = Math.max(Math.hypot(dx, dy), 1)

    const desiredVx = (dx / dist) * MAX_SPEED
    const desiredVy = (dy / dist) * MAX_SPEED

    let ax = (desiredVx - state.vx) * MAX_FORCE * dt
    let ay = (desiredVy - state.vy) * MAX_FORCE * dt

    // Soft boundary repulsion
    const margin = 40
    if (state.x < margin) ax += (margin - state.x) * 0.00008
    if (state.x > bounds.w - margin) ax -= (state.x - (bounds.w - margin)) * 0.00008
    if (state.y < margin) ay += (margin - state.y) * 0.00008
    if (state.y > bounds.h - margin) ay -= (state.y - (bounds.h - margin)) * 0.00008

    state.vx = (state.vx + ax) * DAMPING
    state.vy = (state.vy + ay) * DAMPING

    // Subtle reaction to fast scrolling
    state.vy += Math.min(Math.abs(scrollVel) * 0.000015, 0.008)

    state.x += state.vx * dt
    state.y += state.vy * dt

    // dt-scaled turn-rate limit (prevents heading snaps)
    const targetHeading = Math.atan2(state.vy, state.vx)
    let delta = Math.atan2(
      Math.sin(targetHeading - heading),
      Math.cos(targetHeading - heading)
    )
    const maxDelta = MAX_TURN * dt
    delta = Math.max(-maxDelta, Math.min(maxDelta, delta))
    heading += delta

    return {
      x: state.x,
      y: state.y,
      angle: heading * (180 / Math.PI) * 0.38, // damped bank
    }
  }
}
