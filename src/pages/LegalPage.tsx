import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Reveal } from '../components/ui/Reveal'
import { Icon } from '../components/ui/Icon'
import { Button } from '../components/ui/Button'
import { findLegal, legalPages } from '../data/legal'

function formatDate(d: string | null) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export function LegalPage() {
  const { slug } = useParams()
  const page = slug ? findLegal(slug) : undefined
  const [html, setHtml] = useState<string | null>(null)
  const [state, setState] = useState<'loading' | 'ready' | 'missing'>('loading')

  useEffect(() => {
    if (!page || !page.hasBody || !slug) {
      setState('missing')
      return
    }
    let active = true
    setState('loading')
    setHtml(null)
    fetch(`${import.meta.env.BASE_URL}legal-bodies/${slug}.json`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((data: { html: string }) => {
        if (!active) return
        setHtml(data.html)
        setState('ready')
      })
      .catch(() => active && setState('missing'))
    return () => {
      active = false
    }
  }, [slug, page])

  if (!page) {
    return (
      <div className="container-x flex min-h-[60vh] flex-col items-center justify-center pt-32 text-center">
        <h1 className="text-3xl font-extrabold text-nile-900">Page not found</h1>
        <Button to="/" className="mt-6" icon={<Icon name="arrow-right" className="h-4 w-4" />}>
          Back home
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
            <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-pool-300 hover:text-white">
              <Icon name="arrow-right" className="h-4 w-4 rotate-180" />
              Home
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-6 text-xs font-bold uppercase tracking-overline text-pool-300">Legal</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-3 text-display-lg font-extrabold text-white">{page.title}</h1>
          </Reveal>
          {page.lastUpdated && (
            <Reveal delay={0.15}>
              <p className="mt-4 text-sm text-white/50">Last updated {formatDate(page.lastUpdated)}</p>
            </Reveal>
          )}
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="container-x max-w-2xl">
          {page.intro && (
            <Reveal>
              <p className="mb-8 text-lg leading-relaxed text-ink-700">{page.intro}</p>
            </Reveal>
          )}
          {page.pdf && (
            <Reveal>
              <a
                href={page.pdf}
                target="_blank"
                rel="noreferrer"
                className="mb-8 inline-flex items-center gap-2 rounded-full border border-ink-200 px-4 py-2 text-sm font-semibold text-skylla-700 hover:border-skylla-300"
              >
                Download PDF
                <Icon name="arrow-up-right" className="h-4 w-4" />
              </a>
            </Reveal>
          )}

          {state === 'loading' && (
            <div className="flex justify-center py-10">
              <span className="h-7 w-7 animate-spin rounded-full border-2 border-skylla-200 border-t-skylla-600" />
            </div>
          )}
          {state === 'ready' && html && <div className="prose-r3" dangerouslySetInnerHTML={{ __html: html }} />}
          {state === 'missing' && (
            <p className="text-lg leading-relaxed text-ink-700">This document is being migrated. Please check back shortly.</p>
          )}

          {/* Other policies */}
          <nav className="mt-14 border-t border-ink-100 pt-8">
            <p className="text-xs font-bold uppercase tracking-overline text-ink-400">More legal</p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {legalPages
                .filter((p) => p.slug !== page.slug)
                .map((p) => (
                  <li key={p.slug}>
                    <Link to={`/legal/${p.slug}`} className="text-sm font-semibold text-skylla-700 hover:text-skylla-800">
                      {p.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
      </section>
    </article>
  )
}
