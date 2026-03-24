import Image from "next/image";
import newsletterImg from "@/assets/newsletter/newsletter.jpg";
import newsletterImg2 from "@/assets/newsletter/newsletter2.jpg";
import newsletterImg3 from "@/assets/newsletter/newsletter3.jpg";
import newsletterImg4 from "@/assets/newsletter/newsletter4.jpeg";
import newsletterImg5 from "@/assets/newsletter/newsletter5.jpg";
import newsletterImg6 from "@/assets/newsletter/newsletter6.jpg";

const images = [
  newsletterImg,
  newsletterImg2,
  newsletterImg3,
  newsletterImg4,
  newsletterImg5,
  newsletterImg6,
];

const Newsletter = () => {
  return (
    <section className="w-11/12 mx-auto py-8 lg:py-14">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center bg-gray-900/30 border border-white/5 p-6 lg:p-12 rounded-[2.5rem] backdrop-blur-sm shadow-2xl overflow-hidden relative group">
        {/* Background Decorative Element */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full"></div>

        {/* Left Side: Text & Subscription */}
        <div className="w-full lg:w-1/2 space-y-8 z-10">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
              Stay in the <span className="text-primary italic">Loop</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
              Join 10,000+ event lovers! Get exclusive updates, early access to tickets, and weekly personalized event recommendations.
            </p>
          </div>

          <form className="relative max-w-md group/input">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-slate-950/50 border border-white/10 text-white px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-600 grow"
                required
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
              >
                Subscribe Now
              </button>
            </div>
            <p className="text-[10px] text-slate-500 mt-3 px-4 italic">
              *By subscribing, you agree to our privacy policy and terms of service.
            </p>
          </form>
        </div>

        {/* Right Side: Grid of Images */}
        <div className="w-full lg:w-1/2 z-10">
          <div className="grid grid-cols-3 gap-3">
            {images.map((img, index) => (
              <div 
                key={index} 
                className={`relative overflow-hidden rounded-2xl aspect-square shadow-lg border border-white/5 transition-all duration-500 hover:scale-105 hover:z-20 hover:shadow-primary/20 cursor-pointer ${
                  index % 2 === 0 ? "translate-y-4" : "-translate-y-4"
                } hover:translate-y-0`}
              >
                <Image
                  src={img}
                  alt={`Newsletter image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 33vw, (max-width: 1200px) 15vw, 150px"
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/10 opacity-0 hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;