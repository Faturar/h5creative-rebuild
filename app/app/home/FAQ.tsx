import Image from "next/image"

import messagesIcon from "@/public/assets/images/icons/messages.svg"
import arrowCircleDownIcon from "@/public/assets/images/icons/arrow-circle-down.svg"

export default function FAQ() {
  return (
    <section id="FAQ" className="container max-w-[1130px] mx-auto">
      <div className="flex gap-[70px] items-center pt-[100px] pb-[150px]">
        <div className="flex flex-col gap-[30px]">
          <div className="w-20 h-20 flex shrink-0 rounded-full bg-portto-purple items-center justify-center">
            <Image src={messagesIcon} alt="icon" />
          </div>
          <div className="flex flex-col gap-[10px]">
            <h2 className="font-extrabold text-[50px] leading-[70px]">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-[#878C9C]">
              If you have any question please contact me.
            </p>
          </div>
          <a
            href="#"
            className="bg-[#0B0B1B] font-bold text-lg text-white rounded-full p-[14px_30px] w-fit transition-all duration-300 hover:bg-white hover:text-[#0B0B1B] hover:ring hover:ring-[#0B0B1B]"
          >
            Contact Me
          </a>
        </div>
        <div className="flex flex-col gap-[30px] w-[603px] shrink-0">
          <div className="flex flex-col p-5 rounded-2xl bg-[#F4F5F8] w-full">
            <button
              className="accordion-button flex justify-between gap-1 items-center"
              data-accordion="accordion-faq-1"
            >
              <span className="font-bold text-2xl">How do I work usually?</span>
              <div className="arrow w-9 h-9 flex shrink-0">
                <Image
                  src={arrowCircleDownIcon}
                  className="transition-all duration-300"
                  alt="icon"
                />
              </div>
            </button>
            <div id="accordion-faq-1" className="accordion-content">
              <p className="text-[20px] leading-[36px] pt-5">
                As a freelancer, my work process is characterized by
                flexibility, self-discipline, and a strong emphasis on client
                communication.
              </p>
            </div>
          </div>
          <div className="flex flex-col p-5 rounded-2xl bg-[#F4F5F8] w-full">
            <button
              className="accordion-button flex justify-between gap-1 items-center"
              data-accordion="accordion-faq-2"
            >
              <span className="font-bold text-2xl">
                How much I charge per project?
              </span>
              <div className="arrow w-9 h-9 flex shrink-0">
                <Image
                  src={arrowCircleDownIcon}
                  className="transition-all duration-300"
                  alt="icon"
                />
              </div>
            </button>
            <div id="accordion-faq-2" className="accordion-content">
              <p className="text-[20px] leading-[36px] pt-5">
                I don't charge hourly. I charge based on the project brief and
                given timeline to finish that particular project.
              </p>
            </div>
          </div>
          <div className="flex flex-col p-5 rounded-2xl bg-[#F4F5F8] w-full">
            <button
              className="accordion-button flex justify-between gap-1 items-center"
              data-accordion="accordion-faq-3"
            >
              <span className="font-bold text-2xl">Can I work full-time?</span>
              <div className="arrow w-9 h-9 flex shrink-0">
                <Image
                  src={arrowCircleDownIcon}
                  className="transition-all duration-300"
                  alt="icon"
                />
              </div>
            </button>
            <div id="accordion-faq-3" className="accordion-content">
              <p className="text-[20px] leading-[36px] pt-5">
                I don't work full-time. At this moment, I prefer to work
                remotely and based on the certain project only.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
