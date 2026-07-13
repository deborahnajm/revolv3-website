import { WORDMARK_DARK } from '../../data/logoData'
import { cn } from '../../lib/utils'

/**
 * Official Revolv3 wordmark (vector, from the brand design system).
 * `tone="light"` renders the approved monochrome-reversed (white) lockup for
 * dark surfaces via an invert filter, so it stays crisp on navy/Skylla.
 * Never re-typeset — this is the approved lockup.
 */
export function Logo({
  tone = 'dark',
  className,
}: {
  tone?: 'dark' | 'light'
  className?: string
}) {
  return (
    <img
      src={WORDMARK_DARK}
      alt="Revolv3"
      className={cn('block w-auto select-none', tone === 'light' && '[filter:brightness(0)_invert(1)]', className)}
      draggable={false}
      decoding="async"
    />
  )
}
