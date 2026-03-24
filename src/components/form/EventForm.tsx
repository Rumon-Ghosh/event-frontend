"use client";
import { useAuth } from "@/providers/AuthProvider";
import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import Image from "next/image";
import {
  FaCloudUploadAlt,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaDollarSign,
  FaUsers,
} from "react-icons/fa";
import uploadImage from "@/utils/uploadImage";
import { useRouter } from "next/navigation";

interface EventFormData {
  title: string;
  description: string;
  location: string;
  price: number;
  capacity: number;
  date: Date;
  image:  FileList;
}

const EventForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EventFormData>();

  const onSubmit = async (data: EventFormData) => {
    const { title, capacity, location, price, description, image, date } = data;

    const imageFile = image?.[0];

    if (!imageFile) {
      toast.error("Image is required");
      return;
    }
    setLoading(true);
    try {

      const uploadedImageUrl = await uploadImage(imageFile);
      setPreview(uploadedImageUrl); // Set preview to show the uploaded image
      if (!uploadedImageUrl) {
        toast.error("Failed to upload image. Please try again.");
        return;
      }

      const payload = {
        title: title,
        description: description,
        location: location,
        price: Number(price),
        capacity: Number(capacity),
        image: uploadedImageUrl,
        date: date,
        createdBy: user?._id || user?.id,
        status: "pending",
      };

      const res = await axiosSecure.post("/events", payload);

      if (res.data.success) {
        toast.success("Event created successfully! Waiting for approval.");
        reset();
        router.push("/explore");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 lg:p-10 bg-gray-900/60 border border-white/10 rounded-[2.5rem] shadow-2xl backdrop-blur-xl relative overflow-hidden group">
      {/* Background Decor */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/20 blur-[60px] rounded-full"></div>

      <div className="relative z-10">
        <div className="mb-10 text-center lg:text-left space-y-2">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Create New <span className="text-secondary italic">Event</span>
          </h2>
          <p className="text-slate-400">
            Fill in the details to launch your next masterpiece.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Title Section */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest px-1 text-slate-500">
              Event Title
            </label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              placeholder="e.g. Summer Music Festival 2026"
              className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-slate-700 font-medium"
            />
            {errors.title && (
              <p className="text-error text-xs mt-1 ml-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Price */}
            <div className="space-y-2 relative">
              <label className="text-xs font-bold uppercase tracking-widest px-1 text-slate-500">
                Price (USD)
              </label>
              <div className="relative group/field">
                <FaDollarSign className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 transition-colors group-focus-within/field:text-primary" />
                <input
                  type="number"
                  {...register("price", {
                    required: "Price is required",
                    min: 0,
                  })}
                  placeholder="0.00"
                  className="w-full bg-black/40 border border-white/5 rounded-2xl pl-12 pr-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-slate-700"
                />
              </div>
            </div>

            {/* Capacity */}
            <div className="space-y-2 relative">
              <label className="text-xs font-bold uppercase tracking-widest px-1 text-slate-500">
                Max Capacity
              </label>
              <div className="relative group/field">
                <FaUsers className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 transition-colors group-focus-within/field:text-primary" />
                <input
                  type="number"
                  {...register("capacity", {
                    required: "Capacity is required",
                    min: 1,
                  })}
                  placeholder="50"
                  className="w-full bg-black/40 border border-white/5 rounded-2xl pl-12 pr-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-slate-700 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2 relative">
            <label className="text-xs font-bold uppercasetracking-widest px-1 text-slate-500">
              Venue Location
            </label>
            <div className="relative group/field">
              <FaMapMarkerAlt className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 transition-colors group-focus-within/field:text-primary" />
              <input
                type="text"
                {...register("location", { required: "Location is required" })}
                placeholder="City Hall, Downtown or Online"
                className="w-full bg-black/40 border border-white/5 rounded-2xl pl-12 pr-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-slate-700 font-medium"
              />
            </div>
          </div>

          {/* date */}
          <div className="space-y-2 relative">
            <label className="text-xs font-bold uppercasetracking-widest px-1 text-slate-500">
              Event Date
            </label>
            <div className="relative group/field">
              <FaMapMarkerAlt className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 transition-colors group-focus-within/field:text-primary" />
              <input
                type="date"
                {...register("date", { required: "Date is required" })}
                placeholder="City Hall, Downtown or Online"
                className="w-full bg-black/40 border border-white/5 rounded-2xl pl-12 pr-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-slate-700 font-medium"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest px-1 text-slate-500">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              rows={5}
              placeholder="Tell us about the event experience, schedule, and any special requirements..."
              className="w-full bg-black/40 border border-white/5 rounded-3xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-slate-700 resize-none font-medium leading-relaxed"
            ></textarea>
          </div>

          {/* Image Upload Area */}
          <div className="space-y-4">
            <label className="text-xs font-bold uppercase  tracking-widest px-1 flex items-center gap-2 text-slate-500">
              Event Poster{" "}
              <span className="lowercase font-normal text-slate-600">
                (Recommended 16:9 ratio)
              </span>
            </label>
            <div className="relative group/upload h-64 w-full">
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                {...register("image", { required: "Image is required" })}
              />
              <div
                className={`absolute inset-0 border-2 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center transition-all ${preview ? "border-primary/50" : "border-white/10 group-hover/upload:border-primary/30 group-hover/upload:bg-primary/5"}`}
              >
                {preview ? (
                  <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden">
                    <Image
                      src={preview}
                      alt="Upload preview"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/upload:opacity-100 transition-opacity">
                      <FaCloudUploadAlt className="text-5xl text-white" />
                      <p className="text-white font-bold ml-3 uppercase tracking-widest text-sm">
                        Change Image
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <FaCloudUploadAlt className="text-5xl text-slate-600 group-hover/upload:text-primary transition-colors duration-300" />
                    <p className="mt-4 text-slate-500 font-bold uppercase tracking-widest text-xs">
                      Drag and drop or click to upload
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Hidden/Automatic Note */}
          <div className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/10 rounded-2xl">
            <FaCalendarAlt className="text-primary text-xl shrink-0" />
            <p className="text-xs text-primary/70 font-medium leading-relaxed">
              As per policy, the{" "}
              <span className="font-extrabold text-primary">Event Date</span> is
              set to today and{" "}
              <span className="font-extrabold text-primary">Status</span> is
              marked as pending review.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-lg w-full rounded-full shadow-xl shadow-primary/20 transition-all py-4 font-extrabold text-lg uppercase tracking-widest disabled:opacity-50 group-hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3"
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Launch Event"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
