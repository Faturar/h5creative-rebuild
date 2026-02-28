import Image from "next/image"

import logo from "@/public/assets/images/logos/logo.svg"
import eclipseImage from "@/public/assets/images/Ellipse.svg"
import callIcon from "@/public/assets/images/icons/call.svg"
import dribbbleIcon from "@/public/assets/images/icons/dribbble.svg"
import smsIcon from "@/public/assets/images/icons/sms.svg"

export default function Footer() {
  return (
    <footer className="bg-portto-black text-white pb-[50px] border-t-[10px] border-portto-purple">
      <div className="container max-w-[1130px] mx-auto flex justify-between pt-[100px] pb-[50px] mb-[50px] relative border-b border-[#585867]">
        <Image
          src={eclipseImage}
          className="absolute h-[300px] top-[70px] -left-[20px] z-0"
          alt="icon"
        />
        <div className="flex shrink-0 h-fit z-10">
          <Image src={logo} alt="logo" />
        </div>
        <div className="flex gap-[100px] z-10">
          <div className="flex flex-col gap-5">
            <p className="font-bold text-lg">Explore</p>
            <a
              href="#"
              className="font-medium hover:font-semibold hover:text-portto-light-gold transition-all duration-300"
            >
              Services
            </a>
            <a
              href="#"
              className="font-medium hover:font-semibold hover:text-portto-light-gold transition-all duration-300"
            >
              Testimonials
            </a>
            <a
              href="#"
              className="font-medium hover:font-semibold hover:text-portto-light-gold transition-all duration-300"
            >
              Pricing
            </a>
            <a
              href="#"
              className="font-medium hover:font-semibold hover:text-portto-light-gold transition-all duration-300"
            >
              About
            </a>
          </div>
          <div className="flex flex-col gap-5">
            <p className="font-bold text-lg">Services</p>
            <a
              href="#"
              className="font-medium hover:font-semibold hover:text-portto-light-gold transition-all duration-300"
            >
              UI/UX Design
            </a>
            <a
              href="#"
              className="font-medium hover:font-semibold hover:text-portto-light-gold transition-all duration-300"
            >
              Web Development
            </a>
            <a
              href="#"
              className="font-medium hover:font-semibold hover:text-portto-light-gold transition-all duration-300"
            >
              Data Science
            </a>
            <a
              href="#"
              className="font-medium hover:font-semibold hover:text-portto-light-gold transition-all duration-300"
            >
              Digital Marketing
            </a>
          </div>
          <div className="flex flex-col gap-5">
            <p className="font-bold text-lg">About</p>
            <a
              href="#"
              className="font-medium hover:font-semibold hover:text-portto-light-gold transition-all duration-300"
            >
              My Profile
            </a>
            <a
              href="#"
              className="font-medium hover:font-semibold hover:text-portto-light-gold transition-all duration-300"
            >
              How do I work
            </a>
            <a
              href="#"
              className="font-medium hover:font-semibold hover:text-portto-light-gold transition-all duration-300"
            >
              Achievements
            </a>
            <a
              href="#"
              className="font-medium hover:font-semibold hover:text-portto-light-gold transition-all duration-300"
            >
              Team A
            </a>
          </div>
          <div className="flex flex-col gap-5">
            <p className="font-bold text-lg">Connect</p>
            <a
              href="#"
              className="font-medium hover:font-semibold hover:text-portto-light-gold transition-all duration-300 flex items-center gap-[6px]"
            >
              <Image src={callIcon} alt="icon" />
              +1 2208 1996
            </a>
            <a
              href="#"
              className="font-medium hover:font-semibold hover:text-portto-light-gold transition-all duration-300 flex items-center gap-[6px]"
            >
              <Image src={dribbbleIcon} alt="icon" />
              buildwithangga
            </a>
            <a
              href="#"
              className="font-medium hover:font-semibold hover:text-portto-light-gold transition-all duration-300 flex items-center gap-[6px]"
            >
              <Image src={smsIcon} alt="icon" />
              team@bwa.com
            </a>
          </div>
        </div>
      </div>
      <p className="text-sm text-[#A0A0AC] text-center">
        All Rights Reserved. Copyright BuildWithAngga 2024.
      </p>
    </footer>
  )
}
