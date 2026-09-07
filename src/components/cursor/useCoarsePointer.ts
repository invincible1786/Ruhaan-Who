import { useSyncExternalStore } from 'react'

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => {}
  const mq = window.matchMedia('(pointer: coarse)')
  mq.addEventListener('change', callback)
  return () => mq.removeEventListener('change', callback)
}

function getSnapshot() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(pointer: coarse)').matches
}

function getServerSnapshot() {
  return false
}

export function useCoarsePointer() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
