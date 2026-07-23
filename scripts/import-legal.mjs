/* ============================================================
   Webflow CMS -> site data importer (Legal collection)

   Parses the Webflow "Legal" CSV export into:
     src/data/legal.index.json          - metadata for the footer + routing
     public/legal-bodies/<slug>.json     - per-page rich-text HTML, fetched
                                           on demand by the legal page

   Only published, non-draft, non-archived items are included.

   Usage:
     node scripts/import-legal.mjs <path-to-Legal-export.csv>
   ============================================================ */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = resolve(__dirname, '../src/data')
const BODIES_DIR = resolve(__dirname, '../public/legal-bodies')

// Footer/display order (any not listed fall to the end, alphabetical).
const ORDER = ['privacy-policy', 'terms-and-conditions', 'cookies-policy', 'disclaimer']

/** Minimal RFC-4180 CSV parser (quotes, escaped quotes, embedded newlines). */
function parseCsv(text) {
  const rows = []
  let row = [], field = '', q = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (q) {
      if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++ } else q = false }
      else field += c
    } else if (c === '"') q = true
    else if (c === ',') { row.push(field); field = '' }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = '' }
    else if (c !== '\r') field += c
  }
  if (field.length || row.length) { row.push(field); rows.push(row) }
  return rows
}

function toRecords(rows) {
  const header = rows[0]
  return rows.slice(1).map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ''])))
}

function toISODate(s) {
  if (!s) return null
  const d = new Date(s)
  return Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10)
}

const csvPath = process.argv[2]
if (!csvPath) { console.error('Usage: node scripts/import-legal.mjs <path-to-csv>'); process.exit(1) }

const records = toRecords(parseCsv(readFileSync(csvPath, 'utf-8')))
const live = records.filter((r) => r['Archived'] === 'false' && r['Draft'] === 'false' && r['Published On'])

live.sort((a, b) => {
  const ia = ORDER.indexOf(a['Slug']), ib = ORDER.indexOf(b['Slug'])
  if (ia !== -1 || ib !== -1) return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
  return a['Name'].localeCompare(b['Name'])
})

rmSync(BODIES_DIR, { recursive: true, force: true })
mkdirSync(BODIES_DIR, { recursive: true })
mkdirSync(OUT_DIR, { recursive: true })

const index = []
for (const r of live) {
  const slug = r['Slug']
  if (!slug) continue
  const body = r['Legal Rich Text'] || ''
  // Source-typo corrections carried from the CMS export (applied on every import).
  const intro = (r['SEO Description / Page Intro'] || '').replace(
    'describes ur policies',
    'describes our policies',
  )
  index.push({
    slug,
    title: r['Name'] || slug,
    intro,
    lastUpdated: toISODate(r['Date (Last Updated)']),
    pdf: r['PDF Download'] || undefined,
    hasBody: body.trim().length > 0,
  })
  if (body.trim().length > 0) writeFileSync(resolve(BODIES_DIR, `${slug}.json`), JSON.stringify({ html: body }))
}

writeFileSync(resolve(OUT_DIR, 'legal.index.json'), JSON.stringify(index, null, 2))
console.log(`Imported ${index.length} live legal pages: ${index.map((i) => i.slug).join(', ')}`)
const drafts = records.filter((r) => r['Draft'] === 'true').map((r) => r['Slug'])
if (drafts.length) console.log(`  (skipped drafts: ${drafts.join(', ')})`)
