"use client";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { TEvent } from "@/types/Event";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, {  useEffect, useState } from "react";
import {
  HiOutlineArrowRight,
  HiOutlineMapPin,
  HiOutlineUsers,
} from "react-icons/hi2";
import { TbCurrencyDollar } from "react-icons/tb";
import toast from "react-hot-toast";
import { useAuth } from "@/providers/AuthProvider";

const EventDetails = ({ id }: { id: string }) => {
  const axiosSecure = useAxiosSecure();
  const { user, loading: authLoading } = useAuth();
  const [eventById, setEventById] = useState<TEvent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const router = useRouter();
  
  const handleIncrement = () => {
    if (eventById && quantity < eventById.capacity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const fetchEventById = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get(`/events/${id}`);
        setEventById(res.data.data);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching event details:", err);
        setError("Failed to load event details.");
      } finally {
        setLoading(false);
      }
    };
    fetchEventById();
  }, [id, axiosSecure]);

  const handleBookingEvent = async () => {
    if (!eventById) return;
    try {
      const payload = {
        eventId: eventById._id,
        quantity: quantity,
      };
      // Call your booking API endpoint here
      const res = await axiosSecure.post("/orders", payload);
      if (res.data.success) {
        toast.success("Event booked successfully!");
        router.push("/")
      }
    } catch (err: any) {
      console.error("Error booking event:", err);
      setError("Failed to book event.");
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

  if (loading || !eventById || authLoading)
    return (
      <div className="flex justify-center items-center min-h-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side: Image */}
        <div className="md:w-1/2 relative h-64 md:h-auto">
          {eventById.image ? (
            <Image
              src={eventById.image}
              alt={eventById.title}
              className="absolute inset-0 w-full h-full object-cover"
              width={500}
              height={300}
              loading="eager"
            />
          ) : (
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400">
              <span className="text-xl">No Image Available</span>
            </div>
          )}
        </div>

        {/* Right Side: Details */}
        <div className="md:w-1/2 p-8 lg:p-12 flex flex-col justify-between">
          <div>
            <div className="mb-2 text-teal-600 font-semibold tracking-wide uppercase text-sm">
              {new Date(eventById.date).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
              {eventById.title}
            </h1>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {eventById.description}
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center text-gray-700">
                <HiOutlineMapPin className="mr-3 h-6 w-6 text-teal-500" />
                <span className="text-lg font-medium">{eventById.location}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <HiOutlineUsers className="mr-3 h-6 w-6 text-teal-500" />
                <span className="text-lg font-medium">Available: {eventById.capacity}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <TbCurrencyDollar className="mr-3 h-6 w-6 text-teal-500" />
                <span className="text-lg font-medium">Price: ${eventById.price}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6 mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
              <div className="text-3xl font-bold text-teal-600">
                {eventById.price === 0 ? "Free" : `$${eventById.price * quantity}`}
              </div>
              
              <div className="flex items-center space-x-4 bg-gray-50 rounded-xl p-2 border border-gray-100">
                <span className="text-gray-500 text-sm font-medium mr-2">Quantity</span>
                <button 
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                  className="w-10 h-10 rounded-lg flex items-center justify-center bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <span>-</span> 
                </button>
                <span className="text-xl font-bold w-6 text-center text-gray-800">{quantity}</span>
                <button 
                  onClick={handleIncrement}
                  disabled={!!eventById && quantity >= eventById.capacity}
                  className="w-10 h-10 rounded-lg flex items-center justify-center bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <span>+</span>
                </button>
              </div>
            </div>
            
            <button
              disabled={user?.role !== "user"}
              onClick={handleBookingEvent}
              className={`w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-8 rounded-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex justify-center items-center text-lg ${user?.role !== "user" ? "cursor-not-allowed" : "cursor-pointer"}`}>
              <span>Book Now</span>
              <HiOutlineArrowRight className="ml-2 h-6 w-6" />
            </button>
            {
              user?.role !== "user" && <p className="text-lg font-medium text-red-500 mt-2 text-center">Only a customer can book event!</p>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
