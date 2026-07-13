import { Hero } from '../components/sections/Hero'
import { LogoCloud } from '../components/sections/LogoCloud'
import { Problem } from '../components/sections/Problem'
import { Pillars } from '../components/sections/Pillars'
import { HowItWorks } from '../components/sections/HowItWorks'
import { Impact } from '../components/sections/Impact'
import { Difference } from '../components/sections/Difference'
import { Story } from '../components/sections/Story'
import { Testimonials } from '../components/sections/Testimonials'
import { Contact } from '../components/sections/Contact'

export function Home() {
  return (
    <>
      <Hero />
      <LogoCloud />
      <Problem />
      <Pillars />
      <HowItWorks />
      <Impact />
      <Difference />
      <Story />
      <Testimonials />
      <Contact />
    </>
  )
}
