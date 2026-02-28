import Image from "next/image"

import logo from "@/public/assets/images/logos/logo.svg"
import logo1 from "@/public/assets/images/logos/logoipsum1.png"
import logo2 from "@/public/assets/images/logos/logoipsum2.png"
import logo3 from "@/public/assets/images/logos/logoipsum3.png"
import logo4 from "@/public/assets/images/logos/logoipsum4.png"
import heroImage from "@/public/assets/images/hero-image.png"
import eclipseImage from "@/public/assets/images/Ellipse.svg"

export default function Header() {
  return (
    <section
      id="Header"
      className="flex flex-col gap-[100px] bg-[#0B0B1B] relative"
    >
      <nav className="container max-w-[1130px] mx-auto flex justify-between items-center pt-[30px] z-10">
        <a href="#" className="w-[161px] flex shrink-0 h-fit w-fit">
          <Image src={logo} alt="logo" />
        </a>
        <div className="flex gap-[50px] items-center">
          <ul className="flex gap-[50px] items-center text-white">
            <li>
              <a
                href="#"
                className="font-medium text-lg hover:text-[#FFE7C2] transition-all duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-medium text-lg hover:text-[#FFE7C2] transition-all duration-300"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-medium text-lg hover:text-[#FFE7C2] transition-all duration-300"
              >
                Testimonials
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-medium text-lg hover:text-[#FFE7C2] transition-all duration-300"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-medium text-lg hover:text-[#FFE7C2] transition-all duration-300"
              >
                About
              </a>
            </li>
          </ul>
          <button className="bg-[#FFE7C2] font-bold text-lg p-[14px_30px] rounded-full transition-all duration-300 hover:shadow-[0_10px_20px_0_#FFE7C280]">
            Hire Me
          </button>
        </div>
      </nav>
      <div className="hero container max-w-282.5 mx-auto flex justify-between items-center relative">
        <div className="flex flex-col gap-12.5 h-fit w-fit text-white z-10">
          <p className="font-semibold text-2xl">I'm Shayna 👋</p>
          <h1 className="font-extrabold text-[80px] leading-22.5">
            Professional Designer & Dev
          </h1>
          <button className="font-bold text-[26px] leading-9.75 rounded-[30px] p-[30px_40px] bg-[#4920E5] w-fit transition-all duration-300 hover:shadow-[0_10px_20px_0_#4920E5]">
            Explore Now
          </button>
        </div>
        <div className="flex max-w-117.75 max-h-141.75 z-10">
          <Image
            src={heroImage}
            className="w-full h-full object-contain"
            alt="hero image"
          />
        </div>
        <Image
          src={eclipseImage}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
          alt="background icon"
        />
      </div>
      <div className="company-logos w-full overflow-hidden pb-47.5">
        <div className="group/slider flex flex-nowrap w-max items-center">
          <div className="logo-container animate-[slide_25s_linear_infinite] group-hover/slider:pause-animate flex gap-17.5 pl-17.5 items-center flex-nowrap">
            <div className="flex w-fit h-10 shrink-0">
              <Image
                src={logo1}
                className="w-full h-full object-contain"
                alt="logo"
              />
            </div>
            <div className="flex w-fit h-10 shrink-0">
              <Image
                src={logo2}
                className="w-full h-full object-contain"
                alt="logo"
              />
            </div>
            <div className="flex w-fit h-10 shrink-0">
              <Image
                src={logo3}
                className="w-full h-full object-contain"
                alt="logo"
              />
            </div>
            <div className="flex w-fit h-10 shrink-0">
              <Image
                src={logo4}
                className="w-full h-full object-contain"
                alt="logo"
              />
            </div>
            <div className="flex w-fit h-10 shrink-0">
              <Image
                src={logo1}
                className="w-full h-full object-contain"
                alt="logo"
              />
            </div>
            <div className="flex w-fit h-10 shrink-0">
              <Image
                src={logo2}
                className="w-full h-full object-contain"
                alt="logo"
              />
            </div>
            <div className="flex w-fit h-10 shrink-0">
              <Image
                src={logo3}
                className="w-full h-full object-contain"
                alt="logo"
              />
            </div>
            <div className="flex w-fit h-10 shrink-0">
              <Image
                src={logo4}
                className="w-full h-full object-contain"
                alt="logo"
              />
            </div>
          </div>
          <div className="logo-container animate-[slide_25s_linear_infinite] group-hover/slider:pause-animate flex gap-17.5 pl-17.5 items-center flex-nowrap">
            <div className="flex w-fit h-10 shrink-0">
              <Image
                src={logo1}
                className="w-full h-full object-contain"
                alt="logo"
              />
            </div>
            <div className="flex w-fit h-10 shrink-0">
              <Image
                src={logo2}
                className="w-full h-full object-contain"
                alt="logo"
              />
            </div>
            <div className="flex w-fit h-10 shrink-0">
              <Image
                src={logo3}
                className="w-full h-full object-contain"
                alt="logo"
              />
            </div>
            <div className="flex w-fit h-10 shrink-0">
              <Image
                src={logo4}
                className="w-full h-full object-contain"
                alt="logo"
              />
            </div>
            <div className="flex w-fit h-10 shrink-0">
              <Image
                src={logo1}
                className="w-full h-full object-contain"
                alt="logo"
              />
            </div>
            <div className="flex w-fit h-10 shrink-0">
              <Image
                src={logo2}
                className="w-full h-full object-contain"
                alt="logo"
              />
            </div>
            <div className="flex w-fit h-10 shrink-0">
              <Image
                src={logo3}
                className="w-full h-full object-contain"
                alt="logo"
              />
            </div>
            <div className="flex w-fit h-10 shrink-0">
              <Image
                src={logo4}
                className="w-full h-full object-contain"
                alt="logo"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="stats container max-w-282.5 mx-auto bg-linear-to-r from-[#FFEDD3] to-[#FFCD83] flex justify-between items-center px-25 rounded-[30px] w-full h-45 absolute transform -translate-x-1/2 translate-y-1/2 bottom-0 left-1/2">
        <div className="text-center w-fit h-fit">
          <p className="font-extrabold text-[40px] leading-15">$230M</p>
          <p className="font-semibold text-lg">Valuation</p>
        </div>
        <div className="text-center w-fit h-fit">
          <p className="font-extrabold text-[40px] leading-15">31,934</p>
          <p className="font-semibold text-lg">Projects</p>
        </div>
        <div className="text-center w-fit h-fit">
          <p className="font-extrabold text-[40px] leading-15">245</p>
          <p className="font-semibold text-lg">Startups IPO</p>
        </div>
        <div className="text-center w-fit h-fit">
          <p className="font-extrabold text-[40px] leading-15">9/10</p>
          <p className="font-semibold text-lg">Successful</p>
        </div>
        <div className="text-center w-fit h-fit">
          <p className="font-extrabold text-[40px] leading-15">562</p>
          <p className="font-semibold text-lg">Companies</p>
        </div>
      </div>
    </section>
  )
}
