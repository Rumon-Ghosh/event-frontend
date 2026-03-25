"use client";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { TEvent } from "@/types/Event";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, {  useEffect, useState } from "react";
import toast from "react-hot-toast";

const EventDetails = ({ id }: { id: string }) => {
  const axiosSecure = useAxiosSecure();
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

  if (loading || !eventById)
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
                <svg className="w-6 h-6 mr-3 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span className="text-lg font-medium">{eventById.location}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <svg className="w-6 h-6 mr-3 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <span className="text-lg font-medium">Available: {eventById.capacity}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <svg className="w-6 h-6 mr-3 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
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
              onClick={handleBookingEvent}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-8 rounded-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex justify-center items-center text-lg">
              <span>Book Now</span>
              <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
