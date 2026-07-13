import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'onDark'
type Size = 'md' | 'lg'

type CommonProps = {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  icon?: ReactNode
}

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 ease-out focus-visible:outline-none disabled:opacity-60 disabled:pointer-events-none whitespace-nowrap'

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-[0.95rem]',
  lg: 'h-14 px-7 text-base',
}

const variants: Record<Variant, string> = {
  primary:
    'bg-skylla-600 text-white shadow-primary hover:bg-skylla-700 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0',
  secondary:
    'bg-white text-nile-800 border border-ink-200 shadow-xs hover:border-skylla-300 hover:text-skylla-700 hover:-translate-y-0.5',
  ghost: 'bg-transparent text-nile-800 hover:bg-ink-100',
  onDark:
    'bg-white text-nile-900 hover:bg-lily hover:-translate-y-0.5 shadow-lg',
}

function classesFor(variant: Variant, size: Size, className?: string) {
  return cn(base, sizes[size], variants[variant], className)
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  icon,
  to,
  href,
  onClick,
  type = 'button',
}: CommonProps & {
  to?: string
  href?: string
  onClick?: (e: React.MouseEvent) => void
  type?: 'button' | 'submit'
}) {
  const content = (
    <>
      {children}
      {icon}
    </>
  )
  const cls = classesFor(variant, size, className)

  if (to) {
    return (
      <Link to={to} className={cls} onClick={onClick}>
        {content}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {content}
      </a>
    )
  }
  return (
    <button type={type} className={cls} onClick={onClick}>
      {content}
    </button>
  )
}
