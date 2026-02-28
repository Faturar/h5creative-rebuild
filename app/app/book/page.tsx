import Image from "next/image"

import logoTesti5 from "@/public/assets/images/logos/logo-testi5.svg"
import starIcon from "@/public/assets/images/icons/Star.svg"

export default function BookPage() {
  return (
    <section id="Content" className="bg-[#0B0B1B] flex min-h-screen">
      <div className="w-[660px] min-h-screen flex flex-col p-[30px_40px] justify-end overflow-hidden bg-[url('/assets/images/background/side-image.png')] bg-cover bg-center bg-no-repeat">
        <div className="flex flex-col bg-white p-[30px] gap-5 rounded-[30px] w-[580px]">
          <div className="flex h-10 items-start overflow-hidden">
            <Image
              src={logoTesti5}
              className="h-full object-contain"
              alt="logo"
            />
          </div>
          <p className="font-semibold text-[22px] leading-[40px]">
            She helped us to build our first prototype to win our investor and
            early users heart that generate huge attraction.
          </p>
          <div className="flex h-8 w-fit shrink-0">
            {Array.from({ length: 5 }).map((_, index) => (
              <Image
                key={index}
                src={starIcon}
                className="w-full h-full"
                alt="star"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[50px] items-center justify-center mx-auto py-4 bg-[url('/assets/images/Ellipse.svg')] bg-center bg-no-repeat bg-contain bg-[length:540px]">
        <div className="flex flex-col text-center text-white">
          <h1 className="font-extrabold text-[50px] leading-[75px]">
            Book a Meeting
          </h1>
          <p className="text-lg">
            Tell me anything about your biggest future dreams
          </p>
        </div>
        <form className="flex flex-col gap-5 w-[550px]">
          <label className="flex flex-col gap-[10px] font-semibold">
            <span className="text-white">Complete Name</span>
            <input
              type="text"
              name="name"
              className="bg-white rounded-full p-[14px_30px] appearance-none outline-none focus:ring-[3px] focus:ring-[#12BB74] placeholder:font-normal placeholder:text-base placeholder:text-[#878C9C]"
              placeholder="Write your complete name"
              required
            />
          </label>
          <label className="flex flex-col gap-[10px] font-semibold">
            <span className="text-white">Email Address</span>
            <input
              type="email"
              name="email"
              className="bg-white rounded-full p-[14px_30px] appearance-none outline-none focus:ring-[3px] focus:ring-[#12BB74] placeholder:font-normal placeholder:text-base placeholder:text-[#878C9C]"
              placeholder="What's your email address"
              required
            />
          </label>
          <div className="grid grid-cols-2 gap-5">
            <label className="flex flex-col gap-[10px] font-semibold w-full">
              <span className="text-white">Category</span>
              <select
                name="category"
                className="font-semibold bg-white rounded-full p-[14px_30px] pr-[54px] appearance-none outline-none focus:ring-[3px] focus:ring-[#12BB74] invalid:text-[#878C9C] invalid:font-normal bg-[url('/assets/images/icons/arrow-down.svg')] bg-no-repeat bg-[91%]"
                required
                defaultValue=""
              >
                <option value="" disabled hidden>
                  Select category
                </option>
                <option value="website-development">Website Development</option>
              </select>
            </label>
            <label className="flex flex-col gap-[10px] font-semibold w-full">
              <span className="text-white">Est. Budget (USD)</span>
              <input
                type="number"
                name="budget"
                className="bg-white rounded-full p-[14px_30px] appearance-none outline-none focus:ring-[3px] focus:ring-[#12BB74] placeholder:font-normal placeholder:text-base placeholder:text-[#878C9C]"
                placeholder="Tell me your budget"
                required
              />
            </label>
          </div>
          <label className="flex flex-col gap-[10px] font-semibold">
            <span className="text-white">Project Brief</span>
            <textarea
              name="brief"
              className="rounded-[20px] p-[14px_30px] appearance-none outline-none focus:ring-[3px] focus:ring-[#12BB74] placeholder:font-normal placeholder:text-base placeholder:text-[#878C9C] h-[250px] bg-white"
              placeholder="Brief me your a whole project"
              required
            />
          </label>
          <button className="font-bold text-lg text-white bg-[#4920E5] rounded-[20px] p-5 transition-all duration-300 hover:shadow-[0_10px_20px_0_#4920E5]">
            Request for Meeting
          </button>
        </form>
      </div>
    </section>
  )
}
