import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

/**
 * Soft cursor-follow glow (disabled for reduced motion and coarse pointers).
 */
export function CursorGlow() {
  const reduced = usePrefersReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    const sync = () => setEnabled(mq.matches && !reduced)
    const id = requestAnimationFrame(sync)
    mq.addEventListener('change', sync)
    return () => {
      cancelAnimationFrame(id)
      mq.removeEventListener('change', sync)
    }
  }, [reduced])

  useEffect(() => {
    if (!enabled) return
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          left: pos.x,
          top: pos.y,
          background:
            'radial-gradient(circle, rgba(34,211,238,0.22) 0%, rgba(167,139,250,0.12) 45%, transparent 70%)',
        }}
      />
    </div>
  )
}
