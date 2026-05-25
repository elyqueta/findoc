import HeroSection from '../components/sections/HeroSection'
import StatsSection from '../components/sections/StatsSection'
import HowItWorksSection from '../components/sections/HowItWorksSection'
import BenefitsSection from '../components/sections/BenefitsSection'
import EsquadrasSection from '../components/sections/EsquadrasSection'
import SecuritySection from '../components/sections/SecuritySection'
import FAQSection from '../components/sections/FAQSection'
import CTASection from '../components/sections/CTASection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <BenefitsSection />
      <EsquadrasSection />
      <SecuritySection />
      <FAQSection />
      <CTASection />
    </>
  )
}
