import HeroSection from '@/components/home/HeroSection'
import ServicesSection from '@/components/home/ServicesSection'
import AboutSection from '@/components/home/AboutSection'
import CasesWall from '@/components/home/CasesWall'
import ProductsSlider from '@/components/home/ProductsSlider'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <CasesWall />
      <ProductsSlider />
    </>
  )
}
