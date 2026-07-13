# Revolv3 — Website

A new premium marketing site for **Revolv3**, the payments control and optimization
layer that improves payment success across processors. Built to look expensive,
modern, and technically credible, with elegant, performance-conscious motion.

This replaces the previous Webflow site. Messaging is rebuilt from the Revolv3
Master Brand Brain (Foundation, Story, Voice, Messaging Framework) and the
Audience Intelligence / ICP.

## Tech stack

- **React 18** + **TypeScript**
- **Vite 6** (fast dev + optimized production build)
- **Tailwind CSS 3** — brand tokens mapped in `tailwind.config.js`
- **Framer Motion 11** — scroll reveals, parallax, staggered entrances, the
  animated hero panel, and the live impact calculator
- **lucide-react** — the brand's default icon system
- **react-router-dom** — Home, Resources, and article routes

## Getting started

```bash
npm install
npm run dev        # local dev server
npm run build      # typecheck + production build to /dist
npm run preview    # preview the production build
```

## Design system

The visual language comes directly from the **Revolv3 Design System** (Claude
Design project) and the Brand Guidelines:

- **Color** — Skylla `#2486B9` (primary), Dark Nile `#1A3E50` (depth), Lily White
  `#E4F5FD` (soft surfaces), Pool Tiles `#60C1EE` (bright accent, signature
  Skylla→Pool gradient), Lambo Yellow `#FFDB63` (sparing highlight only).
  Predominantly white/Lily-White with confident blue; full Nile-navy reserved for
  hero and standout sections.
- **Type** — Open Sauce Sans throughout (Bold/Extrabold display with tight
  tracking; Regular/Medium body at 1.5), loaded from the Fontsource CDN.
- **Shape & depth** — 16px cards, 8px controls, pill buttons; cool navy-tinted
  shadows; quick eased motion (120–320ms).
- **Logo** — official wordmark vector (`src/data/logoData.ts`); the reversed
  treatment for dark surfaces is a monochrome-white invert.

Tokens live in `tailwind.config.js` and `src/index.css`. All motion respects
`prefers-reduced-motion`.

## Structure

```
src/
  components/
    layout/     Navbar, Footer, ScrollToTop
    sections/   Hero, LogoCloud, Problem, Pillars, HowItWorks,
                Impact (calculator), Difference, Story, Testimonials, Contact
    ui/         Button, Logo, Icon, Reveal, Marquee, AnimatedNumber,
                Eyebrow, SectionHeading
  data/         content.ts (messaging), resources.ts, logoData.ts, partnerLogos.ts
  lib/          motion.ts, useReducedMotion.ts, utils.ts
  pages/        Home, Resources, ResourceArticle
```

## Messaging

All site copy is in `src/data/content.ts`, authored to the brand voice
(Bold · Confident · Transparent · Visionary). Revolv3 is framed as the layer
**above** processors — never a gateway, processor, or analytics tool — and the
three value pillars (Control · Performance · Intelligence) structure the platform
section. The impact calculator uses the ICP Revenue Impact Framework
(1% of $100M volume = $1M recovered).

## Resources content — migration note

The live site (`revolv3.com/resources`) organizes content by **type** (Blogs,
Case Studies, Press & Podcasts) and **topic** (Revenue, Payment Processing,
Payment Optimization). This build reproduces that exact taxonomy in
`src/data/resources.ts`, seeded with known + representative items.

> The environment used to build this site cannot reach the live Webflow domain
> (bot protection returns 403), so the full existing library could not be
> scraped automatically. To preserve everything, export the Webflow "Resources"
> collection and drop the items into the `resources` array — its shape maps 1:1
> to the CMS fields (title, excerpt, type, topic, readTime, date, href).

## Contact form → HubSpot

`src/components/sections/Contact.tsx` is a fully validated, embedded form with
success and error states. It submits to HubSpot via the **Forms Submission API
v3** (`src/lib/hubspot.ts`) — a browser-native path with no backend and no
secret token. The Revolv3 **Portal ID (`22077173`)** is baked in as the default.

### Go live in two steps

1. **Create a HubSpot form** (Marketing → Forms) with these fields:
   `First name`, `Last name`, `Email` (required), `Company`, `Message`.
   Copy its **Form GUID** from the editor URL (`…/forms/editor/<GUID>`).
2. **Set the GUID** at build time. Copy `.env.example` → `.env` and set
   `VITE_HUBSPOT_FORM_GUID=<your-guid>` (or set it in your host's build env).

Field mapping: the single `Name` field is split into `firstname` / `lastname`;
`email` and `company` map directly; the selected volume is folded into the
standard `message` property (so no custom property is needed). Submissions
include the `hubspotutk` cookie for visitor attribution.

Until a GUID is set, the form validates and shows the success state but does not
send (a dev-only console warning notes this), so the site stays functional
pre-configuration.
