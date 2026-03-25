import React from "react";
import Image from "next/image";
import heroImg from "@/assets/event-hero.jpg"; // Re-using for design continuity
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="bg-transparent">
      {/* Hero Section */}
      <section className="w-11/12 mx-auto py-16 lg:py-24 flex flex-col items-center text-center space-y-6">
        <h1 className="text-4xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight max-w-4xl">
          Redefining the <span className="text-primary italic">Event</span> Experience
        </h1>
        <p className="text-slate-400 text-lg lg:text-xl max-w-2xl leading-relaxed">
          We&apos;re on a mission to bring people together through immersive, seamless, and unforgettable live experiences.
        </p>
        <div className="w-24 h-1.5 bg-primary rounded-full"></div>
      </section>

      {/* Our Story / mission Section */}
      <section className="w-11/12 mx-auto py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-primary to-secondary opacity-30 blur-2xl group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative aspect-video lg:aspect-square rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src={heroImg}
                alt="Our journey"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>
          <div className="space-y-8">
            <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
              Our Journey Started with a <span className="text-secondary italic">Vision</span>
            </h2>
            <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
              <p>
                Born in 2024, Event Platform was founded on a simple realization: managing and finding quality local events was too complicated. We wanted to build a bridge between passionate organizers and eager attendees.
              </p>
              <p>
                Today, we empower thousands of creators to host everything from intimate workshops to massive festivals. Our technology handles the heavy lifting—from secure payments to real-time analytics—so you can focus on making moments matter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full bg-gray-950/40 py-16 lg:py-24 my-10 border-y border-white/5 backdrop-blur-sm">
        <div className="w-11/12 mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
          <div className="space-y-2">
            <p className="text-4xl lg:text-6xl font-extrabold text-primary tracking-tighter">1M+</p>
            <p className="text-slate-400 font-semibold uppercase tracking-widest text-xs">Tickets Sold</p>
          </div>
          <div className="space-y-2">
            <p className="text-4xl lg:text-6xl font-extrabold text-secondary tracking-tighter">15K+</p>
            <p className="text-slate-400 font-semibold uppercase tracking-widest text-xs">Events Hosted</p>
          </div>
          <div className="space-y-2">
            <p className="text-4xl lg:text-6xl font-extrabold text-primary tracking-tighter">50+</p>
            <p className="text-slate-400 font-semibold uppercase tracking-widest text-xs">Cities Connected</p>
          </div>
          <div className="space-y-2">
            <p className="text-4xl lg:text-6xl font-extrabold text-secondary tracking-tighter">98%</p>
            <p className="text-slate-400 font-semibold uppercase tracking-widest text-xs">Satisfied Creators</p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="w-11/12 mx-auto py-16 lg:py-24">
        <div className="text-center mb-12 lg:mb-20">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">Our Core Values</h2>
          <div className="w-20 h-1.5 bg-secondary mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Innovation first",
              desc: "We build technology that solves real-world event problems, constantly pushing the boundaries of what's possible.",
              icon: "🚀"
            },
            {
              title: "Community Driven",
              desc: "Every feature we build is inspired by the feedback and needs of our organizers and ticket holders.",
              icon: "🤝"
            },
            {
              title: "Radical Simplicity",
              desc: "Complexity is the enemy. We strive for an intuitive, frictionless experience across every device.",
              icon: "✨"
            }
          ].map((value, idx) => (
            <div key={idx} className="bg-gray-900/40 p-10 rounded-4xl border border-white/5 backdrop-blur-md hover:border-primary/30 transition-all duration-300 group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500 inline-block">{value.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{value.title}</h3>
              <p className="text-slate-400 leading-relaxed text-lg">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-11/12 mx-auto py-12 lg:py-24">
        <div className="relative bg-linear-to-br from-primary/20 to-secondary/20 rounded-[3rem] p-12 lg:p-24 overflow-hidden border border-white/10 text-center space-y-8 group">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-10 pointer-events-none"></div>
          <h2 className="relative text-3xl lg:text-6xl font-extrabold text-white leading-tight">
             Ready to Make Your<br/>
             <span className="text-primary">Next Moment</span> Happen?
          </h2>
          <div className="relative flex flex-wrap justify-center gap-6">
            <Link
              href="/explore"
              className="btn btn-primary btn-lg rounded-full px-12 shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
              Explore Events
            </Link>
            <button className="btn btn-outline btn-lg rounded-full px-12 text-white border-white/30 hover:bg-white/10 hover:border-white">
              Host an Event
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
