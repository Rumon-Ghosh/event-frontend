"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Local Assets
import image1 from "@/assets/testimonials/jessica.jpeg";
import image2 from "@/assets/testimonials/joy.jpg";
import image3 from "@/assets/testimonials/karim.jpeg";

const testimonialData = [
  {
    id: 1,
    name: "Jessica Miller",
    role: "Event Organizer",
    image: image1,
    quote: "This platform has completely transformed how I manage my music festivals. The interface is clean, and the ticket management is top-notch. Truly a game-changer for the industry!",
    rating: 5,
  },
  {
    id: 2,
    name: "Joy Carter",
    role: "Community Manager",
    image: image2,
    quote: "Connecting with my community has never been easier. I love the smooth registration process and the ability to showcase our events with such premium visuals.",
    rating: 5,
  },
  {
    id: 3,
    name: "Karim Ahmed",
    role: "Tech Enthusiast",
    image: image3,
    quote: "As someone who attends dozens of workshops a year, this site is my go-to. Everything is intuitive, fast, and secure. Highly recommend to anyone looking for local events!",
    rating: 4,
  },
  {
    id: 4,
    name: "Sarah Jenkins",
    role: "Marketing Director",
    image: image1, // Reuse for demo
    quote: "The visual presentation of events is what sets this apart. It's sophisticated and modern. Our event attendance has increased by 40% since we switched.",
    rating: 5,
  }
];

const Testimonials = () => {
  return (
    <section className="w-11/12 mx-auto my-10 lg:my-16">
      {/* Custom Styles for Same Height Cards */}
      <style jsx global>{`
        .testimonials-swiper .swiper-slide {
          height: auto !important;
          display: flex !important;
        }
      `}</style>

      {/* Header Section */}
      <div className="text-center mb-8 lg:mb-12 space-y-4">
        <h2 className="text-3xl lg:text-5xl font-extrabold text-white tracking-tight">
          Voices of our <span className="text-primary italic">Community</span>
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto italic">
          Don&apos;t just take our word for it—see what our amazing community members have to say about their experiences.
        </p>
        <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
      </div>

      {/* Swiper Slider */}
      <div className="relative">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-14 testimonials-swiper"
        >
          {testimonialData.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="group w-full bg-gray-900/40 border border-white/5 p-8 rounded-3xl backdrop-blur-md flex flex-col justify-between transition-all duration-300 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2">
                {/* Quote Icon */}
                <div className="mb-6">
                  <svg className="w-10 h-10 text-primary opacity-40" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
                  </svg>
                </div>

                {/* Testimonial Text */}
                <p className="text-slate-300 italic text-lg leading-relaxed mb-4 grow">
                  {item.quote}
                </p>

                {/* Rating */}
                <div className="flex gap-1 mb-3 mt-auto">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < item.rating ? "text-yellow-500" : "text-gray-700"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* User Info */}
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary/60 transition-colors shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">{item.name}</h4>
                    <p className="text-primary/70 text-sm font-medium">{item.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;