"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';
import toast from 'react-hot-toast';

type Inputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const router = useRouter();
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const handleLogin = async (data: Inputs): Promise<void> => {
    try {
      setIsLoggingIn(true);
      await login(data);
      toast.success("Login successful!");
      router.push("/");
    } catch (err: any) {
      console.error("Login error:", err);
      toast.error(err.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="absolute -top-20 -left-20 cursor-pointer"
        onClick={() => router.back()}
      >
        ⬅️ Back
      </button>
      <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
        <div>
          <label className="label font-semibold" htmlFor="email">
            Email
          </label>
          <input
            className="input mt-1"
            placeholder="Your Email"
            type="email"
            id="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="label font-semibold" htmlFor="password">
            Password
          </label>
          <input
            className="input mt-1"
            placeholder="Your Password"
            type="password"
            id="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="mt-6">
          <button
            className="btn btn-primary w-full"
            type="submit"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
      <p className="text-sm text-muted-foreground mt-4 text-center">
        Don&apos;t have an account?{" "}
        <Link
          href={`/register`}
          className="text-primary hover:underline"
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;