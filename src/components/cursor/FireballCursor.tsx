import { useEffect, useRef } from 'react'
import { useReducedMotion } from './useReducedMotion'
import { useCoarsePointer } from './useCoarsePointer'
import { FIRE, heartbeat } from '../shared/firePalette'

type Particle = {
  x: number
  y: number
  life: number
  maxLife: number
  size: number
  vx: number
  vy: number
}

export default function FireballCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const pointer = useRef({ x: -999, y: -999 })
  const velocity = useRef({ vx: 0, vy: 0 })
  const hovering = useRef(false)
  const lastSpawn = useRef({ x: -999, y: -999 })
  const flameImgRef = useRef<HTMLImageElement | null>(null)
  const reduced = useReducedMotion()
  const coarse = useCoarsePointer()
  const active = !reduced && !coarse

  // Preload flame sprite from Image 2
  useEffect(() => {
    if (!active) return
    const img = new Image()
    img.src = '/cursor/flame.png'
    img.onload = () => {
      flameImgRef.current = img
    }
  }, [active])

  useEffect(() => {
    if (!active) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr = window.devicePixelRatio || 1

    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e: PointerEvent) => {
      const prevX = pointer.current.x
      const prevY = pointer.current.y
      pointer.current = { x: e.clientX, y: e.clientY }

      if (prevX > -500) {
        // Track smoothed velocity for flame leaning
        velocity.current.vx = velocity.current.vx * 0.6 + (e.clientX - prevX) * 0.4
        velocity.current.vy = velocity.current.vy * 0.6 + (e.clientY - prevY) * 0.4
      }

      // Distance-based spark spawn limiting
      const dx = e.clientX - lastSpawn.current.x
      const dy = e.clientY - lastSpawn.current.y
      if (Math.hypot(dx, dy) >= 6) {
        lastSpawn.current = { x: e.clientX, y: e.clientY }

        // Spawn trailing ember sparks
        if (particles.current.length < 54) {
          const spread = 8
          particles.current.push({
            x: e.clientX + (Math.random() - 0.5) * spread,
            y: e.clientY + (Math.random() - 0.5) * spread,
            life: 1,
            maxLife: 1,
            size: 2 + Math.random() * 2.5,
            vx: -velocity.current.vx * 0.15 + (Math.random() - 0.5) * 0.6,
            vy: -velocity.current.vy * 0.15 - Math.random() * 0.8 - 0.3,
          })
        }
      }
    }

    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null
      if (t && typeof t.closest === 'function') {
        hovering.current = !!t.closest(
          "a, button, [role='button'], input, textarea, select"
        )
      } else {
        hovering.current = false
      }
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerover', onOver)

    let raf = 0
    let lastTime = performance.now()

    const draw = (now: number) => {
      if (document.visibilityState === 'hidden') {
        raf = requestAnimationFrame(draw)
        return
      }

      const dt = Math.min((now - lastTime) / 16.667, 2)
      lastTime = now

      // Decay velocity
      velocity.current.vx *= 0.88
      velocity.current.vy *= 0.88

      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr)
      const pulse = heartbeat(now)

      // Ambient rising fire sparks from the flame even when resting
      if (pointer.current.x > -500 && Math.random() < 0.28 && particles.current.length < 54) {
        particles.current.push({
          x: pointer.current.x + (Math.random() - 0.5) * 12,
          y: pointer.current.y - Math.random() * 10,
          life: 1,
          maxLife: 1,
          size: 1.5 + Math.random() * 2,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -Math.random() * 0.9 - 0.4,
        })
      }

      // Draw and update trailing fire embers
      for (const p of particles.current) {
        p.life -= 0.024 * dt
        p.x += p.vx * dt
        p.y += p.vy * dt

        const t = Math.max(p.life, 0)
        // Fire cooling color ramp: White -> Golden Amber -> Deep Ember Crimson
        const r = Math.round(255 * t + 200 * (1 - t))
        const g = Math.round(240 * (t * t) + 40 * (1 - t))
        const b = Math.round(180 * (t * t * t) + 15 * (1 - t))
        const radius = p.size * (0.5 + t * 0.5)

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 2.2)
        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${t})`)
        grad.addColorStop(0.5, `rgba(${FIRE.mid}, ${t * 0.6})`)
        grad.addColorStop(1, `rgba(${FIRE.edge}, 0)`)

        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(p.x, p.y, radius * 2, 0, Math.PI * 2)
        ctx.fill()
      }
      particles.current = particles.current.filter((p) => p.life > 0)

      const { x, y } = pointer.current
      if (x > -500) {
        ctx.save()
        ctx.translate(x, y)

        // Lean flame subtly into movement velocity
        const leanAngle = Math.max(-0.25, Math.min(0.25, velocity.current.vx * 0.02))
        ctx.rotate(leanAngle)

        // Flame flicker & scale
        const flicker = 1 + Math.sin(now * 0.018) * 0.04 + Math.sin(now * 0.035) * 0.03
        const isHover = hovering.current
        const scaleFactor = (isHover ? 1.35 : 1.0) * pulse * flicker

        const flameImg = flameImgRef.current
        if (flameImg && flameImg.complete && flameImg.naturalWidth > 0) {
          // Flame plume dimensions (aspect ratio ~ 307:455)
          const baseW = 34 * scaleFactor
          const baseH = 50 * scaleFactor

          // Base of flame sits directly on the pointer point
          const drawX = -baseW / 2
          const drawY = -baseH * 0.82

          ctx.drawImage(flameImg, drawX, drawY, baseW, baseH)
        }

        // Blazing white-hot core radial bloom at flame base
        const coreR = (isHover ? 16 : 11) * pulse
        const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, coreR * 1.5)
        coreGrad.addColorStop(0, `rgba(${FIRE.core}, 0.95)`)
        coreGrad.addColorStop(0.35, `rgba(${FIRE.mid}, 0.7)`)
        coreGrad.addColorStop(0.75, `rgba(${FIRE.edge}, 0.3)`)
        coreGrad.addColorStop(1, `rgba(${FIRE.edge}, 0)`)

        ctx.fillStyle = coreGrad
        ctx.beginPath()
        ctx.arc(0, 0, coreR * 1.5, 0, Math.PI * 2)
        ctx.fill()

        // Hover affordance: radiant golden halo ring
        if (isHover) {
          ctx.strokeStyle = `rgba(${FIRE.mid}, 0.65)`
          ctx.lineWidth = 1.8
          ctx.beginPath()
          ctx.arc(0, 0, coreR + 6, 0, Math.PI * 2)
          ctx.stroke()
        }

        ctx.restore()
      }

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    document.body.classList.add('fireball-cursor-active')

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      cancelAnimationFrame(raf)
      document.body.classList.remove('fireball-cursor-active')
    }
  }, [active])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'screen',
      }}
    />
  )
}
