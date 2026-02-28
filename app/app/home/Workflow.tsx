import Image from "next/image"

import messagesNotifIcon from "@/public/assets/images/icons/messages-notif.svg"
import programmingNotifIcon from "@/public/assets/images/icons/programming-notif.svg"
import likeNotifIcon from "@/public/assets/images/icons/like-notif.svg"

export default function Workflow() {
  return (
    <section
      id="Workflow"
      className="container max-w-[1130px] mx-auto pt-[100px] pb-[200px] relative"
    >
      <div className="flex flex-col gap-[50px] justify-center">
        <h2 className="font-extrabold text-[50px] leading-[70px] text-center">
          My Workflow Suitable <br />
          For Any Project
        </h2>
        <div className="flex justify-between items-center">
          <div className="w-[350px] flex flex-col shrink-0 gap-[30px] items-center">
            <div className="flex-none">
              <Image src={messagesNotifIcon} alt="icon" />
            </div>
            <div className="flex flex-col gap-[10px] text-center">
              <p className="font-extrabold text-[22px] leading-[33px]">
                Research & Validate
              </p>
              <p className="text-lg leading-[34px]">
                Ensuring all requirements were matching with market conditions
              </p>
            </div>
          </div>
          <div className="w-[350px] flex flex-col shrink-0 gap-[30px] items-center">
            <div className="flex-none">
              <Image src={programmingNotifIcon} alt="icon" />
            </div>
            <div className="flex flex-col gap-[10px] text-center">
              <p className="font-extrabold text-[22px] leading-[33px]">
                Building with Teams
              </p>
              <p className="text-lg leading-[34px]">
                Working with agile framework to product a better results
              </p>
            </div>
          </div>
          <div className="w-[350px] flex flex-col shrink-0 gap-[30px] items-center">
            <div className="flex-none">
              <Image src={likeNotifIcon} alt="icon" />
            </div>
            <div className="flex flex-col gap-[10px] text-center">
              <p className="font-extrabold text-[22px] leading-[33px]">
                Deliver to Clients
              </p>
              <p className="text-lg leading-[34px]">
                We bring an instant results to the clients so that they are
                happys
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="stats container max-w-[1130px] mx-auto bg-gradient-to-r from-[#FFEDD3] to-[#FFCD83] flex justify-between items-center px-[100px] rounded-[30px] w-full h-[180px] absolute transform -translate-x-1/2 translate-y-1/2 bottom-0 left-1/2">
        <div className="text-center w-fit h-fit">
          <p className="font-extrabold text-[40px] leading-[60px]">$230M</p>
          <p className="font-semibold text-lg">Valuation</p>
        </div>
        <div className="text-center w-fit h-fit">
          <p className="font-extrabold text-[40px] leading-[60px]">31,934</p>
          <p className="font-semibold text-lg">Projects</p>
        </div>
        <div className="text-center w-fit h-fit">
          <p className="font-extrabold text-[40px] leading-[60px]">245</p>
          <p className="font-semibold text-lg">Startups IPO</p>
        </div>
        <div className="text-center w-fit h-fit">
          <p className="font-extrabold text-[40px] leading-[60px]">9/10</p>
          <p className="font-semibold text-lg">Successful</p>
        </div>
        <div className="text-center w-fit h-fit">
          <p className="font-extrabold text-[40px] leading-[60px]">562</p>
          <p className="font-semibold text-lg">Companies</p>
        </div>
      </div>
    </section>
  )
}
