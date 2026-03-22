"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

type Inputs = {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const handleLogin = async (data: Inputs): Promise<void> => {
    const { email, password } = data;
    try {
      setIsLoggingIn(true);
      const response = await fetch("http://localhost:5000/api/v1/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
    } catch (err: any) {
      console.error("Login error:", err.message);
    } finally {
      setIsLoggingIn(false);
    }
  }

  return (
    <div className='relative'>
      <button
        type="button"
        className="absolute -top-20 -left-20 cursor-pointer"
        onClick={() => router.back()}
      >
       ⬅️ Back
      </button>
      <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-4">
        <div>
          <label className="label font-semibold" htmlFor="email">
            Email
          </label>
          <input
            className="input mt-0.5"
            placeholder="Your Email"
            type="email"
            id="email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="mt-px text-sm">Email field is required</p>
          )}
        </div>
        <div>
          <label className="label font-semibold" htmlFor="password">
            Password
          </label>
          <input
            className="input mt-0.5"
            placeholder="Your Password"
            type="password"
            id="password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="mt-px text-sm">Password field is required</p>
          )}
        </div>
        <div className="mt-4">
          <input
            className="btn btn-primary w-full"
            type="submit"
            value={isLoggingIn ? "Logging in..." : "Login"}
            disabled={isLoggingIn}
          />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;