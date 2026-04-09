import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Target,
  Zap,
  DollarSign,
} from "lucide-react"

import { getServiceBySlug, getAllServiceSlugs } from "@/app/constants/services"
import { notFound } from "next/navigation"

// Generate static params for all service slugs
export async function generateStaticParams() {
  const slugs = getAllServiceSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug)

  if (!service) {
    notFound()
  }

  return (
    <main className="w-full bg-white min-h-screen">
      {/* HERO SECTION */}
      <section className="w-full py-20 md:py-32 lg:py-40 px-8 lg:px-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            <div className="w-full lg:w-1/2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                {service.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
                {service.detailedDescription || service.description}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#2E2BFF] to-[#1C1AFF] text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      {service.features && service.features.length > 0 && (
        <section className="w-full py-20 md:py-32 px-8 lg:px-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                What We Offer
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Comprehensive solutions tailored to your needs
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.features.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl border-2 border-gray-100 hover:border-[#2E2BFF] transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#2E2BFF]/10 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-[#2E2BFF]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {feature}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BENEFITS SECTION */}
      {service.benefits && service.benefits.length > 0 && (
        <section className="w-full py-20 md:py-32 px-8 lg:px-16 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Why Choose Us
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Benefits that drive real results for your business
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#12BB74]/10 flex items-center justify-center">
                    <Target className="w-6 h-6 text-[#12BB74]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {benefit}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROCESS SECTION */}
      {service.process && service.process.length > 0 && (
        <section className="w-full py-20 md:py-32 px-8 lg:px-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Our Process
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                A proven methodology for successful outcomes
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.process.map((step, index) => (
                <div
                  key={index}
                  className="relative p-8 rounded-xl border-2 border-gray-100 hover:border-[#2E2BFF] transition-all duration-300 hover:shadow-lg"
                >
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-[#2E2BFF] text-white flex items-center justify-center text-xl font-bold shadow-lg">
                    {index + 1}
                  </div>
                  <div className="pt-4">
                    <div className="flex items-center gap-3 mb-4">
                      <Clock className="w-6 h-6 text-[#2E2BFF]" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        Step {index + 1}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PRICING SECTION */}
      {service.pricing &&
        (service.pricing.packages || service.pricing.startingFrom) && (
          <section className="w-full py-20 md:py-32 px-8 lg:px-16 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  Pricing
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Transparent pricing for your budget
                </p>
              </div>
              {service.pricing.packages &&
              service.pricing.packages.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {service.pricing.packages.map((pkg, index) => (
                    <div
                      key={index}
                      className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-[#2E2BFF]"
                    >
                      <div className="mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {pkg.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-6 h-6 text-[#2E2BFF]" />
                          <span className="text-3xl font-bold text-[#2E2BFF]">
                            {pkg.price}
                          </span>
                        </div>
                      </div>
                      <ul className="space-y-3 mb-8">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#12BB74] flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href="/contact"
                        className="block w-full text-center bg-gradient-to-r from-[#2E2BFF] to-[#1C1AFF] text-white font-semibold px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                      >
                        Get Started
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                service.pricing.startingFrom && (
                  <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-100">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Starting From
                      </h3>
                      <div className="flex items-center justify-center gap-2">
                        <DollarSign className="w-8 h-8 text-[#2E2BFF]" />
                        <span className="text-4xl font-bold text-[#2E2BFF]">
                          {service.pricing.startingFrom}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-center mb-8">
                      Contact us for a custom quote based on your specific
                      requirements
                    </p>
                    <Link
                      href="/contact"
                      className="block w-full text-center bg-gradient-to-r from-[#2E2BFF] to-[#1C1AFF] text-white font-semibold px-6 py-4 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      Get a Quote
                    </Link>
                  </div>
                )
              )}
            </div>
          </section>
        )}

      {/* CTA SECTION */}
      <section className="w-full py-20 md:py-32 px-8 lg:px-16 bg-gradient-to-r from-[#2E2BFF] to-[#1C1AFF]">
        <div className="max-w-4xl mx-auto text-center">
          <Zap className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how we can help you achieve your goals with our{" "}
            {service.title}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-white text-[#2E2BFF] font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Contact Us
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-[#2E2BFF] transition-all duration-300"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
