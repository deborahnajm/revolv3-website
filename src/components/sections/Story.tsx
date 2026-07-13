import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Reveal } from '../ui/Reveal'
import { Eyebrow } from '../ui/Eyebrow'
import { story } from '../../data/content'

export function Story() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const markY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="story" className="relative overflow-hidden bg-lily py-24 sm:py-32" ref={ref}>
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" aria-hidden />
      {/* Parallax brand glyph */}
      <motion.div
        style={{ y: markY }}
        className="pointer-events-none absolute -right-20 top-10 select-none text-[22rem] font-extrabold leading-none text-white/50"
        aria-hidden
      >
        R
      </motion.div>

      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow>{story.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-4 text-display-lg font-extrabold text-nile-900">{story.title}</h2>
            </Reveal>
          </div>

          <div>
            {story.body.map((para, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <p className="mb-5 text-lg leading-relaxed text-ink-700">{para}</p>
              </Reveal>
            ))}

            <Reveal delay={0.35}>
              <blockquote className="mt-8 border-l-2 border-skylla-500 pl-6">
                <p className="text-xl font-semibold leading-snug text-nile-900">“{story.quote}”</p>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
