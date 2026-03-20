import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-1">
      <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-primary via-cyan-400 to-secondary shadow-[0_10px_30px_rgba(34,197,94,0.22)] ring-1 ring-white/40">
        <div className="absolute inset-1 rounded-[14px] border border-white/20 bg-slate-950/10" />
        <div className="absolute h-5 w-5 rounded-full border-2 border-white/90" />
        <div className="absolute h-8 w-0.5 rotate-45 rounded-full bg-white/90" />
        <div className="absolute right-2.25 top-2.25 h-2.5 w-2.5 rounded-full bg-white shadow-sm" />
      </div>

      <div className="leading-none">
        <p className="bg-linear-to-r from-primary via-cyan-500 to-secondary bg-clip-text text-[1.35rem] font-black tracking-[-0.04em] text-transparent">
          EventEra
        </p>
      </div>
    </Link>
  );
};

export default Logo;
