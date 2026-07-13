/* ============================================================
   Webflow CMS → site data importer (Resources collection)

   Parses a Webflow CSV export into:
     src/data/resources.index.json          — lightweight metadata (listing)
     public/resource-bodies/<slug>.json      — per-article HTML, fetched
                                                on demand by the article page

   Only published, non-draft, non-archived items are included.

   Usage:
     node scripts/import-resources.mjs <path-to-Resources-export.csv>

   Other Webflow collections can reuse this by adjusting COLUMN_MAP and the
   category/topic label maps below.
   ============================================================ */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = resolve(__dirname, '../src/data')
const BODIES_DIR = resolve(__dirname, '../public/resource-bodies')

const CATEGORY_LABELS = {
  articles: 'Article',
  blogs: 'Blog',
  press: 'Press',
  'case-studies': 'Case Study',
  'white-papers': 'White Paper',
}
const TOPIC_LABELS = {
  'payment-processing': 'Payment Processing',
  'enterprise-payment-systems': 'Enterprise Payment Systems',
  revenue: 'Revenue',
  'subscription-management': 'Subscription Management',
  'customer-churn': 'Customer Churn',
  'payment-optimization': 'Payment Optimization',
}

/** Minimal RFC-4180 CSV parser (handles quotes, escaped quotes, newlines). */
function parseCsv(text) {
  const rows = []
  let row = []
  let field = ''
  let inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        field += c
      }
    } else if (c === '"') {
      inQuotes = true
    } else if (c === ',') {
      row.push(field)
      field = ''
    } else if (c === '\n') {
      row.push(field)
      rows.push(row)
      row = []
      field = ''
    } else if (c === '\r') {
      // ignore; newline handled by \n
    } else {
      field += c
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field)
    rows.push(row)
  }
  return rows
}

function toRecords(rows) {
  const header = rows[0]
  return rows.slice(1).map((r) => {
    const o = {}
    header.forEach((h, i) => (o[h] = r[i] ?? ''))
    return o
  })
}

function toISODate(s) {
  if (!s) return null
  const d = new Date(s)
  if (Number.isNaN(d.getTime())) return null
  return d.toISOString().slice(0, 10)
}

function readMinutes(html) {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/gi, ' ')
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

// House style: "&" reads as "and" in visible card headings. Decode any HTML
// entity first, then normalize spacing around the ampersand.
function normalizeTitle(t) {
  return t.replace(/&amp;/g, '&').replace(/\s*&\s*/g, ' and ')
}

const csvPath = process.argv[2]
if (!csvPath) {
  console.error('Usage: node scripts/import-resources.mjs <path-to-csv>')
  process.exit(1)
}

const raw = readFileSync(csvPath, 'utf-8')
const records = toRecords(parseCsv(raw))

const live = records.filter(
  (r) => r['Archived'] === 'false' && r['Draft'] === 'false' && r['Published On'],
)

// Sort newest first by original Date (fall back to Published On).
live.sort((a, b) => {
  const da = new Date(a['Date'] || a['Published On']).getTime()
  const db = new Date(b['Date'] || b['Published On']).getTime()
  return db - da
})

// Fresh per-article body directory.
rmSync(BODIES_DIR, { recursive: true, force: true })
mkdirSync(BODIES_DIR, { recursive: true })

const index = []
const unknownCats = new Set()
const unknownTopics = new Set()

for (const r of live) {
  const slug = r['Slug']
  if (!slug) continue
  const category = r['Category'] || 'articles'
  const topic = r['Topic'] || ''
  if (!CATEGORY_LABELS[category]) unknownCats.add(category)
  if (topic && !TOPIC_LABELS[topic]) unknownTopics.add(topic)

  const body = r['Post Body'] || ''
  const externalLink = r['rel canonical is external'] === 'true' ? r['Button Link'] || '' : ''

  index.push({
    slug,
    title: normalizeTitle(r['Name H1'] || slug),
    excerpt: r['SEO Description'] || '',
    category,
    categoryLabel: CATEGORY_LABELS[category] || category,
    topic,
    topicLabel: TOPIC_LABELS[topic] || topic,
    date: toISODate(r['Date']) || toISODate(r['Published On']),
    author: r['Author'] || 'Revolv3',
    image: r['Item Image'] || '',
    readMinutes: readMinutes(body),
    hasBody: body.trim().length > 0,
    externalUrl: externalLink || undefined,
  })
  if (body.trim().length > 0) {
    writeFileSync(resolve(BODIES_DIR, `${slug}.json`), JSON.stringify({ html: body }))
  }
}

mkdirSync(OUT_DIR, { recursive: true })
writeFileSync(resolve(OUT_DIR, 'resources.index.json'), JSON.stringify(index, null, 2))

console.log(`Imported ${index.length} live resources.`)
console.log(`  categories: ${[...new Set(index.map((i) => i.category))].join(', ')}`)
console.log(`  topics: ${[...new Set(index.map((i) => i.topic))].filter(Boolean).join(', ')}`)
if (unknownCats.size) console.warn('  ⚠ unmapped categories:', [...unknownCats])
if (unknownTopics.size) console.warn('  ⚠ unmapped topics:', [...unknownTopics])
console.log('  wrote src/data/resources.index.json + public/resource-bodies/<slug>.json')
