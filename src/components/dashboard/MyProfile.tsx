"use client";

import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useAuth } from "@/providers/AuthProvider";
import uploadImage from "@/utils/uploadImage";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaCircleUser } from "react-icons/fa6";

type UpdateInput = {
  name: string;
  image: FileList;
};

const MyProfile = () => {
  const { user, loading, refetchUser } = useAuth();
  const [error, setError] = useState<string>("");
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const updateButtonRef = useRef<HTMLDialogElement | null>(null);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateInput>();

  const formatDate = (date?: string) => {
    if (!date) {
      return "Not available";
    }

    return new Date(date).toLocaleDateString("en-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleUpdateProfile = async (data: UpdateInput) => {
    const { name, image } = data;
    const imageFile = image?.[0];
    if (!imageFile) {
      toast.error("Image is required");
      return;
    }
    updateButtonRef.current?.close();
    try {
      setUpdateLoading(true);
      const uploadedImageUrl = await uploadImage(imageFile);
      if (!uploadedImageUrl) {
        toast.error("Failed to upload image. Please try again.");
        return;
      }

      const res = await axiosSecure.patch(`/users/${user?._id}`, {
        name,
        image: uploadedImageUrl,
      });
      if (res.data.success) {
        await refetchUser();
        toast.success("Profile updated successfully.");
      }
    } catch (err: unknown) {
      setError("Error on updating profile");
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update profile.";
      console.log(errorMessage);
      toast.error(errorMessage);
    } finally {
      setUpdateLoading(false);
    }
  };

  if (error)
    return (
      <div className="flex justify-center items-center min-h-100">
        <div className="bg-red-50 text-red-500 px-6 py-4 rounded-lg shadow-sm">
          {error}
        </div>
      </div>
    );

  if (loading || updateLoading) {
    return (
      <div className="flex justify-center items-center min-h-80">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-2xl border border-dashed border-base-300 px-6 py-12 text-center text-base-content/70">
        Profile data is not available right now.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-4xl border border-base-200 bg-linear-to-br from-base-100 to-base-200 p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            My Profile
          </p>
          <h1 className="mt-2 text-3xl font-bold text-base-content">
            {user.name}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-base-content/70">
            Manage your account details, review your role, and keep your profile
            information up to date.
          </p>
        </div>

        <button
          onClick={() => updateButtonRef.current?.showModal()}
          type="button"
          className="btn btn-primary btn-wide rounded-full"
        >
          Update Profile
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
        <div className="rounded-4xl border border-base-200 bg-base-100 p-6 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="avatar mb-4">
              <div className="w-32 rounded-full ring ring-primary/20 ring-offset-4 ring-offset-base-100">
                <Image
                  src={user?.image}
                  alt={user.name}
                  width={160}
                  height={160}
                  className="h-32 w-32 object-cover"
                />
              </div>
            </div>

            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="mt-1 text-sm text-base-content/60">{user.email}</p>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="badge badge-primary badge-outline px-4 py-3 capitalize">
                {user.role}
              </span>
              <span
                className={`badge px-4 py-3 ${
                  user.isActive ? "badge-success" : "badge-warning"
                }`}
              >
                {user.isActive ? "Active Account" : "Inactive Account"}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-4xl border border-base-200 bg-base-100 p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-base-content">
              Account Information
            </h2>
            <p className="mt-1 text-sm text-base-content/60">
              A quick overview of your current profile details.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-base-200 bg-base-200/40 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-base-content/50">
                User ID
              </p>
              <p className="mt-2 break-all text-sm font-medium text-base-content">
                {user._id}
              </p>
            </div>

            <div className="rounded-2xl border border-base-200 bg-base-200/40 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-base-content/50">
                Email Address
              </p>
              <p className="mt-2 text-sm font-medium text-base-content">
                {user.email}
              </p>
            </div>

            <div className="rounded-2xl border border-base-200 bg-base-200/40 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-base-content/50">
                Role
              </p>
              <p className="mt-2 text-sm font-medium capitalize text-base-content">
                {user.role}
              </p>
            </div>

            <div className="rounded-2xl border border-base-200 bg-base-200/40 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-base-content/50">
                Account Status
              </p>
              <p className="mt-2 text-sm font-medium text-base-content">
                {user.isActive ? "Active" : "Inactive"}
              </p>
            </div>

            <div className="rounded-2xl border border-base-200 bg-base-200/40 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-base-content/50">
                Created At
              </p>
              <p className="mt-2 text-sm font-medium text-base-content">
                {formatDate(user.createdAt)}
              </p>
            </div>

            <div className="rounded-2xl border border-base-200 bg-base-200/40 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-base-content/50">
                Last Updated
              </p>
              <p className="mt-2 text-sm font-medium text-base-content">
                {formatDate(user.updatedAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog
        ref={updateButtonRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <form
            onSubmit={handleSubmit(handleUpdateProfile)}
            className="space-y-3"
          >
            <div className="space-y-2 relative">
              <label className="text-xs font-bold uppercasetracking-widest px-1 text-slate-500">
                Change Name
              </label>
              <div className="relative group/field">
                <FaCircleUser className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 transition-colors group-focus-within/field:text-primary" />
                <input
                  type="text"
                  {...register("name", {
                    required: "Name is required",
                  })}
                  placeholder="Change your name here."
                  className="w-full bg-black/40 border border-white/5 rounded-2xl pl-12 pr-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-slate-700 font-medium"
                />
              </div>
              {errors.name && (
                <p className="text-sm mt-1 text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="space-y-2 relative">
              <label className="text-xs font-bold uppercasetracking-widest px-1 text-slate-500">
                Change Image
              </label>
              <div className="relative group/field">
                <FaCircleUser className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 transition-colors group-focus-within/field:text-primary" />
                <input
                  type="file"
                  {...register("image", {
                    required: "Image is required",
                  })}
                  placeholder="City Hall, Downtown or Online"
                  className="w-full bg-black/40 border border-white/5 rounded-2xl pl-12 pr-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-slate-700 font-medium"
                />
              </div>
              {errors.image && (
                <p className="text-sm mt-1 text-red-500">
                  {errors.image.message}
                </p>
              )}
            </div>
            <input
              className="btn btn-primary"
              type="submit"
              value="Update Profile"
            />
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyProfile;
