"use client";

import React, { useState } from "react";
import uploadImage from "@/utils/uploadImage";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import toast from "react-hot-toast";

type Inputs = {
  name: string;
  email: string;
  role: "user" | "organizer";
  password: string;
  image: FileList;
};

const RegisterForm = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter();
  const { registerUser } = useAuth();

  const [preview, setPreview] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      role: "" as "user" | "organizer",
    },
  });

  const selectedImage = watch("image");
  React.useEffect(() => {
    if (selectedImage && selectedImage[0]) {
      const url = URL.createObjectURL(selectedImage[0]);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [selectedImage]);

  const handleRegister = async (data: Inputs): Promise<void> => {
    const { name, email, role, password, image } = data;
    const imageFile = image?.[0];

    if (!imageFile) {
      toast.error("Image is required");
      return;
    }

    try {
      setIsRegistering(true);

      // 1. Upload image to get URL
      const uploadedImageUrl = await uploadImage(imageFile);
      if (!uploadedImageUrl) {
        toast.error("Failed to upload image. Please try again.");
        return;
      }

      // 2. Register User
      const registerData = {
        name,
        email,
        role,
        password,
        image: uploadedImageUrl,
      };

      await registerUser(registerData);
      toast.success("Registration successful!");
      router.push("/");
    } catch (err: any) {
      console.error("Registration error:", err);
      toast.error(
        err.message || "An unexpected error occurred during registration",
      );
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
      <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
        <div className="flex flex-col items-center sm:items-start">
          <label className="label font-semibold" htmlFor="file">
            Upload Image
          </label>
          <label
            htmlFor="file"
            className="mt-1 flex h-28 w-28 cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-primary/70 bg-secondary/20 text-center text-sm font-medium text-base-content transition hover:border-primary hover:bg-secondary/30 overflow-hidden"
          >
            {preview ? (
              <img src={preview} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              <span className="px-4 leading-tight">
                Add
                <br />
                Photo
              </span>
            )}
          </label>
          <input
            className="hidden"
            placeholder="Profile Image"
            type="file"
            id="file"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
          />
          {errors.image && (
            <p className="mt-1 text-sm text-red-500">{errors.image.message}</p>
          )}
        </div>
        <div>
          <label className="label font-semibold" htmlFor="name">
            Name
          </label>
          <input
            className="input mt-1"
            placeholder="Your Name"
            type="text"
            id="name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
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
          <label className="label font-semibold" htmlFor="role">
            Select Role
          </label>
          <select
            className="select mt-1"
            id="role"
            {...register("role", { required: "Role is required" })}
            defaultValue=""
          >
            <option value="" disabled>
              Choose a role
            </option>
            <option value="user">User</option>
            <option value="organizer">Organizer</option>
          </select>
          {errors.role && (
            <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>
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
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="mt-6">
          <button
            className="btn btn-primary w-full"
            type="submit"
            disabled={isRegistering}
          >
            {isRegistering ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
      <p className="text-sm text-muted-foreground mt-4 text-center">
        Already have an account?{" "}
        <Link href={`/login`} className="text-primary hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
