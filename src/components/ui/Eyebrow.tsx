import { cn } from '../../lib/utils'

/** Uppercase overline label — the brand eyebrow above section titles. */
export function Eyebrow({
  children,
  onDark = false,
  className,
}: {
  children: React.ReactNode
  onDark?: boolean
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 text-xs font-bold uppercase tracking-overline',
        onDark ? 'text-pool-300' : 'text-skylla-600',
        className,
      )}
    >
      <span className={cn('h-px w-6', onDark ? 'bg-pool-500/50' : 'bg-skylla-400/60')} aria-hidden />
      {children}
    </span>
  )
}
