import Image from "next/image"

import thumbnail1 from "@/public/assets/images/thumbnails/thumbnail1.png"
import thumbnail2 from "@/public/assets/images/thumbnails/thumbnail2.png"
import thumbnail3 from "@/public/assets/images/thumbnails/thumbnail3.png"
import eclipseImage from "@/public/assets/images/Ellipse.svg"

export default function Projects() {
  return (
    <section
      id="Projects"
      className="w-full flex flex-col py-[100px] bg-background1 bg-cover bg-center bg-no-repeat"
    >
      <div className="flex flex-col gap-[10px] mb-[50px]">
        <h2 className="font-extrabold text-[50px] leading-[70px] text-center text-white">
          Great Projects
        </h2>
        <p className="text-lg text-center text-white">
          Working with awesome team from around the world
        </p>
      </div>
      <div className="projects w-full flex flex-col mb-[30px] overflow-hidden">
        <div className="group/slider slider flex flex-nowrap w-max items-center">
          <div className="project-container animate-[slide_50s_linear_infinite] group-hover/slider:pause-animate flex gap-[30px] pl-[30px] items-center flex-nowrap">
            <div className="group w-[650px] h-[450px] flex shrink-0 rounded-[30px] border border-white p-5 bg-[#FFFFFF33] backdrop-blur relative">
              <div className="w-[608px] h-[408px] rounded-[30px] overflow-hidden absolute">
                <Image
                  src={thumbnail1}
                  className="w-full h-full object-cover"
                  alt="thumbnail"
                />
              </div>
              <div className="flex flex-col w-full items-center justify-center gap-[50px] bg-portto-black rounded-[30px] relative opacity-0 hover:opacity-100 transition-all duration-300">
                <div className="text-center z-10">
                  <p className="font-extrabold text-[32px] leading-[48px] mb-[10px] text-white">
                    AI Finance SaaS <br />
                    Website Integrations
                  </p>
                  <p className="text-lg text-[#BABABC]">Website Development</p>
                </div>
                <a
                  href="#"
                  className="z-10 font-bold text-lg text-center w-fit h-fit bg-portto-light-gold rounded-full p-[14px_30px] transition-all duration-300 hover:shadow-[0_10px_20px_0_#FFE7C280]"
                >
                  View Details
                </a>
                <Image
                  src={eclipseImage}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-1/2"
                  alt="background icon"
                />
              </div>
            </div>
            <div className="group w-[650px] h-[450px] flex shrink-0 rounded-[30px] border border-white p-5 bg-[#FFFFFF33] backdrop-blur relative">
              <div className="w-[608px] h-[408px] rounded-[30px] overflow-hidden absolute">
                <Image
                  src={thumbnail2}
                  className="w-full h-full object-cover"
                  alt="thumbnail"
                />
              </div>
              <div className="flex flex-col w-full items-center justify-center gap-[50px] bg-portto-black rounded-[30px] relative opacity-0 hover:opacity-100 transition-all duration-300">
                <div className="text-center z-10">
                  <p className="font-extrabold text-[32px] leading-[48px] mb-[10px] text-white">
                    AI Finance SaaS <br />
                    Website Integrations
                  </p>
                  <p className="text-lg text-[#BABABC]">Website Development</p>
                </div>
                <a
                  href="#"
                  className="z-10 font-bold text-lg text-center w-fit h-fit bg-portto-light-gold rounded-full p-[14px_30px] transition-all duration-300 hover:shadow-[0_10px_20px_0_#FFE7C280]"
                >
                  View Details
                </a>
                <Image
                  src={eclipseImage}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-1/2"
                  alt="background icon"
                />
              </div>
            </div>
            <div className="group w-[650px] h-[450px] flex shrink-0 rounded-[30px] border border-white p-5 bg-[#FFFFFF33] backdrop-blur relative">
              <div className="w-[608px] h-[408px] rounded-[30px] overflow-hidden absolute">
                <Image
                  src={thumbnail3}
                  className="w-full h-full object-cover"
                  alt="thumbnail"
                />
              </div>
              <div className="flex flex-col w-full items-center justify-center gap-[50px] bg-portto-black rounded-[30px] relative opacity-0 hover:opacity-100 transition-all duration-300">
                <div className="text-center z-10">
                  <p className="font-extrabold text-[32px] leading-[48px] mb-[10px] text-white">
                    AI Finance SaaS <br />
                    Website Integrations
                  </p>
                  <p className="text-lg text-[#BABABC]">Website Development</p>
                </div>
                <a
                  href="#"
                  className="z-10 font-bold text-lg text-center w-fit h-fit bg-portto-light-gold rounded-full p-[14px_30px] transition-all duration-300 hover:shadow-[0_10px_20px_0_#FFE7C280]"
                >
                  View Details
                </a>
                <Image
                  src={eclipseImage}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-1/2"
                  alt="background icon"
                />
              </div>
            </div>
          </div>
          <div className="project-container animate-[slide_50s_linear_infinite] group-hover/slider:pause-animate flex gap-[30px] pl-[30px] items-center flex-nowrap">
            <div className="group w-[650px] h-[450px] flex shrink-0 rounded-[30px] border border-white p-5 bg-[#FFFFFF33] backdrop-blur relative">
              <div className="w-[608px] h-[408px] rounded-[30px] overflow-hidden absolute">
                <Image
                  src={thumbnail1}
                  className="w-full h-full object-cover"
                  alt="thumbnail"
                />
              </div>
              <div className="flex flex-col w-full items-center justify-center gap-[50px] bg-portto-black rounded-[30px] relative opacity-0 hover:opacity-100 transition-all duration-300">
                <div className="text-center z-10">
                  <p className="font-extrabold text-[32px] leading-[48px] mb-[10px] text-white">
                    AI Finance SaaS <br />
                    Website Integrations
                  </p>
                  <p className="text-lg text-[#BABABC]">Website Development</p>
                </div>
                <a
                  href="#"
                  className="z-10 font-bold text-lg text-center w-fit h-fit bg-portto-light-gold rounded-full p-[14px_30px] transition-all duration-300 hover:shadow-[0_10px_20px_0_#FFE7C280]"
                >
                  View Details
                </a>
                <Image
                  src={eclipseImage}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-1/2"
                  alt="background icon"
                />
              </div>
            </div>
            <div className="group w-[650px] h-[450px] flex shrink-0 rounded-[30px] border border-white p-5 bg-[#FFFFFF33] backdrop-blur relative">
              <div className="w-[608px] h-[408px] rounded-[30px] overflow-hidden absolute">
                <Image
                  src={thumbnail2}
                  className="w-full h-full object-cover"
                  alt="thumbnail"
                />
              </div>
              <div className="flex flex-col w-full items-center justify-center gap-[50px] bg-portto-black rounded-[30px] relative opacity-0 hover:opacity-100 transition-all duration-300">
                <div className="text-center z-10">
                  <p className="font-extrabold text-[32px] leading-[48px] mb-[10px] text-white">
                    AI Finance SaaS <br />
                    Website Integrations
                  </p>
                  <p className="text-lg text-[#BABABC]">Website Development</p>
                </div>
                <a
                  href="#"
                  className="z-10 font-bold text-lg text-center w-fit h-fit bg-portto-light-gold rounded-full p-[14px_30px] transition-all duration-300 hover:shadow-[0_10px_20px_0_#FFE7C280]"
                >
                  View Details
                </a>
                <Image
                  src={eclipseImage}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-1/2"
                  alt="background icon"
                />
              </div>
            </div>
            <div className="group w-[650px] h-[450px] flex shrink-0 rounded-[30px] border border-white p-5 bg-[#FFFFFF33] backdrop-blur relative">
              <div className="w-[608px] h-[408px] rounded-[30px] overflow-hidden absolute">
                <Image
                  src={thumbnail3}
                  className="w-full h-full object-cover"
                  alt="thumbnail"
                />
              </div>
              <div className="flex flex-col w-full items-center justify-center gap-[50px] bg-portto-black rounded-[30px] relative opacity-0 hover:opacity-100 transition-all duration-300">
                <div className="text-center z-10">
                  <p className="font-extrabold text-[32px] leading-[48px] mb-[10px] text-white">
                    AI Finance SaaS <br />
                    Website Integrations
                  </p>
                  <p className="text-lg text-[#BABABC]">Website Development</p>
                </div>
                <a
                  href="#"
                  className="z-10 font-bold text-lg text-center w-fit h-fit bg-portto-light-gold rounded-full p-[14px_30px] transition-all duration-300 hover:shadow-[0_10px_20px_0_#FFE7C280]"
                >
                  View Details
                </a>
                <Image
                  src={eclipseImage}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-1/2"
                  alt="background icon"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="projects w-full flex flex-col overflow-hidden">
        <div className="group/slider slider flex flex-nowrap w-max items-center">
          <div className="project-container animate-[slideToR_50s_linear_infinite] group-hover/slider:pause-animate flex gap-[30px] pl-[30px] items-center flex-nowrap">
            <div className="group w-[650px] h-[450px] flex shrink-0 rounded-[30px] border border-white p-5 bg-[#FFFFFF33] backdrop-blur relative">
              <div className="w-[608px] h-[408px] rounded-[30px] overflow-hidden absolute">
                <Image
                  src={thumbnail1}
                  className="w-full h-full object-cover"
                  alt="thumbnail"
                />
              </div>
              <div className="flex flex-col w-full items-center justify-center gap-[50px] bg-portto-black rounded-[30px] relative opacity-0 hover:opacity-100 transition-all duration-300">
                <div className="text-center z-10">
                  <p className="font-extrabold text-[32px] leading-[48px] mb-[10px] text-white">
                    AI Finance SaaS <br />
                    Website Integrations
                  </p>
                  <p className="text-lg text-[#BABABC]">Website Development</p>
                </div>
                <a
                  href="#"
                  className="z-10 font-bold text-lg text-center w-fit h-fit bg-portto-light-gold rounded-full p-[14px_30px] transition-all duration-300 hover:shadow-[0_10px_20px_0_#FFE7C280]"
                >
                  View Details
                </a>
                <Image
                  src={eclipseImage}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-1/2"
                  alt="background icon"
                />
              </div>
            </div>
            <div className="group w-[650px] h-[450px] flex shrink-0 rounded-[30px] border border-white p-5 bg-[#FFFFFF33] backdrop-blur relative">
              <div className="w-[608px] h-[408px] rounded-[30px] overflow-hidden absolute">
                <Image
                  src={thumbnail2}
                  className="w-full h-full object-cover"
                  alt="thumbnail"
                />
              </div>
              <div className="flex flex-col w-full items-center justify-center gap-[50px] bg-portto-black rounded-[30px] relative opacity-0 hover:opacity-100 transition-all duration-300">
                <div className="text-center z-10">
                  <p className="font-extrabold text-[32px] leading-[48px] mb-[10px] text-white">
                    AI Finance SaaS <br />
                    Website Integrations
                  </p>
                  <p className="text-lg text-[#BABABC]">Website Development</p>
                </div>
                <a
                  href="#"
                  className="z-10 font-bold text-lg text-center w-fit h-fit bg-portto-light-gold rounded-full p-[14px_30px] transition-all duration-300 hover:shadow-[0_10px_20px_0_#FFE7C280]"
                >
                  View Details
                </a>
                <Image
                  src={eclipseImage}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-1/2"
                  alt="background icon"
                />
              </div>
            </div>
            <div className="group w-[650px] h-[450px] flex shrink-0 rounded-[30px] border border-white p-5 bg-[#FFFFFF33] backdrop-blur relative">
              <div className="w-[608px] h-[408px] rounded-[30px] overflow-hidden absolute">
                <Image
                  src={thumbnail3}
                  className="w-full h-full object-cover"
                  alt="thumbnail"
                />
              </div>
              <div className="flex flex-col w-full items-center justify-center gap-[50px] bg-portto-black rounded-[30px] relative opacity-0 hover:opacity-100 transition-all duration-300">
                <div className="text-center z-10">
                  <p className="font-extrabold text-[32px] leading-[48px] mb-[10px] text-white">
                    AI Finance SaaS <br />
                    Website Integrations
                  </p>
                  <p className="text-lg text-[#BABABC]">Website Development</p>
                </div>
                <a
                  href="#"
                  className="z-10 font-bold text-lg text-center w-fit h-fit bg-portto-light-gold rounded-full p-[14px_30px] transition-all duration-300 hover:shadow-[0_10px_20px_0_#FFE7C280]"
                >
                  View Details
                </a>
                <Image
                  src={eclipseImage}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-1/2"
                  alt="background icon"
                />
              </div>
            </div>
          </div>
          <div className="project-container animate-[slideToR_50s_linear_infinite] group-hover/slider:pause-animate flex gap-[30px] pl-[30px] items-center flex-nowrap">
            <div className="group w-[650px] h-[450px] flex shrink-0 rounded-[30px] border border-white p-5 bg-[#FFFFFF33] backdrop-blur relative">
              <div className="w-[608px] h-[408px] rounded-[30px] overflow-hidden absolute">
                <Image
                  src={thumbnail1}
                  className="w-full h-full object-cover"
                  alt="thumbnail"
                />
              </div>
              <div className="flex flex-col w-full items-center justify-center gap-[50px] bg-portto-black rounded-[30px] relative opacity-0 hover:opacity-100 transition-all duration-300">
                <div className="text-center z-10">
                  <p className="font-extrabold text-[32px] leading-[48px] mb-[10px] text-white">
                    AI Finance SaaS <br />
                    Website Integrations
                  </p>
                  <p className="text-lg text-[#BABABC]">Website Development</p>
                </div>
                <a
                  href="#"
                  className="z-10 font-bold text-lg text-center w-fit h-fit bg-portto-light-gold rounded-full p-[14px_30px] transition-all duration-300 hover:shadow-[0_10px_20px_0_#FFE7C280]"
                >
                  View Details
                </a>
                <Image
                  src={eclipseImage}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-1/2"
                  alt="background icon"
                />
              </div>
            </div>
            <div className="group w-[650px] h-[450px] flex shrink-0 rounded-[30px] border border-white p-5 bg-[#FFFFFF33] backdrop-blur relative">
              <div className="w-[608px] h-[408px] rounded-[30px] overflow-hidden absolute">
                <Image
                  src={thumbnail2}
                  className="w-full h-full object-cover"
                  alt="thumbnail"
                />
              </div>
              <div className="flex flex-col w-full items-center justify-center gap-[50px] bg-portto-black rounded-[30px] relative opacity-0 hover:opacity-100 transition-all duration-300">
                <div className="text-center z-10">
                  <p className="font-extrabold text-[32px] leading-[48px] mb-[10px] text-white">
                    AI Finance SaaS <br />
                    Website Integrations
                  </p>
                  <p className="text-lg text-[#BABABC]">Website Development</p>
                </div>
                <a
                  href="#"
                  className="z-10 font-bold text-lg text-center w-fit h-fit bg-portto-light-gold rounded-full p-[14px_30px] transition-all duration-300 hover:shadow-[0_10px_20px_0_#FFE7C280]"
                >
                  View Details
                </a>
                <Image
                  src={eclipseImage}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-1/2"
                  alt="background icon"
                />
              </div>
            </div>
            <div className="group w-[650px] h-[450px] flex shrink-0 rounded-[30px] border border-white p-5 bg-[#FFFFFF33] backdrop-blur relative">
              <div className="w-[608px] h-[408px] rounded-[30px] overflow-hidden absolute">
                <Image
                  src={thumbnail3}
                  className="w-full h-full object-cover"
                  alt="thumbnail"
                />
              </div>
              <div className="flex flex-col w-full items-center justify-center gap-[50px] bg-portto-black rounded-[30px] relative opacity-0 hover:opacity-100 transition-all duration-300">
                <div className="text-center z-10">
                  <p className="font-extrabold text-[32px] leading-[48px] mb-[10px] text-white">
                    AI Finance SaaS <br />
                    Website Integrations
                  </p>
                  <p className="text-lg text-[#BABABC]">Website Development</p>
                </div>
                <a
                  href="#"
                  className="z-10 font-bold text-lg text-center w-fit h-fit bg-portto-light-gold rounded-full p-[14px_30px] transition-all duration-300 hover:shadow-[0_10px_20px_0_#FFE7C280]"
                >
                  View Details
                </a>
                <Image
                  src={eclipseImage}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-1/2"
                  alt="background icon"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
