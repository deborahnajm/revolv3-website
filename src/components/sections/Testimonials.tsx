import { Marquee } from '../ui/Marquee'
import { SectionHeading } from '../ui/SectionHeading'
import { voc } from '../../data/content'

function QuoteCard({ quote, ctx }: { quote: string; ctx: string }) {
  return (
    <figure className="flex w-[340px] shrink-0 flex-col justify-between rounded-2xl border border-ink-200/80 bg-white p-6 shadow-sm">
      <blockquote className="text-lg font-semibold leading-snug text-nile-900">“{quote}”</blockquote>
      <figcaption className="mt-5 flex items-center gap-2 text-sm text-ink-500">
        <span className="h-4 w-0.5 rounded-full bg-skylla-400" aria-hidden />
        {ctx}
      </figcaption>
    </figure>
  )
}

export function Testimonials() {
  return (
    <section className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Voice of the merchant"
          title="The words come before the pitch."
          sub="Verbatim from prospect and customer conversations. Nobody goes looking for payment optimization while they believe their numbers are fine — the job is showing them the gap."
        />
      </div>

      <div className="mt-14 flex flex-col gap-5">
        <Marquee>
          {voc.slice(0, 4).map((v) => (
            <QuoteCard key={v.quote} {...v} />
          ))}
        </Marquee>
        <Marquee speed="slow">
          {voc.slice(3).map((v) => (
            <QuoteCard key={v.quote} {...v} />
          ))}
        </Marquee>
      </div>
    </section>
  )
}
