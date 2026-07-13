/* ============================================================
   Revolv3 — Resources
   Generated from the Webflow "Resources" CMS export by
   `scripts/import-resources.mjs`. The listing uses this lightweight
   metadata index; full article HTML lives in resources.bodies.json and
   is loaded only on the article route.

   To refresh after a CMS change, re-run:
     node scripts/import-resources.mjs <path-to-export.csv>
   ============================================================ */
import indexData from './resources.index.json'

export type ResourceMeta = {
  slug: string
  title: string
  excerpt: string
  category: string
  categoryLabel: string
  topic: string
  topicLabel: string
  date: string | null
  author: string
  image: string
  readMinutes: number
  hasBody: boolean
  externalUrl?: string
}

export const resources = indexData as ResourceMeta[]

/** Build an ordered, de-duplicated filter list of {value,label} from the data. */
function facets(order: string[], key: 'category' | 'topic') {
  const seen = new Map<string, string>()
  for (const r of resources) {
    const v = r[key]
    if (v && !seen.has(v)) seen.set(v, key === 'category' ? r.categoryLabel : r.topicLabel)
  }
  const ordered: { value: string; label: string }[] = []
  for (const v of order) if (seen.has(v)) ordered.push({ value: v, label: seen.get(v)! })
  for (const [v, label] of seen) if (!order.includes(v)) ordered.push({ value: v, label })
  return ordered
}

// Preferred display order (any values not listed fall to the end).
export const CATEGORIES = facets(
  ['articles', 'blogs', 'case-studies', 'press', 'white-papers'],
  'category',
)
export const TOPICS = facets(
  [
    'payment-optimization',
    'payment-processing',
    'revenue',
    'subscription-management',
    'customer-churn',
    'enterprise-payment-systems',
  ],
  'topic',
)

export function prettifyAuthor(author: string): string {
  if (!author || author.toLowerCase() === 'revolv3') return 'Revolv3'
  return author
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export function findResource(slug: string): ResourceMeta | undefined {
  return resources.find((r) => r.slug === slug)
}
