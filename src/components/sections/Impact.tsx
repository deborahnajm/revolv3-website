import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { AnimatedNumber } from '../ui/AnimatedNumber'
import { impact } from '../../data/content'
import { formatUSD } from '../../lib/utils'
import { EASE_OUT, viewportOnce } from '../../lib/motion'

// Volume stops from the ICP Revenue Impact Framework.
const STOPS = [25_000_000, 100_000_000, 500_000_000, 1_000_000_000, 5_000_000_000]
const TIERS = [1, 2, 3]

export function Impact() {
  const [idx, setIdx] = useState(1)
  const volume = STOPS[idx]

  return (
    <section id="impact" className="relative overflow-hidden bg-gradient-nile py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-skylla-500/20 blur-[120px]"
        aria-hidden
      />
      <div className="container-x relative">
        <SectionHeading eyebrow={impact.eyebrow} title={impact.title} sub={impact.sub} onDark align="center" />

        <Reveal delay={0.1}>
          <div className="mx-auto mt-14 max-w-4xl rounded-2xl border border-white/12 bg-white/[0.04] p-6 shadow-xl backdrop-blur-md sm:p-9">
            {/* Slider */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label htmlFor="vol" className="text-sm font-semibold text-pool-300">
                Annual card-not-present volume
              </label>
              <output htmlFor="vol" className="text-3xl font-extrabold tracking-tight text-white">
                {formatUSD(volume)}
              </output>
            </div>
            <input
              id="vol"
              type="range"
              min={0}
              max={STOPS.length - 1}
              step={1}
              value={idx}
              onChange={(e) => setIdx(Number(e.target.value))}
              className="mt-5 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-pool-500 [height:6px]"
              aria-valuetext={formatUSD(volume)}
            />
            <div className="mt-2 flex justify-between text-xs text-white/40">
              {STOPS.map((s, i) => (
                <button
                  key={s}
                  onClick={() => setIdx(i)}
                  className={`transition-colors hover:text-white ${i === idx ? 'font-bold text-pool-300' : ''}`}
                >
                  {formatUSD(s)}
                </button>
              ))}
            </div>

            {/* Recovered tiers */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {TIERS.map((pct, i) => {
                const recovered = volume * (pct / 100)
                const highlight = i === 0
                return (
                  <motion.div
                    key={pct}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.1 + i * 0.08 }}
                    className={`rounded-xl border p-5 ${
                      highlight
                        ? 'border-pool-400/40 bg-gradient-to-br from-skylla-500/25 to-pool-500/10'
                        : 'border-white/10 bg-white/[0.03]'
                    }`}
                  >
                    <p className="text-sm font-semibold text-white/60">+{pct}% authorization</p>
                    <p className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                      {/* keyed remount so it re-animates on volume change */}
                      <AnimatedNumber key={`${volume}-${pct}`} value={recovered} duration={1} format={formatUSD} />
                    </p>
                    <p className="mt-1 text-xs text-white/45">recovered / year</p>
                  </motion.div>
                )
              })}
            </div>
            <p className="mt-6 text-xs leading-relaxed text-white/40">{impact.footnote}</p>
          </div>
        </Reveal>

        {/* Proof stats */}
        <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-3">
          {impact.stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.08} className="text-center">
              <p className="text-4xl font-extrabold tracking-tight text-white">
                {s.isText ? (
                  <span className="text-2xl">{s.text}</span>
                ) : (
                  <>
                    {s.prefix}
                    <AnimatedNumber value={s.value} duration={1.6} />
                    {s.suffix}
                  </>
                )}
              </p>
              <p className="mx-auto mt-2 max-w-[16rem] text-sm leading-snug text-white/55">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
