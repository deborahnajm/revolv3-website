import { motion } from 'framer-motion'
import { SectionHeading } from '../ui/SectionHeading'
import { Icon } from '../ui/Icon'
import { difference } from '../../data/content'
import { EASE_OUT, staggerContainer, viewportOnce } from '../../lib/motion'

export function Difference() {
  return (
    <section id="difference" className="bg-white py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading eyebrow={difference.eyebrow} title={difference.title} sub={difference.sub} />

        <motion.div
          variants={staggerContainer(0.08, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 overflow-hidden rounded-2xl border border-ink-200"
        >
          {/* Header row */}
          <div className="hidden bg-ink-50 md:grid md:grid-cols-[1.1fr_1.4fr_1.4fr]">
            <div className="p-5 text-xs font-bold uppercase tracking-overline text-ink-500">Alternative</div>
            <div className="p-5 text-xs font-bold uppercase tracking-overline text-ink-500">Where it stops</div>
            <div className="border-l border-ink-200 bg-skylla-50/60 p-5 text-xs font-bold uppercase tracking-overline text-skylla-700">
              Where Revolv3 begins
            </div>
          </div>

          {difference.rows.map((r) => (
            <motion.div
              key={r.them}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
              }}
              className="grid grid-cols-1 border-t border-ink-200 first:border-t-0 md:grid-cols-[1.1fr_1.4fr_1.4fr]"
            >
              <div className="p-5">
                <p className="font-bold text-nile-900">{r.them}</p>
                <p className="mt-1 text-sm text-ink-500 md:hidden">{r.themDesc}</p>
              </div>
              <div className="hidden p-5 text-[0.95rem] leading-relaxed text-ink-600 md:block">{r.themDesc}</div>
              <div className="flex items-start gap-2.5 border-t border-ink-100 bg-skylla-50/40 p-5 text-[0.95rem] leading-relaxed text-nile-800 md:border-l md:border-t-0 md:border-ink-200">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-skylla-600" />
                <span>{r.us}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-ink-500">
          We never win by making processors enemies. They are partners, and their networks are the infrastructure we
          operate on. We win by being the independent layer above them.
        </p>
      </div>
    </section>
  )
}
