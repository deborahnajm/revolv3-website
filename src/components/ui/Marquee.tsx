import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

/**
 * Infinite horizontal marquee. Duplicates its children so the loop is seamless.
 * Pauses on hover; halts entirely under prefers-reduced-motion (handled in CSS).
 */
export function Marquee({
  children,
  speed = 'normal',
  className,
}: {
  children: ReactNode
  speed?: 'normal' | 'slow'
  className?: string
}) {
  return (
    <div className={cn('group relative flex w-full overflow-hidden mask-fade-x', className)}>
      <div
        className={cn(
          'flex shrink-0 items-center gap-14 pr-14 group-hover:[animation-play-state:paused]',
          speed === 'slow' ? 'animate-marquee-slow' : 'animate-marquee',
        )}
      >
        {children}
      </div>
      <div
        aria-hidden
        className={cn(
          'flex shrink-0 items-center gap-14 pr-14 group-hover:[animation-play-state:paused]',
          speed === 'slow' ? 'animate-marquee-slow' : 'animate-marquee',
        )}
      >
        {children}
      </div>
    </div>
  )
}
