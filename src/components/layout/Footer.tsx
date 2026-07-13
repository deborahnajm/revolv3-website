import { Link } from 'react-router-dom'
import { Logo } from '../ui/Logo'
import { POSITIONING, footerNav } from '../../data/content'
import { legalPages } from '../../data/legal'

export function Footer() {
  const year = 2026
  return (
    <footer className="relative overflow-hidden bg-gradient-nile text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-skylla-500/20 blur-3xl"
        aria-hidden
      />
      <div className="container-x relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo tone="light" className="h-8" />
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-white/70">{POSITIONING}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/45">
              Not a gateway. Not a processor. Not an analytics tool. The control, optimization, and intelligence layer
              above them.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {Object.entries(footerNav).map(([group, links]) => (
              <div key={group}>
                <h3 className="text-xs font-bold uppercase tracking-overline text-pool-300">{group}</h3>
                <ul className="mt-4 space-y-3">
                  {links.map((l) => (
                    <li key={l.label}>
                      {l.href.startsWith('/#') ? (
                        <a href={l.href} className="text-sm text-white/70 transition-colors hover:text-white">
                          {l.label}
                        </a>
                      ) : (
                        <Link to={l.href} className="text-sm text-white/70 transition-colors hover:text-white">
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-6">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalPages.map((p) => (
              <li key={p.slug}>
                <Link to={`/legal/${p.slug}`} className="text-sm text-white/60 transition-colors hover:text-white">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
            <p className="text-sm text-white/50">© {year} Revolv3. All rights reserved.</p>
            <p className="text-sm text-white/50">Authorization is a variable, not a constant.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
