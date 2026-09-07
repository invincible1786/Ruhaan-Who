import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useAssetFallback } from '../hooks/useAssetFallback'

gsap.registerPlugin(ScrollTrigger)

export default function CastleBackground() {
  const { canParallax } = useAssetFallback()
  const farLayerRef = useRef<SVGGElement>(null)
  const midLayerRef = useRef<SVGGElement>(null)

  useEffect(() => {
    // If mobile (<768px) or reduced motion, DO NOT initialize or run any GSAP ScrollTrigger parallax
    if (!canParallax) {
      return
    }

    const ctx = gsap.context(() => {
      // Gentle parallax scrub on distant elements

      if (farLayerRef.current) {
        gsap.to(farLayerRef.current, {
          y: 40,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
          },
        })
      }

      if (midLayerRef.current) {
        gsap.to(midLayerRef.current, {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.8,
          },
        })
      }
    })

    return () => ctx.revert()
  }, [canParallax])

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMin slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#070913" />
            <stop offset="40%" stopColor="#0a0e1c" />
            <stop offset="80%" stopColor="#101528" />
            <stop offset="100%" stopColor="#0a0c16" />
          </linearGradient>


          <linearGradient id="castleGradFar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#12182c" />
            <stop offset="100%" stopColor="#0d1120" />
          </linearGradient>

          <linearGradient id="castleGradMid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#18223d" />
            <stop offset="100%" stopColor="#0a0c16" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Sky Base */}
        <rect width="1440" height="900" fill="url(#skyGrad)" />


        {/* Ambient Pixel Stars (Subtle, non-distracting) */}
        <g opacity="0.4" fill="#f8fafc">
          <rect x="120" y="80" width="2" height="2" />
          <rect x="250" y="140" width="3" height="3" />
          <rect x="420" y="60" width="2" height="2" />
          <rect x="580" y="110" width="3" height="3" />
          <rect x="740" y="90" width="2" height="2" />
          <rect x="890" y="160" width="2" height="2" />
          <rect x="1020" y="70" width="3" height="3" />
          <rect x="1310" y="130" width="2" height="2" />
          <rect x="340" y="210" width="2" height="2" />
          <rect x="680" y="240" width="2" height="2" />
        </g>

        {/* Far Silhouette: Distant Mountains & Castle Spires */}
        <g ref={farLayerRef} fill="url(#castleGradFar)" opacity="0.6">
          <path d="M0,450 L120,410 L240,440 L380,390 L520,430 L640,370 L780,420 L910,380 L1050,430 L1180,390 L1320,430 L1440,400 L1440,900 L0,900 Z" />
          {/* Far Castle Towers */}
          <rect x="620" y="320" width="24" height="60" />
          <polygon points="620,320 632,290 644,320" />
          <rect x="650" y="340" width="18" height="40" />
          <polygon points="650,340 659,320 668,340" />
          <rect x="940" y="330" width="26" height="60" />
          <polygon points="940,330 953,300 966,330" />
        </g>

        {/* Midground Silhouette: Castle Battlements & Ramparts */}
        <g ref={midLayerRef} fill="url(#castleGradMid)" opacity="0.85">
          {/* Left Bastion */}
          <rect x="0" y="550" width="180" height="350" />
          <rect x="20" y="520" width="30" height="30" />
          <rect x="70" y="520" width="30" height="30" />
          <rect x="120" y="520" width="30" height="30" />

          {/* Center Castle Wall */}
          <path d="M180,620 L350,600 L500,610 L680,590 L850,610 L1020,590 L1200,610 L1440,580 L1440,900 L180,900 Z" />

          {/* Right Fortress Spires */}
          <rect x="1260" y="470" width="40" height="130" />
          <polygon points="1255,470 1280,420 1305,470" fill="#222e4f" />
          <rect x="1320" y="510" width="30" height="90" />
          <polygon points="1315,510 1335,465 1355,510" fill="#222e4f" />
        </g>

        {/* Atmospheric Castle Fog Gradient at bottom */}
        <rect
          x="0"
          y="650"
          width="1440"
          height="250"
          fill="url(#skyGrad)"
          opacity="0.9"
        />
      </svg>
    </div>
  )
}
