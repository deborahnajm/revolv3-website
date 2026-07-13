import { motion } from 'framer-motion'
import { AnimatedNumber } from '../ui/AnimatedNumber'
import { Icon } from '../ui/Icon'
import { EASE_OUT } from '../../lib/motion'

const routes = [
  { card: 'Visa · 414720', processor: 'Processor A', status: 'Approved', tone: 'success' },
  { card: 'Mastercard · 552013', processor: 'Processor C', status: 'Routed', tone: 'brand' },
  { card: 'Amex · 371449', processor: 'Processor B', status: 'Retrying', tone: 'warning' },
  { card: 'Visa · 401288', processor: 'Processor A', status: 'Approved', tone: 'success' },
] as const

const toneStyles: Record<string, string> = {
  success: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  brand: 'bg-skylla-50 text-skylla-700 ring-skylla-600/20',
  warning: 'bg-amber-50 text-amber-700 ring-amber-600/20',
}

/** An animated, on-brand product panel: authorization lift + live routing. */
export function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.25 }}
      className="relative mx-auto w-full max-w-[460px]"
    >
      {/* Glow */}
      <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-pool-500/20 blur-3xl" aria-hidden />

      {/* Main card */}
      <div className="relative rounded-2xl border border-white/15 bg-white/[0.06] p-1.5 shadow-xl backdrop-blur-md">
        <div className="rounded-xl bg-white p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-overline text-skylla-600">Authorization</p>
              <p className="mt-1 text-sm text-ink-500">Live · all processors</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/20">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              +4.2 pts
            </span>
          </div>

          <div className="mt-4 flex items-end gap-3">
            <AnimatedNumber
              value={91.4}
              duration={1.6}
              format={(v) => v.toFixed(1)}
              className="text-5xl font-extrabold tracking-tightest text-nile-900"
            />
            <span className="pb-1.5 text-2xl font-bold text-nile-900">%</span>
            <span className="pb-2 text-sm text-ink-400 line-through">87.2%</span>
          </div>

          {/* Mini bar chart */}
          <div className="mt-4 flex h-16 items-end gap-1.5">
            {[52, 61, 58, 70, 66, 78, 84, 88, 92].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.6 + i * 0.06 }}
                className={`flex-1 rounded-sm ${i >= 6 ? 'bg-gradient-brand' : 'bg-ink-200'}`}
              />
            ))}
          </div>

          {/* Routing rows */}
          <div className="mt-5 space-y-2">
            {routes.map((r, i) => (
              <motion.div
                key={r.card}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.9 + i * 0.12 }}
                className="flex items-center justify-between rounded-lg border border-ink-100 bg-ink-50/60 px-3 py-2"
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white shadow-xs">
                    <Icon name="credit-card" className="h-3.5 w-3.5 text-skylla-600" />
                  </span>
                  <div className="leading-tight">
                    <p className="text-xs font-semibold text-nile-900">{r.card}</p>
                    <p className="text-[0.7rem] text-ink-400">{r.processor}</p>
                  </div>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[0.7rem] font-semibold ring-1 ring-inset ${toneStyles[r.tone]}`}
                >
                  {r.status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating benchmark chip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE_OUT, delay: 1.5 }}
        className="absolute -bottom-6 -left-6 hidden rounded-xl border border-white/15 bg-white/95 px-4 py-3 shadow-lg backdrop-blur sm:block"
      >
        <p className="text-[0.7rem] font-medium uppercase tracking-overline text-ink-400">Recovered / yr</p>
        <p className="text-lg font-extrabold text-nile-900">
          <AnimatedNumber value={4.2} duration={1.8} format={(v) => `$${v.toFixed(1)}M`} />
        </p>
      </motion.div>
    </motion.div>
  )
}
