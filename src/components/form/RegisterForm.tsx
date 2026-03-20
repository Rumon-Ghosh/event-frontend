"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  password: string;
  image: string;
}

const RegisterForm = () => {
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const handleRegister = (data: Inputs): void => {
    console.log(data)
  }

  return (
    <div className="relative">
      <button
        className="absolute -top-20 -left-20 cursor-pointer"
        onClick={() => router.back()}>
       ⬅️ Back to 
      </button>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="space-y-2">
        {/* <div>
          <label className="label font-semibold" htmlFor="file">Upload Image</label>
          <input className="file mt-0.5" placeholder="Profile Image" type="file" id="file" />
        </div> */}
        <div>
          <label className="label font-semibold" htmlFor="name">Name</label>
          <input className="input mt-0.5" placeholder="Your Name" type="text" id="name" {...register("name",  { required: true })} />
          {errors.name && <p className="text-sm mt-px">Name field is required</p>}
        </div>
        <div>
          <label className="label font-semibold" htmlFor="email">Email</label>
          <input className="input mt-0.5" placeholder="Your Email" type="email" id="email" {...register("email", { required: true })} />
          {errors.email && <p className="text-sm mt-px">Email field is required</p>}
        </div>
        <div>
          <label className="label font-semibold" htmlFor="password">Password</label>
          <input className="input mt-0.5" placeholder="Your Password" type="password" id="password" {...register("password", {required: true})} />
          {errors.password && <p className="text-sm mt-px">Password field is required</p>}
        </div>
        <div className="mt-4">
          <input className="btn btn-primary w-full" type="submit" value="Register" />
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
