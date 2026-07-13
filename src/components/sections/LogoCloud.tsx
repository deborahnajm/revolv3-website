import { Marquee } from '../ui/Marquee'
import { Reveal } from '../ui/Reveal'
import { PARTNER_SVGS } from '../../data/partnerLogos'

const order = ['Recurly', 'Magento', 'BigCommerce'] as const

function PartnerMark({ name }: { name: string }) {
  return (
    <span
      className="inline-flex h-7 shrink-0 items-center text-ink-400 transition-colors duration-300 hover:text-nile-700 [&>svg]:h-full [&>svg]:w-auto"
      aria-label={name}
      role="img"
      dangerouslySetInnerHTML={{ __html: PARTNER_SVGS[name] }}
    />
  )
}

export function LogoCloud() {
  return (
    <section className="border-b border-ink-100 bg-white py-14">
      <div className="container-x">
        <Reveal>
          <p className="text-center text-sm font-medium text-ink-500">
            Sits above the commerce, billing, and processor stack you already run
          </p>
        </Reveal>
        <div className="mt-8">
          <Marquee>
            {[...order, ...order, ...order].map((name, i) => (
              <PartnerMark key={`${name}-${i}`} name={name} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  )
}
