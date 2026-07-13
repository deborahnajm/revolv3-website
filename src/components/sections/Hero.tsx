import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { HeroVisual } from './HeroVisual'
import { hero, trustLine } from '../../data/content'
import { EASE_OUT } from '../../lib/motion'

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // Gentle parallax: background drifts and fades as the hero scrolls away.
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', '60%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const words = hero.eyebrow

  return (
    <section
      id="top"
      ref={ref}
      className="relative overflow-hidden bg-gradient-nile pb-20 pt-32 text-white sm:pb-28 sm:pt-40"
    >
      {/* Parallax grid + glows */}
      <motion.div style={{ y: bgY }} className="pointer-events-none absolute inset-0 bg-grid-dark opacity-70" aria-hidden />
      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none absolute -right-40 -top-24 h-[36rem] w-[36rem] rounded-full bg-skylla-500/25 blur-[120px]"
        aria-hidden
      />
      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none absolute -left-40 top-40 h-[30rem] w-[30rem] rounded-full bg-pool-500/15 blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-white"
        aria-hidden
      />

      <motion.div style={{ y: contentY, opacity: fade }} className="container-x relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Copy */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-overline text-pool-300 backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-pool-400" />
              {words}
            </motion.span>

            <h1 className="mt-6 text-display-2xl font-extrabold text-white">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.08 }}
                className="block text-white/85"
              >
                {hero.titleLead}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.18 }}
                className="block bg-gradient-to-r from-pool-300 via-pool-400 to-skylla-300 bg-clip-text text-transparent"
              >
                {hero.titleEmph}
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.3 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-white/70"
            >
              {hero.sub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.42 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <Button
                variant="onDark"
                size="lg"
                href="/#contact"
                icon={<Icon name="arrow-right" className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />}
              >
                {hero.ctaPrimary}
              </Button>
              <Button
                size="lg"
                href="/#how"
                className="border border-white/20 bg-white/5 text-white hover:bg-white/10"
              >
                {hero.ctaSecondary}
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.6 }}
              className="mt-8 max-w-md text-sm leading-relaxed text-white/45"
            >
              {trustLine}
            </motion.p>
          </div>

          {/* Visual */}
          <HeroVisual />
        </div>
      </motion.div>
    </section>
  )
}
