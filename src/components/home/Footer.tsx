import Link from "next/link";
import {
  FaXTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";
import { MdOutlineLocationOn, MdOutlinePhone, MdOutlineEmail } from "react-icons/md";
import { FiArrowRight } from "react-icons/fi";
import Logo from "../shared/Logo";

// ─── Data ─────────────────────────────────────────────────────────────────────
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Events", href: "/explore" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Dashboard", href: "/dashboard" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Refund Policy", href: "/refund" },
];

const socialLinks = [
  { label: "Twitter / X", href: "https://twitter.com", icon: <FaXTwitter /> },
  { label: "Facebook", href: "https://facebook.com", icon: <FaFacebookF /> },
  { label: "Instagram", href: "https://instagram.com", icon: <FaInstagram /> },
  { label: "LinkedIn", href: "https://linkedin.com", icon: <FaLinkedinIn /> },
  { label: "YouTube", href: "https://youtube.com", icon: <FaYoutube /> },
];

const contactDetails = [
  {
    icon: <MdOutlineLocationOn className="text-lg shrink-0 mt-0.5" />,
    text: "123 Event Street, Suite 500, New York, NY 10001",
  },
  {
    icon: <MdOutlinePhone className="text-lg shrink-0" />,
    text: "+1 (800) 123-4567",
  },
  {
    icon: <MdOutlineEmail className="text-lg shrink-0" />,
    text: "hello@eventera.com",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-16 overflow-hidden">
      {/* Top gradient divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-linear-to-r from-transparent via-[#5f9598]/60 to-transparent" />

      {/* Ambient glow blobs */}
      <div className="absolute top-10 -left-40 w-96 h-96 bg-[#5f9598]/8 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-[#1d546d]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative bg-gray-900/40 backdrop-blur-sm border-t border-white/5">
        {/* ── Main grid ── */}
        <div className="w-11/12 mx-auto max-w-7xl pt-14 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

            {/* Column 1 — Brand + Social */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <Logo></Logo>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                  Discover, create, and experience unforgettable events. Your
                  premier destination for everything happening around you.
                </p>
              </div>

              {/* Social icons */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
                  Follow Us
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/8 text-slate-400 hover:text-[#5f9598] hover:bg-[#5f9598]/10 hover:border-[#5f9598]/30 hover:scale-110 transition-all duration-200"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2 — Navigation */}
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Navigation
              </p>
              <ul className="space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-sm text-slate-400 hover:text-[#5f9598] transition-colors duration-200"
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-[#5f9598] transition-all duration-200 rounded-full" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 — Legal */}
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Legal
              </p>
              <ul className="space-y-2.5">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-sm text-slate-400 hover:text-[#5f9598] transition-colors duration-200"
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-[#5f9598] transition-all duration-200 rounded-full" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 — Contact */}
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Contact Us
              </p>
              <ul className="space-y-3">
                {contactDetails.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-400">
                    <span className="text-[#5f9598]">{item.icon}</span>
                    <span className="leading-relaxed">{item.text}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 mt-2 text-xs font-semibold text-[#5f9598] border border-[#5f9598]/30 px-4 py-2 rounded-full hover:bg-[#5f9598]/10 hover:border-[#5f9598]/60 transition-all duration-200 hover:scale-105"
              >
                Send us a message
                <FiArrowRight className="text-sm" />
              </Link>
            </div>
          </div>

          {/* Divider */}
          <div className="my-8 h-px bg-linear-to-r from-transparent via-white/8 to-transparent" />

          {/* Bottom bar */}
          <div className="flex flex-col items-center justify-between gap-3">
            <p className="text-lg text-slate-500 text-center">
              &copy; {currentYear}{" "}
              <span className="text-[#5f9598] font-medium">EventEra</span>. All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;