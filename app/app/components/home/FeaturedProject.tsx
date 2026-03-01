import Image, { type StaticImageData } from "next/image"

type FeaturedProjectProps = {
  thumbnail: StaticImageData
  title: string
  category: string
}

export default function FeaturedProject({
  thumbnail,
  title,
  category,
}: FeaturedProjectProps) {
  return (
    <div className="group flex w-full shrink-0 flex-col gap-4">
      <div className="overflow-hidden rounded-[20px] sm:rounded-[24px] lg:rounded-[30px]">
        <Image
          src={thumbnail}
          className="h-[240px] w-full object-cover sm:h-[240px] lg:h-[320px]"
          alt={title}
        />
      </div>
      <div>
        <p className="mb-2 whitespace-pre-line text-2xl font-extrabold leading-tight sm:text-[24px] sm:leading-[36px] lg:text-[24px] lg:leading-[36px]">
          {title}
        </p>
        <p className="text-base sm:text-lg">{category}</p>
      </div>
    </div>
  )
}
