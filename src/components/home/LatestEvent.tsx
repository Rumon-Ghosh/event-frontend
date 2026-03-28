"use client";
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { TEvent } from '@/types/Event';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function LatestEvent() {
    const axiosPublic = useAxiosPublic();
    const [events, setEvents] = useState<TEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const res = await axiosPublic.get('/events/latest');
                setEvents(res.data.data);
                setError(null);
            } catch (err: any) {
                console.error("Error fetching events:", err);
                setError("Failed to load events.");
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [axiosPublic]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-100">
                <div className="bg-red-50 text-red-500 px-6 py-4 rounded-lg shadow-sm">
                    <p className="font-medium">{error}</p>
                </div>
            </div>
        );
    }

    if(events.length === 0){
        return (
            <div className="flex justify-center items-center min-h-100">
                <p className="text-xl text-gray-300 font-medium">No events found in your area.</p>
            </div>
        );
    }
  return (
    <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl mb-4">
                    Latest Events
                </h2>
                <p className="max-w-2xl text-lg text-gray-300 mx-auto">
                    Discover the most exciting upcoming events, handpicked exactly for you.
                </p>
            </div>
        </div>
        {
            events.map((event) => (
                <div key={event._id} className="group flex flex-col rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
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
                    <div className="flex flex-col flex-1 p-6">
                        <div className="flex items-center text-sm text-gray-300 mb-3 space-x-2">
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
            ))  
        }
    </div>
  )
}

export default LatestEvent