"use client";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { TEvent } from "@/types/Event";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

type TEventForm = {
  title: string;
  description: string;
  date: string;
  location: string;
  price: string;
  capacity: string;
};

const MyEvents = () => {
  const axiosSecure = useAxiosSecure();
  const [events, setEvent] = useState<TEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [refresh, setRefresh] = useState<boolean>(false);
  const updateRef = useRef<HTMLDialogElement>(null);
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [formData, setFormData] = useState<TEventForm>({
    title: "",
    description: "",
    date: "",
    location: "",
    price: "",
    capacity: "",
  });

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-BD", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const openUpdateModal = (event: TEvent) => {
    setSelectedEventId(event._id);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date.slice(0, 10),
      location: event.location,
      price: String(event.price),
      capacity: String(event.capacity),
    });
    updateRef.current?.showModal();
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await axiosSecure.patch(`/events/${selectedEventId}`, formData)
      if (res.data) {
        toast.success("Event Updated successfull.")
        setRefresh(!refresh)
        updateRef.current?.close();
      }
    } catch (err: any) {
      setError("Error on updating Event!")
      console.log(err.message)
    }
  };


  const handleDeleteEvent = async (id: string) => {
    try {
      const res = await axiosSecure.delete(`/events/${id}`);
      if (res.data.success) {
        toast.success("Event Deleted Successfully.")
        setRefresh(!refresh)
      }
    } catch (err: any) {
      setError("Error on deleting Event.")
      console.log("Error on deleting event", err)
    }
  }

  useEffect(() => {
    const getMyEvents = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get(`/events/my-events`) ;
        setEvent(res.data.data);
      } catch (err: any) {
        setError("Failed to fetch My-Events");
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    getMyEvents();
  }, [axiosSecure, refresh]);

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
                <th>Remain Seats</th>
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
                          <Image
                            width={100}
                            height={100}
                            src={event.image}
                            alt={event.title}
                          />
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
                      <button
                        onClick={() => openUpdateModal(event)}
                        type="button"
                        className="btn btn-sm btn-info"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event._id)}
                        type="button" className="btn btn-sm btn-error">
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
      
      <dialog id="my_modal_5" ref={updateRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-2xl">
          <h3 className="text-xl font-bold">Update Event</h3>
          <p className="py-2 text-sm text-base-content/70">
            Edit the event details below and save your changes.
          </p>

          <form onSubmit={handleUpdateSubmit} className="space-y-4 pt-2">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Title</span>
                </div>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  placeholder="Event title"
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Date</span>
                </div>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </label>
            </div>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Description</span>
              </div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="textarea textarea-bordered min-h-28 w-full"
                placeholder="Event description"
              />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Location</span>
                </div>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  placeholder="Event location"
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Price</span>
                </div>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  min="0"
                  placeholder="Price"
                />
              </label>
            </div>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Capacity</span>
              </div>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                min="1"
                placeholder="Capacity"
              />
            </label>

            <div className="modal-action">
              <button type="submit" className="btn btn-info text-white">
                Save Changes
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => updateRef.current?.close()}
              >
                Cancel
              </button>
            </div>
          </form>

          <div className="modal-action">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => updateRef.current?.close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyEvents;
