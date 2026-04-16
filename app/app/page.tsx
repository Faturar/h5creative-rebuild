import Header from "./components/home/Header"
import FAQ from "./components/home/FAQ"
import BusinessSection from "./components/home/BusinessSection"
import RecentWorkSection from "./components/home/RecentWorkSection"
import FooterFix from "./components/home/FooterFix"
import LogoSection from "./components/home/LogoSection"
import Services2 from "./components/home/Services2"
import ContactSection from "./components/home/ContactSection"
import CTASection from "./components/home/CTASection"

export default function Home() {
  return (
    <>
      <Header />
      {/* <HeroSection />
      <AboutSection />  */}
      <Services2 />
      <LogoSection />
      <RecentWorkSection />
      <BusinessSection />
      <CTASection />
      <FAQ />
      <ContactSection />
      <FooterFix />
    </>
  )
}
