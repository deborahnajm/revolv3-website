import { motion } from 'framer-motion'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { Icon, type IconName } from '../ui/Icon'
import { problem } from '../../data/content'
import { EASE_OUT, staggerContainer, viewportOnce } from '../../lib/motion'

export function Problem() {
  return (
    <section id="problem" className="relative bg-white py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading eyebrow={problem.eyebrow} title={problem.title} />
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-ink-700">{problem.body}</p>
        </Reveal>

        <motion.div
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {problem.points.map((p) => (
            <motion.div
              key={p.title}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
              }}
              className="group relative overflow-hidden rounded-2xl border border-ink-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-lily opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden
              />
              <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-primary">
                <Icon name={p.icon as IconName} className="h-6 w-6" />
              </span>
              <h3 className="relative mt-6 text-lg font-bold text-nile-900">{p.title}</h3>
              <p className="relative mt-3 text-[0.95rem] leading-relaxed text-ink-600">{p.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
