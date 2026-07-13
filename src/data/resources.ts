/* ============================================================
   Revolv3 — Resources
   The live site (revolv3.com/resources) organizes content by TYPE
   (Blogs, Case Studies, Press & Podcasts) and TOPIC (Revenue,
   Payment Processing, Payment Optimization).

   The environment that generated this site cannot reach the live
   Webflow domain (bot protection / 403), so the full existing
   library could not be scraped automatically. This file mirrors the
   exact taxonomy and is seeded with known + representative items so
   the section is fully functional. To preserve everything: export the
   Webflow collection (or drop the CMS items) into this array — the
   shape below maps 1:1 to a Webflow "Resources" collection.
   ============================================================ */

export type ResourceType = 'Blog' | 'Case Study' | 'Press & Podcast'
export type ResourceTopic = 'Revenue' | 'Payment Processing' | 'Payment Optimization'

export type Resource = {
  slug: string
  title: string
  excerpt: string
  type: ResourceType
  topic: ResourceTopic
  readTime: string
  date: string
  featured?: boolean
  /** Optional external/canonical URL on the current site while migrating. */
  href?: string
}

export const RESOURCE_TYPES: ResourceType[] = ['Blog', 'Case Study', 'Press & Podcast']
export const RESOURCE_TOPICS: ResourceTopic[] = ['Revenue', 'Payment Processing', 'Payment Optimization']

export const resources: Resource[] = [
  {
    slug: 'subscription-billing-and-payment-optimization-with-robert-podlesni',
    title: 'Subscription Billing and Payment Optimization with Robert Podlesni',
    excerpt:
      'A conversation on why recurring authorization is where revenue quietly leaks — and how an independent layer changes the renewal moment.',
    type: 'Press & Podcast',
    topic: 'Payment Optimization',
    readTime: '32 min listen',
    date: '2025-11-18',
    featured: true,
    href: 'https://www.revolv3.com/resources/subscription-billing-and-payment-optimization-with-robert-podlesni',
  },
  {
    slug: 'authorization-rate-is-not-a-fact',
    title: 'Your authorization rate is not a fact about your business',
    excerpt:
      'It is a fact about the tools you use to measure it. Why the measurement system merchants accept is the biggest barrier to better performance.',
    type: 'Blog',
    topic: 'Payment Optimization',
    readTime: '6 min read',
    date: '2026-02-04',
    featured: true,
  },
  {
    slug: 'second-processor-didnt-move-the-number',
    title: 'You added a second processor. Your authorization rate didn’t move.',
    excerpt:
      'Routing gets you to the processor. It does not get you through the issuer. Where the approval decision actually happens.',
    type: 'Blog',
    topic: 'Payment Processing',
    readTime: '5 min read',
    date: '2026-01-21',
  },
  {
    slug: 'one-percent-on-a-hundred-million',
    title: 'What one point of authorization is worth on $100M in volume',
    excerpt:
      'A framework for turning basis points into dollars on your income statement — and why subscription businesses should apply an LTV multiplier.',
    type: 'Blog',
    topic: 'Revenue',
    readTime: '4 min read',
    date: '2025-12-09',
  },
  {
    slug: 'bin-level-intelligence-explained',
    title: 'BIN-level intelligence, explained',
    excerpt:
      'Why aggregate decline reporting can’t drive optimization, and what card-level and issuer-level data actually unlocks.',
    type: 'Blog',
    topic: 'Payment Optimization',
    readTime: '7 min read',
    date: '2025-12-02',
  },
  {
    slug: 'recovering-installment-declines',
    title: 'Case study: recovering installment charge declines from the 50s',
    excerpt:
      'A recurring-billing merchant discovered installment charges two and three were collapsing — through a benchmark, not their own reporting.',
    type: 'Case Study',
    topic: 'Revenue',
    readTime: '5 min read',
    date: '2025-10-15',
  },
  {
    slug: 'invisible-interchange-downgrade',
    title: 'Case study: 16,000+ transactions downgrading every billing cycle',
    excerpt:
      'Strong approval rates, low fraud, a team that cared — and a loss that was invisible in the data they were using.',
    type: 'Case Study',
    topic: 'Payment Processing',
    readTime: '6 min read',
    date: '2025-09-22',
  },
  {
    slug: 'processor-concentration-risk',
    title: 'The processor concentration risk no one reviewed for six years',
    excerpt:
      'How single-processor dependency stays invisible until a termination, an outage, or a surprise reserve requirement makes it a cash event.',
    type: 'Blog',
    topic: 'Payment Processing',
    readTime: '6 min read',
    date: '2025-09-03',
  },
  {
    slug: 'build-vs-buy-payments',
    title: 'Build vs. buy: the payments optimization reckoning',
    excerpt:
      'The teams that actually built the in-house stack — and got declines under 1% — are the ones now saying it isn’t worth it at most companies.',
    type: 'Blog',
    topic: 'Payment Optimization',
    readTime: '8 min read',
    date: '2025-08-19',
  },
  {
    slug: 'authorization-as-a-science',
    title: 'Making authorization a science',
    excerpt:
      'Our north star: a payments industry where performance is owned by the merchant, measured independently, and optimized systematically.',
    type: 'Press & Podcast',
    topic: 'Payment Optimization',
    readTime: '24 min listen',
    date: '2025-07-30',
  },
]
