"use client"

import Image from "next/image"

import logo1 from "@/public/assets/images/logos/logoipsum1.png"
import logo2 from "@/public/assets/images/logos/logoipsum2.png"
import logo3 from "@/public/assets/images/logos/logoipsum3.png"
import logo4 from "@/public/assets/images/logos/logoipsum4.png"

export default function LogoSection() {
  return (
    <section className="w-full bg-[#0B0B0D] py-16 md:py-24 lg:py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* SLIDER */}
        <div className="relative group/slider">
          <div className="flex w-max items-center">
            {/* FIRST TRACK */}
            <div className="flex animate-[slide_25s_linear_infinite] group-hover/slider:[animation-play-state:paused] gap-12 md:gap-20 items-center">
              {[logo1, logo2, logo3, logo4, logo1, logo2, logo3, logo4].map(
                (logo, index) => (
                  <div
                    key={index}
                    className="flex h-8 md:h-12 shrink-0 items-center justify-center 
                    opacity-60 grayscale 
                    transition-all duration-300 
                    hover:opacity-100 hover:grayscale-0 
                    hover:drop-shadow-[0_0_12px_rgba(46,43,255,0.6)]"
                  >
                    <Image
                      src={logo}
                      alt="client logo"
                      className="h-full w-auto object-contain"
                    />
                  </div>
                ),
              )}
            </div>

            {/* SECOND TRACK (DUPLICATE FOR LOOP EFFECT) */}
            <div className="flex animate-[slide_25s_linear_infinite] group-hover/slider:[animation-play-state:paused] gap-12 md:gap-20 items-center ml-12 md:ml-20">
              {[logo1, logo2, logo3, logo4, logo1, logo2, logo3, logo4].map(
                (logo, index) => (
                  <div
                    key={`dup-${index}`}
                    className="flex h-8 md:h-12 shrink-0 items-center justify-center 
                    opacity-60 grayscale 
                    transition-all duration-300 
                    hover:opacity-100 hover:grayscale-0 
                    hover:drop-shadow-[0_0_12px_rgba(46,43,255,0.6)]"
                  >
                    <Image
                      src={logo}
                      alt="client logo"
                      className="h-full w-auto object-contain"
                    />
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
