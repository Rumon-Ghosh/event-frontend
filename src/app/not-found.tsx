import Link from "next/link";
import React from "react";
import { HiHome, HiQuestionMarkCircle } from "react-icons/hi2";

const NotFoundPage = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-base-100 overflow-hidden">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />

      <div className="relative z-10 w-full max-w-2xl px-6 text-center">
        {/* Animated Icon Container */}
        <div className="mb-8 inline-flex items-center justify-center w-24 h-24 bg-base-200/50 backdrop-blur-xl border border-base-content/5 rounded-3xl shadow-2xl animate-bounce">
          <HiQuestionMarkCircle className="w-12 h-12 text-teal-600 dark:text-teal-400" />
        </div>

        {/* Hero Section */}
        <h1 className="text-[120px] md:text-[180px] font-black leading-none tracking-tight text-transparent bg-clip-text bg-linear-to-b from-base-content to-base-content/20 select-none">
          404
        </h1>
        
        <div className="mt-4 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-base-content">
            Wait, where am I?
          </h2>
          <p className="text-lg text-base-content/60 max-w-md mx-auto leading-relaxed">
            It looks like this event has moved, sold out, or never existed in this timeline. Don't worry, we'll get you back on track!
          </p>
        </div>

        {/* Navigation Actions */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-2xl shadow-[0_8px_30px_rgb(20,184,166,0.2)] hover:shadow-[0_8px_40px_rgb(20,184,166,0.3)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
          >
            <HiHome className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span>Return to Surface</span>
            <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-white/20 transition-all" />
          </Link>
          
          <Link
            href="/contact"
            className="px-8 py-4 bg-base-200 hover:bg-base-300 text-base-content font-semibold rounded-2xl transition-all duration-300 hover:-translate-y-1 active:scale-95 border border-base-content/5"
          >
            Report an Issue
          </Link>
        </div>

        {/* Footer/Meta */}
        <p className="mt-16 text-sm text-base-content/40 font-mono tracking-widest uppercase">
          Error Code: PAGE_NOT_FOUND_BY_ENTERA
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;