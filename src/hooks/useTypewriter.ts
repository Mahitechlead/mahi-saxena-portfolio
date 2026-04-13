import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export function useTypewriter(
  phrases: readonly string[],
  typingMs = 48,
  pauseMs = 2400,
): string {
  const reduced = usePrefersReducedMotion()
  const fallback = phrases[0] ?? ''
  const [display, setDisplay] = useState(fallback)

  useEffect(() => {
    if (reduced) return

    let cancelled = false
    let phraseIndex = 0
    let charIndex = 0
    let deleting = false

    const schedule = (ms: number, fn: () => void) =>
      window.setTimeout(() => {
        if (!cancelled) fn()
      }, ms)

    const run = () => {
      if (cancelled) return
      const phrase = phrases[phraseIndex] ?? ''

      if (!deleting) {
        if (charIndex < phrase.length) {
          charIndex += 1
          setDisplay(phrase.slice(0, charIndex))
          schedule(typingMs, run)
        } else {
          schedule(pauseMs, () => {
            deleting = true
            run()
          })
        }
      } else if (charIndex > 0) {
        charIndex -= 1
        setDisplay(phrase.slice(0, charIndex))
        schedule(Math.max(16, typingMs / 2), run)
      } else {
        deleting = false
        phraseIndex = (phraseIndex + 1) % phrases.length
        schedule(380, run)
      }
    }

    const first = schedule(typingMs, run)
    return () => {
      cancelled = true
      clearTimeout(first)
    }
  }, [phrases, reduced, typingMs, pauseMs])

  return reduced ? fallback : display
}
