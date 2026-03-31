import Image, { type StaticImageData } from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import FAQ from "@/app/components/home/FAQ"
import FooterFix from "@/app/components/home/FooterFix"

import ellipse from "@/public/assets/images/Ellipse.svg"
import porto1 from "@/public/assets/images/portofolio/porto-1.png"
import porto2 from "@/public/assets/images/portofolio/porto-2.png"
import porto3 from "@/public/assets/images/portofolio/porto-3.png"
import eyeIcon from "@/public/assets/images/icons/eye.svg"

import { getProjectBySlug } from "@/app/constants/projects"
import Navbar from "@/app/components/home/Navbar"

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
        {[porto1, porto2, porto3].map((thumbnail, index) => (
          <div
            key={index}
            className="w-full max-h-40 flex shrink-0 rounded-[30px] border border-white p-2.5 bg-[#FFFFFF33] backdrop-blur"
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

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <>
      {/* HEADER */}
      <section
        id="Header"
        className="flex flex-col gap-[100px] bg-[#0B0B1B] relative max-h-[665px] mb-[493px]"
      >
        <Navbar />
        <div className="hero container max-w-[1130px] mx-auto flex flex-col justify-center items-center relative">
          <h1 className="font-extrabold text-[50px] leading-[70px] text-white text-center z-10">
            {project.title}
          </h1>
          <p className="text-xl leading-[30px] text-white z-10">
            {project.subtitle}
          </p>

          <div className="flex shrink-0 w-full max-h-[800px] rounded-[50px] overflow-hidden bg-white mt-[70px] z-10">
            <Image
              src={project.heroImage}
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
      <section
        id="Details"
        className="container max-w-[1130px] mx-auto pt-32 pb-12"
      >
        <div className="flex gap-20 justify-between flex-col lg:flex-row">
          <div className="flex gap-24">
            <div className="flex-1">
              <h2 className="font-light text-5xl">The Challenge</h2>
            </div>
            <div className="description flex-2 flex flex-col gap-4 font-medium text-lg leading-[38px]">
              <p>{project.challenge}</p>

              <div className="flex gap-4 flex-wrap">
                {project.featureTags.map((tag, index) => (
                  <FeatureTag key={index} icon={tag.icon} label={tag.label} />
                ))}
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
            {project.screenshots.slice(0, 4).map((screenshot, index) => (
              <a
                key={index}
                href={screenshot.image.src}
                target="_blank"
                rel="noreferrer"
                className="group w-full max-h-92 flex overflow-hidden rounded-[30px] ring-1 ring-[#E4E5E8] transition-all duration-300 hover:ring-[3px] hover:ring-portto-purple relative"
              >
                <Image
                  src={screenshot.image}
                  className="w-full h-full object-cover"
                  alt={screenshot.title}
                />
                <Image
                  src={eyeIcon}
                  className="absolute w-12 h-12 opacity-0 group-hover:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  alt="icon eye"
                />
              </a>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-5">
            {project.screenshots.slice(4).map((screenshot, index) => (
              <a
                key={index + 4}
                href={screenshot.image.src}
                target="_blank"
                rel="noreferrer"
                className="group w-full h-full flex overflow-hidden rounded-[30px] ring-1 ring-[#E4E5E8] transition-all duration-300 hover:ring-[3px] hover:ring-portto-purple relative"
              >
                <Image
                  src={screenshot.image}
                  className="w-full h-full object-cover"
                  alt={screenshot.title}
                />
                <Image
                  src={eyeIcon}
                  className="absolute w-12 h-12 opacity-0 group-hover:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  alt="icon eye"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="Book" className="container max-w-[1130px] mx-auto pb-20">
        <div className="bg-[#0B0B1B] justify-between px-[50px] rounded-[50px] h-[476px] mt-[100px] bg-[url('/assets/images/Ellipse.svg')] bg-center bg-no-repeat bg-contain bg-[length:400px_400px] relative hidden lg:flex">
          <div className="group/projects w-[220px] overflow-hidden">
            <ProjectStrip animationClass="animate-[slideToT_30s_linear_infinite]" />
            <ProjectStrip animationClass="animate-[slideToT_30s_linear_infinite]" />
          </div>

          <div className="flex flex-col gap-5 items-center justify-center text-center w-fit">
            <h2 className="font-extrabold text-[40px] leading-[60px] text-white">
              {project.ctaTitle}
            </h2>

            <p className="font-semibold text-lg leading-[32px] text-white">
              {project.ctaSubtitle}
            </p>

            <Link
              href="/book"
              className="bg-[#2E2BFF] text-white font-bold text-lg p-[14px_30px] rounded-full transition-all duration-300 hover:shadow-[0_10px_20px_0_#FFE7C280]"
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
      <FooterFix />
    </>
  )
}
