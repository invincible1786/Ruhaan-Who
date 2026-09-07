import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useAssetFallback } from '../hooks/useAssetFallback'

gsap.registerPlugin(ScrollTrigger)

interface DragonIdleProps {
  forceError?: boolean
}

export default function DragonIdle({ forceError }: DragonIdleProps) {
  const fallback = useAssetFallback()
  const dragonContainerRef = useRef<HTMLDivElement>(null)

  // Use forceError for testing failed asset loads if passed
  const hasError = fallback.hasError || forceError
  const shouldAnimate = fallback.shouldAnimate && !forceError
  const canParallax = fallback.canParallax && !forceError

  // GSAP desktop parallax: disabled on mobile and under reduced motion/error states
  useEffect(() => {
    if (!canParallax || !dragonContainerRef.current) {
      return
    }

    const ctx = gsap.context(() => {
      gsap.to(dragonContainerRef.current, {
        y: 80,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    })

    return () => ctx.revert()
  }, [canParallax])

  return (
    <div
      ref={dragonContainerRef}
      className="relative flex flex-col items-center justify-center select-none"
      role="img"
      aria-label="Companion Dragon: Guardian of the Portfolio"
    >
      {/* Dragon Character Vector Rig */}
      <div
        className={`relative w-48 h-48 sm:w-60 sm:h-60 transition-transform duration-300 ${
          shouldAnimate ? 'animate-dragon-float' : ''
        }`}
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-[0_10px_25px_rgba(255,71,38,0.35)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="dragonBodyGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff4726" />
              <stop offset="50%" stopColor="#d9381e" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>

            <linearGradient id="dragonBellyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fcd34d" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>

            <linearGradient id="wingGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="60%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>

          {/* Background Wing */}
          <g className={shouldAnimate ? 'animate-wing-beat origin-[120px_90px]' : ''}>
            <path
              d="M120,85 C145,45 175,40 185,55 C180,75 160,95 130,105 Z"
              fill="url(#wingGrad)"
              opacity="0.8"
            />
            {/* Wing Claws / Ribs */}
            <path
              d="M125,85 L180,55 M145,75 L170,80"
              stroke="#0ea5e9"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>

          {/* Dragon Tail with Flame Tip */}
          <path
            d="M80,140 C50,155 35,145 25,160 C35,168 60,165 95,148 Z"
            fill="url(#dragonBodyGrad)"
          />
          {/* Tail Flame Tuft */}
          <polygon
            points="22,160 10,162 18,152 12,146 25,150"
            fill="#f59e0b"
            className={shouldAnimate ? 'animate-pulse' : ''}
          />

          {/* Dragon Main Body */}
          <ellipse cx="105" cy="120" rx="35" ry="28" fill="url(#dragonBodyGrad)" />

          {/* Golden Armored Belly Scales */}
          <path
            d="M85,115 C90,135 115,140 125,128 C120,118 105,112 85,115 Z"
            fill="url(#dragonBellyGrad)"
          />
          <line x1="90" y1="122" x2="115" y2="122" stroke="#b45309" strokeWidth="1.5" />
          <line x1="95" y1="128" x2="120" y2="128" stroke="#b45309" strokeWidth="1.5" />

          {/* Foreground Wing */}
          <g className={shouldAnimate ? 'animate-wing-beat-front origin-[110px_95px]' : ''}>
            <path
              d="M110,95 C135,35 180,30 190,50 C185,75 155,100 120,115 Z"
              fill="url(#wingGrad)"
            />
            <path
              d="M115,95 L185,50 M140,80 L175,70 M135,100 L160,95"
              stroke="#7dd3fc"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Wing Spine Horn */}
            <polygon points="183,48 193,45 188,54" fill="#f59e0b" />
          </g>

          {/* Neck & Head */}
          <path
            d="M115,105 C125,85 140,75 155,75 C165,75 175,82 170,95 C155,105 130,115 115,105 Z"
            fill="url(#dragonBodyGrad)"
          />

          {/* Snout & Jaw */}
          <polygon points="160,78 185,84 165,96 150,92" fill="url(#dragonBodyGrad)" />
          {/* Subtle Snout Ember Smoke */}
          <circle
            cx="182"
            cy="84"
            r="2"
            fill="#f59e0b"
            className={shouldAnimate ? 'animate-ping' : ''}
          />

          {/* Piercing Golden Eye */}
          <polygon points="154,80 162,82 157,86 152,83" fill="#0a0c16" />
          <circle cx="157" cy="83" r="2" fill="#fcd34d" />
          <circle cx="157" cy="83" r="1" fill="#0a0c16" />

          {/* Dragon Horns */}
          <path
            d="M142,75 C145,55 135,45 130,40 C138,50 148,65 148,74 Z"
            fill="#f59e0b"
          />
          <path
            d="M148,75 C155,58 150,48 145,43 C152,53 156,66 154,75 Z"
            fill="#fbbf24"
          />

          {/* Cute Dragon Arm / Claw */}
          <path
            d="M130,118 C140,122 145,126 142,130 C136,132 130,125 125,122 Z"
            fill="#d9381e"
          />
          {/* Claws */}
          <circle cx="143" cy="128" r="1.5" fill="#f59e0b" />
          <circle cx="141" cy="131" r="1.5" fill="#f59e0b" />
        </svg>
      </div>

      {/* Floating Ground Shadow (scales inversely with height during float) */}
      <div
        className={`w-28 sm:w-36 h-3.5 rounded-[100%] bg-[#ff4726]/15 blur-sm mt-1 transition-transform duration-300 ${
          shouldAnimate ? 'animate-dragon-shadow' : ''
        }`}
        aria-hidden="true"
      />

      {/* Fallback indicator in dev mode if error triggered */}
      {hasError && (
        <span className="sr-only">
          Dragon rendering active in static fallback mode.
        </span>
      )}
    </div>
  )
}
