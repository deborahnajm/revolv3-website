/** Tiny classNames joiner — no runtime dependency. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
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
