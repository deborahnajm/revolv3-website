import { motion } from 'framer-motion'
import { SectionHeading } from '../ui/SectionHeading'
import { Icon, type IconName } from '../ui/Icon'
import { pillars } from '../../data/content'
import { EASE_OUT, staggerContainer, viewportOnce } from '../../lib/motion'

export function Pillars() {
  return (
    <section id="platform" className="relative overflow-hidden bg-gradient-sky-wash py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" aria-hidden />
      <div className="container-x relative">
        <SectionHeading eyebrow={pillars.eyebrow} title={pillars.title} sub={pillars.sub} align="center" />

        <motion.div
          variants={staggerContainer(0.14, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-6 lg:grid-cols-3"
        >
          {pillars.items.map((p, i) => (
            <motion.article
              key={p.key}
              variants={{
                hidden: { opacity: 0, y: 28 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_OUT } },
              }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/80 bg-white/80 p-8 shadow-md backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              {/* Gradient top hairline */}
              <span className="absolute inset-x-0 top-0 h-1 bg-gradient-brand opacity-70" aria-hidden />

              <div className="flex items-center justify-between">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand-deep text-white shadow-primary">
                  <Icon name={p.icon as IconName} className="h-6 w-6" />
                </span>
                <span className="text-6xl font-extrabold leading-none text-ink-100 transition-colors group-hover:text-skylla-100">
                  {i + 1}
                </span>
              </div>

              <h3 className="mt-6 text-xs font-bold uppercase tracking-overline text-skylla-600">{p.name}</h3>
              <p className="mt-2 text-xl font-bold text-nile-900">{p.headline}</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-600">{p.body}</p>

              <ul className="mt-6 space-y-2.5 border-t border-ink-100 pt-6">
                {p.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-ink-700">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-skylla-600" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
