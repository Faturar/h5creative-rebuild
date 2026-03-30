"use client"

import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"
import { Play, Users, ShoppingCart, X } from "lucide-react"

// Import CSS Swiper
import "swiper/css"
import "swiper/css/pagination"

// Data Mockup untuk Live Stream
const liveStreams = [
  {
    id: 1,
    title: "Flash Sale Raya",
    category: "Fashion",
    viewers: "12.5K",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&auto=format&fit=crop",
    buyer: "Siti Aminah",
    product: "Gamis Syar'i",
  },
  {
    id: 2,
    title: "Skincare Viral",
    category: "Beauty",
    viewers: "8.2K",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=600&auto=format&fit=crop",
    buyer: "Dian Sastro",
    product: "Serum Glowing",
  },
  {
    id: 3,
    title: "Gadget Terbaru",
    category: "Tech",
    viewers: "5.4K",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop",
    buyer: "Andi Wijaya",
    product: "iPhone 15 Pro",
  },
  {
    id: 4,
    title: "Makanan Sehat",
    category: "F&B",
    viewers: "3.1K",
    image:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=600&auto=format&fit=crop",
    buyer: "Budi Santoso",
    product: "Paket Diet",
  },
  {
    id: 5,
    title: "Home Decor",
    category: "Lifestyle",
    viewers: "9.8K",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?q=80&w=600&auto=format&fit=crop",
    buyer: "Rina Nose",
    product: "Lampu Gantung",
  },
]

// Komponen Notifikasi "Sedang Membeli" dengan Animasi
const BuyingNotification = ({
  name,
  product,
}: {
  name: string
  product: string
}) => {
  return (
    <div className="absolute right-2 bottom-24 bg-white/95 backdrop-blur-sm shadow-lg rounded-lg p-2 flex items-center gap-2 max-w-[140px] animate-slide-up-fade z-20 border border-gray-100">
      <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
        <img
          src={`https://ui-avatars.com/api/?name=${name}&background=random`}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold text-gray-900 truncate">{name}</p>
        <p className="text-[9px] text-gray-500 truncate">
          sedang membeli {product}
        </p>
      </div>
      <div className="text-[10px] text-green-600 font-bold">●</div>
    </div>
  )
}

export default function LiveStreamSlider() {
  return (
    <section className="w-full bg-[#0f172a] py-20 px-4 md:px-8 overflow-hidden relative">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0f172a] to-[#0f172a]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Text */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Imagine Your Product Here With{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Studio-Grade Setup
            </span>
          </h2>
          <p className="text-blue-200 text-lg">
            Pro Hosts, Sales-Ready Live Commerce
          </p>
        </div>

        {/* Swiper Component */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1.2}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2.2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3.2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 4.2,
              spaceBetween: 30,
            },
          }}
          className="!pb-16"
        >
          {liveStreams.map((stream) => (
            <SwiperSlide key={stream.id}>
              <div className="group relative rounded-2xl overflow-hidden aspect-[9/16] bg-gray-800 shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-blue-900/20 cursor-pointer border border-white/5">
                {/* Background Image */}
                <img
                  src={stream.image}
                  alt={stream.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90"></div>

                {/* Top UI: LIVE Badge & Viewers */}
                <div className="absolute top-3 left-3 z-10">
                  <div className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 shadow-lg">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                    LIVE
                  </div>
                </div>

                <div className="absolute top-3 right-3 z-10">
                  <div className="bg-black/40 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-1 rounded flex items-center gap-1">
                    <Users className="w-3 h-3" /> {stream.viewers}
                  </div>
                </div>

                {/* Center: Play Button (Hover effect) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40">
                    <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                  </div>
                </div>

                {/* Buying Notification (Animated) */}
                <BuyingNotification
                  name={stream.buyer}
                  product={stream.product}
                />

                {/* Bottom UI: Title & Category */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-blue-300 text-[10px] font-bold uppercase tracking-wider mb-1">
                        {stream.category}
                      </p>
                      <h3 className="text-white font-bold text-lg leading-tight mb-1">
                        {stream.title}
                      </h3>
                      <p className="text-gray-300 text-xs flex items-center gap-1">
                        <ShoppingCart className="w-3 h-3 text-green-400" />
                        Promo aktif sekarang
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom CSS Animation for Slide Up */}
      <style jsx global>{`
        @keyframes slide-up-fade {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          10% {
            opacity: 1;
            transform: translateY(0);
          }
          90% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-20px);
          }
        }
        .animate-slide-up-fade {
          animation: slide-up-fade 4s infinite ease-in-out;
        }

        /* Custom Pagination Color */
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.3);
        }
        .swiper-pagination-bullet-active {
          background: #60a5fa; /* Blue-400 */
        }
      `}</style>
    </section>
  )
}
