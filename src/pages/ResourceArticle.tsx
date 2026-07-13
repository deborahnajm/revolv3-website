import { Link, useParams } from 'react-router-dom'
import { Reveal } from '../components/ui/Reveal'
import { Icon } from '../components/ui/Icon'
import { Button } from '../components/ui/Button'
import { resources } from '../data/resources'

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export function ResourceArticle() {
  const { slug } = useParams()
  const r = resources.find((x) => x.slug === slug)

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
            <div className="mt-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-overline text-pool-300">
              <span>{r.type}</span>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span>{r.topic}</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 text-display-lg font-extrabold text-white">{r.title}</h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 text-sm text-white/50">
              {formatDate(r.date)} · {r.readTime}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-x max-w-2xl">
          <Reveal>
            <p className="text-xl leading-relaxed text-ink-800">{r.excerpt}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-700">
              <p>
                Merchants come to Revolv3 measuring their performance with the same instruments that produce the
                problem. When your only view of authorization comes from your processor, you are asking the entity you
                are trying to evaluate to evaluate itself.
              </p>
              <p>
                The gap between your current authorization rate and your achievable rate is real, measurable, and
                closeable. The only thing standing between most merchants and a materially better outcome is the absence
                of an independent layer that makes optimization possible.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-12 rounded-2xl border border-ink-200 bg-gradient-sky-wash p-8 text-center">
              <h2 className="text-2xl font-bold text-nile-900">See what the gap is worth for you</h2>
              <p className="mx-auto mt-3 max-w-md text-[0.95rem] leading-relaxed text-ink-600">
                Twenty minutes is usually enough to benchmark your authorization performance against merchants at your
                volume and card mix.
              </p>
              <Button
                to="/#contact"
                className="mt-6"
                icon={<Icon name="arrow-right" className="h-4 w-4" />}
              >
                Request your benchmark
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  )
}
