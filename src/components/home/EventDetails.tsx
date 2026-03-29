"use client";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { TEvent } from "@/types/Event";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, {  useEffect, useState } from "react";
import { HiOutlineArrowRight, HiOutlineMapPin, HiOutlineUsers, HiStar, HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { TbCurrencyDollar } from "react-icons/tb";
import toast from "react-hot-toast";
import { useAuth } from "@/providers/AuthProvider";
import Swal from "sweetalert2";

const EventDetails = ({ id }: { id: string }) => {
  const axiosSecure = useAxiosSecure();
  const { user, loading: authLoading } = useAuth();
  const [eventById, setEventById] = useState<TEvent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editComment, setEditComment] = useState<string>("");
  const [editRating, setEditRating] = useState<number>(5);
  const [reviewsLoading, setReviewsLoading] = useState<boolean>(true);
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
    
    const fetchReviews = async () => {
      try {
        setReviewsLoading(true);
        const res = await axiosSecure.get(`/reviews/${id}`);
        setReviews(res.data.data);
      } catch (err: any) {
        console.error("Error fetching reviews:", err);
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchEventById();
    fetchReviews();
  }, [id, axiosSecure]);

  const refreshReviews = async () => {
    try {
      const res = await axiosSecure.get(`/reviews/${id}`);
      setReviews(res.data.data);
    } catch (err: any) {
      console.error("Error refreshing reviews:", err);
    }
  };

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
        router.push("/dashboard/my-orders")
      }
    } catch (err: any) {
      console.error("Error booking event:", err);
      toast.error(err.response?.data?.message || "Failed to book event.");
    }
  };

  const handleReviewSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to give a review.");
      return;
    }
    if (!comment.trim()) {
      toast.error("Review comment cannot be empty.");
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        event: id,
        rating,
        comment,
      };
      const res = await axiosSecure.post("/reviews", payload);
      if (res.data.success) {
        toast.success("Review submitted successfully!");
        setComment("");
        setRating(5);
        refreshReviews();
      }
    } catch (err: any) {
      console.error("Error submitting review:", err);
      toast.error(err.response?.data?.message || "Failed to submit review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateReview = async (reviewId: string) => {
    try {
      const res = await axiosSecure.put(`/reviews/${reviewId}`, {
        rating: editRating,
        comment: editComment,
      });
      if (res.data.success) {
        toast.success("Review updated successfully!");
        setEditingReviewId(null);
        refreshReviews();
      }
    } catch (err: any) {
      console.error("Error updating review:", err);
      toast.error("Failed to update review.");
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    const result = await Swal.fire({
          title: "Delete this Review?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it",
          cancelButtonText: "Cancel",
          confirmButtonColor: "#dc2626",
        });
    
        if (!result.isConfirmed) {
          return;
        }
    try {
      const res = await axiosSecure.delete(`/reviews/${reviewId}`);
      if (res.data.success) {
        toast.success("Review deleted successfully!");
        refreshReviews();
      }
    } catch (err: any) {
      console.error("Error deleting review:", err);
      toast.error("Failed to delete review.");
    }
  };

  const openEdit = (review: any) => {
    setEditingReviewId(review._id);
    setEditComment(review.comment);
    setEditRating(review.rating);
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

      {/* Review Section */}
      <div className="mt-16 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-8 lg:p-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <HiStar className="mr-2 h-7 w-7 text-yellow-500" />
            Rate this Event
          </h2>
          
          <form onSubmit={handleReviewSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600 block">Rating</label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <HiStar
                      className={`h-10 w-10 ${
                        star <= rating ? "text-yellow-500" : "text-gray-200"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400">Click a star to change your rating</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="comment" className="text-sm font-semibold text-gray-600 block">
                Your Review
              </label>
              <textarea
                id="comment"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about this event..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none resize-none placeholder:text-gray-600 text-gray-700"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !user}
              className={`px-8 py-3 rounded-xl font-bold text-white transition duration-300 shadow-md transform hover:-translate-y-0.5 active:scale-95 ${
                isSubmitting || !user
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-teal-600 hover:bg-teal-700"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit Review"
              )}
            </button>
            {!user && (
              <p className="text-sm text-red-500">Please log in to submit a review.</p>
            )}
          </form>
        </div>
      </div>

      {/* Reviews List */}
      <div className="mt-12 bg-gray-50 rounded-2xl p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">User Reviews</h2>
        
        {reviewsLoading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-200">
            <p className="text-gray-400">No reviews yet. Be the first to share your experience!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review: any) => (
              <div key={review._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold">
                      {review.user?.name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{review.user?.name || "Anonymous"}</h4>
                      <p className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <HiStar className="h-5 w-5 text-yellow-400 mr-1" />
                    <span className="font-bold text-gray-700">{review.rating}</span>
                  </div>
                </div>

                {editingReviewId === review._id ? (
                  <div className="space-y-4 pt-2 border-t border-gray-50">
                    <div className="flex space-x-1 mb-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button key={s} onClick={() => setEditRating(s)}>
                          <HiStar className={`h-6 w-6 ${s <= editRating ? "text-yellow-400" : "text-gray-200"}`} />
                        </button>
                      ))}
                    </div>
                    <textarea
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-gray-700"
                      rows={3}
                    />
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleUpdateReview(review._id)} 
                        className="btn btn-sm btn-success text-white"
                      >Save</button>
                      <button 
                        onClick={() => setEditingReviewId(null)} 
                        className="btn btn-sm btn-primary"
                      >Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-600 leading-relaxed italic">&quot;{review.comment}&quot;</p>
                    
                    {user?._id === review.user?._id && (
                      <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-50">
                        <button 
                          onClick={() => openEdit(review)}
                          className="p-2 text-gray-400 hover:text-teal-600 transition-colors"
                          title="Edit review"
                        >
                          <HiOutlinePencilSquare className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteReview(review._id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete review"
                        >
                          <HiOutlineTrash className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
