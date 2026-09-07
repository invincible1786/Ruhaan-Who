import { useEffect, useState } from 'react'

export interface AssetFallbackState {
  prefersReducedMotion: boolean
  isMobile: boolean
  hasError: boolean
  shouldAnimate: boolean
  canParallax: boolean
  triggerError: () => void
  resetError: () => void
}

export function useAssetFallback(): AssetFallbackState {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(max-width: 767px)').matches
  })

  const [hasError, setHasError] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mobileQuery = window.matchMedia('(max-width: 767px)')

    const updateMotion = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    const updateMobile = (e: MediaQueryListEvent) => setIsMobile(e.matches)

    motionQuery.addEventListener('change', updateMotion)
    mobileQuery.addEventListener('change', updateMobile)

    return () => {
      motionQuery.removeEventListener('change', updateMotion)
      mobileQuery.removeEventListener('change', updateMobile)
    }
  }, [])

  // Single shared fallback logic:
  // If prefers-reduced-motion is true OR asset loading errored, animation is completely disabled.
  const shouldAnimate = !prefersReducedMotion && !hasError

  // Parallax is strictly disabled on mobile (<768px) and under reduced motion/error states
  const canParallax = shouldAnimate && !isMobile

  return {
    prefersReducedMotion,
    isMobile,
    hasError,
    shouldAnimate,
    canParallax,
    triggerError: () => setHasError(true),
    resetError: () => setHasError(false),
  }
}
