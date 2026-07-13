import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Reveal } from '../components/ui/Reveal'
import { Icon } from '../components/ui/Icon'
import { Button } from '../components/ui/Button'
import { findResource, prettifyAuthor } from '../data/resources'
import { formatDate } from '../lib/utils'

export function ResourceArticle() {
  const { slug } = useParams()
  const r = slug ? findResource(slug) : undefined
  const [html, setHtml] = useState<string | null>(null)
  const [bodyState, setBodyState] = useState<'loading' | 'ready' | 'missing'>('loading')

  useEffect(() => {
    if (!r || !r.hasBody || !slug) {
      setBodyState('missing')
      return
    }
    let active = true
    setBodyState('loading')
    setHtml(null)
    fetch(`${import.meta.env.BASE_URL}resource-bodies/${slug}.json`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((data: { html: string }) => {
        if (!active) return
        setHtml(data.html)
        setBodyState('ready')
      })
      .catch(() => {
        if (active) setBodyState('missing')
      })
    return () => {
      active = false
    }
  }, [slug, r])

  if (!r) {
    return (
      <div className="container-x flex min-h-[60vh] flex-col items-center justify-center pt-32 text-center">
        <h1 className="text-3xl font-extrabold text-nile-900">Resource not found</h1>
        <p className="mt-3 text-ink-600">This piece may have moved.</p>
        <Button to="/resources" className="mt-6" icon={<Icon name="arrow-right" className="h-4 w-4" />}>
          Back to resources
        </Button>
      </div>
    )
  }

  return (
    <article>
      <section className="relative overflow-hidden bg-gradient-nile pb-14 pt-36 text-white sm:pt-44">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-60" aria-hidden />
        <div className="container-x relative max-w-3xl">
          <Reveal>
            <Link
              to="/resources"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-pool-300 hover:text-white"
            >
              <Icon name="arrow-right" className="h-4 w-4 rotate-180" />
              All resources
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-overline text-pool-300">
              <span>{r.categoryLabel}</span>
              {r.topicLabel && (
                <>
                  <span className="h-1 w-1 rounded-full bg-white/30" />
                  <span>{r.topicLabel}</span>
                </>
              )}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 text-display-lg font-extrabold text-white">{r.title}</h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-5 text-sm text-white/50">
              {prettifyAuthor(r.author)} · {formatDate(r.date)} · {r.readMinutes} min read
            </p>
          </Reveal>
        </div>
      </section>

      {/* Hero image */}
      {r.image && (
        <div className="bg-white">
          <div className="container-x max-w-3xl">
            <img
              src={r.image}
              alt=""
              className="-mt-8 aspect-[16/9] w-full rounded-2xl object-cover shadow-lg"
              decoding="async"
            />
          </div>
        </div>
      )}

      <section className="bg-white py-14 sm:py-16">
        <div className="container-x max-w-2xl">
          {r.excerpt && (
            <Reveal>
              <p className="mb-8 text-xl leading-relaxed text-ink-800">{r.excerpt}</p>
            </Reveal>
          )}

          {bodyState === 'loading' && (
            <div className="flex justify-center py-10">
              <span className="h-7 w-7 animate-spin rounded-full border-2 border-skylla-200 border-t-skylla-600" />
            </div>
          )}
          {bodyState === 'ready' && html && (
            <div className="prose-r3" dangerouslySetInnerHTML={{ __html: html }} />
          )}
          {bodyState === 'missing' && (
            <p className="text-lg leading-relaxed text-ink-700">
              The full text of this resource is being migrated. In the meantime, reach out and we will send it your way.
            </p>
          )}

          <div className="mt-12 rounded-2xl border border-ink-200 bg-gradient-sky-wash p-8 text-center">
            <h2 className="text-2xl font-bold text-nile-900">See what the gap is worth for you</h2>
            <p className="mx-auto mt-3 max-w-md text-[0.95rem] leading-relaxed text-ink-600">
              Twenty minutes is usually enough to benchmark your authorization performance against merchants at your
              volume and card mix.
            </p>
            <Button to="/#contact" className="mt-6" icon={<Icon name="arrow-right" className="h-4 w-4" />}>
              Request your benchmark
            </Button>
          </div>
        </div>
      </section>
    </article>
  )
}
