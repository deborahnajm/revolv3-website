import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Eyebrow } from '../components/ui/Eyebrow'
import { Reveal } from '../components/ui/Reveal'
import { Icon } from '../components/ui/Icon'
import { cn } from '../lib/utils'
import { EASE_OUT } from '../lib/motion'
import {
  RESOURCE_TOPICS,
  RESOURCE_TYPES,
  resources,
  type Resource,
} from '../data/resources'

const typeTone: Record<string, string> = {
  Blog: 'bg-skylla-50 text-skylla-700',
  'Case Study': 'bg-emerald-50 text-emerald-700',
  'Press & Podcast': 'bg-amber-50 text-amber-700',
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function Card({ r }: { r: Resource }) {
  const inner = (
    <article className="group flex h-full flex-col rounded-2xl border border-ink-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-skylla-200 hover:shadow-lg">
      <div className="flex items-center gap-2">
        <span className={cn('rounded-full px-2.5 py-1 text-xs font-semibold', typeTone[r.type])}>{r.type}</span>
        <span className="text-xs font-medium text-ink-400">{r.topic}</span>
      </div>
      <h3 className="mt-4 text-lg font-bold leading-snug text-nile-900 transition-colors group-hover:text-skylla-700">
        {r.title}
      </h3>
      <p className="mt-2.5 flex-1 text-[0.9rem] leading-relaxed text-ink-600">{r.excerpt}</p>
      <div className="mt-5 flex items-center justify-between border-t border-ink-100 pt-4 text-xs text-ink-400">
        <span>{formatDate(r.date)} · {r.readTime}</span>
        <span className="inline-flex items-center gap-1 font-semibold text-skylla-600">
          Read
          <Icon name="arrow-up-right" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </article>
  )

  return r.href ? (
    <a href={r.href} target="_blank" rel="noreferrer" className="block h-full">
      {inner}
    </a>
  ) : (
    <Link to={`/resources/${r.slug}`} className="block h-full">
      {inner}
    </Link>
  )
}

export function Resources() {
  const [type, setType] = useState<string>('All')
  const [topic, setTopic] = useState<string>('All')

  const filtered = useMemo(
    () =>
      resources.filter(
        (r) => (type === 'All' || r.type === type) && (topic === 'All' || r.topic === topic),
      ),
    [type, topic],
  )

  const featured = resources.filter((r) => r.featured)

  return (
    <div>
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-nile pb-16 pt-36 text-white sm:pb-20 sm:pt-44">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-60" aria-hidden />
        <div
          className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-skylla-500/25 blur-[120px]"
          aria-hidden
        />
        <div className="container-x relative">
          <Reveal>
            <Eyebrow onDark>Resources</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-4 max-w-3xl text-display-xl font-extrabold text-white">
              The latest on payment optimization, performance, and control.
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
              Insights, case studies, and conversations for teams who have decided authorization is a variable, not a
              constant.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="bg-white py-16">
          <div className="container-x">
            <h2 className="mb-6 text-xs font-bold uppercase tracking-overline text-skylla-600">Featured</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {featured.slice(0, 2).map((r, i) => (
                <Reveal key={r.slug} delay={i * 0.08}>
                  <Card r={r} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Library + filters */}
      <section className="bg-ink-50/60 py-16">
        <div className="container-x">
          <div className="flex flex-col gap-6 border-b border-ink-200 pb-6 lg:flex-row lg:items-center lg:justify-between">
            <FilterGroup label="Type" options={RESOURCE_TYPES} value={type} onChange={setType} />
            <FilterGroup label="Topic" options={RESOURCE_TOPICS} value={topic} onChange={setTopic} />
          </div>

          <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((r) => (
                <motion.div
                  key={r.slug}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                >
                  <Card r={r} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <p className="py-16 text-center text-ink-500">No resources match those filters yet.</p>
          )}
        </div>
      </section>
    </div>
  )
}

function FilterGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: readonly string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs font-bold uppercase tracking-overline text-ink-400">{label}</span>
      {['All', ...options].map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={cn(
            'rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200',
            value === opt
              ? 'bg-nile-900 text-white shadow-sm'
              : 'bg-white text-ink-600 ring-1 ring-ink-200 hover:ring-skylla-300 hover:text-skylla-700',
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}
