import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Eyebrow } from '../components/ui/Eyebrow'
import { Reveal } from '../components/ui/Reveal'
import { Icon } from '../components/ui/Icon'
import { Button } from '../components/ui/Button'
import { cn } from '../lib/utils'
import { EASE_OUT } from '../lib/motion'
import { CATEGORIES, TOPICS, resources, type ResourceMeta } from '../data/resources'

const PAGE_SIZE = 12

const catTone: Record<string, string> = {
  articles: 'bg-skylla-50 text-skylla-700',
  blogs: 'bg-pool-100 text-pool-700',
  'case-studies': 'bg-emerald-50 text-emerald-700',
  press: 'bg-amber-50 text-amber-700',
  'white-papers': 'bg-nile-800/10 text-nile-800',
}

function formatDate(d: string | null) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function Card({ r }: { r: ResourceMeta }) {
  const inner = (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-skylla-200 hover:shadow-lg">
      <div className="relative aspect-[16/9] overflow-hidden bg-lily">
        {r.image ? (
          <img
            src={r.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-brand opacity-80" />
        )}
        <span
          className={cn(
            'absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm',
            catTone[r.category] ?? 'bg-white text-nile-800',
          )}
        >
          {r.categoryLabel}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        {r.topicLabel && <span className="text-xs font-medium text-skylla-600">{r.topicLabel}</span>}
        <h3 className="mt-2 line-clamp-3 text-[1.05rem] font-bold leading-snug text-nile-900 transition-colors group-hover:text-skylla-700">
          {r.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-ink-600">{r.excerpt}</p>
        <div className="mt-4 flex items-center justify-between border-t border-ink-100 pt-3 text-xs text-ink-400">
          <span>
            {formatDate(r.date)} · {r.readMinutes} min read
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-skylla-600">
            {r.externalUrl ? 'Visit' : 'Read'}
            <Icon
              name="arrow-up-right"
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </div>
    </article>
  )

  return r.externalUrl ? (
    <a href={r.externalUrl} target="_blank" rel="noreferrer" className="block h-full">
      {inner}
    </a>
  ) : (
    <Link to={`/resources/${r.slug}`} className="block h-full">
      {inner}
    </Link>
  )
}

export function Resources() {
  const [category, setCategory] = useState('All')
  const [topic, setTopic] = useState('All')
  const [query, setQuery] = useState('')
  const [visible, setVisible] = useState(PAGE_SIZE)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return resources.filter(
      (r) =>
        (category === 'All' || r.category === category) &&
        (topic === 'All' || r.topic === topic) &&
        (!q || r.title.toLowerCase().includes(q) || r.excerpt.toLowerCase().includes(q)),
    )
  }, [category, topic, query])

  const shown = filtered.slice(0, visible)
  const featured = resources.slice(0, 2)

  const resetVisible = () => setVisible(PAGE_SIZE)

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
              Insights, case studies, and press for teams who have decided authorization is a variable, not a constant.
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
              {featured.map((r, i) => (
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
          <div className="flex flex-col gap-6 border-b border-ink-200 pb-8">
            {/* Search */}
            <div className="relative max-w-md">
              <Icon name="search" className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  resetVisible()
                }}
                placeholder="Search resources"
                className="w-full rounded-full border border-ink-200 bg-white py-2.5 pl-11 pr-4 text-sm text-nile-900 placeholder:text-ink-400 focus:border-skylla-300 focus:outline-none focus:ring-2 focus:ring-skylla-500/30"
              />
            </div>

            <FilterGroup
              label="Type"
              options={CATEGORIES}
              value={category}
              onChange={(v) => {
                setCategory(v)
                resetVisible()
              }}
            />
            <FilterGroup
              label="Topic"
              options={TOPICS}
              value={topic}
              onChange={(v) => {
                setTopic(v)
                resetVisible()
              }}
            />
          </div>

          <p className="mt-6 text-sm text-ink-500">
            {filtered.length} {filtered.length === 1 ? 'resource' : 'resources'}
          </p>

          <motion.div layout className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {shown.map((r) => (
                <motion.div
                  key={r.slug}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                >
                  <Card r={r} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <p className="py-16 text-center text-ink-500">No resources match those filters yet.</p>
          )}

          {visible < filtered.length && (
            <div className="mt-12 flex justify-center">
              <Button variant="secondary" size="lg" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                Load more
              </Button>
            </div>
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
  options: { value: string; label: string }[]
  value: string
  onChange: (v: string) => void
}) {
  const items = [{ value: 'All', label: 'All' }, ...options]
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 w-12 text-xs font-bold uppercase tracking-overline text-ink-400">{label}</span>
      {items.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            'rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200',
            value === opt.value
              ? 'bg-nile-900 text-white shadow-sm'
              : 'bg-white text-ink-600 ring-1 ring-ink-200 hover:text-skylla-700 hover:ring-skylla-300',
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
