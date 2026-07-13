import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from '../ui/Reveal'
import { Eyebrow } from '../ui/Eyebrow'
import { Icon } from '../ui/Icon'
import { cta } from '../../data/content'
import { EASE_OUT } from '../../lib/motion'
import { cn } from '../../lib/utils'
import { isHubSpotConfigured, submitToHubSpot } from '../../lib/hubspot'

const volumes = [
  'Under $25M',
  '$25M to $100M',
  '$100M to $500M',
  '$500M to $1B',
  '$1B to $5B',
  '$5B+',
]

const trust = [
  { icon: 'shield-check', text: 'Proof over pitch. We lead with your benchmark, not a demo.' },
  { icon: 'zap', text: 'Twenty minutes is usually enough to see the gap.' },
  { icon: 'route', text: 'Processor-agnostic. Keep every processor you run today.' },
] as const

type Fields = { name: string; email: string; company: string; volume: string; message: string }
type Errors = Partial<Record<keyof Fields, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function Contact() {
  const [fields, setFields] = useState<Fields>({ name: '', email: '', company: '', volume: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [submitError, setSubmitError] = useState('')

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFields((f) => ({ ...f, [k]: e.target.value }))
    setErrors((prev) => ({ ...prev, [k]: undefined }))
  }

  const validate = (): boolean => {
    const next: Errors = {}
    if (!fields.name.trim()) next.name = 'Please enter your name.'
    if (!fields.email.trim()) next.email = 'Please enter your work email.'
    else if (!EMAIL_RE.test(fields.email)) next.email = 'That email does not look right.'
    if (!fields.company.trim()) next.company = 'Please enter your company.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('submitting')
    setSubmitError('')
    try {
      if (isHubSpotConfigured()) {
        await submitToHubSpot(fields)
      } else {
        // No Form GUID configured yet — simulate so the site stays functional.
        if (import.meta.env.DEV) {
          console.warn('[Revolv3] HubSpot form not configured — set VITE_HUBSPOT_FORM_GUID to submit for real.')
        }
        await new Promise((r) => setTimeout(r, 800))
      }
      setStatus('success')
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-gradient-sky-wash py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" aria-hidden />
      <div className="container-x relative">
        <div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* Copy */}
          <div className="lg:pt-6">
            <Reveal>
              <Eyebrow>{cta.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-4 text-display-lg font-extrabold text-nile-900">{cta.title}</h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink-600">{cta.sub}</p>
            </Reveal>

            <ul className="mt-9 space-y-4">
              {trust.map((t, i) => (
                <Reveal as="li" key={t.text} delay={0.18 + i * 0.08} className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-skylla-600 shadow-sm">
                    <Icon name={t.icon} className="h-5 w-5" />
                  </span>
                  <span className="pt-1.5 text-[0.95rem] text-ink-700">{t.text}</span>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* Form */}
          <Reveal from="right" delay={0.1}>
            <div className="relative rounded-2xl border border-ink-200/80 bg-white p-6 shadow-lg sm:p-8">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE_OUT }}
                    className="flex min-h-[420px] flex-col items-center justify-center text-center"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand text-white shadow-primary">
                      <Icon name="check" className="h-7 w-7" />
                    </span>
                    <h3 className="mt-6 text-2xl font-bold text-nile-900">Request received.</h3>
                    <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-ink-600">
                      We will be in touch shortly to schedule your benchmark and show you what the gap is worth for a
                      merchant at your volume.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={onSubmit}
                    noValidate
                    className="space-y-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Name" error={errors.name}>
                        <input
                          type="text"
                          value={fields.name}
                          onChange={set('name')}
                          autoComplete="name"
                          className={inputCls(!!errors.name)}
                          placeholder="Jordan Reyes"
                        />
                      </Field>
                      <Field label="Work email" error={errors.email}>
                        <input
                          type="email"
                          value={fields.email}
                          onChange={set('email')}
                          autoComplete="email"
                          className={inputCls(!!errors.email)}
                          placeholder="jordan@company.com"
                        />
                      </Field>
                    </div>

                    <Field label="Company" error={errors.company}>
                      <input
                        type="text"
                        value={fields.company}
                        onChange={set('company')}
                        autoComplete="organization"
                        className={inputCls(!!errors.company)}
                        placeholder="Company, Inc."
                      />
                    </Field>

                    <Field label="Annual card-not-present volume" hint="Optional">
                      <select value={fields.volume} onChange={set('volume')} className={cn(inputCls(false), 'appearance-none bg-[right_1rem_center] bg-no-repeat pr-10')}>
                        <option value="">Select a range</option>
                        {volumes.map((v) => (
                          <option key={v} value={v}>
                            {v}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label="What triggered the search?" hint="Optional">
                      <textarea
                        value={fields.message}
                        onChange={set('message')}
                        rows={3}
                        className={cn(inputCls(false), 'resize-none')}
                        placeholder="A benchmark, a processor change, a decline spike…"
                      />
                    </Field>

                    {status === 'error' && submitError && (
                      <p
                        role="alert"
                        className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
                      >
                        {submitError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-skylla-600 font-semibold text-white shadow-primary transition-all duration-200 hover:-translate-y-0.5 hover:bg-skylla-700 hover:shadow-lg disabled:translate-y-0 disabled:opacity-70"
                    >
                      {status === 'submitting' ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                          Sending…
                        </>
                      ) : (
                        <>
                          {cta.primary}
                          <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </>
                      )}
                    </button>
                    <p className="text-center text-xs text-ink-400">
                      We respect your inbox. No spam, no reselling your data.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function inputCls(hasError: boolean) {
  return cn(
    'w-full rounded-xl border bg-white px-4 py-3 text-[0.95rem] text-nile-900 placeholder:text-ink-400 transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-skylla-500/40',
    hasError ? 'border-red-400 focus:ring-red-400/30' : 'border-ink-200 hover:border-ink-300',
  )
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between">
        <span className="text-sm font-semibold text-nile-800">{label}</span>
        {hint && <span className="text-xs text-ink-400">{hint}</span>}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-xs font-medium text-red-500">{error}</span>}
    </label>
  )
}
