import Header from "./components/home/Header"
import FAQ from "./components/home/FAQ"
import BusinessSection from "./components/home/BusinessSection"
import HeroSection from "./components/home/HeroSection"
import RecentWorkSection from "./components/home/RecentWorkSection"
import FooterFix from "./components/home/FooterFix"
import AboutSection from "./components/home/AboutSection"
import Navbar from "./components/home/Navbar"
import ClientsSection from "./components/home/ClientSection"
import LogoSection from "./components/home/LogoSection"
import Services2 from "./components/home/Services2"

export default function Home() {
  return (
    <>
      <Header />
      {/*<HeroSection />
      <AboutSection /> */}
      <Services2 />

      <LogoSection />
      <RecentWorkSection />
      <BusinessSection />
      <FAQ />
      <FooterFix />
    </>
  )
}
