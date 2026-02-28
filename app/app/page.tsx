import Header from "./home/Header"
import Services from "./home/Services"
import Projects from "./home/Projects"
import Workflow from "./home/Workflow"
import Testimonials from "./home/Testimonials"
import FAQ from "./home/FAQ"
import Footer from "./home/Footer"
import FeaturedProjects from "./home/FeaturedProjects"

export default function Home() {
  return (
    <>
      <Header />
      <FeaturedProjects />
      <Services />
      <Projects />
      <Workflow />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  )
}
