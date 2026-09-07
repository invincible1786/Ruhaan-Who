import { track as vercelTrack } from '@vercel/analytics'

export function trackEvent(name: string, properties?: Record<string, string | number | boolean>) {
  // Always log in development for immediate debug verification
  if (import.meta.env.DEV) {
    console.info(`[Analytics Event] ${name}`, properties)
  }

  try {
    vercelTrack(name, properties)
  } catch (err) {
    // Non-blocking in dev or environments without Vercel backend
    if (import.meta.env.DEV) {
      console.debug('[Analytics] Local environment note:', err)
    }
  }
}
