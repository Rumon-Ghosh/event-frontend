"use client";

import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();
  return (
    <div className="relative">
      <button
        className="absolute -top-12 -left-12 cursor-pointer"
        onClick={() => router.back()}>
       ⬅️ Back to 
      </button>
      <form className="space-y-2">
        {/* <div>
          <label className="label font-semibold" htmlFor="file">Upload Image</label>
          <input className="file mt-0.5" placeholder="Profile Image" type="file" id="file" />
        </div> */}
        <div>
          <label className="label font-semibold" htmlFor="name">Name</label>
          <input className="input mt-0.5" placeholder="Your Name" type="text" id="name" />
        </div>
        <div>
          <label className="label font-semibold" htmlFor="email">Email</label>
          <input className="input mt-0.5" placeholder="Your Email" type="email" id="email" />
        </div>
        <div>
          <label className="label font-semibold" htmlFor="password">Password</label>
          <input className="input mt-0.5" placeholder="Your Password" type="password" id="password" />
        </div>
        <div className="mt-4">
          <input className="btn btn-primary w-full" type="submit" value="Register" />
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
