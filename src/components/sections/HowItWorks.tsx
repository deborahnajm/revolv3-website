import { motion } from 'framer-motion'
import { SectionHeading } from '../ui/SectionHeading'
import { Icon, type IconName } from '../ui/Icon'
import { how } from '../../data/content'
import { EASE_OUT, staggerContainer, viewportOnce } from '../../lib/motion'

export function HowItWorks() {
  return (
    <section id="how" className="bg-white py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading eyebrow={how.eyebrow} title={how.title} sub={how.sub} />

        <motion.ol
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {/* Connecting line on large screens */}
          <div
            className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-skylla-200 via-pool-300 to-skylla-200 lg:block"
            aria-hidden
          />
          {how.steps.map((s) => (
            <motion.li
              key={s.n}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
              }}
              className="relative"
            >
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-ink-200 bg-white text-skylla-600 shadow-sm">
                <Icon name={s.icon as IconName} className="h-6 w-6" />
                <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-nile-900 text-[0.65rem] font-bold text-white">
                  {s.n}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-bold text-nile-900">{s.title}</h3>
              <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-600">{s.body}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
