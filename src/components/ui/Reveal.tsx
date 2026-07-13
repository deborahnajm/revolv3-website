import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { EASE_OUT, viewportOnce } from '../../lib/motion'

type RevealProps = {
  children: ReactNode
  /** Direction the content travels from. */
  from?: 'up' | 'down' | 'left' | 'right' | 'none'
  delay?: number
  duration?: number
  distance?: number
  className?: string
  as?: 'div' | 'section' | 'li' | 'span'
}

const offsets = {
  up: { y: 24, x: 0 },
  down: { y: -24, x: 0 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none: { x: 0, y: 0 },
}

/**
 * Scroll-triggered fade + travel. Fires once. Reduced-motion users get a
 * plain fade with no translation (framer-motion honors the media query when
 * the transform values collapse — we also cut the distance to zero).
 */
export function Reveal({
  children,
  from = 'up',
  delay = 0,
  duration = 0.7,
  distance,
  className,
  as = 'div',
}: RevealProps) {
  const base = offsets[from]
  const d = distance ?? 1
  const MotionTag = motion[as]

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, x: base.x * d, y: base.y * d }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration, ease: EASE_OUT, delay }}
    >
      {children}
    </MotionTag>
  )
}
