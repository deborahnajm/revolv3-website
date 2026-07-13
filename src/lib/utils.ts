/** Tiny classNames joiner — no runtime dependency. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/**
 * Format an ISO calendar date (e.g. "2026-07-30") for display.
 *
 * Date-only strings are parsed by `new Date()` as UTC midnight, so formatting
 * them with the browser's local timezone rolls the date back a day in any zone
 * behind UTC (Thursday July 30 would render as Wednesday July 29). Formatting
 * in UTC keeps the calendar date intact everywhere.
 */
export function formatDate(
  d: string | null,
  options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' },
): string {
  if (!d) return ''
  const date = new Date(d)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-US', { timeZone: 'UTC', ...options })
}

/** Format a large USD figure compactly, e.g. 1_500_000 -> "$1.5M". */
export function formatUSD(value: number): string {
  if (value >= 1_000_000_000) {
    const v = value / 1_000_000_000
    return `$${v % 1 === 0 ? v.toFixed(0) : v.toFixed(1)}B`
  }
  if (value >= 1_000_000) {
    const v = value / 1_000_000
    return `$${v % 1 === 0 ? v.toFixed(0) : v.toFixed(1)}M`
  }
  if (value >= 1_000) {
    return `$${Math.round(value / 1_000)}K`
  }
  return `$${Math.round(value)}`
}
