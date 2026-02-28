import Image from "next/image"

import services1 from "@/public/assets/images/services1.png"
import services2 from "@/public/assets/images/services2.png"
import services3 from "@/public/assets/images/services3.png"
import crownIcon from "@/public/assets/images/icons/crown.svg"
import codeIcon from "@/public/assets/images/icons/code.svg"
import cubeIcon from "@/public/assets/images/icons/3dcube.svg"

export default function Services() {
  return (
    <section
      id="Services"
      className="container max-w-[1130px] mx-auto pt-[190px] pb-[100px]"
    >
      <div className="flex flex-col gap-[50px]">
        <div className="flex justify-between items-center">
          <h2 className="font-extrabold text-[50px] leading-[70px]">
            Actually, I Do Design <br />& Code for Living
          </h2>
          <a
            href="#"
            className="font-bold text-lg bg-[#0B0B1B] rounded-full w-fit h-fit p-[14px_30px] text-white transition-all duration-300 hover:bg-white hover:text-[#0B0B1B] hover:ring hover:ring-[#0B0B1B]"
          >
            All Services
          </a>
        </div>
        <div className="grid grid-cols-2 gap-[30px]">
          <div className="p-[50px] pb-0 rounded-[30px] flex flex-col gap-[50px] bg-[#F4F5F8]">
            <div className="flex items-center justify-center shrink-0 w-20 h-20 rounded-full bg-[#4920E5]">
              <Image
                src={crownIcon}
                className="w-10 h-10 object-contain"
                alt="icon"
              />
            </div>
            <div className="flex flex-col gap-5">
              <p className="font-extrabold text-[32px] leading-[48px]">
                High-Quality Mobile App UI/UX Design
              </p>
              <p className="text-lg leading-[34px]">
                Delivering great experience to users so that they are
                comfortable while using your product.
              </p>
            </div>
            <div className="w-full h-[350px]">
              <Image
                src={services1}
                className="w-full object-contain"
                alt="image"
              />
            </div>
          </div>
          <div className="p-[50px] pb-0 rounded-[30px] flex flex-col gap-[50px] bg-[#F4F5F8]">
            <div className="flex items-center justify-center shrink-0 w-20 h-20 rounded-full bg-[#12BB74]">
              <Image
                src={codeIcon}
                className="w-10 h-10 object-contain"
                alt="icon"
              />
            </div>
            <div className="flex flex-col gap-5">
              <p className="font-extrabold text-[32px] leading-[48px]">
                AI Business Dashboard Finance Company
              </p>
              <p className="text-lg leading-[34px]">
                Delivering great experience to users so that they are
                comfortable while using product.
              </p>
            </div>
            <div className="w-full h-[350px]">
              <Image
                src={services2}
                className="w-full object-contain"
                alt="image"
              />
            </div>
          </div>
          <div className="col-span-2 p-[50px] pb-0 rounded-[30px] flex gap-[50px] bg-[#F4F5F8]">
            <div className="flex flex-col gap-[50px]">
              <div className="flex items-center justify-center shrink-0 w-20 h-20 rounded-full bg-[#E64D56]">
                <Image
                  src={cubeIcon}
                  className="w-10 h-10 object-contain"
                  alt="icon"
                />
              </div>
              <div className="flex flex-col gap-5">
                <p className="font-extrabold text-[32px] leading-[48px]">
                  Robust Plugins Connected Machine Learning
                </p>
                <p className="text-lg leading-[34px]">
                  Delivering great experience to users so that they are
                  comfortable while using your product to grow.
                </p>
              </div>
            </div>
            <div className="w-[450px] h-[350px] flex shrink-0">
              <Image
                src={services3}
                className="w-full object-contain"
                alt="image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
