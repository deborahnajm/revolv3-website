/* ============================================================
   Revolv3 — messaging framework
   Authored from the Master Brand Brain (Foundation, Story, Voice,
   Messaging Framework) and the Audience Intelligence / ICP.
   Voice: Bold · Confident · Transparent · Visionary.
   Positioning: the payments control and optimization layer that
   improves payment success across processors. Not a gateway,
   processor, or analytics tool — the layer above them.
   ============================================================ */

export const POSITIONING =
  'Revolv3 is the payments control and optimization layer that improves payment success across processors.'

export const nav = [
  { label: 'Platform', href: '/#platform' },
  { label: 'The Gap', href: '/#problem' },
  { label: 'Impact', href: '/#impact' },
  { label: 'Why Revolv3', href: '/#difference' },
  { label: 'Resources', href: '/resources' },
] as const

export const hero = {
  eyebrow: 'The independent payments layer',
  // Website Hero Copy, verbatim from the brand brain voice samples.
  titleLead: 'The payments control layer',
  titleEmph: 'that turns performance into revenue',
  sub: 'Revolv3 is the control and optimization layer that sits above your processors, improving approvals, recovering revenue, and turning authorization from an accepted variable into a managed outcome. We will show you what the gap is worth.',
  ctaPrimary: 'See your revenue gap',
  ctaSecondary: 'How it works',
}

/** Rotating one-liners under the hero, drawn from voice samples. */
export const heroRotators = [
  'See outside your own data for the first time.',
  'First-pass approvals, not recovery.',
  'Authorization is a variable, not a constant.',
]

export const trustLine = 'Built for recurring and card-on-file merchants processing $10M+ in card-not-present volume.'

/* ---- The Problem / The Gap ---- */
export const problem = {
  eyebrow: 'The core insight',
  title: 'Your authorization rate is not a fact about your business.',
  body: 'It is a fact about the tools you use to measure it, and about what those tools are designed to show you. A single processor can only report on its own traffic. An independent layer sees across all of it.',
  points: [
    {
      icon: 'eye-off',
      title: 'Declines arrive as verdicts, not diagnostics',
      body: 'Generic decline codes with no issuer-level context. You cannot tell a card problem from a BIN problem from a routing failure.',
    },
    {
      icon: 'line-chart',
      title: 'You are measured by the tools you were given',
      body: 'The tools most merchants use to measure payment performance give a single-network view. An independent layer sees across all of it.',
    },
    {
      icon: 'git-branch',
      title: 'Adding a processor did not move the number',
      body: 'Routing gets you to the processor. It does not get you through the issuer. The decision that approves a transaction happens deeper than routing.',
    },
  ],
}

/* ---- Three value pillars ---- */
export const pillars = {
  eyebrow: 'One layer, three jobs',
  title: 'Control, performance, and intelligence: above every processor.',
  sub: 'You set the strategy. Revolv3 executes it. Everything flows from three pillars, and every processor stays in play.',
  items: [
    {
      key: 'control',
      icon: 'route',
      name: 'Payments Control',
      headline: 'You set the strategy. We execute it.',
      body: 'Revolv3 controls the flow between your systems and your processors. You define high-level rules; we execute routing, retries, and authorization preparation automatically. Processor-agnostic by design, with no infrastructure to rebuild.',
      bullets: [
        'Processor-agnostic routing and failover',
        'Control without rebuilding integrations',
        'Reduce dependence on any single processor',
      ],
    },
    {
      key: 'performance',
      icon: 'trending-up',
      name: 'Payments Performance',
      headline: 'First-pass approvals, not recovery.',
      body: 'We improve authorization success, revenue recovery, and payment reliability through optimized transaction preparation and intelligent routing. We prevent the decline at the first pass. Recovery is the consolation prize.',
      bullets: [
        'Transaction preparation before the issuer',
        'Intelligent retry and re-routing',
        '1% on $100M in volume = $1M recovered',
      ],
    },
    {
      key: 'intelligence',
      icon: 'radar',
      name: 'Payments Intelligence',
      headline: 'See outside your own data.',
      body: 'BIN-level insights, processor benchmarking, and transaction-level visibility. An independent view no single processor can give you, because each one can only see its own traffic.',
      bullets: [
        'BIN-level performance and attribution',
        'Benchmark processors independently',
        'The gap is real. We show you what it is.',
      ],
    },
  ],
}

/* ---- How it works ---- */
export const how = {
  eyebrow: 'How it works',
  title: 'Discovery first. Urgency immediately after.',
  sub: 'Nobody goes looking for payment optimization while they believe their numbers are fine. Our job is to be the external trigger that shows you the gap, and then to close it permanently.',
  steps: [
    {
      n: '01',
      icon: 'search',
      title: 'See the gap',
      body: 'We benchmark your authorization performance against cross-merchant data for your card mix and vertical. You see, for the first time, the delta between your current rate and your achievable rate, in dollars.',
    },
    {
      n: '02',
      icon: 'sliders-horizontal',
      title: 'Set the strategy',
      body: 'You define the payment strategy and rules a CFO can read. No black-box algorithm, no engineering sprint for every change. Revolv3 becomes the control layer above your existing processors.',
    },
    {
      n: '03',
      icon: 'route',
      title: 'We execute it',
      body: 'Revolv3 prepares each transaction, routes it to the highest-performing path, and retries intelligently on failure (automatically, across processors, on every transaction).',
    },
    {
      n: '04',
      icon: 'activity',
      title: 'Close it permanently',
      body: 'Every optimization ties to a measurable revenue outcome. Authorization stops being something that happens to you and becomes a managed, monitored result.',
    },
  ],
}

/* ---- Impact / proof numbers ---- */
export const impact = {
  eyebrow: 'The math',
  title: 'A single point of authorization is worth more than you think.',
  sub: 'A 1% improvement in authorization on card-not-present volume, recovered annually. Move the slider to your volume.',
  // volume -> recovered at 1% / 2% / 3% (from the ICP Revenue Impact Framework)
  footnote:
    'First-order authorization lift only. Subscription businesses should apply an LTV multiplier. Each prevented involuntary churn event preserves future recurring revenue.',
  stats: [
    { value: 443, prefix: '$', suffix: 'B', label: 'False declines in subscription billing, industry-wide' },
    { value: 90, suffix: 's', label: 'Experian collection rates, from the low 70s after our founding approach', isText: true, text: 'Low 70s → High 90s' },
    { value: 30, prefix: '$', suffix: 'K to $100K', label: 'Per day lost to declined installment charges at one merchant, before Revolv3' },
  ],
}

/* ---- Competitive difference ---- */
export const difference = {
  eyebrow: 'Why Revolv3',
  title: 'The independent layer that was missing from the stack.',
  sub: 'Revolv3 has competition: the fragmented approaches merchants use today. Here is where each one stops, and we begin.',
  rows: [
    {
      them: 'Processor-native tools',
      themDesc: 'Optimize within a single network, with visibility limited to that network\'s own traffic.',
      us: 'Processor-agnostic. We see across all traffic, not one processor’s slice.',
    },
    {
      them: 'Orchestration platforms',
      themDesc: 'Built for dedicated payments teams. Complex and costly for most mid-market businesses.',
      us: 'Enterprise-grade optimization without a dedicated payments engineering team.',
    },
    {
      them: 'Gateways',
      themDesc: 'Enable transactions. Not built to reduce declines or lift approval rates.',
      us: 'We sit above the gateway, the intelligence layer it does not provide.',
    },
    {
      them: 'Internal / bespoke builds',
      themDesc: 'Work for companies with the capital and roadmap space. Most cannot maintain them.',
      us: 'The results of a bespoke build, at a fraction of the cost and maintenance.',
    },
    {
      them: 'Dunning and retry tools',
      themDesc: 'Recover revenue after a decline. Email and retry campaigns downstream.',
      us: 'We prevent the decline at the first pass. Recovery is the consolation prize.',
    },
  ],
}

/* ---- Founder story ---- */
export const story = {
  eyebrow: 'Why we exist',
  title: 'Frank spent 20 years watching companies lose revenue to a solvable problem.',
  body: [
    'At Experian, Frank Arellano led the team tasked with false declines for large subscription businesses. He tried every platform on the market. None of them worked. So he built one, and collection rates went from the low 70s to the high 90s.',
    'The problem was solvable. It had always been solvable. There just was not anyone selling the solution. Every enterprise he spoke with was either buying platforms that failed them or building expensive bespoke systems in-house.',
    'What changed was not the technology. What changed was that someone who had seen the problem from the inside decided to build the solution for everyone, not just the companies that could afford to build it themselves.',
  ],
  quote: 'The party best positioned to show a merchant what it is losing is an independent one, sitting across every processor at once. Someone needed to build the layer that did.',
}

/* ---- Voice of customer (verbatim from prospect / customer calls) ---- */
export const voc = [
  { quote: 'Band aids and duct tape.', ctx: 'A merchant on their homegrown payment stack' },
  { quote: 'It just does not make any sense.', ctx: 'On a 300 bps swing between routing paths for the same card brand' },
  { quote: 'We were really stuck.', ctx: '$17,000 frozen between three platforms, each pointing at the next' },
  { quote: 'I can’t wait.', ctx: 'On learning the daily revenue lost to declined installment charges' },
  { quote: 'You could pitch me all day. All I care about is if it’s true or not.', ctx: 'A post-burn buyer, on proof over promise' },
  { quote: 'We don’t have the ability to do that.', ctx: 'An assumed limitation that was never real' },
  { quote: 'Banging my head against the wall.', ctx: 'On processor and gateway opacity' },
]

/* ---- Closing CTA ---- */
export const cta = {
  eyebrow: 'The benchmark meeting',
  title: 'See your own data from the outside for the first time.',
  sub: 'The job is not to convince you that you have a problem. It is to show you the gap, and what closing it is worth. Twenty minutes is usually enough.',
  primary: 'Request your benchmark',
  secondary: 'Talk to the team',
}

export const partners = ['recurly', 'magento', 'bigcommerce'] as const

export const footerNav = {
  Platform: [
    { label: 'Payments Control', href: '/#platform' },
    { label: 'Payments Performance', href: '/#platform' },
    { label: 'Payments Intelligence', href: '/#platform' },
    { label: 'How it works', href: '/#how' },
  ],
  Company: [
    { label: 'Why Revolv3', href: '/#difference' },
    { label: 'Our story', href: '/#story' },
    { label: 'Resources', href: '/resources' },
    { label: 'Contact', href: '/#contact' },
  ],
  Segments: [
    { label: 'Revenue recovery', href: '/#impact' },
    { label: 'Processor optimization', href: '/#difference' },
    { label: 'Subscription optimization', href: '/#impact' },
    { label: 'Payment visibility', href: '/#platform' },
  ],
}
