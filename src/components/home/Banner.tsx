"use client";
import Image from "next/image";
import heroImg from "@/assets/event-hero.jpg";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const swiperPara = [
  { 
    id: 1, 
    head: "Discover Events", 
    desc: "Explore a wide range of events happening around you. From music festivals to workshops, we have it all." 
  }, 
  { 
    id: 2, 
    head: "Join the Fun", 
    desc: "Connect with like-minded people and enjoy unforgettable experiences that you will cherish forever." 
  }, 
  { 
    id: 3, 
    head: "Create Your Own", 
    desc: "Host your own events and share your passions with the world. Easy to set up and manage your own audience." 
  }
];

const Banner = () => {
  return (
    <div className="w-11/12 mx-auto my-14 lg:my-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gray-900/40 rounded-3xl overflow-hidden backdrop-blur-sm border border-white/10 shadow-2xl p-6 lg:p-12">
        {/* part 1 - Text & Swiper */}
        <div className="space-y-6 text-white min-h-75 flex flex-col justify-center">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-tight">
            Elevate Your <span className="text-primary italic">Experience</span>
          </h1>
          
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="w-full text-slate-300"
          >
            {swiperPara.map((slide) => (
              <SwiperSlide key={slide.id} className="pb-10">
                <div className="space-y-3">
                  <h3 className="text-xl lg:text-2xl font-semibold text-white">
                    {slide.head}
                  </h3>
                  <p className="text-base lg:text-lg leading-relaxed max-w-lg">
                    {slide.desc}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          <div className="pt-2 md:pt-4">
            <button className="btn btn-primary btn-lg rounded-full px-8 shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
              Get Started
            </button>
          </div>
        </div>

        {/* part 2 - Visual */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-primary/50 to-secondary/50 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border border-white/5 w-full h-60">
            <Image
              src={heroImg}
              alt="Exciting events happening now"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              priority
              fill
            />
            <div className="absolute inset-0 bg-linear-to-t from-gray-900/80 via-transparent to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
