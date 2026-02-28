import Image, { type StaticImageData } from "next/image"
import Link from "next/link"

import FAQ from "@/app/home/FAQ"
import Footer from "@/app/home/Footer"

import logo from "@/public/assets/images/logos/logo.svg"
import ellipse from "@/public/assets/images/Ellipse.svg"
import detailsThumbnail from "@/public/assets/images/thumbnails/details-thumbnail.png"
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

function ProjectStrip({
  animationClass,
}: {
  animationClass:
    | "animate-[slideToT_30s_linear_infinite]"
    | "animate-[slideToB_30s_linear_infinite]"
}) {
  return (
    <div className="slider flex flex-col h-max justify-center">
      <div
        className={`project-container ${animationClass} group-hover/projects:pause-animate flex flex-col gap-[30px] pt-[30px] justify-center`}
      >
        {[thumbnail1, thumbnail2, thumbnail3].map((thumbnail, index) => (
          <div
            key={index}
            className="w-full h-[160px] flex shrink-0 rounded-[30px] border border-white p-[10px] bg-[#FFFFFF33] backdrop-blur"
          >
            <div className="w-full h-full rounded-[20px] overflow-hidden">
              <Image
                src={thumbnail}
                className="w-full h-full object-cover"
                alt="thumbnail"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

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

export default function DetailPage() {
  return (
    <>
      <section
        id="Header"
        className="flex flex-col gap-[100px] bg-[#0B0B1B] relative max-h-[665px] mb-[493px]"
      >
        <nav className="container max-w-[1130px] mx-auto flex justify-between items-center pt-[30px] z-10">
          <Link href="/" className="flex shrink-0 h-fit w-fit">
            <Image src={logo} alt="logo" />
          </Link>
          <div className="hidden lg:flex gap-[50px] items-center">
            <ul className="flex gap-[50px] items-center text-white">
              <li>
                <Link
                  href="/"
                  className="font-medium text-lg hover:text-portto-light-gold transition-all duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="font-medium text-lg hover:text-portto-light-gold transition-all duration-300"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-medium text-lg hover:text-portto-light-gold transition-all duration-300"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-medium text-lg hover:text-portto-light-gold transition-all duration-300"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-medium text-lg hover:text-portto-light-gold transition-all duration-300"
                >
                  About
                </a>
              </li>
            </ul>
            <Link
              href="/book"
              className="bg-portto-light-gold font-bold text-lg p-[14px_30px] rounded-full transition-all duration-300 hover:shadow-[0_10px_20px_0_#FFE7C280]"
            >
              Hire Me
            </Link>
          </div>
        </nav>

        <div className="hero container max-w-[1130px] mx-auto flex flex-col justify-center items-center relative">
          <h1 className="font-extrabold text-[50px] leading-[70px] text-white text-center z-10">
            AI Finance Insurance
          </h1>
          <p className="text-xl leading-[30px] text-white z-10">
            Website Development
          </p>
          <div className="flex shrink-0 w-full h-[800px] rounded-[50px] overflow-hidden bg-white mt-[70px] z-10">
            <Image
              src={detailsThumbnail}
              className="w-full h-full object-cover"
              alt="thumbnail"
            />
          </div>
          <Image
            src={ellipse}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-[135px] w-[35%]"
            alt="background icon"
          />
        </div>
      </section>

      <section
        id="Details"
        className="container max-w-[1130px] mx-auto pt-[50px]"
      >
        <div className="flex gap-[50px] justify-between flex-col lg:flex-row">
          <div className="flex flex-col gap-5">
            <h2 className="font-extrabold text-2xl">The First Purpose</h2>
            <div className="description flex flex-col gap-4 font-medium text-lg leading-[38px]">
              <p>
                FinanceAI is a cutting-edge mobile application revolutionizing
                personal finance management through artificial intelligence.
                This intuitive app is engineered to empower users with real-time
                financial insights and personalized.
              </p>
              <p>
                At the heart of FinanceAI lies a sophisticated AI engine that
                analyzes spending patterns, investment choices, and saving
                habits to offer tailored recommendations. Whether it&apos;s
                optimizing budgets, identifying investment opportunities, or
                potential savings, FinanceAI ensures users are always a step
                ahead in their financial.
              </p>
            </div>
            <div className="flex gap-4 flex-wrap">
              <FeatureTag icon={crownBlackIcon} label="Startup" />
              <FeatureTag icon={codeBlackIcon} label="Future AI" />
              <FeatureTag icon={chartBlackIcon} label="Finance" />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="font-extrabold text-2xl">Software Used</h2>
            <div className="software-container flex flex-col shrink-0 gap-5 w-full lg:w-[325px]">
              <ToolCard
                logo={reactLogo}
                title="React JS"
                subtitle="Web Framework"
              />
              <ToolCard
                logo={blenderLogo}
                title="Blender 3D"
                subtitle="Product Modeling"
              />
              <ToolCard
                logo={figmaLogo}
                title="Figma"
                subtitle="UI/UX Design"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="Screenshots"
        className="container max-w-[1130px] mx-auto pt-[50px]"
      >
        <div className="flex flex-col gap-5">
          <h2 className="font-extrabold text-2xl">Screenshots</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[thumbnail1, thumbnail2, thumbnail3, thumbnail1].map(
              (thumbnail, index) => (
                <a
                  key={index}
                  href={thumbnail.src}
                  target="_blank"
                  rel="noreferrer"
                  className="group w-full h-[190px] flex overflow-hidden rounded-[30px] ring-1 ring-[#E4E5E8] transition-all duration-300 hover:ring-[3px] hover:ring-portto-purple relative"
                >
                  <Image
                    src={thumbnail}
                    className="w-full h-full object-cover"
                    alt="thumbnail"
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
        </div>
      </section>

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

      <section id="Book" className="container max-w-[1130px] mx-auto">
        <div className="bg-[#0B0B1B] justify-between px-[50px] rounded-[50px] h-[476px] mt-[100px] bg-[url('/assets/images/Ellipse.svg')] bg-center bg-no-repeat bg-contain bg-[length:400px_400px] relative hidden lg:flex">
          <div className="group/projects w-[220px] overflow-hidden">
            <ProjectStrip animationClass="animate-[slideToT_30s_linear_infinite]" />
            <ProjectStrip animationClass="animate-[slideToT_30s_linear_infinite]" />
          </div>
          <div className="flex flex-col gap-5 items-center justify-center text-center w-fit">
            <h2 className="font-extrabold text-[40px] leading-[60px] text-white">
              Let Me Help You <br />
              Grow Business Today
            </h2>
            <p className="font-semibold text-lg leading-[32px] text-white">
              I will dedicate my entire career to focus <br />
              on finishing your future dreams
            </p>
            <Link
              href="/book"
              className="bg-portto-light-gold font-bold text-lg p-[14px_30px] rounded-full transition-all duration-300 hover:shadow-[0_10px_20px_0_#FFE7C280]"
            >
              Book a Meeting
            </Link>
          </div>
          <div className="group/projects w-[220px] overflow-hidden">
            <ProjectStrip animationClass="animate-[slideToB_30s_linear_infinite]" />
            <ProjectStrip animationClass="animate-[slideToB_30s_linear_infinite]" />
          </div>
        </div>
      </section>

      <FAQ />
      <Footer />
    </>
  )
}
