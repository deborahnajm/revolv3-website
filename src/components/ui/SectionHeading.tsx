import { Reveal } from './Reveal'
import { Eyebrow } from './Eyebrow'
import { cn } from '../../lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = 'left',
  onDark = false,
  className,
}: {
  eyebrow?: string
  title: string
  sub?: string
  align?: 'left' | 'center'
  onDark?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl',
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <Eyebrow onDark={onDark} className={align === 'center' ? 'justify-center' : ''}>
            {eyebrow}
          </Eyebrow>
        </Reveal>
      )}
      <Reveal delay={0.06}>
        <h2
          className={cn(
            'mt-4 text-display-lg font-extrabold',
            onDark ? 'text-white' : 'text-nile-900',
          )}
        >
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.12}>
          <p className={cn('mt-4 text-lg leading-relaxed', onDark ? 'text-white/70' : 'text-ink-600')}>{sub}</p>
        </Reveal>
      )}
    </div>
  )
}
