import thumbnail1 from "@/public/assets/images/thumbnails/thumbnail1.png"
import thumbnail2 from "@/public/assets/images/thumbnails/thumbnail2.png"
import thumbnail3 from "@/public/assets/images/thumbnails/thumbnail3.png"

import FeaturedProject from "./FeaturedProject"

const featuredProjects = [
  {
    thumbnail: thumbnail1,
    title: "AI Finance SaaS Website Integrations",
    category: "Website Development",
  },
  {
    thumbnail: thumbnail2,
    title: "Portfolio Website Development",
    category: "Website Development",
  },
  {
    thumbnail: thumbnail3,
    title: "AI Finance SaaS Website Integrations",
    category: "Website Development",
  },
]

type SliderRowProps = {
  animationClass: string
}

function SliderRow({ animationClass }: SliderRowProps) {
  return (
    <div className="group/slider slider flex flex-nowrap w-max items-center">
      <div
        className={`project-container ${animationClass} group-hover/slider:pause-animate flex gap-[30px] pl-[30px] items-center flex-nowrap`}
      >
        {featuredProjects.map((project, index) => (
          <FeaturedProject
            key={`track-1-${index}`}
            thumbnail={project.thumbnail}
            title={project.title}
            category={project.category}
          />
        ))}
      </div>
      <div
        className={`project-container ${animationClass} group-hover/slider:pause-animate flex gap-[30px] pl-[30px] items-center flex-nowrap`}
      >
        {featuredProjects.map((project, index) => (
          <FeaturedProject
            key={`track-2-${index}`}
            thumbnail={project.thumbnail}
            title={project.title}
            category={project.category}
          />
        ))}
      </div>
    </div>
  )
}

export default function FeaturedProjects() {
  return (
    <section
      id="Projects"
      className="w-full flex flex-col pb-[100px] pt-[180px]"
    >
      <div className="flex flex-col gap-[10px] mb-[50px]">
        <h2 className="font-extrabold text-[50px] leading-[70px] text-center">
          Our Featured Project
        </h2>
        <p className="text-lg text-center">
          Working with awesome team from around the world
        </p>
      </div>

      <div className="projects w-full flex flex-col mb-[30px] overflow-hidden">
        <SliderRow animationClass="animate-[slide_50s_linear_infinite]" />
      </div>
    </section>
  )
}
