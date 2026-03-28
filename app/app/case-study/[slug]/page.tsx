import Image, { type StaticImageData } from "next/image"
import { notFound } from "next/navigation"
import { TrendingUp, TrendingDown, Users, Clock, Star } from "lucide-react"

import Navbar from "@/app/components/Navbar"
import FAQ from "@/app/components/home/FAQ"
import Footer from "@/app/components/home/Footer"

import HeroSection from "@/app/components/case-study/HeroSection"
import ProjectOverview from "@/app/components/case-study/ProjectOverview"
import ChallengeSection from "@/app/components/case-study/ChallengeSection"
import SolutionSection from "@/app/components/case-study/SolutionSection"
import DesignProcess from "@/app/components/case-study/DesignProcess"
import VisualShowcase from "@/app/components/case-study/VisualShowcase"
import ResultsSection from "@/app/components/case-study/ResultsSection"
import TestimonialSection from "@/app/components/case-study/TestimonialSection"
import ServicesSection from "@/app/components/case-study/ServicesSection"
import CTASection from "@/app/components/case-study/CTASection"

import logo from "@/public/assets/images/logos/logo.svg"

import {
  getCaseStudyBySlug,
  type CaseStudy,
  type StatItem,
} from "@/app/constants/caseStudies"

// Helper function to get icon component by name
function getIconComponent(iconName: StatItem["iconName"]) {
  const icons = {
    TrendingUp: <TrendingUp className="w-6 h-6" />,
    TrendingDown: <TrendingDown className="w-6 h-6" />,
    Users: <Users className="w-6 h-6" />,
    Clock: <Clock className="w-6 h-6" />,
    Star: <Star className="w-6 h-6" />,
  }
  return icons[iconName] || null
}

// Helper to convert StatItem with iconName to StatItem with icon
function convertStatItems(statItems: StatItem[]) {
  return statItems.map((item) => ({
    ...item,
    icon: getIconComponent(item.iconName),
  }))
}

export default function CaseStudyPage({
  params,
}: {
  params: { slug: string }
}) {
  const caseStudy = getCaseStudyBySlug(params.slug)

  if (!caseStudy) {
    notFound()
  }

  const convertedStatItems = convertStatItems(caseStudy.statItems)

  return (
    <>
      <Navbar logo={logo} logoAlt="Logo" ctaLabel="Hire Me" ctaHref="/book" />

      <HeroSection
        heroImage={caseStudy.heroImage}
        logo={caseStudy.logo}
        title={caseStudy.title}
        subtitle={caseStudy.subtitle}
        metadata={caseStudy.metadata}
      />

      <ProjectOverview overview={caseStudy.overview} />

      <ChallengeSection challenges={caseStudy.challenges} />

      <SolutionSection solutions={caseStudy.solutions} />

      <DesignProcess processItems={caseStudy.processItems} />

      <VisualShowcase showcaseItems={caseStudy.showcaseItems} />

      <ResultsSection
        statItems={convertedStatItems}
        achievements={caseStudy.achievements}
      />

      <TestimonialSection
        avatar={caseStudy.testimonial.avatar}
        companyLogo={caseStudy.testimonial.companyLogo}
        quote={caseStudy.testimonial.quote}
        author={caseStudy.testimonial.author}
        role={caseStudy.testimonial.role}
      />

      <ServicesSection services={caseStudy.services} />

      <CTASection
        ctaTitle={caseStudy.ctaTitle}
        ctaSubtitle={caseStudy.ctaSubtitle}
      />

      <FAQ />

      <Footer />
    </>
  )
}
