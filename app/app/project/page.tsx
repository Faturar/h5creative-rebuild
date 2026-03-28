import Image, { type StaticImageData } from "next/image"
import Link from "next/link"

import Navbar from "@/app/components/Navbar"
import FAQ from "@/app/components/home/FAQ"
import FooterFix from "@/app/components/home/FooterFix"

import logo from "@/public/assets/images/logos/logo.svg"
import ellipse from "@/public/assets/images/Ellipse.svg"
import detailsThumbnail from "@/public/assets/images/thumbnails/details-thumbnail.png"
import crownBlackIcon from "@/public/assets/images/icons/crown-black.svg"
import codeBlackIcon from "@/public/assets/images/icons/code-black.svg"
import chartBlackIcon from "@/public/assets/images/icons/chart-2-black.svg"
import thumbnail1 from "@/public/assets/images/thumbnails/thumbnail1.png"
import thumbnail2 from "@/public/assets/images/thumbnails/thumbnail2.png"
import thumbnail3 from "@/public/assets/images/thumbnails/thumbnail3.png"
import eyeIcon from "@/public/assets/images/icons/eye.svg"

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
      {/* HEADER */}
      <section
        id="Header"
        className="flex flex-col gap-[100px] bg-[#0B0B1B] relative max-h-[665px] mb-[493px]"
      >
        <Navbar
          logo={logo}
          logoClassName=""
          ctaLabel="Hire Us"
          ctaHref="/book"
          rightSectionClassName="hidden lg:flex gap-[50px] items-center"
          hoverColorClassName="hover:text-portto-light-gold"
          ctaClassName="bg-portto-light-gold font-bold text-lg p-[14px_30px] rounded-full transition-all duration-300 hover:shadow-[0_10px_20px_0_#FFE7C280]"
        />

        <div className="hero container max-w-[1130px] mx-auto flex flex-col justify-center items-center relative">
          <h1 className="font-extrabold text-[50px] leading-[70px] text-white text-center z-10">
            Social Media Growth Campaign
          </h1>
          <p className="text-xl leading-[30px] text-white z-10">
            Social Media Management & Digital Marketing
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

      {/* DETAILS */}
      <section id="Details" className="container max-w-[1130px] mx-auto pt-24">
        <div className="flex gap-20 justify-between flex-col lg:flex-row">
          <div className="flex gap-24">
            <div className="flex-1">
              <h2 className="font-light text-5xl">The Challenge</h2>
            </div>
            <div className="description flex-2 flex flex-col gap-4 font-medium text-lg leading-[38px]">
              <p>
                Klien kami menghadapi stagnasi pertumbuhan di social media,
                dengan engagement yang rendah dan konten yang belum memiliki
                arah strategi yang jelas. Tujuan utama campaign ini adalah
                membangun brand presence yang kuat, meningkatkan interaksi
                audience, serta mengkonversi traffic menjadi leads melalui
                pendekatan digital marketing yang terstruktur.
              </p>

              <div className="flex gap-4 flex-wrap">
                <FeatureTag icon={crownBlackIcon} label="Brand Growth" />
                <FeatureTag icon={codeBlackIcon} label="Content Strategy" />
                <FeatureTag
                  icon={chartBlackIcon}
                  label="Performance Marketing"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCREENSHOTS */}
      <section
        id="Screenshots"
        className="container max-w-[1130px] mx-auto pt-[50px]"
      >
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
            {[thumbnail1, thumbnail2, thumbnail3, thumbnail1].map(
              (thumbnail, index) => (
                <a
                  key={index}
                  href={thumbnail.src}
                  target="_blank"
                  rel="noreferrer"
                  className="group w-full max-h-92 flex overflow-hidden rounded-[30px] ring-1 ring-[#E4E5E8] transition-all duration-300 hover:ring-[3px] hover:ring-portto-purple relative"
                >
                  <Image
                    src={thumbnail}
                    className="w-full h-full object-cover"
                    alt="thumbnail"
                  />
                  <Image
                    src={eyeIcon}
                    className="absolute opacity-0 group-hover:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    alt="icon eye"
                  />
                </a>
              ),
            )}
          </div>
          <div className="grid grid-cols-1 gap-5">
            {[thumbnail1, thumbnail2, thumbnail3, thumbnail1].map(
              (thumbnail, index) => (
                <a
                  key={index}
                  href={thumbnail.src}
                  target="_blank"
                  rel="noreferrer"
                  className="group w-full h-full flex overflow-hidden rounded-[30px] ring-1 ring-[#E4E5E8] transition-all duration-300 hover:ring-[3px] hover:ring-portto-purple relative"
                >
                  <Image
                    src={thumbnail}
                    className="w-full h-full object-cover"
                    alt="thumbnail"
                  />
                  <Image
                    src={eyeIcon}
                    className="absolute opacity-0 group-hover:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    alt="icon eye"
                  />
                </a>
              ),
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="Book" className="container max-w-[1130px] mx-auto">
        <div className="bg-[#0B0B1B] justify-between px-[50px] rounded-[50px] h-[476px] mt-[100px] bg-[url('/assets/images/Ellipse.svg')] bg-center bg-no-repeat bg-contain bg-[length:400px_400px] relative hidden lg:flex">
          <div className="group/projects w-[220px] overflow-hidden">
            <ProjectStrip animationClass="animate-[slideToT_30s_linear_infinite]" />
            <ProjectStrip animationClass="animate-[slideToT_30s_linear_infinite]" />
          </div>

          <div className="flex flex-col gap-5 items-center justify-center text-center w-fit">
            <h2 className="font-extrabold text-[40px] leading-[60px] text-white">
              Let’s Grow Your Brand <br />
              Through Digital Campaign
            </h2>

            <p className="font-semibold text-lg leading-[32px] text-white">
              We help you scale with strategic content <br />
              and performance-driven marketing
            </p>

            <Link
              href="/book"
              className="bg-portto-light-gold font-bold text-lg p-[14px_30px] rounded-full transition-all duration-300 hover:shadow-[0_10px_20px_0_#FFE7C280]"
            >
              Consultaion
            </Link>
          </div>

          <div className="group/projects w-[220px] overflow-hidden">
            <ProjectStrip animationClass="animate-[slideToB_30s_linear_infinite]" />
            <ProjectStrip animationClass="animate-[slideToB_30s_linear_infinite]" />
          </div>
        </div>
      </section>

      <FAQ />
      <FooterFix />
    </>
  )
}
