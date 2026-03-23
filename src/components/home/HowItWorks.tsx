import React from "react";

const steps = [
  {
    id: "01",
    title: "Create Account",
    desc: "Join our vibrant community by creating a simple profile. It's quick, easy, and secure.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    id: "02",
    title: "Discover Events",
    desc: "Explore thousands of events happening around you. Filter by category, location, or date.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    id: "03",
    title: "Book & Pay",
    desc: "Secure your spot instantly with our streamlined booking and secure payment gateway.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5z" />
      </svg>
    ),
  },
  {
    id: "04",
    title: "Join & Enjoy",
    desc: "Get your digital ticket, head to the venue, and create memories that will last a lifetime.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const HowItWorks = () => {
  return (
    <section className="w-11/12 mx-auto py-8 lg:py-12 overflow-hidden">
      {/* Header Section */}
      <div className="text-center mb-8 lg:mb-14 space-y-2">
        <h2 className="text-3xl lg:text-5xl font-extrabold text-white tracking-tight">
          How it <span className="text-secondary italic">Works</span>
        </h2>
        <div className="w-20 h-1.5 bg-secondary mx-auto rounded-full"></div>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto pt-2">
          Simplify your event management and attendance in four simple steps.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
        {/* Connection Line (Desktop) */}
        <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-linear-to-r from-transparent via-white/10 to-transparent"></div>

        {steps.map((step) => (
          <div key={step.id} className="relative flex flex-col items-center text-center group">
            {/* Step Number/Icon Circle */}
            <div className="relative mb-8">
              {/* Outer Glow */}
              <div className="absolute inset-0 bg-secondary blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              
              {/* Circle */}
              <div className="relative w-20 h-20 rounded-full bg-gray-900/60 border border-white/10 flex items-center justify-center text-white transition-all duration-500 group-hover:border-secondary group-hover:bg-secondary/10 group-hover:scale-110">
                <div className="text-secondary group-hover:text-white transition-colors duration-300">
                  {step.icon}
                </div>
                
                {/* ID Badge */}
                <span className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-white shadow-lg border-2 border-slate-900">
                  {step.id}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-3 px-4">
              <h3 className="text-xl font-bold text-white group-hover:text-secondary transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-slate-400 text-base leading-relaxed">
                {step.desc}
              </p>
            </div>
            
            {/* Visual Indicator (Mobile) */}
            <div className="w-px h-12 bg-linear-to-b from-white/10 to-transparent my-6 md:hidden last:hidden"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;