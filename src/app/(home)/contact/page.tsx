"use client";
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactPage = () => {
  return (
    <div className="bg-transparent min-h-screen">
      {/* Hero Section */}
      <section className="w-11/12 mx-auto pt-16 lg:pt-24 text-center space-y-4">
        <h1 className="text-4xl lg:text-7xl font-extrabold text-white tracking-tight">
          Get in <span className="text-primary italic">Touch</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto italic">
          &quot;Have a question, feedback, or a brilliant partnership idea? We&apos;re all ears. Reach out and let&apos;s start the conversation!&quot;
        </p>
        <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
      </section>

      {/* Main Content: Info & Form */}
      <section className="w-11/12 mx-auto py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left Column: Contact Info */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white tracking-tight">
                Contact <span className="text-secondary italic">Information</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                We&apos;re here to help you make your next event a success. Our team usually responds within 2 hours during business hours.
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-6">
              {[
                {
                  label: "Office Address",
                  value: "123 Event Avenue, Creative Suite 404, Dhaka, BD",
                  icon: <FaMapMarkerAlt />,
                },
                {
                  label: "Direct Email",
                  value: "hello@eventplatform.com",
                  icon: <FaEnvelope />,
                },
                {
                  label: "Phone Support",
                  value: "+880 1234-567890",
                  icon: <FaPhoneAlt />,
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 items-start group">
                  <div className={`text-2xl p-4 rounded-2xl bg-gray-900 border border-white/10 text-primary transition-all group-hover:bg-primary group-hover:text-white duration-300`}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">{item.label}</h4>
                    <p className="text-slate-400">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-8">
              <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-sm">Follow the Movement</h4>
              <div className="flex gap-4">
                {[
                  { icon: <FaFacebookF />, href: "https://facebook.com" },
                  { icon: <FaTwitter />, href: "https://twitter.com" },
                  { icon: <FaInstagram />, href: "https://instagram.com" },
                  { icon: <FaLinkedinIn />, href: "https://linkedin.com" },
                ].map((soc, idx) => (
                  <a 
                    key={idx} 
                    href={soc.href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary hover:border-primary transition-all cursor-pointer bg-white/5"
                  >
                    {soc.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-br from-primary/30 to-secondary/30 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-gray-900/60 p-8 lg:p-12 rounded-[2.5rem] border border-white/10 backdrop-blur-xl shadow-2xl space-y-8">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Send us a Message</h3>
                <p className="text-slate-500 text-sm">Drop your details below and we&apos;ll be in touch shortly.</p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-slate-700" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com" 
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-slate-700" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">Subject</label>
                  <select className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all appearance-none cursor-pointer">
                    <option>General Inquiry</option>
                    <option>Event Partnerships</option>
                    <option>Ticketing Issues</option>
                    <option>Careers</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">Your Message</label>
                  <textarea 
                    rows={4} 
                    placeholder="Tell us what's on your mind..." 
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-slate-700 resize-none"
                  ></textarea>
                </div>

                <button className="btn btn-primary btn-lg w-full rounded-full shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all py-4 font-extrabold text-lg uppercase tracking-widest">
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Optional Map Placeholder Section */}
      <section className="w-11/12 mx-auto pb-16 lg:pb-32">
        <div className="bg-gray-900 border border-white/5 rounded-[2.5rem] h-64 lg:h-96 w-full relative overflow-hidden flex items-center justify-center group flex-col space-y-4">
           <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-122.414,37.776,12.5,0/1200x600?access_token=none')] opacity-30 grayscale group-hover:grayscale-0 transition-all duration-1000"></div>
           <p className="relative text-white font-bold bg-black/60 px-6 py-2 rounded-full border border-white/10 backdrop-blur-sm shadow-xl">📍 View Interactive Global Map</p>
           <p className="relative text-slate-400 text-xs italic">Our team works remotely across three timezones.</p>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;