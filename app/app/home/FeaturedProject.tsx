import Image, { type StaticImageData } from "next/image"

import eclipseImage from "@/public/assets/images/Ellipse.svg"

type FeaturedProjectProps = {
  thumbnail: StaticImageData
  title: string
  category: string
  href?: string
}

export default function FeaturedProject({
  thumbnail,
  title,
  category,
  href = "#",
}: FeaturedProjectProps) {
  return (
    <div className="group w-[650px] min-h-[560px] flex shrink-0 relative">
      <div className="w-[608px] overflow-hidden absolute gap-8">
        <Image
          src={thumbnail}
          className="w-[608px] h-[408px] object-cover rounded-[30px]"
          alt={title}
        />
        <div className="mt-4">
          <p className="font-extrabold text-[32px] leading-[48px] mb-[10px] whitespace-pre-line">
            {title}
          </p>
          <p className="text-lg">{category}</p>
        </div>
      </div>
      {/* <div className="flex flex-col w-full items-center justify-center gap-[50px] bg-[#0B0B1B] rounded-[30px] relative opacity-0 hover:opacity-100 transition-all duration-300">
        <div className="text-center z-10">
          <p className="font-extrabold text-[32px] leading-[48px] mb-[10px] text-white whitespace-pre-line">
            {title}
          </p>
          <p className="text-lg text-[#BABABC]">{category}</p>
        </div>
        <a
          href={href}
          className="z-10 font-bold text-lg text-center w-fit h-fit bg-[#FFE7C2] rounded-full p-[14px_30px] transition-all duration-300 hover:shadow-[0_10px_20px_0_#FFE7C280]"
        >
          View Details
        </a>
        <Image
          src={eclipseImage}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-1/2"
          alt="background icon"
        />
      </div> */}
    </div>
  )
}
