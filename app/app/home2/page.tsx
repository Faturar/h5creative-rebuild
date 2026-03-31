import Image, { type StaticImageData } from "next/image"
import Link from "next/link"

import Navbar from "@/app/components/Navbar"
import FAQ from "@/app/components/home/FAQ"
import Footer from "@/app/components/home/Footer"

import logo from "@/public/assets/images/logos/logo.svg"
import ellipse from "@/public/assets/images/Ellipse.svg"
import heroImage from "@/public/assets/images/hero-image.png"
import services1 from "@/public/assets/images/services1.png"
import services2 from "@/public/assets/images/services2.png"
import services3 from "@/public/assets/images/services3.png"
import logo1 from "@/public/assets/images/logos/logoipsum1.png"
import logo2 from "@/public/assets/images/logos/logoipsum2.png"
import logo3 from "@/public/assets/images/logos/logoipsum3.png"
import logo4 from "@/public/assets/images/logos/logoipsum4.png"
import crownBlackIcon from "@/public/assets/images/icons/crown-black.svg"
import codeBlackIcon from "@/public/assets/images/icons/code-black.svg"
import chartBlackIcon from "@/public/assets/images/icons/chart-2-black.svg"
import reactLogo from "@/public/assets/images/logos/react.svg"
import blenderLogo from "@/public/assets/images/logos/blender.svg"
import figmaLogo from "@/public/assets/images/logos/figma.svg"
import thumbnail1 from "@/public/assets/images/thumbnails/thumbnail1.png"
import thumbnail2 from "@/public/assets/images/thumbnails/thumbnail2.png"
import thumbnail3 from "@/public/assets/images/thumbnails/thumbnail3.png"
import eyeIcon from "@/public/assets/images/icons/eye.svg"
import personPhoto from "@/public/assets/images/photo/photo5.png"
import quoteIcon from "@/public/assets/images/icons/quote.svg"
import logoTesti5 from "@/public/assets/images/logos/logo-testi5.svg"
import starIcon from "@/public/assets/images/icons/Star.svg"
import callIcon from "@/public/assets/images/icons/call.svg"
import dribbbleIcon from "@/public/assets/images/icons/dribbble.svg"
import smsIcon from "@/public/assets/images/icons/sms.svg"

function FeatureTag({ icon, label }: { icon: StaticImageData; label: string }) {
  return (
    <div className="flex items-center gap-1 bg-[#F4F5F8] p-[8px_10px] rounded-[12px]">
      <div className="w-5 h-5 flex shrink-0">
        <Image src={icon} alt="icon" />
      </div>
      <p className="font-semibold">{label}</p>
    </div>
  )
}

function ToolCard({
  logo,
  title,
  subtitle,
}: {
  logo: StaticImageData
  title: string
  subtitle: string
}) {
  return (
    <div className="w-full flex items-center bg-[#F4F5F8] rounded-2xl p-5 gap-4 transition-all duration-300 hover:ring-2 hover:ring-portto-purple">
      <div className="w-[70px] h-[70px] bg-white rounded-full flex shrink-0 items-center justify-center">
        <Image src={logo} alt="tool" />
      </div>
      <div className="flex flex-col gap-[2px]">
        <p className="font-bold text-xl leading-[30px]">{title}</p>
        <p className="text-lg text-[#878C9C]">{subtitle}</p>
      </div>
    </div>
  )
}

export default function Home2Page() {
  return (
    <>
      {/* HEADER SECTION */}
      <section
        id="Header"
        className="flex flex-col gap-[100px] bg-[#0B0B1B] relative min-h-screen pb-16"
      >
        <Navbar logo={logo} logoAlt="Logo" ctaLabel="Hire Me" ctaHref="/book" />

        <div className="hero container max-w-[1130px] mx-auto flex flex-col justify-center items-center relative">
          <h1 className="font-extrabold text-[50px] leading-[70px] text-white text-center z-10">
            AGENCY KREATIF END-TO-END <br />
            UNTUK BRAND{" "}
            <span className="text-portto-light-gold">BERKEMBANG</span>
          </h1>
          <p className="text-xl leading-[30px] text-white/80 z-10 mt-4 max-w-[800px] text-center">
            Kami membantu brand Anda tampil lebih kuat, konsisten, dan berkesan
            melalui strategi kreatif, desain, dan eksekusi yang berdampak.
          </p>
          <Link
            href="/book"
            className="bg-portto-light-gold font-bold text-lg p-[14px_30px] rounded-full transition-all duration-300 hover:shadow-[0_10px_20px_0_#FFE7C280] mt-8"
          >
            Konsultasi Gratis Sekarang
          </Link>
          <div className="flex shrink-0 w-full max-w-[900px] h-[600px] rounded-[50px] overflow-hidden bg-white mt-[70px] z-10">
            <Image
              src={heroImage}
              className="w-full h-full object-cover"
              alt="hero"
            />
          </div>
          <Image
            src={ellipse}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-[135px] w-[35%]"
            alt="background icon"
          />
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section
        id="Services"
        className="container max-w-[1130px] mx-auto pt-[80px] pb-[80px]"
      >
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center mb-[50px]">
            <h2 className="font-extrabold text-3xl text-gray-900">
              What We Can Do <br />
              for Your Brand
            </h2>
            <Link
              href="#"
              className="bg-portto-light-gold font-bold text-lg p-[14px_30px] rounded-full transition-all duration-300 hover:shadow-[0_10px_20px_0_#FFE7C280]"
            >
              All Services
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white border border-gray-200 rounded-[30px] p-[30px] flex flex-col gap-5 transition-all duration-300 hover:shadow-lg">
              <h3 className="font-bold text-xl">
                Brand Identity & Visual Design
              </h3>
              <p className="text-gray-500 text-base">
                Membangun identitas visual yang kuat, konsisten, dan mudah
                diingat untuk memperkuat positioning brand Anda.
              </p>
              <div className="w-full h-[200px]">
                <Image
                  src={services1}
                  className="w-full object-contain"
                  alt="Brand Identity Design"
                />
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-[30px] p-[30px] flex flex-col gap-5 transition-all duration-300 hover:shadow-lg">
              <h3 className="font-bold text-xl">Creative Content & Campaign</h3>
              <p className="text-gray-500 text-base">
                Menciptakan konten dan campaign kreatif yang menarik perhatian
                dan meningkatkan engagement.
              </p>
              <div className="w-full h-[200px]">
                <Image
                  src={services2}
                  className="w-full object-contain"
                  alt="Creative Content & Campaign"
                />
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-[30px] p-[30px] flex flex-col gap-5 transition-all duration-300 hover:shadow-lg">
              <h3 className="font-bold text-xl">
                Website & Digital Experience
              </h3>
              <p className="text-gray-500 text-base">
                Menghadirkan pengalaman digital yang modern, cepat, dan
                berorientasi pada konversi.
              </p>
              <div className="w-full h-[200px]">
                <Image
                  src={services2}
                  className="w-full object-contain"
                  alt="Website & Digital Experience"
                />
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-[30px] p-[30px] flex flex-col gap-5 transition-all duration-300 hover:shadow-lg lg:col-span-1">
              <h3 className="font-bold text-xl">
                Strategi & Eksekusi Kreatif yang Terintegrasi
              </h3>
              <p className="text-gray-500 text-base">
                Dari ide hingga implementasi, kami membantu brand Anda
                berkembang dengan pendekatan kreatif yang terarah dan terukur.
              </p>
              <div className="w-full h-[200px]">
                <Image
                  src={services3}
                  className="w-full object-contain"
                  alt="Strategi & Eksekusi Kreatif"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOGO SECTION */}
      <section className="w-full bg-[#0B0B0D] py-16 overflow-hidden">
        <div className="container max-w-[1130px] mx-auto">
          <div className="relative group/slider">
            <div className="flex w-max items-center">
              <div className="flex animate-[slide_25s_linear_infinite] group-hover/slider:[animation-play-state:paused] gap-12 md:gap-20 items-center">
                {[logo1, logo2, logo3, logo4, logo1, logo2, logo3, logo4].map(
                  (logoItem, index) => (
                    <div
                      key={index}
                      className="flex h-12 shrink-0 items-center justify-center opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                    >
                      <Image
                        src={logoItem}
                        alt="client logo"
                        className="h-full w-auto object-contain"
                      />
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RECENT WORK SECTION */}
      <section
        id="RecentWork"
        className="container max-w-[1130px] mx-auto pt-[80px] pb-[80px]"
      >
        <div className="flex flex-col gap-6">
          <h2 className="font-extrabold text-3xl text-gray-900">
            TAKE A LOOK AT <br />
            OUR RECENT WORK
          </h2>
          <p className="text-gray-500 text-base max-w-md">
            Beberapa project yang kami kerjakan untuk membantu brand berkembang.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
            {[thumbnail1, thumbnail2, thumbnail3, thumbnail1].map(
              (thumbnail, index) => (
                <a
                  key={index}
                  href="#"
                  className="group w-full h-[300px] flex overflow-hidden rounded-[30px] border border-gray-200 transition-all duration-300 hover:shadow-lg relative"
                >
                  <Image
                    src={thumbnail}
                    className="w-full h-full object-cover"
                    alt="project"
                  />
                  <Image
                    src={eyeIcon}
                    className="absolute transition-all duration-300 opacity-0 group-hover:opacity-100 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 z-10"
                    alt="icon eye"
                  />
                </a>
              ),
            )}
          </div>

          <Link
            href="#"
            className="bg-portto-light-gold font-bold text-lg p-[14px_30px] rounded-full transition-all duration-300 hover:shadow-[0_10px_20px_0_#FFE7C280] w-fit mt-8"
          >
            More Projects
          </Link>
        </div>
      </section>

      {/* BUSINESS SECTION */}
      <section
        id="Business"
        className="container max-w-[1130px] mx-auto pt-[80px] pb-[80px]"
      >
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex flex-col gap-6 lg:w-1/2">
            <h2 className="font-extrabold text-3xl text-gray-900">
              Bagaimana Kami Membantu Brand Anda Bertumbuh
            </h2>
            <p className="text-gray-500 text-lg">
              Kami menggabungkan strategi, kreativitas, dan eksekusi untuk
              membangun brand yang kuat, relevan, dan mampu memberikan dampak
              nyata bagi bisnis Anda.
            </p>
            <Link
              href="#"
              className="bg-portto-light-gold font-bold text-lg p-[14px_30px] rounded-full transition-all duration-300 hover:shadow-[0_10px_20px_0_#FFE7C280] w-fit"
            >
              Lihat Semua Layanan
            </Link>
          </div>

          <div className="flex flex-col gap-6 lg:w-1/2">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="font-bold text-2xl text-gray-900 mb-3">
                Brand Identity
              </h3>
              <p className="text-gray-500 text-base">
                Kami membangun identitas brand yang kuat, konsisten, dan mudah
                diingat untuk memperkuat positioning bisnis Anda.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="font-bold text-2xl text-gray-900 mb-3">
                Konten Kreatif
              </h3>
              <p className="text-gray-500 text-base">
                Kami menciptakan konten yang menarik, relevan, dan mampu
                meningkatkan engagement serta kepercayaan terhadap brand Anda.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="font-bold text-2xl text-gray-900 mb-3">
                Website & Digital Experience
              </h3>
              <p className="text-gray-500 text-base">
                Kami menghadirkan pengalaman digital yang modern, cepat, dan
                dirancang untuk meningkatkan konversi bisnis Anda.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="font-bold text-2xl text-gray-900 mb-3">
                Campaign Kreatif
              </h3>
              <p className="text-gray-500 text-base">
                Kami merancang dan mengeksekusi campaign kreatif untuk
                meningkatkan awareness, engagement, dan pertumbuhan brand Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section
        id="CTA"
        className="container max-w-[1130px] mx-auto pt-[80px] pb-[80px]"
      >
        <div className="bg-[#0B0B1B] rounded-[50px] p-[80px_50px] text-center">
          <h2 className="font-extrabold text-[40px] leading-[60px] text-white mb-6">
            Siap Membawa Brand Anda ke Level Berikutnya?
          </h2>
          <p className="font-semibold text-lg leading-[32px] text-white/80 mb-12 max-w-2xl mx-auto">
            Dengan pendekatan kreatif dan strategis, kami siap membantu brand
            Anda mencapai potensi maksimal dan bersaing di pasar yang dinamis.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-4xl lg:text-6xl font-bold mb-3 text-white">
                100+
              </div>
              <div className="text-white/90 font-medium">Project Selesai</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-4xl lg:text-6xl font-bold mb-3 text-white">
                50+
              </div>
              <div className="text-white/90 font-medium">Client Puas</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-4xl lg:text-6xl font-bold mb-3 text-white">
                15+
              </div>
              <div className="text-white/90 font-medium">Penghargaan</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link
              href="/book"
              className="bg-portto-light-gold font-bold text-lg p-[14px_30px] rounded-full transition-all duration-300 hover:shadow-[0_10px_20px_0_#FFE7C280]"
            >
              Mulai Projek Sekarang
            </Link>
            <Link
              href="/portfolio"
              className="bg-transparent border-2 border-white text-white font-bold text-lg p-[14px_30px] rounded-full transition-all duration-300 hover:bg-white/10"
            >
              Lihat Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL SECTION */}
      <section
        id="Featured-testimonial"
        className="container max-w-[1130px] mx-auto"
      >
        <div className="flex gap-[100px] items-center px-[65px] pt-[100px] flex-col lg:flex-row">
          <div className="flex flex-col gap-5 relative">
            <div className="flex w-[200px] h-[250px] rounded-[30px] shrink-0 overflow-hidden z-10">
              <Image src={personPhoto} alt="photo" />
            </div>
            <div className="flex flex-col gap-[6px] text-center">
              <p className="font-bold text-2xl">Shirley Pop</p>
              <p className="text-xl text-[#878C9C]">Founder Bwalajar</p>
            </div>
            <Image
              src={quoteIcon}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 left-[21px] top-[14px]"
              alt="icon"
            />
          </div>
          <div className="flex flex-col gap-[50px]">
            <div className="flex shrink-0">
              <Image src={logoTesti5} alt="logo" />
            </div>
            <p className="font-semibold text-[32px] leading-[60px]">
              She helped us to build our first prototype to win our investor and
              early users heart that generate huge attraction. Will hire her
              back again anytime soon.
            </p>
            <div className="flex h-8 w-fit shrink-0">
              {Array.from({ length: 5 }).map((_, index) => (
                <Image
                  key={index}
                  src={starIcon}
                  className="w-full h-full"
                  alt="star"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section
        id="Contact"
        className="container max-w-[1130px] mx-auto pt-[80px] pb-[80px]"
      >
        <div className="text-center mb-16">
          <h2 className="font-extrabold text-3xl text-gray-900 mb-6">
            Hubungi Kami
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Mari Ciptakan Sesuatu yang Luar Biasa Bersama
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-12">
            <p className="text-lg text-gray-600">
              Punya project yang ingin dikembangkan? Kami siap membantu
              mewujudkan ide Anda menjadi karya yang berdampak.
            </p>

            <div className="space-y-6">
              <a
                href="tel:+6281234567890"
                className="flex items-center gap-4 text-gray-900 group"
              >
                <div className="w-14 h-14 rounded-full bg-[#F4F5F8] flex items-center justify-center transition-all duration-300 group-hover:bg-portto-light-gold">
                  <Image src={callIcon} alt="icon" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Telepon</p>
                  <p className="font-medium">+62 812-3456-7890</p>
                </div>
              </a>

              <a
                href="mailto:hello@yourbrand.com"
                className="flex items-center gap-4 text-gray-900 group"
              >
                <div className="w-14 h-14 rounded-full bg-[#F4F5F8] flex items-center justify-center transition-all duration-300 group-hover:bg-portto-light-gold">
                  <Image src={smsIcon} alt="icon" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">hello@yourbrand.com</p>
                </div>
              </a>
            </div>
          </div>

          <div className="bg-[#0B0B1B] rounded-[30px] p-10">
            <form className="space-y-6">
              <input
                type="text"
                placeholder="Nama Anda"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-portto-light-gold"
              />
              <input
                type="email"
                placeholder="Email Anda"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-portto-light-gold"
              />
              <input
                type="text"
                placeholder="Subjek"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-portto-light-gold"
              />
              <textarea
                placeholder="Pesan Anda"
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-portto-light-gold"
              />
              <button
                type="submit"
                className="w-full bg-portto-light-gold font-bold text-lg p-[14px_30px] rounded-full transition-all duration-300 hover:shadow-[0_10px_20px_0_#FFE7C280]"
              >
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </section>

      <FAQ />
      <Footer />
    </>
  )
}
