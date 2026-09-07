import { useEffect, useRef } from 'react'
import { createFlightSteering } from './useFlightSteering'
import { useReducedMotion } from '../cursor/useReducedMotion'
import { heartbeat } from '../shared/firePalette'

export default function DragonCompanion() {
  const reduced = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const scrollVel = useRef(0)
  const lastY = useRef(0)
  const nearCursor = useRef(false)

  const getBounds = () => {
    const el = rootRef.current?.parentElement
    if (!el) return { w: 900, h: 320 }
    return { w: el.clientWidth, h: el.clientHeight }
  }

  // Track scroll velocity
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      scrollVel.current = y - lastY.current
      lastY.current = y
    };
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Main flight loop
  useEffect(() => {
    if (reduced || !rootRef.current) return

    const step = createFlightSteering(getBounds)
    let raf = 0
    let prev = performance.now()

    const tick = (now: number) => {
      if (document.visibilityState === 'hidden') {
        prev = now
        raf = requestAnimationFrame(tick)
        return
      }

      const dt = Math.min(now - prev, 48) // clamp large gaps
      prev = now
      scrollVel.current *= 0.88

      const { x, y, angle } = step(dt, scrollVel.current)

      if (rootRef.current) {
        rootRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${angle}deg)`
      }

      // Shared heartbeat + proximity brighten
      if (glowRef.current) {
        const pulse = heartbeat(now)
        const boost = nearCursor.current ? 1.35 : 1
        glowRef.current.style.opacity = String(0.32 * pulse * boost)
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced])

  // The single shared interaction: cursor near dragon → glow brightens
  useEffect(() => {
    if (reduced) return
    const onMove = (e: PointerEvent) => {
      const node = rootRef.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      nearCursor.current = Math.hypot(e.clientX - cx, e.clientY - cy) < 140
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduced])

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`dragon-companion ${reduced ? 'dragon-static' : ''}`}
    >
      <div ref={glowRef} className="dragon-glow" />
      <div className="dragon-sprite" />
    </div>
  )
}
