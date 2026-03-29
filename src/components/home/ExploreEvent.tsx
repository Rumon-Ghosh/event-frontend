"use client";
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { TEvent } from '@/types/Event';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ExploreEvent = () => {
  const axiosPublic = useAxiosPublic();
  const [events, setEvents] = useState<TEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalEvents, setTotalEvents] = useState<number>(0);
  const limit = 9;

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1); // Reset to page 1 on new search
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  // Reset to page 1 when sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await axiosPublic.get(`/events?search=${debouncedSearch}&sortBy=${sortBy}&page=${currentPage}&limit=${limit}`);
        setEvents(res.data.data);
        setTotalEvents(res.data.totalEvents || 0);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching events:", err);
        setError("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [axiosPublic, debouncedSearch, sortBy, currentPage]);

  const totalPages = Math.ceil(totalEvents / limit);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">
            Explore Events
          </h2>
          <p className="max-w-2xl text-lg text-gray-500 mx-auto">
            Discover the most exciting upcoming events, handpicked exactly for you.
          </p>
        </div>

        <div className='mb-8 flex flex-col md:flex-row gap-3 justify-between items-center'>
          <div className='flex-1'>
            <input
              className='input'
              type="search" value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search events...'
            />
          </div>
          <div className='w-1/3'>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className='input w-full'>
              <option value="">Sort By</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>
        </div>

        {loading && events.length === 0 ? (
          <div className="flex justify-center items-center min-h-100">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center min-h-100">
            <div className="bg-red-50 text-red-500 px-6 py-4 rounded-lg shadow-sm">
              <p className="font-medium">{error}</p>
            </div>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-24 bg-gray-50 rounded-2xl">
            <p className="text-xl text-gray-500 font-medium tracking-tight">
              {debouncedSearch ? `No events found for "${debouncedSearch}"` : "No events found in your area."}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="group flex flex-col rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  {/* Image Header */}
                  <div className="relative h-60 w-full overflow-hidden bg-gray-200">
                    <Image
                      src={event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800'}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 50vw"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold text-teal-600 shadow-sm">
                      {event.price === 0 ? 'Free' : `$${event.price}`}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3 space-x-2">
                      <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="truncate flex items-center">
                        <svg className="w-3.5 h-3.5 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.location}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-teal-600 transition-colors line-clamp-1">
                      {event.title}
                    </h3>

                    <p className="text-gray-600 line-clamp-2 mb-6 flex-1 text-sm leading-relaxed">
                      {event.description}
                    </p>

                    {/* Footer / Action */}
                    <div className="mt-auto border-t border-gray-100 pt-5">
                      <Link
                        href={`/explore/${event._id}`}
                        className="inline-flex w-full items-center justify-center px-4 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 focus:ring-4 focus:ring-teal-100 transition-all font-semibold text-sm shadow-sm hover:shadow"
                      >
                        View Details
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination UI */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <div className="join shadow-sm">
                  <button
                    className="join-item btn btn-outline btn-sm md:btn-md"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  >
                    « Prev
                  </button>
                  <button className="join-item btn btn-outline btn-sm md:btn-md no-animation cursor-default">
                    Page {currentPage} of {totalPages}
                  </button>
                  <button
                    className="join-item btn btn-outline btn-sm md:btn-md"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  >
                    Next »
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ExploreEvent;