import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Logo } from '../ui/Logo'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { nav } from '../../data/content'
import { cn } from '../../lib/utils'
import { EASE_OUT } from '../../lib/motion'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // Smooth in-page navigation for /#anchor links.
  const handleNav = (href: string) => (e: React.MouseEvent) => {
    setOpen(false)
    if (href.startsWith('/#')) {
      const id = href.slice(2)
      if (location.pathname === '/') {
        e.preventDefault()
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        e.preventDefault()
        navigate('/')
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 80)
      }
    }
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out',
        scrolled ? 'py-2.5' : 'py-4',
      )}
    >
      <div className="container-x">
        <nav
          className={cn(
            'flex items-center justify-between rounded-full pl-5 pr-3 transition-all duration-300 ease-out',
            scrolled
              ? 'glass border border-ink-200/70 py-2 shadow-md'
              : 'border border-transparent py-2.5',
          )}
        >
          <Link to="/" className="flex items-center gap-2" aria-label="Revolv3 home" onClick={handleNav('/#top')}>
            <Logo tone={scrolled ? 'dark' : 'light'} className="h-6 sm:h-7" />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const linkCls = cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                scrolled
                  ? 'text-ink-600 hover:bg-ink-100/70 hover:text-nile-900'
                  : 'text-white/80 hover:bg-white/10 hover:text-white',
              )
              return (
                <li key={item.label}>
                  {item.href.startsWith('/#') ? (
                    <a href={item.href} onClick={handleNav(item.href)} className={linkCls}>
                      {item.label}
                    </a>
                  ) : (
                    <Link to={item.href} className={linkCls}>
                      {item.label}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>

          <div className="hidden items-center gap-2 lg:flex">
            <Button
              variant="ghost"
              size="md"
              href="/#contact"
              onClick={handleNav('/#contact')}
              className={cn('h-10', scrolled ? '' : 'text-white hover:bg-white/10')}
            >
              Contact
            </Button>
            <Button
              size="md"
              href="/#contact"
              onClick={handleNav('/#contact')}
              className="h-10"
              icon={<Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
            >
              Get your benchmark
            </Button>
          </div>

          <button
            className={cn(
              'inline-flex h-10 w-10 items-center justify-center rounded-full lg:hidden',
              scrolled ? 'text-nile-800 hover:bg-ink-100' : 'text-white hover:bg-white/10',
            )}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'x' : 'menu'} className="h-5 w-5" />
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: EASE_OUT }}
            className="container-x lg:hidden"
          >
            <div className="mt-2 rounded-2xl border border-ink-200/70 glass p-3 shadow-lg">
              <ul className="flex flex-col">
                {nav.map((item) => (
                  <li key={item.label}>
                    {item.href.startsWith('/#') ? (
                      <a
                        href={item.href}
                        onClick={handleNav(item.href)}
                        className="block rounded-xl px-4 py-3 text-[0.95rem] font-medium text-nile-800 hover:bg-ink-100"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        to={item.href}
                        className="block rounded-xl px-4 py-3 text-[0.95rem] font-medium text-nile-800 hover:bg-ink-100"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              <div className="mt-2 px-1">
                <Button
                  className="w-full"
                  href="/#contact"
                  onClick={handleNav('/#contact')}
                  icon={<Icon name="arrow-right" className="h-4 w-4" />}
                >
                  Get your benchmark
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
