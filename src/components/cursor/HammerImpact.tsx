import { useEffect, useRef } from 'react'
import { useReducedMotion } from './useReducedMotion'

interface Point {
  x: number
  y: number
}

interface Branch {
  points: Point[]
}

interface Bolt {
  points: Point[]
  branches: Branch[]
}

interface Impact {
  x: number
  y: number
  start: number
  duration: number
  bolts: Bolt[]
}

function createBolt(angle: number, maxDist: number, segments: number): Bolt {
  const points: Point[] = [{ x: 0, y: 0 }]
  const branches: Branch[] = []

  let currX = 0
  let currY = 0
  const segDist = maxDist / segments

  for (let i = 1; i <= segments; i++) {
    const isEnd = i === segments
    const jitter = isEnd ? 0 : (Math.random() - 0.5) * 8

    // Step along the ray + tight perpendicular displacement
    currX = Math.cos(angle) * (segDist * i) + Math.cos(angle + Math.PI / 2) * jitter
    currY = Math.sin(angle) * (segDist * i) + Math.sin(angle + Math.PI / 2) * jitter

    points.push({ x: currX, y: currY })

    // Secondary fork / crack
    if (i >= 2 && i < segments && Math.random() < 0.35) {
      const branchAngle = angle + (Math.random() < 0.5 ? 0.5 : -0.5) + (Math.random() - 0.5) * 0.2
      const branchLen = segDist * 0.9
      const bPoints: Point[] = [{ x: currX, y: currY }]

      const bSteps = 2
      let bx = currX
      let by = currY
      for (let j = 1; j <= bSteps; j++) {
        const bJitter = (Math.random() - 0.5) * 5
        bx += Math.cos(branchAngle) * (branchLen / bSteps) + Math.cos(branchAngle + Math.PI / 2) * bJitter
        by += Math.sin(branchAngle) * (branchLen / bSteps) + Math.sin(branchAngle + Math.PI / 2) * bJitter
        bPoints.push({ x: bx, y: by })
      }
      branches.push({ points: bPoints })
    }
  }

  return { points, branches }
}

function createImpact(x: number, y: number, now: number): Impact {
  const count = 7 + Math.floor(Math.random() * 4) // 7-10 compact cracks
  const bolts: Bolt[] = []

  for (let i = 0; i < count; i++) {
    const baseAngle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.35
    const length = 12 + Math.random() * 12 // Short 12-24px lines
    const segments = 3 // Compact 3 segments
    bolts.push(createBolt(baseAngle, length, segments))
  }

  return {
    x,
    y,
    start: now,
    duration: 140, // Crisp 140ms duration for minimal lag
    bolts,
  }
}

export default function HammerImpact() {
  const prefersReducedMotion = useReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const impactsRef = useRef<Impact[]>([])
  const isAnimatingRef = useRef(false)

  useEffect(() => {
    if (prefersReducedMotion) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let dpr = window.devicePixelRatio || 1

    const handleResize = () => {
      dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    const drawPath = (pts: Point[], ox: number, oy: number, reach: number) => {
      if (pts.length < 2) return
      ctx.beginPath()
      ctx.moveTo(ox + pts[0].x, oy + pts[0].y)

      const maxIdx = Math.max(1, Math.min(pts.length - 1, Math.ceil(reach * (pts.length - 1))))
      for (let i = 1; i <= maxIdx; i++) {
        ctx.lineTo(ox + pts[i].x, oy + pts[i].y)
      }
      ctx.stroke()
    }

    const render = (now: number) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      impactsRef.current = impactsRef.current.filter((impact) => {
        const elapsed = now - impact.start
        const progress = elapsed / impact.duration
        if (progress >= 1) return false

        const alpha = Math.max(0, 1 - progress)
        // Rapid expansion during first 25%, then quick fade
        const reach = Math.min(1, progress * 4.5)

        ctx.save()

        // 1. Central Impact Flash Core
        if (progress < 0.4) {
          const flashAlpha = (1 - progress / 0.4) * 0.95
          const flashRad = 3 + progress * 14
          const grad = ctx.createRadialGradient(
            impact.x,
            impact.y,
            0,
            impact.x,
            impact.y,
            flashRad
          )
          grad.addColorStop(0, `rgba(255, 255, 255, ${flashAlpha})`)
          grad.addColorStop(0.4, `rgba(56, 189, 248, ${flashAlpha * 0.8})`)
          grad.addColorStop(1, 'rgba(56, 189, 248, 0)')

          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(impact.x, impact.y, flashRad, 0, Math.PI * 2)
          ctx.fill()
        }

        // 2. Cyan Outer Electric Glow Pass
        ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.85})`
        ctx.lineWidth = 2.2
        ctx.shadowBlur = 8
        ctx.shadowColor = 'rgba(0, 240, 255, 0.95)'
        ctx.lineCap = 'round'
        ctx.lineJoin = 'miter'

        for (const bolt of impact.bolts) {
          drawPath(bolt.points, impact.x, impact.y, reach)
          for (const b of bolt.branches) {
            drawPath(b.points, impact.x, impact.y, reach)
          }
        }

        // 3. Crisp White Ionization Core Pass
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.95})`
        ctx.lineWidth = 1.0
        ctx.shadowBlur = 2
        ctx.shadowColor = 'rgba(255, 255, 255, 0.9)'

        for (const bolt of impact.bolts) {
          drawPath(bolt.points, impact.x, impact.y, reach)
          for (const b of bolt.branches) {
            drawPath(b.points, impact.x, impact.y, reach)
          }
        }

        ctx.restore()
        return true
      })

      if (impactsRef.current.length > 0) {
        requestAnimationFrame(render)
      } else {
        isAnimatingRef.current = false
      }
    }

    const handleClick = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return

      const now = performance.now()
      impactsRef.current.push(createImpact(e.clientX, e.clientY, now))

      // No document.body transforms to avoid any background repainting/vanishing
      if (!isAnimatingRef.current) {
        isAnimatingRef.current = true
        requestAnimationFrame(render)
      }
    }

    window.addEventListener('pointerdown', handleClick, { passive: true })

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('pointerdown', handleClick)
    }
  }, [prefersReducedMotion])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none select-none z-[99999]"
    />
  )
}

