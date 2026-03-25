"use client";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { TEvent } from "@/types/Event";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const MyEvents = () => {
  const axiosSecure = useAxiosSecure();
  const [events, setEvent] = useState<TEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-BD", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    const getMyEvents = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get(`/events/my-events`);
        setEvent(res.data.data);
      } catch (err: any) {
        setError("Failed to fetch My-Events");
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    getMyEvents();
  }, [axiosSecure]);



  if (error)
    return (
      <div className="flex justify-center items-center min-h-100">
        <div className="bg-red-50 text-red-500 px-6 py-4 rounded-lg shadow-sm">
          {error}
        </div>
      </div>
    );

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );

  return (
    <div className="rounded-2xl border border-base-200 bg-base-100 p-4 shadow-sm md:p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-4">My Event List</h2>
        <p className="text-sm text-base-content/70">
          Total events: {events.length}
        </p>
      </div>

      {events.length === 0 ? (
        <div className="rounded-xl border border-dashed border-base-300 px-6 py-10 text-center text-base-content/70">
          No events found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Event</th>
                <th>Date</th>
                <th>Location</th>
                <th>Price</th>
                <th>Available Seats</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={event._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex min-w-60 items-center gap-3">
                      <div className="avatar">
                        <div className="h-14 w-14 rounded-lg">
                          <Image width={100} height={100} src={event.image} alt={event.title} />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold">{event.title}</div>
                        <div className="max-w-xs text-xs text-base-content/70">
                          {event.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{formatDate(event.date)}</td>
                  <td>{event.location}</td>
                  <td>${event.price}</td>
                  <td>{event.capacity}</td>
                  <td>
                    <div className="flex gap-2">
                      <button type="button" className="btn btn-sm btn-info">
                        Update
                      </button>
                      <button type="button" className="btn btn-sm btn-error">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyEvents;
