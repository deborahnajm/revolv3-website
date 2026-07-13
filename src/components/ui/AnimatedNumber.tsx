import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { EASE_OUT } from '../../lib/motion'
import { usePrefersReducedMotion } from '../../lib/useReducedMotion'

type AnimatedNumberProps = {
  value: number
  duration?: number
  /** Called to render the animated value into a string. */
  format?: (v: number) => string
  className?: string
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

/** Counts from 0 to `value` once it scrolls into view. */
export function AnimatedNumber({
  value,
  duration = 1.4,
  format = (v) => Math.round(v).toString(),
  className,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduced = usePrefersReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setDisplay(value)
      return
    }
    let raf = 0
    let start: number | null = null
    const step = (ts: number) => {
      if (start === null) start = ts
      const t = Math.min((ts - start) / (duration * 1000), 1)
      setDisplay(value * easeOutCubic(t))
      if (t < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration, reduced])

  return (
    <span ref={ref} className={className} style={{ transitionTimingFunction: `cubic-bezier(${EASE_OUT.join(',')})` }}>
      {format(display)}
    </span>
  )
}
