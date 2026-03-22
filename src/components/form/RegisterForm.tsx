"use client";

import uploadImage from "@/utils/uploadImage";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";

type Inputs = {
  name: string;
  email: string;
  password: string;
  image: FileList;
};

const RegisterForm = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const handleRegister = async (data: Inputs): Promise<void> => {
    const { name, email, password, image } = data;
    const imageFile = image?.[0];

    if (!imageFile) {
      setErrorMsg("Image is required");
      return;
    }

    try {
      setIsRegistering(true);
      setErrorMsg("");

      // 1. Upload image to get URL
      const uploadedImageUrl = await uploadImage(imageFile);
      if (!uploadedImageUrl) {
        setErrorMsg("Failed to upload image. Please try again.");
        setIsRegistering(false);
        return;
      }

      // 2. Register User
      const registerData = {
        name,
        email,
        password,
        image: uploadedImageUrl,
      };

      const response = await fetch("http://localhost:5000/api/v1/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });

      const result = await response.json();

      if (result.success) {
        // Redirect to login or home
        router.push("/"); // adjust based on your app's routes
      } else {
        setErrorMsg(result.message || "Registration failed");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred");
    } finally {
      setIsRegistering(false);
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
      <form onSubmit={handleSubmit(handleRegister)} className="space-y-2">
        <div>
          <label className="label font-semibold" htmlFor="file">
            Upload Image
          </label>
          <label
            htmlFor="file"
            className="mt-1 flex h-28 w-28 cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-primary/70 bg-secondary/20 text-center text-sm font-medium text-base-content transition hover:border-primary hover:bg-secondary/30"
          >
            <span className="px-4 leading-tight">
              Add
              <br />
              Photo
            </span>
          </label>
          <input
            className="hidden"
            placeholder="Profile Image"
            type="file"
            id="file"
            accept="image/*"
            {...register("image", { required: true })}
          />
        </div>
        <div>
          <label className="label font-semibold" htmlFor="name">
            Name
          </label>
          <input
            className="input mt-0.5"
            placeholder="Your Name"
            type="text"
            id="name"
            {...register("name", { required: true })}
          />
          {errors.name && <p className="mt-px text-sm">Name field is required</p>}
        </div>
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
          {errorMsg && <p className="mb-2 text-sm text-red-500">{errorMsg}</p>}
          <input
            className="btn btn-primary w-full"
            type="submit"
            value={isRegistering ? "Registering..." : "Register"}
            disabled={isRegistering}
          />
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
