/* Legal pages, generated from the Webflow "Legal" CMS export by
   scripts/import-legal.mjs. Body HTML per page lives in
   public/legal-bodies/<slug>.json and is fetched on demand.
   Refresh with: node scripts/import-legal.mjs <export.csv> */
import indexData from './legal.index.json'

export type LegalMeta = {
  slug: string
  title: string
  intro: string
  lastUpdated: string | null
  pdf?: string
  hasBody: boolean
}

export const legalPages = indexData as LegalMeta[]

export function findLegal(slug: string): LegalMeta | undefined {
  return legalPages.find((p) => p.slug === slug)
}
